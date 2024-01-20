import { defineConfig } from 'unocss'

import presetUno from '@unocss/preset-uno'
import presetWind from '@unocss/preset-wind'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
	presets: [
		presetUno(),
		presetWind()
	],
	transformers: [
		transformerDirectives()
	],
	theme: {
		colors: {
			background: '#202123',
			primary: '#66C7C5',
			surface: '#FFFFFF',
			secondary: '#E7B262',
			red: '#E77262',
			green: '#90CA81'
		}
	}
})
