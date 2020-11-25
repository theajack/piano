export default {
    namespaced: true,
    state: {
        landscape: false,
        height: 0,
        width: 0,
        mainStyle: {},
        toastText: ''
    },
    mutations: {
        initSize (state, {width, height, landscape = false}) {
            let origin = Math.min(width, height) / 2;
            state.mainStyle = {
                transform: `rotate(${landscape ? 90 : 0}deg)`,
                width: `${width}px`,
                height: `${height}px`,
                'transform-origin': `${origin}px ${origin}px`
            };
            state.height = height;
            state.width = width;
            state.landscape = landscape;
        },
        setToast (state, text) {
            state.toastText = text;
        }
    },
};