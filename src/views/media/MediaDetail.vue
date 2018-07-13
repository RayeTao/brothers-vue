<template>
    <div>
      <div style="text-align: center;margin-top: 50px">
        <img :src="this.mediaInfo.mediaUrl"  width="300px" height="240px">
      </div>
      <div style="margin-top: 30px;float: left">
        <p style="font-size: 20px;color: #3faaf5">评论</p>
        <div style="border: solid 1px #3faaf5;width: 100%"></div>
        <p>陶然</p>
        <p>真出</p>
        <p>2018-07-12</p>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
          return{
            mediaInfo:{}
          }
        },
      created(){
        let params = this.$route.params
        this.mediaInfo  = params && params.mediaInfo
        console.log(this.mediaInfo)
      }
    }
</script>

<style scoped>

</style>
