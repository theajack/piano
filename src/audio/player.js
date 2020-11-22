import {base64ToUint8Array} from '../util/util';

let AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

export default class Player {
    constructor (src) {
        this.ctx = new AudioContext();
        this.source = null;
        this.src = src;
        let buffer = base64ToUint8Array(src.substr(src.indexOf(',') + 1)).buffer;
        this.ctx.decodeAudioData(buffer, (audioBuffer) => { // 解码成功时的回调函数
            this.audioBuffer = audioBuffer;
        }, function (e) { // 解码出错时的回调函数
            console.log('Error decoding file', e);
        });
    }

    play () {
        this.stop();
        this.source = this.ctx.createBufferSource();
        this.source.buffer = this.audioBuffer;
        this.source.loop = false; // 循环播放
        this.source.connect(this.ctx.destination);
        this.source.start(0); // 立即播放
    }
    stop () {
        if (this.source) {
            this.source.stop(0); // 立即停止
            this.source = null;
        }
    }
}
