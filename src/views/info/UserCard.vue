<template>
    <div style="margin-top: 50px">
      <div  style="text-align: center;">
     <div v-for="(item,index) in userList" :key="index">
        <el-card class="box-card" shadow="hover">
          <div >
           <!-- <el-popover
              placement="right"
              width="400"
              trigger="click">
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
                  <el-button type="primary" @click="editInfo">确定</el-button>
                 <el-button @click.native="visible == false">取消</el-button>
                  </div>
                </el-form-item>
              </el-form>
              <el-button circle type="primary" icon="el-icon-edit-outline" slot="reference" style="float: right" ></el-button>
            </el-popover>-->
            <el-button circle type="primary" icon="el-icon-edit-outline" style="float: right" @click="editInfo(item)"></el-button>
            <p style="font-size: 20px;color: #409eff;text-align: left">{{ item.userName }}</p>
            <p class="text-info">生日:<span  style="margin-left: 10px">{{ item.birthday  }}</span></p>
            <p class="text-info">手机号:<span style="margin-left: 10px">{{ item.phone }}</span></p>
            <p class="text-info">地址:<span style="margin-left: 10px">{{ item.address }}</span></p>
          </div>
        </el-card>
      </div>
      </div>
    </div>
</template>

<script>
  import {TimestampToDate} from "../../config/DateUtil";
  import axios from 'axios'
  export default {
        data(){
          return{
            userList: [],
            form: {
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
    filters:{
      filterDate:function (value) {
        return TimestampToDate(value)
      }
    },
      created(){
          /*let params = this.$route.params
          this.userList = params && params.userList*/
          this.getUserList()
      },
    methods:{
      getUserList(){
        let vm = this;
        axios.get("/user/getUserList")
          .then(function (response) {
            if(response.data.code == 0){
              vm.userList.push.apply(vm.userList,response.data.data.resultList)
            }
          }).catch(function (error) {

        })
      },
      editInfo: function (item) {
        this.$router.push({
          name:'editInfo',
          params:{
            userInfo:item
          }
        })
      }
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
