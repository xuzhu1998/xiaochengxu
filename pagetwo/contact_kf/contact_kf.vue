<template>
	<view class="main">
		<!-- <view class="hand">
			<image src="../../static/tabBarimg/dbleft.png" @click="blackbtn"></image>
			合作加盟
		</view> -->
		<view class="show">
			<view :class="list.loshow=='0'?'imglogo':'imglogo1'">
				<image :src="list.logo"></image>
			</view>
			<view class="sone">
				{{list.content}}
			</view>
			
				<view class="stwo" @click="callphone">
					联系客服
				</view>
		
			
			<!-- <view class="sthree" @click="gobtn" v-show="type==2||type==3||type==4">
				进入管理端
			</view> -->
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
				type:'',//用户身份
				list:{},
				backid:''
				
			}
		},
		onLoad(option) {
			this.backid=option.backid
		},
		onShow() {
			var logolist = 'logolist_' + uni.getStorageSync('userId')
			this.list=uni.getStorageSync(logolist)
			this.type=uni.getStorageSync('user').type
		},
		methods: {
			
			gobtn(){
				uni.navigateTo({
					   url: '../operator_management/operator_management?backid=0'
				});
			},
			//返回上一页
			blackbtn() {
				if(this.backid==0){
					uni.navigateBack()
				}else{
					uni.redirectTo({
						url: '../more/more'
					})
				}
				
			},
			callphone(){
				if(this.list){
					uni.makePhoneCall({
						phoneNumber: this.list.phone.toString()
					}).catch((e) => {
						// console.log(e)  //用catch(e)来捕获错误{makePhoneCall:fail cancel}
					})
				}else{
					Toast.fail('暂未配置电话')
					return
				}
				
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
			width: 686upx;
			margin: 0 auto;
			background-color: #242225;
			margin-top: 127upx;
			padding-bottom: 62upx;
			.sone{
				width: 100%;
				box-sizing: border-box;
				font-size: 30upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				padding: 60upx 25upx 0upx 38upx ;
				line-height: 50upx;
				.phone{
					border-bottom: 1upx solid #FF752B;
					padding-bottom: 2upx;
					color: #FF752B;
					box-sizing: border-box;
				}
			}
			.stwo{
				width: 635upx;
				padding: 20upx 0;
				border-radius: 24upx;
				margin: 0 auto;
				background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
				font-size: 32upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				text-align: center;
				color: #ffffff;
				margin-top: 68upx;
				
			}
			.sthree{
				width: 314upx;
				padding: 15upx 0;
				opacity: 0.53;
				border-radius: 24upx;
				background-color: #FFA73E;
				margin: 0 auto;
				font-size: 28upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				text-align: center;
				color: #f5f5f5;
				margin-top: 62upx;
			}
			.imglogo{
				width: 432upx;
				margin: 0 auto;
				image{
					width: 432upx;
					height: 129upx;
					
				}
			}
			.imglogo1{
				width: 300upx;
				margin: 0 auto;
				image{
					width: 300upx;
					height: 300upx;
					
				}
			}
		}
		
	}
</style>
