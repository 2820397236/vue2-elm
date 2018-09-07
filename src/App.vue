<template>
	<div class="v-body">
		<transition name="router-fade" mode="out-in">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
		<svg-icon></svg-icon>	
    </div>
</template>

<script>
	import svgIcon from './components/common/svg';
  	export default {
    	components:{
            svgIcon
        },
  	}

</script>

<style lang="scss">
  	@import './style/common';
  	.v-body{
  		width:100%;
  		min-height: 100%;
  		margin:0;
  		/*background: rgb(16,18,60);*/
  		background: #fff!important;
  	}
	.router-fade-enter-active, .router-fade-leave-active {
		.main_container{
			transition: opacity .2s;
		}
	  	
	}
	.router-fade-enter, .router-fade-leave-active {
		.main_container{
			opacity: 0;
		}
	}
</style>
