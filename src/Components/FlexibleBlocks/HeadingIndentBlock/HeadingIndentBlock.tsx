"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import IFlexibleBlock from "../IFlexibleBlock";
import IHeadingIndentBlock from "./IHeadingIndentBlock";
import DynamicText from "@/Common/DynamicText/DynamicText";

// indent-[30%] indent-[10%]
export default function HeadingIndentBlock({ data }: IFlexibleBlock<IHeadingIndentBlock>) {
    const { columnIndentation, content } = data.headingIndentFields || {};
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);
        if (containerRef.current) {
            const split = new SplitText(containerRef.current, {
                type: "lines",
                linesClass: "split-child",
            });
            containerRef.current.classList.add("split-parent");

            gsap.from(split.lines, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    toggleActions: "play none none none",
                },
                yPercent: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                stagger: 0.1,
            });
        }
    }, []);

    return (
        <div className="grid grid-cols-12 gap-20 px-30 lg:mt-120 relative">
            <div ref={containerRef} className={`col-span-12 col-start-1 lg:col-span-10 lg:col-start-2 indent-[${columnIndentation}%] overflow-hidden`}>
                <DynamicText data={content} />
            </div>
        </div>
    );
}
