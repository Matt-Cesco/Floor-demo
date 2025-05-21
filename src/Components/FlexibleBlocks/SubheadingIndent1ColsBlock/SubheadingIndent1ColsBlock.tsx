"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import ISubheadingIndent1ColsBlock from "./ISubheadingIndent1ColsBlock";
import IFlexibleBlock from "../IFlexibleBlock";

const SubheadingIndent1ColsBlock = ({ data }: IFlexibleBlock<ISubheadingIndent1ColsBlock>) => {
    const { subheading } = data.subheadingIndent1ColsFields || {};
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
        <section className="grid grid-cols-12 gap-20 px-30 my-60 lg:my-120">
            <div className="col-span-12 col-start-1 lg:col-span-8 lg:col-start-3 overflow-hidden">
                <div ref={containerRef} className="indent-[10%] animate-text">
                    <p className="text-32 leading-106 text-blue-dark dark:text-white tracking-tight">{subheading}</p>
                </div>
            </div>
        </section>
    );
};

export default SubheadingIndent1ColsBlock;
