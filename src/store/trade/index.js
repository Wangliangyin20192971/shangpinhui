import { reqAddressInfo,reqOrderInfo } from '../../api/index'
//结算模块的小仓库
const state = {
    address:[],
    orderInfo:{}
}
const mutations = {
    USERADDRESS(state,address){
        state.address = address
    },
    ORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}
const actions = {
    async getUserAddress({ commit }){
        let result = await reqAddressInfo();
        if(result.code == 200){
            commit('USERADDRESS',result.data)
        }
    },
    async getOrderInfo({ commit }){
        let result = await reqOrderInfo();
        if(result.code == 200){
            commit('ORDERINFO',result.data)
        }
    },
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}