"use client";

import { useState, useEffect } from "react";
import ImageOnVerticalButtonHoverBlockDesktop from "./ImageOnVerticalButtonHoverBlockDesktop";
import ImageOnVerticalButtonHoverBlockResponsive from "./ImageOnVerticalButtonHoverBlockResponsive";
import useMediaQuery from "@/Helpers/useMediaQuery";
import IFlexibleBlock from "../IFlexibleBlock";
import IImageOnVerticalButtonHoverBlock from "./IImageOnVerticalButtonHoverBlock";

export default function ImageOnVerticalButtonHoverBlock({ data }: IFlexibleBlock<IImageOnVerticalButtonHoverBlock>) {
    const isDesktop = useMediaQuery("(min-width: 1400px)");
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return null;
    }

    return isDesktop ? <ImageOnVerticalButtonHoverBlockDesktop data={data} /> : <ImageOnVerticalButtonHoverBlockResponsive data={data} />;
}
