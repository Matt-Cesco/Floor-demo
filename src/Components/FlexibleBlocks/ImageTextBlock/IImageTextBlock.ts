// Interface for ImageTextBlock block data
import { VariationsOptions } from './ImageTextBlockOptionsEnum';
import { IDynamicImage } from '@/Common/DynamicImage/IDynamicImage';
export default interface IImageTextBlock {
	__typename: 'FlexibleContentFlexibleContentBlockImageTextLayout';
	imageTextFields?: {
		__typename?: 'FlexibleContentFlexibleImageTextFields';
		textFirst?: string | null;
		textSecond?: string | null;
		bigImage?: { __typename?: 'AcfMediaItemConnectionEdge'; node: IDynamicImage | null } | null;
		layoutOptions?: { __typename?: 'FlexibleContentFlexibleImageTextFieldsLayoutOptions'; variationsOptions?: string | null } | null;
		smallImage?: { __typename?: 'AcfMediaItemConnectionEdge'; node: IDynamicImage | null } | null;
	} | null;
}
