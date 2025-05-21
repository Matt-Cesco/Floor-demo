"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import dynamic from "next/dynamic";
import animation from "@/lottiFiles/animationPageTransition.json"; // ← check folder case

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

type Step = "idle" | "covering" | "playing" | "uncovering";

export default function PageTransitionOverlay() {
    const overlayRef = useRef<HTMLDivElement>(null);
    const pendingHref = useRef<string | undefined>(undefined);
    const router = useRouter();

    const [step, setStep] = useState<Step>("idle");

    useEffect(() => {
        if (overlayRef.current) {
            gsap.set(overlayRef.current, { xPercent: -100 });
        }
    }, []);

    useEffect(() => {
        const onCover = (e: Event) => {
            if (step !== "idle") return;
            const { href } = (e as CustomEvent<{ href?: string }>).detail;
            pendingHref.current = href;
            setStep("covering");
        };

        window.addEventListener("page-transition-cover", onCover);
        return () => window.removeEventListener("page-transition-cover", onCover);
    }, [step]);

    useEffect(() => {
        if (step !== "covering") return;
        const el = overlayRef.current!;
        gsap.set(el, { xPercent: -100 });
        gsap.to(el, {
            xPercent: 0,
            duration: 0.8,
            ease: "power1.inOut",
            onComplete: () => setStep("playing"),
        });
    }, [step]);

    useEffect(() => {
        if (step !== "playing") return;

        const onLottieDone = () => {
            if (pendingHref.current) {
                router.push(pendingHref.current);
            } else {
                window.history.back();
            }
            setStep("uncovering");
        };

        window.addEventListener("page-transition-lottie-complete", onLottieDone);
        return () => window.removeEventListener("page-transition-lottie-complete", onLottieDone);
    }, [step, router]);

    useEffect(() => {
        if (step !== "uncovering") return;
        const el = overlayRef.current!;
        gsap.to(el, {
            xPercent: 100,
            duration: 0.6,
            ease: "power1.inOut",
            onComplete: () => {
                gsap.set(el, { xPercent: -100 });
                pendingHref.current = undefined;
                setStep("idle");
            },
        });
    }, [step]);

    const showLottie = step === "playing";

    return (
        <>
            {showLottie && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <Lottie
                        loop={false}
                        animationData={animation}
                        play
                        speed={1.5}
                        onComplete={() => window.dispatchEvent(new Event("page-transition-lottie-complete"))}
                        style={{ width: 80, height: 80 }}
                    />
                </div>
            )}

            <div
                id="page-transition-overlay"
                ref={overlayRef}
                className="fixed inset-0 z-40 bg-[linear-gradient(0deg,#13284C_0%,#009BDF_100%)] pointer-events-none"
                style={{ willChange: "transform" }}
            >
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="1422" height="1033" viewBox="0 0 1422 1033" fill="none">
                    <path
                        d="M1162.57 -181.784L572.678 -408L1031.46 619.927L3.00026 1077.51L592.889 1303.73L1621.16 846.07L1162.57 -181.784Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                    />
                </svg>
            </div>
        </>
    );
}
