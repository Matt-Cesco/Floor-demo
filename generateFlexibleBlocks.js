const fs = require("fs");
const path = require("path");
const { Project, SyntaxKind } = require("ts-morph");

// all paths
const flexibleBlocksDir = path.resolve(__dirname, "./src/Components/FlexibleBlocks");
const fragmentsDir = path.resolve(__dirname, "./src/Graphql/wordpressCMS/flexibleFragments");
const helpersDir = path.resolve(__dirname, "./src/Helpers");
const generatedTypesFilePath = path.resolve(__dirname, "./src/Graphql/generated.tsx");

// Initialize ts-morph project
const project = new Project();
project.addSourceFileAtPath(generatedTypesFilePath);
const generatedSourceFile = project.getSourceFile(generatedTypesFilePath);

// Get all fragment files dynamically from the fragments directory
const fragmentFiles = fs.readdirSync(fragmentsDir).filter((file) => file.endsWith("Fragment.ts"));

// Function to extract the entire type definition from generated.tsx
const extractTypeDefinition = (fragmentType) => {
    const typeAlias = generatedSourceFile.getTypeAlias(fragmentType);

    if (typeAlias) {
        const typeText = typeAlias.getTypeNode().getText();
        return typeText;
    }
    return null;
};

// Function to extract field names from a type definition using ts-morph
const extractFieldNames = (typeDefinition, fieldPath = []) => {
    const fields = [];
    const sourceText = `type TempType = ${typeDefinition};`;
    const tempSourceFile = project.createSourceFile("temp.ts", sourceText, {
        overwrite: true,
    });
    const typeAlias = tempSourceFile.getTypeAlias("TempType");

    let typeNode = typeAlias.getTypeNode();

    // Navigate through the field path to get to the desired type node
    for (const fieldName of fieldPath) {
        const property = typeNode.getProperty(fieldName);
        if (property) {
            typeNode = property.getTypeNode();
            // Handle optional properties and nullables
            if (typeNode.getKind() === SyntaxKind.UnionType) {
                const unionTypes = typeNode.getTypeNodes();
                // Assume the first non-nullish type
                typeNode = unionTypes.find((t) => t.getKind() !== SyntaxKind.NullKeyword && t.getKind() !== SyntaxKind.UndefinedKeyword);
            }
            // Handle arrays
            if (typeNode.getKind() === SyntaxKind.ArrayType) {
                typeNode = typeNode.getElementTypeNode();
            }
            // Handle type references like interfaces
            if (typeNode.getKind() === SyntaxKind.TypeReference) {
                const typeName = typeNode.getText();
                const referencedType = tempSourceFile.getTypeAlias(typeName);
                if (referencedType) {
                    typeNode = referencedType.getTypeNode();
                }
            }
        } else {
            return fields; // Return empty if path is invalid
        }
    }

    if (typeNode && typeNode.getKindName() === "TypeLiteral") {
        const properties = typeNode.getProperties();
        properties.forEach((prop) => {
            const name = prop.getName();
            if (name !== "__typename") {
                fields.push(name);
            }
        });
    }
    return fields;
};

// this is the function to extract the __typename value from a type definition
const extractTypename = (typeDefinition) => {
    const sourceText = `type TempType = ${typeDefinition};`;
    const tempSourceFile = project.createSourceFile("tempTypename.ts", sourceText, {
        overwrite: true,
    });
    const typeAlias = tempSourceFile.getTypeAlias("TempType");
    const typeNode = typeAlias.getTypeNode();

    const typenameProperty = typeNode.getProperty("__typename");
    if (typenameProperty) {
        const type = typenameProperty.getTypeNode();
        if (type) {
            const typeText = type.getText().replace(/'/g, "").trim();
            return typeText;
        }
    }
    return null;
};

// Ensure a directory exists, create it if it doesn't
const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created folder: ${dirPath}`);
    } else {
        console.log(`Folder already exists: ${dirPath}`);
    }
};

// Function to capitalize the first letter of a string
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Function to modify the type definition
const modifyTypeDefinition = (typeDefinition, blockName, layoutOptionsFields = []) => {
    const interfaceSourceText = `
        export default interface I${blockName} ${typeDefinition}
      `;

    const tempSourceFile = project.createSourceFile("tempInterface.ts", interfaceSourceText, {
        overwrite: true,
    });

    // Get the interface
    const interfaceDeclaration = tempSourceFile.getInterface(`I${blockName}`);

    let importStatements = "";

    // If there are layoutOptionsFields, proceed to modify them
    if (layoutOptionsFields.length > 0) {
        // Import enums in the interface
        const enumsToImport = layoutOptionsFields.map(capitalize).join(", ");
        importStatements += enumsToImport ? `import { ${enumsToImport} } from './${blockName}OptionsEnum';\n` : "";
    }

    // Variables to track if IDynamicHeading and MediaItem are used
    let usesIDynamicHeading = false;
    let usesMediaItem = false;

    // Function to replace types of properties named 'node', 'nodes', or 'edges' where the type includes __typename?: 'MediaItem'
    const replaceMediaItemWithIDynamicImage = (node) => {
        node.forEachDescendant((child) => {
            if (child.getKind() === SyntaxKind.PropertySignature) {
                const propName = child.getName();
                if (["node", "nodes", "edges"].includes(propName)) {
                    const propTypeNode = child.getTypeNode();
                    if (propTypeNode) {
                        const typeText = propTypeNode.getText();
                        if (typeText.includes("__typename?: 'MediaItem'")) {
                            // Determine if it's an array
                            let isArray = false;
                            let newType = "MediaItem | null";

                            // Handle union types (e.g., Type | null)
                            let effectiveTypeNode = propTypeNode;
                            if (propTypeNode.getKind() === SyntaxKind.UnionType) {
                                const unionTypes = propTypeNode.getTypeNodes();
                                // Assume the first non-nullish type
                                effectiveTypeNode = unionTypes.find(
                                    (t) => t.getKind() !== SyntaxKind.NullKeyword && t.getKind() !== SyntaxKind.UndefinedKeyword
                                );
                            }

                            // Check if the type is an array
                            if (
                                effectiveTypeNode.getKind() === SyntaxKind.ArrayType ||
                                (effectiveTypeNode.getKind() === SyntaxKind.TypeReference && effectiveTypeNode.getText().startsWith("Array<"))
                            ) {
                                isArray = true;
                                newType = "MediaItem[] | null";
                            }
                            child.setType(newType);

                            usesMediaItem = true;
                        }
                    }
                }
            }
        });
    };

    // Function to replace 'heading' with 'IDynamicHeading | null' if it includes 'headingTag' and 'headingText'
    const replaceHeadingWithIDynamicHeading = (node) => {
        node.forEachDescendant((child) => {
            if (child.getKind() === SyntaxKind.PropertySignature) {
                const propName = child.getName();
                if (propName === "heading") {
                    const propTypeNode = child.getTypeNode();
                    if (propTypeNode) {
                        const typeText = propTypeNode.getText();
                        if (typeText.includes("headingTag") && typeText.includes("headingText")) {
                            // Replace with IDynamicHeading | null
                            const newType = "IDynamicHeading | null";

                            // Replace the property type with the new type
                            child.setType(newType);

                            // Mark that IDynamicHeading is used
                            usesIDynamicHeading = true;
                        }
                    }
                }
            }
        });
    };

    // Function to replace layoutOptions fields with enums
    const replaceLayoutOptionsFieldsWithEnums = (node, layoutOptionsFields) => {
        node.forEachDescendant((child) => {
            if (child.getKind() === SyntaxKind.PropertySignature) {
                const propName = child.getName();
                if (propName === "layoutOptions") {
                    const propTypeNode = child.getTypeNode();
                    if (propTypeNode && propTypeNode.getKind() === SyntaxKind.TypeLiteral) {
                        // This is the type literal of layoutOptions
                        const layoutOptionsProperties = propTypeNode.getMembers();
                        layoutOptionsProperties.forEach((layoutProp) => {
                            if (layoutProp.getKind() === SyntaxKind.PropertySignature) {
                                const layoutPropName = layoutProp.getName();
                                if (layoutOptionsFields.includes(layoutPropName)) {
                                    const enumName = capitalize(layoutPropName);
                                    // Replace the type with the enum
                                    layoutProp.setType(`${enumName} | null`);
                                }
                            }
                        });
                    }
                }
            }
        });
    };

    replaceMediaItemWithIDynamicImage(interfaceDeclaration);
    replaceHeadingWithIDynamicHeading(interfaceDeclaration);
    replaceLayoutOptionsFieldsWithEnums(interfaceDeclaration, layoutOptionsFields);

    // Conditionally add import for MediaItem
    if (usesMediaItem) {
        importStatements += `import { MediaItem } from '@/Graphql/generated';\n`;
    }

    // Conditionally add import for IDynamicHeading
    if (usesIDynamicHeading) {
        importStatements += `import { IDynamicHeading } from '@/Common/DynamicHeading/IDynamicHeading';\n`;
    }

    // Return the modified type definition with import statements
    return `${importStatements}${interfaceDeclaration.getText()}`;
};

// Arrays to store block information for generating GetFlexibleBlock.tsx
const blockImports = [];
const switchCases = [];
const unionTypes = [];

// Generate folder structure and files for each block
fragmentFiles.forEach((fragmentFile) => {
    const fragmentName = fragmentFile.replace("Fragment.ts", "Fragment");
    const blockName = fragmentName.replace("Fragment", "Block");
    const componentName = blockName; // Component name matches block name
    const fragmentType = `${fragmentName}Fragment`; // Use fragment type from the generated types file
    const folderPath = path.join(flexibleBlocksDir, blockName);

    // Ensure the block folder exists
    ensureDirectoryExists(folderPath);

    // Extract full type definition for the block from generated.tsx
    let typeDefinition = extractTypeDefinition(fragmentType);

    if (!typeDefinition) {
        console.log(`Skipping ${blockName}: No type definition found for ${fragmentType}`);
        return;
    }

    // Extract __typename value
    const typenameValue = extractTypename(typeDefinition);
    if (!typenameValue) {
        console.log(`Skipping ${blockName}: No __typename found in ${fragmentType}`);
        return;
    }

    // Add to block imports, switch cases, and union types
    blockImports.push(`import ${componentName} from '@/Components/FlexibleBlocks/${componentName}/${componentName}';`);
    switchCases.push(`    case FlexibleBlocksEnum.${blockName.toUpperCase()}:
            return <${componentName} data={data} />;`);
    unionTypes.push(`I${blockName}`);

    // Extract top-level field names
    const fieldNames = extractFieldNames(typeDefinition);

    // Identify nested fields ending with 'Fields'
    const nestedFieldNames = fieldNames.filter((name) => name.endsWith("Fields"));

    let destructuringCode = "";
    let typeAliasesCode = ""; // To store type aliases for choices fields
    let layoutOptionsFieldsFiltered = []; // To store the names of the fields inside layoutOptions

    if (nestedFieldNames.length > 0) {
        // For simplicity, we'll handle the first nested field ending with 'Fields'
        const nestedField = nestedFieldNames[0];
        const nestedFields = extractFieldNames(typeDefinition, [nestedField]);

        // Generate destructuring code
        destructuringCode = `
    const { ${nestedFields.join(", ")} } = data.${nestedField} || {};
    `;

        // Check for fields starting with 'choices'
        const choicesFields = nestedFields.filter((fieldName) => fieldName.startsWith("choices"));

        if (choicesFields.length > 0) {
            choicesFields.forEach((fieldName) => {
                typeAliasesCode += `
    // Type alias for ${fieldName} options. Adjust the allowed values as needed.
    type ${fieldName}Options = /* "option1" | "option2" | "option3" */;
    `;
            });
        }

        // Handle 'layoutOptions' field
        if (nestedFields.includes("layoutOptions")) {
            // Extract fields inside 'layoutOptions'
            const layoutOptionsFields = extractFieldNames(typeDefinition, [nestedField, "layoutOptions"]);

            // Exclude '__typename'
            layoutOptionsFieldsFiltered = layoutOptionsFields.filter((name) => name !== "__typename");

            if (layoutOptionsFieldsFiltered.length > 0) {
                // Generate enums for each field inside 'layoutOptions'
                let enumsFileContent = "";
                layoutOptionsFieldsFiltered.forEach((fieldName) => {
                    const enumName = capitalize(fieldName);
                    enumsFileContent += `
    // Enum placeholder for ${enumName}. Adjust the values as needed.
    export enum ${enumName} {
        // Add enum values here
    }
    `;
                });

                // Write the enums to a file named after the block with 'OptionsEnum' appended
                const enumsFileName = `${blockName}OptionsEnum.ts`;
                const enumsFilePath = path.join(folderPath, enumsFileName);

                // Check if the enums file already exists
                if (!fs.existsSync(enumsFilePath)) {
                    fs.writeFileSync(enumsFilePath, enumsFileContent.trim());
                    console.log(`Created file: ${enumsFilePath}`);
                } else {
                    console.log(`Enums file already exists: ${enumsFilePath}. Skipping...`);
                }
            }

            // Update the destructuring code to include layoutOptions fields
            destructuringCode += `
    const { ${layoutOptionsFieldsFiltered.join(", ")} } = layoutOptions || {};
    `;
        }
    } else {
        if (fieldNames.length > 0) {
            destructuringCode = `const { ${fieldNames.join(", ")} } = data;`;
        } else {
            destructuringCode = "// No fields to destructure";
        }

        // Check for fields starting with 'choices' at the top level
        const choicesFields = fieldNames.filter((fieldName) => fieldName.startsWith("choices"));

        if (choicesFields.length > 0) {
            choicesFields.forEach((fieldName) => {
                typeAliasesCode += `
    // Type alias for ${fieldName} options. Adjust the allowed values as needed.
    type ${fieldName}Options = /* "option1" | "option2" | "option3" */;
    `;
            });
        }
    }

    // Always modify the interface to replace MediaItem and heading with respective interfaces
    typeDefinition = modifyTypeDefinition(typeDefinition, blockName, layoutOptionsFieldsFiltered);

    // Create interface .ts file for the block with full type definition
    const interfaceFilePath = path.join(folderPath, `I${blockName}.ts`);

    // Only create the interface file if it doesn't exist
    if (!fs.existsSync(interfaceFilePath)) {
        const interfaceFileContent = `
  // Interface for ${blockName} block data
  ${typeDefinition}
  `;
        fs.writeFileSync(interfaceFilePath, interfaceFileContent.trim());
        console.log(`Created file: ${interfaceFilePath}`);
    } else {
        console.log(`Interface file already exists: ${interfaceFilePath}. Skipping...`);
    }

    // Create .tsx file for the block
    const blockFilePath = path.join(folderPath, `${blockName}.tsx`);

    // Only create the block file if it doesn't exist. If it's existing skip
    if (!fs.existsSync(blockFilePath)) {
        const enumsToImport = layoutOptionsFieldsFiltered.length > 0 ? layoutOptionsFieldsFiltered.map(capitalize).join(", ") : "";
        const enumsImport = enumsToImport ? `import { ${enumsToImport} } from './${blockName}OptionsEnum';` : "";

        const blockFileContent = `
  import I${blockName} from './I${blockName}'; // Updated import
  import IFlexibleBlock from '../IFlexibleBlock';
  ${enumsImport}
  ${typeAliasesCode}

  const ${blockName} = ({ data }: IFlexibleBlock<I${blockName}>) => {
      ${destructuringCode}
      return (
          <div>
              <p>block name: ${blockName}</p>
          </div>
      );
  };

  export default ${blockName};
  `;
        fs.writeFileSync(blockFilePath, blockFileContent.trim());
        console.log(`Created file: ${blockFilePath}`);
    } else {
        console.log(`Block file already exists: ${blockFilePath}. Skipping...`);
    }
});

// Generate IFlexibleBlock interface in the FlexibleBlocks root folder
const iflexibleBlockPath = path.join(flexibleBlocksDir, "IFlexibleBlock.ts");
// Only create the file if it doesn't exist
if (!fs.existsSync(iflexibleBlockPath)) {
    const iflexibleBlockContent = `
export default interface IFlexibleBlock<T extends { __typename: string }> {
    data: T;
    // You can add more fields here if needed, like layout or options
}
`;
    fs.writeFileSync(iflexibleBlockPath, iflexibleBlockContent.trim());
    console.log(`Created file: ${iflexibleBlockPath}`);
} else {
    console.log(`IFlexibleBlock file already exists: ${iflexibleBlockPath}. Skipping...`);
}

// Generate FlexibleBlocksEnum.ts file with correct __typename values
const enumFilePath = path.join(flexibleBlocksDir, "FlexibleBlocksEnum.ts");
const enumEntries = fragmentFiles
    .map((fragmentFile) => {
        const fragmentName = fragmentFile.replace("Fragment.ts", "Fragment");
        const blockName = fragmentName.replace("Fragment", "Block").toUpperCase();
        const fragmentType = `${fragmentName}Fragment`;

        // Extract the type definition
        const typeDefinition = extractTypeDefinition(fragmentType);
        if (!typeDefinition) {
            console.log(`Skipping ${blockName}: No type definition found for ${fragmentType}`);
            return null;
        }

        // Extract __typename value
        const typenameValue = extractTypename(typeDefinition);
        if (!typenameValue) {
            console.log(`Skipping ${blockName}: No __typename found in ${fragmentType}`);
            return null;
        }

        return `${blockName} = '${typenameValue}'`;
    })
    .filter((entry) => entry !== null);

const enumFileContent = `
export enum FlexibleBlocksEnum {
    ${enumEntries.join(",\n    ")}
}

export default FlexibleBlocksEnum;
`;

// Only create the enum file if it doesn't exist
if (!fs.existsSync(enumFilePath)) {
    fs.writeFileSync(enumFilePath, enumFileContent.trim());
    console.log(`Created file: ${enumFilePath}`);
} else {
    console.log(`FlexibleBlocksEnum file already exists: ${enumFilePath}. Skipping...`);
}

// Generate AllBlockDataTypes.ts for union of all block interfaces
const allBlockDataTypesPath = path.join(flexibleBlocksDir, "AllBlockDataTypes.ts");
const allBlockInterfaces = unionTypes.map((typeName) => `import ${typeName} from './${typeName.replace("I", "")}/${typeName}';`).join("\n");

const allBlockDataTypesContent = `
${allBlockInterfaces}

export type AllBlockDataTypes =
    ${unionTypes.join(" |\n    ")}
    ;
`;

if (!fs.existsSync(allBlockDataTypesPath)) {
    fs.writeFileSync(allBlockDataTypesPath, allBlockDataTypesContent.trim());
    console.log(`Created file: ${allBlockDataTypesPath}`);
} else {
    console.log(`AllBlockDataTypes file already exists: ${allBlockDataTypesPath}. Skipping...`);
}

// Generate GetFlexibleBlock.tsx in the Helpers folder
ensureDirectoryExists(helpersDir);
const getFlexibleBlockPath = path.join(helpersDir, "GetFlexibleBlock.tsx");

// Adjust import paths for components and types
const adjustedBlockImports = blockImports.map((importStatement) => importStatement.replace("@/Components/FlexibleBlocks/", "../Components/FlexibleBlocks/"));

const getFlexibleBlockContent = `
import FlexibleBlocksEnum from '@/Components/FlexibleBlocks/FlexibleBlocksEnum';
import { AllBlockDataTypes } from '@/Components/FlexibleBlocks/AllBlockDataTypes';
import IFlexibleBlock from '@/Components/FlexibleBlocks/IFlexibleBlock';

${adjustedBlockImports.join("\n")}

const GetFlexibleBlock = ({ data }: IFlexibleBlock<AllBlockDataTypes>) => {
    if (!data || !data.__typename) {
        console.warn('FlexibleBlock data is missing or __typename is undefined.');
        return null;
    }

  switch (data.__typename) {
${switchCases.join("\n")}
      default:
        console.warn(\`Unknown block type: \${data.__typename}\`);
        return null;
  }
};

export default GetFlexibleBlock;
`;

if (!fs.existsSync(getFlexibleBlockPath)) {
    fs.writeFileSync(getFlexibleBlockPath, getFlexibleBlockContent.trim());
    console.log(`Created file: ${getFlexibleBlockPath}`);
} else {
    console.log(`GetFlexibleBlock file already exists: ${getFlexibleBlockPath}. Skipping...`);
}
