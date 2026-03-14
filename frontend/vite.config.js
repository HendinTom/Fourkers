import { defineConfig  } from "vite";

export default defineConfig({
    build: {
        minify: false,
        sourcemap: false
    },
    server: {
        port: 3000,
    }
})