import React from "react";
import FlexibleBlocksEnum from "@/Components/FlexibleBlocks/FlexibleBlocksEnum";
import { AllBlockDataTypes } from "@/Components/FlexibleBlocks/AllBlockDataTypes";
import IFlexibleBlock from "@/Components/FlexibleBlocks/IFlexibleBlock";

import SubheadingsCtaBlock from "@/Components/FlexibleBlocks/SubheadingsCtaBlock/SubheadingsCtaBlock";
import ProcessFirstStepBlock from "@/Components/FlexibleBlocks/ProcessFirstStepBlock/ProcessFirstStepBlock";
import FinalConversionBlock from "@/Components/FlexibleBlocks/FinalConversionBlock/FinalConversionBlock";
import ReassuranceBlock from "@/Components/FlexibleBlocks/ReassuranceBlock/ReassuranceBlock";
import ValueEvolutionBlock from "@/Components/FlexibleBlocks/ValueEvolutionBlock/ValueEvolutionBlock";
import BestSellersBlock from "@/Components/FlexibleBlocks/BestSellersBlock/BestSellersBlock";
import SampleProcessBlock from "@/Components/FlexibleBlocks/SampleProcessBlock/SampleProcessBlock";
import FourColumnsHeadingTextLinkBlock from "@/Components/FlexibleBlocks/FourColumnsHeadingTextLinkBlock/FourColumnsHeadingTextLinkBlock";
import IntentGridBlock from "@/Components/FlexibleBlocks/IntentGridBlock/IntentGridBlock";
import ISubheadingsCtaBlock from "@/Components/FlexibleBlocks/SubheadingsCtaBlock/ISubheadingsCtaBlock";
import IProcessFirstStepBlock from "@/Components/FlexibleBlocks/ProcessFirstStepBlock/IProcessFirstStepBlock";
import IFinalConversionBlock from "@/Components/FlexibleBlocks/FinalConversionBlock/IFinalConversionBlock";
import IReassuranceBlock from "@/Components/FlexibleBlocks/ReassuranceBlock/IReassuranceBlock";
import IValueEvolutionBlock from "@/Components/FlexibleBlocks/ValueEvolutionBlock/IValueEvolutionBlock";
import IBestSellersBlock from "@/Components/FlexibleBlocks/BestSellersBlock/IBestSellersBlock";
import ISampleProcessBlock from "@/Components/FlexibleBlocks/SampleProcessBlock/ISampleProcessBlock";
import IFourColumnsHeadingTextLinkBlock from "@/Components/FlexibleBlocks/FourColumnsHeadingTextLinkBlock/IFourColumnsHeadingTextLinkBlock";
import IIntentGridBlock from "@/Components/FlexibleBlocks/IntentGridBlock/IIntentGridBlock";

const GetFlexibleBlock = ({ data }: IFlexibleBlock<AllBlockDataTypes>) => {
  if (!data || !data.acf_fc_layout) {
    console.warn("FlexibleBlock data is missing or acf_fc_layout is undefined.");
    return null;
  }

  switch (data.acf_fc_layout) {
    case FlexibleBlocksEnum.SUBHEADINGSCTABLOCK:
      return <SubheadingsCtaBlock data={data as ISubheadingsCtaBlock} />;
    case FlexibleBlocksEnum.PROCESSFIRSTSTEPBLOCK:
      return <ProcessFirstStepBlock data={data as IProcessFirstStepBlock} />;
    case FlexibleBlocksEnum.FINALCONVERSIONBLOCK:
      return <FinalConversionBlock data={data as IFinalConversionBlock} />;
    case FlexibleBlocksEnum.REASSURANCEBLOCK:
      return <ReassuranceBlock data={data as IReassuranceBlock} />;
    case FlexibleBlocksEnum.VALUEEVOLUTIONBLOCK:
      return <ValueEvolutionBlock data={data as IValueEvolutionBlock} />;
    case FlexibleBlocksEnum.BESTSELLERSBLOCK:
      return <BestSellersBlock data={data as IBestSellersBlock} />;
    case FlexibleBlocksEnum.SAMPLEPROCESSBLOCK:
      return <SampleProcessBlock data={data as ISampleProcessBlock} />;
    case FlexibleBlocksEnum.FOURCOLUMNSHEADINGTEXTLINKBLOCK:
      return <FourColumnsHeadingTextLinkBlock data={data as IFourColumnsHeadingTextLinkBlock} />;
    case FlexibleBlocksEnum.INTENTGRIDBLOCK:
      return <IntentGridBlock data={data as IIntentGridBlock} />;
    default:
      console.warn(`Unknown block layout: ${data.acf_fc_layout}`);
      return null;
  }
};

export default GetFlexibleBlock;
