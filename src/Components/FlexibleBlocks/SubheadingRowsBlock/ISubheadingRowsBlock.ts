import { IDynamicHeading } from "@/Common/DynamicHeading/IDynamicHeading";

export default interface ISubheadingRowsBlock {
    __typename: "FlexibleContentFlexibleContentBlockSubheadingRowsLayout";
    subheadingRowsTextFields: {
        __typename: "FlexibleContentFlexibleSubheadingRowsTextFields";
        subheading?: string;
        rows: Array<{
            __typename: "FlexibleContentFlexibleSubheadingRowsTextFieldsRows";
            text?: string;
            heading: IDynamicHeading;
        }>;
    };
}
