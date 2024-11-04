// Interface for CallToActionBlock block data
import { BackgroundOptions } from './CallToActionBlockOptionsEnum';
import { IDynamicImage } from '@/Common/DynamicImage/IDynamicImage';
export default interface ICallToActionBlock {
	__typename: 'FlexibleContentFlexibleContentBlockCallToActionLayout';
	ctaFields?: {
		__typename?: 'FlexibleContentFlexibleCtaFields';
		text?: string | null;
		title?: string | null;
		backgroundImage?: { __typename?: 'AcfMediaItemConnectionEdge'; node: IDynamicImage | null } | null;
		layoutOptions?: { __typename?: 'FlexibleContentFlexibleCtaFieldsLayoutOptions'; backgroundOptions?: string | null } | null;
		link?: { __typename?: 'AcfLink'; target?: string | null; title?: string | null; url?: string | null } | null;
	} | null;
}
