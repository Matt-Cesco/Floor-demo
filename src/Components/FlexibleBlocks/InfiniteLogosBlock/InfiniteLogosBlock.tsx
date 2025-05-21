import IInfiniteLogosBlock from "./IInfiniteLogosBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import InfiniteScroll from "@/Helpers/InfiniteScroll";

const InfiniteLogosBlock = ({ data }: IFlexibleBlock<IInfiniteLogosBlock>) => {
    const { logos } = data.infiniteLogosFields;

    return (
        <section className="overflow-hidden my-60 lg:my-120">
            <InfiniteScroll baseVelocity={4} className="flex gap-120">
                {logos.nodes.map((item) => (
                    <DynamicImage key={item.id} data={{ node: item }} className="h-45 w-auto object-cover rounded-lg flex-shrink-0" />
                ))}
            </InfiniteScroll>
        </section>
    );
};

export default InfiniteLogosBlock;
