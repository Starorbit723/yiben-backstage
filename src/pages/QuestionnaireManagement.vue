<template>
  <div class="questionnairemanagement-page">
    <!--查询条件-->
    <div class="yb-common-searchzone">
      <el-form ref="form" :model="form" label-width="90px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="问卷id">
              <el-input v-model="form.questionnaireId" size="small" clearable></el-input>
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
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="form.creatTimeRanger"
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
          <el-button v-if="Rcreat" class="yb-button" type="success" size="small" @click="creatNewQuestionaire()">新建问卷</el-button>
        </el-col>
        <el-col :span="2">
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
        <el-table-column prop="questionnaireId" label="问卷id"></el-table-column>
        <el-table-column prop="title" label="问卷标题"></el-table-column>
        <el-table-column prop="desc" label="用途描述"></el-table-column>
        <el-table-column prop="creatTime" label="创建时间">
          <template slot-scope="scope">
            <div>{{formatDateToShow(scope.row.creatTime)}}</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="170">
          <template slot-scope="scope">
            <el-button v-if="Rlook" @click="handleLook(scope.row)" type="text" size="small">查看</el-button>
            <el-button v-if="Redit" @click="handleCopy(scope.row)" type="text" size="small">复制问卷id</el-button>
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
      :title="dialogType === 'look' ? '查看问卷' : dialogType === 'creat' ? '新建问卷' : ''"
      :visible.sync="dialogVisible"
      @close="handleDialogClose"
      width="90%">
      <el-form ref="form" :model="questionConfig" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="问卷标题">
              <el-input v-model="questionConfig.title" size="small" maxlength="10" placeholder="限10字以内" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="用途描述">
              <el-input v-model="questionConfig.desc" maxlength="25" size="small" placeholder="限25字以内" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="question-config">
          <div class="yb-common-btnzone">
            <el-row :gutter="20">
              <el-col :offset="0" :span="3">
                <el-button class="yb-button" type="success" size="small" @click="addRadio()">+ 单选题</el-button>
              </el-col>
              <el-col :span="3">
                <el-button class="yb-button" type="primary" size="small" @click="addCheckbox()">+ 多选题</el-button>
              </el-col>
              <el-col :span="3">
                <el-button class="yb-button" type="warning" size="small" @click="addTextarea()">+ 主观题</el-button>
              </el-col>
            </el-row>
          </div>
          <div v-for="(item, index) in questionConfig.list" :key="index">
            <!--单选类型-->
            <div class="radio-group-type" v-if="item.type === 'radio-group'">
              <el-row :gutter="20">
                <el-col :span="18">
                  <el-form-item label="单选题目">
                    <el-input v-model="item.title" size="small" maxlength="20" placeholder="限20字以内" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-button style="margin-top: 5px;" type="primary" class="yb-button" size="small" @click="addSingleChoice(index)">添加选项</el-button>
                </el-col>
                <el-col :span="3">
                  <el-button style="margin-top: 5px;" type="danger" class="yb-button" size="small" @click="deleteQuestion(index)">删除题目</el-button>
                </el-col>
              </el-row>
              <el-row :gutter="10" v-for="(itemq, indexq) in item.answer" :key="indexq" style="margin-bottom: 5px;">
                <el-col :offset="1" :span="2" style="line-height: 32px;">选项 {{indexq + 1}}</el-col>
                <el-col :span="10">
                  <el-input v-model="itemq.name" size="small" maxlength="10" placeholder="限10字以内" clearable></el-input>
                </el-col>
                <el-col :offset="0" :span="2" style="line-height: 32px; margin-bottom: 5px;">
                  <el-button type="danger" class="yb-button" size="small" @click="deleteSingleChoice(index, indexq)">删除选项</el-button>
                </el-col>
              </el-row>
            </div>
            <!--多选类型-->
            <div class="radio-group-type" v-if="item.type === 'checkbox-group'">
              <el-row :gutter="20">
                <el-col :span="18">
                  <el-form-item label="多选题目">
                    <el-input v-model="item.title" size="small" maxlength="20" placeholder="限20字以内" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-button style="margin-top: 5px;" type="primary" class="yb-button" size="small" @click="addSingleChoice(index)">添加选项</el-button>
                </el-col>
                <el-col :span="3">
                  <el-button style="margin-top: 5px;" type="danger" class="yb-button" size="small" @click="deleteQuestion(index)">删除题目</el-button>
                </el-col>
              </el-row>
              <el-row :gutter="10" v-for="(itemq, indexq) in item.answer" :key="indexq" style="margin-bottom: 5px;">
                <el-col :offset="1" :span="2" style="line-height: 32px;">选项 {{indexq + 1}}</el-col>
                <el-col :span="10">
                  <el-input v-model="itemq.name" size="small" maxlength="10" placeholder="限10字以内" clearable></el-input>
                </el-col>
                <el-col :offset="0" :span="2" style="line-height: 32px; margin-bottom: 5px;">
                  <el-button type="danger" class="yb-button" size="small" @click="deleteSingleChoice(index, indexq)">删除选项</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>

      </el-form>
      
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { RightMixin } from "@/plugins/mixin.js";
import { formatDate } from '@/utils/common';

export default {
  name: 'QuestionnaireManagement',
  mixins: [ RightMixin ],
  data() {
    return {
      form: {
        schoolid: 1,
        creatTimeRanger: [],
        questionnaireId: ''
      },
      tableData: [{}],
      // 分页器
      currentPage: 1,
      totalCount: 0,
      limit: 20,
      // 对话框
      dialogVisible: true,
      dialogType: 'creat', // creat look edit
      questionConfig: {
        title: '',
        desc: '',
        list: [
          {
            type: 'radio-group',
            title: '',
            answer: [
              { id: '', name: '', checked: 'true' },
              { id: '', name: '', checked: 'false' },
            ]
          }
        ]
      },
    }
  },
  computed: {
    ...mapState(['schoolOptions']),
  },
  mounted() {
    
  },
  methods:{
    searchQuestionList(type) {
      console.log(type);
    },
    creatNewQuestionaire() {
      this.dialogType = 'creat';
      this.dialogVisible = true;
    },
    handleDialogClose() {
      this.dialogVisible = false;
      this.questionConfig = {
        title: '',
        desc: '',
        list: []
      };
    },
    handleLook(row) {
      console.log(row);
    },
    handleCopy(row) {
      console.log(row);
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
    // 添加单选题
    addSingleChoice(index) {
      if (this.questionConfig.list[index].answer.length <= 3) {
        this.questionConfig.list[index].answer.push({
          id: '',
          name: '',
          checked: false,
        });
        this.questionConfig.list[index].answer.forEach((ele, index) => {
          ele.id = index + 1;
          index === 0 ? ele.checked = true : ele.checked = false;
        });
        console.log(this.questionConfig.list[index].answer);
      } else {
        this.$message({
          message: '单选题目最多4个选项',
          type: 'warning',
          duration: 1000
        });
        return;
      }
    },
    // 删除单选题
    deleteSingleChoice(index, indexq) {
      if (this.questionConfig.list[index].answer.length >= 3) {
        this.questionConfig.list[index].answer.splice(indexq, 1);
        this.questionConfig.list[index].answer.forEach((ele, index) => {
          ele.id = index + 1;
          index === 0 ? ele.checked = true : ele.checked = false;
        });
        console.log(this.questionConfig.list[index].answer);
      } else {
        this.$message({
          message: '单选题目最少2个选项',
          type: 'warning',
          duration: 1000
        });
        return;
      }
    },
    deleteQuestion(index) {
      console.log(index);
      if (this.questionConfig.list.length >= 2) {
        this.questionConfig.list.splice(index, 1);
      } else {
        this.$message({
          message: '至少保留一个题目',
          type: 'warning',
          duration: 1000
        });
        return;
      }
    },
    addRadio() {
      if (this.questionConfig.list.length <= 9) {
        this.questionConfig.list.push({
          type: 'radio-group',
          title: '',
          answer: [
            { id: 1, name: '', checked: true },
            { id: 2, name: '', checked: false },
          ]
        });
      } else {
        this.$message({
          message: `为了避免用户反感时间占用过多 题目最多创建10道`,
          type: 'warning'
        });
      }
    },
    addCheckbox() {
      if (this.questionConfig.list.length <= 9) {
        this.questionConfig.list.push({
          type: 'checkbox-group',
          title: '',
          answer: [
            { id: 1, name: '', checked: false },
            { id: 2, name: '', checked: false },
          ]
        })
      } else {
        this.$message({
          message: `为了避免用户反感时间占用过多 题目最多创建10道`,
          type: 'warning'
        });
      }
    },
    addTextarea() {
      if (this.questionConfig.list.length <= 9) {
        this.questionConfig.list.push({
        type: 'textarea',
        title: '',
        value: '',
        placeholder: ''
      })
      } else {
        this.$message({
          message: `为了避免用户反感时间占用过多 题目最多创建10道`,
          type: 'warning'
        });
      }
    },
  }
}
</script>

<style lang="less">
.questionnairemanagement-page{
  .question-config{
    .question-title{
      height: 40px;
      line-height: 40px;
    }
    .radio-group-type{
      margin-top: 25px;
    }
  }
}
</style>