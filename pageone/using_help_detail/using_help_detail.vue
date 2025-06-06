<template>
	<view class="main">
		<view class="show">
			<view class="title">{{list.title}}</view>
			<view class="time">{{list.createTime}}</view>
			<view class="nei">
				<view class="ahtml" v-html="list.msg"></view>
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
		components: {
		},
		mounted() {
		},

		data() {
			return {
				helpId: '', //帮助表id
				list:{}
			}
		},
		onLoad(options) {
			this.helpId = options.id

		},
		onShow() {
			this.show()
		},
		methods: {
			show() {
				this.$base.request('help' + '/' + this.helpId, 'GET')
					.then(res => {
						if(res.data.code==200){
							this.list=res.data.data
						}else{
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {

					})
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

		/deep/.van-cell {
			padding: 0upx;
		}

		/deep/.van-cell:not(:last-child)::after {
			border: 0upx solid #FFFFFF !important;
		}

		.show {
			width: 100%;
			box-sizing: border-box;
			padding: 0 30upx;
			.title{
				font-size: 36upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				text-align: left;
				color: #fff;
				margin-top: 50upx;
				text-align: center;
			}
			.time{
				font-size: 24upx;
				font-family: PingFang SC Medium, PingFang SC Medium-Medium;
				font-weight: 500;
				text-align: left;
				color: #fff;
				border-bottom: 1upx solid #fff;
				padding: 23upx 0;
				text-align: right;
			}
			.nei{
				font-size: 28upx;
				font-family: PingFang SC Medium, PingFang SC Medium-Medium;
				font-weight: 500;
				text-align: left;
				color: #666666;
				padding: 30upx 0;
				.ahtml{
					height: 100%;
					// overflow-y:auto;
					// overflow-x:hidden;
					width: 100%;
				}
			}

		}

	}
</style>
