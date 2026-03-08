import Header from "@/Components/Layout/Header/Header";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import Footer from "@/Components/Layout/Footer/Footer";
import { getThemeOptions } from "@/lib/acf/getThemeOptions";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const themeOptions = await getThemeOptions();

    return (
        <html lang="en" className="">
            <head>
                {themeOptions?.google_tag_manager && <GoogleTagManager gtmId={themeOptions.google_tag_manager} />}
                {themeOptions?.google_verification && <meta name="google-site-verification" content={themeOptions.google_verification} />}
            </head>
            <body className="bg-white">
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
