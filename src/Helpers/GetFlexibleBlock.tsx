import React from "react";
import FlexibleBlocksEnum from "@/Components/FlexibleBlocks/FlexibleBlocksEnum";
import { AllBlockDataTypes } from "@/Components/FlexibleBlocks/AllBlockDataTypes";
import IFlexibleBlock from "@/Components/FlexibleBlocks/IFlexibleBlock";

import ContentBlockCenteredTextBlock from "@/Components/FlexibleBlocks/ContentBlockCenteredTextBlock/ContentBlockCenteredTextBlock";
import ContentBlockCenteredLinkBlock from "@/Components/FlexibleBlocks/ContentBlockCenteredLinkBlock/ContentBlockCenteredLinkBlock";
import ContentBlockImageBlock from "@/Components/FlexibleBlocks/ContentBlockImageBlock/ContentBlockImageBlock";
import IContentBlockCenteredTextBlock from "@/Components/FlexibleBlocks/ContentBlockCenteredTextBlock/IContentBlockCenteredTextBlock";
import IContentBlockCenteredLinkBlock from "@/Components/FlexibleBlocks/ContentBlockCenteredLinkBlock/IContentBlockCenteredLinkBlock";
import IContentBlockImageBlock from "@/Components/FlexibleBlocks/ContentBlockImageBlock/IContentBlockImageBlock";

const GetFlexibleBlock = ({ data }: IFlexibleBlock<AllBlockDataTypes>) => {
  if (!data || !data.acf_fc_layout) {
    console.warn("FlexibleBlock data is missing or acf_fc_layout is undefined.");
    return null;
  }

  switch (data.acf_fc_layout) {
    case FlexibleBlocksEnum.CONTENTBLOCKCENTEREDTEXTBLOCK:
      return <ContentBlockCenteredTextBlock data={data as IContentBlockCenteredTextBlock} />;
    case FlexibleBlocksEnum.CONTENTBLOCKCENTEREDLINKBLOCK:
      return <ContentBlockCenteredLinkBlock data={data as IContentBlockCenteredLinkBlock} />;
    case FlexibleBlocksEnum.CONTENTBLOCKIMAGEBLOCK:
      return <ContentBlockImageBlock data={data as IContentBlockImageBlock} />;
    default:
      console.warn(`Unknown block layout: ${data.acf_fc_layout}`);
      return null;
  }
};

export default GetFlexibleBlock;
