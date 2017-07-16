<template>
<div class="goods">
<div class="menu-wrapper">
    <ul v-if="goods">
        <li v-for="(item, index) in goods" :key="index" class="menu-item">
            <span class="text border-1px"><icon :size="3" :type="iconMap[item.type]" v-if="item.type>0"></icon>
            {{item.name}}</span>
        </li>
    </ul>
</div>
<div class="foods-wrapper">
    <ul>
        <li class="food-list" v-for="(item, index) in goods" :key="index">
            <ul>
                <li v-for="(food, i) in item.foods" :key="i" class="food-item">
                    <food :foodData="food"></food>
                </li>
            </ul>
        </li>
    </ul>
</div>
</div>

</template>
 <script type="text/ecmascript-6">
 import Const from '@/common/js/const'
 import icon from '@/components/icon/icon'
 import food from '@/components/food-item/food'
 
export default {
  props: {
      seller: {
          type: Object
      }
  },
  data () {
      return {
          goods: [],
          iconMap: Const.ICON_MAP
      }
  },
  created () {
      this.$http.get('/api/goods').then(
          rep => {
            let repData = rep.body
            if (repData.errno === Const.ERR_OK) {
                this.goods = repData.data
            }
          },
          rep => {

          }
      )
  },
  components: {
      icon,
      food
  }
}
</script>
<style rel="stylesheet/stylus" lang="stylus">
@import '../../common/stylus/mixin.styl'
.goods
    position absolute
    display flex
    top 174px
    left 0
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
        flex 0 0 80px
        width 80px
        background-color #f3f5f7
        .menu-item
            display table
            font-size 0
            height 54px
            width 56px
            margin auto
            line-height 14px
            .text
                display inline-block
                display table-cell
                text-align center
                width 56px
                vertical-align middle
                font-size 12px
                color rgb(7,17,27)
                font-weight 200
                border-1px(rgba(7,17,27,0.1))
    .foods-wrapper
        flex 1

</style>

