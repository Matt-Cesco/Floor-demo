import IHeadingtextbuttonBlock from './IHeadingtextbuttonBlock'; // Updated import
  import IFlexibleBlock from '../IFlexibleBlock';
import DynamicHeading from '@/Common/DynamicHeading/DynamicHeading';
import DynamicText from '@/Common/DynamicText/DynamicText';
import Line from '@/Components/Line/Line';
import Link from 'next/link';
  
  

  const HeadingtextbuttonBlock = ({ data }: IFlexibleBlock<IHeadingtextbuttonBlock>) => {
      
    const { text, heading, link } = data.headingTextButtonFields || {};
    
      return (
			<section className='mb-162'>
				<div className='grid grid-cols-12 lg:grid-cols-36'>
					<Line />
				</div>
				<div className='mb-120 mt-138 grid max-w-full grid-cols-12 gap-0 lg:grid-cols-36'>
					<div className='col-span-10 col-start-2 lg:col-span-23 lg:col-start-8'>
						<DynamicHeading data={heading} className='text-44-75 font-normal leading-100 tracking-tight text-black dark:text-gray' />
					</div>
				</div>
				<div className='mt-120 grid max-w-full grid-cols-12 gap-0 lg:grid-cols-36'>
					<div className='col-span-10 col-start-2 lg:col-span-16 lg:col-start-14'>
						<DynamicText data={text} className='mb-88 text-22' />
						{link && (
							<Link
								href={link.url!}
								className='font-bolder bg-gray-300 dark:bg-gray-700 rounded rounded-full border px-34 py-20 text-22 dark:border-white dark:text-white'
							>
								{link.title} <span className='text-blue ml-11 dark:text-yellow'>&#10147;</span>
							</Link>
						)}
					</div>
				</div>
			</section>
		);
  };

  export default HeadingtextbuttonBlock;