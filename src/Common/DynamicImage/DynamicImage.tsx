import Image from 'next/image';
import { IDynamicImage } from './IDynamicImage';

const DynamicImage = ({ data, className }: IDynamicImage) => {
	const { altText, mediaItemUrl, mediaDetails, srcSet } = data?.node || {};

    // Fallback to 0 or any other default value if mediaDetails is not available (all the shit generated in the mediaItem type is ?optional)
	const imageWidth = mediaDetails?.width ?? 300;
	const imageHeight = mediaDetails?.height ?? 300;

	return (
		<Image
			src={mediaItemUrl || ''}
			className={className}
			width={imageWidth}
			height={imageHeight}
			alt={altText || ''}
			sizes={srcSet || ''}
			quality={100}
		/>
	);
};

export default DynamicImage;
