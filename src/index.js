
import Vuex from 'vuex';
import Vue from 'vue/dist/vue.esm';
Vue.use(Vuex);

import $ from 'easy-dom-util';
import Main from './ui/main.vue';
import initStore from './store';
// import 'easy-icon';

document.title = 'biu~';

$.query('body').append($.create('div#pianoApp'));
// $.query('#loadingW').remove();

new Vue({
    render: h => h(Main),
    store: initStore()
}).$mount('#pianoApp');

