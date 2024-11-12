import ISummaryBlock from './ISummaryBlock'; // Updated import
  import IFlexibleBlock from '../IFlexibleBlock';
import DynamicText from '@/Common/DynamicText/DynamicText';
import DynamicHeading from '@/Common/DynamicHeading/DynamicHeading';
  
  const SummaryBlock = ({ data }: IFlexibleBlock<ISummaryBlock>) => {
      
    const { text, heading } = data.summaryFields || {};
    
      return (
          <section className='my-162'>
              <div className="grid grid-cols-12 gap-0 lg:grid-cols-36">
                <DynamicHeading data={heading} className='col-span-10 col-start-2 lg:col-start-4 lg:col-end-8 text-44-75 leading-115 tracking-tight text-black dark:text-gray' />
                <DynamicText data={text} className='col-span-10 col-start-2 lg:col-start-15 lg:col-span-15 text-22' />
              </div>
          </section>
      );
  };

  export default SummaryBlock;