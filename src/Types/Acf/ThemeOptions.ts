// Auto-generated from ACF group "Theme Options"
import MediaItem from "../MediaItem";

export default interface IThemeOptions {
    logo_horizontal?: MediaItem; // Logo Horizontal (image)
    phone?: string; // Phone (text)
    email?: string; // Email (email)
    building?: string; // Building (text)
    city_postcode?: string; // City Postcode (text)
    social_icons?: {
        icon_image?: MediaItem; // Icon Image (image)
        social_link?: string; // Social Link (url)
        social_name?: string; // Social Name (text)
    }[]; // Social Icons (repeater)
    menu?: {
        menu_link?: { title: string; url: string; target: string }; // Menu Link (link)
    }[]; // Menu (repeater)
    google_tag_manager?: string; // Google Tag Manager (text)
    google_analytics?: string; // Google Analytics (text)
    google_verification?: string; // Google Verification (text)
    footer_links?: {
        single_link_first_col?: { title: string; url: string; target: string }; // Single Link First Col (link)
    }[]; // Footer Links (repeater)
}
