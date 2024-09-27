/** @type {import("tailwindcss").Config} */

const baseWidth = 1512;
const rootFontSize = 10;

interface FontSizeMap {
	[key: string]: string;
}

interface SpacingMap {
	[key: string]: string;
}

interface LineHeightMap {
	[key: string]: string;
}

const generateFontSize = (): FontSizeMap => {
	const fontSize: FontSizeMap = {};

	// Standard font size classes (for example: text-20)
	for (let i = 1; i <= 600; i++) {
		const maxRem = (i / rootFontSize).toFixed(2); // Max value in rem (i pixels / 10px per rem)
		const minRem = Math.max((i * 0.8) / rootFontSize, 1.6).toFixed(2); // Min value is 20% less than max, but no lower than 16px (1.6rem)
		const middleVw = ((i / baseWidth) * 100).toFixed(8); // Calculate middle value in vw
		fontSize[i.toString()] = `clamp(${minRem}rem, ${middleVw}vw, ${maxRem}rem)`;
	}

	// Extended font size classes (for example: text-10-50)
	for (let max = 1; max <= 600; max++) {
		for (let min = 1; min < max; min++) {
			const maxRem = (max / rootFontSize).toFixed(2);
			const minRem = Math.max(min / rootFontSize, 1.6).toFixed(2); // Ensure the min value doesn't go below 1.6rem (16px)
			const middleVw = ((max / baseWidth) * 100).toFixed(8);
			fontSize[`${min}-${max}`] = `clamp(${minRem}rem, ${middleVw}vw, ${maxRem}rem)`;
		}
	}

	return fontSize;
};

const generateSpacing = (): SpacingMap => {
	const spacing: SpacingMap = {};

	// Standard spacing classes (for example: px-50)
	for (let i = 1; i <= 1200; i++) {
		const maxRem = (i / rootFontSize).toFixed(2); // Max value in rem (i pixels / 10px per rem)
		const minRem = ((i * 0.8) / rootFontSize).toFixed(2); // Min value is 20% less than the max
		const vwValue = ((i / baseWidth) * 100).toFixed(8); // Calculate middle value in vw
		spacing[i.toString()] = `clamp(${minRem}rem, ${vwValue}vw, ${maxRem}rem)`;
	}

	// Extended spacing classes (for example: px-10-50)
	for (let max = 1; max <= 1200; max++) {
		for (let min = 1; min < max; min++) {
			const maxRem = (max / rootFontSize).toFixed(2);
			const minRem = (min / rootFontSize).toFixed(2);
			const middleVw = ((max / baseWidth) * 100).toFixed(8);
			spacing[`${min}-${max}`] = `clamp(${minRem}rem, ${middleVw}vw, ${maxRem}rem)`;
		}
	}

	return spacing;
};

const generateLineHeights = (): LineHeightMap => {
	const lineHeights: LineHeightMap = {};

	// Standard line-height classes (for example: leading-120 for line-height: 120%)
	for (let i = 1; i <= 600; i++) {
		const percentageValue = i.toString(); // Convert the value to a string for percentage
		lineHeights[i.toString()] = `${percentageValue}%`;
	}

	return lineHeights;
};

module.exports = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			fontSize: generateFontSize(),
			spacing: generateSpacing(),
			lineHeight: generateLineHeights(),
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
		},
	},
	plugins: ['prettier-plugin-tailwindcss'],
};
