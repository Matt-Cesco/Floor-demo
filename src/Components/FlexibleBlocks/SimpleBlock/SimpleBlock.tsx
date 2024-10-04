import ISimpleBlock from './ISimpleBlock'; // Updated import
import IFlexibleBlock from '../IFlexibleBlock';

const SimpleBlock = ({ data }: IFlexibleBlock<ISimpleBlock>) => {
	const { text, heading } = data.simpleFields || {};

	return (
		<div>
			<p>block name: SimpleBlock</p>
		</div>
	);
};

export default SimpleBlock;
