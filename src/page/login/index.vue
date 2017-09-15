<template>
    <loading></loading>
</template>

<script>
    import loading from 'src/components/common/loading'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import weixin from 'weixin-js-sdk'

    export default {
        data(){
            return {
                userInfo: null, //获取到的用户信息
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
            }
        },
        methods: {
            async initData(){
                console.log(1);
                
                
                // if(!this.$route.query.code){

                //     window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx95ab74c069adc622&redirect_uri=http://api.icoos.cn/weiXinRedirect&response_type=code&scope=snsapi_userinfo&state=http://yq.icoos.cn/";
                //     return;

                // }else{

                //     let json = await getOpenId(this.$route.query.code);
                //     setStore('user',json);

                //     //weixin api return openid, but our system returns openId
                //     if(!json.openid){

                //         window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx95ab74c069adc622&redirect_uri=http://api.icoos.cn/weiXinRedirect&response_type=code&scope=snsapi_userinfo&state=http://yq.icoos.cn/";
                //         return;
                //     }else{

                //         let userRes = await getUserByOpenId(json.openid);
                //         setStore('user',userRes.user);

                //         if(userRes.user.username){
                //             this.$router.push({path:'/shop'});
                //             return;
                //         }
                //     }
                // }

            }
           
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    
</style>
