<template>
    <div id='pianoMain' :style='mainStyle'>
        <KeyBoard></KeyBoard>
        <Lyric></Lyric>
        <ToolMenu></ToolMenu>
    </div>
</template>
<script>
    import './style/index.less';
    import KeyBoard from './keyboard.vue';
    import ToolMenu from './menu.vue';
    import Lyric from './lyric.vue';
    import {mapState} from 'vuex';
    import {initSize} from './js/size';
    export default {
        components: {
            KeyBoard, ToolMenu, Lyric
        },
        computed: {
            ...mapState('ui', [
                'mainStyle'
            ])
        },
        mounted () {
            initSize();
            this.$store.commit('setSong', parseInt(localStorage.getItem('piano_song_index') || 0));
        }
    };
</script>

