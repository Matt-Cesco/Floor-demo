const fs = require('fs-extra');
const path = require('path');

// Use Node.js built-in fetch API for GraphQL requests
const fetch = require('node-fetch');

// WordPress GraphQL endpoint
const GRAPHQL_ENDPOINT = 'https://cms-matteo.barques.dev/graphql';

// Folder where fragments will be stored
const FRAGMENTS_FOLDER = path.resolve(__dirname, 'src/Graphql/wordpressCMS/flexibleFragments');

// MediaItem fields directly inserted
const mediaItemFields = `
  id
  altText
  mediaItemUrl
  title
  mediaDetails {
    height
    width
  }
  srcSet
`;

// Helper function to detect if a field has "nodes", "edges", or "node"
const isMediaField = (schemaFieldType) => {
	if (!schemaFieldType || !schemaFieldType.fields) return false; // Ensure schemaFieldType and fields exist
	const hasNodeField = schemaFieldType.fields.some((f) => f.name === 'node');
	const hasNodesField = schemaFieldType.fields.some((f) => f.name === 'nodes');
	const hasEdgesField = schemaFieldType.fields.some((f) => f.name === 'edges');
	return { hasNodeField, hasNodesField, hasEdgesField };
};

// Helper function to recursively query sub-fields, including repeaters (lists)
const getFieldString = (field, schemaTypes, visitedTypes = new Set()) => {
	const schemaFieldType = schemaTypes.find(
		(type) => type.name === field.type.name || type.name === field.type.ofType?.name || type.name === field.type.ofType?.ofType?.name // Handle nested ofType
	);

	// If we encounter a circular reference or scalar type, stop recursion
	if (!schemaFieldType || visitedTypes.has(schemaFieldType.name)) {
		return field.name;
	}

	// Mark this type as visited to avoid circular references
	visitedTypes.add(schemaFieldType.name);

	// Dynamically handle media fields with "node", "nodes", or "edges"
	const { hasNodeField, hasNodesField, hasEdgesField } = isMediaField(schemaFieldType);

	if (hasNodesField) {
		return `${field.name} {
      nodes {
        ${mediaItemFields}
      }
    }`;
	}

	if (hasEdgesField) {
		return `${field.name} {
      edges {
        node {
          ${mediaItemFields}
        }
      }
    }`;
	}

	if (hasNodeField) {
		return `${field.name} {
      node {
        ${mediaItemFields}
      }
    }`;
	}

	// Handle fields containing "Link" (case-insensitive) to add target, title, and url
	if (field.name.toLowerCase().includes('link')) {
		return `${field.name} {
      target
      title
      url
    }`;
	}

	// Handle fields containing "Image" (case-insensitive) that are not media fields
	if (field.name.toLowerCase().includes('image')) {
		// Check if the field type is MediaItem or if it has "id" field (simplified check)
		if (schemaFieldType.name === 'MediaItem' || schemaFieldType.fields?.some((f) => f.name === 'id')) {
			return `${field.name} {
        ${mediaItemFields}
      }`;
		} else if (schemaFieldType.fields) {
			// Recursively process sub-fields
			const subFields = schemaFieldType.fields.map((subField) => getFieldString(subField, schemaTypes, new Set(visitedTypes))).join('\n      ');
			return `${field.name} {
        ${subFields}
      }`;
		}
	}

	// Process sub-fields for other cases
	if (schemaFieldType.fields) {
		const subFields = schemaFieldType.fields.map((subField) => getFieldString(subField, schemaTypes, new Set(visitedTypes))).join('\n      ');

		// Handle lists (repeaters)
		if (field.type.kind === 'LIST') {
			return `${field.name} {
        ${subFields}
      }`;
		} else {
			return `${field.name} {
        ${subFields}
      }`;
		}
	} else {
		// Scalar type or no sub-fields
		return field.name;
	}
};

// Template for the GraphQL fragment file
const generateFragmentTemplate = (blockName, fields, schemaTypes) => {
	// Remove the 'FlexibleContentFlexibleContentBlock' and 'Layout' parts from the blockName
	const simplifiedName = blockName
		.replace('FlexibleContentFlexibleContentBlock', '') // Remove prefix
		.replace('Layout', ''); // Remove 'Layout'

	// Recursively get all fields, including sub-fields and repeaters
	const fieldStrings = fields.map((field) => getFieldString(field, schemaTypes)).join('\n    ');

	return `import { gql } from '@apollo/client';

export const ${simplifiedName}Fragment = gql\`
  fragment ${simplifiedName}Fragment on ${blockName} {
    __typename
    ${fieldStrings}
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
              ofType {
                name
              }
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
		(type) => type.name.startsWith('FlexibleContentFlexibleContentBlock') && !type.name.endsWith('_Fields') && type.fields && type.fields.length > 0 // Ensure fields exist and are not empty
	);

	return { blockTypes, schemaTypes: types };
};

// Generate fragment files for each block type
const generateFragmentFiles = async () => {
	const { blockTypes, schemaTypes } = await fetchBlockTypes();

	// Ensure the fragment folder exists
	fs.ensureDirSync(FRAGMENTS_FOLDER);

	blockTypes.forEach((block) => {
		const blockName = block.name;
		const fields = block.fields;

		const fragmentContent = generateFragmentTemplate(blockName, fields, schemaTypes);
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
