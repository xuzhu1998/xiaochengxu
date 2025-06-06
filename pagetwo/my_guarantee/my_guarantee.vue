<template>
	<view class="main">
		
		<view class="show">
			<image src="../../static/tabBarimg/bxlog.png" @click="gobtn"></image>
		</view>
		
		<view class="show" v-show="has==1">
			<image src="../../static/tabBarimg/cdshvip.png" @click="govipbtn"></image>
		</view>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	export default {
		components: {},
		mounted() {
		},

		data() {
			return {
				has:'',//0不显示 1显示
				
			}
		},
		onLoad(option) {
		},
		onShow() {
			this.show()
		},
		methods: {
			show(){
				var data = {
					token:uni.getStorageSync('userToken')
				}
				this.$base.request('charge/searchSafeMonth', 'GET', data)
					.then(res => {
						if (res.data.code == 200) {
							this.has=res.data.data.has
						} else {
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {
				
					})
			},
			gobtn(){
				uni.navigateTo({
					url:'/pagetwo/guard_record/guard_record'
				})
			},
			govipbtn(){
				uni.navigateTo({
					url:'/pagetwo/guard_vip/guard_vip'
				})
			}
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
		overflow-x: hidden;
		background-color: #242225;
		.hand{
			text-size-adjust: 100% !important;
			-webkit-text-size-adjust: 100% !important;  
			-moz-text-size-adjust: 100% !important;
			width: 100%;
			background-color: #242225;
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
		.show{
			width: 100%;
			text-align: center;
			margin-top: 65upx;
			image{
				width: 650upx;
				height: 187upx;
				border-radius: 40upx;
			}
		}
		
		
		
	}
</style>
