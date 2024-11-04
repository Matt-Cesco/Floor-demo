import IBigCenterHeadingBlock from './IBigCenterHeadingBlock'; // Updated import
import IFlexibleBlock from '../IFlexibleBlock';

const BigCenterHeadingBlock = ({ data }: IFlexibleBlock<IBigCenterHeadingBlock>) => {
	const { text } = data.bigCenterHeadingFields || {};

	return (
		<div>
			<p>block name: BigCenterHeadingBlock</p>
		</div>
	);
};

export default BigCenterHeadingBlock;
