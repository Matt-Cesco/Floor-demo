// src/Types/Wp.ts

/**
 * Shape of Yoast's yoast_head_json field from WP REST.
 */
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

/**
 * Generic flexible entity (page/post) from WP REST
 * including ACF flexible content and optional yoast_head_json.
 */
export interface WpFlexibleEntity<TBlocks = any> {
    id: number;
    slug: string;
    title: { rendered: string };
    yoast_head_json?: YoastHeadJson;
    acf?: {
        flexible?: TBlocks[];
        // any other ACF fields (like background_image, gallery_slider, etc.)
        [key: string]: unknown;
    };
}

/**
 * Raw media item from /wp-json/wp/v2/media
 * before we normalise it into our MediaItem type.
 */
export interface WpMediaRaw {
    id: number;
    date?: string;
    modified?: string;
    slug?: string;
    link?: string;
    title?: { rendered: string };
    author?: number;
    status?: string;
    alt_text?: string;
    mime_type?: string;
    media_type?: string;
    media_details?: {
        width?: number;
        height?: number;
        file?: string;
        filesize?: number;
        sizes?: Record<string, any>;
    };
    source_url: string;
    description?: { rendered: string };
    caption?: { rendered: string };
}
