import IImageTextButtonBlock from "./IImageTextButtonBlock"; // Updated import
import IFlexibleBlock from "../IFlexibleBlock";
import { OrientationOptions } from "./ImageTextButtonBlockOptionsEnum";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import DynamicButton from "@/Common/DynamicButton/DynamicButton";
import DynamicText from "@/Common/DynamicText/DynamicText";
import { getOrientationClass } from "./getOrientationClass";

const ImageTextButtonBlock = ({ data }: IFlexibleBlock<IImageTextButtonBlock>) => {
    const { buttonStyleOptions, text, buttonLinkContent, image, layoutOptions } = data.imageTextButtonFields || {};
    const { orientationOptions } = layoutOptions || {};
    const { imageOrder, contentOrder, contentStartClass } = getOrientationClass(orientationOptions);

    return (
        <div className="grid grid-cols-12 gap-20 px-30 mt-60 lg:mt-120  ">
            <div className={`col-span-12 lg:col-span-7 ${imageOrder}`}>
                <DynamicImage data={image} className="aspect-[837/709] w-full h-full object-cover" />
            </div>
            <div className={`col-span-10 col-start-2 ${contentStartClass} lg:col-span-3 my-60 lg:my-120 lg:h-full ${contentOrder}`}>
                <div className="grid max-w-full grid-cols-4 gap-20 h-full">
                    {text && <DynamicText data={text} className="col-span-4 lg:col-span-3 !text-32" />}
                    {buttonLinkContent && (
                        <DynamicButton data={buttonLinkContent} styleOption={buttonStyleOptions} className="col-span-4 lg:col-span-3 mb-0 lg:mb-120" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageTextButtonBlock;
