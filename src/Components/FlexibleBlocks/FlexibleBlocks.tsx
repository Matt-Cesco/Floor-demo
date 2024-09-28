// FlexibleBlocks.tsx
import IFlexibleBlockCollection from '@/Components/FlexibleBlocks/IFlexibleBlockCollection';
import GetFlexibleBlock from '@/Helpers/GetFlexibleBlocks';

const FlexibleBlocks = ({ allBlocks }: IFlexibleBlockCollection) => {
	return (
		<div>
			{allBlocks.map((flexibleBlock, index) => (
				<div key={index}>{GetFlexibleBlock(flexibleBlock)}</div>
			))}
		</div>
	);
};

export default FlexibleBlocks;
