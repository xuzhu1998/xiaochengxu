<template>
	<view class="main">
		<view class="one">
			<view class="onetap">

				<view class="onetapmont" @click="tapbtn(2)">
					<image src="../../static/tabBarimg/k18.png" style='width:52upx;height:52upx;'></image>
					<view class="onetapmonttxt">常见问题</view>
				</view>


				<view class="onetapmont" @click="tapbtn(3)">
					<image src="../../static/tabBarimg/k19.png" style='width:46upx;height:50upx;'></image>
					<view class="onetapmonttxt">用车常识</view>
				</view>

			</view>
			<view class="onetap">
				<view class="onetapmont" @click="tapbtn(4)">
					<image src="../../static/tabBarimg/k20.png" style='width:50upx;height:50upx;'></image>
					<view class="onetapmonttxt">电话客服</view>
				</view>

				<view class="onetapmont" @click="wxshowopen">
					<image src="../../static/tabBarimg/k21.png" style='width:57upx;height:48upx;'></image>
					<view class="onetapmonttxt">微信客服</view>
				</view>

			</view>
			<view class="onetap">

				<view class="onetapmont" @click="tapbtn(6)">
					<image src="../../static/tabBarimg/k22.png" style='width:50upx;height:51upx;'></image>
					<view class="onetapmonttxt">故障报修</view>
				</view>

				<view class="onetapmont" @click="tapbtn(7)">
					<image src="../../static/tabBarimg/k23.png" style='width:52upx;height:63upx;'></image>
					<view class="onetapmonttxt">操作指引</view>
				</view>

			</view>


		</view>

		<!-- //微信二维码弹窗 -->
		<van-popup :show="wxshow">
			<view class="tannei1">
				<view class="tnhand">
					<view class="tntxt">客服微信</view>
					<image src="../../static/tabBarimg/close.png" @click="wxshowclose"></image>
				</view>
				<view class="tnfoot">
					<view class="wxcodeimg">
						<image :src="erimg" show-menu-by-longpress="true"></image>
					</view>
					<view class="wxtxt">
						长按可以识别二维码，可以直接加微信客服沟通哦
					</view>
				</view>
			</view>
		</van-popup>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import {
		Config
	} from '../../common/Config.js';
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	export default {
		components: {

		},
		mounted() {},

		data() {
			return {
				list: {},
				erimg: '',
				wxshow: false
			}
		},
		onLoad() {
			this.show();
		},
		methods: {
			// 获取使用帮助列表
			show() {

				this.$base.request('user/infos', 'GET')
					.then(res => {
						if (res.data.code == 200) {
							this.list = res.data.data
							if (this.list.wechatLogo) {
								this.list.wechatLogo = Config.imgapi + this.list.wechatLogo
							}
							if (res.data.data.wechatImg) {
								let url1 = Config.imgapi + res.data.data.wechatImg
								let that = this
								uni.request({
									url: url1,
									responseType: 'arraybuffer',
									success(res) {
										let url = 'data:image/png;base64,' + uni.arrayBufferToBase64(res.data)
										that.erimg = url
									}
								})
							} else {
								Toast.fail('暂无客服')
							}
						} else {
							Toast.fail(res.data.msg)
							return
						}
					})
					.catch(err => {

					})
			},
			tapbtn(type) {
				if (type == 1 || type == 2 || type == 3) {
					uni.navigateTo({
						url: '../using_help_list/using_help_list?type=' + type
					})
				} else if (type == 4) {
					if (this.list.projectPhone) {
						uni.makePhoneCall({
							phoneNumber: this.list.projectPhone.toString()
						}).catch((e) => {
							// console.log(e)  //用catch(e)来捕获错误{makePhoneCall:fail cancel}
						})
					} else {
						Toast.fail('暂无客服')
					}
				} else if (type == 7) {
					uni.navigateTo({
						url: "/pageone/Operation_guide/Operation_guide"
					});
				} else if (type == 6) {
					uni.navigateTo({
						url: "/pageone/trouble_shooting/trouble_shooting"
					});
				}
			},
			//关闭微信二维码弹窗
			wxshowclose() {
				this.wxshow = false
			},
			//打开微信二维码弹窗
			wxshowopen() {
				if (this.erimg) {
					this.wxshow = true
				} else {
					Toast.fail('该小区暂未配置微信客服')
					return
				}
			},

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
	.main {
		width: 100%;
		overflow-x: hidden;

		.one {
			width: 100%;
			box-sizing: border-box;
			padding: 0 50upx;
			margin-top: 81upx;

			.onetap {
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-bottom: 40upx;

				.onetapmont {
					width: 300upx;
					height: 120upx;
					background: #FFDFCE;
					border-radius: 24upx;
					display: flex;
					align-items: center;
					justify-content: center;
					box-sizing: border-box;

					.onetapmonttxt {
						font-size: 28upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #242225;
					}

					image {
						margin-right: 24upx;
					}
				}
			}
		}


		.tannei1 {
			width: 480upx;
			background-color: #FFFFFF;

			.tnhand {
				width: 100%;
				height: 64upx;
				background-color: #4B98ED;
				align-items: center;

				.tntxt {
					font-size: 28upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #ffffff;
					line-height: 64upx;
					text-align: center;
					position: relative;
				}

				image {
					width: 25upx;
					height: 25upx;
					position: absolute;
					top: 19upx;
					right: 18upx;
				}
			}

			.tnfoot {
				width: 100%;
				margin-top: 24upx;
				margin-bottom: 27upx;

				.tfshang {
					font-size: 24upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					text-align: center;
					color: #333333;
				}

				.tfshang1 {
					font-size: 24upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					text-align: center;
					color: #F078CE;
					margin-top: 70upx;
				}

				.tfxia {
					font-size: 28upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					text-align: center;
					color: #333333;
					line-height: 65upx;
				}

				.tfxia1 {
					font-size: 28upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					text-align: center;
					color: #F078CE;
					line-height: 65upx;
				}

				.wxcodeimg {
					width: 260upx;
					height: 260upx;
					margin: 47upx auto;

					image {
						width: 260upx;
						height: 260upx;
					}
				}

				.wxtxt {
					width: 100%;
					box-sizing: border-box;
					padding: 0 45upx;
					font-size: 28upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					text-align: left;
					color: #333333;
					line-height: 50upx;
				}

			}
		}
	}
</style>