// Interface for NewsSliderBlock block data
export default interface INewsSliderBlock {
	__typename: 'FlexibleContentFlexibleContentBlockNewsSliderLayout';
	newsFields?: {
		__typename?: 'FlexibleContentFlexibleNewsFields';
		title?: string | null;
		link?: { __typename?: 'AcfLink'; target?: string | null; title?: string | null; url?: string | null } | null;
	} | null;
}
