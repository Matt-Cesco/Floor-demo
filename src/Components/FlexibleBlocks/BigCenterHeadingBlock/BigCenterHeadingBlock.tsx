import IBigCenterHeadingBlock from './IBigCenterHeadingBlock'; // Updated import
import IFlexibleBlock from '../IFlexibleBlock';
import DynamicText from '@/Common/DynamicText/DynamicText';

const BigCenterHeadingBlock = ({ data }: IFlexibleBlock<IBigCenterHeadingBlock>) => {
	const { text } = data.bigCenterHeadingFields || {};

	return (
		<div className='my-120-262 grid max-w-full grid-cols-12 gap-0 lg:grid-cols-36'>
			<div className='col-span-10 col-start-2 lg:col-span-16 lg:col-start-11'>
				<DynamicText data={text} className='text-44-75 leading-103 tracking-tight' />
			</div>
		</div>
	);
};

export default BigCenterHeadingBlock;
