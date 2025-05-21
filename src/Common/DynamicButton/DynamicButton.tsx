import { AcfLink } from "@/Graphql/generated";
import { ButtonStyleOptions } from "@/Common/DynamicButton/ButtonStyleOptions";
import AnimatedLink from "@/Components/Layout/AnimatedLink";

interface Props {
    data?: AcfLink | null;
    className?: string;
    title?: string;
    styleOption: ButtonStyleOptions;
}

const DynamicButton = ({ data, className = "", title, styleOption }: Props) => {
    let appliedClasses = "";
    let gradientClass = "";
    switch (styleOption) {
        case ButtonStyleOptions.SimpleTextDefault:
            appliedClasses = "group inline-flex items-center text-dark-blue text-21 font-black tracking-tight uppercase";
            break;
        case ButtonStyleOptions.FullLightBlue:
            appliedClasses = "group inline-flex items-center text-white text-21 font-black tracking-tight uppercase rounded-full relative overflow-hidden";
            gradientClass = "bg-[linear-gradient(0deg,_#13284C_0%,_#009BDF_100%)]";
            break;
        case ButtonStyleOptions.GreenRgbaBackground:
            appliedClasses = "group inline-flex items-center text-white text-21 font-black tracking-tight uppercase rounded-full relative overflow-hidden";
            gradientClass = "bg-[linear-gradient(0deg,_#88CB01_0%,_#009BDF_100%)]";
            break;
        case ButtonStyleOptions.PurpleRgbaBackground:
            appliedClasses = "group inline-flex items-center text-white text-21 font-black tracking-tight uppercase rounded-full relative overflow-hidden";
            gradientClass = "bg-[linear-gradient(0deg,_#9747FF_0%,_#009BDF_100%)]";
            break;
        default:
            appliedClasses = "inline-flex items-center";
            break;
    }

    const textSpanClasses = styleOption === ButtonStyleOptions.SimpleTextDefault ? "mr-4 text-20" : "pl-24 py-15 mr-4 text-20";
    const iconContainerClasses = styleOption === ButtonStyleOptions.SimpleTextDefault ? "group flex items-center" : "group flex items-center pr-20";
    const svgFillColor = styleOption === ButtonStyleOptions.SimpleTextDefault ? "#009BDF" : "white";

    return (
        <AnimatedLink href={data?.url || "#"} className={className}>
            <div className={appliedClasses}>
                {gradientClass && (
                    <div
                        className={`absolute top-0 left-0 w-full h-[200%] ${gradientClass} transition-transform duration-500 group-hover:translate-y-[-50%]`}
                    ></div>
                )}
                <div className="relative z-10 flex items-center w-full">
                    <span className={textSpanClasses}>{title || data?.title}</span>
                    <span className={iconContainerClasses}>
                        <span className="ml-4 group-hover:rotate-45 duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                                <path d="M1.29231 12.5L0 11.2077L8.86154 2.34615H0.923077V0.5H12V11.5769H10.1538V3.63846L1.29231 12.5Z" fill={svgFillColor} />
                            </svg>
                        </span>
                    </span>
                </div>
            </div>
        </AnimatedLink>
    );
};

export default DynamicButton;
