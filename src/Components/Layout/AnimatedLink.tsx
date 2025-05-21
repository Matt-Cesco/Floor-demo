"use client";

import React, { forwardRef } from "react";
import Link, { LinkProps } from "next/link";

export interface AnimatedLinkProps extends Omit<LinkProps, "href"> {
    href: string;
    children: React.ReactNode;
    className?: string;
    target?: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"];
    rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
    onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
    onMouseMove?: React.MouseEventHandler<HTMLAnchorElement>;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const AnimatedLink = forwardRef<HTMLAnchorElement, AnimatedLinkProps>(
    ({ href, children, className, onClick, onMouseEnter, onMouseLeave, onMouseMove, ...props }, ref) => (
        <Link
            href={href}
            ref={ref}
            className={className}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            {...props}
        >
            {children}
        </Link>
    )
);

AnimatedLink.displayName = "AnimatedLink";
export default AnimatedLink;
