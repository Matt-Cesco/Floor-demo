import { MediaItem } from "@/Graphql/generated";

export default interface IImageOnHorizontalButtonHoverBlock {
    __typename: "FlexibleContentFlexibleContentBlockImageOnHorizontalButtonHoverLayout";
    imageOnHorizontalButtonHoverFields: {
        __typename: "FlexibleContentFlexibleImageOnHorizontalButtonHoverFields";
        rows: Array<{
            __typename: "FlexibleContentFlexibleImageOnHorizontalButtonHoverFieldsRows";
            titleColor: string;
            image?: { __typename: "AcfMediaItemConnectionEdge"; node: MediaItem};
            link: { __typename: "AcfLink"; target: string; title: string; url: string};
        }>;
    };
}
