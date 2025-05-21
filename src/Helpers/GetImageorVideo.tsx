import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import DynamicVideo from "@/Common/DynamicVideo/DynamicVideo";
import { IDynamicImageOrVideo } from "./IDynamicImageOrVideo";
import { ImageOrVideoOptions } from "./ImageOrVideoOptions";

interface IGetImageOrVideoProps extends IDynamicImageOrVideo {
    className?: string;
}

const getImageOrVideo = ({ videoOrImageOptions, image, video, className = "w-full h-auto" }: IGetImageOrVideoProps) => {
    if (videoOrImageOptions === ImageOrVideoOptions.VIDEO) {
        return <DynamicVideo video={video} poster={image} className={className} />;
    }
    return <DynamicImage data={image} className={className} />;
};

export default getImageOrVideo;
