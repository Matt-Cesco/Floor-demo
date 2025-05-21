"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import ISubheadingTwoColTextBlock from "./ISubheadingTwoColTextBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicText from "@/Common/DynamicText/DynamicText";

const SubheadingTwoColTextBlock: React.FC<IFlexibleBlock<ISubheadingTwoColTextBlock>> = ({ data }) => {
    const { subheading, textFirstColumn, textSecondColumn } = data.subheadingTwoColTextFields || {};
    const subRef = useRef<HTMLDivElement>(null);
    const colRefs = useRef<HTMLDivElement[]>([]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);

        if (subRef.current) {
            const split = new SplitText(subRef.current, { type: "lines", linesClass: "split-child" });
            subRef.current.classList.add("split-parent");
            gsap.from(split.lines, {
                scrollTrigger: {
                    trigger: subRef.current,
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

        colRefs.current.forEach((ref) => {
            if (ref) {
                const split = new SplitText(ref, { type: "lines", linesClass: "split-child" });
                ref.classList.add("split-parent");
                gsap.from(split.lines, {
                    scrollTrigger: {
                        trigger: ref,
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
        });
    }, []);

    return (
        <section>
            <div className="grid grid-cols-12 gap-20 px-30 lg:mt-120 overflow-hidden">
                <div ref={subRef} className="col-span-12 col-start-1 lg:col-span-10 lg:col-start-2 indent-[10%] overflow-hidden">
                    <p className="text-32 leading-106 text-blue-dark dark:text-white tracking-tight">{subheading}</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-20 px-30 lg:mt-100">
                <div
                    ref={(el) => {
                        colRefs.current[0] = el!;
                    }}
                    className="col-span-12 col-start-1 lg:col-span-4 lg:col-start-3 overflow-hidden"
                >
                    <DynamicText data={textFirstColumn} />
                </div>
                <div
                    ref={(el) => {
                        colRefs.current[1] = el!;
                    }}
                    className="col-span-12 col-start-1 lg:col-span-4 lg:col-start-7 overflow-hidden"
                >
                    <DynamicText data={textSecondColumn} />
                </div>
            </div>
        </section>
    );
};

export default SubheadingTwoColTextBlock;
