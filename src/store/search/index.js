import {reqGetSearchInfo} from '../../api/index'
//search模块的小仓库
const state = {
    searchList:{}
}
const mutations = {
    SEARCHINFO(state,searchList){
        state.searchList = searchList
    },
}
const actions = {
    async getSearchInfo({commit},params={}){
        //给服务器传递一个默认参数，至少是一个空对象，params是当用户派发action时第二个参数传递过来的
        let result = await reqGetSearchInfo(params)
        if(result.code==200){
            commit('SEARCHINFO',result.data)
        }
    },
}
//计算属性，在项目中，为了简化仓库中的数据而生
const getters = {
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}