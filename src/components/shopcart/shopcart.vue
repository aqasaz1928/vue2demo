<template>
<div>
<div class="shopcart">
    <div class="content">
        <div class="content-left" @click="toggleList">
            <div class="logo-wrapper">
                <div class="logo" :class="{highlight: totalCount > 0}">
                    <i class="icon-shopping_cart"></i>
                </div>
            </div>
            <div class="price" :class="{highlight: totalPrice > 0}">￥{{totalPrice}}
            </div>
            <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="content-right" @click="pay">
            <div class="pay" :class="{enough: totalPrice >= minPrice}">
                {{payDesc}}
            </div>
        </div>
        <div class="ball-container">
            <transition name="ball"  v-for="(ball, index) in balls"  :key="index"
            @enter="enter"
            @before-enter="beforeEnter"
            @after-enter="afterEnter">
                <div v-show="ball.show" class="ball">
                    <div class="inner inner-hook"></div>
                </div>
            </transition>
        </div>
    </div>
    <transition name="fold">
            <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty"  @click="listEmpty">清空</span>
            </div>
            <div class="list-content">
                <ul>
                    <li class="food border-1px" v-for="(food, index) in selectedFoods" :key="index">
                        <span class="name">{{food.name}}</span>
                        <div class="price">
                            <span>￥{{food.price * food.count}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <cartcontrol :food="food"></cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        </transition>
</div>
<transition name="fade">
    <div class="list-mask" v-show="listShow" @click="hideList">

</div>
</transition>
</div>

  
</template>
 <script type="text/ecmascript-6">
 import bus from '@/common/js/Bus'
 import cartcontrol from '@/components/cartcontrol/cartcontrol'
export default {
    data () {
        return {
            balls: [
                {show: false},
                {show: false},
                {show: false},
                {show: false},
                {show: false}
            ],
            dropBalls: [],
            fold: true,
            clickFlag: true
        }
    },
    components: {
        cartcontrol
    },
    created () {
        bus.$on('cart.add', this._drop)
    },
    methods: {
        pay () {
            if (this.totalPrice < this.minPrice) {
                return;
            }
            alert(this.totalPrice)
        },
        hideList () {
            this.fold = true
        },
        listEmpty () {
            this.selectedFoods.forEach((food) => {
                food.count = 0
                this.fold = true
            })
        },
        _drop (target) {
            // 体验优化，实现异步动画效果加载
            this.$nextTick(() => {
                if (!this.clickFlag) {
                    return
                }
                this.clickFlag = false
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i]
                    if (!ball.show) {
                        ball.show = true
                        ball.el = target
                        this.dropBalls.push(ball)
                        window.setTimeout(() => {
                            this.clickFlag = true
                        }, 250)
                        return
                    }
                }
            })
        },
        beforeEnter (el) {
            let count = this.balls.length
            while (count--) {
                let ball = this.balls[count]
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect()
                    let x = rect.left - 30
                    let y = -(window.innerHeight - rect.top - 18)
                    el.style.display = ''
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`
                    el.style.transform = `translate3d(0,${y}px,0)`
                    let inner = el.getElementsByClassName('inner-hook')[0]
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`
                    inner.style.transform = `translate3d(${x}px,0,0)`
                    this.balls.splice(count, 1)
                }
            }
        },
        enter (el, done) {
            // 调用offseHeight方法使浏览器更新dom渲染
            let rf = el.offsetHeight
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0,0,0)'
                el.style.transform = 'translate3d(0,0,0)'
                let inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.webkitTransform = `translate3d(0,0,0)`
                inner.style.transform = `translate3d(0,0,0)`
            })
            done()
        },
        afterEnter (el) {
            let ball = this.dropBalls.shift()
            if (ball) {
                ball.show = false
            }
            this.balls.push(
                {show: false}
            )
        },
        toggleList () {
            if (this.totalCount) {
                let status = this.fold
                this.fold = !status
            }
        }
    },
    props: {
      deliveryPrice: {
          type: Number
      },
      minPrice: {
          type: Number
      },
      selectedFoods: {
          type: Array
      }
  },
  computed: {
      totalPrice () {
          let total = 0
          this.selectedFoods.forEach(food => {
            total += food.price * food.count
          })
          return total
      },
      totalCount () {
          let count = 0
          this.selectedFoods.forEach(food => {
              count += food.count
          })
          return count
      },
      payDesc () {
          if (this.totalCount > 0 && this.totalPrice < this.minPrice) {
            return `还需${this.minPrice - this.totalPrice}元起送`
          } else if (this.totalPrice >= this.minPrice) {
            return '去结算'
          }
          return '￥' + this.minPrice + '起送'
      },
      listShow () {
          if (this.totalCount) {
            return !this.fold
          }
          return false
      }
  }
}
</script>
<style rel="stylesheet/stylus" lang="stylus">
@import '../../common/stylus/mixin.styl'
    .shopcart
        position fixed
        left 0
        bottom 0
        z-index 50
        width 100%
        height 48px
        background-color #141d27
        .content
            display flex
            background-color #141d27
            .ball-container
                position fixed
                left 30px
                bottom 18px
                .ball
                    display inline-block
                    left 32px
                    bottom 14px
                    transition all .3s cubic-bezier(0.46,-0.34,1,0.34)
                    .inner
                        display inline-block
                        z-index 200
                        background-color rgb(0,160,220)
                        width 16px
                        height 16px
                        border-radius 50%
                        transition  all .3s linear
            .content-left
                flex 1
                font-size 0
                .logo-wrapper
                    display inline-block
                    position relative
                    top -10px
                    margin 0 12px
                    padding 6px
                    width 56px
                    height 56px
                    border-radius 56px
                    box-sizing border-box
                    background-color #141d27
                    .logo
                        display inline-block
                        width 44px
                        height 44px
                        border-radius 50%
                        background-color rgba(255,255,255,0.2)
                        box-sizing border-box
                        padding 10px
                        .icon-shopping_cart
                            font-size 24px
                            color rgba(255,255,255,.4)
                            line-height 24px
                        &.highlight
                            background-color rgb(0,160,220)
                            .icon-shopping_cart
                                color #fff
                .price,.desc
                    display inline-block
                    vertical-align top
                    margin 12px 0
                    font-size 16px
                    font-weight 700
                    color rgba(255,255,255,.4)
                    line-height 24px
                .price
                    border-right 1px solid rgba(255,255,255,0.1)
                    padding-right 12px
                    &.highlight
                        color #fff
                .desc
                    margin-left 12px
                    font-weight 200
                .num
                    position absolute
                    display inline-block
                    left 44px
                    top -10px
                    width 24px
                    height 16px
                    border-radius 12px
                    font-size 9px
                    font-weight 700
                    line-height 16px
                    text-align center
                    color #fff
                    background-color rgb(240,20,20)
                    box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
            .content-right
                flex 0 0 105px
                -webkit-animation-delay 105px
                background-color rgba(255,255,255,0.2)
                .pay
                    font-size 12px
                    line-height 48px
                    text-align center
                    font-weight 700
                    color rgba(255,255,255,0.4)
                    &.enough
                        background-color #00b43c
                        color #fff
        .shopcart-list
            position absolute
            top 0
            left 0
            z-index -1
            width 100%
            transform  translateY(-100%)
            transition  all 0.5s ease
            .list-header
                display flex
                height 40px
                line-height 40px
                padding 0 18px
                background-color #f3f5f7
                border-bottom 1px solid rgba(7,17,27,.1)
                .title
                    flex 1
                    text-align left
                    font-size 14px
                    font-weight 200
                    color rgb(7,17,27)
                .empty
                    flex 0 0 30px
                    text-align right
                    font-size 12px
                    font-weight 200
                    color rgb(0,160,220)    
            .list-content
                position relative
                width 100%
                background-color #fff
                padding-left 18px
                max-height 217px
                overflow-y scroll
                .food
                    margin-right 30px
                    height 48px
                    padding 12px 0
                    box-sizing border-box
                    border-1px(rgba(7,17,27,0.1))
                    font-size 0
                    .name
                        display inline-block
                        font-size 14px
                        line-height 24px
                        color rgb(7,17,27)
                    .price
                        position absolute
                        right 90px
                        top 12px
                        line-height 24px
                        font-size 14px
                        color rgb(240,20,20)
                        font-weight 700
                        padding-left 18px
                    .cartcontrol-wrapper
                        position absolute
                        right 0
                        top 6px
        .fold-enter, .fold-leave-to
            transform translateY(0)
            
            

    .list-mask
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        background-color rgba(7,17,27,.6)
        filter blur(3px)
        z-index 5

</style>

