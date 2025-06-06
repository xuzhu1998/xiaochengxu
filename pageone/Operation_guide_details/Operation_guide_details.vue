<template>
	<view class="main">
		<view>
			<!-- <view class="show" v-show="num==1">
				<image src="../../static/tabBarimg/zhiyin/cz.gif"></image>
			</view>
			<view class="show" v-show="num==2">
				<image src="../../static/tabBarimg/zhiyin/bk.gif"></image>
			</view>
			<view class="show" v-show="num==3">
				<image src="../../static/tabBarimg/zhiyin/sm.gif"></image>
			</view>
			<view class="show" v-show="num==4">
				<image src="../../static/tabBarimg/zhiyin/yc.gif"></image>
			</view> -->
		</view>

	</view>
</template>

<script>

	export default {
		components: {
		},
		mounted() {
		},

		data() {
			return {
				// num: '',
				// showzhishi: false,
				// index: 0,
				// bklist: [
				// 	'../../static/tabBarimg/zhiyin/bk1.jpg',
				// 	'../../static/tabBarimg/zhiyin/bk2.jpg'
				// ], //绑定电卡图片
				// czlist: [
				// 	'../../static/tabBarimg/zhiyin/cz1.jpg',
				// 	'../../static/tabBarimg/zhiyin/cz2.jpg'
				// ], //充值图片
				// smlist: [
				// 	'../../static/tabBarimg/zhiyin/sm1.jpg',
				// 	'../../static/tabBarimg/zhiyin/sm2.jpg',
				// 	'../../static/tabBarimg/zhiyin/sm3.jpg',
				// 	'../../static/tabBarimg/zhiyin/sm4.jpg'
				// ], //扫码上电图片
				// yclist: [
				// 	'../../static/tabBarimg/zhiyin/yc1.jpg',
				// 	'../../static/tabBarimg/zhiyin/yc2.jpg',
				// 	'../../static/tabBarimg/zhiyin/yc3.jpg',
				// 	'../../static/tabBarimg/zhiyin/yc4.jpg'
				// ], //扫码上电图片
			}
		},
		onLoad(options) {
			// this.num = options.num
			// uni.setNavigationBarTitle({
			// 	title:options.name
			// })
			
		},
		onShow() {

		},
		methods: {
			// changeSwipe(type) {
			// 	if(this.num==1){
			// 		if (type == 'up') {
			// 			if (this.index == 0) {
			// 				Toast.fail('这是第一页')
			// 				return
			// 			}
			// 			this.index -= 1;
			// 		} else if (type == 'down') {
			// 			if (this.index == this.czlist.length-1) {
			// 				Toast.fail('这是最后一页')
			// 				return
			// 			}
			// 			this.index += 1;
			// 		}
			// 		this.$refs.swiper.swipeTo(this.index);
			// 	}else if(this.num==2){
			// 		if (type == 'up') {
			// 			if (this.index == 0) {
			// 				Toast.fail('这是第一页')
			// 				return
			// 			}
			// 			this.index -= 1;
			// 		} else if (type == 'down') {
			// 			if (this.index == this.bklist.length-1) {
			// 				Toast.fail('这是最后一页')
			// 				return
			// 			}
			// 			this.index += 1;
			// 		}
			// 		this.$refs.swiper1.swipeTo(this.index);
			// 	}else if(this.num==3){
			// 		if (type == 'up') {
			// 			if (this.index == 0) {
			// 				Toast.fail('这是第一页')
			// 				return
			// 			}
			// 			this.index -= 1;
			// 		} else if (type == 'down') {
			// 			if (this.index == this.smlist.length-1) {
			// 				Toast.fail('这是最后一页')
			// 				return
			// 			}
			// 			this.index += 1;
			// 		}
			// 		this.$refs.swiper2.swipeTo(this.index);
			// 	}else if(this.num==4){
			// 		if (type == 'up') {
			// 			if (this.index == 0) {
			// 				Toast.fail('这是第一页')
			// 				return
			// 			}
			// 			this.index -= 1;
			// 		} else if (type == 'down') {
			// 			if (this.index == this.yclist.length-1) {
			// 				Toast.fail('这是最后一页')
			// 				return
			// 			}
			// 			this.index += 1;
			// 		}
			// 		this.$refs.swiper3.swipeTo(this.index);
			// 	}
				
			// },


		}
	}
</script>
<style>
	page{
		height: 100%;
		background-color:#242225;
	}
</style>
<style lang="scss" scoped>
	.main {
		width: 100%;
		background-color: #fff;

		
		.show {
			width: 562upx;
			margin: 60upx auto;
			image {
				width: 562upx;
				height: 1215upx;
				margin: 0 auto;
			}
		
			
		}


	}
</style>
