"use client";

import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import FormatDate from "@/Common/FormatDate";
import FlexibleBlocks from "@/Components/FlexibleBlocks/FlexibleBlocks";
import AnimatedLink from "@/Components/Layout/AnimatedLink";
import { MediaItem } from "@/Graphql/generated";

type InsightsItem = {
    title: string;
    slug: string;
    uri: string;
    date: string;
    featuredImage: { node: MediaItem };
    readingTime: number;
};

type ListingData = {
    flexibleContent?: {
        flexible?: any[];
    };
};

type InsightsListingClientProps = {
    listingData: ListingData | null;
    insights: InsightsItem[];
};

export default function InsightsListingClient({ listingData, insights }: InsightsListingClientProps) {
    return (
        <div className="min-h-screen px-30 py-20">
            <h1 className="text-blue-light text-40 lg:text-163 font-black leading-72 tracking-tight uppercase px-30 mt-120 lg:mt-190 mb-40 lg:mb-120">
                Insights
            </h1>

            <div className="grid grid-cols-12 gap-x-20">
                {insights.map((insight, i) => (
                    <div
                        key={insight.slug}
                        className={`col-span-12 lg:col-span-5 ${i % 2 === 0 ? "lg:col-start-2" : "lg:col-start-7"} py-20 border-t border-blue-dark ${
                            i === insights.length - 1 || (insights.length % 2 === 1 && i === insights.length - 1) ? "border-b" : ""
                        }`}
                    >
                        <AnimatedLink href={`/insights/${insight.slug}`}>
                            <div className="group grid grid-cols-12 items-end gap-x-20">
                                <div className="col-span-12 lg:col-span-5 overflow-hidden">
                                    <DynamicImage
                                        data={insight.featuredImage}
                                        className="w-full aspect-[224/140] object-cover transition duration-1000 ease-in-out group-hover:scale-110"
                                    />
                                </div>
                                <div className="col-span-12 lg:col-span-5">
                                    <h3 className="text-blue-dark dark:text-white group-hover:text-blue-light text-20 font-black leading-85 uppercase mt-10">
                                        {insight.title}
                                    </h3>
                                </div>
                            </div>
                        </AnimatedLink>
                    </div>
                ))}
            </div>

            {listingData?.flexibleContent?.flexible && <FlexibleBlocks allBlocks={listingData.flexibleContent.flexible} />}
        </div>
    );
}
