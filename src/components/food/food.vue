<template>
<div class="food">
    <div class="icon">
        <img :src="foodData.icon" width="57px" height="57px">
    </div>
    <div class="content">
        <h2 class="name">{{foodData.name}}</h2>
        <p class="desc" v-if="foodData.description">{{foodData.description}}</p>
        <div class="extra">
            <span class="count">月售{{foodData.sellCount}}份</span><span>好评率{{foodData.rating}}%</span>
        </div>
        <div class="price">
            <span class="now">￥{{foodData.price}}</span><span class="old" v-if="foodData.oldPrice">￥{{foodData.oldPrice}}</span>
        </div>
    </div>
</div>
  
</template>
<script type="text/ecmascript-6">
export default {
  props: {
      foodData: {
          type: Object
      }
  }
}
</script>
<style rel="stylesheet/stylus" lang="stylus">
.food
    display flex
    .icon
        flex 0 0 57px
        width 57px
        height 57px
        margin-right 10px
    .content
        flex 1
        font-size 0
        position relative
        .name
            font-size 14px
            line-height 14px
            margin-top 2px
            margin-bottom 8px
            color rgb(7,17,27)
        .desc,.extra
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
        .desc
            margin-bottom 8px
            line-height 12px
        .extra
            .count
                margin-right 12px
        .price
            font-weight 700
            line-height 24px
            font-size 0
            .now
                font-size 14px
                color rgb(240,20,20)
                margin-right 8px
            .old
                font-size 10px
                color rgb(147, 153, 159)
                text-decoration line-through

</style>

