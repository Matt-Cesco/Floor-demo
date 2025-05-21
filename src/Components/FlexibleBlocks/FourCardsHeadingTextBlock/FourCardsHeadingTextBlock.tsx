"use client";

import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import IFourCardsHeadingTextBlock from "./IFourCardsHeadingTextBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicHeading from "@/Common/DynamicHeading/DynamicHeading";

const FourCardsHeadingTextBlock = ({ data }: IFlexibleBlock<IFourCardsHeadingTextBlock>) => {
    const { cards, headingBlock } = data.fourCardsHeadingTextFields || {};

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

    const getGridClass = (index: number): string => {
        switch (index) {
            case 0:
                return "col-span-12 col-start-1 lg:col-span-3 lg:col-start-2 mb-60 lg:mb-120";
            case 1:
                return "col-span-12 col-start-1 lg:col-span-3 lg:col-start-6 mb-60 lg:mb-120";
            case 2:
                return "col-span-12 col-start-1 lg:col-span-3 lg:col-start-4 mb-60 lg:mb-120";
            case 3:
                return "col-span-12 col-start-1 lg:col-span-3 lg:col-start-8 mb-60 lg:mb-120";
            default:
                return "col-span-12";
        }
    };

    return (
        <section>
            <div className="grid grid-cols-12 gap-20 px-30 my-60 lg:my-120">
                <div className="col-span-12 col-start-1 lg:col-span-7 lg:col-start-1 overflow-hidden">
                    <div className="animate-text">
                        <DynamicHeading data={headingBlock} className="text-58 font-black leading-77 tracking-tight uppercase text-blue-light" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-20 px-30 mt-60 lg:mt-120">
                {cards.map((card, index) => (
                    <div key={index} className={getGridClass(index)}>
                        <div className="grid grid-cols-4">
                            <div className="col-span-1">
                                <p className="text-36 font-black leading-77 tracking-tight uppercase text-blue-light">{String(index + 1).padStart(2, "0")}</p>
                            </div>
                            <div className="col-span-3 overflow-hidden">
                                <div className="animate-text">
                                    <DynamicHeading
                                        data={card.heading}
                                        className="text-36 font-black leading-77 tracking-tight uppercase text-blue-dark dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="overflow-hidden mt-40 lg:mt-80">
                            <div className="animate-text">
                                <p className="text-16 font-semibold leading-137 tracking-tight text-blue-dark dark:text-white">{card.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FourCardsHeadingTextBlock;
