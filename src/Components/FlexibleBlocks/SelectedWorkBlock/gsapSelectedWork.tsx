// imageAnimations.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const gsapSelectedWork = (firstImage: React.RefObject<HTMLElement>, secondImage: React.RefObject<HTMLElement>, thirdImage: React.RefObject<HTMLElement>) => {
	if (firstImage.current) {
		gsap.fromTo(
			firstImage.current,
			{ y: 150 },
			{
				y: -150,
				scrollTrigger: {
					trigger: firstImage.current,
					start: 'top bottom',
					end: 'top top',
					scrub: 1,
				},
			}
		);
	}
    if (secondImage.current) {
		gsap.fromTo(
			secondImage.current,
			{ y: 150 },
			{
				y: -150,
				scrollTrigger: {
					trigger: secondImage.current,
					start: 'top bottom',
					end: 'top top',
					scrub: 1,
				},
			}
		);
	}
    if (thirdImage.current) {
		gsap.fromTo(
			thirdImage.current,
			{ y: 150 },
			{
				y: -150,
				scrollTrigger: {
					trigger: thirdImage.current,
					start: 'top bottom',
					end: 'top top',
					scrub: 1,
				},
			}
		);
	}
};
