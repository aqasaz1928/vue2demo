<template>
<span class="icon" :class="[sizeClass ,typeClass]">
    
</span>
  
</template>
<script type="text/ecmascript-6">
export default {
    props: {
        size: {
            type: Number
        },
        type: {
            type: String
        }
    },
    computed: {
        sizeClass () {
            return 'icon-' + this.size
        },
        typeClass () {
            return 'icon-' + this.type
        }
    }
  
}
</script>
<style rel="stylesheet/stylus" lang="stylus">
@import '../../common/stylus/mixin.styl'
    .icon
        display inline-block
        background-repeat no-repeat
        vertical-align top
        background-size 100%
        &.icon-1
            width 12px
            height 12px
            &.icon-decrease
                bg-image('./img/decrease_1')
            &.icon-discount
                bg-image('./img/discount_1')
            &.icon-special
                bg-image('./img/special_1')
            &.icon-guarantee
                bg-image('./img/guarantee_1')
            &.icon-invoice
                bg-image('./img/invoice_1')
        &.icon-2
            width 16px
            height 16px
            &.icon-decrease
                bg-image('./img/decrease_2')
            &.icon-discount
                bg-image('./img/discount_2')
            &.icon-special
                bg-image('./img/special_2')
            &.icon-guarantee
                bg-image('./img/guarantee_2')
            &.icon-invoice
                bg-image('./img/invoice_2')
        &.icon-3
            width 12px
            height 12px
            &.icon-decrease
                bg-image('./img/decrease_3')
            &.icon-discount
                bg-image('./img/discount_3')
            &.icon-special
                bg-image('./img/special_3')
            &.icon-guarantee
                bg-image('./img/guarantee_3')
            &.icon-invoice
                bg-image('./img/invoice_3')
        &.icon-4
            width 16px
            height 16px
            &.icon-decrease
                bg-image('./img/decrease_4')
            &.icon-discount
                bg-image('./img/discount_4')
            &.icon-special
                bg-image('./img/special_4')
            &.icon-guarantee
                bg-image('./img/guarantee_4')
            &.icon-invoice
                bg-image('./img/invoice_4')
</style>

