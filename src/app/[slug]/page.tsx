import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFlexiblePageBySlug } from "@/lib/wp-flexible";
import type { AllBlockDataTypes } from "@/Components/FlexibleBlocks/AllBlockDataTypes";
import FlexibleBlocks from "@/Components/FlexibleBlocks/FlexibleBlocks";
import Banner from "@/Components/Banner/Banner";
import { getBannerBySlug } from "@/lib/acf/getBanner";
import { generateYoastMetadata } from "@/lib/seoHelpers";

interface PageProps {
    // In your setup, params is a Promise – mirror that so TS stays happy
    params: Promise<{ slug: string }>;
}

export const revalidate = 60;

// Yoast metadata
export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { slug } = await props.params;
    return generateYoastMetadata({ slug });
}

export default async function Page(props: PageProps) {
    const { slug } = await props.params;

    // Fetch flexible content + banner in parallel
    const [page, banner] = await Promise.all([getFlexiblePageBySlug(slug), getBannerBySlug(slug)]);

    if (!page) notFound();

    const flexible = (page.acf?.flexible ?? []) as AllBlockDataTypes[];

    return (
        <main>
            {banner && <Banner data={banner} />}
            {flexible.length > 0 && <FlexibleBlocks allBlocks={flexible} />}
        </main>
    );
}
