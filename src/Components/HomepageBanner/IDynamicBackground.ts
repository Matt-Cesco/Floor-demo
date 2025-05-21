import { MediaItem } from "@/Graphql/generated";
import { BackgroundOptions } from "./HomepageBannerOptionsEnum";

export interface IDynamicBackground {
    bannerOptions: BackgroundOptions;
    image: {
        node: MediaItem;
    };
    video: {
        node: MediaItem;
    };
}
