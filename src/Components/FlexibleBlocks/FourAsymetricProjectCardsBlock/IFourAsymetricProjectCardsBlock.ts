import { MediaItem } from "@/Graphql/generated";
import { IDynamicHeading } from "@/Common/DynamicHeading/IDynamicHeading";
import { ImageOrVideoOptions } from "@/Helpers/ImageOrVideoOptions";

export default interface IFourAsymetricProjectCardsBlock {
    __typename: "FlexibleContentFlexibleContentBlockFourAsymetricProjectCardsLayout";
    fourAsymetricProjectCardsFields: {
        __typename: "FlexibleContentFlexibleFourAsymetricProjectCardsFields";
        showTitleBlock: boolean;
        headingBlock?: IDynamicHeading;
        linkBlock?: { __typename: "AcfLink"; target: string; title: string; url: string };
        project: Array<{
            __typename: "FlexibleContentFlexibleFourAsymetricProjectCardsFieldsProject";
            imageOrVideoOptions: ImageOrVideoOptions;
            brandDesign?: boolean;
            brandStrategy?: boolean;
            webDesign?: boolean;
            pr?: boolean;
            comms?: boolean;
            webDevelopment?: boolean;
            socialMediaManagement?: boolean;
            emailMarketing?: boolean;
            copywriting?: boolean;
            seo?: boolean;
            image: { __typename: "AcfMediaItemConnectionEdge"; node: MediaItem };
            video: { __typename: "AcfMediaItemConnectionEdge"; node: MediaItem };
            projectLink: { __typename: "AcfLink"; target: string; title: string; url: string };
        }>;
    };
}
