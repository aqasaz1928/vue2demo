<template>
<div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :key="index" :class="itemClass" class="star-item">

    </span>
</div>
  
</template>
<script type="text/ecmascript-6">
export default {
  props: {
      size: {
          type: Number
      },
      score: {
          type: Number
      }
  },
  computed : {
      starType () {
          return 'star-'+this.size;
      }
  }
}
</script>
<style rel="stylesheet/stylus" lang="stylus">
.star
    font-size 0
    .star-item
        display inline-block
        background-repeat no-repeat
        background-size 100%
    &.star-48
        .star-item
            width 20px
            height 20px
            margin-right 22px
    &.star-36
    &.star-24

</style>

