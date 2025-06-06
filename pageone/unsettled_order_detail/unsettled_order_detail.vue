<template>
	<view class="main">
		<view class="hand">
			<image src="../../static/tabBarimg/dbleft.png" @click="blackbtn"></image>
		</view>
		<view class="show">
			<van-notice-bar :scrollable="true" left-icon="volume-o" color='#FFFFFF'>
				温馨提示：如遇超期未结算订单 由于网络原因未结算，可手动点击【结束充电】按钮结算
			</van-notice-bar>
			<view class="showtap">
				<image src="../../static/tabBarimg/cdshow.png"></image>
			</view>
		</view>
		<view class="showfoot">
			<view class="sffirst">
				<view class="sfone">
					<view class="sfoneleft" v-show="ctype==0">充电桩编号：{{showlist.code}}</view>
					<view class="sfoneleft" v-show="ctype==1">充电柜编号：{{showlist.code}}</view>
					<view class="sfoneright" v-show="closetype==0">充电中</view>
					<view class="sfoneright" v-show="closetype==1">未结算</view>
				</view>
				<view class="sftwo">充电小区：{{showlist.projectName}}</view>
				<view class="sftwo">充电区名：{{showlist.areaName}}</view>
				<view class="sftwo">充电端口：{{showlist.port}}</view>
				<view class="sftwo" v-show="ctype==0">充电桩编号：{{showlist.code}}</view>
				<view class="sftwo" v-show="ctype==1">充电柜编号：{{showlist.code}}</view>
				<view class="sftwo">充电功率：{{showlist.maxPower}}</view>
				<view class="sftwo">起始时间：{{showlist.startTime}}</view>
				<view :class="ptype=='0'?'sftwo':'sftwo1'" v-show="ctype==1&&showlist.password!='订单异常无法显示密码'&&showlist.password!='扫码临时需点击开门显示密码'" @click="ptbtn">开柜密码：{{showlist.password}}</view>
			</view>
			<view class="sfthree" @click="close(3)" v-show="ctype==0">
				结束充电
			</view>
			<view class="sffour" v-show="ctype==1">
				<view class="sffourone" v-show="closetype==0">
					<!-- <view class="sfleft" @click="close(1)">结束充电</view> -->
					<view class="sfright" @click="close(0)">打开柜门</view>
				</view>
				<view class="sffourtwo" v-show="closetype==1">
					<!-- <view class="sfleft">结束充电</view> -->
					<view class="sfright" @click="close(0)">打开柜门</view>
				</view>
			</view>
		</view>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	// import uCharts from '../../components/u-charts/u-charts.js';
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	var _self;
	var canvaLineA = null;
	export default {
		components: {
			
		},
		mounted() {
			document.querySelector('body').setAttribute('style', 'background-color: #242225;')
		},

		data() {
			return {
				id: '', //消费表id
				showlist: {}, //充电详情
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				activeNames2: [''],
				closetype: 0,
				ctype: 0, //0充电桩  1充电柜
				ptype:0,
			}
		},
		onLoad(option) {
			this.ctype = option.codetype
			this.closetype=option.isCharge
			
			_self = this;
			this.cWidth = uni.upx2px(686);
			this.cHeight = uni.upx2px(500);
			
			if (option.id) {
				this.id = option.id
				this.show();
			} else {
				this.id = ''
			}
		},
		methods: {
			//返回上一页
			blackbtn() {
				uni.navigateBack()
			},
			//初始化数据充电中详情
			show() {

				this.$base.request('charging' + '/' + this.id, 'GET')
					.then(res => {
						this.showlist = res.data.data
					})
					.catch(err => {

					})
			},
			//结束充电
			close(endType) {
				if (endType == 0) {
					let _this=this
					let data1={
						url:location.href.split('#')[0],
						appid:uni.getStorageSync('user').appid
					}
					_this.$base.request('configs', 'GET',data1)
						.then(res => {
							if(res.data.code=='200'){
								var timestamp = res.data.data.timestamp;;
								var noncestr = res.data.data.noncestr;
								var signature = res.data.data.signature;
								var appId=res.data.data.appid;
								wx.config({
									debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
									//debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
											var device=str.substring(str.length-11,str.length-3);
											if(_this.upperCase(device)==_this.showlist.deviceId){
												let data = {
													endType: endType
												}
												Dialog.confirm({
													title: '提示',
													message: '确认结束充电，打开柜门取电池？'
												}).then(() => {
													_this.$base.request('charging/stop' + '/' + _this.id, 'PUT', data)
														.then(res => {
															if (res.data.code == 200) {
																var data=res.data.data
																if (data){
																	Dialog.confirm({
																		title: '提示',
																		message: '请支付'+data.waitPay+'元占位费'
																	}).then(() => {
																		_this.pay(_this.showlist.orderNum)
																		
																	}).catch(() => {
																		
																	});
																	
																}else{
																	uni.showLoading({
																		title: '请稍候',
																		mask: true
																	})
																	let timer = 7
																	let auth_timer = setInterval(() => { //定时器设置每秒递减
																		timer--; //递减时间
																		if (timer <= 0) {
																			clearInterval(auth_timer)
																			uni.hideLoading()
																			Dialog.alert({
																			  message: '因网络原因,若柜门未打开,请前往消费列表查看开柜密码,使用密码打开',
																			}).then(() => {
																			  uni.navigateBack()
																			});
																			
																		}else{
																			_this.$base.request('charging' + '/' + _this.id, 'GET')
																				.then(res => {
																					if(res.data.data.isSettlement==1){
																						clearInterval(auth_timer)
																						uni.hideLoading()
																						_this.pwdbtn()
																					}
																				})
																				.catch(err => {
																			
																				})
																		}
																	}, 1000)
																	
																	
																	

																}
															
															} else {
																_Toast.fail(res.data.msg)
															}
																
														})
														.catch(err => {
																
														})
												}).catch(() => {
													// on cancel
												});
											}else{
												_Toast.fail('请扫描订单对应的设备二维码')
												return
											}
											
										}
									});
								});
							}else{
								_Toast.fail(res.data.msg)
								return
							}
							
						})
						.catch(err => {
					
						})
					
					
				} else {
					let data = {
						endType: endType
					}
					Dialog.confirm({
						title: '提示',
						message: '确认结束充电吗？'
					}).then(() => {
						this.$base.request('charging/stop' + '/' + this.id, 'PUT', data)
							.then(res => {
								if (res.data.code == 200) {
									Toast.success('结束成功')
									this.show();
									this.closetype = 1
				
				
								} else {
									Toast.fail(res.data.msg)
								}
				
							})
							.catch(err => {
				
							})
					}).catch(() => {
						// on cancel
					});
				}

			},
			
			//支付充电柜补差价支付
			pay(orderNum){
				let data={
					orderNum:orderNum,
				}
				uni.showLoading({
					title: '请稍候',
					mask: true
				})
				this.$base.request('order/temsave1', 'POST', data)
					.then(res => {
						uni.hideLoading()
						if (res.data.code == 200) {
							let arr = res.data.data
							let _this = this
				
							function onBridgeReady() {
								WeixinJSBridge.invoke(
									'getBrandWCPayRequest', {
										"appId": arr.appId, //公众号名称，由商户传入
										"timeStamp": arr.timeStamp, //时间戳，自1970年以来的秒数     
										"nonceStr": arr.nonceStr, //随机串     
										"package": arr.wpackage,
										"signType": arr.signType, //微信签名方式：     
										"paySign": arr.paySign //微信签名 
									},
									function(res) {
										if (res.err_msg == "get_brand_wcpay_request:ok") {
											uni.showLoading({
												title: '请稍候',
												mask: true
											})
											let timer = 7
											let auth_timer = setInterval(() => { //定时器设置每秒递减
												timer--; //递减时间
												if (timer <= 0) {
													clearInterval(auth_timer)
													uni.hideLoading()
													Dialog.alert({
													  message: '因网络原因,若柜门未打开,请前往消费列表查看开柜密码,使用密码打开',
													}).then(() => {
													  uni.navigateBack()
													});
													
												}else{
													_this.$base.request('charging' + '/' + _this.id, 'GET')
														.then(res => {
															if(res.data.data.isSettlement==1){
																clearInterval(auth_timer)
																uni.hideLoading()
																_this.pwdbtn()
															}
														})
														.catch(err => {
													
														})
												}
											}, 1000)
											
										
											// 使用以上方式判断前端返回,微信团队郑重提示：
											//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
										}
									});
							}
							if (typeof WeixinJSBridge == "undefined") {
								if (document.addEventListener) {
									document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
								} else if (document.attachEvent) {
									document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
									document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
								}
							} else {
								onBridgeReady();
							}
						} else {
							Toast.fail(res.data.msg)
						}
				
					})
					.catch(err => {
				
					})
			},
			// 将字符串的字符全部转换为大写字符
		   upperCase(str) {
				let arr = str.split("");
				let newStr = "";
				// 通过数组的forEach方法来遍历数组
				arr.forEach(function (value) {
					if (value >= 'a' && value <= 'z')
						newStr += value.toUpperCase();
					else
						newStr += value;
				});
				return newStr;
			},
			getServerData() {
				let LineA = _self.chartData
				_self.showLineA("canvasLineA", LineA);
			},
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: {
						show: false
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8,
						disableGrid: false,
						labelCount: 4
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						min: 10,
						max: 180,
						format: (val) => {
							return val.toFixed(0)
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});

			},
			touchLineA(e) {
				var that = this
				let legendIndex = canvaLineA.getCurrentDataIndex(e)
				canvaLineA.showToolTip(e, {
					textList: [{
						text: '功率:'
					}, {
						text: '电压:'
					}, {
						text: '端口温度:'
					}, {
						text: '时间:'
					}],
					format: function(item, category) {
						var tap = that.hat.series[0]
						if (tap.portTemperature[legendIndex] != '无') {
							this.textList = [{
									text: '功率 : ' + tap.power[legendIndex] + 'W'
								}, {
									text: '电压 : ' + tap.voltage[legendIndex] + 'V'
								},
								{
									text: '端口温度 : ' + tap.portTemperature[legendIndex] + '度'
								}, {
									text: '时间 : ' + tap.time[legendIndex]
								}
							]
						} else {
							this.textList = [{
									text: '功率 : ' + tap.power[legendIndex] + 'W'
								}, {
									text: '电压 : ' + tap.voltage[legendIndex] + 'V'
								},
								{
									text: '端口温度 : ' + tap.portTemperature[legendIndex]
								}, {
									text: '时间 : ' + tap.time[legendIndex]
								}
							]
						}

					}
				});
			},
			zxbtn(id) {
				if (this.activeNames2 != 'a') {
					uni.showLoading({
						title: '请稍候'
					})
					this.$base.request1('powerCurve' + '/' + id, 'GET')
						.then(res => {
							if (res.data.code == 200) {
								uni.hideLoading()
								var arr = res.data.data.powerArr
								var arr1 = []
								var power = [] //功率（单位0.1瓦）
								var voltage = [] //电压
								var temperature = [] //环境温度
								var portTemperature = [] //端口温度
								var time = [] //时间
								for (var i = 0; i < arr.length; i++) {
									var disLength = arr[i].time.length;
									var shortName = arr[i].time.substring(disLength - 8, disLength);

									arr1.push(shortName)
									power.push(arr[i].power / 10)
									voltage.push(arr[i].voltage / 10)
									temperature.push(arr[i].temperature)
									portTemperature.push(arr[i].portTemperature)
									time.push(arr[i].time)
								}
								var map1 = {}
								map1['name'] = ''
								map1['data'] = power
								map1['power'] = power
								map1['voltage'] = voltage
								map1['temperature'] = temperature
								map1['portTemperature'] = portTemperature
								map1['time'] = time
								var arr3 = []
								arr3.push(map1)
								var map2 = {}
								map2['categories'] = arr1
								map2['series'] = arr3
								this.typeshow = 1
								this.hat = map2
								_self.showLineA('canvasLineA', map2);
							} else {
								this.typeshow = 2
								this.showtxt = res.data.msg
							}

						})
						.catch(err => {

						})
				}

			},
			//获取开柜密码
			pwdbtn(){
				let data={
					id:this.showlist.id
				}
				this.$base.request('consumeRecord/cccupy/password', 'GET',data)
					.then(res => {
						if(res.data.code==200){
							if(res.data.msg){
								Dialog.alert({
									title: '提示',
									message: '柜门已打开,请取出电池,如因网络原因未打开柜门，请使用密码:'+res.data.msg+'手动打开',
								}).then(() => {
									uni.navigateBack()
								})
							}else{
								Dialog.alert({
								  title: '提示',
								  message: '柜门已打开,请取出电池,如因网络原因未打开柜门,请前往消费列表查看开柜密码,使用密码打开',
								}).then(() => {
								  uni.navigateBack()
								});
							}
						}else{
							Dialog.alert({
							  title: '提示',
							  message: '柜门已打开,请取出电池,如因网络原因未打开柜门,请前往消费列表查看开柜密码,使用密码打开',
							}).then(() => {
							  uni.navigateBack()
							});
						}
					})
					.catch(err => {
				
					})
				
			},
			ptbtn(){
				if(this.ptype==0){
					this.ptype=1
				}else{
					this.ptype=0
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 100%;
		overflow-x: hidden;

		.qiun-charts {
			width: 686upx;
			height: 500upx;
			background-color: #FFFFFF;
			// overflow-x: hidden;
		}

		.charts {
			width: 686upx;
			height: 500upx;
			background-color: #FFFFFF;
		}

		.hand {
			width: 100%;
			background-color: #242225;
			height: 62upx;
			font-size: 30upx;
			font-family: PingFang SC Bold, PingFang SC Bold-Bold;
			font-weight: 700;
			text-align: center;
			line-height: 62upx;
			color: #ffffff;
			position: relative;

			image {
				width: 22upx;
				height: 39upx;
				position: absolute;
				left: 31upx;
				top: 11upx;
			}
		}

		.show {
			width: 100%;
			margin: 20upx 0;
			/deep/.van-notice-bar{
				width: 650upx;
				height: 70upx;
				background: #343136;
				border-radius: 24upx;
				padding: 0 24upx;
				margin: 0 auto;
			}
			.showtap{
				width: 100%;
				background-color: #242225;
				text-align: center;
				box-sizing: border-box;
				padding-right: 50upx;
				image{
					width: 312upx;
					height: 290upx;
				}
				
			}
		}

		.showfoot {
			width: 100%;
			box-sizing: border-box;
			padding: 0 40upx;
		
			.sffirst {
				background-color: #3C393E;
				border-radius: 24px;
				padding-bottom: 30upx;
				.sfone {
					display: flex;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 30upx 26upx;
					background-color: #343136;
					border-radius: 24px 24px 0 0;
					
					.sfoneleft {
						font-size: 28upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
					}
		
					.sfoneright {
						font-size: 26upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFA02E;
					}
				}
		
				.sftwo {
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					margin-top: 13upx;
					margin-left: 26upx;
				}
				.sftwo1 {
					font-size: 40upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					margin-top: 13upx;
					margin-left: 26upx;
				}
			}
		
		
			.sttwo {
				margin-top: 20upx;
		
				/deep/.van-cell {
					padding: 10upx 15upx;
					font-size: 24upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #666666;
				}
		
				/deep/.van-collapse-item__content {
					padding: 0upx;
				}
		
				.hmtxt {
					font-size: 24upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #666666;
				}
		
				.flone {
					text-align: center;
					line-height: 150upx;
					font-size: 30upx;
				}
			}
		
			.tap {
				width: 649upx;
				height: 300upx;
				border-radius: 16upx;
				margin: 40upx auto;
				margin-bottom: 50upx;
				image {
					width: 649upx;
					height: 240upx;
					border-radius: 16upx;
				}
			}
		
			.sfthree {
				width: 100%;
				height: 88upx;
				border-radius: 16upx;
				background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
				font-size: 32upx;
				font-family: PingFang SC Medium, PingFang SC Medium-Medium;
				font-weight: 500;
				text-align: center;
				color: #ffffff;
				line-height: 88upx;
				margin: 176upx auto;
			}
		
			.sffour {
				.sffourone {
					width: 100%;
					display: flex;
					justify-content: center;
		
					.sfleft {
						width: 45%;
						height: 88upx;
						border-radius: 16upx;
						background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
						font-size: 32upx;
						font-family: PingFang SC Medium, PingFang SC Medium-Medium;
						font-weight: 500;
						text-align: center;
						color: #ffffff;
						line-height: 88upx;
						margin: 20upx auto;
					}
		
					.sfright {
						width: 95%;
						height: 88upx;
						border-radius: 16upx;
						background: linear-gradient(180deg, #FFE175 0%, #FF9D07 100%);
						font-size: 32upx;
						font-family: PingFang SC Medium, PingFang SC Medium-Medium;
						font-weight: 500;
						text-align: center;
						color: #ffffff;
						line-height: 88upx;
						margin: 20upx auto;
					}
				}
		
				.sffourtwo {
					width: 100%;
					display: flex;
					justify-content: center;
		
					.sfleft {
						width: 45%;
						height: 88upx;
						border-radius: 16upx;
						background-color: #8d8d8d;
						font-size: 32upx;
						font-family: PingFang SC Medium, PingFang SC Medium-Medium;
						font-weight: 500;
						text-align: center;
						color: #ffffff;
						line-height: 88upx;
						margin: 20upx auto;
					}
		
					.sfright {
						width: 95%;
						height: 88upx;
						border-radius: 16upx;
						background: linear-gradient(180deg, #FFE175 0%, #FF9D07 100%);
						font-size: 32upx;
						font-family: PingFang SC Medium, PingFang SC Medium-Medium;
						font-weight: 500;
						text-align: center;
						color: #ffffff;
						line-height: 88upx;
						margin: 20upx auto;
					}
				}
		
			}
		}

	}
</style>
