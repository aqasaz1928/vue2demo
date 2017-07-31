<template>
<div class="rating-select">
    <div class="rating-type border-1px">
        <span class="block all" :class="{ active: selectedType === 2}"
        @click="select('ALL', $event)">{{desc.all}}
            <span class="count">{{ratings.length}}</span>
        </span>
        <span class="block positive" :class="{ active: selectedType === 1}"
        @click="select('POSITIVE', $event)">{{desc.positive}}
            <span class="count">{{positiveCount}}</span>
        </span>
        <span class="block negative" :class="{active: selectedType === 0}"
        @click="select('NEGATIVE', $event)">{{desc.negative}}
            <span class="count">{{negativeCount}}</span>
        </span>
    </div>
    <div class="switch" :class="{on: onlyContent}" @click="toggleContent">
        <span class="switch-icon icon-check_circle" ></span>
        <span class="text">只看有内容的评价</span>
    </div>
</div>
  
</template>
 <script type="text/ecmascript-6">
 import Const from '@/common/js/const'
 import bus from '@/common/js/Bus'
let ratingType = Const.ratingType

export default {
    props: {
        selectedType: {
            type: Number,
            default: 2
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        ratings: {
            type: Array,
            default () {
                return []
            }
        },
        desc: {
            type: Object,
            default () {
                return {}
            }
        }
   },
   methods: {
       select (type, event) {
           if (!event._constructed) {
                return
           }
            console.log(ratingType[type])
            this.selectedType = ratingType[type]
            bus.$emit('ratingType.select', this.selectedType)
       },
       toggleContent (event) {
           if (!event._constructed) {
               return
           }
           this.onlyContent = !this.onlyContent
           bus.$emit('content.toggle', this.onlyContent)
       }
   },
   computed: {
       positiveCount () {
           let count = 0
           if (!this.ratings) {
                return ''
           }
            this.ratings.forEach((rating) => {
                if (rating.rateType === 1) {
                    count += 1
                }
            })
            return count
       },
       negativeCount () {
           let count = 0
           if (!this.ratings) {
                return ''
           }
            this.ratings.forEach((rating) => {
                if (rating.rateType === 0) {
                    count += 1
                }
            })
            return count
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
        .block
            display inline-block
            height 32px
            box-sizing border-box
            padding 8px 12px
            margin-right 8px
            border-radius 1px
            font-size 12px
            line-height 16px
            color rgb(77,85,93)
            &.active
                color #fff
            &:last
                margin-right 0
            &.all, &.positive
                background-color rgba(0,160,220,0.2)
                &.active
                    background-color rgb(0,160,220)
            &.negative
                background-color rgba(77,85,93,0.2)
                &.active
                    background-color rgb(77,85,93)
            .count
                font-size 8px
                vertical-align top
                line-height 16px
    .switch
        padding 12px 18px
        font-size 0
        color rgb(147,153,159)
        border-bottom 1px solid rgba(7,17,27,0.1)
        &.on
            .switch-icon
                color #00c850 
        .switch-icon
            display inline-block
            font-size 24px
            line-height 24px
        .text
            display inline-block
            font-size 12px
            line-height 24px
            vertical-align top
            margin-left 4px

        
</style>

