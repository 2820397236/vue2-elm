<template>
    <div class="loginContainer">
        <!-- <head-top :head-title="loginWay? '登录':'密码登录'" goBack="true">
            <div slot="changeLogin" class="change_login" @click="changeLoginWay">{{loginWay? "密码登录":"短信登录"}}</div>
        </head-top> -->
        <form class="loginForm">
            <img src="../../images/logo1.png" class="title_logo"/>
            <!-- <section class="title_container">
            小秘蜂
            </section> -->
            <!-- <section class="subtitle_container">
               为您自动收集全网平台真实消费者评论<br/>协助您改善餐厅客户满意度
            </section> -->
        </form>
       
        <form class="loginForm newStyle">
            <section class="input_container">
                <input type="text" placeholder="登录手机(必填):" v-model="account.phone" class="btline disabled" v-if="this.$route.query.type == 'bind'" disabled="">
                <input type="text" placeholder="登录手机(必填):" v-model="account.phone" class="btline" v-else>
                <input type="password" placeholder="登录密码(必填):" v-model="account.password" class="btline">
                <input type="text" placeholder="推荐码(必填):" v-model="account.inviteCode" class="btline" v-if="this.$route.query.type == 'bind'" disabled="">
                <input type="text" placeholder="推荐码(必填):" v-model="account.inviteCode" class="btline" v-else>


                <input type="text" placeholder="姓名(必填):" v-model="account.cName" class="btline">
                <input type="text" placeholder="身份证(必填):" v-model="account.idCard" class="btline">
                <input type="text" placeholder="银行卡号(必填):" v-model="account.bankCard" class="btline">
                <input type="text" placeholder="银行名称:" v-model="account.bankName" class="btline">

                <div>
                    <input type="text" placeholder="验证码:" v-model="account.verify">
                    <a class="code_button" v-if="!lock" @click="getVerifyCode()">获取验证码</a>
                    <a class="code_button" v-if="lock" >剩余{{second}}秒...</a>
                </div>
            </section>
            <section>
                <div class="policy"><!-- 登录并绑定即表示同意并了解<br/><span @click="goto('policy')">《蜜蜂点评用户协议》</span> --></div>

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
        <div class="login_container"  @click="verifyLogin()" v-if="loginEnabled && this.$route.query.type != 'bind'">
            注册
        </div>
        <div class="login_container"  @click="verifyLogin()" v-if="loginEnabled && this.$route.query.type == 'bind'">
            保存
        </div>
        <div class="login_container" v-if="! loginEnabled">
            等待...
        </div>

        <a class="signup" @click="goto('login')" v-if="this.$route.query.type != 'bind'">我有账号，点击登录</a>

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
    import {verify, sendCode, verifyCode,mobileCode, accountLogin,getOpenId,getUserByOpenId} from '../../service/getData'
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
                cName:'',
                phone: '', //电话号码
                password:'',
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
                loginEnabled:true,
                weixin:null,
                account:{
                    cName:'',
                    phone: '', //电话号码
                    password:'',
                    inviteCode:'',
                    verify:''

                }
            }
        },
        created(){
            // this.getCaptchaCode();
            this.initData();
        },
        mounted(){
        },
        components: {
            headTop,
            alertTip,
        },
        computed: {
            //判断手机号码
            rightPhoneNumber: function (){
                return /^1\d{10}$/gi.test(this.account.phone)
            }
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),

            async initData(){
                console.log();

                if(getStore('user') != undefined){
                    let user =   JSON.parse(getStore('user'));
                    this.account.phone = user.phone;
                    this.account.cName = user.cName;
                    this.account.inviteCode = user.invite;
                }
                // localStorage.clear();

                // setStore('user','{"id":25,"username":"13788997536","password":"7536","phoneNo":"13788997536","realName":"X","profileImg":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLt9GVR0GqQkjqicrIqibicqaoOFSAQ0u6HFoLcEMwKPdBLzD2mgicCQyumh5JniaH960U0shm17kkjaw/0","isCompany":null,"token":null,"openId":"o8LyKwwyUm6bNkOvHKzqLpu3-0Fg","accessToken":"6HL-hCRhS7aQyBp8bdXUK_1-MBP0CBbIQoOO5U590Jm86q5y1LY3Z5FuviAgHTSLVcdvourLsO_IcNLWf28aFw","city":"","country":"中国"}');

                
                // if(getStore('user') == undefined){
                    //  window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx95ab74c069adc622&redirect_uri=http://api.icoos.cn/weiXinRedirect&response_type=code&scope=snsapi_userinfo&state=http://demo.icoos.cn/";
                    // return;
                // }
// 
                // this.weixin = JSON.parse(getStore('user'));
                // 
                // console.log("verifyCode Get Openid:" + this.weixin.openId);

                // if(getStore('user') != undefined){
                //     this.$router.push({path:'/analytics'});
                // }
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

                this.sendCode();

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

            async sendCode(){
                this.lock = true;
                this.codeRes = await sendCode(this.account.phone);
                
                if(this.codeRes.status < 0){
                    this.showAlert=true;
                    this.errorMsg = this.codeRes.error;
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

            async verifyLogin(){
                if(this.account.cName =="") {
                    
                    this.showAlert=true;
                    this.errorMsg = '请填写姓名';
                    return;
                }

                if(this.account.phone =="") {
                    
                    this.showAlert=true;
                    this.errorMsg = '请填写手机';
                    return;
                }
                if(this.account.password =="") {
                    
                    this.showAlert=true;
                    this.errorMsg = '请填写登录密码';
                    return;
                }

                if(this.account.inviteCode =="") {
                    
                    this.showAlert=true;
                    this.errorMsg = '请填写邀请码';
                    return;
                }

                if(this.account.verify =="") {
                    
                    this.showAlert=true;
                    this.errorMsg = '请填写验证码';
                    return;
                }
                this.loginEnabled = false;
                let verifyRes = await verify(this.account);
                this.loginEnabled = true;

                if(verifyRes.status == -1){
                    this.showAlert = true;
                    this.errorMsg = "验证码输入错误，请重新输入";
                    this.verify = "";

                }else if(verifyRes.status == 0){

                    this.verify = "";
                    setStore('user',{phone:this.account.phone, cName:this.account.cName});
                    this.$router.push({path:'/analytics'});
                }
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
        overflow:hidden;
        width:100%;
        height:100%;
        background:url(../../images/bg.jpg);
        background-size:100% auto;
        position: absolute;
        top:0;
        bottom:0;
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
        margin-top: 2rem;
        margin-bottom: 1rem;
        text-align: center;
        &.newStyle{
            /*border:0.025rem solid #EBEFF3;
            border-top: 0.25rem solid #FEC842;*/
            border-radius: 4px;
            width:80%;
            margin:0.25rem auto;
        }
        .title_logo{
            width:80px;
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
            background:rgba(255,255,255,0.1);
            div{
                display: flex;
                width:100%;
                input{
                    width:60%;
                }
            }
            input{
                @include sc(.55rem, #fff);
                background:none;
                padding: .7rem 0 .7rem .7rem;
                text-align: left;
                flex:1;
                &.btline{
                    border-bottom:0.025rem solid #EBEFF3;
                }
                &.disabled{
                    color:#999;
                }
                
            }
            .code_button{
                @include sc(.55rem, #f5ff81);
                background-color: #e8295c;
                text-align: center;
                line-height: .8rem;
                height: 1.2rem;
                padding:.2rem;
                margin:.5rem .4rem;
                border-radius: .1rem;
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
        background-color:#e8295c;
        border-radius: .1rem;
        text-align: center;
        @include sc(.7rem, #f5ff81);
        line-height: 1.8rem;
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
    .signup{
        /*float: right;*/
        display: block;
        @include sc(.6rem, #3b95e9);
        text-align: center;
        margin-top:.6rem;
    }
</style>
