<template>
  	<div style="width:100%;">
       <section class="head_tips">我的</section>

        <section class="main_container">
            <div class="title_profile"></div>
            <section v-if="user">
                <div class="title_msg">{{user.realName}}</div>
                <div class="title_msg">{{user.phone}}</div>
            </section>
        </section>

        <section>
            <div class="wallet" v-if="wallet">
                <h2>我的钱包(元)</h2>
                <h2>{{wallet.getTotalMoney | currency('')}}</h2>
                <div class="wallet_other">
                    <div class="wallet_flex">
                        累计收益(元)<br/>
                        {{plan.equity * days *  plan.rate /10000 * 4.3 | currency("")}}
                    </div>
                    <div class="wallet_flex">
                        总投资(元)<br/>
                        {{wallet.getTotalMoney | currency('')}}
                    </div>
                    <div class="wallet_flex">
                        可用余额(元)<br/>
                        {{wallet.getBalance}}
                    </div>
                </div>
            </div>

            <div class="wallet2" v-if="plan">
                <h2>昨日收益(股)</h2>
                <h1>{{plan.equity * 1 *  plan.rate /10000}}</h1>
                <div class="wallet_other">
                    <div class="wallet_flex">
                        累计收益(股)<br/>
                        <span>{{plan.equity * days *  plan.rate /10000}}</span>
                    </div>
                    <div class="wallet_flex">
                        预计收益(股)<br/>
                        <span v-if="plan.equity">{{plan.equity}}</span>
                    </div>
                    <div class="wallet_flex">
                        每日获得(%)<br/>
                        <span v-if="plan.rate">{{plan.rate/100}}%</span>
                    </div>
                </div>
            </div>

            <div>
                <div class="button-section" @click="goTo('/shareTeam')">
                    <h4>我的团队</h4>
                    <div class="ico-team"></div>
                </div>
            </div>
        </section>

        <!-- <button class="btn_buy">
            <div class="btn_flex draw" @click="alert()">
            <i></i>挂单</div>
            <div class="btn_flex deposit" @click="alert()">
            <i></i>买入</div>
        </button> -->

        <foot-guide></foot-guide>

        <loading v-show="showLoading"></loading>
         <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="errorMsg"></alert-tip>
       <!--  <alert-tip v-if="showAlert" @closeTip="showAlert = false" 
            :alertText="alertText" 
            :alertSubText="alertSubText" 
            :alertTime="alertTime" 
            :alertImg="alertImg"
            :alertFunc="alertFunc"
            :confirmBtn="confirmBtn"
            :format="format"
        ></alert-tip> -->
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import {getUserFinance,createOrder,getUserPlan} from '../../service/getData'
import {getStore, setStore, removeStore} from 'src/config/mUtils'
import alertTip from 'src/components/common/alertTip'
import footGuide from '../../components/footer/footGuide'
import loading from 'src/components/common/loading'

export default {
    data(){
        return{

            user: null,
            wallet: null,
            plan:null,
            days:0,
            city: '',
            hotcity: [],     //热门城市列表
            areaList:[],
            areaMap:{},
            guesscity:{},
            groupcity: {},   //所有城市列表
            inChina:[],
            outChina:[],
            cityList:[],
            showLoading:false,
            showAlert: false
        }
    },

	mounted(){

        if(getStore('user') == undefined){
            this.$router.push('/');
        }

        this.user = JSON.parse(getStore('user') || {});
        this.user.realName = "先生/女士";

        getUserFinance(this.user.phone).then( o=>{
            console.log(o);
            this.wallet = o;

            this.days = parseInt((new Date().getTime() - this.wallet.createTime) / 1000 / 60 / 60 / 24);
            console.log(this.days);
        })


        getUserPlan(this.user.phone).then( o=>{
            console.log(o);
            this.plan = o;
        })
        // this.wallet = {
        //     getTotalPay:0,
        //     getTotalMoney:0,
        //     getStockYesterday:0,
        //     getStockSum:0,
        //     getStockTotal:0,
        //     getStockMoney:0,
        //     getBalance:0,
        //     per7:'0.22%'
        // };
        
    },

    components: {
        loading,
        footGuide,
        alertTip
    },

    computed:{
        //将获取的数据按照A-Z字母开头排序
        sortgroupcity(){
            let sortobj = {};
            for (let i = 65; i <= 90; i++) {
                if (this.groupcity[String.fromCharCode(i)]) {
                    sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
                }
            }
            return sortobj
        }
    },

    methods:{
        closeTip(){
            this.showAlert = false;
        },
        reload(){
            window.location.reload();
        },

        goTo(path){
            this.$router.push({path:path});
        },

        alert(){
            // alert('敬请期待，我们将很快与您联系');
            this.showAlert=true;
            this.errorMsg = '敬请期待，我们将很快与您联系';

            createOrder(this.user.phone,1,1).then(r=>{
                console.log(r);
            })
        },

        setCity(city){    
            setStore('city',city);
            this.$router.push({path:'/city/'+city.dpCityId});
        },
        goBack(){
            this.$router.go(-1);
        },
        gotoAddress(path){
            this.$router.push(path);
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
               console.log('localStorage.clear();')
               localStorage.clear();
               this.$router.push({path:'/login'});
            }
        },
    },
}

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .head_logo{
        left: 0.4rem;
        font-weight: 400;
        @include sc(0.7rem, #fff);
        @include wh(2.3rem, 0.7rem);
        @include ct;
    }
    .head_tips{
        @include sc(0.65rem, #333);
        font-weight: bold;
        line-height: 1.95rem;
        background-color: #fff;
        text-align: center;
    }
    .myhome_header{
        display: flex;
    }
    .img_header{
        width:6rem;
        padding: 0.8rem 0.8rem 0.6rem 0.8rem;
        img{
            width:100%;
            height:auto;
            border-radius: 4rem;
        }
    }
    .main_container{
        display: flex;
        padding:.5rem .8rem;
        margin-bottom: .8rem;
        background: rgba(244,244,244,1);
        .title_profile{
            width:2.5rem;
            height:2.5rem;
            display: block;
            border:.025rem solid #ddd;
            background:#ccc;
            margin-right:.6rem;
            border-radius: .4rem;
            background: url(../../images/account.png) center center no-repeat;
            background-size:100% auto;
        }
        .title_msg{
            font-size: .7rem;
            color:#767676;
            line-height: 1.3rem;
        }
    }
    .wallet{
        width:90%;
        border:0.025rem solid #ddd;
        box-shadow: 2px 2px 3px #888888;
        margin:0 auto;
        h2{
            margin-top:.3rem;
            text-align: center;
            font-size: .8rem;
            color:#666;
        }
        .wallet_other{
            border-top:0.025rem solid #ddd;
            margin-top:.3rem;
            display: flex;
            .wallet_flex{
                flex:1;
                text-align: center;
                font-size: .6rem;
                color:#666;
                padding:0.6rem;
            }

        }
    }
    .wallet2{
        width:100%;
        padding:.3rem 5%;
        margin-top:1rem;
        background: rgba(244,244,244,1);
        h2{
            margin-top:.2rem;
            text-align: center;
            font-size: .8rem;
            color:#666;
        }
        h1{
            margin-top:.2rem;
            text-align: center;
            font-size: 1.6rem;
            color:#e16072;
        }
        .wallet_other{
            margin-top:.2rem;
            display: flex;
            .wallet_flex{
                flex:1;
                text-align: center;
                font-size: .6rem;
                color:#666;
                span{
                    display: block;
                    line-height: 1.4rem;
                    color:#a4a4a4;
                }
            }

        }
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
        .draw{
            background:#249ef5;
            i{
                background: url(../../images/ico-out.png) no-repeat center center;
                background-size:100% auto;
            }
            span{
                
            }
        }
        .deposit{
            background:#0081ee;
            i{
                background: url(../../images/ico-in.png) no-repeat center center;
                background-size:100% auto;
            }
            span{
                
            }
        }
    }
    .button-section{
        padding-bottom:.8rem;
        h4{
            text-align: center;
            @include sc(.8rem,#666);
            padding:.4rem;
        }
        .ico-team{
            width:28px;
            height:33px;
            margin:0 auto;
            background:url(../../images/ico-team.png);
        }
    }
</style>
