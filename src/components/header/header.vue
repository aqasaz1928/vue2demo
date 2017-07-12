<template>
<div class="header">
    <div class="content-wrapper">
        <div class="avatar">
            <img :src="seller.avatar" width="64px" height="64px">
        </div>
        <div class="content">
            <div class="title">
                <span class="brand"></span>
                <span class="name">{{ seller.name }}</span>
            </div>
            <div class="description">
                <span class="description">{{seller.description}}/</span>
                <span class="deliverytime">{{seller.deliveryTime}}分钟送达</span>
            </div>
            <div class="supports" v-for="(support,type,index) in seller.supports" :key="index">
                <div class="support-show" v-if="type === 0">
                    <span class="icon" :class="classMap[type]"></span>
                    <span class="text">{{support.description}}</span>
                </div>
            </div>
        </div>
        <div class="supports-count" v-if="seller.supports" @click="showDetail">
            <span class="count">{{seller.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
        <img :src="seller.avatar" width="100%" >
    </div>
    <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
            <div class="detail-main"></div>
        </div>
        <div class="detail-close">
            <i class="icon-close"></i>
        </div>
    </div>
</div>
  
</template>
<script type="text/ecmascript-6">
export default {
  props: {
      seller: {
          type: Object
      }
  },
  data () {
    return {
        detailShow: false
    }
  },
  methods: {
    showDetail () {
        this.detailShow = true;
    }
  },
  created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>
<style rel="stylesheet/stylus" lang="stylus">
@import '../../common/stylus/mixin.styl'
    .header
        position relative 
        color #fff
        background-color rgba(7,17,27,0.5)
        .content-wrapper
            position relative
            padding 24px 12px 18px 24px
            font-size 0
            .avatar, .content
                display inline-block
                vertical-align middle
            .avatar
                img
                    border-radius 2px
            .content
                font-size 14px
                margin-left 16px
                .title
                    margin 2px 0 8px 0
                    .brand
                        display inline-block
                        width 30px
                        height 18px
                        bg-image('./img/brand')
                        background-size 100%
                        background-repeat no-repeat
                        vertical-align top
                    .name
                        margin-left 6px
                        font-size 16px
                        font-weight bold
                        line-height 18px
                .description
                    font-size 12px
                    line-height 12px
                    margin-bottom 10px
                .supports
                    font-size 0
                    .icon  
                        display inline-block
                        width 12px
                        height 12px
                        margin-right 4px
                        background-size 12px
                        background-repeat no-repeat
                        vertical-align top
                        &.decrease
                            bg-image('./img/decrease_1')
                        &.discount
                            bg-image('./img/discount_1')
                        &.special
                            bg-image('./img/special_1')
                        &.guarantee
                            bg-image('./img/guarantee_1')
                        &.invoice
                            bg-image('./img/invoice_1')
                    .text
                        font-size 10px
                        line-height 12px
            
            .supports-count
                position absolute
                right 12px
                bottom 14px
                padding 0 8px
                height 24px
                line-height 24px
                border-radius 12px
                background-color rgba(0,0,0,0.2)
                text-align center
                .count
                    font-size 10px
                i
                    margin-left 2px
                    font-size 10px
                    line-height 24px
        .bulletin-wrapper
            position relative
            height 28px
            line-height 28px
            padding 0 22px 0 12px
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
            background-color rgba(7,17,27,0.2)
            .bulletin-title
                display inline-block
                width 22px
                height 12px
                background-size 100%
                background-repeat no-repeat
                bg-image('./img/bulletin')
                vertical-align middle
            .bulletin-text
                font-size 10px
                padding-left 4px
                vertical-align baseline
             i
                position absolute
                right 12px
                top 9px
                margin-left 2px
                font-size 10px
        .background
            position absolute
            display inline-block
            width 100%
            height 100%
            left 0
            top 0
            z-index -1
            overflow hidden
            filter blur(10px)
        .detail
            position fixed
            z-index 99
            top 0
            left 0
            width 100%
            height 100%
            overflow auto
            background rgba(7,17,27,0.8)
            .detail-wrapper
                min-height 100%
                .detail-main
                    margin-top 64px
                    padding-bottom 64px
            .detail-close
                position relative
                width 32px
                height 32px
                margin -64px auto
                clear both
                font-size 32px
</style>

