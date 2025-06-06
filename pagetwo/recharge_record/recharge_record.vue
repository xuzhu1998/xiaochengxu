<template>
	<view class="main">
		<view class="show">
			<van-tabs :active="active"  @change="gbtn">
				<van-tab title="本人充值记录" name="a">
					<view class="tapthree">
						<view class="cdjl-0" v-if="value">
							<uni-datetime-picker v-model="value" type="daterange" @change="timechange" />
						</view>
						<van-collapse :value="activeNames" @change='onchange'>
							
							<van-collapse-item :name="index" v-for="(item, index) in bylist" :key="index">
								<template #title>
									<view>
										<view class="tphand">充值金额:{{item.balance}}</view>
										<view class="tpfoot">{{item.createTime}}</view>
									</view>
								</template>
								<view class="showtap">
									<view class="stone">
										<view class="stoneleft">
											订单编号:
										</view>
										<view class="stoneright">
											{{item.orderNum}}
										</view>
									</view>
									
									
									<view class="stone">
										<view class="stoneleft">
											充值方式:
										</view>
										<view class="stoneright" v-if="item.payType=='1'">
											微信
										</view>
										<view class="stoneright" v-if="item.payType=='2'">
											支付宝
										</view>
									</view>
									
									<view class="stone">
										<view class="stoneleft">
											赠送金额:
										</view>
										<view class="stoneright" >
											{{item.giveMoney}}
										</view>
										
									</view>
									
								</view>
							</van-collapse-item>
							
							</van-collapse>
							<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
					</view>
				</van-tab>
				<van-tab title="电卡代充记录"  name="b">
					<view class="tapthree">
						<view class="cdjl-0" v-if="value">
							<uni-datetime-picker v-model="value" type="daterange" @change="timechange" />
						</view>
						<van-collapse :value="activeNames1" @change='onchange1'>
							
							<van-collapse-item :name="index" v-for="(item, index) in yuelist" :key="index">
								<template #title>
									<view>
										<view class="tphand">充值金额:{{item.balance}}</view>
										<view class="tpfoot">{{item.createTime}}</view>
									</view>
								</template>
								<view class="showtap">
									<view class="stone">
										<view class="stoneleft">
											订单编号:
										</view>
										<view class="stoneright">
											{{item.orderNum}}
										</view>
									</view>
									
									
									<view class="stone">
										<view class="stoneleft">
											充值方式:
										</view>
										<view class="stoneright" v-if="item.payType=='1'">
											微信
										</view>
										<view class="stoneright" v-if="item.payType=='2'">
											支付宝
										</view>
									</view>
									
									<view class="stone">
										<view class="stoneleft">
											赠送金额:
										</view>
										<view class="stoneright" >
											{{item.giveMoney}}
										</view>
										
									</view>
									<view class="stone">
										<view class="stoneleft">
											电卡编号:
										</view>
										<view class="stoneright" >
											{{item.cardNum}}
										</view>
										
									</view>
									<view class="stone">
										<view class="stoneleft">
											被充值人人编号:
										</view>
										<view class="stoneright" >
											{{item.cardUserId}}
										</view>
										
									</view>
									
								
								</view>
							</van-collapse-item>
							
							</van-collapse>
							<uni-load-more :status="status1" :icon-size="16" :content-text="contentText1" />
					</view>
				</van-tab>
			</van-tabs>
		</view>
	
		 <van-toast id="van-toast" />
		 <van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import {formatDate} from '../../common/formatDate.js'
	export default {
		components: {},
		mounted() {
		},
		created() {
			
		},
		data() {
			return {
				active: 'a',
				activeNames: [''], //当前展开面板的 name
				activeNames1: [''], //当前展开面板的 name
				value: [],
				type: 'range', //时间选择器
				showPicker: false, //时间选择器
				bylist:[],//包月退款数据
				yuelist:[],//余额退款数据
				status: 'noMore',//more/loading/noMore
				contentText: {contentdown: '上拉加载更多',contentrefresh: '加载中',contentnomore: '没有更多'},
				finished: false, // 是否已加载所有数据
				pageNum: 1, //页码
				pageSize: 10, //每页显示的条数
				status1: 'noMore',//more/loading/noMore
				contentText1: {contentdown: '上拉加载更多',contentrefresh: '加载中',contentnomore: '没有更多'},
				finished1: false, // 是否已加载所有数据
				ypageNum: 1, //页码
				ypageSize: 10, //每页显示的条数
			}
		},
		onLoad(option) {
			if(option.type){
				this.active=option.type
			}else{
				this.active='a'
			}
			this.show();
			if(this.active=='a'){
				this.onRefresh()
			}else if(this.active=='b'){
				this.yonRefresh()
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			if(this.active=='a'){
				this.onRefresh()
			}else if(this.active=='b'){
				this.yonRefresh()
			}
		},
		//上滑加载
		onReachBottom() {
			if(this.active=='a'){
				if(!this.finished){
					this.loadMore()
				}
			}else if(this.active=='b'){
				if(!this.finished1){
					this.yloadMore()
				}
			}
			
		},
		methods: {
			show(){
				var nowtime = formatDate(new Date(),'yyyy-MM-dd');				
				var oldtime=formatDate(new Date(new Date().getTime()-2592000000),'yyyy-MM-dd');
				this.value=[oldtime,nowtime]
			},
			gbtn(vul){
				this.active=vul.detail.name
				if(this.active=='a'){
					this.onRefresh()
				}else if(this.active=='b'){
					this.yonRefresh()
				}
			},
			timechange(e) {
				this.value=e
				if(this.active=='a'){
					this.onRefresh()
				}else if(this.active=='b'){
					this.yonRefresh()
				}
			},
			// 本人充值记录分页
			loadMore() {
				
				let data = {
					userId: uni.getStorageSync('userId'),
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					startTime:this.value[0],
					endTime:this.value[1],
					type:1
				}
				this.status="loading"
				this.$base.request('recharge/list', 'GET', data)
					.then(res => {
						uni.stopPullDownRefresh();
						if(res.data.rows&&res.data.rows.length>0){
							this.bylist = this.bylist.concat(res.data.rows);
							if(this.bylist.length!=res.data.total){
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
			      this.bylist = [];
			      this.loadMore()
			},
			
			//给他人充值记录分页
			yloadMore() {
				
				let data = {
					userId: uni.getStorageSync('userId'),
					pageNum:this.ypageNum,
					pageSize:this.ypageSize,
					startTime:this.value[0],
					endTime:this.value[1],
					type:0
				}
				this.status1="loading"
				this.$base.request('recharge/list', 'GET', data)
					.then(res => {
						uni.stopPullDownRefresh();
						if(res.data.rows&&res.data.rows.length>0){
							this.yuelist = this.yuelist.concat(res.data.rows);
							if(this.yuelist.length!=res.data.total){
								this.ypageNum += 1;
								this.status1="more"
								this.finished1=false
							}else{
								this.status1='noMore'
								this.finished1 = true;
							}
						}else{
							this.status1='noMore'
							this.finished1 = true;
						}
					})
					.catch(err => {
				
					})
			},
			 yonRefresh() {
			    this.finished1=false
			    this.ypageNum=1
			    this.yuelist = [];
			    this.yloadMore()
			},
			onchange(e){
				this.activeNames=e.detail
			},
			onchange1(e){
				this.activeNames1=e.detail
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
		// overflow-x: hidden;
		background-color: #242225;
		/deep/.van-list__finished-text{
			margin-top: 100upx;
			padding-bottom: 200upx;
		}
		
		
		.show {
			/deep/.van-tab {
				font-size: 32upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				color: #999999;
			}
			
			/deep/.van-hairline:after{
				border: 0upx solid transparent;
			}
			/deep/.van-cell:not(:last-child)::after{
				border: 0upx;
			}
			/deep/.van-tab--active {
				font-size: 32upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				color: #FFA02E;
			}
			
			/deep/.van-tabs__line {
				width: 91upx !important;
				height: 4upx;
				border-radius: 2px;
				background-color: #FFA02E;
			}
			/deep/.van-tabs__nav{
				background-color: #242225;
			}
			
			.tapthree {
				width: 686upx;
				margin: 16upx auto;
				.cdjl-0 {
					width: 100%;
					box-sizing: border-box;
					display: flex;
					background: #343136;
					height: 100upx;
					align-items: center;
					justify-content: space-around;
					border-radius: 18upx;
					/deep/.uni-date-x--border{
						width: 100%;
						box-sizing: border-box;
						border: 0upx !important;
					}
					/deep/.uni-date-x {
						width: 100%;
						display: flex;
						box-sizing: border-box;
						background: #343136;
						align-items: center;
						padding: 0upx !important;
						justify-content: space-between !important;
						border-radius: 18upx;
					}
					/deep/.uni-date__x-input{
						height: 60upx;
						width: 260upx;
						border-radius: 10upx;
						border: 2upx solid #ccc;
						font-size: 30upx;
						line-height: 60upx;
						color: #bbbbbb;
						text-align: center;
					}
				}
				.tphand {
					font-size: 28upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					color: #fff;
				}

				.tpfoot {
					font-size: 24upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #fff;
					margin-top: 10upx;
				}
				/deep/.van-hairline--top-bottom::after{
					border-width: 0;
				}
				/deep/.van-hairline--top:after{
					border-top-width:0upx ;
				}
				/deep/.van-collapse-item__content {
					padding: 0 30upx;
					background-color: #343136;
					border-radius:0upx 0upx 24upx 24upx;
				}
				
				/deep/.van-cell:after{
					border-bottom: 0upx;
					border-bottom-color: transparent;
				}
				/deep/.van-collapse-item{
					border-radius: 24upx !important;
					background-color: #343136 !important;
					margin-top: 30upx;
				}
				/deep/.van-cell{
						background-color: transparent;
						align-items: center;
						padding: 30upx 40upx !important;
				}
				.showtap {
					width: 100%;
					box-sizing: border-box;
					padding: 40upx 0;

					.stone {
						width: 100%;
						box-sizing: border-box;
						display: flex;
						margin-bottom: 15upx;

						.stoneleft {
							font-size: 24upx;
							font-family: PingFang SC Regular, PingFang SC Regular-Regular;
							font-weight: 400;
							color: #D0D0D0;
							width: 45%;
						}

						.stoneright {
							font-size: 24upx;
							font-family: PingFang SC Bold, PingFang SC Bold-Bold;
							font-weight: 700;
							color: #969799;
						}
					}
				}

			}


		}

	}
</style>
