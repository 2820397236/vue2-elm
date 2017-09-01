import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'
// import Vue2Filters from 'vue2-filters'
import moment from 'moment/moment.js'
import weixin from 'weixin-js-sdk'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

// Vue.use(Vue2Filters)
Vue.use(VueRouter)
Vue.use(weixin)

Vue.filter('dateTime', function (value,format) {
    return moment(value).format(format || 'YYYY-MM-DD HH:mm');
});

const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition ||0}
		}
	}
})

weixin.config({
    debug:true,  //开启debug
    appId: 'wx95ab74c069adc622', //微信appid
    timestamp: Math.ceil((new Date() - 0)/1000),  //时间戳
    nonceStr: (parseInt(Math.random() * new Date() - 0)).toString(32), 
    signature: 'xxx', //签名
    jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'onVoicePlayEnd',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
    ]
});

weixin.ready(function () {
    // weixin.checkJsApi();
    // weixin.onMenuShareTimeline({
    //     title: 'xxx', // 分享标题
    //     link: 'xxx', // 分享链接
    //     desc: 'xxx', // 分享描述
    //     imgUrl: '', // 分享图标
    //     success: function () {
    //         alert('分享成功啦！');
    //     },
    //     cancel: function(){
    //         alert('分享失败');
    //     }
    // });
});


new Vue({
	router,
	store,
}).$mount('#app')

