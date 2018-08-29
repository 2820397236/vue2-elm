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
                <h2>我的钱包</h2>
                <h2>{{wallet.total}}</h2>
                <div class="wallet_other">
                    <div class="wallet_flex">
                        已投资<br/>
                        {{wallet.fund}}
                    </div>
                    <div class="wallet_flex">
                        剩余可用<br/>
                        {{wallet.current}}
                    </div>
                </div>
            </div>

            <div class="wallet2" v-if="wallet">
                <h2>昨日收益(元)</h2>
                <h1>{{wallet.yesterday}}</h1>
                <div class="wallet_other">
                    <div class="wallet_flex">
                        累计收益<br/>
                        <span>{{wallet.sum}}</span>
                    </div>
                    <div class="wallet_flex">
                        7日年化(%)<br/>
                        <span>{{wallet.per7}}</span>
                    </div>
                </div>
            </div>
        </section>

        <button class="btn_buy">
            <div class="btn_flex cash" @click="alert()">提现</div>
            <div class="btn_flex" @click="alert()">存入</div>
        </button>

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
import {createOrder,cityGuess, hotcity, groupcity} from '../../service/getData'
import {getStore, setStore, removeStore} from 'src/config/mUtils'
import alertTip from 'src/components/common/alertTip'
import footGuide from '../../components/footer/footGuide'
import loading from 'src/components/common/loading'

export default {
    data(){
        return{

            user: null,
            wallet: null,
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
            showAlert: false,
        }
    },

	mounted(){

        if(getStore('user') == undefined){
            this.$router.push('/');
        }

        this.user = JSON.parse(getStore('user') || {});
        this.user.realName = "先生/女士";

        this.wallet = {
            total:0,
            fund:0,
            current:0,
            yesterday:0,
            sum:0,
            per7:'0.4%'
        };
        
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
        padding:.8rem;
        .title_profile{
            width:2.5rem;
            height:2.5rem;
            display: block;
            border:.025rem solid #ddd;
            background:#ccc;
            margin-right:.6rem;
            border-radius: .4rem;
        }
        .title_msg{
            font-size: .8rem;
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
            margin-top:.4rem;
            text-align: center;
            font-size: .8rem;
            color:#666;
        }
        .wallet_other{
            border-top:0.025rem solid #ddd;
            margin-top:.4rem;
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
        width:90%;
        margin:0 auto;
        margin-top:1rem;
        h2{
            margin-top:.4rem;
            text-align: center;
            font-size: .8rem;
            color:#666;
        }
        h1{
            margin-top:.4rem;
            text-align: center;
            font-size: 1.6rem;
            color:#e16072;
        }
        .wallet_other{
            margin-top:.4rem;
            display: flex;
            .wallet_flex{
                flex:1;
                text-align: center;
                font-size: .6rem;
                color:#666;
                padding:0.6rem;
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
        background:#0081ee;
        .btn_flex{
            flex:1;
            line-height: 250%;
            font-size: .8rem;
            color:#fff;
        }
        .cash{
            background:#249ef5;
        }
    }
</style>
