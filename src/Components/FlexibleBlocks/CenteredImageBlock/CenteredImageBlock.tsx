import ICenteredImageBlock from "./ICenteredImageBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";

const CenteredImageBlock = ({ data }: IFlexibleBlock<ICenteredImageBlock>) => {
    const { image } = data.centeredImageFields || {};

    return (
        <div className="grid grid-cols-12 gap-20 px-30 my-60 lg:my-120">
            <div className="col-span-12 col-start-1 lg:col-span-6 lg:col-start-4">
                <DynamicImage data={image} />
            </div>
        </div>
    );
};

export default CenteredImageBlock;
