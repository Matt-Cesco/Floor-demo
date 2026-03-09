import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import IBanner from "@/Types/Acf/Banner";
import React from "react";

type BannerProps = {
    data: IBanner;
};

const Banner = ({ data }: BannerProps) => {
    const { title, background_image } = data;


    return (
        <section className="relative w-full overflow-hidden">
            {/* Background image */}
            {/* <div className="absolute inset-0 -z-20">
                <DynamicImage data={background_image} className="object-cover w-full h-full" />
            </div> */}

            {/* Overlay (conditional) */}
            {/* <div className={`absolute inset-0 -z-10 ${overlayClass}`} aria-hidden="true" /> */}

            {/* Bottom content */}
            {/* <div className="absolute inset-x-0 bottom-0 z-40">
                <div className="flex justify-between items-end p-30 lg:p-60">
                    <div className="lg:max-w-6/12">{title && <h1 className="font-medium text-40 leading-120 text-white mb-10">{title}</h1>}</div>
                </div>
            </div> */}
        </section>
    );
};

export default Banner;
