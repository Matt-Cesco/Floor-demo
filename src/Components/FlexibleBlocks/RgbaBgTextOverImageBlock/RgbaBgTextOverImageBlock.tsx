"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import IRgbaBgTextOverImageBlock from "./IRgbaBgTextOverImageBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import { getSpacing } from "@/Helpers/GetSpacing";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";

gsap.registerPlugin(ScrollTrigger);

export default function RgbaBgTextOverImageBlock({ data }: IFlexibleBlock<IRgbaBgTextOverImageBlock>) {
    const { spacingBottomOptions, spacingTopOptions, text, image } = data.rgbaBgTextOverImageFields || {};

    const topSpacingClass = getSpacing(spacingTopOptions);
    const bottomSpacingClass = getSpacing(spacingBottomOptions);

    const blockRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const blockEl = blockRef.current;
        const pinEl = stickyRef.current;
        if (!blockEl || !pinEl) return;

        const START_OFFSET = 30;

        const trig = ScrollTrigger.create({
            scroller: "#smooth-wrapper",
            trigger: pinEl,
            start: `top top+=${START_OFFSET}px`,
            endTrigger: blockEl,
            end: `bottom bottom-=${START_OFFSET}px`,
            pin: pinEl,
            pinSpacing: true,
            pinType: "transform",
        });

        ScrollTrigger.refresh();

        return () => trig.kill();
    }, []);

    return (
        <div ref={blockRef} className={`rgbaBgTextOverImage grid grid-cols-12 gap-20 ${topSpacingClass} ${bottomSpacingClass} relative aspect-[1452/1064] px-30`}>
            {image && (
                <div className="absolute inset-0 h-full px-30">
                    <DynamicImage data={image} className="w-full h-full object-cover" />
                </div>
            )}
            <div className="relative col-span-12 col-start-1 lg:col-span-6 lg:col-start-1 z-10">
                <div ref={stickyRef} className="bg-[linear-gradient(0deg,_#F4238E_0%,_#009BDF_100%)] m-30">
                    <p className="text-32 font-black text-white leading-81 tracking-tight uppercase p-30 lg:p-100">{text}</p>
                </div>
            </div>
        </div>
    );
}
