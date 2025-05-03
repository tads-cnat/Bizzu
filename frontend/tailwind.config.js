/** @type {import('tailwindcss').Config}*/
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}, ./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				amarelo: "#FCBD18",
				ciano: "#058B92",
				vermelho: "#D32F2F",
				grey: "#B0B0B0",
				backgroundOffWhite: "#F2F2F7",
				backgroundBranco: "#FFFFFF",
				textSimpleCinza: "#333333",
				textSimpleBranco: "#F8F4E6",
			},
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [],
};
