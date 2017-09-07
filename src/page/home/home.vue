<template>
  	<div>
        <!-- <head-top>
            <span slot='logo' class="head_logo"  @click="reload">ele.me</span>
        </head-top> -->
        <nav class="city_nav">
            <div class="guess_city" @click="setCity(guesscity)">
                <span>{{guesscity.cityName}}</span>
                <svg class="arrow_right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
            </div>  
        </nav>
        <form class="city_form" v-on:submit.prevent>
            <router-link to="/home" slot="changecity" class="change_city_right button_style">
                {{city?city.cityName:"上海"}}
            </router-link>
            <input type="search" name="city" placeholder="请输入要搜索订阅的门店名称" 
            class="city_input input_style" v-model='inputVaule'>
            
            <div class="head_back_left button_style" @click="clickSearch(inputVaule)">搜索</div>
        </form>

        <section class="">
            <section id="hot_city_container">
                
                <ul class="citylistul clear">
                    <li v-for="item in hotcity" :key="item.id" @click="setCity(item)">
                        {{item.cityName}}
                    </li>  
                </ul>
            </section>
            <section class="group_city_container">
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
            </section>
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
            hotcity: [],     //热门城市列表
            guesscity:{},
            groupcity: {},   //所有城市列表
        }
    },

	mounted(){
        // 获取当前城市
        // cityGuess().then(res => {
        //     this.guessCity = res.name;
        //     this.guessCityid = res.id;
        // })

        //获取热门城市
        hotcity().then(res => {
            this.hotcity = res.cities;
            this.guesscity = res.cities[0];
        })

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
            this.$router.push({path:'/city/'+city.id});
        }
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
    .city_nav{
        /*padding-top: 2.35rem;*/
        border-top: 1px solid $bc;
        background-color: #fff;
        margin-bottom: 0.4rem;
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
        .button_style{

            margin: 0.4rem ;
        }
        .input_style{
            border-radius: 0.1rem;
            margin: 0.4rem 0;
            @include wh(100%, 1.4rem);
        }
        .city_input{
            flex:1;
            border: 1px solid $bc;
            padding: 0 0.3rem;
            background:#eeeeee;
            @include sc(0.65rem, #333);
        }
        .city_submit{
            background-color: $blue;
            @include sc(0.65rem, #fff);
        }
    }
    #hot_city_container{
        background-color: #fff;
        margin-bottom: 0.4rem;
        width:30%;
    }
    .group_city_container{
        width:70%;
    }
    .citylistul{
        li{
            float: left;
            text-align: center;
            color: $blue;
            border-bottom: 0.025rem solid $bc;
            border-right: 0.025rem solid $bc;
            @include wh(100%, 2rem);
            @include font(0.6rem, 2rem);
        }
        /*li:nth-of-type(4n){
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
