<template>
  <div class="bookmanagement-page">
    <!--查询条件-->
    <div class="yb-common-searchzone">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="预约单号">
              <el-input v-model="form.bookid" size="small" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="主预约人">
              <el-input v-model="form.ownerName" size="small" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预约手机">
              <el-input placeholder="请输入手机号" maxlength="11" v-model="form.ownerPhone" size="small" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预约学生">
              <el-input v-model="form.ownerChildren" size="small" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"> 
            <el-form-item label="预约类型">
              <el-select class="yb-select" v-model="form.bookType" size="small" clearable>
                <el-option
                  v-for="item in bookTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下单时间">
              <el-date-picker
                v-model="form.bookTimeRanger"
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
          <el-button class="yb-button" type="success" size="small">添加预约</el-button>
        </el-col>
        <el-col :span="2">
          <el-button class="yb-button" type="primary" size="small">查询用户</el-button>
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
        <el-table-column fixed prop="ownerName" label="预约人" width="90"></el-table-column>
        <el-table-column prop="ownerPhone" label="预约手机号" width="110"></el-table-column>
        <el-table-column prop="bookType" label="预约类型" width="110">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.bookType === 1" type="primary" disable-transitions>{{filterTagBook(scope.row.bookType)}}</el-tag>
            <el-tag v-if="scope.row.bookType === 2" type="success" disable-transitions>{{filterTagBook(scope.row.bookType)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="预约状态" width="110">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="primary" disable-transitions>{{filterTag(scope.row.status)}}</el-tag>
            <el-tag v-if="scope.row.status === 1" type="success" disable-transitions>{{filterTag(scope.row.status)}}</el-tag>
            <el-tag v-if="scope.row.status === 2" type="danger" disable-transitions>{{filterTag(scope.row.status)}}</el-tag>
            <el-tag v-if="scope.row.status === 3" type="primary" disable-transitions>{{filterTag(scope.row.status)}}</el-tag>
            <el-tag v-if="scope.row.status === 4" type="success" disable-transitions>{{filterTag(scope.row.status)}}</el-tag>
            <el-tag v-if="scope.row.status === 5" type="warning" disable-transitions>{{filterTag(scope.row.status)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lessonTime" label="上课时间" width="160"></el-table-column>
        <el-table-column prop="lessonRoom" label="教室" width="100"></el-table-column>
        <el-table-column prop="originInfo" label="原始发起人信息" width="200">
          <template slot-scope="scope">
            <div>壹本id: {{scope.row.originInfo.yibenid}}</div>
            <div>openid: {{scope.row.originInfo.openid}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="prevInfo" label="转发关联人信息" width="200">
          <template slot-scope="scope">
            <div>壹本id: {{scope.row.prevInfo.yibenid}}</div>
            <div>openid: {{scope.row.originInfo.openid}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="预约创建时间" width="160"></el-table-column>
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
    <!--弹框-->
    <el-dialog
      :title="dialogType === 'look' ? '查看信息' : dialogType === 'creat' ? '新建信息' : '编辑信息'"
      :visible.sync="dialogVisible"
      width="90%">
      <el-form ref="form" :model="formItem" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="预约单号">
              <el-input v-model="formItem.bookid" size="small" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发起人ID">
              <el-input v-model="formItem.originInfo.yibenid" size="small" disabled clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="转发人ID">
              <el-input v-model="formItem.prevInfo.yibenid" size="small" disabled clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预约类型">
              <el-select class="yb-select" v-model="formItem.bookType" size="small" :disabled="dialogType === 'look' || dialogType === 'edit'">
                <el-option
                  v-for="item in bookTypeOptions"
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
            <el-form-item label="是否预付">
              <el-select class="yb-select" v-model="formItem.ifPrepaid" size="small" :disabled="dialogType === 'look'">
                <el-option
                  v-for="item in prepaidTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否到场">
              <el-select class="yb-select" v-model="formItem.ifPresent" size="small" :disabled="dialogType === 'look'">
                <el-option
                  v-for="item in presentTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分配老师">
              <el-input v-model="formItem.matchTeacher" size="small" :disabled="dialogType === 'look'" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="老师电话">
              <el-input v-model="formItem.receptionTeacherPhone" placeholder="请输入手机号" maxlength="11" size="small" :disabled="dialogType === 'look'" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="上课时间">
              <el-date-picker
                class="yb-datetime"
                v-model="formItem.lessonTime"
                type="datetime"
                placeholder="选择日期时间"
                size="small"
                :disabled="dialogType === 'look'"
                clearable>
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="上课教室">
              <el-input v-model="formItem.lessonRoom" size="small" :disabled="dialogType === 'look'" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预约状态">
              <el-select class="yb-select" v-model="formItem.status" size="small" :disabled="dialogType === 'look'">
                <el-option
                  v-for="item in bookStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预约创建时间">
              <el-date-picker
                class="yb-datetime"
                v-model="formItem.createTime"
                type="datetime"
                placeholder="选择日期时间"
                size="small"
                disabled>
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="预约校区">
              <el-select class="yb-select" v-model="formItem.schoolid" size="small" :disabled="dialogType === 'look'">
                <el-option
                  v-for="item in schoolTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="主预约人">
              <el-input v-model="formItem.ownerName" size="small" :disabled="dialogType === 'look'" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="主预约人ID">
              <el-input v-model="formItem.ownerYibenid" size="small" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="主预约人电话">
              <el-input v-model="formItem.ownerPhone" placeholder="请输入手机号" maxlength="11" size="small" :disabled="dialogType === 'look'" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="主预约人学生">
              <el-input
                v-model="formItem.ownerChildrenShow"
                size="small"
                placeholder="多个学生请用英文输入法“#”分割开填写，例如：“小明#小红”"
                :disabled="dialogType === 'look'"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="member-zone" v-if="formItem.bookType === 2">
          <div class="member-zone-title">拼团信息</div>

        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { RightMixin } from "@/plugins/mixin.js";
import { userType, gender, bookType, bookStatus, schoolType, presentType, prepaidType } from '@/utils/common';

export default {
  name: 'BookManagement',
  mixins: [ RightMixin ],
  data() {
    return {
      userTypeOptions: userType,
      genderOptions: gender,
      bookTypeOptions: bookType,
      schoolTypeOptions: schoolType,
      presentTypeOptions: presentType,
      prepaidTypeOptions: prepaidType,
      bookStatusOptions: bookStatus,
      form: {
        schoolid: '',
        bookid: '',
        bookType: '',
        ownerName: '',
        ownerPhone: '',
        ownerChildren: '',
        bookTimeRanger: []
      },
      tableData: [{
        bookid: '123123123131312231',
        bookType: 1,
        originInfo: { yibenid: 'yb1234123123', openid: '123123123231312'},
        prevInfo: { yibenid: 'yb1234123123', openid: '123123123231312'},
        ownerName: '张先生',
        ownerPhone: '13012345678',
        ownerOpenid: '123123123231312',
        ownerYibenid: 'yb1234123123',
        schoolid: 1,
        ownerChildren: ['name'],
        ifPrepaid: 1,
        matchTeacher: 'Tracy',
        ifPresent: 1,
        receptionTeacherPhone: '13012345678',
        createTime: '2025-11-28 15:23:46',
        lessonTime: '2025-12-28 15:00:00',
        lessonRoom: '第五教室',
        status: 2
      }],
      // 分页器
      currentPage: 1,
      totalCount: 0,
      limit: 20,
      // 对话框
      dialogVisible: true,
      dialogType: 'creat', // creat look edit
      formItem: {
        bookid: '',
        bookType: 2,
        originInfo: {
          yibenid: '',
          openid: ''
        },
        prevInfo: {
          yibenid: '',
          openid: ''
        },
        schoolid: 1,
        ownerName: '',
        ownerPhone: '',
        ownerOpenid: '',
        ownerYibenid: '',
        ownerChildren: [],
        ownerChildrenShow: '', // 用于展示
        ifPrepaid: 0, // 后台改
        matchTeacher: '', // 后台改
        ifPresent: 0, // 后台改
        receptionTeacherPhone: '', // 后台改
        createTime: '', // 后台改
        lessonTime: '', // 后台改
        lessonRoom: '', // 后台改
        status: 0, //  0 拼团中 1 已预约 2 校区确认中 3 待使用 4 已使用  5 已取消
      },
      groupInfo: {
        groupInfoid: '',
        bookid: '',
        memberOpenid: '',
        memberYibenid: '',
        memberName: '',
        memberPhone: '',
        memberChildren: [],
      },
    }
  },
  computed: {
  },
  mounted() {
    
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
    },
    handleCurrentChange(val) {
      console.log(`currentPage ${val}`);
      this.currentPage = val;
    },
    filterTag(type) {
      let _text = '';
      bookStatus.forEach(ele => {
        if (ele.value === type) {
          _text = ele.label;
        }
      });
      return _text;
    },
    filterTagBook(type) {
      let _text = '';
      bookType.forEach(ele => {
        if (ele.value === type) {
          _text = ele.label;
        }
      });
      return _text;
    },
  }
}
</script>

<style lang="less">
.bookmanagement-page{
  .member-zone{
    height: 50px;
    line-height: 50px;
    border-top: 1px solid rgba(0,0,0,0.1);
    .member-zone-title{
      text-indent: 7px;
    }
    .del-btn{
      vertical-align: top;
      margin: 4px 0 0 10px;
    }
  }
}
</style>