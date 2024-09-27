import Image from 'next/image';

export default function Home() {
	return (
		<section>
			<div className='px-90 bg-peach'>
				<div className='grid grid-cols-6 grid-rows-5 gap-4'>
					<div className='text-180 leading-90 col-span-6 font-extrabold uppercase'>Creating</div>
					<div className='text-180 leading-90 col-span-6 row-start-2 text-end font-extrabold uppercase'>Powerful</div>
					<div className='text-180 leading-90 col-span-6 row-start-3 font-extrabold uppercase'>Experiences</div>
					<div className='text-18 mt-75 col-span-2 col-start-4 row-span-2 row-start-4'>
						We're a creative web design and branding agency based in Birmingham that crafts inpactfull web experience grown brands
					</div>
				</div>
			</div>
			{/* <div className='px-90 bg-peach'>
				<div className='grid grid-cols-6 grid-rows-4 gap-4'>
					<div className='text-18'>Expertise</div>
					<div className='col-span-2 text-60 leading-90 row-span-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam neque eius ducimus corrupti</div>
					<div className='col-span-3 col-start-3 row-span-2 row-start-4'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam neque eius ducimus corrupti. Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Ullam neque eius ducimus corrupti
					</div>
					<div className='col-start-3 row-start-6'>Cta text</div>
				</div>
			</div>
			<div className='px-90 bg-peach'>
				<div className='grid grid-cols-6 grid-rows-6 gap-4'>
					<div className='text-90 leading-90 col-span-4 col-span-6 col-start-3 row-span-2 font-extrabold'>Development</div>
					<div className='text-180 leading-90 col-span-4 col-span-6 col-start-3 row-span-2 row-start-3 font-extrabold'>Web Design</div>
					<div className='text-180 leading-90 col-span-4 col-span-6 col-start-3 row-span-2 row-start-5 font-extrabold'>Branding</div>
					<div className='text-180 leading-90 col-span-4 col-span-6 col-start-3 row-span-2 row-start-7 font-extrabold'>Advertising</div>
					<div className='text-180 leading-90 col-span-4 col-span-6 col-start-3 row-span-2 row-start-9 font-extrabold'>Graphic Design</div>
				</div>
			</div> */}
		</section>
	);
}
