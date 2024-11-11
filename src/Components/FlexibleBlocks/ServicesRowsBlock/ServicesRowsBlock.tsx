import IServicesRowsBlock from './IServicesRowsBlock';
import IFlexibleBlock from '../IFlexibleBlock';
import DynamicHeading from '@/Common/DynamicHeading/DynamicHeading';
import Link from 'next/link';
import DynamicText from '@/Common/DynamicText/DynamicText';
import Line from '@/Components/Line/Line';
import DynamicImage from '@/Common/DynamicImage/DynamicImage';

const ServicesRowsBlock = ({ data }: IFlexibleBlock<IServicesRowsBlock>) => {
	const { sideLeftText, text, heading, servicesRowsCards } = data.servicesRowsFields || {};

	return (
		<section>
			<div className='my-120 grid max-w-full grid-cols-12 gap-0 lg:grid-cols-36'>
				<div className='col-span-10 col-start-2 lg:col-span-16 lg:col-start-11'>
					<DynamicHeading data={heading} className='text-44-75 font-normal leading-100 tracking-tight text-black dark:text-gray' />
				</div>
			</div>
			<div className='mb-162 grid max-w-full grid-cols-12 gap-0 lg:grid-cols-36'>
				<div className='col-span-6 col-start-2 lg:col-span-4 lg:col-start-3'>
					<p className='mb-44 text-16 font-normal leading-120 tracking-tight text-black dark:text-gray lg:mb-0'>{sideLeftText}</p>
				</div>
				<div className='col-span-10 col-start-2 lg:col-span-14 lg:col-start-13'>
					<DynamicText data={text} className='text-22 leading-150 tracking-tight' />
				</div>
			</div>
			<div className='my-142'>
				<div className='grid grid-cols-12 gap-0 lg:grid-cols-36'>
					<Line />
				</div>
				<ul className=''>
					{servicesRowsCards?.map((card, i) => (
						<li key={i} className='group relative'>
							<Link href={card?.projectPageLink?.url || '#'} target={card?.projectPageLink?.target || '_self'}>
								<div className='grid grid-cols-12 gap-0 lg:grid-cols-36'>
									<div className='col-span-1 col-start-2 mt-22 lg:col-start-3'>
										<p className='text-16 text-blue dark:text-yellow'>{card?.serviceNumber}</p>
									</div>
									<div className='col-span-10 col-start-2 mb-42 mt-22 overflow-hidden lg:col-span-28 lg:col-start-7 lg:my-44-80'>
										{/* Single text div, visible by default */}
										<div className='text-30-75 leading-111 tracking-tight text-black dark:text-gray group-hover:hidden'>{card?.serviceTitle}</div>
										{/* Repeated text div, hidden by default and shown on hover */}
										<div className='group-hover:animate-scroll hidden whitespace-nowrap group-hover:flex'>
											<span className='relative z-20 inline-block text-30-75 leading-111 tracking-tight text-black dark:text-gray mix-blend-difference'>
												{card?.serviceTitle} &nbsp;•&nbsp;
											</span>
											<span className='relative z-20 inline-block text-30-75 leading-111 tracking-tight text-black dark:text-gray mix-blend-difference'>
												{card?.serviceTitle} &nbsp;•&nbsp;
											</span>
											<span className='relative z-20 inline-block text-30-75 leading-111 tracking-tight text-black dark:text-gray mix-blend-difference'>
												{card?.serviceTitle} &nbsp;•&nbsp;
											</span>
											<span className='relative z-20 inline-block text-30-75 leading-111 tracking-tight text-black dark:text-gray mix-blend-difference'>
												{card?.serviceTitle} &nbsp;•&nbsp;
											</span>
											<span className='relative z-20 inline-block text-30-75 leading-111 tracking-tight text-black dark:text-gray mix-blend-difference'>
												{card?.serviceTitle} &nbsp;•&nbsp;
											</span>
											<span className='relative z-20 inline-block text-30-75 leading-111 tracking-tight text-black dark:text-gray'>
												{card?.serviceTitle} &nbsp;•&nbsp;
											</span>
										</div>
									</div>
									<DynamicImage
										data={card?.image}
										className='absolute right-1/4 -z-10 aspect-[400/400] w-470 -translate-y-1/4 transform opacity-0 transition-all duration-500 group-hover:rotate-12 group-hover:opacity-100'
									/>
								</div>
								<div className='relative grid grid-cols-12 gap-0 lg:grid-cols-36'>
									<Line />
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default ServicesRowsBlock;
