<template>
<section class="shop_container main_container bg-gray">
	<section class="description_header">
        <div>选择品牌</div>
        <div class="description_top">
            <section class="description_right">
                <h4 class="description_title ellipsis">展示相应品牌门店信息</h4>
            </section>
            <section class="description_more">
                <span class="shop_detail_vip" @click="gotoAddress('/defaultBrand')">
                    <span>设置默认品牌</span>        
                    <svg width="8px" height="12px" viewBox="0 0 8 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="箭头-左" transform="translate(-349.000000, -152.000000)" fill="#007BE6">
                                <path d="M354.929466,155.894975 L354.996555,155.082271 L354.996555,155.082271 C355.041992,154.531859 354.632629,154.048827 354.082217,154.00339 C354.054851,154.001131 354.027404,154 353.999945,154 L348,154 L348,154 C347.447715,154 347,154.447715 347,155 L347,155 L347,161 L347,161 C347,161.552285 347.447715,162 348,162 C348.027459,162 348.054906,161.998869 348.082272,161.99661 L348.894962,161.92952 L348.894962,156.894975 C348.894962,156.342691 349.342677,155.894975 349.894962,155.894975 L354.929466,155.894975 Z" id="disclosure-indicator" transform="translate(351.000000, 158.000000) rotate(-225.000000) translate(-351.000000, -158.000000) "></path>
                            </g>
                        </g>
                    </svg>                  
                </span>
            </section>
        </div>
    </section>

    <ul class="search_list">
        <li :class="{ active: name == defaultBrand }"  v-for="(name,index) in branchName" :key="index" @click="selectSearchResult(branchList[name],index)">
            <div class="store_name">
                <img :src="branchList[name][0].pciUrl"/>
                <b>{{name}}</b> 
                <span>共{{branchList[name].length}}家门店</span>
                <span class="brand_default">默认</span>
                <span v-if="name == currentBrand" class="brand_select">
                    <svg width="15px" height="11px" viewBox="0 0 15 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="选择品牌-" transform="translate(-342.000000, -196.000000)" fill="#007BE6">
                                <path d="M347.267767,203.267767 L354.096194,196.43934 C354.681981,195.853553 355.631728,195.853553 356.217514,196.43934 C356.803301,197.025126 356.803301,197.974874 356.217514,198.56066 L348.43934,206.338835 L348.43934,206.338835 C347.971408,206.806767 347.271233,206.90091 346.709851,206.621264 C346.440501,206.561628 346.184404,206.427045 345.974874,206.217514 L345.974874,206.217514 L342.43934,202.681981 C341.853553,202.096194 341.853553,201.146447 342.43934,200.56066 L342.43934,200.56066 C343.025126,199.974874 343.974874,199.974874 344.56066,200.56066 L344.56066,200.56066 L347.267767,203.267767 Z" id="Combined-Shape"></path>
                            </g>
                        </g>
                    </svg>
                </span>
            </div>
        </li>
    </ul>
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
                setStore('currentBrand',this.branchName[index]);
                this.gotoAddress('/analytics');

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
            padding-bottom: .4rem;
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
