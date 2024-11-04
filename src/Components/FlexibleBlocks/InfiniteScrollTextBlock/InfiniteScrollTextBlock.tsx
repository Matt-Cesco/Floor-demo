import IInfiniteScrollTextBlock from './IInfiniteScrollTextBlock'; // Updated import
import IFlexibleBlock from '../IFlexibleBlock';

const InfiniteScrollTextBlock = ({ data }: IFlexibleBlock<IInfiniteScrollTextBlock>) => {
	const { text } = data.infiniteScrollTextFields || {};

	return (
		<div>
			<p>block name: InfiniteScrollTextBlock</p>
		</div>
	);
};

export default InfiniteScrollTextBlock;
