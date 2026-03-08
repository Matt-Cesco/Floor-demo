// Auto-generated from ACF group "Homepage Banner"
import MediaItem from "../MediaItem";

export default interface IHomepageBanner {
    top_title?: string; // Top Title (text)
    title_first_line?: string; // Title First Line (text)
    title_highlighted_word?: string; // Title Highlighted word (text)
    title_third_line?: string; // Title Third Line (text)
    strapline?: string; // Strapline (wysiwyg)
    first_cta_link?: { title: string; url: string; target: string }; // First CTA Link (link)
    second_cta_link?: { title: string; url: string; target: string }; // Second CTA Link (link)
    background_image?: MediaItem; // Background Image (image)
    bottom_badge_top_title?: string; // Bottom Badge Top Title (text)
    bottom_badge_title?: string; // Bottom Badge Title (text)
    bottom_badge_price?: string; // Bottom Badge Price (text)
    bottom_badge_deleted_price?: string; // Bottom Badge Deleted Price (text)
}
