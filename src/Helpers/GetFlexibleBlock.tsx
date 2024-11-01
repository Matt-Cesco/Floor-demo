import FlexibleBlocksEnum from '@/Components/FlexibleBlocks/FlexibleBlocksEnum';
import { AllBlockDataTypes } from '@/Components/FlexibleBlocks/AllBlockDataTypes';
import IFlexibleBlock from '@/Components/FlexibleBlocks/IFlexibleBlock';

import BigCenterHeadingBlock from '../Components/FlexibleBlocks/BigCenterHeadingBlock/BigCenterHeadingBlock';
import BigParagraphBlock from '../Components/FlexibleBlocks/BigParagraphBlock/BigParagraphBlock';
import CallToActionBlock from '../Components/FlexibleBlocks/CallToActionBlock/CallToActionBlock';
import DefaultBlock from '../Components/FlexibleBlocks/DefaultBlock/DefaultBlock';
import ImageTextBlock from '../Components/FlexibleBlocks/ImageTextBlock/ImageTextBlock';
import InfiniteScrollTextBlock from '../Components/FlexibleBlocks/InfiniteScrollTextBlock/InfiniteScrollTextBlock';
import MultipleImagesBlock from '../Components/FlexibleBlocks/MultipleImagesBlock/MultipleImagesBlock';
import SelectedWorkBlock from '../Components/FlexibleBlocks/SelectedWorkBlock/SelectedWorkBlock';
import ServicesRowsBlock from '../Components/FlexibleBlocks/ServicesRowsBlock/ServicesRowsBlock';

const GetFlexibleBlock = ({ data }: IFlexibleBlock<AllBlockDataTypes>) => {
	if (!data || !data.__typename) {
		console.warn('FlexibleBlock data is missing or __typename is undefined.');
		return null;
	}

  switch (data.__typename) {
    case FlexibleBlocksEnum.BIGCENTERHEADINGBLOCK:
            return <BigCenterHeadingBlock data={data} />;
    case FlexibleBlocksEnum.BIGPARAGRAPHBLOCK:
            return <BigParagraphBlock data={data} />;
    case FlexibleBlocksEnum.CALLTOACTIONBLOCK:
            return <CallToActionBlock data={data} />;
    case FlexibleBlocksEnum.DEFAULTBLOCK:
            return <DefaultBlock data={data} />;
    case FlexibleBlocksEnum.IMAGETEXTBLOCK:
            return <ImageTextBlock data={data} />;
    case FlexibleBlocksEnum.INFINITESCROLLTEXTBLOCK:
            return <InfiniteScrollTextBlock data={data} />;
    case FlexibleBlocksEnum.MULTIPLEIMAGESBLOCK:
            return <MultipleImagesBlock data={data} />;
    case FlexibleBlocksEnum.SELECTEDWORKBLOCK:
            return <SelectedWorkBlock data={data} />;
    case FlexibleBlocksEnum.SERVICESROWSBLOCK:
            return <ServicesRowsBlock data={data} />;
      default:
        console.warn(`Unknown block type: ${data.__typename}`);
        return null;
  }
};

export default GetFlexibleBlock;