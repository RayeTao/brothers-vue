<template>
  <div id="app">
    <div id="clock"  v-show="this.showMenu " >
      <p class="date">{{date}}</p>
      <p class="time">{{time}}</p>
    </div>
    <div  v-show="this.showMenu ">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">合照</template>
          <el-menu-item index="2-1" @click.native="mediaList('2-1')">小合照</el-menu-item>
          <el-menu-item index="2-2" @click.native="mediaList('2-2')">大合照</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">个人照</template>
          <el-menu-item :index="item.index" v-for="(item,index) in this.userList" :key="index" @click.native="mediaList(item.index)">{{item.userName}}</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">图片上传</el-menu-item>
        <el-menu-item index="5">修改密码</el-menu-item>
        <el-menu-item index="6">个人卡片</el-menu-item>
        <el-menu-item index="7">我的收藏</el-menu-item>
        <el-menu-item  v-show="userInfo.userName=='陶然'" index="8">电费计算</el-menu-item>
      </el-menu>
    </div>
    <router-view @login="loginOn"></router-view>
  </div>
</template>


<script>
  import {saveObject,getObjectByKey,removeObject} from "./config/help";
  import axios from 'axios'
  export default {
  data () {
    return {
      date: '',
      time: '',
      week: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      timerID: '',
      activeIndex: '1',
      userList:[],
      userInfo:{},
      showMenu:false,
      isLogin:false,

    }
  },
  created() {
    this.timerID = setInterval(this.updateTime, 1000);
    this.updateTime();
    this.userList = []
    this.getUserList()

  /*  if(!this.userInfo){
      /!*this.$router.replace({
        name:'login'
      })*!/
    }else{
      this.showMenu = true
    }*/
  },
  methods: {
    loginOn(){
      this.showMenu = true
      this.isLogin = true
      this.userInfo = getObjectByKey('userInfo')
      console.log(this.userInfo)
    },
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
    updateTime() {
      let cd = new Date();
      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
      this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.week[cd.getDay()];
    },
    zeroPadding(num, digit) {
      let zero = '';
      for (let i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    },
    handleSelect(key, keyPath) {
      console.log(key)
      if(key == 1){
        this.$router.push({
          name: 'home'
        })
      }else if(key == 4){
        this.$router.push({
          name: 'uploadMedia'
        })
      }else if(key == 5){
        this.$router.push({
          name: 'resetPsw'
        })
      }else if(key == 6){
        this.$router.push({
          name: 'userCard',
          params:{
            userList: this.userList
          }
        })
      }else if(key==7){
        this.$router.push({name:'collectMediaList'})
      }else if(key == 8){
        this.$router.push({name:'electricity'})
      }
    },
    mediaList(value){
      this.$router.push({
        name:'mediaList',
        params:{
          userType: value
        }
      })

    }
  },

}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
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

p {
  margin: 0;
  padding: 0;
}

#clock {
  font-family: 'Share Tech Mono', monospace;
  color: #ffffff;
  text-align: center;
  /* position: absolute;
   left: 50%;
   -webkit-transform: translate(-50%, -50%);
   transform: translate(-50%, -50%);
   color: #daf6ff;
   text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);*/

  color: #daf6ff;
  background: #545c64;
  width:100%;

}

#clock .time {

  font-size: 80px;
  padding: 5px 0;
  height: 100px;
}

#clock .date {
  letter-spacing: 0.1em;
  font-size: 24px;
}
</style>
