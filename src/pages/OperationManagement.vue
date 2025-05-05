<template>
  <div class="operationmanagement-page">
    <!--查询条件-->
    <div class="yb-common-searchzone">
      <el-form ref="form" :model="form" label-width="80px">
        <el-col :span="6"> 
          <el-form-item label="预约校区">
            <el-select class="yb-select" v-model="form.schoolid" size="small">
              <el-option
                v-for="item in schoolOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <!--按钮区域-->
    <div class="yb-common-btnzone">
      <el-row :gutter="20">
        <el-col :offset="20" :span="2">
          <el-button class="yb-button" type="success" size="small" @click="saveAndSubmit()">保存修改</el-button>
        </el-col>
        <el-col :span="2">
          <el-button v-if="Rlook" class="yb-button" type="primary" size="small" @click="searchOperateList()">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <!--配置区域-->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { RightMixin } from "@/plugins/mixin.js";

export default {
  name: 'OperationManagement',
  mixins: [ RightMixin ],
  data() {
    return {
      form: {
        schoolid: 1,
      },
      combineData: {},
    }
  },
  computed: {
    ...mapState(['schoolOptions']),
  },
  mounted() {
    
  },
  methods: {
    searchOperateList() {},
    saveAndSubmit() {},
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