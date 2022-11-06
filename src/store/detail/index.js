import { reqGetGoodsInfo,reqAddOrUpdateShopCart } from '../../api/index'
//封装游客身份模块uuid-->生成一个随机字符串（不能改变）
import { getUUID } from '../../utils/uuid_token'
//detail模块的小仓库
const state = {
    goodInfo: {},
    //游客的临时身份
    uuid_token:getUUID(),
}
const mutations = {
    GOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    },
}
const actions = {
    async getGoodInfo({ commit }, skuId) {
        //给服务器传递一个默认参数，至少是一个空对象，params是当用户派发action时第二个参数传递过来的
        let result = await reqGetGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GOODINFO', result.data)
        }
    },
    async addOrUpdateShopCart({ commit }, {skuId,skuNum}) {
        //给服务器传递一个默认参数，至少是一个空对象，params是当用户派发action时第二个参数传递过来的
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
}
//计算属性，在项目中，为了简化仓库中的数据而生
const getters = {
    //简化路径导航
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    //简化产品信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    //简化售卖属性
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}