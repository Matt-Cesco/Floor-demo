"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import SmoothScrollWrapper from "@/Components/Layout/SmoothScrollWrapper/SmoothScrollWrapper";

export default function ScrollProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    return <SmoothScrollWrapper key={pathname}>{children}</SmoothScrollWrapper>;
}
