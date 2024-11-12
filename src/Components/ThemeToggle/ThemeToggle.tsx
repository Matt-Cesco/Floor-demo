'use client';

import { useState } from 'react';

const ThemeToggle = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	// Toggle dark mode
	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		if (typeof window !== 'undefined') {
			document.documentElement.classList.toggle('dark', !isDarkMode);
		}
	};

	return (
		<button
			onClick={toggleDarkMode}
			className='bg-gray-300 dark:bg-gray-700 m-24 rounded rounded-full border px-24 py-20 text-22 dark:border-white dark:text-white'
		>
			{isDarkMode ? 'Light Mode' : 'Dark Mode'}
		</button>
	);
};

export default ThemeToggle;
