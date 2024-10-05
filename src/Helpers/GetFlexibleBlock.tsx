import FlexibleBlocksEnum from '@/Components/FlexibleBlocks/FlexibleBlocksEnum';
import { AllBlockDataTypes } from '@/Components/FlexibleBlocks/AllBlockDataTypes';
import IFlexibleBlock from '@/Components/FlexibleBlocks/IFlexibleBlock';

import CallToActionBlock from '../Components/FlexibleBlocks/CallToActionBlock/CallToActionBlock';
import DefaultBlock from '../Components/FlexibleBlocks/DefaultBlock/DefaultBlock';
import FaqsBlock from '../Components/FlexibleBlocks/FaqsBlock/FaqsBlock';
import HighlightBlockBlock from '../Components/FlexibleBlocks/HighlightBlockBlock/HighlightBlockBlock';
import HighlightMultipleBlocksBlock from '../Components/FlexibleBlocks/HighlightMultipleBlocksBlock/HighlightMultipleBlocksBlock';
import InfiniteServicesCarouselBlock from '../Components/FlexibleBlocks/InfiniteServicesCarouselBlock/InfiniteServicesCarouselBlock';
import InfoCardSingleBlock from '../Components/FlexibleBlocks/InfoCardSingleBlock/InfoCardSingleBlock';
import LogosBlock from '../Components/FlexibleBlocks/LogosBlock/LogosBlock';
import MultipleImagesBlock from '../Components/FlexibleBlocks/MultipleImagesBlock/MultipleImagesBlock';
import NewsSliderBlock from '../Components/FlexibleBlocks/NewsSliderBlock/NewsSliderBlock';
import SimpleBlock from '../Components/FlexibleBlocks/SimpleBlock/SimpleBlock';
import WysiwygBlock from '../Components/FlexibleBlocks/WysiwygBlock/WysiwygBlock';

const GetFlexibleBlock = ({ data }: IFlexibleBlock<AllBlockDataTypes>) => {
	if (!data || !data.__typename) {
		console.warn('FlexibleBlock data is missing or __typename is undefined.');
		return null;
	}

  switch (data.__typename) {
    case FlexibleBlocksEnum.CALLTOACTIONBLOCK:
            return <CallToActionBlock data={data} />;
    case FlexibleBlocksEnum.DEFAULTBLOCK:
            return <DefaultBlock data={data} />;
    case FlexibleBlocksEnum.FAQSBLOCK:
            return <FaqsBlock data={data} />;
    case FlexibleBlocksEnum.HIGHLIGHTBLOCKBLOCK:
            return <HighlightBlockBlock data={data} />;
    case FlexibleBlocksEnum.HIGHLIGHTMULTIPLEBLOCKSBLOCK:
            return <HighlightMultipleBlocksBlock data={data} />;
    case FlexibleBlocksEnum.INFINITESERVICESCAROUSELBLOCK:
            return <InfiniteServicesCarouselBlock data={data} />;
    case FlexibleBlocksEnum.INFOCARDSINGLEBLOCK:
            return <InfoCardSingleBlock data={data} />;
    case FlexibleBlocksEnum.LOGOSBLOCK:
            return <LogosBlock data={data} />;
    case FlexibleBlocksEnum.MULTIPLEIMAGESBLOCK:
            return <MultipleImagesBlock data={data} />;
    case FlexibleBlocksEnum.NEWSSLIDERBLOCK:
            return <NewsSliderBlock data={data} />;
    case FlexibleBlocksEnum.SIMPLEBLOCK:
            return <SimpleBlock data={data} />;
    case FlexibleBlocksEnum.WYSIWYGBLOCK:
            return <WysiwygBlock data={data} />;
      default:
        console.warn(`Unknown block type: ${data.__typename}`);
        return null;
  }
};

export default GetFlexibleBlock;