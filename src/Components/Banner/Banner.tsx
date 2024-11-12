import React from 'react';
import type { Banner } from '@/Graphql/generated';
import DynamicHeading from '@/Common/DynamicHeading/DynamicHeading';
import DynamicImage from '@/Common/DynamicImage/DynamicImage';
import DynamicText from '@/Common/DynamicText/DynamicText';

interface IBannerProps {
	data: Banner;
}

const Banner = ({ data }: IBannerProps) => {
	const { text, title, image } = data.bannerFields || {};

	return (
		<div className='mt-22'>
			<div className='grid grid-cols-12 gap-0 lg:grid-cols-36'>
				<div className='col-span-full col-start-2 mb-88 flex flex-col justify-between lg:col-span-full lg:col-start-19 lg:mb-0'>
					<h1 className='col-span-10 col-start-2 overflow-hidden whitespace-nowrap lg:col-span-16 lg:col-start-3'>
						<span className='text-44-210 font-normal leading-112 tracking-tighter text-black dark:text-gray -mx-20'>{title}</span>
					</h1>
					
				</div>
			</div>
			<div className='grid grid-cols-12 gap-0 lg:grid-cols-36'>
				<div className='col-span-10 col-start-2 lg:col-span-12 lg:col-start-3'>
					<DynamicImage className='aspect-[530/530]' data={image} />
				</div>
				<DynamicText data={text} className='text-22 col-span-6 col-start-2 text-16 lg:col-span-9 lg:col-start-17 flex flex-col justify-end' />
			</div>
		</div>
	);
};

export default Banner;
