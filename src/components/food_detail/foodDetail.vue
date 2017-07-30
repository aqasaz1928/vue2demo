<template>
<transition name="move">
  <div class="food-detail" v-show="showFlag" ref="foodDetailWrapper">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image"/>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span><span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="control-wrapper">
        <cartcontrol :food="food" ref="cartControl"></cartcontrol>
        <transition name="collapse">
        <div class="into-cart" v-show="! food.count || food.count === 0" @click="addFirst">加入购物车</div>
        </transition>
      </div>
      </div>
    <split></split>
    <div class="info" v-if="food.info">
      <h1 class="title">商品介绍</h1>
      <p class="text">{{food.info}}</p>
    </div>
    <split v-if="food.info"></split>
    <div class="rating">
      <h1 class="title">商品评价</h1>
      <ratingSelect :ratings-data="ratingsData"></ratingSelect>
    </div>
    </div>
    <div class="back" @click.stop.prevent="hide($event)">
        <i class="icon-arrow_lift"></i>
    </div>
</div>
</transition>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import bus from '@/common/js/Bus'
import split from '@/components/split/split'
import ratingSelect from '@/components/rating_select/ratingSelect'
import Const from '@/common/js/const'
let ratingType = Const.ratingType

export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      selectedType: ratingType.ALL,
      onlyContent: true,
      desc: {}
    }
  },
  components: {
    cartcontrol,
    split,
    ratingSelect
  },
  computed: {
    ratingsData () {
      return {
        selectedType: this.selectedType,
        onlyContent: this.onlyContent,
        desc: this.desc,
        ratings: this.food
      }
    }
  },
  methods: {
    _initialScroll () {
      if (!this.detailScroll) {
        this.detailScroll = new BScroll(this.$refs.foodDetailWrapper, {
          probeType: 3,
          click: true
        })
      } else {
        this.detailScroll.refresh()
      }
    },
    hide (event) {
      console.log(event)
      this.showFlag = false
    },
    show () {
      this.showFlag = true
      this.selectedType = ratingType.ALL
      this.onlyContent = true
      this.desc = {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
      this.$nextTick(() => {
      this._initialScroll()
    })
    },
    addFirst (event) {
      this.$refs.cartControl.addFirst()
    }
  }
  
}
</script>
<style rel="stylesheet/stylus" lang="stylus">
.food-detail
  position fixed
  left 0
  top 0
  width 100%
  bottom 48px
  z-index 10
  background-color #fff
  transition all .5s ease
  transform translateX(0)
  opacity 1
  .back
    position fixed
    left 10
    top 0
    .icon-arrow_lift
      display block
      padding 12px
      font-weight 700
      color rgba(200,200,200,.6)
      &:hover
        color rgba(230,230,230,1)
  .image-header
    position relative
    width 100%
    height 0
    padding-top 100%
    img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
  .content
    position relative
    width 100%
    padding 18px
    box-sizing border-box
    .title
      font-size 14px
      line-height 14px
      font-weight 700
      color rgb(7,17,27)
      margin-bottom 8px
    .detail
      font-size 0
      margin-bottom 18px
      height 10px
      span
        font-size 10px
        line-height 10px
        color rgb(147,153,159)
        &.rating
          padding-left 12px
          font-size 0
    .price
        position relative
        .now
          font-size 14px
          font-weight 700
          rgb(240,20,20)
          line-height 24px
        .old
          line-height 24px
          font-weight 700
          color rgb(147,153,159)          
          font-size 10px
          text-decoration line-through      
          margin-left 12px
    .control-wrapper
      display inline-block
      position absolute
      right 12px
      bottom 12px
      width 86px
      height 36px
      text-align center
      box-sizing border-box
      .into-cart
        display inline-block
        position absolute
        width 74px
        height 24px
        line-height 24px
        left 6px
        top 6px
        text-align center
        border-radius 12px
        font-size 10px
        color #fff
        background-color rgb(0,160,220)  
        transition all .3s ease
  .info
    position relative
    display inline-block
    padding 18px
    box-sizing border-box
    width 100%
    .title
      font-size 14px
      font-weight 700
      color rgb(7,17,27)
      line-height 14px
      margin-bottom 8px
    .text
      font-size 12px
      font-weight 200
      color rgb(77,85,93)
      line-height 24px
      padding 0 8px
  .rating
    .title
      padding 18px
      padding-bottom 0
      box-sizing border-box
      font-size 14px
      font-weight 700
      color rgb(7,17,27)
      line-height 14px

.move-enter, .move-leave-to
  opacity 0
  transform translateX(100%)
.collapse-enter, .collapse-leave-to
  transform scaleX(0)
  opacity 0
  transform-origin 90% 50%
</style>

