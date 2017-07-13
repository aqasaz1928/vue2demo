<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass,index) in itemClasses" :key="index" :class="itemClass" class="star-item">
    
        </span>
    </div>
</template>
 <script type="text/ecmascript-6">

const LENGTH = 5
const CLS_ON = 'on'
const CLS_OFF = 'off'
const CLS_HALF = 'half'
export default {
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    computed: {
        starType () {
            return 'star-' + this.size;
        },
        itemClasses () {
            let classesArr = [CLS_OFF, CLS_OFF, CLS_OFF, CLS_OFF, CLS_OFF]
            for (let i = 0; i < LENGTH; i++) {
                if (i < Math.floor(this.score)) {
                    classesArr[i] = CLS_ON
                } else if ((i + 0.5) <= this.score) {
                    classesArr[i] = CLS_HALF
                    break
                } else {
                    break
                }
            }
            return classesArr
        }
    }
}
</script>
<style rel="stylesheet/stylus" lang="stylus">
@import "../../common/stylus/mixin.styl"
.star
    font-size 0
    &.star-48
        .star-item
            width 20px
            height 20px
            margin-right 22px
            &.on
                bg-image('./img/star48_on')
            &.half
                bg-image('./img/star48_half')
            &.off
                bg-image('./img/star48_off')
    &.star-36
        .star-item
            width 15px
            height 15px
            margin-right 6px
            &.on
                bg-image('./img/star36_on')
            &.half
                bg-image('./img/star36_half')
            &.off
                bg-image('./img/star36_off')
    &.star-24
        .star-item
            width 10px
            height 10px
            margin-right 3px
            &.on
                bg-image('./img/star24_on')
            &.half
                bg-image('./img/star24_half')
            &.off
                bg-image('./img/star24_off')
    .star-item
        display inline-block
        background-repeat no-repeat
        background-size 100%
        &:last-child
            margin-right 0
</style>

