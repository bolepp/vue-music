<template>
  <div class="music-list">
    <!--返回上一层-->
    <div class="back" @click="back">
      <i class="iconfont icon-fanhui" style="font-size:25px;color:#fff;"></i>
    </div>
    <!--歌曲信息-->
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs" 
      :listen-scroll="listenScroll" 
      :probe-type="probeType" 
      class="list" 
      ref="list"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
      <!--加载loading-->
      <div v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/songList/songList'
  import Loading from 'base/loading/loading'
  import {prefixStyle} from 'common/js/dom'
  import {mapActions} from 'vuex'

  const RESERVED_HEIGHT = 40
  const transform = prefixStyle('transform')
  export default {
    components: {
      Scroll,
      SongList,
      Loading 
    },
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scrollY: 0
      }
    },
    computed: {
      // 加载歌手背景图片
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    mounted() {
      this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    methods: {
    selectItem(item,index){
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    back() {
      this.$router.back()
    },
    ...mapActions([
      'selectPlay'
    ])
      // scroll(pos) {
      //   this.scrollY = pos.y
      // }
    }
  }
</script>

<style lang="scss" scoped>
@import "src/common/scss/variable.scss";
@import "src/common/scss/mixin";
.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
  .back {
    position: absolute;
    top: -40px;
    left: 22px;
    z-index: 50;
    // font-size: 30px;
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color:#fff;

  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;
      // overflow: hidden;
      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;

        }
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;    
    background: $color-background;
    .song-list-wrapper {
      padding: 20px 30px;
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>