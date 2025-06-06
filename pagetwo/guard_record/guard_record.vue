<template>
	<view class="main">
		<view class="show">
			<view class="cdjl-0" v-if="value">
				<uni-datetime-picker v-model="value" type="daterange" @change="timechange" />
			</view>

			<view class="map" v-for="(item,index) in showlist" :key="index">
				<view class="one">
					<view class="oneleft">充电守护</view>
				</view>
				<view class="two">
					<view class="twofirst">
						<view class="twofirstleft twomap">
							充电守护订单号：{{item.consumNum}}
						</view>
						<view class="twofirstright" @click="copy(item.consumNum)">
							<image src="../../static/tabBarimg/fuzhi.png"></image>复制
						</view>
					</view>
					<view class="twofirst">
						<view class="twofirstleft">
							充电守护金额：￥{{item.moneyReal}}
						</view>
					</view>
					<view class="twofirst">
						<view class="twofirstleft">
							购买时间：{{item.createTime}}
						</view>
					</view>
				</view>
				<view class="three">
					<view v-if="item.isCollect==1" class="span color1">投保成功</view>
					<view v-else class="span color3">投保失败</view>
				</view>
			</view>
			<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
		</view>
		<view class="dibu" v-show="showlist.length>0">
			<view class="dibuone" @click="xysm">协议说明</view>
			<view class="dibutwo" @click="lxkf" v-show="White==1">联系客服</view>
		</view>
		<view class="kf">
			<van-popup :show="kfshow">
				<view class="kfmap">
					<view class="one" @click="gkf">
						<image src="../../static/tabBarimg/kfclose.png"></image>
					</view>
					<view class="two">专属客服</view>
					<view class="three">您可以通过以下方式联系到我哦</view>
					<view class="four">
						<view class="fourfirst" @click="callphone" v-show="xylist.phoneStatuss==1">
							<image src="../../static/tabBarimg/kfphone.png"></image>
							电话客服
						</view>
						<view class="fourthired" v-show="xylist.imgStatuss==1&&xylist.phoneStatuss==1"></view>
						<view class="foursecond" @click="zaixian" v-show="xylist.imgStatuss==1">
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
	import {
		formatDate
	} from '../../common/formatDate.js';
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import {
		Config
	} from '../../common/Config.js'
	export default {
		components: {},
		mounted() {},

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
				showlist: [], //列表数据
				xylist: '',
				kfshow: false,
				wxtcshow: false,
				value: [],
				type: 'range', //时间选择器
				showPicker: false, //时间选择器
				White: 0, //是否开启白名单
			}
		},
		onLoad(option) {
			this.show()
			this.safeWhite()
		},
		onShow() {
			this.onRefresh();
			this.xyshow()
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
			show() {
				var nowtime = formatDate(new Date(), 'yyyy-MM-dd');
				var oldtime = formatDate(new Date(new Date().getTime() - 2592000000), 'yyyy-MM-dd');
				this.value = [oldtime, nowtime]
			},
			timechange(e) {
				this.onRefresh()
			},
			//复制文档
			copy(consumNum) {
				uni.setClipboardData({
					data: consumNum,
					success: () => {
						uni.showToast({
							icon: 'none',
							title: '复制成功'
						});
					}
				});
			},
			// 分页
			loadMore() {
				let data = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					beginTime: this.value[0],
					endTime: this.value[1]
				}
				this.status = "loading"
				this.$base.request('consumeRecord/safe/list', 'GET', data)
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
			lxkf() {
				this.kfshow = true
			},
			//关闭客服弹窗
			gkf() {
				this.kfshow = false
			},
			//关闭公众号弹窗
			gwx() {
				this.wxtcshow = false
			},
			//打开公众号弹窗
			zaixian() {
				if (this.xylist.imgStatuss == 1) {
					Dialog.confirm({
						title: '提示',
						message: '确认联系在线客服？',
					}).then(() => {
						let data = {
							inletType: 'guarantee'
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
				if (this.xylist.phoneStatuss == 1) {
					Dialog.confirm({
						title: '提示',
						message: '确认拨打电话客服',
					}).then(() => {
						let data = {
							inletType: 'guarantee'
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
				uni.navigateTo({
					url: '/pageone/protocol_specification/protocol_specification'
				})
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
			}
		}
	}
</script>
<style>
	page {
		height: 100%;
		background-color: #242225;
	}
</style>
<style lang="scss" scoped>
	.main::-webkit-scrollbar {
		display: none;
	}

	.main {
		width: 100%;
		overflow-x: hidden;
		background-color: #242225;
		height: 100vh;

		.hand {
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

			image {
				width: 22upx;
				height: 39upx;
				position: absolute;
				left: 31upx;
				top: 22upx;
			}
		}

		/deep/.van-list__finished-text {
			margin-top: 100upx;
			padding-bottom: 200upx;
		}

		/deep/.van-hairline--top-bottom::after {
			border-width: 0;
		}

		/deep/.van-cell {
			padding: 0upx;
			width: 650upx;
			background: #343136;
			border-radius: 24upx;
			margin: 0 auto;
			box-sizing: border-box;
			margin-bottom: 36upx;
		}

		/deep/.van-cell:not(:last-child)::after {
			border-bottom: 0upx;
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

		.show {
			width: 100%;
			padding: 50upx;
			box-sizing: border-box;
			height: 100vh;

			.cdjl-0 {
				width: 100%;
				box-sizing: border-box;
				display: flex;
				background: #343136;
				height: 100upx;
				align-items: center;
				justify-content: space-around;
				border-radius: 18upx;

				/deep/.uni-date-x--border {
					width: 100%;
					box-sizing: border-box;
					border: 0upx !important;
				}

				/deep/.uni-date-x {
					width: 100%;
					display: flex;
					box-sizing: border-box;
					background: #343136;
					align-items: center;
					padding: 0upx !important;
					justify-content: space-between !important;
					border-radius: 18upx;
				}

				/deep/.uni-date__x-input {
					height: 60upx;
					width: 260upx;
					border-radius: 10upx;
					border: 2upx solid #ccc;
					font-size: 30upx;
					line-height: 60upx;
					color: #bbbbbb;
					text-align: center;
				}
			}

			.map {
				padding: 24upx;
				width: 650upx;
				background: #343136;
				border-radius: 24upx;
				margin: 0 auto;
				box-sizing: border-box;
				margin-top: 36upx;
				box-sizing: border-box;
				position: relative;

				.one {
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin-bottom: 24upx;
					align-items: center;

					.oneleft {
						font-size: 30upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 700;
						color: #FFFFFF;
						line-height: 42upx;
					}

					.oneright {
						font-size: 22upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #D0D0D0;
						line-height: 30upx;
					}
				}

				.two {
					.twofirst {
						width: 100%;
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 12upx;

						.twofirstleft {
							font-size: 22upx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #D0D0D0;
							line-height: 30upx;
						}

						.twomap {
							width: 83%;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;

						}

						.twofirstright {
							display: flex;
							align-items: center;

							image {
								width: 20upx;
								height: 24upx;
								margin-right: 6upx;
							}

							font-size: 22upx;
							font-family: PingFangSC-Regular,
							PingFang SC;
							font-weight: 400;
							color: #FFA02E;
							line-height: 30upx;
						}
					}
				}

				.three {
					position: absolute;
					top: 0upx;
					right: 0upx;
					font-size: 24upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;

					.span {
						width: 138upx;
						height: 50upx;
						border-radius: 0upx 24upx 0upx 24upx;
						text-align: center;
						line-height: 50upx;
					}

					.color1 {
						background: #EC651C;
					}

					.color2 {
						background: #FFA02E;
					}

					.color3 {
						background: #A6A3A2;
					}
				}
			}
		}

		.dibu {
			position: fixed;
			width: 100%;
			box-sizing: border-box;
			padding: 52upx;
			bottom: 52upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.dibuone {
				width: 300upx;
				height: 100upx;
				background: linear-gradient(180deg, #FFE7BF 0%, #FDC894 100%);
				border-radius: 36upx;
				font-size: 34upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 700;
				color: #EC651C;
				line-height: 100upx;
				text-align: center;
				letter-spacing: 2upx;
			}

			.dibutwo {
				width: 300upx;
				height: 100upx;
				background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
				border-radius: 36upx;
				font-size: 34upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 700;
				color: #FFFFFF;
				line-height: 100upx;
				text-align: center;
				letter-spacing: 2upx;
			}
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