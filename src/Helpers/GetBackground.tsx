import DynamicImage from "@/Common/DynamicImage/DynamicImage";

import { IDynamicBackground } from "../Components/HomepageBanner/IDynamicBackground";
import DynamicBackgroundVideo from "@/Common/DynamicBackgroundVideo/DynamicBackgroundVideo";
import { BackgroundOptions } from "@/Components/HomepageBanner/HomepageBannerOptionsEnum";

const getBackground = ({ bannerOptions, image, video }: IDynamicBackground) => {
    switch (bannerOptions) {
        case BackgroundOptions.VIDEO:
            return <DynamicBackgroundVideo video={video} poster={image} />;
        case BackgroundOptions.IMAGE:
        default:
            return <DynamicImage data={image} className="absolute w-full h-full object-cover aspect-[1512-940]" />;
    }
};

export default getBackground;
