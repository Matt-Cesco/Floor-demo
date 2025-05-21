import { MediaItem } from "@/Graphql/generated";
import { IDynamicHeading } from "@/Common/DynamicHeading/IDynamicHeading";

export type Department = "managing Director" | "director" | "communications" | "creative" | "digital" | "discovery" | "operations";

export default interface IImageOnTextHoverBlock {
    __typename: "FlexibleContentFlexibleContentBlockImageOnTextHoverLayout";
    imageOnTextHoverFields: {
        __typename: "FlexibleContentFlexibleImageOnTextHoverFields";
        heading: IDynamicHeading;
        rows: Array<{
            __typename: "FlexibleContentFlexibleImageOnTextHoverFieldsRows";
            department: Department[];
            fullName?: string;
            text?: string;
            image?: { __typename: "AcfMediaItemConnectionEdge"; node: MediaItem };
        }>;
    };
}