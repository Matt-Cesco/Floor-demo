"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function HoverPortal({ children }: { children: React.ReactNode }) {
    const [container] = useState(() => {
        if (typeof document === "undefined") return null;
        const div = document.createElement("div");
        div.className = "hover-portal-container";
        return div;
    });

    useEffect(() => {
        if (!container) return;
        document.body.appendChild(container);

        return () => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        };
    }, [container]);

    if (!container) return null;

    return createPortal(children, container);
}
