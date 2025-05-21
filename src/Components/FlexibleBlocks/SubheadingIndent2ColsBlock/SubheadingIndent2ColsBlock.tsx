"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import ISubheadingIndent2ColsBlock from "./ISubheadingIndent2ColsBlock";
import IFlexibleBlock from "../IFlexibleBlock";

const SubheadingIndent2ColsBlock = ({ data }: IFlexibleBlock<ISubheadingIndent2ColsBlock>) => {
    const { subheading } = data.subheadingIndent2ColsFields || {};
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
            <div className="col-span-12 col-start-1 lg:col-span-7 lg:col-start-2 overflow-hidden">
                <div ref={containerRef} className="indent-[20%] animate-text">
                    <p className="text-26 lg:text-40 leading-100 text-blue-dark dark:text-white tracking-tight">{subheading}</p>
                </div>
            </div>
        </section>
    );
};

export default SubheadingIndent2ColsBlock;
