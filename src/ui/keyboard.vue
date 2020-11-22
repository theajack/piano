<template>
    <div class='keyboard-w'
         @touchstart='touchstart'
         @touchend='touchend'
         @mousedown='mousedown'
         @mouseup='mouseup'
    >
        <div class='keyboard-line' v-for='(arr, index) in keys' :key='index'>
            <span class='key-item' v-for='(value, index) in arr' :key='index'>
                <span class='key-word' :key-value='value'>{{value}}</span>
            </span>
        </div>
    </div>
</template>
<script>
    import {EVENT, KEY_CODE, TOUCH_TYPE} from '../util/constant';
    import {isPC} from '../util/util';
    import $ from 'easy-dom-util';
    import {onTouchStart, onTouchEnd} from './js/keyboard-event';
    import event from '../util/event';
    export default {
        name: 'keyboard',
        computed: {
        },
        data () {
            return {
                keys: [
                    'QWERTYUIOP'.split(''),
                    'ASDFGHJKL'.split(''),
                    'ZXCVBNM'.split(''),
                ]
            };
        },
        mounted () {
            if (isPC()) {
                window.addEventListener('keydown', (e) => {
                    let code = e.keyCode;
                    if (KEY_CODE[code]) {
                        onTouchStart({
                            touches: [{target: $.query(`[key-value=${KEY_CODE[code]}]`).el}]
                        });
                    }
                });
                window.addEventListener('keyup', (e) => {
                    let code = e.keyCode;
                    if (KEY_CODE[code]) {
                        onTouchEnd({touches: []});
                    }
                });
            }
            event.regist(EVENT.TRIGGER_KEY_STATE, ({key, isRight, touchType}) => {
                let el = $.query(`[key-value=${key}]`);
                if (!el) {return;};
                if (touchType === TOUCH_TYPE.END) {
                    return;
                }
                if (isRight) {
                    if (touchType === TOUCH_TYPE.START) {
                        el.addClass('active');
                        setTimeout(() => {
                            el.rmClass('active');
                        }, 500);
                    }
                } else {
                    el.addClass('error');
                    setTimeout(() => {
                        el.rmClass('error');
                    }, 500);
                }
            });
        },
        methods: {
            touchstart (e) {
                onTouchStart(e);
            },
            
            // touchmove (e) {
            //     // onTouchMove(e);
            // },
            
            touchend (e) {
                onTouchEnd(e);
            },
            mousedown (e) {
                if (isPC()) {
                    e.touches = [e];
                    onTouchStart(e);
                }
            },
            mouseup (e) {
                if (isPC()) {
                    e.touches = [];
                    onTouchEnd(e);
                }
            }
        }
    };
</script>

