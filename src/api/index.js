//当前这个模块：API接口进行统一管理
import requests from './request'
import mockRequest from './mockAjax'

//三级联动接口
// /api/product/getBaseCategoryList get 无参数
//发请求：axios发请求返回结果是Promise对象
export const reqGetCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })
//获取banner（home首页轮播图接口）
export const reqGetBannerList = () => mockRequest.get('/banner')
//获取floor（floor接口）
export const reqGetFloorList = () => mockRequest.get('/floor')
//发请求：axios发请求返回结果是Promise对象
//search接口
// /api/list POST 带参数（给服务器传递一个默认参数，至少是一个空对象）
/* {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
} */
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })
//detail接口 获取产品详情
// /api/item/{ skuId } get 带参数（商品id skuid）
export const reqGetGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })
//添加购物车接口
// /api/cart/addToCart/{ skuId }/{ skuNum } post 带参数（商品id、商品数量）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
//获取购物车列表
// /api/cart/cartList get 无参数
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })
//删除购物车商品
// /api/cart/deleteCart/{skuId} delete 有参数
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
//切换商品选中状态
// /api/cart/checkCart/{skuID}/{isChecked} get 有参数
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
//获取注册验证码
// /api/user/passport/sendCode/{phone} get 有参数
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
//注册用户
// /api/user/passport/register post 有参数
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', method: 'post', data })
//登录用户
// /api/user/passport/login post 有参数
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', method: 'post', data })
//登录成功获取用户信息

//登录成功获取用户信息
// api/user/passport/auth/getUserInfo get 无参数
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
//退出登录
// /api/user/passport/logout get 无参数
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })
//获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList get 无参数
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
//获取订单交易页信息
// /api/order/auth/trade get 无参数
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })
//提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo} post 有参数
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data })
//获取订单支付信息
// /api/payment/weixin/createNative/{orderId} get 有参数
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
//查询支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId} get 有参数
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
//获取我的订单列表
// /api/order/auth/{page}/{limit} get 有参数
export const reqMyOrderList = (page,limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
