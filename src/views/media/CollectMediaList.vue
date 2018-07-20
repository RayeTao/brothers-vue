<template>
  <div style="margin-top: 50px">
    <div style="text-align: center;width: 100%;margin: 0 auto;">
      <div v-for="(item,index) in this.mediaList" :key="index" >
        <div class="big-img">
          <img  :src="item.mediaUrl" width="300px" height="240px" @click="goDetail(item)" />
        </div>
      </div>
    </div>
    <div class="page" v-show="this.mediaList.length>0">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :pager-count="11"
        :total="totalCount"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {getObjectByKey} from "../../config/help";

  export default {
    data() {
      return {
        userType: '',
        mediaList: [],
        totalCount: 0,
        pageNo: 1,
        pageSize: 9,
        userInfo: {}
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
        this.userInfo = getObjectByKey('userInfo')
        let params = this.$route.params;
        this.userType = params && params.userType
        this.getCollectMediaList()


      },
      getCollectMediaList() {
        let vm = this
        this.mediaList = []
        axios.get("/media/getCollectMediaList", {
          params: {
            userId: vm.userInfo.userId,
            pageNo: vm.pageNo,
            pageSize: vm.pageSize
          }
        }).then(function (response) {
          if (response.data.success) {
            vm.mediaList.push.apply(vm.mediaList,response.data.data.resultList)
            vm.totalCount = response.data.data.totalCount
          }
        }).catch(function (error) {})
      },
      goDetail(item){
        this.$router.push({
          name: 'mediaDetail',
          params:{
            mediaInfo: item
          }
        })
      },
      handleCurrentChange(value) {
        console.log(`当前页: ${value}`);
        this.pageNo = value
        this.getMediaList()
      }
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
  .page{
    clear: both;
    text-align: center;
    padding-top: 50px;
  }
</style>
