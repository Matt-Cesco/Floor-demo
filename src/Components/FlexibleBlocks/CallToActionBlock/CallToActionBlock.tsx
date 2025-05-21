"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import IFlexibleBlock from "../IFlexibleBlock";
import ICallToActionBlock from "./ICallToActionBlock";
import DynamicHeading from "@/Common/DynamicHeading/DynamicHeading";
import AnimatedLink from "@/Components/Layout/AnimatedLink";
import { getBackgroundColor } from "./getBackgroundColor";

export default function CallToActionBlock({ data }: IFlexibleBlock<ICallToActionBlock>) {
    const { backgroundColorOptions, buttonLinkContent, heading } = data.ctaFields || {};
    const headingRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);
        if (headingRef.current) {
            const split = new SplitText(headingRef.current, {
                type: "lines",
                linesClass: "split-child",
            });
            headingRef.current.classList.add("split-parent");

            gsap.from(split.lines, {
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top bottom",
                    toggleActions: "play none none none",
                },
                yPercent: 100,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
                stagger: 0.1,
            });
        }
    }, []);

    return (
        <div className="relative overflow-hidden group rounded-none transition-[border-radius] duration-500 hover:rounded-full m-30">
            <AnimatedLink href={buttonLinkContent?.url || "#"}>
                <div
                    className={`absolute top-0 left-0 w-full h-[200%] ${getBackgroundColor(
                        backgroundColorOptions
                    )} transition-transform duration-500 group-hover:translate-y-[-50%]`}
                />

                <div className="relative grid grid-cols-12 gap-20 px-30 py-80 lg:py-200">
                    <div className="col-start-1 col-span-12 lg:col-span-6 lg:col-start-3">
                        <div ref={headingRef} className="overflow-hidden">
                            <DynamicHeading data={heading} className="font-black text-24 lg:text-48 leading-87 tracking-tight uppercase text-white" />
                        </div>
                        <p className="flex items-center text-white uppercase text-24 lg:text-32 font-black tracking-tight mt-48">
                            {buttonLinkContent?.title}
                            <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 12 12" fill="none">
                                    <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z" fill="white" />
                                </svg>
                            </span>
                        </p>
                    </div>
                </div>
            </AnimatedLink>
        </div>
    );
}
