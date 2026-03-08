// Auto-generated from ACF field group config
import MediaItem from "@/Types/MediaItem";

export default interface IBestSellersBlock {
  acf_fc_layout: 'best_sellers';
  best_sellers_fields?: {
    top_title?: string; // Top Title (text)
    title?: string; // Title (text)
    description?: string; // Description (wysiwyg)
    view_all_link?: { url: string; title?: string; target?: string | null }; // View all Link (link)
    best_selling_cards?: {
    image?: MediaItem; // Image (image)
    title?: string; // Title (text)
    sub_title?: string; // Sub Title (text)
    price?: string; // Price (text)
    deleted_price?: string; // Deleted Price (text)
    view_link?: { url: string; title?: string; target?: string | null }; // View Link (link)
    sample_link?: { url: string; title?: string; target?: string | null }; // Sample Link (link)
  }[]; // Best Selling Cards (repeater)
  }; // Best Sellers Fields (group)

}
