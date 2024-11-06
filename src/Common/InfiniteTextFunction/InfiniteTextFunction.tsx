'use client'

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { wrap } from '@motionone/utils';
import { IDynamicText } from '../DynamicText/IDynamicText';

interface InfiniteTextFunctionProps {
	baseVelocity: number;
	className?: string;
}

export default function InfiniteTextFunction({ baseVelocity = 100, className = '' }: InfiniteTextFunctionProps) {
	const baseX = useMotionValue(0);
	const { scrollY } = useScroll();
	const scrollVelocity = useVelocity(scrollY);
	const smoothVelocity = useSpring(scrollVelocity, {
		damping: 50,
		stiffness: 400,
	});
	const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
		clamp: false,
	});

	const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

	const directionFactor = useRef<number>(1);
	useAnimationFrame((t, delta) => {
		let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

		if (velocityFactor.get() < 0) {
			directionFactor.current = -1;
		} else if (velocityFactor.get() > 0) {
			directionFactor.current = 1;
		}

		moveBy += directionFactor.current * moveBy * velocityFactor.get();

		baseX.set(baseX.get() + moveBy);
	});

	return (
		<div className='overflow-hidden'>
			<motion.div className={className} style={{ x }}>
				<h2>
					<span className='text-gray font-extrabold'>Not only <span className='text-yellow font-normal'>Creative </span></span>
                    <span className='text-gray font-extrabold'>Not only <span className='text-yellow font-normal'>Creative </span></span>
                    <span className='text-gray font-extrabold'>Not only <span className='text-yellow font-normal'>Creative </span></span>
				</h2>
			</motion.div>
		</div>
	);
}
