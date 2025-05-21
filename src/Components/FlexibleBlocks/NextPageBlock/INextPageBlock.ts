// Interface for NextPageBlock block data
import { MediaItem } from "@/Graphql/generated";
export default interface INextPageBlock {
    __typename: "FlexibleContentFlexibleContentBlockNextPageLayout";
    nextPageFields: {
        __typename: "FlexibleContentFlexibleNextPageFields";
        brandDesign?: boolean | null;
        brandStrategy?: boolean | null;
        title: string;
        webDesign?: boolean | null;
        webDevelopment?: boolean | null;
        image: { __typename: "AcfMediaItemConnectionEdge"; node: MediaItem};
        projectLink: { __typename?: "AcfLink"; target: string; title: string; url: string};
    };
}
