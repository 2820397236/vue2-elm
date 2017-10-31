 <template>
    <div>
        <header id='head_top'>
            <!-- <section class="head_goback" @click="goBack()">
                返回
            </section> -->
            <section class="title_head ellipsis"  @click="setRatingType('xx')">
                <img class="title_img" :src="storeImg"/>
                <div class="title_content">
                    <div class="title_text">{{storeName}}</div>
                    <div class="title_time" v-if="store">{{store.address}}</div>
                    <!-- <span class="title_time" v-if="Object.keys(rateListOrigin).length>0">{{rateList[rateList.length-1].ratingTime}} 到 {{rateList[0].ratingTime}}</span> -->
                </div>
                <div class="head_link_button">数据分析</div>
            </section>
            <section class="head_calendar">
                <span>请选择日期</span>
                <section>
                    <div class="head_calendar_date">{{dateFormat | dateTime('MM月DD日')}} <span>今天</span></div>
                    <div class="head_calendar_button">
                        <svg width="22px" height="21px" viewBox="0 0 22 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="首页-无预警" transform="translate(-337.000000, -215.000000)" fill="#007BE6">
                                    <path d="M338.991155,215 L357.008845,215 C358.110326,215 359,215.892996 359,216.994561 L359,234.005439 C359,235.097656 358.10853,236 357.008845,236 L338.991155,236 C337.889674,236 337,235.107004 337,234.005439 L337,216.994561 C337,215.902344 337.89147,215 338.991155,215 Z M339.993398,221 C339.444759,221 339,221.447489 339,221.998502 L339,233.001498 C339,233.552955 339.444946,234 339.993398,234 L356.006602,234 C356.555241,234 357,233.552511 357,233.001498 L357,221.998502 C357,221.447045 356.555054,221 356.006602,221 L339.993398,221 Z M340,217 L340,219 L345,219 L345,217 L340,217 Z M351,217 L351,219 L356,219 L356,217 L351,217 Z M352,229 L354,229 L354,231 L352,231 L352,229 Z M347,229 L349,229 L349,231 L347,231 L347,229 Z M342,229 L344,229 L344,231 L342,231 L342,229 Z M352,224 L354,224 L354,226 L352,226 L352,224 Z M347,224 L349,224 L349,226 L347,226 L347,224 Z M342,224 L344,224 L344,226 L342,226 L342,224 Z" id="calendar"></path>
                                </g>
                            </g>
                        </svg>
                    </div>
                </section>
            </section>
            <section>
                <ul class="rate_navi">
                    <li class="tab_container" :class="{active:tabType=='dp'}" @click="clickTab('dp')">
                        <span>在店满意度 {{rateCount.countHigh}}条</span>
                    </li>
                    <li class="tab_container" :class="{active:tabType=='ele'}" @click="clickTab('ele')">
                        <span>外卖满意度 {{ratesEleOrigin.length}}条</span>
                    </li>
                </ul>
            </section>
            <section v-if="false">
                <ul class="rate_navi">
                    <li :class="{ active : type == 'high' }" @click="setRatingType('high')">
                        <span>好评 {{rateCount.countHigh}}</span>
                    </li>
                    <li :class="{ active : type == 'mid' }" @click="setRatingType('mid')">
                        <span>中评 {{rateCount.countMid}}</span>
                    </li>
                    <li :class="{ active : type == 'low' }" @click="setRatingType('low')">
                        <span>差评 {{rateCount.countLow}}</span>
                    </li>
                </ul>
            </section>
        </header>

        <section v-if="!showLoading" class="shop_container main_container">

            <section class="shoplist_container">
                <ul v-if="rateList.length > 0 && tabType == 'dp'" >
                    <li v-for="(item,index) in rateList" :key="index">
                        <section class="menu_detail_list">
                            <div class="menu_detail_link">
                                <div class="rate_head">
                                    <section class="user_profile">
                                        <div class="rate_img" :class="{ green : item.ratingStar ==50,red : item.ratingStar <30,yellow : item.ratingStar ==30}">
                                            <img :src="item.avatar">
                                        </div>
                                        <div class="rate_username">
                                                {{item.username}}<br/>
                                                <span class="rate_time">{{item.ratingTime}}</span>
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

                <ul v-if="rateList.length > 0 && tabType == 'ele'" >
                    <li v-for="(item,index) in rateList" :key="index">
                        <section class="menu_detail_list">
                            <div class="menu_detail_link">
                                <div class="rate_head">
                                    <section class="user_profile">
                                        <div class="rate_img" :class="{ green : item.ratingStar ==5,red : item.ratingStar <3,yellow : item.ratingStar ==3}">
                                            <img :src="item.avatar==''?'http://faas.elemecdn.com/desktop/media/img/default-avatar.38e40d.png':item.avatar">
                                        </div>
                                        <div class="rate_username">
                                                {{item.username}}<br/>
                                                <span class="rate_time">{{item.ratedAt}}</span>
                                                <!-- <span class="rate_tag">口味好</span>
                                                <span class="rate_tag">环境很好</span>
                                                <span class="rate_tag">服务好</span> -->
                                         </div>
                                    </section>
                                </div>
                                <section class="rate_desc">
                                    <p class="rate_content" v-if="item.ratingText ==''">
                                        <span v-if="item.ratingStar == 5">惊喜</span>
                                        <span v-if="item.ratingStar == 4">满意</span>
                                        <span v-if="item.ratingStar == 3">凑活</span>
                                        <span v-if="item.ratingStar == 2">一般</span>
                                        <span v-if="item.ratingStar == 1">极差</span>
                                    </p>
                                    <p class="rate_content" v-else v-html="item.ratingText">
                                        
                                    </p>
                                </section>
                            </div>
                        </section>
                    </li>
                </ul>
            </section>
            
        </section>


        <section class="shop_container main_container bg-gray" v-if="showRateType" @click="goBack()">
            <ul class="rate_navi">
                <li class="green" @click="setRatingType('high')">
                    <span>好评 {{rateCount.countHigh}}</span>
                </li>
                <li class="yellow" @click="setRatingType('mid')">
                    <span>中评 ({{rateCount.countMid}}</span>
                </li>
                <li class="red" @click="setRatingType('low')">
                    <span>差评 {{rateCount.countLow}}</span>
                </li>
            </ul>
        </section>
        <loading v-show="showLoading"></loading>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import {mapState} from 'vuex'
    import {getMyStore,getStoreInfo,getStoreRate,getRateCount} from 'src/service/getData'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import {getImgPath} from 'src/components/common/mixin'
    import loading from 'src/components/common/loading'

    export default {
        data(){
            return{
               showLoading: true, //显示加载动画 
               licenseImg: null,
               showRateType: false,
               dateFormat: new Date().getTime(),
               rateListOrigin:[],
               rateList:[],
               ratesEleOrigin:[],
               ratesEle:[],
               rateCount:{},
               storeName:'',
               storeImg:'',
               store:null,
               tabType:'dp',
               rateType:'负面评论',
               type:'',
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
            loading
        },
        mixins:[getImgPath],
        methods: {
            clickTab(type){
                this.tabType = type;
                switch(type){
                    case "dp":
                    this.rateList = this.rateListOrigin;
                    break;

                    case "ele":
                    this.rateList = this.ratesEleOrigin;
                    break;

                    default:
                    break
                }
            },
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

                let resStore = await getStoreInfo([this.storeId]);
                if(resStore.status == 0){
                    this.store = resStore.stores[0];
                    this.storeImg = resStore.stores[0].defaultPic;
                    if(resStore.stores[0].branchName){
                        this.storeName = resStore.stores[0].name + "(" + resStore.stores[0].branchName + ")";
                    }else{
                        this.storeName = resStore.stores[0].name;
                    }
                    
                }

                let resRate = await getStoreRate(this.user.id,this.storeId);
                if(resRate.status == 0){
                    if( resRate.rates.length == 0){
                        setTimeout(()=>{
                            this.initData();
                        },5000)
                    }

                    this.rateList = resRate.rates;
                    this.rateListOrigin = resRate.rates;
                    this.ratesEleOrigin = resRate.ratesEle;
                }

                let resCount = await getRateCount([this.store.id]);
                if(resCount.status == 0){
                    this.rateCount = resCount.rates[0];
                }

                this.setRatingType('low');
                this.hideLoading();
            },

            setRatingType(type){
                
                this.type = type;

                switch(type){
                    case 'low':
                    this.rateList = this.rateListOrigin.filter(item=>{
                        return item.ratingStar < 30
                    });
                    this.rateType = '负面评论';
                    break;

                    case 'mid':
                    this.rateList = this.rateListOrigin.filter(item=>{
                        return item.ratingStar == 30
                    });
                    this.rateType = '中性评论';
                    break;

                    case 'high':
                    this.rateList = this.rateListOrigin.filter(item=>{
                        return item.ratingStar > 30
                    });
                    this.rateType = '正面评论';
                    break;

                    default:
                    this.rateList = this.rateListOrigin;
                    this.rateType = '全部评论';
                    break;
                }
            },

        }
    }
</script>
    
<style lang="scss" scoped>
    @import 'src/style/mixin';
    #head_top{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        @include wh(100%, auto);
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
        @include ct;
        background:#ff9501;
        border-radius: .2rem;
        line-height: .6rem;
        padding:.2rem .2rem .2rem .3rem;
        .login_span{
            color: #666;
        }
        .user_avatar{
            fill: #666;
            @include wh(.8rem, .8rem);
        }
        span{
            @include sc(0.5rem, #fff);
            line-height: 0.5rem;
            vertical-align:middle;
        }
        .icon_style{
            @include wh(.6rem, .6rem);
            vertical-align:middle;
            use{
                @include wh(.6rem, .6rem);
                fill:#fff;
            }
        }
    }
    .title_head{
        color: #fff;
        text-align: left;
        line-height: 0.8rem;
        padding: .6rem .5rem .4rem;
        border-bottom:0.025rem solid #e5e5e5;
        display: flex;
        justify-content: space-between;
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
            @include sc(0.7rem, #343640);
            vertical-align:middle;
            font-weight: bold;
        }
        .title_time{
            @include sc(0.55rem, #595F79);
            padding-top:.3rem;
            /*font-weight: bold;*/
        }
        .head_link_button{
            @include sc(0.65rem, #007BE6);
            padding-top: 1.05rem;
            font-weight: bold;
        }
    }
    .head_calendar{
        padding:.1rem .6rem .7rem .6rem;
        border-bottom:0.025rem solid #e5e5e5;
        span{
            @include sc(.6rem, #969FB7);
        }
        section{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            .head_calendar_date{
                @include sc(.9rem, #343640);
            }
            .head_calendar_button{
                @include sc(.65rem, #007BE6);
            }
        }
    }
    .head_tab{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        padding:0 .75rem;
        .tab_container{
            @include sc(.9rem, #969FB7);
            @include wh(6.6rem, auto);
            border-bottom:0.2rem solid #fff;
            text-align: center;
            padding:.8rem .3rem .1rem;
            line-height: .9rem;
            span{
                @include sc(.9rem, #969FB7);
                display: inline-block;
            }
            .rate_total{
                @include sc(.5rem, #969FB7);
            }
            &.active{
                border-bottom:0.2rem solid #FFDA00;
                @include sc(.9rem, #343640);
                span{
                    color:#343640;
                    display: inline-block;
                }
            }
        }
    }
    .rate_navi{
            display: flex;
            flex-direction: row;
            background-color: #fff;
            border-radius: .7rem;
            border-top-left-radius:0;
            border-top-right-radius:0;
            li{
                flex:1;
                text-align: center;
                line-height: 1.5rem;
                padding-top:.5rem;
                span{
                    display:inline-block;
                    vertical-align:middle;
                    padding: 0 .4rem;
                    border-bottom:0.125rem solid #FFFFFF;
                    @include sc(0.65rem, #b1b8ca);
                }
                &.active{
                    span{
                        @include sc(0.65rem, #666b83);
                        border-bottom:0.125rem solid #FEC842;
                    }
                }
                /*&::before{
                    vertical-align:middle;
                    display:inline-block;
                    border-radius: .7rem;
                    @include wh(0.7rem, 0.7rem);
                    content:' ';
                    background-color:#66d8b4;
                    margin-right:.2rem;
                }
                &.green{
                    &::before{
                        background-color: #66d8b4;
                        content:'';

                    }
                }
                &.yellow{
                    &::before{
                        background-color: #ffd819;
                        content:'';
                    }
                    
                }
                &.red{
                    &::before{
                        background-color: #ff6d41;
                        content:'';
                    }
                }*/
            }
        }
    .main_container{
        padding-top:8.5rem;
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

    @media (max-width: 320px) {
        .head_login{
                padding: 0rem .2rem .2rem .3rem;
        }
    }
    
</style>
