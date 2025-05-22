
import { ButtonStyleOptions } from "@/Common/DynamicButton/ButtonStyleOptions";
import { IDynamicHeading } from "@/Common/DynamicHeading/IDynamicHeading";

export default interface IHeadingTextButtonBlock {
    __typename: "FlexibleContentFlexibleContentBlockHeadingTextButtonLayout";
    headingTextButtonFields: {
        __typename: "FlexibleContentFlexibleHeadingTextButtonFields";
        buttonStyleOptions: ButtonStyleOptions;
        text?: string;
        buttonLinkContent?: { __typename?: "AcfLink"; target: string; title: string; url: string };
        heading: IDynamicHeading;
    };
}
