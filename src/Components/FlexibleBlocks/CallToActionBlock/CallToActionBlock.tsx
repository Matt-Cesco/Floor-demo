import ICallToActionBlock from './ICallToActionBlock'; // Updated import
import IFlexibleBlock from '../IFlexibleBlock';
import { BackgroundOptions } from './CallToActionBlockOptionsEnum';

const CallToActionBlock = ({ data }: IFlexibleBlock<ICallToActionBlock>) => {
	const { text, title, backgroundImage, layoutOptions, link } = data.ctaFields || {};

	const { backgroundOptions } = layoutOptions || {};

	return (
		<div>
			<p>block name: CallToActionBlock</p>
		</div>
	);
};

export default CallToActionBlock;
