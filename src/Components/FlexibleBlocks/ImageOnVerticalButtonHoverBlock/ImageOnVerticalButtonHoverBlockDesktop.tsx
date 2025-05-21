"use client";

import { MouseEvent, useState, useRef, Key, ReactNode, ReactElement } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import FlipLink from "@/Common/FlipLink/FlipLink";
import IFlexibleBlock from "../IFlexibleBlock";
import IImageOnVerticalButtonHoverBlock from "./IImageOnVerticalButtonHoverBlock";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import HoverPortal from "@/Components/Layout/HoverPortal/HoverPortal";

function getMarginTopClass(index: number) {
    switch (index) {
        case 0:
            return "col-start-4 mt-224";
        case 1:
            return "mt-673";
        case 2:
            return "mt-447";
        case 3:
            return "mt-0";
        default:
            return "mt-224";
    }
}

function getFlipColorClass(colorKey?: string) {
    return `text-${colorKey || "blue-light"}`;
}

export default function ImageOnVerticalButtonHoverBlockDesktop({ data }: IFlexibleBlock<IImageOnVerticalButtonHoverBlock>) {
    const { rows } = data.imageOnVerticalButtonHoverFields || {};
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const hoverImageRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent) => {
        if (!hoverImageRef.current) return;
        const { offsetWidth, offsetHeight } = hoverImageRef.current;
        gsap.to(hoverImageRef.current, {
            duration: 0.2,
            x: e.clientX - offsetWidth / 2,
            y: e.clientY - offsetHeight / 2,
            ease: "power3.out",
        });
    };

    return (
        <section className="relative w-[80%] mx-auto h-auto my-60 lg:my-120" onMouseMove={handleMouseMove}>
            <div className="grid grid-cols-12 gap-20">
                {rows?.map((row, i) => {
                    const marginTopClass = getMarginTopClass(i);
                    const flipColor = getFlipColorClass(row.titleColor);
                    const textContent = row.link.title || "No Title";

                    return (
                        <div key={i} className={`col-span-2 ${marginTopClass} relative grid grid-cols-12 h-fit`}>
                            {/* invisible placeholder just to take necessary space */}
                            <Link
                                href={row.link.url ?? "#"}
                                target={row.link.target ?? "_self"}
                                className="block text-250 xl:text-338 leading-none font-black tracking-tight uppercase opacity-0"
                                style={{ letterSpacing: "-23rem" }}
                            >
                                {textContent.split("").map((letter, idx: Key) => (
                                    <span
                                        key={idx}
                                        style={{
                                            display: "inline-block",
                                            transform: "rotate(90deg)",
                                            transformOrigin: "center",
                                        }}
                                    >
                                        {letter}
                                    </span>
                                ))}
                            </Link>
                            {/* visible FlipLink */}
                            <div className="absolute">
                                <FlipLink
                                    href={row.link.url ?? "#"}
                                    target={row.link.target ?? "_self"}
                                    baseColor="text-blue-dark dark:text-white"
                                    flipColor={flipColor}
                                    className="block text-200 lg:text-250 xl:text-250 2xl:text-300 3xl:text-380 leading-none font-black tracking-tight uppercase transform origin-top-left rotate-90 w-fit"
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {textContent}
                                </FlipLink>
                            </div>
                        </div>
                    );
                })}
            </div>

            {hoveredIndex !== null && rows?.[hoveredIndex]?.image && (
                <HoverPortal>
                    <motion.div
                        ref={hoverImageRef}
                        className="fixed top-0 left-0 z-10 pointer-events-none mix-blend-difference"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <DynamicImage data={rows[hoveredIndex].image} className="aspect-[584/419] w-584 mix-blend-saturation invert dark:invert-0" />
                    </motion.div>
                </HoverPortal>
            )}
        </section>
    );
}
