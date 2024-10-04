// Interface for WysiwygBlock block data
export default interface IWysiwygBlock {
	__typename: 'FlexibleContentFlexibleContentBlockWysiwygLayout';
	content?: Array<
		| { __typename?: 'FlexibleContentFlexibleContentGalleryLayout'; fieldGroupName?: string | null }
		| { __typename?: 'FlexibleContentFlexibleContentIntroTextLayout'; fieldGroupName?: string | null }
		| { __typename?: 'FlexibleContentFlexibleContentSingleImageLayout'; fieldGroupName?: string | null }
		| { __typename?: 'FlexibleContentFlexibleContentTextImageLayout'; fieldGroupName?: string | null }
		| { __typename?: 'FlexibleContentFlexibleContentTextLayout'; fieldGroupName?: string | null }
		| { __typename?: 'FlexibleContentFlexibleContentTitleLayout'; fieldGroupName?: string | null }
		| { __typename?: 'FlexibleContentFlexibleContentTwoImagesLayout'; fieldGroupName?: string | null }
		| null
	> | null;
}
