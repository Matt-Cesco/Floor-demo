// codegen.ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: process.env.WORDPRESS_GRAPHQL_URL,
    documents: "src/Graphql/wordpressCMS/**/*.ts",
    generates: {
        "src/Graphql/generated.tsx": {
            plugins: [
                "typescript",
                "typescript-operations",
                // add this if you still want React Apollo hooks:
                // "typescript-react-apollo"
            ],
            config: {
                withHooks: false,
                withComponent: false,
                withHOC: false,
            },
        },
        "./graphql.schema.json": {
            plugins: ["introspection"],
        },
    },
};

export default config;
