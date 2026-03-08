import MediaItem from "@/Types/MediaItem";

export interface IDynamicVideo {
    video?: {
        node: MediaItem;
    };
    poster?: {
        node: MediaItem;
    };
    className?: string;
}
