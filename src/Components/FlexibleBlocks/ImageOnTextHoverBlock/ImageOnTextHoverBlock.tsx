"use client";

import React, { useState, useRef, useEffect, forwardRef } from "react";
import gsap from "gsap";
import IFlexibleBlock from "../IFlexibleBlock";
import IImageOnTextHoverBlock from "./IImageOnTextHoverBlock";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import DynamicHeading from "@/Common/DynamicHeading/DynamicHeading";
import HoverPortal from "@/Components/Layout/HoverPortal/HoverPortal";
import { getDepartmentTextColor } from "@/Helpers/GetDepartmentTextColor";

const ImageOnTextHoverBlock = forwardRef<HTMLDivElement, IFlexibleBlock<IImageOnTextHoverBlock>>(function ({ data }, ref) {
    const { heading, rows } = data.imageOnTextHoverFields || {};
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const hoverRef = useRef<HTMLDivElement>(null);
    const lastMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const handlePointerMove = (e: React.MouseEvent | React.PointerEvent) => {
        const x = e.clientX;
        const y = e.clientY;
        lastMouse.current = { x, y };
        const el = hoverRef.current;
        if (!el) return;
        const { offsetWidth: w, offsetHeight: h } = el;
        gsap.to(el, {
            duration: 0.2,
            x: x - w / 2,
            y: y - h / 2,
            ease: "power3.out",
        });
    };

    useEffect(() => {
        const onScroll = () => {
            if (hoveredIndex === null) return;
            const { x, y } = lastMouse.current;
            const el = hoverRef.current;
            if (!el) return;
            const { offsetWidth: w, offsetHeight: h } = el;
            gsap.to(el, {
                duration: 0.2,
                x: x - w / 2,
                y: y - h / 2,
                ease: "power3.out",
            });
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [hoveredIndex]);

    return (
        <section ref={ref} className="relative w-full my-60 lg:my-120" onPointerMove={handlePointerMove}>
            {heading && (
                <div className="px-30">
                    <DynamicHeading data={heading} className="text-blue-light text-58 leading-77 tracking-tight uppercase font-black" />
                </div>
            )}
            <div className="grid grid-cols-12 px-30 mt-50 lg:mt-100 overflow-hidden">
                {rows?.map((row, i) => {
                    const textColor = getDepartmentTextColor(row.department?.[0] || "");
                    return (
                        <div
                            key={i}
                            className="col-span-12 col-start-1 lg:col-start-2 group"
                            onPointerEnter={(e) => {
                                setHoveredIndex(i);
                                handlePointerMove(e);
                            }}
                            onPointerLeave={() => setHoveredIndex(null)}
                        >
                            <p
                                className={`text-38 lg:text-136 leading-72 tracking-tight font-black uppercase transition-all duration-300 group-hover:translate-x-30 lg:group-hover:translate-x-120 text-blue-dark hover:${textColor}`}
                            >
                                {row.text ?? "No Text"}
                            </p>
                        </div>
                    );
                })}

                {hoveredIndex !== null && rows?.[hoveredIndex] && (
                    <HoverPortal>
                        <div ref={hoverRef} className="fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference" style={{ opacity: 1 }}>
                            {rows[hoveredIndex].image && (
                                <DynamicImage data={rows[hoveredIndex].image} className="aspect-[300/450] w-460 mix-blend-saturation invert dark:invert-0" />
                            )}
                            <div className="transform rotate-90 origin-bottom-right">
                                <div className="flex justify-end mr-24">
                                    {rows[hoveredIndex].fullName && (
                                        <p className="text-16 text-blue-dark dark:text-white font-black uppercase mr-10 mix-blend-saturation invert dark:invert-0">
                                            {rows[hoveredIndex].fullName}
                                        </p>
                                    )}
                                    {rows[hoveredIndex].department && (
                                        <div className="flex flex-wrap gap-2">
                                            {rows[hoveredIndex].department.map((dep, idx) => (
                                                <p
                                                    key={idx}
                                                    className={`text-16 uppercase font-black mix-blend-saturation invert dark:invert-0 ${getDepartmentTextColor(
                                                        dep
                                                    )}`}
                                                >
                                                    {dep}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </HoverPortal>
                )}
            </div>
        </section>
    );
});

export default ImageOnTextHoverBlock;
