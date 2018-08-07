<!-- 轮播图组件 -->
<template>
  <!--<div  id="sliderView" class="my-slider"  ref="slider" v-if="images.length > 0">-->
  <div id="sliderView" class="my-slider" ref="slider">
    <ul v-if="images.length > 0" class="slider-group clearfix" ref="sliderGroup" :style="ulStyleObj">
      <li class="slider-item" v-for="(image, index) in images" :key="index" :style="{ width: viewWidth + 'px'}">
        <div class="item-wrapper">
          <img :src="image.imageurl" :style="imgStyleObj">
          <div class="slide-title" v-text="image.title"></div>
        </div>
      </li>
    </ul>
    <!-- 轮播点 -->
    <div class="dots" v-if="images.length > 1">
      <span v-for="(dot, index) in dots" :key="index" :class="{ active: currentDotsIndex === index }" class="dot"></span>
    </div>
  </div>
</template>

<script>
  import {getBannerList} from '../services/articleServices'
  export default {
    components: {},
    data () {
      return {
        time: null,
        dots: [],
        images: [],
        dotStyle: {
          transform: 'translate3d(0px, 0px, 0px)'
        },
        currentDotsIndex: 0,
        viewWidth: 320,
        slider: null,
        browser: 'phone',
        touched: false,
        point: { // 记录手指按下后点信息
          startX: 0, // 手指按下的瞬间的x坐标
          changeX: 0, // 手指移动距离，负的表示向左，正的表示向右
          startTimeStap: null, // 手指按下瞬间的时间戳
          endTimeStap: null // 手机离开时候的时间戳
        },
        ulStyleObj: {
          width: '320px',
          transition: '0',
          transform: 'scaleZ(1.01) translate3d(0, 0, 0)'
        },
        imgStyleObj: {
          width: '100%',
          height: '4.16rem',
          transition: '0.5',
          transform: 'scale(1)'
        },
        pEvent: {
          TOUCHSTART: 'touchstart',
          TOUCHMOVE: 'touchmove',
          TOUCHEND: 'touchend'
        },
        // 拖拽距离配置
        dragConfig: {
          // 拖拽距离
          distance: 15,
          // 拖拽间隔
          timeStap: 150
        }
      }
    },
    props: {
      // 是否循环播放
      loop: {
        type: Boolean,
        default: true
      },
      // 是否自动播放
      auto: {
        type: Boolean,
        default: false
      },
      // 轮播延时
      delay: {
        type: Number,
        default: 5000
      }
    },
    mounted () {
      this.viewWidth = window.innerWidth
      this.getBanner()
      this.slider = document.querySelector('#sliderView')
    },
    methods: {
      async getBanner () {
        let data = await getBannerList()
        if (data.code === 1 && data.data) {
          this.images = data.data
          // this.slider = this.$refs.slider
        }
      },
      // 轮播图(sliderGroup)宽度
      /**
       * 初始化轮播图
       * @param resize 用户是否更改浏览器视图宽度
       */
      initLayout (resize) {
        if (resize) {
          this.viewWidth = window.innerWidth
        }
        this.imgStyleObj.width = `${this.viewWidth}px`
        this.ulStyleObj.width = `${this.images.length * this.viewWidth}px`
        const translate = -(this.currentDotsIndex * this.viewWidth)
        this.ulStyleObj.transform = `scaleZ(1.01) translate3d(${translate + this.point.changeX}px, 0, 0)`
//        this.dotMove = `translate3d(${80 * this.currentDotsIndex}px, 0, 0)`
        this.eventHandle()
      },
      // 自动播放
      _initPlay () {
        this.timer = setInterval(() => {
          this.goNextPage()
        }, this.delay)
      },
      setBrowserEvent () {
        this.browser = this.browserRedirect()
        if (this.browser === 'pc') {
          this.pEvent.TOUCHSTART = 'mousedown'
          this.pEvent.TOUCHMOVE = 'mousemove'
          this.pEvent.TOUCHEND = 'mouseup'
          this.dragConfig.timeStap = 200
          this.dragConfig.distance = parseInt(this.viewWidth / 2) < 400 ? parseInt(this.viewWidth / 2) : 400 // eslint-disable-line
        } else {
          this.pEvent.TOUCHSTART = 'touchstart'
          this.pEvent.TOUCHMOVE = 'touchmove'
          this.pEvent.TOUCHEND = 'touchend'
          this.dragConfig.timeStap = 150
          this.dragConfig.distance = parseInt(this.viewWidth / 2) // eslint-disable-line
        }
//        this.initLayout()
      },
      // 平台判断
      browserRedirect () {
        const userAgentInfo = navigator.userAgent
        const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod', 'Mobile']
        let flag
        flag = 'pc'
        for (let v = 0; v < Agents.length; v += 1) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = 'phone'
            break
          }
        }
        return flag
      },
      // 事件处理
      eventHandle () {
        const self = this
        if (!this.slider) {
          return
        }
        this.slider.addEventListener(self.pEvent.TOUCHSTART, (e) => {
          self.touchend = true
          self.eventStop(e)
          if (this.browser === 'pc') {
            self.point.StartX = e.clientX
          } else {
            self.point.StartX = e.changedTouches[0].pageX
          }
          self.point.startTimeStap = new Date()
          return false
        })
        this.slider.addEventListener(self.pEvent.TOUCHMOVE, (e) => {
          if (!self.touchend) {
            return
          }
          self.eventStop(e)
          self.imgStyleObj.transform = 'scale(1)'
          self.ulStyleObj.transition = ''
          if (this.browser === 'pc') {
            self.point.changeX = e.clientX - self.point.StartX
          } else {
            self.point.changeX = e.changedTouches[0].pageX - self.point.StartX
          }
          const translate = -(self.currentDotsIndex * self.viewWidth)
          self.ulStyleObj.transform = `scaleZ(1.01) translate3d(${translate + self.point.changeX}px, 0, 0)`
        })
        this.slider.addEventListener(self.pEvent.TOUCHEND, (e) => {
          self.touchend = false
          self.ulStyleObj.transition = '0.5s'
          if (this.browser === 'pc') {
            self.point.changeX = e.clientX - self.point.StartX
          } else {
            self.point.changeX = e.changedTouches[0].pageX - self.point.StartX
          }
          self.point.endTimeStap = new Date()
          const timeStap = self.point.endTimeStap - self.point.startTimeStap
          const changeX = Math.abs(self.point.changeX)
          let currentDotsIndex
          currentDotsIndex = self.currentDotsIndex
          if ((
            changeX >= self.dragConfig.distance) || (
            timeStap < self.dragConfig.timeStap && changeX > 30)) {
            if (self.point.changeX > 0) {
              currentDotsIndex = currentDotsIndex <= 0 ? currentDotsIndex : currentDotsIndex - 1
            } else {
              currentDotsIndex = currentDotsIndex >= this.images.length - 1 ? currentDotsIndex : currentDotsIndex + 1
            }
          }
          const translate = -(currentDotsIndex * self.viewWidth)
          self.currentDotsIndex = currentDotsIndex
          self.ulStyleObj.transform = `scaleZ(1.01) translate3d(${translate}px, 0, 0)`
          if (changeX < 5) {
            // self.$refs.img[self.showIndex].style.transform = 'scale(2)'
//            self.$emit('hide')
          }
          return false
        })
      },
      // 自动跳转到下一页
      goNextPage () {
        let page = this.currentDotsIndex + 1
        if (page >= this.images.length) page = 0
        this.currentDotsIndex = page
        const translate = -(page * this.viewWidth)
        const moveDis = page * 10 + 8
        this.ulStyleObj.transform = `scaleZ(1.01) translate3d(${translate}px, 0, 0)`
        this.dotStyle.transform = `translate3d(${moveDis}px, 0, 0)`
        this.ulStyleObj.transition = '0.5s'
      },
      eventStop (e) {
        e.preventDefault()
        e.stopPropagation()
      }
    },
    watch: {
      images () {
        if (this.images.length > 0) {
          this.dots = new Array(this.images.length)
          this.setBrowserEvent()
          if (this.auto) {
            this._initPlay()
          }
          this.$nextTick(() => {
            this.initLayout()
            // 当窗口尺寸改变时，重新计算轮播宽度
            window.addEventListener('resize', () => {
              if (!this.slider) {
                return
              }
              this.initLayout(true)
            })
          })
        }
      }
    },
    destroyed () {
      // 良好的习惯：销毁定时器
      clearInterval(this.timer)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/styles/color";
  .my-slider {
    min-height: 4.16rem;
    height: 4.16rem;
    position: relative;
    overflow: hidden;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      /*height: 130px;*/
      /*overflow-y: scroll;*/
      .slider-item {
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        .item-wrapper{
          position: relative;
        }
        .slide-title{
          position: absolute;
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          left: 0;
          bottom: 0;
          background: rgba(0, 0, 0, .5);
          color: $c-white;
          text-align: left;
          padding: 0 0.3rem;
          font-weight: 600;
          font-size: 0.3rem;
        }
        a {
          display: block;
          width: 100%;
          overflow: hidden;
          text-decoration: none;
        }
        img {
          display: block;
          width: 100%;
          height: 4.16rem;
        }
      }
    }
    .dots {
      position: absolute;
      right: 0;
      left: 0;
      bottom: 15px;
      text-align: right;
      font-size: 0;
      padding: 0.3rem 0.3rem 0 0.3rem;
      .dot {
        display: inline-block;
        margin: 0 0.04rem;
        width: 0.15rem;
        height: 0.15rem;
        border-radius: 50%;
        background: rgba(255,255,255,0.8);
        z-index: 10;
        transition: 0.5s;
        /*animation: dotMove 1s;*/
        &.active {
          /*width: 20px;*/
          /*border-radius: 5px;*/
          background: $c-main;
        }
        &.dot-move{
          /*width:20px;*/
          position: absolute;
          left: 1.53rem;
          z-index: 9;
          border-radius: 0.05rem;
          animation: dotMove 1s;
          animation-iteration-count: 1;
          animation-fill-mode: both;
        }
      }
    }
  }
  @keyframes dotMove {
    0%{
      width:0.08rem;
      /*left: 163px;*/
    }
    5%{
      width:0.2rem;
    }
    100% {
      width:0.08rem;
      /*left: 185px;*/
    }

  }

</style>
