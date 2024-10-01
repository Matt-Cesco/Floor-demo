const fs = require('fs');
const path = require('path');
const { Project, SyntaxKind } = require('ts-morph');

// Define paths
const flexibleBlocksDir = path.resolve(__dirname, './src/Components/FlexibleBlocks');
const fragmentsDir = path.resolve(__dirname, './src/Graphql/wordpressCMS/flexibleFragments');
const generatedTypesFilePath = path.resolve(__dirname, './src/Graphql/generated.tsx'); // Path to generated.tsx

// Initialize ts-morph project
const project = new Project();
project.addSourceFileAtPath(generatedTypesFilePath);
const generatedSourceFile = project.getSourceFile(generatedTypesFilePath);

// Get all fragment files dynamically from the fragments directory
const fragmentFiles = fs.readdirSync(fragmentsDir).filter((file) => file.endsWith('Fragment.ts'));

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
	const tempSourceFile = project.createSourceFile('temp.ts', sourceText, {
		overwrite: true,
	});
	const typeAlias = tempSourceFile.getTypeAlias('TempType');

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
			// Handle type references (e.g., interfaces)
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

	if (typeNode && typeNode.getKindName() === 'TypeLiteral') {
		const properties = typeNode.getProperties();
		properties.forEach((prop) => {
			const name = prop.getName();
			if (name !== '__typename') {
				fields.push(name);
			}
		});
	}
	return fields;
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
    export interface I${blockName} ${typeDefinition}
  `;

	const tempSourceFile = project.createSourceFile('tempInterface.ts', interfaceSourceText, {
		overwrite: true,
	});

	// Get the interface
	const interfaceDeclaration = tempSourceFile.getInterface(`I${blockName}`);

	let importStatements = '';

	// If there are layoutOptionsFields, proceed to modify them
	if (layoutOptionsFields.length > 0) {
		// Import enums in the interface
		const enumsToImport = layoutOptionsFields.map(capitalize).join(', ');
		importStatements += enumsToImport ? `import { ${enumsToImport} } from './${blockName}OptionsEnum';\n` : '';
	}

	// Variables to track if IDynamicImage and IDynamicHeading are used
	let usesIDynamicImage = false;
	let usesIDynamicHeading = false;

	// Function to replace types of properties named 'node', 'nodes', or 'edges' where the type includes __typename?: 'MediaItem'
	const replaceMediaItemWithIDynamicImage = (node) => {
		node.forEachDescendant((child) => {
			if (child.getKind() === SyntaxKind.PropertySignature) {
				const propName = child.getName();
				if (['node', 'nodes', 'edges'].includes(propName)) {
					const propTypeNode = child.getTypeNode();
					if (propTypeNode) {
						const typeText = propTypeNode.getText();
						if (typeText.includes("__typename?: 'MediaItem'")) {
							// Determine if it's an array
							let isArray = false;
							let newType = 'IDynamicImage | null';

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
								(effectiveTypeNode.getKind() === SyntaxKind.TypeReference && effectiveTypeNode.getText().startsWith('Array<'))
							) {
								isArray = true;
								newType = 'IDynamicImage[] | null';
							}

							// Replace the property type with the new type
							child.setType(newType);

							// Mark that IDynamicImage is used
							usesIDynamicImage = true;
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
				if (propName === 'heading') {
					const propTypeNode = child.getTypeNode();
					if (propTypeNode) {
						const typeText = propTypeNode.getText();
						if (typeText.includes('headingTag') && typeText.includes('headingText')) {
							// Replace with IDynamicHeading | null
							const newType = 'IDynamicHeading | null';

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

	replaceMediaItemWithIDynamicImage(interfaceDeclaration);
	replaceHeadingWithIDynamicHeading(interfaceDeclaration);

	// Conditionally add import for IDynamicImage
	if (usesIDynamicImage) {
		importStatements += `import { IDynamicImage } from '@/Common/DynamicImage/IDynamicImage';\n`;
	}

	// Conditionally add import for IDynamicHeading
	if (usesIDynamicHeading) {
		importStatements += `import { IDynamicHeading } from '@/Common/DynamicHeading/IDynamicHeading';\n`;
	}

	// Return the modified type definition with import statements
	return `${importStatements}${interfaceDeclaration.getText()}`;
};

// Generate folder structure and files for each block
fragmentFiles.forEach((fragmentFile) => {
	const fragmentName = fragmentFile.replace('Fragment.ts', 'Fragment');
	const blockName = fragmentName.replace('Fragment', 'Block');
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

	// Extract top-level field names
	const fieldNames = extractFieldNames(typeDefinition);

	// Identify nested fields ending with 'Fields'
	const nestedFieldNames = fieldNames.filter((name) => name.endsWith('Fields'));

	let destructuringCode = '';
	let typeAliasesCode = ''; // To store type aliases for choices fields
	let layoutOptionsFieldsFiltered = []; // To store the names of the fields inside layoutOptions

	if (nestedFieldNames.length > 0) {
		// For simplicity, we'll handle the first nested field ending with 'Fields'
		const nestedField = nestedFieldNames[0];
		const nestedFields = extractFieldNames(typeDefinition, [nestedField]);

		// Generate destructuring code
		destructuringCode = `
    const { ${nestedFields.join(', ')} } = data.${nestedField} || {};
    `;

		// Check for fields starting with 'choices'
		const choicesFields = nestedFields.filter((fieldName) => fieldName.startsWith('choices'));

		if (choicesFields.length > 0) {
			choicesFields.forEach((fieldName) => {
				typeAliasesCode += `
    // Type alias for ${fieldName} options. Adjust the allowed values as needed.
    type ${fieldName}Options = /* "option1" | "option2" | "option3" */;
    `;
			});
		}

		// Handle 'layoutOptions' field
		if (nestedFields.includes('layoutOptions')) {
			// Extract fields inside 'layoutOptions'
			const layoutOptionsFields = extractFieldNames(typeDefinition, [nestedField, 'layoutOptions']);

			// Exclude '__typename'
			layoutOptionsFieldsFiltered = layoutOptionsFields.filter((name) => name !== '__typename');

			if (layoutOptionsFieldsFiltered.length > 0) {
				// Generate enums for each field inside 'layoutOptions'
				let enumsFileContent = '';
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
				fs.writeFileSync(enumsFilePath, enumsFileContent.trim());
				console.log(`Created file: ${enumsFilePath}`);
			}

			// Update the destructuring code to include layoutOptions fields
			destructuringCode += `
    const { ${layoutOptionsFieldsFiltered.join(', ')} } = layoutOptions || {};
    `;
		}
	} else {
		if (fieldNames.length > 0) {
			destructuringCode = `const { ${fieldNames.join(', ')} } = data;`;
		} else {
			destructuringCode = '// No fields to destructure';
		}

		// Check for fields starting with 'choices' at the top level
		const choicesFields = fieldNames.filter((fieldName) => fieldName.startsWith('choices'));

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
	if (!fs.existsSync(interfaceFilePath)) {
		const interfaceFileContent = `
    // Interface for ${blockName} block data
    ${typeDefinition}
    `;
		fs.writeFileSync(interfaceFilePath, interfaceFileContent.trim());
		console.log(`Created file: ${interfaceFilePath}`);
	} else {
		console.log(`Skipping ${interfaceFilePath}: file already exists.`);
	}

	// Create .tsx file for the block
	const blockFilePath = path.join(folderPath, `${blockName}.tsx`);
	if (!fs.existsSync(blockFilePath)) {
		const enumsToImport = layoutOptionsFieldsFiltered.length > 0 ? layoutOptionsFieldsFiltered.map(capitalize).join(', ') : '';
		const enumsImport = enumsToImport ? `import { ${enumsToImport} } from './${blockName}OptionsEnum';` : '';

		const blockFileContent = `
    import { I${blockName} } from './I${blockName}';
    import { IFlexibleBlock } from '../IFlexibleBlock';
    ${enumsImport}
    ${typeAliasesCode}

    const ${blockName} = ({ data }: IFlexibleBlock<I${blockName}>) => {
        ${destructuringCode}
        return (
            <div>
                {/* Render your block content here */}
            </div>
        );
    };

    export default ${blockName};
    `;
		fs.writeFileSync(blockFilePath, blockFileContent.trim());
		console.log(`Created file: ${blockFilePath}`);
	} else {
		console.log(`Skipping ${blockFilePath}: file already exists.`);
	}
});

// Generate IFlexibleBlock interface in the FlexibleBlocks root folder
const iflexibleBlockPath = path.join(flexibleBlocksDir, 'IFlexibleBlock.ts');
if (!fs.existsSync(iflexibleBlockPath)) {
	const iflexibleBlockContent = `
  export interface IFlexibleBlock<T> {
      data: T;
      // You can add more fields here if needed, like layout or options
  }
  `;
	fs.writeFileSync(iflexibleBlockPath, iflexibleBlockContent.trim());
	console.log(`Created file: ${iflexibleBlockPath}`);
} else {
	console.log(`Skipping ${iflexibleBlockPath}: file already exists.`);
}

// Always generate (overwrite) FlexibleBlocksEnum.ts file
const enumFilePath = path.join(flexibleBlocksDir, 'FlexibleBlocksEnum.ts');
const enumFileContent = `
export enum FlexibleBlocksEnum {
    ${fragmentFiles
		.map((fragmentFile) => {
			const blockName = fragmentFile.replace('Fragment.ts', 'Block').toUpperCase();
			const graphQLType = fragmentFile.replace('Fragment.ts', '');
			return `${blockName} = 'FlexibleContent${graphQLType}'`;
		})
		.join(',\n    ')}
}

export default FlexibleBlocksEnum;
`;

// Write the enum file (always overwrite)
fs.writeFileSync(enumFilePath, enumFileContent.trim());
console.log(`Created or overwritten file: ${enumFilePath}`);
