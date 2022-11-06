import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '../../api/index'
//shopcart模块的小仓库
const state = {
    cartList: []
}
const mutations = {
    CARTLIST(state, cartList) {
        state.cartList = cartList
    },
}
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('CARTLIST', result.data)
        }
    },
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    deleteAllCheckedCart({ dispatch, getters }) {
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    },
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    }
}
//计算属性，在项目中，为了简化仓库中的数据而生
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}