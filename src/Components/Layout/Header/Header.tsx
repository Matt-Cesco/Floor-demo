// src/Components/Layout/Header/Header.tsx
import { getThemeOptions } from "@/lib/acf";
import HeaderClient from "./HeaderClient";

const Header = async () => {
    const themeOptions = await getThemeOptions();

    return <HeaderClient themeOptions={themeOptions} />;
};

export default Header;
