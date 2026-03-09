// Auto-generated from ACF field group config
import MediaItem from "@/Types/MediaItem";

export default interface IReassuranceBlock {
  acf_fc_layout: 'reassurance';
  reassurance_fields?: {
    text_number_customer?: string; // Text Number Customer (text)
    text_happy_customer?: string; // Text Happy Customer (text)
    link_reviews?: { url: string; title?: string; target?: string | null }; // Link Reviews (link)
    item?: {
    icon?: MediaItem; // Icon (image)
    title?: string; // Title (text)
    text?: string; // Text (text)
  }[]; // Item (repeater)
  }; // Reassurance Fields (group)

}
