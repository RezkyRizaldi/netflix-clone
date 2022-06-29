/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-to-b': 'linear-gradient(to bottom,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.35) 29%,rgba(20,20,20,.58) 44%,#141414 68%,#141414 100%);',
			},
			textShadow: {
				md: '2px 2px 4px rgb(0 0 0 / 45%);',
			},
			colors: {
				dark: {
					primary: '#141414',
					secondary: '#010511',
				},
				light: {
					primary: '#e5e5e5',
					secondary: '#b3b3b3',
				},
			},
		},
	},
	plugins: [require('tailwindcss-textshadow'), require('tailwind-scrollbar-hide'), require('tailwind-scrollbar')],
};
