<template>
    <div class='menu-w'>
        <div class='menu-config-w'>
            <div @click='showSelect = true' v-show='mode !== MODE.FREE'>
                <span v-show='showTip' class='menu-config-tip'>切换歌曲<i class='ei-angle-right'></i></span>
                <i class='menu-btn ei-music'></i>
            </div>

            <div @click='showSelectMode = true'>
                <span v-show='showTip' class='menu-config-tip'>切换模式<i class='ei-angle-right'></i></span>
                <i class='menu-btn ei-cog'></i>
            </div>
            
            <div @click='resetSong' v-show='mode !== MODE.FREE'>
                <span v-show='showTip' class='menu-config-tip'>重新开始<i class='ei-angle-right'></i></span>
                <i class='menu-btn ei-repeat'></i>
            </div>

            <div @click='resetThisLine' v-show='mode !== MODE.FREE'>
                <span v-show='showTip' class='menu-config-tip'>该行重新开始<i class='ei-angle-right'></i></span>
                <i class='menu-btn ei-hand-up'></i>
            </div>
        </div>
        <div class='menu-select' v-show='showSelect'>
            <i class='ei-times' @click='showSelect = false'></i>
            <div class='menu-ss-item'
                 @click='chooseSong(index)'
                 :class='{choosed: song.choosed}'
                 v-for='(song, index) in songData' :key='index'>
                <span>{{song.name}}</span>
                <i v-show='song.choosed' class='ei-checked'></i>
            </div>
        </div>

        <div class='menu-select' v-show='showSelectMode'>
            <i class='ei-times' @click='showSelectMode = false'></i>
            <div class='menu-ss-item'
                 @click='chooseMode(index)'
                 :class='{choosed: item.choosed}'
                 v-for='(item, index) in modes' :key='index'>
                <span>{{item.name}}</span>
                <div class='menu-desc'>{{item.desc}}</div>
                <i v-show='item.choosed' class='ei-checked mode-select'></i>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import {MODE} from '../util/constant';
    import {toast} from '../util/util';

    export default {
        name: 'toolMenu',
        data () {
            return {
                MODE,
                showSelectMode: false,
                showSelect: false,
                showTip: true,
                modeIndex: 0,
            };
        },
        computed: {
            ...mapState([
                'songData',
                'modes',
                'mode',
            ])
        },
        mounted () {
            setTimeout(() => {
                this.showTip = false;
            }, 10000);
        },
        methods: {
            chooseSong (index) {
                this.$store.commit('setSong', index);
                this.showSelect = false;
                toast(`已切换歌曲《${this.songData[index].name}》`);
            },
            resetSong () {
                this.$store.commit('setCurrentIndex', 0);
                toast('已重置歌曲');
            },
            chooseMode (index) {
                if (index !== this.modeIndex) {
                    this.modes[this.modeIndex].choosed = false;
                    this.modes[index].choosed = true;
                    this.modeIndex = index;
                    this.showSelectMode = false;
                    this.$store.commit('switchMode', this.modes[index].mode);
                    toast(`已切换到${this.modes[index].name}`);
                }
            },
            resetThisLine () {
                this.$store.commit('resetThisLine');
                toast('已重置当前行');
            }
        }
    };
</script>

