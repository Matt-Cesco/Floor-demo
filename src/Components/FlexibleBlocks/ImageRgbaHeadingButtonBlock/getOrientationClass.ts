import { OrientationOptions } from "./ImageRgbaHeadingButtonBlockOptionsEnum";

export const getOrientationClass = (orientation: OrientationOptions): { imageOrder: string; contentOrder: string; contentStartClass: string } => {
    switch (orientation) {
        case OrientationOptions.imageLeft:
            return {
                imageOrder: "lg:order-1",
                contentOrder: "lg:order-2",
                contentStartClass: "lg:col-start-7",
            };
        case OrientationOptions.imageRight:
            return {
                imageOrder: "lg:order-2",
                contentOrder: "lg:order-1",
                contentStartClass: "lg:col-start-2",
            };
    }
};
