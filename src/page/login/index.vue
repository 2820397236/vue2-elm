<template>
    <div class="bg">
        <router-link class="tel" :to="{path:'/login'}" tag="a">
            稳定回报，点击抢购
        </router-link>
        <div class="text">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上海紫絮家纺股份有限公司回报社会，为祖国承担责任、给更多股东的未来拥有一席之地、留下更多资产，特别制定股权激励政策。
        </div>
    </div>
</template>

<script>
    import loading from 'src/components/common/loading'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import {mapState, mapMutations} from 'vuex'
    import {getOpenId,getUserByOpenId} from '../../service/getData'

    export default {
        data(){
            return {
                userAccount: null, //用户名
            }
        },
        created(){
            // this.getCaptchaCode();
        },
        mounted(){
            this.initData();
        },
        components: {
           loading
        },
        computed: {
            //判断手机号码
            rightPhoneNumber: function (){
                return /^1\d{10}$/gi.test(this.phoneNumber)
            },
            ...mapState([
                'userInfo'
            ]),
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO'
            ]),
            async initData(){

                //DEBUG MODE

                // setStore('user','{"id":25,"username":"13788997536","password":"7536","phoneNo":"13788997536","realName":"X","profileImg":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLt9GVR0GqQkjqicrIqibicqaoOFSAQ0u6HFoLcEMwKPdBLzD2mgicCQyumh5JniaH960U0shm17kkjaw/0","isCompany":null,"token":null,"openId":"o8LyKwwyUm6bNkOvHKzqLpu3-0Fg","accessToken":"6HL-hCRhS7aQyBp8bdXUK_1-MBP0CBbIQoOO5U590Jm86q5y1LY3Z5FuviAgHTSLVcdvourLsO_IcNLWf28aFw","city":"","country":"中国"}');
                // this.$router.push({path:'/shop'});
                // return;


                // if(!this.$route.query.code){

                //     window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx95ab74c069adc622&redirect_uri=http://api.icoos.cn/weiXinRedirect&response_type=code&scope=snsapi_userinfo&state=http://yq.icoos.cn/";
                //     return;

                // }else{

                //     let res = await getOpenId(this.$route.query.code);
                //     setStore('user',res);

                //     //weixin api return openid, but our system returns openId
                //     if(!res.openid){

                //         window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx95ab74c069adc622&redirect_uri=http://api.icoos.cn/weiXinRedirect&response_type=code&scope=snsapi_userinfo&state=http://yq.icoos.cn/";
                //         return;

                //     }else{

                //         let userRes = await getUserByOpenId(res.openid);
                //         setStore('user',userRes.user);

                //         if(userRes.user.username && userRes.user.username != ''){
                //             this.$router.push({path:'/analytics'});
                //         }else{
                //             this.$router.push({path:'/login'});
                //         }

                //     }
                // }

                // this.$router.push({path:'/login'});
            }
           
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .bg{
        width:100%;
        font-size:12px;
        color:#fff;
        overflow:hidden;
        background: rgb(16,18,60) url(../../images/ad_2.jpg) no-repeat;
        background-size: 100% auto;
        position: absolute;
        top:0;
        bottom:0;
    }
    .tel{
        background:rgb(219,38,41);
        width:200px;
        height:30px;
        text-align:center;
        line-height: 250%;
        border-radius: 4px; 
        margin:480px auto 0 auto;
        border:1px solid #fff;
        color:#fff;
        text-decoration: none;
        display: block;
    }
    .text{
        color:#fff;
        position:absolute;
        padding:15px 3px;
        bottom:3px;
        background: rgb(16,18,60);
    }
</style>
