import { LogosFragmentFragment } from '@/Graphql/generated'; // Import the generated type

interface LogosBlockProps {
    data: LogosFragmentFragment; // Use the generated type for the `data` prop
}

const LogosBlock: React.FC<LogosBlockProps> = ({ data }) => {
    const { logoFields } = data;

    return (
        <div>
            <h2>{logoFields?.title}</h2>
            <p>{logoFields?.text}</p>
            <div>
                {logoFields?.logos?.edges.map((logoEdge) => (
                    <div key={logoEdge.node.id}>
                        <img
                            src={logoEdge.node.mediaItemUrl}
                            alt={logoEdge.node.altText || 'Logo'}
                            srcSet={logoEdge.node.srcSet || undefined}
                        />
                        <p>{logoEdge.node.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogosBlock;

