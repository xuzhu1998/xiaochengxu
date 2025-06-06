<template>
	<view class="main">
		<view class="show">
			<view class="sone"  v-for="(item, index) in showlist" :key="index">
				<view class="sonemen" v-if="mtype==1&&item.types==0">门禁卡</view>
				<view class="soneleft">
					{{item.card_id}}
				</view>
				<view class="soneright" @click="mbtn(item.card_id,item.types)" v-if="mtype==1&&item.types==0">
					取消门禁卡
				</view>
				<view class="soneright" @click="mbtn(item.card_id,item.types)" v-if="mtype==0">
					设为门禁卡
				</view>
				<view class="soneright" @click="jbbtn(item.card_id)">
					解绑
				</view>
			</view>
			<view class="stwo" v-show="bdshow==1">
				<view class="stwoleft">
					<input placeholder="请输入电卡号" v-model="dknum" type="number"/>
				</view>
				<view class="stworight" @click="bangbtn">
					确认绑定
				</view>
			</view>
			<!-- <view class="sthree" v-show="bdshow==1">
				添加电卡
			</view> -->
			<view class="sfour" v-show="bdshow==1&&tapshow">
				当前暂无电卡,请输入电卡号进行绑定，最多可绑定2张
			</view>
		</view>
		<!-- //绑定成功提示 -->
		<van-popup v-model="ashow">
			<view class="tan">
				<view class="cg">
					<image src="../../static/tabBarimg/bdcg.png"></image>
					<view>绑定成功</view>
				</view>
				
			</view>
		</van-popup>
		<!-- //解绑成功提示 -->
		<van-popup v-model="bshow">
			<view class="tan">
				<view class="cg">
					<image src="../../static/tabBarimg/jbcg.png"></image>
					<view>解绑成功</view>
				</view>
				
			</view>
		</van-popup>
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
				tapshow:false,
				showlist:[],//用户绑定电卡列表
				bdshow:1,//1代表解绑显示，2表示绑定显示
				dknum:'',//电卡号
				checked1:false,
				ashow:false,
				bshow:false,
				mtype:0,
				
			}
		},
		onLoad() {
			this.show();
		},
		methods: {
			//获取用户绑定电卡列表
			show(){
				this.mtype=0
				let data = {
					userId: uni.getStorageSync('userId')
				}
				this.$base.request('electricCard/list', 'GET', data)
					.then(res => {
						if(res.data.code==200){
							if(res.data.data.length!=0){
								this.tapshow=false
								this.showlist=res.data.data
								if(res.data.data.length>1){
									this.bdshow=2
								}else{
									this.bdshow=1
								}
								for(var i=0;i<res.data.data.length;i++){
									if(res.data.data[i].types==0){
										this.mtype=1
									}
								}
							}else{
								this.bdshow=1
								this.tapshow=true
								this.showlist=[]
							}
						}else{
							this.bdshow=2
							this.tapshow=false
							Toast.fail(res.data.msg)
							this.showlist=[]
						}
					})
					.catch(err => {
						
					})
			},
			//解绑电卡
			jbbtn(e){
				Dialog.confirm({
				  title: '提示',
				  message: '确认解绑？',
				  confirmButtonColor:'#EC651C'
				}).then(() => {
				uni.showLoading({
					title: '请稍候',
					mask: true
				})
				  let data = {
				  	userId: uni.getStorageSync('userId'),
				  	cardNo:e,
				  	type:1
				  }
				  this.$base.request('electricCard', 'PUT', data)
				  	.then(res => {
						uni.hideLoading()
				  		if(res.data.code==200){
				  			this.bshow=true
				  			this.show();
				  		}else{
				  			Toast.fail(res.data.msg)
				  		}
				  	})
				  	.catch(err => {
				  		
				  	})
				}).catch(() => {
				  // on cancel
				});
				
			},
			
			//绑定电卡
			bangbtn(e){
				var reg=/.*\..*/;
				if(reg.test(this.dknum)){
					Toast.fail('电卡号输入不正确')
					return
				}
				if(this.dknum.length!=10){
					Toast.fail('请输入10位电卡号')
					return
				}
				let data = {
					userId: uni.getStorageSync('userId'),
					cardNo:this.dknum,
					type:0
				}
				uni.showLoading({
					title: '请稍候',
					mask: true
				})
				this.$base.request('electricCard', 'PUT', data)
					.then(res => {
						uni.hideLoading()
						if(res.data.code==200){
							this.show();
							this.dknum=""
							this.tapshow=false
							this.ashow=true
						}else{
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {
						
					})
			},
			//设置门禁卡
			mbtn(e,types){
				var txt=''
				var mjnum=''
				var txt1=''
				if(types==0){
					txt='确定取消门禁卡'
					mjnum=1
					txt1='取消门禁卡成功'
				}else{
					txt='确定设为门禁卡'
					mjnum=0
					txt1='设为门禁卡成功'
				}
				Dialog.confirm({
				  title: '提示',
				  message: txt,
				  confirmButtonColor:'#EC651C'
				}).then(() => {
					uni.showLoading({
						title: '请稍候',
						mask: true
					})
				  let data = {
				  	userId: uni.getStorageSync('userId'),
				  	cardNo:e,
				  	type:mjnum
				  }
				  this.$base.request('electricCard/cardParking', 'PUT', data)
				  	.then(res => {
						uni.hideLoading()
				  		if(res.data.code==200){
							this.show();
							Toast.success(txt1)
				  		}else{
				  			Toast.fail(res.data.msg)
				  		}
				  	})
				  	.catch(err => {
				  		
				  	})
				}).catch(() => {
				  // on cancel
				});
				
			},
			//显示添加电卡
			tapbtn(){
				this.tapshow=true
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
		overflow-x: hidden;

		.show {
			width: 100%;
			margin-top: 85upx;
			margin-bottom: 41upx;
			.sone{
				display: flex;
				width: 650upx;
				height: 126upx;
				border-radius: 24upx;
				background-color: #343136;
				margin: 20upx auto;
				box-sizing: border-box;
				justify-content: space-between;
				align-items: center;
				padding: 0 40upx;
				position: relative;
				.sonemen{
					position: absolute;
					top: 0upx;
					color: #4B98ED;
					font-size: 28upx;
					font-weight: 700;
				}
				.soneleft{
					font-size: 32upx;
					font-family: Arial Bold, Arial Bold-Bold;
					font-weight: 700;
					color: #fff;
					line-height: 126upx;
				}
				.soneright{
					width: 180upx;
					height: 68upx;
					background: #434045;
					border-radius: 24upx;
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #D0D0D0;
					text-align: center;
					line-height: 68upx;
					
				}
			}
			.stwo{
				width: 650upx;
				border-radius: 24upx;
				height: 140upx;
				display: flex;
				background-color: #343136;
				margin: 0 auto;
				box-sizing: border-box;
				justify-content: space-between;
				margin-top: 18upx;
				align-items: center;
				padding: 0upx 40upx;
				.stwoleft{
					input{
						font-size: 28upx;
						font-family: PingFang SC Medium, PingFang SC Medium-Medium;
						font-weight: 500;
						color: #D0D0D0;
					}
				}
				.stworight{
					width: 179upx;
					height: 68upx;
					font-size: 24upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #ffffff;
					text-align: center;
					line-height: 68upx;
					background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
					border-radius: 24upx;
				}
			}
			.sthree{
				width: 686upx;
				height: 88upx;
				border-radius: 16upx;
				margin: 0 auto;
				background-color: #4B98ED;
				font-size: 32upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				text-align: center;
				color: #ffffff;
				line-height: 88upx;
				margin-top: 39upx;
			}
			.sfour{
				width: 100%;
				box-sizing: border-box;
				font-size: 24upx;
				font-family: PingFang SC Regular, PingFang SC Regular-Regular;
				font-weight: 400;
				color: #666666;
				padding: 37upx 35upx;
			}
			
		}
		.footdibu{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			// background-color: rgba(0,0,0,.7);
			.fdbfive{
				position: absolute;
				top: 30upx;
				right: 30upx;
				width: 94upx;
				height: 46upx;
				image{
					width: 94upx;
					height: 46upx;
				}
			}
			.fdbone{
				position: absolute;
				width:200upx;
				height:200upx;
				top: 378upx;
				left: 30upx;
				border-radius: 50%;
				box-shadow: rgba(0,0,0,.6) 0  0  0  100vh;
			}
			.fdbtwo{
				position: absolute;
				width: 126upx;
				height: 132upx;
				top: 580upx;
				left: 258upx;
				image{
					width: 126upx;
					height: 132upx;
				}
			}
			.fdbthree{
				position: absolute;
				width: 450upx;
				top: 760upx;
				text-align: center;
				left: 142upx;
				color: #FFFFFF;
				.fdbthreeshang{
					font-size: 35upx;
					font-family: YouYuan;
					font-weight: 400;
				}
				.fdbthreezhong{
					margin-top: 38upx;
					font-size: 21upx;
					font-family: YouYuan;
					font-weight: 400;
				}
				
			}
			.fdbfour{
				position: absolute;
				top: 968upx;
				left: 272upx;
				width: 198upx;
				height: 76upx;
				image{
					width: 198upx;
					height: 76upx;
				}
			}
			.fdbsix{
				position: absolute;
				top: 1080upx;
				left: 272upx;
				font-size: 23upx;
				font-family: Alibaba PuHuiTi;
				font-weight: 400;
				color: #FFFFFF;
				/deep/.van-checkbox__label{
					color: #FFFFFF;
				}
				/deep/.van-checkbox__icon--checked .van-icon{
					border-color: #FFFFFF;
					background-color:transparent;
				}
				
			}
			
		}
		.tan{
			width: 544upx;
			background-color: #fff;
			box-sizing: border-box;
			.cg{
				width: 164upx;
				margin: 50upx auto;
				font-size: 34upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #111111;
				text-align: center;
				image{
					width: 120upx;
					height: 120upx;
					margin-bottom: 36upx;
				}
				
			}
		}
	}
</style>
