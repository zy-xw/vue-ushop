import { reqBannerList } from "../../utils/http";
let state={
    list:[]
}
"banner/list"
let mutations={
    changeList(state,arr){
        state.list=arr;
    }
}
let getters={
    list(state){
        return state.list
    }
}
let actions={
    reqList(context){
        reqBannerList(context).then(res=>{
            if(res.data.code===200){
                context.commit("changeList",res.data.list)
            }
        })
    }
}

export default{
    state,
    mutations,
    getters,
    actions,
    //命名空间
    namespaced:true
}