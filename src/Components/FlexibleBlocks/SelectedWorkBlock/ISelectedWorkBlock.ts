// Interface for SelectedWorkBlock block data
import { MediaItem } from '@/Graphql/generated';
import { IDynamicHeading } from '@/Common/DynamicHeading/IDynamicHeading';
export default interface ISelectedWorkBlock {
	__typename: 'FlexibleContentFlexibleContentBlockSelectedWorkLayout';
	selectedWorkFields?: {
		__typename?: 'FlexibleContentFlexibleSelectedWorkFields';
		sideLeftText?: string | null;
		text?: string | null;
		topTextLeft?: string | null;
		topTextRight?: string | null;
		heading?: IDynamicHeading | null;
		link?: { __typename?: 'AcfLink'; target?: string | null; title?: string | null; url?: string | null } | null;
		selectedWorkCards?: Array<{
			__typename?: 'FlexibleContentFlexibleSelectedWorkFieldsSelectedWorkCards';
			projectNumber?: number | null;
			projectTitle?: string | null;
			servicesProvided?: string | null;
			image?: { __typename?: 'AcfMediaItemConnectionEdge'; node: MediaItem | null } | null;
			projectPageLink?: { __typename?: 'AcfLink'; target?: string | null; title?: string | null; url?: string | null } | null;
		} | null> | null;
	} | null;
}
