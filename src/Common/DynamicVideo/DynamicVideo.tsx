import { forwardRef, Ref } from "react";
import { IDynamicVideo } from "./IDynamicVideo";

const DynamicVideo = forwardRef(
  (
    { video, poster, className = "w-full h-auto object-center object-cover pointer-events-none" }: IDynamicVideo,
    ref: Ref<HTMLVideoElement>
  ) => {
    if (!video?.node?.mediaItemUrl) {
      return null;
    }

    return (
        <video
            ref={ref}
            className={className}
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
            <source src={video.node.mediaItemUrl} type="video/mp4" />
        </video>
    );
  }
);

DynamicVideo.displayName = "DynamicVideo";
export default DynamicVideo;

