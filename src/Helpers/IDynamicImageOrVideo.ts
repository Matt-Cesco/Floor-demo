import { MediaItem } from "@/Graphql/generated";
import { ImageOrVideoOptions } from "./ImageOrVideoOptions";

export interface IDynamicImageOrVideo {
    videoOrImageOptions: ImageOrVideoOptions;
    image: {
        node: MediaItem;
    };
    video: {
        node: MediaItem;
    };
}
