"use client";

import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import IStastsRgbaBlock from "./IStastsRgbaBlock";
import IFlexibleBlock from "../IFlexibleBlock";

const StastsRgbaBlock = ({ data }: IFlexibleBlock<IStastsRgbaBlock>) => {
    const { statsList } = data.statsRgbaFields || {};

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
            <div className="grid grid-cols-12 gap-40 px-30 mb-40 lg:mb-100">
                {statsList.slice(0, 2).map((stat, idx) => (
                    <div key={idx} className={`col-span-12 col-start-1 lg:col-span-4 lg:col-start-${idx === 0 ? 3 : 7}`}>
                        <div className="overflow-hidden">
                            <div className="animate-text">
                                <p className="text-50 lg:text-68 leading-77 font-black tracking-tight uppercase bg-gradient-to-t from-[#F4238E] to-[#009BDF] bg-clip-text text-transparent">
                                    {stat.statNumberRgba}
                                </p>
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <div className="animate-text">
                                <p className="text-blue-dark dark:text-white tracking-tight uppercase text-24 font-black leading-77">{stat.statText}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-12 gap-40 px-30">
                {statsList.slice(2, 4).map((stat, idx) => (
                    <div key={idx + 2} className={`col-span-12 col-start-1 lg:col-span-4 lg:col-start-${idx === 0 ? 3 : 7}`}>
                        <div className="overflow-hidden">
                            <div className="animate-text">
                                <p className="text-50 lg:text-68 leading-77 font-black tracking-tight uppercase bg-gradient-to-t from-[#F4238E] to-[#009BDF] bg-clip-text text-transparent">
                                    {stat.statNumberRgba}
                                </p>
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <div className="animate-text">
                                <p className="text-blue-dark dark:text-white tracking-tight uppercase text-24 font-black leading-77">{stat.statText}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StastsRgbaBlock;
