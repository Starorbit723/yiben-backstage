<template>
  <div class="usermanagement-page">
    <!--查询条件-->
    <div class="yb-common-searchzone">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="壹本ID">
              <el-input v-model="form.yibenid" size="small" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="微信昵称">
              <el-input v-model="form.nickName" size="small" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号">
              <el-input placeholder="请输入用户手机号" maxlength="11" v-model="form.phoneNumber" size="small" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户类型">
              <el-select class="yb-select" v-model="form.userType" size="small" placeholder="请选择用户类型">
                <el-option
                  v-for="item in userTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--按钮区域-->
    <div class="yb-common-btnzone">
      <el-row :gutter="20">
        <el-col :offset="20" :span="2">
          <el-button class="yb-button" type="success" size="small">添加用户</el-button>
        </el-col>
        <el-col :span="2">
          <el-button class="yb-button" type="primary" size="small" @click="searchUserList()">查询用户</el-button>
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
        <el-table-column fixed prop="parentName" label="父母姓名" width="100"></el-table-column>
        <el-table-column prop="nickName" label="微信昵称" width="120"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" width="120"></el-table-column>
        <el-table-column prop="avatarUrl" label="头像" width="100"></el-table-column>
        <el-table-column prop="point" label="积分" width="100"></el-table-column>
        <el-table-column prop="userType" label="用户类型" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.userType === 0" type="primary" disable-transitions>{{filterTag(scope.row.userType)}}</el-tag>
            <el-tag v-if="scope.row.userType === 1" type="success" disable-transitions>{{filterTag(scope.row.userType)}}</el-tag>
            <el-tag v-if="scope.row.userType === 2" type="warning" disable-transitions>{{filterTag(scope.row.userType)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="children" label="学生信息">
          <template slot-scope="scope">
            <div style="display:inline; margin-right:30px;" v-for="(item, index) in scope.row.children" :key="index">
              姓名：{{item.name}}&nbsp;&nbsp;年龄：{{item.age}}&nbsp;&nbsp;性别：{{genderShow(item.gender)}}
            </div>
          </template>
        </el-table-column>
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
      :title="dialogType === 'look' ? '查看信息': '编辑信息'"
      :visible.sync="dialogVisible"
      @close="handleDialogClose"
      width="80%">
      <el-form ref="form" :model="formItem" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="壹本ID">
              <el-input v-model="formItem.yibenid" size="small" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="openid">
              <el-input v-model="formItem.openid" size="small" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="unionid">
              <el-input v-model="formItem.unionid" size="small" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6"> 
            <el-form-item label="用户类型">
              <el-select class="yb-select" v-model="formItem.userType" size="small" :disabled="dialogType === 'look'">
                <el-option
                  v-for="item in userTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="微信昵称">
              <el-input v-model="formItem.nickName" size="small" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="父母姓名">
              <el-input v-model="formItem.parentName" size="small" :disabled="dialogType === 'look'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号">
              <el-input placeholder="请输入用户手机号" maxlength="11" v-model="formItem.phoneNumber" size="small" :disabled="dialogType === 'look'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="积分">
              <el-input v-model="formItem.point" size="small" :disabled="dialogType === 'look'"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="省">
              <el-input v-model="formItem.province" size="small" :disabled="dialogType === 'look'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="市">
              <el-input v-model="formItem.city" size="small" :disabled="dialogType === 'look'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别">
              <el-select class="yb-select" v-model="formItem.gender" size="small" :disabled="dialogType === 'look'">
                <el-option
                  v-for="item in genderOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="年龄">
              <el-input v-model="formItem.age" size="small" :disabled="dialogType === 'look'"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="children-zone">
          <div class="children-zone-title">学生信息</div>
          <el-row :gutter="20" v-for="(item,index) in formItem.children" :key="index">
            <el-col :span="6">
              <el-form-item label="姓名">
                <el-input v-model="item.name" size="small" :disabled="dialogType === 'look'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="年龄">
                <el-input v-model="item.age" size="small" :disabled="dialogType === 'look'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别">
                <el-select class="yb-select" v-model="item.gender" size="small" :disabled="dialogType === 'look'">
                  <el-option
                    v-for="item in genderOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button class="del-btn" v-if="dialogType === 'edit'" type="danger" size="small" @click="delChild(index)" >删除</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="clearfix"></div>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="dialogType === 'edit'">
        <el-button @click="handleDialogClose" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="addChild()" >添加学生</el-button>
        <el-button type="primary" @click="handleDialogEnsure" size="small">确认并保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userType, gender } from '@/utils/common';

export default {
  name: 'UserManagement',
  data() {
    return {
      userTypeOptions: userType,
      genderOptions: gender,
      dialogVisible: false,
      dialogType: 'look',
      form: {
        yibenid: '',
        nickName: '',
        phoneNumber: '',
        userType: 0,
      },
      tableData: [{
        yibenid: 'yb123456789',
        openid: '121312313',
        unionid: '123123123123',
        nickName: '123123123123',
        parentName: '啊啊啊',
        phoneNumber: '13012345678',
        point: '900000',
        avatarUrl: '',
        city: '',
        country: '',
        province: '',
        gender: 0,
        language: '',
        age: '',
        userType: 0,
        children: [{
          name: '12312312',
          age: '12',
          gender: 1,
        }, {
          name: '12312312',
          age: '12',
          gender: 2,
        }]
      },{
        yibenid: 'yb123456789',
        openid: '121312313',
        unionid: '123123123123',
        nickName: '123123123123',
        parentName: '啊啊啊',
        phoneNumber: '13012345678',
        point: '900000',
        avatarUrl: '',
        city: '',
        country: '',
        province: '',
        gender: '',
        language: '',
        age: '',
        userType: 2,
        children: [{
          name: '12312312',
          age: '12',
          gender: 1,
        }, {
          name: '12312312',
          age: '12',
          gender: 2,
        }]
      }],
      // 分页器
      currentPage: 1,
      totalCount: 0,
      limit: 20,
      // 对话框
      formItem: {},
    }
  },
  mounted() {
    
  },
  methods:{
    async searchUserList() {
      console.log(JSON.stringify(this.form), this.currentPage, this.limit);
      // 调用查询预定信息接口
      const params = {
        pageNo: this.currentPage,
        pageSize: this.limit,
        condition: this.form,
      };
      this.$cloudbase.callFunction({
        name: 'operations',
        data: {
          type: 'userManagePage',
          data: params,
        }
      }).then(res => {
        console.log('userManagePage result:', res);
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
        console.error('userManagePage error:', err)
      });
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
      this.dialogType = 'look';
      this.formItem = JSON.parse(JSON.stringify(scope));
      this.dialogVisible = true;
    },
    handleEdit(scope) {
      this.dialogType = 'edit';
      this.formItem = JSON.parse(JSON.stringify(scope));
      this.dialogVisible = true;
    },
    handleDialogClose() {
      this.dialogType = 'look';
      this.dialogVisible = false;
    },
    async handleDialogEnsure() {

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
    addChild() {
      let flag = true;
      this.formItem.children.forEach((ele) => {
        if (!ele.name || !ele.age) {
          flag = false;
        }
      });
      if (flag) {
        this.formItem.children.push({
          name: '',
          age: '',
          gender: 0,
        });
      } else {
        this.$message({
          message: '请确认信息是否填写完成',
          type: 'warning'
        });
      }
    },
  }
}
</script>

<style lang="less">
.usermanagement-page{
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