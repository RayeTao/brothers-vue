<template>
    <div style="margin-top: 100px;text-align: center">
      <div style=";width: 400px;margin: 15px auto">
      <el-input v-model="oldPsw" placeholder="请输入原密码" ></el-input>
      </div>
      <div style="margin: 15px auto;width: 400px">
      <el-input v-model="newPswFirst" placeholder="请输入新密码" ></el-input>
      </div>
        <div style="margin: 15px auto;width: 400px">
      <el-input v-model="newPswSecond" placeholder="请确认新密码"></el-input>
        </div>
      <div style="margin-top: 15px;">
        <el-button type="primary" @click="resetPsw()" :plain="true">提交</el-button>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import {saveObject,getObjectByKey} from "../../config/help";
let userInfo = getObjectByKey('userInfo')
  export default {
        data() {
          return {
            oldPsw: '',
            newPswFirst:'',
            newPswSecond:''
          }
        },
      methods:{
        resetPsw(){
          if(this.checkInput()){
            console.log(userInfo)
            let _this = this
            axios.get('/resetPassword',{
              params:{
                username: userInfo.userName,
                oldPassword:this.oldPsw,
                newPassword:this.newPswFirst
              }
            }).then(function (response) {
              if(response.data.code == 0){
                _this.$message({
                  message: response.data.msg,
                  type: 'success'
                });
                saveObject("userInfo",response.data.data.data)
              }else if(response.data.code == -1){
                _this.$message({
                  message: response.data.msg,
                  type: 'warning'
                });
              }

            }).catch(function (error) {

            })
          }
        },
        checkInput(){
          if(!this.oldPsw){
            this.$message({
              message:'原始密码不能为空',
              type:'warning'
            })
            return false
          }
          if(!this.newPswFirst){
            this.$message({
              message:'新密码不能为空',
              type:'warning'
            })
            return
          }
          if(!this.newPswSecond){
            this.$message({
              message:'请再次确认密码',
              type:'warning'
            })
            return false
          }

          if(this.newPswFirst != this.newPswSecond){
            this.$message({
              message:'两次密码输入不一致',
              type:'warning'
            })
            return false
          }
          return true
        }
      }
    }
</script>

<style scoped>
.text-password{
  margin-top: 20px;
  width: 400px;
}
</style>
