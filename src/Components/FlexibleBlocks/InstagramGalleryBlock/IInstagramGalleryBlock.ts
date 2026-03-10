// Auto-generated from ACF field group config
import MediaItem from "@/Types/MediaItem";

export default interface IInstagramGalleryBlock {
  acf_fc_layout: 'instagram_gallery';
  instagram_gallery_cta_fields?: {
    title?: string; // Title (text)
    top_title?: string; // Top Title (text)
    text?: string; // Text (wysiwyg)
    cta_link?: { url: string; title?: string; target?: string | null }; // CTA Link (link)
    gallery?: MediaItem[]; // Gallery (gallery)
  }; // Instagram Gallery CTA Fields (group)

}
