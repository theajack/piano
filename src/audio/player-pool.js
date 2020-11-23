// import {getAudioSrc, getKeyIndexes} from '../music-map/keys';
// import Player from './player';

import {getKeyIndexes, getNewKey} from '../music-map/keys';

import {random} from '../util/util';

let players = {};

window.players = players;

let keyIndexes = [];

let currentKeyIndexed = {};

function pushCurrentKeyIndex (keyIndex) {
    if (!currentKeyIndexed[keyIndex]) {
        currentKeyIndexed[keyIndex] = true;
    }
}

function removeCurrentKeyIndex (keyIndex) {
    if (currentKeyIndexed[keyIndex]) {
        delete currentKeyIndexed[keyIndex];
    }
}

export function initPlayerPool (songData) {
    keyIndexes = getKeyIndexes(songData.area);
    // keyIndexes.forEach((keyIndex) => {
    //     if (!players[keyIndex]) {
    //         let src = getAudioSrc(keyIndex);
    //         players[keyIndex] = new Player(src);
    //         // setTimeout(() => {
    //         //     console.log(keyIndex, i);
    //         //     players[keyIndex].play();
    //         // }, i * 1000);
    //     }
    // });
}

export function playKey ({keyIndex, key}) {
    // console.log('playKey', keyIndex, key);
    // console.log('playKey', keyIndex);
    if (keyIndex) {
        playNew(keyIndex);
        // if (players[keyIndex]) {
        //     players[keyIndex].play();
        //     pushCurrentKeyIndex(keyIndex);
        // }
    } else if (key) {
        playRandom(key);
    }
}


export function stopPlayKey (keyIndex) {
    // console.log('stopPlayKey', keyIndex);
    if (players[keyIndex]) {
        players[keyIndex].stop();
        removeCurrentKeyIndex(keyIndex);
    }
}

let lastRandomKeyIndex = '';
let lastKey = '';

export function playRandom (key) {
    if (key !== lastKey) {
        lastKey = key;
        lastRandomKeyIndex = keyIndexes[random(0, keyIndexes.length - 1)];
    }
    // players[lastRandomKeyIndex].play();
    playNew(lastRandomKeyIndex);
    pushCurrentKeyIndex(lastRandomKeyIndex);
}

let lastNewKey = '';

function playNew (key) {
    if (lastNewKey) {
        window._stop(lastNewKey);
    }
    let newKey = getNewKey(key);
    // console.log(key, newKey);
    lastNewKey = newKey;
    window._play(newKey);
}