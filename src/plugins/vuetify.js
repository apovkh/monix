import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi-svg'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
		theme: {
			defaultTheme: 'dark',
			themes: {
				dark: true,
				colors: {
					background: '#161719',
					primary: '#88B4B3',
					surface: '#FFFFFF',
					secondary: '#E7B262'
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
