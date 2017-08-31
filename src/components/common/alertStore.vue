 <template>
    <div class="alet_container">
	    <section class="tip_text_container">
            <div class="tip_icon">
                <img :src="alertImg"/>
            </div>
            <p>
                <div class="tip_text">{{alertText}}</div>
                <div class="tip_subtext">{{alertSubText}}</div>
                <div class="tip_time">{{alertTime | dateTime(format)}}</div>
            </p>
            <div class="confrim">
                <span  @click="closeTip">返回</span>
                <span  @click="doFunc">{{confirmBtn}}</span>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
                positionY: 0,
                timer: null,
            }
        },
        mounted(){
      
        },
        props: ['alertText','alertSubText','alertTime','alertImg','alertFunc','confirmBtn','format'],
        methods: {
            closeTip(){
                this.$emit('closeTip');
            },
            doFunc(){
                if(this.alertFunc()){
                    this.$emit('closeTip');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
	@keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }
    .alet_container{
    	position: fixed;
    	top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
        background:rgba(0,0,0,.4);
    }
    .tip_text_container{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -7rem;
        margin-left: -7rem;
        width: 14rem;
        animation: tipMove .4s ;
        background-color: #f5f5f5;
        border: 1px;
        padding-top: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px;
        border-radius: 0.25rem;
        .tip_icon{
            @include wh(3rem, 3rem);
            img{
                @include wh(100%, 100%);
            }
        }
        .tip_text{
            @include sc(.6rem, #333);
            line-height: 1.2rem;
            text-align: center;
            margin-top: .2rem;
            padding: 0 .4rem;
        }
        .tip_subtext{
            @include sc(.6rem, #777);
            line-height: 1.2rem;
            text-align: center;
            padding: 0 .4rem;
        }
        .tip_time{
            @include sc(.5rem, #bbb);
            line-height: 1.2rem;
            text-align: center;
            padding: 0 .4rem;
        }
        .confrim{
            @include sc(.7rem, #111);
            margin-top: .8rem;
            background-color: #f5f5f5;
            width: 100%;
            text-align: center;
            line-height: 1.8rem;
            border-top:.005rem solid #dbdbdb;
            border-bottom-left-radius: 0.25rem;
            border-bottom-right-radius: 0.25rem;
            display: flex;
            flex-direction: row;

            span{
                flex:1;
                &:first-child{
                    border-right:.005rem solid #dbdbdb;
                }
            }
        }
    }
    
</style>
