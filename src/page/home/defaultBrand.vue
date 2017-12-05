<template>
<section class="shop_container main_container bg-gray">
            <section class="description_header">
                <div>设置默认品牌</div>
                <div class="description_top">
                    <section class="description_right">
                        <h4 class="description_title ellipsis">首页默认品牌门店信息</h4>
                    </section>
                    <!-- <section class="description_more">
                        <span class="shop_detail_vip" @click="eventDefault()">
                            <span>设置默认品牌</span>        
                            <svg class="icon_style">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#add"></use>
                            </svg>                    
                        </span>
                    </section> -->
                </div>
            </section>
            <ul class="search_list">
                <!-- <li>
                    <span class="store_name" @click="selectSearchResult(storeListOrigin)">
                        全部 ({{storeListOrigin.length}}家门店)
                    </span>
                </li> -->
                <li :class="{ active: name == defaultBrand}"  v-for="(name,index) in branchName" :key="index" @click="setDefaultBrand(branchList[name])">
                    <div class="store_name">
                        <img :src="branchList[name][0].pciUrl"/>
                        <b>{{name}}</b> 
                        <span>共{{branchList[name].length}}家门店</span>
                        <span class="brand_default_button">设为默认</span>
                    </div>
                    <!-- <span class="store_address" v-if="branchList[name].length > 1">{{branchList[name][0].branchName}} 等</span>
                    <span class="store_address" v-else>{{branchList[name][0].branchName?branchList[name][0].branchName:branchList[name][0].name}}</span> -->
                </li>
                <li  v-for="(store,index) in storeList" :key="index" @click="selectSearchResult([store],index)" v-if="storeList.length < storeListOrigin.length">
                    <span class="store_name">{{store.storeName}} {{store.branchName}}</span>
                    <span class="store_address">{{store.address}}</span>
                </li>
            </ul>
            <div class="set_brand_default_button" @click="saveDefaultBrand()">确认</div>
       </section>
</template>

<script>
	import headTop from 'src/components/header/head'
    import {mapState} from 'vuex'
    import {getImgPath} from 'src/components/common/mixin'
    import {imgBaseUrl} from 'src/config/env'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import {getSubscribeList} from 'src/service/getData'

    export default {
    	data(){
            return{
                currentBrand:'',
                defaultBrand:'',
                selectedIndex:0,
                storeList:[],
                storeListOrigin:[],
                branchName:[],
                branchList:[],
                licenseImg: null,
                showlicenseImg: false,
                imgBaseUrl
            }
        },
        mounted(){
        	this.initData();
        },
        computed: {
            ...mapState([
                'shopDetail'
            ]),
        },
        components: {
        	headTop,
        },
        mixins:[getImgPath],
        methods: {
            async initData(){
                console.log([new Date().getFullYear(),new Date().getMonth(),new Date().getDate()]);

                if(getStore('user') == undefined){
                    this.$router.push('/');
                }
                this.user = JSON.parse(getStore('user'));

                if(getStore('currentBrand') != undefined){
                    this.currentBrand = getStore('currentBrand');
                }

                if(getStore('defaultBrand') != undefined){
                    this.defaultBrand = getStore('defaultBrand');
                }

                let _this = this;
                let response = await getSubscribeList(this.user.openId);
                if(response.status == 0){

                    
                    this.storeList = response.subscribeList.content;
                    this.storeListOrigin = response.subscribeList.content;
                    this.storeListOrigin.map(item=>{
                        if(!_this.branchList[item.storeName]){
                            _this.branchList[item.storeName]=[];
                        }
                        _this.branchList[item.storeName].push(item);
                        return item;
                    })
                    this.branchName = Object.keys(this.branchList);

                    if(this.currentBrand == ''){
                        setStore('currentBrand',this.branchName[0]);
                        this.currentBrand = this.branchName[0];
                    }
                    // this.extra = response.extra;
                }
            },
            selectSearchResult(data,index){
                this.selectedIndex = index;
                // setStore('defaultBrand',this.branchName[index]);
                // setStore('currentBrand',this.branchName[index]);
                // this.gotoAddress('/analytics');

            },
            setDefaultBrand(data){

                this.defaultBrand = data[0].storeName;
                
            },
            saveDefaultBrand(){
                setStore('defaultBrand',this.defaultBrand);
                this.$router.go(-1);
            },
            gotoAddress(path){
                console.log(path);

                this.$router.push(path);
            },
            showLicenseImg(img){
                this.licenseImg = img;
                this.showlicenseImg = true;
            },
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

    .shop_container{
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        left: 0;
        background:#eef3fa;
        
        .set_brand_default_button{
            position: fixed;
            left:10%;
            bottom:.6rem;
            @include wh(80%, 2rem);
            @include sc(.65rem, #fff);
            padding: .6rem .6rem;
            background-color:rgba(255,198,4,1);
            margin:0 auto 1rem;
            text-align: center;
            border-radius: 1rem;
        }
        .search_list{
            background-color: #fff;
            /*border-radius: .7rem;
            border-top-left-radius:0;
            border-top-right-radius:0;*/
            padding-top: 4rem;
            padding-bottom: 4rem;
            width:100%;
            min-height:100%;
            overflow: scroll;

            li{
                min-height: 49px;
                text-align: left;
                padding-left:.4rem;
                padding: .8rem 0.4rem;
                border-bottom: 0.02rem solid #F2F5F7;
                display: flex;
                flex-direction: column;
                justify-content: center;
                @include sc(0.5rem, #666);
                background-color: #FFFFFF;
                
                .store_name{
                    display:block;
                    vertical-align:middle;
                    margin-left: .4rem;
                    line-height: 1rem;
                    img{
                        @include wh(2rem, 2rem);
                        vertical-align:middle;
                        margin-right:.3rem;
                    }
                    b{
                        font-size:.7rem;
                        vertical-align:middle;
                    }
                    span{
                        font-size:.6rem;
                        color:#aaa;
                        vertical-align:middle;
                        margin:0 .2rem;
                    }
                    .brand_default{
                        background-color: rgba(255,218,0,1);
                        color:#fff;
                        padding:.1rem .2rem;
                        display: none;
                    }
                    .brand_default_button{
                        float:right;
                        padding-top:.5rem;
                        color:#007BE6;
                        display: none;
                    }
                    .brand_select{
                        float:right;
                        padding-top:.5rem;
                    }
                    
                }

                &.active{
                    background-color: #FAFDFF;
                    .brand_default{
                        display: inline-block;
                    }
                    .brand_default_button{
                        display: inline-block;
                    }
                }
                /*&::before{
                    text-align: center;
                    vertical-align:middle;
                    display:inline-block;
                    border-radius: 1.2rem;
                    @include wh(1.2rem, 1.2rem);
                    line-height: 1.2rem;
                    content:' ';
                    background-color:#e5e5e5;
                    color:#fff;
                    margin-right:.2rem;
                }
                &.green{
                    &::before{
                        content:'高';
                    }
                    &.active{
                        &::before{
                            background-color: #ff6d41;
                        }
                        span{
                            color: #ff6d41;
                        }
                    }
                }
                &.yellow{
                    &::before{
                        content:'中';
                    }
                    &.active{
                        &::before{
                            background-color: #ffd819;
                        }
                        span{
                            color: #ffd819;
                        }
                    }
                }
                &.red{
                    &::before{
                        content:'低';
                    }
                    &.active{
                        &::before{
                            background-color: #66d8b4;
                        }
                        span{
                            color: #66d8b4;
                        }
                    }
                }*/
            }
        }
    }
</style>
