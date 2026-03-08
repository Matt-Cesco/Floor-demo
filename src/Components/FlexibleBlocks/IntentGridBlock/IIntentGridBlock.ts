// Auto-generated from ACF field group config
import MediaItem from "@/Types/MediaItem";

export default interface IIntentGridBlock {
    acf_fc_layout: "intent_grid";
    intent_grid_fields?: {
        top_title?: string; // Top Title (text)
        title?: string; // Title (text)
        columns?: {
            image?: MediaItem; // Image (image)
            top_heading?: string; // Top heading (text)
            heading?: string; // Heading (text)
            link?: { url: string; title?: string; target?: string | null }; // Link (link)
            pills?: {
                pill_text?: string; // Pill Text (text)
            }[]; // Pills (repeater)
        }[]; // Columns (repeater)
    }; // Intent Grid Fields (group)
}
