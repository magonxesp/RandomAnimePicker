// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {

	},
	app: {
		head: {
			title: "Random Anime Picker",
			charset: "utf8",
			meta: [
				{ name: "description", content: "Pick a random anime and add to your list on myanimelist.net" },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ property: "og:type", content: "website" },
				{ property: "og:title", content: "Random Anime Picker" },
				{ property: "og:description", content: "Pick a random anime and add to your list on myanimelist.net" },
				{ property: "og:image", content: "/images/meta-image.png" },
				{ name: "google-site-verification", content: process.env.NUXT_GOOGLE_SITE_VERIFICATION },
			],
			link: [
				{ rel: "icon", href: "/icon/favicon.png" },
				{ rel: "apple-touch-icon", href: "/icon/icon-180x180.png" }
			]
		},
	},
	css: [
		"@fortawesome/fontawesome-svg-core/styles.css",
		"@/assets/styles/main.scss",
	],
	modules: [
		"@pinia/nuxt",
	],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
})
