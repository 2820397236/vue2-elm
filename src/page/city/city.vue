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
            <li v-for="(item, index) in stores" :key="index" @click='active(item,index)'  :class="{'gray':shopIds.indexOf(item.id) > -1 }">
                <a class="add_icon" v-if="shopIds.indexOf(item.id) == -1">
                    <svg v-if="selectStores.indexOf(item.id) == -1" 
                    width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="搜索结果" transform="translate(-12.000000, -203.000000)" stroke="#007BE6" stroke-width="2">
                                <rect id="Rectangle-Copy" x="13" y="204" width="14" height="14" rx="1"></rect>
                            </g>
                        </g>
                    </svg>
                    <svg v-if="selectStores.indexOf(item.id) > -1"
                    width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="搜索结果" transform="translate(-12.000000, -277.000000)" stroke="#007BE6" stroke-width="2">
                                <g id="Group-15" transform="translate(12.000000, 277.000000)">
                                    <rect id="Rectangle-Copy" x="1" y="1" width="14" height="14" rx="1"></rect>
                                    <path d="M6.94085676,9.79386573 L6.81259346,9.92212903 L6.79168542,9.96814022 L6.71951671,9.87808311 L5.41421356,8.57277997 L5.62634556,8.36064796 C5.54675322,8.44024031 5.44700322,8.48738939 5.3435288,8.50209521 L5.06066017,8.21922657 C5.14026802,8.29883442 5.18741996,8.39860778 5.202116,8.5021038 C5.09861998,8.48740775 4.99884663,8.44025581 4.91923878,8.36064796 L5.20210741,8.6435166 C5.18740159,8.74699101 5.14025251,8.84674101 5.06066017,8.92633336 L5.27279217,8.71420136 L6.68700573,10.1284149 L6.47487373,10.3405469 C6.55372469,10.261696 6.65346759,10.2139625 6.7577374,10.1991466 L6.78807804,10.2294872 L6.82337649,10.1941888 C6.88465291,10.1935984 6.94630621,10.2042508 7.00512489,10.2264993 L6.94945518,10.2014186 C6.96864753,10.2086822 6.98736554,10.2171118 7.0054885,10.226637 C7.00554892,10.2266599 7.00560934,10.2266829 7.00566975,10.2267058 C7.00571896,10.2267582 7.00577657,10.2267886 7.00583417,10.2268189 L7.00512489,10.2264993 Z M7.06151188,10.2519032 L7.00583417,10.2268189 C7.05016184,10.2501608 7.09092192,10.2800601 7.12634556,10.3154837 L6.91421356,10.1033517 L10.9033395,6.11422577 L11.1154715,6.32635777 C11.0358792,6.24676543 10.9887301,6.14701543 10.9740243,6.04354101 L11.2568929,5.76067238 C11.177285,5.84028022 11.0775117,5.88743217 10.9740157,5.90212821 C10.9887117,5.79863219 11.0358637,5.69885883 11.1154715,5.61925099 L10.8326029,5.90211962 C10.7291285,5.8874138 10.6293785,5.84026472 10.5497861,5.76067238 L10.7619181,5.97280438 L6.81259346,9.92212903 L6.79168542,9.96814022 L6.71951671,9.87808311 L5.41421356,8.57277997 L5.62634556,8.36064796 C5.54675322,8.44024031 5.44700322,8.48738939 5.3435288,8.50209521 L5.06066017,8.21922657 C5.14026802,8.29883442 5.18741996,8.39860778 5.202116,8.5021038 C5.09861998,8.48740775 4.99884663,8.44025581 4.91923878,8.36064796 L5.20210741,8.6435166 C5.18740159,8.74699101 5.14025251,8.84674101 5.06066017,8.92633336 L5.27279217,8.71420136 L6.68700573,10.1284149 L6.47487373,10.3405469 C6.55372469,10.261696 6.65346759,10.2139625 6.7577374,10.1991466 L6.78807804,10.2294872 L6.82337649,10.1941888 Z M6.78807804,7.4010601 L7.49518482,8.10816688 L6.08097126,8.10816688 L6.78807804,7.4010601 Z" id="Combined-Shape"></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                </a>
                <a class="add_icon" v-else>
                    <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="搜索结果" transform="translate(-12.000000, -396.000000)">
                                <g id="Group-15" transform="translate(12.000000, 396.000000)">
                                    <rect id="Rectangle-Copy" fill="#C8D4E0" x="0" y="0" width="16" height="16" rx="1"></rect>
                                    <path d="M6.78807804,8.81527366 L10.5497861,5.0535656 C10.7450483,4.85830345 11.0616307,4.85830345 11.2568929,5.0535656 L11.8225783,5.61925099 L11.8225783,5.61925099 C12.0178404,5.81451313 12.0178404,6.13109562 11.8225783,6.32635777 L7.64796354,10.5009725 C7.60451373,10.5965902 7.54346695,10.6861673 7.46482321,10.764811 L7.18198052,11.0476537 C7.02321536,11.2064189 6.78424401,11.2360941 6.59549573,11.1366794 C6.53123483,11.1123592 6.47097784,11.0743295 6.41923878,11.0225905 L6.13639609,10.7397478 C6.08855556,10.6919073 6.04722684,10.6400208 6.01240993,10.5851899 L4.35355339,8.92633336 C4.15829124,8.73107121 4.15829124,8.41448872 4.35355339,8.21922657 L4.91923878,7.65354118 C5.11450093,7.45827904 5.43108342,7.45827904 5.62634556,7.65354118 L6.78807804,8.81527366 Z" id="Combined-Shape" fill="#FFFFFF"></path>
                                </g>
                            </g>
                        </g>
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
                shopIds:[],
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
            // let _this = this;
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
                // //已订阅
                if(getStore('user') == undefined){
                    // this.$router.push('/');
                }
                this.user = JSON.parse(getStore('user'));
                
                if(getStore('shopIds') == undefined){
                    setStore('shopIds','[]');
                }
                this.shopIds = JSON.parse(getStore('shopIds'));

                // //获取搜索历史记录
                // if (getStore('placeHistory')) {
                //     this.stores = JSON.parse(getStore('placeHistory'));
                // }else{
                //     this.stores = [];
                // }

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
                searchplace(cityName,keyword,this.city.id).then(res => {
                        // _this.inputVaule = '';  
                        if(res.status == -1){
                            this.stopLoading();
                            return;
                        }

                        this.stores = res.stores;
                        this.total = this.stores.length;
                        this.placeNone = res.pageSize * (res.pageNo+1) > res.total;
                        
                        if(i>=1) {
                            
                            this.stopLoading();
                            return;
                        }

                        if(res.stores.length == 0 || res.stores.length <5){
                            
                            let t = setTimeout(()=>{
                                this.searchStore(cityName,keyword,++i);
                                clearTimeout(t);
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
            &.gray{
                background-color: #f2f5f7;

            }
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
                        background-color: rgba(35,199,134,1);
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
