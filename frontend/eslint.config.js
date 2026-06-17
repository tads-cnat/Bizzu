import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-config-prettier";
import sonarjs from "eslint-plugin-sonarjs";
import {defineConfig} from "eslint/config";

export default defineConfig([
	{
		// falando pro linst ignorar esses arquivos
		ignores: [
			"dist/",
			"node_modules/",
			"vite.config.ts",
			"vite.config.js",
			"postcss.config.js",
			"tailwind.config.js",
		],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	prettier,
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],

		plugins: {
			sonarjs,
		},
		languageOptions: {
			globals: globals.browser,
		},

		rules: {
			semi: ["error", "always"],
			quotes: ["warn", "double"],
			"@typescript-eslint/no-explicit-any": "warn", // falando pra ele não reclamar dos any que tem no nosso cdg
			"react/jsx-key": "off", // isso daqui pode vir a quebrar no futuro por isso eu botei como wanr
			"react/react-in-jsx-scope": "off", // lint tava reclamando pois ele usava regra antiga então não tem problema tirar isso
			"react/prop-types": "warn", // tive que desativar pois ele reclamava que as props não tavam tipadas em arquivos específicos sendo que elas estavam

			"sonarjs/cognitive-complexity": ["warn", 15],
			"sonarjs/no-identical-functions": "error",
			"sonarjs/no-duplicated-branches": "error",
			"sonarjs/no-small-switch": "error",
		},

		settings: {
			react: {
				version: "detect",
			},
		},
	},
]);
