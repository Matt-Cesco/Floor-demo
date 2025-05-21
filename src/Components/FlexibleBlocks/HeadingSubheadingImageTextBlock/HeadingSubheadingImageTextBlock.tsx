"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IFlexibleBlock from "../IFlexibleBlock";
import IHeadingSubheadingImageTextBlock from "./IHeadingSubheadingImageTextBlock";
import DynamicHeading from "@/Common/DynamicHeading/DynamicHeading";
import DynamicText from "@/Common/DynamicText/DynamicText";
import getImageOrVideo from "@/Helpers/GetImageorVideo";
import { OrientationOptions } from "./OrientationOptions";

gsap.registerPlugin(ScrollTrigger);

export default function HeadingSubheadingImageTextBlock({ data }: IFlexibleBlock<IHeadingSubheadingImageTextBlock>) {
    const { orientationOptions, subheading, text, videoOrImageOptions, heading, image, video } = data.headingSubheadingImageTextFields || {};

    const blockRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const block = blockRef.current;
        const imgWrap = imgRef.current;
        if (!block || !imgWrap) return;

        const STICK_OFFSET = 20;
        const STICK_OFFSET_BOTTOM = 20;

        const st = ScrollTrigger.create({
            trigger: imgWrap,
            start: `top top+=${STICK_OFFSET}`,
            endTrigger: block,
            end: `bottom bottom-=${STICK_OFFSET_BOTTOM}`,
            pin: imgWrap,
            pinSpacing: true,
            pinType: "transform",
        });

        ScrollTrigger.refresh();

        return () => st.kill();
    }, []);

    return (
        <div ref={blockRef} className="relative grid grid-cols-12 gap-20 px-30 my-60 lg:my-120">
            {orientationOptions === OrientationOptions.imageLeft ? (
                <>
                    <div className="col-span-12 lg:col-span-6 lg:col-start-1">
                        <div ref={imgRef}>{getImageOrVideo({ videoOrImageOptions, image, video })}</div>
                    </div>
                    <div className="col-span-12 lg:col-span-4 lg:col-start-8">
                        <DynamicHeading data={heading} className="text-48 leading-100 font-bold tracking-tight text-blue-light" />
                        {subheading && <p className="my-100 text-32 leading-106 indent-[26%] text-blue-dark dark:text-white">{subheading}</p>}
                        {text && (
                            <div className="mt-10">
                                <DynamicText data={text} />
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className="col-span-12 lg:col-span-4 lg:col-start-1">
                        <DynamicHeading data={heading} className="text-48 leading-100 font-bold tracking-tight text-blue-light" />
                        {subheading && <p className="my-100 text-32 leading-106 indent-[26%] text-blue-dark dark:text-white">{subheading}</p>}
                        {text && (
                            <div className="mt-10">
                                <DynamicText data={text} />
                            </div>
                        )}
                    </div>
                    <div className="col-span-12 lg:col-span-7 lg:col-start-6">
                        <div ref={imgRef}>{getImageOrVideo({ videoOrImageOptions, image, video })}</div>
                    </div>
                </>
            )}
        </div>
    );
}
