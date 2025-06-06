<template>
	<view>
		<view class="footer">
			<view class="footer-g" v-show="tab01=='1'" @click="toDo(4)">
				<view class="active">

					<image src="../../static/tabBarimg/home1.png"></image>
					<view class="active-02">个人中心</view>
				</view>
			</view>
			<view class="footer-g" v-show="tab01!='1'" @click="toDo(1)">
				<view class="no-active">
					<view class="no-active-01">

						<image src="../../static/tabBarimg/home.png"></image>
						<view class="no-active-02">个人中心</view>
					</view>

					<!-- <view class="no-active-02">个人</view> -->
				</view>

			</view>



			<view class="zfooter-g" v-show="tab01=='2'" @click="toDo(5)">
				<view class="active">

					<image src="../../static/tabBarimg/hm1.png"></image>
					<view class="active-02">扫码充电</view>
				</view>
			</view>
			<view class="zfooter-g" v-show="tab01!='2'" @click="toDo(2)">

				<view class="no-active">
					<view class="no-active-01">
						<image src="../../static/tabBarimg/hm.png"></image>
						<view class="no-active-02">扫码充电</view>
					</view>

				</view>
			</view>



			<view class="footer-g" v-show="tab01=='3'" @click="toDo(6)">
				<view class="active">
					<image src="../../static/tabBarimg/hmz1.png"></image>
					<view class="active-02">充电中</view>
				</view>
			</view>
			<view class="footer-g" v-show="tab01!='3'" @click="toDo(3)">

				<view class="no-active">
					<view class="no-active-01">

						<image src="../../static/tabBarimg/hmz.png"></image>
						<view class="no-active-02">充电中</view>
					</view>


				</view>
			</view>



		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},

		props: {
			tab01: String
		},
		methods: {
			toDo(e) {
				switch (e) {

					case 1:
						uni.switchTab({
					        url: '/pages/index/index'
					    })
						break;
					case 2:
					
						uni.switchTab({
						    url: '/pages/smcharging/smcharging'
						})
						break;
					case 3:
						uni.switchTab({
							url: '/pages/chargingzhong/chargingzhong'
						})
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	.footer {
		text-size-adjust: 100% !important;  
		-webkit-text-size-adjust: 100% !important;  
		-moz-text-size-adjust: 100% !important; 
		width: 100%;
		height: 162upx;
		display: flex;
		position: fixed;
		bottom: env(safe-area-inset-bottom);
		left: 0;
		background: url('../../static/tabBarimg/tabBarbg.png') no-repeat;
		background-size:cover;
		justify-content: space-between;
		text-align: center;
		font-size: 24upx;
		font-family: PingFang SC Medium, PingFang SC Medium-Medium;
		font-weight: 500;
		color: #333333;
		margin-top: 140upx;
		.footer-g{
			width: 33.33333%;
			box-sizing: border-box;
			padding-top: 77upx;
			.active{
				color: #0f17bd;
				image{
					width: 47upx;
					height: 45upx;
				}
			}
			.no-active{
				.no-active-01{
					image{
						width: 47upx;
						height: 45upx;
					}
				}
			}
		}
		.zfooter-g{
			width: 33.33333%;
			box-sizing: border-box;
			padding-top: 7upx;
			.active{
				color: #0f17bd;
				image{
					width: 112upx;
					height: 112upx;
					margin-bottom: 4upx;
				}
			}
			.no-active{
				.no-active-01{
					image{
						width: 112upx;
						height: 112upx;
						margin-bottom: 4upx;
					}
				}
			}
		}
	}
</style>
