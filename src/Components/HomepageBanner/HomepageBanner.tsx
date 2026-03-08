// src/Components/HomepageBanner/HomepageBanner.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import type IHomepageBanner from "@/Types/Acf/HomepageBanner";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import LinkStrip from "../LinkStrip/LinkStrip";

type HomepageBannerProps = {
    data: IHomepageBanner;
};

const HomepageBanner = ({ data }: HomepageBannerProps) => {
    const { title, size, discover_more_link, gallery_slider = [] } = data;

    if (!gallery_slider.length) {
        return null;
    }

    return (
        <section className="relative w-full overflow-hidden">
            {/* Swiper background slider */}
            <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                loop
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    el: ".homepage-banner-pagination", // use our own container
                    clickable: true,
                }}
                allowTouchMove
                className="absolute inset-0 -z-10"
            >
                {gallery_slider.map((img, index) => (
                    <SwiperSlide key={img.id ?? index}>
                        <div className="relative h-full w-full min-h-[60vh] lg:min-h-[70vh]">
                            <DynamicImage data={img} index={index} className="object-cover w-full h-full" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/40 -z-10" aria-hidden="true" />

            {/* Bottom content */}
            <div className="absolute inset-x-0 bottom-0 z-20">
                <div className="relative flex flex-col lg:flex-row lg:justify-between items-start lg:items-end gap-30 p-30 lg:p-60">
                    <div
                        className="absolute inset-0 -z-20 bg-[linear-gradient(0deg,rgba(49,62,78,0.85)_0%,rgba(49,62,78,0.85)_100%),linear-gradient(0deg,#313E4E_0%,#313E4E_100%)] opacity-95"
                        aria-hidden="true"
                    />
                    <div className="container mx-auto px-72">
                        <div className="lg:max-w-6/12">
                            {title && <h1 className="font-medium text-40 leading-120 text-white mb-10">{title}</h1>}
                            {size && (
                                <p className="text-white text-30 font-medium leading-120 px-20 py-10 border border-white rounded-full inline-block">{size}</p>
                            )}
                            <div className="homepage-banner-pagination flex items-center gap-10 mt-20" />
                        </div>

                        <div className="flex flex-col items-start lg:items-end gap-4 lg:ml-auto">
                            {discover_more_link?.url && (
                                <LinkStrip
                                    href={discover_more_link.url}
                                    target={discover_more_link.target || undefined}
                                    className="text-orange text-20 leading-120 font-medium inline-flex items-center gap-10"
                                >
                                    <span>{discover_more_link.title || "Discover more"}</span>
                                    <Image src="/long-arrow-right.svg" alt="decorative icon" width={20} height={20} />
                                </LinkStrip>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomepageBanner;
