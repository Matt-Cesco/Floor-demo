// Interface for ServicesRowsBlock block data
import { MediaItem } from '@/Graphql/generated';
import { IDynamicHeading } from '@/Common/DynamicHeading/IDynamicHeading';
export default interface IServicesRowsBlock {
	__typename: 'FlexibleContentFlexibleContentBlockServicesRowsLayout';
	servicesRowsFields?: {
		__typename?: 'FlexibleContentFlexibleServicesRowsFields';
		sideLeftText?: string | null;
		text?: string | null;
		heading?: IDynamicHeading | null;
		servicesRowsCards?: Array<{
			__typename?: 'FlexibleContentFlexibleServicesRowsFieldsServicesRowsCards';
			serviceNumber?: number | null;
			serviceTitle?: string | null;
			image?: { __typename?: 'AcfMediaItemConnectionEdge'; node: MediaItem | null } | null;
			projectPageLink?: { __typename?: 'AcfLink'; target?: string | null; title?: string | null; url?: string | null } | null;
		} | null> | null;
	} | null;
}
