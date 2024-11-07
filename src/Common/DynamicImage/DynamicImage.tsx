import Image from 'next/image';
import { forwardRef, Ref } from 'react';
import { IDynamicImage } from './IDynamicImage';

const DynamicImage = forwardRef(
	({ data, className }: IDynamicImage, ref: Ref<HTMLImageElement>) => {
		if (!data?.node) {
			return null;
		}

		const mediaItemUrl = data.node.mediaItemUrl;
		if (!mediaItemUrl) {
			return null;
		}

		const altText = data.node.altText ?? '';
		const srcSet = data.node.srcSet ?? '';

		const imageWidth = data.node.mediaDetails?.width ?? 300;
		const imageHeight = data.node.mediaDetails?.height ?? 300;

		return (
			<Image
				src={mediaItemUrl}
				className={className}
				ref={ref}
				width={imageWidth}
				height={imageHeight}
				alt={altText}
				sizes={srcSet}
				quality={100}
			/>
		);
	}
);

DynamicImage.displayName = 'DynamicImage';

export default DynamicImage;
