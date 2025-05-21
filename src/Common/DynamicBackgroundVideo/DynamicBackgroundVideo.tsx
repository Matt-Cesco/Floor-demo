import { forwardRef, Ref } from "react";
import { IDynamicBackgroundVideo } from "./IDynamicBackgroundVideo";

const DynamicBackgroundVideo = forwardRef(({ video, poster }: IDynamicBackgroundVideo, ref: Ref<HTMLVideoElement>) => {
    if (!video?.node?.mediaItemUrl) {
        return null;
    }
    return (
        <video
            ref={ref}
            className="w-full h-full absolute top-0 left-0 object-center object-cover pointer-events-none"
            poster={poster?.node?.mediaItemUrl ?? undefined}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="metadata"
            width={1920}
            height={1080}
        >
            <source src={video.node.mediaItemUrl} type="video/webm" />
        </video>
    );
});

DynamicBackgroundVideo.displayName = "DynamicBackgroundVideo";

export default DynamicBackgroundVideo;
