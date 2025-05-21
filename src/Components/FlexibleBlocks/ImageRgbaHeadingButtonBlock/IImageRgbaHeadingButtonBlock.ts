import { OrientationOptions } from "./ImageRgbaHeadingButtonBlockOptionsEnum";
import { MediaItem } from "@/Graphql/generated";
import { IDynamicHeading } from "@/Common/DynamicHeading/IDynamicHeading";
import { ButtonStyleOptions } from "@/Common/DynamicButton/ButtonStyleOptions";
import { SpacingTopEnum, SpacingBottomEnum } from "@/Helpers/SpacingEnum";

export default interface IImageRgbaHeadingButtonBlock {
    __typename: "FlexibleContentFlexibleContentBlockImageRgbaHeadingButtonLayout";
    imageRgbaHeadingButtonFields: {
        __typename: "FlexibleContentFlexibleImageRgbaHeadingButtonFields";
        spacingBottomOptions: SpacingTopEnum;
        spacingTopOptions: SpacingBottomEnum;
        buttonStyleOptions: ButtonStyleOptions;
        buttonLinkContent: { __typename: "AcfLink"; target: string; title: string; url: string };
        heading: IDynamicHeading;
        image?: { __typename: "AcfMediaItemConnectionEdge"; node: MediaItem };
        layoutOptions: { __typename: "FlexibleContentFlexibleImageRgbaHeadingButtonFieldsLayoutOptions"; orientationOptions: OrientationOptions };
    };
}
