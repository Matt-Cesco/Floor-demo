// Interface for HeadingTwoImgTwoTextBlock block data
import { MediaItem } from "@/Graphql/generated";
export default interface IHeadingTwoImgTwoTextBlock {
    __typename: "FlexibleContentFlexibleContentBlockHeadingTwoImgTwoTextLayout";
    headingTwoImgTwoTextFields?: {
        __typename?: "FlexibleContentFlexibleHeadingTwoImgTwoTextFields";
        firstTextCol?: string | null;
        secondTextCol?: string | null;
        title?: string | null;
        topText?: string | null;
        firstImage?: { __typename?: "AcfMediaItemConnectionEdge"; node: MediaItem | null } | null;
        secondImage?: { __typename?: "AcfMediaItemConnectionEdge"; node: MediaItem | null } | null;
    } | null;
}
