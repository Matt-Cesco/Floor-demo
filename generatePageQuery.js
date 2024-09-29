const fs = require('fs');
const path = require('path');

// Define the path to the flexible fragments directory src\Graphql\wordpressCMS\flexibleFragments
const fragmentDirectory = path.resolve(__dirname, './src/Graphql/wordpressCMS/flexibleFragments');

// Define the output path for the generated query file
const outputPath = path.resolve(__dirname, './src/Graphql/wordpressCMS/getPageBySlug.ts');

// Get all fragment files in the directory
const fragmentFiles = fs.readdirSync(fragmentDirectory).filter((file) => file.endsWith('Fragment.ts'));

// Generate imports for each fragment
const importStatements = fragmentFiles
  .map((file) => {
    const fragmentName = file.replace('Fragment.ts', 'Fragment');
    return `import { ${fragmentName} } from '@/Graphql/wordpressCMS/flexibleFragments/${fragmentName}';`;
  })
  .join('\n');

// Generate the dynamic query string with all fragments
const fragmentStrings = fragmentFiles.map((file) => `\${${file.replace('Fragment.ts', 'Fragment')}}`).join('\n');

// Define the contents of the generated file
const fileContent = `
import { gql } from '@apollo/client';
import cmsClient from '@/Graphql/client/cmsClient';

${importStatements}

export const getPageBySlug = async (slug: string) => {
    const response = await cmsClient.query({
        query: gql\`
            ${fragmentStrings}
            query GetPageBySlug(\$slug: ID! = "\${slug}") {
                page(id: \$slug, idType: URI) {
                    title
                    flexibleContent {
                        flexible {
                            ${fragmentFiles.map(file => `...${file.replace('Fragment.ts', 'Fragment')}`).join('\n')}
                        }
                    }
                }
            }
        \`,
    });

    return response.data.page;
};
`;

// Write (or overwrite) the generated content to the getPageBySlug.ts file
fs.writeFileSync(outputPath, fileContent);
console.log('getPageBySlug.ts file generated and overwritten successfully!');
