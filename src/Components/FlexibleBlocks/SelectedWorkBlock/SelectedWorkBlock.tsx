'use client';

import { useEffect, useRef } from 'react';
import ISelectedWorkBlock from './ISelectedWorkBlock'; // Updated import
import IFlexibleBlock from '../IFlexibleBlock';
import DynamicHeading from '@/Common/DynamicHeading/DynamicHeading';
import DynamicImage from '@/Common/DynamicImage/DynamicImage';
import DynamicText from '@/Common/DynamicText/DynamicText';
import Line from '@/Components/Line/Line';
import { gsapSelectedWork } from './gsapSelectedWork';
import Link from 'next/link';

const SelectedWorkBlock = ({ data }: IFlexibleBlock<ISelectedWorkBlock>) => {
	const { sideLeftText, text, topTextLeft, topTextRight, heading, link, selectedWorkCards } = data.selectedWorkFields || {};

	// Refs for images to animate
	const firstImage = useRef(null);
	const secondImage = useRef(null);
	const thirdImage = useRef(null);

	useEffect(() => {
		gsapSelectedWork(firstImage, secondImage, thirdImage);
	}, []);

	return (
		<section>
			<div className='mb-162'>
				<div className='grid grid-cols-12 lg:grid-cols-36'>
					<Line />
				</div>
				<div className='mt-24 grid grid-cols-12 gap-0 lg:grid-cols-36'>
					<div className='col-span-4 col-start-2 lg:col-start-3'>
						<p className='text-16 uppercase text-black dark:text-gray'>{sideLeftText}</p>
					</div>
					<div className='col-span-4 col-start-8 flex justify-end lg:col-start-31'>
						<p className='text-16 uppercase text-black dark:text-gray'>{topTextLeft}</p>
					</div>
				</div>
				<div className='mb-120 mt-138 grid max-w-full grid-cols-12 gap-0 lg:grid-cols-36'>
					<div className='col-span-10 col-start-2 lg:col-span-16 lg:col-start-11'>
						<DynamicHeading data={heading} className='text-44-75 font-normal leading-100 tracking-tight text-black dark:text-gray' />
					</div>
				</div>
				<div className='mb-120-262 mt-120 grid max-w-full grid-cols-12 gap-0 lg:grid-cols-36'>
					<div className='col-span-10 col-start-2 mb-44 lg:col-span-4 lg:col-start-3 lg:mb-0'>
						<p className='text-16 uppercase text-black dark:text-gray'>{topTextRight}</p>
					</div>
					<div className='col-span-10 col-start-2 lg:col-span-16 lg:col-start-13'>
						<DynamicText data={text} className='text-22' />
					</div>
				</div>
			</div>
			<div className='mb-162'>
				{selectedWorkCards && selectedWorkCards[0] && (
					<Link href={selectedWorkCards[0]?.projectPageLink?.url ?? '#'}>
						<div className='grid grid-cols-12 gap-0 lg:grid-cols-36'>
							<div className='order-2 col-span-10 col-start-2 lg:order-1 lg:col-span-19 lg:col-start-3'>
								{selectedWorkCards[0].image && (
									<DynamicImage data={selectedWorkCards[0]?.image} ref={firstImage} className='aspect-[833/576] object-cover' />
								)}
							</div>
							<div className='order-1 col-span-10 col-start-2 flex flex-col justify-between lg:order-2 lg:col-span-8 lg:col-start-23'>
								<div>
									<p className='text-blue text-22 dark:text-yellow'>{selectedWorkCards[0]?.projectNumber}</p>
								</div>
								<div>
									<p className='text-44-75 leading-115 tracking-tight text-black dark:text-gray'>{selectedWorkCards[0]?.projectTitle}</p>
									<p className='mb-44 mt-22 font-playfair text-22 text-black lg:mb-0 dark:text-gray'>
										{selectedWorkCards[0]?.servicesProvided}
									</p>
								</div>
							</div>
						</div>
					</Link>
				)}
			</div>

			<div className='mb-162'>
				{selectedWorkCards && selectedWorkCards[1] && (
					<Link href={selectedWorkCards[1]?.projectPageLink?.url ?? '#'}>
						<div className='grid grid-cols-12 gap-0 lg:grid-cols-36'>
							<div className='col-span-10 col-start-2 flex flex-col justify-between lg:col-span-15 lg:col-start-3'>
								<div className='flex justify-end'>
									<p className='text-blue text-22 dark:text-yellow'>{selectedWorkCards[1]?.projectNumber}</p>
								</div>
								<div className='flex flex-col items-end'>
									<p className='text-44-75 leading-115 tracking-tight text-black dark:text-gray'>{selectedWorkCards[1]?.projectTitle}</p>
									<p className='mb-44 mt-22 font-playfair text-22 text-black lg:mb-0 dark:text-gray'>
										{selectedWorkCards[1]?.servicesProvided}
									</p>
								</div>
							</div>
							<div className='col-span-10 col-start-2 lg:col-span-16 lg:col-start-19'>
								{selectedWorkCards && <DynamicImage data={selectedWorkCards[1]?.image} ref={secondImage} className='aspect-[700/400]' />}
							</div>
						</div>
					</Link>
				)}
			</div>
			<div className='mb-162'>
				{selectedWorkCards && selectedWorkCards[2] && (
					<Link href={selectedWorkCards[2]?.projectPageLink?.url ?? '#'}>
						<div className='grid grid-cols-12 gap-0 lg:grid-cols-36'>
							<div className='order-2 col-span-10 col-start-2 lg:order-1 lg:col-span-14 lg:col-start-3'>
								{selectedWorkCards && <DynamicImage data={selectedWorkCards[2]?.image} ref={thirdImage} className='aspect-[530/530]' />}
							</div>
							<div className='order-1 col-span-10 col-start-2 flex flex-col justify-between lg:order-2 lg:col-span-6 lg:col-start-18'>
								<div>
									<p className='text-blue text-22 dark:text-yellow'>{selectedWorkCards[2]?.projectNumber}</p>
								</div>
								<div>
									<p className='text-44-75 leading-115 tracking-tight text-black dark:text-gray'>{selectedWorkCards[2]?.projectTitle}</p>
									<p className='mb-44 mt-22 font-playfair text-22 text-black lg:mb-0 dark:text-gray'>
										{selectedWorkCards[2]?.servicesProvided}
									</p>
								</div>
							</div>
						</div>
					</Link>
				)}
			</div>
		</section>
	);
};

export default SelectedWorkBlock;
