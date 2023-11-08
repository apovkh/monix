import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

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
			theme_color: '#fff',
			lang: 'en'
		},
		workbox: {
			enabled: true
		}
	},
	alias: {
		'@types': resolve('../src/types/'),
		'@stores': resolve('../src/stores/'),
		'@composables': resolve('../src/composables/')
	}
})
