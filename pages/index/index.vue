<template>
	<view class="main">
		<view class="foothand" @click="gzbtn" v-show="this.wechatLogo">
			点击关注公众号，接收充电消息通知
		</view>
		<tou_hand ref="childComponent"></tou_hand>
		<!-- 登录用户显示余额信息 -->
		<view class="money" v-if="isLoggedIn">
			<view class="moneyone">
				<view class="moneshang" v-show="userlist.realBalance">
					<span style='font-size:30upx;margin-right:6upx;'>¥</span>{{userlist.realBalance}}
				</view>
				<view class="moneshang" v-show="!userlist.realBalance">
					0.00
				</view>
				<view class="monexia">
					账户余额
				</view>
			</view>
			<view class="monez"></view>
			<view class="moneyone">
				<view class="moneshang" v-show="userlist.dummyBalance">
					<span style='font-size:30upx;margin-right:6upx;'>¥</span>{{userlist.dummyBalance}}
				</view>
				<view class="moneshang" v-show="!userlist.dummyBalance">
					0.00
				</view>
				<view class="monexia">
					赠送余额
				</view>
			</view>
		</view>

		<!-- 游客模式显示登录提示 -->
		<view class="money guest-login" v-if="!isLoggedIn" @click="handleGuestLogin">
			<view class="guest-content">
				<view class="guest-icon">
					<image src="../../static/tabBarimg/user.png" style="width: 60upx; height: 60upx;"></image>
				</view>
				<view class="guest-text">
					<view class="guest-title">登录后查看余额</view>
					<view class="guest-subtitle">点击登录，体验更多功能</view>
				</view>
				<view class="guest-arrow">></view>
			</view>
		</view>
		<view class="show">
			<view class="one">
				<view class="onetap">
					<navigator url="../../pageone/nearby_charging/nearby_charging"  hover-class="none">
					<view class="onetapmont">
						<image src="../../static/tabBarimg/k5.png" style='width:52upx;height:52upx;'></image>
						<view class="onetapmonttxt">充电区费率</view>
					</view>
					</navigator>
					<navigator url="../../pageone/trouble_shooting/trouble_shooting"  hover-class="none">
					<view class="onetapmont">
						<image src="../../static/tabBarimg/k6.png" style='width:50upx;height:51upx;'></image>
						<view class="onetapmonttxt">故障报修</view>
					</view>
					</navigator>
				</view>
				<view class="onetap">
					<navigator url="../../pageone/remote_charging/remote_charging"  hover-class="none">
					<view class="onetapmont">
						<image src="../../static/tabBarimg/k7.png" style='width:53upx;height:54upx;'></image>
						<view class="onetapmonttxt">远程充电</view>
					</view>
					</navigator>
					<navigator url="../../pagetwo/more/more?backid=0"  hover-class="none">
					<view class="onetapmont">
						<image src="../../static/tabBarimg/k8.png" style='width:51upx;height:50upx;'></image>
						<view class="onetapmonttxt">查看更多</view>
					</view>
					</navigator>
				</view>
			</view>
			<view class="tap" v-if="poster==1">
				<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
					<van-swipe-item v-for="(item, index) in posterList" :key="index">
						<image :src=item.img @click="gogd(item.url,item.jump,item.msg,item.libId,item.teamId)"></image>
					</van-swipe-item>
				</van-swipe>
			</view>
		</view>
		<van-popup :show="gzshow">
			<view class="gztan" >
				<view class="gztanimg">
					<img :src="wechaturl"></img>
					<!-- <img src='../../static/tabBarimg/00000006.jpg'></img> -->
				</view>
				<view class="gztantxt">
					长按识别二维码，关注公众号，接收充电消息通知
				</view>
			</view>
		</van-popup>
		<tabBar tab01="1"></tabBar>
	</view>
</template>

<script>
	import tabBar from '../../components/tabBar/tabBar.vue'

	import tou_hand from '../../components/tou_hand/tou_hand.vue'
	export default {
		components: {
			tabBar,
			tou_hand,
		},
		mounted() {

		},
		data() {
			return {
				posterList:[],//轮播图数组
				poster:0,
				gzshow:false,
				wechatLogo:'',//是否显示公众号二维码
				wechaturl:'',//是否显示公众号二维码
				userlist:{},
				isLoggedIn: false, // 登录状态
			}
		},
		onReady() {
		},
		onLoad(option) {
			// 处理扫码进入的情况
			this.handleScanParams(option);
		},
		onShow() {
			// 允许游客浏览，不强制登录检查
			this.initPageData();

			// 检查App.vue中是否有扫码参数
			this.checkAppScanParams();
		},
		methods: {
			// 检查登录状态
			checkLoginStatus() {
				const userToken = uni.getStorageSync('userToken');
				const user = uni.getStorageSync('user');

				// 如果没有token或用户信息，需要登录
				if (!userToken || !user) {
					console.log('用户未登录，显示登录提示');

					// 检查是否有扫码参数，如果有扫码参数，直接跳转登录页面
					const app = getApp();
					if (app && app.globalData && app.globalData.scanParams && app.globalData.scanParams.isFromScan) {
						console.log('有扫码参数，直接跳转登录页面');
						this.$base.directLoginPage();
						return false;
					}

					// 没有扫码参数，显示登录提示弹窗
					this.$base.handleLoginRequired();
					return false;
				}

				return true;
			},

			// 初始化页面数据
			initPageData() {
				try {
					const user = uni.getStorageSync('user');
					const userToken = uni.getStorageSync('userToken');

					// 更新登录状态
					this.isLoggedIn = !!(userToken && user);

					// 游客模式：显示基本信息，不需要登录的功能
					this.wechatLogo = uni.getStorageSync('wechatLogo');
					this.wechaturl = uni.getStorageSync('wechaturl');

					// 只有登录用户才执行需要登录的功能
					if (this.isLoggedIn) {
						this.userlist = user; // 设置用户信息
						if (user.poster == 1) {
							this.guanggao();
						}
						this.usertap();
						this.fetchUserInfo();

						// 确保子组件存在后再调用
						setTimeout(() => {
							if (this.$refs.childComponent) {
								this.$refs.childComponent.userdetail();
							}
						}, 100);
					} else {
						// 游客模式：显示默认状态
						console.log('游客模式：显示基本页面内容');
						this.userlist = {}; // 清空用户信息
						// 可以显示一些不需要登录的内容，如公告、帮助信息等
					}
				} catch (error) {
					console.error('初始化页面数据时出错:', error);
				}
			},

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
			usertap(){
				const userToken = uni.getStorageSync('userToken');
				if (!userToken) {
					console.log('没有userToken，跳过用户信息更新');
					return;
				}

				this.$base.request('user/userInfo', 'GET')
					.then(res => {
						if(res.data.code==200){
							var userlist = res.data.data
							var userlist1=uni.getStorageSync('user')
							if((userlist.realBalance!=userlist1.realBalance)||(userlist.dummyBalance!=userlist1.dummyBalance)){
								setTimeout(() => {
									if (this.$refs.mainindex) {
										this.$refs.mainindex.userdetail();
									}
								}, 100)
							}
							userlist.id=this.pad(userlist.id,8)
							uni.setStorageSync('user',userlist)
							uni.setStorageSync('phone', userlist.phone)
							uni.setStorageSync('Name', userlist.realName)
							this.userlist = uni.getStorageSync('user')
						}
					})
					.catch(err => {
						console.error('获取用户信息失败:', err);
					})
			},
			guanggao(){
				const user = uni.getStorageSync('user');
				const userToken = uni.getStorageSync('userToken');

				if (!user || !userToken || !user.projectId) {
					console.log('缺少用户信息或token，跳过广告获取');
					this.poster = 0;
					return;
				}

				let data={
					point:'personal',
					projectId: user.projectId,
					token: userToken
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
					console.error('获取广告信息失败:', err);
					this.poster=0
				})
			},
			gogd(url, jump, msg, libId, teamId) {
				if (jump == 'PU' || jump == 'SA') {
					if (url != 0) {
						let point = 'personal'
						this.ggadd(libId, teamId, point)
						uni.navigateTo({
							url: '/pages/webview/webview?url=' + url
						});
					}
				} else if (jump == 'PA') {
					let point = 'personal'
					this.ggadd(libId, teamId, point)
					uni.navigateTo({
						url: '/pageone/ad_details/ad_details?msg=' + msg
					});
				} else if (jump == 'PPRO') {
					let point = 'personal'
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
			pad(num, n) {
			  var len = num.toString().length;
			  while(len < n) {
			    num = "0" + num;
			    len++;
			  }
			  return num;
			},

			gzbtn(){
				this.gzshow=true
			},

			// 处理游客点击登录
			handleGuestLogin() {
				this.$base.handleLoginRequired('account');
			},

			// 检查App.vue中是否有扫码参数
			checkAppScanParams() {
				console.log('index页面 checkAppScanParams 被调用');

				// 获取getApp()实例
				const app = getApp();

				// 检查是否有扫码参数
				if (app.globalData && app.globalData.scanParams && app.globalData.scanParams.isFromScan) {
					const scanParams = app.globalData.scanParams;
					console.log('从App获取到扫码参数:', scanParams);

					// 检查扫码参数的时间戳，如果超过5分钟则认为过期
					const now = Date.now();
					if (scanParams.timestamp && (now - scanParams.timestamp) > 300000) { // 5分钟
						console.log('扫码参数已过期，清除参数');
						app.globalData.scanParams = null;
						return;
					}

					// 检查登录状态
					const userToken = uni.getStorageSync('userToken');
					if (!userToken) {
						console.log('有扫码参数但用户未登录，保持扫码参数不清除');
						// 不清除扫码参数，让登录流程处理
						return;
					}

					// 获取设备ID和端口号
					const device = scanParams.device;
					let port = scanParams.port;

					// 处理端口号，如果不是ff或FF，则转换为十进制并补零
					if (port.toUpperCase() !== 'FF') {
						try {
							port = this.pad(parseInt(port, 16).toString(10), 2);
						} catch (e) {
							console.error('端口号转换错误:', e);
						}
					}

					// 清除全局扫码参数，防止重复跳转
					app.globalData.scanParams = null;

					// 跳转到充电页面
					console.log('跳转到充电页面:', device, port);
					uni.navigateTo({
						url: '/pageone/poweron/poweron?device=' + device + '&port=' + port + '&cmd=0&from=2'
					});
				} else {
					console.log('index页面: 没有扫码参数或参数无效');
				}
			},

			// 处理扫码进入的参数
			handleScanParams(option) {
				// 检查是否有扫码场景值
				const scene = uni.getLaunchOptionsSync().scene;
				// 扫码场景值通常为1011, 1012, 1013, 1047, 1048, 1049
				const scanScenes = [1011, 1012, 1013, 1047, 1048, 1049];

				// 获取query参数中的device和port
				let device = '';
				let port = '';

				// 检查是否从URL中获取参数 (如 https://test.yueguisuchong.com/ap3200/2824C905/FF)
				if (option.q) {
					// 解码URL
					const url = decodeURIComponent(option.q);
					console.log('扫码进入URL:', url);

					// 使用正则表达式匹配URL中的设备ID和端口号
					// 匹配形如 baseUrl/ap3200/2824C905/FF 的URL
					const regex = /\/([A-Fa-f0-9]{8})\/([A-Fa-f0-9]{2})(?:\/|$)/;
					const match = url.match(regex);

					if (match && match.length >= 3) {
						device = match[1]; // 第一个捕获组是设备ID
						port = match[2];   // 第二个捕获组是端口号
						console.log('正则匹配结果:', device, port);
					} else {
						// 如果正则匹配失败，尝试使用分割方法
						const urlParts = url.split('/');
						if (urlParts.length >= 2) {
							// 获取倒数第二个和最后一个参数
							device = urlParts[urlParts.length - 2];
							port = urlParts[urlParts.length - 1];
							console.log('URL分割结果:', device, port);
						}
					}
				}
				// 直接从参数中获取
				else if (option.device && option.port) {
					device = option.device;
					port = option.port;
				}

				// 如果获取到了设备ID和端口号，并且是扫码进入的场景，则处理跳转逻辑
				if (device && port && (scanScenes.includes(scene) || option.q)) {
					console.log('获取到扫码参数:', device, port);

					// 处理端口号，如果不是ff或FF，则转换为十进制并补零
					let processedPort = port;
					if (port.toUpperCase() !== 'FF') {
						try {
							processedPort = this.pad(parseInt(port, 16).toString(10), 2);
						} catch (e) {
							console.error('端口号转换错误:', e);
						}
					}

					// 扫码充电功能需要登录
					const userToken = uni.getStorageSync('userToken');
					if (!userToken) {
						console.log('扫码充电需要登录，开始登录流程');
						// 直接在这里处理登录逻辑，登录成功后跳转到充电页面
						this.handleScanLogin(device, processedPort);
						return;
					}

					// 用户已登录，直接跳转到充电页面
					uni.navigateTo({
						url: '/pageone/poweron/poweron?device=' + device + '&port=' + processedPort + '&cmd=0&from=2'
					});
				} else {
					console.log('非扫码进入或未获取到参数');
				}
			},

			// 处理扫码登录逻辑
			handleScanLogin(device, port) {
				// 显示登录确认对话框
				uni.showModal({
					title: '充电功能需要登录',
					content: '使用充电功能需要先登录，是否立即登录？',
					confirmText: '立即登录',
					cancelText: '取消',
					success: (res) => {
						if (res.confirm) {
							// 跳转到登录页面，并传递设备参数
							uni.navigateTo({
								url: `/pages/login/login?device=${device}&port=${port}&returnType=charge`
							});
						}
					}
				});
			}
		}
	}
</script>
<style>
	page{
		height: 100%;
		background-image: linear-gradient(#472E23 2%, #242225 28%,#242225 70%);
	}
</style>
<style lang="scss" scoped>
	.main {
		// background-image: linear-gradient(#472E23 2%, #242225 28%,#242225 70%);
		text-size-adjust: 100% !important;
		-webkit-text-size-adjust: 100% !important;
		-moz-text-size-adjust: 100% !important;
		width: 100%;
		overflow-x: hidden;
		.foothand{
			width: 90%;
			background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
			border-radius: 24upx;
			padding: 10upx 24upx;
			margin: 0 auto;
			box-sizing: border-box;
			margin-top: 30upx;
			color: #fff;
		}
		.gztan{
			width: 650upx;
			background-color: #FFFFFF;
			text-align: center;
			padding: 70upx 0;
			.gztanimg{
				width: 350upx;
				height: 350upx;
				margin: 0 auto;
				img{
					width: 350upx;
					height: 350upx;
				}
			}

			.gztantxt{
				margin-top: 30upx;
				font-size: 20upx;
			}
		}
		.money{
			width: 650upx;
			height: 176upx;
			background: #343136;
			border-radius: 24upx;
			margin: 30upx auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 90upx;
			box-sizing: border-box;

			&.guest-login {
				padding: 0 40upx;
				cursor: pointer;

				.guest-content {
					display: flex;
					align-items: center;
					width: 100%;

					.guest-icon {
						margin-right: 30upx;
					}

					.guest-text {
						flex: 1;

						.guest-title {
							font-size: 32upx;
							color: #FFFFFF;
							font-weight: 600;
							margin-bottom: 8upx;
						}

						.guest-subtitle {
							font-size: 24upx;
							color: #999999;
						}
					}

					.guest-arrow {
						font-size: 32upx;
						color: #999999;
					}
				}
			}

			.moneyone{
				text-align: center;
				.moneshang{
					font-size: 36upx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #FFFFFF;
					margin-bottom: 8upx;
				}
				.monexia{
					font-size: 26upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
			.monez{
				width: 2upx;
				height: 70upx;
				background: #fff;
			}
		}
		.show {
			.one{
				width: 100%;
				box-sizing: border-box;
				padding: 0 50upx;
				.onetap{
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin-bottom: 30upx;
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
			.tap {
				width: 649upx;
				height: 300upx;
				border-radius: 16upx;
				margin: 30upx auto;
				margin-bottom: 0upx;
				padding-bottom: 150upx;
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
				margin: 30upx auto;
				margin-bottom: 0upx;
				padding-bottom: 150upx;
				image {
					width: 649upx;
					height: 300upx;
					border-radius: 16upx;
				}
			}
		}


	}
</style>
