/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Poppins", "serif"],
				mono: ["JetBrains Mono", "monospace"],
			},
			colors: {
				surface: {
					DEFAULT: "#101417",
					dim: "#101417",
					bright: "#363a3d",
					"container-lowest": "#0b0f11",
					"container-low": "#191c1f",
					"container": "#1d2023",
					"container-high": "#272a2d",
					"container-highest": "#323538",
				},
				primary: {
					DEFAULT: "#c1c5e3",
					dark: "#1a1f36",
					container: "#1a1f36",
				},
				secondary: {
					DEFAULT: "#e7c08a",
					dark: "#d4af7a",
					container: "#5c4217",
				},
				tertiary: {
					DEFAULT: "#c0c7d6",
					container: "#1a212d",
				},
				accent: {
					gold: "#d4af7a",
					"gold-light": "#e7c08a",
				},
				obsidian: "#1a1f36",
				gold: "#d4af7a",
			},
			backdropBlur: {
				sm: "4px",
			},
			borderRadius: {
				DEFAULT: "0.5rem",
				sm: "0.25rem",
				md: "0.75rem",
				lg: "1rem",
				xl: "1.5rem",
			},
			spacing: {
				"container-max": "1280px",
				gutter: "24px",
				"margin-page": "64px",
				"section-padding": "120px",
			},
		},
	},
	plugins: [],
};
