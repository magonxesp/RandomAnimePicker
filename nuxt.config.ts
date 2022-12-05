// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	css: [
		"@fortawesome/fontawesome-svg-core/styles.css",
		"@/assets/styles/main.scss",
	],
	modules: ["@pinia/nuxt"]
})
