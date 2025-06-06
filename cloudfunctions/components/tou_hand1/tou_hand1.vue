<template>
	<view>
		<view class="hand">
			<image src="../../static/tabBarimg/dbleft.png" @click="blackbtn"></image>
			{{handtitle}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},

		props: {
			handtitle: ''
		},
		methods: {
			//返回上一页
			blackbtn() {
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss">
	.hand{
		text-size-adjust: 100% !important;
		-webkit-text-size-adjust: 100% !important;  
		-moz-text-size-adjust: 100% !important;
		width: 100%;
		background-color: #4B98ED;
		font-size: 30upx;
		padding: 20upx 0;
		font-family: PingFang SC Bold, PingFang SC Bold-Bold;
		font-weight: 700;
		text-align: center;
		color: #ffffff;
		position: relative;
		image{
			width:22upx;
			height: 39upx;
			position: absolute;
			left: 31upx;
			top: 22upx;
		}
	}
</style>
