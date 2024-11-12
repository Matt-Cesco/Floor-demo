import IFullSizeImageBlock from './IFullSizeImageBlock'; // Updated import
  import IFlexibleBlock from '../IFlexibleBlock';
import DynamicImage from '@/Common/DynamicImage/DynamicImage';
  
  const FullSizeImageBlock = ({ data }: IFlexibleBlock<IFullSizeImageBlock>) => {
      
    const { image } = data.fullSizeImageFields || {};
    
      return (
			<section className='my-162 w-full grid grid-cols-12 lg:grid-cols-36'>
				<div className='col-span-10 col-start-2 lg:col-start-3 lg:col-end-35'><DynamicImage data={image} className='aspect-[1400/830] w-full' /></div>
				
			</section>
		);
  };

  export default FullSizeImageBlock;