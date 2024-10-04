// Interface for FaqsBlock block data
export default interface IFaqsBlock {
	__typename: 'FlexibleContentFlexibleContentBlockFaqsLayout';
	faqFields?: {
		__typename?: 'FlexibleContentFlexibleFaqFields';
		text?: string | null;
		title?: string | null;
		cta?: {
			__typename?: 'FlexibleContentFlexibleFaqFieldsCta';
			text?: string | null;
			title?: string | null;
			link?: { __typename?: 'AcfLink'; target?: string | null; title?: string | null; url?: string | null } | null;
		} | null;
		faqs?: Array<{ __typename?: 'FlexibleContentFlexibleFaqFieldsFaqs'; text?: string | null; title?: string | null } | null> | null;
	} | null;
}
