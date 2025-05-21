"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import AnimatedLink from "../Layout/AnimatedLink";
import getImageOrVideo from "@/Helpers/GetImageorVideo";
import { BannerImageOptionsEnum, BannerOptionsEnum } from "./BannerOptionsEnum";
import IBanner from "./IBanner";

const Banner = ({ data }: IBanner) => {
    const { title, image, video, bannerOptions, imageSizeOptions, imageOrVideoOptions, showBrand, showDesign, showDigital, showPr } = data || {};
    const titleRef = useRef<HTMLHeadingElement>(null);
    const mediaWrapperRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);

        if (titleRef.current) {
            const split = new SplitText(titleRef.current, { type: "lines", linesClass: "split-child" });
            titleRef.current.parentElement?.classList.add("split-parent");
            gsap.from(split.lines, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top bottom",
                    toggleActions: "play none none none",
                },
                yPercent: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.1,
            });
        }

        if (mediaWrapperRef.current) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: mediaWrapperRef.current,
                    start: "top bottom",
                    toggleActions: "restart none none reset",
                },
            });
            tl.set(mediaWrapperRef.current, { autoAlpha: 1 });
            tl.from(mediaWrapperRef.current, {
                xPercent: 0,
                duration: 1.5,
                ease: "power2.out",
            });
            tl.from(mediaWrapperRef.current, {
                xPercent: 100,
                scale: 1,
                duration: 1.5,
                delay: -1.5,
                ease: "power2.out",
            });
        }
    }, []);

    return (
        <section className="pt-120 relative -z-20">
            <div className="relative grid grid-cols-12 gap-20 px-30">
                <div className="col-span-12 lg:col-span-5 lg:col-start-1">
                    <h1
                        ref={titleRef}
                        className="relative z-10 text-blue-light dark:text-white text-40 lg:text-160 font-black leading-72 tracking-tight mt-75"
                    >
                        {title}
                    </h1>
                </div>
            </div>

            {bannerOptions === BannerOptionsEnum.TITLEIMAGE && (
                <div className="grid grid-cols-12 gap-20 px-30 -z-10 w-full mt-60 lg:mt-120">
                    <div className="col-span-12 lg:col-span-1 lg:col-start-2">
                        <div className="flex flex-col mt-16 space-y-6">
                            {showDesign && (
                                <AnimatedLink
                                    href="/design"
                                    className="group flex items-center text-21 font-black uppercase tracking-tight leading-95 text-blue-dark dark:text-white hover:text-green"
                                >
                                    Design
                                    <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="#009BDF" />
                                        </svg>
                                    </span>
                                </AnimatedLink>
                            )}
                            {showDigital && (
                                <AnimatedLink
                                    href="/digital"
                                    className="group flex items-center text-21 font-black uppercase tracking-tight leading-95 text-blue-dark dark:text-white hover:text-pink"
                                >
                                    Digital
                                    <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="#009BDF" />
                                        </svg>
                                    </span>
                                </AnimatedLink>
                            )}
                            {showBrand && (
                                <AnimatedLink
                                    href="/brand"
                                    className="group flex items-center text-21 font-black uppercase tracking-tight leading-95 text-blue-dark dark:text-white hover:text-orange"
                                >
                                    Brand
                                    <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="#009BDF" />
                                        </svg>
                                    </span>
                                </AnimatedLink>
                            )}
                            {showPr && (
                                <AnimatedLink
                                    href="/pr"
                                    className="group flex items-center text-21 font-black uppercase tracking-tight leading-95 text-blue-dark dark:text-white hover:text-purple"
                                >
                                    Pr
                                    <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="#009BDF" />
                                        </svg>
                                    </span>
                                </AnimatedLink>
                            )}
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-8 lg:col-start-5 overflow-hidden">
                        <div ref={mediaWrapperRef} className="overflow-hidden w-full">
                            {getImageOrVideo({
                                videoOrImageOptions: imageOrVideoOptions,
                                image,
                                video,
                                className:
                                    imageSizeOptions === BannerImageOptionsEnum.SHORT
                                        ? "aspect-[957/593] w-full object-cover"
                                        : "aspect-[957/917] w-full object-cover",
                            })}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Banner;
