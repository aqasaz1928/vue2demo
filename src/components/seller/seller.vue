<template>
    <div class="seller" ref="sellerWrapper">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc border-1px">
                    <star :size="36" :score="seller.score"></star>
                    <span class="count">({{seller.ratingCount}})</span>
                    <span class="count">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite" @click="toggleFavorite" @touchend="toggleFavorite">
                    <span class="icon-favorite" :class="{'active': isfavorite}"></span>
                    <span class="text">{{favoriteStatus}}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper border-1px">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item border-1px" v-for="(item, index) in seller.supports" :key="index">
                        <icon :size="4" :type="classMap[item.type]"></icon>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picListHook">
                        <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index">
                            <img :src="pic" width="120px" height="90px">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="title border-1px">商家信息</h1>
                <ul>
                    <li class="info-item border-1px" v-for="(info, index) in seller.infos" :key="index">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import star from '@/components/star/star'
import split from '@/components/split/split'
import icon from '@/components/icon/icon'
import Const from '@/common/js/const'
import BScroll from 'better-scroll'
import {saveToLocal, loadFromLocal} from '@/common/js/store'

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data () {
        return {
            classMap: Const.ICON_MAP,
            isfavorite: false
        }
    },
    components: {
        star,
        split,
        icon
    },
    mounted () {
        this.$nextTick(() => {
            this._initScroll()
        })
    },
    created () {
        // console.log('a')
    },
    computed: {
        favoriteStatus () {
            return this.isfavorite ? '已收藏' : '收藏'
        }
    },
    methods: {
        _initScroll () {
            this.isfavorite = (() => {
                return loadFromLocal(this.seller.id, 'isfavorite', false)
            })()
            if (!this.sellerScroll) {
                 this.sellerScroll = new BScroll(this.$refs.sellerWrapper, {
                    click: true
                })
            } else {
                this.sellerScroll.refresh()
            }
            if (this.picScroll) {
                this.picScroll.refresh()
                return
            }
            let pics = this.seller.pics
            if (pics && pics.length > 0) {
                let picWidth = 120
                let margin = 6
                let width = (picWidth + margin) * pics.length
                this.$refs.picListHook.style.width = width
                this.$nextTick(() => {
                    this.picScroll = new BScroll(this.$refs.picWrapper, {
                        scrollX: true,
                        eventPassThrough: 'vertical'
                    })
                })
            }
        },
        toggleFavorite (event) {
            if (event.isTrusted) {
                this.isfavorite = !this.isfavorite
                saveToLocal(this.seller.id, 'isfavorite', this.isfavorite)
            }
        }
    },
    watch: {
        seller (newSeller) {
            this.$nextTick(() => {
                this._initScroll()
            })
        }
    }

}
</script>
<style rel="stylesheet/stylus" lang="stylus">
@import '../../common/stylus/mixin.styl'
.seller
    position absolute
    left 0
    top 174px
    bottom 0
    width 100%
    overflow hidden     
    .overview
        position relative
        padding 18px
        .title
            font-size 14px
            line-height 14px
            color rgb(7,17,27)
            margin-bottom 8px
        .desc
            position relative
            font-size 0
            padding-bottom 18px
            border-1px(rgba(7,17,27,0.1))
            .star
                display inline-block
                margin-right 8px
            .count
                display inline-block
                font-size 10px
                color rgb(77,85,93)
                line-height 18px
                vertical-align top
                margin-right 12px
        .remark
            display flex
            padding-top 18px
            position relative
            .block
                flex 1
                text-align center
                border-right 1px solid rgba(7,17,27,0.1)
                &:last-child
                    border none
                h2
                    font-size 10px
                    line-height 10px
                    color rgb(147,153,159)
                    margin-bottom 4px
                .content
                    font-size 10px
                    font-weight 200
                    color rgb(7,17,27)
                    .stress
                        font-size 24px
                        line-height 24px
        .favorite
            position absolute
            right 18px
            top 18px
            width 36px
            font-size 0
            span
                display inline-block
                text-align center
                width 36px
                &.icon-favorite
                    font-size 24px
                    color #d4d6d9
                    line-height 24px
                    margin-bottom 4px
                    &.active
                        color rgb(240,20,20)
            .text 
                font-size 10px
                line-height 10px
                color rgb(77,85,93)
    .bulletin
        position relative
        padding 18px
        .title
            font-size 14px
            line-height 14px
            color rgb(7,17,27)
            margin-bottom 8px
        .content-wrapper
            padding 0 12px
            padding-bottom 16px
            border-1px(rgba(7,17,27,0.1))
            .content
                font-size 12px
                font-weight 200
                line-height 24px
                color rgb(240,20,20)
        .supports
            .support-item
                padding 16px 12px
                font-size 0
                border-1px(rgba(7,17,27,.1))
                &:last-child
                    &::after
                        display none
                .text
                    font-size 12px
                    font-weight 200
                    color rgb(7,17,27)
                    line-height 16px
                    margin-left 6px
    .pics
        padding 18px 0 18px 18px
        .title
            font-size 14px
            line-height 14px
            color rgb(7,17,27)
            margin-bottom 12px
        .pic-wrapper
            width 100%
            height 105%
            overflow hidden
            .pic-list
                display inline-block
                white-space nowrap
                .pic-item
                    display inline-block
                    margin-right 6px
                    width 120px
                    height 90px
    .info
        padding 18px
        .title
            font-size 14px
            line-height 14px
            color rgb(7,17,27)
            padding-bottom 12px
            border-1px(rgba(7,17,27,0.1))
        .info-item
            padding 16px 12px
            font-size 12px
            font-weight 200
            color rgb(7,17,27)
            line-height 16px
            border-1px(rgba(7,17,27,0.1))
            &:last-child
                border-1px(transparent)
</style>

