// Interface for SummaryBlock block data
  import { IDynamicHeading } from '@/Common/DynamicHeading/IDynamicHeading';
export default interface ISummaryBlock { __typename: 'FlexibleContentFlexibleContentBlockSummaryLayout', summaryFields?: { __typename?: 'FlexibleContentFlexibleSummaryFields', text?: string | null, heading?: IDynamicHeading | null } | null }