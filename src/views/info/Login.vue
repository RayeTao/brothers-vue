<template >
  <div>
    <p style="font-size: 30px;text-align: center;color: #409eff;margin-top: 100px">兄弟会</p>
  <el-input v-model="username" placeholder="请输入用户名" type="text"class="text-info"></el-input>

  <div style="margin-top: 15px;">
    <el-input v-model="password" placeholder="请输入密码" type="password"  class="text-info" ></el-input>
  </div>
    <div style="margin-top: 15px;">
      <el-button type="primary" @click="login()" :plain="true">登录</el-button>
    </div>
    </div>
</template>
<style>
  .text-info{
    width: 400px;
    margin-top: 20px;
  }
</style>
<script>
  import axios from 'axios'
  import {saveObject,removeObject} from "../../config/help";

  export default {
  name: 'hello',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods:{
     login: function(){
      if(!this.username){
        this.$message({
          message:"用户名不能为空",
          type:'warning'
        })
      return
      }

       if(!this.password){
         this.$message({
           message:"密码不能为空",
           type:'warning'
         })
         return
       }

      let _this = this;
     axios.get('/doLogin',{
         params: {
           username: this.username,
           password: this.password
         }
       }).then(function (response) {
         if(response.data.code == 0) {
           removeObject('userInfo')
           saveObject('userInfo',response.data.data.data)
           _this.$router.push({
             name: 'home'
           });
           _this.$emit('login')
         }else if(response.data.code == -1){
           _this.$message({
             message:"用户不存在",
             type:'warning'
           })
       }else if(response.data.code == 1){
           _this.$message({
             message:"密码错误",
             type:'warning'
           })
         }
       }).catch(function (error) {

       })

    }
  }
}
</script>
