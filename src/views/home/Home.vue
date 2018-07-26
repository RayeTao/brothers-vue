<template>
  <div>
    <div style="width: 500px;margin: 20px auto;">
      <el-carousel height="300px" :interval="2000">
        <el-carousel-item v-for="(item,index) in this.mediaList" :key="index">
          <img :src="item.mediaUrl" width="500px" height="300px">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import {getObjectByKey} from "../../config/help";

  export default {
    data() {
      return {
        mediaList: [],
        userType:'1',
        userInfo: {}
      }
    },
    created(){
      this.userInfo = getObjectByKey('userInfo')
      this.getMediaList(this.userType)
    },
    methods: {
      getMediaList(value) {
        let vm = this
        this.mediaList = []
        axios.get("/media/getMediaList", {
          params: {
            userId: vm.userInfo.userId,
            userType: value+'',
            pageNo: 1,
            pageSize: 30
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
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;

  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;

  }

</style>
