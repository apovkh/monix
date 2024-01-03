/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vuetify from 'vite-plugin-vuetify'
import WindiCSS from 'vite-plugin-windicss'

import vue from '@vitejs/plugin-vue'

export default defineConfig({
	test: {
		globals: true,
		environment: 'happy-dom',
		deps: {
			inline: ['vuetify']
		}
	},
	plugins: [
		vue(),
		vuetify(),
		WindiCSS()
		// VitePWA({
		// 	srcDir: 'src',
		// 	registerType: 'autoUpdate',
		// 	injectRegister: 'auto',
		// 	workbox: {
		// 		clientsClaim: true,
		// 		skipWaiting: true,
		// 		navigateFallback: '/',
		// 		globPatterns: ['*/*.*', '*.*']
		// 	},
		// 	devOptions: {
		// 		enabled: true
		// 	}
		// 	// manifest: {
		// 	// 	name: 'Monix',
		// 	// 	short_name: 'Monix App',
		// 	// 	theme_color: '#500',
		// 	// 	lang: 'en',
		// 	// 	icons: [
		// 	// 		{
		// 	// 			src: '/icon.png',
		// 	// 			size: '512x512',
		// 	// 			type: 'image/png',
		// 	// 			purpose: 'any maskable'
		// 	// 		}
		// 	// 	]
		// 	// }
		// })
	]
})
