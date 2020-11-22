import {EVENT, TOUCH_TYPE} from '../../util/constant';
import event from '../../util/event';

let touchedKeys = [];


export function onTouchStart (e) {
    sendTouchKeys(e, TOUCH_TYPE.START);
}
// export function onTouchMove (e) {
//     sendTouchKeys(e, TOUCH_TYPE.MOVE);
// }
export function onTouchEnd (e) {
    sendTouchKeys(e, TOUCH_TYPE.END);
}

function sendTouchKeys (e, curTouchType) {
    let keys = [];
    for (let i = 0; i < e.touches.length; i++) {
        let touch = e.touches[i];
        if (touch.target.hasAttribute('key-value')) {
            keys.push(touch.target.getAttribute('key-value'));
        }
    }
    
    keys.forEach(key => {
        let touchType = (touchedKeys.indexOf(key) === -1) ? TOUCH_TYPE.START : TOUCH_TYPE.END;
        event.emit(EVENT.TRIGGER_KEY, {
            key,
            touchType
        });
    });

    if (curTouchType === TOUCH_TYPE.END) {
        touchedKeys.forEach(key => {
            event.emit(EVENT.TRIGGER_KEY, {
                key,
                touchType: TOUCH_TYPE.END
            });
        });
    }

    touchedKeys = keys;

}
