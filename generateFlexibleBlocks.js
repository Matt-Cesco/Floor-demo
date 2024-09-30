const fs = require('fs');
const path = require('path');
const { Project } = require('ts-morph');

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

// Ensure a directory exists, create it if it doesn't
const ensureDirectoryExists = (dirPath) => {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
		console.log(`Created folder: ${dirPath}`);
	} else {
		console.log(`Folder already exists: ${dirPath}`);
	}
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
	const typeDefinition = extractTypeDefinition(fragmentType);

	if (!typeDefinition) {
		console.log(`Skipping ${blockName}: No type definition found for ${fragmentType}`);
		return;
	}

	// Create interface .ts file for the block with full type definition
	const interfaceFilePath = path.join(folderPath, `I${blockName}.ts`);
	if (!fs.existsSync(interfaceFilePath)) {
		const interfaceFileContent = `
    // Interface for ${blockName} block data
    export interface I${blockName} ${typeDefinition}
    `;

		fs.writeFileSync(interfaceFilePath, interfaceFileContent.trim());
		console.log(`Created file: ${interfaceFilePath}`);
	} else {
		console.log(`Skipping ${interfaceFilePath}: file already exists.`);
	}

	// Create .tsx file for the block
	const blockFilePath = path.join(folderPath, `${blockName}.tsx`);
	if (!fs.existsSync(blockFilePath)) {
		const blockFileContent = `
    import { I${blockName} } from './I${blockName}';
    import { IFlexibleBlock } from '../IFlexibleBlock';

    const ${blockName} = ({ data }: IFlexibleBlock<I${blockName}>) => {
        // Destructure block-specific fields if needed
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
