import IWysiwygBlock from './IWysiwygBlock'; // Updated import
import IFlexibleBlock from '../IFlexibleBlock';

const WysiwygBlock = ({ data }: IFlexibleBlock<IWysiwygBlock>) => {
	const { content } = data;
	return (
		<div>
			<p>block name: WysiwygBlock</p>
		</div>
	);
};

export default WysiwygBlock;
