"use client";

import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import IHeadingSubheadingTwoColTextBlock from "./IHeadingSubheadingTwoColTextBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicHeading from "@/Common/DynamicHeading/DynamicHeading";
import DynamicText from "@/Common/DynamicText/DynamicText";

const HeadingSubheadingTwoColTextBlock = ({ data }: IFlexibleBlock<IHeadingSubheadingTwoColTextBlock>) => {
    const { subheading, textFirstColumn, textSecondColumn, heading } = data.headingSubheadingTwoColTextFields || {};

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);
        gsap.utils.toArray<HTMLElement>(".animate-text").forEach((el) => {
            const split = new SplitText(el, { type: "lines", linesClass: "split-child" });
            el.classList.add("split-parent");
            gsap.from(split.lines, {
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    toggleActions: "play none none none",
                },
                yPercent: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                stagger: 0.1,
            });
        });
    }, []);

    return (
        <section>
            <div className="grid grid-cols-12 gap-20 px-30 my-60 lg:my-120">
                <div className="col-span-12 col-start-1 lg:col-span-6 lg:col-start-2 overflow-hidden">
                    <div className="animate-text">
                        <DynamicHeading data={heading} className="text-48 leading-100 font-bold tracking-tight text-blue-light" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-20 px-30 mt-50 lg:mt-100">
                <div className="col-span-12 col-start-1 lg:col-span-10 lg:col-start-2 overflow-hidden">
                    <div className="animate-text">
                        <p className="indent-[10%] text-32 leading-106 text-blue-dark dark:text-white">{subheading}</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-20 px-30 mt-50 lg:mt-100">
                <div className="col-span-12 col-start-1 lg:col-span-4 lg:col-start-3 overflow-hidden">
                    <div className="animate-text">
                        <DynamicText data={textFirstColumn} />
                    </div>
                </div>
                <div className="col-span-12 col-start-1 lg:col-span-4 lg:col-start-7 overflow-hidden">
                    <div className="animate-text">
                        <DynamicText data={textSecondColumn} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeadingSubheadingTwoColTextBlock;
