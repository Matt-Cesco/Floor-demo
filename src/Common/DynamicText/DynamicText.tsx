import parse, { DOMNode, Element, domToReact } from "html-react-parser";

interface DynamicTextProps {
    data: string | null | undefined;
    className?: string;
    pClassName?: string;
}

const DynamicText = ({ data, className, pClassName }: DynamicTextProps) => {
    const options = {
        replace: (domNode: DOMNode) => {
            if (domNode instanceof Element) {
                if (domNode.tagName === "h2") {
                    return <h2 className="text-24 lg:text-58 text-gray-dark">{domToReact(domNode.children as DOMNode[], options)}</h2>;
                }
                if (domNode.tagName === "h3") {
                    return <h3 className="text-22 lg:text-36 text-gray-dark">{domToReact(domNode.children as DOMNode[], options)}</h3>;
                }
                if (domNode.tagName === "h4") {
                    return <h4 className="font-medium text-18 sm:text-25 leading-140 text-gray-dark">{domToReact(domNode.children as DOMNode[], options)}</h4>;
                }
                if (domNode.tagName === "p") {
                    return (
                        <p className={pClassName || "text-18 leading-120 font-medium text-gray-dark"}>{domToReact(domNode.children as DOMNode[], options)}</p>
                    );
                }
                if (domNode.tagName === "strong") {
                    return <strong className="text-blue-light">{domToReact(domNode.children as DOMNode[], options)}</strong>;
                }
                if (domNode.tagName === "ul") {
                    return <ul className="list-disc list-inside mb-6 pl-4">{domToReact(domNode.children as DOMNode[], options)}</ul>;
                }
                if (domNode.tagName === "li") {
                    return <li className="text-20 leading-120 mb-22 text-blue-dark dark:text-white">{domToReact(domNode.children as DOMNode[], options)}</li>;
                }
            }
        },
    };

    return <div className={className}>{parse(data || "", options)}</div>;
};

export default DynamicText;
