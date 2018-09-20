<template>
  	<div style="width:100%;">
        <header id="head_top">
            <section class="title_head ellipsis">
                <span class="title_text">我</span>
            </section>
        </header>
        <section class="main_container">
            <div class="title_profile"></div>
            <section v-if="user">
                <div class="title_msg"> {{user.cName}}</div>
                <div class="title_msg">手机：{{user.phone}}</div>
            </section>
        </section>

        <section>
            <!-- <div class="wallet" v-if="wallet && plan">
                <h2>我的钱包(元)</h2>
                <h2>{{wallet.totalMoney + plan.equity * days *  plan.rate /10000 * 4.3 | currency('')}}</h2>
                <div class="wallet_other">
                    <div class="wallet_flex">
                        累计收益(元)<br/>
                        {{plan.equity * days *  plan.rate /10000 * 4.3 | currency("")}}
                    </div>
                    <div class="wallet_flex">
                        总投资(元)<br/>
                        {{wallet.totalMoney | currency('')}}
                    </div>
                    <div class="wallet_flex">
                        可用余额(元)<br/>
                        {{wallet.balance}}
                    </div>
                </div>
            </div>
            <div class="wallet" v-else>
                <h2>我的钱包(元)</h2>
                <h2>{{0 | currency('')}}</h2>
                <div class="wallet_other">
                    <div class="wallet_flex">
                        累计收益(元)<br/>
                        {{0 | currency("")}}
                    </div>
                    <div class="wallet_flex">
                        总投资(元)<br/>
                        {{0 | currency('')}}
                    </div>
                    <div class="wallet_flex">
                        可用余额(元)<br/>
                        {{0 | currency('')}}
                    </div>
                </div>
            </div> -->
            
            <div class="wallet" v-if="plan">
                <h2>昨日释放(股)</h2>
                <h2>{{plan.equity * 1 *  plan.rate /10000}}</h2>
                <div class="wallet_other">
                    <div class="wallet_flex">
                        累计获得(股)<br/>
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
                <h1>0</h1>
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
            <div class="button-section" v-if="plan">
                <div class="ico-team">
                    <svg width="28px" height="28px" viewBox="0 0 22 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="iPhone-8-Plus" transform="translate(-41.000000, -502.000000)" fill="#1882E6">
                                <path d="M55.224,518.6 L54.096,513.776 L57.84,510.536 L52.92,510.104 L51,505.616 L49.08,510.152 L44.16,510.536 L47.904,513.776 L46.776,518.6 L51,516.056 L55.224,518.6 Z M51,502.616 C52.8240091,502.616 54.5119922,503.071995 56.064,503.984 C57.5680075,504.848004 58.7519957,506.031992 59.616,507.536 C60.5280046,509.088008 60.984,510.775991 60.984,512.6 C60.984,514.424009 60.5280046,516.111992 59.616,517.664 C58.7519957,519.168008 57.5680075,520.351996 56.064,521.216 C54.5119922,522.128005 52.8240091,522.584 51,522.584 C49.1759909,522.584 47.4880078,522.128005 45.936,521.216 C44.4319925,520.335996 43.2480043,519.144008 42.384,517.64 C41.4719954,516.087992 41.016,514.408009 41.016,512.6 C41.016,510.791991 41.4719954,509.112008 42.384,507.56 C43.2640044,506.055992 44.4559925,504.864004 45.96,503.984 C47.5120078,503.071995 49.191991,502.616 51,502.616 Z" id="stars---material-copy"></path>
                            </g>
                        </g>
                    </svg>
                                        </div>
                <h4>我的股权计划</h4>
                <h4 class="right">{{plan.title}} {{plan.subtitle}} </h4>
                <i class="ico-arrow">
                   
                </i>
            </div>

            <div class="button-section" v-if="plan">
                <div class="ico-team">
                    <svg width="28px" height="28px" viewBox="0 0 22 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="iPhone-8-Plus" transform="translate(-41.000000, -502.000000)" fill="#1882E6">
                                <path d="M55.224,518.6 L54.096,513.776 L57.84,510.536 L52.92,510.104 L51,505.616 L49.08,510.152 L44.16,510.536 L47.904,513.776 L46.776,518.6 L51,516.056 L55.224,518.6 Z M51,502.616 C52.8240091,502.616 54.5119922,503.071995 56.064,503.984 C57.5680075,504.848004 58.7519957,506.031992 59.616,507.536 C60.5280046,509.088008 60.984,510.775991 60.984,512.6 C60.984,514.424009 60.5280046,516.111992 59.616,517.664 C58.7519957,519.168008 57.5680075,520.351996 56.064,521.216 C54.5119922,522.128005 52.8240091,522.584 51,522.584 C49.1759909,522.584 47.4880078,522.128005 45.936,521.216 C44.4319925,520.335996 43.2480043,519.144008 42.384,517.64 C41.4719954,516.087992 41.016,514.408009 41.016,512.6 C41.016,510.791991 41.4719954,509.112008 42.384,507.56 C43.2640044,506.055992 44.4559925,504.864004 45.96,503.984 C47.5120078,503.071995 49.191991,502.616 51,502.616 Z" id="stars---material-copy"></path>
                            </g>
                        </g>
                    </svg>
                                        </div>
                <h4>我已投资</h4>
                <h4 class="right">{{plan.price | currency('￥')}}</h4>
                <i class="ico-arrow">
                   
                </i>
            </div>
            <div class="wallet2" v-if="plan">
                <h2>我的团队</h2>
                <h1 v-if="teamMoney">{{teamMoney|currency('')}}</h1>
                <div class="wallet_other">
                    <div class="wallet_flex">
                        1级收益(股)<br/>
                        <span v-if="first">{{200 * first.length}}</span>
                    </div>
                    <div class="wallet_flex">
                        2级收益(股)<br/>
                        <span v-if="second">{{500 * second.length}}</span>
                    </div>
                    <div class="wallet_flex">
                        3级收益(股)<br/>
                        <span v-if="third">{{500 * third.length}}</span>
                    </div>
                </div>
            </div>
            <div class="wallet2" v-else>
                <h2>昨日收益(股)</h2>
                <h1>0</h1>
                <div class="wallet_other">
                    <div class="wallet_flex">
                        累计收益(股)<br/>
                        <span>0</span>
                    </div>
                    <div class="wallet_flex">
                        承诺收益(股)<br/>
                        <span>0</span>
                    </div>
                    <div class="wallet_flex">
                        每日释放(%)<br/>
                        <span>0%</span>
                    </div>
                </div>
            </div>

            <div>
                <div class="button-section" @click="goTo('/shareTeam')">
                    <div class="ico-team">
                        <svg width="28px" height="33px" viewBox="0 0 20 38" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="iPhone-X-Copy" transform="translate(-102.000000, -583.000000)" fill="#4A9EEE">
                                <path d="M119.664062,593.414062 C120.710943,594.460943 121.242187,595.726555 121.257812,597.210938 L121.257812,601.078125 C121.257812,601.656253 121.046877,602.152342 120.625,602.566406 C120.203123,602.980471 119.703128,603.1875 119.125,603.1875 L113.3125,603.1875 C113.140624,603.578127 112.878908,603.89453 112.527344,604.136719 C112.175779,604.378907 111.789065,604.5 111.367188,604.5 L104.898438,604.5 C104.304685,604.5 103.800783,604.289065 103.386719,603.867188 C102.972654,603.44531 102.765625,602.945315 102.765625,602.367188 L102.765625,598.5 C102.765625,597.031243 103.289057,595.773443 104.335938,594.726562 C104.80469,594.25781 105.335935,593.890626 105.929688,593.625 C105.226559,593.249998 104.656252,592.742191 104.21875,592.101562 C103.671872,591.304684 103.398438,590.42188 103.398438,589.453125 C103.398438,588.156244 103.85937,587.04688 104.78125,586.125 C105.70313,585.20312 106.820306,584.742188 108.132812,584.742188 C109.492194,584.742188 110.64062,585.242183 111.578125,586.242188 C111.921877,585.460934 112.445309,584.812503 113.148438,584.296875 C113.960942,583.734372 114.874995,583.453125 115.890625,583.453125 C117.187506,583.453125 118.29687,583.910152 119.21875,584.824219 C120.14063,585.738286 120.601562,586.851556 120.601562,588.164062 C120.601562,589.132817 120.328128,590.015621 119.78125,590.8125 C119.343748,591.453128 118.781253,591.953123 118.09375,592.3125 C118.671878,592.578126 119.19531,592.94531 119.664062,593.414062 Z M112.84375,588.164062 C112.84375,589.007817 113.140622,589.72656 113.734375,590.320312 C114.328128,590.914065 115.046871,591.210938 115.890625,591.210938 C116.734379,591.210938 117.453122,590.910159 118.046875,590.308594 C118.640628,589.707028 118.9375,588.988285 118.9375,588.152344 C118.9375,587.316402 118.640628,586.601565 118.046875,586.007812 C117.453122,585.41406 116.734379,585.117188 115.890625,585.117188 C115.046871,585.117188 114.328128,585.41406 113.734375,586.007812 C113.140622,586.601565 112.84375,587.320308 112.84375,588.164062 Z M105.953125,591.609375 C106.546878,592.203128 107.265621,592.5 108.109375,592.5 C108.953129,592.5 109.671872,592.203128 110.265625,591.609375 C110.859378,591.015622 111.15625,590.296879 111.15625,589.453125 C111.15625,588.609371 110.859378,587.890628 110.265625,587.296875 C109.671872,586.703122 108.953129,586.40625 108.109375,586.40625 C107.265621,586.40625 106.546878,586.703122 105.953125,587.296875 C105.359372,587.890628 105.0625,588.609371 105.0625,589.453125 C105.0625,590.296879 105.359372,591.015622 105.953125,591.609375 Z M111.8125,602.367188 L111.8125,598.5 C111.8125,597.51562 111.460941,596.664066 110.757812,595.945312 L110.757812,595.921875 L110.734375,595.898438 C109.999996,595.179684 109.125005,594.820312 108.109375,594.820312 C107.093745,594.820312 106.226566,595.179684 105.507812,595.898438 C104.789059,596.617191 104.429688,597.48437 104.429688,598.5 L104.429688,602.367188 C104.429688,602.492188 104.472656,602.597656 104.558594,602.683594 C104.644532,602.769532 104.749999,602.8125 104.875,602.8125 L111.34375,602.8125 C111.468751,602.8125 111.578125,602.769532 111.671875,602.683594 C111.765625,602.597656 111.8125,602.492188 111.8125,602.367188 Z M111.390625,594.28125 C111.593751,593.968748 111.828124,593.679689 112.09375,593.414062 C112.562502,592.94531 113.093747,592.578126 113.6875,592.3125 C113.218748,592.078124 112.796877,591.765627 112.421875,591.375 C111.984373,592.35938 111.281255,593.109372 110.3125,593.625 C110.703127,593.796876 111.062498,594.015624 111.390625,594.28125 Z M119.570312,601.078125 L119.570312,597.210938 C119.570312,596.195307 119.210941,595.324222 118.492188,594.597656 C117.773434,593.87109 116.906255,593.507812 115.890625,593.507812 C114.874995,593.507812 114.000004,593.874996 113.265625,594.609375 C112.999999,594.875001 112.773438,595.187498 112.585938,595.546875 C113.17969,596.437504 113.476562,597.42187 113.476562,598.5 L113.476562,601.523438 L119.125,601.523438 C119.250001,601.523438 119.355468,601.480469 119.441406,601.394531 C119.527344,601.308593 119.570312,601.203126 119.570312,601.078125 Z" id="team---anticon"></path>
                            </g>
                        </g>
                    </svg>
                    </div>
                    <h4>团队成员 ({{first.length + second.length + third.length}})</h4>
                    <h4 class="right"></h4>
                    <i class="ico-arrow">
                        <svg width="9px" height="14px" viewBox="0 0 9 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="iPhone-X-Copy" transform="translate(-346.000000, -587.000000)" fill="#1882E6">
                                    <polygon id="chevron_right---material" points="347.816 587.4 354.316 593.9 347.816 600.4 346.282 598.866 351.274 593.9 346.282 588.934"></polygon>
                                </g>
                            </g>
                        </svg>
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
                    <h4>我的邀请码</h4>
                    <h4 class="right">wang</h4>
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
import {getUserFinance,createOrder,getUserPlan,getUserTeam} from '../../service/getData'
import {getStore, setStore, removeStore} from 'src/config/mUtils'
import alertTip from 'src/components/common/alertTip'
import footGuide from '../../components/footer/footGuide'
import loading from 'src/components/common/loading'

export default {
    data(){
        return{

            user: null,
            wallet: null,
            plan:{
                totalMoney: 0
            },
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
            showAlert: false,
            teamList:[],
            first:[],
            second:[],
            third:[],
            teamMoney:0,
        }
    },

	mounted(){

        if(getStore('user') == undefined){
            this.$router.push('/');
        }

        this.user = JSON.parse(getStore('user') || {});

        getUserFinance(this.user.phone).then( o=>{
            console.log(o);
            this.wallet = o;
            this.user.cName = o.cName ;
            this.days = parseInt((new Date().getTime() - this.wallet.createTime) / 1000 / 60 / 60 / 24);
            console.log(this.days);
        })


        getUserPlan(this.user.phone).then( o=>{
            console.log(o);
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
                this.teamMoney +=x.money *0.1;
            })

            this.second.map(x=>{
                this.teamMoney +=x.money *0.1;
            })

            this.third.map(x=>{
                this.teamMoney +=x.money *0.2;
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
        margin-bottom: .8rem;
        background: rgba(244,244,244,1);
        .title_profile{
            width:2.2rem;
            height:2.2rem;
            display: block;
            border:.025rem solid #ddd;
            background:#ccc;
            margin-right:.6rem;
            border-radius: .4rem;
            background: url(../../images/account.png) center center no-repeat;
            background-size:100% auto;
        }
        .title_msg{
            font-size: .6rem;
            color:#767676;
            line-height: 1.1rem;
        }
    }
    .wallet{
        width:90%;
        border:0.025rem solid #ddd;
        box-shadow: 2px 2px 3px #888888;
        margin:0 auto .4rem;
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
            flex: 1;
            text-align: right;

        }
        .red{
            @include sc(.6rem,rgb(223,61,40));
        }
        .ico-team{
            padding:.5rem .3rem;
            width:28px;
            height:33px;
        }
        .ico-arrow{
            padding:.24rem .3rem;
            width:28px;
            height:33px;

        }
    }
</style>
