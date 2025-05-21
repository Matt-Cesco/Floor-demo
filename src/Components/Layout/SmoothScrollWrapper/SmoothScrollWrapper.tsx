"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother);

export default function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
    useLayoutEffect(() => {
        let smoother: ReturnType<typeof ScrollSmoother.create> | null = null;

        import("gsap/ScrollSmoother")
            .then((module) => {
                const { ScrollSmoother } = module;
                gsap.registerPlugin(ScrollSmoother);

                const wrapper = document.getElementById("smooth-wrapper");
                const content = document.getElementById("smooth-content");

                if (wrapper && content) {
                    smoother = ScrollSmoother.create({
                        wrapper: "#smooth-wrapper",
                        content: "#smooth-content",
                        smooth: 1.5,
                        effects: true,
                    });
                } else {
                    console.error("SmoothScrollWrapper: Missing #smooth-wrapper or #smooth-content");
                }
            })
            .catch((err) => {
                console.error("Error loading ScrollSmoother:", err);
            });

        return () => {
            if (smoother) {
                try {
                    smoother.kill();
                } catch (err) {
                    console.warn("SmoothScrollWrapper: error during smoother.kill()", err);
                }
            }
        };
    }, []);

    return (
        <div id="smooth-wrapper" style={{ overflow: "hidden" }}>
            <div id="smooth-content">{children}</div>
        </div>
    );
}
