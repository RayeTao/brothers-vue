<template>
  <div>
    <div style="width: 400px;margin: 100px auto">
  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="生日" prop="birthday">
      <el-input v-model="form.birthday"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="form.address"></el-input>
    </el-form-item>
    <el-form-item>
      <div style="text-align: center; margin: 0">
        <el-button type="primary" @click.native="editInfo">确定</el-button>
        <el-button @click.native="cancelEdit">取消</el-button>
      </div>
    </el-form-item>
  </el-form>
  </div>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
       data(){
         return{
           userInfo:{},
           form:{
             name: '',
             birthday:'',
             phone:'',
             address: '',
           },

           rules: {
             name: [
               { required: true, message: '请输入姓名', trigger: 'change' },
             ],
             birthday: [
               { required: true, message: '请输入生日', trigger: 'change' }
             ],
             phone: [
               {  required: true, message: '请输入手机号', trigger: 'change' }
             ],
             address: [
               {  required: true, message: '请输入地址', trigger: 'change' }
             ]
           }
         }
       },
      created(){
         let params = this.$route.params
        this.userInfo = params && params.userInfo
        console.log(this.userInfo)
        if(this.userInfo){
           this.form.name = this.userInfo.userName
          this.form.birthday = this.userInfo.birthday
          this.form.phone = this.userInfo.phone
          this.form.address = this.userInfo.address
        }
      },
      methods:{
         editInfo: function () {
           let vm=this
           axios.get('/user/editInfo',{
             params:{
               userId: vm.userInfo.userId,
               userName: vm.form.name,
               birthday: vm.form.birthday,
               phone: vm.form.phone,
               address: vm.form.address
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
         },
        cancelEdit:function () {
           this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>

</style>
