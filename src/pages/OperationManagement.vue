<template>
  <div class="operationmanagement-page">
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
        <el-col :offset="22" :span="2">
          <el-button v-if="Rlook" class="yb-button" type="primary" size="small" @click="searchOperateList()">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <!--配置区域 内容灰度开关-->
    <div class="yb-selfconfig-zone">
      <div class="yb-selfconfig-title">
        <el-row>
          <el-col :span="12">小程序 - 内容灰度开关 - 用于审核内容</el-col>
          <el-col :offset="9" :span="3">
            <el-button v-if="Redit" class="yb-button" type="success" size="small" @click="saveAndSubmitcontentSwitch()">保存修改开关设置</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="yb-swiper-config">
        <el-switch
          v-model="contentSwitch"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </div>
    </div>
    <!--配置区域 轮播图-->
    <div class="yb-selfconfig-zone">
      <div class="yb-selfconfig-title">
        <el-row>
          <el-col :span="12">小程序首页 - 轮播广告</el-col>
          <el-col :offset="9" :span="3">
            <el-button v-if="Redit" class="yb-button" type="success" size="small" @click="saveAndSubmitSwiper()">保存修改轮播广告</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="yb-swiper-config">
        <el-form ref="form" label-width="80px">
          <el-row :gutter="20" v-for="(item,index) in swiperData" :key="index">
            <el-col :span="4">
              <el-form-item label="轮播位置">
                <el-input v-model="item.id" size="small" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="图片链接">
                <el-input v-model="item.imgurl" size="small" placeholder="请从【资源管理】中复制图片链接地址，并粘贴到此处" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <img class="yb-preview-pic" :src="item.imgurl" />
            </el-col>
            <el-col :span="2">
              <el-button v-if="Redit" class="yb-button" type="danger" size="small" @click="deleteSwiperPic(index)">删除</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-button v-if="Redit" class="yb-button" size="small" @click="addSwiperPic()">添加图片</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="yb-separate-line"></div>
    <!--配置区域 热门活动-->
    <div class="yb-selfconfig-zone">
      <div class="yb-selfconfig-title">
        <el-row>
          <el-col :span="12">小程序首页 - 热门活动</el-col>
          <el-col :offset="9" :span="3">
            <el-button v-if="Redit" class="yb-button" type="success" size="small" @click="saveAndSubmitActivity()">保存修改热门活动</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="yb-swiper-config">
        <el-form ref="form" label-width="80px">
          <el-row :gutter="20" v-for="(item,index) in activityData" :key="index">
            <el-col :span="4">
              <el-form-item label="展示位置">
                <el-input v-model="item.id" size="small" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="图片链接">
                <el-input v-model="item.imgurl" size="small" placeholder="请从【资源管理】中复制图片链接地址，并粘贴到此处" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <img class="yb-preview-pic" :src="item.imgurl" />
            </el-col>
            <el-col :span="2">
              <el-button v-if="Redit" class="yb-button" type="danger" size="small" @click="deleteActivity(index)">删除</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-button v-if="Redit" class="yb-button" size="small" @click="addActivityPic()">添加图片</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="yb-separate-line"></div>
    <!--配置区域 用户调查问卷-->
    <div class="yb-selfconfig-zone">
      <div class="yb-selfconfig-title">
        <el-row>
          <el-col :span="12">小程序首页 - 用户调查问卷</el-col>
          <el-col :offset="9" :span="3">
            <el-button v-if="Redit" class="yb-button" type="success" size="small" @click="saveAndSubmitQuestionnaire()">保存修改调查问卷</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="yb-swiper-config">
        <el-form ref="form" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="问卷id">
                <el-input v-model="questionnaireid" size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { RightMixin } from "@/plugins/mixin.js";

export default {
  name: 'OperationManagement',
  mixins: [ RightMixin ],
  data() {
    return {
      form: {
        schoolid: 1,
      },
      detail: {}, // 全部数据
      contentSwitch: false, // 内容展示灰度开关
      swiperData: [], // 轮播广告数据
      activityData: [], // 热门活动配置
      questionnaireid: '', // 用户调查问卷id配置
    }
  },
  computed: {
    ...mapState(['schoolOptions']),
  },
  mounted() {
    this.searchOperateList();
  },
  methods: {
    async searchOperateList() {
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
          this.contentSwitch = res.result.data[0].detail.contentSwitch || false;
          this.swiperData = res.result.data[0].detail.swiperData || this.swiperData;
          this.activityData = res.result.data[0].detail.activityData || this.activityData;
          this.questionnaireid = res.result.data[0].detail.questionnaireid || this.questionnaireid;
        }
      }).catch(err => {
        console.error('schoolRead error:', err)
      });
    },
    saveAndSubmitcontentSwitch() {
      let lock = true;
      if (lock) {
        console.log(this.swiperData);
        const params = {
          schoolid: this.form.schoolid,
          detail: Object.assign(this.detail, { contentSwitch: this.contentSwitch }),
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
              message: '内容灰度开关修改成功',
              type: 'success',
              duration: 1000
            });
            this.searchOperateList();
          }
        }).catch(err => {
          this.$message({
            message: '内容灰度开关修改失败',
            type: 'error',
            duration: 1000
          });
          console.error('schoolSave error:', err)
        });
      }
    },
    addSwiperPic() {
      this.swiperData.push({
        id: this.swiperData.length + 1,
        imgurl: ''
      });
    },
    addActivityPic() {
      this.activityData.push({
        id: this.activityData.length + 1,
        imgurl: ''
      });
    },
    deleteSwiperPic(index) {
      if (this.swiperData.length >= 2) {
        this.swiperData.splice(index, 1);
      } else {
        this.$message({
          message: '至少保留一个轮播广告',
          type: 'warning',
          duration: 1000
        });
        return;
      }
    },
    deleteActivity(index) {
      if (this.activityData.length >= 2) {
        this.activityData.splice(index, 1);
      } else {
        this.$message({
          message: '至少保留一个热门活动',
          type: 'warning',
          duration: 1000
        });
        return;
      }
    },
    saveAndSubmitSwiper() {
      let lock = true;
      this.swiperData.forEach(ele => {
        if (!ele.imgurl) {
          lock = false;
          this.$message({
            message: '轮播广告配置未完整',
            type: 'warning',
            duration: 1000
          });
          return false;
        }
      });
      if (lock) {
        console.log(this.swiperData);
        const params = {
          schoolid: this.form.schoolid,
          detail: Object.assign(this.detail, { swiperData: this.swiperData }),
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
              message: '轮播广告保存成功',
              type: 'success',
              duration: 1000
            });
            this.searchOperateList();
          }
        }).catch(err => {
          this.$message({
            message: '轮播广告保存失败',
            type: 'error',
            duration: 1000
          });
          console.error('schoolSave error:', err)
        });
      }
    },
    saveAndSubmitActivity() {
      let lock = true;
      this.activityData.forEach(ele => {
        if (!ele.imgurl) {
          lock = false;
          this.$message({
            message: '热门活动配置未完整',
            type: 'warning',
            duration: 1000
          });
          return false;
        }
      });
      if (lock) {
        console.log(this.activityData);
        const params = {
          schoolid: this.form.schoolid,
          detail: Object.assign(this.detail, { activityData: this.activityData }),
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
              message: '热门活动保存成功',
              type: 'success',
              duration: 1000
            });
            this.searchOperateList();
          }
        }).catch(err => {
          this.$message({
            message: '热门活动保存失败',
            type: 'error',
            duration: 1000
          });
          console.error('schoolSave error:', err)
        });
      }
    },
    saveAndSubmitQuestionnaire() {
      const params = {
        schoolid: this.form.schoolid,
        detail: Object.assign(this.detail, { questionnaireid: this.questionnaireid }),
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
            message: '调查问卷保存成功',
            type: 'success',
            duration: 1000
          });
          this.searchOperateList();
        }
      }).catch(err => {
        this.$message({
          message: '调查问卷保存失败',
          type: 'error',
          duration: 1000
        });
        console.error('schoolSave error:', err)
      });
    },
  }
};
</script>

<style lang="less">
.operationmanagement-page{
}
</style>