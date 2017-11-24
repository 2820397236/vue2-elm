<template>
    <div class="loginContainer">
        <!-- <head-top :head-title="loginWay? '登录':'密码登录'" goBack="true">
            <div slot="changeLogin" class="change_login" @click="changeLoginWay">{{loginWay? "密码登录":"短信登录"}}</div>
        </head-top> -->
        <form class="loginForm">
            <section class="title_container">
                <svg width="40px" height="42px" viewBox="0 0 40 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="登录-提示" transform="translate(-168.000000, -90.000000)">
                        <g id="Group-14" transform="translate(168.000000, 92.000000)">
                            <path d="M7.14533135,14.1840716 L13.7687813,15.0080864 L13.7687813,15.0080864 C15.0204946,15.1638105 15.9601389,16.2275984 15.9601389,17.4889613 L15.9601389,21.4893193 L15.9601389,21.4893193 C15.9601389,22.8700311 14.8408508,23.9893193 13.4601389,23.9893193 L7.18530424,23.9893193 L7.18530424,23.9893193 C4.29952512,23.9893193 1.96013892,21.6499331 1.96013892,18.7641539 L1.96013892,18.7641539 L1.96013892,18.7641539 C1.96013892,16.2151442 4.02651957,14.1487636 6.57552927,14.1487636 C6.76600992,14.1487636 6.95630789,14.1605555 7.14533135,14.1840716 Z" id="Rectangle-14" stroke="#000000" stroke-width="3" fill="#FFFFFF" transform="translate(8.960139, 19.069041) rotate(30.000000) translate(-8.960139, -19.069041) "></path>
                            <path d="M29.2250535,14.1840716 L35.8485035,15.0080864 L35.8485035,15.0080864 C37.1002168,15.1638105 38.0398611,16.2275984 38.0398611,17.4889613 L38.0398611,21.4893193 L38.0398611,21.4893193 C38.0398611,22.8700311 36.920573,23.9893193 35.5398611,23.9893193 L29.2650264,23.9893193 L29.2650264,23.9893193 C26.3792473,23.9893193 24.0398611,21.6499331 24.0398611,18.7641539 L24.0398611,18.7641539 L24.0398611,18.7641539 C24.0398611,16.2151442 26.1062417,14.1487636 28.6552514,14.1487636 C28.8457321,14.1487636 29.0360301,14.1605555 29.2250535,14.1840716 Z" id="Rectangle-14" stroke="#000000" stroke-width="3" fill="#FFFFFF" transform="translate(31.039861, 19.069041) scale(-1, 1) rotate(30.000000) translate(-31.039861, -19.069041) "></path>
                            <path d="M17,6 C16.8335343,2.26912216 15.500201,0.269122161 13,0" id="Path-7" stroke="#000000" stroke-width="3"></path>
                            <rect id="Rectangle-16" stroke="#000000" stroke-width="3" fill="#FFE816" x="9" y="5" width="22" height="31" rx="11"></rect>
                            <path d="M9,24 C12.8758646,26 16.5425313,27 20,27 C23.4574687,27 27.1241354,26 31,24" id="Path-5" stroke="#000000" stroke-width="3"></path>
                            <path d="M18.9129998,35 L21.0908664,35 L21.0908664,35 C21.6431512,35 22.0908664,35.4477153 22.0908664,36 C22.0908664,36.1253018 22.0673174,36.2494876 22.0214456,36.3660908 L20.9291143,39.1427258 L20.9291143,39.1427258 C20.7786565,39.5251797 20.40952,39.776635 19.9985352,39.776635 L19.9680884,39.776635 L19.9680884,39.776635 C19.5528409,39.776635 19.1808005,39.5200112 19.0333012,39.1318431 L17.9782126,36.3552081 L17.9782126,36.3552081 C17.7820366,35.8389394 18.041523,35.2613888 18.5577917,35.0652128 C18.6712554,35.0220979 18.7916206,35 18.9129998,35 Z" id="Rectangle-15" fill="#000000"></path>
                            <path d="M27,6 C26.8335343,2.26912216 25.500201,0.269122161 23,0" id="Path-7" stroke="#000000" stroke-width="3" transform="translate(25.000000, 3.000000) scale(-1, 1) translate(-25.000000, -3.000000) "></path>
                            <circle id="Oval-3" fill="#000000" cx="24.5" cy="16.5" r="1.5"></circle>
                            <path d="M18.9095016,18.3102347 C19.0480506,18.7391696 19.1997574,19.4984799 19.9740202,19.4991642 C20.7482829,19.4998484 20.91667,18.793853 21.0507873,18.3102347 C21.1849045,17.8266164 22.1309631,17.8693254 21.9846789,18.7172316 C21.8383948,19.5651378 21.3473633,20.6751707 19.9740202,20.6666175 C18.6006771,20.6580644 18.1412467,19.519806 18.0126955,18.7172316 C17.8841444,17.9146573 18.7709526,17.8812998 18.9095016,18.3102347 Z" id="Path-6" fill="#000000"></path>
                            <circle id="Oval-3" fill="#000000" cx="15.5" cy="16.5" r="1.5"></circle>
                        </g>
                    </g>
                </g>
            </svg>
            </section>
            <section class="title_container">
            蜜蜂点评
            </section>
            <!-- <section class="subtitle_container">
               为您自动收集全网平台真实消费者评论<br/>协助您改善餐厅客户满意度
            </section> -->
        </form>
       
        <form class="loginForm newStyle">
            <section class="input_container">
                <input type="text" placeholder="请输入您的手机号码" v-model="phone">
                <input type="text" placeholder="请填写推荐码(非必填)" v-model="inviteCode">
                <div>
                    <input type="text" placeholder="输入验证码" v-model="verify">
                    <a class="code_button" v-if="!lock" @click="getVerifyCode()">获取验证码</a>
                    <a class="code_button" v-if="lock" >剩余{{second}}秒...</a>
                </div>
            </section>
            <section>
                <div class="policy">登录并绑定即表示同意并了解<br/><span @click="goto('policy')">《蜜蜂点评用户协议》</span></div>

            </section>
            <!-- <section class="input_container">
                <input v-if="!showPassword" type="password" placeholder="密码"  v-model="passWord">
                <input v-else type="text" placeholder="密码"  v-model="passWord">
                <div class="button_switch" :class="{change_to_text: showPassword}">
                    <div class="circel_button" :class="{trans_to_right: showPassword}" @click="changePassWordType"></div>
                    <span>abc</span>
                    <span>...</span>
                </div>
            </section> -->
            <!-- <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
                <div class="img_change_img">
                    <img v-show="captchaCodeImg" :src="captchaCodeImg">
                    <div class="change_img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section> -->
        </form>
        <div class="login_container"  @click="login()">
            登录
        </div>

        <!--  <p class="login_tips">
            <svg v-if="errorMsg != ''" class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#codeWarning"></use>
            </svg>
            <span v-if="errorMsg != ''">{{errorMsg}}</span>
        </p> -->

        <!-- <router-link to="/forget" class="to_forget" v-if="!loginWay">重置密码？</router-link> -->
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="errorMsg"></alert-tip>
    </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import alertTip from '../../components/common/alertTip'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import {verifyCode,mobileCode, accountLogin,getOpenId,getUserByOpenId} from '../../service/getData'
    import weixin from 'weixin-js-sdk'

    export default {
        data(){
            return {
                lock:false,
                second:60,
                timer:null,
                loginWay: false, //登录方式，默认短信登录
                showPassword: false, // 是否显示密码
                inviteCode:'',
                phone: '', //电话号码
                verify:'',
                validate_token: null, //获取短信时返回的验证值，登录时需要
                computedTime: 0, //倒数记时
                userInfo: null, //获取到的用户信息
                userAccount: null, //用户名
                passWord: null, //密码
                captchaCodeImg: null, //验证码地址
                codeNumber: null, //验证码
                showError: false, //显示提示组件
                errorMsg: '', //提示的内容
                showAlert:false,
                weixin:null,
            }
        },
        created(){
            // this.getCaptchaCode();
        },
        mounted(){
            this.initData();
        },
        components: {
            headTop,
            alertTip,
        },
        computed: {
            //判断手机号码
            rightPhoneNumber: function (){
                return /^1\d{10}$/gi.test(this.phone)
            }
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),

            async initData(){
                
                // localStorage.clear();

                // setStore('user','{"id":25,"username":"13788997536","password":"7536","phoneNo":"13788997536","realName":"X","profileImg":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLt9GVR0GqQkjqicrIqibicqaoOFSAQ0u6HFoLcEMwKPdBLzD2mgicCQyumh5JniaH960U0shm17kkjaw/0","isCompany":null,"token":null,"openId":"o8LyKwwyUm6bNkOvHKzqLpu3-0Fg","accessToken":"6HL-hCRhS7aQyBp8bdXUK_1-MBP0CBbIQoOO5U590Jm86q5y1LY3Z5FuviAgHTSLVcdvourLsO_IcNLWf28aFw","city":"","country":"中国"}');

                
                if(getStore('user') == undefined){
                    //  window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx95ab74c069adc622&redirect_uri=http://api.icoos.cn/weiXinRedirect&response_type=code&scope=snsapi_userinfo&state=http://demo.icoos.cn/";
                    // return;
                }

                this.weixin = JSON.parse(getStore('user'));
                
                console.log("verifyCode Get Openid:" + this.weixin.openId);

            },

            login(){
                console.log(this.phone,this.verify);

                if(!this.phone){
                    this.showAlert=true;
                    this.errorMsg = '手机号不能为空';
                    return;
                }

                if(!this.verify){
                    this.showAlert=true;
                    this.errorMsg = '验证码不能为空';
                    return;
                }
                this.mobileLogin();
            },

            getVerifyCode(){

                if (!this.rightPhoneNumber) {
                    this.showAlert=true;
                    this.errorMsg = '手机格式错误';
                    return;
                }

                this.mobileCode();

            },

            async mobileCode(){

                this.lock = true;
                this.codeRes = await mobileCode(this.phone,this.inviteCode);
                
                if(this.codeRes.status < 0){
                    this.showAlert=true;
                    this.errorMsg = this.codeRes.msg;
                    return;
                }

                if(this.codeRes.status == 0){
                    this.showAlert=true;
                    this.errorMsg = '验证码已发送';
                }

                let _this = this;
                _this.second = 60;
                _this.timer = setInterval(()=>{
                    _this.second = _this.second - 1 ;
                    if(  _this.second == 0){
                        clearInterval(_this.timer);
                        this.lock = false;
                    }
                },1000);
            },

            //发送登录信息
            async mobileLogin(){

                let verifyRes = await verifyCode(this.phone,this.verify, this.weixin.openId);

                if(verifyRes.status == -1){
                    this.showAlert = true;
                    this.errorMsg = "验证码输入错误，请重新输入";
                    this.verify = "";

                }else if(verifyRes.status == 0){

                    setStore('user',verifyRes.user);
                    this.$router.push({path:'/shop'});
                }

                //用户名登录
                // this.userResponse = await accountLogin(this.phone, this.verify);

                // if(this.userResponse.status == 0){
                //     setStore('user',this.userResponse.user);
                //     this.$router.push({path:'/shop'});
                //     return;
                // }

                // this.userResponse = await accountRegister(this.userAccount,'1234');
                // if(this.userResponse.status == 0){
                //     setStore('user',this.userResponse.user);
                //     this.$router.push({path:'/shop'});
                // }
                
            },
            closeTip(){
                this.showAlert = false;
            },
            goto(path){
                console.log(path);
                this.$router.push(path);
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .policy{
        @include sc(.6rem, #969FB7);
        @include wh(100%, auto);
        text-align: center;
        padding:.7rem 1rem;
        span{
            @include sc(.6rem, #007BE6);
        }
    }
    .loginContainer{
        padding-top: .35rem;
        p, span, input{
            
        }
    }
    .change_login{
        position: absolute;
        @include ct;
        right: 0.75rem;
        @include sc(.7rem, #fff);
    }

    .loginForm{
        background-color: #fff;
        margin-top: .2rem;
        text-align: center;
        &.newStyle{
            border:0.025rem solid #EBEFF3;
            border-top: 0.25rem solid #FEC842;
            border-radius: 4px;
            margin: 1rem 1.2rem 0;
            padding: 0.4rem 1rem 1rem;
        }
        .title_container{
            display: flex;
            justify-content: center;
            padding: .3rem .8rem 0;
            @include sc(.75rem, #000);
            img{
                width:5rem;
                height:5rem;
            }
        }
        .subtitle_container{
            display: flex;
            justify-content: center;
            text-align: center;
            padding: .6rem 1.6rem;
            font-size:0.6rem;
            color:#aaa;
        }
        .input_container{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            div{
                display: flex;
                width:100%;
                input{
                    width:60%;
                }
            }
            input{
                @include sc(.65rem, #969FB7);
                padding: .5rem 0 .5rem .4rem;
                margin:.2rem 0rem;
                border-bottom:0.025rem solid #EBEFF3;
                text-align: left;
                flex:1;
            }
            .code_button{
                @include sc(.65rem, #007BE6);
                font-weight: bold;
                display: block;
                background-color: #fff;
                flex:1;
                text-align: center;
                line-height: 2.2rem;
            }
            .right_phone_number{
                background-color: #4cd964;
            }
        }
    }
    .login_tips{
        padding: 0rem .6rem;
        height:1.4rem;
        text-align: center;
        .icon_style{
            @include wh(1rem, 1rem);
            vertical-align:middle;
        }
        span{ 
            @include sc(.6rem, red);
            vertical-align:middle;
        }
        a{
            color: #3b95e9;
        }
    }
    .login_container{
        @include wh(40%, auto);
        margin: -1rem auto .2rem;
        /*background-color: #fdd02f;*/
        background-color:#b9c2d3;
        border-radius: 2rem;
        text-align: center;
        @include sc(.7rem, #fff);
        line-height: 2.1rem;
    }
    .button_switch{
        background-color: #ccc;
        display: flex;
        justify-content: center;
        @include wh(2rem, .7rem);
        padding: 0 .2rem;
        border: 1px;
        border-radius: 0.5rem;
        position: relative;
        .circel_button{
            transition: all .3s;
            position: absolute;
            top: -0.2rem;
            z-index: 1;
            left: -0.3rem;
            @include wh(1.2rem, 1.2rem);
            box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0,0,0,.1);
            background-color: #f1f1f1;
            border-radius: 50%;
        }
        .trans_to_right{
            transform: translateX(1.3rem);
        }
        span{
            @include sc(.45rem, #fff);
            transform: translateY(.05rem);
            line-height: .6rem;
        }
        span:nth-of-type(2){
            transform: translateY(-.08rem);
        }
    }
    .change_to_text{
        background-color: #4cd964;
    }
    .to_forget{
        float: right;
        @include sc(.6rem, #3b95e9);
        margin-right: .3rem;
    }
</style>
