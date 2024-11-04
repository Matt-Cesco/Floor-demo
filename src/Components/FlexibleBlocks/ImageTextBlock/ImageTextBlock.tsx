import IImageTextBlock from './IImageTextBlock'; // Updated import
import IFlexibleBlock from '../IFlexibleBlock';
import { VariationsOptions } from './ImageTextBlockOptionsEnum';

const ImageTextBlock = ({ data }: IFlexibleBlock<IImageTextBlock>) => {
	const { textFirst, textSecond, bigImage, layoutOptions, smallImage } = data.imageTextFields || {};

	const { variationsOptions } = layoutOptions || {};

	return (
		<div>
			<p>block name: ImageTextBlock</p>
		</div>
	);
};

export default ImageTextBlock;
