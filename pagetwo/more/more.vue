<template>
	<view class="main">
		
		<view class="show">
			<view class="one">
				<view class="onetap">
					<navigator url="../contact_kf/contact_kf?backid=0"  hover-class="none">
					<view class="onetapmont">
						<image src="../../static/tabBarimg/k9.png" style='width:57upx;height:46upx;'></image>
						<view class="onetapmonttxt">合作加盟</view>
					</view>
					</navigator>
					<navigator url="../appointment_installation/appointment_installation"  hover-class="none">
					<view class="onetapmont">
						<image src="../../static/tabBarimg/k10.png" style='width:50upx;height:47upx;'></image>
						<view class="onetapmonttxt">站点报装</view>
					</view>
					</navigator>
				</view>
				<view class="onetap">
					<view class="onetapmont" @click="gouser">
						<image src="../../static/tabBarimg/k11.png" style='width:52upx;height:53upx;'></image>
						<view class="onetapmonttxt">个人资料</view>
					</view>
					<navigator url="../refund_details/refund_details" hover-class="none">
					<view class="onetapmont" >
						<image src="../../static/tabBarimg/k17.png" style='width:46upx;height:50upx;'></image>
						<view class="onetapmonttxt">退款记录</view>
					</view>
					</navigator>
				</view>
				<view class="onetap">
					<navigator url="../recharge_record/recharge_record" hover-class="none">
					<view class="onetapmont">
						<image src="../../static/tabBarimg/k13.png" style='width:54upx;height:54upx;'></image>
						<view class="onetapmonttxt">充值记录</view>
					</view>
					</navigator>
					<navigator url="../records_consumption/records_consumption" hover-class="none">
					<view class="onetapmont">
						<image src="../../static/tabBarimg/k14.png" style='width:48upx;height:51upx;'></image>
						<view class="onetapmonttxt">消费记录</view>
					</view>
					</navigator>
				</view>
				<view class="onetap">
					<navigator url="../notice_notice/notice_notice" hover-class="none">
					<view class="onetapmont">
						<image src="../../static/tabBarimg/k15.png" style='width:50upx;height:47upx;'></image>
						<view class="onetapmonttxt">通知公告</view>
					</view>
					</navigator>
					<navigator url="../about_us/about_us" hover-class="none">
					<view class="onetapmont">
						<image src="../../static/tabBarimg/k16.png" style='width:52upx;height:52upx;'></image>
						<view class="onetapmonttxt">关于我们</view>
					</view>
					</navigator>
				</view>
				<view class="onetap">
					<navigator url="../apply_refund/apply_refund" hover-class="none">
					<view class="onetapmont" v-show="winthdrawal==1">
						<image src="../../static/tabBarimg/k12.png" style='width:57upx;height:53upx;'></image>
						<view class="onetapmonttxt">申请退款</view>
					</view>
					</navigator>
					<navigator url="../my_guarantee/my_guarantee" hover-class="none">
					<view class="onetapmont">
						<image src="../../static/tabBarimg/bzlog.png" style='width:48upx;height:52upx;'></image>
						<view class="onetapmonttxt">我的保障</view>
					</view>
					</navigator>
				</view>
				
			</view>
			
			
			
		</view>
		
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	export default {
		components: {
		},
		mounted() {
		},
		data() {
			return {
				winthdrawal:0,//申请退款权限
				backid:'',
			}
		},
		onLoad(option) {
			this.backid=option.backid

		},
		onShow() {
			this.winthdrawal=uni.getStorageSync('user').winthdrawal
		},
		methods: {
			back(){
				uni.navigateBack()
			},
			gouser(){
				uni.redirectTo({
					url: '../personal_data/personal_data?ktype=' + 1+'&zt='+1 
				});
			},
			//返回上一页
			blackbtn() {
				if(this.backid==0){
					uni.navigateBack()
				}else{
					uni.redirectTo({
						url: '../index/index'
					})
				}
				
			},

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
		.show {
			.one{
				width: 100%;
				box-sizing: border-box;
				padding: 0 50upx;
				margin-top: 81upx;
				.onetap{
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin-bottom: 40upx;
					.onetapmont{
						width: 300upx;
						height: 120upx;
						background: #FFDFCE;
						border-radius: 24upx;
						display: flex;
						align-items: center;
						justify-content: center;
						box-sizing: border-box;
						
						.onetapmonttxt{
							font-size: 28upx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #242225;
						}
						image{
							margin-right: 24upx;
						}
					}
				}
			}
			


			
		}
		
	}
</style>
