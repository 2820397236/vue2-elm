<template>
    <div class="policyContainer">
        <head-top  goBack="true" headTitle="我的团队">
        </head-top>
        <div class="team">
            <div class="treeBoot">
                <div class="user me">我</div>
                <div class="realName">王**</div>
            </div>
            <div class="">
                <ul class="treeLine">
                    <li class="firstChild"></li>
                    <li class="lastChild"></li>
                </ul>
                <ul class="treeLine">
                    <li class="firstChild"></li>
                    <li></li>
                    <li></li>
                    <li class="lastChild"></li>
                </ul>
            </div>
            <div>
                <ul class="teamLine">
                    <li class="firstChild"></li>
                    <li> 
                        <div class="user child1">王</div>
                        <div class="realName">王**</div>
                    </li>
                    <li>
                        <div class="user child1">李</div>
                        <div class="realName">李**</div>
                    </li>
                    <li>
                        <div class="user child1">朱</div>
                        <div class="realName">朱**</div>
                    </li>
                    <li class="lastChild"></li>
                </ul>
            </div>
        </div>

        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import headTop from '../../components/header/head'
    import footGuide from '../../components/footer/footGuide'


    export default {
        data(){
            return {
                weixin:{},
            }
        },
        created(){
            // this.getCaptchaCode();
            this.initData();
        },
        components: {
            headTop,
            footGuide
        },
        computed: {
            
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            
            async initData(){

                

            },
           
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .policyContainer{
        padding-top: 1.95rem;
        padding-bottom: 1.95rem;
        width:100%;
        h1,h2,h3,h4{
            font-weight: bold;
            margin-top:0.4rem;
            margin-bottom:0.4rem;
        }
        h1,h2,h3{

            text-align: center;
        }
        p, span, input,p,div,h1,h2,h3,h4{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
        p{
            text-indent:1.4rem;
            margin-bottom:0.4rem;
        }
    }
    .policyText{
        @include sc(.7rem, #333);
        padding:0 .7rem;
    }
    .team{
        width:100%;
        margin-top:3rem;
        .user{
            color:#fff;
            background:rgb(166,160,183);
            width:2.8rem;
            height:2.8rem;
            line-height: 2.8rem;
            border-radius: 2.8rem;
            text-align: center;
            margin:0 auto;
        }
        .realName{
            margin:0 auto;
            @include sc(.6rem, #999);

        }
        .treeBoot{
            display: flex;
            justify-content:center;
            flex-direction: column ;
        }
        .teamLine{
            display: flex;
            li{
                flex:2;
                text-align: center;
                &.firstChild{
                    flex:1;
                }
                &.lastChild{
                    flex:1;
                }
            }
        }
        .treeLine{
            display: flex;
            height:1rem;
            li{
                flex:1;
                text-align: center;
                border-top:0.0125rem solid #000;
                border-left:0.0125rem solid #000;
                height:1rem;
                &.firstChild{
                    border:0;
                }
                &.lastChild{
                    border-top:0;
                }
            }
        }
    }
    
   
</style>
