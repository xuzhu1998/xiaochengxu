<template>
	<view class="main">
		<view class="show">
			
			<view class="sone">
				<view class="btap" @click="godetail('如何充值',1)">
					<view class="dbleft">
						<view class="dbtext">如何充值</view>
					</view>
					<view class="dbright">
						<image src="../../static/tabBarimg/kright.png"></image>
					</view>
				</view>
				<view class="btap" @click="godetail('如何绑定电卡',2)">
					<view class="dbleft">
						<view class="dbtext">如何绑定电卡</view>
					</view>
					<view class="dbright">
						<image src="../../static/tabBarimg/kright.png"></image>
					</view>
				</view>
				<view class="btap" @click="godetail('如何扫码上电',3)">
					<view class="dbleft">
						<view class="dbtext">如何扫码上电</view>
					</view>
					<view class="dbright">
						<image src="../../static/tabBarimg/kright.png"></image>
					</view>
				</view>
				<view class="btap" @click="godetail('如何远程上电',4)">
					<view class="dbleft">
						<view class="dbtext">如何远程上电</view>
					</view>
					<view class="dbright">
						<image src="../../static/tabBarimg/kright.png"></image>
					</view>
				</view>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	
	export default {
		components: {},
		mounted() {
		},

		data() {
			return {
				type:'',
				
			}
		},
		onLoad(options) {
			
			var usertype='type_'+uni.getStorageSync('userId')
			uni.setStorageSync(usertype, 1)
			
		},
		onShow() {
		},
		methods: {
			godetail(name,num){
				uni.navigateTo({
					url: '../Operation_guide_details/Operation_guide_details?name='+name+'&num='+num
				});
			}
			
		}
	}
</script>
<style>
	page{
		height: 100%;
		background-color:#242225;
	}
</style>
<style lang="scss" scoped>
	.main {
		width: 100%;
		background-color: #242225;
		/deep/.van-cell{
			padding: 0upx;
		}
		/deep/.van-cell:not(:last-child)::after{
			border: 0upx solid #FFFFFF!important;
		}
		/deep/.van-list__finished-text{
			padding-top: 100upx;
			padding-bottom: 200upx;
			background-color: #F5F5F5;
		}
		/deep/.van-hairline--top-bottom::after{
			border-width: 0;
		}
		.show{
			width: 100%;
			.shand{
				width: 230upx;
				height: 230upx;
				margin: 90upx auto;
				image{
					width: 230upx;
					height: 230upx;
				}
			}
			.sone{
				width: 686upx;
				margin: 0 auto;
				background-color: #242225;
				// padding-top: 23upx;
				margin-bottom: 100upx;
				margin-top: 20upx;
				.btap {
					width: 100%;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					padding: 21upx 19upx;
					background: #343136;
					border-radius: 24upx;
					margin-bottom: 20upx;
					align-items: center;
					.dbleft {
						box-sizing: border-box;
						display: flex;
				
						image {
							width: 29upx;
							height: 37upx;
							margin-top: 9upx;
						}
				
						.dbtext {
							box-sizing: border-box;
							padding-top: 8upx;
							margin-left: 22upx;
							font-size: 30upx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
						}
				
					}
				
					.dbright {
						box-sizing: border-box;
						display: flex;
						.dbphone{
							font-size: 24upx;
							font-family: PingFang SC Heavy, PingFang SC Heavy-Heavy;
							font-weight: 800;
							color: #4b98ed;
							margin-right: 28upx;
						}
						image {
							width: 19upx;
							height: 32upx;
						}
				
					}
				}
			}
			
		}
		
	}
</style>
