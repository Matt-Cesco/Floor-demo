// Interface for LogosBlock block data
import { IDynamicImage } from '@/Common/DynamicImage/IDynamicImage';
export default interface ILogosBlock {
	__typename: 'FlexibleContentFlexibleContentBlockLogosLayout';
	logoFields?: {
		__typename?: 'FlexibleContentFlexibleLogoFields';
		text?: string | null;
		title?: string | null;
		logos?: { __typename?: 'AcfMediaItemConnection'; nodes: IDynamicImage[] | null } | null;
	} | null;
}
