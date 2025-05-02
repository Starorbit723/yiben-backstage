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
        <!-- <el-col :offset="20" :span="2">
          <el-button class="yb-button" type="success" size="small" @click="creatNewBook()">添加预约</el-button>
        </el-col> -->
        <el-col :offset="22" :span="2">
          <el-button class="yb-button" type="primary" size="small" @click="searchBookList(0)">查询用户</el-button>
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
        <el-table-column prop="originYibenid" label="原始发起人id" width="100"></el-table-column>
        <el-table-column prop="prevYibenid" label="转发关联人id" width="100"></el-table-column>
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
      @close="handleDialogClose"
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
              <el-input v-model="formItem.originYibenid" size="small" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="转发人ID">
              <el-input v-model="formItem.prevYibenid" size="small" disabled></el-input>
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
                  v-for="item in schoolOptions"
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
        <!--拼团信息-->
        <div class="member-zone" v-if="formItem.bookType === 2">
          <div class="member-zone-title">拼团信息</div>
          <div class="group-member" v-for="(gitem, gindex) in groupInfoList" :key="gindex">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="拼团人">
                  <el-input v-model="gitem.memberName" size="small" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="拼团人电话">
                  <el-input v-model="gitem.memberPhone" placeholder="请输入手机号" maxlength="11" size="small" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="拼团人学生">
                  <el-input
                    v-model="gitem.ownerChildrenShow"
                    size="small"
                    placeholder="多个学生请用英文输入法“#”分割开填写，例如：“小明#小红”"
                    disabled></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="3">
                <el-button class="del-btn" v-if="dialogType === 'creat' || dialogType === 'edit'" type="danger" size="small" @click="delMember(gindex)" >删除</el-button>
              </el-col> -->
            </el-row>
          </div>
          <div class="clearfix"></div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="dialogType === 'creat' || dialogType === 'edit'">
        <el-button @click="handleDialogClose" size="small">取 消</el-button>
        <!-- <el-button v-if="formItem.bookType === 2" type="primary" size="small" @click="addMenber()" >添加拼团人</el-button> -->
        <el-button type="primary" @click="handleDialogEnsure" size="small">确认并保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { RightMixin } from "@/plugins/mixin.js";
import { userType, gender, bookType, bookStatus, presentType, prepaidType, arrayToString } from '@/utils/common';

export default {
  name: 'BookManagement',
  mixins: [ RightMixin ],
  data() {
    return {
      userTypeOptions: userType,
      genderOptions: gender,
      bookTypeOptions: bookType,
      presentTypeOptions: presentType,
      prepaidTypeOptions: prepaidType,
      bookStatusOptions: bookStatus,
      form: {
        schoolid: 1,
        bookid: '',
        bookType: '',
        ownerName: '',
        ownerPhone: '',
        bookTimeRanger: []
      },
      tableData: [{
        bookid: '123123123131312231',
        bookType: 2,
        originYibenid: '213123123123312',
        originOpenid: '213123123123312',
        prevYibenid: '213123123123312',
        prevOpenid: '213123123123312',
        ownerName: '张先生',
        ownerPhone: '13012345678',
        ownerOpenid: '123123123231312',
        ownerYibenid: 'yb1234123123',
        schoolid: 1,
        ownerChildren: ['name', 'name2'],
        ifPrepaid: '0',
        matchTeacher: 'Tracy',
        ifPresent: '0',
        receptionTeacherPhone: '13012345678',
        createTime: '2025-11-28 15:23:46',
        lessonTime: '2025-12-28 15:00:00',
        lessonRoom: '第五教室',
        status: 1
      },{
        bookid: '66666666666',
        bookType: 1,
        originYibenid: '213123123123312',
        originOpenid: '213123123123312',
        prevYibenid: '213123123123312',
        prevOpenid: '213123123123312',
        ownerName: '张先生',
        ownerPhone: '13012345678',
        ownerOpenid: '123123123231312',
        ownerYibenid: 'yb1234123123',
        schoolid: 1,
        ownerChildren: ['name', 'name2'],
        ifPrepaid: '0',
        matchTeacher: 'Tracy',
        ifPresent: '0',
        receptionTeacherPhone: '13012345678',
        createTime: '2025-11-28 15:23:46',
        lessonTime: '2025-12-28 15:00:00',
        lessonRoom: '第五教室',
        status: 1
      }],
      // 分页器
      currentPage: 1,
      totalCount: 0,
      limit: 20,
      // 对话框
      dialogVisible: false,
      dialogType: 'edit', // creat look edit
      formItem: {
        bookid: '',
        bookType: 1,
        originYibenid: '',
        originOpenid: '',
        prevYibenid: '',
        prevOpenid: '',
        schoolid: 1,
        ownerName: '',
        ownerPhone: '',
        ownerOpenid: '',
        ownerYibenid: '',
        ownerChildren: [],
        ownerChildrenShow: '', // 用于展示
        ifPrepaid: '0', // 后台改
        matchTeacher: '', // 后台改
        ifPresent: '0', // 后台改
        receptionTeacherPhone: '', // 后台改
        createTime: '', // 后台改
        lessonTime: '', // 后台改
        lessonRoom: '', // 后台改
        status: 0, //  0 拼团中 1 已预约 2 校区确认中 3 待使用 4 已使用  5 已取消
        groupInfoList: [],
      },
      formItemCreat: {
        bookid: '',
        bookType: 1,
        originYibenid: '',
        originOpenid: '',
        prevYibenid: '',
        prevOpenid: '',
        schoolid: 1,
        ownerName: '',
        ownerPhone: '',
        ownerOpenid: '',
        ownerYibenid: '',
        ownerChildren: [],
        ownerChildrenShow: '', // 用于展示
        ifPrepaid: '0', // 后台改
        matchTeacher: '', // 后台改
        ifPresent: '0', // 后台改
        receptionTeacherPhone: '', // 后台改
        createTime: '', // 后台改
        lessonTime: '', // 后台改
        lessonRoom: '', // 后台改
        status: 1, //  0 拼团中 1 已预约 2 校区确认中 3 待使用 4 已使用  5 已取消
      },
      // 拼团信息
      groupInfoList: [{
        groupInfoid: '',
        bookid: '',
        memberOpenid: '',
        memberYibenid: '',
        memberName: '',
        memberPhone: '',
        memberChildren: [],
        ownerChildrenShow: '',
      },{
        groupInfoid: '',
        bookid: '',
        memberOpenid: '',
        memberYibenid: '',
        memberName: '',
        memberPhone: '',
        memberChildren: [],
        ownerChildrenShow: '',
      }],
      // 用于初始化数据格式
      groupInfoItem: {
        groupInfoid: '',
        bookid: '',
        memberOpenid: '',
        memberYibenid: '',
        memberName: '',
        memberPhone: '',
        memberChildren: [],
        ownerChildrenShow: '',
      },
    }
  },
  computed: {
    ...mapState(['schoolOptions']),
  },
  mounted() {
  },
  methods:{
    // 添加新预约
    // creatNewBook() {},
    // 查询预约用户 
    searchBookList(type) {
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
          type: 'bookManagePage',
          data: params,
        }
      }).then(res => {
        console.log('bookManagePage result:', res);
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
        console.error('bookManagePage error:', err)
      });
    },
    // 查看单条信息
    handleLook(row) {
      this.formItem = JSON.parse(JSON.stringify(row));
      this.formItem.ownerChildrenShow = arrayToString(this.formItem.ownerChildren);
      this.dialogType = 'look';
      // 如果是拼团，需要再请求成员接口
      if (this.formItem.bookType === 2) {
        // this.groupInfo = XXXX;
        
        this.dialogVisible = true;
      } else {
        this.dialogVisible = true;
      }
    },
    handleEdit(row) {
      this.formItem = JSON.parse(JSON.stringify(row));
      this.formItem.ownerChildrenShow = arrayToString(this.formItem.ownerChildren);
      this.dialogType = 'edit';
      // 如果是拼团，需要再请求成员接口
      if (this.formItem.bookType === 2) {
        // this.groupInfo = XXXX;
        
        this.dialogVisible = true;
      } else {
        this.dialogVisible = true;
      }
    },
    // addMenber() {
    // },
    // delMember(gindex) {
    //   console.log(gindex);
    // },
    handleDialogEnsure() {
      // 保存主订单信息
      console.log(JSON.stringify(this.formItem));
      // 调用查询预定信息接口
      const params = this.formItem;
      this.$cloudbase.callFunction({
        name: 'operations',
        data: {
          type: 'bookModify',
          data: params,
        }
      }).then(res => {
        console.log('bookModify result:', res);
        if (res.result.success) {
          this.$message({
            message: `修改成功`,
            type: 'success'
          });
          this.searchBookList(1);
          this.dialogVisible = false;
        }
      }).catch(err => {
        console.error('bookManagePage error:', err);
        this.$message({
          message: `修改失败`,
          type: 'warning'
        });
        this.dialogVisible = false;
      });
    },
    handleDialogClose() {
      this.dialogVisible = false;
      this.dialogType = 'look';
    },
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
    line-height: 50px;
    border-top: 1px solid rgba(0,0,0,0.1);
    .member-zone-title{
      text-indent: 7px;
    }
    .del-btn{
      vertical-align: top;
      margin: 4px 0 0 10px;
    }
    .group-member{

    }
  }
}
</style>