import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import IBanner from "@/Types/Acf/Banner";
import React from "react";

type BannerProps = {
    data: IBanner;
};

const Banner = ({ data }: BannerProps) => {
    const { title, background_image } = data;

    return <section className="relative w-full overflow-hidden"></section>;
};

export default Banner;
