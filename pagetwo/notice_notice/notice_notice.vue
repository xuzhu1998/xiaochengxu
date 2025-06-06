<template>
	<view class="main">
		<view class="show">
			
			<view class="sone">
				
				<view class="btap" @click="jumpbtn(item.id)" v-for="(item, index) in showlist" :key="index">
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
					pageNum:this.pageNum,
					pageSize:this.pageSize
					
				}
				this.status="loading"
				this.$base.request('notice/list', 'GET', data)
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
			jumpbtn(id){
				
					uni.navigateTo({
						url: '../notice_notice_detail/notice_notice_detail?id='+id
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
				margin-bottom: 100upx;
				margin-top: 20upx;
				.btap {
					width: 100%;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					padding: 0 19upx;
					padding-bottom: 21upx;
					align-items: center;
					padding-top: 21upx;
					background: #343136;
					border-radius: 24upx;
					margin-bottom: 20upx;
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
							margin-left: 22upx;
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							color: #fff;
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
