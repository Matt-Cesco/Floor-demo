import { gql } from '@apollo/client';
import cmsClient from '@/Graphql/client/cmsClient';

import { CallToActionFragment } from '@/Graphql/wordpressCMS/flexibleFragments/CallToActionFragment';
import { DefaultFragment } from '@/Graphql/wordpressCMS/flexibleFragments/DefaultFragment';
import { FaqsFragment } from '@/Graphql/wordpressCMS/flexibleFragments/FaqsFragment';
import { HighlightBlockFragment } from '@/Graphql/wordpressCMS/flexibleFragments/HighlightBlockFragment';
import { HighlightMultipleBlocksFragment } from '@/Graphql/wordpressCMS/flexibleFragments/HighlightMultipleBlocksFragment';
import { InfoCardSingleFragment } from '@/Graphql/wordpressCMS/flexibleFragments/InfoCardSingleFragment';
import { LogosFragment } from '@/Graphql/wordpressCMS/flexibleFragments/LogosFragment';
import { MultipleImagesFragment } from '@/Graphql/wordpressCMS/flexibleFragments/MultipleImagesFragment';
import { NewsSliderFragment } from '@/Graphql/wordpressCMS/flexibleFragments/NewsSliderFragment';
import { SimpleFragment } from '@/Graphql/wordpressCMS/flexibleFragments/SimpleFragment';
import { WysiwygFragment } from '@/Graphql/wordpressCMS/flexibleFragments/WysiwygFragment';

export const getPageBySlug = async (slug: string) => {
	try {
		const response = await cmsClient.query({
			query: gql`
				${CallToActionFragment}
				${DefaultFragment}
				${FaqsFragment}
				${HighlightBlockFragment}
				${HighlightMultipleBlocksFragment}
				${InfoCardSingleFragment}
				${LogosFragment}
				${MultipleImagesFragment}
				${NewsSliderFragment}
				${SimpleFragment}
				${WysiwygFragment}
				query GetPageBySlug($slug: ID!) {
					page(id: $slug, idType: URI) {
						id
						title
						flexibleContent {
							flexible {
								...CallToActionFragment
								...DefaultFragment
								...FaqsFragment
								...HighlightBlockFragment
								...HighlightMultipleBlocksFragment
								...InfoCardSingleFragment
								...LogosFragment
								...MultipleImagesFragment
								...NewsSliderFragment
								...SimpleFragment
								...WysiwygFragment
							}
						}
					}
				}
			`,
			variables: {
				slug,
			},
		});

		// Check for GraphQL errors
		if (response.errors && response.errors.length > 0) {
			console.error('GraphQL Errors:', response.errors);
			throw new Error(`GraphQL error: ${response.errors[0].message}`);
		}

		// Check if the page data exists
		if (!response.data || !response.data.page) {
			console.error('No page data returned:', response);
			throw new Error(`No page found with slug "${slug}".`);
		}

		return response.data.page;
	} catch (error: unknown) {
			console.error('Error fetching page by slug:', error);

			// Check if error is an instance of Error before accessing `message`
			if (error instanceof Error) {
				// Re-throw the error with additional context if needed
				throw new Error(`Failed to fetch page with slug "${slug}": ${error.message}`);
			} else {
				// Handle non-Error objects
				throw new Error(`Failed to fetch page with slug "${slug}" due to an unknown error.`);
			}
		}
};
