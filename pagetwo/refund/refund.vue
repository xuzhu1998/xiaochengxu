<template>
	<view class="main">
		<view class="show">
			<view class="shand" v-if="type==1">
				<view class="shandleft">你的包月期限：</view>
				<view class="shandright" v-if="baoyue">{{baoyue.month}}</view>
				<view class="shandright" v-if="!baoyue">未知</view>
			</view>
			<view class="shand" v-if="type==1">
				<view class="shandleft">可退基本金额：</view>
				<view >
					<view class="shandright1" v-if="baoyue">¥{{baoyue.real}}</view>
					<view class="shandright1" v-if="!baoyue">¥ 0</view>
				</view>
			</view>
			<view class="shand" v-if="type==1">
				<view class="shandleft">可退赠送金额：</view>
				<view >
					<view class="shandright1" v-if="baoyue">¥{{baoyue.dum}}</view>
					<view class="shandright1" v-if="!baoyue">¥ 0</view>
				</view>
			</view>
			<view class="shand" v-if="type==2">
				<view class="shandleft">系统核算可退金额：</view>
				<view>
					<view class="shandright1" >¥{{realBalance}}</view>
				</view>
			</view>
			<view class="shand" v-if="type==3">
				<view class="shandleft">你的包月期限：</view>
				<view class="shandright" v-if="baoyue">{{baoyue.month}}</view>
				<view class="shandright" v-if="!baoyue">未知</view>
			</view>
			<view class="shand" v-if="type==3">
				<view class="shandleft">可退基本金额：</view>
				<view >
					<view class="shandright1" v-if="baoyue">¥{{baoyue.totalReal}}</view>
					<view class="shandright1" v-if="!baoyue">¥ 0</view>
				</view>
			</view>
			<view class="shand" v-if="type==3">
				<view class="shandleft">可退赠送金额：</view>
				<view >
					<view class="shandright1" v-if="baoyue">¥{{baoyue.totalBalance}}</view>
					<view class="shandright1" v-if="!baoyue">¥ 0</view>
				</view>
			</view>
			<view class="ktwo">
				<van-collapse :value="activeNames" @change='onchange'>
					<van-collapse-item :title=reason name="1" >
						<van-radio-group v-model="radio1" @change="gobtn">
							<van-radio name="离开当前充电区，不再使用">离开当前充电区，不再使用</van-radio>
							<van-radio name="充电区升级改造，充电设备迁移，无法再继续使用">充电区升级改造，充电设备迁移，无法再继续使用</van-radio>
							<van-radio name="设备不好用/使用不方便">设备不好用/使用不方便</van-radio>
							<van-radio name="设备故障，无法正常开启充电">设备故障，无法正常开启充电</van-radio>
							<van-radio name="其他">其他</van-radio>
						</van-radio-group>
					</van-collapse-item>
				</van-collapse>
			</view>
			
			<view class="shfour" v-if="type==1||type==3">
					<view class="shfourleft" @click="tkbtn" v-if="baoyue">
						确认退款
					</view>
					<view class="shfourright"  v-if="!baoyue">
						确认退款
					</view>
					<view class="shfourright">
						取消退款
					</view>
			</view>
			<view class="shfour" v-if="type==2">
					<view class="shfourleft" @click="tkbtn">
						确认退款
					</view>
					<view class="shfourright">
						取消退款
					</view>
			</view>
			<view class="shfive">
				<view class="shfivehand">
					说明：
				</view>
				<view v-if="type==1||type==3">
					<view class="shfivefoot">
						1、可退金额为系统初步核算，具体以实际退款到账为准;
					</view>
					<view class="shfivefoot" v-if="baoyue.mon_type=='A'">
						2、包月只能退下月开始的套餐，本月（包含加油包）不可退，即包月退款之后本月依然可用;
					</view>
					<view class="shfivefoot" v-if="baoyue.mon_type=='A'">
						3、退款金额将根据购买时使用的余额退回至余额（账户余额、赠送余额），且优先退回至赠送余额;
					</view>
					<view class="shfivefoot" v-if="baoyue.mon_type=='A5'||baoyue.mon_type=='A7'">
						2、包月从当前时间开始到有效期之内可退（不含当天），即包月退款之后需重新购买才可使用;
					</view>
					<view class="shfivefoot" v-if="baoyue.mon_type=='A5'||baoyue.mon_type=='A7'">
						3、退款金额将根据购买时使用的余额退回至余额（账户余额、赠送余额），且优先退回至赠送余额;
					</view>
					<view class="shfivefoot" v-if="baoyue.mon_type=='A4'||baoyue.mon_type=='A6'">
						2、包月从当前时间开始到有效期之内可退（包含加油包、不含当天），即包月退款之后需重新购买才可使用;
					</view>
					<view class="shfivefoot" v-if="baoyue.mon_type=='A4'||baoyue.mon_type=='A6'">
						3、退款金额将根据购买时使用的余额退回至余额（账户余额、赠送余额），且优先退回至赠送余额，加油包所使用金额退回至赠送余额;
					</view>
					<view class="shfivefoot">
						4、如有疑问，可在<span style='color: #FFA02E;' @click='gohelp'>“个人中心-使用帮助”</span>中电话联系客服;
					</view>
				</view>
				<view v-if="type==2">
					<view class="shfivefoot">
						1、只能申请“账户余额"中的金额;
					</view>
					<view class="shfivefoot">
						2、申请成功后，账户的金额将被锁定， 您将不能充电和充值;
					</view>
					<view class="shfivefoot">
						3、退款成功后，“赠送余额”自动清零;
					</view>
					<view class="shfivefoot">
						4、退款需要您的真实姓名，请确认是否填写正确。可以前往<span style='color: #FFA02E;' @click='gouser'>“个人资料”</span>核实;
					</view>
					<view class="shfivefoot">
						5、如有疑问，可在<span style='color: #FFA02E;' @click='gohelp'>“个人中心-使用帮助”</span>中电话联系客服;
					</view>
					
				</view>
			</view>
		</view>
		<view class="footdibu" v-if="typeone">
			<view class="fdbone"></view>
			<view class="fdbfive">
				<image src="../../static/tabBarimg/n8.png"></image>
			</view>
			<view class="fdbtwo">
				<image src="../../static/tabBarimg/n1.png"></image>
			</view>
			<view class="fdbthree">
				<view class="fdbthreeshang">勾选退款原因,确认退款</view>
				
				
			</view>
			<view class="fdbfour">
				<image src="../../static/tabBarimg/n2.png"></image>
			</view>
			<view class="fdbsix">
				<van-checkbox v-model="checked" shape="square" class="reset">下次不再显示</van-checkbox>
			</view>
		</view>
		<view class="footdibu1" v-if="typetwo">
			<view class="fdbone"></view>
			<view class="fdbfive">
				<image src="../../static/tabBarimg/n8.png"></image>
			</view>
			<view class="fdbtwo">
				<image src="../../static/tabBarimg/n1.png"></image>
			</view>
			<view class="fdbthree">
				<view class="fdbthreeshang">勾选退款原因,确认退款</view>
			</view>
			<view class="fdbfour">
				<image src="../../static/tabBarimg/n3.png"></image>
			</view>
			<view class="fdbsix">
				<van-checkbox v-model="checked1" shape="square" class="reset">下次不再显示</van-checkbox>
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
				type:1,//1包月退款2余额退款
				activeNames: [''],
				radio1: '', //退款原因
				reason:'请选择退款原因',
				baoyue:'',//包月退款数据
				realBalance:'',//退余额余额
				typeone:false,
				typetwo:false,
				checked:false,
				checked1:false,
			}
		},
		onLoad(option) {
			if(option.type){
				this.type=option.type
			}else{
				this.type=1
			}
		},
		onShow() {
			this.realBalance=uni.getStorageSync('user').realBalance
			if(this.type==1||this.type==3){
				this.show()
			}
		},
		methods: {
			show(){
				if(this.type==1){
					this.$base.request('refund/refundMonthMsg', 'GET')
						.then(res => {
							if(res.data.code==200){
								this.baoyue=res.data.data
							}else{
								Toast.fail(res.data.msg)
								setTimeout(()=>{
									uni.navigateBack({
										delta: 1
									})
								},1200)
								
							}
							
						})
						.catch(err => {
							
						})
				}else if(this.type==3){
					this.$base.request('refund/checkMonthRefundParking', 'POST')
						.then(res => {
							if(res.data.code==200){
								this.baoyue=res.data.data
							}else{
								Toast.fail(res.data.msg)
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1200)
								
							}
							
						})
						.catch(err => {
							
						})
				}
				
			},
			gobtn(e){
				this.radio1=e.detail
				this.reason='退款原因：'+this.radio1
				this.activeNames=['']
			},
			usertap(){
				this.$base.request('user/userInfo', 'GET')
					.then(res => {
						var userlist = res.data.data
						userlist.id=this.pad(userlist.id,8)
						uni.setStorageSync('user', userlist)
						uni.setStorageSync('phone', userlist.phone)
						uni.setStorageSync('Name', userlist.realName)
					})
					.catch(err => {
				
					})
			},
			pad(num, n) {
			  var len = num.toString().length;
			  while(len < n) {
			    num = "0" + num;
			    len++;
			  }
			  return num;
			},
			gouser(){
				uni.redirectTo({
					url: '../personal_data/personal_data?ktype=' + 2
				});
			},
			gohelp(){
				uni.redirectTo({
					url: '../using_help/using_help' 
				});
			},
			//确认退款
			tkbtn(){
				if(this.type==1){
					
					if(!this.radio1){
						Toast.fail('请选择退款原因')
						return
					}
					var realName=uni.getStorageSync('user').realName
					if(!realName){
						Toast.fail('退款需要您的真实姓名，请到"查看更多，个人资料中完善"')
						return
					}
					Dialog.confirm({
					  title: '标题',
					  message: '确认退款？',
					  confirmButtonColor:'#EC651C'
					}).then(() => {
					  let data={
					  	refundReason:this.radio1,
					  	token:uni.getStorageSync('userToken')
					  }
					  this.$base.request('refund/refundMonth', 'POST',data)
					  	.then(res => {
					  		if(res.data.code==200){
								this.usertap();
					  			Toast.success(res.data.msg)
								setTimeout(()=>{
									uni.navigateBack()
								},1200)
					  			
					  		}else{
					  			Toast.fail(res.data.msg)
					  		}
					  	})
					  	.catch(err => {
					  		
					  	})
					}).catch(() => {
					  // on cancel
					});
					
				}else if(this.type==2){
					if(!this.radio1){
						Toast.fail('请选择退款原因')
						return
					}
					Dialog.confirm({
					  title: '标题',
					  message: '确认退款？',
					  confirmButtonColor:'#EC651C'
					}).then(() => {
					 let data={
					 	refundReason:this.radio1,
					 	token:uni.getStorageSync('userToken')
					 }
					 this.$base.request('refund/refundAmount', 'POST',data)
					 	.then(res => {
					 		if(res.data.code==200){
								this.usertap();
					 			Toast.success(res.data.msg)
					 			setTimeout(()=>{
					 				uni.navigateBack()
					 			},1200)
					 		}else{
					 			Toast.fail(res.data.msg)
					 		}
					 	})
					 	.catch(err => {
					 		
					 	})
					}).catch(() => {
					  // on cancel
					});
					
				}else if(this.type==3){
					
					if(!this.radio1){
						Toast.fail('请选择退款原因')
						return
					}
					var realName=uni.getStorageSync('user').realName
					if(!realName){
						Toast.fail('退款需要您的真实姓名，请到"查看更多，个人资料中完善"')
						return
					}
					Dialog.confirm({
					  title: '标题',
					  message: '确认退款？',
					  confirmButtonColor:'#EC651C'
					}).then(() => {
					  let data={
					  	refundReason:this.radio1,
					  	token:uni.getStorageSync('userToken')
					  }
					  this.$base.request('refund/packageMonthRefundParking', 'POST',data)
					  	.then(res => {
					  		if(res.data.code==200){
								this.usertap();
					  			Toast.success(res.data.msg)
					  			setTimeout(()=>{
									uni.navigateBack()
								},1200)
					  		}else{
					  			Toast.fail(res.data.msg)
					  		}
					  	})
					  	.catch(err => {
					  		
					  	})
					}).catch(() => {
					  // on cancel
					});
					
				}
				
			},
			onchange(e){
				this.activeNames=e.detail
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
		background-color: #242225;
		

		.show {
			width: 100%;
			margin-top: 85upx;
			background-color: #242225;
			box-sizing: border-box;
			padding: 0 50upx;
			padding-bottom: 50upx;
			.shand{
				width: 100%;
				box-sizing: border-box;
				display: flex;
				padding: 29upx 0;
				padding-left:36upx ;
				background: #343136;
				border-radius: 24upx;
				margin-bottom: 20upx;
				.shandleft{
					font-size: 30upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
				.shandleft1{
					font-size: 24upx;
					font-family: PingFang SC Regular, PingFang SC Regular-Regular;
					font-weight: 400;
					color: #333333;
				}
				.shandright{
					font-size: 28upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					color: #fff;
				}
				.shandright1{
					font-size: 32upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					color: #FFA02E;
				}
			}
			.ktwo {
				width: 100%;
				box-sizing: border-box;
				/deep/.van-cell:after{
					border-bottom: 0upx;
					border-bottom-color:transparent
				}
				/deep/.van-cell__title {
					font-size: 30upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #D0D0D0;
				}
				/deep/.van-collapse-item{
					background-color: #343136;
					border-radius: 24upx;
				}
				/deep/.van-cell {
					padding: 29upx 36upx;
					background: #343136;
					border-radius: 24upx;
				}
				/deep/.van-cell:not(:last-child)::after{
					border-bottom: 0upx;
				}
			
				/deep/.van-radio__label {
					font-size: 30upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					margin-left: 90upx;
				}
				
				/deep/.van-radio__icon {
					
					margin-left: 80upx;
				}
				/deep/.van-collapse-item__content{
					background-color: #343136;
					border-radius: 24upx;
					
				}
				/deep/.van-hairline--top-bottom::after{
					border-width: 0upx;
				}
				/deep/.van-radio {
					// margin-bottom: 15upx;
					height: 70upx;
					align-items: center;
				}
				
				/deep/.van-collapse-item__wrapper {
					margin-bottom: 10upx;
				
				}
				/deep/.van-cell:not(:last-child)::after{
					border-bottom: 0upx;
				}
				
				/deep/.van-radio__icon--checked{
					background-color: #EC651C;
					border-color: #EC651C;
				}
			}
			.shthree{
				width: 100%;
				box-sizing: border-box;
				padding: 26upx 0;
				padding-left:19upx ;
				.shthreeleft{
					font-size: 24upx;
					font-family: PingFang SC Regular, PingFang SC Regular-Regular;
					font-weight: 400;
					color: #333333;
				}
				.kthreefoot {
					width: 100%;
					box-sizing: border-box;
					margin-top: 21upx;
				
					/deep/.van-cell {
						background-color: #F0F0F0;
						height: 236upx;
						border-radius: 16upx;
					}
				}
			}
			.shfour{
				width: 100%;
				box-sizing: border-box;
				
				
				margin-top: 40upx;
				.shfourleft{
					width: 100%;
					height: 88upx;
					border-radius: 16upx;
					background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
					font-size: 32upx;
					font-family: PingFang SC Regular, PingFang SC Regular-Regular;
					font-weight: 400;
					text-align: center;
					line-height: 88upx;
					color: #ffffff;
					margin-bottom: 40upx;
				}
				.shfourright{
					width: 100%;
					height: 88upx;
					border-radius: 16upx;
					background: #343136;
					font-size: 32upx;
					font-family: PingFang SC Regular, PingFang SC Regular-Regular;
					font-weight: 400;
					text-align: center;
					line-height: 88upx;
					color: #D0D0D0;
				}
				
			}
			.shfive{
				margin-top: 59upx;
				.shfivehand{
					font-size: 28upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}
				.shfivefoot{
					font-size: 24upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #D0D0D0;
					line-height: 50upx;
				}
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
				width:260upx;
				height:80upx;
				top: 602upx;
				left: 40upx;
				border-radius: 50upx;
				box-shadow: rgba(0,0,0,.6) 0  0  0  100vh;
			}
			.fdbtwo{
				position: absolute;
				width: 126upx;
				height: 132upx;
				top: 730upx;
				left: 250upx;
				image{
					width: 126upx;
					height: 132upx;
				}
			}
			.fdbthree{
				position: absolute;
				width: 450upx;
				top: 899upx;
				text-align: center;
				left: 142upx;
				color: #FFFFFF;
				.fdbthreeshang{
					font-size: 39upx;
					font-family: YouYuan;
					font-weight: 700;
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
				top: 1003upx;
				left: 262upx;
				width: 198upx;
				height: 76upx;
				image{
					width: 198upx;
					height: 76upx;
				}
			}
			.fdbsix{
				position: absolute;
				top: 1120upx;
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
		.footdibu1{
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
				width:260upx;
				height:80upx;
				top: 516upx;
				left: 40upx;
				border-radius: 50upx;
				box-shadow: rgba(0,0,0,.6) 0  0  0  100vh;
			}
			.fdbtwo{
				position: absolute;
				width: 126upx;
				height: 132upx;
				top: 644upx;
				left: 250upx;
				image{
					width: 126upx;
					height: 132upx;
				}
			}
			.fdbthree{
				position: absolute;
				width: 450upx;
				top: 813upx;
				text-align: center;
				left: 142upx;
				color: #FFFFFF;
				.fdbthreeshang{
					font-size: 39upx;
					font-family: YouYuan;
					font-weight: 700;
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
				top: 917upx;
				left: 262upx;
				width: 198upx;
				height: 76upx;
				image{
					width: 198upx;
					height: 76upx;
				}
			}
			.fdbsix{
				position: absolute;
				top: 1030upx;
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
	}
</style>
