<template>
	<view class="main">
		<view class="show">
			<view class="sone" v-for="(item, index) in showlit" :key="index">
				<view class="sonetap" @click="showPopup(index,item.id)">
					<view class="tapleft">{{item.areaName}}</view>
					<image src="../../static/tabBarimg/kright.png"></image>
				</view>
				<van-popup :show="item.show">
					<view class="stwo">
						<view class="stwohand">
							充电区详情
							<image src="../../static/tabBarimg/shanchu.png" @click="showclose(index)"></image>
						</view>
						<view class="stwofoot">
							<view class="sfone">
								<view class="sfoneleft">
									小区： 
								</view>
								<view class="sfoneright" style="color: #EC651C;">
									{{list.projectName}}
								</view>
							</view>
							<view class="sfone">
								<view class="sfoneleft">
									充电区：
								</view>
								<view class="sfoneright">
									{{list.areaName}}
								</view>
							</view>
							<view class="sfone">
								<view class="sfoneleft">
									<span style="color: #EC651C;font-weight: 700;">{{list.usablePort}}</span>个可用|
								        一共<span style="color: #EC651C;font-weight: 700;">{{list.totalPort}}</span>个端口
								</view>
							</view>
							<view class="sftwo">
								<view class="sftwohand">
									<view class="sftwohandline"></view>
									<view style="margin: 0 12upx;">费率信息</view>
									<view class="sftwohandline"></view>
								</view>
								<view class="sftwofoot" v-show="monthlyList.length>0">
									<view class="montleft">
										包月：
									</view>
									<view class="montright">
										<view class="montone" v-for="(item, index) in monthlyList" :key="index">
											<view v-show="item.types=='A1'">
											
												<view>{{item.standard}}元/{{item.numStr}}小时/月</view>
											</view>
											<view v-show="item.types=='A3'">
											
												<view>{{item.standard}}元/{{item.numStr}}次/月</view>
											</view>
											<view v-show="item.types=='A4'">
												<view v-show="item.minPower!=item.maxPower">
													{{item.minPower}}瓦--{{item.maxPower}}瓦{{item.standard}}元/月(共{{item.numStr}}小时)
												</view>
												<view v-show="item.minPower==item.maxPower">
													{{item.maxPower}}瓦以上{{item.standard}}元/月(共{{item.numStr}}小时)
												</view>
											</view>
											<view v-show="item.types=='A6'">
												<view v-show="item.minPower!=item.maxPower">
													{{item.minPower}}瓦--{{item.maxPower}}瓦{{item.standard}}元/月(共{{item.numStr}}次)
												</view>
												<view v-show="item.minPower==item.maxPower">
													{{item.maxPower}}瓦以上{{item.standard}}元/月(共{{item.numStr}}次)
												</view>
											</view>
											<view v-show="item.types=='A5'">
												<view v-show="item.minPower!=item.maxPower">
													{{item.minPower}}瓦--{{item.maxPower}}瓦{{item.standard}}元/月({{item.numStr}}小时/天)
												</view>
												<view v-show="item.minPower==item.maxPower">
													{{item.maxPower}}瓦以上{{item.standard}}元/月({{item.numStr}}小时/天)
												</view>
											</view>
											<view v-show="item.types=='A7'">
												<view v-show="item.minPower!=item.maxPower">
													{{item.minPower}}瓦--{{item.maxPower}}瓦{{item.standard}}元/月({{item.numStr}}次/天)
												</view>
												<view v-show="item.minPower==item.maxPower">
													{{item.maxPower}}瓦以上{{item.standard}}元/月({{item.numStr}}次/天)
												</view>
											</view>
											
										</view>
										
									</view>
								</view>
								<view class="sftwofoot" v-show="oftenList.length>0">
									<view class="montleft">
										常用：
									</view>
									<view class="montright">
										<view class="montone" v-for="(item, index) in oftenList" :key="index">
											<view v-show="item.types=='B2'">
												电费:{{item.standard}}元/度
											</view>
											<view v-show="item.types=='B5'">
												电费:{{item.standard}}元/度
											</view>
											<view v-show="item.types=='B2'&&item.steps.length>0">
												<view>服务费:</view>
												<view>
													<view v-show="item1.minPower!=item1.maxPower" v-for="(item1, index1) in item.steps" :key="index1">
														{{item1.minPower}}瓦--{{item1.maxPower}}瓦{{item1.standard}}元/小时
													</view>
													<view v-show="item1.minPower==item1.maxPower" v-for="(item1, index1) in item.steps" :key="index1">
														{{item1.maxPower}}瓦以上{{item1.standard}}元/小时
													</view>
												</view>
											</view>
											<view v-show="item.types=='B5'&&item.num">
												服务费:{{item.num/100}}元/度
											</view>
											<view v-show="item.types=='B1'">
												<view v-show="item.minPower!=item.maxPower">
													{{item.minPower}}瓦--{{item.maxPower}}瓦{{item.standard}}元/小时
												</view>
												<view v-show="item.minPower==item.maxPower">
													{{item.maxPower}}瓦以上{{item.standard}}元/小时
												</view>
											</view>
											<view v-show="item.types=='B3'">
												<view v-show="item.minPower!=item.maxPower">
													{{item.minPower}}瓦--{{item.maxPower}}瓦{{item.standard}}元/次
												</view>
												<view v-show="item.minPower==item.maxPower">{{item.maxPower}}瓦以上{{item.standard}}元/次
												</view>
											</view>
											<view v-show="item.types=='B4'">
												<view v-show="item.minPower!=item.maxPower">{{item.minPower}}瓦--{{item.maxPower}}瓦
													1元{{item.standard}}小时</view>
												<view v-show="item.minPower==item.maxPower">{{item.maxPower}}瓦以上
													1元{{item.standard}}小时</view>
											</view>
											
										</view>
										<view class="montone">
											最低消费:{{oftenminMoney}}元
										</view>
									</view>
								</view>
								<view class="sftwofoot" v-show="temporaryList.length>0">
									<view class="montleft">
										临时：
									</view>
									<view class="montright">
										<view class="montone" v-for="(item, index) in temporaryList" :key="index">
											<view v-show="item.minPower!=item.maxPower">{{item.minPower}} ~ {{item.maxPower}}瓦- {{item.standard}}元/小时</view>
											<view v-show="item.minPower==item.maxPower">{{item.maxPower}}瓦以上- {{item.standard}}元/小时</view>
										</view>
										<view class="montone">
											最低消费:{{lsminMoney}}元
										</view>
									</view>
									
								</view>
							</view>
						</view>
					</view>
				</van-popup>
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
				showlit:[],
				list:{},
				projectId:'',
				monthlyList:[],//包月数据
				oftenList:[],//常用数据
				temporaryList:[],//临时数据
				oftenminMoney:'',//常用最低消费
				lsminMoney:'',//临时最低消费
			}
		},
		onLoad(options) {
			if(options.id){
				this.projectId=options.id
			}
			var projectName=uni.getStorageSync('user').projectName
			if(!projectName){
				Toast.fail('暂未绑定充电区')
				return
			}
		},
		onShow() {
			this.show()
		},
		methods: {
			// 附近充电区：获取列表
			show(){
				let data={
					projectId:this.projectId
				}
				this.$base.request('nearArea/list', 'GET', data)
					.then(res => {
						// uni.setStorageSync('userToken', res.data.data.token);
						if(res.data.code==200){
							if(res.data.data.length>0){
								for(var i=0;i<res.data.data.length;i++){
									res.data.data[i].show=false
								}
								this.showlit=res.data.data
							}else{
								this.showlit=[]
								Toast.fail('附近暂无充电区')
							}
							
						}else{
							Toast.fail(res.data.msg)
						}
						
					})
					.catch(err => {
					})
			},
			//打开详情
			showPopup(val,id) {
			   this.showlit[val].show = true;
			   let data={
			   	areaId:id
			   }
			   this.$base.request('nearArea'+'/'+id, 'GET')
			   	.then(res => {
			   		// uni.setStorageSync('userToken', res.data.data.token);
			   		if(res.data.code==200){
			   			this.list=res.data.data[0]
						var item=res.data.data[0]
						if(item.monthlyList.length>0){
							this.monthlyList=item.monthlyList
						}else{
							this.monthlyList=[]
						}
						if(item.oftenList.length>0){
							this.oftenList=item.oftenList
							this.oftenminMoney=item.minMoney
						}else{
							this.oftenList=[]
						}
						if(item.temporaryList.length>0){
							this.temporaryList=item.temporaryList
							this.lsminMoney=item.minMoneyTemporary
						}else{
							this.temporaryList=[]
						}
			   		}else{
						Toast.fail(res.data.msg)
					}
			   		
			   	})
			   	.catch(err => {
			   	})
			},
			//关闭详情
			showclose(val) {
			   this.showlit[val].show = false;
			},
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
		overflow-x: hidden;
		/deep/.van-popup--center{
			background: #FFFFFF;
			border-radius: 24upx;
		}
		.show{
			width: 100%;
			margin-top: 40upx;
			.sone{
				width: 100%;
				box-sizing: border-box;
				padding: 0 50upx;
				margin-bottom: 40upx;
				.sonetap{
					width: 100%;
					background: #343136;
					border-radius: 16px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 30upx 36upx;
					box-sizing: border-box;
					.tapleft{
						font-size: 30upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
					}
					image{
						width: 17upx;
						height: 30upx;
					}
				}
				.stwo{
					width: 686upx;
					.stwohand{
						width: 100%;
						text-align: center;
						box-sizing: border-box;
						font-size: 34upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #111111;
						position: relative;
						padding-top:50upx;
						padding-bottom: 36upx;
						image{
							position: absolute;
							width: 60upx;
							height: 60upx;
							top: 20upx;
							right: 20upx;
						}
					}
					.stwofoot{
						width: 100%;
						box-sizing: border-box;
						padding: 0upx 36upx;
						.sfone{
							width: 100%;
							display: flex;
							margin-bottom: 20upx;
							.sfoneleft{
								font-size: 30upx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 700;
								color: #111111;
							}
							.sfoneright{
								font-size: 30upx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #242225;
								overflow:hidden;
								text-overflow:ellipsis;
								white-space:nowrap;
								width: 500upx;
							}
						}
						.sftwo{
							width: 100%;
							margin: 48upx 0upx;
							background-color: #FFECE2;
							border-radius: 24upx;
							.sftwohand{
								font-size: 24upx;
								font-family: PingFang SC Bold, PingFang SC Bold-Bold;
								font-weight: 700;
								color: #333333;
								margin-bottom: 26upx;
								display: flex;
								align-items: center;
								justify-content: center;
								padding-top:24upx;
								.sftwohandline{
									width: 106upx;
									height: 2upx;
									background: #242225;
								}
							}
							.sftwofoot{
								width: 100%;
								text-align: center;
								line-height: 60upx;
								.montleft{
									font-size: 28upx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 700;
									color: #111111;
								}
								.montright{
									width: 100%;
									.montone{
										font-size: 28upx;
										font-family: PingFang SC Bold, PingFang SC Bold-Bold;
										font-weight: 700;
										color: #333333;
										
									}
								}
							}
						}
					}
				}
			}
		}
		
	}
</style>
