// Interface for DefaultBlock block data
import { ImageOptions, TitleColorOptions } from './DefaultBlockOptionsEnum';
import { IDynamicImage } from '@/Common/DynamicImage/IDynamicImage';
import { IDynamicHeading } from '@/Common/DynamicHeading/IDynamicHeading';
export default interface IDefaultBlock {
	__typename: 'FlexibleContentFlexibleContentBlockDefaultLayout';
	contentFields?: {
		__typename?: 'FlexibleContentFlexibleContentFields';
		text?: string | null;
		heading?: IDynamicHeading | null;
		image?: { __typename?: 'AcfMediaItemConnectionEdge'; node: IDynamicImage | null } | null;
		layoutOptions?: {
			__typename?: 'FlexibleContentFlexibleContentFieldsLayoutOptions';
			imageOptions?: string | null;
			titleColorOptions?: string | null;
		} | null;
		link?: { __typename?: 'AcfLink'; target?: string | null; title?: string | null; url?: string | null } | null;
	} | null;
}
