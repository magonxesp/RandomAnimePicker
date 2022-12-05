// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
				{ property: "og:image", content: "/meta-image.png" },
			],
			link: [
				{ rel: "icon", href: "/favicon.png" }
			]
		},
	},
	css: [
		"@fortawesome/fontawesome-svg-core/styles.css",
		"@/assets/styles/main.scss",
	],
	modules: ["@pinia/nuxt"]
})

/*    <meta property=”og:type” content=”website” />

    <meta property=”og:title” content=”título de tu página o tu post” />

    <meta property=”og:description” content=”descripción del contenido de la página” />

    <meta property=”og:image” content=”enlace al archive de la imagen” />

    <meta property=”og:url” content=”permalink” />*/
