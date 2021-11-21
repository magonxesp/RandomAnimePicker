import Vue from "vue";
import App from "./components/app/app.vue";
import "./styles/style.scss";
import { library } from "@fortawesome/fontawesome-svg-core"
import { faUserSecret, faHistory, fas } from "@fortawesome/free-solid-svg-icons"

library.add(faUserSecret);
library.add(faHistory);
library.add(fas);


const app = new Vue({
    el: '#root',
    template: '<App/>',
    components: {
        App
    }
});