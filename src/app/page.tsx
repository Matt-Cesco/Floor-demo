import { getPageBySlug } from '@/Graphql/wordpressCMS/getPageBySlug';
import { getHomepageBanner } from '@/Graphql/wordpressCMS/queries/getHomepageBanner';
import FlexibleBlocks from '@/Components/FlexibleBlocks/FlexibleBlocks';
import { notFound } from 'next/navigation';
import BannerHomepage from '@/Components/BannerHomepage/BannerHomepage';

const PageComponent = async () => {
	const [pageData, bannerData] = await Promise.all([getPageBySlug('/'), getHomepageBanner()]);

	if (!pageData) {
		return notFound();
	}

	return (
		<div>
			{bannerData?.bannerHomepage && <BannerHomepage data={bannerData.bannerHomepage} />}
			{pageData.flexibleContent?.flexible && <FlexibleBlocks allBlocks={pageData.flexibleContent.flexible} />}
		</div>
	);
};

export default PageComponent;
