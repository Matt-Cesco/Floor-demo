import React from "react";
import FlexibleBlocksEnum from "@/Components/FlexibleBlocks/FlexibleBlocksEnum";
import { AllBlockDataTypes } from "@/Components/FlexibleBlocks/AllBlockDataTypes";
import IFlexibleBlock from "@/Components/FlexibleBlocks/IFlexibleBlock";

import SubheadingsCtaBlock from "@/Components/FlexibleBlocks/SubheadingsCtaBlock/SubheadingsCtaBlock";
import FourColumnsHeadingTextLinkBlock from "@/Components/FlexibleBlocks/FourColumnsHeadingTextLinkBlock/FourColumnsHeadingTextLinkBlock";
import ISubheadingsCtaBlock from "@/Components/FlexibleBlocks/SubheadingsCtaBlock/ISubheadingsCtaBlock";
import IFourColumnsHeadingTextLinkBlock from "@/Components/FlexibleBlocks/FourColumnsHeadingTextLinkBlock/IFourColumnsHeadingTextLinkBlock";

const GetFlexibleBlock = ({ data }: IFlexibleBlock<AllBlockDataTypes>) => {
  if (!data || !data.acf_fc_layout) {
    console.warn("FlexibleBlock data is missing or acf_fc_layout is undefined.");
    return null;
  }

  switch (data.acf_fc_layout) {
    case FlexibleBlocksEnum.SUBHEADINGSCTABLOCK:
      return <SubheadingsCtaBlock data={data as ISubheadingsCtaBlock} />;
    case FlexibleBlocksEnum.FOURCOLUMNSHEADINGTEXTLINKBLOCK:
      return <FourColumnsHeadingTextLinkBlock data={data as IFourColumnsHeadingTextLinkBlock} />;
    default:
      console.warn(`Unknown block layout: ${data.acf_fc_layout}`);
      return null;
  }
};

export default GetFlexibleBlock;
