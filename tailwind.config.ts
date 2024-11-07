// /** @type {import("tailwindcss").Config} */

// const baseWidth = 2000;
// const rootFontSize = 10;

// interface FontSizeMap {
// 	[key: string]: string;
// }

// interface SpacingMap {
// 	[key: string]: string;
// }

// interface LineHeightMap {
// 	[key: string]: string;
// }

// interface GridColumnMap {
// 	[key: string]: string;
// }

// const generateGridColumns = (
// 	maxColumns: number
// ): {
// 	gridColumnsSpan: GridColumnMap;
// 	gridColumnsStart: GridColumnMap;
// 	gridColumnsEnd: GridColumnMap;
// } => {
// 	const gridColumnsSpan: GridColumnMap = {};
// 	const gridColumnsStart: GridColumnMap = {};
// 	const gridColumnsEnd: GridColumnMap = {};

// 	// Generate `col-span-X` classes (for example: col-span-1, col-span-2, ..., col-span-36)
// 	for (let i = 1; i <= maxColumns; i++) {
// 		gridColumnsSpan[`span-${i}`] = `span ${i} / span ${i}`; // Generates col-span-X classes
// 	}

// 	// Generate `col-start-X` classes
// 	for (let i = 1; i <= maxColumns; i++) {
// 		gridColumnsStart[i.toString()] = `${i}`; // Generates col-start-X classes
// 	}

// 	// Generate `col-end-X` classes
// 	for (let i = 1; i <= maxColumns; i++) {
// 		gridColumnsEnd[i.toString()] = `${i}`; // Generates col-end-X classes
// 	}

// 	// Add auto classes
// 	gridColumnsStart['auto'] = 'auto';
// 	gridColumnsEnd['auto'] = 'auto';
// 	gridColumnsSpan['full'] = '1 / -1'; // Full-span class

// 	return { gridColumnsSpan, gridColumnsStart, gridColumnsEnd };
// };

// const { gridColumnsSpan, gridColumnsStart, gridColumnsEnd } = generateGridColumns(36);

// const generateFontSize = (): FontSizeMap => {
// 	const fontSize: FontSizeMap = {};

// 	// Standard font size classes (for example: text-20)
// 	for (let i = 1; i <= 600; i++) {
// 		const maxRem = (i / rootFontSize).toFixed(2); // Max value in rem (i pixels / 10px per rem)
// 		const minRem = Math.max((i * 0.8) / rootFontSize, 1.6).toFixed(2); // Min value is 20% less than max, but no lower than 16px (1.6rem)
// 		const middleVw = ((i / baseWidth) * 100).toFixed(8); // Calculate middle value in vw
// 		fontSize[i.toString()] = `clamp(${minRem}rem, ${middleVw}vw, ${maxRem}rem)`;
// 	}

// 	// Extended font size classes (for example: text-10-50)
// 	for (let max = 1; max <= 600; max++) {
// 		for (let min = 1; min < max; min++) {
// 			const maxRem = (max / rootFontSize).toFixed(2);
// 			const minRem = Math.max(min / rootFontSize, 1.6).toFixed(2); // Ensure the min value doesn't go below 1.6rem (16px)
// 			const middleVw = ((max / baseWidth) * 100).toFixed(8);
// 			fontSize[`${min}-${max}`] = `clamp(${minRem}rem, ${middleVw}vw, ${maxRem}rem)`;
// 		}
// 	}

// 	return fontSize;
// };

// const generateSpacing = (): SpacingMap => {
// 	const spacing: SpacingMap = {};

// 	// Standard spacing classes (for example: px-50)
// 	for (let i = 1; i <= 1200; i++) {
// 		const maxRem = (i / rootFontSize).toFixed(2); // Max value in rem (i pixels / 10px per rem)
// 		const minRem = ((i * 0.8) / rootFontSize).toFixed(2); // Min value is 20% less than the max
// 		const vwValue = ((i / baseWidth) * 100).toFixed(8); // Calculate middle value in vw
// 		spacing[i.toString()] = `clamp(${minRem}rem, ${vwValue}vw, ${maxRem}rem)`;
// 	}

// 	// Extended spacing classes (for example: px-10-50)
// 	for (let max = 1; max <= 1200; max++) {
// 		for (let min = 1; min < max; min++) {
// 			const maxRem = (max / rootFontSize).toFixed(2);
// 			const minRem = (min / rootFontSize).toFixed(2);
// 			const middleVw = ((max / baseWidth) * 100).toFixed(8);
// 			spacing[`${min}-${max}`] = `clamp(${minRem}rem, ${middleVw}vw, ${maxRem}rem)`;
// 		}
// 	}

// 	return spacing;
// };

// const generateLineHeights = (): LineHeightMap => {
// 	const lineHeights: LineHeightMap = {};

// 	// Standard line-height classes (for example: leading-120 for line-height: 120%)
// 	for (let i = 1; i <= 600; i++) {
// 		const percentageValue = i.toString(); // Convert the value to a string for percentage
// 		lineHeights[i.toString()] = `${percentageValue}%`;
// 	}

// 	return lineHeights;
// };

// module.exports = {
// 	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
// 	theme: {
//         fontFamily: {
//             montserrat: ['Montserrat', 'sans-serif'],
//             playfair: ['Playfair Display', 'sans-serif'],
//         },
// 		extend: {
// 			// gridTemplateColumns: {
// 			// 	36: 'repeat(36, minmax(0, 1fr))', // creates a 36-column grid
// 			// },
// 			// gridColumnStart: {
// 			// 	...gridColumnsStart, // Generates col-start-X classes
// 			// },
// 			// gridColumnEnd: {
// 			// 	...gridColumnsEnd, // Generates col-end-X classes
// 			// },
// 			// gridColumn: {
// 			// 	...gridColumnsSpan, // Generates col-span-X classes
// 			// },
// 			fontSize: generateFontSize(),
// 			spacing: generateSpacing(),
// 			lineHeight: generateLineHeights(),
// 			colors: {
// 				yellow: '#D3F900',
// 				black: '#010101',
// 				gray: '#D9D9D9',
// 			},
// 			animation: {
// 				scroll: 'scroll 10s linear infinite',
// 			},
// 			keyframes: {
// 				scroll: {
// 					'0%': { transform: 'translateX(0)' },
// 					'100%': { transform: 'translateX(-100%)' },
// 				},
// 			},
// 		},
// 	},
// 	plugins: ['prettier-plugin-tailwindcss'],
// };

import type { Config } from "tailwindcss";

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

const config: Config = {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        fontFamily: {
            title: ["joanna-sans-nova", "sans-serif"],
            body: ["area-normal", "sans-serif"],
            underground: ["p22-underground", "sans-serif"],
        },
        container: {
            center: true,
        },
        extend: {
            fontSize: generateFontSize(),
            spacing: generateSpacing(),
            lineHeight: generateLineHeights(),
            screens: {
                xs: "480px",
                small: "640px",
                small_ls: "750px",
                medium: "1024px",
                large: "1200px",
                safari: {
                    raw: "not all and (min-resolution: 0.001dpcm)",
                },
                mouse: {
                    raw: "(hover: hover)",
                },
            },
            colors: {
                theme: {
                    white: "#ffffff",
                    red: "hsla(12, 28%, 51%, 1)",
                    burgundy: "hsla(345, 94%, 32%, 1)",
                    black: "hsla(180, 16%, 15%, 1)",
                    yellow: "hsla(38, 96%, 67%, 1)",
                    green: {
                        DEFAULT: "hsla(175, 89%, 18%, 1)",
                        light: "hsl(180, 10%, 28%)",
                    },
                    blue: "hsla(220, 100%, 60%, 1)",
                    grey: "hsla(0, 0%, 87%, 1)",
                    pink: {
                        DEFAULT: "hsla(333, 100%, 83%, 1)",
                        light: "hsla(340, 100%, 90%, 1)",
                    },
                    orange: "hsla(5, 95%, 61%, 1)",
                    lightOrange: "hsla(25, 100%, 65%, 1)",
                    cream: "hsla(38, 15%, 89%, 1)",
                    teal: "hsla(177, 80%, 37%, 1)",
                    grayRgba: "rgba(232, 229, 224, 0.90)",
                    blackRgba: "rgba(31, 43, 43, 0.80)",
                },
            },
            keyframes: {
                scroll: {
                    "0%": { top: "-16px", opacity: "1" },
                    "100%": { top: "100%", opacity: "0.5" },
                },
            },
            animation: {
                scroll: "scroll 2s infinite forwards",
            },
        },
    },
};
export default config;
