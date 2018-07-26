<template>
    <div style="text-align: center">
        <div class="text-form">
          <el-form ref="form" label-width="200px">
          <el-form-item label="1号房">
            <el-col :span="11">
            <el-input v-model="lastMonthTotal_1" placeholder="上月用电总量" ></el-input>
            </el-col>
            <el-col :span="11" style="margin-left: 20px">
              <el-input v-model="thisMonthTotal_1" placeholder="本月用电总量"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="2号房"  >
            <el-col :span="11">
              <el-input v-model="lastMonthTotal_2" placeholder="上月用电总量" ></el-input>
            </el-col>
            <el-col :span="11" style="margin-left: 20px">
              <el-input v-model="thisMonthTotal_2" placeholder="本月用电总量"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="3号房" >
            <el-col :span="11">
              <el-input v-model="lastMonthTotal_3" placeholder="上月用电总量" ></el-input>
            </el-col>
            <el-col :span="11" style="margin-left: 20px">
              <el-input v-model="thisMonthTotal_3" placeholder="本月用电总量"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="4号房" >
            <el-col :span="11">
              <el-input v-model="lastMonthTotal_4" placeholder="上月用电总量" ></el-input>
            </el-col>
            <el-col :span="11" style="margin-left: 20px">
              <el-input v-model="thisMonthTotal_4" placeholder="本月用电总量"></el-input>
            </el-col>
          </el-form-item>
            <el-form-item label="总用电量" >
              <el-col :span="11">
                <el-input v-model="lastMonthTotal_all" placeholder="上月总用电量" ></el-input>
              </el-col>
              <el-col :span="11" style="margin-left: 20px">
                <el-input v-model="thisMonthTotal_all" placeholder="本月总用电量"></el-input>
              </el-col>
            </el-form-item>
          <el-form-item>
              <el-button type="primary" @click.native="compute">计算</el-button>
              <el-button @click.native="reset" >重置</el-button>
          </el-form-item>
        </el-form>
        </div>
      <div style="width: 80%;margin: 20px auto" v-show="showResult">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="dateTime"
            label="日期"
            width="200">
          </el-table-column>
          <el-table-column
            prop="roomNo"
            label="房间号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="lastMonthTotal"
            label="上月用电总量">
          </el-table-column>
          <el-table-column
            prop="thisMonthTotal"
            label="本月用电总量">
          </el-table-column>
          <el-table-column
            prop="thisMonth"
            label="本月用电量">
          </el-table-column>
          <el-table-column
            prop="thisMonthElectricity"
            label="本月电费">
          </el-table-column>
        </el-table>
      </div>
      </div>
</template>

<script>
    export default {
        data(){
          return{
              lastMonthTotal_1: '',
              thisMonthTotal_1: '',
              lastMonthTotal_2: '',
              thisMonthTotal_2: '',
              lastMonthTotal_3: '',
              thisMonthTotal_3: '',
              lastMonthTotal_4: '',
              thisMonthTotal_4: '',
              lastMonthTotal_all: '',
              thisMonthTotal_all: '',
            thisMonth_1: '',
            thisMonthElectricity_1: '',
            thisMonth_2: '',
            thisMonthElectricity_2: '',
            thisMonth_3: '',
            thisMonthElectricity_3: '',
            thisMonth_4: '',
            thisMonthElectricity_4: '',
            thisMonth_all: '',
            thisMonthElectricity_all: '',
            gradient_1:'',
            gradient_2:'',
            tableData:[],
            showResult: false,
            dateTime:''
          }
        },
      methods:{
          compute:function () {
            //计算1号房的本月用电量
            this.thisMonth_1 = this.thisMonthTotal_1 - this.lastMonthTotal_1
            //计算2号房的本月用电量
            this.thisMonth_2 = this.thisMonthTotal_2 - this.lastMonthTotal_2
            //计算3号房的本月用电量
            this.thisMonth_3 = this.thisMonthTotal_3 - this.lastMonthTotal_3
            //计算4号房的本月用电量
            this.thisMonth_4 = this.thisMonthTotal_4 - this.lastMonthTotal_4
            //计算公摊的本月用电量
            this.thisMonth_all = this.thisMonthTotal_all - this.lastMonthTotal_all-this.thisMonth_1-this.thisMonth_2
            -this.thisMonth_3-this.thisMonth_4
            //计算用户的第一梯度和第二梯度
            this.gradient_1 =(180-this.thisMonth_all)/4   //第一梯度
            this.gradient_2 = (400-this.thisMonth_all)/4   //第二梯度
            //计算1号房的本月电费
            if(this.thisMonth_1<=this.gradient_1){
              this.thisMonthElectricity_1 = (this.thisMonth_all/4 + this.thisMonth_1)*0.573
            }else if (this.thisMonth_1> this.gradient_1 && this.thisMonth_1 <= this.gradient_2){
              this.thisMonthElectricity_1 = (this.thisMonth_all/4 + this.gradient_1)*0.573 +(this.thisMonth_1-this.gradient_1)*0.623
            }else if(this.thisMonth_1>this.gradient_2){
              this.thisMonthElectricity_1 = (this.thisMonth_all/4 + this.gradient_1)*0.573+
                (this.gradient_2-this.gradient_1)*0.623+(this.thisMonth_1-this.gradient_2)*0.873
            }
            //计算2号房的本月电费
            if(this.thisMonth_2<=this.gradient_1){
              this.thisMonthElectricity_2 = (this.thisMonth_all/4 + this.thisMonth_2)*0.573
            }else if (this.thisMonth_2> this.gradient_1 && this.thisMonth_2 <= this.gradient_2){
              this.thisMonthElectricity_2 = (this.thisMonth_all/4 + this.gradient_1)*0.573 +(this.thisMonth_2-this.gradient_1)*0.623
            }else if(this.thisMonth_2>this.gradient_2){
              this.thisMonthElectricity_2 = (this.thisMonth_all/4 + this.gradient_1)*0.573+
                (this.gradient_2-this.gradient_1)*0.623+(this.thisMonth_2-this.gradient_2)*0.873
            }
            //计算3号房的本月电费
            if(this.thisMonth_3<=this.gradient_1){
              this.thisMonthElectricity_3 = (this.thisMonth_all/4 + this.thisMonth_3)*0.573
            }else if (this.thisMonth_3> this.gradient_1 && this.thisMonth_3 <= this.gradient_2){
              this.thisMonthElectricity_3 = (this.thisMonth_all/4 + this.gradient_1)*0.573 +(this.thisMonth_3-this.gradient_1)*0.623
            }else if(this.thisMonth_3>this.gradient_2){
              this.thisMonthElectricity_3 = (this.thisMonth_all/4 + this.gradient_1)*0.573+
                (this.gradient_2-this.gradient_1)*0.623+(this.thisMonth_3-this.gradient_2)*0.873
            }
            //计算4号房的本月电费
            if(this.thisMonth_4<=this.gradient_1){
              this.thisMonthElectricity_4 = (this.thisMonth_all/4 + this.thisMonth_4)*0.573
            }else if (this.thisMonth_4> this.gradient_1 && this.thisMonth_4 <= this.gradient_2){
              this.thisMonthElectricity_4 = (this.thisMonth_all/4 + this.gradient_1)*0.573 +(this.thisMonth_4-this.gradient_1)*0.623
            }else if(this.thisMonth_4>this.gradient_2){
              this.thisMonthElectricity_4 = (this.thisMonth_all/4 + this.gradient_1)*0.573+
                (this.gradient_2-this.gradient_1)*0.623+(this.thisMonth_4-this.gradient_2)*0.873
            }
            //计算公摊的本月电费
            /*if(this.thisMonth_all<=this.gradient_1){
              this.thisMonthElectricity_all = (this.thisMonth_all/4 + this.thisMonth_all)*0.573
            }else if (this.thisMonth_all> this.gradient_1 && this.thisMonth_all <= this.gradient_2){
              this.thisMonthElectricity_all = (this.thisMonth_all/4 + this.gradient_1)*0.573 +(this.thisMonth_all-this.gradient_1)*0.623
            }else if(this.thisMonth_all>this.gradient_2){
              this.thisMonthElectricity_all = (this.thisMonth_all/4 + this.gradient_1)*0.573+
                (this.gradient_2-this.gradient_1)*0.623+(this.thisMonth_all-this.gradient_2)*0.873
            }*/
            this.showResultInfo()
          },
        reset:function () {
           this.form={}
        },
        showResultInfo: function () {
          this.showResult = true
          let cd = new Date();
          this.dateTime = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() , 2) + '-26'+' 至'
          +this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth()+ 1, 2) + '-26'

          this.tableData.push(
            {dateTime: this.dateTime,roomNo:'1',lastMonthTotal:this.lastMonthTotal_1,thisMonthTotal: this.thisMonthTotal_1,thisMonth:this.thisMonth_1,thisMonthElectricity:this.thisMonthElectricity_1},
            {dateTime: this.dateTime,roomNo:'2',lastMonthTotal:this.lastMonthTotal_2,thisMonthTotal: this.thisMonthTotal_2,thisMonth:this.thisMonth_2,thisMonthElectricity:this.thisMonthElectricity_2},
            {dateTime: this.dateTime,roomNo:'3',lastMonthTotal:this.lastMonthTotal_3,thisMonthTotal: this.thisMonthTotal_3,thisMonth:this.thisMonth_3,thisMonthElectricity:this.thisMonthElectricity_3},
            {dateTime: this.dateTime,roomNo:'4',lastMonthTotal:this.lastMonthTotal_4,thisMonthTotal: this.thisMonthTotal_4,thisMonth:this.thisMonth_4,thisMonthElectricity:this.thisMonthElectricity_4},)
        },
        zeroPadding(num, digit) {
          let zero = '';
          for (let i = 0; i < digit; i++) {
            zero += '0';
          }
          return (zero + num).slice(-digit);
        },
      }
    }
</script>

<style scoped>
.text-form{
  margin: 50px auto;
  width: 800px;
}
  .text-title{
    color: #409eff;
    font-size: 20px;
    margin-bottom: 20px;
  }
</style>
