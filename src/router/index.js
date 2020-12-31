import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import store from "../store"

function checkEnter(path,next){
  if(store.state.userInfo.menus_url.includes(path)){
    next()
  }else{
    next("/")
  }
}

export let indexRoutes=[
  {
    path:"menu",
    component:()=>import("../pages/menu/menu.vue"),
    name:"菜单管理"
  },
  {
    path:"role",
    component:()=>import("../pages/role/role.vue"),
    name:"角色管理"
  },
  {
    path:"manage",
    component:()=>import("../pages/manage/manage.vue"),
    name:"管理员管理"
  },
  {
    path:"cate",
    component:()=>import("../pages/cate/cate.vue"),
    name:"商品分类"
  },
  {
    path:"specs",
    component:()=>import("../pages/specs/specs.vue"),
    name:"商品规格"
  },
  {
    path:"goods",
    component:()=>import("../pages/goods/goods.vue"),
    name:"商品管理"
  },
  {
    path:"member",
    component:()=>import("../pages/member/member.vue"),
    name:"会员管理"
  },
  {
    path:"banner",
    component:()=>import("../pages/banner/banner.vue"),
    name:"轮播图管理"
  },
  {
    path:"seckill",
    component:()=>import("../pages/seckill/seckill.vue"),
    name:"秒杀活动"
  },
]

let router = new Router({
  routes: [
    {
      path:"/login",
      component:()=>import("../pages/login/login"),
      name:"登录"
    },
    {
      path:"/",
      component:()=>import("../pages/index/index.vue"),
      children:[
        {
          path:"",
          component:()=>import("../pages/home/home.vue")
        },
        ...indexRoutes
        
      ]
    },
  ]
})

// //登录拦截
router.beforeEach((to,from,next)=>{
  //如果是去登录 next
  if(to.path==="/login"){
    next()
    return
  }
  //如果不是登录，判断是否已经登录，登录了就next
  if(store.state.userInfo.id){
    next()
    return;
  }
  //否则就去登录页面
  next("/login")
})




export default router
