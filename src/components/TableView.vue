<template>
  <div class="tableview-content">
    <div class="thead ellipsis clearfix" :style="{display: tableData.tableConfig.suitable ? 'flex' : 'block'}">
      <div v-if="!tableData.tableConfig.suitable">
        <div v-for="(item,index) in tableData.thead" :key="item.th" class="th-item-no-suitable" :style="{width: tableData.tableConfig.width[index] + '%'}">{{item.th}}</div>
      </div>
      <div v-if="tableData.tableConfig.suitable">
        <div v-for="item in tableData.thead" :key="item.th" class="th-item-suitable">{{item.th}}</div>
      </div>
    </div>
    <div class="tbody">
      <div v-for="(item,index) in tableData.tbody" :key="index" class="row clearfix">
        <div class="row-inner" v-if="!tableData.tableConfig.suitable">
          <div 
            v-for="(item2,index2) in item"
            :key="index2"
            :class="{'col-item-no-suitable': true, 'focus': item2.focus}"
            :style="{width: tableData.tableConfig.width[index2] + '%'}">
            <div class="inner"
              :style="{textAlign: tableData.tableConfig.align[index2] ? tableData.tableConfig.align[index2] : 'center'}">{{item2.txt}}</div>
          </div>
        </div>
        <div class="row-inner" v-if="tableData.tableConfig.suitable">
          <div v-for="(item2,index2) in item" :key="index2" :class="{'col-item-suitable': true, 'focus': item2.focus}">
            <div class="inner">{{item2.txt}}</div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableView',
  props: {
    a: {
      type: Number,
    },
    tableData: {
      type: Object,
    },
  },
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';

.tableview-content{
  margin-top: 20px;
  .thead{
    height: 36px;
    line-height: 36px;
    font-size: 12px;
    color: @table-title;
    background-color: @theme-color25;
    font-weight: 600;
    text-align: center;
    .th-item-suitable{
      flex: 1;
    }
    .th-item-no-suitable{
      float: left;
    }
  }
  .tbody{
    font-size: 14px;
    color: @table-text;
    .row{
      .row-inner{
        display: flex;
        align-items: stretch;
        min-height: 20px;
        height: auto;
        padding: 15px 0;
        border-bottom: 1px solid @theme-color10;
        .col-item-suitable {
          flex: 1;
          display: flex;
          align-items: center;
          .inner{
            width: 100%;
            line-height: 20px;
            text-align: center;
          }
          .inner:hover{
            color: @theme-color100;
          }
        }
        .col-item-no-suitable {
            float: left;
            display: flex;
            align-items: center;
            .inner{
              width: 100%;
              line-height: 20px;
            }
            .inner:hover{
              color: @theme-color100;
            }
        }
        .col-item-suitable.focus, .col-item-no-suitable.focus{
          color: @warn-focus-color;
        }
      }
    }
  }
}
</style>
