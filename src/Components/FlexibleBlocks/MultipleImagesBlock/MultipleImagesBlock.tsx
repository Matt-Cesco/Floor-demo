import IMultipleImagesBlock from './IMultipleImagesBlock'; // Updated import
import IFlexibleBlock from '../IFlexibleBlock';
import { ImageOptions } from './MultipleImagesBlockOptionsEnum';

const MultipleImagesBlock = ({ data }: IFlexibleBlock<IMultipleImagesBlock>) => {
	const { text, title, blockImages, layoutOptions, link } = data.imageFields || {};

	const { imageOptions } = layoutOptions || {};

	return (
		<div>
			<p>block name: MultipleImagesBlock</p>
		</div>
	);
};

export default MultipleImagesBlock;
