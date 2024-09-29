const fs = require('fs-extra');
const path = require('path');

// Use Node.js built-in fetch API for GraphQL requests
const fetch = require('node-fetch');

// WordPress GraphQL endpoint
const GRAPHQL_ENDPOINT = 'https://cms-matteo.barques.dev/graphql';

// Folder where fragments will be stored
const FRAGMENTS_FOLDER = path.resolve(__dirname, 'src/Graphql/wordpressCMS/flexibleFragments');

// Template for the GraphQL fragment file
const generateFragmentTemplate = (blockName, fields) => {
	// Remove the 'FlexibleContentFlexibleContentBlock' and 'Layout' parts from the blockName
	const simplifiedName = blockName
		.replace('FlexibleContentFlexibleContentBlock', '') // Remove prefix
		.replace('Layout', ''); // Remove 'Layout'

	return `import { gql } from '@apollo/client';

export const ${simplifiedName}Fragment = gql\`
  fragment ${simplifiedName}Fragment on ${blockName} {
    __typename
    ${fields.join('\n    ')}
  }
\`;
  `;
}; // <-- This closing bracket was missing

// Fetch all available flexible content block types from WordPress GraphQL schema
const fetchBlockTypes = async () => {
	const query = `
    {
      __schema {
        types {
          name
          fields {
            name
            type {
              name
              kind
            }
          }
        }
      }
    }
  `;

	const response = await fetch(GRAPHQL_ENDPOINT, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query }),
	});

	const result = await response.json();
	const types = result.data.__schema.types;

	// Filter for flexible content block types and exclude types with '_Fields' suffix
	const blockTypes = types.filter(
		(type) => type.name.startsWith('FlexibleContentFlexibleContentBlock') && !type.name.endsWith('_Fields') && type.fields.length > 0
	);

	return blockTypes;
};

// Generate fragment files for each block type
const generateFragmentFiles = async () => {
	const blockTypes = await fetchBlockTypes();

	// Ensure the fragment folder exists
	fs.ensureDirSync(FRAGMENTS_FOLDER);

	blockTypes.forEach((block) => {
		const blockName = block.name;
		const fields = block.fields.map((field) => field.name);

		const fragmentContent = generateFragmentTemplate(blockName, fields);
		const simplifiedName = blockName
			.replace('FlexibleContentFlexibleContentBlock', '') // Remove prefix
			.replace('Layout', ''); // Remove 'Layout'

		const fragmentFilePath = path.join(FRAGMENTS_FOLDER, `${simplifiedName}Fragment.ts`);

		// Check if the file already exists
		if (fs.existsSync(fragmentFilePath)) {
			console.log(`File ${simplifiedName}Fragment.ts already exists, skipping...`);
		} else {
			// Write the fragment file if it does not exist
			fs.writeFileSync(fragmentFilePath, fragmentContent);
			console.log(`Generated fragment file for block: ${blockName}`);
		}
	});
};

// Run the script
generateFragmentFiles()
	.then(() => console.log('Fragments generated successfully!'))
	.catch((err) => console.error('Error generating fragments:', err));
