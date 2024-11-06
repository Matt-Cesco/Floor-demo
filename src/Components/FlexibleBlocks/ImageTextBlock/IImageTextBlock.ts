// Interface for ImageTextBlock block data
import { VariationsOptions } from './ImageTextBlockOptionsEnum';
import { MediaItem } from '@/Graphql/generated';
export default interface IImageTextBlock {
	__typename: 'FlexibleContentFlexibleContentBlockImageTextLayout';
	imageTextFields?: {
		__typename?: 'FlexibleContentFlexibleImageTextFields';
		textFirst?: string | null;
		textSecond?: string | null;
		bigImage?: { __typename?: 'AcfMediaItemConnectionEdge'; node: MediaItem | null } | null;
		layoutOptions?: { __typename?: 'FlexibleContentFlexibleImageTextFieldsLayoutOptions'; variationsOptions?: string | null } | null;
		smallImage?: { __typename?: 'AcfMediaItemConnectionEdge'; node: MediaItem | null } | null;
	} | null;
}
