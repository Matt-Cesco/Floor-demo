
import FlexibleBlocksEnum from '@/Components/FlexibleBlocks/FlexibleBlocksEnum';
import DefaultBlock from '@/Components/FlexibleBlocks/Default/DefaultBlock';
import LogosBlock from '@/Components/FlexibleBlocks/Logos/LogosBlock';
import IBlockType from '@/Commons/FlexibleBlocks/IBlockType';

const GetFlexibleBlock = (block: IBlockType) => {
    const { __typename: blockType } = block;

    switch (blockType) {
        case FlexibleBlocksEnum.DEFAULTBLOCK:
            return <DefaultBlock data={block} />;
        case FlexibleBlocksEnum.LOGOSBLOCK:
            return <LogosBlock data={block} />;
        default:
            return null;
    }
};

export default GetFlexibleBlock;
