 <template>
    <div style="width:100%;">
        <section class="head_tips">紫金池市场</section>
        <!-- <section class="head_brand"  @click="eventSearch()">
            <div class="head_brand_name"  v-if="storeList.length >0 && currentBrand !=''">
                <img class="head_brand_pic" :src="branchList[currentBrand][0].pciUrl" />
                <span>{{branchList[currentBrand][0].brand}}&nbsp;</span>
            </div>
            <div class="head_brand_name"  v-if="storeList.length >0 && defaultBrand != '' && currentBrand ==''">
                <img  v-if="selectedIndex == null" class="head_brand_pic" :src="branchList[defaultBrand][0].pciUrl" />
                <img  v-else class="head_brand_pic" :src="branchList[branchName[selectedIndex]][0].pciUrl" />

                <span v-if="selectedIndex == null">{{branchList[defaultBrand][0].brand}}&nbsp;</span>
                <span v-else>{{branchList[branchName[selectedIndex]][0].brand}}&nbsp;</span>
            </div>
            <div class="head_brand_button">
                选择其他品牌
                <svg width="8px" height="12px" viewBox="0 0 8 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="箭头-左" transform="translate(-349.000000, -152.000000)" fill="#007BE6">
                            <path d="M354.929466,155.894975 L354.996555,155.082271 L354.996555,155.082271 C355.041992,154.531859 354.632629,154.048827 354.082217,154.00339 C354.054851,154.001131 354.027404,154 353.999945,154 L348,154 L348,154 C347.447715,154 347,154.447715 347,155 L347,155 L347,161 L347,161 C347,161.552285 347.447715,162 348,162 C348.027459,162 348.054906,161.998869 348.082272,161.99661 L348.894962,161.92952 L348.894962,156.894975 C348.894962,156.342691 349.342677,155.894975 349.894962,155.894975 L354.929466,155.894975 Z" id="disclosure-indicator" transform="translate(351.000000, 158.000000) rotate(-225.000000) translate(-351.000000, -158.000000) "></path>
                        </g>
                    </g>
                </svg>
            </div>
        </section> -->
        
        <!-- <header id='head_top'>
            <section class="title_head ellipsis">
                <span class="title_text" >{{date | dateTime('YYYY年MM月DD日') }}</span>
            </section>
            <section class="head_login" @click="eventSearch()">
                <svg class="icon_style">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
                </svg>
            </section>
        </header> -->
       <section>
          <div class="plan_item">
            <div class="plan_prev" @click="changePlanPrev()"><</div>
            <div class="plan_next" @click="changePlanNext   ()">></div>

            <div class="plan_name">{{planList[planIndex].title}}</div>
            <div class="plan_subname">{{planList[planIndex].subtitle}}</div>
            <div class="plan_money">
                <span>￥{{planList[planIndex].min}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>送{{planList[planIndex].stock}}股</span>
            </div>
            <div class="plan_desc">{{planList[planIndex].desc}}</div>
          </div>


       </section>
        <section  class="shop_container main_container">
            
            <section class="chart_container">
                <IEcharts :option="bar" :height="100" theme="customer" @ready="onReady" @click="onClick"></IEcharts>
            </section>
            <section class="desc_form">
                <div class="desc_h2">优选计划</div>
                <div class="desc_content">
                    <div>
                        <div class="desc_title" style="color: #db666e;">{{planList[planIndex].rate}}%</div>
                        <div class="desc_subtitle">每日稀释股权</div>
                    </div>
                    <div>
                        <div class="desc_title">只涨不跌</div>
                        <div class="desc_subtitle">30天定期 收益更好</div>
                    </div>
                </div>
            </section>
            <!-- <section class="detail_container">
                <div class="search_submit"  v-if="storeIds.length > 1"  @click="gotoAddress({path:'/rateByShop',query:{ids:storeIds,date:dateFormat}})">
                    <svg class="icon_style">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#more"></use>
                    </svg>
                    <span>查看详情</span>
                </div>

                <div class="search_submit" v-else  @click="gotoAddress({'path': 'rate', 'query':{storeId:storeIds[0]}})">
                    <svg class="icon_style">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#more"></use>
                    </svg>
                    <span>查看详情</span>
                </div>
            </section> -->

           <!--  <section class="reply_container" v-if="tabType=='dp'">
               <div class="reply_item">
                   <div class="reply_item_border">
                        <section>
                            <div class="reply_progress">
                                <div class="reply_progress green" :style="{ width: rateCount[0].high/rateCount[0].amount * 100+ '%'}">
                                    <span v-if=" rateCount[0].high / rateCount[0].amount * 100  > 20">{{ (rateCount[0].high/rateCount[0].amount * 100 ).toFixed(1) }}%</span>
                                    <span v-else>{{ (rateCount[0].high/rateCount[0].amount * 100 ).toFixed(1) }}%</span>
                                </div>
                            </div> 
                            <div class="reply_view_button" @click="gotoAddress({path:'/rateByType','query':
                            {storeId:storeIds,rateType:'high',source:0,s:startDate.getTime(),e:endDate.getTime()}})">
                                查看
                            </div>
                        </section>
                        <div class="reply_item_count green">好评数量： {{rateCount[0].high}}条</div>
                    </div>
               </div>
               <div class="reply_item">
                   <div class="reply_item_border">
                        <section>
                            <div class="reply_progress">
                                <div class="reply_progress yellow" :style="{ width: rateCount[0].mid/rateCount[0].amount * 100 + '%'}">
                                    <span v-if=" rateCount[0].mid / rateCount[0].amount * 100  > 20">{{ ( rateCount[0].mid / rateCount[0].amount * 100 ).toFixed(1) }}%</span>
                                    <span v-else style="color:#767D95">{{ ( rateCount[0].mid / rateCount[0].amount * 100 ).toFixed(1) }}%</span>
                                </div>
                            </div>
                            <div class="reply_view_button" @click="gotoAddress({path:'/rateByType','query':
                            {storeId:storeIds,rateType:'mid',source:0,s:startDate.getTime(),e:endDate.getTime()}})">
                                查看
                            </div>
                        </section>
                        <div class="reply_item_count yellow">中评数量： {{rateCount[0].mid}}条</div>
                    </div>
                    
               </div>
               <div class="reply_item">
                   <div class="reply_item_border">
                        <section>
                            <div class="reply_progress">
                                <div class="reply_progress red" :style="{ width: rateCount[0].low/rateCount[0].amount * 100+ '%'}">
                                   <span v-if=" rateCount[0].low / rateCount[0].amount * 100  > 20">{{ (rateCount[0].low / rateCount[0].amount * 100 ).toFixed(1) }}%</span>
                                   <span v-else style="color:#767D95">{{ ( rateCount[0].low / rateCount[0].amount * 100 ).toFixed(1) }}%</span>
                                </div>
                            </div>
                            <div class="reply_view_button" @click="gotoAddress({path:'/rateByType','query':
                            {storeId:storeIds,rateType:'low',source:0,s:startDate.getTime(),e:endDate.getTime()}})">
                                查看
                            </div>
                        </section>
                        <div class="reply_item_count">差评数量： {{rateCount[0].low}}条</div>
                   </div>
               </div>
            </section>

            <section class="reply_container" v-if="tabType=='ele'">
               <div class="reply_item">
                   <div class="reply_item_border">
                        <section>
                            <div class="reply_progress">
                                <div class="reply_progress green" :style="{ width: rateCount[1].high/rateCount[1].amount * 100 + '%'}">
                                    <span v-if=" rateCount[1].high / rateCount[1].amount * 100  > 20">{{ (rateCount[1].high/rateCount[1].amount * 100 ).toFixed(1) }}%</span>
                                    <span v-else style="color:#767D95">{{ ( rateCount[1].high / rateCount[1].amount * 100 ).toFixed(1) }}%</span>
                                </div>
                            </div> 
                            <div class="reply_view_button" @click="gotoAddress({path:'/rateByType','query':
                            {storeId:storeIds,rateType:'high',source:1,s:startDate.getTime(),e:endDate.getTime()}})">
                                查看
                            </div>
                        </section>
                        <div class="reply_item_count green">好评数量： {{rateCount[1].high}}条</div>
                    </div>
               </div>
               <div class="reply_item">
                   <div class="reply_item_border">
                        <section>
                            <div class="reply_progress">
                                <div class="reply_progress yellow" :style="{ width: rateCount[1].mid/rateCount[1].amount * 100 + '%'}">
                                    <span v-if=" rateCount[1].mid / rateCount[1].amount * 100  > 20">{{ ( rateCount[1].mid / rateCount[1].amount * 100 ).toFixed(1) }}%</span>
                                    <span v-else style="color:#767D95">{{ ( rateCount[1].mid / rateCount[1].amount * 100 ).toFixed(1) }}%</span>
                                </div>
                            </div>
                            <div class="reply_view_button" @click="gotoAddress({path:'/rateByType','query':
                            {storeId:storeIds,rateType:'mid',source:1,s:startDate.getTime(),e:endDate.getTime()}})">
                                查看
                            </div>
                        </section>
                        <div class="reply_item_count yellow">中评数量： {{rateCount[1].mid}}条</div>
                    </div>
                    
               </div>
               <div class="reply_item">
                   <div class="reply_item_border">
                        <section>
                            <div class="reply_progress">
                                <div class="reply_progress red" :style="{ width: rateCount[1].low/rateCount[1].amount * 100+ '%'}">
                                   <span v-if=" rateCount[1].low / rateCount[1].amount * 100  > 20">{{ (rateCount[1].low / rateCount[1].amount * 100 ).toFixed(1) }}%</span>
                                   <span v-else style="color:#767D95">{{ ( rateCount[1].low / rateCount[1].amount * 100 ).toFixed(1) }}%</span>
                                </div>
                            </div>
                            <div class="reply_view_button" @click="gotoAddress({path:'/rateByType','query':
                            {storeId:storeIds,rateType:'low',source:1,s:startDate.getTime(),e:endDate.getTime()}})">
                                查看
                            </div>
                        </section>
                        <div class="reply_item_count">差评数量： {{rateCount[1].low}}条</div>
                   </div>
               </div>
            </section> -->
        </section>
        
        <button class="btn_buy">
            <div class="btn_flex draw" @click="alertSell(planIndex)">
            <i></i>挂单</div>
            <div class="btn_flex deposit"  @click="alert(planIndex)">
            <i></i>买入</div>
        </button> 
            
       <foot-guide></foot-guide>
       
        <!-- <section class="animation_opactiy shop_back_svg_container" v-if="showLoading">
           <img src="../../images/shop_back_svg.svg">
        </section> -->
        <!-- <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>

        <transition name="fade">
        <div class="bg-gray" v-if="calendar2.show">
            <div class="calendar-dialog">
                <calendar :range="calendar2.range" :lunar="calendar2.lunar" :value="calendar2.value" :begin="calendar2.begin" :end="calendar2.end" @select="calendar2.select"></calendar>
                <div class="calendar-button">
                    <span @click="cancelCalendar">取消</span>
                    <span @click="saveCalendar">确定</span>
                </div>
            </div>
        </div>
        </transition> -->
        
        <!-- <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="errorMsg"></alert-tip> -->
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
    import {mapState, mapMutations} from 'vuex'
    import {createOrder,getAnalyzeRate,getMyStore,getRateAnalytics,getStoreRate,getSubscribeList} from 'src/service/getData'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import headTop from '../../components/header/head'
    import alertTip from 'src/components/common/alertStore'
    // import alertConfirm from 'src/components/common/alertStore'
    import loading from 'src/components/common/loading'
    // import {loadMore} from 'src/components/common/mixin'
    // import BScroll from 'better-scroll'
    import footGuide from '../../components/footer/footGuide'
    import calendar from 'src/components/common/calendar.vue'

    import IEcharts from 'vue-echarts-v3/src/lite.vue'
    import echarts from 'vue-echarts-v3/node_modules/echarts/lib/echarts'
    import 'vue-echarts-v3/node_modules/echarts/lib/chart/line'
    import 'vue-echarts-v3/node_modules/echarts/lib/component/graphic'
    import 'vue-echarts-v3/node_modules/echarts/lib/component/dataZoom'
    import 'vue-echarts-v3/node_modules/echarts/lib/component/tooltip'
    import 'vue-echarts-v3/node_modules/echarts/lib/component/title'

    import debounce from 'debounce'
    import theme from './theme.json'
    IEcharts.registerTheme('customer', theme)

    export default {
        data(){
            return{
                calendar2:{
                    show:false,
                    range:true,
                    value:[[new Date().getFullYear(),0,1],[new Date().getFullYear(),new Date().getMonth(),new Date().getDate()]], //默认日期
                    // lunar:true, //显示农历
                    begin:[2017,0,1], //可选开始日期
                    end:[new Date().getFullYear(),new Date().getMonth(),new Date().getDate()], //可选结束日期
                    select:(begin,end)=>{

                        this.calendar2.value[0] = [begin[0],begin[1],begin[2]];
                        this.calendar2.value[1] = [end[0],end[1],end[2]];
                        console.log(1);
                        if(this.currentBrand != ''){
                            this.chartInit(this.branchList[this.currentBrand]);
                            // this.currentBrand = '';
                        } else if(this.defaultBrand != ''){
                            this.chartInit(this.branchList[this.defaultBrand]);
                        }
                    }
                },
                tabType:'dp',
                showLoading: true, //显示加载动画
                showSearch:false,
                showDefault:false,
                showAlert:false,
                defaultBrand:'',
                currentBrand:'',
                selectedIndex:null,
                storeListOrigin:[],
                storeList: [],
                storeIds: [],
                branchList:{},
                branchName:[],
                inputValue:'',
                chart:null,
                rateCount:[{
                    low:0,
                    mid:0,
                    high:0,
                    amount:0
                },{
                    low:0,
                    mid:0,
                    high:0,
                    amount:0
                }],
                startDate   : null,
                endDate     : null,
                originData:null,
                planIndex:0,
                planList:[
                    {
                        "title":"计划A",
                        "subtitle":"安稳投",
                        "desc":"起步低 收益稳定",
                        "min":5000,
                        "rate":0.12,
                        "stock":0
                    },
                    {
                        "title":"计划B",
                        "subtitle":"安稳投",
                        "desc":"收益稳定 赠送股权",
                        "min":10000,
                        "rate":0.15,
                        "stock":2300
                    },
                    {
                        "title":"计划C",
                        "subtitle":"安稳投",
                        "desc":"收益稳定 赠送股权",
                        "min":20000,
                        "rate":0.18,
                        "stock":4650
                    },
                    {
                        "title":"计划D",
                        "subtitle":"安稳投",
                        "desc":"收益稳定 赠送股权",
                        "min":30000,
                        "rate":0.22,
                        "stock":6900
                    },
                    {
                        "title":"计划E",
                        "subtitle":"安稳投",
                        "desc":"收益稳定 赠送股权",
                        "min":50000,
                        "rate":0.40,
                        "stock":11600
                    }
                ],
                bar: {
                    title: {
                        left: '4%',
                        top:'4%',
                        text: '每日涨幅'
                    },
                    toolbox: {
                        
                    },
                    grid: {
                        left: '10%',
                        right: '10%',
                        bottom: '30px',
                        top: '0%',
                    },
                    tooltip : {
                        show:true,
                        trigger: 'axis',
                        axisPointer: {
                            value: '8/30',
                            snap: false,
                            lineStyle: {
                                color: '#ffe983',
                                opacity: 1,
                                width: 2
                            },
                            label: {
                                show: true,
                                backgroundColor: '#ffe983'
                            },
                            handle: {
                                show: true,
                                color: '#004E52'
                            }
                        },

                        triggerOn:'click'
                    },
                    xAxis : [
                        {
                            position: 'bottom',
                            offset:4,
                            type : 'category',
                            boundaryGap : false,
                            splitLine: {
                                show: false
                            },
                             data: ['9/6', '9/7', '9/8', '9/9', '9/10', '9/11', '9/12', '9/13', '9/14', '9/15']
                        }
                    ],
                    yAxis : [
                        {
                            show : true,
                            axisLine :{
                                show : false
                            },
                            axisLabel:{
                                show : false
                            },
                            type : 'value',
                            max:5,

                        }
                    ],
                    dataZoom: [{
                        type: 'inside',
                        start: 0,
                        end: 50
                    }],
                    series : [
                        // {
                        //     type:'line',
                        //     name:'好评',
                        //     lineStyle:{normal:{color:'#6ea593'}},
                        //     data:[1,2,3,4,5,6,7],
                        //     areaStyle: {
                        //         normal: {
                        //             color: new echarts.graphic.LinearGradient(
                        //                 0, 0, 0, 1,
                        //                 [
                        //                     {offset: 0, color: '#6ea593'},
                        //                     {offset: 0.9, color: '#eafff1'},
                        //                     {offset: 1, color: '#fff'}
                        //                 ]
                        //             )
                        //         }
                        //     }
                        // },
                        // {
                        //     type:'line',
                        //     name:'中评',
                        //     lineStyle:{normal:{color:'#f8d555'}},
                        //     areaStyle: {
                        //         normal: {
                        //             color: new echarts.graphic.LinearGradient(
                        //                 0, 0, 0, 1,
                        //                 [
                        //                     {offset: 0, color: '#f8d555'},
                        //                     {offset: 0.9, color: '#fcf8dd'},
                        //                     {offset: 1, color: '#fff'}
                        //                 ]
                        //             )
                        //         }
                        //     },
                        // },
                        {
                            type:'line',
                            name:'收益',
                            lineStyle:{normal:{color:'#eda994'}},
                            data:[1.2,1.4,1.6,1.8,2.0,2.2,2.4,2.6,2.8,3.0],
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#eda994'},
                                            {offset: 0.9, color: '#ffe3e2'},
                                            {offset: 1, color: '#fff'}
                                        ]
                                    )
                                }
                            }
                        }
                    ]
                }
            }
        },
        created(){
            // this.geohash = this.$route.query.geohash;
            // this.shopId = this.$route.query.id;
        },
        mounted(){
            // let pie = this.$refs.chart;
            // pie.dispatchAction({
            //     type: 'showTip',
            //     x: 100,
            //     y: 100,
            // });

            this.initData();
            this.windowHeight = window.innerHeight;
            this.windowWidth = window.innerWidth;
        },
        beforeDestroy(){
            // this.foodScroll.removeEventListener('scroll', )
        },
        // mixins: [loadMore],
        components: {
            loading,
            headTop,
            footGuide,
            calendar,
            IEcharts,
            alertTip
        },
        computed: {
            ...mapState([
                
            ]),
            
        },
        methods: {
            ...mapMutations([
               
            ]),
            changePlanPrev(flag){
                this.planIndex --;
                if(this.planIndex < 0){
                    this.planIndex = this.planList.length -1;
                }else if(this.planIndex > this.planList.length -1){
                    this.planIndex =0;
                }
            },

             changePlanNext(flag){
               
                this.planIndex ++;
                if(this.planIndex < 0){
                    this.planIndex = this.planList.length -1;
                }else if(this.planIndex > this.planList.length -1){
                    this.planIndex =0;
                }
            },
            //初始化时获取基本数据
            async initData(){
                // console.log([new Date().getFullYear(),new Date().getMonth(),new Date().getDate()]);

                // if(getStore('user') == undefined){
                //     this.$router.push('/');
                // }
                // this.user = JSON.parse(getStore('user'));

                // if(getStore('defaultBrand') != undefined){
                //     this.defaultBrand = getStore('defaultBrand');
                // }

                // if(this.$route.params.brand != undefined){
                //     this.currentBrand = this.$route.params.brand;
                // }else if(this.defaultBrand != undefined){
                //     this.currentBrand = this.defaultBrand;
                // }

                // console.log(this.$route.params.brand);


                // let response = await getMyStore(this.user.id);
                // if(response.status == 0){
                //     let _this = this;
                //     _this.storeList = response.stores;
                //     _this.storeListOrigin = response.stores;
                //     _this.storeListOrigin.map(item=>{
                //         if(!_this.branchList[item.name]){
                //             _this.branchList[item.name]=[];
                //         }
                //         _this.branchList[item.name].push(item);
                //         return item;
                //     })
                //     _this.branchName = Object.keys(_this.branchList);
                //     console.log(_this.branchName,_this.defaultBrand);
                // }
                // let _this = this;
                // let response = await getSubscribeList(this.user.openId);
                // if(response.status == 0){

                //     _this.storeList = response.subscribeList.content;
                //     _this.storeListOrigin = response.subscribeList.content;
                //     _this.storeListOrigin.map(item=>{
                //         if(!_this.branchList[item.brand]){
                //             _this.branchList[item.brand]=[];
                //         }
                //         _this.branchList[item.brand].push(item);
                //         return item;
                //     })
                //     _this.branchName = Object.keys(_this.branchList);

                //     if(_this.currentBrand == '' && _this.defaultBrand == ''){
                //         // setStore('currentBrand',_this.branchName[0]);
                //         _this.currentBrand = _this.branchName[0];
                //     }
                //     console.log(_this.branchName,_this.currentBrand,_this.branchList[_this.currentBrand]);
                //     // this.extra = response.extra;
                // }
                // console.log('xxx')
                // console.log(this.storeList);

                // if(this.storeList.length == 0){
                //     this.gotoAddress('/city/1');
                //     return;
                // }

                // if(_this.currentBrand != ''){
                //     this.chartInit(this.branchList[this.currentBrand]);
                //     // this.currentBrand = '';
                // } else if(_this.defaultBrand != ''){
                //     this.chartInit(this.branchList[this.defaultBrand]);
                // }
                

                //隐藏加载动画
                this.hideLoading();
                if(getStore('user') == undefined){
                    this.$router.push('/');
                }

                this.user = JSON.parse(getStore('user') || {});
                this.user.realName = "先生/女士";
            },
            closeTip(){
                this.showAlert = false;
            },
            alert(planIndex){
                // alert('敬请期待，我们将很快与您联系');
                // this.showAlert=true;
                // this.errorMsg = '敬请期待，我们将很快与您联系';
                // createOrder(this.user.phone,this.planIndex+1,1).then(r=>{
                //     console.log(r);
                // })
            
                this.showAlert = true;
                this.alertText = order.phone;

                this.alertSubText = '是否确认该用户买入￥'+ this.planList[planIndex].min +'？';
                this.alertTime = new Date();
                this.alertImg = 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLt9GVR0GqQkjqicrIqibicqaoOFSAQ0u6HFoLcEMwKPdBLzD2mgicCQyuC650UM3pYYrHIia7ib5qvEiaQ/132';

                this.confirmBtn = "确认";
                this.format = 'YYYY年MM月DD日';
                let _this = this;
                this.alertFunc = ()=>{
                    createOrder(this.user.phone,this.planIndex+1,1).then(r=>{
                        console.log(r);
                        _this.showAlert = false;
                    })
                }
            },

            alertSell(planIndex){
                // alert('敬请期待，我们将很快与您联系');
                // this.showAlert=true;
                // this.errorMsg = '敬请期待，我们将很快与您联系';
                // createOrder(this.user.phone,this.planIndex+1,1).then(r=>{
                //     console.log(r);
                // })
            
                this.showAlert = true;
                this.alertText = order.phone;

                this.alertSubText = '敬请期待';
                this.alertTime = new Date();
                this.alertImg = 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLt9GVR0GqQkjqicrIqibicqaoOFSAQ0u6HFoLcEMwKPdBLzD2mgicCQyuC650UM3pYYrHIia7ib5qvEiaQ/132';

                this.confirmBtn = "确认";
                this.format = 'YYYY年MM月DD日';
                this.alertFunc = ()=>{
                    createOrder(this.user.phone,this.planIndex+1,1).then(r=>{
                        console.log(r);
                    })
                }
            },
            openCalendar(){
                this.calendar2.show = true;
            },
            cancelCalendar(){
                this.calendar2.show = false;
            },
            saveCalendar(){
                this.calendar2.show = false;
                if(this.currentBrand != ''){
                    this.chartInit(this.branchList[this.currentBrand]);
                    // this.currentBrand = '';
                } else if(this.defaultBrand != ''){
                    this.chartInit(this.branchList[this.defaultBrand]);
                }
            },

            chooseDate(){ 
            },

            clickTab(type){
                this.tabType = type;
            },

            chartInit(list){
                // console.log(list);

                // this.storeIds = [];
                // this.storeList = list;
                // this.storeList.map(item=>{
                //     this.storeIds.push(item.storeId+"");
                // })

                // for(let i=0; i < this.storeIds.length ; i++){
                //     getStoreRate(this.user.id, this.storeIds[i]);
                // }

                // let _this = this;
                // _this.startDate = new Date();
                // _this.endDate = new Date();

                // _this.startDate.setFullYear(_this.calendar2.value[0][0],    _this.calendar2.value[0][1],  _this.calendar2.value[0][2]);
                // _this.endDate.setFullYear(_this.calendar2.value[1][0],      _this.calendar2.value[1][1],  _this.calendar2.value[1][2]);

                // getAnalyzeRate({
                //     dpStoreIds  :   _this.storeIds,
                //     eleStoreIds :   null,
                //     startDate   :   _this.startDate.getTime(),
                //     endDate     :   _this.endDate.getTime(),
                //     source      :   0
                // }).then(function(data){

                //     _this.originData = data.result;
                //     _this.rateCount = [{
                //         low:0,
                //         mid:0,
                //         high:0,
                //         amount:0.00001
                //     },{
                //         low:0,
                //         mid:0,
                //         high:0,
                //         amount:0.00001
                //     }];
                //     _this.originData.map(rate=>{
                //         _this.rateCount[rate.source].high += rate.rate5  + rate.rate4;
                //         _this.rateCount[rate.source].mid += rate.rate3;
                //         _this.rateCount[rate.source].low += rate.rate2  + rate.rate1 + rate.rate0;
                //         _this.rateCount[rate.source].amount += rate.rateCount;
                //     })

                // })

                // getRateAnalytics(_this.storeIds).then(function(resCount){
                //     if(resCount.status == 0){
                //         _this.originData = resCount;
                //         let index = resCount.date.length-2;
                //         let year = new Date().getFullYear();

                //         _this.date = year + '/'+ resCount.date[index];
                //         console.log(_this.date)
                //         // _this.dateFormat = new Date(_this.date).getTime();
                //         _this.rateCount.countHigh = resCount.countHigh[index]; 
                //         _this.rateCount.countMid = resCount.countMid[index]; 
                //         _this.rateCount.countLow = resCount.countLow[index]; 
                //         _this.rateCount.amount = _this.rateCount.countHigh + _this.rateCount.countMid + _this.rateCount.countLow + 0.00001;
                        
                //         // _this.bar.yAxis[0].max = resCount.max*1.3;

                //         // let year = new Date().getFullYear();
                //         // _this.bar.xAxis[0].data = resCount.date;
                //         // _this.date = year+'/'+resCount.date[resCount.date.length-2];
                //         // _this.dateFormat = new Date(_this.date).getTime();
                //         // _this.bar.tooltip.axisPointer.value = "8/30";

                //         // _this.bar.series[0].data = resCount.countHigh;
                //         // _this.bar.series[1].data = resCount.countMid;
                //         // _this.bar.series[2].data = resCount.countLow;

                //         // _this.rateCount.countHigh = _this.bar.series[0].data[resCount.date.length-2]; 
                //         // _this.rateCount.countMid = _this.bar.series[1].data[resCount.date.length-2]; 
                //         // _this.rateCount.countLow = _this.bar.series[2].data[resCount.date.length-2]; 

                //         // _this.bar.tooltip.formatter = function(param){
                            
                //         //     _this.rateCount.countHigh = param[0].data; 
                //         //     _this.rateCount.countMid = param[1].data; 
                //         //     _this.rateCount.countLow = param[2].data; 

                            
                //         //     let year = new Date().getFullYear();
                //         //     if(param[0].axisValue.indexOf(year) == -1){
                //         //         param[0].axisValue = year+'/'+param[0].axisValue;
                //         //     }
                //         //     _this.date = new Date(param[0].axisValue); 
                //         //     _this.dateFormat = _this.date.getTime();
                //         //     console.log(_this.dateFormat);
                //         // }
                //         // if( _this.storeList.length == _this.storeListOrigin.length){
                //         //     _this.bar.title.text = '全部('+ _this.storeList.length +'家)门店';
                //         // }else if(_this.storeList.length > 1 ){
                //         //     _this.bar.title.text = _this.storeList[0].name +'('+ _this.storeList.length +'家)门店';
                //         // }else{
                //         //      _this.bar.title.text = _this.storeList[0].name + ' '+ _this.storeList[0].branchName ;
                //         // }

                //         // _this.chart.option = _this.bar;
                //         // _this.chart.dispatchAction({type: 'showTip', seriesIndex: '10', dataIndex: '10'})
                //     }
                // })

            },
            searchLocal :debounce(function (keyword) {
              
                if (keyword && keyword != " ") {

                    this.storeList = this.storeListOrigin.filter(store=>{
                        return store.storeName.indexOf(keyword) > -1;
                    });

                }else if(keyword == "") {
                    this.storeList = this.storeListOrigin;
                }

            }, 200),

            selectSearchResult(data,index){

                this.chartInit(data);
                this.showDefault = false;
                this.showSearch = false;
                this.selectedIndex = index;
                console.log('this.selectedIndex',this.selectedIndex);

            },
            setDefaultBrand(data){
                
                console.log('setDefault:' +　this.defaultBrand);

                this.defaultBrand = data[0].storeName;
                
            },
            saveDefaultBrand(){

                setStore( 'defaultBrand', this.defaultBrand);
                this.showDefault = false;
                this.showSearch = true;

            },
            gotoAddress(path){
                console.log(path);

                this.$router.push(path);
            },
            doRandom() {
                const that = this;
                
            },
            onReady(instance) {
                // console.log(instance);
                this.chart = instance;
                console.log(this.chart);
                this.hideLoading();
            },
            onClick(event, instance, echarts) {
                console.log(arguments);

            },
            eventSearch(){
                this.gotoAddress('/chooseBrand');
                return;
            },
            eventDefault(){
                this.showDefault = !this.showDefault;
                this.showSearch = false;
                console.log(this.showDefault);
            },
            //隐藏动画
            hideLoading(){
                this.showLoading = false;
            },

        },
        watch: {

        }
    }
</script>
<style lang="scss" scoped>
    @import 'src/style/mixin';
    @keyframes mymove{
       0%   { transform: scale(1) }
       25%  { transform: scale(.8) }
       50%  { transform: scale(1.1) }
       75%  { transform: scale(.9) }
       100% { transform: scale(1) }
    }
    @-moz-keyframes mymove{
       0%   { transform: scale(1) }
       25%  { transform: scale(.8) }
       50%  { transform: scale(1.1) }
       75%  { transform: scale(.9) }
       100% { transform: scale(1) }
    }
    @-webkit-keyframes mymove{
       0%   { transform: scale(1) }
       25%  { transform: scale(.8) }
       50%  { transform: scale(1.1) }
       75%  { transform: scale(.9) }
       100% { transform: scale(1) }
    }
    @-o-keyframes mymove{
       0%   { transform: scale(1) }
       25%  { transform: scale(.8) }
       50%  { transform: scale(1.1) }
       75%  { transform: scale(.9) }
       100% { transform: scale(1) }
    }
    .btn_buy{
        position: fixed;
        bottom:2.15rem;
        display: flex;
        width:100%;
        .btn_flex{
            flex:1;
            line-height: 250%;
            font-size: .6rem;
            padding:.2rem ;
            color:#fff;
            i{

                width:12px;
                height:18px;
                display: inline-block;
                margin-right:10px;
                vertical-align:sub;
            }
        }
        .draw{
            background:#249ef5;
            i{
                background: url(../../images/ico-out.png) no-repeat center center;
                background-size:100% auto;
            }
            span{
                
            }
        }
        .deposit{
            background:#0081ee;
            i{
                background: url(../../images/ico-in.png) no-repeat center center;
                background-size:100% auto;
            }
            span{
                
            }
        }
    }
    .desc_form{
        padding:.2rem 1rem;
        background: #fff;
        .desc_h2{
            color:#0081ee;
            font-size:.8rem;
            margin-bottom:.4rem;
        }
        .desc_content{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .desc_title{
            font-size:1.1rem;
        }
        .desc_subtitle{
            
            font-size:.6rem;
            color:#aaa;
        }
    }
    
    .plan_item{
        width:300px;
        border:1px solid #ddd;
        margin:10px auto;
        box-shadow: 2px 2px 3px #888888;
        padding:.8rem .8rem;
        position:relative;
        .plan_prev{
            position:absolute;
            top:40%;
            left:8px;
            background:#ddd;
            color:#fff;
            border-radius: 1.2rem;
            width:1.2rem;
            height:1.2rem;
            font-size: .8rem;
            line-height:1.2rem;
            padding-left:.3rem;
        }
        .plan_next{
            position:absolute;
            top:40%;
            right:8px;
            background:#ddd;
            color:#fff;
            border-radius: 1.2rem;
            width:1.2rem;
            height:1.2rem;
            font-size: .8rem;
            line-height:1.2rem;
            padding-left:.3rem;
        }
        div{
            color:#aaa;
        }
        .plan_name{
            text-align: center;
        }
        .plan_subname{
            text-align: center;
            font-size: .8rem;
            margin-bottom:.4rem;
        }
        .plan_desc{
            text-align: center;
            font-size: .8rem;
        }
        .plan_money{
            text-align:center;
            span{
                color:#d56778;
            }
        }
    }
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
    .head_tips{
        @include sc(0.65rem, #333);
        font-weight: bold;
        line-height: 1.95rem;
        background-color: #fff;
        text-align: center;

    }


    .head_top{
        background-color: #fff;
        position: absolute;    
        left: 0;
        top: 0;
        @include wh(100%, 1.95rem);
        display: flex;
        flex-direction: row;
        align-content: middle;
        align-items: center;
        align-content:center;
    }
    .title_search{
        flex:1;
        margin: 0rem .2rem 0 .3rem;
        input{
            background-color: #eee;
            padding:.3rem .5rem;
            width: 100%;
            border-radius: .2rem;
            @include sc(0.6rem, #666);
        }
    }
    .title_right{
        @include sc(0.6rem, #666);
        width:2rem;
        line-height: 1.9rem;
        padding: 0 0.5rem 0 .3rem;
        display: block;
        text-align: center;
    }

    .shop_back_svg_container{
        position: fixed;
        @include wh(100%, 100%);
        img{
            @include wh(100%, 100%);
        }
    }
    .main_container{
        
    }
    .calendar-dialog{
        width:90%;
    }
    .calendar-button{
        border-bottom-left-radius: .4rem;
        border-bottom-right-radius: .4rem;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        span{
            @include sc(.65rem, #24253D);
            display: inline-block;
            padding: .2rem 1rem .8rem;
            &:last-child{
                color:#007BE6;
            }
        }
    }
    .bg-gray{
        background-color: rgba(0,0,0,0.5);
        position: fixed;
        top:0;
        right: 0;
        left: 0;
        bottom:0;
        height: 100%;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .shop_container{
        display: flex;
        flex-direction: column;
        margin-bottom:90px;
        background:#fff;
        
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
       
    }
    .goback{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2rem;
        z-index: 11;
        padding-top: 0.2rem;
        padding-left: 0.2rem;
    }
    .search_submit{
        width:90%;
        margin: .6rem 0;
        padding: .4rem 0;
        border-radius: 0.125rem;
        background-color: #ffd101;
        box-shadow: 0px 3px 5px rgba(255,120,0,.5);
        @include sc(0.7rem, #292929);
        font-weight: normal;
        text-align: center;

        span{
            color:#111;
            display: inline-block;
            vertical-align:middle;
            font-size:0.65rem;
        }
        .icon_style{
            width: .8rem;
            height:.8rem;
            font-size:0.8rem;
            display: inline-block;
            vertical-align:middle;
            margin-right:.2rem;
            fill:#111;
            use{
                fill:#111;
            }
        }
    }
    .chart_container{
        background-color: #fff;
        width: 100%;
        height: 206px;
        margin-top:1rem;
        padding-bottom:.4rem;
    }
    
    .detail_container{
        display: flex;
        justify-content: center;
        background-color:#fff;
    }

    

</style>


<style lang="scss">
    #myDate{
        position: fixed!important;
        top:-10rem;
    }
    .vue-datepicker .vue-datepicker-panels{
        position: fixed!important;
        top: 4rem!important;
        width: 90%!important;
        left: 5%!important;
        z-index:1111!important;
    }
    .vue-datepicker .vue-datepicker-panels::after{
        
    }
    .vue-datepicker .vue-datepicker-panel .vue-datepicker-tb thead, .vue-datepicker .vue-datepicker-panel .vue-datepicker-tb2 thead{
        background-color:#fff!important;
        color:#FFC400!important;
        
        th{
            font-weight: bold!important;
        }
    }

    .vue-datepicker .vue-datepicker-panel .vue-datepicker-month span{
        float: left!important;
        display: block!important;
        width: 78%!important;
    }

    .vue-datepicker .vue-datepicker-panel .vue-datepicker-tb, .vue-datepicker .vue-datepicker-panel .vue-datepicker-tb2{
        width:100%!important;
    }
    .vue-datepicker .vue-datepicker-panel .vue-datepicker-tb tbody tr td.z-existed.z-on span, .vue-datepicker .vue-datepicker-panel .vue-datepicker-tb2 tbody tr td.z-existed.z-on span{
        background-color: #F9BE2A!important;
    }
    .vue-datepicker .vue-datepicker-panel .vue-datepicker-tb tbody tr td.z-existed span, .vue-datepicker .vue-datepicker-panel .vue-datepicker-tb2 tbody tr td.z-existed span{
        width:1.9rem!important;
        height: 1.9rem!important;
        line-height: 1.9rem!important;
        border-radius: 1.9rem!important;
    }

</style>
