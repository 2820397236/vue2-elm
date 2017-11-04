<template>
  	<div class="city_container">
        
        <section class="description_header">
            <div>
                <span>订阅更多</span>
                <router-link class="header_city" :to="{path:'/home'}" tag="span">
                    <svg width="10px" height="14px" viewBox="0 0 10 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="订阅" transform="translate(-311.000000, -86.000000)" fill="#007BE6">
                                <g id="Group-3" transform="translate(311.000000, 83.000000)">
                                    <path d="M6.57470729,15.6197674 C6.34022724,15.9456103 5.65784475,16.9935084 5,16.9999685 C4.32404953,17.0066064 3.6723327,15.9628596 3.43234287,15.6295617 C1.14411429,12.4516694 0,10.4610812 0,8.59254939 C0,5.20970967 2.23857625,3 5,3 C7.76142375,3 10,5.20970967 10,8.59254939 C10,10.4591612 8.85823576,12.4464847 6.57470729,15.6197674 Z M5,10.0838959 C6.1045695,10.0838959 7,9.17773354 7,8.05992563 C7,6.94211773 6.1045695,6.03595538 5,6.03595538 C3.8954305,6.03595538 3,6.94211773 3,8.05992563 C3,9.17773354 3.8954305,10.0838959 5,10.0838959 Z" id="Combined-Shape"></path>
                                </g>
                            </g>
                        </g>
                    </svg>

                    {{city?city.cityNameCh:"上海"}}
                </router-link>
            </div>
            <div class="description_top">
                <input type="text" name="city" ref="searchInput" placeholder="请输入要搜索订阅的门店名称" @keyup.enter="inputSearch(inputVaule)"
            class="city_input input_style" v-model='inputVaule'  v-focus>
                <span class="button_style"  @click="clickSearch(inputVaule)">搜索</span>
            </div>
        </section>
        <!-- <form class="city_form" v-on:submit.prevent>
            <div class="head_back_left button_style" @click="clickSearch(inputVaule)" >搜索</div>
            <input type="text" name="city" ref="searchInput" placeholder="请输入要搜索订阅的门店名称" @keyup.enter="inputSearch(inputVaule)"
            class="city_input input_style" v-model='inputVaule' >
            
            <router-link to="/home" slot="changecity" class="change_city_right button_style">
                <svg class="arrow_down" data-name="arrow_down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
                    <path class="cls-1" d="M8,2.33l-4,4-4-4Z"/>
                </svg>
            </router-link>

            <span>{{city?city.cityName:"上海"}}</span>
            
        </form> -->
        <!-- <header class="pois_search_history" v-if="selectStores.length > 0">共{{total | currency('', 0)}}条</header> -->
        <ul class="getpois_ul">
            <!-- <li v-for="(item, index) in stores" @click='nextpage(index, item.geohash)' :key="index"> -->
            <li v-for="(item, index) in stores" :key="index" @click='active(item,index)'  >
                <a class="add_icon">
                    <svg @touchstart="" :class="{active: selectStores.indexOf(item.id) > -1}" >
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select" v-if="shopIds.indexOf(item.id) == -1"></use>
                    </svg>
                </a>
                <img :src="item.defaultPic">
                <div class="pois_detail">
                    <h4 class="store_name ellipsis">
                        <span>{{item.name}} {{item.branchName}}</span>
                        <!-- <span class="store_status green" v-if="item.status==0">营业</span> -->
                        <span class="store_status red" v-if="item.status!=0">停业</span>
                        <span class="store_status" v-if="shopIds.indexOf(item.id) != -1" style="float:right">已订阅</span>
                    </h4>
                    <p class="pois_address ellipsis">
                    {{item.priceText}}&nbsp;&nbsp;{{item.regionName}}&nbsp;&nbsp;
                    </p>
                </div>
            </li>
        </ul>
        <footer v-if="historytitle&&stores.length" class="clear_all_history" @click="clearAll">清空所有</footer>
        <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
        <div class="button_container" v-if="selectStores.length > 0">
            <!-- <a class="button" v-if="selectStores.length > 0" >全选</a> -->
            <span> {{'已选: '+ selectStores.length + ' 家'}} </span>
            <a class="button"  @click='nextpage(2, selectStores)'>去订阅</a>
        </div>
        <loading v-show="showLoading"></loading>
        <foot-guide v-if="stores.length ==0"></foot-guide>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {currentcity, searchplace} from 'src/service/getData'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import loading from 'src/components/common/loading'
    import footGuide from '../../components/footer/footGuide'
    import debounce from 'debounce'
    export default {
    	data(){
            return{
                showLoading:false,
                inputVaule:'', // 搜索地址
                city:null,
                cityId:'', // 当前城市id
                cityname:'', // 当前城市名字
                stores:[], // 搜索城市列表
                selectStores:[],
                total:36705325,
                placeHistory:[], // 历史搜索记录
                historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
                placeNone: false, // 搜索无结果，显示提示信息
            }
        },

        mounted(){
            // this.cityid = this.$route.params.cityid;
            // //获取当前城市名字
            // currentcity(this.cityid).then(res => {
            //     this.cityname = res.name;
            // })
            this.initData();
            let _this = this;
            // setTimeout(function(){
            //     _this.$refs.searchInput.focus();
            // },500)
            
        },

        components:{
            loading,
            footGuide,

        },

        directives: {
          focus: {
            // 指令的定义
            inserted: function (e) {

                function addHandler (el, type, handler) {
                    el.addEventListener(type, handler, false)
                }

                addHandler(e, 'focus', (e) => {
                    console.log(e.target.parentElement.className);
                    e.target.parentElement.className = 'description_top  active';
                })

                // addHandler(e, 'blur', (e) => {
                //     console.log(e.target.parentElement.className);
                //     e.target.parentElement.className = 'description_top';
                // })
              
            }
          }
        },

        computed:{
            
        },

        methods:{
            ...mapMutations([
                // 'RECORD_ADDRESS','ADD_CART','REDUCE_CART','CLEAR_CART','RECORD_SHOPDETAIL'
            ]),

            initData(){
                //已订阅
                if(getStore('user') == undefined){
                    this.$router.push('/');
                }
                this.user = JSON.parse(getStore('user'));

                this.shopIds = JSON.parse(getStore('shopIds'));
                console.log(this.shopIds);

                //获取搜索历史记录
                if (getStore('placeHistory')) {
                    this.stores = JSON.parse(getStore('placeHistory'));
                }else{
                    this.stores = [];
                }

                if(getStore('city')) {
                    this.city = JSON.parse(getStore('city'));
                }else{
                    this.$router.push({path:'/home'});
                }
            },
            //发送搜索信息inputVaule
            // postpois(inputVaule){ 
            //     var _this = this;

            //     debounce(this.searchPlace(this.inputVaule),2000)
            // },

            postpois:debounce(function (keyword) {
              
            }, 1000),

            inputSearch(keyword,e){
                this.clickSearch(keyword);
                e.target.parentElement.className = 'description_top';
            },
            clickSearch(keyword){

                if (keyword && keyword != " ") {
                    let cityName  = this.city.cityNameCh;
                    this.searchStore(cityName,keyword);
                }
            },

            searchStore(cityName,keyword,i=0){
                
                this.startLoading();
                let _this = this;
                console.log(cityName,keyword,this.$route.params.cityid);
                searchplace(cityName,keyword,this.city.dpCityId).then(res => {
                        _this.inputVaule = '';  
                        if(res.status == -1){
                            setTimeout(()=>{
                                this.searchStore(cityName,keyword,++i);
                            },3000 );
                        }

                        this.stores = res.stores;
                        this.total = this.stores.length;
                        this.placeNone = res.pageSize * (res.pageNo+1) > res.total;
                        
                        if(i>=1) {
                            
                            this.stopLoading();
                            return;
                        }

                        if(res.stores.length == 0 || res.stores.length <5){
                            
                            setTimeout(()=>{
                                this.searchStore(cityName,keyword,++i);
                            },3000 );
                            
                        }else{

                            this.stopLoading();
                        }
                    })
            },

            // searchPlace(inputVaule){
            //     console.log("12:"+inputVaule);
            //     // if (inputVaule) {
            //     //     searchplace('上海',inputVaule).then(res => {
            //     //         console.log(res);
            //     //         if(res.status == -1){
            //     //             return;
            //     //         }
            //     //         this.stores = res.stores;
            //     //         // this.historytitle = false;
            //     //         this.placeNone = res.pageSize * (res.pageNo+1) > res.total;
            //     //     })
            //     // }
            // },
            /**
             * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
             * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
             */
            nextpage(index, ids){
                // console.log(index, geohash);
                // this.ADD_CART({shopid: 2, category_id:2, item_id:2, food_id:1, name:'西贝莜面村（上海宝乐汇店）', price:1, specs:""});
                
                this.$router.push({path:'/confirmOrder', query:{ids}});
                
            },
            active(item,index){

                if(this.shopIds.indexOf(item.id) != -1){
                    return;
                }

                if(this.selectStores.indexOf(item.id) == -1){
                    this.selectStores.push(item.id);
                }else{
                    this.selectStores.splice(this.selectStores.indexOf(item.id),1);
                }
                
                console.log(this.selectStores);
            },
            clearAll(){
                removeStore('placeHistory');
                this.initData();
            },
            startLoading(){
                this.showLoading = true;
            },
            stopLoading(){
                this.showLoading = false;
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
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
    .button_container{
        position: fixed;
        bottom:0;
        left:0;
        right:0;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        background-color:#fff;
        border-top: 0.025rem solid #d4dde7;
        span{
            flex:1;
            @include wh(40%, auto);
            @include sc(.7rem, #5f657e);
            padding: 0.6rem 0 .6rem 1rem;
        }
        .button{
            padding:.4rem 0;
            @include wh(40%, auto);
            @include sc(.7rem, #fff);
            text-align: center;
            padding: 0.6rem 0;
            box-shadow: 0px 3px 5px rgba(255,120,0,.5);

            &:first-child{
                margin-right:0rem;
            }
            background-color:#ffd101;
            &.orange{
                background-color:#ffd101;
            }
            &.red{
                background-color:#fc3c3f;
            }
        }
    }
    .city_container{
        
    }
    .change_city{
        right: 0.4rem;
        @include sc(0.6rem, #fff);
        @include ct;
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
            @include sc(0.65rem, #333);
            line-height: 1.4rem;
            -webkit-appearance: none!important;
        }
        .city_submit{
            background-color: $blue;
            @include sc(0.65rem, #fff);
        }
    }
    .pois_search_history{
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        padding-left: 0.5rem;
        @include font(0.475rem, 0.8rem);
    }
    .getpois_ul{
        padding-top:5rem;
        background-color: #fff;
        border-top: 1px solid $bc;
        overflow: hidden;
        li{
            margin: 0 auto;
            border-bottom: 1px solid $bc;
            display: flex;
            flex-direction:row;
            text-align: center;
            padding: .8rem 0;
            img{
                @include wh(2.2rem, 2.2rem);
                border-radius: .2rem;
            }
            .add_icon{
                padding: 0 .6rem;
                svg{
                    margin-top:.5rem;
                    width:.85rem;
                    height:.85rem;
                    fill: #ccc;
                    &.active{
                         fill:#0c81e7;
                    }
                }
                
            }
            .pois_detail{
                flex:1;
                display: flex;
                flex-direction:column;
                justify-content: center;
                text-align: start;
                .store_name{
                    width: 90%;
                    margin: 0 auto 0.35rem;
                    @include sc(0.7rem, #333);

                    span{
                        vertical-align:middle;
                    }
                   .store_status{
                        background-color: #ddd;
                        @include sc(.4rem, #fff);
                        padding: .1rem .2rem;
                        &.green{
                            background-color: #5ddb44;
                        }
                        &.red{
                            background-color: #fc3c3f;
                        }
                    }
                }
                .pois_address{
                    width: 90%;
                    margin: 0 auto 0;
                    @include sc(0.45rem, #999);
                }
            }
        }
    }
    .search_none_place{
        margin: 0 auto;
        @include font(0.65rem, 1.75rem);
        color: #333;
        background-color: #fff;
        text-indent: 0.5rem;
    }
    .clear_all_history{
        @include sc(0.7rem, #666);
        text-align: center;
        line-height: 2rem;
        background-color: #fff;
    }
    body{
        background-color: #fff!important;
    }

    @media (max-width: 320px) {
        .getpois_ul li .pois_detail .store_name .store_status{
            padding: 0rem .2rem .1rem;
        }
    }
</style>
