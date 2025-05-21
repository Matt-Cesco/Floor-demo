import { MediaItem } from "@/Graphql/generated";

export default interface ILatestNewsBlock {
    __typename: "FlexibleContentFlexibleContentBlockLatestNewsLayout";
    latestNewsFields?: { __typename?: "FlexibleContentFlexibleLatestNewsFields"; optionalTitle?: string | null };
    insights: {
        edges: {
            node: {
                title: string;
                slug: string;
                uri: string;
                date: string;
                featuredImage: { node: MediaItem };

                readingTime: number;
            };
        }[];
    };
}
