import { MediaItem } from "@/Graphql/generated";

export interface IDynamicImage {
  data?: {
    node?: MediaItem | null;
  } | null;
  className?: string;
  index?: number;
}
