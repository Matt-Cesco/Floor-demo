import { MediaItem } from "@/Graphql/generated";
import { ImageOrVideoOptions } from "@/Helpers/ImageOrVideoOptions";
import { SpacingTopEnum, SpacingBottomEnum } from "@/Helpers/SpacingEnum";
import { WidthOptions } from "@/Helpers/WidthEnum";

export default interface IImageOrVideoBlock {
    __typename: "FlexibleContentFlexibleContentBlockImageOrVideoLayout";
    imageOrVideoFields: {
        __typename: "FlexibleContentFlexibleImageOrVideoFields";
        spacingBottomOptions: SpacingTopEnum;
        spacingTopOptions: SpacingBottomEnum;
        videoOrImageOptions: ImageOrVideoOptions;
        widthOptions: WidthOptions;
        image: { __typename: "AcfMediaItemConnectionEdge"; node: MediaItem };
        video: { __typename?: "AcfMediaItemConnectionEdge"; node: MediaItem };
    };
}
