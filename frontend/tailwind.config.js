/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

	theme: {
		colors: {
			amarelo: "#FCBD18",
			ciano: "#058B92",
			vermelho: "#058B92",
			grey: "#B0B0B0",
			backgroundOffWhite: "#F2F2F7",
			backgroundBranco: "#FFFFFF",
		},
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
		},
	},
};
