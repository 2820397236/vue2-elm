import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {routerMode} from './config/env'
import FastClick from 'fastclick'
import Vue2Filters from 'vue2-filters'
// import {getJsConfig} from './service/getData'
// import {getStore, setStore, removeStore} from 'src/config/mUtils'
import moment from 'moment/min/moment.min'
import 'moment/locale/zh-cn'
// import weixin from 'weixin-js-sdk'
import './config/rem'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(Vue2Filters)
Vue.use(VueRouter)
// Vue.use(weixin)
Vue.filter('dateTime', function (value,format) {
    return moment(value).format(format || 'YYYY年MM月DD日');
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

new Vue({
    router,
    store,
}).$mount('#app');

// getJsConfig(location.href).then(function(data){
    
//     data.debug = false;
//     weixin.config(data);

//     new Vue({
//         router,
//         store,
//     }).$mount('#app')
// })