import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-config-prettier";
import {defineConfig} from "eslint/config";

export default defineConfig([
	js.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	prettier,
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],

		languageOptions: {
			globals: globals.browser,
		},

		rules: {
			semi: ["error", "always"],
			quotes: ["error", "double"],
		},

		settings: {
			react: {
				version: "detect",
			},
		},
	},
]);
