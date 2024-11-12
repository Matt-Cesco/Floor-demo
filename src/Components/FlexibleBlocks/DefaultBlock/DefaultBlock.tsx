import IDefaultBlock from './IDefaultBlock'; // Updated import
import IFlexibleBlock from '../IFlexibleBlock';
import { ImageOptions, TitleColorOptions } from './DefaultBlockOptionsEnum';

const DefaultBlock = ({ data }: IFlexibleBlock<IDefaultBlock>) => {
	const { text, heading, image, layoutOptions, link } = data.contentFields || {};

	const { imageOptions, titleColorOptions } = layoutOptions || {};

	return (
		<div>
			<p>block name: DefaultBlock</p>
		</div>
	);
};

export default DefaultBlock;
