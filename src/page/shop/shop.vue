 <template>
    <div>
        <section v-if="!showLoading" class="shop_container main_container">
            <!-- <nav class="goback" @click="goback">
                <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:3"/>
                </svg>
            </nav> -->
            <header class="shop_detail_header" ref="shopheader">
                <!-- <img :src="imgBaseUrl + shopDetailData.image_path" class="header_cover_img"> -->
                <section class="description_header" :class="storeList.length == 0  && storeListOrigin.length == 0 ?'empty':''">
                    <div class="description_top">
                        <section class="description_left" style="border-radius: 10rem;overflow: hidden;">
                            <img :src="user.profileImg">
                        </section>
                        <section class="description_right">
                            <h4 class="description_title ellipsis">您好，<br/>{{user.realName}}</h4>
                            <!-- <p class="description_text">商家配送／{{shopDetailData.order_lead_time}}分钟送达／配送费¥{{shopDetailData.float_delivery_fee}}</p>
                            <p class="description_promotion ellipsis">公告：{{promotionInfo}}</p> -->
                        </section>
                        <section class="description_more">
                            <router-link class="shop_detail_vip" :to="{path:'/city/1'}" tag="span" >
                                <svg class="icon_style">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#add"></use>
                                </svg>
                                <span>订阅更多</span>                            
                            </router-link>
                        </section>

                    </div>
                    <!-- <footer class="description_footer" v-if="shopDetailData.activities.length" @click="showActivitiesFun">
                        <p class="ellipsis">
                            <span class="tip_icon" :style="{backgroundColor: '#' + shopDetailData.activities[0].icon_color, borderColor: '#' + shopDetailData.activities[0].icon_color}">{{shopDetailData.activities[0].icon_name}}</span>
                            <span>{{shopDetailData.activities[0].description}}（APP专享）</span>
                        </p>
                        <p>{{shopDetailData.activities.length}}个活动</p>
                        <svg class="footer_arrow">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
                        </svg>
                    </footer> -->
                    <input class="search_container" v-if="storeList.length != 0 || storeListOrigin.length != 0" placeholder="搜索已订阅的门店" v-model='inputVaule' @input='searchLocal(inputVaule)'>

                </section>
            </header>

            <section class="food_container emptyShop" v-if="storeList.length == 0">
                <div class="start_button" @click = "gotoAddress('/city/1')">
                    <svg class="icon_style">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#buyNow"></use>
                    </svg>
                    <span>立即体验订阅评论监控</span>
                    
                </div>
            </section>

            <transition name="fade-choose" v-if="storeList.length > 0">
                <section v-show="changeShowType =='food'" class="food_container">
                    <section class="menu_container">
                        <section class="menu_right" ref="menuFoodList">
                            <ul>
                                <li v-for="(store,index) in storeList" :key="index">

                                    <section class="store_detail_list">
                                            <section class="store_img" @click="alert(store,index)">
                                                <img :src="store.defaultPic">
                                            </section>

                                            <section  @click="alert(store,index)" class="store_info">
                                                <h3 class="store_head">
                                                    <span class="store_name ellipsis">
                                                    <span>{{store.name}}</span>
                                                    <span v-if="store.branchName">({{store.branchName}})</span> 
                                                    <span class="store_status green" v-if="store.status==0">营业</span>
                                                    <span class="store_status red" v-if="store.status!=0">停业</span>
                                                </span>
                                                </h3>
                                                <p class="store_content ellipsis" v-if="store.address == ''">
                                                    {{store.regionName}}&nbsp;&nbsp;{{store.priceText}}
                                                </p>
                                                <p class="store_content ellipsis" v-else>{{store.address}}</p>
                                                <p class="store_time">
                                                    <span v-if="store.isCancel == false">
                                                        {{store.createTime | dateTime('自YYYY年MM月DD日订阅')}}</span>
                                                    <span v-if="store.isCancel == true" class="cancel">
                                                        {{store.expireTime | dateTime('将于YYYY年MM月DD日取消订阅')}}</span>
                                                </p>
                                            </section>
                                    </section>
                                </li>
                            </ul>
                        </section>
                    </section>
                </section>
            </transition>
        </section>

        <foot-guide v-if="storeList.length > 0"></foot-guide>

       <loading v-show="showLoading"></loading>
       <!-- <section class="animation_opactiy shop_back_svg_container" v-if="showLoading">
           <img src="../../images/shop_back_svg.svg">
       </section> -->
       <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>

        <alert-tip v-if="showAlert" @closeTip="showAlert = false" 
            :alertText="alertText" 
            :alertSubText="alertSubText" 
            :alertTime="alertTime" 
            :alertImg="alertImg"
            :alertFunc="alertFunc"
            :confirmBtn="confirmBtn"
            :format="format"
        ></alert-tip>  
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {getMyStore,getUser,cancelMyStore,renewMyStore} from 'src/service/getData'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import alertTip from 'src/components/common/alertStore'
    import loading from 'src/components/common/loading'
    import {loadMore, getImgPath} from 'src/components/common/mixin'
    import {imgBaseUrl} from 'src/config/env'
    import BScroll from 'better-scroll'
    import footGuide from '../../components/footer/footGuide'
    import debounce from 'debounce'


    export default {
        data(){
            return{
                inputVaule:'',
                user:null,
                weixin:null,
                geohash: '', //geohash位置信息
                shopId: null, //商店id值
                showLoading: true, //显示加载动画 
                changeShowType: 'food',//切换显示商品或者评价
                shopDetailData: null, //商铺详情
                showActivities: false, //是否显示活动详情
                storeList: [], //食品列表
                storeListOrigin: [], //食品列表
                menuIndex: 0, //已选菜单索引值，默认为0
                menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
                shopListTop: [], //商品列表的高度集合
                TitleDetailIndex: null, //点击展示列表头部详情
                categoryNum: [], //商品类型右上角已加入购物车的数量
                totalPrice: 0, //总共价格
                cartFoodList: [], //购物车商品列表
                showCartList: false,//显示购物车列表
                receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
                ratingList: null, //评价列表
                ratingOffset: 0, //评价获取数据offset值
                ratingScoresData: null, //评价总体分数
                ratingTagsList: null, //评价分类列表
                ratingTageIndex: 0, //评价分类索引
                preventRepeatRequest: false,// 防止多次触发数据请求
                ratingTagName: '',//评论的类型
                loadRatings: false, //加载更多评论是显示加载组件
                foodScroll: null,  //食品列表scroll
                showSpecs: false,//控制显示食品规格
                specsIndex: 0, //当前选中的规格索引值
                choosedFoods: null, //当前选中视频数据
                showDeleteTip: false, //多规格商品点击减按钮，弹出提示框
                showMoveDot: [], //控制下落的小圆点显示隐藏
                windowHeight: null, //屏幕的高度
                elLeft: 0, //当前点击加按钮在网页中的绝对top值
                elBottom: 0, //当前点击加按钮在网页中的绝对left值
                ratingScroll: null, //评论页Scroll
                imgBaseUrl,
                showAlert: false,
                alertText: null,
                alertFunc:null,
                confirmBtn:null,
                format:'',
            }
        },
        created(){
            // this.geohash = this.$route.query.geohash;
            // this.shopId = this.$route.query.id || 3;
            // this.INIT_BUYCART();
            // this.initData();
        },
        mounted(){
            this.initData();
            this.windowHeight = window.innerHeight;
        },
        beforeDestroy(){
            // this.foodScroll.removeEventListener('scroll', )
        },
        // mixins: [loadMore, getImgPath],
        components: {
            loading,
            footGuide,
            alertTip,
        },
        computed: {
            ...mapState([
                'shopIds'
            ]),
            // promotionInfo: function (){
            //     return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。'
            // },
            // //配送费
            // deliveryFee: function () {
            //     if (this.shopDetailData) {
            //         return this.shopDetailData.float_delivery_fee;
            //     }else{
            //         return null;
            //     }
            // },
            // //还差多少元起送，为负数时显示去结算按钮
            // minimumOrderAmount: function () {
            //     if (this.shopDetailData) {
            //         return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
            //     }else{
            //         return null;
            //     }
            // },
            // //当前商店购物信息
            // shopCart: function (){
            //     return {...this.cartList[this.shopId]};
            // },
            // //购物车中总共商品的数量
            // totalNum: function (){
            //     let num = 0;
            //     this.cartFoodList.forEach(item => {
            //         num += item.num
            //     })
            //     return num
            // },
        },
        // props: ['alertText','alertSubText','alertTime','alertImg'],
        methods: {
            ...mapMutations([
               'RECORD_MYSHOPS'
            ]),
            //初始化时获取基本数据
            async initData(){
                
                if(getStore('user') == undefined){
                    this.gotoAddress('/login');
                }
                this.user = JSON.parse(getStore('user'));

                //提示绑定
                if(this.user.username==null || this.user.username == ''){
                    this.checkPhoneNumber();
                }


                if(this.shopList){
                    this.storeList = this.shopList;
                    this.storeListOrigin = this.shopList;
                }

                //获取我的门店
                let response = await getMyStore(this.user.id);
                if(response.status == -1){

                    removeStore('user');
                    this.gotoAddress('/login');

                }else if(response.status == 0){
                    this.storeList = response.stores;
                    this.storeListOrigin = response.stores;
                    this.extra = response.extra;
                }


                // this.storeList = [];
                // this.storeListOrigin = [];
                // this.extra = [];

                //整合数据
                for(var i=0;i<this.extra.length;i++){
                    for(var j=0;j<this.storeList.length;j++){
                        if( this.storeList[j].id == this.extra[i].storeId){

                            this.storeList[j].createTime = this.extra[i].createTime;
                            this.storeList[j].expireTime = new Date(new Date().setMonth(new Date(this.extra[i].createTime).getMonth() + 1));
                            this.storeList[j].isCancel = this.extra[i].isCancel;

                            this.storeListOrigin[j].createTime = this.extra[i].createTime;
                            this.storeListOrigin[j].expireTime = new Date(new Date().setMonth(new Date(this.extra[i].createTime).getMonth() + 1));
                            this.storeListOrigin[j].isCancel = this.extra[i].isCancel;
                        }
                    }
                }

                this.RECORD_MYSHOPS(this.storeListOrigin.map(item=>item.id));
                
                //隐藏加载动画
                this.hideLoading();

                
            },
            async cancelStore(store,index){

                let response = await cancelMyStore(this.user.id,[store.id]);

                if(response.status == 0){
                    store.isCancel = !store.isCancel;
                    this.storeList.splice( index,1,store);
                    return true;
                }

                return false;

            },
            async renewStore(store,index){
                let response = await renewMyStore(this.user.id,[store.id]);

                if(response.status == 0){
                    store.isCancel = !store.isCancel;
                    this.storeList.splice( index,1,store);
                    return true;
                }

                return false;

            },
            searchLocal :debounce(function (keyword) {
              
                if (keyword && keyword != " ") {

                    this.storeList = this.storeListOrigin.filter(store=>{
                        return store.name.indexOf(keyword) > -1;
                    });

                }else if(keyword == "") {
                    this.storeList = this.storeListOrigin;
                }

            }, 1000),
            gotoAddress(path){
                this.$router.push(path);
            },
            closeTip(){
                this.$emit('closeTip')
            },

            alert(store,index){

                this.showAlert = true;

                if(store.branchName==""){
                    this.alertText = store.name;
                }else{
                    this.alertText = store.name + "("+store.branchName+")";
                }

                this.alertSubText = store.address;
                this.alertTime = store.createTime;
                this.alertImg = store.defaultPic;

                if( store.isCancel == false){
                    this.confirmBtn = "取消订阅";
                    this.format = '自YYYY年MM月DD日取消订阅';
                    this.alertFunc = ()=>{
                        return this.cancelStore(store,index);
                    }
                }else{
                    this.confirmBtn = "继续订阅";
                    this.format = '自YYYY年MM月DD日继续订阅';
                    this.alertFunc = ()=>{
                        return this.renewStore(store,index);
                    }
                }
                
            },

            checkPhoneNumber(){
                console.log(this.user.profileImg);

                this.showAlert = true;

                this.alertText = this.user.realName;

                this.alertSubText = '欢迎使用蜜蜂点评，请先绑定手机';
                this.alertTime = new Date();
                this.alertImg = this.user.profileImg;

                this.confirmBtn = "立刻绑定";
                this.format = 'YYYY年MM月DD日';
                this.alertFunc = ()=>{
                   this.$router.push({path:'/login'});
                }
            },
            //获取食品列表的高度，存入shopListTop
            getFoodListHeight(){
                // const listContainer = this.$refs.menuFoodList;
                // const listArr = Array.from(listContainer.children[0].children);
                // listArr.forEach((item, index) => {
                //     this.shopListTop[index] = item.offsetTop;
                // });
                // this.listenScroll(listContainer)
            },
            //当滑动食品列表时，监听其scrollTop值来设置对应的食品列表标题的样式
            listenScroll(element){
                // this.foodScroll = new BScroll(element, {
                //     probeType: 3,
                //     deceleration: 0.001,
                //     bounce: false,
                //     swipeTime: 2000,
                //     click: true,
                // });

                // const wrapperMenu = new BScroll('#wrapper_menu', {
                //     click: true,
                // });

                // const wrapMenuHeight = this.$refs.wrapperMenu.clientHeight;
                // this.foodScroll.on('scroll', (pos) => {
                //     if (!this.$refs.wrapperMenu) {
                //         return 
                //     }
                //     this.shopListTop.forEach((item, index) => {
                //         if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
                //             this.menuIndex = index;
                //             const storeList=this.$refs.wrapperMenu.querySelectorAll('.activity_menu');
                //             const el = storeList[0];
                //             wrapperMenu.scrollToElement(el, 800, 0, -(wrapMenuHeight/2 - 50));
                //         }
                //     })
                // })
            },
            //控制活动详情页的显示隐藏
            showActivitiesFun(){
                this.showActivities = !this.showActivities;
            },
            //点击左侧食品列表标题，相应列表移动到最顶层
            chooseMenu(index){
                this.menuIndex = index;
                //menuIndexChange解决运动时listenScroll依然监听的bug
                this.menuIndexChange = false;
                this.foodScroll.scrollTo(0, -this.shopListTop[index], 400);
                this.foodScroll.on('scrollEnd', () => {
                    this.menuIndexChange = true;
                })
            },
            showTitleDetail(index){
                if (this.TitleDetailIndex == index) {
                    this.TitleDetailIndex = null;
                }else{
                    this.TitleDetailIndex = index;
                }
            },
            //加入购物车，所需7个参数，商铺id，食品分类id，食品id，食品规格id，食品名字，食品价格，食品规格
            addToCart(category_id, item_id, food_id, name, price, specs){
                this.ADD_CART({shopid: this.shopId, category_id, item_id, food_id, name, price, specs});
            },
            //移出购物车，所需7个参数，商铺id，食品分类id，食品id，食品规格id，食品名字，食品价格，食品规格
            removeOutCart(category_id, item_id, food_id, name, price, specs){
                this.REDUCE_CART({shopid: this.shopId, category_id, item_id, food_id, name, price, specs});
            },
            /**
             * 初始化和shopCart变化时，重新获取购物车改变过的数据，赋值 categoryNum，totalPrice，cartFoodList，整个数据流是自上而下的形式，所有的购物车数据都交给vuex统一管理，包括购物车组件中自身的商品数量，使整个数据流更加清晰
             */
            
            //控制购物列表是否显示
            toggleCartList(){
                this.cartFoodList.length ? this.showCartList = !this.showCartList : true;
            },
            //清除购物车
            clearCart(){
                this.toggleCartList();
                this.CLEAR_CART(this.shopId);
            },
            //监听圆点是否进入购物车
            listenInCart(){
                if (!this.receiveInCart) {
                    this.receiveInCart = true;
                    this.$refs.cartContainer.addEventListener('animationend', () => {
                        this.receiveInCart = false;
                    })
                    this.$refs.cartContainer.addEventListener('webkitAnimationEnd', () => {
                        this.receiveInCart = false;
                    })
                }
            },
            //获取不同类型的评论列表
            async changeTgeIndex(index, name){
                this.ratingTageIndex = index;
                this.ratingOffset = 0;
                this.ratingTagName = name;
                let res = await getRatingList(this.shopId, this.ratingOffset, name);
                this.ratingList = [...res];
                this.$nextTick(() => {
                    this.ratingScroll.refresh();
                })
            },
            //加载更多评论
            async loaderMoreRating(){
                if (this.preventRepeatRequest) {
                    return
                }
                this.loadRatings = true;
                this.preventRepeatRequest = true;
                this.ratingOffset += 10;
                let ratingDate = await getRatingList(this.shopId, this.ratingOffset, this.ratingTagName);
                this.ratingList = [...this.ratingList,...ratingDate];
                this.loadRatings = false;
                if (ratingDate.length >= 10) {
                    this.preventRepeatRequest = false;
                }
            },
            //隐藏动画
            hideLoading(){
                this.showLoading = false;
            },
            //显示规格列表
            showChooseList(foods){
                if (foods) {
                    this.choosedFoods = foods;
                }
                this.showSpecs = !this.showSpecs;
                this.specsIndex = 0;
            },
            //记录当前所选规格的索引值
            chooseSpecs(index){
                this.specsIndex = index;
            },
            //多规格商品加入购物车
            addSpecs(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock){
                this.ADD_CART({shopid: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock});
                this.showChooseList();
            },
            //显示提示，无法减去商品
            showReduceTip(){
                this.showDeleteTip = true;
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer);
                    this.showDeleteTip = false;
                }, 3000);
            },
            //显示下落圆球
            showMoveDotFun(showMoveDot, elLeft, elBottom){
                this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
                this.elLeft = elLeft;
                this.elBottom = elBottom;
            },
            beforeEnter(el){
                el.style.transform = `translate3d(0,${37 + this.elBottom - this.windowHeight}px,0)`;
                el.children[0].style.transform = `translate3d(${this.elLeft - 30}px,0,0)`;
                el.children[0].style.opacity = 0;
            },
            afterEnter(el){
                el.style.transform = `translate3d(0,0,0)`;
                el.children[0].style.transform = `translate3d(0,0,0)`;
                el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
                el.children[0].style.transition = 'transform .55s linear';
                this.showMoveDot = this.showMoveDot.map(item => false);
                el.children[0].style.opacity = 1;
                el.children[0].addEventListener('transitionend', () => {
                    this.listenInCart();
                })
                el.children[0].addEventListener('webkitAnimationEnd', () => {
                    this.listenInCart();
                })
            },
            goback(){
                this.$router.go(-1);
            }
        },
        watch: {
            //showLoading变化时说明组件已经获取初始化数据，在下一帧nextTick进行后续操作
            showLoading: function (value){
                if (!value) {
                    this.$nextTick(() => {
                        // this.getFoodListHeight();
                        // this.initCategoryNum();
                    })
                }
            },
            shopCart: function (value){
                this.initCategoryNum();
            },
            //购物车列表发生变化，没有商铺时，隐藏
            cartFoodList: function (value){
                if(!value.length){
                    this.showCartList = false;
                }
            },
            //商品、评论切换状态
            changeShowType: function (value){
                // if (value === 'rating') {
                //     this.$nextTick(() => {
                //         this.ratingScroll = new BScroll('#ratingContainer', {
                //             probeType: 3,
                //             deceleration: 0.003,
                //             bounce: false,
                //             swipeTime: 2000,
                //             click: true,
                //         });
                //         this.ratingScroll.on('scroll', (pos) => {
                //             if (Math.abs(Math.round(pos.y)) >=  Math.abs(Math.round(this.ratingScroll.maxScrollY))) {
                //                 this.loaderMoreRating();
                //                 this.ratingScroll.refresh();
                //             }
                //         })
                //     })
                // }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    @keyframes mymove{
       0%   { transform: scale(1) }
       25%  { transform: scale(.8) }
       50%  { transform: scale(1.1) }
       75%  { transform: scale(.9) }
       100% { transform: scale(1) }
    }
    @-moz-keyframes mymove{
       0%   { transform: scale(1) }
       25%  { transform: scale(.8) }
       50%  { transform: scale(1.1) }
       75%  { transform: scale(.9) }
       100% { transform: scale(1) }
    }
    @-webkit-keyframes mymove{
       0%   { transform: scale(1) }
       25%  { transform: scale(.8) }
       50%  { transform: scale(1.1) }
       75%  { transform: scale(.9) }
       100% { transform: scale(1) }
    }
    @-o-keyframes mymove{
       0%   { transform: scale(1) }
       25%  { transform: scale(.8) }
       50%  { transform: scale(1.1) }
       75%  { transform: scale(.9) }
       100% { transform: scale(1) }
    }
    @keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }
    .alet_container{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
    }
    .tip_text_container{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -6rem;
        margin-left: -6rem;
        width: 12rem;
        animation: tipMove .4s ;
        background-color: rgba(255,255,255,1);
        border: 1px;
        padding-top: .6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px;
        border-radius: 0.25rem;
        .tip_icon{
            @include wh(3rem, 3rem);
            border: 0.15rem solid #f8cb86;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            span:nth-of-type(1){
                @include wh(.12rem, 1.5rem);
                background-color: #f8cb86;
            }
            span:nth-of-type(2){
                @include wh(.2rem, .2rem);
                border: 1px;
                border-radius: 50%;
                margin-top: .2rem;
                background-color: #f8cb86;
            }
        }
        .tip_text{
            @include sc(.7rem, #333);
            line-height: .9rem;
            text-align: center;
            margin-top: .8rem;
            padding: 0 .4rem;
        }
        .confrim{
            @include sc(.8rem, #fff);
            font-weight: bold;
            margin-top: .8rem;
            background-color: #4cd964;
            width: 100%;
            text-align: center;
            line-height: 1.8rem;
            border: 1px;
            border-bottom-left-radius: 0.25rem;
            border-bottom-right-radius: 0.25rem;
        }
    }
    .shop_back_svg_container{
        position: fixed;
        @include wh(100%, 100%);
        img{
            @include wh(100%, 100%);
        }
    }
    .shop_container{
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        left: 0;
        height:100%;
        min-height: 100%;
    }
    .goback{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2rem;
        z-index: 11;
        padding-top: 0.2rem;
        padding-left: 0.2rem;
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
            /*background-color: rgba(119,103,137,.43);*/
            background:-moz-linear-gradient(bottom,#fdcb2e,#fbba2a);/*Mozilla*/  
            background:-webkit-gradient(linear,0 0%,100% 100%,from(#fdcb2e),to(#fbba2a));/*Old gradient for webkit*/  
            background:-webkit-linear-gradient(bottom,#fdcb2e,#fbba2a);/*new gradient for Webkit*/  
            background:-o-linear-gradient(bottom,#fdcb2e,#fbba2a); /*Opera11*/ 
            padding: 0.2rem 0.8rem 0.6rem 0.8rem;
            width: 100%;
            overflow: hidden;
            .description_top{
                display: flex;
                margin-top:0.6rem;
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
                        @include sc(.6rem, #282828);
                        /*font-weight: bold;*/
                        width: 100%;
                        margin-top:0.6rem;
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
                .description_more{
                    flex:2;
                }
                .description_arrow{
                    @include ct;
                    right: 0.3rem;
                    z-index: 11;
                }
                .shop_detail_vip{
                    display: inline-block;
                    font-size: 12px;
                    line-height: 12px;
                    margin-top:14px;
                    float:right;
                    padding: .4rem .4rem .4rem .8rem;
                    background-color:#3d3d3d;
                    /*@include bis('../../images/vip.jpg');*/
                    /*background-size: 34px auto;
                    background-position: 68px center;*/

                    border-radius: 6px;
                    border:1px solid rgba(0,0,0,0.5);
                    border-width:0 0 0.025rem 0;
                    span{
                        color:#fff;
                        display: inline-block;
                        vertical-align:middle;
                        font-size:0.5rem;
                    }
                    .icon_style{
                        width: .5rem;
                        height:.5rem;
                        font-size:0.5rem;
                        color:#fff;
                        display: inline-block;
                        vertical-align:middle;
                        use{
                            fill:#fff;
                        }
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
    .activities_details{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #262626;
        z-index: 200;
        padding: 1.25rem;
        .activities_shoptitle{
            text-align: center;
            @include sc(.8rem, #fff);
        }
        .activities_ratingstar{
            display: flex;
            justify-content: center;
            transform: scale(2.2);
            margin-top: .7rem;
        }
        .activities_list{
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            @include sc(.5rem, #fff);
            li{
                margin-bottom: .2rem;
                .activities_icon{
                    padding: 0 .02rem;
                    display: inline-block;
                    border: 0.025rem solid #fff;
                    border-radius: 0.1rem;
                }
                span{
                    color: #fff;
                    line-height: .6rem;
                }
            }
        }
        .activities_shopinfo{
            p{
                line-height: .7rem;
                @include sc(.5rem, #fff);
            }
        }
        .activities_title_style{
            text-align: center;
            margin-bottom: 1rem;
            span{
                @include sc(.5rem, #fff);
                border: 0.025rem solid #555;
                padding: .2rem .4rem;
                border-radius: 0.5rem;
            }

        }
        .close_activities{
            position: absolute;
            bottom: 1rem;
            @include cl;
        }
    }
    .emptyShop{
        @include bis('../../images/empty1.png');
        background-color:#fff;
        background-size: 100% auto;
        background-position: center bottom;
        padding-bottom:1rem!important;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        .start_button{
            @include wh(90%, auto);
            text-align: center;
            background-color:#ffd101;
            padding:.4rem 0 .6rem 0;
            border-radius: .2rem;
            span{
                @include sc(.7rem, #312f26);
            }
            .icon_style{
                @include wh(.7rem, .7rem);
            }
        }
    }
    .food_container{
        padding-top:7rem;
        padding-bottom: 1.95rem;
        min-height: 100%;
    }
    .menu_container{
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
            .store_detail_list{
                background-color: #fff;
                padding: .6rem .4rem .6rem .6rem;
                border-bottom: 1px solid #e5e5e5;
                display:flex;
                overflow: hidden;

                .store_right{

                    svg{
                        margin-top:24px;
                        @include wh(1rem, 1rem);
                        fill: #999;
                    }
                }
                .store_img{
                    display: block;
                    margin-right: .6rem;
                    margin-left: .2rem;
                    img{
                        @include wh(2.6rem, 2.6rem);
                        display: block;
                        border:1px solid #ccc;
                    }
                }
                .store_info{
                    width:50%;
                    flex:1;
                    .store_head{
                        @include fj;
                        margin-bottom: .2rem;
                        .store_name{
                            @include sc(.6rem, #333);
                            span{
                                vertical-align:middle;
                            }
                            .store_status{
                                background-color: #fc3c3f;
                                @include sc(.4rem, #fff);
                                padding: .1rem .2rem;
                                &.green{
                                    background-color: #5ddb44;
                                }
                                &.red{
                                    background-color: #fc3c3f;
                                }
                            }
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
                    .store_content{
                        @include sc(.6rem, #969696);
                        line-height: .8rem;
                    }
                    .store_time{
                        line-height: .6rem;
                        span{
                            @include sc(.48rem, #d5d5d5);
                        }
                        .cancel{
                            background-color: #fc997a;
                            @include sc(.4rem, #fff);
                            padding:.1rem .3rem;
                            border-radius: .1rem;
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
    .buy_cart_container{
        position: absolute;
        background-color: #3d3d3f;
        bottom: 0;
        left: 0;
        z-index: 13;
        display: flex;
        @include wh(100%, 2rem);
        .cart_icon_num{
            flex: 1;
            .cart_icon_container{
                display: flex;
                background-color: #3d3d3f;
                position: absolute;
                padding: .4rem;
                border: 0.18rem solid #444;
                border-radius: 50%;
                left: .5rem;
                top: -.7rem;
                .cart_icon{
                    @include wh(1.2rem, 1.2rem);
                }
                .cart_list_length{
                    position: absolute;
                    top: -.25rem;
                    right: -.25rem;
                    background-color: #ff461d;
                    line-height: .7rem;
                    text-align: center;
                    border-radius: 50%;
                    border: 0.025rem solid #ff461d;
                    min-width: .7rem;
                    height: .7rem;
                    @include sc(.5rem, #fff);
                    font-family: Helvetica Neue,Tahoma,Arial;
                }
            }
            .move_in_cart{
                animation: mymove .5s ease-in-out;
            }
            .cart_icon_activity{
                 background-color: #3190e8;
            }
            .cart_num{
                @include ct;
                left: 3.5rem;

                div{
                    color: #fff;
                }
                div:nth-of-type(1){
                    font-size: .8rem;
                    font-weight: bold;
                    margin-bottom: .1rem;
                }
                div:nth-of-type(2){
                    font-size: .4rem;
                }
            }
        }
        .gotopay{
            position: absolute;
            right: 0;
            background-color: #535356;
            @include wh(5rem, 100%);
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            .gotopay_button_style{
                @include sc(.7rem, #fff);
                font-weight: bold;
            }
        }
        .gotopay_acitvity{
            background-color: #4cd964;
        }
    }
    .cart_food_list{
        position: fixed;
        width: 100%;
        padding-bottom: 2rem;
        z-index: 12;
        bottom: 0;
        left: 0;
        background-color: #fff;
        header{
            @include fj;
            align-items: center;
            padding: .3rem .6rem;
            background-color: #eceff1;
            svg{
                @include wh(.6rem,.6rem);
                vertical-align: middle;
            }
            h4{
                @include sc(.7rem, #666);
            }
            .clear_cart{
                @include sc(.6rem, #666);
            }
        }
        .cart_food_details{
            background-color: #fff;
            max-height: 20rem;
            overflow-y: auto;
            .cart_food_li{
                @include fj;
                padding: .6rem .5rem;
                .cart_list_num{
                    width: 55%;
                    p:nth-of-type(1){
                        @include sc(.7rem, #666);
                        font-weight: bold;
                    }
                    p:nth-of-type(2){
                        @include sc(.4rem, #666);
                    }
                }
                .cart_list_price{
                    font-size: 0;
                    span:nth-of-type(1){
                        @include sc(.6rem, #f60);
                        font-family: Helvetica Neue,Tahoma;

                    }
                    span:nth-of-type(2){
                        @include sc(.7rem, #f60);
                        font-family: Helvetica Neue,Tahoma;
                        font-weight: bold;
                    }
                }
                .cart_list_control{
                    display: flex;
                    align-items: center;
                    span{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    svg{
                        @include wh(.9rem, .9rem);
                        fill: #3190e8;
                    }
                    .specs_reduce_icon{
                        fill: #999;
                    }
                    .cart_num{
                        @include sc(.65rem, #666);
                        min-width: 1rem;
                        text-align: center;
                        font-family: Helvetica Neue,Tahoma;
                    }
                }
            }
        }
    }
    .screen_cover{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,.3);
        z-index: 11;
    }
    .change_show_type{
        display: flex;
        /*background-color: #fff;*/
        background:-moz-linear-gradient(left,#fa5c5d,#fcaf9b);/*Mozilla*/  
        background:-webkit-gradient(linear,0 50%,100% 50%,from(#fa5c5d),to(#fcaf9b));/*Old gradient for webkit*/  
        background:-webkit-linear-gradient(left,#fa5c5d,#fcaf9b);/*new gradient for Webkit*/  
        background:-o-linear-gradient(left,#fa5c5d,#fcaf9b); /*Opera11*/ 
        padding: .3rem 0 .6rem;
        border-bottom: 1px solid #ebebeb;
        div{
            flex: 1;
            text-align: center;
            span{
                @include sc(.65rem, #fac6bb);
                padding: .2rem .1rem;
                border-bottom: 0rem solid #fff;
            }
            .activity_show{
                color: #fff;
                border-width:0.12rem;
            }
        }
    }
    .rating_container{
        flex: 1;
        overflow-y: hidden;
        flex-direction: column;
        p, span, li, time{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
        .rating_header{
            display: flex;
            background-color: #fff;
            padding: .8rem .5rem;
            margin-bottom: 0.5rem;
            .rating_header_left{
                flex: 3;
                text-align: center;
                p:nth-of-type(1){
                    @include sc(1.2rem, #f60);
                }
                p:nth-of-type(2){
                    @include sc(.65rem, #666);
                    margin-bottom: .1rem;
                }
                p:nth-of-type(3){
                    @include sc(.4rem, #999);
                }
            }
            .rating_header_right{
                flex: 4;
                p{
                    font-size: .65rem;
                    line-height: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    span:nth-of-type(1){
                        color: #666;
                        margin-right: .5rem;
                    }
                    .rating_num{
                        width: 3rem;
                        @include sc(.55rem, #f60);
                    }
                    .delivery_time{
                        @include sc(.4rem, #999);
                    }
                }
            }
        }
        .tag_list_ul{
            display: flex;
            flex-wrap: wrap;
            background-color: #fff;
            padding: .5rem;
            li{
                @include sc(.6rem, #6d7885);
                padding: .3rem .3rem;
                background-color: #ebf5ff;
                border-radius: 0.2rem;
                border: 1px;
                margin: 0 .4rem .2rem 0;
            }
            .unsatisfied{
                background-color: #f5f5f5;
                color: #aaa;
            }
            .tagActivity{
                background-color: #3190e8;
                color: #fff;
            }
        }
        .rating_list_ul{
            background-color: #fff;
            padding: 0 .5rem;
            .rating_list_li{
                border-top: 1px solid #f1f1f1;
                display: flex;
                padding: .6rem 0;
                .user_avatar{
                    @include wh(1.5rem, 1.5rem);
                    border: 0.025rem;
                    border-radius: 50%;
                    margin-right: .8rem;
                }
                .rating_list_details{
                    flex: 1;
                    header{
                        display: flex;
                        flex: 1;
                        justify-content: space-between;
                        margin-bottom: .3rem;
                        .username_star{
                            @include sc(.55rem, #666);
                            .username{
                                color: #666;
                                margin-bottom: .2rem;
                            }
                            .star_desc{
                                display: flex;
                                align-items: center;
                                .time_spent_desc{
                                    @include sc(.55rem, #666)
                                    margin-left: .15rem;
                                }
                            }
                        }
                        .rated_at{
                            @include sc(.4rem, #999);
                        }
                    }
                    .food_img_ul{
                        display: flex;
                        flex-wrap: wrap;
                        margin-bottom: .4rem;
                        li{
                            img{
                                @include wh(3rem, 3rem);
                                margin-right: .4rem;
                                display: block;
                            }
                        }
                    }
                    .food_name_ul{
                        display: flex;
                        flex-wrap: wrap;
                        li{
                            @include sc(.55rem, #999);
                            width: 2.2rem;
                            padding: .2rem;
                            border: 0.025rem solid #ebebeb;
                            border-radius: 0.15rem;
                            margin-right: .3rem;
                            margin-bottom: 4px;
                        }
                    }
                }
            }
        }
    }
    .specs_cover{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.4);
        z-index: 17;
    }
    .specs_list{
        position: fixed;
        top: 35%;
        left: 15%;
        width: 70%;
        background-color: #fff;
        z-index: 18;
        border: 1px;
        border-radius: 0.2rem;
        .specs_list_header{
            h4{
                @include sc(.7rem, #222);
                font-weight: normal;
                text-align: center;
                padding: .5rem;
            }
            .specs_cancel{
                position: absolute;
                right: .5rem;
                top: .5rem;
            }
        }
        .specs_details{
            padding: .5rem;
            .specs_details_title{
                @include sc(.6rem, #666);
            }
            ul{
                display: flex;
                flex-wrap: wrap;
                padding: .4rem 0;
                li{
                    font-size: .6rem;
                    padding: .3rem .5rem;
                    border: 0.025rem solid #ddd;
                    border-radius: .2rem;
                    margin-right: .5rem;
                    margin-bottom: .2rem;
                }
                .specs_activity{
                    border-color: #3199e8;
                    color: #3199e8;
                }
            }
        }
        .specs_footer{
            @include fj;
            align-items: center;
            background-color: #f9f9f9;
            padding: 0.5rem;
            border: 1px;
            border-bottom-left-radius: .2rem;
            border-bottom-right-radius: .2rem;
            .specs_price{
                span{
                    color: #ff6000;
                }
                span:nth-of-type(1){
                    font-size: .5rem;
                }
                span:nth-of-type(2){
                    font-size: .8rem;
                    font-weight: bold;
                    font-family: Helvetica Neue,Tahoma;
                }
            }
            .specs_addto_cart{
                @include wh(4rem, 1.3rem);
                background-color: #3199e8;
                border: 1px;
                border-radius: 0.15rem;
                @include sc(.6rem, #fff);
                text-align: center;
                line-height: 1.3rem;
            }
        }
    }
    .show_delete_tip{
        position: fixed;
        top: 50%;
        left: 15%;
        width: 70%;
        transform: translateY(-50%);
        background-color: rgba(0,0,0,.8);
        z-index: 18;
        @include sc(.65rem, #fff);
        text-align: center;
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.25rem;
    }
    .move_dot{
        position: fixed;
        bottom: 30px;
        left: 30px;

        svg{
            @include wh(.9rem, .9rem);
            fill: #3190e8;
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .fade-choose-enter-active, .fade-choose-leave-active {
        transition: opacity .5s;
    }
    .fade-choose-leave, .fade-choose-leave-active {
        display: none;
    }
    .fade-choose-enter, .fade-choose-leave-active {
        opacity: 0;
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
    .toggle-cart-enter-active, .toggle-cart-leave-active {
        transition: all .3s ease-out;
    }
    .toggle-cart-enter, .toggle-cart-leave-active {
        transform: translateY(100%);
    }
    .search_container{
        background-color:#fff;
        
        @include wh(100%, auto);
        padding:.4rem 0;
        @include sc(.6rem, #ccc);
        text-align: center;
        font-weight: normal;
        margin:14px 0 0 0;
        border-radius: 4px;

    }

    @media (max-width: 320px) {
        .chart_container{
            height: 246px;
        }
        .search_submit{
            padding-bottom: 0.4rem;
        }
        .shop_detail_header .description_header .description_top .shop_detail_vip{
            padding: .4rem .4rem .4rem .8rem;
        }
        .menu_container .menu_right .store_detail_list .store_info .store_head .store_name .store_status{
            padding: 0 .2rem .1rem;
        }
    }

</style>
