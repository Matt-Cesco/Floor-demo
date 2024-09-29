const fs = require('fs-extra');
const path = require('path');

// Use Node.js built-in fetch API for GraphQL requests
const fetch = require('node-fetch');

// WordPress GraphQL endpoint
const GRAPHQL_ENDPOINT = 'https://cms-matteo.barques.dev/graphql';

// Folder where fragments will be stored
const FRAGMENTS_FOLDER = path.resolve(__dirname, 'src/Graphql/wordpressCMS/flexibleFragments');

// MediaItem fragment template to be used when node has MediaItem type
const mediaItemFragment = `
  node {
    ...mediaItem
  }
`;

// Helper function to recursively query sub-fields, including repeaters (lists)
// and applying the mediaItem fragment when necessary for fields that contain MediaItem
const getFieldString = (field, schemaTypes, visitedTypes = new Set()) => {
  const schemaFieldType = schemaTypes.find(type => type.name === field.type.name || type.name === field.type.ofType?.name);

  // If we encounter a circular reference, stop recursion
  if (!schemaFieldType || visitedTypes.has(schemaFieldType.name)) {
    return field.name; // Return field name if circular or scalar
  }

  // Mark this type as visited
  visitedTypes.add(schemaFieldType.name);

  // Check if the field contains a node of type MediaItem (e.g., for image or backgroundImage)
  if (schemaFieldType.fields && schemaFieldType.fields.some(subField => subField.name === 'node')) {
    const nodeField = schemaFieldType.fields.find(subField => subField.name === 'node');
    const nodeType = schemaTypes.find(type => type.name === 'MediaItem');
    if (nodeField && nodeType) {
      // Return the mediaItem fragment for any field containing a node of type MediaItem
      return `${field.name} {
        ${mediaItemFragment}
      }`;
    }
  }

  if (schemaFieldType.fields) {
    // Recursively add sub-fields
    const subFields = schemaFieldType.fields.map(subField => getFieldString(subField, schemaTypes, visitedTypes)).join('\n      ');
    
    // Check if the field is a list (repeater)
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
    // It's a scalar type or has no sub-fields
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
  const fieldStrings = fields.map(field => getFieldString(field, schemaTypes)).join('\n    ');

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
    (type) =>
      type.name.startsWith('FlexibleContentFlexibleContentBlock') && !type.name.endsWith('_Fields') && type.fields.length > 0
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
