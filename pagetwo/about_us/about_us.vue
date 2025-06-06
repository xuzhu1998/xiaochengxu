<template>
	<view class="main">
		<view class="show">
			<view :class="list.loshow=='0'?'shand':'shand1'">
				<image :src=list.logo></image>
			</view>
			<view class="sone">
				<view class="btap">
					<view class="dbleft">
						<image src="../../static/tabBarimg/a2.png"></image>
						<view class="dbtext">联系我们</view>
					</view>
					<view class="dbright" @click="callphone">
						<span class="dbphone">
						<a  class="msright" style="color: #4B98ED;">{{list.phone}}</a>
						</span>
						<image src="../../static/tabBarimg/kright.png"></image>
					</view>
				</view>
				<navigator url="../feedback/feedback">
				<view class="btap">
					<view class="dbleft">
						<image src="../../static/tabBarimg/a3.png"></image>
						<view class="dbtext">意见反馈</view>
					</view>
					<view class="dbright">
						<image src="../../static/tabBarimg/kright.png"></image>
					</view>
				</view>
				</navigator>
				<navigator url="../my_message/my_message">
				<view class="btap">
					<view class="dbleft">
						<image src="../../static/tabBarimg/a4.png"></image>
						<view class="dbtext">我的信息</view>
					</view>
					<view class="dbright">
						<image src="../../static/tabBarimg/kright.png"></image>
					</view>
				</view>
				</navigator>
			</view>
			
		</view>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import {Config} from '../../common/Config.js'
	export default {
		components: {},
		mounted() {
		},

		data() {
			return {
				list:{}
			}
		},
		onLoad() {
			var logolist = 'logolist_' + uni.getStorageSync('userId')
			this.list=uni.getStorageSync(logolist)
		},
		methods: {
			callphone(){
				if(this.list){
					uni.makePhoneCall({
						phoneNumber: this.list.phone.toString()
					}).catch((e) => {
						// console.log(e)  //用catch(e)来捕获错误{makePhoneCall:fail cancel}
					})
				}else{
					Toast.fail('暂未配置电话')
					return
				}
				
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
		
		.show{
			width: 100%;
			.shand{
				width: 432upx;
				height: 129upx;
				margin: 90upx auto;
				image{
					width: 432upx;
					height: 129upx;
				}
			}
			.shand1{
				width: 300upx;
				height: 300upx;
				margin: 90upx auto;
				image{
					width: 300upx;
					height: 300upx;
				}
			}
			.sone{
				width: 686upx;
				margin: 0 auto;
				.btap {
					width: 100%;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					padding: 29upx 36upx;
					margin-bottom: 21upx;
					align-items: center;
					background: #343136;
					border-radius: 24upx;
					.dbleft {
						box-sizing: border-box;
						display: flex;
						align-items: center;
						image {
							width: 29upx;
							height: 37upx;
							margin-top: 9upx;
						}
				
						.dbtext {
							box-sizing: border-box;
							margin-left: 22upx;
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							color: #fff;
						}
				
					}
				
					.dbright {
						box-sizing: border-box;
						display: flex;
						.dbphone{
							font-size: 24upx;
							font-family: PingFang SC Heavy, PingFang SC Heavy-Heavy;
							font-weight: 800;
							color: #4b98ed;
							margin-right: 28upx;
						}
						image {
							width: 19upx;
							height: 32upx;
						}
				
					}
				}
			}
			
		}
		
	}
</style>
