import { Gantari } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { getWebsiteSeo } from "@/Graphql/wordpressCMS/queries/getWebsiteSeo";
import { getThemeOptions } from "@/Graphql/wordpressCMS/queries/getThemeOptions";
import Header from "@/Components/Layout/Header/Header";
import Footer from "@/Components/Layout/Footer/Footer";
import ScrollProvider from "@/Components/ScrollProvider";

export const revalidate = 120;

const gantari = Gantari({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const [seo, footerData] = await Promise.all([getWebsiteSeo(), getThemeOptions()]);

    return (
        <html lang="en" className={gantari.className}>
            <head>
                {seo?.siteSeo?.googleTagManager && <GoogleTagManager gtmId={`${seo.siteSeo.googleTagManager}`} />}
                {seo?.siteSeo?.googleVerification && <meta name="google-site-verification" content={`${seo.siteSeo.googleVerification}`}></meta>}
            </head>
            <body className="bg-white dark:bg-blue-dark">
                <Header />
                <ScrollProvider>
                    {children}
                    {footerData && <Footer {...footerData} />}
                </ScrollProvider>
            </body>
        </html>
    );
}
