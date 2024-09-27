import Image from 'next/image';

export default function Home() {
	return (
		<section>
			<div className='px-8-90 bg-peach'>
				<div className='grid grid-cols-6 grid-rows-5 gap-4'>
					<div className='text-20-180 leading-90 col-span-6 font-extrabold uppercase'>Creating</div>
					<div className='text-20-180 leading-90 col-span-6 row-start-2 text-end font-extrabold uppercase'>Powerful</div>
					<div className='text-20-180 leading-90 col-span-6 row-start-3 font-extrabold uppercase'>Experiences</div>
					<div className='text-18 mt-75 col-span-2 col-start-4 row-span-2 row-start-4'>
						Were a creative web design and branding agency based in Birmingham that crafts inpactfull web experience grown brands
					</div>
				</div>
			</div>
			
		</section>
	);
}
