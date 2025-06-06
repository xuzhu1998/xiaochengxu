<template>
	<view class="main">
		<view class="hand">
			<image src="../../static/tabBarimg/dbleft.png" @click="blackbtn"></image>
			扫码开门
		</view>
		<view class="show">
			<view class="one">
				设备编号：{{deviceId}}
				<view v-show="showtype==0"><image src="../../static/tabBarimg/tcby2.png"></image></view>
				<view v-show="showtype==1"><image src="../../static/tabBarimg/tcby.png"></image></view>
				<view v-show="showtype==2"><image src="../../static/tabBarimg/tcby1.png"></image></view>
				<view v-show="showtype==1">开门成功 !</view>
				<view v-show="showtype==2">开门失败 !</view>
				<view v-show="showtype==2">请重新扫码 !</view>
			</view>
			<view class="two" v-show="showtype==1||showtype==2">
				<view class="twosecond" @click="goindex">返回首页</view>
				<view class="twofirst" v-show="showtype==1" @click="smbtn">扫码充电</view>
				<view class="twofirst" v-show="showtype==2" @click="smbtn">重新扫码</view>
			</view>
			
			<view class="saoma" @click="open" v-show="showtype==0">点击开门</view>
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
			document.querySelector('body').setAttribute('style', 'background-color: #242225;')
		},
		data() {
			return {
				deviceId:'',
				showtype:0,//0未扫码 1成功  2失败
			}
		},
		onLoad(option) {
			this.deviceId=option.deviceId
			
		},
		onShow() {
			
		},
		methods: {
			blackbtn(){
				uni.redirectTo({
					url: '../smcharging/smcharging'
				})
			},
			open(){
				let data={
					deviceId:this.deviceId
				}
				uni.showLoading({
					title: '请稍候',
					mask: true
				})
				this.$base.request('parking/parkingUserPackage', 'GET', data)
					.then(res => {
						uni.hideLoading()
						if(res.data.code==200){
							this.showtype=1
						}else if(res.data.code==-1){
							Dialog.confirm({
								title: '提示',
								message: "您尚未购买停车包月套餐，点击确认前往购买",
								messageAlign:'left'
							}).then(() => {
								uni.navigateTo({
									url: '../account_recharge/account_recharge?tctype=' + 4
								});
							}).catch(() => {
								// on cancel
							});
							this.showtype=2
						}else {
							Toast.fail(res.data.msg)
							this.showtype=2
						}
						
					})
					.catch(err => {
				
					})
			},
			goindex(){
				uni.redirectTo({
					url: '../smcharging/smcharging'
				})
			},
			smbtn(){
				
				let _this = this;
				let data={
					url:location.href.split('#')[0],
					appid:uni.getStorageSync('user').appid
				}
				_this.$base.request('configs', 'GET',data)
					.then(res => {
						if(res.data.code=='200'){
							var timestamp = res.data.data.timestamp;;
							var noncestr = res.data.data.noncestr;
							var signature = res.data.data.signature;
							var appId=res.data.data.appid;
							wx.config({
								debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
								// debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
								appId : appId, // 必填，公众号的唯一标识
								timestamp : timestamp, // 必填，生成签名的时间戳
								nonceStr : noncestr, // 必填，生成签名的随机串
								signature :signature,// 必填，签名，见附录1
								jsApiList: ['scanQRCode',] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							});
							
							wx.ready(function() {
								wx.scanQRCode({
									needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
									scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
									success: function (res1) {
										var str=res1.resultStr
										var mjcode=str.substring(str.length-1,str.length)
										if(mjcode=='M'){
											var device=str.substring(str.length-14,str.length-2);
											uni.navigateTo({
												url: '../door_prohibit/door_prohibit?deviceId=' + device
											})
										}else{
											var device=str.substring(str.length-11,str.length-3);
											var port =str.substring(str.length-2,str.length);
											var ss='';
											
											if(port!='ff'&&port!='FF'){
												ss=_this.pad(parseInt(port,16).toString(10),2);
												// ss=_this.pad(port,2);
											}else{
												ss=port;
											};
											if (device && ss) {
												clearTimeout(_this.timeId)
												uni.navigateTo({
													url: '../poweron/poweron?device=' + device + '&port=' + ss + '&cmd=' + 0 + '&from=' + 2
												})
											}
										}
										
									}
								});
							});
						}else{
							Toast.fail(res.data.msg)
							return
						}
						
					})
					.catch(err => {
				
					})
			},
			
			pad(num, n) {
			  var len = num.toString().length;
			  while(len < n) {
			    num = "0" + num;
			    len++;
			  }
			  return num;
			},
			

		}
	}
</script>

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
				margin: 200upx 0;
				width: 100&;
				text-align: center;
				color: #ffffff;
				font-weight: 700;
				font-size: 30upx;
				image{
					width: 400upx;
					height: 400upx;
					margin-top: 140upx;
				}
			}
			.two{
				width: 100%;
				display: flex;
				justify-content: center;
				.twofirst{
					width: 200upx;
					height: 60upx;
					background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
					border-radius: 36upx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 700;
					color: #FFFFFF;
					border: 2upx solid #FF752B;
					margin-left: 50upx;
				}
				.twosecond{
					width: 200upx;
					height: 60upx;
					border-radius: 36upx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 700;
					color: #FFA73E;
					border: 2upx solid #FFA73E;
				}
				
			}
			.saoma{
				width: 400upx;
				height: 70upx;
				margin: 0 auto;
				background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
				border-radius: 36upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 700;
				color: #FFFFFF;
				
				
			}
			


			
		}
		
	}
</style>
