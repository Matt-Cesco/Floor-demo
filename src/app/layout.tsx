import { Montserrat, Playfair_Display } from 'next/font/google';
import './globals.css';
import { GoogleTagManager } from '@next/third-parties/google';
import { getWebsiteSeo } from '@/Graphql/wordpressCMS/queries/getWebsiteSeo';

const montserrat = Montserrat({
	subsets: ['latin'],
	display: 'swap',
});

const playfairDisplay = Playfair_Display({
	subsets: ['latin'],
	display: 'swap',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const seo = await getWebsiteSeo();
	return (
		<html lang='en' className={montserrat.className}>
			{seo?.siteSeo?.googleTagManager && <GoogleTagManager gtmId={`${seo.siteSeo.googleTagManager}`} />}
			<body className='bg-black'>{children}</body>
		</html>
	);
}
