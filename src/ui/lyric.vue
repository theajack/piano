<template>
    <div class='lyric-w'>
        <div class='song-info' v-show='mode!==MODE.FREE'>
            <div>《{{songName}}》</div>
        </div>
        <div class='song-info-mode'>{{modeName}}</div>
        <div v-show='mode===MODE.FREE' class='mode-free-tip'>
            <div>
                <div>自 由 演 奏</div>
                <div>Free Play</div>
            </div>
        </div>
        <div v-show='mode!==MODE.FREE' class='lyric-w-inner' :style='{"padding-bottom": `${offsetTop}px`, "padding-top": `${lyricTop}px`}' ref='scrollWrap'>
            <div class='lyric-line' :class='{"active": scrollIndex === i}' v-for='(line, i) in lyric' :key='i'>
                <div class='lyric-item'
                     :class='{actived: item.index < currentIndex, active: item.index === currentIndex - 1}'
                     v-for='(item, j) in line' :key='j'>
                    <div class='lyric-word'>{{item.word}}</div>
                    <div class='lyric-letter'>{{item.letter}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {EVENT, MODE} from '../util/constant';
    import event from '../util/event';
    import {mapState} from 'vuex';

    export default {
        name: 'lyric',
        data () {
            return {
                lyric: [[]],
                offsetTop: 55.6,
                scrollIndex: 0,
                scrollTop: 0,
                MODE
            };
        },
        computed: {
            ...mapState('ui', [
                'height'
            ]),
            ...mapState([
                'currentIndex',
                'mode',
                'modes',
                'songName'
            ]),
            lyricTop () {
                return (this.height * 0.45 - this.offsetTop) / 2;
            },
            modeName () {
                let res = this.modes.find(item => {
                    return item.mode === this.mode;
                });
                if (res) {return res.name;}
                return '';
            }
        },
        mounted () {
            event.regist(EVENT.LYRIC_CHANGE, ({word, letter}) => {
                this.$store.commit('setCurrentIndex', 0);
                let newArr = [];
                let index = 0;
                for (let i = 0; i < word.length; i++) {
                    let item = word[i];
                    let res = [];
                    for (let j = 0; j < item.length; j++) {
                        res.push({
                            word: item[j],
                            letter: letter[i][j],
                            index
                        });
                        index++;
                    }
                    newArr.push(res);
                }
                this.lyric = newArr;
            });
            event.regist(EVENT.CURRENT_INDEX_CHANGE, () => {
                this.checkScroll();
            });
        },
        methods: {
            checkScroll () {
                let index = 0;
                for (let i = 0; i < this.lyric.length; i++) {
                    let line = this.lyric[i];
                    if (line.length !== 0 && line[line.length - 1].index >= this.currentIndex) {
                        index = i;
                        break;
                    }
                }
                if (this.scrollIndex !== index) {
                    this.$store.commit('setThisLineFirstIndex', this.currentIndex);
                    this.scrollToLineIndex(index);
                }

            },
            scrollToLineIndex (index) {
                this.scrollIndex = index;
                let el = this.$refs.scrollWrap;
                let newTop = index * this.offsetTop;
                if (newTop === 0) {
                    el.scrollTop = 0;
                    this.scrollTop = 0;
                    return;
                }
                let n = Math.abs(newTop - this.scrollTop);
                let per = 1;

                let i = 0;
                let interval = setInterval(() => {
                    i ++;
                    if (i >= n) {
                        el.scrollTop = newTop;
                        clearInterval(interval);
                        this.scrollTop = newTop;
                    } else {
                        el.scrollTop += per;
                    }
                }, 10);
            }
        }
    };
</script>

