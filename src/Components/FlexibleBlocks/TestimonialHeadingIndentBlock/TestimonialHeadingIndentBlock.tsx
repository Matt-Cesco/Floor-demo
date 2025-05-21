"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import ITestimonialHeadingIndentBlock from "./ITestimonialHeadingIndentBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicText from "@/Common/DynamicText/DynamicText";

const TestimonialHeadingIndentBlock: React.FC<IFlexibleBlock<ITestimonialHeadingIndentBlock>> = ({ data }) => {
    const { content, testimonialCompany, testimonialJobRole, testimonialNameSurname } = data.testimonialHeadingIndentFields || {};
    const contentRef = useRef<HTMLDivElement>(null);
    const detailRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);

        if (contentRef.current) {
            const split = new SplitText(contentRef.current, { type: "lines", linesClass: "split-child" });
            contentRef.current.classList.add("split-parent");
            gsap.from(split.lines, {
                scrollTrigger: {
                    trigger: contentRef.current,
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

        if (detailRef.current) {
            const split2 = new SplitText(detailRef.current, { type: "lines", linesClass: "split-child" });
            detailRef.current.classList.add("split-parent");
            gsap.from(split2.lines, {
                scrollTrigger: {
                    trigger: detailRef.current,
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
        <section>
            <div className="grid grid-cols-12 gap-20 px-30 first-letter:relative mt-60 lg:mt-120">
                <div className="col-span-12 col-start-3 lg:col-span-1 lg:col-start-5 -mb-20 lg:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="29" viewBox="0 0 40 29" fill="none">
                        <path
                            d="M20.5759 28.9039V20.2799C20.5759 15.5866 21.4266 11.6853 23.1279 8.57594C24.8293 5.46661 27.4986 2.67994 31.1359 0.215942L39.2319 4.17594C37.8239 6.63994 36.6799 9.39728 35.7999 12.4479C34.9199 15.4399 34.4799 18.0506 34.4799 20.2799V28.9039H20.5759ZM0.335938 28.9039V20.2799C0.335938 15.5866 1.1866 11.6853 2.88794 8.57594C4.58927 5.46661 7.2586 2.67994 10.8959 0.215942L18.9919 4.17594C17.5839 6.63994 16.4399 9.39728 15.5599 12.4479C14.6799 15.4399 14.2399 18.0506 14.2399 20.2799V28.9039H0.335938Z"
                            fill="#009BDF"
                        />
                    </svg>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-20 px-30 relative">
                <div ref={contentRef} className="col-span-12 col-start-1 lg:col-span-10 lg:col-start-2 indent-[30%] overflow-hidden">
                    <DynamicText data={content} />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-20 px-30 mt-0 lg:mt-30 relative">
                <div ref={detailRef} className="col-span-12 col-start-1 lg:col-span-4 lg:col-start-5 overflow-hidden">
                    <p className="text-blue-light text-16 font-medium tracking-tight leading-137 uppercase">{testimonialNameSurname}</p>
                    <p className="text-blue-dark dark:text-white text-16 font-medium tracking-tight leading-137">{testimonialJobRole}</p>
                    <p className="text-blue-dark dark:text-white text-16 font-medium tracking-tight leading-137">{testimonialCompany}</p>
                </div>
            </div>
        </section>
    );
};

export default TestimonialHeadingIndentBlock;
