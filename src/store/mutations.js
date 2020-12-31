// // 在仓库中存数据，会方便组件的取值，但是刷新就没了；本地存储刷新数据还会在。所以准备同步本地存储和状态层。
export let state={
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{}
}
export let getters={
    userInfo(state){
        return state.userInfo
    }
}
export let mutations={
    changeUserInfo(state,obj){
        state.userInfo=obj;
        //同步到本地存储
        if(obj.username){
            sessionStorage.setItem("userInfo",JSON.stringify(obj))
        }else{
            sessionStorage.removeItem("userInfo")
        }
    }
}