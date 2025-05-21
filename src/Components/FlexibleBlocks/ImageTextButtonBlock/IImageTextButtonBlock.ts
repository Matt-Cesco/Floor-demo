import { OrientationOptions } from "./ImageTextButtonBlockOptionsEnum";
import { ButtonStyleOptions } from "@/Common/DynamicButton/ButtonStyleOptions";
import { MediaItem } from "@/Graphql/generated";

export default interface IImageTextButtonBlock {
    __typename: "FlexibleContentFlexibleContentBlockImageTextButtonLayout";
    imageTextButtonFields: {
        __typename: "FlexibleContentFlexibleImageTextButtonFields";
        buttonStyleOptions: ButtonStyleOptions;
        text?: string | null;
        buttonLinkContent?: { __typename?: "AcfLink"; target?: string | null; title?: string | null; url?: string | null } | null;
        image: { __typename?: "AcfMediaItemConnectionEdge"; node: MediaItem };
        layoutOptions: { __typename: "FlexibleContentFlexibleImageTextButtonFieldsLayoutOptions"; orientationOptions: OrientationOptions };
    };
}
