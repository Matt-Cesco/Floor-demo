import IBigParagraphBlock from './IBigParagraphBlock'; // Updated import
import IFlexibleBlock from '../IFlexibleBlock';

const BigParagraphBlock = ({ data }: IFlexibleBlock<IBigParagraphBlock>) => {
	const { text } = data.bigParagraphFields || {};

	return (
		<div>
			<p>block name: BigParagraphBlock</p>
		</div>
	);
};

export default BigParagraphBlock;
