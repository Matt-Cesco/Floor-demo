"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import IHomepageBanner from "./IHomepageBanner";
import getBackground from "@/Helpers/GetBackground";

const HomepageBanner = ({ data }: IHomepageBanner) => {
    const { image, topBigTitle, bannerOptions, h1, video } = data.homepageBanner.homepageBannerFields || {};
    const bigTitleRef = useRef<HTMLSpanElement>(null);
    const h1Ref = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);

        if (bigTitleRef.current) {
            const splitBig = new SplitText(bigTitleRef.current, {
                type: "lines",
                linesClass: "split-child",
            });
            bigTitleRef.current.parentElement?.classList.add("split-parent");

            gsap.from(splitBig.lines, {
                scrollTrigger: {
                    trigger: bigTitleRef.current.parentElement,
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

        // Animate H1. it has been removed from wordpress by design purposes (speak with Lee)
        if (h1Ref.current) {
            const splitH1 = new SplitText(h1Ref.current, {
                type: "lines",
                linesClass: "split-child",
            });
            h1Ref.current.parentElement?.classList.add("split-parent");

            gsap.from(splitH1.lines, {
                scrollTrigger: {
                    trigger: h1Ref.current.parentElement,
                    start: "top bottom",
                    toggleActions: "play none none none",
                },
                yPercent: 100,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
                stagger: 0.1,
                delay: 0.3,
            });
        }
    }, []);

    return (
        <section className="relative flex w-full items-center h-screen">
            {getBackground({ bannerOptions, image, video })}
            <div className="absolute inset-0 z-10 bg-[linear-gradient(0deg,_rgba(0,0,0,0.30)_0%,_rgba(0,0,0,0.30)_100%)]" />
            <div className="relative z-20 w-full px-30">
                <p className="grid max-w-full grid-cols-12 gap-20">
                    <span className="col-span-12 overflow-hidden">
                        <span ref={bigTitleRef} className="text-70 sm:text-100 lg:text-230 font-black leading-72 uppercase tracking-tighter text-white">
                            {topBigTitle}
                        </span>
                    </span>
                </p>

                {h1 && (
                    <h1 className="grid max-w-full grid-cols-12 gap-20">
                        <span className="col-span-12 lg:col-span-7 overflow-hidden">
                            <span ref={h1Ref} className="text-38 lg:text-58 font-semibold leading-97 tracking-tighter text-white">
                                {h1}
                            </span>
                        </span>
                    </h1>
                )}
            </div>
        </section>
    );
};

export default HomepageBanner;
