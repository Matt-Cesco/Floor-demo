import DynamicText from '@/Common/DynamicText/DynamicText';
import type { BannerHomepage } from '@/Graphql/generated';

interface BannerHomepageProps {
	data: BannerHomepage;
}

const BannerHomepage = ({ data }: BannerHomepageProps) => {
	const { titleFirstLine, titleSecondLine, titleThirdLine, bottomText } = data.bannerHomepageFields || {};

	return (
		<div className='mt-120'>
			<h1 className='grid max-w-full grid-cols-12 gap-0 lg:grid-cols-36'>
				<span className='col-span-10 col-start-2 overflow-hidden whitespace-nowrap lg:col-span-16 lg:col-start-14'>
					<span className='text-44-210 font-normal leading-98 tracking-tighter text-black dark:text-gray'>{titleFirstLine}</span>
				</span>
				<span className='col-span-10 col-start-2 overflow-hidden whitespace-nowrap max-sm:flex max-sm:justify-end max-sm:text-right lg:col-span-20 lg:col-start-7'>
					<span className='font-playfair text-44-210 font-extrabold leading-90 tracking-tight text-blue dark:text-yellow lg:leading-75'>{titleSecondLine}</span>
				</span>
				<span className='col-span-10 col-start-2 overflow-hidden whitespace-nowrap lg:col-span-25 lg:col-start-11'>
					<span className='text-44-210 font-normal leading-98 tracking-tighter text-black dark:text-gray'>{titleThirdLine}</span>
				</span>
			</h1>
			<div className='mb-162 mt-106 grid grid-cols-12 gap-0 lg:grid-cols-36'>
				<DynamicText data={bottomText || ''} className='col-span-6 col-start-2 lg:col-span-9 lg:col-start-5 text-16' />
			</div>
		</div>
	);
};

export default BannerHomepage;
