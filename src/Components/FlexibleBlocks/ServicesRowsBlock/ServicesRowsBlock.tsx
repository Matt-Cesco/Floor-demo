import IServicesRowsBlock from './IServicesRowsBlock'; // Updated import
import IFlexibleBlock from '../IFlexibleBlock';
import DynamicHeading from '@/Common/DynamicHeading/DynamicHeading';
import Link from 'next/link';
import DynamicText from '@/Common/DynamicText/DynamicText';

const ServicesRowsBlock = ({ data }: IFlexibleBlock<IServicesRowsBlock>) => {
	const { sideLeftText, text, heading, servicesRowsCards } = data.servicesRowsFields || {};

	return (
		<section>
			<div className='my-120 grid max-w-full grid-cols-12 gap-0 lg:grid-cols-36'>
				<div className='col-span-10 col-start-2 lg:col-span-16 lg:col-start-11'>
					<DynamicHeading data={heading} className='text-44-75 font-normal leading-100 tracking-tight text-gray' />
				</div>
			</div>
			<div className='mb-162 grid max-w-full grid-cols-12 gap-0 lg:grid-cols-36'>
				<div className='col-span-6 col-start-2 lg:col-span-4 lg:col-start-3'>
					<p className='mb-44 text-16 font-normal leading-120 tracking-tight text-gray lg:mb-0'>{sideLeftText}</p>
				</div>
				<div className='col-span-10 col-start-2 lg:col-span-14 lg:col-start-13'>
					<DynamicText data={text} className='text-22 leading-150 tracking-tight text-gray' />
				</div>
			</div>
			<div className='my-142'>
				<div className='grid grid-cols-12 gap-0 lg:grid-cols-36'>
					<span className='col-start-2 col-end-12 border-t border-gray lg:col-start-3 lg:col-end-35'></span>
				</div>
				<ul className='border-b'>
					{servicesRowsCards?.map((card, i) => (
						<li key={i}>
							<Link href={card?.projectPageLink?.url || '#'} target={card?.projectPageLink?.target || '_self'}>
								<div className='grid grid-cols-12 gap-0 lg:grid-cols-36'>
									<div className='col-span-1 col-start-2 mt-22 lg:col-start-3'>
										<p className='text-16 text-yellow'>{card?.serviceNumber}</p>
									</div>
									<div className='col-span-10 col-start-2 mb-42 mt-22 lg:col-span-16 lg:col-start-7 lg:my-44-80'>
										<p className='text-30-75 leading-103 tracking-tight text-gray'>{card?.serviceTitle}</p>
									</div>
								</div>
								<div className='grid grid-cols-12 gap-0 lg:grid-cols-36'>
									<span className='col-start-2 col-end-12 border-t border-gray lg:col-start-3 lg:col-end-35'></span>
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
