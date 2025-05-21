import { IDynamicHeading } from "@/Common/DynamicHeading/IDynamicHeading";

export default interface IHeadingSubheadingTwoColTextBlock {
    __typename: "FlexibleContentFlexibleContentBlockHeadingSubheadingTwoColTextLayout";
    headingSubheadingTwoColTextFields?: {
        __typename?: "FlexibleContentFlexibleHeadingSubheadingTwoColTextFields";
        subheading?: string | null;
        textFirstColumn?: string | null;
        textSecondColumn?: string | null;
        heading?: IDynamicHeading | null;
    } | null;
}
