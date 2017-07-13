<template>
<div class="detail-title">
  <div class="line line-left"></div>
  <h2 class="title-text">{{text}}</h2>
  <div class="line line-right"></div>
</div>
  
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    text: {
      type: String
    }
  }
}
</script>
<style rel="stylesheet/stylus" lang="stylus">
.detail-title
  position relative
  display flex
  width 100%
  .line
    flex 1
    height 1px
    background-color rgba(255,255,255,.2)
    margin-top 6.5px
  h2
    font-size 14px
    line-height 14px
    font-weight 700
    text-align center
    padding 0 12px

</style>

