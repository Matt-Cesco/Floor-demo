import { BackgroundColorOptionsEnum } from "./backgroundColorOptionsEnum";

export function getBackgroundColor(option: BackgroundColorOptionsEnum | BackgroundColorOptionsEnum[]): string {
    const colorOption = Array.isArray(option) ? option[0] : option;
    switch (colorOption) {
        case BackgroundColorOptionsEnum.GREENTOBLUE:
            return "bg-[linear-gradient(0deg,_#88CB01_0%,_#009BDF_100%)]";
        case BackgroundColorOptionsEnum.PINKTOBLUE:
            return "bg-[linear-gradient(0deg,_#F4238E_0%,_#009BDF_100%)]";
        case BackgroundColorOptionsEnum.ORANGETOBLUE:
            return "bg-[linear-gradient(0deg,_#F48448_0%,_#009BDF_100%)]";
        case BackgroundColorOptionsEnum.PURPLETOBLUE:
            return "bg-[linear-gradient(0deg,_#9747FF_0%,_#009BDF_100%)]";
        case BackgroundColorOptionsEnum.DARKBLUEBLUE:
            return "bg-[linear-gradient(0deg,_#13284C_0%,_#009BDF_100%)]";
        default:
            return "";
    }
}