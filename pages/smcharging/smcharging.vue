<template>
	<view class="main">
		<view class="foothand" @click="gzbtn" v-show="this.wechatLogo">
			点击关注公众号，接收充电消息通知
		</view>
		<view :class="logolist.loshow=='0'?'one':'one1'">
			<image :src=logolist.logo></image>
			<a :href="'tel:'+projectPhone" v-show="projectPhone">
				<view class="oneright">
					<image src="../../static/tabBarimg/kflogo.png"></image>
					<view>客服</view>
				</view>
			</a>
		</view>
		<view class="two">
			<view class="twoleft" @click="zhcz">
				<image src="../../static/tabBarimg/k1.png"></image>
				<view class="twolefttxt">账户充值</view>
			</view>
			<view class="tworight">
				<navigator url="../../pageone/electric_card_management/electric_card_management" hover-class="none">
					<view class="tworightshang">
						<image src="../../static/tabBarimg/k2.png"></image>
						<view class="tworightshangtxt">电卡管理</view>
					</view>
				</navigator>

				<view class="tworightxia">
					<navigator url="../../pageone/nearest_charging/nearest_charging" hover-class="none">
						<view class="trxl">
							<view class="trxls">
								<image src="../../static/tabBarimg/k3.png"></image>
							</view>
							附近电站
						</view>
					</navigator>
					<navigator url="../../pageone/using_help/using_help" hover-class="none">
						<view class="trxl">
							<view class="trxls">
								<image src="../../static/tabBarimg/k4.png"></image>
							</view>
							使用帮助
						</view>
					</navigator>
				</view>
			</view>
		</view>
		<view class="lun">
			<an-notice-bar :text="noticeMsg" color="#FFFFFF" bgColor="#343136"></an-notice-bar>
		</view>
		<view class="kant">
			<view class="saoma" @click="smbtn">
				<image src="../../static/tabBarimg/smtb.png"></image>
				<view class="smtxt">
					扫码
				</view>
			</view>
			<view class="smtxt1" @click="goyuan">远程充电</view>
		</view>
		<view class="tap" v-if="poster==1">
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
				<van-swipe-item v-for="(item, index) in posterList" :key="index">
					<image :src=item.img @click="gogd(item.url,item.jump,item.msg,item.libId,item.teamId)"></image>
				</van-swipe-item>
			</van-swipe>
		</view>


		<tabBar tab01="2"></tabBar>
		<!-- <van-popup :show="dshow" :close-on-click-overlay="false">
			<view class="tan">
				<view class="xz">
					<image src="../../static/tabBarimg/dcar.png"></image>
					<view class="xzone">欢迎使用智能充电充电系统</view>
					<view class="xztwo">接下来</view>
					<view class="xztwo">我们将为您展示一些重要功能的操作指引</view>
					<view class="xzthree">再次查看,请进入"个人中心-使用帮助-操作指引"</view>
				</view>
				<view class="anniu">
					<view class="anniu1" @click="colosezhi">跳过</view>
					<view class="anniu2" @click="gozhi">接受</view>
				</view>
			</view>

		</van-popup> -->
		<van-popup :show="gzshow">
			<view class="gztan">
				<view class="gztanimg">
					<img :src="wechaturl"></img>
					<!-- <img src='../../static/tabBarimg/00000006.jpg'></img> -->
				</view>
				<view class="gztantxt">
					长按识别二维码，关注公众号，接收充电消息通知
				</view>
			</view>
		</van-popup>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import tabBar from '../../components/tabBar/tabBar.vue'
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import {
		Config
	} from '../../common/Config.js'
	export default {
		components: {
			tabBar
		},
		mounted() {

		},
		data() {
			return {
				noticeMsg: "",
				posterList: [], //轮播图数组
				poster: 0,
				dshow: false, //指引提示
				logolist: '', //logo图片
				gzshow: false,
				wechatLogo: '', //是否显示公众号二维码
				wechaturl: '', //是否显示公众号二维码

			}
		},
		onReady() {},
		onLoad() {


		},
		onShow() {
			console.log('smcharging页面 onShow 被调用');

			// 清除全局扫码参数，防止从poweron页面返回后重复跳转
			const app = getApp();
			if (app && app.globalData && app.globalData.scanParams) {
				console.log('smcharging页面：清除全局扫码参数，防止重复跳转');
				app.globalData.scanParams = null;
			}

			// 允许游客浏览，不强制登录检查
			this.initPageData();
		},
		methods: {
			// 检查登录状态
			checkLoginStatus() {
				const userToken = uni.getStorageSync('userToken');
				const user = uni.getStorageSync('user');

				// 如果没有token或用户信息，需要登录
				if (!userToken || !user) {
					console.log('smcharging页面：用户未登录，显示登录提示');
					this.$base.handleLoginRequired();
					return false;
				}

				return true;
			},

			// 初始化页面数据
			initPageData() {
				try {
					const user = uni.getStorageSync('user');
					const userId = uni.getStorageSync('userId');
					const userToken = uni.getStorageSync('userToken');

					// 游客模式：显示基本信息
					this.wechatLogo = uni.getStorageSync('wechatLogo');
					this.wechaturl = uni.getStorageSync('wechaturl');

					// 获取公告信息（不需要登录）
					this.lbbtn();

					// 只有登录用户才执行需要登录的功能
					if (userToken && user && userId) {
						// 安全地访问用户数据
						if (user.poster == 1) {
							this.guanggao();
						}

						// 检查用户锁定状态
						if (user.locks == 1) {
							this.kbtngo();
						}

						// 检查用户类型
						var usertype = 'type_' + userId;
						if (uni.getStorageSync(usertype) == 1) {
							this.dshow = false;
						} else if (uni.getStorageSync(usertype) == 0) {
							this.dshow = true;
						}

						// 设置项目电话
						if (user.projectPhone) {
							this.projectPhone = user.projectPhone;
						}

						// 处理logo显示
						var logolist = 'logolist_' + userId;
						var logo = uni.getStorageSync(logolist);
						if (logo) {
							this.logolist = logo;
						} else {
							this.logoshow();
						}

						this.fetchUserInfo();
					} else {
						// 游客模式：显示默认状态
						console.log('游客模式：显示基本页面内容');
						this.dshow = true; // 默认显示状态
					}
				} catch (error) {
					console.error('smcharging页面初始化数据时出错:', error);
				}
			},

			fetchUserInfo() {
				const user = uni.getStorageSync('user');
				if (!user) {
					console.log('没有用户信息，跳过fetchUserInfo');
					return;
				}

				var type = user.type;
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
			lbbtn() {
				let data = {
					pageNum: 1,
					pageSize: 5
				}

				this.$base.request('notice/list', 'GET', data)
					.then(res => {
						if (res.data.code == 0) {
							var arr = []
							var list = res.data.rows
							for (var i = 0; i < list.length; i++) {
								arr.push(list[i].title)
							}
							this.noticeMsg = arr.join("|")
						}

					})
					.catch(err => {

					})
			},
			smbtn() {
				uni.scanCode({
					onlyFromCamera: true,
					success: (res) => {
						var str = res.result
						var device = str.substring(str.length - 11, str.length - 3);
						var port = str.substring(str.length - 2, str.length);
						var ss = '';

						if (port != 'ff' && port != 'FF') {
							ss = this.pad(parseInt(port, 16).toString(10), 2);
							// ss=this.pad(port,2);
						} else {
							ss = port;
						};
						if (device && ss) {
							clearTimeout(this.timeId)
							uni.navigateTo({
								url: '/pageone/poweron/poweron?device=' + device + '&port=' + ss +
									'&cmd=' + 0 + '&from=' + 2
							})
						}
					},
					fail: (res) => {
						Toast.fail('请扫描设备二维码')
						// this.stype=1
						// return false
					}
				})
			},
			guanggao() {
				const user = uni.getStorageSync('user');
				const userToken = uni.getStorageSync('userToken');

				if (!user || !userToken || !user.projectId) {
					console.log('缺少用户信息或token，跳过广告获取');
					this.poster = 0;
					return;
				}

				let data = {
					point: 'homePage',
					projectId: user.projectId,
					token: userToken
				}
				this.$base.request('poster/getPosterList', 'POST', data)
					.then(res => {
						if (res.data.code == 200) {
							this.posterList = res.data.data
							if (this.posterList.length > 0) {
								this.poster = 1
							} else {
								this.poster = 0
							}
						} else {
							this.poster = 0
						}
					})
					.catch(err => {
						console.error('获取广告信息失败:', err);
						this.poster = 0;
					})
			},
			gogd(url, jump, msg, libId, teamId) {
				if (jump == 'PU' || jump == 'SA') {
					if (url != 0) {
						let point = 'homePage'
						this.ggadd(libId, teamId, point)
						uni.navigateTo({
							url: '/pages/webview/webview?url=' + url
						});
					}
				} else if (jump == 'PA') {
					let point = 'homePage'
					this.ggadd(libId, teamId, point)
					uni.navigateTo({
						url: '/pageone/ad_details/ad_details?msg=' + msg
					});
				} else if (jump == 'PPRO') {
					let point = 'homePage'
					this.ggadd(libId, teamId, point)
				}

			},
			ggadd(libId, teamId, point) {
				let data = {
					systemId: 0,
					libId: libId,
					teamId: teamId,
					point: point,
					appid: uni.getStorageSync('user').appid,
					projectId: uni.getStorageSync('user').projectId
				}
				this.$base.request('posterClickMsg/add', 'POST', data)
					.then(res => {

					})
					.catch(err => {

					})
			},
			pad(num, n) {
				var len = num.toString().length;
				while (len < n) {
					num = "0" + num;
					len++;
				}
				return num;
			},

			goyuan() {
				uni.navigateTo({
					url: "/pageone/remote_charging/remote_charging"
				})
			},
			zhcz() {
				uni.navigateTo({
					url: '/pageone/account_recharge/account_recharge'
				})

			},
			colosezhi() {
				this.dshow = false
				var usertype = 'type_' + uni.getStorageSync('userId')
				uni.setStorageSync(usertype, 1)

				this.$base.request('guide/state', 'PUT')
					.then(res => {


					})
					.catch(err => {

					})

			},

			gozhi() {
				this.$base.request('guide/state', 'PUT')
					.then(res => {


					})
					.catch(err => {


					})

				uni.navigateTo({
					url: '/pageone/Operation_guide/Operation_guide'
				})
			},
			kbtngo() {

				uni.navigateTo({
					url: '/pagetwo/personal_data/personal_data?zt=' + 1
				})
			},
			logoshow() {
				const userId = uni.getStorageSync('userId');
				const userToken = uni.getStorageSync('userToken');

				if (!userId || !userToken) {
					console.log('缺少用户ID或token，跳过logo获取');
					return;
				}

				let _this = this
				var logolist = 'logolist_' + userId
				uni.removeStorageSync(logolist)
				_this.$base.request('wechat/phone', 'GET')
					.then(res => {
						if (res.data.code == 200) {
							var list = res.data.data
							if (list.logo) {
								list.logo = Config.imgapi + list.logo
								uni.getImageInfo({
									src: list.logo,
									success: function(image) {
										var contentWidth = image.width;
										var contentHeight = image.height;
										if(contentWidth==contentHeight){
											list.loshow=1
										}else{
											list.loshow=0
										}
										_this.logolist=list
										uni.setStorageSync(logolist, list)
									}
								});

							}

						} else {
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {
						console.error('获取logo信息失败:', err);
					})

			},

			gzbtn() {
				this.gzshow = true
			}

		}
	}
</script>
<style>
	page {
		height: 100%;
		background-image: linear-gradient(#472E23 2%, #242225 28%, #242225 70%);
	}
</style>
<style lang="scss" scoped>
	.main {
		width: 100%;
		overflow-x: hidden;

		.foothand {
			width: 90%;
			background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
			border-radius: 24upx;
			padding: 10upx 24upx;
			margin: 0 auto;
			box-sizing: border-box;
			margin-top: 30upx;
			color: #fff;
		}

		.gztan {
			width: 650upx;
			background-color: #FFFFFF;
			text-align: center;
			padding: 70upx 0;

			.gztanimg {
				width: 350upx;
				height: 350upx;
				margin: 0 auto;

				img {
					width: 350upx;
					height: 350upx;
				}
			}

			.gztantxt {
				margin-top: 30upx;
				font-size: 20upx;
			}
		}

		.one {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding: 0 63upx;
			box-sizing: border-box;
			margin-top: 34upx;
			margin-bottom: 30upx;

			image {
				width: 213upx;
				height: 64upx;
			}

			.oneright {
				font-size: 26upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFDFCE;
				display: flex;
				align-items: center;

				image {
					width: 50upx;
					height: 50upx;
					margin-right: 8upx;
				}
			}
		}

		.one1 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding: 0 63upx;
			box-sizing: border-box;
			margin-top: 34upx;
			margin-bottom: 10upx;

			image {
				width: 160upx;
				height: 160upx;
			}

			.oneright {
				font-size: 26upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFDFCE;
				display: flex;
				align-items: center;

				image {
					width: 50upx;
					height: 50upx;
					margin-right: 8upx;
				}
			}
		}

		.two {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding: 0 50upx;
			box-sizing: border-box;

			.twoleft {
				width: 320upx;
				height: 320upx;
				background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
				border-radius: 36upx;
				text-align: center;

				image {
					width: 95upx;
					height: 96upx;
					margin-top: 80upx;
					margin-bottom: 21upx;
				}

				.twolefttxt {
					font-size: 34upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}

			}

			.tworight {
				box-sizing: border-box;
				width: 280upx;
				height: 320upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.tworightshang {
					background-color: #FFE1A9;
					width: 280upx;
					height: 130upx;
					border-radius: 36upx;
					padding: 42upx 0;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					padding-left: 40upx;

					image {
						width: 58upx;
						height: 46upx;
						margin-right: 26upx;
					}

					.tworightshangtxt {
						font-size: 26upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #242225;
					}
				}

				.tworightxia {
					width: 280upx;
					display: flex;
					justify-content: space-between;

					.trxl {
						font-size: 26upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #AC9B93;
						text-align: center;

						.trxls {
							width: 120upx;
							height: 120upx;
							background: #FFDFCE;
							border-radius: 24upx;
							box-sizing: border-box;
							padding: 33upx;

							image {
								width: 54upx;
								height: 54upx;
							}
						}
					}
				}
			}
		}

		.lun {
			width: 100%;
			padding: 0 50upx;
			box-sizing: border-box;
			margin-top: 40upx;
		}

		.tap {
			width: 649upx;
			height: 300upx;
			border-radius: 16upx;
			margin: 0 auto;
			padding-bottom: 150upx;

			image {
				width: 649upx;
				height: 300upx;
				border-radius: 16upx;
			}
		}

		.kant {
			margin: 40upx 0;

			.saoma {
				width: 650upx;
				height: 130upx;
				margin: 0 auto;
				background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
				border-radius: 36upx;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 75upx;
					height: 63upx;
					margin-right: 36upx;
				}

				.smtxt {
					font-size: 34upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}

			}

			.smtxt1 {
				width: 138upx;
				font-size: 30upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 700;
				color: #A6A3A2;
				text-align: center;
				margin: 0 auto;
				padding-bottom: 10upx;
				margin-top: 26upx;
			}
		}

		.tan {
			width: 600upx;
			padding-top: 100upx;

			.xz {
				text-align: center;
				padding: 0 30upx;

				image {
					width: 300upx;
					height: 289upx;
				}

				.xzone {
					margin-top: 28upx;
					font-weight: bold;
					color: #000000;
					margin-bottom: 80upx;
					font-size: 38upx;

				}

				.xztwo {
					margin-top: 15upx;
					font-weight: 600;
					color: #EC651C;
					font-size: 30upx;
				}

				.xzthree {
					margin-top: 30upx;
					font-weight: 600;
					color: #4e4e4e;
					font-size: 20upx;
					margin-bottom: 40upx;
				}
			}

			.anniu {
				width: 100%;
				display: flex;
				justify-content: space-between;
				font-size: 34upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #3A4044;
				text-align: center;
				padding: 36upx 0;

				.anniu1 {
					width: 50%;
					height: 55upx;
					line-height: 55upx;
					border-right: 1upx solid #eeeeee;
				}

				.anniu2 {
					width: 50%;
					height: 55upx;
					line-height: 55upx;
					color: #EC651C;
				}
			}
		}


	}
</style>