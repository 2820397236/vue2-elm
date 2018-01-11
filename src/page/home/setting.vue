<template>
  	<div>
        <header class="myhome_header" ref="shopheader">
                <!-- <img :src="imgBaseUrl + shopDetailData.image_path" class="header_cover_img"> -->
                <section class="description_header">
                    <div v-if="user">{{user.realName}}</div>
                    <div class="description_top">
                       <!--  <section class="description_left" style="border-radius: 10rem;overflow: hidden;">
                            <img :src="user.profileImg" @click="signout">
                        </section> -->
                        <section class="description_right">
                            <h4 class="description_title ellipsis">个人中心</h4>
                        </section>
                    </div>
                </section>
                <section  v-if="user" class="img_header" @click="checkPhoneNumber()">
                    <img :src="user.profileImg"/>
                </section>
            </header>   

        <section class="main_container">
            <section >
                <!-- <div class="form_title">xxxx</div> -->
                <section id="hot_city_container">
                    <ul class="citylistul clear">
                        <li @click="gotoAddress('/myOrder')">
                            <span>我的订单</span>
                            <svg width="26px" height="26px" viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="个人中心" transform="translate(-331.000000, -176.000000)" fill="#CAD2D9">
                                        <path d="M344,202 C336.820298,202 331,196.179702 331,189 C331,181.820298 336.820298,176 344,176 C351.179702,176 357,181.820298 357,189 C357,196.179702 351.179702,202 344,202 Z M344,200 C350.075133,200 355,195.075133 355,189 C355,182.924867 350.075133,178 344,178 C337.924867,178 333,182.924867 333,189 C333,195.075133 337.924867,200 344,200 Z M338.8,192.6 L349.2,192.6 L349.2,194.6 L338.8,194.6 L338.8,192.6 Z M338.8,188.2 L349.2,188.2 L349.2,190.2 L338.8,190.2 L338.8,188.2 Z M338.8,183.8 L349.2,183.8 L349.2,185.8 L338.8,185.8 L338.8,183.8 Z" id="icon-bars"></path>
                                    </g>
                                </g>
                            </svg>
                        </li>  
                        <li @click="gotoAddress('/expireShop')">
                            <span>门店续订管理</span>
                            <svg width="26px" height="26px" viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="个人中心" transform="translate(-331.000000, -249.000000)" fill="#CAD2D9">
                                        <path d="M340.45,256.8 L351.7,256.8 L351.7,258.8 L340.8,258.8 L340.8,266.5 L342.7,266.5 L342.7,268.5 L340.45,268.5 L338.8,268.5 L338.8,256.8 L340.45,256.8 Z M351.700012,260.7 L354.923987,260.7 C354.280849,255.237561 349.635292,251 344,251 C337.924867,251 333,255.924867 333,262 C333,267.635292 337.237561,272.280849 342.7,272.923987 L342.7,261.7 L342.7,260.7 L349.700012,260.7 L349.700012,258.800003 L351.700012,258.800003 L351.700012,260.7 Z M344.7,272.978087 C350.217511,272.631593 354.631593,268.217511 354.978087,262.7 L344.7,262.7 L344.7,272.978087 Z M344,275 C336.820298,275 331,269.179702 331,262 C331,254.820298 336.820298,249 344,249 C351.179702,249 357,254.820298 357,262 C357,269.179702 351.179702,275 344,275 Z" id="icon-calendar-/-date"></path>
                                    </g>
                                </g>
                            </svg>
                        </li>  
                        <li @click="gotoAddress('/chooseBrand')">
                            <span>设置</span>
                            <svg width="26px" height="26px" viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="设置" transform="translate(-331.000000, -322.000000)" fill="#CAD2D9">
                                        <path d="M348.438478,332.4 L349.2,332.4 L349.2,333.7 L351.8,333.7 L351.8,336.3 L349.2,336.3 L349.2,337.6 L348.438478,337.6 L350.434672,339.596194 L348.596194,341.434672 L347.361522,340.2 L345.3,340.2 L345.3,342.8 L342.7,342.8 L342.7,340.2 L341.4,340.2 L341.4,339.438478 L339.403806,341.434672 L337.565328,339.596194 L339.561522,337.6 L338.8,337.6 L338.8,336.3 L336.2,336.3 L336.2,333.7 L338.8,333.7 L338.8,332.4 L339.561522,332.4 L337.565328,330.403806 L339.403806,328.565328 L341.4,330.561522 L341.4,329.8 L342.7,329.8 L342.7,327.2 L345.3,327.2 L345.3,329.8 L347.361522,329.8 L348.596194,328.565328 L350.434672,330.403806 L348.438478,332.4 Z M344,348 C336.820298,348 331,342.179702 331,335 C331,327.820298 336.820298,322 344,322 C351.179702,322 357,327.820298 357,335 C357,342.179702 351.179702,348 344,348 Z M344,346 C350.075133,346 355,341.075133 355,335 C355,328.924867 350.075133,324 344,324 C337.924867,324 333,328.924867 333,335 C333,341.075133 337.924867,346 344,346 Z M344,337.6 C345.43594,337.6 346.6,336.43594 346.6,335 C346.6,333.56406 345.43594,332.4 344,332.4 C342.56406,332.4 341.4,333.56406 341.4,335 C341.4,336.43594 342.56406,337.6 344,337.6 Z" id="calendar-icon"></path>
                                    </g>
                                </g>
                            </svg>
                        </li>  
                    </ul>
                </section>
            </section>

        </section>

        <foot-guide></foot-guide>

        <loading v-show="showLoading"></loading>

        <alert-tip v-if="showAlert" @closeTip="showAlert = false" 
            :alertText="alertText" 
            :alertSubText="alertSubText" 
            :alertTime="alertTime" 
            :alertImg="alertImg"
            :alertFunc="alertFunc"
            :confirmBtn="confirmBtn"
            :format="format"
        ></alert-tip>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import {cityGuess, hotcity, groupcity} from '../../service/getData'
import {getStore, setStore, removeStore} from 'src/config/mUtils'
import alertTip from 'src/components/common/alertStore'
import footGuide from '../../components/footer/footGuide'
import loading from 'src/components/common/loading'

export default {
    data(){
        return{
            user: null,
            city: '',
            hotcity: [],     //热门城市列表
            areaList:[],
            areaMap:{},
            guesscity:{},
            groupcity: {},   //所有城市列表
            inChina:[],
            outChina:[],
            cityList:[],
            showLoading:false,
            showAlert: false,
        }
    },

	mounted(){

        if(getStore('user') == undefined){
            this.$router.push('/');
        }

        this.user = JSON.parse(getStore('user'));

        
    },

    components: {
        loading,
        footGuide,
        alertTip
    },

    computed:{
        //将获取的数据按照A-Z字母开头排序
        sortgroupcity(){
            let sortobj = {};
            for (let i = 65; i <= 90; i++) {
                if (this.groupcity[String.fromCharCode(i)]) {
                    sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
                }
            }
            return sortobj
        }
    },

    methods:{

        reload(){
            window.location.reload();
        },

        setCity(city){    
            setStore('city',city);
            this.$router.push({path:'/city/'+city.dpCityId});
        },
        goBack(){
            this.$router.go(-1);
        },
        gotoAddress(path){
            this.$router.push(path);
        },

        checkPhoneNumber(){
            console.log(this.user.profileImg);

            this.showAlert = true;

            this.alertText = this.user.realName;

            this.alertSubText = '欢迎使用蜜蜂点评，请先绑定手机';
            this.alertTime = new Date();
            this.alertImg = this.user.profileImg;

            this.confirmBtn = "立刻绑定";
            this.format = 'YYYY年MM月DD日';
            this.alertFunc = ()=>{
               console.log('localStorage.clear();')
               localStorage.clear();
               this.$router.push({path:'/login'});
            }
        },
    },
}

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .head_logo{
        left: 0.4rem;
        font-weight: 400;
        @include sc(0.7rem, #fff);
        @include wh(2.3rem, 0.7rem);
        @include ct;
    }
    .title_head{
        @include center;
        width: 50%;
        color: #fff;
        text-align: center;
        line-height: 0.8rem;
        img{
            @include wh(1rem, 1rem);
            vertical-align:middle;
            display: inline-block;
        }
        .title_text{
            @include sc(0.6rem, #666);
            text-align: center;
            vertical-align:middle;
            /*font-weight: bold;*/
        }
    }
    .myhome_header{
        display: flex;
    }
    .img_header{
        width:6rem;
        padding: 0.8rem 0.8rem 0.6rem 0.8rem;
        img{
            width:100%;
            height:auto;
            border-radius: 4rem;
        }
    }
    .main_container{
    }

    .description_header{
            position: relative;
            z-index: 10;
            background-color: rgba(255,255,255,1);
            padding: 0.8rem 0.8rem 0.6rem 0.8rem;
            width: 100%;
            overflow: hidden;
            .description_top{
                display: flex;
                margin-top:0.2rem;
                .description_left{
                    margin-right: 0.5rem;
                    img{
                        @include wh(2.9rem, 2.9rem);
                        display: block;
                        border-radius: 3rem;
                    }
                }
                .description_right{
                    flex: 3;
                    .description_title{
                        @include sc(.6rem, #949aac);
                        line-height: 1.4rem;
                        /*font-weight: bold;*/
                        width: 100%;
                        /*margin-bottom: 0.3rem;*/
                    }
                    .description_text{
                        @include sc(.5rem, #282828);
                        /*margin-bottom: 0.3rem;*/
                    }
                    .description_promotion{
                        @include sc(.5rem, #282828);
                        width: 11.5rem;
                    }
                }
                .description_more{
                    flex:2;
                }
                .description_arrow{
                    @include ct;
                    right: 0.3rem;
                    z-index: 11;
                }
                .shop_detail_vip{

                }
            }
            .description_footer{
                @include fj;
                margin-top: 0.5rem;
                padding-right: 1rem;
                p{
                    @include sc(.5rem, #fff);
                    span{
                        color: #fff;
                    }
                    .tip_icon{
                        padding: 0 .04rem;
                        border: 0.025rem solid #fff;
                        border-radius: 0.1rem;
                        font-size: .4rem;
                        display: inline-block;
                    }
                }
                .ellipsis{
                    width: 84%;
                }
                .footer_arrow{
                    @include wh(.45rem, .45rem);
                    position: absolute;
                    right: .3rem;
                }
            }

            &.empty{
                padding: 1rem 0.8rem 1rem 0.8rem;
                .description_top{
                    img{
                        @include wh(3.4rem, 3.4rem);
                    }
                    .shop_detail_vip{
                        display: none;
                    }
                    .description_title {
                        @include sc(.9rem, #282828);
                    }
                }
            }
        }   
  
    
    .group_city_container{
        width:100%;
    }
    .citylistul{
        padding:0 1rem;
        li{
            @include wh(100%, 3rem);
            border-bottom: 0.025rem solid $bc;
            display: flex;
            align-items: center;
            span{
                display: inline-block;
                @include font(0.7rem, 3rem);
                flex:1;
            }

        }
        li:nth-of-type(3n){
            border-right: none;
        }
    }

</style>
