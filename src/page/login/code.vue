<template>
    <div class="loginContainer">
        <head-top  goBack="true">
        </head-top>
        <form class="loginForm">
            <section class="title_container">
              
            </section>
            <section class="title_container">
            输入验证码
            </section>
            <section class="subtitle_container">
               已向手机号码：{{phone}} 发送验证码
            </section>
        </form>

        <numKeyboard v-model="input" v-on:pasEnd="inputEnd"></numkeyboard>
        

        
        <p class="login_tips"  v-if="errorMsg != ''">
            <svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" href="#codeWarning"></use>
            </svg>
                
            <span>{{errorMsg}}</span>
        </p>
        <!-- <div class="login_container" @click="mobileLogin">确认</div> -->
        <!-- <router-link to="/forget" class="to_forget" v-if="!loginWay">重置密码？</router-link> -->
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import alertTip from '../../components/common/alertTip'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import {verifyCode,mobileCode, checkExsis, sendLogin, getcaptchas, accountLogin,accountRegister} from '../../service/getData'
    import numKeyboard from  '../../components/common/keyboard.vue'


    export default {
        data(){
            return {
                weixin:{},
                input: '',
                errorMsg:'',
                phone:'',
                verify:'',
                loginWay: false, //登录方式，默认短信登录
                showPassword: false, // 是否显示密码
                phoneNumber: null, //电话号码
                mobileCode: null, //短信验证码
                validate_token: null, //获取短信时返回的验证值，登录时需要
                computedTime: 0, //倒数记时
                userInfo: null, //获取到的用户信息
                userAccount: null, //用户名
                passWord: null, //密码
                captchaCodeImg: null, //验证码地址
                codeNumber: null, //验证码
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
            }
        },
        created(){
            // this.getCaptchaCode();
            this.initData();
        },
        components: {
            headTop,
            alertTip,
            numKeyboard
        },
        computed: {
            //判断手机号码
            rightPhoneNumber: function (){
                return /^1\d{10}$/gi.test(this.phoneNumber)
            }
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            //改变登录方式
            changeLoginWay(){
                this.loginWay = !this.loginWay;
            },
            //是否显示密码
            changePassWordType(){
                this.showPassword = !this.showPassword;
            },
            async initData(){

                this.phone = this.$route.query.phone;
                
                if(getStore('user') == undefined){
                    //  window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx95ab74c069adc622&redirect_uri=http://api.icoos.cn/weiXinRedirect&response_type=code&scope=snsapi_userinfo&state=http://demo.icoos.cn/";
                    // return;
                }

                this.weixin = JSON.parse(getStore('user'));
                
                console.log("verifyCode Get Openid:" + this.weixin.openId);

            },
            //获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
            async getCaptchaCode(){
                let res = await getcaptchas();
                this.captchaCodeImg = res.code;
            },
            //获取短信验证码
            async getVerifyCode(){
                
            },
            //发送登录信息
            async mobileLogin(verify){

                this.verify = verify;

                let verifyRes = await verifyCode(this.phone,this.verify, this.weixin.openId);

                if(verifyRes.status == -1){
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
            inputEnd(value){
                console.log(value);
                this.mobileLogin(value);
            },
            closeTip(){
                this.showAlert = false;
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .loginContainer{
        padding-top: 1.95rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
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
        margin-top: .6rem;
        margin-bottom: 3.6rem;
        .title_container{
            display: flex;
            justify-content: center;
            padding: .6rem .8rem .3rem;
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
            color:red;
        }
        .input_container{
            display: flex;
            justify-content: space-between;
            padding: .6rem .8rem;
            border-bottom: 1px solid #f1f1f1;
            input{
                @include sc(.7rem, #666);
            }
            button{
                @include sc(.65rem, #fff);
                font-family: Helvetica Neue,Tahoma,Arial;
                padding: .28rem .4rem;
                border: 1px;
                border-radius: 0.15rem;
            }
            .right_phone_number{
                background-color: #4cd964;
            }
        }
        .phone_number{
            padding: .3rem .8rem;
        }
        .captcha_code_container{
            height: 2.2rem;
            .img_change_img{
                display: flex;
                align-items: center;
                img{
                    @include wh(3.5rem, 1.5rem);
                    margin-right: .2rem;
                }
                .change_img{
                    display: flex;
                    flex-direction: 'column';
                    flex-wrap: wrap;
                    width: 2rem;
                    justify-content: center;
                    p{
                        @include sc(.55rem, #666);
                    }
                    p:nth-of-type(2){
                        color: #3b95e9;
                        margin-top: .2rem;
                    }
                }
            }
        }
    }
    .login_tips{
        padding: .4rem .6rem;
        line-height: .5rem;
        text-align: center;
        .icon_style{
            @include wh(1rem, 1rem);
            vertical-align:middle;
        }
        span{ 
            @include sc(.6rem, #8b8b8b);
            vertical-align:middle;
        }
        a{
            color: #3b95e9;
        }
    }
    .login_container{
        margin: 0 .5rem 1rem;
        @include sc(.7rem, #fff);
        background-color: #fdd02f;
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
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
