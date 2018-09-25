<template>
  	<div style="width:100%;">
        <header id="head_top">
            <section class="title_head ellipsis">
                <span class="title_text" v-if="user">{{user.cName}}</span>
            </section>
        </header>
        <section class="main_container">
            <div class="title_profile" @click="confirmWindow()">
                <i class="pop" v-if="user && user.cName ==''"></i>
            </div>
            <section v-if="user" @click="confirmWindow()">
                <div class="title_msg2">个人总收益 (元)</div>
                <div v-if="plan">
                    <div class="title_msg" v-if="teamMoney">{{ (teamMoney ) | currency('')}} </div>
                    <div class="title_msg" v-else>{{ 0 | currency('')}}  </div>
                </div>
                <div v-else>
                    <div class="title_msg" v-if="teamMoney - 10000 > 0">{{ (teamMoney -10000) | currency('')}}  <span class="title_msg2" v-if>已扣除收益10,000元</span></div>
                    <div class="title_msg" v-else> 0.00  <span class="title_msg2" v-if>空单：需扣除收益10,000元</span></div>
                </div>
            </section>
            <router-link class="title_detail" to="/setting/profile">
                账号设置
                <i class="ico-arrow">
                        <svg width="9px" height="14px" viewBox="0 0 9 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            
                            <g id="Page-1" stroke="none" stroke-width="1" fill="#fff" fill-rule="evenodd">
                                <g id="iPhone-X-Copy" transform="translate(-346.000000, -587.000000)" fill="#fff">
                                    <polygon id="chevron_right---material" points="347.816 587.4 354.316 593.9 347.816 600.4 346.282 598.866 351.274 593.9 346.282 588.934"></polygon>
                                </g>
                            </g>
                        </svg>
                    </i>
            </router-link>
        </section>

        <section>

            <div class="wallet" v-if="plan && plan.price>0">
                <h2>昨日释放(股)</h2>
                <h2>{{plan.equity * 1 *  plan.rate /10000}}</h2>
                <div class="wallet_other">
                    <div class="wallet_flex">
                        累计释放(股)<br/>
                        <span>{{plan.equity * days *  plan.rate /10000}}</span>
                    </div>
                    <div class="wallet_flex">
                        承诺释放(股)<br/>
                        <span v-if="plan.equity">{{plan.equity}}</span>
                    </div>
                    <div class="wallet_flex">
                        每日释放(%)<br/>
                        <span v-if="plan.rate">{{plan.rate/100}}%</span>
                    </div>
                </div>
            </div>
            <div class="wallet" v-else>
                <h2>昨日释放(股)</h2>
                <h2>0</h2>
                <div class="wallet_other">
                    <div class="wallet_flex">
                        累计释放(股)<br/>
                        <span>0</span>
                    </div>
                    <div class="wallet_flex">
                        承诺释放(股)<br/>
                        <span>0</span>
                    </div>
                    <div class="wallet_flex">
                        每日释放(%)<br/>
                        <span>0%</span>
                    </div>
                </div>
            </div>
            <div class="button-section" >
                <div class="ico-team">
                    <svg width="28px" height="28px" viewBox="0 0 22 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="iPhone-8-Plus" transform="translate(-41.000000, -502.000000)" fill="#1882E6">
                                <path d="M55.224,518.6 L54.096,513.776 L57.84,510.536 L52.92,510.104 L51,505.616 L49.08,510.152 L44.16,510.536 L47.904,513.776 L46.776,518.6 L51,516.056 L55.224,518.6 Z M51,502.616 C52.8240091,502.616 54.5119922,503.071995 56.064,503.984 C57.5680075,504.848004 58.7519957,506.031992 59.616,507.536 C60.5280046,509.088008 60.984,510.775991 60.984,512.6 C60.984,514.424009 60.5280046,516.111992 59.616,517.664 C58.7519957,519.168008 57.5680075,520.351996 56.064,521.216 C54.5119922,522.128005 52.8240091,522.584 51,522.584 C49.1759909,522.584 47.4880078,522.128005 45.936,521.216 C44.4319925,520.335996 43.2480043,519.144008 42.384,517.64 C41.4719954,516.087992 41.016,514.408009 41.016,512.6 C41.016,510.791991 41.4719954,509.112008 42.384,507.56 C43.2640044,506.055992 44.4559925,504.864004 45.96,503.984 C47.5120078,503.071995 49.191991,502.616 51,502.616 Z" id="stars---material-copy"></path>
                            </g>
                        </g>
                    </svg>
                                        </div>
                <h4>股权计划</h4>
                <h4 class="right" v-if="plan">{{plan.title}} {{plan.subtitle}} </h4>
                <h4 class="right" v-else style="color:#df3d28" @click="goTo('analytics')"> 点击抢购 </h4>
                <i class="ico-arrow">
                   
                </i>
            </div>

            <div class="button-section">
                <div class="ico-team">
                    <svg width="28px" height="28px" viewBox="0 0 22 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="iPhone-8-Plus" transform="translate(-41.000000, -502.000000)" fill="#1882E6">
                                <path d="M55.224,518.6 L54.096,513.776 L57.84,510.536 L52.92,510.104 L51,505.616 L49.08,510.152 L44.16,510.536 L47.904,513.776 L46.776,518.6 L51,516.056 L55.224,518.6 Z M51,502.616 C52.8240091,502.616 54.5119922,503.071995 56.064,503.984 C57.5680075,504.848004 58.7519957,506.031992 59.616,507.536 C60.5280046,509.088008 60.984,510.775991 60.984,512.6 C60.984,514.424009 60.5280046,516.111992 59.616,517.664 C58.7519957,519.168008 57.5680075,520.351996 56.064,521.216 C54.5119922,522.128005 52.8240091,522.584 51,522.584 C49.1759909,522.584 47.4880078,522.128005 45.936,521.216 C44.4319925,520.335996 43.2480043,519.144008 42.384,517.64 C41.4719954,516.087992 41.016,514.408009 41.016,512.6 C41.016,510.791991 41.4719954,509.112008 42.384,507.56 C43.2640044,506.055992 44.4559925,504.864004 45.96,503.984 C47.5120078,503.071995 49.191991,502.616 51,502.616 Z" id="stars---material-copy"></path>
                            </g>
                        </g>
                    </svg>
                                        </div>
                <h4>初始投资(元)</h4>
                <h4 class="right" v-if="plan">{{plan.price | currency('')}}</h4>
                <h4 class="right" v-else><i>空单</i></h4>
                <i class="ico-arrow">
                   
                </i>
            </div>
            <div class="button-section">
                <div class="ico-team">
                    <svg width="28px" height="28px" viewBox="0 0 22 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="iPhone-8-Plus" transform="translate(-41.000000, -502.000000)" fill="#1882E6">
                                <path d="M55.224,518.6 L54.096,513.776 L57.84,510.536 L52.92,510.104 L51,505.616 L49.08,510.152 L44.16,510.536 L47.904,513.776 L46.776,518.6 L51,516.056 L55.224,518.6 Z M51,502.616 C52.8240091,502.616 54.5119922,503.071995 56.064,503.984 C57.5680075,504.848004 58.7519957,506.031992 59.616,507.536 C60.5280046,509.088008 60.984,510.775991 60.984,512.6 C60.984,514.424009 60.5280046,516.111992 59.616,517.664 C58.7519957,519.168008 57.5680075,520.351996 56.064,521.216 C54.5119922,522.128005 52.8240091,522.584 51,522.584 C49.1759909,522.584 47.4880078,522.128005 45.936,521.216 C44.4319925,520.335996 43.2480043,519.144008 42.384,517.64 C41.4719954,516.087992 41.016,514.408009 41.016,512.6 C41.016,510.791991 41.4719954,509.112008 42.384,507.56 C43.2640044,506.055992 44.4559925,504.864004 45.96,503.984 C47.5120078,503.071995 49.191991,502.616 51,502.616 Z" id="stars---material-copy"></path>
                            </g>
                        </g>
                    </svg>
                                        </div>
                <h4>{{days}}天共持有(股)</h4>
                <h4 class="right" v-if="plan">
                    <span >{{plan.equity * days *  plan.rate /10000 }} </span>
                    +  {{ firstEquity + secondEquity + thirdEquity}} </h4>
                <h4 class="right" v-else>
                    <i v-if="teamMoney - 10000 < 0">收益满10,000元方可转让股权</i>
                    <i v-else>{{ firstEquity + secondEquity + thirdEquity}}</i>
                </h4>
                <i class="ico-arrow">
                   
                </i>
            </div>
            <div class="wallet2" v-if="teamTotal">
                <h2>团队总投资(元)</h2>
                <h1 >&nbsp;{{teamTotal|currency('')}}</h1>
                <div class="wallet_other">
                    <div class="wallet_flex">
                        1级收益(股)<br/>
                        <span v-if="first">{{firstEquity}}</span>
                    </div>
                    <div class="wallet_flex">
                        2级收益(股)<br/>
                        <span v-if="second">{{secondEquity}}</span>
                    </div>
                    <div class="wallet_flex">
                        3级收益(股)<br/>
                        <span v-if="third">{{thirdEquity}}</span>
                    </div>
                </div>
            </div>
            <div class="wallet2" v-else>
                <h2>团队总投资</h2>
                <h1>0</h1>
                <div class="wallet_other">
                    <div class="wallet_flex">
                        1级收益(股)<br/>
                        <span>0</span>
                    </div>
                    <div class="wallet_flex">
                        2级收益(股)<br/>
                        <span>0</span>
                    </div>
                    <div class="wallet_flex">
                        3级收益(股)<br/>
                        <span>0</span>
                    </div>
                </div>
            </div>

            <div>
                <router-link class="button-section" to='/setting/shareTeam' tag="div">
                    <div class="ico-team">
                        <svg width="28px" height="28px" viewBox="0 0 22 33" version="1.1" xmlns="http://w   ww.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="iPhone-8-Plus" transform="translate(-41.000000, -502.000000)" fill="#1882E6">
                                    <path d="M55.224,518.6 L54.096,513.776 L57.84,510.536 L52.92,510.104 L51,505.616 L49.08,510.152 L44.16,510.536 L47.904,513.776 L46.776,518.6 L51,516.056 L55.224,518.6 Z M51,502.616 C52.8240091,502.616 54.5119922,503.071995 56.064,503.984 C57.5680075,504.848004 58.7519957,506.031992 59.616,507.536 C60.5280046,509.088008 60.984,510.775991 60.984,512.6 C60.984,514.424009 60.5280046,516.111992 59.616,517.664 C58.7519957,519.168008 57.5680075,520.351996 56.064,521.216 C54.5119922,522.128005 52.8240091,522.584 51,522.584 C49.1759909,522.584 47.4880078,522.128005 45.936,521.216 C44.4319925,520.335996 43.2480043,519.144008 42.384,517.64 C41.4719954,516.087992 41.016,514.408009 41.016,512.6 C41.016,510.791991 41.4719954,509.112008 42.384,507.56 C43.2640044,506.055992 44.4559925,504.864004 45.96,503.984 C47.5120078,503.071995 49.191991,502.616 51,502.616 Z" id="stars---material-copy"></path>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <h4>团队成员 ({{first.length + second.length + third.length}})</h4>
                    <h4 class="right red"> +{{ firstEquity + secondEquity + thirdEquity}} 股</h4>
                    <i class="ico-arrow">
                        <svg width="9px" height="14px" viewBox="0 0 9 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="iPhone-X-Copy" transform="translate(-346.000000, -587.000000)" fill="#1882E6">
                                    <polygon id="chevron_right---material" points="347.816 587.4 354.316 593.9 347.816 600.4 346.282 598.866 351.274 593.9 346.282 588.934"></polygon>
                                </g>
                            </g>
                        </svg>
                    </i>
                </router-link>

                <div class="button-section">
                    <div class="ico-team">
                        <svg width="28px" height="28px" viewBox="0 0 22 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="iPhone-8-Plus" transform="translate(-41.000000, -502.000000)" fill="#1882E6">
                                    <path d="M55.224,518.6 L54.096,513.776 L57.84,510.536 L52.92,510.104 L51,505.616 L49.08,510.152 L44.16,510.536 L47.904,513.776 L46.776,518.6 L51,516.056 L55.224,518.6 Z M51,502.616 C52.8240091,502.616 54.5119922,503.071995 56.064,503.984 C57.5680075,504.848004 58.7519957,506.031992 59.616,507.536 C60.5280046,509.088008 60.984,510.775991 60.984,512.6 C60.984,514.424009 60.5280046,516.111992 59.616,517.664 C58.7519957,519.168008 57.5680075,520.351996 56.064,521.216 C54.5119922,522.128005 52.8240091,522.584 51,522.584 C49.1759909,522.584 47.4880078,522.128005 45.936,521.216 C44.4319925,520.335996 43.2480043,519.144008 42.384,517.64 C41.4719954,516.087992 41.016,514.408009 41.016,512.6 C41.016,510.791991 41.4719954,509.112008 42.384,507.56 C43.2640044,506.055992 44.4559925,504.864004 45.96,503.984 C47.5120078,503.071995 49.191991,502.616 51,502.616 Z" id="stars---material-copy"></path>
                                </g>
                            </g>
                        </svg>
                                            </div>
                    <h4>我的邀请码</h4>
                    <h4 class="right" v-if="user">{{user.inviteKey}}</h4>
                    <i class="ico-arrow">
                       
                    </i>
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
        
        <transition name="router-slid" mode="out-in" >
            <router-view v-on:profileUpdate="profileUpdate"></router-view>
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
import {getUserFinance,createOrder,getUserPlan,getUserTeam} from '../../service/getData'
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
            teamTotal:0
        }
    },

	mounted(){

        if(getStore('user') == undefined){
            this.$router.push('/');
        }

        this.user = JSON.parse(getStore('user') || {});

        getUserFinance(this.user.phone).then( o=>{
            
            console.log(o);

            this.wallet = o.data;
            this.user.cName = o.data.cName ;
            this.user.invite = o.data.invite;
            this.user.inviteKey = o.data.inviteKey;
            this.days = parseInt((new Date().getTime() - this.wallet.createTime) / 1000 / 60 / 60 / 24);

            setStore("user",this.user);
        })


        getUserPlan(this.user.phone).then( o=>{
            console.log(o);
            if(o && o.status < 1) return;
            this.plan = o;
        })


        getUserTeam(this.user.phone).then(o=>{
            console.log(o);
            this.teamList  = o;
            this.teamList.map(x=>{
                this.first.push(x);
                if(x.child){
                    x.child.map(y=>{
                        this.second.push(y);
                        if(y.child){
                            y.child.map(z=>{
                                this.third.push(z);
                            })
                        }
                    })
                }
            })
            console.log(this.first,this.second,this.third);
            this.first.map(x=>{
                if(x.money > 0){
                    this.teamTotal +=x.money;
                    this.teamMoney +=x.money *0.1;
                    this.firstEquity +=200;
                }
            })

            this.second.map(x=>{
                if(x.money > 0){
                    this.teamTotal +=x.money;
                    this.teamMoney +=x.money *0.1;
                    this.secondEquity +=500;
                }
            })

            this.third.map(x=>{
                if(x.money > 0){
                    this.teamTotal +=x.money;
                    this.teamMoney +=x.money *0.2;
                    this.thirdEquity +=1000;
                }
            })
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
        profileUpdate(user){
            this.user = user;
        },
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

        confirmWindow(){
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
        border-bottom:0.0125rem solid #d7d7d7;
        padding-left:.5rem;
        display: flex;
        justify-content:space-between;
        h4{
            @include sc(.6rem,#666);
            padding:.5rem .3rem;
            flex: 1;
            text-align: left;
        }
        .right{
            @include sc(.6rem,#333);
            padding:.5rem .3rem;
            flex: 2;
            text-align: right;
            i{
                color:#999;
            }

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
