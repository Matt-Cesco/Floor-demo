import { MediaItem } from "@/Graphql/generated";
import { BannerImageOptionsEnum, BannerOptionsEnum } from "./BannerOptionsEnum";
import { ImageOrVideoOptions } from "@/Helpers/ImageOrVideoOptions";

export default interface IBanner {
    data: {
        bannerOptions: BannerOptionsEnum;
        title: string;
        imageOrVideoOptions: ImageOrVideoOptions;
        imageSizeOptions: BannerImageOptionsEnum;
        image: { node: MediaItem; };
        video: { node: MediaItem };
        showDesign: boolean;
        showBrand: boolean;
        showDigital: boolean;
        showPr: boolean;
    };
}
