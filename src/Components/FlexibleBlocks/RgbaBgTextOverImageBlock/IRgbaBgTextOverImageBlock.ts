import { MediaItem } from "@/Graphql/generated";
import { SpacingTopEnum, SpacingBottomEnum } from "@/Helpers/SpacingEnum";

export default interface IRgbaBgTextOverImageBlock {
    __typename: "FlexibleContentFlexibleContentBlockRgbaBgTextOverImageLayout";
    rgbaBgTextOverImageFields: {
        __typename: "FlexibleContentFlexibleRgbaBgTextOverImageFields";
        spacingBottomOptions: SpacingTopEnum;
        spacingTopOptions: SpacingBottomEnum;
        text: string;
        image: { __typename: "AcfMediaItemConnectionEdge"; node: MediaItem };
    };
}
