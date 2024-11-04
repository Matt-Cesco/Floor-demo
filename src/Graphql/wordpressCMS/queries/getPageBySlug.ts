import { gql } from '@apollo/client';
import cmsClient from '@/Graphql/client/cmsClient';

import { BigCenterHeadingFragment } from '@/Graphql/wordpressCMS/flexibleFragments/BigCenterHeadingFragment';
import { BigParagraphFragment } from '@/Graphql/wordpressCMS/flexibleFragments/BigParagraphFragment';
import { CallToActionFragment } from '@/Graphql/wordpressCMS/flexibleFragments/CallToActionFragment';
import { DefaultFragment } from '@/Graphql/wordpressCMS/flexibleFragments/DefaultFragment';
import { ImageTextFragment } from '@/Graphql/wordpressCMS/flexibleFragments/ImageTextFragment';
import { InfiniteScrollTextFragment } from '@/Graphql/wordpressCMS/flexibleFragments/InfiniteScrollTextFragment';
import { MultipleImagesFragment } from '@/Graphql/wordpressCMS/flexibleFragments/MultipleImagesFragment';
import { SelectedWorkFragment } from '@/Graphql/wordpressCMS/flexibleFragments/SelectedWorkFragment';
import { ServicesRowsFragment } from '@/Graphql/wordpressCMS/flexibleFragments/ServicesRowsFragment';

export const getPageBySlug = async (slug: string) => {
	try {
		const response = await cmsClient.query({
			query: gql`
				${BigCenterHeadingFragment}
				${BigParagraphFragment}
				${CallToActionFragment}
				${DefaultFragment}
				${ImageTextFragment}
				${InfiniteScrollTextFragment}
				${MultipleImagesFragment}
				${SelectedWorkFragment}
				${ServicesRowsFragment}
				query GetPageBySlug($slug: ID!) {
					page(id: $slug, idType: URI) {
						id
						title
						flexibleContent {
							flexible {
								...BigCenterHeadingFragment
								...BigParagraphFragment
								...CallToActionFragment
								...DefaultFragment
								...ImageTextFragment
								...InfiniteScrollTextFragment
								...MultipleImagesFragment
								...SelectedWorkFragment
								...ServicesRowsFragment
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

		if (error instanceof Error) {
			// Re-throw the error with additional context if needed
			throw new Error(`Failed to fetch page with slug "${slug}": ${error.message}`);
		} else {
			// Handle non-Error objects
			throw new Error(`Failed to fetch page with slug "${slug}" due to an unknown error.`);
		}
	}
};
