import { SpacingTopEnum, SpacingBottomEnum } from "./SpacingEnum";

type SpacingOption = SpacingTopEnum | SpacingBottomEnum;

export const getSpacing = (spacing: SpacingOption) => {
    switch (spacing) {
        case SpacingTopEnum.MARGINTOP120:
            return "mt-60 lg:mt-120";
        case SpacingTopEnum.MARGINTOP20:
            return "mt-20";
        case SpacingBottomEnum.MARGINBOTTOM120:
            return "mb-60 lg:mb-120";
        case SpacingBottomEnum.MARGINBOTTOM20:
            return "mb-20";
        default:
            return "";
    }
};
