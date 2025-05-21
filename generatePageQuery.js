const fs = require("fs");
const path = require("path");

// Firstable, you need to go in wordpress under graphql and tick on enable public introspection

// Define the path to the flexible fragments directory
const fragmentDirectory = path.resolve(__dirname, "./src/Graphql/wordpressCMS/flexibleFragments");

// Define the output path for the generated query file
const outputPath = path.resolve(__dirname, "./src/Graphql/wordpressCMS/getPageBySlug.ts");

// Get all fragment files in the directory
const fragmentFiles = fs.readdirSync(fragmentDirectory).filter((file) => file.endsWith("Fragment.ts"));

// Generate imports for each fragment
const importStatements = fragmentFiles
    .map((file) => {
        const fragmentName = file.replace("Fragment.ts", "Fragment");
        return `import { ${fragmentName} } from '@/Graphql/wordpressCMS/flexibleFragments/${fragmentName}';`;
    })
    .join("\n");

// Add the import statement for mediaItem
const mediaItemImportStatement = `import { mediaItem } from '@/Graphql/wordpressCMS/fragments/mediaItem';`;

// Generate the dynamic query string with all fragments, including mediaItem
const fragmentStrings = [`\${mediaItem}`].concat(fragmentFiles.map((file) => `\${${file.replace("Fragment.ts", "Fragment")}}`)).join("\n");

// Generate the spread fragments inside the query
const spreadFragments = fragmentFiles.map((file) => `...${file.replace("Fragment.ts", "Fragment")}`).join("\n");

// Define the contents of the generated file with error handling
const fileContent = `
import { gql } from '@apollo/client';
import cmsClient from '@/Graphql/client/cmsClient';
${mediaItemImportStatement}
${importStatements}

export const getPageBySlug = async (slug: string) => {
    try {
        const response = await cmsClient.query({
            query: gql\`
                ${fragmentStrings}
                query GetPageBySlug(\$slug: ID!) {
                    page(id: \$slug, idType: URI) {
                        id
                        title
                        flexibleContent {
                            flexible {
                                ${spreadFragments}
                            }
                        }
                    }
                }
            \`,
            variables: {
                slug,
            },
        });

        // Check for GraphQL errors
        if (response.errors && response.errors.length > 0) {
            console.error('GraphQL Errors:', response.errors);
            console.error(\`GraphQL error: \${response.errors[0].message}\`);
        }

        // Check if the page data exists
        if (!response.data || !response.data.page) {
            console.error('No page data returned:', response);
            console.error(\`No page found with slug "\${slug}".\`);
        }

        return response.data.page;
    } catch (error: unknown) {
        console.error('Error fetching page by slug:', {
            slug,
            error,
        });

        if (error instanceof Error) {
            // Re-throw the error with additional context if needed
            console.error(\`Failed to fetch page with slug \${slug}: \${error.message}\`);
        } else {
            // Handle non-Error objects
            console.error(\`Failed to fetch page with slug \${slug} due to an unknown error.\`);
        }
    }
};
`;

// Write (or overwrite) the generated content to the getPageBySlug.ts file
fs.writeFileSync(outputPath, fileContent.trim());
console.log("getPageBySlug.ts file generated and overwritten successfully!");
