// Interface for CallToActionBlock block data
import { BackgroundOptions } from './CallToActionBlockOptionsEnum';
import { MediaItem } from '@/Graphql/generated';
export default interface ICallToActionBlock {
	__typename: 'FlexibleContentFlexibleContentBlockCallToActionLayout';
	ctaFields?: {
		__typename?: 'FlexibleContentFlexibleCtaFields';
		text?: string | null;
		title?: string | null;
		backgroundImage?: { __typename?: 'AcfMediaItemConnectionEdge'; node: MediaItem | null } | null;
		layoutOptions?: { __typename?: 'FlexibleContentFlexibleCtaFieldsLayoutOptions'; backgroundOptions?: BackgroundOptions | null } | null;
		link?: { __typename?: 'AcfLink'; target?: string | null; title?: string | null; url?: string | null } | null;
	} | null;
}
