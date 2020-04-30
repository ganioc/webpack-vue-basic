import Vue from 'vue';
import './styles/main.css'

import App from './app.vue'

console.log('hello')


new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})