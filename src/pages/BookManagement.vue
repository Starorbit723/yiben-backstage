<template>
  <div class="bookmanagement-page">
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
        
      </el-form>
    </div>
  </div>
</template>

<script>
import { RightMixin } from "@/plugins/mixin.js";
import { userType, gender } from '@/utils/common';

export default {
  name: 'BookManagement',
  mixins: [ RightMixin ],
  data() {
    return {
      userTypeOptions: userType,
      genderOptions: gender,
      form: {
        yibenid: '',
        nickName: '',
        phoneNumber: '',
        userType: 0,
      },
    }
  },
  computed: {
  },
  mounted() {
    
  },
  methods:{
    
  }
}
</script>

<style lang="less">
.bookmanagement-page{
  
}
</style>