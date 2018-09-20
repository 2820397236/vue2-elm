<template>
    <div class="policyContainer">
        <head-top  goBack="true" headTitle="我的团队">
        </head-top>

        <section class="main_container">
            <div class="button-section" v-for="(t,index) in teamList" :key="index">
                <div class="child">
                    <div class="ico-team">
                        <i class="team-porfile"></i>
                    </div>
                    <div class="team-info">
                        <div class="flex justify"><span class="team-name">{{t.cname|| '未实名'}} ({{t.phone}}) </span>
                        <span ><i class="red">{{t.money * 0.1|currency('+')}} 元</i></span> </div>
                        <div class="flex">
                            
                            <span class="text-min">股权收益:<i> +200</i> 股</span>
                        </div>
                        <div>
                            <span class="team-time">于 {{t.createTime | dateTime('MM-DD hh:mm')}} 加入 我 的团队</span>
                        </div>
                    </div>
                </div>
                <div  v-for="(tc,index) in t.child" :key="index">
                <div class="childchild">
                    <div class="ico-child">
                    </div>
                    <div class="ico-team">
                        <i class="team-porfile"></i>
                    </div>
                    <div class="team-info">
                        <div class="flex justify"><span class="team-name">{{tc.cname || '未实名'}} </span>
                        <span ><i class="red">{{t.money *0.1|currency('+')}} 元</i></span> </div>
                        <div class="flex">
                            
                            <span class="text-min">股权收益:<i> +500</i> 股</span>
                        </div>
                        <div>
                            <span class="team-time">于 {{t.createTime | dateTime('MM-DD hh:mm')}} 加入 {{t.cname}} 的团队</span>
                        </div>
                    </div>
                </div>
                 <div class="childchildchild" v-for="(tcc,index) in tc.child" :key="index">
                        <div class="ico-child">
                        </div>
                        <div class="ico-team">
                            <i class="team-porfile"></i>
                        </div>
                        <div class="team-info">
                            <div class="flex justify"><span class="team-name">{{tcc.cname || '未实名'}} </span>
                            <span ><i class="red">{{t.money *0.2|currency('+')}} 元</i></span> </div>
                            <div class="flex">
                                
                                <span class="text-min">股权收益:<i>+1000</i> 股</span>
                            </div>
                            <div>
                                <span class="team-time">于 {{tcc.createTime | dateTime('MM-DD hh:mm')}} 加入 {{tc.cname}} 的团队</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
       

        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {getUserTeam} from 'src/service/getData'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import headTop from '../../components/header/head'
    import footGuide from '../../components/footer/footGuide'


    export default {
        data(){
            return {
                weixin:{},
                teamList:[],
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

                if(getStore('user') == undefined){
                    this.$router.push('/');
                }
                this.user = JSON.parse(getStore('user'));

                await getUserTeam(this.user.phone).then(o=>{
                    console.log(o);
                    this.teamList  = o;
                })
                

            },


           
        }
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
            font-size:#fff!important;
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
    .button-section{
        .child{
            border-bottom:0.0125rem solid #d7d7d7;
            padding-left:.5rem;
            display: flex;
            justify-content:space-between;
        }
        .childchild{
            border-bottom:0.0125rem solid #d7d7d7;
            padding-left:2rem;
            display: flex;
            justify-content:space-between;
        }
        .childchildchild{
            border-bottom:0.0125rem solid #d7d7d7;
            padding-left:4rem;
            display: flex;
            justify-content:space-between;
        }
        h4{
            @include sc(.6rem,#666);
            padding:.5rem .3rem;
            flex: 1;
            text-align: left;
        }
        .team-name{
            @include sc(.6rem,#666);
        }
        .team-time{
            @include sc(.5rem,#c7c7c7);

        }
        .text-min{
            @include sc(.5rem,#666);
            margin-right:1rem;
        }
        .team-porfile{
            display: block;
            width:2rem;
            height:2rem;
            background: #d7d7d7;
            border-radius: 2rem;
        }

        .team-info{
            @include sc(.5rem,#666);
            padding:.3rem .6rem .3rem .3rem;
            line-height:.9rem;
            flex:2;
            .flex{
                display: flex;
                &.justify{
                    justify-content:space-between;
                }
                span{
                    display: block;
                }
                
            }
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
        }
        .ico-child{
            width:1rem;
            height:1rem;
            border-left:0.0125rem solid #999;
            border-bottom:0.0125rem solid #999;
            margin-top: .6rem;
        }
        .ico-arrow{
            padding:.24rem .3rem;
            width:28px;
            height:33px;

        }
    }
 
    
   
</style>
