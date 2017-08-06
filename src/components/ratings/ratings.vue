<template>
<div class="ratings" ref="ratingsWrapper">
    <div class="ratings-content">
        <div class="overview">
            <div class="overview-left">
                <h1 class="score">{{seller.score}}</h1>
                <div class="title">综合评分</div>
                <div class="rank">高于周边商家{{seller.rankRate}}%</div>
            </div>
            <div class="overview-right">
                <div class="rating-subject">
                    <span class="title">综合评分</span>
                    <div class="star-wrapper">
                    <star  :size="36" :score="seller.score"></star>
                    </div>
                    <span class="score">{{seller.score}}</span>
                </div>
                <div class="rating-subject">
                    <span class="title">服务态度</span>
                    <div class="star-wrapper">
                    <star :size="36" :score="seller.serviceScore"></star>
                    </div>
                    <span class="score">{{seller.serviceScore}}</span>
                </div>
                <div class="rating-subject">
                    <span class="title">送达时间</span>
                    <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
                </div>
            </div>
        </div>
        <split></split>
        <ratingSelect :ratings="ratings" :selected-type="selectedType" :desc="desc" :only-content="onlyContent"></ratingSelect>
        <div class="rating-wrapper">
            <ul>
                <li class="rating-item border-1px" v-for="(rating, index) in ratings" :key="index" v-show="needShow(rating.rateType, rating.text)">
                    <div class="avatar">
                        <img :src="rating.avatar">
                    </div>
                    <div class="content">
                        <h1 class="name">{{rating.username}}</h1>
                        <div class="score-wrapper">
                            <div class="star-wrapper">
                            <star :size="24" :score="rating.score"></star>
                            </div>
                            <span class="delivery-time">{{rating.deliveryTime}}分钟送达</span>
                        </div>
                        <p class="text" v-if="rating.text && rating.text.length > 0">{{rating.text}}</p>
                        <div class="recommend">
                            <span :class="[rating.rateType === 0 ? 'icon-thumb_up':'icon-thumb_down']" class="recommend-icon"></span>
                            <span v-for="(recommendFood, index) in rating.recommend" :key="index" class="recommed-food">{{recommendFood}}</span>
                        </div>
                        <div class="time">{{rating.rateTime | formatDate}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
  
</template>
<script type="text/ecmascript-6">
import split from '@/components/split/split' 
import star from '@/components/star/star'
import ratingSelect from '@/components/rating_select/ratingSelect'
import Const from '@/common/js/const'
import bus from '@/common/js/Bus'
import BScroll from 'better-scroll'
import DateUtil from '@/common/js/dateUtil'
let ratingType = Const.ratingType

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data () {
        return {
            selectedType: ratingType.ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '满意',
                negative: '不满意'
            },
            ratings: []
    }
  },
  methods: {
     _changeRatingType (type) {
      this.selectedType = ratingType[type]
      this.$nextTick(() => {
        this.ratingScroll.refresh()
      })
    },
    _toggleContent () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.ratingScroll.refresh()
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
  },
  filters: {
    formatDate (dateStr) {
          return DateUtil.Format(new Date(dateStr), 'yyyy-MM-dd hh:mm')
      }
  },
    components: {
        split,
        star,
        ratingSelect
    },
    created () {
        bus.$on('ratingType.select', this._changeRatingType)
        bus.$on('content.toggle', this._toggleContent)
        
        this.$http.get('/api/ratings').then((resp) => {
            resp = resp.body
            if (resp.errno === Const.ERR_OK) {
                this.ratings = resp.data
                this.$nextTick(() => {
                    if (!this.ratingScroll) {
                        this.ratingScroll = new BScroll(this.$refs.ratingsWrapper, {
                            click: true
                        })
                    }
                })
            }
        }, 
        (resp) => {
        })
    }
}
</script>
<style rel="stylesheet/stylus" lang="stylus">
@import '../../common/stylus/mixin.styl'
.ratings
    position absolute
    left 0
    top 174px
    bottom 0
    width 100%
    overflow hidden
    .overview
        display flex
        padding 18px 0
        .overview-left
            flex 0 0 137px
            width 137px
            border-right 1px solid rgba(7,17,27,0.1)
            text-align center
            padding 4px 0 6px 0
            @media only screen and (max-width: 320px)
                flex 0 0 120px
                width 120px
            .score
                font-size 24px
                line-height 28px
                color rgb(255, 153, 0)
                margin-bottom 4px
            .title
                font-size 12px
                line-height 12px
                color rgb(7,17,27)
                margin-bottom 8px
            .rank
                font-size 10px
                line-height 10px
                color rgb(147,153,159)
        .overview-right
            flex 1
            padding 6px 0 6px 24px
            text-align center
            font-size 0
            @media only screen and (max-width: 320px)
                padding-left 6px            
            .rating-subject      
                font-size 0
                margin-bottom 8px
                text-align left
                &:last
                    margin-bottom 0
                .title
                    display inline-block
                    font-size 12px
                    color rgb(7,17,27)
                    line-height 18px
                .star-wrapper
                    display inline-block
                    vertical-align top
                    margin 0 6px
                    height 18px
                .score
                    display inline-block
                    font-size 12px
                    line-height 18px
                    color rgb(255,153,0)
                .delivery-time
                    display inline-block
                    font-size 12px
                    line-height 18px
                    color rgb(147,153,159)
                    margin-left 6px
    .rating-wrapper
        padding 0 18px
        .rating-item
            display flex
            padding 18px 0
            border-1px(rgba(7,17,27,0.1))
            .avatar
                flex 0 0 40px
                width 40px
                img
                    width 28px
                    height 28px
                    border-radius 50%
            .content
                flex 1
                .name
                    font-size 10px
                    line-height 12px
                    color rgb(7,17,27)
                    margin-bottom 4px
                .score-wrapper
                    position relative
                    height 12px
                    font-size 0
                    margin-bottom 6px
                    .star-wrapper
                        display inline-block
                        height 12px
                        margin-right 6px
                    .delivery-time
                        display inline-block
                        font-size 10px
                        font-weight 200
                        line-height 12px
                        color rgb(147,153,159)
                   
                .text
                    font-size 12px
                    color rgb(7,17,27)
                    line-height 18px
                    margin-bottom 8px
                .recommend
                    font-size 0
                    position relative
                    .recommend-icon
                        font-size 12px
                        line-height 16px
                        &.icon-thumb_up
                            color rgb(0,160,220)
                        &.icon-thumb_down
                            color rgb(183,187,191)
                    .recommed-food
                        display inline-block
                        margin 0 8px
                        padding 0 6px
                        color rgb(147,153,159)
                        font-size 9px
                        line-height 16px
                        border 1px solid rgba(7,17,27,0.1)
                        border-radius 1px
                        margin-bottom 8px


                .time
                    position absolute
                    right 0
                    top 18px
                    font-size 10px
                    font-weight 200
                    line-height 24px
                    color rgb(147,153,159)




                
            

</style>

