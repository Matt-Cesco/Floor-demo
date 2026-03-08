import { wpFetch } from "./wp-api";
import type { YoastHeadJson } from "@/lib/seoHelpers";

export interface WpNewsItem {
  id: number;
  slug: string;
  title: { rendered: string };
  yoast_head_json?: YoastHeadJson;
  acf?: Record<string, unknown>;
}

/**
 * Fetch list of news items (for listing page)
 */
export async function getNewsList(): Promise<WpNewsItem[]> {
  return wpFetch<WpNewsItem[]>(
    `/news?per_page=100&_fields=id,slug,title,yoast_head_json`,
    { revalidate: 60 }
  );
}

/**
 * Fetch a single news item by slug, with ACF & Yoast
 */
export async function getNewsBySlug(slug: string): Promise<WpNewsItem | null> {
  const items = await wpFetch<WpNewsItem[]>(
    `/news?slug=${encodeURIComponent(slug)}&per_page=1&_fields=id,slug,title,yoast_head_json,acf`,
    { revalidate: 60 }
  );
  return items[0] ?? null;
}
