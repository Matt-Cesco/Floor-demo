const fs = require("fs");
const path = require("path");

// 1) Paths
const fragmentDirectory = path.resolve(__dirname, "./src/Graphql/wordpressCMS/flexibleFragments");
const outputPath = path.resolve(__dirname, "./src/Graphql/wordpressCMS/getACFBySlug.ts");
const mediaItemImportStatement = `import { mediaItem } from '@/Graphql/wordpressCMS/fragments/mediaItem';`;

// 2) Collect all fragment files ending with "Fragment.ts"
const fragmentFiles = fs.readdirSync(fragmentDirectory).filter((file) => file.endsWith("Fragment.ts"));

// 3) Create import lines
const importStatements = fragmentFiles
    .map((file) => {
        const fragmentName = file.replace("Fragment.ts", "Fragment");
        return `import { ${fragmentName} } from '@/Graphql/wordpressCMS/flexibleFragments/${fragmentName}';`;
    })
    .join("\n");

// 4) Gather all fragment placeholders for injection
//    This is what's inserted above the query so GraphQL recognizes them.
const fragmentStrings = ["${mediaItem}", ...fragmentFiles.map((file) => "${" + file.replace("Fragment.ts", "Fragment") + "}")].join("\n");

// 5) Create the inline spread code to attach each fragment inside `flexible { ... }`
const spreadFragments = fragmentFiles.map((file) => `...${file.replace("Fragment.ts", "Fragment")}`).join("\n");

// 6) Build the final TypeScript file content
//    This file exports: buildGetACFQuery(), getACFBySlug()
const fileContent = `
// ******************************
// **** AUTO-GENERATED FILE ****
// DO NOT MODIFY DIRECTLY
// ******************************

import { gql } from "@apollo/client";
import cmsClient from "@/Graphql/client/cmsClient";
${mediaItemImportStatement}
${importStatements}

/**
 * Build a GraphQL query dynamically using postType and optional customFields.
 * This query will pull in all flexible block fragments, so any post type with 
 * flexibleContent can be queried with the same function.
 */
function buildGetACFQuery(postType: string, customFields?: string) {
  return gql\`
    ${fragmentStrings}
    query GetACFBySlug(\$slug: ID!) {
      \${postType}(id: \$slug, idType: URI) {
        id
        title
        flexibleContent {
          flexible {
            __typename
            ${spreadFragments}
          }
        }
        \${customFields || ""}
      }
    }
  \`;
}

/**
 * A universal fetcher for WordPress post types that share flexibleContent.
 * @param slug - e.g. "/my-page/", "my-page", etc.
 * @param postType - e.g. "page", "service", "banner", "post", "product", etc.
 * @param customFields - extra fields unique to this query, inline in the GraphQL.
 */
export async function getACFBySlug(
  slug: string,
  postType: string = "page",
  customFields?: string
) {
  try {
    const QUERY = buildGetACFQuery(postType, customFields);
    const response = await cmsClient.query({
      query: QUERY,
      variables: { slug },
    });

    if (response.errors && response.errors.length > 0) {
      console.error("GraphQL Errors:", response.errors);
      console.error(\`GraphQL error: \${response.errors[0].message}\`);
    }

    // Check if the postType data exists
    if (!response.data || !response.data[postType]) {
      console.error(\`No data returned for postType "\${postType}" with slug "\${slug}".\`);
      return null;
    }
    return response.data[postType];
  } catch (error: unknown) {
    console.error("Error fetching data by slug:", { slug, postType, error });
    return null;
  }
}
`.trim();

// 7) Write (or overwrite) the generated file
fs.writeFileSync(outputPath, fileContent);
console.log("getACFBySlug.ts file generated successfully!");
