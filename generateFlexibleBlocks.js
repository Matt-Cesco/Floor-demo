const fs = require('fs');
const path = require('path');

// Define paths
const flexibleBlocksDir = path.resolve(__dirname, './src/Components/FlexibleBlocks');
const fragmentsDir = path.resolve(__dirname, './src/Graphql/wordpressCMS/flexibleFragments');
const generatedTypesFilePath = path.resolve(__dirname, './src/Graphql/generated.tsx'); // Path to generated.tsx
const generatedTypesFileAlias = '@/Graphql/generated'; // Correct alias for the generated.tsx file

// Get all fragment files dynamically from the fragments directory
const fragmentFiles = fs.readdirSync(fragmentsDir).filter((file) => file.endsWith('Fragment.ts'));

// Function to extract full type definition from generated.tsx
const extractFieldsFromGeneratedTypes = (fragmentType) => {
	const generatedFileContent = fs.readFileSync(generatedTypesFilePath, 'utf-8');

	// Match the type definition in generated.tsx for the fragment
	const typeRegex = new RegExp(`export type ${fragmentType} = {([^}]+)};`, 'gs');
	const typeMatch = generatedFileContent.match(typeRegex);

	if (typeMatch) {
		const typeContent = typeMatch[1];

		// Extract field names from the type definition
		const fields = typeContent
			.match(/\b\w+\??:/g)
			.map((field) => field.replace(/[:?]/g, ''))
			.filter((field) => field !== '__typename');

		return fields.length > 0 ? fields : null;
	}

	return null;
};

// Generate folder structure and files for each block
fragmentFiles.forEach((fragmentFile) => {
	const fragmentName = fragmentFile.replace('Fragment.ts', 'Fragment');
	const blockName = fragmentName.replace('Fragment', 'Block');
	const fragmentType = `${fragmentName}Fragment`; // Use fragment type from the generated types file
	const folderPath = path.join(flexibleBlocksDir, blockName);

	// Check if the block folder already exists
	if (fs.existsSync(folderPath)) {
		console.log(`Skipping ${blockName}: folder already exists.`);
		return; // Skip the block if the folder already exists
	}

	// Create folder for the block
	fs.mkdirSync(folderPath, { recursive: true });
	console.log(`Created folder: ${folderPath}`);

	// Extract fields for the block from generated.tsx
	const fields = extractFieldsFromGeneratedTypes(fragmentType);

	// Generate destructuring code dynamically based on extracted fields
	const destructuringCode = fields ? `const { ${fields.join(', ')} } = data.contentFields || {};` : '// No recognizable content field found';

	// Create .tsx file for the block
	const blockFilePath = path.join(folderPath, `${blockName}.tsx`);
	if (!fs.existsSync(blockFilePath)) {
		const blockFileContent = `
import { ${fragmentName} } from '@/Graphql/wordpressCMS/flexibleFragments/${fragmentName}';
import { I${blockName} } from './I${blockName}';
import { IFlexibleBlock } from '@/Components/FlexibleBlocks/IFlexibleBlock';

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

	// Create interface .ts file for the block
	const interfaceFilePath = path.join(folderPath, `I${blockName}.ts`);
	if (!fs.existsSync(interfaceFilePath)) {
		const interfaceFileContent = `
import { ${fragmentType} } from '${generatedTypesFileAlias}';

// Interface for ${blockName} block data
export interface I${blockName} extends ${fragmentType} {
    // You can add custom fields here if necessary, or customize existing ones
}
`;

		fs.writeFileSync(interfaceFilePath, interfaceFileContent.trim());
		console.log(`Created file: ${interfaceFilePath}`);
	} else {
		console.log(`Skipping ${interfaceFilePath}: file already exists.`);
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
