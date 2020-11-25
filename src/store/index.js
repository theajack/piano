import Vuex from 'vuex';
import {EVENT, MODE} from '../util/constant';
import event from '../util/event';
import songData from '../music-map/data';
import ui from './ui';
import {initSong} from '../music-map';

let store = null;

let state = {
    currentIndex: 0,
    songIndex: -1,
    songName: '',
    songData,
    thisLineFirstIndex: 0,
    mode: parseInt(localStorage.getItem('piano_mode') || MODE.RIGHT),
    modes: [
        {
            choosed: true,
            mode: MODE.RIGHT,
            name: '严格模式',
            desc: '必须按对对应的按键才可弹奏曲子'
        },
        {
            choosed: false,
            mode: MODE.ANY,
            name: '简易模式',
            desc: '随意按任意按键都可弹奏曲子'
        },
        {
            choosed: false,
            mode: MODE.FREE,
            name: '自由模式',
            desc: '每个按键对应固定的声音，自由演奏'
        },
    ]
};

let getters = {
    currentIndex (state) {
        return state.currentIndex;
    },
    currentSong (state) {
        return state.songData[state.songIndex];
    },
    mode (state) {
        return state.mode;
    }
};

let actions = {

};

let mutations = {
    setThisLineFirstIndex (state, index) {
        state.thisLineFirstIndex = index;
    },
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
            localStorage.setItem('piano_song_index', index);
            state.songName = state.songData[index].name;
        }
    },
    switchMode (state, mode) {
        state.mode = mode;
        this.commit('setCurrentIndex', 0);
        localStorage.setItem('piano_mode', mode);
    },
    resetThisLine (state) {
        this.commit('setCurrentIndex', state.thisLineFirstIndex);
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