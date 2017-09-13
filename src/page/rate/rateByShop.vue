 <template>
    <div>
        <header id='head_top'>
            <section class="head_goback" @click="$router.go(-1)">
                返回
            </section>
            <section class="title_head ellipsis">
                <img class="title_img" :src="storeImg" v-if="storeImg"/>
                <span class="title_text" v-if="storeImg">{{branchName}}等 (共计{{storeIds.length}}家门店)</span>
            </section>
        </header>
        <section v-if="!showLoading" class="shop_container main_container">
            <!-- <nav class="goback" @click="goback">
                <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:3"/>
                </svg>
            </nav> -->


            <section class="shoplist_container">
                <div v-for="(item,index) in dateList" :key="index">
                <div class="reply_date">{{item.date}}</div>
                <ul v-if="item.rates.length > 0">
                    <router-link v-for="(store,index) in item.rates" :key="index" :to="{path: 'rate', query:{storeId:store.storeId,storeName:store.storeName+'('+ store.branchName+')'}}" tag="li">
                        <section class="menu_detail_list">
                            <div class="menu_detail_link">
                                <section class="menu_food_img">
                                    <img :src="store.defaultPic">
                                </section>
                                <section class="menu_food_description">
                                    <h3 class="food_description_head">
                                        <strong class="description_foodname">{{store.storeName}}<span v-if="store.branchName">({{store.branchName}})</span></strong>
                                    </h3>
                                    <p class="food_description_content">{{store.address}}</p>
                                </section>
                            </div>
                        </section>
                        <ul class="menu_detail_reply">
                            <li>
                                <div class="reply_content">正面评论</div>
                                <div class="reply_count green">{{store.countHigh}}</div>
                            </li>
                            <li>
                                <div class="reply_content">中性评论</div>
                                <div class="reply_count yellow">{{store.countMid}}</div>
                            </li>
                            <li>
                                <div class="reply_content">负面评论</div>
                                <div class="reply_count red">{{store.countLow}}</div>
                            </li>
                        </ul>
                    </router-link>

                </ul>
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
    import {getMyStore,getRateByDate} from 'src/service/getData'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import loading from 'src/components/common/loading'
    import {loadMore, getImgPath} from 'src/components/common/mixin'
    import {imgBaseUrl} from 'src/config/env'
    import BScroll from 'better-scroll'
    import footGuide from '../../components/footer/footGuide'
    import IEcharts from 'vue-echarts-v3/src/full.vue';
    import theme from '../analytics/theme.json'
    IEcharts.registerTheme('customer', theme)
    export default {
        data(){
            return{
                branchName: '',
                storeImg: '', //geohash位置信息
                shopId: null, //商店id值
                showLoading: true, //显示加载动画
                changeShowType: 'shop',//切换显示商品或者评价
                storeList: [], //食品列表
                dateList: []
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

                this.storeIds = this.$route.query.ids;
                this.date = this.$route.query.date;
                console.log(this.date);

                if(false == this.storeIds instanceof Array ){
                    this.storeIds = [this.storeIds];
                }

                let res = await getRateByDate(this.storeIds,parseInt(this.date));
                if(res.status == 0){
                    console.log(res.rates);
                    this.dateList = res.rates;
                } 

                this.storeImg = this.storeList[0].defaultPic;
                
                this.hideLoading();
            },
           
            //隐藏动画
            hideLoading(){
                this.showLoading = false;
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
        @include sc(0.5rem, #fff);
        @include ct;
        background:#ff9501;
        padding:.2rem .8rem .2rem .4rem ;
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
    .shop_container{
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

    .shoplist_container{
        display: block;
        padding-top: 2rem;
        padding-bottom: 2rem;
        align-items: center;
        align-content:center;
        background-color:#f7f7f7;
        .reply_date{
            @include sc(0.5rem, #b2b2b2);
            text-align: center;
            line-height: 1rem;
        }
        ul{
            width: 100%;
            overflow: hidden;
            li{

                background-color: #fff;
                margin-bottom:.5rem;
            }
            .menu_detail_list{
                flex:1;
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