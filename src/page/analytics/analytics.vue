 <template>
    <div>
        <header id='head_top'>
            
            <section class="title_head ellipsis">
                <span class="title_text" >{{date | dateTime('YYYY年MM月DD日') }}</span>
            </section>
            <section class="head_login">
                搜索
            </section>
        </header>
        <section v-if="!showLoading" class="shop_container main_container">
            

            <section class="chart_container" v-show="changeShowType =='full'">
                <IEcharts :option="bar" :height="100" theme="customer" @ready="onReady" @click="onClick"></IEcharts>
            </section>
            <section class="detail_container">
                <input type="button" name="button" class="search_submit" value="查看详情"  @click="gotoAddress({path:'/rateByShop',query:{ids:storeIds,date:dateFormat}})">
            </section>
           <!--  <section class="detail_container" v-show="changeShowType =='full'">
                <input type="submit" name="button" class="search_submit" value="查看门店详细信息" @click="onClick">
            </section> -->
            <section class="reply_container" v-show="changeShowType =='full'">
               <div class="reply_item">
                   <div class="reply_item_border">负面评论
                        <div class="reply_item_count">{{rateCount.countLow}}条</div>
                   </div>
                </div>
               <div class="reply_item">
                   <div class="reply_item_border">正面评论
                        <div class="reply_item_count green">{{rateCount.countHigh}}条</div>
                    </div>
                   <div class="reply_item_border">中性评论
                        <div class="reply_item_count green">{{rateCount.countMid}}条</div>
                    </div>
               </div>
            </section>
        </section>
            
        <foot-guide></foot-guide>
       <loading v-show="showLoading"></loading>
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
    import {getMyStore,getRateAnalytics,getStoreRate} from 'src/service/getData'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import loading from 'src/components/common/loading'

    import {loadMore, getImgPath} from 'src/components/common/mixin'
    import {imgBaseUrl} from 'src/config/env'
    import BScroll from 'better-scroll'
    import footGuide from '../../components/footer/footGuide'
    import IEcharts from 'vue-echarts-v3/src/full.vue'
    import 'echarts/lib/component/graphic'

    import theme from './theme.json'
    IEcharts.registerTheme('customer', theme)


    export default {
        data(){
            return{
                showLoading: true, //显示加载动画
                changeShowType: 'full',//切换显示商品或者评价
                storeList: [],
                storeIds: [],
                chart:null,
                date:new Date(),
                dateFormat:'',
                rateCount:{
                    countLow:0,
                    countMid:0,
                    countHigh:0,
                },
                bar: {
                    title: {
                        left: '4%',
                        top:'4%',
                        text: '统计中..'
                    },
                    toolbox: {
                        
                    },
                    grid: {
                        left: '-10%',
                        right: '0%',
                        bottom: '23px',
                        top: '0%',
                        containLabel: true
                    },
                    tooltip : {
                        show:true,
                        trigger: 'axis',
                        axisPointer: {
                            value: '8/30',
                            snap: false,
                            lineStyle: {
                                color: '#ffe983',
                                opacity: 1,
                                width: 2
                            },
                            label: {
                                show: true,
                                backgroundColor: '#ffe983'
                            },
                            handle: {
                                show: true,
                                color: '#004E52'
                            }
                        },

                        triggerOn:'click'
                    },
                    xAxis : [
                        {
                            position: 'bottom',
                            offset:4,
                            type : 'category',
                            boundaryGap : false,
                            splitLine: {
                                show: false
                            }
                        }
                    ],
                    yAxis : [
                        {
                            show : false,
                            axisLine :{
                                show : false
                            },
                            axisLabel:{
                                show : false
                            },
                            type : 'value'
                        }
                    ],
                    dataZoom: [{
                        type: 'inside',
                        start: 50,
                        end: 100
                    }],
                    series : [
                        {
                            name:'好评',
                            type:'line',
                            areaStyle: {normal: {opacity : 0.1}}
                        },{
                            name:'中评',
                            type:'line',
                            areaStyle: {normal: {opacity : 0.1}}
                        },
                        {
                            name:'差评',
                            type:'line',
                            areaStyle: {normal: {opacity : 0.1}}
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
            // let pie = this.$refs.chart;
            // pie.dispatchAction({
            //     type: 'showTip',
            //     x: 100,
            //     y: 100,
            // });

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

                this.user =  JSON.parse(getStore('user'));
                let response = await getMyStore(this.user.id);
                if(response.status == 0){
                    this.storeList = response.stores;
                }

                this.storeList.map(item=>{
                    this.storeIds.push(item.id);
                })

                // for(let i=0; i < this.storeIds.length ; i++){
                //     getStoreRate(this.user.id, this.storeIds[i]);
                // }

                let _this = this;
                getRateAnalytics(_this.storeIds).then(function(resCount){
                    if(resCount.status == 0){
                        
                        _this.bar.yAxis[0].max = resCount.max*1.3;

                        let year = new Date().getFullYear();
                        _this.bar.xAxis[0].data = resCount.date;
                        _this.date = year+'/'+resCount.date[resCount.date.length-2];
                        _this.dateFormat = new Date(_this.date).getTime();
                        _this.bar.tooltip.axisPointer.value = "8/30";

                        _this.bar.series[0].data = resCount.countHigh;
                        _this.bar.series[1].data = resCount.countMid;
                        _this.bar.series[2].data = resCount.countLow;

                        _this.rateCount.countHigh = _this.bar.series[0].data[resCount.date.length-2]; 
                        _this.rateCount.countMid = _this.bar.series[1].data[resCount.date.length-2]; 
                        _this.rateCount.countLow = _this.bar.series[2].data[resCount.date.length-2]; 

                        _this.bar.tooltip.formatter = function(param){
                            
                            _this.rateCount.countHigh = param[0].data; 
                            _this.rateCount.countMid = param[1].data; 
                            _this.rateCount.countLow = param[2].data; 

                            
                            let year = new Date().getFullYear();
                            if(param[0].axisValue.indexOf(year) == -1){
                                param[0].axisValue = year+'/'+param[0].axisValue;
                            }
                            _this.date = new Date(param[0].axisValue); 
                            _this.dateFormat = _this.date.getTime();
                            console.log(_this.dateFormat);
                        }

                        _this.bar.title.text = _this.storeList[0].name +'等 ('+ _this.storeList.length +'家)门店';
                        _this.chart.option = _this.bar;
                        _this.chart.dispatchAction({type: 'showTip', seriesIndex: '10', dataIndex: '10'})
                    }
                    
                    
                })
                
                

                //隐藏加载动画
                this.hideLoading();
            },
            gotoAddress(path){
                this.$router.push(path);
            },
            doRandom() {
                const that = this;
                
            },
            onReady(instance) {
                // console.log(instance);
                this.chart = instance;
                console.log(this.chart);
                this.hideLoading();
            },
            onClick(event, instance, echarts) {
                console.log(arguments);

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
    #head_top{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        @include wh(100%, 1.95rem);
        border-bottom:0.025rem solid #e5e5e5;
    }
    .head_goback{
        left: 0.4rem;
        @include wh(1.95rem, auto);
        @include sc(0.6rem, #666);
        line-height: 1.95rem;
        margin-left: .4rem;
    }
    .head_login{
        right: 0.55rem;
        @include sc(0.6rem, #999);
        @include ct;
        border-radius: .2rem;
        .login_span{
            color: #666;
        }
        .user_avatar{
            fill: #666;
            @include wh(.8rem, .8rem);
        }
    }
    .title_head{
        @include center;
        width: 50%;
        color: #fff;
        text-align: center;
        line-height: 0.8rem;
        img{
            @include wh(1rem, 1rem);
            vertical-align:middle;
            display: inline-block;
        }
        .title_text{
            @include sc(0.6rem, #666);
            text-align: center;
            vertical-align:middle;
            /*font-weight: bold;*/
        }
    }

    .shop_back_svg_container{
        position: fixed;
        @include wh(100%, 100%);
        img{
            @include wh(100%, 100%);
        }
    }
    .main_container{
        padding-top:1.95rem;
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
        border: 0.025rem solid #ffd101;
        border-width: 0 0 0.025rem 0;
        margin-left: .2rem;
        @include sc(0.65rem, #292929);
        border-radius: 0.125rem;
        background-color: #ffd101;
        font-weight: normal;
        padding: 0 0.25rem;
    }
    .chart_container{
        background-color: #fff;
        border-bottom: 0.025rem solid #f1f1f1;right: 0;
        width: 100%;
        height: 336px;
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
                @include sc(0.6rem, #333);
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
