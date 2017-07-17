<template>
<div class="goods">
<div class="menu-wrapper" ref="menuWrapper">
    <ul v-if="goods">
        <li v-for="(item, index) in goods" :key="index" class="menu-item">
            <span class="text border-1px"><icon :size="3" :type="iconMap[item.type]" v-if="item.type>0"></icon>
            {{item.name}}</span>
        </li>
    </ul>
</div>
<div class="foods-wrapper" ref="foodWrapper">
    <ul>
        <li class="food-list" v-for="(item, index) in goods" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
                <li v-for="(food, i) in item.foods" :key="i" class="food-item border-1px">
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
 import BScroll from 'better-scroll'

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
                this.$nextTick(() => {
                    this._initScroll()
                })
            }
          },
          rep => {

          }
      )
  },
  components: {
      icon,
      food
  },
  methods: {
      _initScroll () {
          this.menuScroll = new BScroll(this.$refs.menuWrapper, {})
          this.foodScroll = new BScroll(this.$refs.foodWrapper, {})
      }
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
        .food-list
            .title
                height 26px
                padding-left 14px
                font-size 12px
                line-height 26px
                color rgb(147,153,159)
                background-color #f3f5f7
                border-left 2px solid #d9dde1
            .food-item
                padding 18px 0
                margin 0 18px
                border-1px(rgba(7,17,27,.1))
                &:last-child
                    border-none()

</style>

