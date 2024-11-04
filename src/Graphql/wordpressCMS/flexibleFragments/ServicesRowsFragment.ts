import { gql } from '@apollo/client';

export const ServicesRowsFragment = gql`
	fragment ServicesRowsFragment on FlexibleContentFlexibleContentBlockServicesRowsLayout {
		__typename
		servicesRowsFields {
			heading {
				headingTag
				headingText
			}
			servicesRowsCards {
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
				projectPageLink {
					target
					title
					url
				}
				serviceNumber
				serviceTitle
			}
			sideLeftText
			text
		}
	}
`;
