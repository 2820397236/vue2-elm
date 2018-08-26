 <template>
    <div>
        <section class="head_tips" @click="gotoAddress({path:'/warning'})">您没有未读预警，点击查看历史预警</section>
        <section class="head_brand"  @click="eventSearch()">
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
        </section>
        <section class="head_calendar">
            <span>请选择日期</span>
            <section>
                <div class="head_calendar_date">{{calendar2.value[0][1]+1}}月{{calendar2.value[0][2]}}日 - {{calendar2.value[1][1]+1}}月{{calendar2.value[1][2]}}日 <!-- <span>今天</span> --></div>
                <div class="head_calendar_button" @click="openCalendar()">
                    <svg width="22px" height="21px" viewBox="0 0 22 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="首页-无预警" transform="translate(-337.000000, -215.000000)" fill="#007BE6">
                                <path d="M338.991155,215 L357.008845,215 C358.110326,215 359,215.892996 359,216.994561 L359,234.005439 C359,235.097656 358.10853,236 357.008845,236 L338.991155,236 C337.889674,236 337,235.107004 337,234.005439 L337,216.994561 C337,215.902344 337.89147,215 338.991155,215 Z M339.993398,221 C339.444759,221 339,221.447489 339,221.998502 L339,233.001498 C339,233.552955 339.444946,234 339.993398,234 L356.006602,234 C356.555241,234 357,233.552511 357,233.001498 L357,221.998502 C357,221.447045 356.555054,221 356.006602,221 L339.993398,221 Z M340,217 L340,219 L345,219 L345,217 L340,217 Z M351,217 L351,219 L356,219 L356,217 L351,217 Z M352,229 L354,229 L354,231 L352,231 L352,229 Z M347,229 L349,229 L349,231 L347,231 L347,229 Z M342,229 L344,229 L344,231 L342,231 L342,229 Z M352,224 L354,224 L354,226 L352,226 L352,224 Z M347,224 L349,224 L349,226 L347,226 L347,224 Z M342,224 L344,224 L344,226 L342,226 L342,224 Z" id="calendar"></path>
                            </g>
                        </g>
                    </svg>
                </div>
            </section>
        </section>

        <section class="head_tab">
            <div class="tab_container" :class="{active:tabType=='dp'}" @click="clickTab('dp')">
                <span>到店满意度</span><br/>
                <!-- <span class="rate_total">{{rateCount[0].amount.toFixed(0)}}条</span> -->
            </div>
            <div class="tab_container" :class="{active:tabType=='ele'}" @click="clickTab('ele')">
                <span>外卖满意度</span><br/>
                <!-- <span class="rate_total">{{rateCount[1].amount.toFixed(0)}}条</span> -->
            </div>
        </section>
         <section v-if="!showLoading" class="shop_container main_container">
            
            <section class="chart_container">
                <IEcharts :option="bar" :height="100" theme="customer" @ready="onReady" @click="onClick"></IEcharts>
            </section>
        </section>
        
            
       <foot-guide></foot-guide>

       <loading v-show="showLoading"></loading>

        <!-- <section class="animation_opactiy shop_back_svg_container" v-if="showLoading">
           <img src="../../images/shop_back_svg.svg">
        </section> -->
        <transition name="router-slid" mode="out-in">
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
        </transition>

    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {getAnalyzeRate,getMyStore,getRateAnalytics,getStoreRate,getSubscribeList} from 'src/service/getData'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
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
                bar: {
                    title: {
                        left: '4%',
                        top:'4%',
                        text: '统计中..'
                    },
                    toolbox: {
                        
                    },
                    grid: {
                        left: '0%',
                        right: '0%',
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
                            }
                        }
                    ],
                    yAxis : [
                        {
                            show : false,
                            axisLine :{
                                show : false
                            },
                            axisLabel:{
                                show : false
                            },
                            type : 'value'
                        }
                    ],
                    dataZoom: [{
                        type: 'inside',
                        start: 50,
                        end: 100
                    }],
                    series : [
                        {
                            type:'line',
                            name:'好评',
                            lineStyle:{normal:{color:'#6ea593'}},
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#6ea593'},
                                            {offset: 0.9, color: '#eafff1'},
                                            {offset: 1, color: '#fff'}
                                        ]
                                    )
                                }
                            }
                        },{
                            type:'line',
                            name:'中评',
                            lineStyle:{normal:{color:'#f8d555'}},
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#f8d555'},
                                            {offset: 0.9, color: '#fcf8dd'},
                                            {offset: 1, color: '#fff'}
                                        ]
                                    )
                                }
                            },
                        },
                        {
                            type:'line',
                            name:'差评',
                            lineStyle:{normal:{color:'#eda994'}},
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
            footGuide,
            calendar,
            IEcharts
        },
        computed: {
            ...mapState([
                
            ]),
            
        },
        methods: {
            ...mapMutations([
               
            ]),
            //初始化时获取基本数据
            async initData(){
                // console.log([new Date().getFullYear(),new Date().getMonth(),new Date().getDate()]);

                if(getStore('user') == undefined){
                    this.$router.push('/');
                }
                this.user = JSON.parse(getStore('user'));

                if(getStore('defaultBrand') != undefined){
                    this.defaultBrand = getStore('defaultBrand');
                }

                if(this.$route.params.brand != undefined){
                    this.currentBrand = this.$route.params.brand;
                }else if(this.defaultBrand != undefined){
                    this.currentBrand = this.defaultBrand;
                }

                console.log(this.$route.params.brand);


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
                let _this = this;
                let response = await getSubscribeList(this.user.openId);
                if(response.status == 0){

                    _this.storeList = response.subscribeList.content;
                    _this.storeListOrigin = response.subscribeList.content;
                    _this.storeListOrigin.map(item=>{
                        if(!_this.branchList[item.brand]){
                            _this.branchList[item.brand]=[];
                        }
                        _this.branchList[item.brand].push(item);
                        return item;
                    })
                    _this.branchName = Object.keys(_this.branchList);

                    if(_this.currentBrand == '' && _this.defaultBrand == ''){
                        // setStore('currentBrand',_this.branchName[0]);
                        _this.currentBrand = _this.branchName[0];
                    }
                    console.log(_this.branchName,_this.currentBrand,_this.branchList[_this.currentBrand]);
                    // this.extra = response.extra;
                }
                // console.log('xxx')
                // console.log(this.storeList);

                if(this.storeList.length == 0){
                    this.gotoAddress('/city/1');
                    return;
                }

                if(_this.currentBrand != ''){
                    this.chartInit(this.branchList[this.currentBrand]);
                    // this.currentBrand = '';
                } else if(_this.defaultBrand != ''){
                    this.chartInit(this.branchList[this.defaultBrand]);
                }
                

                //隐藏加载动画
                this.hideLoading();
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

                this.storeIds = [];
                this.storeList = list;
                // console.log(list);
                // console.log(this.storeIds);
                this.storeList.map(item=>{
                    this.storeIds.push(item.storeId+"");
                    
                })

                // for(let i=0; i < this.storeIds.length ; i++){
                //     getStoreRate(this.user.id, this.storeIds[i]);
                // }

                let _this = this;
                _this.startDate = new Date();
                _this.endDate = new Date();

                _this.startDate.setFullYear(_this.calendar2.value[0][0],    _this.calendar2.value[0][1],  _this.calendar2.value[0][2]);
                _this.endDate.setFullYear(_this.calendar2.value[1][0],      _this.calendar2.value[1][1],  _this.calendar2.value[1][2]);

                getAnalyzeRate({
                    dpStoreIds  :   _this.storeIds,
                    eleStoreIds :   null,
                    startDate   :   _this.startDate.getTime(),
                    endDate     :   _this.endDate.getTime(),
                    source      :   0
                }).then(function(data){

                    _this.originData = data.result;
                    _this.rateCount = [{
                        low:0,
                        mid:0,
                        high:0,
                        amount:0.00001
                    },{
                        low:0,
                        mid:0,
                        high:0,
                        amount:0.00001
                    }];
                    _this.originData.map(rate=>{
                        _this.rateCount[rate.source].high += rate.rate5  + rate.rate4;
                        _this.rateCount[rate.source].mid += rate.rate3;
                        _this.rateCount[rate.source].low += rate.rate2  + rate.rate1 + rate.rate0;
                        _this.rateCount[rate.source].amount += rate.rateCount;
                    })

                    // console.log(_this.originData);

                })
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
        @include sc(0.65rem, #fff);
        line-height: 1.95rem;
        background-color: #13be7b;
        text-align: center;

    }
    .head_brand{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding:.75rem;
        border-bottom:0.025rem solid #e5e5e5;
        min-height: 3.5rem;
        .head_brand_name{
            .head_brand_pic{
                @include wh(2rem, 2rem);
                margin-right:.1rem;
                border-radius: .4rem;
                vertical-align:middle;
            }
            span{
                @include sc(.9rem, #343640);
                vertical-align:middle;
            }
        }
        .head_brand_button{
            @include sc(.65rem, #007BE6);
        }
    }
    .head_calendar{
        padding:.3rem .6rem .7rem .6rem;
        border-bottom:0.025rem solid #e5e5e5;
        span{
            @include sc(.6rem, #969FB7);
        }
        section{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            .head_calendar_date{
                @include sc(.9rem, #343640);
            }
            .head_calendar_button{
                @include sc(.65rem, #007BE6);
            }
        }
    }
    .head_tab{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        padding:0 .75rem;
        .tab_container{
            @include sc(.6rem, #969FB7);
            @include wh(6.6rem, auto);
            border-bottom:0.2rem solid #fff;
            text-align: center;
            padding:.8rem .3rem .3rem;
            line-height: .6rem;
            span{
                @include sc(.6rem, #969FB7);
                display: inline-block;
                line-height: .6rem;
            }
            .rate_total{
                @include sc(.5rem, #969FB7);
            }
            &.active{
                border-bottom:0.2rem solid #FFDA00;
                @include sc(.9rem, #343640);
                span{
                    color:#343640;
                    display: inline-block;
                }
            }
        }
    }
    .description_header{
            position: absolute;
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
    .head_login{
        right: 0rem;
        @include wh(2rem,100%);
        @include sc(0.6rem, #999);
        @include ct;
        border-radius: .2rem;
        text-align: center;
        line-height: 2.3rem;
        .icon_style{
            width:0.8rem;
            height:0.8rem;
        }
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
            border-radius: .7rem;
            border-top-left-radius:0;
            border-top-right-radius:0;
            padding-bottom: .4rem;
            width:100%;
            min-height:83%;
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
        height: 306px;
        padding-bottom:.4rem;
    }
    
    .detail_container{
        display: flex;
        justify-content: center;
        background-color:#fff;
    }
    .reply_container{
        display: flex;
        flex-direction:column;
        padding-top: .6rem;
        align-items: center;
        justify-content: center;
        align-content:center;
        background-color:#fff;
        .reply_item{
            width:100%;
            display: flex;
            .reply_item_border{
                flex: 1;
                min-height: 2.6rem;
                @include sc(0.6rem, #333);
                background-color: #fff;
                padding: .6rem .2rem .6rem .5rem;
                section{
                    display: flex;
                    flex-direction: row;
                }
                .reply_progress{
                    flex:1;
                    border-radius: .9rem;
                    background-color: #f6f9fc;
                    line-height: 1.6rem;
                    span{

                        @include sc(0.65rem, #fff);
                    }
                    @include wh(100%, 1.6rem);

                    &.green{
                        width:0%;
                        padding-left:.8rem;
                        background-color:#4fd2a8;
                    }
                    &.yellow{
                        width:0%;
                        padding-left:.8rem;
                        background-color:#fed137;
                    }
                    &.red{
                        width:0%;
                        padding-left:.8rem;
                        background-color:#fe736f;
                    }
                }
                .reply_item_count{
                    @include sc(.6rem, #969FB7);
                    text-align: left;
                    line-height: 1.2rem;
                    padding-left:.8rem;
                }
                .reply_view_button{
                    padding:0 .6rem;
                    @include sc(.65rem, #007BE6);
                    line-height: 1.6rem;
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
                flex:1;
                background-color: #fff;
                padding: .6rem .4rem .6rem 1.2rem ;
                border-bottom: 1px solid #f8f8f8;
                position: relative;
                overflow: hidden;
                .menu_detail_link{
                    display:flex;
                    .menu_food_img{
                        margin-right: .4rem;
                        img{
                            @include wh(2rem, 2rem);
                            display: block;
                        }
                    }
                    .menu_food_description{
                        width: 100%;
                        .food_description_head{
                            @include fj;
                            margin-bottom: .1rem;
                            .description_foodname{
                                @include sc(.7rem, #333);
                            }
                        }
                        .food_description_content{
                            @include sc(.7rem, #969696);
                            line-height: 1rem;
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
    .screen_cover{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,.3);
        z-index: 11;
    }
    .change_show_type{
        display: flex;
        background-color: #fff;
        padding: .3rem 0 .6rem;
        border-bottom: 1px solid #ebebeb;
        div{
            flex: 1;
            text-align: center;
            span{
                @include sc(.65rem, #d1d1d1);
                padding: .2rem .1rem;
                border-bottom: 0rem solid #fa5b5b;
            }
            .activity_show{
                color: #434343;
                border-width:0.12rem;
            }
        }
    }

    @media (max-width: 320px) {
        .chart_container{
            height: 246px;
        }
        .search_submit{
            
        }
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
