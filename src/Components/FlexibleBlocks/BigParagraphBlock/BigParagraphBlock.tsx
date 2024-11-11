import IBigParagraphBlock from './IBigParagraphBlock'; // Updated import
import IFlexibleBlock from '../IFlexibleBlock';
import DynamicText from '@/Common/DynamicText/DynamicText';

const BigParagraphBlock = ({ data }: IFlexibleBlock<IBigParagraphBlock>) => {
	const { text } = data.bigParagraphFields || {};

	return (
		<section className='my-120-262 grid grid-cols-12 gap-0 lg:grid-cols-36'>
			<div className='col-span-10 col-start-2 lg:col-span-21 lg:col-start-5'>
				<DynamicText data={text} className='text-44-75 leading-103 tracking-tight' />
			</div>
		</section>
	);
};

export default BigParagraphBlock;
