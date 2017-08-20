 <template>
    <div>
        <section v-if="!showLoading" class="shop_container main_container">
            <!-- <nav class="goback" @click="goback">
                <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:3"/>
                </svg>
            </nav> -->
            
            
            <section class="change_show_type" ref="chooseType">
                <div  @click="changeShowType='full'">
                    <span :class='{activity_show: changeShowType =="full"}'>综合统计</span>
                </div>
                <div  @click="changeShowType='shop'">
                    <span :class='{activity_show: changeShowType =="shop"}'>门店统计</span>
                </div>
            </section>
            
            <section class="sort_container" v-show="changeShowType =='full'">
                <div class="sort_item">
                    <div class="sort_item_container" @click="chooseType('food')">
                        <div class="sort_item_border">
                            <span>按周排列</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="sort_item" >
                    <div class="sort_item_container" @click="chooseType('rating')">
                        <div class="sort_item_border">
                            <span>全部品牌</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>
            <section class="chart_container" v-show="changeShowType =='full'">
                <IEcharts :option="bar" :height="270" theme="customer" @ready="onReady" @click="onClick"></IEcharts>
            </section>
           <!--  <section class="detail_container" v-show="changeShowType =='full'">
                <input type="submit" name="button" class="search_submit" value="查看门店详细信息" @click="onClick">
            </section> -->
            <section class="reply_container" v-show="changeShowType =='full'">
               <div class="reply_item">
                   <div class="reply_item_border">负面评论
                        <div class="reply_item_count">100条</div>
                   </div>
                </div>
               <div class="reply_item">
                   <div class="reply_item_border">正面评论
                        <div class="reply_item_count green">26条</div>
                    </div>
                   <div class="reply_item_border">中性评论
                        <div class="reply_item_count green">35条</div>
                    </div>
               </div>
            </section>

            <section class="sort_container" v-show="changeShowType =='shop'">
                <div class="sort_item">
                    <div class="sort_item_container" @click="chooseType('shop')">
                        <div class="sort_item_border">
                            <span>按周排列</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg>
                        </div>
                    </div>
                     
                </div>
                <div class="sort_item" >
                    <div class="sort_item_container" @click="chooseType('shop')">
                        <div class="sort_item_border">
                            <span>全部地区</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="sort_item" >
                    <div class="sort_item_container" @click="chooseType('shop')">
                        <div class="sort_item_border">
                            <span>今天</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>
            <section class="shoplist_container" v-show="changeShowType =='shop'">
                <ul v-if="storeList.length > 0">
                    <router-link v-for="(item,index) in storeList" :key="index" :to="{path: 'shop/shopDetail', query:{storeId:item.id,storeName:item.name+'('+ item.branchName+')'}}" tag="li">
                        <section class="menu_detail_list">
                            <div class="menu_detail_link">
                                <section class="menu_food_img">
                                    <img :src="item.defaultPic">
                                </section>
                                <section class="menu_food_description">
                                    <h3 class="food_description_head">
                                        <strong class="description_foodname">{{item.name}}({{item.branchName}})</strong>
                                    </h3>
                                    <p class="food_description_content">{{item.regionName}}&nbsp;&nbsp;{{item.priceText}}</p>
                                </section>
                            </div>
                        </section>
                        <ul class="menu_detail_reply">
                            <li>
                                <div class="reply_content">正面评论</div>
                                <div class="reply_count green">13</div>
                            </li>
                            <li>
                                <div class="reply_content">中性评论</div>
                                <div class="reply_count yellow">09</div>
                            </li>
                            <li>
                                <div class="reply_content">负面评论</div>
                                <div class="reply_count red">23</div>
                            </li>
                        </ul>
                    </router-link>

                </ul>
            </section>
            
        </section>
            
        <foot-guide></foot-guide>
       <loading v-show="showLoading || loadRatings"></loading>
       <!-- <section class="animation_opactiy shop_back_svg_container" v-if="showLoading">
           <img src="../../images/shop_back_svg.svg">
       </section> -->
       <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {userHome} from 'src/service/getData'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import loading from 'src/components/common/loading'

    import {loadMore, getImgPath} from 'src/components/common/mixin'
    import {imgBaseUrl} from 'src/config/env'
    import BScroll from 'better-scroll'
    import footGuide from '../../components/footer/footGuide'
    import IEcharts from 'vue-echarts-v3/src/full.vue';
    import theme from './theme.json'
    IEcharts.registerTheme('customer', theme)
    export default {
        data(){
            return{
                geohash: '', //geohash位置信息
                shopId: null, //商店id值
                showLoading: true, //显示加载动画
                changeShowType: 'full',//切换显示商品或者评价
                shopDetailData: null, //商铺详情
                showActivities: false, //是否显示活动详情
                storeList: [], //食品列表
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
                bar: {
                    tooltip : {
                        trigger: 'axis',
                        // axisPointer: {
                        //     type: 'cross',
                        //     label: {
                        //         backgroundColor: '#6a7985'
                        //     }
                        // }
                    },
                    grid: {
                        left: '-5%',
                        right: '5%',
                        bottom: '3%',
                        top: '10%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            position: 'top',
                            offset:10,
                            type : 'category',
                            boundaryGap : false,
                            data : ['周日','周一','周二','周三','周四','周五','今天'],
                            nameTextStyle :{
                                color  : "#000"
                            },
                            
                        }
                    ],
                    yAxis : [
                        {
                            axisLine :{
                                show : false
                            },
                            axisLabel:{
                                show : false
                            },
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'差评',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {opacity : 0.1}},
                            data:[1201, 1132, 1101, 134, 190, 1230, 1210]
                        },{
                            name:'中评',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {opacity : 0.1}},
                            data:[201, 1132, 101, 134, 1190, 230, 210]
                        },
                        {
                            name:'好评',
                            type:'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                },
                            },
                            areaStyle: {normal: {opacity : 0.1}},
                            data:[820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                }
            }
        },
        created(){
            // this.geohash = this.$route.query.geohash;
            // this.shopId = this.$route.query.id;
        },
        mounted(){
            this.initData();
            this.windowHeight = window.innerHeight;
        },
        beforeDestroy(){
            // this.foodScroll.removeEventListener('scroll', )
        },
        mixins: [loadMore, getImgPath],
        components: {
            loading,
            footGuide,
            IEcharts,
        },
        computed: {
            ...mapState([
                'latitude','longitude','cartList'
            ]),
            promotionInfo: function (){
                return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。'
            },
            //配送费
            deliveryFee: function () {
                if (this.shopDetailData) {
                    return this.shopDetailData.float_delivery_fee;
                }else{
                    return null;
                }
            },
            //还差多少元起送，为负数时显示去结算按钮
            minimumOrderAmount: function () {
                if (this.shopDetailData) {
                    return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
                }else{
                    return null;
                }
            },
            //当前商店购物信息
            shopCart: function (){
                return {...this.cartList[this.shopId]};
            },
            //购物车中总共商品的数量
            totalNum: function (){
                let num = 0;
                this.cartFoodList.forEach(item => {
                    num += item.num
                })
                return num
            },
        },
        methods: {
            ...mapMutations([
                'RECORD_ADDRESS','ADD_CART','REDUCE_CART','CLEAR_CART','RECORD_SHOPDETAIL'
            ]),
            //初始化时获取基本数据
            async initData(){
                // if (!this.latitude) {
                    // //获取位置信息
                    // let res = await msiteAdress(this.geohash);
                    // // 记录当前经度纬度进入vuex
                    // this.RECORD_ADDRESS(res);
                // }
                // //获取商铺信息
                // this.shopDetailData = await shopDetails(this.shopId, this.latitude, this.longitude);
                // //获取商铺食品列表
                // this.storeList = await foodMenu(this.shopId);
                // //评论列表
                // this.ratingList = await getRatingList(this.shopId, this.ratingOffset);
                // //商铺评论详情
                // this.ratingScoresData = await ratingScores(this.shopId);
                // //评论Tag列表
                // this.ratingTagsList = await ratingTags(this.shopId);
                // this.RECORD_SHOPDETAIL(this.shopDetailData)
                this.user =  JSON.parse(getStore('user'));
                let response = await userHome(this.user.id);
                if(response.status == 0){
                    this.storeList = response.stores;
                }
                console.log(this.storeList.length);

                //隐藏加载动画
                this.hideLoading();
            },
            doRandom() {
                const that = this;
                let data = [];
                for (let i = 0, min = 1000, max = 3000; i < 7; i++) {
                  data.push(Math.floor(Math.random() * (max + 1 - min) + min));
                }
                that.bar.series[0].data = data;
            },
            onReady(instance) {
                console.log(instance);

                this.hideLoading();
            },
            onClick(event, instance, echarts) {
                console.log(arguments);
                this.doRandom();
            },

            //隐藏动画
            hideLoading(){
                this.showLoading = false;
            },

            //商品、评论切换状态
            changeShowType: function (value){
                if (value === 'full') {
                    this.$nextTick(() => {

                    })
                }
                if (value === 'rating') {
                    this.$nextTick(() => {
                        this.ratingScroll = new BScroll('#ratingContainer', {
                            probeType: 3,
                            deceleration: 0.003,
                            bounce: false,
                            swipeTime: 2000,
                            click: true,
                        });
                        this.ratingScroll.on('scroll', (pos) => {
                            if (Math.abs(Math.round(pos.y)) >=  Math.abs(Math.round(this.ratingScroll.maxScrollY))) {
                                this.loaderMoreRating();
                                this.ratingScroll.refresh();
                            }
                        })
                    })
                }
            },

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
        height: 100%;
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
    .search_submit{
        width:90%;
        height:1.4rem;
        margin-top:.4rem;
        margin-bottom:.4rem;
        border: 0.025rem solid #868686;
        border-width: 0 0 0.025rem 0;
        margin-left: .2rem;
        @include sc(0.65rem, #fff);
        border-radius: 0.125rem;
        background-color: #fc8462;
        font-weight: normal;
        padding: 0 0.25rem;
    }
    .chart_container{
        background-color: #fff;
        border-bottom: 0.025rem solid #f1f1f1;right: 0;
        width: 100%;
        height: 300px;
        display: flex;
        /*flex:1;*/
        z-index: 13;
        box-sizing: border-box;
    }
    .sort_container{
        background-color: #fff;
        border-bottom: 0.025rem solid #f1f1f1;
        right: 0;
        width: 100%;
        display: flex;
        z-index: 13;
        box-sizing: border-box;

        .sort_item{
            flex:1;
            margin:10px 10px 6px 15px;
            @include wh(40%, 1.6rem);
            
            text-align: center;
            line-height: 1rem;
            .sort_item_container{
                @include wh(100%, 100%);
                position: relative;
                z-index: 14;
                background-color: #fff;
                box-sizing: border-box;
                /*padding-top: .3rem;*/
                .sort_item_border{

                    @include sc(.5rem, #fff);
                    border: 0.025rem solid #e1e1e1;
                    padding: .2rem .4rem;
                    border-radius: 0.2rem;
                    line-height: 1rem;
                }
            }
            .sort_icon{
                vertical-align: middle;
                transition: all .3s;
                fill:#666;
            }
            
        }
        .choose_type{
            .sort_item_container{

                .category_title{
                    color: $blue;
                }
                .sort_icon{
                    transform: rotate(180deg);
                    fill:$blue;
                }
            }
        }
        .showlist-enter-active, .showlist-leave-active {
            transition: all .3s;
            transform: translateY(0);
        }
        .showlist-enter, .showlist-leave-active {
            opacity: 0;
            transform: translateY(-100%);
        }
        .sort_detail_type{
            width: 100%;
            position: absolute;
            display:flex;
            top: 1.6rem;
            left: 0;
            border-top: 0.025rem solid $bc;
            background-color: #fff;
        }
        .category_container{
            .category_left{
                flex: 1;
                background-color: #f1f1f1;
                height: 16rem;
                overflow-y: auto;
                span{
                    @include sc(0.5rem, #666);
                    line-height: 1.8rem;
                }
                .category_left_li{
                    @include fj;
                    padding:0 0.5rem;
                    .category_icon{
                        @include wh(.8rem, .8rem);
                        vertical-align: middle;
                        margin-right: .2rem;
                    }
                    .category_count{
                        background-color: #ccc;
                        @include sc(.4rem, #fff);
                        padding: 0 .1rem;
                        border: 0.025rem solid #ccc;
                        border-radius: 0.8rem;
                        vertical-align: middle;
                        margin-right: 0.25rem;
                    }
                    .category_arrow{
                        vertical-align: middle;
                    }
                }
                .category_active{
                    background-color: #fff;
                }
            }
            .category_right{
                flex: 1;
                background-color: #fff;
                padding-left: 0.5rem;
                height: 16rem;
                overflow-y: auto;
                .category_right_li{
                    @include fj;
                    height: 1.8rem;
                    line-height: 1.8rem;
                    padding-right: 0.5rem;
                    border-bottom: 0.025rem solid $bc;
                    span{
                        color: #666;
                    }
                }
                .category_right_choosed{
                    span{
                        color: $blue;
                    }
                }
            }
        }
        .sort_list_container{
            width: 100%;
            .sort_list_li{
                height: 2.5rem;
                display: flex;
                align-items: center;
                svg{
                    @include wh(0.7rem, 0.7rem);
                    margin:0 .3rem 0 .8rem;
                }
                p{
                    line-height: 2.5rem;
                    flex: auto;
                    text-align: left;
                    text-indent: 0.25rem;
                    border-bottom: 0.025rem solid $bc;
                    @include fj;
                    align-items: center;
                    span{
                        color: #666;
                    }
                }
                .sort_select{
                    span{
                        color: $blue;
                    }
                }
            }
        }
        .filter_container{
            flex-direction: column;
            align-items: flex-start;
            min-height: 10.6rem;
            background-color: #f1f1f1;
            .filter_header_style{
                @include sc(0.4rem, #333);
                line-height: 1.5rem;
                height: 1.5rem;
                text-align: left;
                padding-left: .5rem;
                background-color: #fff;
            }
            .filter_ul{
                display: flex;
                flex-wrap: wrap;
                padding: 0 0.5rem;
                background-color: #fff;
                .filter_li{
                    display: flex;
                    align-items: center;
                    border: 0.025rem solid #eee;
                    @include wh(4.7rem, 1.4rem);
                    margin-right: 0.25rem;
                    border-radius: 0.125rem;
                    padding: 0 0.25rem;
                    margin-bottom: 0.25rem;
                    svg{
                        @include wh(.8rem, .8rem);
                        margin-right: 0.125rem;
                    }
                    span{
                        @include sc(0.4rem, #333);
                    }
                    .filter_icon{
                        @include wh(.8rem, .8rem);
                        font-size: 0.5rem;
                        border: 0.025rem solid $bc;
                        border-radius: 0.15rem;
                        margin-right: 0.25rem;
                        line-height: .8rem;
                        text-align: center;
                    }
                    .activity_svg{
                        margin-right: .25rem;
                    }
                    .selected_filter{
                        color: $blue;
                    }
                }
            }
            .confirm_filter{
                display: flex;
                background-color: #f1f1f1;
                width: 100%;
                padding: .3rem .2rem;
                .filter_button_style{
                    @include wh(50%, 1.8rem);
                    font-size: 0.8rem;
                    line-height: 1.8rem;
                    border-radius: 0.2rem;
                }
                .clear_all{
                    background-color: #fff;
                    margin-right: .5rem;
                    border: 0.025rem solid #fff;
                }
                .confirm_select{
                    background-color: #56d176;
                    color: #fff;
                    border: 0.025rem solid #56d176;
                    span{
                        color: #fff;
                    }
                }
            }
        }
    }
    .detail_container{
        display: flex;
        justify-content: center;
        background-color:#fff;
    }
    .reply_container{
        display: flex;
        flex-direction:column;
        padding-top: .6rem;
        padding-bottom: 2.5rem;
        align-items: center;
        justify-content: center;
        align-content:center;
        .reply_item{
            width:94%;
            display: flex;
            .reply_item_border{
                flex: 1;
                height: 2.6rem;
                @include sc(0.6rem, #949494);
                background-color: #fff;
                margin:  0 0.025rem 0.025rem 0;
                padding: .1rem .5rem;
                .reply_item_count{
                    @include sc(1rem, #fe736f);
                    text-align: right;
                    &.green{
                        color:#caeba0;
                    }
                }
            }
        }
    }
    .shoplist_container{
        overflow-y: auto;
        flex:1;
        display: block;
        flex-direction:column;
        padding-bottom: 2rem;
        align-items: center;
        align-content:center;
        background-color:#fff;
        ul{
            width: 100%;
            overflow: hidden;
            .menu_detail_list{
                flex:1;
                background-color: #fff;
                padding: .6rem .4rem .6rem 1.2rem ;
                border-bottom: 1px solid #f8f8f8;
                position: relative;
                overflow: hidden;
                .menu_detail_link{
                    display:flex;
                    .menu_food_img{
                        margin-right: .4rem;
                        img{
                            @include wh(2rem, 2rem);
                            display: block;
                        }
                    }
                    .menu_food_description{
                        width: 100%;
                        .food_description_head{
                            @include fj;
                            margin-bottom: .1rem;
                            .description_foodname{
                                @include sc(.7rem, #333);
                            }
                        }
                        .food_description_content{
                            @include sc(.7rem, #969696);
                            line-height: 1rem;
                        }
                        
                    }
                }
            }
            .menu_detail_reply{
                display: flex;
                flex-direction:row;
                @include wh(100%, auto);
                @include sc(.7rem, #969696);
                li{
                    flex:1;
                    text-align: center;
                    line-height: 1rem;
                    margin: .5rem 0 .5rem 0;
                    border-right:0.025rem solid #e5e5e5;
                    &:last-child{
                        border-width:0;
                    };

                    .reply_count{
                        @include sc(.9rem, #969696);
                        line-height: 1.2rem;
                        &.green{
                            color:#88ce41;
                        }
                        &.yellow{
                            color:#ffd500;
                        }
                        &.red{
                            color:#fc3c3f;
                        }
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
        background-color: #fff;
        padding: .3rem 0 .6rem;
        border-bottom: 1px solid #ebebeb;
        div{
            flex: 1;
            text-align: center;
            span{
                @include sc(.65rem, #d1d1d1);
                padding: .2rem .1rem;
                border-bottom: 0rem solid #fa5b5b;
            }
            .activity_show{
                color: #434343;
                border-width:0.12rem;
            }
        }
    }
    

</style>
