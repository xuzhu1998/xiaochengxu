<template>
	<view>
		<view class="main" v-if="projectSwitch=='1'">
			<view class="show">
				
				<view class="stwo">
					<view class="stwoshang">
						<image src="../../static/tabBarimg/zhye.png"></image>我的账户余额
					</view>
					<view class="stwoxia">
						¥{{realBalance}}
					</view>
				</view>
				<view class="sthree">
					<view class="sthreetxt" @click="refundbtn(1)">退包月</view>
					<view class="sthreetxt" @click="refundbtn(2)">退余额</view>
				</view>
				<view class="sfour">
					<view class="sfourtxt" @click="refund_detailsbtn('a')">包月退款记录</view>
					<view class="sfourtxt" @click="refund_detailsbtn('b')">余额退款记录</view>
				</view>
				<view class="sthree">
					<view class="sthreetxt" @click="refundbtn(3)">退停车包月</view>
				</view>
				<view class="sfour">
					<view class="sfourtxt" @click="refund_detailsbtn('d')">停车包月退款记录</view>
				</view>
			</view>
		</view>
		<view class="main1" v-if="projectSwitch=='0'">
			
			<view class="kshow">
				<view class="kone">
					<view class="koneleft">退款类型：</view>
					<view class="koneright">
						<van-radio-group :value="radio" direction="horizontal" class="krshow">
							<van-radio name="1" checked-color="#4fa2fa">退包月</van-radio>
							<van-radio name="0" checked-color="#4fa2fa">退余额</van-radio>
						</van-radio-group>
					</view>
				</view>
				<view class="ktwo">
					<van-collapse :value="activeNames" @change='onchange'>
						<van-collapse-item :title=reason name="1" :title-class="classtap">
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
				<view class="kthree">
					<view class="kthreehand">
						请输入退款说明：<span class="khtxttwo">（200字以内）</span>
					</view>
					<view class="kthreefoot">
						<van-field v-model="message" rows="2" autosize type="textarea" maxlength="200" @change='txtchange'/>
					</view>
				</view>
				
				<view class="kbtn" @click="tkbtn">
					确认
				</view>
				<view class="kbtxt">
					当前操作为退款申请，请等待管理员7个工作日之内审核
				</view>
				<view class="kbtxt1">
					退款需要您的真实姓名，请确认是否填写正确。可以前往<span style="color: #EC651C;" @click='gouser'>“个人资料”</span>核实；
				</view>
				
			</view>
		</view>
		<view class="footdibu" v-if="typeone">
			<view class="fdbone"></view>
			<view class="fdbfive">
				<image src="../../static/tabBarimg/n8.png"></image>
			</view>
			<view class="fdbtwo">
				<image src="../../static/tabBarimg/n9.png"></image>
			</view>
			<view class="fdbthree">
				<view class="fdbthreeshang">选择退包月或退余额</view>
				
				
			</view>
			<view class="fdbfour">
				<image src="../../static/tabBarimg/n2.png"></image>
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
				projectSwitch: '0',
				radio: '1', //退款类型
				activeNames: [''],
				radio1: '', //退款原因
				message: '', //故障描述
				realBalance:'',//账户余额
				reason: '请选择退款原因',
				classtap:'tclass',
				typeone:false,
			}
		},
		onLoad() {

		},
		onShow() {
			this.projectSwitch=uni.getStorageSync('user').winthdrawal
			if(!this.projectSwitch){
				this.projectSwitch='0'
			}
			if(this.projectSwitch==1){
				this.show()
			}
		},
		methods: {
			//获取用户信息
			show(){
				
				this.realBalance=uni.getStorageSync('user').realBalance
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
			//申请退款
			tkbtn(){
				let data={
					refundType:this.radio,
					reason:this.radio1,
					msg:this.message
				}
				this.$base.request('user/refund/back', 'POST',data)
					.then(res => {
						if(res.data.code==200){
							this.usertap();
							Toast.success('提交成功')
							setTimeout(()=>{
								uni.navigateBack()
							},1200)
						}else{
							Toast.fail(res.data.msg)
						}
						
					})
					.catch(err => {
						
					})
			},
			
			gobtn(e) {
				this.radio1=e.detail
				this.reason = this.radio1
				this.activeNames = ['']
				this.classtap='tclass1'
			},
			//跳转退款
			refundbtn(val) {
				uni.navigateTo({
					url: '../refund/refund?type='+val
				})
			},
			//跳转退款详情
			refund_detailsbtn(val) {
				uni.navigateTo({
					url: '../refund_details/refund_details?type='+val
				})
			},
			//返回上一页
			blackbtn(){
				uni.navigateBack()
			},
			onchange(e){
				this.activeNames=e.detail
			},
			txtchange(e){
				this.message=e.detail
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
			box-sizing: border-box;
			padding: 0 50upx;
			

			.stwo {
				width: 100%;
				text-align: center;
				margin-top: 55upx;
				background: #343136;
				border-radius: 24upx;
				padding: 40upx 0;
				.stwoshang {
					font-size: 30upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
					image{
						width: 36upx;
						height: 34upx;
						margin-right: 10upx;
					}
				}

				.stwoxia {
					font-size: 44upx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #FFFFFF;
					margin-top: 20upx;
				}
			}

			.sthree {
				width: 100%;
				align-items: center;
				display: flex;
				justify-content: space-between;
				margin-top: 80upx;

				.sthreetxt {
					width: 300upx;
					height: 80upx;
					background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
					border-radius: 24upx;
					font-size: 28upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					text-align: center;
					line-height: 80upx;
				}

				.sthreetap {
					width: 1upx;
					height: 28upx;
					background-color: #313131;
					margin: 0 15upx;
				}
			}

			.sfour {
				width: 100%;
				align-items: center;
				display: flex;
				justify-content: space-between;
				margin-top: 20upx;
				padding: 10upx 70upx;
				box-sizing: border-box;
				

				.sfourtxt {
					font-size: 26upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #D0D0D0;
				}

				.sfourtap {
					width: 1upx;
					height: 28upx;
					background-color: #313131;
					margin: 0 15upx;
				}
			}
		}
	}

	.main1 {
		width: 100%;
		overflow-x: hidden;
		.hand {
			width: 100%;
			background-color: #4B98ED;
			height: 62upx;
			font-size: 30upx;
			font-family: PingFang SC Bold, PingFang SC Bold-Bold;
			font-weight: 700;
			text-align: center;
			line-height: 62upx;
			color: #ffffff;
			position: relative;

			image {
				width: 22upx;
				height: 39upx;
				position: absolute;
				left: 31upx;
				top: 11upx;
			}
		}

		.kshow {
			width: 686upx;
			margin: 0 auto;
			margin-top: 51upx;

			.kone {
				width: 100%;
				display: flex;
				padding: 26upx;
				box-sizing: border-box;
				background-color: #343136;
				border-radius: 24upx;
				margin-bottom: 26upx;
				/deep/.van-radio__icon--checked{
					background-color: #EC651C !important;
					border-color: #EC651C !important;
				}
				.koneleft {
					font-size: 28upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #999999;
				}

				.koneright {
					.krshow {
						display: flex;

						/deep/.van-radio {
							margin-left: 62upx;
						}
						
						/deep/.van-radio__label {
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							color: #999999;
							margin-left: 10upx;
						}
					}
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

			.kthree {
				.kthreehand {
					font-size: 28upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #999999;
					margin-top: 33upx;

					.khtxttwo {
						font-size: 24upx;
						color: #666666;
					}
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

			.kfour {
				width: 100%;
				box-sizing: border-box;
				margin-top: 35upx;

				.kfourtxt {
					font-size: 28upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #333333;

					.kfourbud {
						font-size: 24upx;
						color: #666666;
					}
				}

				.add-img-box {
					display: flex;
					width: 750rpx;
					//padding: 0 40rpx;
					flex-direction: row;
					flex-wrap: wrap;
				}

				.add-img-item {
					width: 128upx;
					height: 128upx;
					border-radius: 16upx;
					position: relative;
					padding: 9rpx 0;
					margin-right: 20upx;
				}

				.add-img-camera {
					flex: 1;
				}

				.add-img {
					width: 128upx;
					height: 128upx;
					border-radius: 16upx;
				}

				.add-img-del {
					position: absolute;
					width: 40rpx;
					height: 40rpx;
					right: -14upx;
					top: -6upx;
					border-radius: 20rpx;
				}

				.address-time {
					width: 484rpx;
					height: 88rpx;
					background-color: rgba(245, 245, 245, 1);
					opacity: 1;
					border-radius: 24rpx;
					text-align: center;

					font-size: 35rpx;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}

				.line {
					width: 750rpx;
					height: 1px;
					transform: scaleY(0.3);
					background-color: rgba(0, 0, 0, 0.5);
				}
			}

			.kbtn {
				width: 686upx;
				height: 88upx;
				background: #EC651C;
				border-radius: 16upx;
				font-size: 32upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				text-align: center;
				line-height: 88upx;
				margin: 0 auto;
				margin-top: 59upx;
				color: #ffffff;
			}
			.kbtxt{
				color: #EC651C;
				margin-top: 30upx;
				font-size: 27upx;
			}
			.kbtxt1{
				color: #999999;
				margin-top: 30upx;
				font-size: 27upx;
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
			top: 802upx;
			left: 240upx;
			border-radius: 50upx;
			box-shadow: rgba(0,0,0,.6) 0  0  0  100vh;
		}
		.fdbtwo{
			position: absolute;
			width: 52upx;
			height: 180upx;
			top: 911upx;
			left: 348upx;
			image{
				width: 52upx;
				height: 180upx;
			}
		}
		.fdbthree{
			position: absolute;
			width: 450upx;
			top: 1099upx;
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
			top: 1203upx;
			left: 262upx;
			width: 198upx;
			height: 76upx;
			image{
				width: 198upx;
				height: 76upx;
			}
		}
		
	}
</style>
