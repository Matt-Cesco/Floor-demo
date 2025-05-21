"use client";

import React, { useLayoutEffect, useRef, useState, MouseEvent } from "react";
import gsap from "gsap";
import FlipLink from "../../../Common/FlipLink/FlipLink";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import { MediaItem } from "@/Graphql/generated";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import HoverPortal from "../HoverPortal/HoverPortal";
import { getRandomSvg } from "@/Components/Layout/Menu/HoverSvgs";
import AnimatedLink from "../AnimatedLink";

interface MenuProps {
    data: {
        pageLink: { target: string; title: string; url: string };
    }[];
    isOpen: boolean;
    toggleMenu: () => void;
    logo: { node: MediaItem };
}

export default function Menu({ data, isOpen, toggleMenu, logo }: MenuProps) {
    const [hoveredSvg, setHoveredSvg] = useState<JSX.Element | null>(null);
    const hoverContainerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent) => {
        if (hoverContainerRef.current) {
            hoverContainerRef.current.style.left = `${e.clientX}px`;
            hoverContainerRef.current.style.top = `${e.clientY}px`;
        }
    };

    useLayoutEffect(() => {
        if (isOpen && containerRef.current) {
            const el = containerRef.current;
            const items = el.querySelectorAll(".menu-item");
            const tl = gsap.timeline();

            gsap.set(el, { clipPath: "inset(0% 0% 100% 0%)" });

            tl.to(el, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.5,
                ease: "power2.out",
            });

            tl.fromTo(items, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3");
        }
    }, [isOpen]);

    return (
        <div
            ref={containerRef}
            className={`fixed inset-0 z-[60] bg-white dark:bg-blue-dark ${isOpen ? "flex" : "hidden"} flex-col h-screen overflow-hidden`}
            onMouseMove={handleMouseMove}
        >
            <div className="grid grid-cols-12 gap-20 px-30 py-20">
                <div className="col-span-4 lg:col-span-2 col-start-1">
                    <AnimatedLink href="/" className="bg-transparent">
                        <DynamicImage data={logo} className="h-full" />
                    </AnimatedLink>
                </div>
                <div className="col-start-11 col-span-1 flex justify-end">
                    <ThemeToggle />
                </div>
                <div className="col-span-1 col-start-12 flex justify-end">
                    <button onClick={toggleMenu} className="rounded-full bg-blue-dark dark:bg-blue-light px-10 lg:px-20 py-20 lg:py-30">
                        <span className="text-16 font-medium leading-137 transition-colors duration-300 text-white">Close</span>
                    </button>
                </div>
            </div>

            <div className="containerImage absolute md:right-100 h-full -z-10 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="973" height="812" viewBox="0 0 973 812" fill="none" className="w-full h-screen">
                    <path
                        d="M60.5302 142.8C-101.178 525.652 77.8915 967.172 460.46 1129L661.448 653.166C541.5 602.439 485.355 463.974 536.043 343.937C586.732 223.9 725.095 167.713 845.043 218.44L1046 -257.426C663.432 -419.253 222.238 -240.052 60.5302 142.8Z"
                        stroke="url(#paint0_linear_85_360)"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                    />
                    <defs>
                        <linearGradient id="paint0_linear_85_360" x1="523.5" y1="1129" x2="523.5" y2="-317" gradientUnits="userSpaceOnUse">
                            <stop offset="0.486968" stopColor="#88CB01" />
                            <stop offset="0.69956" stopColor="#F4238E" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="flex-grow overflow-hidden">
                <div className="grid max-w-full grid-cols-12 gap-0 px-30 relative z-[60] h-full">
                    <div className="col-span-10 col-start-1 flex flex-col justify-end pb-30">
                        <nav className="grid grid-cols-1 gap-6 text-left">
                            <div className="flex flex-col items-start">
                                {data.map((item, index) => {
                                    const pageLink = item.pageLink;
                                    if (!pageLink) return null;
                                    return (
                                        <div key={index} onMouseEnter={() => setHoveredSvg(getRandomSvg())} onMouseLeave={() => setHoveredSvg(null)}>
                                            <FlipLink
                                                href={pageLink.url.replace("https://cms-barques.barques.dev", "")}
                                                target={pageLink.target || "_self"}
                                                onClick={toggleMenu}
                                                className="menu-item cursor-pointer font-black text-60 lg:text-100 block tracking-tight leading-72"
                                            >
                                                {pageLink.title}
                                            </FlipLink>
                                        </div>
                                    );
                                })}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

            {hoveredSvg && (
                <HoverPortal>
                    <div ref={hoverContainerRef} className="pointer-events-none fixed">
                        {hoveredSvg}
                    </div>
                </HoverPortal>
            )}
        </div>
    );
}
