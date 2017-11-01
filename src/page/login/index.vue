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

                //DEBUG MODE

                // setStore('user','{"id":25,"username":"13788997536","password":"7536","phoneNo":"13788997536","realName":"X","profileImg":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLt9GVR0GqQkjqicrIqibicqaoOFSAQ0u6HFoLcEMwKPdBLzD2mgicCQyumh5JniaH960U0shm17kkjaw/0","isCompany":null,"token":null,"openId":"o8LyKwwyUm6bNkOvHKzqLpu3-0Fg","accessToken":"6HL-hCRhS7aQyBp8bdXUK_1-MBP0CBbIQoOO5U590Jm86q5y1LY3Z5FuviAgHTSLVcdvourLsO_IcNLWf28aFw","city":"","country":"中国"}');
                // this.$router.push({path:'/shop'});
                // return;


                if(!this.$route.query.code){

                    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx95ab74c069adc622&redirect_uri=http://api.icoos.cn/weiXinRedirect&response_type=code&scope=snsapi_userinfo&state=http://demo.icoos.cn/";
                    return;

                }else{

                    let res = await getOpenId(this.$route.query.code);
                    setStore('user',res);

                    //weixin api return openid, but our system returns openId
                    if(!res.openid){

                        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx95ab74c069adc622&redirect_uri=http://api.icoos.cn/weiXinRedirect&response_type=code&scope=snsapi_userinfo&state=http://demo.icoos.cn/";
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
