import { IDynamicHeading } from "@/Common/DynamicHeading/IDynamicHeading";
import { BackgroundColorOptionsEnum } from "./backgroundColorOptionsEnum";

export default interface ICallToActionBlock {
    __typename: "FlexibleContentFlexibleContentBlockCallToActionLayout";
    ctaFields: {
        __typename: "FlexibleContentFlexibleCtaFields";
        backgroundColorOptions: BackgroundColorOptionsEnum[];
        buttonLinkContent: {
            __typename: "AcfLink";
            target: string;
            title: string;
            url: string;
        };
        heading: IDynamicHeading;
    };
}
