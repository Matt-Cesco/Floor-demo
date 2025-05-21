import ICenteredTextBlock from "./ICenteredTextBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicText from "@/Common/DynamicText/DynamicText";

const CenteredTextBlock = ({ data }: IFlexibleBlock<ICenteredTextBlock>) => {
    const { text } = data.centeredTextFields || {};

    return (
        <div className="grid grid-cols-12 gap-20 px-30 mt-60 lg:mt-120">
            <div className="col-span-12 col-start-1 lg:col-span-6 lg:col-start-4  ">
                <DynamicText data={text} />
            </div>
        </div>
    );
};

export default CenteredTextBlock;
