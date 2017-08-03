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
      <ratingSelect :ratings="ratings" :selected-type="selectedType" :desc="desc" :only-content="onlyContent"></ratingSelect>
      <div class="rating-wrapper">
        <ul v-show="food.ratings && food.ratings.length">
          <li v-for="(rating, index) in food.ratings" class="rating-item border-1px" :key="index"
          v-show="needShow(rating.rateType, rating.text)">
            <div class="user">
              <span class="name">{{rating.username}}</span>
              <img class="avatar" width="12px" height="12px" :src="rating.avatar">
            </div>
            <div class="time">{{rating.rateTime | formatDate}}</div>
            <p class="text">
              <span :class="[rating.rateType === 0 ? 'icon-thumb_up':'icon-thumb_down']"></span>
              {{rating.text}}
            </p>
          </li>
        </ul>
        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
          暂无评价
        </div>
      </div>
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
import DateUtil from '@/common/js/dateUtil'
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
      desc: {},
      ratings: []
    }
  },
  components: {
    cartcontrol,
    split,
    ratingSelect
  },
  created () {
    bus.$on('ratingType.select', this._changeRatingType)
    bus.$on('content.toggle', this._toggleContent)
  },
  filters: {
    formatDate (dateStr) {
      let date = new Date(dateStr)
      return DateUtil.Format(date, 'yyyy-MM-dd hh:mm')
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
      this.showFlag = false
    },
    show () {
      this.showFlag = true
      this.selectedType = ratingType.ALL
      this.onlyContent = false
      this.desc = {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
      this.ratings = this.food.ratings
      this.$nextTick(() => {
      this._initialScroll()
    })
    },
    addFirst (event) {
      this.$refs.cartControl.addFirst()
    },
    _changeRatingType (type) {
      this.selectedType = ratingType[type]
      this.$nextTick(() => {
        this.detailScroll.refresh()
      })
    },
    _toggleContent () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.detailScroll.refresh()
      })
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectedType === ratingType.ALL) {
        return true
      } else {
        return type === this.selectedType
      }
    }
  }
  
}
</script>
<style rel="stylesheet/stylus" lang="stylus">
@import '../../common/stylus/mixin.styl'
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
    width 100%
    background-color rgba(7,17,27,0.1)
    .icon-arrow_lift
      display block
      padding 12px
      font-weight 700
      color rgba(150,150,150,.8)
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
    .rating-wrapper
      padding 0 18px
      .rating-item
        position relative
        padding 16px 0
        border-1px(rgba(7,17,27,0.1))
        .user
          position absolute
          right 0
          top 16px
          font-size 0
          line-height 12px
          .name
            display inline-block
            margin-right 6px
            font-size 10px
            color rgb(147,153,159)
            vertical-align top
          .avatar
            border-radius 50%
        .time
          font-size 10px
          color rgb(147,153,159)
          line-height 12px
          margin-bottom 6px
        .text
          line-height 16px
          font-size 12px
          color rgb(7,17,27)
          span
            line-height 16px
            margin-right 4px
            font-size 12px
            &.icon-thumb_up
              color rgb(0, 160, 220)
            &.icon-thumb_down
              color rgb(147,153,159)
      .no-rating
        padding 16px 0
        font-size 12px
        color rgb(147, 153, 159)



.move-enter, .move-leave-to
  opacity 0
  transform translateX(100%)
.collapse-enter, .collapse-leave-to
  transform scaleX(0)
  opacity 0
  transform-origin 90% 50%
</style>

