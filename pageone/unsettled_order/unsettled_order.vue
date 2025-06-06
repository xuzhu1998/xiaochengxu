<template>
	<view class="main">
		<navigator url="../records_consumption/records_consumption" hover-class="none">
			<van-notice-bar :scrollable="true" left-icon="volume-o" color='#FFFFFF' speed='40'>
				因网络原因无法打开柜门,请前往个人中心-查看更多-消费记录,查看开柜密码打开柜门
			</van-notice-bar>
		</navigator>
		<view class="hand">
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<van-list v-model="loading"  :finished="finished" finished-text="没有更多了" @load="loadMore">
				<van-cell v-for="(item,index) in showlist" :key="index" @click="onDetail(item.id,item.deviceId,item.isCharge)">
					<view class="show">
						<view class="showhand">
							<view class="hleft">
								<span>充电柜编号：{{item.code}}</span>
							</view>
							<view class="hright" v-show="item.isCharge==0">充电中</view>
							<view class="hright" v-show="item.isCharge==1">未结算</view>
						</view>
						<view class="showfoot">
							<view class="fleft">
								订单编号：{{item.orderNum}}
							</view>
							<view class="fleft">
								小区名称：{{item.projectName}}
							</view>
							<view class="fleft">
								开始时间：{{item.startTime}}
							</view>
							<view class="fleft">
								开柜密码：{{item.password}}
							</view>
						</view>
					</view>
				</van-cell>
			</van-list>
			</van-pull-refresh>
		</view>
		
	</view>
</template>

<script>
	export default {
		components: {
			
		},
		mounted() {
			document.querySelector('body').setAttribute('style', 'background-color:#242225')
		},

		data() {
			return {
				loading: false,
				finished: false,
				refreshing: false,
				pageNum: 1, //页码
				pageSize: 10, //每页显示的条数
				showlist: [], //正在充电的设备列表数据
				deviceId:'',//设备编号
			}
		},
		onLoad(option) {
			this.deviceId=option.deviceId
		},
		onShow() {
			this.showlist = [];
			this.onRefresh();
		},
		methods: {
			onDetail(id,deviceId,isCharge) {
				
				uni.navigateTo({
					url: '../unsettled_order_detail/unsettled_order_detail?id='+id+'&codetype='+1+'&isCharge='+isCharge
				})
			},
			
			// 分页
			loadMore() {
				if (this.refreshing) {
				  this.showlist = [];
				  this.refreshing = false;
				}
				const that = this;
				let data = {
					pageNum: that.pageNum,
					pageSize: that.pageSize,
					deviceId:this.deviceId
				}
				that.loading = true;
				that.$base.request('charging/occ/list', 'GET', data)
					.then(res => {
						that.loading = false;
						if(res.data.rows&&res.data.rows.length>0){
							that.showlist = that.showlist.concat(res.data.rows);
							that.pageNum += 1;
						}else{
							that.finished = true;
						}
					})
					.catch(err => {
				
					})
			},
			 onRefresh() {
			      // 清空列表数据
			      this.finished = false;
				  this.pageNum=1
			      // 重新加载数据
			      // 将 loading 设置为 true，表示处于加载状态
			      this.loading = true;
			      this.loadMore();
			    },
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 100%;
		overflow-x: hidden;
		margin-bottom: 140upx;
		/deep/.van-list__finished-text{
			margin-top: 100upx;
			padding-bottom: 200upx;
		}
		/deep/.van-hairline--top-bottom::after{
			border-width: 0;
		}
		/deep/.van-cell{
			padding: 0upx;
			width: 650upx;
			height: 344upx;
			background: #343136;
			border-radius: 24upx;
			margin: 0 auto;
			box-sizing: border-box;
			margin-bottom: 30upx;
		}
		/deep/.van-cell:not(:last-child)::after{
			border-bottom: 0upx;
		}
		/deep/.van-notice-bar{
			width: 650upx;
			height: 70upx;
			background: #343136;
			border-radius: 24upx;
			padding: 0 24upx;
			margin: 0 auto;
			margin-top: 30upx;
		}
		.hand{
			width: 100%;
			margin-top: 90upx;
		}
		.show {
			margin-top: 85upx;
			margin: 0 auto;
			box-sizing: border-box;
		
			.showhand {
				width: 100%;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				padding: 30upx 26upx;
				background-color: #3C393E;
				.hleft {
					font-size: 28upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}
		
				.hright {
					font-size: 26upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFA02E;
				}
			}
		
			.showfoot {
				width: 100%;
				box-sizing: border-box;
				padding: 13upx 0upx 24upx 26upx;
		
				.fleft {
					font-size: 26upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #D0D0D0;
					margin-bottom: 10upx;
				}
			}
		}
	}
</style>
