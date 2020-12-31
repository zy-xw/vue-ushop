import { reqseckillList } from "../../utils/http"

let state={
    list:[],
}

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
        reqseckillList().then(res=>{
            if(res.data.code){
                context.commit("changeList",res.data.list)
            }
        })
    }
}
export default {
    state,mutations,getters,actions,
    namespaced:true
}