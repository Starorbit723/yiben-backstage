<template>
  <div class="timetable-page">
    <!--查询条件-->
    <div class="yb-common-searchzone">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="起始时间">
              <el-time-select
                @change="timeChange"
                placeholder="起始时间"
                v-model="form.startTime"
                :picker-options="{
                  start: '08:00',
                  step: '00:05',
                  end: '22:00'
                }">
              </el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束时间">
              <el-time-select
                @change="timeChange"
                placeholder="结束时间"
                v-model="form.endTime"
                :picker-options="{
                  start: '08:00',
                  step: '00:05',
                  end: '22:00'
                }">
              </el-time-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="timetable-congfig-zone">
      <div class="day-cyc" v-for="(item,index) in timetableConfig" :key="index">
        <div class="title">
          <div class="text">{{item.title}}</div>
          <div class="select"></div>
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

        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TimeTable',
  data() {
    return {
      form: {
        startTime: '',
        endTime: '',
      },
      timetableConfig: [{
        title: '111111',
        isWorkDay: 1,
        teachers: [
          {
            name: 'Tracy',
            schedule: [
              {
                startTime: '',
                endTime: '',
                posTop: '',
                heightRate: '',
                room: '',
              }
            ]
          }
        ]
      },{
        title: '2222222',
        isWorkDay: 1,
        teachers: [
          {
            name: 'Tracy',
            schedule: [
              {
                startTime: '',
                endTime: '',
                posTop: '',
                heightRate: '',
                room: '',
              }
            ]
          }
        ]
      }]
    }
  },
  mounted() {
    
  },
  methods:{
    startTimeChange(val){
      console.log(val, this.startTime, this.endTime);
    }
  }
}
</script>

<style lang="less">
@import '../assets/style/common.less';
.timetable-page{
  .timetable-congfig-zone{
    padding: 20px;
    .day-cyc{
      position: relative;
      width: 100%;
      min-height: 100px;
      margin-bottom: 50px;
      .title{
        float: left;
        width: 100px;
        .text{
          height: 40px;
          line-height: 40px;
        }
      }
      .timeline{
        float: left;
        width: 1100px;
        height: 750px;
        .step{
          height: 50px;
          line-height: 30px;
          text-indent: 10px;
        }
        .step:nth-child(2n){
          background: rgba(150,150,150,0.1);
        }
      }
      .teacher-cyc{
        position: absolute;
        left: 200px;
        top: 0;
        width: 1000px;
        height: 100%;
      }
    }
  }
}
</style>