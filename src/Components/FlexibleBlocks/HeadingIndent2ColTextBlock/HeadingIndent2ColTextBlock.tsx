"use client";

import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import IHeadingIndent2ColTextBlock from "./IHeadingIndent2ColTextBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicText from "@/Common/DynamicText/DynamicText";

const HeadingIndent2ColTextBlock = ({ data }: IFlexibleBlock<IHeadingIndent2ColTextBlock>) => {
    const { columnIndentation, content, textFirstColumn, textSecondColumn } = data.headingIndent2ColTextFields || {};

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);
        const elements = gsap.utils.toArray<HTMLElement>(".animate-text");
        elements.forEach((el) => {
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
            <div className="grid grid-cols-12 gap-20 px-30 mt-60 lg:mt-120 overflow-hidden">
                <div className="col-span-12 col-start-1 lg:col-span-10 lg:col-start-2">
                    <div className="animate-text indent-wrapper" style={{ marginLeft: `${columnIndentation}%` }}>
                        <DynamicText data={content} />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-20 px-30 mt-50 lg:mt-100">
                <div className="col-span-12 col-start-1 lg:col-span-3 lg:col-start-5 overflow-hidden">
                    <div className="animate-text">
                        <DynamicText data={textFirstColumn} />
                    </div>
                </div>
                <div className="col-span-12 col-start-1 lg:col-span-3 lg:col-start-8 overflow-hidden">
                    <div className="animate-text">
                        <DynamicText data={textSecondColumn} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeadingIndent2ColTextBlock;
