import { IDynamicHeading } from "@/Common/DynamicHeading/IDynamicHeading";
export default interface IFourCardsHeadingTextBlock {
    __typename: "FlexibleContentFlexibleContentBlockFourCardsHeadingTextLayout";
    fourCardsHeadingTextFields: {
        __typename: "FlexibleContentFlexibleFourCardsHeadingTextFields";
        cards: Array<{
            __typename: "FlexibleContentFlexibleFourCardsHeadingTextFieldsCards";
            text: string;
            heading: IDynamicHeading;
        }>;
        headingBlock: IDynamicHeading;
    };
}
