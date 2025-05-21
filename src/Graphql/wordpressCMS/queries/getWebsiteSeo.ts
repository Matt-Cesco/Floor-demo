import { gql } from "@apollo/client";
import cmsClient from "@/Graphql/client/cmsClient";

export const getWebsiteSeo = async () => {
    try {
        const response = await cmsClient.query({
            query: gql`
                query GetWebsiteSeo {
                    websiteSEO {
                        siteSeo {
                            googleTagManager
                            googleVerification
                        }
                    }
                }
            `,
        });

        return response.data.websiteSEO;
    } catch (error: unknown) {
        console.error("Error fetching website SEO:", error);

        if (error instanceof Error) {
            console.error(`Failed to fetch website SEO: ${error.message}`);
        } else {
            console.error("Failed to fetch website SEO due to an unknown error.");
        }
    }
};
