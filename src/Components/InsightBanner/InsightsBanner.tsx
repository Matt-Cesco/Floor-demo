"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import FormatDate from "@/Common/FormatDate";
import { MediaItem } from "@/Graphql/generated";

interface TeamMember {
    id: string;
    title: string;
    featuredImage?: { node: MediaItem };
}

interface Author {
    nodes: TeamMember[];
}

interface InsightsBannerProps {
    title: string;
    date: string;
    featuredImage: { node: MediaItem };
    readingTime?: number;
    author?: Author;
}

const InsightsBanner: React.FC<InsightsBannerProps> = ({ title, date, featuredImage, readingTime, author }) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const featuredImgRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);

        if (titleRef.current) {
            const split = new SplitText(titleRef.current, { type: "lines", linesClass: "split-child" });
            titleRef.current.parentElement?.classList.add("split-parent");
            gsap.from(split.lines, {
                scrollTrigger: {
                    trigger: titleRef.current.parentElement,
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

        if (featuredImgRef.current) {
            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: featuredImgRef.current,
                    start: "top bottom",
                    toggleActions: "restart none none reset",
                },
            });
            tl2.set(featuredImgRef.current, { autoAlpha: 1 });
            tl2.from(featuredImgRef.current, {
                xPercent: 0,
                duration: 1.5,
                ease: "power2.out",
            });
            tl2.from(featuredImgRef.current, {
                xPercent: 100,
                scale: 1,
                duration: 1.5,
                delay: -1.5,
                ease: "power2.out",
            });
        }
    }, []);

    return (
        <section>
            <div className="relative grid grid-cols-12 gap-20 px-30 lg:mt-120">
                <div className="relative lg:absolute col-span-12 col-start-1 lg:col-span-5 lg:col-start-1 overflow-hidden">
                    <h1
                        ref={titleRef}
                        className="relative z-10 text-blue-light text-40 lg:text-100 font-black leading-72 tracking-tight uppercase mt-120 lg:mt-0"
                    >
                        {title}
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-20 px-30 -z-10 w-full mt-60 lg:mt-150">
                <div className="flex flex-col justify-end col-span-12 col-start-1 lg:col-span-3 lg:col-start-1 overflow-hidden">
                    <div className="flex items-center">
                        {author && author.nodes.length > 0 && (
                            <DynamicImage data={author.nodes[0].featuredImage} className="h-60 w-60 rounded-full object-cover" />
                        )}
                        <div className="ml-20 text-blue-dark dark:text-white">
                            {author && author.nodes.length > 0 && (
                                <p className="font-black leading-137 text-16 text-blue-dark dark:text-white">{author.nodes[0].title}</p>
                            )}
                            <div className="flex text-16">
                                <FormatDate dateString={date} />
                                {readingTime && <span className="ml-10 text-blue-dark dark:text-white">{readingTime} min read</span>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 col-start-1 lg:col-span-8 lg:col-start-5 overflow-hidden">
                    <DynamicImage ref={featuredImgRef} data={featuredImage} className="aspect-[957/593] w-full object-cover" />
                </div>
            </div>
        </section>
    );
};

export default InsightsBanner;
