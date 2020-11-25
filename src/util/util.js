import tool from 'easy-dom-util';
import initStore from '../store';
export let $ = tool;

export function base64ToUint8Array (base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function isUndf (v) {
    return typeof v === 'undefined';
}

export function isObject (v) {
    return typeof v === 'object';
}

export function getWindowSize () {
    return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    };
}

export function random (a, b) {
    return (a + Math.round(Math.random() * (b - a)));
};

export function isPC () {
    return !(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent));
}

let toastTimer = null;

export function toast (text) {
    clearTimeout(toastTimer);
    initStore().commit('ui/setToast', text);
    toastTimer = setTimeout(() => {
        initStore().commit('ui/setToast', '');
    }, 3000);
}