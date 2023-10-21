export default defineNuxtConfig({
	srcDir: './src',
	ssr: false,
	modules: [
		'nuxt-windicss',
		'nuxt-vitest',
		'@kevinmarrec/nuxt-pwa'
		// '@vite-pwa/nuxt'
	],
	css: [
		'vuetify/lib/styles/main.sass',
		'@mdi/font/css/materialdesignicons.min.css'
	],
	build: {
		transpile: ['vuetify']
	},
	vite: {
		define: {
			'process.env.DEBUG': false
		}
	},
	pwa: {
		manifest: {
			name: 'Monix Application',
			short_name: 'Monix',
			theme_color: '#500',
			lang: 'en'
		}
	}
})
