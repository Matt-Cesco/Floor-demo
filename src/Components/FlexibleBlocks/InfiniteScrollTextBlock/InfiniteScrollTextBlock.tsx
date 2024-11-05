import IInfiniteScrollTextBlock from './IInfiniteScrollTextBlock'; // Updated import
import IFlexibleBlock from '../IFlexibleBlock';
import DynamicText from '@/Common/DynamicText/DynamicText';
import InfiniteTextFunction from '@/Common/InfiniteTextFunction/InfiniteTextFunction';

const InfiniteScrollTextBlock = ({ data }: IFlexibleBlock<IInfiniteScrollTextBlock>) => {
	const { text } = data.infiniteScrollTextFields || {};

	return (
		<section className='my-262 hidden xl:block'>
			<InfiniteTextFunction baseVelocity={-3} className='flex w-full whitespace-nowrap text-128-210 leading-120 text-gray tracking-tighter' />
		</section>
	);
};

export default InfiniteScrollTextBlock;
