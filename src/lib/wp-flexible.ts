// src/lib/wp-flexible.ts
import { wpFetch } from "./wp-api";
import { AllBlockDataTypes } from "@/Components/FlexibleBlocks/AllBlockDataTypes";
import MediaItem from "@/Types/MediaItem";
import type { WpFlexibleEntity, WpMediaRaw } from "@/Types/Wp";

/**
 * Resolve an array of WP media IDs into full MediaItem objects.
 */
async function getMediaItemsByIds(ids: number[]): Promise<MediaItem[]> {
    if (!ids?.length) return [];

    const uniqueIds = Array.from(new Set(ids));
    const include = uniqueIds.join(",");

    const items = await wpFetch<WpMediaRaw[]>(`/media?include=${include}&per_page=${uniqueIds.length}`, { revalidate: 60 });

    return items.map((item) => {
        const details = item.media_details ?? {};
        const [type, subtype] = (item.mime_type || "").split("/");

        const width = details.width ?? 1600;
        const height = details.height ?? 900;

        const title = item.title?.rendered ?? "";
        const filename = details.file ?? "";
        const filesize = details.filesize;

        return {
            ID: item.id,
            id: item.id,
            title,
            filename,
            filesize,
            url: item.source_url,
            link: item.link,
            alt: item.alt_text ?? "",
            author: item.author != null ? String(item.author) : undefined,
            description: item.description?.rendered ?? "",
            caption: item.caption?.rendered ?? "",
            name: item.slug,
            status: item.status,
            date: item.date,
            modified: item.modified,
            menu_order: 0,
            mime_type: item.mime_type || "",
            type,
            subtype,
            icon: "", // not provided by /media
            width,
            height,
            sizes: (details.sizes as any) ?? {},
        } as MediaItem;
    });
}

/**
 * Recursively walk any value and:
 * - whenever it finds an array of numbers, treat it as a gallery of media IDs
 *   and replace it with MediaItem[]
 */
async function resolveGalleriesDeep(value: any): Promise<any> {
    // Array case
    if (Array.isArray(value)) {
        if (value.length && value.every((v) => typeof v === "number")) {
            // Heuristic: array of numbers → gallery IDs
            return await getMediaItemsByIds(value as number[]);
        }

        const resolved = await Promise.all(value.map((item) => resolveGalleriesDeep(item)));
        return resolved;
    }

    // Object case
    if (value && typeof value === "object") {
        const entries = await Promise.all(Object.entries(value).map(async ([key, val]) => [key, await resolveGalleriesDeep(val)] as const));
        return Object.fromEntries(entries);
    }

    // Primitive
    return value;
}

/**
 * Fetch page with flexible content and normalise all gallery ID arrays
 * into MediaItem[] so components don't have to fetch anything.
 */
export async function getFlexiblePageBySlug(slug: string): Promise<WpFlexibleEntity<AllBlockDataTypes> | null> {
    const pages = await wpFetch<WpFlexibleEntity[]>(
        `/pages?slug=${encodeURIComponent(slug)}&per_page=1&acf_format=standard&_fields=acf,slug,title,yoast_head_json`,
        { revalidate: 60 }
    );

    const page = pages[0];
    if (!page) return null;

    const flexibleRaw = page.acf?.flexible ?? [];
    const flexibleResolved = await resolveGalleriesDeep(flexibleRaw);

    return {
        ...page,
        acf: {
            ...(page.acf ?? {}),
            flexible: flexibleResolved as AllBlockDataTypes[],
        },
    } as WpFlexibleEntity<AllBlockDataTypes>;
}

/**
 * Convenience helper: return only flexible blocks for a given slug.
 */
export async function getFlexibleBlocksBySlug(slug: string): Promise<AllBlockDataTypes[]> {
    const page = await getFlexiblePageBySlug(slug);
    return (page?.acf?.flexible ?? []) as AllBlockDataTypes[];
}
