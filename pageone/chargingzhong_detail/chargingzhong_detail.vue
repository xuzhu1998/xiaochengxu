<template>
	<view class="main">
		<view class="show">
			<van-notice-bar :scrollable="true" left-icon="volume-o" color='#FFFFFF'>
				温馨提示：如遇超期未结算订单 由于网络原因未结算，可手动点击<span v-if='ctype==0'>【结束充电】</span><span v-if='ctype==1'>【打开柜门】</span>按钮结算
			</van-notice-bar>
			<view class="showtap">
				<image src="../../static/tabBarimg/cdshow.png"></image>
			</view>
		</view>
		<view class="showfoot">
			<view class="sffirst">
				<view class="sfone">
					<view class="sfoneleft" v-if="ctype==0">充电桩编号：{{showlist.code}}</view>
					<view class="sfoneleft" v-if="ctype==1">充电柜编号：{{showlist.code}}</view>
					<view class="sfoneright">充电中</view>
				</view>
				<view class="sftwo">起始时间：{{showlist.startTime}}</view>
				<view class="sftwo">充电小区：{{showlist.projectName}}</view>
				<view class="sftwo">充电区名：{{showlist.areaName}}</view>
				<view class="sftwo">充电端口：{{showlist.port}}</view>
				<view class="sftwo">充电器功率：{{showlist.maxPower}}</view>
				<view class="sftwo" >充电模式：
				<span v-if="showlist.chargeType=='V1'">VIP</span>
				<span v-else-if="showlist.chargeType=='V2'">公众号VIP</span>
				<span v-else-if="showlist.chargeType=='V3'">全平台VIP</span>
				<span v-else-if="showlist.chargeType=='B5'">计量2</span>
				<span v-else>{{showlist.chargeTypeStr}}</span>
				</view>
				<view class="sftwo" v-if="showlist.chargeType=='B4'||showlist.chargeType=='C1'">是否选择充满自停：
					<span v-if='showlist.spareVar1==1'>是</span>
					<span v-else>否</span>
				</view>
				<view class="sftwo" v-if="showlist.chargeType=='B4'||showlist.chargeType=='C1'">是否选择长充模式：
					<span v-if='showlist.spareVar2==1'>是</span>
					<span v-else>否</span>
				</view>
				<view class="sftwo">最近更新时间：{{showlist.lastTime}}</view>
				<view class="sftwo" v-if="ctype==1&&showlist.password!='订单异常无法显示密码'&&showlist.password!='扫码临时需点击开门显示密码'">开柜密码：<span class='sftwo1' @click="ptbtn">{{showlist.password}}</span></view>
				<view class="sftwo" v-if="showlist.spareVar5==1">
					充电守护：<view style='color: #07C160;'>生效中</view><view style="color: #FFA02E;margin-left: 20upx;" @click='xysm'>《协议说明》</view><view class="fleftson" @click="lxkf(showlist.orderNum)" v-if="White==1">客服</view>
				</view>
			</view>
			<view class="tap" v-if="poster==1">
				<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
					<van-swipe-item v-for="(item, index) in posterList" :key="index">
						<image :src=item.img @click="gogd(item.url,item.jump,item.msg,item.libId,item.teamId)"></image>
					</van-swipe-item>
				</van-swipe>
			</view>
			<view class="sfthree" @click="close(3)" v-if="ctype==0">
				结束充电
			</view>
			<view class="sffour" v-if="ctype==1">
				<view class="sffourone" v-if="closetype==0">
					<!-- <view class="sfleft" @click="close(1)">暂停充电</view> -->
					<view class="sfright" @click="close(0)">开柜取电池</view>
				</view>
				<view class="sffourtwo" v-if="closetype==1">
					<!-- <view class="sfleft">暂停充电</view> -->
					<view class="sfright" @click="close(0)">开柜取电池</view>
				</view>
			</view>
		</view>
		<van-popup :show="ptype">
			<view class="pwdtan">
				<view class="pwdtanone">
					开柜密码
				</view>
				<view class="pwdtanone">
					{{showlist.password}}
				</view>
			</view>
		</van-popup>
		<view class="kf">
			<van-popup :show="kfshow">
				<view class="kfmap">
					<view class="one" @click="gkf">
						<image src="../../static/tabBarimg/kfclose.png"></image>
					</view>
					<view class="two">专属客服</view>
					<view class="three">您可以通过以下方式联系到我哦</view>
					<view class="four">
						<view class="fourfirst" @click="callphone" v-if="xylist.phoneStatuss==1">
							<image src="../../static/tabBarimg/kfphone.png"></image>
							电话客服
						</view>
						<view class="fourthired" v-if="xylist.imgStatuss==1&&xylist.phoneStatuss==1"></view>
						<view class="foursecond" @click="zaixian" v-if="xylist.imgStatuss==1">
							<image src="../../static/tabBarimg/kfwx.png"></image>
							在线客服
						</view>
					</view>
				</view>
			</van-popup>
			<van-popup :show="wxtcshow">
				<view class="kfmap">
					<view class="one" @click="gwx">
						<image src="../../static/tabBarimg/kfclose.png"></image>
					</view>
					<view class="five">
						<image :src='xylist.wechatImg' show-menu-by-longpress="true"></image>
					</view>
					<view class="six">
						<view>关注公众号</view>
						<view>即可享受专属客服在线咨询服务</view>
					</view>
				</view>
			</van-popup>
		</view>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	// import uCharts from '../../components/u-charts/u-charts.js';
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import {
		Config
	} from '../../common/Config.js'
	var _self;
	var canvaLineA = null;
	export default {
		components: {
			
		},
		mounted() {
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
				posterList:[],//轮播图数组
				poster:0,
				ptype:false,
				gridId:1,
				xylist:'',
				kfshow:false,
				wxtcshow:false,
				consumNo:'',
				White:0
				
			}
		},
		onReady() {
		},
		onShow() {
			if(uni.getStorageSync('user').poster==1){
				this.guanggao()
			}
			this.fetchUserInfo()
		},
		onLoad(option) {
			console.log(option,'666666')
			this.safeWhite()
			this.ctype = option.codetype
			_self = this;
			this.cWidth = uni.upx2px(686);
			this.cHeight = uni.upx2px(500);
			this.postervip=uni.getStorageSync('postervip')
			this.point=uni.getStorageSync('point')
			if (uni.getStorageSync('user').poster == 1) {
				this.projectId=option.projectId
				if(this.projectId){
					if(this.point!=0&&uni.getStorageSync('user').projectId!=0&&this.postervip==0){
						let isInArray = this.point.some(item => item.point === "chargeSuccess");
						if(isInArray==true){
							this.guanggao1()
						}
					}
				}
			}
			if (option.id) {
				this.id = option.id
				this.show();
			} else {
				this.id = ''
			}
		},
		methods: {
			fetchUserInfo() {
				var type = uni.getStorageSync('user').type
				if (type == 1) {
					this.$base.fetchData().then(res => {
						if (res.code == 200) {
							uni.setClipboardData({
								data: res.data,
								success: () => {
									uni.hideToast()
								}
							});
						}
					})
					.catch(error => {
						console.error(error);
					});
				}
				
			},
			//初始化数据充电中详情
			show() {

				this.$base.request('charging' + '/' + this.id, 'GET')
					.then(res => {
						this.showlist = res.data.data
						if(res.data.data.netState=="断网"){
							Dialog.alert({
							  title: '提示',
							  message: '充电桩已离线，如是停电原因则会停止计费（来电后自动继续充电计费）',
							}).then(() => {
							  // on close
							});
						}
					})
					.catch(err => {

					})
			},
			//结束充电
			close(endType) {
				if (endType == 3) {
					let data = {
						endType: 0
					}
					Dialog.confirm({
						title: '提示',
						message: '如充电桩在离线状态，请先拔掉充电插头（充电枪），否则会按照实际充电费率扣费，是否继续？'
					}).then(() => {
						this.$base.request('charging/stop' + '/' + this.id, 'PUT', data)
							.then(res => {
								if (res.data.code == 200) {
									Toast.success('结束成功')
									setTimeout(()=>{
										uni.switchTab({
											url: '/pages/chargingzhong/chargingzhong'
										})
									},1200)
									
								} else {
									Toast.fail(res.data.msg)
								}

							})
							.catch(err => {

							})
					}).catch(() => {
						// on cancel
					});
				} else {
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
																		setTimeout(() => {
																			uni.hideLoading()
																			_this.pwdbtn()
																			
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

				}


			},
			guanggao1() {
				console.log('88995566')
				let data = {
					point: 'chargeSuccess',
					projectId: this.projectId,
					token: uni.getStorageSync('userToken')
				}
				this.$base.request('poster/getPosterList', 'POST', data)
					.then(res => {
						if (res.data.code == 200) {
							if (res.data.data.length > 0) {
								var burl = res.data.data[0].url
								console.log(res.data.data,'9999999999999977')
								setTimeout(() => {
									uni.navigateTo({
										url: '/pages/webview/webview?url=' + burl
									});
								}, 1000)
							} 
						} else {
							return
						}
					})
					.catch(err => {
			
					})
			},
			//支付充电柜补差价支付
			pay(orderNum) {
				let data = {
					orderNum: orderNum,
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

							// 小程序中使用wx.requestPayment，但传入公众号的支付参数
							wx.requestPayment({
								timeStamp: arr.timeStamp,
								nonceStr: arr.nonceStr,
								package: arr.wpackage,
								signType: arr.signType,
								paySign: arr.paySign,
								success: function (res) {
									console.log('补差价支付成功:', res);
									uni.showLoading({
										title: '请稍候',
										mask: true
									})
									setTimeout(() => {
										uni.hideLoading()
										_this.pwdbtn()
									}, 1000)
								},
								fail: function (err) {
									console.log('补差价支付失败:', err);
									if (err.errMsg === 'requestPayment:fail cancel') {
										Toast.fail('支付已取消')
									} else {
										Toast.fail('支付失败: ' + err.errMsg)
									}
								}
							});
						} else {
							Toast.fail(res.data.msg)
						}

					})
					.catch(err => {

					})
			},
			//获取用户所在小区运营商是否开启白名单
			safeWhite(){
				this.$base.request('user/safeWhite', 'GET')
					.then(res => {
						if(res.data.code==200){
							this.White=res.data.data
						}else{
							this.White=0
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
				arr.forEach(function(value) {
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
						text: '充电器功率:'
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
									text: '充电器功率 : ' + tap.power[legendIndex] + 'W'
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
									text: '充电器功率 : ' + tap.power[legendIndex] + 'W'
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
			guanggao(){
				let data={
					point:'order',
					projectId:uni.getStorageSync('user').projectId,
					token:uni.getStorageSync('userToken')
				}
				this.$base.request('poster/getPosterList', 'POST',data)
					.then(res => {
					if(res.data.code==200){
						this.posterList=res.data.data
						if(this.posterList.length>0){
							this.poster=1
						}else{
							this.poster=0
						}
					}else{
						this.poster=0
					}
				})
				.catch(err => {
							
				})
			},
			gogd(url, jump, msg, libId, teamId) {
				if (jump == 'PU' || jump == 'SA') {
					if (url != 0) {
						let point = 'order'
						this.ggadd(libId, teamId, point)
						uni.navigateTo({
							url: '/pages/webview/webview?url=' + url
						});
					}
				} else if (jump == 'PA') {
					let point = 'order'
					this.ggadd(libId, teamId, point)
					uni.navigateTo({
						url: '/pageone/ad_details/ad_details?msg=' + msg
					});
				} else if (jump == 'PPRO') {
					let point = 'order'
					this.ggadd(libId, teamId, point)
				}
			
			},	
			ggadd(libId,teamId,point){
				let data={
					systemId:0,
					libId:libId,
					teamId:teamId,
					point:point,
					appid:uni.getStorageSync('user').appid,
					projectId:uni.getStorageSync('user').projectId
				}
				this.$base.request('posterClickMsg/add', 'POST',data)
					.then(res => {
					
				})
				.catch(err => {
							
				})
			},
			ptbtn(){
				this.ptype=true
			},
			xyshow(){
				this.$base.request('charge/safe/marketing', 'GET')
					.then(res => {
						if(res.data.code==200){
							this.xylist=res.data.data
							if(this.xylist.wechatImg){
								let url1 = Config.imgapi + this.xylist.wechatImg
								let that=this
								uni.request({
									url:url1,
									responseType:'arraybuffer',
									success(res) {
										let url='data:image/png;base64,'+uni.arrayBufferToBase64(res.data)
										that.xylist.wechatImg=url
									}
								})
							}
						}else{
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {
				
					})
			},
			lxkf(orderNum){
				this.consumNo=orderNum
				this.xyshow()
				this.kfshow=true
			},
			//关闭客服弹窗
			gkf(){
				this.kfshow=false
			},
			//关闭公众号弹窗
			gwx(){
				this.wxtcshow=false
			},
			//打开公众号弹窗
			zaixian(){
				if(this.xylist.imgStatuss==1){
					Dialog.confirm({
						title: '提示',
						message: '确认联系在线客服？',
					}).then(() => {
						let data={
							inletType:'detail',
							consumNo:this.consumNo
						}
						uni.showLoading({
							title: '请稍候',
							mask: true
						})
						this.$base.request('user/customer/add', 'POST',data)
							.then(res => {
								uni.hideLoading()
								if(res.data.code==200){
									this.wxtcshow=true
									this.kfshow=false
								}else{
									Toast.fail(res.data.msg)
									return
								}
							})
							.catch(err => {
						
							})
					}).catch(() => {
						return
						// on cancel
					});
				}else{
					Toast.fail('在线客服尚未启用')
				}
				
			},
			//拨打电话
			callphone(){
				if(this.xylist.phoneStatuss==1){
					Dialog.confirm({
						title: '提示',
						message: '确认拨打电话客服',
					}).then(() => {
						let data={
							inletType:'detail',
							consumNo:this.consumNo
						}
						uni.showLoading({
							title: '请稍候',
							mask: true
						})
						this.$base.request('user/customer/add', 'POST',data)
							.then(res => {
								uni.hideLoading()
								if(res.data.code==200){
									uni.makePhoneCall({
										phoneNumber: this.xylist.phone.toString()
									}).catch((e) => {
										// console.log(e)  //用catch(e)来捕获错误{makePhoneCall:fail cancel}
									})
									this.kfshow=false
								}else{
									Toast.fail(res.data.msg)
									return
								}
							})
							.catch(err => {
						
							})
					}).catch(() => {
						return
						// on cancel
					});
				}else{
					Toast.fail('电话客服尚未启用')
				}
				
			},
			//协议说明
			xysm(){
				uni.navigateTo({
					url:'/pageone/protocol_specification/protocol_specification'
				})
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

		.van-popup--center{
			border-radius: 20upx;
		}
		.pwdtan{
			width: 550upx;
			padding: 10upx 0;
			.pwdtanone{
				font-size: 64upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #111111;
				text-align: center;
				padding: 10upx 0;
			}
		}

		.show {
			width: 100%;
			margin: 10upx 0;
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
			margin-bottom: 30upx;
			.sffirst {
				background-color: #3C393E;
				border-radius: 24px;
				padding-bottom: 30upx;
				margin-bottom: 20upx;
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
					display: flex;
					align-items: center;
					.sftwo1{
						width: 140upx;
						height: 68upx;
						line-height: 68upx;
						background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
						border-radius: 24upx;
						font-size: 32upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						margin-top: 13upx;
						text-align: center;
					}
					.fleftson{
						padding:0upx 14upx;
						color: #333;
						background-color: #fff;
						border-radius: 5upx;
						margin-left: 30upx;
					}
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
				margin: 20upx auto;
				image {
					width: 649upx;
					height: 300upx;
					border-radius: 16upx;
				}
			}
			.tap1 {
				width: 649upx;
				height: 300upx;
				border-radius: 16upx;
				margin: 20upx auto;
				image {
					width: 649upx;
					height: 300upx;
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
				margin: 0upx auto;
				margin-bottom: 30upx;
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
		.kf{
			/deep/.van-popup {
				border-radius: 36upx;
				overflow-x: hidden;
			}
			.kfmap{
				background-color: #ffffff;
				width: 544upx;
				position: relative;
				padding-bottom: 50upx;
				padding-top: 58upx;
				box-sizing: border-box;
				.one{
					position: absolute;
					top: 30upx;
					right: 30upx;
					image{
						width: 29upx;
						height: 29upx;
					}
				}
				.two{
					text-align: center;
					font-size: 34upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 700;
					color: #111111;
					line-height: 48upx;
				}
				.three{
					margin-top: 44upx;
					text-align: center;
					font-size: 30upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 700;
					color: #3A4044;
					line-height: 42upx;
				}
				.four{
					display: flex;
					padding:0 54upx;
					justify-content: center;
					align-items: center;
					margin-top: 70upx;
					.fourfirst{
						display: flex;
						align-items: center;
						image{
							width: 30upx;
							height: 30upx;
							margin-right: 5upx;
						}
						font-size: 34upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 700;
						color: #3A4044;
						line-height: 48upx;
					}
					.foursecond{
						display: flex;
						align-items: center;
						image{
							width: 35upx;
							height: 29upx;
							margin-right: 5upx;
						}
						font-size: 34upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 700;
						color: #EC651C;
						line-height: 48upx;
					}
					.fourthired{
						width: 1upx;
						height: 55upx;
						background: #EEEEEE;
						margin: 0 48upx;
					}
				}
				.five{
					text-align: center;
					image{
						width: 424upx;
						height: 424upx;
						background: #D4D4D4;
						border-radius: 10upx;
					}
				}
				.six{
					text-align: center;
					font-size: 30upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #EC651C;
					line-height: 49upx;
					margin-top: 50upx;
				}
			}
		}

	}
</style>
