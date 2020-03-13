import Vue from 'vue';
import PderasTable from '../src';

import App from './App.vue';
Vue.use(PderasTable);

new Vue({
    el: '#app',
    render: h => h(App)
});
