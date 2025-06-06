<template>
	<view class="main">
		<view class="show">
			<view class="sone">
				<input placeholder="输入设备的编号" type="number" maxlength="10" v-model="sbnum" />
				<view class="sonebtn" @click="handbtn">
					<!-- <image src="../../static/tabBarimg/sbright.png"></image> -->
					确 认
				</view>
			</view>
			<view class="stwo">
				<view class="kfour">
					<view class="kfourfoot">
						<view class="add-img-box">
							<view class="add-img-item" v-for="(item,index) in imgArr" :key="index">
								<image class="add-img" :src="item" @click="lookImg(index)"></image>
								<image class="add-img-del" @click="delImg(index)" src="../../static/tabBarimg/delete.png"></image>
							</view>

							<view v-if="imgArr.length < 1 " class="add-img-item1" @click="getImg">
								<image class="add-img1" src="../../static/tabBarimg/add.png"></image>
							</view>
						</view>
						<view class="kfourtxt" v-show="stype==0">
							请选择远程充电设备的图片
						</view>
						<view class="kfourtxt" v-show="stype==1">
							请长按识别二维码
						</view>
					</view>


				</view>
			</view>
			<view class="sthree">
				<view class="sthreehand">
					远程充电说明:
				</view>
				<view class="sthreez">
					1.请输入所插入充电器的设备编号进行远程充电； <br />
					2.请上传拍照插入充电器的设备二维码或者拍照当前插入充电器的设备二维码图片进行自动识别远程充电，请注意上传或拍照的图片清晰和完整；<br />
					3.充电过程中如遇到异常问题，请联系当前小区的运营商进行协调；<br />
					<!-- 4.如有疑问请拨打全国客服电话<span style="color: #EF87D6;">400 888 0292</span> -->
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

				sbnum: '', //设备编号
				timeId: 0,
				imgArr: [],
				stype:'0',
				typea:2,
				checked1:false
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {


			//删除图片
			delImg(i) {
				this.imgArr=[]
				this.stype=0
			},

			getImg: function() {
				// 检查登录状态
				const userToken = uni.getStorageSync('userToken');
				if (!userToken) {
					this.$base.handleLoginRequired('charge');
					return;
				}

				// uni.chooseImage({
				// 	count: 9,
				// 	// sizeType压缩图片
				// 	sizeType: "compressed",
				// 	success: (res) => {
				// 		this.imgArr = res.tempFilePaths
				// 		qrcode.decode(res.tempFilePaths[0]);

				// 		qrcode.callback = (info) => {

				// 			let err = info.substring(0, 5)
				// 			if (err == 'error') {
				// 				this.imgSrc=res.tempFilePaths[0]
				// 				this.stype=1
				// 				return false
				// 			}

				// 			let cc = info.split('/')
				// 			let device = cc[cc.length - 2] //设备号
				// 			let port = cc[cc.length - 1] //端口号 FF模糊查询
				// 			var ss='';
				// 			if(port!='ff'&&port!='FF'){
				// 				ss=this.pad(parseInt(port,16).toString(10),2);
				// 			}else{
				// 				ss=port;
				// 			};
				// 			if(device.substr(-2, 1)==9){
				// 				Toast.fail('充电柜不允许远程充电')
				// 				return
				// 			}else{
				// 				uni.navigateTo({
				// 					url: '../poweron/poweron?device=' + device + '&port=' + ss + '&cmd=' + 0 + '&from=' + 2+'&yc='+'1'
				// 				})
				// 			}
				// 		}

				// 	}
				// })
				uni.scanCode({
					success: (res) => {

						let cc = res.result.split('/')
						let device = cc[cc.length - 2] //设备号
						let port = cc[cc.length - 1] //端口号 FF模糊查询
						var ss='';
						if(port!='ff'&&port!='FF'){
							ss=this.pad(parseInt(port,16).toString(10),2);
						}else{
							ss=port;
						};
						if(device.substr(-2, 1)==9){
							Toast.fail('充电柜不允许远程充电')
							return
						}else{
							uni.navigateTo({
								url: '../poweron/poweron?device=' + device + '&port=' + ss + '&cmd=' + 0 + '&from=' + 2+'&yc='+'1'
							})
						}
					},
					fail:(res)=> {
						Toast.fail('请上传或拍摄完整二维码')

					}
				})
			},
			lookImg: function(val) {
				const urls = this.imgArr
				const current = val
				uni.previewImage({
					urls,
					current
				})
			},

			//扫码进入上电页面
			gobtn() {
				uni.showLoading({
					title: '请稍候',
					mask: true
				})

				setTimeout(() => {
					const result = getQrUrl(this.imgList[0])
					result.then(res => {

						if (res.data) {
							// const url = res.data.split('/')
							// var device = url[url.length - 2]
							// var port = url[url.length - 1]
							var str=res.data
							var device=str.substring(str.length-11,str.length-3);
							var port =str.substring(str.length-2,str.length);
							var ss='';
							if(port!='ff'&&port!='FF'){
								ss=this.pad(parseInt(port,16).toString(10),2);
							}else{
								ss=port;
							};


							if (device && ss) {
								clearTimeout(this.timeId)
								uni.navigateTo({
									url: '../poweron/poweron?device=' + device + '&port=' + ss + '&cmd=' + 0 + '&from=' + 2+'&yc='+'1'
								})
							}
						}
					}).catch(err => {})
				}, 1000)
				this.timeId = setTimeout(() => { //3秒之后没推过来关闭 弹窗
					uni.hideLoading()
					Toast.fail('请上传或拍摄完整二维码')
					return
				}, 2000);

			},
			//手动输入进入上电页面
			handbtn() {
				// 检查登录状态
				const userToken = uni.getStorageSync('userToken');
				if (!userToken) {
					this.$base.handleLoginRequired('charge');
					return;
				}

				if (this.sbnum.indexOf(".") > 0) {
					Toast.fail('禁止输入小数点')
				} else if (this.sbnum.length != 10 && this.sbnum.length != 8) {
					Toast.fail('请输入正确设备号')
				} else {
					var device = this.sbnum.substring(0, 8)
					let port=''
					if(this.sbnum.length==10){
						port = Number(this.sbnum.substring(8, 10)) - 1
						var t = (port + '').length
						var s = ''
						for (var i = 0; i < 2 - t; i++) {
							s += '0';
						}
						port = s + port
						if (Number(this.sbnum.substring(8, 10)) < 1 || Number(this.sbnum.substring(8, 10)) > 16) {
							Toast.fail('设备端口号不正确')
							return
						}
						uni.navigateTo({
							url: '../poweron/poweron?device=' + device + '&port=' + port + '&cmd=' + 1 + '&from=' + 2+'&yc='+'1'
						})
					}else if(this.sbnum.length==8){
						port='00'
						uni.navigateTo({
							url: '../poweron/poweron?device=' + device + '&port=' + port + '&cmd=' + 1 + '&from=' + 3+'&yc='+'1'
						})
					}



				}
			},
			pad(num, n) {
			  var len = num.toString().length;
			  while(len < n) {
			    num = "0" + num;
			    len++;
			  }
			  return num;
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


		.show {
			width: 100%;
			margin-top: 85upx;
			margin-bottom: 41upx;
			box-sizing: border-box;
			padding: 10upx 32upx;

			.sone {
				width: 100%;
				background-color: #343136;
				display: flex;
				justify-content: space-between;
				padding:24upx 36upx;
				align-items: center;
				box-sizing: border-box;
				border-radius: 24upx;
				.sonebtn{
					width: 180upx;
					height: 68upx;
					background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
					border-radius: 24upx;
					line-height: 68upx;
					font-size: 28upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					text-align: center;
				}


				input {
					width: 502upx;
					font-size: 32upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #D0D0D0;
					padding: 11upx 0;
				}
			}

			.stwo {
				width: 100%;
				box-sizing: border-box;
				background-color: #343136;
				padding: 40upx 0;
				margin-top: 22upx;
				border-radius: 24upx;

				.kfour {
					width: 100%;
					box-sizing: border-box;
					text-align: center;

					.kfourtxt {
						font-size: 30upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #D0D0D0;
						margin-top: 24upx;
					}

					.montbtn {
						width: 100upx;
						height: 62upx;
						border-radius: 10upx;
						background-color: #4B98ED;
						color: #FFFFFF;
						line-height: 62upx;
						text-align: center;
						margin: 10 auto;
					}

					.add-img-box {
						display: flex;
						// width: 750rpx;
						//padding: 0 40rpx;
						flex-direction: row;
						flex-wrap: wrap;
					}

					.add-img-item {
						width: 156upx;
						height: 156upx;
						border-radius: 16upx;
						position: relative;
						padding: 9rpx 0;
						margin: 0 auto;
					}

					.add-img-camera {
						flex: 1;
					}

					.add-img {
						width: 156upx;
						height: 156upx;
						border-radius: 16upx;
					}
					.add-img-item1 {
						width: 156upx;
						height: 156upx;
						border-radius: 16upx;
						position: relative;
						padding: 9rpx 0;
						margin: 0 auto;
					}

					.add-img1 {
						width: 156upx;
						height: 156upx;
						border-radius: 16upx;
					}

					.add-img-del {
						position: absolute;
						width: 40rpx;
						height: 40rpx;
						right: -14upx;
						top: -6upx;
						border-radius: 20rpx;
					}

					.address-time {
						width: 484rpx;
						height: 88rpx;
						background-color: rgba(245, 245, 245, 1);
						opacity: 1;
						border-radius: 24rpx;
						text-align: center;

						font-size: 35rpx;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					.line {
						width: 750rpx;
						height: 1px;
						transform: scaleY(0.3);
						background-color: rgba(0, 0, 0, 0.5);
					}
				}
			}

			.sthree {
				font-size: 24upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 500;
				color: #D0D0D0;
				line-height: 46upx;
				margin-top: 28upx;

				.sthreehand {
					color: #FFFFFF;
					font-weight: 700;
				}
			}
		}

	}
</style>
