import { gql } from '@apollo/client';
import cmsClient from '../client/cmsClient';

export const getThemeOptions = async () => {
    try {
        let response = await cmsClient.query({
            query: gql`
                query GetThemeOptions {
                    themeOptions {
                        themeOptionsFields {
                            address
                            email
                            footerText
                        }
                    }
                }
            `,
        });

        console.log(response);
        return response.data.themeOptions;

    } catch (error) {
        console.error("Error fetching theme options:", error);
        return null;  // Return null or handle the error as needed
    }
};
