import Vuex from 'vuex';
import {EVENT} from '../util/constant';
import event from '../util/event';
import songDict from '../music-map/data';
import ui from './ui';
import {initSong} from '../music-map';

let store = null;

let state = {
    currentIndex: 0,
    songIndex: -1,
    songData: [{
        name: '消愁-毛不易',
        data: songDict.xiaochou,
        choosed: true
    }, {
        name: '麻雀-李荣浩',
        data: songDict.maque,
        choosed: false
    }, {
        name: 'Mojito-周杰伦',
        data: songDict.mojito,
        choosed: false
    }]
};

let getters = {
    currentIndex (state) {
        return state.currentIndex;
    },
    currentSong (state) {
        return state.songData[state.songIndex];
    }
};

let actions = {

};

let mutations = {
    setCurrentIndex (state, index) {
        state.currentIndex = index;
        event.emit(EVENT.CURRENT_INDEX_CHANGE, index);
    },
    addCurrentIndex (state) {
        this.commit('setCurrentIndex', state.currentIndex + 1);
    },
    setSong (state, index) {
        if (state.songIndex !== index) {
            if (state.songIndex !== -1)
                state.songData[state.songIndex].choosed = false;
            state.songIndex = index;
            state.songData[index].choosed = true;
            initSong();
            this.commit('setCurrentIndex', 0);
        }
    }
};

export default function () {
    if (!store) {
        store = new Vuex.Store({
            state,
            getters,
            actions,
            mutations,
            modules: {
                ui
            }
        });
        window.store = store;
    }
    return store;
}