<template>
	<view class="main">
		<van-tabs :active="active"  @change="gbtn">
			<van-tab title="意见反馈" name="a">
				<view class="show">
					<view class="one" v-for="(item,index) in showlist" :key="index">
						<view class="onehand">
							<view>反馈内容：<span style='color: #939393;'>{{item.msg}}</span></view>
							<view class="onetime">
								创建时间：{{item.createTime}}
							</view>
						</view>
						<view class="onetxt" v-if="item.status==1">
							<view class="onetxtone" >回复：<span style='color: #939393;'>{{item.handleMsg}}</span></view>
							<view style='text-align: right;font-size: 20upx;'>
								回复时间：{{item.updateTime}}
							</view>
						</view>
						<view class="onetxt" v-if="item.status==0"><span class="onetxtone"  style="color: red;">待回复</span>{{item.handleMsg}}</view>
					</view>
					<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
				</view>
			</van-tab>
			<van-tab title="故障反馈" name="b">
				<view class="showtwo">
					<van-collapse :value="activeNames" @change='onchange'>
						
						<van-collapse-item :name="index" v-for="(item, index) in tshowlist" :key="index">
							<template #title>
								<view class="bone">
									<view class="boneshang">{{item.types}}
									<span style="color: red;" v-if="item.status==0">（处理中）</span>
									<span style="color: #007AFF;" v-if="item.status==1">（已处理）</span>
									</view>
									<view class="bonexia">{{item.createTime}}</view>
								</view>
							</template>
							<view class="btwo">
								<view class="btwotxt">小区名：{{item.projectName}}</view>
								<view class="btwotxt">充电区：{{item.areaName}}</view>
								<view class="btwotxt">设备号：{{item.code}}</view>
								<view class="btwotxt">反馈内容：{{item.contents}}</view>
								<view class="btwotxt">回复内容：{{item.handleMsg}}</view>
								<view class="btwotxt">回复时间：{{item.updateTime}}</view>
								<view class="btwoimg" v-if="item.imgStr.length>0">
									<view v-for='(item2,index1) of item.imgStr' :key='index1' >
									      <image :src="item2" alt="" @click="getPhotoClickIdx(index1,index)"/>
									</view>
								</view>
								
							</view>
						</van-collapse-item>
							
							
						</van-collapse>
						<uni-load-more :status="status1" :icon-size="16" :content-text="contentText1" />
				</view>
				
			</van-tab>
			<van-tab title="退款反馈" name="c">
				<view class="showtwo">
					<van-collapse :value="activeNames1" @change='onchange1'>
						
						<van-collapse-item :name="index" v-for="(item, index) in cshowlist" :key="index">
							<template #title>
								<view class="bone">
									<view class="boneshang" v-if="item.refundType==0">退余额
									<span style="color: red;" v-if="item.status==0">（处理中）</span>
									<span style="color: #007AFF;" v-if="item.status==1">（已处理）</span>
									</view>
									<view class="boneshang" v-if="item.refundType==1">退包月
									<span style="color: red;" v-if="item.status==0">（处理中）</span>
									<span style="color: #007AFF;" v-if="item.status==1">（已处理）</span>
									</view>
									<view class="bonexia">{{item.createTime}}</view>
								</view>
							</template>
							<view class="btwo">
								<view class="btwotxt">退款原因：{{item.reason}}</view>
								<view class="btwotxt">退款信息：{{item.msg}}</view>
								<view class="btwotxt">处理结果：{{item.handleMsg}}</view>
								<view class="btwotxt">处理时间：{{item.updateTime}}</view>
							</view>
						</van-collapse-item>
							
							
						</van-collapse>
						<uni-load-more :status="status2" :icon-size="16" :content-text="contentText2" />
				</view>
			</van-tab>
		</van-tabs>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import {
		Config
	} from "../../common/Config.js"
	export default {
		components: {},
		mounted() {
		},

		data() {
			return {
				active: 'a',
				activeNames: [''], //当前展开面板的 name
				activeNames1: [''], //当前展开面板的 name
				status: 'noMore',//more/loading/noMore
				contentText: {contentdown: '上拉加载更多',contentrefresh: '加载中',contentnomore: '没有更多'},
				finished: false, // 是否已加载所有数据
				pageNum: 1, //页码
				pageSize: 10, //每页显示的条数
				showlist: [], //意见反馈列表数据
				status1: 'noMore',//more/loading/noMore
				contentText1: {contentdown: '上拉加载更多',contentrefresh: '加载中',contentnomore: '没有更多'},
				finished1: false, // 是否已加载所有数据
				tpageNum: 1, //页码
				tpageSize: 10, //每页显示的条数
				tshowlist: [], //意见反馈列表数据
				status2: 'noMore',//more/loading/noMore
				contentText2: {contentdown: '上拉加载更多',contentrefresh: '加载中',contentnomore: '没有更多'},
				finished2: false, // 是否已加载所有数据
				cpageNum: 1, //页码
				cpageSize: 10, //每页显示的条数
				cshowlist: [], //意见反馈列表数据
			}
		},
		onLoad() {
			this.showlist = [];
			this.onRefresh();
		},
		//下拉刷新
		onPullDownRefresh() {
			if(this.active=='a'){				
				this.onRefresh()
			}else if(this.active=='b'){				
				this.tonRefresh()
			}else if(this.active=='c'){
				this.conRefresh()
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
					this.tloadMore()
				}
			}else if(this.active=='b'){
				if(!this.finished2){
					this.cloadMore()
				}
			}
			
		},
		methods: {
			getPhotoClickIdx(index,index1){
				uni.previewImage({
				    current:this.tshowlist[index1].imgStr[index],
				    urls:this.tshowlist[index1].imgStr
				});
			},
			  
			// 意见反馈分页
			loadMore() {
				let data = {
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				this.status="loading"
				this.$base.request('feedback/list', 'GET', data)
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
			// 故障反馈分页
			tloadMore() {
				
				let data = {
					pageNum: this.tpageNum,
					pageSize: this.tpageSize
				}
				this.status1="loading"
				this.$base.request('user/failure/list', 'GET', data)
					.then(res => {
						uni.stopPullDownRefresh();
						if(res.data.rows&&res.data.rows.length>0){
							for(var i=0;i<res.data.rows.length;i++){
								if(res.data.rows[i].imgStr){
									var imgs=res.data.rows[i].imgStr
									for(var j=0;j<imgs.length;j++){
										imgs[j]=Config.api+imgs[j]
									}
									res.data.rows[i].imgStr=imgs
								}else{
									res.data.rows[i].imgStr=[]
								}
							}
							this.tshowlist = this.tshowlist.concat(res.data.rows);
							if(this.tshowlist.length!=res.data.total){
								this.tpageNum += 1;
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
			 tonRefresh() {
			     this.finished1=false
			     this.tpageNum=1
			     this.tshowlist = [];
			      this.tloadMore();
			},
			// 退款反馈分页
			cloadMore() {
				
				let data = {
					pageNum: this.cpageNum,
					pageSize: this.cpageSize
				}
				this.status2="loading"
				this.$base.request('user/refund/list', 'GET', data)
					.then(res => {
						uni.stopPullDownRefresh();
						if(res.data.rows&&res.data.rows.length>0){
							this.cshowlist = this.cshowlist.concat(res.data.rows);
							if(this.cshowlist.length!=res.data.total){
								this.cpageNum += 1;
								this.status2="more"
								this.finished2=false
							}else{
								this.status2='noMore'
								this.finished2 = true;
							}
						}else{
							this.status2='noMore'
							this.finished2 = true;
						}
					})
					.catch(err => {
				
					})
			},
			 conRefresh() {
			     this.finished2=false
			     this.cpageNum=1
			     this.cshowlist = [];
			      this.cloadMore();
			},
			gbtn(vul){
				this.active=vul.detail.name
				if(this.active=='a'){
					this.showlist = [];
					this.onRefresh()
				}else if(this.active=='b'){
					this.tshowlist = [];
					this.tonRefresh()
				}else if(this.active=='c'){
					this.cshowlist = [];
					this.conRefresh()
				}
				
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
		/deep/.van-list__finished-text{
			margin-top: 100upx;
			padding-bottom: 200upx;
		}
		/deep/.van-hairline--top-bottom::after{
			border-width: 0;
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
		/deep/.van-hairline--top-bottom::after{
			border-width: 0;
		}
		/deep/.van-hairline--top:after{
			border-top-width:0upx ;
		}
		
		/deep/.van-tab {
			font-size: 32upx;
			font-family: PingFang SC Bold, PingFang SC Bold-Bold;
			font-weight: 700;
			color: #999999;
		}
		/deep/.van-tab--active {
			font-size: 32upx;
			font-family: PingFang SC Bold, PingFang SC Bold-Bold;
			font-weight: 700;
			color: #FFA02E;
		}
		/deep/.van-tabs__nav{
			background-color: #242225;
		}
		/deep/.van-tabs__line {
			width: 91upx !important;
			height: 4upx;
			border-radius: 2px;
			background-color: #FFA02E;
		}
		.show{
			width: 100%;
			box-sizing: border-box;
			padding:20upx;
			.one{
				box-sizing: border-box;
				border-radius: 24upx !important;
				background-color: #343136 !important;
				margin-top: 30upx;
				padding: 30upx 40upx !important;
				.onehand{
					font-size: 26upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					color: #fff;
					margin-bottom: 15upx;
					border-bottom: 1px dashed #e5e5e5;
					.onetime{
						font-size: 20upx;
						font-family: PingFang SC Regular, PingFang SC Regular-Regular;
						font-weight: 400;
						text-align: right;
						color: #D0D0D0;
						line-height: 36px;
					}
				}
				.onetxt{
					font-size: 24upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 500;
					color:#D0D0D0;
					line-height: 40upx;
					.onetxtone{
						font-size: 24upx;
						font-family: PingFang SC Bold, PingFang SC Bold-Bold;
						font-weight: 700;
						color: #fff;
					}
				}
			}
			
		}
		.showtwo{
			box-sizing: border-box;
			padding: 20upx;
			.bone{
				.boneshang{
					color: #fff;
					font-size: 30upx;
				}
				.bonexia{
					color: #c5c5c5;
					font-size: 22upx;
				}
			}
			.btwo{
				.btwotxt{
					line-height: 40upx;
				}
				.btwoimg{
					display: flex;
					justify-content: space-between;
					margin-top: 30upx;
					
					image{
						border-radius: 20upx;
						width: 150upx;
						height: 150upx;
					}
				}
			}
		}
		
		
	}
</style>
