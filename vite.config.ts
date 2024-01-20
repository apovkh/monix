/// <reference types="vitest" />

import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import vuetify from 'vite-plugin-vuetify'

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
		UnoCSS()
	]
})
