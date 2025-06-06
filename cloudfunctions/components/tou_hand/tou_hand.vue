<template>
	<view>
		<view class="hand">
			<view class="handnei">
				<view class="hleft">
					<image :src=userlist.weImage></image>
				</view>
				<view class="hright">
					<view>
						用户编号：{{userlist.id}}
					</view>
					<view>
						小区位置：<span v-if="userlist.projectName">{{userlist.projectName}}</span>
						<span v-else>暂未绑定</span>
					</view>	
					<view>
						包月截止：<span v-if="userlist.endTime">{{userlist.endTime}}</span>
						<span v-else>无</span>
					</view>
					<view v-show="userlist.monthlyType=='A1'||userlist.monthlyType=='A3'||userlist.monthlyType=='A4'||userlist.monthlyType=='A6'">
						本月剩余：<span v-if="userlist.monthlyType=='A1'||userlist.monthlyType=='A4'">{{userlist.num}}小时</span>
						<span v-else-if="userlist.monthlyType=='A3'||userlist.monthlyType=='A6'">{{userlist.num}}次</span>
						<span v-else>0</span>
					</view>
					<view v-show="userlist.monthlyType=='A5'||userlist.monthlyType=='A7'">
						当天剩余：<span v-if="userlist.monthlyType=='A5'">{{userlist.num}}小时</span>
						<span v-else-if="userlist.monthlyType=='A7'">{{userlist.num}}次</span>
						<span v-else>0</span>
					</view>
				</view>
			</view>
			<view class="hshow">
				<view class="hsleft">
					<view class="hsone" v-show="userlist.realBalance">{{userlist.realBalance}}</view>
					<view class="hsone" v-show="!userlist.realBalance">0.00</view>
					<view class="hstwo">账户余额</view>
				</view>
				<view class="hsleft">
					<view class="hsone hsleftk" v-show="userlist.dummyBalance">{{userlist.dummyBalance}}</view>
					<view class="hsone hsleftk" v-show="!userlist.dummyBalance">0.00</view>
					<view class="hstwo hsleftk">赠送余额</view>
				</view>
			</view>
			<view class="black" @click="blackbtn" v-show="handtype=='true'">
				<image src="../../static/tabBarimg/dbleft.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userlist: {}, //用户信息
				userno:''
			}
		},
		created() {
			this.userdetail()
		},
		onShow() {
			// this.userdetail()
		},
		props: {
			handtype: ''
		},
		methods: {
			//返回上一页
			blackbtn() {
				uni.navigateBack()
			},
			userdetail() {
				
				this.userlist = uni.getStorageSync('user')
				this.userlist.id=this.pad(this.userlist.id,8)
				
			},
			pad(num, n) {
			  var len = num.toString().length;
			  while(len < n) {
			    num = "0" + num;
			    len++;
			  }
			  return num;
			}
			
		}
	}
</script>

<style lang="scss">
	.hand {
		width: 100%;
		height: 340upx;
		text-size-adjust: 100% !important;
		-webkit-text-size-adjust: 100% !important;  
		-moz-text-size-adjust: 100% !important; 
		// background: url('../../static/tabBarimg/indexbg.png') no-repeat;
		// background-color: blue;
		border-radius: 0 0 5% 5%;
		background-image: linear-gradient(to right, #5260Ef , #428DE9);
		background-size: cover;
		box-sizing: border-box;
		padding-top: 54upx;
		padding-left: 33upx;
		position: relative;

		.handnei {
			width: 100%;
			display: flex;

			.hleft {
				width: 161upx;
				height: 161upx;
				border-radius: 50%;
				padding: 5upx;
				background-color: #FFFFFF;
				image {
					width: 161upx;
					height: 161upx;
					border-radius: 50%;
				}
			}

			.hright {
				height: 161upx;
				font-size: 24upx;
				font-family: PingFang SC Medium, PingFang SC Medium-Medium;
				font-weight: 500;
				// text-align: left;
				color: #ffffff;
				margin-left: 22upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				box-sizing: border-box;
				view {
					// margin-bottom: 13upx;
					width: 500upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		.hshow {
			width: 686upx;
			// height: 113upx;
			padding: 10upx 0;
			border-radius: 16upx;
			background-color: #FFFFFF;
			bottom: -60upx;
			// top: 304upx;
			// box-shadow: 0px 0px 5upx 2.5upx rgba(106, 106, 106, 0.9);
			box-shadow: 0px 10px 10px -4px #e4e8ed;
			position: absolute;
			display: flex;


			.hsleft {
				width: 50%;
				text-align: center;
				box-sizing: border-box;

				.hsone {
					font-size: 36upx;
					font-family: Arial Bold, Arial Bold-Bold;
					font-weight: 700;
					color: #50a1f3;
				}

				.hstwo {
					font-size: 28upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #333333;
				}

				.hsleftk {
					border-left: 1upx solid #c3defa;
				}
			}
		}

		.black {
			width: 22upx;
			height: 39upx;
			position: absolute;
			top: 29upx;
			left: 34upx;
			box-sizing: border-box;

			image {
				width: 22upx;
				height: 39upx;
			}

		}
	}
</style>
