// Auto-generated fetcher for ACF group "Banner"
import type IBanner from "@/Types/Acf/Banner";
import { wpFetch } from "@/lib/wp-api";

interface WpPage {
  id: number;
  slug: string;
  title: { rendered: string };
  acf?: Record<string, unknown>;
}

/**
 * Fetch ACF for group "Banner" attached to a page by slug.
 * This assumes the group fields live directly under page.acf.
 * Adjust mapping if you wrap them in a group field.
 */
export async function getBannerBySlug(slug: string): Promise<IBanner | null> {
  const pages = await wpFetch<WpPage[]>(
    `/pages?slug=${encodeURIComponent(slug)}&per_page=1&acf_format=standard&_fields=acf`,
    { revalidate: 60 },
  );

  const page = pages[0];
  if (!page || !page.acf) return null;

  // Cast entire ACF object to IBanner.
  // If you only want a subset, refine this mapping.
  return page.acf as IBanner;
}
