<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
        </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">
        商家
        </router-link>
      </div>
    </div>
    <div class="content">
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>

<script>
import header from 'components/header/header';
import Const from '@/common/js/const'
import {urlParse} from '@/common/js/util'
const ERR_OK = 0;
export default {
  data () {
    return {
      seller: {
        type: Object
      },
      id: (() => {
          let queryParams = urlParse()
          console.log(queryParams)
          return queryParams.id
        })()
    }
  },
  created () {
    this.$http.get('/api/seller').then(
      response => {
        response = response.body;
        if (response.errno === Const.ERR_OK) {
          this.seller = response.data;
          this.seller.id = this.id
        }
        console.log(this.seller);
      },
      response => {

      }
    );
  },
  components: {
    'v-header': header
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
@import './common/stylus/mixin.styl'
    .tab
      display: flex
      width: 100%
      height 40px
      line-height 40px
      border-1px(rgba(7,17,27,0.1))
      background-color #fff
      .tab-item
        flex 1
        text-align center
        & > a
          display block
          font-size 14px
          color rgba(77,85,93,1)
          &.v-active
            color rgb(240,20,20)
          
</style>
