import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import IBanner from "@/Types/Acf/Banner";
import React from "react";

type BannerProps = {
    data: IBanner;
};

const Banner = ({ data }: BannerProps) => {
    const { title, background_image, rgba_overlay } = data;

    const overlayClass =
        rgba_overlay === "orange"
            ? "bg-[linear-gradient(180deg,#A55F37_0%,#F08C50_100%)] mix-blend-multiply"
            : rgba_overlay === "blue"
            ? "bg-[linear-gradient(0deg,#737E8E_0%,#737E8E_100%)] mix-blend-multiply"
            : "bg-black/40"; // fallback (if not set)

    return (
        <section className="relative w-full min-h-[50vh] lg:max-h-[70vh] overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 -z-20">
                <DynamicImage data={background_image} className="object-cover w-full h-full" />
            </div>

            {/* Overlay (conditional) */}
            <div className={`absolute inset-0 -z-10 ${overlayClass}`} aria-hidden="true" />

            {/* Bottom content */}
            <div className="absolute inset-x-0 bottom-0 z-40">
                <div className="flex justify-between items-end p-30 lg:p-60">
                    <div className="lg:max-w-6/12">{title && <h1 className="font-medium text-40 leading-120 text-white mb-10">{title}</h1>}</div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
