<template>
    <div class="loginContainer">
        <!-- <head-top :head-title="loginWay? '登录':'密码登录'" goBack="true">
            <div slot="changeLogin" class="change_login" @click="changeLoginWay">{{loginWay? "密码登录":"短信登录"}}</div>
        </head-top> -->
        <form class="loginForm">
            <section class="title_container">
                <img src="http://opub24jup.bkt.clouddn.com/CBD.jpg"/>
            </section>
            <section class="title_container">
            蜜蜂点评
            </section>
            <section class="subtitle_container">
               帮助您自动收集所有互联网平台实时真实的用户评论，协助您改善餐厅
            </section>
        </form>
        <p class="login_tips">
            <span>&nbsp;</span>
            <span v-if="errorMsg != ''">{{errorMsg}}</span>
        </p>
        <form class="loginForm">
            <section class="input_container">
                <input type="text" placeholder="请输入您要绑定的手机号码" v-model.lazy="phoneNumber">
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
        <p class="login_tips">
            <!-- 注册过的用户可凭账号密码登录 -->
        </p>
        <div class="login_container" @click="getVerifyCode" v-if="!lock">获取验证码</div>
        <div class="login_container"  v-if="lock">验证码已发送</div>

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
    import {mobileCode, accountLogin,getOpenId } from '../../service/getData'
    import weixin from 'weixin-js-sdk'

    export default {
        data(){
            return {
                lock:false,
                loginWay: false, //登录方式，默认短信登录
                showPassword: false, // 是否显示密码
                phoneNumber: '', //电话号码
                validate_token: null, //获取短信时返回的验证值，登录时需要
                computedTime: 0, //倒数记时
                userInfo: null, //获取到的用户信息
                userAccount: null, //用户名
                passWord: null, //密码
                captchaCodeImg: null, //验证码地址
                codeNumber: null, //验证码
                showError: false, //显示提示组件
                errorMsg: '', //提示的内容
                showAlert:false
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
                return /^1\d{10}$/gi.test(this.phoneNumber)
            }
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),

            async initData(){

                if(!this.$route.query.code){
                    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx95ab74c069adc622&redirect_uri=http://api.icoos.cn/weiXinRedirect&response_type=code&scope=snsapi_userinfo&state=http://yq.icoos.cn/";
                    return;
                }

                let weixin = JSON.parse(getStore('wx'));
                let user = JSON.parse(getStore('user'));

                if(weixin && user){
                    this.$router.push({path:'/shop'});
                    return;
                }else{
                    let json = await getOpenId(this.$route.query.code);
                    setStore('wx',json);
                    alert("welcome "+json.nickname);
                }

            },

            //发送登录信息
            async mobileLogin(){
                
                let codeRes = await mobileCode(this.phoneNumber);
                if(codeRes.status == 0){
                    this.$router.push({path:'/code'});
                }

                //用户名登录
                // this.userResponse = await accountLogin(this.userAccount,'1234');

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
            async getVerifyCode(){
                
                if (!this.rightPhoneNumber) {
                    this.showError=true;
                    this.errorMsg = '手机格式错误';
                    return;
                }

                this.lock = true;
                this.codeRes = await mobileCode(this.phoneNumber);
                this.lock = false;

                if(this.codeRes.status == -1){
                    this.showError=true;
                    this.errorMsg = '手机号不能为空';
                    return;
                }

                if(this.codeRes.status == -2){
                    this.showError=true;
                    this.errorMsg = '用户已存在';
                    return;
                }

                if(this.codeRes.status == -3){
                    this.showError=true;
                    this.errorMsg = '邀请码已发送，请等3分钟再尝试';
                    return;
                }

                if(this.codeRes.status == -4){
                    this.showError=true;
                    this.errorMsg = '服务器未响应，邀请码发送失败';
                    return;
                }

                this.$router.push({path:'/code',query:{phone:this.phoneNumber}});

                
                
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
        margin-top: .2rem;
        text-align: center;
        .title_container{
            display: flex;
            justify-content: center;
            padding: .6rem .8rem;
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
            justify-content: space-between;
            input{
                flex:1;
                @include sc(.6rem, #666);
                padding: .5rem .4rem;
                margin:0 .5rem;
                border:0.025rem solid #ededed;
                text-align: center;
            }
            button{
                @include sc(.5rem, #fff);
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
        span{ 
            @include sc(.5rem, red);
        }
        a{
            color: #3b95e9;
        }
    }
    .login_container{
        margin: 0 .5rem 1rem;
        @include sc(.6rem, #fff);
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
