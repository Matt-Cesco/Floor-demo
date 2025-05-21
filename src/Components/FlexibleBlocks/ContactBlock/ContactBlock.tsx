"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import IContactBlock from "./IContactBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import Link from "next/link";

const ContactBlock = ({ data }: IFlexibleBlock<IContactBlock>) => {
    const { title } = data.contactFields || {};
    const topTextRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);

        if (topTextRef.current) {
            const splitTop = new SplitText(topTextRef.current, { type: "lines", linesClass: "split-child" });
            topTextRef.current.classList.add("split-parent");
            gsap.from(splitTop.lines, {
                scrollTrigger: {
                    trigger: topTextRef.current,
                    start: "top bottom",
                    toggleActions: "play none none none",
                },
                yPercent: 100,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
                stagger: 0.1,
            });
        }

        if (titleRef.current) {
            const splitTitle = new SplitText(titleRef.current, { type: "lines", linesClass: "split-child" });
            titleRef.current.classList.add("split-parent");
            gsap.from(splitTitle.lines, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top bottom",
                    toggleActions: "play none none none",
                },
                yPercent: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.1,
            });
        }
    }, []);

    return (
        <section className="pt-120">
            <div className="grid grid-cols-12 gap-20 px-30">
                <div className="col-start-1 col-span-12 lg:col-span-2 lg:col-start-1">
                    <h1 className="text-blue-dark dark:text-white text-24 font-black leading-72 tracking-tight uppercase mb-60">Contact</h1>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-20 px-30">
                <div className="col-start-1 col-span-12 lg:col-span-8 lg:col-start-1">
                    <p ref={titleRef} className="overflow-hidden text-blue-light font-black leading-72 tracking-tight text-90 lg:text-163 uppercase mb-92">
                        {title}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-20 px-30 mb-110">
                <div className="col-start-1 col-span-12 lg:col-span-3 lg:col-start-4">
                    <p className="text-14 font-medium leading-100 tracking-tight uppercase mb-20 text-blue-dark dark:text-white">get in touch</p>
                    <Link
                        href="tel:0121 233 2080"
                        className="group flex items-center text-blue-dark dark:text-white uppercase text-21 leading-95 font-black tracking-tight"
                    >
                        0121 233 2080
                        <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z" fill="#009BDF" />
                            </svg>
                        </span>
                    </Link>
                    <Link
                        href="mailto:hi@barques.co.uk"
                        className="group flex items-center text-blue-dark dark:text-white uppercase text-21 leading-95 font-black tracking-tight"
                    >
                        hi@barques.co.uk
                        <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z" fill="#009BDF" />
                            </svg>
                        </span>
                    </Link>
                </div>
                <div className="col-start-1 col-span-12 lg:col-span-2 lg:col-start-7">
                    <p className="text-14 font-medium leading-100 tracking-tight uppercase mb-20 text-blue-dark dark:text-white">find us</p>
                    <Link href="https://g.page/barques-design-pr" target="_blank" className="group flex items-end text-16 font-medium tracking-tight">
                        <div className="flex flex-col">
                            <p className="text-blue-dark dark:text-white text-21 font-black leading-95 uppercase">Ludgate place</p>
                            <p className="text-blue-dark dark:text-white text-21 font-black leading-95 uppercase">23 Ludgate Hill</p>
                            <p className="text-blue-dark dark:text-white text-21 font-black leading-95 uppercase">Birmingham B3 1DX</p>
                        </div>
                        <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300 mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="#009BDF" />
                            </svg>
                        </span>
                    </Link>
                </div>
                <div className="col-start-1 col-span-12 lg:col-span-2 lg:col-start-10">
                    <p className="text-14 font-medium leading-100 tracking-tight uppercase mb-20 text-blue-dark dark:text-white">let's connect</p>
                    <Link
                        href="https://www.instagram.com/barques_uk/"
                        target="_blank"
                        className="group flex items-center text-blue-dark dark:text-white text-21 leading-95 font-black tracking-tight uppercase"
                    >
                        Instagram
                        <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="#009BDF" />
                            </svg>
                        </span>
                    </Link>
                    <Link
                        href="https://uk.linkedin.com/company/barques"
                        target="_blank"
                        className="group flex items-center text-blue-dark dark:text-white text-21 leading-95 font-black tracking-tight uppercase"
                    >
                        Linkedin
                        <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="#009BDF" />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ContactBlock;
