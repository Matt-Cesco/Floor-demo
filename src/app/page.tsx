import type { Metadata } from "next";
import { generateYoastMetadata } from "@/Helpers/seoHelpers";
import { getPageBySlug } from "@/Graphql/wordpressCMS/getPageBySlug";
import FlexibleBlocks from "@/Components/FlexibleBlocks/FlexibleBlocks";
import HomepageBanner from "@/Components/HomepageBanner/HomepageBanner";
import { getHomepageBanner } from "@/Graphql/wordpressCMS/queries/getHomepageBanner";

export async function generateMetadata(): Promise<Metadata> {
    return generateYoastMetadata({ slug: "/" });
}

const PageComponent = async () => {
    const [pageData, bannerData] = await Promise.all([getPageBySlug("/"), getHomepageBanner()]);

    return (
        <>
            <HomepageBanner data={bannerData} />
            {pageData?.flexibleContent?.flexible && <FlexibleBlocks allBlocks={pageData.flexibleContent.flexible} />}
        </>
    );
};

export default PageComponent;
