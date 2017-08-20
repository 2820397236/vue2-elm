 <template>
	<div>
        <header id='head_top'>
        <section class="head_goback" @click="$router.go(-1)">
            
            取消
        </section>
        <section class="title_head ellipsis">
            <span class="title_text" >{{storeName}}</span>
        </section>
        </header>
        <section class="shop_container main_container">
            <!-- <nav class="goback" @click="goback">
                <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:3"/>
                </svg>
            </nav> -->
            
           
            <section class="sort_container" >
                <div class="sort_item">
                    <div class="sort_item_container" @click="chooseType('shop')">
                        <div class="sort_item_border">
                            <span>按周排列</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg>
                        </div>
                    </div>
                     
                </div>
                <div class="sort_item" >
                    <div class="sort_item_container" @click="chooseType('shop')">
                        <div class="sort_item_border">
                            <span>全部地区</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="sort_item" >
                    <div class="sort_item_container" @click="chooseType('shop')">
                        <div class="sort_item_border">
                            <span>今天</span>
                            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                                <polygon points="0,3 10,3 5,8"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>
            <section class="shoplist_container">
                <ul v-if="rateList.length > 0">
                    <li v-for="(item,index) in rateList" :key="index">
                        <section class="menu_detail_list">
                            <div class="menu_detail_link">
                                <h3 class="rate_head">
                                    <section class="user_profile">
                                        <img :src="item.avatar">
                                        <div class="rate_username">{{item.username}} {{item.ratedAt}}<br/>
                                                <span class="rate_tag">口味好</span>
                                                <span class="rate_tag">环境很好</span>
                                                <span class="rate_tag">服务好</span>
                                         </div>
                                    </section>
                                </h3>
                                <section class="rate_desc">
                                    
                                    <p class="rate_content" v-html="item.ratingText"></p>
                                    <div class="rate_time">{{item.ratingTime}}</div>
                                </section>
                            </div>
                        </section>
                        
                    </li>

                </ul>
            </section>
            
        </section>
            
    </div>
</template>

<script>
	import headTop from 'src/components/header/head'
    import {mapState} from 'vuex'
    import {userHome,getUser,getStoreRate} from 'src/service/getData'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import {getImgPath} from 'src/components/common/mixin'
    import {imgBaseUrl} from 'src/config/env'

    export default {
    	data(){
            return{
               licenseImg: null,
               showlicenseImg: false,
               rateList:[],
               storeName:'',
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
            showLicenseImg(img){
                this.licenseImg = img;
                this.showlicenseImg = true;
            },
            async initData(){
                this.storeId = this.$route.query.storeId;
                this.storeName = this.$route.query.storeName;

                this.user = JSON.parse(getStore('user'));

                let response = await getStoreRate(this.user.id,this.storeId);

                if(response.status == 0){
                    if( response.rates.length ==0){
                        setTimeout(()=>{
                            this.initData();
                        },3000)
                    }

                    this.rateList = response.rates;
                }
            }
        }
    }
</script>
	
<style lang="scss" scoped>
    @import 'src/style/mixin';
    #head_top{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        @include wh(100%, 1.95rem);
        border-bottom:0.025rem solid #e5e5e5;
    }
    .head_goback{
        left: 0.4rem;
        @include wh(1.95rem, auto);
        @include sc(0.6rem, #666);
        line-height: 1.95rem;
        margin-left: .4rem;
    }
    .head_login{
        right: 0.55rem;
        @include sc(0.65rem, #666);
        @include ct;
        .login_span{
            color: #666;
        }
        .user_avatar{
            fill: #666;
            @include wh(.8rem, .8rem);
        }
    }
    .title_head{
        @include center;
        width: 50%;
        color: #fff;
        text-align: center;
        line-height: 0.8rem;
        .title_text{
            @include sc(0.8rem, #666);
            text-align: center;
            /*font-weight: bold;*/
        }
    }
	.main_container{
        padding-top:50px;
    }
	.shop_container{
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        left: 0;
        height: 100%;
    }
    .sort_container{
        background-color: #fff;
        border-bottom: 0.025rem solid #f1f1f1;
        right: 0;
        width: 100%;
        display: flex;
        z-index: 13;
        box-sizing: border-box;

        .sort_item{
            flex:1;
            margin:10px 10px 6px 15px;
            @include wh(40%, 1.6rem);
            
            text-align: center;
            line-height: 1rem;
            .sort_item_container{
                @include wh(100%, 100%);
                position: relative;
                z-index: 14;
                background-color: #fff;
                box-sizing: border-box;
                /*padding-top: .3rem;*/
                .sort_item_border{

                    @include sc(.5rem, #fff);
                    border: 0.025rem solid #e1e1e1;
                    padding: .2rem .4rem;
                    border-radius: 0.2rem;
                    line-height: 1rem;
                }
            }
            .sort_icon{
                vertical-align: middle;
                transition: all .3s;
                fill:#666;
            }
            
        }
        .choose_type{
            .sort_item_container{

                .category_title{
                    color: $blue;
                }
                .sort_icon{
                    transform: rotate(180deg);
                    fill:$blue;
                }
            }
        }
        .showlist-enter-active, .showlist-leave-active {
            transition: all .3s;
            transform: translateY(0);
        }
        .showlist-enter, .showlist-leave-active {
            opacity: 0;
            transform: translateY(-100%);
        }
        .sort_detail_type{
            width: 100%;
            position: absolute;
            display:flex;
            top: 1.6rem;
            left: 0;
            border-top: 0.025rem solid $bc;
            background-color: #fff;
        }
        .category_container{
            .category_left{
                flex: 1;
                background-color: #f1f1f1;
                height: 16rem;
                overflow-y: auto;
                span{
                    @include sc(0.5rem, #666);
                    line-height: 1.8rem;
                }
                .category_left_li{
                    @include fj;
                    padding:0 0.5rem;
                    .category_icon{
                        @include wh(.8rem, .8rem);
                        vertical-align: middle;
                        margin-right: .2rem;
                    }
                    .category_count{
                        background-color: #ccc;
                        @include sc(.4rem, #fff);
                        padding: 0 .1rem;
                        border: 0.025rem solid #ccc;
                        border-radius: 0.8rem;
                        vertical-align: middle;
                        margin-right: 0.25rem;
                    }
                    .category_arrow{
                        vertical-align: middle;
                    }
                }
                .category_active{
                    background-color: #fff;
                }
            }
            .category_right{
                flex: 1;
                background-color: #fff;
                padding-left: 0.5rem;
                height: 16rem;
                overflow-y: auto;
                .category_right_li{
                    @include fj;
                    height: 1.8rem;
                    line-height: 1.8rem;
                    padding-right: 0.5rem;
                    border-bottom: 0.025rem solid $bc;
                    span{
                        color: #666;
                    }
                }
                .category_right_choosed{
                    span{
                        color: $blue;
                    }
                }
            }
        }
        .sort_list_container{
            width: 100%;
            .sort_list_li{
                height: 2.5rem;
                display: flex;
                align-items: center;
                svg{
                    @include wh(0.7rem, 0.7rem);
                    margin:0 .3rem 0 .8rem;
                }
                p{
                    line-height: 2.5rem;
                    flex: auto;
                    text-align: left;
                    text-indent: 0.25rem;
                    border-bottom: 0.025rem solid $bc;
                    @include fj;
                    align-items: center;
                    span{
                        color: #666;
                    }
                }
                .sort_select{
                    span{
                        color: $blue;
                    }
                }
            }
        }
        .filter_container{
            flex-direction: column;
            align-items: flex-start;
            min-height: 10.6rem;
            background-color: #f1f1f1;
            .filter_header_style{
                @include sc(0.4rem, #333);
                line-height: 1.5rem;
                height: 1.5rem;
                text-align: left;
                padding-left: .5rem;
                background-color: #fff;
            }
            .filter_ul{
                display: flex;
                flex-wrap: wrap;
                padding: 0 0.5rem;
                background-color: #fff;
                .filter_li{
                    display: flex;
                    align-items: center;
                    border: 0.025rem solid #eee;
                    @include wh(4.7rem, 1.4rem);
                    margin-right: 0.25rem;
                    border-radius: 0.125rem;
                    padding: 0 0.25rem;
                    margin-bottom: 0.25rem;
                    svg{
                        @include wh(.8rem, .8rem);
                        margin-right: 0.125rem;
                    }
                    span{
                        @include sc(0.4rem, #333);
                    }
                    .filter_icon{
                        @include wh(.8rem, .8rem);
                        font-size: 0.5rem;
                        border: 0.025rem solid $bc;
                        border-radius: 0.15rem;
                        margin-right: 0.25rem;
                        line-height: .8rem;
                        text-align: center;
                    }
                    .activity_svg{
                        margin-right: .25rem;
                    }
                    .selected_filter{
                        color: $blue;
                    }
                }
            }
            .confirm_filter{
                display: flex;
                background-color: #f1f1f1;
                width: 100%;
                padding: .3rem .2rem;
                .filter_button_style{
                    @include wh(50%, 1.8rem);
                    font-size: 0.8rem;
                    line-height: 1.8rem;
                    border-radius: 0.2rem;
                }
                .clear_all{
                    background-color: #fff;
                    margin-right: .5rem;
                    border: 0.025rem solid #fff;
                }
                .confirm_select{
                    background-color: #56d176;
                    color: #fff;
                    border: 0.025rem solid #56d176;
                    span{
                        color: #fff;
                    }
                }
            }
        }
    }
    .shoplist_container{
        overflow-y: auto;
        flex:1;
        display: block;
        flex-direction:column;
        padding-bottom: 2rem;
        align-items: center;
        align-content:center;
        background-color:#fff;
        ul{
            width: 100%;
            overflow: hidden;
            .menu_detail_list{
                word-break: break-word;
                flex:1;
                background-color: #fff;
                padding: .6rem .4rem .6rem 1.2rem ;
                border-bottom: 1px solid #d7d7d7;
                position: relative;
                overflow: hidden;
                .menu_detail_link{
                    display:flex;
                    flex-direction:column;
                    .rate_head{
                        @include fj;
                        margin-bottom: .1rem;
                        .user_profile{
                            display:flex;
                            flex-direction:row;
                            margin-right: .4rem;

                            img{
                                border-radius: 2rem;
                                @include wh(2rem, 2rem);
                                display: block;
                            }
                            .rate_username{
                                @include sc(.6rem, #333);
                                margin-left:1rem;
                                .rate_tag{
                                    background-color:rgba(255,139,103,1);
                                    @include sc(.5rem, #fff);
                                    padding: .1rem;
                                }
                            }
                        }
                    }
                    .rate_desc{
                        width: 100%;
                        .rate_time{
                            @include sc(.6rem, #aaa);
                        }
                        .rate_content{
                            @include sc(.6rem, #666);
                            line-height: .8rem;
                            padding:0 1rem 0 0rem;
                            max-height: 3.2rem;
                            overflow: hidden;
                        }
                        
                    }
                }
            }
            .menu_detail_reply{
                display: flex;
                flex-direction:row;
                @include wh(100%, auto);
                @include sc(.7rem, #969696);
                li{
                    flex:1;
                    text-align: center;
                    line-height: 1rem;
                    margin: .5rem 0 .5rem 0;
                    border-right:0.025rem solid #e5e5e5;
                    &:last-child{
                        border-width:0;
                    };

                    .reply_count{
                        @include sc(.9rem, #969696);
                        line-height: 1.2rem;
                        &.green{
                            color:#88ce41;
                        }
                        &.yellow{
                            color:#ffd500;
                        }
                        &.red{
                            color:#fc3c3f;
                        }
                    }
                }
            }
        }
        
    }
</style>
