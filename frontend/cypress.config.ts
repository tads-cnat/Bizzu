import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    BASE_URL_BACK: "http://localhost:8000/api",
  },

  e2e: {
	baseUrl: "http://localhost:5173",
		viewportWidth: 1920,
		viewportHeight: 936,
        supportFile: false,
  },
});