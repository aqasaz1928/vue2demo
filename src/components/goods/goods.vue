<template>
<div class="goods">
<div class="menu-wrapper" ref="menuWrapper">
    <ul v-if="goods">
        <li v-for="(item, index) in goods" :key="index" class="menu-item" :class="{current: index === currentIndex}"
              @click="selectMenu(index, $event)">
            <span class="text border-1px"><icon :size="3" :type="iconMap[item.type]" v-if="item.type>0"></icon>
            {{item.name}}</span>
        </li>
    </ul>
</div>
<div class="foods-wrapper" ref="foodWrapper">
    <ul>
        <li class="food-list food-list-hook" v-for="(item, index) in goods" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
                <li v-for="(food, i) in item.foods" :key="i" class="food-item border-1px"
                    @click="selectFood(food, $event)">
                    <food :foodData="food"></food>
                </li>
            </ul>
        </li>
    </ul>
</div>
<foodDetail :food="selectedFood" ref="foodDetail"></foodDetail>
<shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :selected-foods="selectedFoods"></shopcart>
</div>

</template>
 <script type="text/ecmascript-6">
 import Const from '@/common/js/const'
 import icon from '@/components/icon/icon'
 import food from '@/components/food/food'
 import BScroll from 'better-scroll'
 import shopcart from '@/components/shopcart/shopcart'
 import foodDetail from '@/components/food_detail/foodDetail'

export default {
  props: {
      seller: {
          type: Object
      }
  },
  data () {
      return {
          goods: [],
          iconMap: Const.ICON_MAP,
          foodListHeight: [0],
          scrollY: 0,
          selectedFood: {}
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
                    this._calculateHeight()
                })
            }
          },
          rep => {

          }
      )
  },
  components: {
      icon,
      food,
      shopcart,
      foodDetail
  },
  computed: {
    currentIndex () {
        for (let i = 0; i < this.foodListHeight.length; i++) {
            if (!this.foodListHeight[i + 1] ||
             this.scrollY + 10 >= this.foodListHeight[i] && 
             this.scrollY + 10 < this.foodListHeight[i + 1]) {
                return i
            }
        }
        return 0
    },
    selectedFoods () {
        let foods = []
        this.goods.forEach(foodList => {
            foodList.foods.forEach(food => {
                if (food.count) {
                    foods.push(food)
                }
            })
        })
        return foods
    }
  },
  methods: {
      _initScroll () {
          this.menuScroll = new BScroll(this.$refs.menuWrapper, {})
          this.foodScroll = new BScroll(this.$refs.foodWrapper, {
              probeType: 3,
              click: true
          })
          this.foodScroll.on('scroll', (pos) => {
              this.scrollY = Math.abs(Math.round(pos.y))
          })
      },
      _calculateHeight () {
          let height = 0
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
        for (let i = 0; i < foodList.length; i++) {
            height += foodList[i].clientHeight
            this.foodListHeight.push(height)
        }
      },
      selectMenu (index, event) {
          let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
          let el = foodList[index]
          this.foodScroll.scrollToElement(el, 500)
      },
      addHandler (event) {
        alert(event.target)
      },
      selectFood (food, event) {
        if (event.isTrusted) {
            return
        }
        this.selectedFood = food
        this.$refs.foodDetail.show()
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
            position relative
            height 54px
            width 56px
            line-height 14px
            padding 0 12px
            &.current 
                position relative
                background-color #fff
                margin-top -1px
                .text
                    font-weight 700
                    border-none()
            .text
                display table-cell
                text-align center
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

