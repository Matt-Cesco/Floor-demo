import { MediaItem } from '@/Graphql/generated';

export default interface IBanner {
	__typename: 'Banner';
	bannerFields?: {
		layoutOptions?: {
			styleOptions?: string | null;
		} | null;
		title?: string | null;
		text?: string | null;
		image?: {
			node?: MediaItem | null;
		} | null;
	} | null;
}
