//引入一级路由组件
//import Home from '@/pages/Home'
//import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

//路由配置信息
export default [
    {
        path: "/center",
        component: Center,
        meta: { showFooter: true },
        children: [
            {
                path: "myorder",
                component: MyOrder,
            },
            {
                path: "grouporder",
                component: GroupOrder,
            },
            {
                path: "/center",
                redirect: "/center/myorder"
            },
        ]
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: { showFooter: true },
    },
    {
        path: "/pay",
        component: Pay,
        meta: { showFooter: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        },
    },
    {
        path: "/trade",
        component: Trade,
        meta: { showFooter: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        },
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: { showFooter: true },
    },
    {
        path: "/addcartsuccess",
        component: AddCartSuccess,
        meta: { showFooter: true },
        name: 'addcartsuccessRoute',
    },
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: { showFooter: true }
    },
    {
        path: "/home",
        component: ()=>import('@/pages/Home'),
        meta: { showFooter: true }
    },
    {
        path: "/search/:keyword?",
        component: ()=>import('@/pages/Search'),
        meta: { showFooter: true },
        name: 'searchRoute',
        //路由组件能不能传递props数据？
        //第一种：布尔值写法，只能传递params参数
        //props:true
        //第二种：对象写法，额外给路由组件传递一些props
        //props:{a:1,b:2}
        //第三种：函数写法，可以把params参数、query参数，通过props传递给路由组件
        props: ($route) => ({ keyword: $route.params.keyword })
    },
    {
        path: "/login",
        component: Login,
        meta: { showFooter: false }
    },
    {
        path: "/register",
        component: Register,
        meta: { showFooter: false }
    },
    //重定向，在项目跑起来的时候，访问/，立马让它定向到首页
    {
        path: '*',
        redirect: "/home"
    },
    {
        path:'/communication',
        component:()=>import('@/pages/Communication/Communication'),
        children:[
            {
                path:'event',
                component:()=>import('@/pages/Communication/EventTest/EventTest'),
                meta:{
                    isHideFooter:true,
                },
            },
            
        ]
    }
]