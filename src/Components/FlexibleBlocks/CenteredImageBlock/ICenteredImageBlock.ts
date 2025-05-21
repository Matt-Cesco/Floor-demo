import { MediaItem } from "@/Graphql/generated";

export default interface ICenteredImageBlock {
    __typename: "FlexibleContentFlexibleContentBlockCenteredImageLayout";
    centeredImageFields: {
        __typename: "FlexibleContentFlexibleCenteredImageFields";
        image: { __typename: "AcfMediaItemConnectionEdge"; node: MediaItem };
    };
}
