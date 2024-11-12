import INextProjectBlock from './INextProjectBlock'; // Updated import
  import IFlexibleBlock from '../IFlexibleBlock';
import DynamicImage from '@/Common/DynamicImage/DynamicImage';
import Line from '@/Components/Line/Line';
import Link from 'next/link';
  
  

  const NextProjectBlock = ({ data }: IFlexibleBlock<INextProjectBlock>) => {
      
    const { topTextLeft, topTextRight, image, link } = data.nextProjectFields || {};
    
      return (
          <section>
			<div className='mb-162'>
				<div className='grid grid-cols-12 lg:grid-cols-36'>
					<Line />
				</div>
				<div className='mt-24 grid grid-cols-12 gap-0 lg:grid-cols-36'>
					<div className='col-span-4 col-start-2 lg:col-start-3'>
						<p className='text-16 uppercase text-black dark:text-gray'>{topTextLeft}</p>
					</div>
					<div className='col-span-4 col-start-8 flex justify-end lg:col-start-31'>
						<p className='text-16 uppercase text-black dark:text-gray'>{topTextRight}</p>
					</div>
				</div>
			</div>
			<div className='mb-162'>
					<Link href={link?.url!}>
						<div className='grid grid-cols-12 gap-0 lg:grid-cols-36'>
							<div className='order-2 col-span-10 col-start-2 lg:order-1 lg:col-start-3 lg:col-span-14'>
								{image && (
									<DynamicImage data={image} className='aspect-[616/546] object-cover' />
								)}
							</div>
							<div className='mb-0 order-1 col-span-10 col-start-2 justify-between lg:order-2 lg:col-span-6 lg:col-start-18'>
								<p className='text-44-75 leading-115 tracking-tight text-black dark:text-gray uppercase'>next project</p>
							</div>
						</div>
					</Link>
			</div>
            </section>
      );
  };

  export default NextProjectBlock;