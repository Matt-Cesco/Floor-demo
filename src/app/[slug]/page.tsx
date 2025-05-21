import type { Metadata } from "next";
import { getPageBySlug } from "@/Graphql/wordpressCMS/getPageBySlug";
import { getBannerBySlug } from "@/Graphql/wordpressCMS/queries/getBannerBySlug";
import FlexibleBlocks from "@/Components/FlexibleBlocks/FlexibleBlocks";
import Banner from "@/Components/Banner/Banner";
import { notFound } from "next/navigation";
import { generateYoastMetadata } from "@/Helpers/seoHelpers";

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    return generateYoastMetadata({ slug: params.slug });
}

const PageComponent = async ({ params }: PageProps) => {
    const { slug } = params;
    const [pageData, bannerData] = await Promise.all([getPageBySlug(slug), getBannerBySlug(slug)]);
    if (!pageData) {
        return notFound();
    }

    return (
        <>
            {!(slug === "insights" || slug === "contact") && bannerData?.banner && <Banner data={bannerData.banner.bannerFields} />}
            {pageData.flexibleContent?.flexible && <FlexibleBlocks allBlocks={pageData.flexibleContent.flexible} />}
        </>
    );
};

export default PageComponent;
