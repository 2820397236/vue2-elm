<template>
  	<div class="team_container">
        <head-top  goBack="true" headTitle="账号设置">
        </head-top>

        <section>

            <div class="button-section">
                
                <h4>手机</h4>
                <h4 class="right" v-if="user">{{user.phone}} </h4>
                <!-- <input class="right" @focus="selectAll($event)" v-if="user" v-model="user.phone"/> -->
                <i class="ico-arrow">
                   
                </i>
            </div>

            <div class="button-section">
                
                <h4>姓名</h4>
                <!-- <h4 class="right" v-if="user">{{user.cName}} </h4> -->
                <input class="right" @focus="selectAll($event)" v-if="user" v-model="user.cName" placeholder="请填写真实姓名"/>
                <i class="ico-arrow">
                   
                </i>
            </div>

            <div class="button-section">
             
                <h4>身份证</h4>
                <!-- <h4 class="right">{{user.idCard}}</h4> -->
                 <input class="right" @focus="selectAll($event)" v-if="user" v-model="user.idCard" placeholder="请填写身份证"/>
                <i class="ico-arrow">
                   
                </i>
            </div>
            
            <div class="button-section margin-top">
                
                <h4>银行名称</h4>
                <!-- <h4 class="right">{{user.bankName}} -->
                 <input class="right" @focus="selectAll($event)" v-if="user" v-model="user.bankName" placeholder="请填写银行名称"/>

                </h4>
                <i class="ico-arrow">
                   
                </i>
            </div>

            <div class="button-section">
                    
                <h4>银行卡号</h4>
                <!-- <h4 class="right">{{user.bankCard}}</h4> -->
                 <input class="right" @focus="selectAll($event)" v-if="user" v-model="user.bankCard" placeholder="请填写银行卡号"/>
                <i class="ico-arrow">
                   
                </i>
            </div>

            <div class="button-section margin-top">
                    
                <h4>我的邀请人</h4>
                <h4 class="right" v-if="user">{{user.inviteKey}}</h4>
                 <!-- <input class="right" v-if="user" v-model="user.inviteKey"/> -->
                <i class="ico-arrow">
                   
                </i>
            </div>

            <div class="button-section margin-top no-border">
                    
                <h4>收货信息</h4>
                <!-- <h4 class="right">{{user.bankCard}}</h4> -->
                 <input class="right" @focus="selectAll($event)" v-if="user" v-model="user.mainReceiver" placeholder="请填写收货人"/>
                <i class="ico-arrow">
                   
                </i>
            </div>
            <div class="button-section">
                    
                
                <!-- <h4 class="right">{{user.bankCard}}</h4> -->
                 <input class="right" @focus="selectAll($event)" v-if="user" v-model="user.mainAddress" placeholder="请填写收货地址"/>
                <i class="ico-arrow">
                   
                </i>
            </div>


            <div class="button-section save" @click="profileSave()">
                    
                <h4>保存</h4>
                
            </div>

        </section>

        <!-- <button class="btn_buy">
            <div class="btn_flex draw" @click="alert()">
            <i></i>挂单</div>
            <div class="btn_flex deposit" @click="alert()">
            <i></i>买入</div>
        </button> -->

        <loading v-show="showLoading"></loading>
        
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
import headTop from '../../components/header/head'
import {getUserInfo,saveUserInfo} from '../../service/getData'
import {getStore, setStore, removeStore} from 'src/config/mUtils'
import alertTip from 'src/components/common/alertStore'
import footGuide from '../../components/footer/footGuide'
import loading from 'src/components/common/loading'

export default {
    data(){
        return{
            plan:null,
            user: null,
            wallet: null,
            days:0,
            showLoading:false,
            showAlert: false,
            teamList:[],
            first:[],
            second:[],
            third:[],
            firstEquity:0,
            secondEquity:0,
            thirdEquity:0,
            teamMoney:0,
            teamTotal:0,
            profileUpdate:{}
        }
    },

	mounted(){

        if(getStore('user') == undefined){
            this.$router.push('/');
        }

        this.user = JSON.parse(getStore('user') || {});

        getUserInfo(this.user.phone).then( o=>{
            
            console.log(o);

            this.user = o.data;

            setStore("user",this.user);
        })
 
    },

    components: {
        headTop,
        loading,
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

        profileSave(){

            saveUserInfo(this.user).then(o=>{
                console.log(o);
                if(o.status == 0){

                    this.$emit('profileUpdate', this.user);
                    
                    setStore("user",this.user);

                    this.goBack();
                }
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
        selectAll(event){
            event.currentTarget.select();
        },
        checkPhoneNumber(){
            // if(this.user.cName !='') return;

            this.showAlert = true;

            this.alertText = this.user.realName;

            this.alertSubText = '为确保安全请先绑定个人信息';
            this.alertTime = new Date();
            this.alertImg = 'http://zijinchi.linkersocks.com/favicon.ico';

            this.confirmBtn = "立刻绑定";
            this.format = 'YYYY年MM月DD日';
            this.alertFunc = ()=>{
               // console.log('localStorage.clear();')
               // localStorage.clear();
               this.$router.push({path:'/signin',query:{type:"bind"}});
            }
        },
    },
}

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .margin-top{
        margin-top:.4rem;
    }
    .no-border{
        border:0!important;
    }
    .team_container{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding-top: 1.95rem;
        background-color: rgb(245,245,247);
        z-index: 102;
    }
    #head_top{
        background-color: #0081ee;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        @include wh(100%, auto);
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
        padding:.4rem .8rem;
        /*background: rgba(244,244,244,1);*/
        background:#0081ee;
        .title_profile{
            width:2.2rem;
            height:2.2rem;
            display: block;
            border:.025rem solid #ddd;
            background:#fff;
            margin-right:.6rem;
            border-radius: .4rem;
            background: #fff url(../../images/account.png) center center no-repeat;
            background-size:100% auto;
            .pop{
                display: block;
                width:.45rem;
                height:.45rem;
                border-radius:.45rem;
                background:red; 
                float:right;
                margin-top:-0.1rem;
                margin-right:-0.1rem;
            }
        }
        .title_detail{
            flex:1;
            text-align:right;
            @include sc(0.5rem, #fff);
            line-height: 2rem;
            .ico-arrow{
                display: inline-block;
                vertical-align: sub;
            }
        }
        .title_msg{
            font-size: 1.3rem;
            color:#fff;
            line-height: 1.3rem;
            margin-top: .2rem;
        }
        .title_msg2{
            font-size: .5rem;
            color:#fff;
            line-height: .6rem;
        }
    }
    .wallet{
        width:90%;
        border:0.025rem solid #ddd;
        box-shadow: 2px 2px 3px #888888;
        margin: .8rem auto .4rem;
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
        background: rgba(244,244,244,1);
        h2{
            margin-top:.2rem;
            text-align: center;
            font-size: .8rem;
            color:#666;
        }
        h1{
            margin-top:.2rem;
            margin-bottom:.4rem;
            text-align: center;
            font-size: 1.3rem;
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
        background: #fff;
        border-bottom:0.0125rem solid #d7d7d7;
        padding-left:.5rem;
        display: flex;
        justify-content:space-between;
        
        &.save{
            margin-top:4rem;
            h4{
                text-align: center;
            }
        }
        h4{
            @include sc(.6rem,#666);
            padding:.5rem .3rem;
            flex: 1;
            text-align: left;
        }
        h4{
            &.right{
                color:#a7a7a7;
            }
        }
        .right{
            @include sc(.6rem,#333);
            padding:.5rem .3rem;
            background: none;
            flex: 2;

            text-align: right;
            i{
                color:#999;
            }

        }
        .left{
            background: none;
        }
        .red{
            @include sc(.6rem,rgb(223,61,40));
        }
        .ico-team{
            padding:.6rem .3rem;
            width:28px;
            height:33px;
        }
        .ico-arrow{
            padding:.24rem .3rem;
            width:28px;
            height:33px;

        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
