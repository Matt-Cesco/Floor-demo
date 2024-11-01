import { Archivo } from 'next/font/google';
import './globals.css';
import { GoogleTagManager } from '@next/third-parties/google';
import { getWebsiteSeo } from '@/Graphql/wordpressCMS/queries/getWebsiteSeo';

const archivo = Archivo({
	subsets: ['latin'],
	display: 'swap',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const seo = await getWebsiteSeo();
	return (
		<html lang='en' className={archivo.className}>
			{seo?.siteSeo?.googleTagManager && <GoogleTagManager gtmId={`${seo.siteSeo.googleTagManager}`} />}
			<body>{children}</body>
		</html>
	);
}
