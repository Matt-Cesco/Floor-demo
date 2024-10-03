
import { getPageBySlug } from '@/Graphql/wordpressCMS/getPageBySlug';
import FlexibleBlocks from '@/Components/FlexibleBlocks/FlexibleBlocks';

interface PageProps {
  params: {
    slug: string;
  };
}

const PageComponent = async ({ params }: PageProps) => {
  const { slug } = params;
  const pageData = await getPageBySlug(slug);
  console.log(pageData.flexibleContent.flexible);

  if (!pageData) {
    return <div>Page not found</div>;
  }

  return (
		<div>
			<h1>{pageData.title}</h1>
			{/* {JSON.stringify(pageData.flexibleContent.flexible)} */}
			<FlexibleBlocks allBlocks={pageData.flexibleContent.flexible} />
		</div>
  );
};

export default PageComponent;
