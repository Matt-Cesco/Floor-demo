import Image from "next/image";
import { forwardRef, Ref } from "react";
import { IDynamicImage } from "./IDynamicImage";

const DynamicImage = forwardRef(({ data, className }: IDynamicImage, ref: Ref<HTMLImageElement>) => {
    if (!data?.node) {
        return null;
    }

    const { mediaItemUrl, altText, mimeType, mediaDetails } = data.node;

    if (!mediaItemUrl) {
        return null;
    }

    // This will handle the svg images
    if (mimeType === "image/svg+xml") {
        return <img src={mediaItemUrl} alt={altText || "Image"} className={className} ref={ref} />;
    }

    // This is the default for other images format
    const imageWidth = mediaDetails?.width ?? 300;
    const imageHeight = mediaDetails?.height ?? 300;

    return <Image src={mediaItemUrl} alt={altText || "Image"} className={className} ref={ref} width={imageWidth} height={imageHeight} quality={100} />;
});

DynamicImage.displayName = "DynamicImage";

export default DynamicImage;
