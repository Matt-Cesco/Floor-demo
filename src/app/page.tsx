// src/app/page.tsx
import type { Metadata } from "next";
import { generateYoastMetadata } from "@/lib/seoHelpers";
import FlexibleBlocks from "@/Components/FlexibleBlocks/FlexibleBlocks";
import HomepageBanner from "@/Components/HomepageBanner/HomepageBanner";
import { getFlexiblePageBySlug } from "@/lib/wp-flexible";
import { getHomepageBannerBySlug } from "@/lib/acf";

const HOME_SLUG = "home";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
    return generateYoastMetadata({ slug: HOME_SLUG });
}

const PageComponent = async () => {
    const pageData = await getFlexiblePageBySlug(HOME_SLUG);
    const flexibleBlocks = pageData?.acf?.flexible ?? [];

    // Fetch homepage banner ACF group (attached to the "home" page)
    const bannerData = await getHomepageBannerBySlug(HOME_SLUG);

    return (
        <>
            {bannerData && <HomepageBanner data={bannerData} />}
            {flexibleBlocks.length > 0 && <FlexibleBlocks allBlocks={flexibleBlocks} />}
        </>
    );
};

export default PageComponent;
