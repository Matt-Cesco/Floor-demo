import { MediaItem } from "@/Graphql/generated";

export interface IDynamicVideo {
    video?: {
        node: MediaItem;
    };
    poster?: {
        node: MediaItem;
    };
    className?: string;
}
