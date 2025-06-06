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



			<view class="footer-g" v-show="tab01=='2'" @click="toDo(5)">
				<view class="active">

					<image src="../../static/tabBarimg/hm1.png"></image>
					<view class="active-02">首页</view>
				</view>
			</view>
			<view class="footer-g" v-show="tab01!='2'" @click="toDo(2)">

				<view class="no-active">
					<view class="no-active-01">
						<image src="../../static/tabBarimg/hm.png"></image>
						<view class="no-active-02">首页</view>
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
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		background-size:cover;
		justify-content: space-between;
		text-align: center;
		font-size: 24upx;
		font-family: PingFang SC Medium, PingFang SC Medium-Medium;
		font-weight: 500;
		color: #AAAAAA;
		margin-top: 140upx;
		background-color: #242225;
		padding: 10upx 0;
		.footer-g{
			width: 33.33333%;
			box-sizing: border-box;
			.active{
				color: #EC651C;
				image{
					width: 38upx;
					height: 44upx;
					margin-bottom: 5upx;
				}
			}
			.no-active{
				.no-active-01{
					image{
						width: 38upx;
						margin-bottom: 5upx;
						height: 44upx;
					}
				}
			}
		}
	
	}
</style>
