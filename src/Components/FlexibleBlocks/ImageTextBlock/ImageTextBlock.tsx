'use client';

import { useEffect, useRef } from 'react';
import IImageTextBlock from './IImageTextBlock';
import IFlexibleBlock from '../IFlexibleBlock';
import { VariationsOptions } from './ImageTextBlockOptionsEnum';
import DynamicImage from '@/Common/DynamicImage/DynamicImage';
import DynamicText from '@/Common/DynamicText/DynamicText';
import { gsapImageTextBlock } from './gsapImageTextBlock';

const ImageTextBlock = ({ data }: IFlexibleBlock<IImageTextBlock>) => {
	const { textFirst, textSecond, bigImage, layoutOptions, smallImage } = data.imageTextFields || {};
	const { variationsOptions } = layoutOptions || {};

	const bigImageRef = useRef(null);
	const smallImageRef = useRef(null);

	useEffect(() => {
		gsapImageTextBlock(bigImageRef, smallImageRef);
	}, []);

	return (
		<section className='my-162'>
			{variationsOptions === VariationsOptions.VARIATION1 && (
				<div className='grid grid-cols-12 gap-0 lg:grid-cols-36'>
					<div className='col-span-10 col-start-2 lg:col-span-8 lg:col-start-6'>
						<DynamicText data={textFirst} className='my-88 text-22 lg:my-0' />
					</div>
					<div className='col-span-10 col-start-2 lg:col-span-16 lg:col-start-19'>
						<DynamicImage ref={bigImageRef} data={bigImage} className='aspect-[700/400]' />
					</div>
				</div>
			)}
			{variationsOptions === VariationsOptions.VARIATION2 && (
				<>
					<div className='grid grid-cols-12 gap-0 lg:grid-cols-36'>
						<div className='order-2 col-span-10 col-start-2 lg:order-1 lg:col-span-12 lg:col-start-3'>
							<DynamicImage ref={bigImageRef} data={bigImage} className='aspect-[530/690]' />
						</div>
						<div className='order-1 col-span-10 col-start-2 lg:order-2 lg:col-span-12 lg:col-start-17'>
							<DynamicText data={textFirst} className='mb-88 text-22 lg:mb-0' />
						</div>
					</div>
					<div className='relative grid grid-cols-12 gap-0 lg:grid-cols-36'>
						<div className='col-span-10 col-start-2 lg:col-span-10 lg:col-start-5'>
							<DynamicText data={textSecond} className='my-88 text-22' />
						</div>
						<div className='col-span-10 col-start-2 mb-162 lg:absolute lg:-top-[100%] lg:col-span-16 lg:col-start-19'>
							<DynamicImage ref={smallImageRef} data={smallImage} className='aspect-[700/400]' />
						</div>
					</div>
				</>
			)}
			{variationsOptions === VariationsOptions.VARIATION3 && (
				<div className='grid grid-cols-12 gap-0 lg:grid-cols-36'>
					<div className='order-2 col-span-10 col-start-2 lg:order-1 lg:col-span-12 lg:col-start-3'>
						<DynamicImage ref={bigImageRef} data={bigImage} className='aspect-[530/690]' />
					</div>
					<div className='order-1 col-span-10 col-start-2 mb-88 flex flex-col justify-between lg:order-2 lg:col-span-10 lg:col-start-17 lg:mb-0'>
						<DynamicText data={textFirst} className='mb-44 text-22 lg:mb-0' />
						<DynamicText data={textSecond} className='ml-90 text-22 lg:mb-120' />
					</div>
				</div>
			)}
		</section>
	);
};

export default ImageTextBlock;
