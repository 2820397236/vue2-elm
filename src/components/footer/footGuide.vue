<template>
    <section id='foot_guide'>
    	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
	    	<defs>
                <symbol viewBox="0 0 18 20" id="myHomeActive">
                    <circle id="Rectangle-8_2_1" class="st1" cx="9" cy="6" r="5" fill="#ddd"/>
                    <path id="Rectangle-8_2_2" class="st1" d="M5.4,12.6l-3.8,1.8l-0.9,5h16.6l-0.9-5l-3.8-1.8" fill="#ddd" />
                </symbol>

                <symbol x="0px" y="0px" viewBox="0 0 18 18" style="enable-background:new 0 0 18 18;" id="analytics">
                    <g>
                        <path class="st2" d="M2.2,0h1v9.9h-1C2.2,9.9,2.2,0,2.2,0z"/>
                        <path class="st2" d="M2.2,14.4h1V18h-1V14.4z"/>
                        <path class="st2" d="M15,0h1v9.8h-1C15,9.8,15,0,15,0z"/>
                        <path class="st2" d="M15,14.4h1V18h-1V14.4z"/>
                        <path class="st2" d="M8.5,7.4h1V18h-1V7.4z"/>
                        <path class="st2" d="M8.5,0h1v2.2h-1V0z"/>
                        <g>
                            <path class="st2" d="M2.7,14.9c-1.5,0-2.7-1.2-2.7-2.7s1.2-2.7,2.7-2.7c1.5,0,2.7,1.2,2.7,2.7S4.1,14.9,2.7,14.9z M2.7,10.3
                                c-1.1,0-1.9,0.9-1.9,1.9s0.9,1.9,1.9,1.9c1.1,0,1.9-0.9,1.9-1.9S3.7,10.3,2.7,10.3z"/>
                        </g>
                        <g>
                            <path class="st2" d="M9,7.5c-1.5,0-2.7-1.2-2.7-2.7c0-1.5,1.2-2.7,2.7-2.7s2.7,1.2,2.7,2.7C11.7,6.3,10.5,7.5,9,7.5z M9,2.9
                                c-1.1,0-1.9,0.9-1.9,1.9c0,1.1,0.9,1.9,1.9,1.9c1.1,0,1.9-0.9,1.9-1.9C10.9,3.8,10.1,2.9,9,2.9z"/>
                        </g>
                        <g>
                            <path class="st2" d="M15.5,14.6c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5S16.9,14.6,15.5,14.6z M15.5,10.2
                                c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8s1.8-0.8,1.8-1.8S16.5,10.2,15.5,10.2z"/>
                        </g>
                    </g>
                </symbol>

                <symbol x="0px" y="0px" viewBox="0 0 19 22" style="enable-background:new 0 0 19 22;" id="warning">
                    <path class="cls-1" d="M9.4,4.1c-3.8,0-6.8,3.3-6.8,7.4v7.7H16.5V11.8C16.5,7.6,13.3,4.1,9.4,4.1Zm5.8,13.8H7.6V11H6.3v6.9H3.8V11.6a5.81,5.81,0,0,1,5.6-6,6.05,6.05,0,0,1,5.8,6.3v6ZM19,20.6V22H0V20.6ZM10.1,2.8H8.9V0h1.3V2.8ZM3.6,5.2,2,3.2l1-.9L4.5,4.4Zm11.7.1-1-.9L16,2.3l1,.9Z"/>
                </symbol>

                <symbol x="0px" y="0px" viewBox="0 0 8 8" style="enable-background:new 0 0 8 8;" id="add">
                    <path d="M8,4.4H4.4V8H3.6l0-3.6H0V3.6h3.6l0-3.6h0.8v3.6H8L8,4.4z"/>
                </symbol>

                <symbol x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" id="more">
                    <g id="Oval">
                        <path d="M8.9,20c-5,0-9-4.1-9-9.1s4-9.1,9-9.1v1.3c-4.3,0-7.7,3.5-7.7,7.8c0,4.3,3.5,7.8,7.7,7.8
                            c4.3,0,7.7-3.5,7.7-7.8h1.3C17.9,15.9,13.9,20,8.9,20z"/>
                    </g>
                    <g id="Path-2">
                        <path d="M20,9.9h-10l0-0.7C10,7,10,4.2,10,0.8l0-0.8l0.7,0.1c5,0.9,8.1,3.9,9.1,9L20,9.9z M11.2,8.6h7.2
                            c-1-3.9-3.3-6.2-7.2-7.1C11.3,4.3,11.3,6.7,11.2,8.6z"/>
                    </g>
                </symbol>

                <symbol width="14px" height="14px" viewBox="0 0 14 14" id="search">
                    <path d="M10.0460022,9.21686557 L13.9926165,13.2859945 L13.251919,14.0012778 L9.32242519,9.9498008 C8.33545301,10.783089 7.05827568,11.2856241 5.66329887,11.2856241 C2.53554527,11.2856241 0,8.75925108 0,5.64281204 C0,2.526373 2.53554527,0 5.66329887,0 C8.79105246,0 11.3265977,2.526373 11.3265977,5.64281204 C11.3265977,6.99913624 10.8463325,8.24369427 10.0460022,9.21686557 Z M5.66329887,10.2596583 C8.22236999,10.2596583 10.296907,8.1926258 10.296907,5.64281204 C10.296907,3.09299828 8.22236999,1.02596583 5.66329887,1.02596583 C3.10422774,1.02596583 1.0296907,3.09299828 1.0296907,5.64281204 C1.0296907,8.1926258 3.10422774,10.2596583 5.66329887,10.2596583 Z" id="Combined-Shape-Copy"></path>
                </symbol>
                <symbol viewBox="0 0 8 8">
                    <path class="cls-1" d="M8,2.33l-4,4-4-4Z" id="arrowDown"/>
                </symbol>

	    	</defs>
    	</svg>
        <!-- <section @click = "gotoAddress({path: '/msite', query: {geohash}})" class="guide_item">
        	<svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('msite') !== -1? '#msiteActive' : '#msite'"></use>
            </svg>
            <span>预警</span>
        </section> -->
        <section @click = "gotoAddress({path: '/warning'})" class="guide_item" :class="$route.path.indexOf('warning') !== -1? 'active' : ''">
            <svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('warning') !== -1? '#warning' : '#warning'"></use>
            </svg>
            <span>预警</span>
        </section>

        <section @click = "gotoAddress({path: '/analytics'})" class="guide_item" :class="$route.path.indexOf('analytics') !== -1 
        || $route.path.indexOf('rateByShop') !== -1
        || $route.path.indexOf('rate') !== -1? 'active' : ''">
        	<svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('analytics') !== -1? '#analytics' : '#analytics'"></use>
            </svg>
            <span>统计</span>
        </section>
        
        <section @click = "gotoAddress('/shop')" class="guide_item" :class="$route.path.indexOf('shop') !== -1? 'active' : ''">
        	<svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('shop') !== -1? '#myHomeActive' : '#myHomeActive'"></use>
            </svg>
        </section>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
    	data(){
            return{
                
            }
        },
        created(){
           
        },
        mounted(){
            
        },
        computed: {
            ...mapState([
                'geohash'
            ]),
        },
        methods: {
        	gotoAddress(path){
        		this.$router.push(path)
        	}
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    #foot_guide{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        @include wh(100%, 1.95rem);
        display: flex;
        box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    }
    .guide_item{
    	flex: 3;
    	display: flex;
        flex-direction: row;
        justify-content: center;
    	align-items: center;
        position:relative;
        z-index: 1;
        &:last-child{
            flex:1;
            border-left:0.025rem solid #e7e7e7;
            .icon_style{
                margin:0;
            }
        }
        &.active{
            background-color:#ffd101;
            /* */
            span{
                @include sc(.7rem, #111);
            }
            svg{
                fill:#111!important;

            }
        }
		.icon_style{
			@include wh(.8rem, .8rem);
			margin-bottom: .2rem;
			margin-top: .15rem;
            margin-right: .4rem;
		}
		span{
			@include sc(.7rem, #666);
            line-height: .8rem;
		}
    }


    .st0{fill:none;stroke:#7C7C7C;stroke-width:1.2;}

    .st1{fill:none;stroke:#282828;stroke-width:1.2;}

   
</style>
