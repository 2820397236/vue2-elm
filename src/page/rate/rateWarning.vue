 <template>
    <div>
        <header id="head_top">
            <section class="title_head ellipsis">
                <span class="title_text">交易</span>
            </section>
        </header>
        <!-- <header id='head_top'>
            <section class="title_head ellipsis"  @click="setRatingType('resting')">
                
                <span class="title_text">餐厅评论监控预警</span>
            </section>

            <section class="head_option" :class="{red:orderType == 'resting',yellow:orderType == 'withdraw', green:orderType == 'low'}"  @click="clickRateType()">
                <span>预警 {{listType}}</span>
                <svg class="icon_style">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning"></use>
                </svg>
            </section>
        </header> -->
        <section class="description_header">
            <div>
                <input class="order_value" v-model="orderValue"/>
            </div>
            <div class="description_top">
               <!--  <section class="description_left" style="border-radius: 10rem;overflow: hidden;">
                    <img :src="user.profileImg" @click="signout">
                </section> -->
                <!-- <section class="description_right">
                    <h4 class="description_title ellipsis">您已订阅19家门店</h4>
                </section> -->
                <section class="head_option green">
                <span v-if="orderType == 'resting'"  @click="createRestingOrder()">我要挂单</span>
                <span v-if="orderType == 'withdraw'" @click="createWithdrawOrder()">我要提现</span>
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
                <ul>
                    <li v-for="(item,index) in orderList" :key="index">
                        <!-- <div class="rate_time">{{item.ratingTime}}</div> -->
                        <section class="menu_detail_list">
                            <div class="menu_detail_link">
                                <div class="rate_head">
                                    <section class="user_profile">
                                        <div class="rate_img" :class="{yellow:orderType == 'resting', green:orderType == 'withdraw'}">
                                            &nbsp;
                                        </div>
                                        <div class="rate_username">
                                                {{item.title}} <br/>
                                                <span class="rate_address">{{item.createTime | dateTime('YYYY/MM/DD hh:mm:ss')}}</span>
                                                <span class="rate_tag" v-if="item.status == 'WAIT'">等待中</span>
                                                <span class="rate_tag green" v-if="item.status == 'SUCCESS'">已成功</span>
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
        <section>
            <button class="btn_buy">
            <div class="btn_flex"  @click="setRatingType('resting')" :class="{active:orderType == 'resting'}">
            股权挂单</div>
            <div class="btn_flex"  @click="setRatingType('withdraw')" :class="{active:orderType == 'withdraw'}">
            奖励兑现</div>
        </button> 
        </section>
        <loading v-show="showLoading"></loading>
        <foot-guide></foot-guide>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" 
            :alertText="alertText" 
            :alertSubText="alertSubText" 
            :alertTime="alertTime" 
            :alertImg="alertImg"
            :alertFunc="alertFunc"
            :confirmBtn="confirmBtn"
            :format="format"
        ></alert-tip>

        <!-- <section class="shop_container main_container bg-gray" v-if="showRateType" @click="goBack()">
            <ul class="rate_navi">
                <li class="green" :class="{active:orderType == 'resting'}" @click="setRatingType('resting')">
                    <span>股权挂单 <br/>满100股即可挂单，等待市场其他用户买入</span>
                </li>
                <li class="yellow" :class="{active:orderType == 'withdraw'}" @click="setRatingType('withdraw')">
                    <span>奖励提现 <br/>团队奖励可随时发起提现，每月三次结算。</span>
                </li>
            </ul>
        </section> -->
            
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertStore'
    import {mapState} from 'vuex'
    import {createWithdrawOrder,createRestingOrder,getAllOrderList} from 'src/service/getData'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import footGuide from '../../components/footer/footGuide'
    import loading from 'src/components/common/loading'

    export default {
        data(){
            return{
               showLoading: false ,
               showAlert: false,
               orderType: 'resting',
               showRateType: false,
               orderData:null,
               orderList:[],
               rateCount:{},
               storeList:{},
               storeName:'',
               storeImg:'',
               store:null,
               listType:'resting',
               orderValue:100,
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
            alertTip,
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


                this.getOrderList();
                
               
                this.hideLoading();
            },

            async getOrderList(){
                await getAllOrderList(this.user.phone).then(o=>{
                    console.log(this.orderType);
                    this.orderData = o.data;
                    if(this.orderType == 'resting'){
                        this.orderList = o.data.resting;
                    }else if(this.orderType == 'withdraw'){
                        this.orderList = o.data.withdraw;
                    }

                })
            },

            setRatingType(type){
                this.orderType = type;
                switch(type){
                    case 'resting':
                    this.listType = '股权挂单';
                    this.getOrderList();
                    break;

                    case 'withdraw':
                    this.listType = '奖励提现';
                    this.getOrderList();
                    break;

                    default:
                    this.listType = '股权挂单';
                    break;
                }
            },
            createRestingOrder(){
                // if(this.user.cName !='') return;

                this.showAlert = true;

                this.alertText = this.user.realName;

                this.alertSubText = '是否挂单 ' + this.orderValue + " 手？";
                this.alertTime = new Date();
                this.alertImg = 'http://zijinchi.linkersocks.com/favicon.ico';

                this.confirmBtn = "确定";
                this.format = 'YYYY年MM月DD日';
                this.alertFunc = ()=>{
                   // console.log('localStorage.clear();')
                   // localStorage.clear();
                   createRestingOrder(this.user.phone,this.orderValue).then(o=>{
                        this.showAlert = false;
                        this.getOrderList();
                   })
                }
            },

            createWithdrawOrder(){
                this.showAlert = true;

                this.alertText = this.user.realName;

                this.alertSubText = '是否提现 ' + this.orderValue + " 元？";
                this.alertTime = new Date();
                this.alertImg = 'http://zijinchi.linkersocks.com/favicon.ico';

                this.confirmBtn = "确定";
                this.format = 'YYYY年MM月DD日';
                this.alertFunc = ()=>{
                   // console.log('localStorage.clear();')
                   // localStorage.clear();
                   createWithdrawOrder(this.user.phone,this.orderValue).then(o=>{
                        this.showAlert = false;
                        this.getOrderList();
                   })
                }
            }

        }
    }
</script>
    
<style lang="scss" scoped>
    @import 'src/style/mixin';
    .order_value{
        border:0.0125rem solid #d7d7d7;
        padding:.3rem;
        width:11rem;
    }
    .btn_buy{
        position: fixed;
        bottom:2.15rem;
        display: flex;
        width:100%;
        .btn_flex{
            flex:1;
            line-height: 250%;
            font-size: .6rem;
            padding:.2rem ;
            color:#fff;
            i{

                width:12px;
                height:18px;
                display: inline-block;
                margin-right:10px;
                vertical-align:sub;
            }
        }
        .active{
            background:#249ef5;
            i{
                background: url(../../images/ico-out.png) no-repeat center center;
                background-size:100% auto;
            }
            span{
                
            }
        }
        .disable{
             background:#f7f7f7;
             color:#999;
        }
    }
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
        padding-top:2.3rem;
        padding-bottom:1.95rem;
    }
    .description_header{
            position: fixed;
            z-index: 10;
            background-color: #0081ee;
            padding: 0.4rem 0.8rem 0.4rem 0.8rem;
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
                                    margin-top:-1.4rem;
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
                                        content:'提';

                                    }
                                }
                                &.yellow{
                                    &::after{
                                        background-color: #ffd819;
                                        content:'挂';
                                    }
                                    
                                }
                                &.red{
                                    &::after{
                                        background-color: #ff6d41;
                                        content:'挂';
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
                                    &.green{
                                        background-color:#88ce41;
                                    }
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
