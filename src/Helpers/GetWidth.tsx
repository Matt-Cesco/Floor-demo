import { WidthOptions } from "./WidthEnum";

export const getWidth = (width: WidthOptions) => {
    switch (width) {
        case WidthOptions.FULLWIDTH:
            return "col-span-12 col-start-1";
        case WidthOptions.TENCOLUMNS:
            return "col-span-12 col-start-1 lg:col-span-10 lg:col-start-2";
        
        default:
            return "";
    }
};
