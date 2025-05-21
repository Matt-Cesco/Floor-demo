import React from "react";

const hoverSvgs: JSX.Element[] = [
    <svg key="svg1" xmlns="http://www.w3.org/2000/svg" width="973" height="812" viewBox="0 0 973 812" fill="none">
        <path
            d="M932.108 -11.6101L1.70703 917.494L932.108 1846.6L1862.51 917.494L932.108 -11.6101Z"
            stroke="url(#grad1)"
            strokeWidth="2"
            strokeMiterlimit="10"
        />
        <defs>
            <linearGradient id="grad1" x1="523.5" y1="1129" x2="523.5" y2="-317" gradientUnits="userSpaceOnUse">
                <stop offset="0.486968" stopColor="#88CB01" />
                <stop offset="0.69956" stopColor="#F4238E" />
            </linearGradient>
        </defs>
    </svg>,
    <svg key="svg2" xmlns="http://www.w3.org/2000/svg" width="973" height="812" viewBox="0 0 973 812" fill="none">
        <path d="M932.108,917.494 m-930,0 a930,930 0 1,0 1860,0 a930,930 0 1,0 -1860,0" stroke="url(#grad2)" strokeWidth="2" strokeMiterlimit="10" />
        <defs>
            <linearGradient id="grad2" x1="523.5" y1="1129" x2="523.5" y2="-317" gradientUnits="userSpaceOnUse">
                <stop offset="0.3" stopColor="#FF0000" />
                <stop offset="0.7" stopColor="#00FF00" />
            </linearGradient>
        </defs>
    </svg>,
    <svg key="svg3" xmlns="http://www.w3.org/2000/svg" width="973" height="812" viewBox="0 0 973 812" fill="none">
        <path d="M634.777 -97H3L799.428 698.5L3 1494H634.777L1431 698.5L634.777 -97Z" stroke="url(#grad3)" strokeWidth="2" strokeMiterlimit="10" />
        <defs>
            <linearGradient id="grad3" x1="523.5" y1="1129" x2="523.5" y2="-317" gradientUnits="userSpaceOnUse">
                <stop offset="0.4" stopColor="#0000FF" />
                <stop offset="0.8" stopColor="#FFFF00" />
            </linearGradient>
        </defs>
    </svg>,
    <svg key="svg4" xmlns="http://www.w3.org/2000/svg" width="973" height="812" viewBox="0 0 973 812" fill="none">
        <path
            d="M60.5302 142.8C-101.178 525.652 77.8915 967.172 460.46 1129L661.448 653.166C541.5 602.439 485.355 463.974 536.043 343.937C586.732 223.9 725.095 167.713 845.043 218.44L1046 -257.426C663.432 -419.253 222.238 -240.052 60.5302 142.8Z"
            stroke="url(#grad4)"
            strokeWidth="2"
            strokeMiterlimit="10"
        />
        <defs>
            <linearGradient id="grad4" x1="523.5" y1="1129" x2="523.5" y2="-317" gradientUnits="userSpaceOnUse">
                <stop offset="0.35" stopColor="#00FFFF" />
                <stop offset="0.65" stopColor="#FF00FF" />
            </linearGradient>
        </defs>
    </svg>,
];

const getRandomSvg = (): JSX.Element => {
    const index = Math.floor(Math.random() * hoverSvgs.length);
    // Clone the element to ensure a new instance is returned.
    return React.cloneElement(hoverSvgs[index]);
};

export default hoverSvgs;
export { getRandomSvg };
