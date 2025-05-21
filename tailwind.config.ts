import type { Config } from "tailwindcss";

const rootFontSize: number = 10;

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
    // Generate standard font size classes (e.g. text-80 becomes 8rem)
    for (let i = 1; i <= 600; i++) {
        fontSize[i.toString()] = `${(i / rootFontSize).toFixed(2)}rem`;
    }
    return fontSize;
};

const generateSpacing = (): SpacingMap => {
    const spacing: SpacingMap = {};
    // Generate standard spacing classes (e.g. p-50 becomes 5rem)
    for (let i = 1; i <= 1200; i++) {
        spacing[i.toString()] = `${(i / rootFontSize).toFixed(2)}rem`;
    }
    return spacing;
};

const generateLineHeights = (): LineHeightMap => {
    const lineHeights: LineHeightMap = {};
    // Generate line-height classes (for example: leading-120 for 120%)
    for (let i = 1; i <= 600; i++) {
        lineHeights[i.toString()] = `${i}%`;
    }
    return lineHeights;
};

export default {
    content: [
        "./src/Common/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/Layout/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "selector",
    theme: {
        fontFamily: {
            gantari: ["Gantari", "sans-serif"],
        },
        extend: {
            fontSize: generateFontSize(),
            spacing: generateSpacing(),
            lineHeight: generateLineHeights(),
            colors: {
                white: "#FFFFFF",
                black: "#0C0C0C",
                blue: {
                    light: "#009BDF",
                    dark: "#182B3C",
                },
                green: "#88CB01",
                orange: "#F48448",
                pink: "#F4238E",
                purple: "#9747FF",
            },
        },
    },
    plugins: [],
} satisfies Config;
