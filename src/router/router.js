import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const setting = r => require.ensure([], () => r(require('../page/home/setting')), 'setting')
const index = r => require.ensure([], () => r(require('../page/login/index')), 'index')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
// const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
// const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop')
const expireShop = r => require.ensure([], () => r(require('../page/shop/expireShop')), 'expireShop')
const rate = r => require.ensure([], () => r(require('../page/rate/rate')), 'rate')
const rateByType = r => require.ensure([], () => r(require('../page/rate/rateByType')), 'rateByType')
const rateByShop = r => require.ensure([], () => r(require('../page/rate/rateByShop')), 'rateByShop')
const warning = r => require.ensure([], () => r(require('../page/rate/rateWarning')), 'rateWarning')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const policy = r => require.ensure([], () => r(require('../page/login/policy')), 'policy')
const code = r => require.ensure([], () => r(require('../page/login/code')), 'code')
// const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
// const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
// const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
// const orderDetail = r => require.ensure([], () => r(require('../page/order/children/orderDetail')), 'orderDetail')
// const vipcard = r => require.ensure([], () => r(require('../page/vipcard/vipcard')), 'vipcard')
// const invoiceRecord = r => require.ensure([], () => r(require('../page/vipcard/children/invoiceRecord')), 'invoiceRecord')
// const useCart = r => require.ensure([], () => r(require('../page/vipcard/children/useCart')), 'useCart')
// const vipDescription = r => require.ensure([], () => r(require('../page/vipcard/children/vipDescription')), 'vipDescription')
// const food = r => require.ensure([], () => r(require('../page/food/food')), 'food')
const confirmOrder = r => require.ensure([], () => r(require('../page/confirmOrder/confirmOrder')), 'confirmOrder')
const continueOrder = r => require.ensure([], () => r(require('../page/confirmOrder/continueOrder')), 'continueOrder')
// const remark = r => require.ensure([], () => r(require('../page/confirmOrder/children/remark')), 'remark')
// const payment = r => require.ensure([], () => r(require('../page/confirmOrder/children/payment')), 'payment')
// const userValidation = r => require.ensure([], () => r(require('../page/confirmOrder/children/userValidation')), 'userValidation')
// const invoice = r => require.ensure([], () => r(require('../page/confirmOrder/children/invoice')), 'invoice')
// const chooseAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/chooseAddress')), 'chooseAddress')
// const addAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/addAddress')), 'addAddress')
// const searchAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/children/searchAddress')), 'searchAddress')
// const foodDetail = r => require.ensure([], () => r(require('../page/shop/children/foodDetail')), 'foodDetail')
// const shopDetail = r => require.ensure([], () => r(require('../page/shop/children/shopDetail')), 'shopDetail')
// const shopSafe = r => require.ensure([], () => r(require('../page/shop/children/children/shopSafe')), 'shopSafe')
// const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
// const setusername = r => require.ensure([], () => r(require('../page/profile/children/setusername')), 'setusername')
// const address = r => require.ensure([], () => r(require('../page/profile/children/children/address')), 'address')
// const add = r => require.ensure([], () => r(require('../page/profile/children/children/children/add')), 'add')
// const addDetail = r => require.ensure([], () => r(require('../page/profile/children/children/children/children/addDetail')), 'addDetail')
// const balance = r => require.ensure([], () => r(require('../page/balance/balance')), 'balance')
// const balanceDetail = r => require.ensure([], () => r(require('../page/balance/children/detail')), 'balanceDetail')
// const benefit = r => require.ensure([], () => r(require('../page/benefit/benefit')), 'benefit')
// const coupon = r => require.ensure([], () => r(require('../page/benefit/children/coupon')), 'coupon')
// const hbDescription = r => require.ensure([], () => r(require('../page/benefit/children/hbDescription')), 'hbDescription')
// const hbHistory = r => require.ensure([], () => r(require('../page/benefit/children/hbHistory')), 'hbHistory')
// const exchange = r => require.ensure([], () => r(require('../page/benefit/children/exchange')), 'exchange')
// const commend = r => require.ensure([], () => r(require('../page/benefit/children/commend')), 'commend')
// const points = r => require.ensure([], () => r(require('../page/points/points')), 'points')
// const pointsDetail = r => require.ensure([], () => r(require('../page/points/children/detail')), 'pointsDetail')
// const service = r => require.ensure([], () => r(require('../page/service/service')), 'service')
// const questionDetail = r => require.ensure([], () => r(require('../page/service/children/questionDetail')), 'questionDetail')
// const find = r => require.ensure([], () => r(require('../page/find/find')), 'find')
// const download = r => require.ensure([], () => r(require('../page/download/download')), 'download')
const analytics = r => require.ensure([], () => r(require('../page/analytics/analytics')), 'analytics')
const chooseBrand = r => require.ensure([], () => r(require('../page/home/chooseBrand')), 'chooseBrand')
const defaultBrand = r => require.ensure([], () => r(require('../page/home/defaultBrand')), 'defaultBrand')
const chart = r => require.ensure([], () => r(require('../page/analytics/chart')), 'chart')
const myOrder = r => require.ensure([], () => r(require('../page/confirmOrder/myOrder')), 'myOrder')
const myOrderDetail = r => require.ensure([], () => r(require('../page/confirmOrder/myOrderDetail')), 'myOrderDetail')




export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            component: index
        },
        {
            path: '/?code=:code',
            component: index
        },
        //首页城市列表页
        {
            path: '/home',
            component: home
        },
        {
            path: '/setting',
            component: setting
        },
        //当前选择城市页
        {
            path: '/city/:cityid',
            component: city
        },
        // //所有商铺列表页
        // {
        //     path: '/msite',
        //     component: msite,
        //     meta: { keepAlive: true },
        // },
        // //特色商铺列表页
        // {
        //     path: '/food',
        //     component: food
        // },
        // //搜索页
        // {
        //     path: '/search/:geohash',
        //     component: search
        // },
        //商铺详情页
        {
            path: '/expireShop',
            component: expireShop
        },
        {
            path: '/shop',
            component: shop,
            // meta: { keepAlive: true },
            // children: [{
            //     path: 'foodDetail', //食品详情页
            //     component: foodDetail,
            // }, {
            //     path: 'shopDetail', //商铺详情页
            //     component: shopDetail,
            //     children: [{
            //         path: 'shopSafe', //商铺安全认证页
            //         component: shopSafe,
            //     }, ]
            // }]
        },
        //评论
        {
            path: '/rate',
            component: rate
        },
        //评论
        {
            path: '/rateByType',
            component: rateByType
        },
        //评论
        {
            path: '/rateByShop',
            component: rateByShop
        },
        //评论预警
        {
            path: '/warning',
            component: warning
        },
        {
            path: '/continueOrder',
            component: continueOrder,
        },
        //确认订单页
        {
            path: '/confirmOrder',
            component: confirmOrder,
            // children: [{
            //     path: 'remark', //订单备注
            //     component: remark,
            // }, {
            //     path: 'invoice', //发票抬头
            //     component: invoice,
            // }, {
            //     path: 'payment', //付款页面
            //     component: payment,
            // }, {
            //     path: 'userValidation', //用户验证
            //     component: userValidation,
            // }, {
            //     path: 'chooseAddress', //选择地址
            //     component: chooseAddress,
            //     children: [{
            //         path: 'addAddress', //添加地址
            //         component: addAddress,
            //         children: [{
            //             path: 'searchAddress', //搜索地址
            //             component: searchAddress,
            //         }]
            //     }, ]
            // }, ]
        },
        //登录注册页
        {
            path: '/login',
            component: login
        },
        {
            path: '/policy',
            component: policy
        },
        //验证码
        {
            path: '/code',
            component: code
        },
        // //个人信息页
        // {
        //     path: '/profile',
        //     component: profile,
        //     children: [{
        //         path: 'info', //个人信息详情页
        //         component: info,
        //         children: [{
        //             path: 'address',
        //             component: address,     //编辑地址
        //             children:[{
        //                 path:'add',
        //                 component:add,
        //                 children:[{
        //                     path:'addDetail',
        //                     component:addDetail
        //                 }]
        //             }]
        //         }]
        //     },
        //     {
        //         path: 'setusername',
        //         component: setusername,
        //     },
        //     {
        //         path: 'service', //服务中心
        //         component: service,
        //     },]
        // },
        // //修改密码页
        // {
        //     path: '/forget',
        //     component: forget
        // },
        // //订单列表页
        // {
        //     path: '/order',
        //     component: order,
        //     children: [{
        //         path: 'orderDetail', //订单详情页
        //         component: orderDetail,
        //     }, ]
        // },
        // //vip卡页
        // {
        //     path: '/vipcard',
        //     component: vipcard,
        //     children: [{
        //         path: 'invoiceRecord', //开发票
        //         component: invoiceRecord,
        //     }, {
        //         path: 'useCart', //购买会员卡
        //         component: useCart,
        //     }, {
        //         path: 'vipDescription', //会员说明
        //         component: vipDescription,
        //     },]
        // },
        // //发现页
        // {
        //     path: '/find',
        //     component: find
        // },
        // //下载页
        // {
        //     path: '/download',
        //     component: download
        // },
        // //服务中心
        // {
        //     path: '/service',
        //     component: service,
        //      children: [{
        //         path: 'questionDetail', //订单详情页
        //         component: questionDetail,
        //     }, ]
        // },
        // //余额
        // {
        //     path: 'balance',
        //     component: balance,
        //     children: [{
        //         path: 'detail', //余额说明
        //         component: balanceDetail,
        //     }, ]
        // },
        // //我的优惠页
        // {
        //     path: 'benefit',
        //     component: benefit,
        //     children: [{
        //         path: 'coupon', //代金券说明
        //         component: coupon,
        //     }, {
        //         path: 'hbDescription', //红包说明
        //         component: hbDescription,
        //     }, {
        //         path: 'hbHistory', //历史红包
        //         component: hbHistory,
        //     }, {
        //         path: 'exchange', //兑换红包
        //         component: exchange,
        //     }, {
        //         path: 'commend', //推荐有奖
        //         component: commend,
        //     },]
        // },
        // //我的积分页
        // {
        //     path: 'points',
        //     component: points,
        //     children: [{
        //         path: 'detail', //积分说明
        //         component: pointsDetail,
        //     }, ]
        // },
        //商铺详情页
        {
            path: '/analytics',
            component: analytics
        },
        {
            path: '/analytics/:brand',
            component: analytics
        },
        {
            path: '/chooseBrand',
            component: chooseBrand
        },
        {
            path: '/defaultBrand',
            component: defaultBrand
        },
        {
            path: '/chart',
            component: chart,
            meta: { keepAlive: true }
        },
        {
            path: '/myOrder',
            component: myOrder
        },
        {
            path: '/myOrderDetail/:orderId',
            component: myOrderDetail
        }
    ]
}]