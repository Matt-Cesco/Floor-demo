// src/theme-plugin.cjs
const plugin = require("tailwindcss/plugin");

const rootFontSize = 10;

// --- Helper Functions ---

function generateFontSize() {
    const fontSize = {};
    for (let i = 1; i <= 600; i++) {
        fontSize[i.toString()] = `${(i / rootFontSize).toFixed(2)}rem`;
    }
    return fontSize;
}

function generateSpacing() {
    const spacing = {};
    for (let i = 1; i <= 1200; i++) {
        spacing[i.toString()] = `${(i / rootFontSize).toFixed(2)}rem`;
    }
    return spacing;
}

function generateLineHeights() {
    const lineHeights = {};
    for (let i = 1; i <= 600; i++) {
        lineHeights[i.toString()] = `${i}%`;
    }
    return lineHeights;
}

// --- The Plugin ---

module.exports = plugin(
    // Handler (unused here but required)
    () => {},
    // Config object
    {
        theme: {
            extend: {
                fontSize: generateFontSize(),
                spacing: generateSpacing(),
                lineHeight: generateLineHeights(),
            },
        },
    }
);
