"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import MorphSVGPlugin from "gsap/dist/MorphSVGPlugin";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

type Shape = {
    path: string;
    gradientId: string;
    gradient: JSX.Element;
};

export default function MorphingBackground() {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathname = usePathname();

    const shapes: Shape[] = useMemo(
        () => [
            {
                path: "M932.108 -11.6101L1.70703 917.494L932.108 1846.6L1862.51 917.494L932.108 -11.6101Z",
                gradientId: "paint0_linear_233_1391",
                gradient: (
                    <>
                        <stop offset="0.33" stopColor="#F48448" />
                        <stop offset="0.66" stopColor="#88CB01" />
                    </>
                ),
            },
            {
                path: "M932.108,917.494 m-930,0 a930,930 0 1,0 1860,0 a930,930 0 1,0 -1860,0",
                gradientId: "paint0_linear_circle",
                gradient: (
                    <>
                        <stop offset="0.33" stopColor="#F48448" />
                        <stop offset="0.66" stopColor="#88CB01" />
                    </>
                ),
            },
            {
                path: "M634.777 -97H3L799.428 698.5L3 1494H634.777L1431 698.5L634.777 -97Z",
                gradientId: "paint0_linear_156_528",
                gradient: (
                    <>
                        <stop offset="0.33" stopColor="#9747FF" />
                        <stop offset="0.66" stopColor="#F4238E" />
                    </>
                ),
            },
            {
                path: "M60.5302 142.8C-101.178 525.652 77.8915 967.172 460.46 1129L661.448 653.166C541.5 602.439 485.355 463.974 536.043 343.937C586.732 223.9 725.095 167.713 845.043 218.44L1046 -257.426C663.432 -419.253 222.238 -240.052 60.5302 142.8Z",
                gradientId: "paint0_linear_85_360",
                gradient: (
                    <>
                        <stop offset="0.486968" stopColor="#88CB01" />
                        <stop offset="0.69956" stopColor="#F4238E" />
                    </>
                ),
            },
        ],
        []
    );

    const [startShape, setStartShape] = useState<Shape | null>(null);
    const [endShape, setEndShape] = useState<Shape | null>(null);

    useEffect(() => {
        const i = Math.floor(Math.random() * shapes.length);
        let j = Math.floor(Math.random() * shapes.length);
        while (j === i) j = Math.floor(Math.random() * shapes.length);

        setStartShape(shapes[i]);
        setEndShape(shapes[j]);
    }, [pathname, shapes]);

    useEffect(() => {
        if (!svgRef.current || !startShape || !endShape) return;

        gsap.to("#morphPath", {
            morphSVG: endShape.path,
            ease: "none",
            scrollTrigger: {
                trigger: "#smooth-content",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            },
        });
    }, [startShape, endShape]);

    if (!startShape || !endShape) return null;

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <svg
                ref={svgRef}
                className="fixed inset-0 -z-10 w-full"
                xmlns="http://www.w3.org/2000/svg"
                width="1486"
                height="1849"
                viewBox="0 0 1486 1849"
                fill="none"
            >
                <defs>
                    <linearGradient id={startShape.gradientId} x1="1397.31" y1="1382.05" x2="468.206" y2="451.646" gradientUnits="userSpaceOnUse">
                        {startShape.gradient}
                    </linearGradient>
                </defs>
                <path id="morphPath" d={startShape.path} stroke={`url(#${startShape.gradientId})`} strokeWidth="2" strokeMiterlimit="10" className="w-full" />
            </svg>
        </div>
    );
}
