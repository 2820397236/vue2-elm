 <template>
    <div>
        <header id="head_top">
            <section class="title_head ellipsis">
                <span class="title_text">市场</span>
            </section>
        </header>
        <!-- <header id='head_top'>
            <section class="title_head ellipsis"  @click="setRatingType('sell')">
                
                <span class="title_text">餐厅评论监控预警</span>
            </section>

            <section class="head_option" :class="{red:warningType == 'sell',yellow:warningType == 'buy', green:warningType == 'low'}"  @click="clickRateType()">
                <span>预警 {{listType}}</span>
                <svg class="icon_style">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning"></use>
                </svg>
            </section>
        </header> -->
        <section class="description_header">
            <div>&nbsp;</div>
            <div class="description_top">
               <!--  <section class="description_left" style="border-radius: 10rem;overflow: hidden;">
                    <img :src="user.profileImg" @click="signout">
                </section> -->
                <!-- <section class="description_right">
                    <h4 class="description_title ellipsis">您已订阅19家门店</h4>
                </section> -->
                <section class="head_option" :class="{red:warningType == 'sell',yellow:warningType == 'buy', green:warningType == 'low'}"  @click="clickRateType()">
                <span>{{listType}}</span>
                <svg class="icon_style">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning"></use>
                </svg>
            </section>

            </div>

        </section>
        <section v-if="!showLoading" class="shop_container main_container">
            <!-- <nav class="goback" @click="goback">
                <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:3"/>
                </svg>
            </nav> -->

            <section class="shoplist_container">
                <ul v-if="rateList.length > 0">
                    <li v-for="(item,index) in rateList" :key="index">
                        <!-- <div class="rate_time">{{item.ratingTime}}</div> -->
                        <section class="menu_detail_list">
                            <div class="menu_detail_link">
                                <div class="rate_head">
                                    <section class="user_profile">
                                        <div class="rate_img" :class="{ green : item.ratingStar ==50,red : item.ratingStar <30,yellow : item.ratingStar ==30}">
                                            <img :src="item.pic" v-if="item.source == 'DP'">
                                            <img :src="item.pic" v-if="item.source == 'ELE'">
                                        </div>
                                        <div class="rate_username">
                                                {{item.name}} {{item.addr}} <br/>
                                                <span class="rate_address">{{item.rateDate | dateTime}}</span>
                                                <!-- <span class="rate_tag">口味好</span>
                                                <span class="rate_tag">环境很好</span>
                                                <span class="rate_tag">服务好</span> -->
                                         </div>
                                    </section>
                                </div>
                                <section class="rate_desc">
                                    
                                    <p class="rate_content" v-html="item.ratingText"></p>
                                </section>
                            </div>
                        </section>
                        
                    </li>

                </ul>
            </section>
            
        </section>
        <loading v-show="showLoading"></loading>
        <foot-guide></foot-guide>


        <section class="shop_container main_container bg-gray" v-if="showRateType" @click="goBack()">
            <ul class="rate_navi">
                <li class="green" :class="{active:warningType == 'sell'}" @click="setRatingType('sell')">
                    <span>卖单市场 <br/>有任何负面情绪都将作为预警推送</span>
                </li>
                <li class="yellow" :class="{active:warningType == 'buy'}" @click="setRatingType('buy')">
                    <span>买单市场 <br/>有负面评论，会根据规则将部分个人情感因素负面排除</span>
                </li>
            </ul>
        </section>
            
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import {mapState} from 'vuex'
    import {getAlertRating,getMyStore} from 'src/service/getData'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import footGuide from '../../components/footer/footGuide'
    import loading from 'src/components/common/loading'

    export default {
        data(){
            return{
               showLoading: false ,
               warningType: 'sell',
               showRateType: false,
               rateListOrigin:[],
               rateList:[],
               rateCount:{},
               storeList:{},
               storeName:'',
               storeImg:'',
               store:null,
               listType:'买单市场',
            }
        },
        mounted(){
            this.initData();
        },
        computed: {
            ...mapState([
                'shopDetail'
            ]),
        },
        components: {
            headTop,
            loading,
            footGuide
        },
        mixins:[],
        methods: {
            //隐藏动画
            hideLoading(){
                this.showLoading = false;
            },
            goBack(){
                if(this.showRateType){
                    this.showRateType = false;
                }else{
                    this.$router.go(-1);
                }
            },
            clickRateType(){
                this.showRateType = !this.showRateType;
            },
            async initData(){
                if(getStore('user') == undefined){
                    this.$router.push('/');
                }
                this.user = JSON.parse(getStore('user'));

                this.storeId = this.$route.query.storeId;
                this.storeName = this.$route.query.storeName;


                //获取我的门店
                // let storeRes = await getMyStore(this.user.id);
                // if(storeRes.status == 0){
                //     // this.storeList = storeRes.stores;
                //     // this.extra = storeRes.extra;
                //     // for(var i=0; i<storeRes.stores.length;i++){
                //     //     if( this.storeList[storeRes.stores[i].id] == undefined){
                //     //         this.storeList[storeRes.stores[i].id] = storeRes.stores[i];
                //     //     }
                //     // }
                // }
                
                let _this = this;
                let rateRes = await getAlertRating(this.user.openId, 31);
                if(rateRes.status == 0){
                    rateRes.rateList.map(o=>{
                        if(o.source=='DP'){
                            o.pic = o.pic;
                        }else if(o.source=='ELE'){
                            o.pic = "http://fuss10.elemecdn.com/"+ o.pic.substr(0,1)+"/"+ o.pic.substr(1,2) +"/"+ 
                                o.pic.substr(3,o.pic.length - 1)+".jpeg?imageMogr2/thumbnail/60x60/format/webp/quality/85" ; 
                        }
                    })
                    this.rateList = rateRes.rateList;
                    this.rateListOrigin = rateRes.rateList;
                }

                // let resStore = await getStoreInfo([this.storeId]);
                // if(resStore.status == 0){
                //     this.store = resStore.stores[0];
                //     this.storeImg = resStore.stores[0].defaultPic;
                //     this.storeName = resStore.stores[0].name + "(" + resStore.stores[0].branchName + ")";
                    
                // }

                // let resRate = await getStoreRate(this.user.id,this.storeId);
                // if(resRate.status == 0){
                //     if( resRate.rates.length == 0){
                //         setTimeout(()=>{
                //             this.initData();
                //         },5000)
                //     }

                //     this.rateListOrigin = resRate.rates;
                //     this.rateList = resRate.rates;
                // }

                // let resCount = await getRateCount([this.store.id]);
                // if(resCount.status == 0){
                //     this.rateCount = resCount.rates[0];
                // }
                this.hideLoading();
            },

            setRatingType(type){
                this.warningType = type;
                switch(type){
                    case 'sell':
                    this.rateList = this.rateListOrigin.filter(item=>{
                        return item.ratingStar <= 10
                    });
                    this.listType = '卖单市场';
                    break;

                    case 'buy':
                    this.rateList = this.rateListOrigin.filter(item=>{
                        return item.ratingStar <= 20
                    });
                    this.listType = '买单市场';
                    break;

                    default:
                    this.rateList = this.rateListOrigin;
                    this.listType = '高';
                    break;
                }
            },

        }
    }
</script>
    
<style lang="scss" scoped>
    @import 'src/style/mixin';
    #head_top{
        background-color: #0081ee;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        @include wh(100%, auto);
    }
    .head_goback{
        left: 0.4rem;
        @include wh(1.95rem, auto);
        @include sc(0.6rem, #666);
        line-height: 1.95rem;
        margin-left: .4rem;
    }
    .head_option{
        @include sc(0.5rem, #fff);
        @include ct;
        right: 0.35rem;
        line-height: 1rem;
        padding:0 .2rem;
        border-radius: .2rem;
        .login_span{
            color: #666;
        }
        .user_avatar{
            fill: #666;
            @include wh(.8rem, .8rem);
        }
        .icon_style{
            @include wh(.6rem, .6rem);
            vertical-align:middle;
            fill:#fff;
            margin-top:-.1rem;
        }
        span{
            vertical-align:middle;
            padding-left:.1rem;
            padding-right:.1rem;
            color:#fff;
        }

        &.green{
            background-color:#66d8b4;
            
        }
        &.yellow{
            background-color:#ffd819;
        }
        &.red{
            background-color:#ff6d41;
        }
    }
    .title_head{
        color: #fff;
        text-align: left;
        line-height: 0.8rem;
        padding: .5rem .5rem .5rem;
        display: flex;
        justify-content: center;
        img{
            @include wh(2rem, 2rem);
            vertical-align:middle;
            display: inline-block;
            border-radius: .4rem;
            margin-right:.4rem;
        }
        .title_content{
            flex:1;
        }
        .title_text{
            @include sc(0.7rem, #fff);
            vertical-align:middle;
        }
        .title_time{
            @include sc(0.55rem, #595F79);
            padding-top:.5rem;
            display: block;
            /*font-weight: bold;*/
        }
        .head_link_button{
            @include sc(0.65rem, #007BE6);
            padding-top: 1.05rem;
            font-weight: bold;
        }
    }
    .main_container{
        padding-top:4.3rem;
        padding-bottom:1.95rem;
    }
    .description_header{
            position: fixed;
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
                    line-height: 1.1rem;
                    float:right;
                    padding: 0rem .4rem 0rem .8rem;
                    /*@include bis('../../images/vip.jpg');*/
                    /*background-size: 34px auto;
                    background-position: 68px center;*/

                    /*border-radius: 6px;
                    border:1px solid rgba(0,0,0,0.5);
                    border-width:0 0 0.025rem 0;*/
                    span{
                        @include sc(.6rem, #0f83e7);
                        display: inline-block;
                        vertical-align:middle;
                    }
                    .icon_style{
                        width: .5rem;
                        height:.5rem;
                        font-size:0.5rem;
                        color:#0f83e7;
                        display: inline-block;
                        vertical-align:middle;
                        use{
                            fill:#0f83e7;
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
        }
    .shop_container{
        &.bg-gray{
            background-color: rgba(0,0,0,0.5);
            position: fixed;
            top:0;
            right: 0;
            left: 0;
            bottom:0;
            height: 100%;
        }
        .rate_navi{
            display: flex;
            flex-direction: column;
            background-color: #fff;
            border-radius: .7rem;
            border-top-left-radius:0;
            border-top-right-radius:0;

            padding-top: .4rem;
            padding-bottom: .4rem;
            li{
                flex:1;
                text-align: left;
                @include sc(0.5rem, #666);
                line-height: 2rem;
                padding-left:1rem;
                span{
                    display:inline-block;
                    vertical-align:middle;
                    line-height: .6rem;
                    margin-left: .6rem;
                    color:#aaa;
                    width:85%;
                }
                &::before{
                    text-align: center;
                    vertical-align:middle;
                    display:inline-block;
                    border-radius: 1.2rem;
                    @include wh(1.2rem, 1.2rem);
                    line-height: 1.2rem;

                    content:' ';
                    background-color:#e5e5e5;
                    color:#fff;
                    margin-right:.2rem;
                }
                &.green{
                    &::before{
                        content:'高';
                    }
                    &.active{
                        &::before{
                            background-color: #ff6d41;
                        }
                        span{
                            color: #ff6d41;
                        }
                    }
                }
                &.yellow{
                    &::before{
                        content:'中';
                    }
                    &.active{
                        &::before{
                            background-color: #ffd819;
                        }
                        span{
                            color: #ffd819;
                        }
                    }
                }
                &.red{
                    &::before{
                        content:'低';
                    }
                    &.active{
                        &::before{
                            background-color: #66d8b4;
                        }
                        span{
                            color: #66d8b4;
                        }
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
        align-items: center;
        align-content:center;
        background-color:#fff;
        ul{
            width: 100%;
            overflow: hidden;
            padding: 0rem .6rem 0rem .8rem ;
            .rate_time{
                background-color: rgba(247,247,247,1);
                @include sc(.6rem, #999);
                line-height: 1rem;
                text-align: center;
            }
            .menu_detail_list{
                word-break: break-word;
                flex:1;
                background-color: #fff;
                padding: .6rem 0rem .6rem 0rem ;
                border-bottom: .015rem solid #f0f3f6;
                position: relative;
                overflow: hidden;
                .menu_detail_link{
                    display:flex;
                    flex-direction:column;
                    .rate_head{
                        @include fj;
                        margin-bottom: .2rem;
                        .user_profile{
                            display:flex;
                            flex-direction:row;
                            margin-right: .4rem;
                            .rate_img{

                                &::after{
                                    margin-left:1.6rem;
                                    margin-top:-2rem;
                                    display:block;
                                    content:'正';
                                    @include sc(.8rem, #fff);
                                    @include wh(2rem, 2rem);
                                    text-align: center;
                                    line-height: 2rem;
                                    border-radius: 1rem;
                                    background-color: #66d8b4;
                                }

                                &.green{
                                    &::after{
                                        background-color: #66d8b4;
                                        content:'正';

                                    }
                                }
                                &.yellow{
                                    &::after{
                                        background-color: #ffd819;
                                        content:'中';
                                    }
                                    
                                }
                                &.red{
                                    &::after{
                                        background-color: #ff6d41;
                                        content:'负';
                                    }
                                }
                            }
                            img{
                                border-radius: 2rem;
                                @include wh(2rem, 2rem);
                                display: block;
                            }
                            .rate_username{
                                @include sc(.6rem, #333);
                                margin-left: .5rem;
                                padding-top: .2rem;
                                .rate_address{
                                    @include sc(.5rem, #bababa);
                                }
                                .rate_tag{
                                    background-color:rgba(255,139,103,1);
                                    @include sc(.5rem, #fff);
                                    padding: .1rem;
                                }
                            }
                        }
                    }
                    .rate_desc{
                        width: 100%;
                        .rate_content{
                            @include sc(.6rem, #666);
                            line-height: .8rem;
                            padding:0 0rem 0 4rem;
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
</style>
