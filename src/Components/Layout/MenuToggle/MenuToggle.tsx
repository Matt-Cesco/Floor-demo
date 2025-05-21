"use client";

import { useState } from "react";
import Menu from "../Menu/Menu";
import { MediaItem } from "@/Graphql/generated";

interface MenuToggleProps {
    logo: { node: MediaItem };
    menuLinks: {
        pageLink: { target: string; title: string; url: string };
    }[];
}

const MenuToggle = ({ menuLinks, logo }: MenuToggleProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev: any) => !prev);

    return (
        <>
            <button onClick={toggleMenu} className="rounded-full bg-blue-light px-10 lg:px-20 py-20 lg:py-30">
                <span className="text-16 font-medium leading-137 transition-colors duration-300 text-white">Menu</span>
            </button>
            <Menu data={menuLinks} isOpen={isOpen} toggleMenu={toggleMenu} logo={logo} />
        </>
    );
};

export default MenuToggle;
