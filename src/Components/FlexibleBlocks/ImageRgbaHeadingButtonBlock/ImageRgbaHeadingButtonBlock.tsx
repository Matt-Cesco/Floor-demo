import IImageRgbaHeadingButtonBlock from "./IImageRgbaHeadingButtonBlock"; // Updated import
import IFlexibleBlock from "../IFlexibleBlock";
import { OrientationOptions } from "./ImageRgbaHeadingButtonBlockOptionsEnum";
import DynamicButton from "@/Common/DynamicButton/DynamicButton";
import DynamicHeading from "@/Common/DynamicHeading/DynamicHeading";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import { getOrientationClass } from "./getOrientationClass";
import { getSpacing } from "@/Helpers/GetSpacing";

const ImageRgbaHeadingButtonBlock = ({ data }: IFlexibleBlock<IImageRgbaHeadingButtonBlock>) => {
    const { buttonStyleOptions, buttonLinkContent, heading, image, layoutOptions, spacingBottomOptions, spacingTopOptions } =
        data.imageRgbaHeadingButtonFields || {};
    const { orientationOptions } = layoutOptions || {};
    const { imageOrder, contentOrder, contentStartClass } = getOrientationClass(orientationOptions);
    const topSpacingClass = getSpacing(spacingTopOptions);
    const bottomSpacingClass = getSpacing(spacingBottomOptions);

    return (
        <div className={`grid gap-20 px-30 grid-cols-12   ${topSpacingClass} ${bottomSpacingClass}`}>
            <div className={`col-span-12 lg:col-span-6 ${imageOrder}`}>
                <DynamicImage data={image} className="aspect-[716/1028] w-full h-full object-cover" />
            </div>
            <div className={`col-span-10 col-start-1 ${contentStartClass} lg:col-span-4 my-auto py-0 lg:py-120 ${contentOrder}`}>
                <div className="grid max-w-full gap-20">
                    <DynamicHeading
                        data={heading}
                        className="col-span-4 lg:col-span-5 mt-50 text-50 lg:text-68 leading-70 font-black tracking-tight uppercase bg-gradient-to-t from-[#F4238E] to-[#009BDF] bg-clip-text text-transparent"
                    />
                    {buttonLinkContent && (
                        <DynamicButton data={buttonLinkContent} styleOption={buttonStyleOptions} className="col-span-4 lg:col-span-3 mb-0 lg:mb-120" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageRgbaHeadingButtonBlock;
