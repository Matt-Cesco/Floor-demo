// Interface for FullSizeImageBlock block data
  import { MediaItem } from '@/Graphql/generated';
export default interface IFullSizeImageBlock { __typename: 'FlexibleContentFlexibleContentBlockFullSizeImageLayout', fullSizeImageFields?: { __typename?: 'FlexibleContentFlexibleFullSizeImageFields', image?: { __typename?: 'AcfMediaItemConnectionEdge', node: MediaItem | null } | null } | null }