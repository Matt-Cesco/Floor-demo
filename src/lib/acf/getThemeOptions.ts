// Auto-generated fetcher for ACF group "Theme Options"
import type IThemeOptions from "@/Types/Acf/ThemeOptions";
import { WP_ROOT } from "@/lib/wp-api";

/**
 * Fetches Theme Options from /wp-json/wp/v2/options/theme-options
 * and casts them directly to IThemeOptions.
 *
 * The endpoint returns the ACF fields at the top level, e.g.:
 * {
 *   "agents": [...],
 *   "footer_bottom_link": {...},
 *   ...
 * }
 */
export async function getThemeOptions(): Promise<IThemeOptions | null> {
  try {
    const res = await fetch(`${WP_ROOT}/wp-json/wp/v2/options/theme-options`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("getThemeOptions failed:", res.status, text || res.statusText);
      return null;
    }

    const json = (await res.json()) as IThemeOptions;
    return json ?? null;
  } catch (error) {
    console.error("getThemeOptions failed:", error);
    return null;
  }
}
