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
					return (
						<h2 className='text-44-75 leading-100 tracking-tight text-black dark:text-gray mb-44'>
							{domToReact(domNode.children as DOMNode[], options)}
						</h2>
					);
				}
				if (domNode.tagName === 'p') {
					return <p className='text-black dark:text-gray'>{domToReact(domNode.children as DOMNode[], options)}</p>;
				}
				if (domNode.tagName === 'strong') {
					return (
						<strong className='text-blue font-playfair font-light dark:text-yellow'>{domToReact(domNode.children as DOMNode[], options)}</strong>
					);
				}
                if (domNode.tagName === 'ul') {
					return <ul className='text-black dark:text-gray'>{domToReact(domNode.children as DOMNode[], options)}</ul>;
				}
				if (domNode.tagName === 'li') {
					return <li className='text-black dark:text-gray'>{domToReact(domNode.children as DOMNode[], options)}</li>;
				}
			}
		},
	};

	return <div className={className}>{parse(data || '', options)}</div>;
};

export default DynamicText;
