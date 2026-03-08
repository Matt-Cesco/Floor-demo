import { AllBlockDataTypes } from "./AllBlockDataTypes";
import GetFlexibleBlock from "@/Helpers/GetFlexibleBlock";

interface FlexibleBlocksProps {
    allBlocks: AllBlockDataTypes[];
}

const FlexibleBlocks = ({ allBlocks }: FlexibleBlocksProps) => {
    if (!allBlocks?.length) return null;

    return (
        <>
            {allBlocks.map((block, index) => (
                <GetFlexibleBlock key={index} data={block} />
            ))}
        </>
    );
};

export default FlexibleBlocks;
