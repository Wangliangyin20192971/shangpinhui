//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
//使用插件
Vue.use(VueRouter)
//引入store
import store from '../store'
//先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写push、replace方法
//第一个参数：告诉原来的push方法，要往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
};

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
};

//配置路由
let router = new VueRouter({
    //配置路由
    routes,
    scrollBehavior() {
        return { y: 0 }
    }
});

//全局守卫
router.beforeEach(async (to, from, next) => {
    //next()
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if (token) {
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch("getUserInfo");
                    next()
                } catch (error) {
                    await store.dispatch("userLogout");
                    next('/login');
                }
            }
        }
    } else {
        let toPath = to.path;
        if (toPath == '/trade' || toPath.indexOf('/center') != -1 || toPath.indexOf('/pay') != -1) {
            next('/login?redirect='+toPath);
        } else {
            next();
        }
    }
});

export default router
