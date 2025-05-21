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
                    return (
                        <h2 className="font-black text-30 lg:text-58 leading-77 tracking-tight uppercase text-blue-dark dark:text-white mb-20 mt-40">
                            {domToReact(domNode.children as DOMNode[], options)}
                        </h2>
                    );
                }
                if (domNode.tagName === "h3") {
                    return (
                        <h3 className="text-32 leading-150 font-black text-blue-dark dark:text-white mb-20 mt-40">
                            {domToReact(domNode.children as DOMNode[], options)}
                        </h3>
                    );
                }
                if (domNode.tagName === "h4") {
                    return (
                        <h4 className="text-28 leading-150 font-black text-blue-dark dark:text-white mb-20 mt-40">
                            {domToReact(domNode.children as DOMNode[], options)}
                        </h4>
                    );
                }
                if (domNode.tagName === "p") {
                    return (
                        <p className={pClassName || "text-20 leading-130 lg:leading-140 mb-22 text-blue-dark dark:text-white "}>
                            {domToReact(domNode.children as DOMNode[], options)}
                        </p>
                    );
                }
                if (domNode.tagName === "strong") {
                    return <strong className="text-blue-light">{domToReact(domNode.children as DOMNode[], options)}</strong>;
                }
                if (domNode.tagName === "ul") {
                    return <ul>{domToReact(domNode.children as DOMNode[], options)}</ul>;
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
