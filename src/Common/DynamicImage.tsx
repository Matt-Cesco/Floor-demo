import Image from "next/image";

export default function DynamicImage({ data, className, ...rest }: any) {
	if (!data) {
		return;
	}

	const { altText } = data || "";
	const { mediaItemUrl, mediaDetails, srcSet } = data;

	return (
		<Image
			src={mediaItemUrl}
			className={className}
			width={mediaDetails.width}
			height={mediaDetails.height}
			alt={altText !== "" ? altText : ""}
			sizes={srcSet}
			quality={100}
		/>
	);
}