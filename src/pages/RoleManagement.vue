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
          <el-button class="yb-button" type="success" size="small" @click="creatNewAccount()">创建账号</el-button>
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
        <el-table-column prop="roleList" label="用户权限">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.roleList" disable-transitions>{{filterRoleList(scope.row.roleList)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <div>{{formatDateToShow(scope.row.createTime)}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间">
          <template slot-scope="scope">
            <div>{{formatDateToShow(scope.row.updateTime)}}</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-popconfirm
              title="确认要删除该用户权限吗？"
              style="margin-left: 10px;"
              icon="el-icon-info"
              icon-color="red"
              @confirm="handleDelete(scope.row)">
              <el-button slot="reference" type="text" size="small" class="yiben-danger-color">删除</el-button>
            </el-popconfirm>
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
              <el-select class="yb-select" v-model="formItem.role" size="small" clearable>
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
        <el-button type="primary" @click="handleDialogEnsure()" size="small" v-if="dialogType === 'edit'">确认并保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { RightMixin } from "@/plugins/mixin.js";
import { userType, roleType, formatDate } from '@/utils/common';

export default {
  name: 'RoleManagement',
  mixins: [ RightMixin ],
  data() {
    return {
      requestLock: true,
      userTypeOptions: userType,
      roleTypeOptions: roleType,
      dialogVisible: false,
      dialogType: 'creat',
      form: {
        name: '',
        phoneNumber: '',
      },
      tableData: [{}],
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
      this.dialogType = 'creat';
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
    handleDelete(scope) {
      const params = JSON.parse(JSON.stringify(scope));
      params.roleList = [];
      if (this.requestLock) {
        this.requestLock = false;
        this.$cloudbase.callFunction({
          name: 'operations',
          data: {
            type: 'roleConfigSave',
            data: params,
          }
        }).then(res => {
          console.log('roleConfigSave result:', res);
          if (res.result.success) {
            this.$message({
              message: `删除成功`,
              type: 'success'
            });
            this.searchRoleList(1);
          } else {
            this.$message({
              message: `删除失败`,
              type: 'warning'
            });
          }
          this.requestLock = true;
        }).catch(err => {
          this.$message({
            message: `删除失败`,
            type: 'warning'
          });
          this.requestLock = true;
          console.error('roleConfigSave error:', err)
        });
      }
    },
    handleEdit(scope) {
      this.dialogType = 'edit';
      let _temp = JSON.parse(JSON.stringify(scope));
      _temp.role = _temp.roleList[0];
      this.formItem = _temp;
      console.log('edit', this.formItem);
      this.dialogVisible = true;
    },
    handleDialogClose() {
      this.dialogType = 'creat';
      this.dialogVisible = false;
      this.formItem = {
        name: '',
        phoneNumber: '',
        role: '',
        roleList: [],
      };
    },
    async handleDialogEnsure() {
      if (this.requestLock) {
        this.requestLock = false;
        this.formItem.roleList = [this.formItem.role];
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
              message: `修改成功`,
              type: 'success'
            });
            this.searchRoleList(1);
          } else {
            this.$message({
              message: `修改失败`,
              type: 'warning'
            });
          }
          this.handleDialogClose();
          this.requestLock = true;
        }).catch(err => {
          this.$message({
            message: `修改失败`,
            type: 'warning'
          });
          this.handleDialogClose();
          this.requestLock = true;
          console.error('roleConfigSave error:', err)
        });
      }
    },
    addAccount() {
      if (this.requestLock) {
        this.requestLock = false;
        this.formItem.roleList = [this.formItem.role]
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
          } else {
            this.$message({
              message: `创建失败`,
              type: 'warning'
            });
          }
          this.handleDialogClose();
          this.requestLock = true;
        }).catch(err => {
          this.$message({
            message: `创建失败`,
            type: 'warning'
          });
          this.handleDialogClose();
          this.requestLock = true;
          console.error('roleConfigSave error:', err);
        });
      }
    },
    formatDateToShow(timeStr) {
      if (timeStr) {
        return formatDate(timeStr);
      }
      return '';
    },
    filterRoleList(roleList) {
      let _text = '';
      roleType.forEach(ele => {
        if (ele.value === roleList[0]) {
          _text = ele.label;
        }
      });
      return _text;
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