<template>
<transition name="move">
  <div class="food-detail" v-show="showFlag">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image"/>
        <div class="back" @click="hide($event)">
        <i class="icon-arrow_lift"></i>
        </div>
      </div>
    </div>
</div>
</transition>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  created () {
    this.foodObj = this.food
  },
  methods: {
    hide (event) {
      console.log(event)
      this.showFlag = false
    },
    show () {
      this.showFlag = true
    }
  }
  
}
</script>
<style rel="stylesheet/stylus" lang="stylus">
.food-detail
  position fixed
  left 0
  top 0
  width 100%
  bottom 48px
  z-index 10
  background-color #fff
  transition all .5s ease
  transform translateX(0)
  opacity 1
  .image-header
    position relative
    width 100%
    height 0
    padding-top 100%
    img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
    .back
      position absolute
      left 10
      top 0
      .icon-arrow_lift
        display block
        padding 12px
        font-weight 700
        color rgba(200,200,200,.6)
        &:hover
          color rgba(230,230,230,1)
      
.move-enter, .move-leave-to
  opacity 0
  transform translateX(100%)
</style>

