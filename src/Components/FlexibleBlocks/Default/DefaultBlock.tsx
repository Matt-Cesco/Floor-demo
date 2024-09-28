import { DefaultFragmentFragment } from '@/Graphql/generated'; // Import the generated type

interface DefaultBlockProps {
    data: DefaultFragmentFragment; // Use the generated type for the `data` prop
}

const DefaultBlock: React.FC<DefaultBlockProps> = ({ data }) => {
    const { contentFields } = data;

    return (
        <div>
            <h2>{contentFields?.titleHeading?.headingText}</h2>
            <p>{contentFields?.text}</p>
            {contentFields?.link && (
                <a href={contentFields.link.url || '#'} target={contentFields.link.target || '_self'}>
                    {contentFields.link.title}
                </a>
            )}
            {contentFields?.image?.node?.mediaItemUrl && (
                <img
                    src={contentFields.image.node.mediaItemUrl}
                    alt={contentFields.image.node.altText || 'Image'}
                    srcSet={contentFields.image.node.srcSet || undefined}
                />
            )}
        </div>
    );
};

export default DefaultBlock;


