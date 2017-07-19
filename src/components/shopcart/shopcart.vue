<template>
<div class="shopcart">
    <div class="content">
        <div class="content-left">
            <div class="logo-wrapper">
                <div class="logo" :class="{highlight: totalCount > 0}">
                    <i class="icon-shopping_cart"></i>
                </div>
            </div>
            <div class="price" :class="{highlight: totalPrice > 0}">￥{{totalPrice}}
            </div>
            <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="content-right">
            <div class="pay" :class="{enough: totalPrice > minPrice}">
                {{payDesc}}
            </div>
        </div>
    </div>
</div>
  
</template>
<script type="text/ecmascript-6">
export default {
  props: {
      deliveryPrice: {
          type: Number
      },
      minPrice: {
          type: Number
      },
      selectedFoods: {
          type: Array,
          default () {
              return [
                  {
                      price: 10,
                      count: 1
                  }
              ]
          }
      }
  },
  computed: {
      totalPrice () {
          let total = 0
          this.selectedFoods.forEach(food => {
            total += food.price * food.count
          })
          return total
      },
      totalCount () {
          let count = 0
          this.selectedFoods.forEach(food => {
              count += food.count
          })
          return count
      },
      payDesc () {
          if (this.totalCount > 0 && this.totalPrice < this.minPrice) {
            return `还需${this.minPrice - this.totalPrice}元起送`
          } else if (this.totalPrice >= this.minPrice) {
            return '去结算'
          }
          return '￥' + this.minPrice + '起送'
      }
  }
}
</script>
<style rel="stylesheet/stylus" lang="stylus">
    .shopcart
        position fixed
        left 0
        bottom 0
        z-index 50
        width 100%
        height 48px
        background-color #141d27
        .content
            display flex
            background-color #141d27
            .content-left
                flex 1
                font-size 0
                .logo-wrapper
                    display inline-block
                    position relative
                    top -10px
                    margin 0 12px
                    padding 6px
                    width 56px
                    height 56px
                    border-radius 56px
                    box-sizing border-box
                    background-color #141d27
                    .logo
                        display inline-block
                        width 44px
                        height 44px
                        border-radius 50%
                        background-color rgba(255,255,255,0.2)
                        box-sizing border-box
                        padding 10px
                        .icon-shopping_cart
                            font-size 24px
                            color rgba(255,255,255,.4)
                            line-height 24px
                        &.highlight
                            background-color rgb(0,160,220)
                            .icon-shopping_cart
                                color #fff
                .price,.desc
                    display inline-block
                    vertical-align top
                    margin 12px 0
                    font-size 16px
                    font-weight 700
                    color rgba(255,255,255,.4)
                    line-height 24px
                .price
                    border-right 1px solid rgba(255,255,255,0.1)
                    padding-right 12px
                    &.highlight
                        color #fff
                .desc
                    margin-left 12px
                    font-weight 200
                .num
                    position absolute
                    display inline-block
                    left 44px
                    top -10px
                    width 24px
                    height 16px
                    border-radius 12px
                    font-size 9px
                    font-weight 700
                    line-height 16px
                    text-align center
                    color #fff
                    background-color rgb(240,20,20)
                    box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
            .content-right
                flex 0 0 105px
                -webkit-animation-delay 105px
                background-color rgba(255,255,255,0.2)
                .pay
                    font-size 12px
                    line-height 48px
                    text-align center
                    font-weight 700
                    color rgba(255,255,255,0.4)
                    &.enough
                        background-color #00b43c
                        color #fff

</style>

