// imageAnimations.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const gsapImageTextBlock = (bigImageRef: React.RefObject<HTMLElement>, smallImageRef: React.RefObject<HTMLElement>) => {
	if (bigImageRef.current) {
		gsap.fromTo(
			bigImageRef.current,
			{ y: 120 },
			{
				y: -120,
				scrollTrigger: {
					trigger: bigImageRef.current,
					start: 'top bottom',
					end: 'top top',
					scrub: 1,
				},
			}
		);
	}

	if (smallImageRef.current) {
		gsap.fromTo(
			smallImageRef.current,
			{ y: 88 },
			{
				y: -88,
				scrollTrigger: {
					trigger: smallImageRef.current,
					start: 'top bottom',
					end: 'top top',
					scrub: 1,
				},
			}
		);
	}
};
