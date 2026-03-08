// src/Types/MediaItem.ts

export default interface MediaItem {
    ID: number; // WordPress internal ID (capitalised)
    id: number; // Often duplicated, but keep both to be safe
    title: string;
    filename: string;
    filesize?: number;

    url: string; // Main image URL
    link?: string; // Attachment page URL

    alt: string;
    author?: string;
    description?: string;
    caption?: string;
    name?: string;
    status?: string;

    date?: string;
    modified?: string;
    menu_order?: number;

    mime_type: string; // e.g. "image/jpeg"
    type?: string; // e.g. "image"
    subtype?: string; // e.g. "jpeg"
    icon?: string;

    width?: number;
    height?: number;

    mediaItemUrl?: string;

    // Sizes object from ACF (thumbnail, medium, large, [...]-width, [...]-height, etc.)
    sizes?: {
        [key: string]: string | number;
    };
}
