import { gql } from '@apollo/client';

export const FaqsFragment = gql`
	fragment FaqsFragment on FlexibleContentFlexibleContentBlockFaqsLayout {
		__typename
		faqFields {
			cta {
				link {
					target
					title
					url
				}
				text
				title
			}
			faqs {
				text
				title
			}
			text
			title
		}
	}
`;
