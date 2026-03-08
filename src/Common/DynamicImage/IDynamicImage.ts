import MediaItem from "@/Types/MediaItem";

export interface IDynamicImage {
    data?: MediaItem | null;
    className?: string;
    index?: number;
    priority?: boolean;
    loading?: "lazy" | "eager";
}
