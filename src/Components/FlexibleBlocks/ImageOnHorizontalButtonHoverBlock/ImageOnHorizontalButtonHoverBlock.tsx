"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import { motion } from "framer-motion";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import FlipLink from "@/Common/FlipLink/FlipLink";
import IFlexibleBlock from "../IFlexibleBlock";
import IImageOnHorizontalButtonHoverBlock from "./IImageOnHorizontalButtonHoverBlock";
import HoverPortal from "@/Components/Layout/HoverPortal/HoverPortal";

function getLayoutClasses(index: number) {
    switch (index) {
        case 0:
            return "col-span-12 w-full lg:col-start-4 lg:w-max";
        case 1:
            return "col-span-12 w-full lg:col-start-2 lg:w-max";
        case 2:
            return "col-span-12 w-full lg:col-start-5 lg:w-max";
        case 3:
            return "col-span-12 w-full lg:col-start-3 lg:w-max";
        default:
            return "col-span-12 w-full lg:col-start-4 lg:w-max";
    }
}

function getFlipColorClass(colorKey?: string) {
    return `text-${colorKey ?? "blue-light"}`;
}

const MobileArrow = () => (
    <span className="inline-block ml-10 lg:hidden rotate-45">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 12 12" fill="none">
            <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="#009BDF" />
        </svg>
    </span>
);

export default function ImageOnHorizontalButtonHoverBlock({ data }: IFlexibleBlock<IImageOnHorizontalButtonHoverBlock>) {
    const { rows } = data.imageOnHorizontalButtonHoverFields || [];
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const lastMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const handlePointerMove = (e: MouseEvent<HTMLElement>) => {
        const { clientX: x, clientY: y } = e;
        lastMouse.current = { x, y };
        setPos({ x, y });
    };

    const handlePointerEnter = (e: MouseEvent<HTMLElement>, i: number) => {
        const { clientX: x, clientY: y } = e;
        lastMouse.current = { x, y };
        setPos({ x, y });
        setHoveredIndex(i);
    };

    const handlePointerLeave = () => {
        setHoveredIndex(null);
    };

    useEffect(() => {
        const onScroll = () => {
            const { x, y } = lastMouse.current;
            const el = document.elementFromPoint(x, y) as HTMLElement | null;
            const hovered = el?.closest("[data-hover-index]");
            if (hovered) {
                const idx = Number(hovered.getAttribute("data-hover-index"));
                setHoveredIndex(idx);
            } else {
                setHoveredIndex(null);
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <section className="relative my-60 lg:my-120" onPointerMove={handlePointerMove}>
            {rows.map((row, i) => (
                <div key={i} className="grid grid-cols-12 gap-20 px-30">
                    <div
                        data-hover-index={i}
                        className={`${getLayoutClasses(i)} justify-self-start`}
                        onPointerEnter={(e) => handlePointerEnter(e, i)}
                        onPointerLeave={handlePointerLeave}
                    >
                        {row.link && (
                            <div className="flex items-end">
                                <FlipLink
                                    href={row.link.url ?? "#"}
                                    target={row.link.target ?? "_self"}
                                    baseColor="text-blue-dark dark:text-white"
                                    flipColor={getFlipColorClass(row.titleColor)}
                                    className="text-60 lg:text-230 leading-72 font-black tracking-tight uppercase"
                                >
                                    {row.link.title ?? "No Title"}
                                </FlipLink>
                                <MobileArrow />
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {hoveredIndex !== null && rows[hoveredIndex]?.image && (
                <HoverPortal>
                    <motion.div
                        className="fixed z-[9999] pointer-events-none mix-blend-difference transition-transform duration-200 ease-out"
                        style={{
                            transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ opacity: { duration: 0.2 } }}
                    >
                        <DynamicImage
                            data={rows[hoveredIndex].image}
                            className="aspect-[584/419] object-cover w-260 mix-blend-saturation invert dark:invert-0"
                        />
                    </motion.div>
                </HoverPortal>
            )}
        </section>
    );
}

// blue-light blue-dark green, text-green text-purple text-pink text-orange
