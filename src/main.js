import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'
import Vue2Filters from 'vue2-filters'
import moment from 'moment/moment.js'
import weixin from 'weixin-js-sdk'
import {getJsConfig} from './service/getData'
import {getStore, setStore, removeStore} from 'src/config/mUtils'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(Vue2Filters)
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

let weixin = JSON.parse(getStore('wx'));

alert("1 openid:"+weixin.openid);


getJsConfig(location.href).then(function(data){

    weixin.config(data);

    new Vue({
        router,
        store,
    }).$mount('#app')

    // weixin.ready(function () {
        
    //     weixin.onMenuShareTimeline({
    //         title: '蜜蜂舆情', // 分享标题
    //         link: 'http://c.icoos.cn', // 分享链接
    //         desc: '蜜蜂舆情测试版', // 分享描述
    //         imgUrl: 'http://opub24jup.bkt.clouddn.com/CBD.jpg', // 分享图标
    //         success: function () {
    //             alert('分享成功啦！');
    //         },
    //         cancel: function(){
    //             alert('分享失败');
    //         }
    //     });
    // });
})







