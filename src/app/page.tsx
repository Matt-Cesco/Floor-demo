import { getPageBySlug } from '@/Graphql/wordpressCMS/queries/getPageBySlug';
import { getBannerBySlug } from '@/Graphql/wordpressCMS/queries/getBannerBySlug';
import FlexibleBlocks from '@/Components/FlexibleBlocks/FlexibleBlocks';
import { notFound } from 'next/navigation';
import Banner from '@/Components/Banner/Banner';

const PageComponent = async () => {
	const [pageData, bannerData] = await Promise.all([getPageBySlug('/'), getBannerBySlug('/')]);

	if (!pageData) {
		return notFound();
	}

	return (
		<div>
			{bannerData?.banner && <Banner data={bannerData.banner} />}
			{pageData.flexibleContent?.flexible && <FlexibleBlocks allBlocks={pageData.flexibleContent.flexible} />}
		</div>
	);
};

export default PageComponent;
