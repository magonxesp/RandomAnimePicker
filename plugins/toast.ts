import Toast, {PluginOptions, POSITION} from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";


const options: PluginOptions = {
	position: POSITION.BOTTOM_RIGHT,
	closeOnClick: true,
	hideProgressBar: true,
}

export default defineNuxtPlugin(nuxt => {
	nuxt.vueApp.use(Toast, options)
})
