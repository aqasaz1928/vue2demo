<template>
<div class="food">
    <div class="icon">
        <img :src="foodData.icon">
    </div>
    <div class="content">
        <h2 class="name">{{foodData.name}}</h2>
        <p class="desc">{{foodData.description}}</p>
        <div class="extra">
            <span>月售{{foodData.sellCount}}份</span>
            <span>好评率{{foodData.rating}}%</span>
        </div>
        <div class="price">
            <span>￥{{foodData.price}}</span>
            <span v-if="foodData.oldPrice">￥{{foodData.oldPrice}}</span>
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


</style>

