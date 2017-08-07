<template>
    <div class="seller">
        <div class="overview">
            <h1 class="title">{{seller.name}}</h1>
            <div class="desc">
                <star :size="36" :score="seller.score"></star>
                <span class="count">({{seller.ratingCount}})</span>
                <span class="count">{{seller.sellCount}}</span>
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
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import star from '@/components/star/star'
import split from '@/components/split/split'

export default {
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        star,
        split
    }

}
</script>
<style rel="stylesheet/stylus" lang="stylus">
.seller
    position absolute
    top 174px
    left 0
    bottom 46px
    width 100%
    overflow hidden
    .overview
        padding 18px
        .title
            font-size 14px
            line-height 14px
            color rgb(7,17,27)
        .desc
            position relative
            font-size 0
            .star
                display inline-block
            .count
                display inline-block
</style>

