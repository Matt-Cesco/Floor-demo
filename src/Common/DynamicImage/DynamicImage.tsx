import Image from 'next/image';
import { IDynamicImage } from './IDynamicImage';

const DynamicImage = ({ data, className }: IDynamicImage) => {
	const { altText, mediaItemUrl, mediaDetails, srcSet } = data || {};

	return (
		<Image
			src={mediaItemUrl || ''}
			className={className}
			width={mediaDetails.width}
			height={mediaDetails.height}
			alt={altText || ''}
			sizes={srcSet || ''}
			quality={100}
		/>
	);
};

export default DynamicImage;
