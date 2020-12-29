import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {actions} from "./action"
import { state,getters, mutations } from "./mutations"

import cate from "./modules/cate"
import banner from "./modules/banner"
import specs from "./modules/specs"

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules:{
        cate,
        banner,
        specs
    }
})