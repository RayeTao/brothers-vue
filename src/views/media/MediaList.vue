<template>
  <div style="margin-top: 50px">
    <div v-for="(item,index) in this.mediaList" :key="index" style="text-align: center;width: 100%;margin: 0 auto">
      <div class="big-img">
        <img  :src="item.mediaUrl" width="300px" height="240px" />
     </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        userId: 0,
        mediaList: [],
      }
    },
    watch: {
      '$route'(to, from) {
        this.init()
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        let params = this.$route.params;
        this.userId = params && params.userId
        this.getMediaList(this.userId)
      },
      getMediaList(value) {
        let vm = this
        this.mediaList = []
        axios.get("/media/getMediaList", {
          params: {
            userId: value,
          }
        }).then(function (response) {
          if (response.data.success) {
            vm.mediaList.push.apply(vm.mediaList,response.data.data.resultList)
          }
        }).catch(function (error) {})
      },
    },
  }
</script>

<style scoped>
  .big-img{
    width: 300px;
    height: 240px;
    border: #000 solid 0px;
    overflow: hidden;
    float: left;
    width: 30%;
    margin: 20px;
  }
  .big-img img{
    transition: all 0.6s;
  }
  .big-img img:hover{
    transform: scale(1.3);
  }
</style>
