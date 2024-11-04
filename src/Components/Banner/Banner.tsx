// src/Components/Banner/Banner.tsx
import React from 'react';
import IBanner from './IBanner';

interface IBannerProps {
	data: IBanner;
}

const Banner: React.FC<IBannerProps> = ({ data }) => {
	const { bannerFields } = data;

	if (!bannerFields) {
		return null;
	}

	const { title, text, image, layoutOptions } = bannerFields;

	return (
		<div className={`banner ${layoutOptions?.styleOptions}`}>
			{title && <h1>{title}</h1>}
			{text && <p>{text}</p>}
		</div>
	);
};

export default Banner;
