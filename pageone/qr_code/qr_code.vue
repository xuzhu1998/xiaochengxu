<template>
	<view class="home">
		<view class="erimg">
			<image :src='wechatImg'></image>
			<view class="erimgtxt">请先关注公众号</view>
		</view>
		<view class="ts">
			<view><image src="../../static/tabBarimg/tsone.png"></image></view>
			<view><image src="../../static/tabBarimg/tstwo.png"></image></view>
		</view>
	</view>
	
</template>

<script>
import {
		Config
	} from '../../common/Config.js'
	export default {
		data() {
			return {
				wechatImg:''
			}
		},
		created() {
			
		},
		onShow() {
			this.wechatImg=Config.imgapi+uni.getStorageSync('user').wechatImg
		},
		onLoad(option) {
		
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.home{
		width: 100%;
		height: 100%;
		// background: url(../../static/tabBarimg/qr_bg.png);
		background-size: 100% 100%;
		background-position: center center;
		background-image: linear-gradient(#6873ED, #529DEF);
		overflow: auto;
		.erimg{
			width: 248upx;
			box-sizing: border-box;
			margin: 0 auto;
			margin-top: 364upx;
			image{
				width: 248upx;
				height: 248upx;
				background: #ffffff;
			}
			.erimgtxt{
				font-size: 32upx;
				font-family: Noto Sans S Chinese Regular, Noto Sans S Chinese Regular-Regular;
				font-weight: 400;
				text-align: center;
				color: #ffffff;
				margin-top: 22upx;
			}
		}
		.ts{
			width: 237upx;
			margin: 0 auto;
			margin-top: 290upx;
			image{
				width: 237upx;
				height: 27upx;
				margin: 20upx auto;
			}
		}
	}
	
</style>
