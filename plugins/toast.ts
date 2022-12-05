import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";


const options = {
	position: "bottom-right",
	closeOnClick: true,
	hideProgressBar: true,
}

export default defineNuxtPlugin(nuxt => {
	nuxt.vueApp.use(Toast, options)
})
