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
      :on-remove="removeImg"
      v-loading="loading">
     <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div style="margin-top: 50px">
      <el-button size="small" type="primary"  @click.native="uploadMedia">上传</el-button>
      <el-button size="small" type="primary"  @click.native="resetMedia" v-show="fileList.length>0">继续上传</el-button>
    </div>

  </div>
</div>
</template>

<script>
  import axios from 'axios'
    export default {
      data() {
        return {
          options: [
            {
              value:'1',
              label:'首页'
            },
            {
            value: '2',
            label: '合照',
            children:[{
              value:'2-1',
              label:'小合照'
            },
              {
                value:'2-2',
                label:'大合照'
              }]
          }, {
            value: '3',
            label: '个人照',
            children:[{
              value:'3-1',
              label:'李贤民'
            },
              {
                value:'3-2',
                label:'喻志立'
              },
              {
                value:'3-3',
                label:'郭会成'
              },
              {
                value:'3-4',
                label:'陶然'
              },
              {
                value:'3-5',
                label:'易朝军'
              },
              {
                value:'3-6',
                label:'张杨'
              },
              {
                value:'3-7',
                label:'马山川'
              },
              {
                value:'3-8',
                label:'秦丰伟'
              },
              {
                value:'3-9',
                label:'刘玺'
              },
              {
                value:'3-10',
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
          loading: false
        }
      },
      methods:{
        getOptions(){
          this.selectedType = this.selectedOptions[this.selectedOptions.length -1]
        },
        removeImg(file, fileList) {
         this.fileList = fileList
        },
        previewImg(file) {
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

          for(let i=0;i<this.fileList.length;i++){
            let formData = new FormData;
            formData.append('file', this.fileList[i].raw);
            formData.append('type',this.selectedType)
            let config = {
              'Content-Type': 'multipart/form-data'
            }
            let vm = this;
            vm.loading = true
            axios.post('/media/upload',formData, config)
              .then(function(response) {
                if (response.data.success) {
                  if(i == vm.fileList.length-1){
                    vm.$message({
                      message: response.data.message,
                      type: 'success'
                    });
                    vm.loading = false
                  }
                }else{
                  vm.$message({
                    message: response.data.message,
                    type: 'error'
                  });
                  vm.loading = false
                }
              })
              .catch(function(error) {
                console.log(error);
              })
          }
        },
        resetMedia(){
        this.fileList=[]
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
