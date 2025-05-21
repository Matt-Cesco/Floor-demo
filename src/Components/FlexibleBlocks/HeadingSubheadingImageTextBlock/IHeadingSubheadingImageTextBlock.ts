import { MediaItem } from "@/Graphql/generated";
import { IDynamicHeading } from "@/Common/DynamicHeading/IDynamicHeading";
import { OrientationOptions } from "./OrientationOptions";
import { ImageOrVideoOptions } from "@/Helpers/ImageOrVideoOptions";

export default interface IHeadingSubheadingImageTextBlock {
    __typename: "FlexibleContentFlexibleContentBlockHeadingSubheadingImageTextLayout";
    headingSubheadingImageTextFields: {
        __typename: "FlexibleContentFlexibleHeadingSubheadingImageTextFields";
        orientationOptions: OrientationOptions;
        subheading?: string;
        text?: string;
        videoOrImageOptions: ImageOrVideoOptions;
        heading?: IDynamicHeading;
        image: { __typename: "AcfMediaItemConnectionEdge"; node: MediaItem };
        video: { __typename: "AcfMediaItemConnectionEdge"; node: MediaItem };
    };
}
