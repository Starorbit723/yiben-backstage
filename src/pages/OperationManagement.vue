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
    
    <div class="resource-actions" v-if="fileId">
      <el-button type="danger" @click="deleteResource">删除资源</el-button>
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
      currentFile: null,
      fileId: '' // 存储上传后得到的fileId
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
          // 存储上传成功后返回的fileId
          if (res && res.fileID) {
            this.fileId = res.fileID;
          }
          this.$message.success('文件上传成功');
        })
        .catch(err => {
          console.error('上传失败:', err);
          this.$message.error('文件上传失败');
        });
      }
    },
    deleteResource() {
      this.$confirm('确定要删除该资源吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用云开发 deleteFile 方法删除文件
        this.$cloudbase.deleteFile({
          fileList: ['cloud://cloud1-0gvvdaq4c40b8f74.636c-cloud1-0gvvdaq4c40b8f74-1351667792/uploads/1746257971848-layer-example9.a574f6d1.png', 'cloud://cloud1-0gvvdaq4c40b8f74.636c-cloud1-0gvvdaq4c40b8f74-1351667792/uploads/1746281655185-11111111111111.png']
        })
        .then(res => {
          console.log('删除成功:', res);
        })
        .catch(err => {
          console.error('删除失败:', err);
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
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
  .resource-actions {
    margin-top: 20px;
  }
}
</style>