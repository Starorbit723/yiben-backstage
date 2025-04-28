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
  </div>
</template>

<script>
import { RightMixin } from "@/plugins/mixin.js";
import { userType, gender, bookType, bookStatus } from '@/utils/common';

export default {
  name: 'BookManagement',
  mixins: [ RightMixin ],
  data() {
    return {
      userTypeOptions: userType,
      genderOptions: gender,
      bookTypeOptions: bookType,
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
    }
  },
  computed: {
  },
  mounted() {
    
  },
  methods:{
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
  
}
</style>