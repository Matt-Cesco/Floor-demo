"use client";

import { motion } from "framer-motion";
import AnimatedLink from "@/Components/Layout/AnimatedLink";
import type { MouseEventHandler } from "react";

interface FlipLinkProps {
    href: string;
    children: string;
    baseColor?: string;
    flipColor?: string;
    target?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
    onMouseLeave?: MouseEventHandler<HTMLAnchorElement>;
    className?: string;
}

const DURATION = 0.25;
const STAGGER = 0.025;

const MotionLink = motion(AnimatedLink);

export default function FlipLink({
    href,
    children,
    baseColor = "text-blue-dark dark:text-white",
    flipColor = "text-blue-light",
    target = "_self",
    ...rest
}: FlipLinkProps) {
    const letters = children.split("");

    return (
        <MotionLink
            href={href}
            target={target}
            initial="initial"
            whileHover="hovered"
            {...rest}
            className={`relative block overflow-hidden whitespace-nowrap uppercase ${rest.className ?? ""}`}
        >
            <div className={baseColor} style={{ lineHeight: 0.75 }}>
                {letters.map((char, i) => (
                    <motion.span
                        key={`front-${i}`}
                        variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
                        transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
                        className="inline-block"
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </div>

            <div className={`absolute inset-0 ${flipColor}`} style={{ lineHeight: 0.75 }}>
                {letters.map((char, i) => (
                    <motion.span
                        key={`back-${i}`}
                        variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
                        transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
                        className="inline-block"
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </div>
        </MotionLink>
    );
}
