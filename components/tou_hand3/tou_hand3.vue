<template>
	<view class="money">
		<view class="moneyone">
			<view class="moneshang" v-show="userlist.realBalance">
				<span style='font-size:30upx;margin-right:6upx;'>¥</span>{{userlist.realBalance}}
			</view>
			<view class="moneshang" v-show="!userlist.realBalance">
				0.00
			</view>
			<view class="monexia">
				账户余额
			</view>
		</view>
		<view class="monez"></view>
		<view class="moneyone">
			<view class="moneshang" v-show="userlist.dummyBalance">
				<span style='font-size:30upx;margin-right:6upx;'>¥</span>{{userlist.dummyBalance}}
			</view>
			<view class="moneshang" v-show="!userlist.dummyBalance">
				0.00
			</view>
			<view class="monexia">
				赠送余额
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userlist:{},
			}
		},
		created() {
			this.userdetail()
		},
		props: {
		},
		methods: {
			userdetail() {
				this.userlist = uni.getStorageSync('user')
			},
			
		}
	}
</script>

<style lang="scss">
	.money{
		width: 650upx;
		height: 176upx;
		background: #343136;
		border-radius: 24upx;
		margin: 40upx auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 90upx;
		box-sizing: border-box;
		.moneyone{
			text-align: center;
			.moneshang{
				font-size: 36upx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				margin-bottom: 8upx;
			}
			.monexia{
				font-size: 26upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
		.monez{
			width: 2upx;
			height: 70upx;
			background: #fff;
		}
	}
</style>
