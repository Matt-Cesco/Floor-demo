import IInfoCardSingleBlock from './IInfoCardSingleBlock'; // Updated import
import IFlexibleBlock from '../IFlexibleBlock';
import { OrientationOptions } from './InfoCardSingleBlockOptionsEnum';

const InfoCardSingleBlock = ({ data }: IFlexibleBlock<IInfoCardSingleBlock>) => {
	const { text, title, backgroundImage, layoutOptions, link } = data.infoCardFields || {};

	const { orientationOptions } = layoutOptions || {};

	return (
		<div>
			<p>block name: InfoCardSingleBlock</p>
		</div>
	);
};

export default InfoCardSingleBlock;
