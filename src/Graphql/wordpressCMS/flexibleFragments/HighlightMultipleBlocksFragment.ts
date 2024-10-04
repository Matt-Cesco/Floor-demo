import { gql } from '@apollo/client';

export const HighlightMultipleBlocksFragment = gql`
	fragment HighlightMultipleBlocksFragment on FlexibleContentFlexibleContentBlockHighlightMultipleBlocksLayout {
		__typename
		multipleHighlightFields {
			blocks {
				image {
					node {
						id
						altText
						mediaItemUrl
						title
						mediaDetails {
							height
							width
						}
						srcSet
					}
				}
				link {
					target
					title
					url
				}
				text
				title
			}
			layoutOptions {
				backgroundColorOptions
			}
		}
	}
`;
