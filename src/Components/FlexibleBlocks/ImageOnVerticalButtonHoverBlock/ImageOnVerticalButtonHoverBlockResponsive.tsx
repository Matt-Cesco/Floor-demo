"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FlipLink from "@/Common/FlipLink/FlipLink";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import HoverPortal from "@/Components/Layout/HoverPortal/HoverPortal";
import IFlexibleBlock from "../IFlexibleBlock";
import IImageOnVerticalButtonHoverBlock from "./IImageOnVerticalButtonHoverBlock";

function getFlipColorClass(colorKey?: string) {
    return `text-${colorKey || "blue-light"}`;
}

function getLayoutClasses(index: number) {
    return "col-span-12";
}

export default function ImageOnVerticalButtonHoverBlockResponsive({ data }: IFlexibleBlock<IImageOnVerticalButtonHoverBlock>) {
    const { rows } = data.imageOnVerticalButtonHoverFields || {};
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handlePointerMove = (e: React.PointerEvent) => {
        setPos({ x: e.clientX, y: e.clientY });
    };

    const handlePointerEnter = (_: React.PointerEvent, i: number) => {
        setHoveredIndex(i);
    };

    const handlePointerLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <section className="relative my-60 lg:my-120" onPointerMove={handlePointerMove}>
            {rows?.map((row, i) => (
                <div key={i} className="grid grid-cols-12 gap-20 px-30">
                    <div
                        data-hover-index={i}
                        className={`${getLayoutClasses(i)} justify-self-start`}
                        onPointerEnter={(e) => handlePointerEnter(e, i)}
                        onPointerLeave={handlePointerLeave}
                    >
                        {row.link && (
                            <FlipLink
                                href={row.link.url ?? "#"}
                                target={row.link.target ?? "_self"}
                                baseColor="text-blue-dark dark:text-white"
                                flipColor={getFlipColorClass(row.titleColor)}
                                className="text-60 lg:text-230 leading-72 font-black tracking-tight uppercase"
                            >
                                {row.link.title ?? "No Title"}
                            </FlipLink>
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
