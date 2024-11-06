import parse, { DOMNode, Element, domToReact } from 'html-react-parser';

interface DynamicTextProps {
	data: string | null | undefined;
	className?: string;
}

const DynamicText = ({ data, className }: DynamicTextProps) => {
	const options = {
		replace: (domNode: DOMNode) => {
			if (domNode instanceof Element) {
                if (domNode.tagName === 'h2') {
					return <h2 className='text-44-75 leading-100 tracking-tight text-gray'>{domToReact(domNode.children as DOMNode[], options)}</h2>;
				}
				if (domNode.tagName === 'p') {
					return <p className='text-gray'>{domToReact(domNode.children as DOMNode[], options)}</p>;
				}
				if (domNode.tagName === 'strong') {
					return <strong className='font-playfair text-yellow font-light'>{domToReact(domNode.children as DOMNode[], options)}</strong>;
				}
			}
		},
	};

	return <div className={className}>{parse(data || '', options)}</div>;
};

export default DynamicText;
