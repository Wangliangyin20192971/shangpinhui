import {reqGetCategoryList,reqGetBannerList,reqGetFloorList} from '../../api/index'
//home模块的小仓库
const state = {
    //state中数据默认初始值不能乱写，根据接口的返回值初始化
    categoryList:[],
    //轮播图的数据
    bannerList:[],
    //floor组件的数据
    floorList:[],
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    BANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    FLOORLIST(state,floorList){
        state.floorList = floorList
    },
}
const actions = {
    //获取三级联动数据
    async categoryList({commit}){
        let result = await reqGetCategoryList()
        if(result.code==200){
            commit('CATEGORYLIST',result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        if(result.code==200){
            commit('BANNERLIST',result.data)
        }
    },
    //获取floor的数据
    async getFloorList({commit}){
        let result = await reqGetFloorList()
        if(result.code==200){
            commit('FLOORLIST',result.data)
        }
    },
}
//计算属性
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}