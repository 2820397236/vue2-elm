<template>
    <div>
        <header class="myhome_header" ref="shopheader">
            <!-- <img :src="imgBaseUrl + shopDetailData.image_path" class="header_cover_img"> -->
            <section class="description_header">
                <div>订单明细</div>
                <div class="description_top">
                   <!--  <section class="description_left" style="border-radius: 10rem;overflow: hidden;">
                        <img :src="user.profileImg" @click="signout">
                    </section> -->
                    <section class="description_right">
                        <h4 class="description_title ellipsis" v-if="orderList">您订阅了{{orderList.length}}家门店</h4>
                    </section>
                </div>
            </section>
        </header>   

        <section class="main_container">
            <section >
                <!-- <div class="form_title">xxxx</div> -->
                <section id="hot_city_container">
                    <ul class="citylistul clear" v-for="(item, index) in orderList" v-if="item.orderId == orderId">
                       
                        <li v-for="(store, i) in item.itemList">
                            <section class="store_detail_list">
                                <section class="store_img">
                                    <img :src="store.picUrl">
                                </section>

                                <section class="store_info">
                                    <h3 class="store_head">
                                        <span class="store_name ellipsis">
                                            <span>{{store.name}}</span>
                                            <!-- <span>({{store.branchName}})</span>  -->
                                            <!-- <span class="store_status green" v-if="store.status==0">营业</span>
                                            <span class="store_status red" v-if="store.status!=0">停业</span> -->
                                        </span>
                                    </h3>
                                    <p class="store_content ellipsis">
                                       {{store.branchName}}
                                    </p>
                                </section>
                            </section>
                        </li>
                         <li class="detail_item">订阅日期： {{item.createDate | dateTime}}</li>
                        <li class="detail_item">订阅信息： {{item.info}}</li>
                        <li class="detail_item">订单编号： {{item.orderId}}</li>
                        <li class="detail_item">价格： {{item.price / 100 | currency('￥')}}</li>
                        <li class="detail_item">订单状态： {{item.orderStatusType}}</li>
                    </ul>
                </section>
            </section>

        </section>

        <foot-guide></foot-guide>

        <loading v-show="showLoading"></loading>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import {getOrderList} from '../../service/getData'
import {getStore, setStore, removeStore} from 'src/config/mUtils'
import footGuide from '../../components/footer/footGuide'
import loading from 'src/components/common/loading'

export default {
    data(){
        return{
            user: null,
            orderId:null,
            orderList:[],
            showLoading:false
        }
    },

    mounted(){

        if(getStore('user') == undefined){
            this.$router.push('/');
        }

        this.orderId = this.$route.params.orderId;
        this.user = JSON.parse(getStore('user'));
        this.initData();
    },

    components: {
        loading,
        footGuide,
    },

    methods:{
        //初始化时获取基本数据
        async initData(){

            let res = await getOrderList(this.user.openId);
            this.orderList = res.orderList.content;
            this.orderList.map(o=>{
                o.itemList = JSON.parse(o.additionalInfo);
            })
        },
        reload(){
            window.location.reload();
        },

        goBack(){
            this.$router.go(-1);
        },
        gotoAddress(path){
            this.$router.push(path);
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
        padding-top: 4.2rem;
        padding-bottom: 1.8rem;
    }

    .description_header{
            position: fixed;
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
        border-bottom: .025rem solid #EBEFF3;
        li{
            @include wh(100%, auto);
            min-height:2.2rem;
            border-bottom: 0.025rem solid $bc;
            display: flex;
            align-items: center;

            span{
                display: inline-block;
                @include font(0.6rem, 1rem);
                color: #767D95;
                flex: 1;
            }
            a{
                @include font(0.6rem, 1rem);
                color: #007BE6;
                vertical-align: center;
                margin-right:.2rem;
            }
            svg{
                margin-top:.1rem;
                vertical-align: center;
            }

            &:last-child{
                border-bottom: none;
            }

            &.order_total{
                @include font(0.7rem, 1rem);
                text-align: right;
                border: none;
            }
            &.detail_item{
                @include font(0.65rem, 1rem);
                color: #575B69;
                border-bottom: none;
            }

            .store_detail_list{
                width:100%;
                background-color: #fff;
                padding: .6rem 0rem .6rem 0rem;
                display:flex;
                overflow: hidden;
                span{
                    font-size:.8rem;
                    color:#343640;
                }
                .store_right{

                    svg{
                        margin-top:24px;
                        @include wh(1rem, 1rem);
                        fill: #999;
                    }
                }
                .store_img{
                    display: block;
                    margin-right: .6rem;
                    img{
                        @include wh(2.5rem, 2.5rem);
                        display: block;
                        border:1px solid #ccc;
                        border-radius:.3rem;
                    }
                }
                .store_info{
                    width:50%;
                    flex:1;
                    .store_head{
                        @include fj;
                        margin-bottom: .3rem;
                        .store_name{
                            @include sc(.8rem, #4d4e57);
                            span{
                                font-weight: bold;
                                vertical-align:middle;
                            }
                            .store_status{
                                background-color: #fc3c3f;
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
                        .attributes_ul{
                            display: flex;
                            li{
                                font-size: .3rem;
                                height: .6rem;
                                line-height: .35rem;
                                padding: .1rem;
                                border: 1px solid #666;
                                border-radius: 0.3rem;
                                margin-right: .1rem;
                                transform: scale(.8);
                                p{
                                    white-space: nowrap;
                                }
                            }
                            .attribute_new{
                                position: absolute;
                                top: 0;
                                left: 0;
                                background-color: #4cd964;
                                @include wh(2rem, 2rem);
                                display: flex;
                                align-items: flex-end;
                                transform: rotate(-45deg) translate(-.1rem, -1.5rem);
                                border: none;
                                border-radius: 0;
                                p{
                                    @include sc(.4rem, #fff);
                                    text-align: center;
                                    flex: 1;
                                }
                            }
                        }
                    }
                    .store_content{
                        @include sc(.6rem, #969696);
                        line-height: 1.2rem;
                    }
                    .store_time{
                        line-height: .6rem;
                        span{
                            @include sc(.48rem, #d5d5d5);
                        }
                        .cancel{
                            background-color: #fc997a;
                            @include sc(.4rem, #fff);
                            padding:.1rem .3rem;
                            border-radius: .1rem;
                        }
                    }
                    .food_activity{
                        line-height: .4rem;
                        span{
                            font-size: .3rem;
                            border: 1px solid currentColor;
                            border-radius: 0.3rem;
                            padding: .08rem;
                            display: inline-block;
                            transform: scale(.8);
                            margin-left: -0.35rem;

                        }
                    }
                }

                .menu_detail_footer{
                    margin-left: 2.4rem;
                    font-size: 0;
                    margin-top: .3rem;
                    @include fj;
                    .food_price{
                        span{
                            font-family: 'Helvetica Neue',Tahoma,Arial;
                        }
                        span:nth-of-type(1){
                            @include sc(.5rem, #f60);
                            margin-right: .05rem;
                        }
                        span:nth-of-type(2){
                            @include sc(.7rem, #f60);
                            font-weight: bold;
                            margin-right: .3rem;
                        }
                        span:nth-of-type(3){
                            @include sc(.5rem, #666);
                        }
                    }
                }
            }

        }
        li:nth-of-type(3n){
            border-right: none;
        }
    }

</style>
