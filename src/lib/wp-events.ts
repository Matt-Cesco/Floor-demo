import { wpFetch } from "./wp-api";
import type { YoastHeadJson } from "@/lib/seoHelpers";

export interface WpEventsItem {
  id: number;
  slug: string;
  title: { rendered: string };
  yoast_head_json?: YoastHeadJson;
  acf?: Record<string, unknown>;
}

/**
 * Fetch list of events items (for listing page)
 */
export async function getEventsList(): Promise<WpEventsItem[]> {
  return wpFetch<WpEventsItem[]>(
    `/events?per_page=100&_fields=id,slug,title,yoast_head_json`,
    { revalidate: 60 }
  );
}

/**
 * Fetch a single events item by slug, with ACF & Yoast
 */
export async function getEventsBySlug(slug: string): Promise<WpEventsItem | null> {
  const items = await wpFetch<WpEventsItem[]>(
    `/events?slug=${encodeURIComponent(slug)}&per_page=1&_fields=id,slug,title,yoast_head_json,acf`,
    { revalidate: 60 }
  );
  return items[0] ?? null;
}
