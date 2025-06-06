<template>
	<view class="main">
		<view class="foothand" @click="gzbtn" v-if="this.wechatLogo">
			点击关注公众号，接收充电消息通知
		</view>
		<tou_hand ref="childComponent"></tou_hand>
		<navigator url='../../pagetwo/records_consumption/records_consumption' hover-class="none">
			<van-notice-bar :scrollable="true" left-icon="volume-o" color='#FFFFFF' speed='40'>
				亲爱的充电柜用户，因网络原因无法打开柜门,请前往个人中心-查看更多-消费记录,查看开柜密码打开柜门
			</van-notice-bar>
		</navigator>

		<view class="hand" v-if="showlist.length!=0">

			<view class="show" v-for="(item,index) in showlist" :key="index"
				@click="onDetail(item.id,item.deviceId,item.spareVar5)">
				<view class="showhand">
					<view class="hleft">
						<span v-if='item.deviceId.substr(-2,1)!=9'>充电桩编号<span
								style='color: #007AFF;'>（桩）</span>：{{item.code}}</span>
						<span v-if='item.deviceId.substr(-2,1)==9'>充电柜编号<span
								style='color: #07C160;'>（柜）</span>：{{item.code}}</span>
					</view>
					<view class="hright">充电中</view>
				</view>
				<view class="showfoot">
					<view class="fleft">
						订单编号：{{item.orderNum}}
					</view>
					<view class="fleft">
						小区名称：{{item.projectName}}
					</view>
					<view class="fleft">
						开始时间：{{item.startTime}}
					</view>
					<view class="fleft" v-if="item.spareVar5==1" style="display: flex;align-items: center;">
						充电守护：<view style='color: #07C160;'>生效中</view>
						<view style="color: #FFA02E;margin-left: 20upx;" @click='xysm'>《协议说明》</view>
						<view class="fleftson" @click="lxkf(item.orderNum)" v-if="White==1">客服</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
		</view>
		<view class="notap" v-if="showlist.length==0">
			<image src="../../static/tabBarimg/zwdd.png"></image>
			暂无订单
		</view>
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
		<tabBar tab01="3"></tabBar>
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
	import tabBar from '../../components/tabBar/tabBar.vue'
	import tou_hand from '../../components/tou_hand/tou_hand.vue'
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import {
		Config
	} from '../../common/Config.js'
	export default {
		components: {
			tabBar,
			tou_hand
		},
		mounted() {

		},

		data() {
			return {
				status: 'noMore', //more/loading/noMore
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				finished: false, // 是否已加载所有数据
				pageNum: 1, //页码
				pageSize: 10, //每页显示的条数
				showlist: [], //正在充电的设备列表数据
				gzshow: false,
				wechatLogo: '', //是否显示公众号二维码
				wechaturl: '', //是否显示公众号二维码
				xylist: '',
				kfshow: false,
				wxtcshow: false,
				btnshow: false,
				consumNo: '',
				White: 0
			}
		},
		onLoad() {
		},
		onShow() {
			this.$refs.childComponent.userdetail();
			this.safeWhite()
			this.btnshow = false
			this.wechatLogo = uni.getStorageSync('wechatLogo')
			this.wechaturl = uni.getStorageSync('wechaturl')
			this.onRefresh();
			this.fetchUserInfo()
		},
		//下拉刷新
		onPullDownRefresh() {
			this.onRefresh()
		},
		//上滑加载
		onReachBottom() {
			if (!this.finished) {
				this.loadMore()
			}
		},
		methods: {
			onDetail(id, deviceId) {
				if (this.btnshow == false) {
					var ctype = ''
					if (deviceId.substr(-2, 1) == 9) {
						ctype = 1
					} else {
						ctype = 0
					}
					uni.navigateTo({
						url: '../chargingzhong_detail/chargingzhong_detail?id=' + id + '&codetype=' + ctype
					})
					uni.navigateTo({
						url: '/pageone/chargingzhong_detail/chargingzhong_detail?id=' + id + '&codetype=' + ctype
					})
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
			// 分页
			loadMore() {
				let data = {
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				this.status = "loading"
				this.$base.request('charging/list', 'GET', data)
					.then(res => {
						uni.stopPullDownRefresh();

						if (res.data.rows && res.data.rows.length > 0) {
							this.showlist = this.showlist.concat(res.data.rows);
							if (this.showlist.length != res.data.total) {
								this.pageNum += 1;
								this.status = "more"
								this.finished = false
							} else {
								this.status = 'noMore'
								this.finished = true;
							}

						} else {

							this.status = 'noMore'
							this.finished = true;
						}
					})
					.catch(err => {

					})
			},
			onRefresh() {
				this.finished = false
				this.pageNum = 1
				this.showlist = [];
				this.loadMore()
			},
			gzbtn() {
				this.gzshow = true
			},
			xyshow() {
				this.$base.request('charge/safe/marketing', 'GET')
					.then(res => {
						if (res.data.code == 200) {
							this.xylist = res.data.data
							if (this.xylist.wechatImg) {
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
						} else {
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {

					})
			},
			lxkf(orderNum) {
				this.consumNo = orderNum
				this.xyshow()
				this.kfshow = true
				this.btnshow = true
			},
			//关闭客服弹窗
			gkf() {
				this.btnshow = false
				this.kfshow = false
			},
			//关闭公众号弹窗
			gwx() {
				this.btnshow = false
				this.wxtcshow = false
			},
			//获取用户所在小区运营商是否开启白名单
			safeWhite() {
				this.$base.request('user/safeWhite', 'GET')
					.then(res => {
						if (res.data.code == 200) {
							this.White = res.data.data
						} else {
							this.White = 0
						}
					})
					.catch(err => {

					})
			},
			//打开公众号弹窗
			zaixian() {
				this.btnshow = true
				if (this.xylist.imgStatuss == 1) {
					Dialog.confirm({
						title: '提示',
						message: '确认联系在线客服？',
					}).then(() => {
						let data = {
							inletType: 'detail',
							consumNo: this.consumNo
						}
						uni.showLoading({
							title: '请稍候',
							mask: true
						})
						this.$base.request('user/customer/add', 'POST', data)
							.then(res => {
								uni.hideLoading()
								if (res.data.code == 200) {
									this.wxtcshow = true
									this.kfshow = false
								} else {
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
				} else {
					Toast.fail('在线客服尚未启用')
				}

			},
			//拨打电话
			callphone() {
				this.btnshow = false
				if (this.xylist.phoneStatuss == 1) {
					Dialog.confirm({
						title: '提示',
						message: '确认拨打电话客服',
					}).then(() => {
						let data = {
							inletType: 'detail',
							consumNo: this.consumNo
						}
						uni.showLoading({
							title: '请稍候',
							mask: true
						})
						this.$base.request('user/customer/add', 'POST', data)
							.then(res => {
								uni.hideLoading()
								if (res.data.code == 200) {
									uni.makePhoneCall({
										phoneNumber: this.xylist.phone.toString()
									}).catch((e) => {
										// console.log(e)  //用catch(e)来捕获错误{makePhoneCall:fail cancel}
									})
									this.kfshow = false
								} else {
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
				} else {
					Toast.fail('电话客服尚未启用')
				}

			},
			//协议说明
			xysm() {
				this.btnshow = true
				uni.navigateTo({
					url:'/pageone/protocol_specification/protocol_specification'
				})
			},
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
		margin-bottom: 140upx;

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

		

		/deep/.van-notice-bar {
			width: 650upx;
			height: 70upx;
			background: #343136;
			border-radius: 24upx;
			padding: 0 24upx;
			margin: 0 auto;
			margin-top: 30upx;
		}

		.hand {
			width: 100%;
			margin-top: 90upx;
		}

		.show {
			margin: 0 auto;
			margin-bottom: 20upx;
			box-sizing: border-box;
			width: 650upx;
			
			
			box-sizing: border-box;
			.showhand {
				width: 100%;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				padding: 30upx 26upx;
				background-color: #3C393E;
				border-radius: 24upx 24upx 0upx 0upx;

				.hleft {
					font-size: 28upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}

				.hright {
					font-size: 26upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFA02E;
				}
			}

			.showfoot {
				width: 100%;
				box-sizing: border-box;
				padding: 13upx 0upx 24upx 26upx;
				border-radius:0upx 0upx 24upx 24upx;
				background: #343136;
				.fleft {
					font-size: 26upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #D0D0D0;
					margin-bottom: 10upx;

					.fleftson {
						padding: 0upx 14upx;
						color: #333;
						background-color: #fff;
						border-radius: 5upx;
						margin-left: 30upx;
					}
				}
			}
		}

		.notap {
			width: 245upx;
			margin: 0 auto;
			text-align: center;
			margin-top: 300upx;

			image {
				width: 245upx;
				height: 176upx;
				margin-bottom: 36upx;
			}

			font-size: 26upx;
			font-family: PingFangSC-Regular,
			PingFang SC;
			font-weight: 400;
			color: #6E7071
		}

		.kf {
			/deep/.van-popup {
				border-radius: 36upx;
				overflow-x: hidden;
			}

			.kfmap {
				background-color: #ffffff;
				width: 544upx;
				position: relative;
				padding-bottom: 50upx;
				padding-top: 58upx;
				box-sizing: border-box;

				.one {
					position: absolute;
					top: 30upx;
					right: 30upx;

					image {
						width: 29upx;
						height: 29upx;
					}
				}

				.two {
					text-align: center;
					font-size: 34upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 700;
					color: #111111;
					line-height: 48upx;
				}

				.three {
					margin-top: 44upx;
					text-align: center;
					font-size: 30upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 700;
					color: #3A4044;
					line-height: 42upx;
				}

				.four {
					display: flex;
					padding: 0 54upx;
					justify-content: center;
					align-items: center;
					margin-top: 70upx;

					.fourfirst {
						display: flex;
						align-items: center;

						image {
							width: 30upx;
							height: 30upx;
							margin-right: 5upx;
						}

						font-size: 34upx;
						font-family: PingFangSC-Regular,
						PingFang SC;
						font-weight: 700;
						color: #3A4044;
						line-height: 48upx;
					}

					.foursecond {
						display: flex;
						align-items: center;

						image {
							width: 35upx;
							height: 29upx;
							margin-right: 5upx;
						}

						font-size: 34upx;
						font-family: PingFangSC-Medium,
						PingFang SC;
						font-weight: 700;
						color: #EC651C;
						line-height: 48upx;
					}

					.fourthired {
						width: 1upx;
						height: 55upx;
						background: #EEEEEE;
						margin: 0 48upx;
					}
				}

				.five {
					text-align: center;

					image {
						width: 424upx;
						height: 424upx;
						background: #D4D4D4;
						border-radius: 10upx;
					}
				}

				.six {
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