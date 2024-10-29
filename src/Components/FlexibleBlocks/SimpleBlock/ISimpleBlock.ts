// Interface for SimpleBlock block data
  import { IDynamicHeading } from '@/Common/DynamicHeading/IDynamicHeading';
export default interface ISimpleBlock { __typename: 'FlexibleContentFlexibleContentBlockSimpleLayout', simpleFields?: { __typename?: 'FlexibleContentFlexibleSimpleFields', text?: string | null, heading?: IDynamicHeading | null } | null }