<template>
    <div class="confirmOrderContainer">
        <section v-if="!showLoading">
            <!-- <head-top head-title="确认订阅门店" goBack="true"></head-top> -->
            <!-- <router-link :to='{path: "/confirmOrder/chooseAddress", query: {id: checkoutData.cart.id, sig: checkoutData.sig}}' class="address_container">
                <div class="address_empty_left">
                    <svg class="location_icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
                    </svg>
                    <div class="add_address" v-if="!choosedAddress">请添加一个收获地址</div>
                    <div v-else class="address_detail_container">
                        <header>
                            <span>{{choosedAddress.name}}</span>
                            <span>{{choosedAddress.sex == 1? '先生':'女士'}}</span>
                            <span>{{choosedAddress.phone}}</span>
                        </header>
                        <div class="address_detail">
                            <span v-if="choosedAddress.tag" :style="{backgroundColor: iconColor(choosedAddress.tag)}">{{choosedAddress.tag}}</span>
                            <p>{{choosedAddress.address_detail}}</p>
                        </div>
                    </div>
                </div>
                <svg class="address_empty_right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
            </router-link> -->
            <!-- <section class="delivery_model container_style">
                <p class="deliver_text">送达时间</p>
                <section class="deliver_time">
                    <p>尽快送达 | 预计 {{checkoutData.delivery_reach_time}}</p>
                    <p v-if="checkoutData.cart.is_deliver_by_fengniao">蜂鸟专送</p>
                </section>
            </section> -->
            <header class="shop_detail_header" ref="shopheader">
                <!-- <img :src="imgBaseUrl + shopDetailData.image_path" class="header_cover_img"> -->
                <section class="description_header">
                    <div>门店列表</div>
                    <div class="description_top">
                       <!--  <section class="description_left" style="border-radius: 10rem;overflow: hidden;">
                            <img :src="user.profileImg" @click="signout">
                        </section> -->
                        <section class="description_right">
                            <h4 class="description_title ellipsis">您已选择2家门店</h4>
                        </section>
                    </div>

                </section>
            </header>
            
            <section class="food_container">
                <section class="menu_container">
                    <section class="menu_right" ref="menuFoodList">
                        <ul>
                            <li v-for="store in storeList">
                                <section class="menu_detail_list">
                                    <div class="menu_detail_link">
                                        <section class="menu_food_img">
                                            <img :src="store.defaultPic">
                                        </section>
                                        <section class="menu_food_description">
                                            <h3 class="food_description_head">
                                                <span class="description_foodname" v-if="!store.branchName">{{store.name}}</span>
                                                <span class="description_foodname" v-else>{{store.name}}({{store.branchName}})</span>
                                            </h3>
                                            <p class="food_description_content">{{store.regionName}} {{store.priceText}}</p>
                                        </section>
                                        <section class="menu_action">
                                        <svg class="address_empty_right"  @click="deleteFromCart(store.id)">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                                        </svg>
                                        </section>
                                    </div>
                                </section>
                            </li>
                        </ul>
                    </section>
                </section>
            </section>
            <!-- <section class="food_list">
                <header v-if="checkoutData.cart.restaurant_info">
                    <img :src="imgBaseUrl + checkoutData.cart.restaurant_info.image_path">
                    <span>{{checkoutData.cart.restaurant_info.name}}</span>
                </header>
                <ul class="food_list_ul" v-if="checkoutData.cart.groups">
                    <li v-for="item in checkoutData.cart.groups[0]" :key="item.id" class="food_item_style">
                        <p class="food_name ellipsis">{{item.name}}</p>
                        <div class="num_price">
                            <span>x {{item.quantity}}</span>
                            <span>¥{{item.price}}</span>
                        </div>
                    </li>
                </ul>
                <div class="food_item_style" v-if="checkoutData.cart.extra">
                    <p class="food_name ellipsis">{{checkoutData.cart.extra[0].name}}</p>
                    <div class="num_price">
                        <span></span>
                        <span>¥ {{checkoutData.cart.extra[0].price}}</span>
                    </div>
                </div>
                <div class="food_item_style">
                    <p class="food_name ellipsis">配送费</p>
                    <div class="num_price">
                        <span></span>
                        <span>¥ {{checkoutData.cart.deliver_amount || 0}}</span>
                    </div>
                </div>
                <div class="food_item_style total_price">
                    <p class="food_name ellipsis">订单 ¥{{checkoutData.cart.total}}</p>
                    <div class="num_price">
                        <span>待支付 ¥{{checkoutData.cart.total}}</span>
                    </div>
                </div>
            </section>
            <section class="pay_way container_style">
                <router-link :to='{path: "/confirmOrder/remark", query: {id: checkoutData.cart.id, sig: checkoutData.sig}}' class="header_style">
                    <span>订单备注</span>
                    <div class="more_type">
                        <span class="ellipsis">{{remarkText||inputText? remarklist: '口味、偏好等'}}</span>
                        <svg class="address_empty_right">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </div>
                </router-link>
                <router-link :to="checkoutData.invoice.is_available? '/confirmOrder/invoice': ''" class="hongbo" :class="{support_is_available: checkoutData.invoice.is_available}">
                    <span>发票抬头</span>
                    <span>
                        {{checkoutData.invoice.status_text}}
                        <svg class="address_empty_right">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </router-link>
            </section> -->
            <section class="pay_way container_style">
                <header class="header_style">
                    <span>选择订阅周期</span>
                    <!-- <div class="more_type" @click="showPayWayFun">
                        <span>在线支付</span>
                        <svg class="address_empty_right">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </div> -->
                </header>
                <div class="choose_type_Container">
                    
                    <ul>
                      <!--  <li v-for="item in payments" :key="item.id" :class="{choose: payWayId == item.id}" 
                        @click="choosePayWay(item.is_online_payment, item.id)">
                            <span class="pay_way">
                                {{item.name}}<br/>
                                <span v-if="item.is_online_payment" class="pay_way_subtitle">{{item.description}}</span>
                            </span>
                            <span class="price_rrp">￥{{item.select_state*2}}/店</span>
                            <span class="price_now">￥{{item.select_state}}/店</span>
                            <div class="tri"></div>
                            <svg class="address_empty_right" >
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                            </svg>
                        </li> -->
                        <!-- <li  v-for="(item,index) in payments" :key="item.id" :class="{choose: payWayIndex == index}" -->
                        
                        <!-- <li  v-for="(item,index) in payments" :key="item.id" :class="{choose: payWayIndex == index}"
                        @click="choosePayWay(item.paymentType,index)">
                            <span class="pay_way_title">
                                {{item.title}}<br/>
                                <span class="pay_way_subtitle" v-if="item.subTitle">{{item.subTitle}}</span>
                            </span>
                            <span class="price_now">{{item.priceDesc}}</span>
                            <div class="tri"></div>
                            <svg class="address_empty_right" >
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                            </svg>
                        </li> -->

                        <li  v-for="(item,index) in plans" :key="item.id" :class="{choose: payWayIndex == index}"
                        @click="choosePayWay(item.planCode,index)">
                            <span class="pay_way_title">
                                {{item.description}}<br/>
                                <span class="pay_way_subtitle" v-if="item.info">{{item.info}}</span>
                            </span>
                           <!--  <span class="price_rrp">{{item.rrpPrice}}</span> -->
                            <span class="price_now">{{item.planName}}</span>
                            <div class="tri"></div>
                            <svg class="address_empty_right" >
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                            </svg>
                        </li>
                    </ul>
                </div>
                <!-- <section class="hongbo">
                    <span>* 备注：请核对订阅信息，信息订阅后暂不可退订。</span>
                </section> -->
                <section class="confrim_order" @click="confrimOrder" v-if="plans.length >0">
                    <p >
                    <!-- 总计 {{storeList.length}} 家门店， -->共计: ¥{{storeList.length * plans[payWayIndex].price /100}}, 确认订阅</p>
                    <!-- <p v-if="payWayId == 'B'">共计: ¥{{payments[payWayIndex].price/100}}, 确认订阅</p> -->
                    
                </section>
            </section>
            
            <!-- <transition name="fade">
                <div class="cover" v-if="showPayWay" @click="showPayWayFun"></div>
            </transition> -->
        </section>
        <loading v-if="showLoading"></loading>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import loading from 'src/components/common/loading'
    import {getStoreInfo, addToCart, getPayConfig, getJsConfig, getPayment, getPlan, checkout} from 'src/service/getData'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import {imgBaseUrl} from 'src/config/env'
    import weixin from 'weixin-js-sdk'

    export default {
        data(){
            return {
                plans:[],
                storeDto:[],
                storeIds:[],
                storeList:[],
                storeLimit:0,
                user:null,
                geohash: '', //geohash位置信息
                shopId: null, //商店id值
                showLoading: true, //显示加载动画
                checkoutData: null,//数据返回值
                shopCart: null,//购物车数据
                imgBaseUrl, //图片域名
                showPayWay: false,//显示付款方式
                payWayId: null, //付款方式
                payWayIndex: 0,
                showAlert: false, //弹出框
                alertText: null, //弹出框内容
                payments:[]
            }
        },
        created(){
            if(this.$route.query.ids instanceof Array){
                this.storeIds = this.$route.query.ids.map(item => parseInt(item));
            }else{
                this.storeIds = [parseInt(this.$route.query.ids)];
            }

            this.user = JSON.parse(getStore('user'));
            if(this.user == null){
                this.$router.push('/');
            }

            let _this = this;
            
            // getPayment(_this.user.id).then(function(res){
            //     console.log(res);
            //     _this.payments = res.cart;
            //     _this.payWayId = res.cart[0].paymentType;
            //     _this.payWayIndex = 0;
            //     _this.storeLimit = res.limit;
            //     console.log('limit:'+res.limit);
            // })

            _this.storeIds.map( o => {
               _this.storeDto.push({storeId:o , sourceType: 'DP'});
            });

            getPlan(_this.user.openId,_this.storeDto).then(function(res){
                _this.plans = res.plans;
            })
            // //获取上个页面传递过来的geohash值
            // this.geohash = this.$route.query.geohash;
            // //获取上个页面传递过来的shopid值
            // this.shopId = this.$route.query.shopId;
            // this.INIT_BUYCART();
            // this.SAVE_SHOPID(this.shopId);
            // //获取当前商铺购物车信息
            // this.shopCart = this.cartList[this.shopId];
        },
        mounted(){
            // if (this.geohash) {
                this.initData();
            //     this.SAVE_GEOHASH(this.geohash);
            // }
            // if (!(this.userInfo && this.userInfo.user_id)) {
            //     this.showAlert = true;
            //     this.alertText = '您还没有登录';
            // }
        },
        components: {
            headTop,
            alertTip,
            loading,
        },
        computed: {
            ...mapState([
                // 'cartList', 'remarkText', 'inputText', 'invoice', 'choosedAddress', 'userInfo'
            ]),
            //备注页返回的信息进行处理
            remarklist: function (){
                // let str = new String;
                // if (this.remarkText) {
                //     Object.values(this.remarkText).forEach(item => {
                //         str += item[1] + '，';
                //     })
                // }
                // //是否有自定义备注，分开处理
                // if (this.inputText) {
                //     return str + this.inputText;
                // }else{
                //     return str.substr(0, str.lastIndexOf('，')) ;
                // }
            },
        },
        methods: {
            ...mapMutations([
                // 'INIT_BUYCART', 'SAVE_GEOHASH', 'CHOOSE_ADDRESS', 'NEED_VALIDATION', 'SAVE_CART_ID_SIG', 'SAVE_ORDER_PARAM', 'ORDER_SUCCESS', 'SAVE_SHOPID'
            ]),
            //初始化数据
            async initData(){
                
                // //检验订单是否满足条件
                let _this =this;
                _this.user = JSON.parse(getStore('user'));

                _this.showLoading = true;

                getJsConfig(location.href).then(function(data){
    
                    data.debug = false;
                    weixin.config(data);

                });

                getStoreInfo(_this.storeIds).then(function(response){
                    _this.showLoading = false;

                    if(response.status == 0 ){
                        _this.storeList = response.stores;
                        if(_this.storeList.length > 0){
                            _this.storeIds = [];
                            for(var i=0;i<_this.storeList.length;i++){
                                _this.storeIds.push(_this.storeList[i].id);
                            }

                            
                        }
                    }

                });
                
                

                // this.SAVE_CART_ID_SIG({cart_id: this.checkoutData.cart.id, sig:  this.checkoutData.sig})
                // this.initAddress();
                this.showLoading = false;
            },
            //获取地址信息，第一个地址为默认选择地址
            async initAddress(){
                // if (this.userInfo && this.userInfo.user_id) {
                //     const addressRes = await getAddressList(this.userInfo.user_id);
                //     if (addressRes instanceof Array && addressRes.length) {
                //         this.CHOOSE_ADDRESS({address: addressRes[0], index: 0});
                //     }
                // }
            },
            deleteFromCart(storeId){
                if(this.storeIds.length == 1 || this.storeList.length == 1){
                    return;
                }

                let index = this.storeIds.indexOf(storeId);
                this.storeIds.splice(index,1);
                this.storeList.splice(index,1);

            },
            //显示付款方式
            showPayWayFun(){
                this.showPayWay = !this.showPayWay;
            },
            //选择付款方式
            choosePayWay(type,index){
                // if (is_online_payment) {
                    // this.showPayWay = !this.showPayWay;
                    this.payWayId = type;
                    this.payWayIndex = index;
                    console.log(this.payWayId);
                // }
            },
            //确认订单
            async confrimOrder(){
                // //用户未登录时弹出提示框
                // if (!(this.userInfo && this.userInfo.user_id)) {
                //     this.showAlert = true;
                //     this.alertText = '请登录';
                //     return
                //     //未选择地址则提示
                // }else if(!this.choosedAddress){
                //     this.showAlert = true;
                //     this.alertText = '请添加一个收获地址';
                //     return
                // }
                // //保存订单
                // let param = {
                //     userId: 13788997536,//this.userInfo.user_id,
                //     cartId: 1,
                //     description: 'test',
                //     ids: this.storeIds,
                //     payment: this.payWayId
                // };
                // this.SAVE_ORDER_PARAM(param);
                // //发送订单信息
                // // let orderRes = await placeOrders(this.userInfo.user_id, this.checkoutData.cart.id, this.choosedAddress.id, this.remarklist, this.checkoutData.cart.groups, this.geohash, this.checkoutData.sig);
                // let orderRes = await placeOrders(2, this.checkoutData.cart.id, 1, this.remarklist, this.checkoutData.cart.groups, this.geohash, this.checkoutData.sig);
                // //第一次下单的手机号需要进行验证，否则直接下单成功
                // if (orderRes.need_validation) {
                //     this.NEED_VALIDATION(orderRes);
                //     this.$router.push('/confirmOrder/userValidation');
                // }else{
                //     this.ORDER_SUCCESS(orderRes);
                //     this.$router.push('/confirmOrder/payment');
                // }
                // this.$router.push({path:'/confirmOrder/payment',query:param});
                // let json = {"appId":"wx797ef910234a14be","nonceStr":"92dac676060347ce86b1e2d688112644","package":"prepay_id=wx20170914135516792c54141f0486582465","signType":"MD5","timeStamp":"1505368516","paySign":"C772A305F19D559BCA82BD19A9CC43A3"};
                

                // if( this.payWayId == 'B' && this.storeIds.length > 10){
                //     this.showAlert = true;
                //     this.alertText = '15天产品试用体验最高10家门店';
                //     return
                // }

                // let _this = this;
                // _this.showLoading = true;

                // let json = await getPayConfig(_this.user.id,_this.storeIds,_this.payWayId);
                
                // json.timestamp = json.timeStamp;
                // json.success = function (res) {
                    
                //     addToCart(_this.user.id,_this.storeIds,_this.payWayId).then(function(response){

                //         if(response.status == 0){

                //             _this.showLoading = false;
                //             _this.$router.push('/analytics');
                //         }else{
                //             alert(response);
                //         }
                //     })
                // }

                // 
                console.log(this.user.openId,this.storeDto,this.payWayId);
                let res = await checkout(this.user.openId,this.storeDto,this.payWayId);
                let json = JSON.parse(res.paymentJson);
                json.timestamp = json.timeStamp;
                // console.log(json);
                weixin.chooseWXPay(json);
            },
        },
        watch: {
            userInfo: function (value) {
                // if (value && value.user_id) {
                //     this.initAddress();
                // }
            },
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    
    .confirmOrderContainer{
        background-color: #fff;
        height: 100%;
        overflow: scroll;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .container_style{
        background-color: #fff;
    }
    .shop_detail_header{
        @include wh(100%, auto);
        overflow: hidden;
        position: relative;
        position:fixed;
        z-index:1;
        .header_cover_img{
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 9;
            filter: blur(10px);
        }
        .description_header{
            position: relative;
            z-index: 10;
            background-color: rgba(255,255,255,1);
            padding: 0.8rem 0.8rem 0.6rem 0.8rem;
            width: 100%;
            overflow: hidden;
            .description_top{
                display: flex;
                margin-top:0.2rem;
                .description_left{
                    margin-right: 0.5rem;
                    img{
                        @include wh(2.9rem, 2.9rem);
                        display: block;
                        border-radius: 3rem;
                    }
                }
                .description_right{
                    flex: 3;
                    .description_title{
                        @include sc(.6rem, #949aac);
                        line-height: 1.4rem;
                        /*font-weight: bold;*/
                        width: 100%;
                        /*margin-bottom: 0.3rem;*/
                    }
                    .description_text{
                        @include sc(.5rem, #282828);
                        /*margin-bottom: 0.3rem;*/
                    }
                    .description_promotion{
                        @include sc(.5rem, #282828);
                        width: 11.5rem;
                    }
                }
                
            }
            .description_footer{
                @include fj;
                margin-top: 0.5rem;
                padding-right: 1rem;
                p{
                    @include sc(.5rem, #fff);
                    span{
                        color: #fff;
                    }
                    .tip_icon{
                        padding: 0 .04rem;
                        border: 0.025rem solid #fff;
                        border-radius: 0.1rem;
                        font-size: .4rem;
                        display: inline-block;
                    }
                }
                .ellipsis{
                    width: 84%;
                }
                .footer_arrow{
                    @include wh(.45rem, .45rem);
                    position: absolute;
                    right: .3rem;
                }
            }

            &.empty{
                padding: 1rem 0.8rem 1rem 0.8rem;
                .description_top{
                    img{
                        @include wh(3.4rem, 3.4rem);
                    }
                    .shop_detail_vip{
                        display: none;
                    }
                    .description_title {
                        @include sc(.9rem, #282828);
                    }
                }
            }
        }
    }
    .address_container{
        min-height: 3.5rem;
        @include fj;
        align-items: center;
        padding: 0 0.6rem;
        background: url(../../images/address_bottom.png) left bottom repeat-x;
        background-color: #fff;
        background-size: auto .12rem;
        .address_empty_left{
            display: flex;
            align-items: center;
            .location_icon{
                @include wh(.8rem, .8rem);
                fill: $blue;
                margin-right: .2rem;
            }
            .add_address{
                @include sc(.7rem, #333);
            }
            .address_detail_container{
                margin-left: .2rem;
                header{
                    @include sc(.65rem, #333);
                    span:nth-of-type(1){
                        font-size: .8rem;
                        font-weight: bold;
                    }
                }
                .address_detail{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    span{
                        @include sc(.5rem, #fff);
                        border-radius: .15rem;
                        background-color: #ff5722;
                        height: .6rem;
                        line-height: .6rem;
                        padding: 0 .2rem;
                        margin-right: .3rem;
                    }
                    p{
                        @include sc(.55rem, #777);
                    }
                }
            }
        }
    }
    .delivery_model{
        border-left: .2rem solid $blue;
        min-height: 4rem;
        @include fj;
        align-items: center;
        .deliver_text{
            @include sc(.8rem, #333);
            font-weight: bold;
            padding-left: .3rem;
        }
        .deliver_time{
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            p:nth-of-type(1){
                @include sc(.7rem, $blue);
            }
            p:nth-of-type(2){
                @include sc(.5rem, #fff);
                background-color: $blue;
                width: 2.4rem;
                margin-top: .5rem;
                text-align: center;
                border-radius: 0.12rem;
                padding: .1rem;
            }
        }
    }
    
    .food_list{
        background-color: #fff;
        margin-top: .4rem;
        header{
            padding: .7rem;
            border-bottom: 0.025rem solid #f5f5f5;
            img{
                @include wh(1.2rem, 1.2rem);
                vertical-align: middle;
            }
            span{
                @include sc(.8rem, #333);
            }
        }
        .food_list_ul{
            padding-top: .5rem;
        }
        .food_item_style{
            @include fj;
            line-height: 1.8rem;
            padding: 0 .7rem;
            span,p{
                @include sc(.65rem, #666);
            }
            .food_name{
                width: 11rem;
            }
            .num_price{
                flex: 1;
                @include fj;
                align-items: center;
                span:nth-of-type(1){
                    color: #f60;
                }
            }
        }
        .total_price{
            border-top: 0.025rem solid #f5f5f5;
        }
    }
    .pay_way{
        position: fixed;
        bottom: 0;
        left:0;
        right:0;
        padding-top:.5rem;
        padding-bottom:.6rem;
        .header_style{
            @include fj;
            line-height: 1.3rem;
            margin: 0 .7rem;
            span:nth-of-type(1){
                @include sc(.6rem, #333);
                font-weight: bold;
            }
            .more_type{
                span:nth-of-type(1){
                    @include sc(.6rem, #aaa);
                    /*width: 10rem;*/
                    display: inline-block;
                    text-align: right;
                    vertical-align: middle;
                }
                svg{
                    @include wh(.5rem, .5rem);
                    fill: #ccc;
                }
            }
        }
        .hongbo{
            @include fj;
            span{
                @include sc(.5rem, #aaa);
                line-height: 1.2rem;
                svg{
                    @include wh(.5rem, .5rem);
                    vertical-align: middle;
                    fill: #ccc;
                }
            }
            span:nth-of-type(2){
                color: #aaa;
            }
        }
        .support_is_available{
            span{
                color: #666;
            }
        }
    }
    .confrim_order{
        display: flex;
        height: 2rem;
        border-radius: 1rem;
        background-color: #ffd101;
        margin-left:5%;
        width:90%;
        p{
            flex:1;
            line-height: 2rem;
            @include sc(.65rem, #fff);
            border-radius: .2rem;
            text-align: center;
        }
    }
    .cover{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,.3);
        z-index: 203;
    }
    .choose_type_Container{
        padding: 0rem 0 1rem;
        background-color: #fff;
        margin: 0 .7rem .6rem;
        border-bottom:0.025rem solid #e5e5e5;
        
        header{
            
            text-align: left;
            line-height: 1rem;
            .span{
                @include sc(.5rem, #858585);
                font-weight: bold;
            }
        }
        ul{
            li{
                @include fj;
                padding: 0 .7rem;
                margin:.3rem 0;
                line-height: 2.1rem;
                align-items: center;
                border-radius: .2rem;
                position:relative;
                border:0.025rem solid #e5e5e5;
                display: flex;
                background-color: #fff;
                span{
                    @include sc(.6rem, #343640);
                    margin-right:.2rem;
                }
                .pay_way_title{
                    width:50%;
                    color:#343640;
                    line-height: .8rem;
                    .pay_way_subtitle{

                        @include sc(.5rem, #343640);
                    }
                }
                .price_rrp{
                    text-align: center;
                    text-decoration: line-through;
                    @include sc(.6rem, #343640);

                }
                .price_now{
                    text-align: center;
                    @include sc(.6rem, #FFA73F);
                    font-weight: bold;
                }
                svg{
                    @include wh(.8rem, .8rem);
                    fill: #fff;
                    display: none;
                }
                .tri{
                    position:absolute;
                    top:0;
                    right:0;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 0 1.5rem 1.5rem 0;
                    border-color: transparent #ffd101 transparent transparent;
                    display: none;
                }
            }
            .choose{
                background-color: #fbfbfb;
            }
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .slid_up-enter-active, .slid_up-leave-active {
        transition: all .3s;
    }
    .slid_up-enter, .slid_up-leave-active {
        transform: translate3d(0,10rem,0)
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }

    .food_container{
        display: flex;
        flex: 1;
        padding-top:4rem;
    }
    .menu_container{
        display: flex;
        flex: 1;
        overflow-y: hidden;
        position: relative;
        .menu_left{
            width: 3.8rem;
            .menu_left_li{
                padding: .7rem .3rem;
                border-bottom: 0.025rem solid #ededed;
                box-sizing: border-box;
                border-left: 0.15rem solid #f8f8f8;
                position: relative;
                img{
                    @include wh(.5rem, .6rem);
                }
                span{
                    @include sc(.6rem, #666);
                }
                .category_num{
                    position: absolute;
                    top: .1rem;
                    right: .1rem;
                    background-color: #ff461d;
                    line-height: .6rem;
                    text-align: center;
                    border-radius: 50%;
                    border: 0.025rem solid #ff461d;
                    min-width: .6rem;
                    height: .6rem;
                    @include sc(.5rem, #fff);
                    font-family: Helvetica Neue,Tahoma,Arial;
                }
            }
            .activity_menu{
                border-left: 0.15rem solid #3190e8;
                background-color: #fff;
                span:nth-of-type(1){
                    font-weight: bold;
                }
            }
        }
        .menu_right{
            flex: 4;
            overflow-y: auto;
            background-color: #fff;
            
            .menu_detail_header{
                width: 100%;
                padding: .4rem;
                position: relative;
                @include fj;
                align-items: center;
                .menu_detail_header_left{
                    width: 11rem;
                    white-space: nowrap;
                    overflow: hidden;
                    .menu_item_title{
                        @include sc(.7rem, #666);
                        font-weight: bold;
                    }
                    .menu_item_description{
                        @include sc(.5rem, #999);
                        width: 30%;
                        overflow: hidden;
                    }
                }
                .menu_detail_header_right{
                    @include wh(.5rem, 1rem);
                    display: block;
                    @include bis('../../images/icon_point.png');
                    background-size: 100% .4rem;
                    background-position: left center;
                }
                .description_tip{
                    background-color: #39373a;
                    opacity: 0.95;
                    @include sc(.5rem, #fff);
                    position: absolute;
                    top: 1.5rem;
                    z-index: 14;
                    width: 8rem;
                    right: .2rem;
                    padding: .5rem .4rem;
                    border: 1px;
                    border-radius: .2rem;
                    span{
                        color: #fff;
                        line-height: .6rem;
                        font-size: .55rem;
                    }
                }
                .description_tip::after{
                    content: '';
                    position: absolute;
                    @include wh(.4rem, .4rem);
                    background-color: #39373a;
                    top: -.5rem;
                    right: .7rem;
                    transform: rotate(-45deg) translateY(.41rem);
                }
            }
            .menu_detail_list{
                background-color: #fff;
                margin: .6rem .4rem;
                padding: 0 0 .6rem .4rem;
                border-bottom: 1px solid #f8f8f8;
                position: relative;
                overflow: hidden;
                .menu_detail_link{
                    display:flex;
                    .menu_food_img{
                        margin-right: .4rem;
                        img{
                            @include wh(3rem, 3rem);
                            display: block;
                        }
                    }
                    .menu_food_description{
                        display: flex;
                        align-items: start;
                        flex-direction: column;
                        justify-content: center;
                        width: 100%;
                        flex:1;
                        .food_description_head{
                            @include fj;
                            margin-bottom: .2rem;
                            .description_foodname{
                                @include sc(.7rem, #333);
                                font-weight: bold;
                            }
                            .attributes_ul{
                                display: flex;
                                li{
                                    font-size: .3rem;
                                    height: .6rem;
                                    line-height: .35rem;
                                    padding: .1rem;
                                    border: 1px solid #666;
                                    border-radius: 0.3rem;
                                    margin-right: .1rem;
                                    transform: scale(.8);
                                    p{
                                        white-space: nowrap;
                                    }
                                }
                                .attribute_new{
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    background-color: #4cd964;
                                    @include wh(2rem, 2rem);
                                    display: flex;
                                    align-items: flex-end;
                                    transform: rotate(-45deg) translate(-.1rem, -1.5rem);
                                    border: none;
                                    border-radius: 0;
                                    p{
                                        @include sc(.4rem, #fff);
                                        text-align: center;
                                        flex: 1;
                                    }
                                }
                            }
                        }
                        .food_description_content{
                            @include sc(.7rem, #969696);
                            line-height: 1rem;
                        }
                        .food_description_sale_rating{
                            line-height: .8rem;
                            span{
                                @include sc(.5rem, #d5d5d5);
                            }
                        }
                        .food_activity{
                            line-height: .4rem;
                            span{
                                font-size: .3rem;
                                border: 1px solid currentColor;
                                border-radius: 0.3rem;
                                padding: .08rem;
                                display: inline-block;
                                transform: scale(.8);
                                margin-left: -0.35rem;

                            }
                        }
                    }


                    .menu_action{
                        /*@include wh(2rem, 100%);*/
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .address_empty_right{
                        @include wh(1rem, 1rem);
                        fill: #999;
                        
                    }
                }
                .menu_detail_footer{
                    margin-left: 2.4rem;
                    font-size: 0;
                    margin-top: .3rem;
                    @include fj;
                    .food_price{
                        span{
                            font-family: 'Helvetica Neue',Tahoma,Arial;
                        }
                        span:nth-of-type(1){
                            @include sc(.5rem, #f60);
                            margin-right: .05rem;
                        }
                        span:nth-of-type(2){
                            @include sc(.7rem, #f60);
                            font-weight: bold;
                            margin-right: .3rem;
                        }
                        span:nth-of-type(3){
                            @include sc(.5rem, #666);
                        }
                    }
                }
            }
        }
    }
</style>
