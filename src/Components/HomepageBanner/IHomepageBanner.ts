import { MediaItem } from "@/Graphql/generated";
import { BackgroundOptions } from "./HomepageBannerOptionsEnum";

export default interface IHomepageBanner {
    data: {
        homepageBanner: {
            homepageBannerFields: {
                bannerOptions: BackgroundOptions;
                topBigTitle: string;
                h1?: string;
                image: {
                    node: MediaItem;
                };
                video: {
                    node: MediaItem;
                };
            };
        };
    };
}
