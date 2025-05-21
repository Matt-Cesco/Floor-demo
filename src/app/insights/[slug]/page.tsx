import type { Metadata } from "next";
import { generateYoastMetadata } from "@/Helpers/seoHelpers";
import InsightsBanner from "@/Components/InsightBanner/InsightsBanner";
import { getACFBySlug } from "@/Graphql/wordpressCMS/getACFBySlug";
import FlexibleBlocks from "@/Components/FlexibleBlocks/FlexibleBlocks";
import { getSingleInsightBySlug } from "@/Graphql/wordpressCMS/queries/getSingleInsightBySlug";

interface InsightPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
    const insightSlug = `/insight/${params.slug}/`;
    return generateYoastMetadata({ slug: insightSlug });
}

const InsightSinglePage = async ({ params }: InsightPageProps) => {
    const { slug } = params;
    const insightSlug = `/insight/${slug}/`;

    const insightACFData = await getACFBySlug(insightSlug, "insight");
    const insightContentData = await getSingleInsightBySlug(insightSlug);

    if (!insightACFData || !insightContentData) {
        return <p>Insight not found</p>;
    }

    const { title, date, featuredImage } = insightContentData;
    const { readingTime, author } = insightContentData.bannerInsights.bannerInsightsFields;

    return (
        <>
            <InsightsBanner title={title} date={date} featuredImage={featuredImage} readingTime={readingTime} author={author} />
            {insightACFData.flexibleContent?.flexible && <FlexibleBlocks allBlocks={insightACFData.flexibleContent?.flexible} />}
        </>
    );
};

export default InsightSinglePage;
