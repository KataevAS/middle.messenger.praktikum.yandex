import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import postcssNesting from 'postcss-nesting';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    plugins: [handlebars()],
    css: {
        postcss: {
            plugins: [
                postcssNesting,
                autoprefixer({})
            ],
        },
    },
})