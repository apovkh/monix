import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi-svg'

import '../scss/main.scss'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
		theme: {
			defaultTheme: 'monix',
			themes: {
				monix: {
					dark: true,
					colors: {
						background: '#202123',
						primary: '#66C7C5',
						surface: '#FFFFFF',
						secondary: '#E7B262',
						red: '#E77262',
						green: '#90CA81'
					}
				}
			}
		},
		ssr: true,
		components,
		directives,
		icons: {
			defaultSet: 'mdi',
			aliases,
			sets: {
				mdi
			}
		}
	})

	nuxtApp.vueApp.use(vuetify)
})
