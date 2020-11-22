
import Vuex from 'vuex';
import Vue from 'vue/dist/vue.esm';
Vue.use(Vuex);

import $ from 'easy-dom-util';
import audioData from './audio/audio-data';
import Player from './audio/player';
import Main from './ui/main.vue';
import initStore from './store';
import 'easy-icon';


$.query('body').append($.create('div#pianoApp'));

new Vue({
    render: h => h(Main),
    store: initStore()
}).$mount('#pianoApp');


window.player = new Player(audioData.A4);