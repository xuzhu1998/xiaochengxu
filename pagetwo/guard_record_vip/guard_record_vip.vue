<template>
	<view class="main">
		<view class="show" v-show="twolist.length>0">
			<view class="map" v-for="(item,index) in twolist" :key="index">
				<view class="one">
					￥{{item.moneyReal}}
				</view>
				<view class="two">
					<view class="twofirst">
						充电守护包月
					</view>
					<view class="twosecond">
						购买类型：<span v-show="item.createTime==item.startTime">包月购买</span><span v-show="item.createTime!=item.startTime">包月续费</span>
					</view>
					<view class="twosecond">
						购买时间：{{item.createTime}}
					</view>
				</view>
				<view class="three">
					<view class="span color1">支付成功</view>
				</view>
			</view>
		</view>
		<view class="dibu" v-show="twolist.length==0">
			暂无购买记录
		</view>
		
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />	
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import {
		Config
	} from '../../common/Config.js'
	export default {
		components: {},
		mounted() {
		},

		data() {
			return {
				twolist:''
			}
		},
		onLoad(option) {
			this.show()
		},
		onShow() {
			
		},
		methods: {
			show(){
				var data = {
					token:uni.getStorageSync('userToken')
				}
				this.$base.request('recharge/getUserSafeMonthRecord', 'GET', data)
					.then(res => {
						if (res.data.code == 200) {
							this.twolist=res.data.data
						} else {
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {
				
					})
			},
			
			//返回上一页
			blackbtn() {
				uni.navigateBack()
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
	.main::-webkit-scrollbar{
		display: none;
	}
	.main {
		width: 100%;
		overflow-x: hidden;
		background-color: #242225;
		height: 100vh;
		.hand{
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
			padding:50upx;
			box-sizing: border-box;
			height: 100vh;
		
			.map{
				width: 100%;
				padding:24upx;
				box-sizing: border-box;
				position: relative;
				background: #343136;
				border-radius: 24upx;
				margin-bottom: 20upx;
				
				.one{
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin-top: 13upx;
					font-size: 30upx;
					font-weight: 400;
					color: #FFFFFF;
				}
				.two{
					.twofirst{
						width: 100%;
						box-sizing: border-box;
						margin-top: 14upx;
						font-size: 30upx;
						font-weight: 400;
						color: #FFFFFF;
					}
					.twosecond{
						width: 100%;
						box-sizing: border-box;
						margin-top: 14upx;
						font-size: 24upx;
						font-weight: 400;
						color: #D0D0D0;
						span{
							color: #FFA02E;
						}
					}
				}
				.three{
					position: absolute;
					top: 0upx;
					right: 0upx;
					font-size: 24upx;
					font-weight: 400;
					color: #EC651C;
					.span{
						width: 138upx;
						height: 50upx;
						border-radius: 0upx 24upx 0upx 24upx;
						text-align: center;
						line-height: 50upx;
					}
					.color1{
						background: linear-gradient(90deg, #FFE7BF 0%, #FDC894 100%);
					}
					
				}
			}
		}
		.dibu{
			width: 100%;
			text-align: center;
			font-size: 35upx;
			font-weight: bold;
			color: #FFFFFF;
			margin-top: 100upx;
		}
		
		
		
	}
</style>
