<template>
	<view class="main">
		<view class="show">
			<view class="one">
				<view class="onefirst">
					保障中
				</view>
				<view class="onesecond">
					<view>充电守护服务</view>
					<view class="onesecondright" @click="govip">购买记录</view>
				</view>
				<view class="onethired">剩余时间 ：<span>{{onelist.difDate}}</span>天</view>
				<view class="onethired">剩余次数 ：不限</view>
				<view class="onethired">到期时间 ：{{onelist.endDateText}}</view>
			</view>
			<view class="two">
				<view class="twofirst"></view>
				<view class="twosecond">
					<view class="tsone">
						尊贵权益<image src="../../static/tabBarimg/vipone.png"></image>
					</view>
					<view class="tstwo">
						<view class="tstwomap">
							<image src="../../static/tabBarimg/viptwo.png"></image>
							<view>充电守护</view>
						</view>
						<view class="tstwomap">
							<image src="../../static/tabBarimg/vipthree.png"></image>
							<view>快速理赔</view>
						</view>
						<view class="tstwomap">
							<image src="../../static/tabBarimg/vipfour.png"></image>
							<view>专属客服</view>
						</view>
					</view>
					<view class="tsthree" v-if="shbylist.safeAllStafus==1&&shbylist.monthSafe==1">
						<view class="tstfirst">
							充电起火最高赔<span>{{shbylist.bigMoney}}</span>元
						</view>
						<view class="tstsecond">
							购买充电守护VIP卡，每次充电都安心
						</view>
						<view class="tstmap">
							<view class="tstmapleft">
								<view class="tstmapone">充电守护VIP</view>
								<view class="tstmaptwo">30天不限次数</view>
							</view>
							<view class="tstmapright">
								<view class="tstmaprighttxt" v-if="shbylist.monthOriginal!=shbylist.monthPrice">原价￥{{shbylist.monthOriginal}}</view>
								<view>￥{{shbylist.monthPrice}}</view>
							</view>
							<view class="tstmapzhong" v-if="shbylist.monthOriginal!=shbylist.monthPrice">立减￥{{(shbylist.monthOriginal-shbylist.monthPrice).toFixed(2)}}</view>
						</view>
						<view class="tstthired">
							<view class="tstthiredtxt">续费数量</view>
							<van-stepper v-model="wxtsnum" disable-input @change="wxtsChange" input-width="26px" button-size="18px"/>
						</view>
					</view>
					<view class="tsfour" v-if="shbylist.safeAllStafus==1&&shbylist.monthSafe==1">
						<view class="tsfourleft">￥{{wxtszj}}</view>
						<view class="tsfourright" @click="surewxts">立即续费</view>
					</view>
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
		components: {},
		mounted() {
		},

		data() {
			return {
				wxtsnum:1,
				onelist:{},
				shbylist:{},
				wxtszj:0
			}
		},
		onLoad(option) {
		},
		onShow() {
			this.show()
			this.getSafeMonth()
		},
		methods: {
			
			wxtsChange(){
				this.wxtszj=this.wxtsnum*this.shbylist.monthPrice
			},
			//获取用户包月套餐详情
			show(){
				var data = {
					token:uni.getStorageSync('userToken')
				}
				this.$base.request('recharge/getUserSafeMonth', 'GET', data)
					.then(res => {
						if (res.data.code == 200) {
							this.onelist=res.data.data
						} else {
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {
				
					})
			},
			getSafeMonth(){
				var data = {
					token:uni.getStorageSync('userToken')
				}
				this.$base.request('recharge/getSafeMonth', 'GET', data)
					.then(res => {
						if (res.data.code == 200) {
							this.shbylist=res.data.data
							this.wxtszj=this.shbylist.monthPrice
						} else {
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {
				
					})
			},
			govip(){
				uni.navigateTo({
					url:'/pagetwo/guard_record_vip/guard_record_vip'
				})
			},
			surewxts(){
				var data = {
					token:uni.getStorageSync('userToken'),
					num:this.wxtsnum,
					money:this.shbylist.monthPrice,
					totalMoney:this.wxtszj
				}
				uni.showLoading({
					title: '请稍候',
					mask: true
				})
				this.$base.request('safe/monthBuy', 'POST', data)
					.then(res => {
						if (res.data.code == 200) {
							Toast.success('购买成功')
							this.show()
							uni.hideLoading()
						} else {
							Toast.fail(res.data.msg)
							uni.hideLoading()
						}
					})
					.catch(err => {
				
					})
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
		height: 100vh;
		overflow-x: hidden;
		overflow-y: hidden;
		background-color: #242225;
		.hand{
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
			image{
				width:22upx;
				height: 39upx;
				position: absolute;
				left: 31upx;
				top: 22upx;
			}
		}
		.show{
			width: 100%;
			height: 100%;
			overflow-y: hidden;
			position: relative;
			.one{
				width: 690upx;
				height: 392upx;
				background: linear-gradient(180deg, #FFE7BF 0%, #FDC894 100%);
				box-shadow: inset -1upx 2upx 5upx 1upx rgba(255,255,255,0.79);
				border-radius: 20upx ;
				margin: 0 auto;
				margin-top: 60upx;
				box-sizing: border-box;
				padding: 31upx 25upx 0 54upx;
				.onefirst{
					width: 172upx;
					height: 47upx;
					background-image: url('../../static/tabBarimg/bzz.png');
					background-repeat: no-repeat;
					background-size: cover; 
					background-position: center center;
					font-size: 24upx;
					font-weight: 400;
					color: #C87E26;
					margin-bottom: 10upx;
					box-sizing: border-box;
					padding-left: 60upx;
				}
				.onesecond{
					width: 100%;
					display: flex;
					justify-content: space-between;
					font-size: 40upx;
					font-weight: bold;
					color: #C87E26;
					align-items: center;
					margin-bottom: 26upx;
					.onesecondright{
						background: #FFFFFF;
						font-size: 28upx;
						font-weight: 400;
						color: #DF3D36;
						padding: 10upx 24upx;
						border-radius: 27upx;
					}
				}
				.onethired{
					font-size: 24upx;
					font-weight: 400;
					color: #635F58;
					margin-bottom: 16upx;
				}
			}
			.two {
			  width: 100%;
			  height: 100%;
			  position: absolute;
			  left: 0upx;
			  top: 318upx;
			  .twofirst{
				  width: 100%;
				  height:79upx;
				  background-image: url('../../static/tabBarimg/vipbgimg.png');
				  background-repeat: no-repeat;
				  background-size: cover; 
				  background-position: center center;
			  }
			  .twosecond{
				  width: 100%;
				  height: 100%;
				  overflow-y: hidden;
				  background-color: #46433D;
				  .tsone{
					  width: 100%;
					  box-sizing: border-box;
					  display: flex;
					  align-items: center;
					  font-size: 30upx;
					  font-weight: 400;
					  color: #FDC894;
					  padding-left:41upx;
					  padding-top: 41upx;
					  image{
						  width: 42upx;
						  height: 39upx;
						  margin-left: 13upx;
					  }
				  }
				  .tstwo{
					  width: 100%;
					  display: flex;
					  justify-content: space-between;
					  align-items: center;
					  box-sizing: border-box;
					  padding: 0 70upx;
					  margin-top: 36upx;
					  .tstwomap{
						  font-size: 24upx;
						  font-weight: 400;
						  color: #FDC894;
						  text-align: center;
						  image{
							  width: 84upx;
							  height: 84upx;
						  }
					  }
				  }
				  .tsthree{
					  width: 688upx;
					  height: 278upx;
					  margin: 0 auto;
					  margin-top: 70upx;
					  background: linear-gradient(180deg, #FFE7BF 0%, #FDC894 100%);
					  border-radius: 20upx ;
					  box-sizing: border-box;
					  padding: 10upx 19upx;
					  .tstfirst{
						  font-size: 30upx;
						  font-weight: bold;
						  color: #4F3832;
						  margin-bottom: 6upx;
						  span{
							  color: #EC651C;
						  }
					  }
					  .tstsecond{
						  font-size: 22upx;
						  font-weight: 400;
						  color: #4F3832;
						  margin-bottom: 14upx;
					  }
					  .tstmap{
						  width: 650upx;
						  height: 129upx;
						  background: #343136;
						  box-shadow: inset 0upx 0upx 26upx 1upx #F7AA44;
						  border-radius: 24upx;
						  border: 3upx solid #EC651C;
						  margin: 0 auto;
						  display: flex;
						  justify-content: space-between;
						  padding: 0 21upx 0 33upx;
						  box-sizing: border-box;
						  position: relative;
						  align-items: center;
						  .tstmapleft{
							  display: flex;
							  flex-direction:column;
							  justify-content: center;
							  .tstmapone{
								  font-size: 32upx;
								  font-weight: 400;
								  color: #FFFFFF;
							  }
							  .tstmaptwo{
								  font-size: 24upx;
								  font-family: Yu Gothic UI-Regular, Yu Gothic UI;
								  font-weight: 400;
								  color: #FFA02E;
							  }
						  }
						  .tstmapright{
							  display: flex;
							  font-size: 36upx;
							  font-weight: bold;
							  color: #FFA02E;
							  align-items: center;
							  .tstmaprighttxt{
								  font-size: 22upx;
								  font-weight: 400;
								  color: #FFFFFF;
								  text-decoration: line-through;
								  margin-right: 10upx;
							  }
						  }
						  .tstmapzhong{
							  width: 166upx;
							  height: 53upx;
							  position: absolute;
							  top: 0upx;
							  right:0upx;
							  background-image: url('../../static/tabBarimg/shbylj.png');
							  background-repeat: no-repeat;
							  background-size: cover; 
							  background-position: center center;
							  font-size: 20upx;
							  font-weight: 400;
							  color: #F7FAFB;
							  text-align: center;
						  }
					  }
					  .tstthired{
						  width: 100%;
						  display: flex;
						  justify-content: space-between;
						  align-items: center;
						  box-sizing: border-box;
						  padding: 10upx 18upx;
						  .tstthiredtxt{
							  font-size: 24upx;
							  font-weight: bold;
							  color: #4F3832;
						  }
					  }
				  }
				  .tsfour{
					  position: fixed;
					  bottom: 0upx;
					  width: 100%;
					  background-color: #ffffff;
					  box-sizing: border-box;
					  padding:21upx 31upx 21upx 50upx;
					  display: flex;
					  justify-content: space-between;
					  align-items: center;
					  .tsfourleft{
						  font-size: 36upx;
						  font-weight: bold;
						  color: #EC651C;
					  }
					  .tsfourright{
						  background: linear-gradient(180deg, #FFE7BF 0%, #FDC894 100%);
						  border-radius: 36upx;
						  text-align: center;
						  font-size: 34upx;
						  font-family: Microsoft JhengHei UI-Regular, Microsoft JhengHei UI;
						  font-weight: 400;
						  color: #EC651C;
						  padding: 29upx 37upx;
					  }
					  
				  }
			  }
			}
		}
		
		
		
	}
</style>
