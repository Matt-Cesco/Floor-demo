"use client";

import { useEffect } from "react";

export default function DebugRemoveChild() {
    useEffect(() => {
        const orig: any = (Node.prototype as any).removeChild;

        Node.prototype.removeChild = function (child: Node) {
            if (child.parentNode !== this) {
                return child;
            }
            try {
                return orig.call(this, child);
            } catch {
                return child;
            }
        };
    }, []);

    return null;
}
