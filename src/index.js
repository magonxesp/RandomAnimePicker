import Vue from "vue";
import App from "./components/app/app.vue";
import "./style.scss";

const app = new Vue({
    el: '#root',
    template: '<App/>',
    components: {
        App
    }
});