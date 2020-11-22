<template>
    <div class='menu-w'>
        <div class='menu-config-w'>
            <i class='ei-music' @click='showSelect = true'></i>
            <i class='ei-repeat' @click='resetSong'></i>
        </div>
        <div class='menu-select-song' v-show='showSelect'>
            <i class='ei-times' @click='showSelect = false'></i>
            <div class='menu-ss-item'
                 @click='chooseSong(index)'
                 :class='{choosed: song.choosed}'
                 v-for='(song, index) in songData' :key='index'>
                <span>{{song.name}}</span>
                <i v-show='song.choosed' class='ei-checked'></i>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex';

    export default {
        name: 'toolMenu',
        data () {
            return {
                showSelect: false
            };
        },
        computed: {
            ...mapState([
                'songData'
            ])
        },
        mounted () {
        },
        methods: {
            chooseSong (index) {
                this.$store.commit('setSong', index);
                this.showSelect = false;
            },
            resetSong () {
                this.$store.commit('setCurrentIndex', 0);
            }
        }
    };
</script>

