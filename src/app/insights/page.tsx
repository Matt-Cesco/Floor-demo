import type { Metadata } from "next";
import { generateYoastMetadata } from "@/Helpers/seoHelpers";
import { getAllInsights } from "@/Graphql/wordpressCMS/queries/getAllInsights";
import { getACFBySlug } from "@/Graphql/wordpressCMS/getACFBySlug";
import InsightsListingClient from "./InsightsListingClient";

export async function generateMetadata(): Promise<Metadata> {
    return generateYoastMetadata({ slug: "/insights/" });
}

export default async function InsightsListingPage() {
    const listingSlug = "/insights/";
    const [listingData, insightsItems] = await Promise.all([getACFBySlug(listingSlug, "page"), getAllInsights()]);

    return <InsightsListingClient listingData={listingData} insights={insightsItems} />;
}
