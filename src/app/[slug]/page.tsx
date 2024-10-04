import { getPageBySlug } from '@/Graphql/wordpressCMS/getPageBySlug';
import { getBannerBySlug } from '@/Graphql/wordpressCMS/getBannerBySlug';
import FlexibleBlocks from '@/Components/FlexibleBlocks/FlexibleBlocks';
import Banner from '@/Components/Banner/Banner';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

const PageComponent = async ({ params }: PageProps) => {
  const { slug } = params;

  const [pageData, bannerData] = await Promise.all([
    getPageBySlug(slug),
    getBannerBySlug(slug),
  ]);

  if (!pageData) {
    return notFound();
  }

  return (
    <>
      {bannerData?.banner && <Banner data={bannerData.banner} />}
      {pageData.flexibleContent?.flexible && <FlexibleBlocks allBlocks={pageData.flexibleContent.flexible} />}
    </>
  );
};

export default PageComponent;
