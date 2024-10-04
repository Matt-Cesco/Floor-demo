import IHighlightMultipleBlocksBlock from './IHighlightMultipleBlocksBlock'; // Updated import
import IFlexibleBlock from '../IFlexibleBlock';
import { BackgroundColorOptions } from './HighlightMultipleBlocksBlockOptionsEnum';

const HighlightMultipleBlocksBlock = ({ data }: IFlexibleBlock<IHighlightMultipleBlocksBlock>) => {
	const { blocks, layoutOptions } = data.multipleHighlightFields || {};

	const { backgroundColorOptions } = layoutOptions || {};

	return (
		<div>
			<p>block name: HighlightMultipleBlocksBlock</p>
		</div>
	);
};

export default HighlightMultipleBlocksBlock;
