<template>
    <loading></loading>
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

                // this.RECORD_USERINFO(JSON.parse(getStore('user')));
                // console.log(this.GET_USERINFO());
                
                if(!this.$route.query.code){

                    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx95ab74c069adc622&redirect_uri=http://api.icoos.cn/weiXinRedirect&response_type=code&scope=snsapi_userinfo&state=http://yq.icoos.cn/";
                    return;

                }else{

                    let res = await getOpenId(this.$route.query.code);
                    setStore('user',res);

                    //weixin api return openid, but our system returns openId
                    if(!res.openid){

                        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx95ab74c069adc622&redirect_uri=http://api.icoos.cn/weiXinRedirect&response_type=code&scope=snsapi_userinfo&state=http://yq.icoos.cn/";
                        return;

                    }else{

                        let userRes = await getUserByOpenId(res.openid);
                        setStore('user',userRes.user);

                        if(userRes.user.username && userRes.user.username != ''){
                            this.$router.push({path:'/shop'});
                        }else{
                            this.$router.push({path:'/login'});
                        }

                    }
                }

            }
           
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    
</style>
