
import { MediaItem } from "@/Graphql/generated";

export default interface IImageOnVerticalButtonHoverBlock {
    __typename: "FlexibleContentFlexibleContentBlockImageOnVerticalButtonHoverLayout";
    imageOnVerticalButtonHoverFields: {
        __typename: "FlexibleContentFlexibleImageOnVerticalButtonHoverFields";
        rows: Array<{
            __typename?: "FlexibleContentFlexibleImageOnVerticalButtonHoverFieldsRows";
            titleColor: string;
            image?: { __typename?: "AcfMediaItemConnectionEdge"; node: MediaItem };
            link: { __typename?: "AcfLink"; target: string; title: string; url: string};
        }>;
    };
}
