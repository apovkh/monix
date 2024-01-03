export default defineNuxtConfig({
	srcDir: './src',
	ssr: false,
	modules: [
		'nuxt-windicss',
		'nuxt-vitest',
		'@kevinmarrec/nuxt-pwa',
		'@pinia/nuxt'
	],
	css: [
		'vuetify/lib/styles/main.sass',
		'@mdi/font/css/materialdesignicons.min.css'
	],
	build: {
		transpile: [
			'vuetify',
			'ordered-uuid'
		]
	},
	vite: {
		define: {
			'process.env.DEBUG': false
		}
	},
	pwa: {
		manifest: {
			name: 'Monix',
			short_name: 'Monix',
			theme_color: '#161719'
		},
		workbox: {
			enabled: true
		}
	}
})
