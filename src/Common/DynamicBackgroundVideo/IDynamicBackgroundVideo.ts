import { MediaItem } from "@/Graphql/generated";

export interface IDynamicBackgroundVideo {
    video?: {
        node: MediaItem;
    };
    poster?: {
        node: MediaItem;
    };
}
