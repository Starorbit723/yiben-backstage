<template>
  <div class="nav-menu">
    <a class="logo" href="/home">
      <img src="../assets/images/logo-page.png" />
    </a>
    <div class="slide-zone">
      <div class="nav-level1" v-for="item in cRouter" :key="item.title">
        <div class="nav-level1-title">{{item.cnTitle}}</div>
        <div class="nav-leve2" v-for="item2 in item.children" :key="item2.title">
          <div class="nav-level2-title">
            <router-link :to="{ name: item2.title, params: { username: 'erina' }}">
              <span class="cn">{{item2.cnTitle}}</span>
              <span class="en">{{item2.enTitle}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pathData from '@/router/routerPath.json';

export default {
  name: 'NavMenu',
  components: {
  },
  data() {
    return {
      version: '1.0.0',
      routerPath: pathData,
    }
  },
  computed: {
    cRouter() {
      return this.routerPath[this.version.split('.')[0] - 1].routes;
    },
  },
}
</script>

<style lang="less" scoped>
.nav-menu{
  width: 240px;
  height: 100vh;
  box-shadow: 2px 0 2px rgba(0, 71, 83, 0.1);
  user-select: none;
  .logo{
    height: 70px;
    padding: 10px 0;
    img {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .slide-zone{
    padding: 10px 0;
    .nav-level1{
      margin-bottom: 15px;
      .nav-level1-title{
        padding-left: 15px;
        height: 24px;
        line-height: 24px;
        color: rgb(180, 180, 180);
        font-weight: 600;
        font-size: 15px;
      }
      .nav-leve2{
        padding-top: 5px;
        .nav-level2-title{
          a{
            display: block;
            padding-left: 15px;
            height: 36px;
            line-height: 36px;
            text-decoration: none;
            font-size: 14px;
            color: #000;
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .cn {
              margin-right: 15px;
            }
            .en {
              font-size: 14px;
            }
          }
          a:hover{
            color: rgb(3, 189, 173);
            background-color: rgba(78, 241, 228, 0.1);
          }
          a.router-link-active.router-link-exact-active{
            color: rgb(3, 189, 173);
            font-weight: 700;
            border-right: 3px solid rgba(1, 211, 193, 1);
            background-color: rgba(78, 241, 228, 0.1);
          }
        }
      }
    }
  }
}
</style>