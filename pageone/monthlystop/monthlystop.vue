<template>
	<view class="main">
		<view class="newtap">
			<view class="newone">
				<view class="newonetap" :class="shownum==index?'newonetap1':'newonetap'" v-for="(item,index) in disMsg" :key="index" @click="xbtn(index,item.nums,item.disRate,item.id)">
					<view class="newonetapleft">
						{{item.nums}}期 （{{item.nums*30}}天）
					</view>
					<view class="newonetapright">
						<view class="newonetaprighttxt">
							<span v-show="item.disRate!=0">原价 {{(price*item.nums).toFixed(2)}}元</span>
						</view>
						<view class="newonetaprighttxt1">
						<span v-show="item.disRate!=0">{{(price*item.nums*item.disRate).toFixed(2)}}元</span>
						<span v-show="item.disRate==0">{{(price*item.nums).toFixed(2)}}元</span>
						</view>
					</view>
					<view class="newonetapdb" v-show="item.disRate!=0">{{(item.disRate*10).toFixed(2)}}折 （¥{{((price*item.disRate)/30).toFixed(2)}}元/天）</view>
				</view>
			</view>
		</view>
		<view class="dibu">
			<view class="dibutxt">{{znum}}元</view>
			<view class="dibutap" @click="buybtn">购买套餐</view>
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
			document.querySelector('body').setAttribute('style', 'background-color:#242225')
		},

		data() {
			return {
				disMsg:[],
				packageId:'',//套餐Id
				price:0,
				shownum:0,
				znum:0,
				stepId:''
			}
		},
		onLoad(options) {
			this.disMsg=JSON.parse(options.disMsg)
			this.packageId=options.packageId
			this.price=options.price
			this.xbtn(0,this.disMsg[0].nums,this.disMsg[0].disRate,this.disMsg[0].id)
			console.log(this.disMsg)
		},
		onShow() {

		},
		methods: {
			xbtn(index,nums,disRate,id){
				this.shownum=index
				this.stepId=id
				if(disRate==0){
					this.znum=nums*this.price
				}else{
					this.znum=nums*this.price*disRate
				}
				
			},
			buybtn(){
				let data = {
					userId: uni.getStorageSync('userId')
				}
				this.$base.request('electricCard/list', 'GET', data)
					.then(res => {
						if(res.data.code==200){
							if(res.data.data.length==0){
								this.buybtn1()
							}else{
								var mtype=0
								for(var i=0;i<res.data.data.length;i++){
									if(res.data.data[i].types==0){
										mtype=1
									}
								}
								if(mtype==0){
									Dialog.confirm({
										message: '电卡要设置为门禁卡才能刷卡开门，是否前往设置?',
										confirmButtonText:'前往设置',
										cancelButtonText:'否'
									}).then(() => {
										uni.navigateTo({
											url: '../electric_card_management/electric_card_management'
										})
									}).catch(() => {
										this.buybtn1()
										
									});
								}else{
									this.buybtn1()
								}
							}
						}else{
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {
						
					})
			},
			buybtn1(){
				let data={
					packageId:this.packageId,
					stepId:this.stepId,
					userId:uni.getStorageSync('userId')
				}
				uni.showLoading({
					title: '请稍候',
					mask: true
				})
				this.$base.request('recharge/buyParkingPackage', 'POST', data)
					.then(res => {
						if (res.data.code == 200) {
							uni.hideLoading()
							Dialog.confirm({
								message: '购买成功',
								confirmButtonText:'返回首页',
								cancelButtonText:'去使用'
							}).then(() => {
								uni.redirectTo({
									url: '../index/index'
								})
							}).catch(() => {
								uni.redirectTo({
									url: '../smcharging/smcharging'
								})
							});
						} else {
							uni.hideLoading()
							Toast.fail(res.data.msg)	
						}
					})
					.catch(err => {
				
					})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.main {
		width: 100%;
		overflow-x: hidden;

		// background-color: #F5F5F5;
		/deep/.van-overlay {
			z-index: 980 !important;
		}

		/deep/.van-popup {
			z-index: 981 !important;
		}

		.newtap {
			width: 100%;
			padding: 10upx 35upx;
			box-sizing: border-box;

			.newone {
				width: 100%;
				box-sizing: border-box;
				margin: 0 auto;
				margin-top: 20upx;
				margin-bottom: 150upx;
				.newonetap {
					border: 2upx solid #343136;
					align-items: center;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					padding: 40upx 20upx;
					box-sizing: border-box;
					position: relative;
					margin-bottom: 20upx;
					background-color: #343136;
					border-radius: 16upx;
					.newonetapleft {
						font-size: 26upx;
						font-family: PingFang SC Bold, PingFang SC Bold-Bold;
						font-weight: 700;
						color: #D0D0D0;
					}
					.newonetapright{
						display: flex;
						align-items: center;
						.newonetaprighttxt{
							font-size: 24upx;
							font-family: PingFang SC Bold, PingFang SC Bold-Bold;
							font-weight: 700;
							color: #D0D0D0;
							text-decoration: line-through;
							margin-right: 35upx;
						}
						.newonetaprighttxt1{
							font-size: 36upx;
							font-family: PingFang SC Bold, PingFang SC Bold-Bold;
							font-weight: 700;
							color: #fff;
						}
					}
					.newonetapdb{
						position: absolute;
						bottom: 8upx;
						right: 0upx;
						font-size: 24upx;
						font-family: PingFang SC Bold, PingFang SC Bold-Bold;
						font-weight: 700;
						color: #FFA02E;
					}
				}
				.newonetap1{
					border: 2upx solid #FFA02E;
					align-items: center;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					padding: 40upx 20upx;
					box-sizing: border-box;
					position: relative;
					margin-bottom: 20upx;
					background-color: #343136;
					border-radius: 16upx;
					.newonetapleft {
						font-size: 26upx;
						font-family: PingFang SC Bold, PingFang SC Bold-Bold;
						font-weight: 700;
						color: #D0D0D0;
					}
					.newonetapright{
						display: flex;
						align-items: center;
						.newonetaprighttxt{
							font-size: 24upx;
							font-family: PingFang SC Bold, PingFang SC Bold-Bold;
							font-weight: 700;
							color: #D0D0D0;
							text-decoration: line-through;
							margin-right: 35upx;
						}
						.newonetaprighttxt1{
							font-size: 36upx;
							font-family: PingFang SC Bold, PingFang SC Bold-Bold;
							font-weight: 700;
							color: #fff;
						}
					}
					.newonetapdb{
						position: absolute;
						bottom: 8upx;
						right: 0upx;
						font-size: 24upx;
						font-family: PingFang SC Bold, PingFang SC Bold-Bold;
						font-weight: 700;
						color: #FFA02E;
					}
				}
			}
		}
		.dibu{
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			bottom: 20upx;
			padding: 0 35upx;
			box-sizing: border-box;
			.dibutxt{
				font-size: 36upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				color: #FFA02E;
			}
			.dibutap{
				width: 300upx;
				font-size: 28upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				color: #fff;
				background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
				padding: 20upx;
				border-radius: 40upx;
				text-align: center;
			}
		}
		/deep/.van-popup {
			border-radius: 16upx;
		}

	}
</style>
<style lang="scss">
	.van-dialog__header {
		color: red !important;
	}
</style>
