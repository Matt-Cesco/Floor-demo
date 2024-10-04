// IDynamicImage.ts

import { MediaItem } from '@/Graphql/generated';

export interface IDynamicImage {
	data?: {
		node?: MediaItem;
	} | undefined;
	className?: string;
}
