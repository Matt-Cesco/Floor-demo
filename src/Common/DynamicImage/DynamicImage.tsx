import Image from "next/image";
import { forwardRef, Ref } from "react";
import { IDynamicImage } from "./IDynamicImage";

const DynamicImage = forwardRef(({ data, className, priority, loading }: IDynamicImage, ref: Ref<HTMLImageElement>) => {
    if (!data) {
        return null;
    }

    const { url, alt, mime_type, width, height } = data;

    if (!url) {
        return null;
    }

    if (mime_type === "image/svg+xml") {
        return <img src={url} alt={alt || "Image"} className={className} ref={ref} loading={loading} />;
    }

    const imageWidth = width ?? 300;
    const imageHeight = height ?? 300;

    return (
        <Image
            src={url}
            alt={alt || "Image"}
            className={className}
            ref={ref}
            width={imageWidth}
            height={imageHeight}
            quality={100}
            priority={priority}
            loading={priority ? undefined : (loading ?? "lazy")}
        />
    );
});

DynamicImage.displayName = "DynamicImage";

export default DynamicImage;
