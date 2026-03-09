import MediaItem from "@/Types/MediaItem";

// Auto-generated from ACF field group config
export default interface ISampleProcessBlock {
    acf_fc_layout: "sample_process";
    sample_process_fields?: {
        top_title?: string; // Top Title (text)
        title?: string; // Title (text)
        cta_link?: { url: string; title?: string; target?: string | null }; // CTA Link (link)
        steps?: {
            number?: number; // Number (number)
            title?: string; // Title (text)
            description?: string; // Description (textarea)
        }[]; // Steps (repeater)
    }; // Sample Process Fields (group)
}
