// src/lib/seoHelpers.ts
import type { Metadata } from "next";
import { getFlexiblePageBySlug } from "@/lib/wp-flexible";

export type YoastHeadJson = {
    title?: string;
    description?: string;
    canonical?: string;
    robots?: {
        index?: "index" | "noindex";
        follow?: "follow" | "nofollow";
        [key: string]: string | undefined;
    };
    og_title?: string;
    og_description?: string;
    og_url?: string;
    og_image?: { url: string }[];
};

type SEOParams = { slug: string };

const normalisePath = (slug: string) => {
    if (!slug) return "/";
    return slug.startsWith("/") ? slug : `/${slug}`;
};

// Interpret robots flags from Yoast
const isNoindex = (value: string | undefined): boolean => value === "noindex";
const isNofollow = (value: string | undefined): boolean => value === "nofollow";

function buildRobots(yoast?: YoastHeadJson) {
    const noindex = isNoindex(yoast?.robots?.index);
    const nofollow = isNofollow(yoast?.robots?.follow);

    const isProd = process.env.ENVIRONMENT === "production";

    // Force noindex/nofollow outside production – same behaviour as before
    if (!isProd) {
        return { index: false, follow: false };
    }

    return {
        index: !noindex,
        follow: !nofollow,
    };
}

/**
 * Generic helper to turn a YoastHeadJson object into Next.js Metadata.
 * Can be reused for pages, posts, CPTs, etc.
 */
export function buildMetadataFromYoast(opts: { yoast?: YoastHeadJson; slug: string; fallbackTitle: string; fallbackDescription?: string }): Metadata {
    const { yoast, slug, fallbackTitle, fallbackDescription = "Page Description" } = opts;

    const robots = buildRobots(yoast);

    const title = yoast?.title || fallbackTitle;
    const description = yoast?.description || fallbackDescription;
    const url = yoast?.og_url || yoast?.canonical || normalisePath(slug);

    const ogTitle = yoast?.og_title || yoast?.title || fallbackTitle;
    const ogDescription = yoast?.og_description || yoast?.description || fallbackDescription;

    return {
        title,
        description,
        alternates: {
            canonical: yoast?.canonical,
        },
        robots,
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            url,
            images: yoast?.og_image?.length ? yoast.og_image.map((img) => ({ url: img.url })) : [],
        },
    };
}

/**
 * Existing helper for flexible pages (/[slug]) using wp-flexible.
 * Now implemented in terms of buildMetadataFromYoast.
 */
export async function generateYoastMetadata({ slug }: SEOParams): Promise<Metadata> {
    const page = await getFlexiblePageBySlug(slug);
    const yoast = page?.yoast_head_json;

    const fallbackTitle = page?.title?.rendered || "Page Title";

    return buildMetadataFromYoast({
        yoast,
        slug,
        fallbackTitle,
    });
}
