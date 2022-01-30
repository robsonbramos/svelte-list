import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
// import css from 'rollup-plugin-css-only';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			scss: {
				prependData: '@use "src/variables.scss" as *;'
			}

			// postcss: true
		})
	],

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		package: {
			files: (filepath) => {
				console.log(filepath);
				return true;
			}
		},

		vite: {
			// build: {
			// 	emptyOutDir: true,
			// 	minify: true,
			// 	rollupOptions: {
			// 		plugins: [css({ output: 'bundle123.css' })]
			// 	}
			// },
			css: {
				preprocessorOptions: {
					scss: {
						additionalData: '@use "src/variables.scss" as *;'
					}
				}
			}
		}
	}
};

export default config;
