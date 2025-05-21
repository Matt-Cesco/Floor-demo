import { getThemeOptions } from "@/Graphql/wordpressCMS/queries/getThemeOptions";
import HeaderClient from "./HeaderClient";

const Header = async () => {
    const themeOptions = await getThemeOptions();
    return <HeaderClient themeOptions={themeOptions} />;
};

export default Header;
