import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo,reqLogout } from '../../api/index'
import { setToken,getToken,removeToken } from '../../utils/token'
//登录与注册模块的小仓库
const state = {
    code: '',
    token: getToken(),
    userInfo: {},
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state){
        state.token = '';
        state.userInfo = {};
        removeToken();
    }
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        //给服务器传递一个默认参数，至少是一个空对象，params是当用户派发action时第二个参数传递过来的
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        //服务器下发token，用户唯一标识符（uuid）
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            //持久化存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录
    async userLogout({ commit }) {
        let result = await reqLogout()
        if (result.code == 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
//计算属性，在项目中，为了简化仓库中的数据而生
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}