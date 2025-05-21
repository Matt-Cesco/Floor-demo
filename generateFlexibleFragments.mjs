import fs from "fs-extra";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// WordPress GraphQL endpoint (this need to be refactored using the env file)
const GRAPHQL_ENDPOINT = "https://cms-matteo.barques.dev/graphql";

// Folder where fragments will be stored
const FRAGMENTS_FOLDER = path.resolve(__dirname, "src/Graphql/wordpressCMS/flexibleFragments");

// Include mimeType in mediaItemFields
const mediaItemFields = `
  ...mediaItem
`;

// Helper function to detect if a field has "nodes", "edges", or "node"
const isMediaField = (schemaFieldType) => {
    if (!schemaFieldType || !schemaFieldType.fields) return false;
    const hasNodeField = schemaFieldType.fields.some((f) => f.name === "node");
    const hasNodesField = schemaFieldType.fields.some((f) => f.name === "nodes");
    const hasEdgesField = schemaFieldType.fields.some((f) => f.name === "edges");
    return { hasNodeField, hasNodesField, hasEdgesField };
};

// Helper function to recursively query sub-fields, including repeaters (lists)
const getFieldString = (field, schemaTypes, visitedTypes = new Set()) => {
    const schemaFieldType = schemaTypes.find(
        (type) => type.name === field.type.name || type.name === field.type.ofType?.name || type.name === field.type.ofType?.ofType?.name
    );

    // If we encounter a circular reference or scalar type, stop recursion
    if (!schemaFieldType || visitedTypes.has(schemaFieldType.name)) {
        return field.name;
    }

    // Mark this type as visited to avoid circular references
    visitedTypes.add(schemaFieldType.name);

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

    // Handle fields containing "link" (case-insensitive) to add target, title, and url
    if (field.name.toLowerCase().includes("link")) {
        return `${field.name} {
      target
      title
      url
    }`;
    }

    // Handle fields containing "image" (case-insensitive)
    if (field.name.toLowerCase().includes("image")) {
        // Check if the field type is MediaItem or if it has an "id" field
        if (schemaFieldType.name === "MediaItem" || schemaFieldType.fields?.some((f) => f.name === "id")) {
            return `${field.name} {
        ${mediaItemFields}
      }`;
        } else if (schemaFieldType.fields) {
            const subFields = schemaFieldType.fields.map((subField) => getFieldString(subField, schemaTypes, new Set(visitedTypes))).join("\n      ");
            return `${field.name} {
        ${subFields}
      }`;
        }
    }

    // Process sub-fields for other cases
    if (schemaFieldType.fields) {
        const subFields = schemaFieldType.fields.map((subField) => getFieldString(subField, schemaTypes, new Set(visitedTypes))).join("\n      ");

        // Handle lists (repeaters)
        if (field.type.kind === "LIST") {
            return `${field.name} {
        ${subFields}
      }`;
        } else {
            return `${field.name} {
        ${subFields}
      }`;
        }
    } else {
        return field.name;
    }
};

// Template for the GraphQL fragment file
const generateFragmentTemplate = (blockName, fields, schemaTypes) => {
    // Remove the 'FlexibleContentFlexibleContentBlock' and 'Layout' parts from the blockName
    const simplifiedName = blockName
        .replace("FlexibleContentFlexibleContentBlock", "")
        .replace("Layout", "");

    // Recursively get all fields, including sub-fields and repeaters
    const fieldStrings = fields.map((field) => getFieldString(field, schemaTypes)).join("\n    ");

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
                ofType {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    });

    const result = await response.json();
    const types = result.data.__schema.types;

    // Filter for flexible content block types and exclude types with '_Fields' suffix
    const blockTypes = types.filter(
        (type) => type.name.startsWith("FlexibleContentFlexibleContentBlock") && !type.name.endsWith("_Fields") && type.fields && type.fields.length > 0
    );

    return { blockTypes, schemaTypes: types };
};

// Generate fragment files for each block type
const generateFragmentFiles = async () => {
    const { blockTypes, schemaTypes } = await fetchBlockTypes();

    // This will ensure the fragment folder exists
    fs.ensureDirSync(FRAGMENTS_FOLDER);

    blockTypes.forEach((block) => {
        const blockName = block.name;
        const fields = block.fields;

        const fragmentContent = generateFragmentTemplate(blockName, fields, schemaTypes);
        const simplifiedName = blockName.replace("FlexibleContentFlexibleContentBlock", "").replace("Layout", "");

        const fragmentFilePath = path.join(FRAGMENTS_FOLDER, `${simplifiedName}Fragment.ts`);

        // Then, Overwrite existing files to ensure mimeType is included
        fs.writeFileSync(fragmentFilePath, fragmentContent);
        console.log(`Generated fragment file for block: ${blockName}`);
    });
};

generateFragmentFiles()
    .then(() => console.log("Fragments generated successfully!"))
    .catch((err) => console.error("Error generating fragments:", err));
