<template>
  <div>
    <div style="width: 800px;margin: 20px auto;">
      <el-carousel height="300px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img src="../../images/1.png" width="100%" height="300px">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },

    methods: {
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
    width: 100%;
  }

  #clock .time {
    letter-spacing: 0.05em;
    font-size: 80px;
    padding: 5px 0;
  }

  #clock .date {
    letter-spacing: 0.1em;
    font-size: 24px;
  }
</style>
