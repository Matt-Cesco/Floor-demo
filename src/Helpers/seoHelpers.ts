// this component needs to be renamed
import type { Metadata } from "next";
import { getPageSEOBySlug } from "@/Graphql/wordpressCMS/queries/getPageSEOBySlug";

interface SEOParams {
    slug: string;
}

export async function generateYoastMetadata({ slug }: SEOParams): Promise<Metadata> {
    const seoData = await getPageSEOBySlug(slug);
    const seo = seoData?.seo;
    const defaultTitle = "My Default Page Title";
    const defaultDescription = "Default description for my website.";

    return {
        title: seo?.title || defaultTitle,
        description: seo?.metaDesc || defaultDescription,
        alternates: {
            canonical: seo?.canonical,
        },
        robots: {
            index: seo?.metaRobotsNoindex ? false : true,
            follow: seo?.metaRobotsNofollow ? false : true,
        },
        openGraph: {
            title: seo?.opengraphTitle || seo?.title || defaultTitle,
            description: seo?.opengraphDescription || seo?.metaDesc || defaultDescription,
            url: seo?.opengraphUrl || seo?.canonical,
            images: seo?.opengraphImage?.link ? [{ url: seo.opengraphImage.link }] : [],
        },
    };
}
