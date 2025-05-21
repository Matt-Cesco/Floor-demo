"use client";

import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import ISubheadingRowsBlock from "./ISubheadingRowsBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicHeading from "@/Common/DynamicHeading/DynamicHeading";

const SubheadingRowsBlock = ({ data }: IFlexibleBlock<ISubheadingRowsBlock>) => {
    const { subheading, rows } = data.subheadingRowsTextFields || {};

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
            <div className="grid grid-cols-12 gap-20 px-30 my-60 lg:mt-120 lg:mb-80 overflow-hidden">
                <div className="col-span-12 col-start-1 lg:col-span-7 lg:col-start-2">
                    <div className="animate-text indent-[20%]">
                        <p className="text-26 lg:text-40 leading-100 text-blue-dark dark:text-white tracking-tight">{subheading}</p>
                    </div>
                </div>
            </div>
            {rows.map((row, index) => (
                <div
                    key={index}
                    className={`${index !== rows.length - 1 ? "mb-40 lg:mb-80" : ""}
                    overflow-hidden px-30`}
                >
                    <div className="grid grid-cols-12 gap-20">
                        <div className="col-span-12 col-start-1 lg:col-span-6 lg:col-start-3 overflow-hidden">
                            <div className="animate-text">
                                <DynamicHeading
                                    data={row.heading}
                                    className="text-24 font-black leading-77 tracking-tight uppercase text-blue-dark dark:text-white"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 col-start-1 lg:col-span-6 lg:col-start-4 overflow-hidden mt-20">
                            <div className="animate-text">
                                <p className="text-16 font-medium leading-137 tracking-tight text-blue-dark dark:text-white">{row.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default SubheadingRowsBlock;
