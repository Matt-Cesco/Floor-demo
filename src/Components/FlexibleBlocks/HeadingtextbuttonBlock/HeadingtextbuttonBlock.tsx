import IHeadingTextButtonBlock from "./IHeadingTextButtonBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicButton from "@/Common/DynamicButton/DynamicButton";
import DynamicHeading from "@/Common/DynamicHeading/DynamicHeading";
import DynamicText from "@/Common/DynamicText/DynamicText";

const HeadingTextButtonBlock = ({ data }: IFlexibleBlock<IHeadingTextButtonBlock>) => {
    const { buttonStyleOptions, text, buttonLinkContent, heading } = data.headingTextButtonFields || {};

    return (
        <section className="my-60 lg:my-120">
            <div className="grid grid-cols-12 gap-20 px-30 overflow-hidden">
                <div className="col-span-12 col-start-1 lg:col-span-8 lg:col-start-3">
                    <DynamicHeading data={heading} className="text-45 lg:text-58 leading-77 font-bold tracking-tight text-blue-dark dark:text-white" />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-20 px-30 mt-50 lg:mt-100 overflow-hidden">
                <div className="col-span-12 col-start-1 lg:col-span-6 lg:col-start-5">
                    <DynamicText data={text} pClassName="text-20 leading-130 lg:leading-140 text-blue-dark dark:text-white" />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-20 px-30 mt-20 lg:mt-40 overflow-hidden">
                <div className="col-span-12 col-start-1 lg:col-span-6 lg:col-start-5">
                    {buttonLinkContent && (
                        <DynamicButton data={buttonLinkContent} styleOption={buttonStyleOptions} className="col-span-4 lg:col-span-3 mb-120" />
                    )}
                </div>
            </div>
        </section>
    );
};

export default HeadingTextButtonBlock;
