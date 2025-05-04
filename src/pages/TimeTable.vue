<template>
  <div class="timetable-page">
    <!--查询条件-->
    <div class="yb-common-searchzone">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
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
      </el-form>
    </div>
    <!--按钮区域-->
    <div class="yb-common-btnzone">
      <el-row :gutter="20">
        <el-col :offset="20" :span="2">
          <el-button class="yb-button" type="primary" size="small" @click="getTimeTableBySchoolId()">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button class="yb-button" type="success" size="small" @click="saveTimeTableBySchoolId()">保存修改</el-button>
        </el-col>
      </el-row>
    </div>
    <!--表格区域-->
    <div class="timetable-congfig-zone">
      <div class="day-cyc" v-for="(item, index) in timetableConfig" :key="index">
        <div class="title">
          <div class="text">{{item.title}}</div>
          <div class="select">
            <el-select class="yb-select" v-model="item.isWorkDay" size="small">
              <el-option
                v-for="item in workDayTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <el-button type="primary" style="width:100%" @click="addTeacher(index)" size="small">添加老师</el-button>
        </div>
        <div class="timeline">
          <div class="step">08:00</div>
          <div class="step">09:00</div>
          <div class="step">10:00</div>
          <div class="step">11:00</div>
          <div class="step">12:00</div>
          <div class="step">13:00</div>
          <div class="step">14:00</div>
          <div class="step">15:00</div>
          <div class="step">16:00</div>
          <div class="step">17:00</div>
          <div class="step">18:00</div>
          <div class="step">19:00</div>
          <div class="step">20:00</div>
          <div class="step">21:00</div>
          <div class="step">22:00</div>
        </div>
        <div class="teacher-cyc">
          <div class="teacher-item" v-for="(itemt, indext) in item.teachers" :key="indext">
            <div class="schedule-item"
              v-for="(items, indexs) in itemt.schedule"
              :key="indexs"
              :style="{'height': items.heightRate + 'px', 'top': items.posTop + 'px'}">
              <div class="schedule-item-title" :style="{'backgroundColor': titleColorStep[indext]}">{{items.startTime}} ~ {{items.endTime}}</div>
              <div class="teacher-room">{{itemt.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{items.room}}</div>
              <div class="lessonname">{{items.lesson}}</div>
              <div class="del-btn" @click="delSchdule(index, indext, indexs)">删除</div>
            </div>
            <el-button class="addSchdule-btn" type="primary" @click="addSchdule(index, indext)">添加日程</el-button>
            <el-button class="deleteSchdule-btn" type="danger" @click="deleteTeacher(index, indext)">删除老师</el-button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <!-- 添加老师 -->
    <el-dialog
      :title="'添加老师'"
      :visible.sync="addTeacherDialogVisible"
      width="40%"
      @close="handleCloseAddTeacher">
      <el-input v-model="teacherName" placeholder="请输入任课老师"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddTeacherEnsure" size="small">确认并保存</el-button>
      </span>
    </el-dialog>
    <!-- 添加课程安排 -->
    <el-dialog
      :title="'添加课程安排'"
      :visible.sync="addSchduleDialogVisible"
      width="60%"
      @close="handleCloseAddSchdule">
      <el-form ref="form" :model="formItem" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="9">
            <el-form-item label="开始时间">
              <el-time-select
                class="yb-select"
                @change="startTimeChange"
                placeholder="起始时间"
                v-model="formItem.startTime"
                :picker-options="{
                  start: '08:00',
                  step: '00:05',
                  end: '22:00'
                }">
              </el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="教室">
              <el-input v-model="formItem.room" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="9">
            <el-form-item label="结束时间">
              <el-time-select
                class="yb-select"
                @change="endTimeChange"
                placeholder="结束时间"
                v-model="formItem.endTime"
                :picker-options="{
                  start: '08:00',
                  step: '00:05',
                  end: '22:00'
                }">
              </el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="课程名称">
              <el-input v-model="formItem.lesson" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSchduleEnsure" size="small">确认并保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { RightMixin } from "@/plugins/mixin.js";
import { mapState } from 'vuex';
import { workDayType } from '@/utils/common';

export default {
  name: 'TimeTable',
  mixins: [ RightMixin ],
  data() {
    return {
      workDayTypeOptions: workDayType,
      form: {
        schoolid: 1,
      },
      titleColorStep: ['rgb(50, 151, 253)', 'rgb(8, 190, 166)', 'rgb(233, 120, 15)', 'rgb(160, 23, 240)', 'rgb(23, 240, 77)'],
      detail: {},
      // 数据基础类
      timetableClass: [
        { title: '星期六', isWorkDay: 1, teachers: [
          // {
          //   name: '',
          //   schedule: [
          //     {
          //       startTime: '8:00',
          //       endTime: '10:00',
          //       posTop: 0,
          //       heightRate: 120,
          //       room: '第5教室',
          //       lesson: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          //     }
          //   ]
          // }
        ]},
        { title: '星期日', isWorkDay: 1, teachers: []},
        { title: '星期一', isWorkDay: 1, teachers: []},
        { title: '星期二', isWorkDay: 1, teachers: []},
        { title: '星期三', isWorkDay: 1, teachers: []},
        { title: '星期四', isWorkDay: 1, teachers: []},
        { title: '星期五', isWorkDay: 1, teachers: []},
      ],
      // 用户编辑修改
      timetableConfig: [],
      // 添加老师弹框
      addTeacherDialogVisible: false,
      teacherName: '',
      addDayIndex: -1,
      // 添加课程安排
      addSchduleDialogVisible: false,
      addTeacherIndex: -1,
      formItem: {
        startTime: '',
        endTime: '',
        posTop: 0,
        heightRate: 120,
        room: '',
        lesson: '',
      }
    }
  },
  computed: {
    ...mapState(['schoolOptions']),
  },
  created() {
  },
  mounted() {
    this.getTimeTableBySchoolId();
  },
  methods:{
    async getTimeTableBySchoolId() {
      this.$cloudbase.callFunction({
        name: 'operations',
        data: {
          type: 'schoolRead',
          data: {
            schoolid: this.form.schoolid,
          },
        }
      }).then(res => {
        console.log('schoolRead result', res);
        if (res.result.success) {
          // 先把detail 整个保存
          this.detail = res.result.data[0].detail;
          this.timetableConfig = res.result.data[0].detail.timetableConfig || this.timetableClass;
        }
      }).catch(err => {
        console.error('schoolRead error:', err)
      });
    },
    async saveTimeTableBySchoolId() {
      const params = {
        schoolid: this.form.schoolid,
        detail: Object.assign(this.detail, { timetableConfig: this.timetableConfig }),
      }
      this.$cloudbase.callFunction({
        name: 'operations',
        data: {
          type: 'schoolSave',
          data: params,
        }
      }).then(res => {
        console.log('schoolSave result:', res);
        if (res.result.success) {
          this.$message({
            message: '课程表保存车成功',
            type: 'success'
          });
          this.getTimeTableBySchoolId();
        }
      }).catch(err => {
        console.error('schoolSave error:', err)
      });
    },
    addTeacher(index) {
      console.log(index);
      this.addDayIndex = index;
      this.addTeacherDialogVisible = true;
    },
    handleAddTeacherEnsure() {
      if (this.teacherName.trim()) {
        this.timetableConfig[this.addDayIndex].teachers.push({
          name: this.teacherName.trim(),
          schedule: []
        });
        this.handleCloseAddTeacher();
      } else {
        this.$message({
          message: '请输入任课老师',
          type: 'warning'
        });
      }
    },
    handleCloseAddTeacher() {
      this.addDayIndex = -1;
      this.teacherName = '';
      this.addTeacherDialogVisible = false;
    },
    deleteTeacher(index, indext) {
      this.timetableConfig[index].teachers.splice(indext, 1);
    },
    addSchdule(index, indext) {
      this.addDayIndex = index;
      this.addTeacherIndex = indext;
      this.addSchduleDialogVisible = true;
    },
    startTimeChange(val){
      this.formItem.startTime = val;
    },
    endTimeChange(val){
      this.formItem.endTime = val;
    },
    handleSchduleEnsure() {
      if (!this.formItem.lesson.trim()) {
        this.$message({
          message: '请输入课程名称',
          type: 'warning'
        });
        return;
      } else if (!this.formItem.room.trim()) {
        this.$message({
          message: '请输入教室',
          type: 'warning'
        });
        return;
      } else if (!this.formItem.startTime || !this.formItem.endTime) {
        this.$message({
          message: '请选择开始时间和结束时间',
          type: 'warning'
        });
        return;
      }
      const line = new Date();
      const s = new Date();
      const e = new Date();
      line.setHours(8, 0, 0, 0);
      s.setHours(parseInt(this.formItem.startTime.split(':')[0], 10), parseInt(this.formItem.startTime.split(':')[1], 10), 0, 0);
      e.setHours(parseInt(this.formItem.endTime.split(':')[0], 10), parseInt(this.formItem.endTime.split(':')[1], 10), 0, 0);
      if (e <= s) {
        this.$message({
          message: '结束时间需要晚于开始时间',
          type: 'warning'
        });
        return;
      }
      this.formItem.posTop = (s - line) / (1000 * 60);
      this.formItem.heightRate = (e - s) / (1000 * 60);
      console.log(line, s, e, this.formItem);
      this.timetableConfig[this.addDayIndex].teachers[this.addTeacherIndex].schedule.push(this.formItem);
      this.handleCloseAddSchdule()
    },
    handleCloseAddSchdule() {
      this.addDayIndex = -1;
      this.addTeacherIndex = -1;
      this.addSchduleDialogVisible = false;
      this.formItem = {
        startTime: '',
        endTime: '',
        posTop: 0,
        heightRate: 0,
        room: '',
        lesson: '',
      }
    },
    delSchdule(index, indext, indexs) {
      this.timetableConfig[index].teachers[indext].schedule.splice(indexs, 1);
    }
  }
}
</script>

<style lang="less">
.timetable-page{
  .timetable-congfig-zone{
    padding: 20px;
    .day-cyc{
      position: relative;
      width: 1320px;
      height: 970px;
      margin-bottom: 50px;
      .title{
        float: left;
        width: 100px;
        padding-right: 20px;
        .text{
          text-indent: 10px;
          height: 50px;
          line-height: 40px;
          font-weight: 700;
        }
        .select{
          height: 50px;
        }
      }
      .timeline{
        float: left;
        width: 1100px;
        height: 950px;
        .step{
          height: 60px;
          line-height: 30px;
          text-indent: 10px;
        }
        .step:nth-child(2n){
          background: rgba(150,150,150,0.1);
        }
      }
      .teacher-cyc{
        display: flex;
        position: absolute;
        left: 200px;
        top: 0;
        width: 1000px;
        height: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        .teacher-item{
          flex: 0 0 300px;
          display: inline-block;
          position: relative;
          width: 300px;
          height: 950px;
          .schedule-item{
            position: absolute;
            width: 100%;
            background: #FFF;
            border-radius: 6px;
            box-shadow: 1px 2px 1px rgba(120,120,120,0.1);
            overflow: hidden;
            .schedule-item-title{
              height: 26px;
              line-height: 26px;
              color: #FFF;
              text-indent: 15px;
              font-size: 13px;
            }
            .del-btn{
              width: 50px;
              position: absolute;
              top: 0;
              right: 0;
              height: 26px;
              line-height: 26px;
              text-align: center;
              color: #FFF;
              font-size: 12px;
              cursor: pointer;
            }
            .teacher-room{
              height: 30px;
              line-height: 30px;
              text-indent: 10px;
              font-size: 14px;
            }
            .lessonname{
              width: 280px;
              height: 20px;
              line-height: 20px;
              padding: 0 10px;
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .addSchdule-btn{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50%;
        }
        .deleteSchdule-btn{
          position: absolute;
          bottom: 0;
          right: 0;
          width: 50%;
        }
      }
    }
  }
}
</style>