 <template>
    <div class="rating_page">
        <head-top head-title="订单支付" go-back='true'></head-top>
        <!-- <section class="show_time_amount">
        	<section>
                <header class="time_last">支付剩余时间</header>
                <p class="time">{{remaining}}</p>
                <footer class="order_detail" v-if="payDetail.resultData">
                    <span>详情</span>
                    <span>¥ {{cartPrice&&cartPrice.toFixed(2) || payDetail.resultData.orderInfo.orderAmount&&(payDetail.resultData.orderInfo.orderAmount/100).toFixed(2)}}</span>
                </footer>   
            </section>
        </section> -->
        <div class="pay_way">支付详情</div>
        <section class="pay_way_list">
            <section class="pay_item order_item">
                <div class="pay_icon_contaienr">
                    <span>门店数量</span>
                </div>
                <div class="order_item_text">{{storeIds.length}}</div>
            </section>
            <section class="pay_item order_item">
                <div class="pay_icon_contaienr">
                    <span>套餐时间</span>
                </div>
                <div class="order_item_text">
                    {{paymentName}}
                </div>
            </section>
            <section class="pay_item order_item">
                <div class="pay_icon_contaienr">
                    <span>支付日期</span>
                </div>
                <div class="order_item_text">
                    {{date}}
                </div>
            </section>
            <section class="pay_item order_item">
                <div class="pay_icon_contaienr">
                    <span>支付金额</span>
                </div>
                <div class="order_item_text">
                    ￥{{price}}元
                </div>
            </section>
        </section> 

        <div class="pay_way">选择支付方式</div>
        <section class="pay_way_list">
            <section class="pay_item"  @click="payWay = 1">
                <div class="pay_icon_contaienr">
                    <div class="zhifubao">
                        
                    </div>
                    <span>支付宝支付</span>
                </div>
                <svg class="choose_icon" :class="{choosed_way: payWay == 1}">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                </svg>
            </section>
            <section class="pay_item"  @click="payWay = 2">
                <div class="pay_icon_contaienr">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#weixin"></use>
                    </svg>
                    <span>微信支付</span>
                </div>
                <svg class="choose_icon" :class="{choosed_way: payWay == 2}">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                </svg>
            </section>
        </section>

        <p class="determine" @click="confrimPay">确认支付</p>
        <!-- <alert-tip v-if="showAlert" @closeTip="closeTipFun" :alertText="alertText"></alert-tip> -->
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import {mapState, mapMutations} from 'vuex'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import {addToCart} from 'src/service/getData'
    import alertTip from 'src/components/common/alertTip'

    export default {
      data(){
            return{
               	payDetail: false, //付款信息详情
                showAlert: false,
                alertText: null,
                payWay: 1, //付款方式
                countNum: 900, //倒计时15分钟
                gotoOrders: false, //去付款
                paymentId: 0,
                payments:[
                    {
                        id:0,
                        title:"连续包月",
                        subTitle:"自动续费，可随时取消",
                        rrpPrice:4,
                        price:2
                    },
                    {
                        id:1,
                        title:"1个月",
                        subTitle:"",
                        rrpPrice:4,
                        price:3
                    },
                    {
                        id:2,
                        title:"3个月",
                        subTitle:"",
                        rrpPrice:16,
                        price:8
                    }
                ]
            }
        },
        components: {
            headTop,
            alertTip,
        },
        created(){
            // //清除购物车中当前商铺的信息
            // if (this.shopid) {
            //     this.CLEAR_CART(this.shopid);
            // }
            

            Date.prototype.Format = function (fmt) { //author: meizz 
                var o = {
                    "M+": this.getMonth() + 1, //月份 
                    "d+": this.getDate(), //日 
                    "h+": this.getHours(), //小时 
                    "m+": this.getMinutes(), //分 
                    "s+": this.getSeconds(), //秒 
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                    "S": this.getMilliseconds() //毫秒 
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }

            this.date = new Date().Format("yyyy-MM-dd");
            this.storeIds = this.$route.query.ids.map(item => parseInt(item));
            this.paymentName = this.payments[this.$route.query.payment].title;
            this.price = this.payments[this.$route.query.payment].price * this.storeIds.length;

            // console.log(this.storeIds);
            this.initData();
        },
        mounted(){
            this.remainingTime();
        },
        beforeDestroy(){
            clearInterval(this.timer);
        },
        props:[],
        computed: {
            ...mapState([
                // 'orderMessage', 'userInfo', 'shopid', 'cartPrice'
            ]),
            //时间转换
            remaining: function (){
                let minute = parseInt(this.countNum/60);
                if (minute < 10) {
                    minute = '0' + minute;
                }
                let second = parseInt(this.countNum%60);
                if (second < 10) {
                    second = '0' + second;
                }
                return '00 : ' + minute + ' : ' + second;
            }
        },
        methods: {
            ...mapMutations([
                'CONFIRM_INVOICE', 'CLEAR_CART'
            ]),
            //初始化信息
            async initData(){
            	// this.payDetail = await payRequest(this.orderMessage.order_id, this.userInfo.user_id);
                
                if (this.payDetail.message) {
                    this.showAlert = true;
                    this.alertText = this.payDetail.message;
                    return
                }
            },
            //倒计时
            remainingTime(){
                clearInterval(this.timer);
                this.timer = setInterval(() => {
                    this.countNum --;
                    if (this.countNum == 0) {
                        clearInterval(this.timer);
                        this.showAlert = true;
                        this.alertText = '支付超时';
                    }
                }, 1000);
            },
            //确认付款
            async confrimPay(){
                let user = JSON.parse(getStore('user'));
                let response = await addToCart(user.id,this.storeIds);
                if(response.status == 0){
                    this.$router.push('/shop');
                }
                // console.log(response);
                
                // this.showAlert = false;
                // this.alertText = '当前环境无法支付，请打开官方APP进行付款';
                // this.gotoOrders = true;
            },
            //关闭提示框，跳转到订单列表页
            closeTipFun(){
                this.showAlert = false;
                
                // if(response.status == 0){
                //     this.$router.push('/shop?id=2');
                // }
            },
        }
    }
</script>
  
<style lang="scss" scoped>
    @import 'src/style/mixin';
  
    .rating_page{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 204;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .show_time_amount{
		background-color: #fff;
        padding: .7rem;
        text-align: center;
        .time_last{
            @include sc(.6rem, #666);
            margin-top: 1rem;
        }
        .time{
            @include sc(1.5rem, #333);
            margin: .3rem 0 1rem;
        }
        .order_detail{
            @include fj;
            span{
                @include sc(.65rem, #666);
            }
            span:nth-of-type(2){
                color: #ff6000;
                font-weight: bold;
            }
        }
    }
    .pay_way{
        background-color: #f1f1f1;
        padding: 0 .7rem;
        @include sc(.7rem, #666);
        line-height: 1.8rem;
    }
    .pay_way_list{
        background-color: #fff;
        
        .pay_item{
            &.order_item{
                padding: .2rem .7rem;
                line-height: 1.6rem;
                .order_item_text{
                    @include sc(.6rem, #666);
                }
            }
            padding: .4rem .7rem;
            @include fj;
            align-items: center;
            line-height: 2.6rem;
            border-bottom: 0.025rem solid #f5f5f5;
            .pay_icon_contaienr{
                @include fj;
                align-items: center;
                .zhifubao{
                    @include wh(1.4rem, 1.4rem);
                    background: url(../../../images/zhifubao.png) no-repeat;
                    background-size: 100% 100%;
                    margin-right: .4rem;
                }
                svg{
                    @include wh(1.4rem, 1.4rem);
                    margin-right: .4rem;
                }
                span{
                    @include sc(.7rem, #666);
                }
            }
            .choose_icon{
                @include wh(1rem, 1rem);
                fill: #ccc;
            }
            .choosed_way{
                fill: #fc3c3f;
            }
        }
    }
    .determine{
        background-color: #fc3c3f;
        @include sc(.7rem, #fff);
        text-align: center;
        margin: 0 .7rem;
        line-height: 1.8rem;
        border-radius: 0.2rem;
        margin-top: 0.5rem;
        font-weight: bold;
    }
    
</style>
