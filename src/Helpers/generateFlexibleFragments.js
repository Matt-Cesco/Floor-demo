const fs = require('fs-extra');
const path = require('path');

// Use Node.js built-in fetch API for GraphQL requests
const fetch = require('node-fetch');

// WordPress GraphQL endpoint
const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_CMS_API_URL || 'https://your-wordpress-site/graphql';

// Folder where fragments will be stored
const FRAGMENTS_FOLDER = path.resolve(__dirname, 'src/graphql/flexibleFragments');

// Template for the GraphQL fragment file
const generateFragmentTemplate = (blockName, fields) => {
	return `import { gql } from '@apollo/client';

export const ${blockName}Fragment = gql\`
  fragment ${blockName}Fragment on ${blockName} {
    __typename
    ${fields.join('\n    ')}
  }
\`;
`;
};

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

	// Filter for flexible content block types (based on your naming convention)
	const blockTypes = types.filter((type) => type.name.startsWith('FlexibleContent'));

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
		const fragmentFilePath = path.join(FRAGMENTS_FOLDER, `${blockName}Fragment.ts`);

		// Write the fragment file
		fs.writeFileSync(fragmentFilePath, fragmentContent);
		console.log(`Generated fragment file for block: ${blockName}`);
	});
};

// Run the script
generateFragmentFiles()
	.then(() => console.log('Fragments generated successfully!'))
	.catch((err) => console.error('Error generating fragments:', err));
