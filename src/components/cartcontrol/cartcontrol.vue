<template>
<div class="cartcontrol">
    <transition name="move">
    <div class="cart-decrease" v-show="food.count > 0"
          @click="decreaseFromCart">
            <span class="inner  icon-remove_circle_outline"></span>
         </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle"  @click="addToCart" @touchend="addToCart"></div>
</div>
  
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
import bus from '@/common/js/Bus'

export default {
  props: {
      food: {
          type: Object,
          default () {
              return {
                  count: 0
              }
          }
      }
  },
  created () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 0)
      }
  },
  methods: {
      addToCart (event) {
          if (event._constructed) {
            return
          }
          let count = this.food.count || 0
          this.food.count = count + 1
          bus.$emit('cart.add', event.target)
      },
      decreaseFromCart () {
          if (this.food.count) {
            this.food.count--
          }
      }
  }
}
</script>
<style rel="stylesheet/stylus" lang="stylus">
.cartcontrol
    font-size 0
    .cart-decrease
        display inline-block
        padding 6px
        &.move-enter,&.move-leave-to
            opacity 0
            transform translate3d(24px,0,0) rotate(180deg)
        &.move-enter-active, &.move-leave-active
            transition all 0.3s linear
        .inner
            line-height 24px
            font-size 24px
            color rgb(0,160,220)
    .cart-increase
        display inline-block
        padding 6px
        line-height 24px
        font-size 24px
        color rgb(0,160,220)
    .cart-count
        display inline-block
        line-height 36px
        text-align center
        width 12px
        font-size 10px
        color rgb(147,153,159)      
        vertical-align top


</style>

