import $ from 'easy-dom-util';
import initStore from '../../store';
// import {getWindowSize} from '../../util/util';
window.$ = $;
export function initSize () {
    let store = initStore();

    let fn = () => {
        let size = $.windowSize();
        if (size.width < size.height) {
            size.landscape = true;
            let temp = size.height;
            size.height = size.width;
            size.width = temp;
        }
        store.commit('ui/initSize', size);
    };
    fn();
    window.addEventListener('resize', () => {setTimeout(fn, 50);});
}