<template>
	<view class="main">
		<view class="show">
			<view class="stwo">
				<view class="stwohand">
					<view class="shtml" v-html="msg"></view>
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
				msg:''
			}
		},
		onLoad(options) {
			this.msg=options.msg
		},
		onShow() {
		},
		methods: {
		
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 100%;
		overflow-x: hidden;
		background-color: #FFFFFF;
		
		.show{
			width: 100%;
			box-sizing: border-box;
			padding: 0 32upx;
			padding-bottom: 32upx;
			.sone{
				width: 100%;
				margin-top: 74upx;
				margin-bottom: 70upx;
				border-bottom: 1upx solid #dcdcdc;
				box-sizing: border-box;
				padding-bottom: 23upx;
				.sonehand{
					font-size: 36upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					color: #333333;
				}
				.sonefoot{
					font-size: 24upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #333333;
					margin-top: 22upx;
				}
			}
			.stwo{
				width: 100%;
				.stwohand{
					font-size: 28upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #666666;
					.shtml{
						height: 100%;
						// overflow-y:auto;
						// overflow-x:hidden;
						width: 100%;
						
					}
					img{
						max-width: 100% !important;
					}
					
				}
				.stwofoot{
					font-size: 24upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #333333;
					text-align: right;
					margin-top: 49upx;
				}
			}
		}
		
	}
</style>
