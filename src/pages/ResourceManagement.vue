<template>
  <div class="resourcemanagement-page">
    <!--查询条件-->
    <div class="yb-common-searchzone">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="资源名称">
              <el-input v-model="form.name" size="small" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="资源类型">
              <el-select class="yb-select" v-model="form.type" size="small" placeholder="请选择资源类型">
                <el-option
                  v-for="item in resourceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上传时间">
              <el-date-picker
                v-model="form.uploadTimeRanger"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="small">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--按钮区域-->
    <div class="yb-common-btnzone">
      <el-row :gutter="20">
        <el-col :offset="20" :span="2">
          <el-button class="yb-button" type="success" size="small" @click="openUploadDialog">上传资源</el-button>
        </el-col>
        <el-col :span="2">
          <el-button class="yb-button" type="primary" size="small" @click="searchResourceList(0)">查询资源</el-button>
        </el-col>
      </el-row>
    </div>
    <!--表格区域-->
    <div class="yb-common-tablezone">
      <el-table
        stripe
        size="small"
        :data="tableData"
        style="width: 100%">
        <el-table-column prop="name" label="资源名称" width="150"></el-table-column>
        <el-table-column prop="type" label="资源类型" width="120"></el-table-column>
        <el-table-column prop="createTime" label="上传时间" width="160">
          <template slot-scope="scope">
            <div>{{formatDateToShow(scope.row.createTime)}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="资源地址"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleCpoy(scope.row)" type="text" size="small">复制链接</el-button>
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页器-->
    <div class="yb-common-pagination" style="text-align: right;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        :page-sizes="[20, 40, 60, 80, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
    <!--上传弹框-->
    <el-dialog
      :title="'上传资源'"
      :visible.sync="dialogVisible"
      @close="handleDialogClose"
      width="80%">
      <el-form ref="form" :model="formItem" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="资源名称">
              <el-input v-model="formItem.name" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="资源类型">
              <el-select class="yb-select" v-model="formItem.type" size="small" disabled>
                <el-option
                  v-for="item in resourceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <div v-if="previewUrl" class="preview-container">
        <img :src="previewUrl" class="preview-image" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose" size="small">取 消</el-button>
        <el-button type="primary" @click="submitUpload" size="small">确认上传</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { resourceType, formatDate} from '@/utils/common';

export default {
  name: 'ResourceManagement',
  data() {
    return {
      resourceTypeOptions: resourceType,
      form: {
        name: "",
        type: "",
        uploadTimeRanger: [],
      },
      tableData: [],
      // 分页器
      currentPage: 1,
      totalCount: 0,
      limit: 20,
      // 上传弹框
      dialogVisible: false,
      formItem: {
        name: '',
        type: 1,
      },
      fileList: [],
      previewUrl: '',
      currentFile: null
    }
  },
  mounted() {
    
  },
  methods: {
    async searchResourceList(type) {
      const params = {
        pageNo: type === 0 ? 1 : this.currentPage,
        pageSize: this.limit,
        condition: this.form,
      };
      this.$cloudbase.callFunction({
        name: 'operations',
        data: {
          type: 'resourceManagePage',
          data: params,
        }
      }).then(res => {
        console.log('resourceManagePage result:', res);
        if (res.result.success) {
          this.currentPage = res.result.data.pageNo;
          this.pageSize = res.result.data.pageSize;
          this.totalCount = res.result.data.total;
          this.tableData = res.result.data.list;
        }
      }).catch(err => {
        this.$message({
          message: `查询失败`,
          type: 'warning'
        });
        console.error('resourceManagePage error:', err)
      });
    },
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
          this.saveResourceData(res);
        })
        .catch(err => {
          console.error('上传失败:', err);
          this.$message.error('文件上传失败');
        });
      }
    },
    saveResourceData(backData) {
      const params = {
        url: backData.download_url,
        fileId: backData.fileID,
        type: this.formItem.type,
        name: this.formItem.name,
      };
      console.log('resourceSave', params);
      this.$cloudbase.callFunction({
        name: 'operations',
        data: {
          type: 'resourceSave',
          data: params
        }
      }).then(res => {
        console.log('resourceSave result:', res);
        if (res.result.success) {
          this.$message.success('上传成功');
          this.handleDialogClose();
        }
      }).catch(err => {
        this.$message({
          message: `上传失败`,
          type: 'warning'
        });
        console.error('resourceSave error:', err)
      });
    },
    openUploadDialog() {
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.previewUrl = '';
      this.currentFile = null;
      this.fileList = [];
    },
    handlePreview(file) {
      console.log(file);
    },
    handleChange(file) {
      this.currentFile = file.raw;
      // 创建预览URL
      this.previewUrl = URL.createObjectURL(file.raw);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
    },
    handleCurrentChange(val) {
      console.log(`currentPage ${val}`);
      this.currentPage = val;
    },
    formatDateToShow(timeStr) {
      return formatDate(timeStr);
    },
    handleCpoy(row) {
      console.log(row);
    },
    handleDelete(row) {
      console.log(row);
    },
    handleDialogClose() {
      this.dialogVisible = false;
      this.fileList = [];
      this.previewUrl = '';
      this.currentFile = null;
      this.formItem = {
        name: '',
        type: 1,
      };
    },
  }
}
</script>

<style lang="less">
.resourcemanagement-page{
}
</style>