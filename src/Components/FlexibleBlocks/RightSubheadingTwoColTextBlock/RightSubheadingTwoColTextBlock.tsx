"use client";

import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import IRightSubheadingTwoColTextBlock from "./IRightSubheadingTwoColTextBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicText from "@/Common/DynamicText/DynamicText";

const RightSubheadingTwoColTextBlock = ({ data }: IFlexibleBlock<IRightSubheadingTwoColTextBlock>) => {
    const { subheading, textFirstColumn, textSecondColumn } = data.rightSubheadingTwoColTextFields || {};

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
            <div className="grid grid-cols-12 gap-20 px-30 my-60 lg:my-120 overflow-hidden">
                <div className="col-span-12 col-start-1 lg:col-span-7 lg:col-start-5">
                    <div className="animate-text">
                        <p className="text-40 leading-100 lg:leading-106 text-blue-dark dark:text-white">{subheading}</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-20 px-30 mt-50 lg:mt-100">
                <div className="col-span-12 col-start-1 lg:col-span-3 lg:col-start-5 overflow-hidden">
                    <div className="animate-text">
                        <DynamicText data={textFirstColumn} pClassName="text-16 leading-130 lg:leading-140 mb-22 text-blue-dark dark:text-white" />
                    </div>
                </div>
                <div className="col-span-12 col-start-1 lg:col-span-3 lg:col-start-8 overflow-hidden">
                    <div className="animate-text">
                        <DynamicText data={textSecondColumn} pClassName="text-16 leading-130 lg:leading-140 mb-22 text-blue-dark dark:text-white" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RightSubheadingTwoColTextBlock;
