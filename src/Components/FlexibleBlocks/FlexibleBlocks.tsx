import { AllBlockDataTypes } from "./AllBlockDataTypes";
import GetFlexibleBlock from "@/Helpers/GetFlexibleBlock";

const FlexibleBlocks = ({ allBlocks }: { allBlocks: AllBlockDataTypes[] }) => {
  return (
    <>
      {allBlocks.map((block, index) => (
        <GetFlexibleBlock key={index} data={block} />
      ))}
    </>
  );
};

export default FlexibleBlocks;
