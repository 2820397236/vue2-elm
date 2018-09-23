 <template>
    <div>
        <header id="head_top">
            <section class="title_head ellipsis">
                <span class="title_text">管理员</span>
            </section>
        </header>
        <ul class="rate_navi">
            <li :class="{ active : listType == 'user' }" @click="setRatingType('user')">
                <span>用户管理 {{rateCount.countHigh}}</span>
            </li>
            <li :class="{ active : listType == 'order' }" @click="setRatingType('order')">
                <span>处理订单 {{rateCount.countMid}}</span>
            </li>
            <li :class="{ active : listType == 'flow' }" @click="setRatingType('flow')">
                <span>查看报表 {{rateCount.countLow}}</span>
            </li>
        </ul>

        <section  class="shop_container main_container">
            <section class="shoplist_container">
                <ul v-if="listType == 'order'" >
                    <li v-for="(item,index) in orderList" :key="index" @click="setOrderSuccess(item)">
                        <section class="menu_detail_list">
                            <div class="menu_detail_link">
                                <div class="rate_head">
                                    <section class="user_profile">
                                        <div class="rate_img" :class="{ green : item.ratingStar ==50,red : item.ratingStar <30,yellow : item.ratingStar ==30}">
                                           <!-- <img src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLt9GVR0GqQkjqicrIqibicqaoOFSAQ0u6HFoLcEMwKPdBLzD2mgicCQyuC650UM3pYYrHIia7ib5qvEiaQ/132"> -->
                                            <div class="img"></div>

                                        </div>
                                        <div class="rate_username">
                                                {{item.cName}} <span class="rate_tel">{{item.phone}}</span> <br/>
                                                <span class="rate_time">{{item.createTime | dateTime('YYYY/MM/DD hh:mm:ss')}}</span><br/>
                                                <span class="rate_tag" v-if="item.status =='WAIT'">待确认</span>
                                                <span class="rate_tag green" v-if="item.status !='WAIT'">已确认</span>
                                         </div>
                                         <div class="order_price">

                                                <span class="order_price_tag" v-if="item.type =='CASH_DEPOSIT'">存入</span>
                                                <span class="order_price_tag" v-if="item.type =='ORDER_RESTING'">挂单</span>
                                                <span class="order_price_tag" v-if="item.type =='CASH_WITHDRAW'">提现</span>
                                                <br/>
                                                {{item.price}}
                                                <span v-if="item.type =='ORDER_RESTING'" class="gray">手</span>
                                                <span v-if="item.type =='CASH_DEPOSIT' || item.type =='CASH_WITHDRAW'" class="gray">元</span>
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

                <ul v-if="listType == 'user'" >
                    <li v-for="(item,index) in userList" :key="index">
                        <section class="menu_detail_list">
                            <div class="menu_detail_link">
                                <div class="rate_head">
                                    <section class="user_profile">
                                        <div class="rate_img" :class="{ green : item.ratingStar ==50,red : item.ratingStar <30,yellow : item.ratingStar ==30}">
                                            <!-- <img src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLt9GVR0GqQkjqicrIqibicqaoOFSAQ0u6HFoLcEMwKPdBLzD2mgicCQyuC650UM3pYYrHIia7ib5qvEiaQ/132"> -->
                                            <div class="img"></div>

                                        </div>
                                        <div class="rate_username">
                                                {{item.cName}} [{{item.inviteKey}}] <span class="rate_tel">{{item.phone}}</span> <br/>
                                                <span class="rate_time">注册时间：{{item.createTime | dateTime('YYYY/MM/DD hh:mm:ss')}}</span><br/>
                                                <span class="rate_tag" v-if="item.type =='ADMIN'">管理员</span>
                                                <span class="rate_tag green" v-else>用户</span>
                                                <span class="rate_tag">被【{{item.invite}}】邀请</span>
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

                <ul v-if="listType == 'flow'" >
                    <li v-for="(item,index) in flowList" :key="index">
                        <section class="menu_detail_list">
                            <div class="menu_detail_link">
                                <div class="rate_head">
                                    <section class="user_profile">
                                        <div class="rate_img" :class="{ green : item.ratingStar ==50,red : item.ratingStar <30,yellow : item.ratingStar ==30}">
                                            <!-- <img src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLt9GVR0GqQkjqicrIqibicqaoOFSAQ0u6HFoLcEMwKPdBLzD2mgicCQyuC650UM3pYYrHIia7ib5qvEiaQ/132"> -->
                                            <div class="img"></div>
                                        </div>
                                        <div class="rate_username">
                                                {{item.cName}} <span class="rate_tel">{{item.phone}}</span> <br/>
                                                <span class="rate_time">{{item.createTime | dateTime('YYYY/MM/DD hh:mm:ss')}}</span><br/>
                                                <span class="rate_tag" v-if="item.status =='WAIT'">待确认</span>
                                                <span class="rate_tag green" v-if="item.type =='CASH'">现金</span>
                                         </div>
                                         <div class="order_price">


                                                <span class="order_price_tag" v-if="item.type =='CASH_DEPOSIT'">进</span>
                                                <span class="order_price_tag" v-if="item.type =='ORDER_RESTING'">挂出</span>
                                                <span class="order_price_tag" v-if="item.type =='CASH_WITHDRAW'">出</span>
                                                <br/>
                                                {{item.value}}
                                                <span v-if="item.type =='ORDER_RESTING'" class="gray">手</span>
                                                <span v-if="item.type =='CASH_DEPOSIT' || item.type =='CASH_WITHDRAW'" class="gray">元</span>
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

        <foot-guide></foot-guide>
        <loading v-show="showLoading"></loading>
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
    import headTop from 'src/components/header/head'
    import footGuide from '../../components/footer/footGuide'
    import alertTip from 'src/components/common/alertStore'
    import {mapState} from 'vuex'
    import {setAdminOrderSuccess,getUserFlow,getUserOrder, getUserList, getMyStore,getStoreInfo,getStoreRate,getRateCount} from 'src/service/getData'
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
               userList:[],
               orderList:[],
               flowList:[],
               userListOrigin:[],
               ratesDpOrigin:[],
               ratesEleOrigin:[],
               ratesEle:[],
               rateCount:{},
               storeName:'',
               storeImg:'',
               store:null,
               source:0,
               listType:'order',
                showAlert: false,
            }
        },
        mounted(){
            this.initData();
            this.hideLoading();
        },
        computed: {
            ...mapState([
                'shopDetail'
            ]),
        },
        components: {
            headTop,
            footGuide,
            loading,
            alertTip
        },
        mixins:[getImgPath],
        methods: {

            setOrderSuccess(order){
                if(order.status == 'SUCCESS') return;
                this.showAlert = true;
                this.alertText = order.phone;

                this.alertSubText = '是否确认该笔交易￥'+ order.price +'？';
                this.alertTime = new Date();
                this.alertImg = 'http://zijinchi.linkersocks.com/favicon.ico';

                this.confirmBtn = "确认";
                this.format = 'YYYY年MM月DD日';
                this.alertFunc = ()=>{
                    let phone = this.user.phone;
                    // console.log(order);return;
                   setAdminOrderSuccess(phone,order.id).then(o=>{
                        console.log(o);
                         this.showAlert = false;
                         this.initData();
                   })
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
                    this.$router.push('/home');
                }
                this.user = JSON.parse(getStore('user'));

                
                getUserOrder(this.user.phone).then(o=>{
                    console.log(o);
                    this.orderList = o;
                })
                
                this.hideLoading();
            },

            setRatingType(listType){
                this.listType = listType;
                let _this = this;
                switch(listType){
                    case "user":
                    getUserList(this.user.phone).then(o=>{
                        console.log(o);
                        this.userList = o;
                    })
                    break;

                    case "order":
                    getUserOrder(this.user.phone).then(o=>{
                        console.log(o);
                        this.orderList = o;
                    })
                    break;

                    case "flow":
                    getUserFlow(this.user.phone).then(o=>{
                        console.log(o);
                        this.flowList = o;
                    })
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
            width:100%;
            position:fixed;
            top:1.75rem;
            z-index:100;
            border-bottom:0.125rem solid #ddd;
            li{
                flex:1;
                text-align: center;
                line-height: 1.5rem;
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
        padding-top:2rem;
        width:100%;
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
                @include sc(.5rem, #999);
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
                            width:100%;
                            .rate_img{
                                .img{
                                    margin-top:.2rem;
                                    border-radius: .2rem;
                                    @include wh(2rem, 2rem);
                                    display: block;
                                    background:url(../../images/account.png) center center;
                                    background-size:100% auto;
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
                                flex:1;
                                .rate_tel{
                                    @include sc(.5rem, #bababa);
                                }
                                .rate_address{
                                    @include sc(.5rem, #bababa);
                                }
                                .rate_tag{
                                    background-color:rgba(255,139,103,1);
                                    @include sc(.5rem, #fff);
                                    padding: .1rem;
                                    &.green{
                                        background-color: #66d8b4;
                                    }
                                   /* &.yellow{
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
                                    }*/
                                }
                            }
                            .order_price{
                                @include sc(.8rem, #333);
                                .gray{
                                    @include sc(.6rem, #999);
                                }
                                .order_price_tag{
                                    float:right;
                                    @include sc(.5rem, rgba(255,139,103,1));
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
