<template>
	<view class="show">
		<map id="tencentMap" :style="[...mapStyle]" :show-compass="showCompass" :enable-traffic="enableTraffic"
			:longitude="longitude" :latitude="latitude" :markers="markers" :show-location="showLocation" :scale="scale"
			@markertap="markertap" @tap="tap">
		</map>
		<view v-show="typeshow==1" style="width: 100%;position: absolute;bottom: 30upx;padding: 0 30upx;box-sizing: border-box;">
			<view style="width: 100%;border-radius: 10upx;box-shadow: 5upx 5upx 2.5upx #bdbdbd;background-color: #FFFFFF;">
				<view style="width: 100%;box-sizing: border-box;padding: 30upx;border-bottom: 1upx solid #999999;">
					<view style="width: 100%;">
						<view style="font-size: 28upx;text-align: left;">{{list.projectName}}-{{list.areaName}}</view>
					</view>
					<view style="color: #808080;font-size: 20upx;margin: 15upx 0;">距我{{list.distanceStr}}</view>
				</view>
				<view style="display: flex;justify-content: space-between;box-sizing: border-box;font-size: 28upx;padding: 15upx 0;">
					<view style="width: 50%;display: flex;justify-content: center;align-items: center;border-right: 1upx solid #999999;" @click="showPopup">
						<image style="width: 48upx;height: 48upx;margin-right: 20upx;" src="../../static/tabBarimg/xiangqing.png"></image>
						<view>详情</view>
					</view>
					<view style="width: 50%;display: flex;justify-content: center;align-items: center;" @click="txbtn">
						<image style="width: 48upx;height: 48upx;margin-right: 20upx;" src="../../static/tabBarimg/daohang.png"></image>
						<view>导航</view>
					</view>
				</view>
			</view>
		</view>
		<van-popup :show="xqtype">
			<view style="width: 686upx;">
				<view style="width: 100%;height: 64upx;background-color: #4B98ED;font-size: 32upx;font-family: PingFang SC Bold, PingFang SC Bold-Bold;font-weight: 700;line-height: 64upx;color: #ffffff;box-sizing: border-box;padding: 0 34upx;display: flex;justify-content: space-between;align-items: center;">
					充电区详情<image style="width: 25upx;height: 25upx;" src="../../static/tabBarimg/close.png" @click="showclose"></image>
				</view>
				<view style="width: 100%;box-sizing: border-box;padding: 43upx 36upx;">
					<view style='width: 100%;display: flex;margin-bottom: 20upx;'>
						<view style='font-size: 28upx;font-family: PingFang SC Medium, PingFang SC Medium-Medium;font-weight: 500;color: #333333;'>
							小区： 
						</view>
						<view style='font-size: 28upx;font-family: PingFang SC Medium, PingFang SC Medium-Medium;font-weight: 700;color: #333333;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 500upx;'>
							{{list1.projectName}}
						</view>
					</view>
					<view style='width: 100%;display: flex;margin-bottom: 20upx;'>
						<view style='font-size: 28upx;font-family: PingFang SC Medium, PingFang SC Medium-Medium;font-weight: 500;color: #333333;'>
							充电区：
						</view>
						<view style='font-size: 28upx;font-family: PingFang SC Medium, PingFang SC Medium-Medium;font-weight: 700;color: #333333;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 500upx;'>
							{{list1.areaName}}
						</view>
					</view>
					<view style='width: 100%;display: flex;margin-bottom: 20upx;'>
						<view style='font-size: 28upx;font-family: PingFang SC Medium, PingFang SC Medium-Medium;font-weight: 500;color: #333333;'>
							<span style="color: #4B98ED;font-weight: 700;">{{list1.usablePort}}</span>个可用|
						        共<span style="color: #4B98ED;font-weight: 700;">{{list1.totalPort}}</span>个端口
						</view>
					</view>
				</view>
			</view>
		</van-popup>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />

	</view>
</template>


<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	export default {
		props: {
			mapStyle: {
				type: Object,
				default: {
					width: '100%',
					height: '100vh'
				}
			},
			showCompass: { //	是否显示指南针
				type: Boolean,
				default: false
			},
			enableTraffic: { //	是否开启实时路况
				type: Boolean,
				default: false
			},
			showLocation: { //	是否显示带有方向的当前定位点
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				longitude: '',
				latitude: '',
				markers: [],
				xqtype: false, //详情显示
				typeshow: 0,
				list: {}, //标记数据
				list1: {}, //详情数据
				scale: 15, //缩放级别，取值范围为3-20

			}
		},
		onReady() {
			let vm = this
			vm.map = uni.createMapContext('tencentMap', this)
			vm.getLocation()

		},
		onShow() {

		},
		methods: {
			show() {
				var that = this
				let data = {
					distance: 20,
					longitude: that.longitude,
					latitude: that.latitude
				}
				that.$base.request('nearby', 'GET', data)
					.then(res => {
						var map = res.data.rows
						for (var i = 0; i < map.length; i++) {
							var arr = {}
							arr.id = i
							arr.latitude = map[i].latitude
							arr.longitude = map[i].longitude
							arr.width = 20
							arr.height = 20
							arr.areaName = map[i].areaName
							arr.projectName = map[i].projectName
							arr.distanceStr = map[i].distanceStr
							arr.areaId = map[i].areaId
							that.markers.push(arr)
						}
					})
					.catch(err => {

					})
			},
			//   初次位置授权
			getAuthorize() {
				return new Promise((resolve, reject) => {
					uni.authorize({
						scope: "scope.userLocation",
						success: () => {
							resolve(); // 允许授权
						},
						fail: () => {
							reject(); // 拒绝授权
						},
					});
				});
			},
			// 确认授权后，获取用户位置
			getLocationInfo() {
				const that = this;
				uni.getLocation({
					type: "gcj02",
					success: function(res) {
						that.longitude = res.longitude;
						that.latitude = res.latitude;
						that.show()
					},
				});
			},
			// 拒绝授权后，弹框提示是否手动打开位置授权
			openConfirm() {
				return new Promise((resolve, reject) => {
					uni.showModal({
						title: "请求授权当前位置",
						content: "我们需要获取地理位置信息，为您推荐附近的充电站",
						success: (res) => {
							if (res.confirm) {
								uni.openSetting().then((res) => {
									if (res[1].authSetting["scope.userLocation"] === true) {
										resolve(); // 打开地图权限设置
									} else {
										reject();
									}
								});
							} else if (res.cancel) {
								reject();
							}
						},
					});
				});
			},
			// 彻底拒绝位置获取
			rejectGetLocation() {
				uni.showToast({
					title: "您拒绝了授权，无法获得周边信息",
					icon: "none",
					duration: 2000,
				});
			},
			//	地图标点 点击事件
			markertap(e) {
				this.typeshow = 1
				this.list = this.markers[e.detail.markerId]
			},
			tap(){
				this.typeshow = 0
			},
			//导航
			txbtn() {
			
			
				wx.openLocation({
					latitude: this.list.latitude, //目的地latitude
					longitude: this.list.longitude, //目的地longitude
					scale: 15, //地图缩放大小，可根据情况具体调整
					name: this.list.areaName
				});
			
			},
			//打开详情
			showPopup() {
				this.xqtype = true;
				let data = {
					isNearBy: 'Y'
				}
				this.$base.request('nearArea' + '/' + this.list.areaId, 'GET', data)
					.then(res => {
						// uni.setStorageSync('userToken', res.data.data.token);
						if (res.data.code == 200) {
							this.list1 = res.data.data[0]
						} else {
							Toast.fail(res.data.msg)
						}
			
					})
					.catch(err => {})
			},
			//关闭详情
			showclose() {
				this.xqtype = false;
			},
		},
		onReady() {
			//   wx请求获取位置权限
			this.getAuthorize().then(() => {
				//   同意后获取
				this.getLocationInfo();
			}).catch(() => {
				//   不同意给出弹框，再次确认
				this.openConfirm().then(() => {
					this.getLocationInfo();
				}).catch(() => {
					this.rejectGetLocation();
				});
			});
		},
		
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 100%;
		overflow-x: hidden;

		.show {}
		
			
		


	}
</style>
