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
	]
})
