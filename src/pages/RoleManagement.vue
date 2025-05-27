<template>
  <div class="rolemanagement-page">
    <!--查询条件-->
    <div class="yb-common-searchzone">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="用户名">
              <el-input v-model="form.name" size="small" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号">
              <el-input placeholder="请输入用户手机号" maxlength="11" v-model="form.phoneNumber" size="small" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--按钮区域-->
    <div class="yb-common-btnzone">
      <el-row :gutter="20">
        <el-col :offset="20" :span="2">
          <el-button class="yb-button" type="success" size="small" @click="creatNewAccount(0)">创建账号</el-button>
        </el-col>
        <el-col :span="2">
          <el-button class="yb-button" type="primary" size="small" @click="searchRoleList(0)">查询账号</el-button>
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
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleLook(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
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
    <el-dialog
      :title="dialogType === 'creat' ? '创建账号': '编辑账号'"
      :visible.sync="dialogVisible"
      @close="handleDialogClose"
      width="80%">
      <el-form ref="form" :model="formItem" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="用户名">
              <el-input v-model="formItem.name" maxlength="12" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号">
              <el-input v-model="formItem.phoneNumber" maxlength="11" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"> 
            <el-form-item label="账号权限">
              <el-select class="yb-select" v-model="formItem.role" size="small">
                <el-option
                  v-for="item in roleTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="clearfix"></div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="addAccount()" v-if="dialogType === 'creat'">添加账号</el-button>
        <el-button type="primary" @click="handleDialogEnsure" size="small" v-if="dialogType === 'edit'">确认并保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { RightMixin } from "@/plugins/mixin.js";
import { userType, roleType, gender } from '@/utils/common';

export default {
  name: 'RoleManagement',
  mixins: [ RightMixin ],
  data() {
    return {
      userTypeOptions: userType,
      genderOptions: gender,
      roleTypeOptions: roleType,
      dialogVisible: false,
      dialogType: 'creat',
      form: {
        name: '',
        phoneNumber: '',
      },
      tableData: [],
      // 分页器
      currentPage: 1,
      totalCount: 0,
      limit: 20,
      // 对话框
      formItem: {
        name: '',
        phoneNumber: '',
        role: '',
        roleList: [],
      },
    }
  },
  mounted() {
    this.searchRoleList(0);
  },
  methods:{
    async searchRoleList(type) {
      console.log(JSON.stringify(this.form), this.currentPage, this.limit);
      // 调用查询预定信息接口
      const params = {
        pageNo: type === 0 ? 1 : this.currentPage,
        pageSize: this.limit,
        condition: this.form,
      };
      this.$cloudbase.callFunction({
        name: 'operations',
        data: {
          type: 'roleConfigManagePage',
          data: params,
        }
      }).then(res => {
        console.log('roleConfigManagePage result:', res);
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
        console.error('roleConfigManagePage error:', err)
      });
    },
    creatNewAccount() {
      this.dialogVisible = true;
    },
    filterTag(type) {
      let _text = '';
      this.userTypeOptions.forEach(ele => {
        if (ele.value === type) {
          _text = ele.label;
        }
      });
      return _text;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
    },
    handleCurrentChange(val) {
      console.log(`currentPage ${val}`);
      this.currentPage = val;
    },
    handleLook(scope) {
      this.dialogType = 'creat';
      this.formItem = JSON.parse(JSON.stringify(scope));
      this.dialogVisible = true;
    },
    handleEdit(scope) {
      this.dialogType = 'edit';
      this.formItem = JSON.parse(JSON.stringify(scope));
      this.dialogVisible = true;
    },
    handleDialogClose() {
      this.dialogType = 'creat';
      this.dialogVisible = false;
    },
    async handleDialogEnsure() {
      this.$cloudbase.callFunction({
        name: 'operations',
        data: {
          type: 'userInfoModify',
          data: this.formItem,
        }
      }).then(res => {
        console.log('userInfoModify result:', res);
        if (res.result.success) {
          this.$message({
            message: `修改成功`,
            type: 'success'
          });
          this.searchRoleList(1);
        }
      }).catch(err => {
        this.$message({
          message: `修改失败`,
          type: 'warning'
        });
        console.error('userInfoModify error:', err)
      });
      this.dialogVisible = false;
    },
    genderShow(val) {
      let res = '';
      this.genderOptions.forEach((ele) => {
        if (val === ele.value) {
          res = ele.label;
        }
      });
      return res;
    },
    delChild(index) {
      console.log(index);
      this.formItem.children.splice(index, 1);
    },
    addAccount() {
      let flag = true;
      this.formItem.roleList = [this.formItem.role]
      if (flag) {
        this.$cloudbase.callFunction({
          name: 'operations',
          data: {
            type: 'roleConfigSave',
            data: this.formItem,
          }
        }).then(res => {
          console.log('roleConfigSave result:', res);
          if (res.result.success) {
            this.$message({
              message: `创建成功`,
              type: 'success'
            });
            this.searchRoleList(1);
          }
        }).catch(err => {
          this.$message({
            message: `创建失败`,
            type: 'warning'
          });
          console.error('roleConfigSave error:', err)
        });
      }
    },
  }
}
</script>

<style lang="less">
.rolemanagement-page{
  .children-zone{
    height: 50px;
    line-height: 50px;
    border-top: 1px solid rgba(0,0,0,0.1);
    .children-zone-title{
      text-indent: 7px;
    }
    .del-btn{
      vertical-align: top;
      margin: 4px 0 0 10px;
    }
  }
}
</style>