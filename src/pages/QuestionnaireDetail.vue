<template>
  <div class="questionnairedetail-page">
    <!--查询条件-->
    <div class="yb-common-searchzone">
      <el-form ref="form" :model="form" label-width="90px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="壹本id">
              <el-input v-model="form.yibenid" size="small" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6"> 
            <el-form-item label="校区">
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
          <el-col :span="12">
            <el-form-item label="提交时间">
              <el-date-picker
                v-model="form.submitTimeRanger"
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
        <el-col :offset="22" :span="2">
          <el-button v-if="Rlook" class="yb-button" type="primary" size="small" @click="searchQuestionList(0)">查询问卷</el-button>
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
        <el-table-column prop="answerid" label="问卷答案id"></el-table-column>
        <el-table-column prop="yibenid" label="壹本id"></el-table-column>
        <el-table-column prop="createTime" label="提交时间">
          <template slot-scope="scope">
            <div>{{formatDateToShow(scope.row.createTime)}}</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button v-if="Rlook" @click="handleLookDetail(scope.row)" type="text" size="small">查看结果</el-button>
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
      :title="'查看问卷'"
      :visible.sync="dialogVisible"
      @close="handleDialogClose"
      width="90%">
      <div class="answer-content">
        <div class="question-item" v-for="(item,index) in answerDetail" :key="index">
          <div class="item-title">
            <span v-if="item.type === 'radio-group'">【单选题】</span>
            <span v-if="item.type === 'checkbox-group'">【多选题】</span>
            <span v-if="item.type === 'textarea'">【主观题】</span>
            <span>{{item.title}}</span>
          </div>
          <div class="answer-zone radio-group" v-if="item.type === 'radio-group'">
            <el-radio v-for="(itemr, indexr) in item.answer" :key="indexr" v-model="itemr.checked" :label="true">{{itemr.name}}</el-radio>
          </div>
          <div class="answer-zone checkbox-group" v-if="item.type === 'checkbox-group'">
            <el-checkbox v-for="(itemr, indexr) in item.answer" :key="indexr" v-model="itemr.checked">{{itemr.name}}</el-checkbox>
          </div>
          <div class="answer-zone textarea" v-if="item.type === 'textarea'">
            <div>{{item.value}}</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { RightMixin } from "@/plugins/mixin.js";
import { formatDate } from '@/utils/common';

export default {
  name: 'QuestionnaireDetail',
  mixins: [ RightMixin ],
  data() {
    return {
      questionnaireid: '',
      form: {
        submitTimeRanger: [],
        yibenid: '',
        schoolid: 1,
      },
      tableData: [{}],
      // 分页器
      currentPage: 1,
      totalCount: 0,
      limit: 20,
      // 对话框
      dialogVisible: false,
      dialogType: 'look',
      // 详情
      answerDetail: [],
    }
  },
  computed: {
    ...mapState(['schoolOptions']),
  },
  created() {
    this.questionnaireid = this.$route.params.questionnaireid;
  },
  mounted() {
    
  },
  methods:{
    searchQuestionList(type) {
      const params = {
        pageNo: type === 0 ? 1 : this.currentPage,
        pageSize: this.limit,
        condition: this.form,
      };
      console.log(params);
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
      if (timeStr) {
        return formatDate(timeStr);
      }
      return '';
    },
    handleLookDetail(row){
      this.answerDetail = row;
      this.answerDetail = [{
        type: 'radio-group',
        title: '123123123123123',
        answer: [
          { id: 1, name: '12312312312', checked: true },
          { id: 2, name: '123123123123', checked: false },
        ]
      },{
        type: 'checkbox-group',
        title: '3213123211312',
        answer: [
          { id: 1, name: '123123123', checked: false },
          { id: 2, name: '1231231231', checked: true },
          { id: 3, name: '1231231231', checked: true },
          { id: 4, name: '1231231231', checked: false },
          { id: 5, name: '123123123', checked: false },
          { id: 6, name: '1231231231', checked: true },
          { id: 7, name: '1231231231', checked: true },
          { id: 8, name: '1231231231', checked: false },
        ]
      },{
        type: 'textarea',
        title: '2131231212312312',
        value: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
      }];
      this.dialogVisible = true;
    },
    handleDialogClose() {
      this.answerDetail = [];
      this.dialogVisible = false;
    },
  }
}
</script>

<style lang="less">
.questionnairedetail-page{
  .answer-content{
    .question-item{
      margin-bottom: 20px;
      .item-title{
        height: 40px;
        line-height: 40px;
        font-weight: 700;
        color: #000;
      }
      .answer-zone{
        padding-left: 10px;
      }
    }
  }
}
</style>