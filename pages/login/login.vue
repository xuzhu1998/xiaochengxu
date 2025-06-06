<template>
	<!-- <view class="content">
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</view> -->
	<view class="content reg-page">
		<view class="reg-title">登录</view>
		<view class="form-area">
			<image :src="$imgUrl + 'logo.jpg'"></image>
			<view class="operate-btn reg-page-btn">
				<button type="primary" class="round bg-my-blue" open-type="getPhoneNumber"
					@getphonenumber="onGetPhoneNumber" v-if="isGetMobile"
					:disabled="submitToggle" :loading="submitToggle">
					{{ submitToggle ? '登录中...' : '一键登录' }}
				</button>
				<button type="primary" class="round bg-my-blue" v-else :disabled="submitToggle"
					:loading="submitToggle" @click="login()">
					{{ submitToggle ? '登录中...' : '一键登录' }}
				</button>
			</view>
		</view>
		<view class="flex-aic-jcc-wrap reset" @click="handleOpenPrivacyContract()">
			<label class="flex-aic" @click.stop="isXieyi = !isXieyi">
				<checkbox :checked="isXieyi" />
			</label>
			<text>我已经详细阅读并同意</text>
			<text class="text-my-blue" @click="handleOpenPrivacyContract()">《隐私政策》</text>
		</view>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />

		<!-- 关注公众号弹窗 -->
		<view v-if="showFollowGuide" class="popup-overlay" @tap="onOverlayTap">
			<view class="follow-guide-popup" @tap.stop>
				<view class="popup-header">
					<text class="popup-title">请先关注公众号</text>
				</view>

				<view class="qr-container">
					<image
						:src="qrCodeUrl"
						class="qr-code"
						mode="aspectFit"
						show-menu-by-longpress="true"
						@tap="onTapQR">
					</image>
					<text class="qr-tip">长按识别二维码关注公众号</text>
				</view>

				<view class="account-name" v-if="accountName">
					<text class="account-title">公众号名称：</text>
					<text class="account-value">{{ accountName }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import {
		Config
	} from "../../common/Config.js"
	export default {
		data() {
			return {
				oplist:'',
				$imgUrl: Config.imgUrl,
				submitToggle: false,
				isXieyi: false,
				isGetMobile: true,
				loginCode: "",
				showFollowGuide: false, // 是否显示关注公众号弹窗
				qrCodeUrl: '', // 公众号二维码URL
				accountName: '', // 公众号名称
				debugReason: '', // 调试用的reason参数
				option: null // 页面参数
			}
		},
		onLoad(options) {
			// 保存页面参数
			this.option = options;

			// 处理扫码参数
			if(options){
				// 如果有q参数（扫码链接）
				if(options.q) {
					this.oplist = decodeURIComponent(options.q);
				}
				// 如果直接传入device和port参数（优先处理，不管是否有reason参数）
				else if(options.device && options.port) {
					// 构造与oplist相同格式的字符串，便于后续处理
					this.oplist = `${Config.baseUrl}/ap3200/${options.device}/${options.port}`;
				}
				// 检查App全局参数
				else {
					const app = getApp();
					if(app && app.globalData && app.globalData.scanParams) {
						const scanParams = app.globalData.scanParams;
						if(scanParams.device && scanParams.port) {
							this.oplist = `${Config.baseUrl}/ap3200/${scanParams.device}/${scanParams.port}`;
							// 清除全局参数，防止重复使用
							app.globalData.scanParams = null;
						} else {
							this.oplist = '';
						}
					} else {
						this.oplist = '';
					}
				}
			} else {
				this.oplist = '';
			}

			console.log('Login页面最终获取到的扫码参数:', this.oplist);

			this.isGetMobile = !uni.getStorageSync("JeepGetPhone");
			this.getLoginCode();

			// 检查是否是从App.vue跳转过来需要处理特殊情况
			if (options && options.reason) {
				this.debugReason = options.reason; // 设置调试信息
				console.log('检测到reason参数:', options.reason);
				if (options.reason === 'phone_auth') {
					console.log('需要重新进行手机号授权，当前oplist:', this.oplist);
					// 延迟执行，确保页面完全加载
					setTimeout(() => {
						this.triggerPhoneAuth();
					}, 500);
				} else if (options.reason === 'follow_wechat') {
					console.log('需要关注公众号，当前oplist:', this.oplist);
					// 这种情况通常会在后续的登录过程中自动处理
				}
			}
		},
		methods: {
			getLoginCode() {
				let that = this;
				uni.login({
					success(res) {
						that.loginCode = res.code
					}
				})
			},
			handleOpenPrivacyContract() {
				this.isXieyi = true
				uni.openPrivacyContract({})
			},
			login() {
				if (!this.isXieyi) {
					return this.$toast.fail("请先阅读协议")
				}

				// 防止重复点击
				if (this.submitToggle) {
					return;
				}

				let data = {
					code: this.loginCode,
				}
				this.doLogin(data)
			},
			onGetPhoneNumber(e) {
				if (!this.isXieyi) {
					return this.$toast.fail("请先阅读协议")
				}

				// 防止重复点击
				if (this.submitToggle) {
					return;
				}

				// 检查是否获取到手机号授权
				if (e.detail.errMsg !== 'getPhoneNumber:ok') {
					return this.$toast.fail("获取手机号失败，请重试")
				}

				let data = {
					code: this.loginCode,
					mcode: e.detail.code
				}
				this.doLogin(data)
			},
			doLogin(data) {
				// 设置加载状态，防止重复点击
				this.submitToggle = true;
				console.log('开始登录，设置加载状态');

				// 提取设备ID参数
				let deviceId = '';

				// 如果有扫码参数，尝试提取设备ID
				if(this.oplist && this.oplist !== 'undefined') {
					// 尝试使用正则表达式提取设备ID
					const regex = /\/([A-Fa-f0-9]{8})\/([A-Fa-f0-9]{2})(?:\/|$)/;
					const match = this.oplist.match(regex);

					if (match && match.length >= 3) {
						// 使用正则表达式匹配结果
						deviceId = match[1];
						console.log('从扫码参数提取设备ID:', deviceId);
					} else {
						// 使用原来的字符串截取方法
						deviceId = this.oplist.substring(this.oplist.length-11, this.oplist.length-3);
						console.log('从字符串截取提取设备ID:', deviceId);
					}
				}

				// 注释：设备ID已经在onLoad时从URL参数提取并构造到oplist中，不需要再从全局数据获取

				// 将设备ID添加到登录参数中（只有存在时才添加）
				if(deviceId) {
					data.deviceId = deviceId;
					console.log('添加设备ID到登录参数:', deviceId);
				} else {
					console.log('没有设备ID，不添加到登录参数');
				}

				console.log('登录参数:', data);

				// 调用登录接口
				this.$base.request('wxlogin/applet', 'POST', data)
					.then(res => {
						res = res.data || {}
						if (res.code == 200) {
							console.log('登录成功:', res.data)
							uni.setStorageSync('user', res.data)
							uni.setStorageSync('userId', res.data.id);
							uni.setStorageSync('userToken', res.data.token)
							uni.setStorageSync('phone', res.data.phone)
							uni.setStorageSync('Name', res.data.realName)
							uni.setStorageSync('poster', res.data.poster)
							uni.setStorageSync('adunit', res.data.adunit)
							var logolist = "logolist_" + uni.getStorageSync("userId")
							uni.setStorageSync(logolist, "")
							var usertype = 'type_' + uni.getStorageSync('userId')
							uni.setStorageSync(usertype, res.data.scan)
							if (res.data.posterList) {
								var posterList = res.data.posterList
								for (var i = 0; i < posterList.length; i++) {
									posterList[i].img = Config.imgapi + posterList[i].img
								}
								uni.setStorageSync('posterList', posterList)
							} else {
								var posterList = []
								uni.setStorageSync('posterList', posterList)
							}

							// 获取配置信息
							this.getConfig()
							this.guangao()
							this.logoshow()
						} else if (res.code == 599) {
							console.log('用户未关注公众号，显示关注引导');
							// 重置加载状态
							this.submitToggle = false;
							// 显示关注公众号弹窗，传入完整的响应数据
							this.showFollowGuidePopup(res);
						} else if (res.code == 598) {
							console.log('需要重新获取手机号授权');
							// 重置加载状态
							this.submitToggle = false;
							// 重新获取登录code
							this.getLoginCode();
							// 强制拉起手机号授权
							this.triggerPhoneAuth();
						} else {
							console.log('登录失败:', res.msg);
							// 登录失败，重置状态
							this.submitToggle = false;
							this.getLoginCode()
							this.$toast.fail(res.msg)
						}
					})
					.catch(err => {
						console.error('登录请求失败:', err);
						// 请求失败，重置状态
						this.submitToggle = false;
						this.$toast.fail('登录失败，请重试')
					})
			},
			logoshow() {
				const userToken = uni.getStorageSync('userToken');
				if (!userToken) {
					// 如果没有token，重置加载状态
					this.submitToggle = false;
					return;
				}

				let _this = this
				var logolist = 'logolist_' + uni.getStorageSync('userId')
				uni.removeStorageSync(logolist)
				_this.$base.request('wechat/phone', 'GET')
					.then(res => {
						if (res.data.code == 200) {
							var list = res.data.data
							if (list.logo) {
								list.logo = this.$imgUrl + list.logo.replace("/tabBarimg", "")
								list.loshow = 1
								uni.setStorageSync(logolist, list)
							}
						} else {
							_this.$toast.fail(res.data.msg)
						}
						// 完成所有登录后续处理，执行跳转
						this.loginOk()
					})
					.catch(err => {
						console.error('获取logo失败:', err)
						// 即使获取logo失败，也要执行跳转
						this.loginOk()
					})
			},
			loginOk() {
				console.log('登录完成，准备跳转页面');

				// 重置加载状态
				this.submitToggle = false;

				// 处理扫码参数并跳转到充电页面
				if(this.oplist && this.oplist !== 'undefined'){
					console.log('处理扫码参数并跳转:', this.oplist);

					// 尝试使用正则表达式提取设备ID和端口号
					const regex = /\/([A-Fa-f0-9]{8})\/([A-Fa-f0-9]{2})(?:\/|$)/;
					const match = this.oplist.match(regex);

					let device = '';
					let port = '';

					if (match && match.length >= 3) {
						// 使用正则表达式匹配结果
						device = match[1];
						port = match[2];
						console.log('正则匹配结果:', device, port);
					} else {
						// 使用原来的字符串截取方法
						device = this.oplist.substring(this.oplist.length-11, this.oplist.length-3);
						port = this.oplist.substring(this.oplist.length-2, this.oplist.length);
						console.log('字符串截取结果:', device, port);
					}

					// 处理端口号
					let processedPort = '';
					if (port.toUpperCase() !== 'FF') {
						try {
							processedPort = this.pad(parseInt(port, 16).toString(10), 2);
						} catch (e) {
							console.error('端口号转换错误:', e);
							processedPort = port;
						}
					} else {
						processedPort = port;
					}

					// 确保有有效的设备ID和端口号
					if (device && processedPort) {
						console.log('登录成功，跳转到充电页面:', device, processedPort);

						// 检查是否是从扫码登录进入的
						const returnType = this.option && this.option.returnType;
						if (returnType === 'charge') {
							console.log('从扫码登录进入，先跳转到首页再跳转到充电页面');
							// 先跳转到首页，确保tabBar可用，然后再跳转到充电页面
							uni.reLaunch({
								url: '/pages/index/index',
								success: () => {
									console.log('先跳转到首页成功');
									// 延迟跳转到充电页面
									setTimeout(() => {
										uni.navigateTo({
											url: '/pageone/poweron/poweron?device=' + device + '&port=' + processedPort +
												'&cmd=0&from=1',
											success: () => {
												console.log('登录后跳转到充电页面成功');
											},
											fail: (err) => {
												console.error('跳转到充电页面失败:', err);
											}
										});
									}, 100);
								},
								fail: (err) => {
									console.error('跳转到首页失败:', err);
									// 如果reLaunch失败，直接跳转到充电页面
									uni.redirectTo({
										url: '/pageone/poweron/poweron?device=' + device + '&port=' + processedPort +
											'&cmd=0&from=1'
									});
								}
							});
						} else {
							console.log('从充电页面登录，返回到原页面');
							// 使用navigateBack返回到原页面，原页面会自动刷新数据
							uni.navigateBack({
								delta: 1,
								success: () => {
									console.log('成功返回到充电页面');
								},
								fail: (err) => {
									console.error('返回失败，使用redirectTo跳转:', err);
									// 如果返回失败，则使用redirectTo跳转
									uni.redirectTo({
										url: '/pageone/poweron/poweron?device=' + device + '&port=' + processedPort +
											'&cmd=0&from=1',
									});
								}
							});
						}
						return; // 已经跳转，不执行后续代码
					}
				}

				// 如果没有扫码参数或参数无效，则使用之前的页面路径
				let PrevLoginPath = uni.getStorageSync("PrevLoginPath");
				console.log('使用之前的页面路径:', PrevLoginPath);

				// 处理特殊页面的跳转
				if (!PrevLoginPath || PrevLoginPath.indexOf("pages/index/index") >= 0) {
					uni.switchTab({
						url: "/pages/index/index"
					});
					return;
				}

				if (PrevLoginPath && PrevLoginPath.indexOf("pages/smcharging/smcharging") >= 0) {
					uni.switchTab({
						url: "/pages/smcharging/smcharging"
					});
					return;
				}

				if (!PrevLoginPath || PrevLoginPath.indexOf("pages/chargingzhong/chargingzhong") >= 0) {
					uni.switchTab({
						url: "/pages/chargingzhong/chargingzhong"
					});
					return;
				}

				// 如果是其他页面，直接跳转
				if (PrevLoginPath) {
					uni.redirectTo({
						url: PrevLoginPath
					});
				} else {
					// 默认跳转到首页
					uni.switchTab({
						url: "/pages/smcharging/smcharging"
					});
				}
			},
			// show(){
			// 	uni.login({
			// 		provider:'weixin',
			// 		onlyAuthorize:true,
			// 		success: res1=>{
			// 			var appid=uni.getAccountInfoSync().miniProgram.appId
			// 			let data = {
			// 				appid: appid,
			// 				code: res1.code
			// 			}
			// 			this.$base.request('wxlogin/minicallback', 'POST', data)
			// 				.then(res => {
			// 					if (res.data.code == '200') {
			// 						uni.setStorageSync('user', res.data.data)
			// 						uni.setStorageSync('userId', res.data.data.id);
			// 						uni.setStorageSync('userToken', res.data.data.token)
			// 						uni.setStorageSync('phone', res.data.data.phone)
			// 						uni.setStorageSync('Name', res.data.data.realName)
			// 						uni.setStorageSync('poster', res.data.data.poster)
			// 						uni.setStorageSync('adunit', res.data.data.adunit)
			// 						var logolist = "logolist_" + uni.getStorageSync("userId")
			// 						uni.setStorageSync(logolist, "")
			// 						var usertype = 'type_' + uni.getStorageSync('userId')
			// 						uni.setStorageSync(usertype, res.data.data.scan)
			// 						if (res.data.data.posterList) {
			// 							var posterList = res.data.data.posterList
			// 							for (var i = 0; i < posterList.length; i++) {
			// 								posterList[i].img = Config.imgapi + posterList[i].img
			// 							}
			// 							uni.setStorageSync('posterList', posterList)
			// 						} else {
			// 							var posterList = []
			// 							uni.setStorageSync('posterList', posterList)
			// 						}
			// 						this.getConfig()
			// 						this.guangao()
			// 						var _this = this
			// 						if(_this.oplist!='undefined'){
			// 							var device=_this.oplist.substring(_this.oplist.length-11,_this.oplist.length-3);
			// 							var port =_this.oplist.substring(_this.oplist.length-2,_this.oplist.length);
			// 							let ss = '';
			// 							if (port != 'ff' && port != 'FF') {
			// 								ss=_this.pad(parseInt(port,16).toString(10),2);
			// 							} else {
			// 								ss = port;
			// 							};
			// 							uni.redirectTo({
			// 								url:'/pageone/poweron/poweron?device=' + device + '&port=' + ss +
			// 									'&cmd=' + 0 + '&from=' + 1,
			// 							});
			// 						}else{
			// 							uni.switchTab({
			// 								url: '../smcharging/smcharging'
			// 							})
			// 						}

			// 					} else {
			// 						Toast.fail(res.data.msg)
			// 					}
			// 				}).catch(err => {

			// 				})
			// 		}
			// 	})

			// },
			pad(num, n) {
				var len = num.toString().length;
				while (len < n) {
					num = "0" + num;
					len++;
				}
				return num;
			},
			mbid(){
				let moban=new Object();
				var appid=uni.getAccountInfoSync().miniProgram.appId
				let data = {
					appid: appid,
				}
				this.$base.request('wechat/template', 'GET', data)
				.then(res => {
					if (res.data.code == '200') {
						var arr=res.data.data
						for (var i = 0; i < arr.length; i++) {
							if(arr[i].types==1){
								moban.kaishi=arr[i].templateCode
							}else if(arr[i].types==2){
								moban.wancheng=arr[i].templateCode
							}else if(arr[i].types==3){
								moban.yichang=arr[i].templateCode
							}else if(arr[i].types==7){
								moban.chongzhi=arr[i].templateCode
							}else if(arr[i].types==8){
								moban.tuikuan=arr[i].templateCode
							}
						}
						uni.setStorageSync('moban', moban)
					} else {
						Toast.fail(res.data.msg)
					}
				}).catch(err => {

				})
			},
			//获取商业化个人屏蔽配置
			getConfig(){
				let data = {
					token: uni.getStorageSync("userToken"),
				};
				this.$base.request("com/getConfig", "GET", data).then((res) => {
					if (res.data.code == "200") {
						uni.setStorageSync("reassuring", res.data.data.reassuring);
						uni.setStorageSync("postervip", res.data.data.poster);
					}else{
						// this.$toast.fail(res.data.msg)
					}
				}).catch((err) => {

				});
			},
			//获取广告配置
			guangao(){
				let data = {
					projectId: uni.getStorageSync("user").projectId,
				};
				this.$base.request("poster/getPosterConfig", "POST", data).then((res) => {
					if (res.data.code == "200") {
						uni.setStorageSync("point", res.data.data);
					}else{
						uni.setStorageSync("point", 0);
						// this.$toast.fail(res.data.msg)
					}
				}).catch((err) => {

				});
			},

			// 显示关注公众号弹窗
			showFollowGuidePopup(responseData) {
				console.log('显示关注公众号弹窗，完整响应数据:', responseData);
				console.log('当前showFollowGuide状态:', this.showFollowGuide);

				// 处理二维码URL - wechatImg在data下面
				if (responseData && responseData.data && responseData.data.wechatImg) {
					this.qrCodeUrl = Config.imgapi + responseData.data.wechatImg;
					console.log('公众号二维码URL:', this.qrCodeUrl);
				} else {
					console.error('未获取到公众号二维码，responseData:', responseData);
					this.$toast.fail('获取公众号信息失败');
					return;
				}

				// 处理公众号名称 - wechatName和code同级
				if (responseData && responseData.wechatName) {
					this.accountName = responseData.wechatName;
					console.log('公众号名称:', this.accountName);
				} else {
					console.log('未获取到公众号名称，responseData:', responseData);
					this.accountName = '';
				}

				// 显示弹窗
				this.showFollowGuide = true;
				console.log('设置showFollowGuide为true，当前值:', this.showFollowGuide);

				// 强制更新视图
				this.$forceUpdate();
			},

			// 点击二维码提示
			onTapQR() {
				uni.showToast({
					title: '请长按识别二维码关注',
					icon: 'none',
					duration: 2000
				});
			},

			// 关闭关注引导弹窗（仅用于内部清理，用户无法主动关闭）
			closeFollowGuide() {
				console.log('清理关注公众号弹窗数据');
				this.showFollowGuide = false;
				this.qrCodeUrl = '';
				this.accountName = '';
			},

			// 遮罩层点击处理（暂时不允许点击遮罩关闭）
			onOverlayTap() {
				// 不做任何操作，防止点击遮罩关闭弹窗
				console.log('点击了遮罩层，但不关闭弹窗');
			},

			// 强制拉起手机号授权
			triggerPhoneAuth() {
				console.log('强制拉起手机号授权');

				// 设置需要手机号授权状态
				this.isGetMobile = true;

				// 显示简单提示信息
				uni.showToast({
					title: '需要重新授权手机号',
					icon: 'none',
					duration: 2000
				});

				// 强制更新视图，确保显示手机号授权按钮
				this.$forceUpdate();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon {
		font-size: 38rpx;
	}

	.content.reg-page {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		flex: 1;
		width: 100%;
		height: 100vh;
		padding: 30rpx 86rpx;
		position: relative;
		z-index: 9;
		background-color: #242225;
		text-align: center;

		image {
			width: 320rpx;
			height: 320rpx;
			margin-top: 13vh;
		}
	}

	.reg-title {
		font-size: 50rpx;
		margin: 110rpx 0 90rpx;
		color: #fff;
	}

	.reg-page-btn {
		margin-top: 100rpx;
	}

	.go-login {
		color: #7E8388;
		font-size: 26rpx;
		text-align: right;
	}

	.operate-btn button {
		font-size: 32rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
	}


	.reset {
		color: #666;
		font-size: 22rpx;
		display: flex;
		align-items: center;
		margin-top: 60rpx;
		white-space: nowrap;

		checkbox {
			transform: scale(.6);
		}

		.line {
			margin: 0 2em;
		}

		.text-my-blue {
			color: #FF752B;
		}
	}
	/* .content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	} */

	/* 关注公众号弹窗样式 */
	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}

	.follow-guide-popup {
		width: 600rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 40rpx;
		box-sizing: border-box;
		text-align: center;

		.popup-header {
			margin-bottom: 40rpx;

			.popup-title {
				display: block;
				font-size: 36rpx;
				font-weight: bold;
				color: #333;
			}
		}

		.qr-container {
			margin-bottom: 40rpx;

			.qr-code {
				width: 300rpx;
				height: 300rpx;
				border-radius: 20rpx;
				border: 2rpx solid #eee;
				margin-bottom: 20rpx;
			}

			.qr-tip {
				display: block;
				font-size: 28rpx;
				color: #666;
				line-height: 40rpx;
			}
		}

		.account-name {
			margin-bottom: 30rpx;
			padding: 20rpx;
			background: #f8f9fa;
			border-radius: 10rpx;
			text-align: center;

			.account-title {
				font-size: 28rpx;
				color: #666;
				margin-right: 10rpx;
			}

			.account-value {
				font-size: 30rpx;
				color: #333;
				font-weight: bold;
			}
		}


	}
</style>
