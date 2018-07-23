<template>
    <div>
      <div style="text-align: center;margin-top: 50px">
        <img :src="this.mediaInfo.mediaUrl"  width="700px" height="440px">
      </div>
      <div style="text-align: center; margin-top: 30px">
        <div class="text-flex">
          <a :href="this.mediaInfo.mediaUrl" download="图片"><img src="../../images/download.png" class="text-img" @click="downloadMedia"/></a>
        </div>
        <div class="text-flex">
          <img src="../../images/comment.png" class="text-img" @click="commentMedia"/>
        </div>
        <div class="text-flex">
          <img :src="collectLog(this.mediaInfo.collectFlag)" class="text-img" style="margin-right: 0" @click="collectMedia"/>
          <span  style="font-size: 20px;vertical-align: middle;margin-left: 5px">{{mediaInfo.collectCount}}</span>
        </div>
        <div class="text-flex">
          <img src="../../images/delete.png" class="text-img" style="margin-left: 60px" @click="deleteMedia"/>
        </div>
      </div>
      <div style="margin:30px auto;width: 50%">
        <p style="font-size: 20px;color: #3faaf5;text-align: left">评论</p>
        <div style="border: solid 1px #3faaf5;width: 100%"></div>
        <div style="text-align: left;margin: 10px" v-for="n in 3">
          <p class="text-name">陶然</p>
          <p class="text-content">真出</p>
          <p class="text-time">2018-07-12</p>
          <!--<p style="text-align: right">回复</p>-->
          <div style="border: dotted  0.5px #999999;margin-top: 10px"></div>
        </div>

      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import {saveObject,getObjectByKey} from "../../config/help";

  export default {
        data(){
          return{
            mediaInfo:{},
            userInfo: {}
          }
        },
      created(){
        let params = this.$route.params
        this.mediaInfo  = params && params.mediaInfo
        this.userInfo = getObjectByKey('userInfo')
        console.log(this.mediaInfo)
      },
      methods:{
        collectLog: function (value) {
          if(value == 0) {
            return require('../../images/collect_before.png')
          }else if(value ==1){
            return require('../../images/collect_after.png')
          }
        },
        downloadMedia: function () {
       //window.open(this.mediaInfo.mediaUrl,'_blank')
          let iframe = document.createElement("iframe")
          iframe.style.display = "none";
          iframe.src = this.mediaInfo.mediaUrl;
          document.body.appendChild(iframe);

        },

        commentMedia: function () {

        },
        collectMedia: function () {
          let vm = this
          if(this.mediaInfo.collectFlag == 1){
            axios.get('/media/cancelCollectMedia',{
              params:{
                mediaId: vm.mediaInfo.mediaId
              }
            }).then(function (response) {
              if(response.data.success){
                vm.$message({
                  message: response.data.message,
                  type: 'success'
                })
                vm.$router.go(-1)
              }
            })
          }else if(this.mediaInfo.collectFlag == 0){
            axios.get('/media/collectMedia',{
              params:{
                mediaId: vm.mediaInfo.mediaId,
                userId: vm.userInfo.userId
              }
            }).then(function (response) {
              if(response.data.success){
                vm.$message({
                  message: response.data.message,
                  type: 'success'
                })
                vm.mediaInfo.collectFlag = 1
                vm.mediaInfo.collectCount++
              }
            })
          }


        },
        deleteMedia: function () {
          let vm = this
          axios.get('/media/deleteMedia',{
            params:{
              mediaId: vm.mediaInfo.mediaId,
             localMediaPath: vm.mediaInfo.localMediaPath
            }
          }).then(function (response) {
            if(response.data.success){
              vm.$message({
                message: response.data.message,
                type: 'success'
              })
              vm.$router.go(-1)
            }

          }).catch(function (error) {

          })
        }

      }
    }
</script>

<style scoped>
.text-name{
  font-size: 14px;
  color: #409eff;
  margin-top: 10px;
}
  .text-content{
    font-size: 14px;
    font-weight: bold;
    color: #666666;
    margin-top: 10px;
  }
  .text-time{
    font-size: 10px;
    margin-top: 10px;
    color: #999999;
  }
  .text-img{
    width :30px;
    height: 30px;
    vertical-align: middle;
    margin: 30px;
  }
  .text-flex{
    display: inline;
    width: 30px;
    height: 30px;
  }
</style>
