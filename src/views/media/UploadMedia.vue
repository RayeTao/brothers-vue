<template>
<div>
  <div style="margin-top: 100px;text-align: center">
    <span>上传类别:</span>
    <el-cascader
      :options="options"
      v-model="selectedOptions"
      @change="getOptions"
    style="width: 300px">
    </el-cascader>
  </div>
  <div style="margin-top: 50px">
    <el-upload
      action="http://localhost:8081"
      list-type="picture-card"
      :auto-upload="false"
      :file-list="fileList"
      :on-change="addImgList"
      :limit='3'
      :on-exceed='uploadLimit'
      :http-request='uploadMedia'
      :on-preview="previewImg"
      :on-remove="removeImg">
     <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div style="margin-top: 50px">
      <el-button size="small" type="primary"  @click.native="uploadMedia">上传</el-button>
      <el-button size="small" type="primary"  @click.native="resetMedia">继续上传</el-button>
    </div>

    <div style="margin:20px auto; width: 400px" v-show="this.showPercentage">
      <el-progress :text-inside="true" :stroke-width="18" :percentage="this.uploadPercentage"></el-progress>
    </div>

  </div>
</div>
</template>

<script>
  import axios from 'axios'
    export default {
      data() {
        return {
          options: [{
            value: '1',
            label: '合照',
            children:[{
              value:'1-1',
              label:'小合照'
            },
              {
                value:'1-2',
                label:'大合照'
              }]
          }, {
            value: '2',
            label: '个人照',
            children:[{
              value:'2-1',
              label:'李贤民'
            },
              {
                value:'2-2',
                label:'喻志立'
              },
              {
                value:'2-3',
                label:'郭会成'
              },
              {
                value:'2-4',
                label:'陶然'
              },
              {
                value:'2-5',
                label:'易朝军'
              },
              {
                value:'2-6',
                label:'张杨'
              },
              {
                value:'2-7',
                label:'马山川'
              },
              {
                value:'2-8',
                label:'秦丰伟'
              },
              {
                value:'2-9',
                label:'刘玺'
              },
              {
                value:'2-10',
                label:'关磊'
              }
            ]
          }],
          selectedOptions:[],
          dialogImageUrl: '',
          dialogVisible: false,
          fileList:[],
          selectedType:'',
          files:[],
          uploadPercentage:0,
          showPercentage:false
        }
      },
      methods:{
        getOptions(){
          this.selectedType = this.selectedOptions[this.selectedOptions.length -1]
          console.log(this.selectedType)
        },
        removeImg(file, fileList) {
          console.log(file, fileList);
        },
        previewImg(file) {
          console.log(file)
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        addImgList(file, fileList){
          this.fileList = fileList.slice(-3);
        },
        uploadMedia(){
          if(!this.selectedOptions){
            this.$message({
              message:'请先选择上传类别',
              type:'warning'
            })
            return
          }
          if(this.fileList.length ==0){
            this.$message({
              message:'请先添加照片',
              type:'warning'
            })
            return
          }
          this.showPercentage = true
          for(let i=0;i<this.fileList.length;i++){
            let formData = new FormData;
            formData.append('file', this.fileList[i].raw);
            formData.append('type',this.selectedType)
            let config = {
              'Content-Type': 'multipart/form-data'
            }
            let vm = this;
            axios.post('/media/upload',formData, config)
              .then(function(response) {
                if (response.data.success) {
                  vm.uploadPercentage =(i+1)*100/vm.fileList.length
                  console.log(vm.uploadPercentage )
                  if(i == vm.fileList.length-1){
                    vm.$message({
                      message: response.data.message,
                      type: 'success'
                    });
                  }
                }else{
                  vm.$message({
                    message: response.data.message,
                    type: 'error'
                  });
                }
              })
              .catch(function(error) {
                console.log(error);
              })
          }


        },
        resetMedia(){
          this.uploadPercentage = 0;
        this.fileList=[]
        this.showPercentage = false
        },
        uploadLimit(){
          this.$message({
            type: 'error',
            message: '上传文件个数超出限制!最多上传3张图片!'
          });
        }
      }
    }

</script>

<style scoped>

</style>
