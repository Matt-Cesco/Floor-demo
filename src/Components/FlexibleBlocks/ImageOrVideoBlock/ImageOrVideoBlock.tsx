import IImageOrVideoBlock from "./IImageOrVideoBlock"; // Updated import
import IFlexibleBlock from "../IFlexibleBlock";
import getImageOrVideo from "@/Helpers/GetImageorVideo";
import { getSpacing } from "@/Helpers/GetSpacing";
import { getWidth } from "@/Helpers/GetWidth";

const ImageOrVideoBlock = ({ data }: IFlexibleBlock<IImageOrVideoBlock>) => {
    const { spacingBottomOptions, spacingTopOptions, videoOrImageOptions, widthOptions, image, video } = data.imageOrVideoFields || {};
    const topSpacingClass = getSpacing(spacingTopOptions);
    const bottomSpacingClass = getSpacing(spacingBottomOptions);
    const widthClasses = getWidth(widthOptions)

    return (
        <div className={`grid grid-cols-12 gap-20 px-30 ${topSpacingClass} ${bottomSpacingClass}`}>
            <div className={`${widthClasses}`}>{getImageOrVideo({ videoOrImageOptions, image, video })}</div>
        </div>
    );
};

export default ImageOrVideoBlock;
