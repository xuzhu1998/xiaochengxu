<template>
	<view>
		<view :class="logolist.loshow=='0'?'hleft':'hleft1'">
			<image :src=logolist.logo></image>
		</view>
		<view class="hand">
			<view class="hone">
				用户编号：{{userlist.id}}
			</view>
			<view class="htwo">
				<view class="htwofirst" >
					<image src="../../static/tabBarimg/hand1.png" style="width: 22upx;height: 28upx;margin-right: 10upx;"></image>
					<view class="htwoname">小区位置：</view>
					<view class="htwotxt" v-if="userlist.projectName">{{userlist.projectName}}</view>
					<view class="htwotxt" v-else>暂未绑定</view>
				</view>
				<view class="htwofirst" >
					<image src="../../static/tabBarimg/hand2.png" style="width: 25upx;height: 25upx;margin-right: 10upx;"></image>
					<view class="htwoname">充电包月截止：</view>
					<view class="htwotxt" v-if="userlist.endTime">{{userlist.endTime}}</view>
					<view class="htwotxt" v-else>无</view>
				</view>
				<view class="htwofirst" v-if="userlist.monthlyType=='A1'||userlist.monthlyType=='A3'||userlist.monthlyType=='A4'||userlist.monthlyType=='A6'" >
					<view class="htwoname" style="margin-left: 34upx;">本月剩余：</view>
					<view class="htwotxt"  v-if="userlist.monthlyType=='A1'||userlist.monthlyType=='A4'">{{userlist.num}}小时</view>
					<view class="htwotxt" v-else-if="userlist.monthlyType=='A3'||userlist.monthlyType=='A6'">{{userlist.num}}次</view>
					<view class="htwotxt" v-else>0</view>
				</view>
				<view class="htwofirst" v-if="userlist.monthlyType=='A5'||userlist.monthlyType=='A7'" >
					<view class="htwoname" style="margin-left: 34upx;">当天剩余：</view>
					<view class="htwotxt" v-if="userlist.monthlyType=='A5'">{{userlist.num}}小时</view>
					<view class="htwotxt" v-else-if="userlist.monthlyType=='A7'">{{userlist.num}}次</view>
					<view class="htwotxt" v-else>0</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userlist: {}, //用户信息
				userno:'',
				logolist:'',
			}
		},
		created() {
			
		},
		onShow() {
			
		},
		props: {
			
		},
		methods: {
			//返回上一页
			blackbtn() {
				uni.navigateBack()
			},
			userdetail() {
				var logolist = 'logolist_' + uni.getStorageSync('userId')
				this.logolist=uni.getStorageSync(logolist)
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
	.hleft{
		margin-top: 34upx;
		margin-left: 63upx;
		width: 213upx;
		height: 64upx;
		margin-bottom: 29upx;
		image{
			width: 213upx;
			height: 64upx;
		}
	}
	.hleft1{
		margin-top: 34upx;
		margin-left: 63upx;
		width: 160upx;
		height: 160upx;
		margin-bottom: 10upx;
		image{
			width: 160upx;
			height: 160upx;
		}
	}
	.hand{
		width: 650upx;
		background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
		border-radius: 24upx;
		margin: 0 auto;
		box-sizing: border-box;
		padding:36upx 50upx;
		.hone{
			font-size: 46upx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
		}
		.htwo{
			margin-top: 10upx;
			box-sizing: border-box;
			.htwofirst{
				display: flex;
				align-items: center;
				box-sizing: border-box;
				overflow:hidden;
				text-overflow:ellipsis;
				white-space:nowrap;
				font-size: 26upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				margin-bottom: 13upx;
				
				.htwoname{
					
				}
				.htwotxt{
					width: 70%;
					overflow:hidden;
					text-overflow:ellipsis;
					white-space:nowrap;
				}
			}
		}
	}
</style>
