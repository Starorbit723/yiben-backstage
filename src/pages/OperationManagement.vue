<template>
  <div class="operationmanagement-page">
    <el-upload
      class="upload-demo"
      ref="upload"
      action=""
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :file-list="fileList"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div v-if="previewUrl" class="preview-container">
      <img :src="previewUrl" class="preview-image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'OperationManagement',
  data() {
    return {
      fileList: [],
      previewUrl: '',
      currentFile: null
    }
  },
  mounted() {
    
  },
  methods: {
    submitUpload() {
      if (this.currentFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const binaryData = e.target.result;
          console.log('文件二进制数据:', binaryData);
        };
        reader.readAsArrayBuffer(this.currentFile);

        // 使用文件原始名称作为云存储路径
        const cloudPath = `uploads/${Date.now()}-${this.currentFile.name}`;
        
        this.$cloudbase.uploadFile({
          cloudPath: cloudPath,
          filePath: this.currentFile,
          onUploadProgress: (progressEvent) => {
            console.log('上传进度:', progressEvent);
          }
        })
        .then(res => {
          console.log('上传成功:', res);
          /* {
              "fileID": "cloud://cloud1-0gvvdaq4c40b8f74.636c-cloud1-0gvvdaq4c40b8f74-1351667792/uploads/1746257971848-layer-example9.a574f6d1.png",
              "download_url": "https://636c-cloud1-0gvvdaq4c40b8f74-1351667792.tcb.qcloud.la/uploads/1746257971848-layer-example9.a574f6d1.png?sign=b23c83f2eef404a90c2d1b6536d0cc1f&t=1746257974",
              "requestId": "66874cfcc5ead"
          } */
          this.$message.success('文件上传成功');
        })
        .catch(err => {
          console.error('上传失败:', err);
          this.$message.error('文件上传失败');
        });
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.previewUrl = '';
      this.currentFile = null;
    },
    handlePreview(file) {
      console.log(file);
    },
    handleChange(file) {
      this.currentFile = file.raw;
      // 创建预览URL
      this.previewUrl = URL.createObjectURL(file.raw);
    }
  }
}
</script>

<style lang="less">
.operationmanagement-page{
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .preview-container {
    margin-top: 20px;
    .preview-image {
      max-width: 100%;
      max-height: 300px;
      object-fit: contain;
    }
  }
}
</style>