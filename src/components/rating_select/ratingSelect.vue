<template>
<div class="rating-select">
    <div class="rating-type border-1px">
        <span class="all">{{ratingsData.desc.all}}</span>
        <span class="positive">{{ratingsData.desc.positive}}</span>
        <span class="negative">{{ratingsData.desc.negative}}</span>
    </div>
    <div class="switch">
        <span class="switch-icon icon-check_circle"></span>
        <span class="text">只看有内容的评价</span>
    </div>
</div>
  
</template>
 <script type="text/ecmascript-6">
 import Const from '@/common/js/const'
let ratingType = Const.ratingType

export default {
    props: {
        ratingsData: {
            type: Object,
            default () {
                return {}
            }
        }
  }
}
</script>
<style rel="stylesheet/stylus" lang="stylus">
@import '../../common/stylus/mixin.styl'
.rating-select
    .rating-type
        position relative
        margin 0 18px
        padding 18px 0
        font-size 0
        border-1px(rgba(7,17,27,0.1))
        span
            display inline-block
            height 32px
            box-sizing border-box
            padding 8px 12px
            margin-right 8px
            border-radius 2px
            font-size 12px
            &:last
                margin-right 0
            &.all
                background-color rgb(0,160,220)
                color #fff
            &.positive
                background-color rgba(0,160,220,0.2)
                color rgb(77,85,93)
            &.negative
                background-color rgba(77,85,93,0.2)
                color rgb(77,85,93)
                

</style>

