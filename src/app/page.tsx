import { getPageBySlug } from '@/Utils/Queries/getPageBySlug';
import FlexibleBlocks from '@/Commons/FlexibleBlocks/FlexibleBlocks';

const PageComponent = async ({ slug }) => {
    const pageData = await getPageBySlug(slug);

    return (
        <div>
            <h1>{pageData.title}</h1>
            <FlexibleBlocks allBlocks={pageData.flexibleContent.flexible} />
        </div>
    );
};

export default PageComponent;

