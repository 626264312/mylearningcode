<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="@/assets/logo.png" alt="logo" />
        <span>管理系统</span>
      </div>
      <el-button type="primary" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '180px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <!-- 二级菜单模板区域 -->
              <template slot="title">
                <!-- 文本 -->
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      //是否折叠
      isCollapse: false,
      //被激活的链接地址
      activePath:''

    };
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //获取所有菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;
      console.log(res.data);
    },
    //点击按钮，菜单折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    //保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath)
      this.activePath = activePath;
    }
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #545c64;
  color: #fff;
  text-align: center;
}
.el-header {
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  align-items: center;
  background-color: #373d41;
  > div {
    display: flex;
    align-items: center;
    img {
      border-radius: 50%;
      width: 55px;
      height: 55px;
    }
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  text-align: center;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
  color: #333;
  text-align: center;
}
a {
  color: #fff;
  text-decoration: none;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>

<style>
.el-submenu__title {
  /* padding-left: 20px !important; */
  text-align: left;
  /* text-indent: 2px; */
}
li.el-menu-item {
  padding-left: 0 !important;
}
</style>