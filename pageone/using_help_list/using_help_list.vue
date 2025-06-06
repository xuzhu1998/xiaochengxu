<template>
	<view class="main">
		<view class="show">
			
			<view class="sone">
				
				<view class="btap" @click="jumpbtn(item)" v-for="(item, index) in showlist" :key="index">
					<view class="dbleft">
						<view class="dbtext">{{item.title}}</view>
					</view>
					<view class="dbright">
						<image src="../../static/tabBarimg/kright.png"></image>
					</view>
				</view>
				<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
				
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
				name:'',
				type:'',
				status: 'noMore',//more/loading/noMore
				contentText: {contentdown: '上拉加载更多',contentrefresh: '加载中',contentnomore: '没有更多'},
				finished: false, // 是否已加载所有数据
				pageNum: 1, //页码
				pageSize: 10, //每页显示的条数
				showlist:[],//列表数据
			}
		},
		onLoad(options) {
			if(options.type==1){
				uni.setNavigationBarTitle({
					title:'使用流程'
				})
			}else if(options.type==2){
				uni.setNavigationBarTitle({
					title:'常见问题'
				})
				
			}else if(options.type==3){
				uni.setNavigationBarTitle({
					title:'用车常识'
				})
				
			}
			this.type=options.type-1
		},
		onShow() {
			this.onRefresh();
		},
		//下拉刷新
		onPullDownRefresh() {
			this.onRefresh()
		},
		//上滑加载
		onReachBottom() {
			if(!this.finished){
				this.loadMore()
			}
		},
		methods: {
			// 获取用户管理的小区列表
			loadMore() {
				
				let data = {
					type:this.type,
					pageNum:this.pageNum,
					pageSize:this.pageSize
					
				}
				this.status="loading"
				this.$base.request('help/list', 'GET', data)
					.then(res => {
						uni.stopPullDownRefresh();
						if(res.data.rows&&res.data.rows.length>0){
							this.showlist = this.showlist.concat(res.data.rows);
							if(this.showlist.length!=res.data.total){
								this.pageNum += 1;
								this.status="more"
								this.finished=false
							}else{
								this.status='noMore'
								this.finished = true;
							}
						}else{
							this.status='noMore'
							this.finished = true;
						}
					})
					.catch(err => {
				
					})
			},
			onRefresh() {
				 this.finished=false
				 this.pageNum=1
				 this.showlist = [];
				 this.loadMore()
			},
			jumpbtn(item){
				uni.navigateTo({
					url: '../using_help_detail/using_help_detail?id='+item.id
				})
				// if(item.url=='0'){
				// 	uni.navigateTo({
				// 		url: '../using_help_detail/using_help_detail?id='+item.id
				// 	})
				// }else{
				// 	window.location.href = item.url
				// }
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
					border-bottom: 1upx solid #343136;
					display: flex;
					justify-content: space-between;
					padding: 21upx 19upx;
					background-color: #343136;
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
