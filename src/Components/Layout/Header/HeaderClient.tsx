"use client";

import { useEffect, useState } from "react";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import type IThemeOptions from "@/Types/Acf/ThemeOptions";
import Link from "next/link";

interface HeaderClientProps {
    themeOptions: IThemeOptions | null;
}

const HeaderClient = ({ themeOptions }: HeaderClientProps) => {
    const logoHorizontal = themeOptions?.logo_horizontal ?? null;
    const menuItems = themeOptions?.menu ?? [];

    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll while mobile menu is open
    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <header className="fixed z-50 w-full">
            <div className="container mx-auto px-72">
                <div className="flex items-center justify-between px-20 lg:px-60 py-20 relative z-50">
                    <Link href="/" aria-label="Go to homepage" className="inline-flex items-center" onClick={() => setIsOpen(false)}>
                        {logoHorizontal ? <DynamicImage data={logoHorizontal} /> : <span className="font-medium text-16 text-white">Starter Logo</span>}
                    </Link>

                    {/* Desktop nav (unchanged behaviour at lg+) */}
                    <nav className="hidden lg:flex gap-80">
                        {menuItems.map((item, index) => {
                            const link = item.menu_link;
                            if (!link) return null;

                            return (
                                <Link
                                    key={`${link.title}-${index}`}
                                    href={link.url}
                                    target={link.target}
                                    className="text-white text-18 font-medium leading-120 hover:underline"
                                >
                                    {link.title}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile hamburger (only below lg) */}
                    <button
                        type="button"
                        className="lg:hidden inline-flex items-center justify-center w-48 h-48 text-white"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen((v) => !v)}
                    >
                        <span className="sr-only">{isOpen ? "Close" : "Open"} menu</span>

                        {/* Hamburger / close icon */}
                        <div className="relative w-24 h-16">
                            <span
                                className={`absolute left-0 top-0 h-2 w-24 bg-white transition-transform duration-200 ${
                                    isOpen ? "translate-y-7 rotate-45" : ""
                                }`}
                            />
                            <span
                                className={`absolute left-0 top-7 h-2 w-24 bg-white transition-opacity duration-200 ${isOpen ? "opacity-0" : "opacity-100"}`}
                            />
                            <span
                                className={`absolute left-0 bottom-0 h-2 w-24 bg-white transition-transform duration-200 ${
                                    isOpen ? "-translate-y-7 -rotate-45" : ""
                                }`}
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile full-screen menu overlay */}
                <div
                    className={`lg:hidden fixed inset-0 z-40 bg-gray-dark/95 backdrop-blur transition-opacity duration-200 ${
                        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                    aria-hidden={!isOpen}
                >
                    {/* Push content below the header bar height */}
                    <div className="py-60 px-20 h-full overflow-y-auto flex flex-col justify-between">
                        <nav className="flex flex-col my-auto gap-20">
                            {menuItems.map((item, index) => {
                                const link = item.menu_link;
                                if (!link) return null;

                                return (
                                    <Link
                                        key={`${link.title}-${index}-mobile`}
                                        href={link.url}
                                        target={link.target || undefined}
                                        className="text-white text-30 font-medium leading-120 py-10"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.title}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderClient;
