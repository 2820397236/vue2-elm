<template>
  	<div>
        <!-- <head-top>
            <span slot='logo' class="head_logo"  @click="reload">ele.me</span>
        </head-top> -->
        
        <header class="shop_detail_header" ref="shopheader">
                <!-- <img :src="imgBaseUrl + shopDetailData.image_path" class="header_cover_img"> -->
            <section class="description_header">
                <span>城市列表</span>
                <router-link class="header_city" :to="{path:'/city/1'}" tag="span">
                    取消
                </router-link>
                <div class="description_top">
                   <!--  <section class="description_left" style="border-radius: 10rem;overflow: hidden;">
                        <img :src="user.profileImg" @click="signout">
                    </section> -->
                    <section class="description_right">
                        <h4 class="description_title ellipsis">选择门店所在地区</h4>
                    </section>
                    <section class="description_more">
                        
                    </section>

                </div>

            </section>
        </header>  
        <!-- <form class="city_form" v-on:submit.prevent>
            <router-link to="/home" slot="changecity" class="change_city_right button_style">
                <span>{{city?city.cityNameCh:"上海"}}</span>
                <svg class="arrow_down" data-name="arrow_down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
                    <path class="cls-1" d="M8,2.33l-4,4-4-4Z"/>
                </svg>
            </router-link>
            <div @click="setCity(city)" class="city_input input_style">请输入要搜索订阅的门店名称
            </div>
            
            <div class="head_back_left button_style" @click="goBack()">返回</div>
        </form> -->

        <section class="main_container">
            <section v-for="area in areaList" v-if=" area != '国外热门'">
                <div class="form_title">{{area}}</div>
                <section id="hot_city_container">
                    <ul class="citylistul clear">

                        <li  v-for="(item,index) in areaMap[area]" :key="item.id" @click="setCity(item)">
                            <!-- <div v-if="index==0">{{item.enName.substr(0,1)}}</div> -->
                            <!-- <div v-if="index>0 && item.enName.substr(0,1) != areaMap[area][index-1].enName.substr(0,1)">{{item.enName.substr(0,1)}}</div> -->
                            <div class="city"> {{item.cityNameCh}}</div>
                            
                        </li>  
                    </ul>
                </section>
            </section>

            <!-- <div class="form_title" v-if="cityList['直辖市']">直辖市</div>
            <section id="hot_city_container" v-if="cityList['直辖市']">
                <ul class="citylistul clear">
                    <li v-for="item in cityList['直辖市']" :key="item.id" @click="setCity(item)">
                        {{item.cityName}}
                    </li>  
                </ul>
            </section>

            <div class="form_title" v-if="cityList['港澳台']">港澳台</div>
            <section id="hot_city_container" v-if="cityList['港澳台']">
                <ul class="citylistul clear">
                    <li v-for="item in cityList['港澳台']" :key="item.id" @click="setCity(item)">
                        {{item.cityName}}
                    </li>
                    <li v-if="cityList['港澳台'].length ==11">
                        更多...
                    </li>
                </ul>
            </section>

            <section v-for="group in inChina" v-if="group != '直辖市' && group != '港澳台'">
                
                <div class="form_title">{{group}}</div>
                <section id="hot_city_container">
                    <ul class="citylistul clear">
                        <li v-for="item in cityList[group]" :key="item.id" @click="setCity(item)">
                            {{item.cityName}}
                        </li> 
                        <li v-if="cityList[group].length ==11">
                            更多...
                        </li> 
                    </ul>
                </section>
            </section> -->
            <!-- <section class="group_city_container">
                <ul class="letter_classify">
                    <li v-for="(value, key, index) in sortgroupcity" :key="key"  class="letter_classify_li">
                        <h4 class="city_title">{{key}}
                            <span v-if="index == 0">（按字母排序）</span>
                        </h4>
                        <ul class="groupcity_name_container citylistul clear">
                            <router-link  tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id" class="ellipsis">
                                {{item.name}}

                            </router-link>  
                        </ul>
                    </li>
                </ul>
            </section> -->
        </section>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import {cityGuess, hotcity, groupcity} from '../../service/getData'
import {getStore, setStore, removeStore} from 'src/config/mUtils'

export default {
    data(){
        return{
            city: '',
            hotcity: [],     //热门城市列表
            areaList:[],
            areaMap:{},
            guesscity:{},
            groupcity: {},   //所有城市列表
            inChina:[],
            outChina:[],
            cityList:[]
        }
    },

	mounted(){

        if(getStore('user') == undefined){
            this.$router.push('/');
        }
        this.user = JSON.parse(getStore('user'));

        // 获取当前城市
        // cityGuess().then(res => {
        //     this.guessCity = res.name;
        //     this.guessCityid = res.id;
        // })

        let _this = this;
        //获取热门城市
        hotcity().then(res => {
            this.hotcity = res.cityInfoList;
            this.guesscity = res.cityInfoList[0];

            this.hotcity.map(item=>{
                if( _this.areaList.indexOf(item.areaName) == -1 ){
                    _this.areaList.push(item.areaName);
                    _this.areaMap[item.areaName] = new Array();
                }
                _this.areaMap[item.areaName].push(item);
                return item;
            })

            console.log(_this.areaMap);
            console.log(_this.areaList);
        })

        // groupcity().then(res => {
        //     this.inChina = res.inChina;
        //     this.outCina = res.outCina;
        //     this.cityList = res.cityList;
        // });

        if(getStore('city')) {
            this.city = JSON.parse(getStore('city'));
        }else{
            this.$router.push({path:'/home'});
        };

        //获取所有城市
        // groupcity().then(res => {
        //     this.groupcity = res;
        // })
    },

    components:{
        headTop
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

    .description_header{
        position: fixed;
        top:0;
        z-index: 10;
        background-color: rgba(255,255,255,1);
        padding: 0.8rem 0.1rem 0.6rem 0.8rem;
        width: 100%;
        overflow: hidden;
        .header_city{
            float:right;
            padding:.3rem .8rem .3rem .4rem;
            @include sc(0.65rem, #1184e8);
        }
        .description_top{
            display: flex;
            margin-top:.7rem;
            margin-right:.7rem;
            &.active{
                margin-right:0rem;
                .button_style{
                    display: block;
                }
            }
            .button_style{
                display: none;
                padding:.3rem .8rem .3rem .6rem;
                @include sc(0.65rem, #1184e8);
                line-height: 1.3rem;
            }
            .city_input{
                flex:1;
                /*border: 1px solid $bc;*/
                padding: 0.3rem 0.3rem 0.3rem 1.4rem;
                background:#f2f5f7;
                line-height: 1.4rem;
                -webkit-appearance: none!important;
                @include sc(0.65rem, #333);
            }
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
                display: inline-block;
                line-height: 1.1rem;
                float:right;
                padding: 0rem .4rem 0rem .8rem;
                /*@include bis('../../images/vip.jpg');*/
                /*background-size: 34px auto;
                background-position: 68px center;*/

                /*border-radius: 6px;
                border:1px solid rgba(0,0,0,0.5);
                border-width:0 0 0.025rem 0;*/
                span{
                    @include sc(.6rem, #0f83e7);
                    display: inline-block;
                    vertical-align:middle;
                }
                .icon_style{
                    width: .5rem;
                    height:.5rem;
                    font-size:0.5rem;
                    color:#0f83e7;
                    display: inline-block;
                    vertical-align:middle;
                    use{
                        fill:#0f83e7;
                    }
                }
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
    .main_container{
        padding-top:4.8rem;
    }
    .city_nav{
        /*padding-top: 2.35rem;*/
        border-top: 1px solid $bc;
        background-color: #fff;
        .city_tip{
            @include fj;
            line-height: 1.45rem;
            padding: 0 0.45rem;
            span:nth-of-type(1){
                @include sc(0.55rem, #666);
            }
            span:nth-of-type(2){
                font-weight: 900;
                @include sc(0.475rem, #9f9f9f);
            }

        }
        .guess_city{
            @include fj;
            align-items: center;
            height: 1.8rem;
            padding: 0 0.45rem;
            @include font(0.75rem, 1.8rem);
            span:nth-of-type(1){
                color: $blue;
            }
            .arrow_right{
                @include wh(.6rem, .6rem);
                fill: #999;
            }
        }
    }
    .form_title{
        line-height: 1.4rem;
        @include sc(0.65rem, #333);
        text-align: center;
        background:#f2f2f2;
    }
    .city_form{
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        @include wh(100%, 1.95rem);
        background-color: #fff;
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        display: flex;
        align-items: center;
        justify-content: center;
        @include sc(0.65rem, #333);
        .arrow_down{
            @include wh(.4rem, .4rem);
            transform:scaleY(-1);
        }
        .button_style{

            margin: 0.4rem ;
        }
        .input_style{
            border-radius: 0.1rem;
            margin: 0.4rem 0;
            @include wh(100%, 1.36rem);
        }
        .city_input{
            flex:1;
            border: 1px solid $bc;
            padding: 0 0.3rem;
            background:#eeeeee;
            @include sc(0.65rem, #777);
            line-height: 1.3rem;
            -webkit-appearance: none!important;
        }
        .city_submit{
            background-color: $blue;
            @include sc(0.65rem, #fff);
        }
    }
    #hot_city_container{
        background-color: #fff;
        width:100%;
    }
    .group_city_container{
        width:100%;
    }
    .citylistul{
        li{

        }
        .city{
            /*float: left;*/
            text-align: left;
            color: #8a8d96;
            border-bottom: 0.025rem solid #f2f4f8;
            /*border-right: 0.025rem solid $bc;*/
            @include wh(auto, 2rem);
            @include font(0.6rem, 2rem);
            margin-left:1rem;
            margin-right:1rem;
        }
        /*li:nth-of-type(3n){
            border-right: none;
        }*/
    }
    .city_title{
        color: #666;
        font-weight: 400;
        text-indent: 0.45rem;
        border-top: 2px solid $bc;
        border-bottom: 1px solid $bc;
        @include font(0.55rem, 1.45rem, "Helvetica Neue");
        span{
            @include sc(0.475rem, #999);
        }
    }
    
    .letter_classify_li{
        margin-bottom: 0.4rem;
        background-color: #fff;
        border-bottom: 1px solid $bc;
        .groupcity_name_container{
            li{
                color: #666;
            }
        }
    }

</style>
