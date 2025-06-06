<template>
	<view class="main">
		
		<view class="hand">
			
			<view class="handone">
				<image src="../../static/tabBarimg/xy1.png"></image>
			</view>
			<view class="handtwo">
				<view class="htwofirst">
					<image src="../../static/tabBarimg/xy2.png"></image>保额最高
				</view>
				<view class="htwofirst">
					<image src="../../static/tabBarimg/xy3.png"></image>充电守护
				</view>
				<view class="htwofirst">
					<image src="../../static/tabBarimg/xy4.png"></image>快速理赔
				</view>
				<view class="htwofirst">
					<image src="../../static/tabBarimg/xy5.png"></image>专属客服
				</view>
			</view>
		</view>
		<view class="show">
			<view class="map">
				<view class="maptitle">
					<view class="maptitleleft"><span class="titleone"></span><span class="titletwo"></span><span class="titlethree"></span></view>
					<view class="titletxt">保障内容</view>
					<view class="maptitleleft"><span class="titlethree"></span><span class="titletwo"></span><span class="titleone"></span></view>
				</view>
				<view class="mapone">
					<view class="mone">
						<view class="moneleftshang">赔偿范围</view>
						<view class="monerightshang">保障金额</view>
					</view>
					<view class="mtwo">
						<view class="moneleftxia">使用充电桩进行充电的过程中可能出现非您或第三方故意或重大过失导致的电动车自燃、爆炸等意外事件。</view>
						<view class="monerightxia">
							每次事故赔偿限额{{xylist.bigMoney}}元（包含财产损失赔偿限额{{xylist.bigMoney/2}}元、人员伤亡每人赔偿限额{{xylist.bigMoney/2}}元）
						</view>
					</view>
					<view class="mthree">
						备注：每次事故损失绝对免赔额为200元或损失金额的10%，两者以高者为准。
					</view>
				</view>
				<view class="maptitle">
					<view class="maptitleleft"><span class="titleone"></span><span class="titletwo"></span><span class="titlethree"></span></view>
					<view class="titletxt">保障范围</view>
					<view class="maptitleleft"><span class="titlethree"></span><span class="titletwo"></span><span class="titleone"></span></view>
				</view>
				<view class="maptwo">
					<span>仅限于充电正常开启且在充电过程中充电车辆发生的自燃，即充电订单开始时间至结束时间期间内发生的自燃，其他时间段发生的自燃，不在补偿范围内。</span>
				</view>
				<view class="maptitle">
					<view class="maptitleleft"><span class="titleone"></span><span class="titletwo"></span><span class="titlethree"></span></view>
					<view class="titletxt">理赔流程</view>
					<view class="maptitleleft"><span class="titlethree"></span><span class="titletwo"></span><span class="titleone"></span></view>
				</view>
				<view class="mapthree">
					<view>第一步：客户报案（24小时内联系专属客服） </view>
					<view>第二步：提供材料（提交符合理赔要求的证明文件）</view>
					<view>第三步：处理理赔（理赔机构进行理赔）</view>
					<view>备注：在充电车辆发生约定的火灾、爆炸事件后，用户应以拍照、录像等方式留存证据，妥善保管燃后车辆用户应在充电车辆发生自燃现象后的24小时内联系充电守护客服登记备案、保持联系手机号码畅通并按时提交符合理赔要求的证明文件，超时登记备案或逾期提供证明文件所造成的不利后果由客户自行承担。</view>
				</view>
				<view class="maptitle">
					<view class="maptitleleft"><span class="titleone"></span><span class="titletwo"></span><span class="titlethree"></span></view>
					<view class="titletxt">服务协议</view>
					<view class="maptitleleft"><span class="titlethree"></span><span class="titletwo"></span><span class="titleone"></span></view>
				</view>
				<view class="maptwo">
					<view class='maptwotxt'>为保障您的合法权益，请您务必审慎阅读、充分理解各条款内容，您购买“充电守护”即接受全部的条款和条件，不购买“充电守护”服务不会影响您正常享受充电服务。<br/></view>
					<view class='maptwotxt'>提供的“充电守护服务仅从属于用户在智能充电桩官方公众号和小程序购买的充电服务与“充电守护”服务需组合使用。<br/></view>
					<view class='maptwotxt'>“充电守护”服务在购买支付费用后即生效，“充电守护”服务费均不予以退还。<br/></view>
					<view class='maptwotxt'>“充电守护”服务仅针对充电正常开启且充电过程中充电车辆发生的非用户或第三方故意或重大过失导致自燃、爆炸等意外事件提供补助与保障，“充电守护”服务期间自用户完成本服务的购买且充电服务正常开始时起算，至用户完成本次充电或发生上述意外事件两者中较早发生的时间停止。<br/></view>
					<view class="maptwotxt">单次购买：“充电守护”服务仅保障与其同时下单的一 笔充电服务，超过该笔充电服务期间将无法得到补助与保障。</view>
					<view class="maptwotxt">包月购买：“充电守护”服务仅保障包月范围内的充电服务，超过包月范围或包月次数用完则“充电守护”服务将无法得到补助与保障。</view>
					<view class='maptwotxt'>意外事件发生后请您先自行留存、收集相关理赔依据，包括但不限于现场监控视频、现场照片等相关证据（如充电桩位置、受损车辆照片、充电车品牌型号、充电人身份证等。照片需带拍摄时间、定位等信息。）。</view>
				</view>
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
				xylist:''
			}
		},
		onLoad(option) {
		},
		onShow() {
			this.show()
		},
		methods: {
			show(){
				this.$base.request('charge/safe/marketing', 'GET')
					.then(res => {
						if(res.data.code==200){
							this.xylist=res.data.data
						}else{
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {
				
					})
			},
			//返回上一页
			blackbtn() {
				uni.navigateBack()
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
		.hand{
			width: 100%;
			height: 408upx;
			background-image: url("../../static/tabBarimg/xybg.png");
			  background-size: cover;
			  background-repeat: no-repeat;
			  background-position: center;
			.handmap{
				text-size-adjust: 100% !important;
				-webkit-text-size-adjust: 100% !important;  
				-moz-text-size-adjust: 100% !important;
				width: 100%;
				font-size: 30upx;
				padding: 20upx 0;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				text-align: center;
				color: #ffffff;
				position: relative;
				image{
					width:22upx;
					height: 39upx;
					position: absolute;
					left: 31upx;
					top: 22upx;
				}
			}
			.handone{
				padding-top: 72upx;
				text-align: center;
				image{
					width: 459upx;
					height: 70upx;
				}
			}
			.handtwo{
				width: 633upx;
				border-radius: 29upx;
				border: 1upx solid #4E4C4F;
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 12upx 22upx;
				margin: 0 auto;
				margin-top: 31upx;
				.htwofirst{
					display: flex;
					align-items: center;
					image{
						width: 21upx;
						height: 22upx;
						margin-right: 4upx;
					}
					font-size: 24upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #D0D0D0;
				}
			}
		}
		
		
		.show{
			width: 100%;
			box-sizing: border-box;
			padding:0 50upx;
			.map{
				width: 100%;
				background: #343136;
				border-radius: 24upx;
				box-sizing: border-box;
				padding: 36upx 30upx;
				.maptitle{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 29upx;
					.maptitleleft{
						display: flex;
						align-items: center;
						width: 28upx;
						justify-content: space-between;
						.titleone{
							width: 4upx;
							height: 10upx;
							background: #EC651C;
							border-radius: 2upx;
							opacity: 0.3;
						}
						.titletwo{
							width: 6upx;
							height: 16upx;
							background: #EC651C;
							border-radius: 3upx;
							opacity: 0.5;
						}
						.titlethree{
							width: 8upx;
							height: 20upx;
							background: #EC651C;
							border-radius: 4upx;
							opacity: 0.8;
						}
					}
					.titletxt{
						font-size: 32upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 45upx;
						letter-spacing: 2upx;
						margin: 0 16upx;
					}
				}
				.mapone{
					width: 100%;
					box-sizing: border-box;
					margin-bottom: 50upx;
					.mone{
						width: 100%;
						box-sizing: border-box;
						display: flex;
						.moneleftshang{
							width: 50%;
							font-size: 28upx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							letter-spacing: 2upx;
							text-align: center;
							padding: 20upx 0;
							background-color: #4E4C4F;
							border-right: 4upx solid #242225;
							border-radius: 24upx 0upx 0upx 0upx;
						}
						.monerightshang{
							width: 50%;
							font-size: 28upx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							letter-spacing: 2upx;
							text-align: center;
							padding: 20upx 0;
							background-color: #4E4C4F;
							border-radius: 0upx 24upx 0upx 0upx;
						}
					}
					.mtwo{
						width: 100%;
						display: flex;
						box-sizing: border-box;
						.moneleftxia{
							background-color:#434045 ;
							padding: 32upx 24upx;
							display: flex;
							align-items: center;
							text-align: left;
							font-size: 24upx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 33upx;
							width: 50%;
							border-right: 4upx solid #242225;
						}
						.monerightxia{
							background-color:#434045 ;
							padding: 32upx 24upx;
							display: flex;
							align-items: center;
							text-align: left;
							font-size: 24upx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 33upx;
							width: 50%;
						}
						
					}
					.mthree{
						width: 100%;
						padding: 32upx 24upx;
						background-color:#4E4C4F;
						font-size: 24upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFA02E;
						line-height: 33upx;
						box-sizing: border-box;
						text-align: center;
						border-radius: 0upx 0upx 24upx 24upx;
					}
				}
				.maptwo{
					font-size: 24upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #D0D0D0;
					line-height: 36upx;
					letter-spacing: 1upx;
					margin-bottom: 60upx;
					.maptwotxt{
						text-indent:2em;
					}
				}
				.mapthree{
					font-size: 24upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 36upx;
					margin-bottom: 30upx;
				}
			}
			
		}
		
		
		
		
	}
</style>
