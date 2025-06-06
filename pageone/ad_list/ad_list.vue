<template>
	<view class="main">
		<!-- <web-view :src="msg"></web-view> -->
		<iframe :src="msg" sandbox="allow-forms allow-scripts allow-same-origin allow-popups"></iframe>
	</view>
</template>

<script>
	
	export default {
		components: {},
		mounted() {
			
		},

		data() {
			return {
				msg:''
			}
		},
		onLoad(options) {
			// window.location.href=decodeURIComponent(options.msg) 
			// window.open(options.msg)
			this.msg=decodeURIComponent(options.msg) 
			// 重定向路径
			
			
		},
		onShow() {
			setTimeout(() => {
				uni.reLaunch({
					url: "../index/index"
				});
			}, 30000)
		},
		methods: {
		
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 100%;
		overflow-x: hidden;
		background-color: #FFFFFF;
		
		.show{
			width: 100%;
		
		}
		
	}
</style>
