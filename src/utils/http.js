import axios from "axios"
import qs from "qs"
import Vue from "vue"
import { erroralert } from "./alert"
import store from "../store"
import router from "../router"
import { data } from "autoprefixer"

//开发环境使用8080
let baseUrl="/api"
Vue.prototype.$pre="http://localhost:3000"

//生产环境使用 打包
// let baseUrl=""
// Vue.prototype.$pre=""


//请求拦截:设置请求头
axios.interceptors.request.use(config=>{
    if(config.url!==baseUrl+"/api/userlogin"){
        config.headers.authorization=store.state.userInfo.token
    }
    return config
})



//响应拦截
axios.interceptors.response.use(res=>{
       //18.统一处理失败
       if (res.data.code !== 200) {
        erroralert(res.data.msg)
    }
    //统一处理list是null的情况
    if(!res.data.list){
        res.data.list=[]
    }
    console.group("本次请求的地址是："+res.config.url)
    console.log(res)
    console.groupEnd()
    //18.统一处理失败
    if(res.data.code!==200){
        erroralert(res.data.msg)
    }
    //掉线处理
    if(res.data.msg==="登录已过期或访问权限受限"){
        //清除用户登录的信息 userInfo
        store.dispatch("changeUser",{})
        //跳到登录页面
        router.push("/login")
    }
    return res
})



//post 带有文件，参数转换
function dataToFormData(user){
    let data=new FormData()
    for(let i in user){
        data.append(i,user[i])
    }
    return data
}



//登录
export let reqLogin = (user) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(user)
    })
}



//--------------------------home----------------------------


//添加
export const reqMenuAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:qs.stringify(user)
    })
}

//列表请求
export let reqMenuList=()=>{
    return axios({
        url:baseUrl+"/api/menulist",
        params:{
            istree:true
        }
    })
}

//删除
export let reqMenuDel=(obj)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:qs.stringify(obj)
    })
}

//编辑
export let reqMenuDetail=(obj)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        params:obj
    })
}

//修改
export let reqMenuUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(user)
    })
}


//----------------------------------角色---------------------------------------

// 角色添加
export let reqRoleAdd=(role)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data:qs.stringify(role)
    })
}

// 角色列表
export let reqRoleList=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
    })
}


// 角色删除
export let reqRoleDel=(id)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:qs.stringify(id)
    })
}


// 角色获取
export let reqRoleGet=(id)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:"get",
        params:id
    })
}

// 角色修改
export let reqRoleUpdate=(id)=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(id)

    })
}

//------------------------管理员-----------------------
//管理员添加
export let reqManageAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:qs.stringify(user)

    })
}

//管理员列表 obj={page:1,size:50}
export let reqManagelist = (obj) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method:"get",
        params:obj
    })
}

//管理员编辑
export let reqManageInfo=(id)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:id
    })
}

//修改
export let reqManageEdit=(user)=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(user)
    })
}

//删除
export let reqManageDel=(id)=>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:"post",
        data:id
    })
}

//计算分页
export let reqManageCount=()=>{
    return axios({
        url:baseUrl+"/api/usercount"
    })
}

//-------------------------商品分类--------------------------------

//商品添加
export let reqCateAdd=(user)=>{
    /* 
    let data=new FormData()
    data.append("img",file)
    data.append("catename","123")
    data.append("pid",1)
     */
    /* 
    let data=new FormData()
    for(let i in user){
        data.append(i,user[1])
    }
     */
    return axios({
        url:baseUrl+"/api/cateadd",
        method:"post",
        data:dataToFormData(user)
    })
}

//获取商品分类列表
export let reqcatelist=(p)=>{
    return axios({
        url:baseUrl+"/api/catelist",
        params:p
    })
}

//商品分类获取
export let reqCateInfo=(id)=>{
    return axios({
        url:baseUrl+"/api/cateinfo",
        method:"get",
        params:id
    })
}

//修改
export let reqCateEdit=(user)=>{
    return axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:dataToFormData(user)
    })
}

//删除
export let reqCateDel=(id)=>{
    return axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data:id
    })
}


//------------------------------------轮播图-------------------------------

//商品添加
export let reqBannerAdd=(user)=>{
   
    return axios({
        url:baseUrl+"/api/banneradd",
        method:"post",
        data:dataToFormData(user)
    })
}

//获取轮播图列表
export let reqBannerList=()=>{
    return axios({
        url:baseUrl+"/api/bannerlist",
    })
}

//轮播图获取
export let reqBannerInfo=(id)=>{
    return axios({
        url:baseUrl+"/api/bannerinfo",
        method:"get",
        params:id
    })
}


//轮播图修改
export let reqBannerEdit=(user)=>{
    return axios({
        url:baseUrl+"/api/banneredit",
        method:"post",
        data:dataToFormData(user)
    })
}

//删除
export let reqBannerDel=(id)=>{
    return axios({
        url:baseUrl+"/api/bannerdelete",
        method:"post",
        data:id
    })
}





//----------------------会员管理----------------------

//会员列表
export let reqMemberList=()=>{
    return axios({
        url:baseUrl+"/api/memberlist",
        method:"get"
    })
}

//会员获取
export let reqMemberInfo=(id)=>{
    return axios({
        url:baseUrl+"/api/memberinfo",
        method:"get",
        params:id
    })
}

//会员修改
export let reqMemberEdit=(user)=>{
    return axios({
        url:baseUrl+"/api/memberedit",
        method:"post",
        data:user
    })
}


//---------------------商品规格----------------------------

//商品规格添加
export let reqSpecsAdd = (user) =>{
    return axios({
        url:baseUrl+"/api/specsadd",
        method:"post",
        data:qs.stringify(user)
    })
}

//列表
export let reqspecslist = (p) =>{
    return axios({
        url:baseUrl+"/api/specslist",
        params:p
    })
}

// 详情
export let reqspecsDetail = (user) =>{
    return axios({
        url:baseUrl + "/api/specsinfo",
        method:"get",
        params:user
    })
}

// 修改
export let reqspecsUpdate = (user) =>{
    return axios({
        url:baseUrl+"/api/specsedit",
        method:"post",
        data:qs.stringify(user)
    })
}

//删除
export let reqspecsDel =(user) =>{
    return axios({
        url:baseUrl+"/api/specsdelete",
        method:"post",
        data:qs.stringify(user)
    })
}

//总数 
export let reqspecsCount=()=>{
    return axios({
        url:baseUrl+"/api/specscount"
    })
}


//--------------------商品管理---------------------
export let reqgoodsAdd = (user) =>{
    return axios({
        url:baseUrl+"/api/goodsadd",
        method:"post",
        data:dataToFormData(user)
    })
}

//列表 p={page:1,size:500}
export let reqgoodslist = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        params:p
    })
}

//详情 user={id:1}
export let reqgoodsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,goodsname:""}
export let reqgoodsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: dataToFormData(user)
    })
}

//删除 user={id:1}
export let reqgoodsDel = (user) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

//总数
export let reqgoodsCount=()=>{
    return axios({
        url:baseUrl+"/api/goodscount"
    })
}



//--------------------限时秒杀--------------------


//限时秒杀添加
export let reqseckillAdd = (user)=>{
    return axios({
        url:baseUrl+"/api/seckadd",
        method:"post",
        data:qs.stringify(user)
    })
}

//限时秒杀列表
export let reqseckillList = (p)=>{
    return axios({
        url:baseUrl+"/api/secklist",
        params:p
    })
}

//限时秒杀获取一条
export let reqseckillInfo = (id) =>{
    return axios({
        url:baseUrl+"/api/seckinfo",
        method:"get",
        params:id
    })
}

//限时秒杀修改

export let reqseckEdit = (user) =>{
    return axios({
        url:baseUrl+"/api/seckedit",
        method:"post",
        data:qs.stringify(user)
    })
}

//限时秒杀删除

export let reqseckillDel = (user) =>{
    return axios({
        url:baseUrl+"/api/seckdelete",
        method:"post",
        data:qs.stringify(user)
    })
}