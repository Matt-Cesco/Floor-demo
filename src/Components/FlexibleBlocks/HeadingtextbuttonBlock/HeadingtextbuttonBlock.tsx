"use client";

import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import IHeadingTextButtonBlock from "./IHeadingTextButtonBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicButton from "@/Common/DynamicButton/DynamicButton";
import DynamicHeading from "@/Common/DynamicHeading/DynamicHeading";
import DynamicText from "@/Common/DynamicText/DynamicText";

const HeadingTextButtonBlock = ({ data }: IFlexibleBlock<IHeadingTextButtonBlock>) => {
    const { buttonStyleOptions, text, buttonLinkContent, heading } = data.headingTextButtonFields || {};

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
        <section className="my-60 lg:my-120">
            <div className="grid grid-cols-12 gap-20 px-30 overflow-hidden">
                <div className="col-span-12 col-start-1 lg:col-span-8 lg:col-start-3">
                    <div className="animate-text">
                        <DynamicHeading data={heading} className="text-45 lg:text-58 leading-77 font-bold tracking-tight text-blue-dark dark:text-white" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-20 px-30 mt-50 lg:mt-100 overflow-hidden">
                <div className="col-span-12 col-start-1 lg:col-span-6 lg:col-start-5">
                    <div className="animate-text">
                        <DynamicText data={text} pClassName="text-20 leading-130 lg:leading-140 text-blue-dark dark:text-white" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-20 px-30 mt-20 lg:mt-40 overflow-hidden">
                <div className="col-span-12 col-start-1 lg:col-span-6 lg:col-start-5">
                    {buttonLinkContent && (
                        <div className="animate-text">
                            <DynamicButton data={buttonLinkContent} styleOption={buttonStyleOptions} className="col-span-4 lg:col-span-3 mb-120" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HeadingTextButtonBlock;
