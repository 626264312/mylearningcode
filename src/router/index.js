import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//解决vue-router在3.0版本以上重复点击导航报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


  const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    redirect:'/welcome',
    component: () => import('@/views/Home/Home.vue'),
    children:[
      {path : '/welcome',component: () => import('@/components/Welcome/Welcome.vue')},
      {path : '/users',component: () => import('@/components/User/Users.vue')}
    ]
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 从哪来
  //next 是一个函数，表示放行
  //next('/login')强制跳转
    if(to.path === "/login") return next();
    const tokenStr = window.sessionStorage.getItem('token')
    if(!tokenStr) return next('/login')
    next()
  })

export default router
