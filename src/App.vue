<template>
  <div id="app">
    <el-container ref="homePage">
      <!--  header -->
      <el-header>
        <el-col :xs="24" :sm="24">
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" mode="horizontal" router="true">
            <el-menu-item class="hidden-sm-and-down"><img src="./assets/unicom.jpg" style="width: 50px; height: 50px;"></el-menu-item>
            <el-menu-item index="/"><i class="el-icon-house"></i><span class="hidden-sm-and-down">Home</span></el-menu-item>
            <el-menu-item index="/accountList"><i class="el-icon-tickets"></i><span class="hidden-sm-and-down">AccountList</span></el-menu-item>
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-user"></i><span class="hidden-sm-and-down">UserHome</span></template>
              <div>
                <el-menu-item index="/user/login" v-if="!isLogin">Login</el-menu-item>
                <el-menu-item index="/user/register" v-if="!isLogin">Register</el-menu-item>
                <div v-else>
                  <el-menu-item index="/user/root">{{ username }}</el-menu-item>
                  <el-menu-item @click="logout">Logout</el-menu-item>
                </div>
              </div>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-header>

      <!--        导航栏-->
      <el-main :xs="24">

        <router-view></router-view>

      </el-main>

      <el-footer>
        <el-divider content-position="left">
          <router-link to="/about"><i class="el-icon-user"></i></router-link> &nbsp;  今日访问数: {{ num }}
        </el-divider>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        loading: true,
        num: null,
        isLogin: false,
        username: "",
        clientHeight:'',
      }
    },
    mounted() {
      // 获取浏览器可视区域高度
      this.clientHeight = `${document.documentElement.clientHeight}`
      //document.body.clientWidth;
      //console.log(self.clientHeight);
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
    },
    watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      logout: function () {
        this.$axios.get("/apis/user/user_logout")
                .then(response => {
                  // 重载界面
                  window.location.reload()
                })
      },
      changeFixed(clientHeight){ //动态修改样式
        // console.log(clientHeight);
        // console.log(this.$refs.homePage.$el.style.height);
        this.$refs.homePage.$el.style.height = clientHeight-20+'px';
      },
    },
    created () {
      this.$axios.get('/apis/user/get_user_status')
              .then(response => {
                if (response.data.status === 0) {
                  this.isLogin = true;
                  this.username = response.data.username;
                }
              });

      console.log(' _______________########_______________________\n' +
              ' ______________##########_______________________\n' +
              '______________############_____________________\n' +
              '______________#############____________________\n' +
              '_____________##__###########___________________\n' +
              '____________###__######_#####__________________\n' +
              '____________###_#######___####_________________\n' +
              '___________###__##########_####________________\n' +
              '__________####__###########_####_______________\n' +
              '________#####___###########__#####_____________\n' +
              '_______######___###_########___#####___________\n' +
              '_______#####___###___########___######_________\n' +
              '______######___###__###########___######_______\n' +
              '_____######___####_##############__######______\n' +
              '____#######__#####################_#######_____\n' +
              '____#######__##############################____\n' +
              '___#######__######_#################_#######___\n' +
              '___#######__######_######_#########___######___\n' +
              '___#######____##__######___######_____######___\n' +
              '___#######________######____#####_____#####____\n' +
              '____######________#####_____#####_____####_____\n' +
              '_____#####________####______#####_____###______\n' +
              '______#####______;###________###______#________\n' +
              '________##_______####________####______________\n \n \n \n ' +
              '     HeliantHuS:    Vue就是这么酷！  qq:1984441370          ')

    }
  }
</script>

<style>

</style>
