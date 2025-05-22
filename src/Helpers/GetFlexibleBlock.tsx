import FlexibleBlocksEnum from '@/Components/FlexibleBlocks/FlexibleBlocksEnum';
import { AllBlockDataTypes } from '@/Components/FlexibleBlocks/AllBlockDataTypes';
import IFlexibleBlock from '@/Components/FlexibleBlocks/IFlexibleBlock';

import CallToActionBlock from '../Components/FlexibleBlocks/CallToActionBlock/CallToActionBlock';
import CenteredImageBlock from '../Components/FlexibleBlocks/CenteredImageBlock/CenteredImageBlock';
import CenteredTextBlock from '../Components/FlexibleBlocks/CenteredTextBlock/CenteredTextBlock';
import ContactBlock from '../Components/FlexibleBlocks/ContactBlock/ContactBlock';
import FourAsymetricProjectCardsBlock from '../Components/FlexibleBlocks/FourAsymetricProjectCardsBlock/FourAsymetricProjectCardsBlock';
import FourCardsHeadingTextBlock from '../Components/FlexibleBlocks/FourCardsHeadingTextBlock/FourCardsHeadingTextBlock';
import HeadingIndent2ColTextBlock from '../Components/FlexibleBlocks/HeadingIndent2ColTextBlock/HeadingIndent2ColTextBlock';
import HeadingIndentBlock from '../Components/FlexibleBlocks/HeadingIndentBlock/HeadingIndentBlock';
import HeadingSubheadingImageTextBlock from '../Components/FlexibleBlocks/HeadingSubheadingImageTextBlock/HeadingSubheadingImageTextBlock';
import HeadingSubheadingTwoColTextBlock from '../Components/FlexibleBlocks/HeadingSubheadingTwoColTextBlock/HeadingSubheadingTwoColTextBlock';
import ImageOnHorizontalButtonHoverBlock from '../Components/FlexibleBlocks/ImageOnHorizontalButtonHoverBlock/ImageOnHorizontalButtonHoverBlock';
import ImageOnTextHoverBlock from '../Components/FlexibleBlocks/ImageOnTextHoverBlock/ImageOnTextHoverBlock';
import ImageOnVerticalButtonHoverBlock from '../Components/FlexibleBlocks/ImageOnVerticalButtonHoverBlock/ImageOnVerticalButtonHoverBlock';
import ImageOrVideoBlock from '../Components/FlexibleBlocks/ImageOrVideoBlock/ImageOrVideoBlock';
import ImageRgbaHeadingButtonBlock from '../Components/FlexibleBlocks/ImageRgbaHeadingButtonBlock/ImageRgbaHeadingButtonBlock';
import ImageTextButtonBlock from '../Components/FlexibleBlocks/ImageTextButtonBlock/ImageTextButtonBlock';
import InfiniteLogosBlock from '../Components/FlexibleBlocks/InfiniteLogosBlock/InfiniteLogosBlock';
import LatestNewsBlock from '../Components/FlexibleBlocks/LatestNewsBlock/LatestNewsBlock';
import NextPageBlock from '../Components/FlexibleBlocks/NextPageBlock/NextPageBlock';
import RgbaBgTextOverImageBlock from '../Components/FlexibleBlocks/RgbaBgTextOverImageBlock/RgbaBgTextOverImageBlock';
import RightSubheadingTwoColTextBlock from '../Components/FlexibleBlocks/RightSubheadingTwoColTextBlock/RightSubheadingTwoColTextBlock';
import StastsRgbaBlock from '../Components/FlexibleBlocks/StastsRgbaBlock/StastsRgbaBlock';
import SubheadingIndent1ColsBlock from '../Components/FlexibleBlocks/SubheadingIndent1ColsBlock/SubheadingIndent1ColsBlock';
import SubheadingIndent2ColsBlock from '../Components/FlexibleBlocks/SubheadingIndent2ColsBlock/SubheadingIndent2ColsBlock';
import SubheadingOneColTextBlock from '../Components/FlexibleBlocks/SubheadingOneColTextBlock/SubheadingOneColTextBlock';
import SubheadingRowsBlock from '../Components/FlexibleBlocks/SubheadingRowsBlock/SubheadingRowsBlock';
import SubheadingTwoColTextBlock from '../Components/FlexibleBlocks/SubheadingTwoColTextBlock/SubheadingTwoColTextBlock';
import TestimonialHeadingIndentBlock from '../Components/FlexibleBlocks/TestimonialHeadingIndentBlock/TestimonialHeadingIndentBlock';

const GetFlexibleBlock = ({ data }: IFlexibleBlock<AllBlockDataTypes>) => {
    if (!data || !data.__typename) {
        console.warn('FlexibleBlock data is missing or __typename is undefined.');
        return null;
    }

  switch (data.__typename) {
    case FlexibleBlocksEnum.CALLTOACTIONBLOCK:
            return <CallToActionBlock data={data} />;
    case FlexibleBlocksEnum.CENTEREDIMAGEBLOCK:
            return <CenteredImageBlock data={data} />;
    case FlexibleBlocksEnum.CENTEREDTEXTBLOCK:
            return <CenteredTextBlock data={data} />;
    case FlexibleBlocksEnum.CONTACTBLOCK:
            return <ContactBlock data={data} />;
    case FlexibleBlocksEnum.FOURASYMETRICPROJECTCARDSBLOCK:
            return <FourAsymetricProjectCardsBlock data={data} />;
    case FlexibleBlocksEnum.FOURCARDSHEADINGTEXTBLOCK:
            return <FourCardsHeadingTextBlock data={data} />;
    case FlexibleBlocksEnum.HEADINGINDENT2COLTEXTBLOCK:
            return <HeadingIndent2ColTextBlock data={data} />;
    case FlexibleBlocksEnum.HEADINGINDENTBLOCK:
            return <HeadingIndentBlock data={data} />;
    case FlexibleBlocksEnum.HEADINGSUBHEADINGIMAGETEXTBLOCK:
            return <HeadingSubheadingImageTextBlock data={data} />;
    case FlexibleBlocksEnum.HEADINGSUBHEADINGTWOCOLTEXTBLOCK:
            return <HeadingSubheadingTwoColTextBlock data={data} />;
    case FlexibleBlocksEnum.IMAGEONHORIZONTALBUTTONHOVERBLOCK:
            return <ImageOnHorizontalButtonHoverBlock data={data} />;
    case FlexibleBlocksEnum.IMAGEONTEXTHOVERBLOCK:
            return <ImageOnTextHoverBlock data={data} />;
    case FlexibleBlocksEnum.IMAGEONVERTICALBUTTONHOVERBLOCK:
            return <ImageOnVerticalButtonHoverBlock data={data} />;
    case FlexibleBlocksEnum.IMAGEORVIDEOBLOCK:
            return <ImageOrVideoBlock data={data} />;
    case FlexibleBlocksEnum.IMAGERGBAHEADINGBUTTONBLOCK:
            return <ImageRgbaHeadingButtonBlock data={data} />;
    case FlexibleBlocksEnum.IMAGETEXTBUTTONBLOCK:
            return <ImageTextButtonBlock data={data} />;
    case FlexibleBlocksEnum.INFINITELOGOSBLOCK:
            return <InfiniteLogosBlock data={data} />;
    case FlexibleBlocksEnum.LATESTNEWSBLOCK:
            return <LatestNewsBlock data={data} />;
    case FlexibleBlocksEnum.NEXTPAGEBLOCK:
            return <NextPageBlock data={data} />;
    case FlexibleBlocksEnum.RGBABGTEXTOVERIMAGEBLOCK:
            return <RgbaBgTextOverImageBlock data={data} />;
    case FlexibleBlocksEnum.RIGHTSUBHEADINGTWOCOLTEXTBLOCK:
            return <RightSubheadingTwoColTextBlock data={data} />;
    case FlexibleBlocksEnum.STASTSRGBABLOCK:
            return <StastsRgbaBlock data={data} />;
    case FlexibleBlocksEnum.SUBHEADINGINDENT1COLSBLOCK:
            return <SubheadingIndent1ColsBlock data={data} />;
    case FlexibleBlocksEnum.SUBHEADINGINDENT2COLSBLOCK:
            return <SubheadingIndent2ColsBlock data={data} />;
    case FlexibleBlocksEnum.SUBHEADINGONECOLTEXTBLOCK:
            return <SubheadingOneColTextBlock data={data} />;
    case FlexibleBlocksEnum.SUBHEADINGROWSBLOCK:
            return <SubheadingRowsBlock data={data} />;
    case FlexibleBlocksEnum.SUBHEADINGTWOCOLTEXTBLOCK:
            return <SubheadingTwoColTextBlock data={data} />;
    case FlexibleBlocksEnum.TESTIMONIALHEADINGINDENTBLOCK:
            return <TestimonialHeadingIndentBlock data={data} />;
      default:
        console.warn(`Unknown block type: ${data.__typename}`);
        return null;
  }
};

export default GetFlexibleBlock;