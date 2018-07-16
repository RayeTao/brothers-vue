<template>
    <div style="margin-top: 50px">
      <div  style="text-align: center;">
     <div v-for="(item,index) in userList" :key="index">
        <el-card class="box-card" shadow="hover">
          <div >
            <p style="font-size: 20px;color: #409eff;text-align: left">{{ item.userName }}</p>
            <p class="text-info">性别:<span >{{ item.gender }}</span></p>
            <p class="text-info">生日:<span >{{ item.birthday }}</span></p>
            <p class="text-info">手机号:<span >{{ item.phone }}</span></p>
            <p class="text-info">地址:<span >{{ item.address }}</span></p>
          </div>
        </el-card>
      </div>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
          return{
            userList: []
          }
        },
      created(){
          let params = this.$route.params
          this.userList = params && params.userList
      }
    }
</script>

<style scoped>
.box-card{

  height: 240px;
  overflow: hidden;
  float: left;
  width: 29%;
  margin: 20px;
}
  .text-info{
    padding: 2px 0px;
    text-align: left
  }
</style>
