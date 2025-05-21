import { MediaItem } from "@/Graphql/generated";

export default interface IInfiniteLogosBlock {
    __typename: "FlexibleContentFlexibleContentBlockInfiniteLogosLayout";
    infiniteLogosFields: {
        __typename: "FlexibleContentFlexibleInfiniteLogosFields";
        logos: { __typename: "AcfMediaItemConnection"; nodes: MediaItem[] };
    };
}
