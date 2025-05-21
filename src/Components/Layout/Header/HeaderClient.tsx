"use client"

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import MenuToggle from "../MenuToggle/MenuToggle";
import { MediaItem } from "@/Graphql/generated";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import AnimatedLink from "../AnimatedLink";

interface ThemeOptions {
    logo: { node: MediaItem };
    logoWhite: { node: MediaItem };
    icon: { node: MediaItem };
    mobileLogo: { node: MediaItem };
    menuLinks: {
        pageLink: { target: string; title: string; url: string };
    }[];
}

interface HeaderClientProps {
    themeOptions: ThemeOptions;
}

export default function HeaderClient({ themeOptions }: HeaderClientProps) {
    const { logo, logoWhite, icon, menuLinks } = themeOptions;
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.pageYOffset > 0);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="fixed z-50 w-full grid grid-cols-12 gap-20 px-30 py-20 top-0">
            <div className="col-span-6 lg:col-span-2 col-start-1 relative h-full overflow-hidden">
                <AnimatedLink href="/" className="block w-full h-full bg-transparent">
                    <DynamicImage
                        data={isHome ? logoWhite : logo}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out ${scrolled ? "opacity-0" : "opacity-100"}`}
                    />
                    <DynamicImage
                        data={icon}
                        className={`absolute inset-0 w-50 lg:w-60 h-full transition-opacity duration-300 ease-in-out ${scrolled ? "opacity-100" : "opacity-0"}`}
                    />
                </AnimatedLink>
            </div>
            <div className="col-start-11 col-span-1 flex justify-end">
                <ThemeToggle />
            </div>
            <div className="col-span-1 col-start-12 flex justify-end">
                <MenuToggle menuLinks={menuLinks} logo={logo} />
            </div>
        </header>
    );
}
