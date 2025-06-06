<template>
	<view>
		<view class="main">
			<view class="kshow">
				<view class="kone">
					<input placeholder="设备编号" v-model="device" />
				</view>
				<view class="ktwo">
					<van-collapse :value="activeNames" @change='onchange'>
						<van-collapse-item :title=reason name="1" :title-class="classtap">
							<van-radio-group v-model="radio1" @change="gobtn">
								<van-radio name="提示设备断网">提示设备断网</van-radio>
								<van-radio name="设备断电，设备上指示灯不亮">设备断电，设备上指示灯不亮</van-radio>
								<van-radio name="设备语音播报故障，重复报数">设备语音播报故障，重复报数</van-radio>
								<van-radio name="设备端口故障，直通电">设备端口故障，直通电</van-radio>
								<van-radio name="其他">其他</van-radio>
							</van-radio-group>
						</van-collapse-item>
					</van-collapse>

				</view>
				<view class="kthree">
					
					<view class="kthreefoot">
						<van-field :value="message" rows="2" autosize type="textarea" maxlength="200" placeholder="请输入故障描述（200字以内）" @change='txtchange'/>
					</view>
				</view>
				<view class="kfour">
					<view class="kfourtxt">
						图片上传：<span class="kfourbud">限制3张</span>
					</view>
					<view class="kfourfoot">
						<view class="add-img-box">
							<view class="add-img-item" v-for="(item, index) in imgList" :key="index">
								<image class="add-img" @click="imgInfo(index)" :src="item.path" mode="aspectFill"></image>
								<image class="add-img-del" @click="delImg(index)" src="../../static/tabBarimg/delete.png"></image>
							</view>
							<view v-if="imgList.length < 3 " class="add-img-item" @click="openCamera">
								<image class="add-img" src="../../static/tabBarimg/add.png"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="kbtn" @click="failure">
					确认
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
	import {
		Config
	} from '../../common/Config.js'
	export default {
		components: {
			
		},
		mounted() {
		},

		data() {
			return {
				radio: '1', //退款类型
				activeNames: [''],
				radio1: '', //退款原因
				reason: '请选择故障类型',
				message: '', //故障描述
				imgList: [],
				cloudimgList: [],
				imgCount: 3, //最多支持3张上传，可以修改
				device: '', //设备编号
				hat: [],
				simg: '',
				classtap:'tclass'
			}
		},
		onLoad() {

		},
		methods: {

			//上传图片
			imgInfo(i) {
				let tempList = [];
				this.imgList.forEach(img => {
					tempList.push(img.path);
				});
				//显示图片
				uni.previewImage({
					current: i,
					loop: false,
					urls: tempList,
					indicator: 'default'
				});
			},
			//删除图片
			delImg(i) {
				this.imgList.splice(i, 1);
				this.hat.splice(i, 1);
				this.imgCount++;
			
			},
			openCamera() {
				uni.chooseImage({
					// sourceType: ['camera'],
					count: this.imgCount,
					sizeType: ['compressed'],
					success: res => {
						// let resType = res.tempFiles[0].type.substring(0,5)
						// console.log('文件格式：',resType)
						// if(resType!='image' || res.tempFiles[0].type.substring(6,7) == 'g'){
						// 	console.log('文件格式：',resType)
						//     Toast.fail('文件格式不正确')
						//     return
						// }
						let path = res.tempFilePaths[0];
						let userToken = uni.getStorageSync('userToken');
						uni.showLoading({
							title: '上传中',
							mask: true
						})
						uni.uploadFile({
							url: Config.api + 'uploadFile',
							filePath: path,
							name: 'file',
							header: {
								Authorization: "Bearer " + userToken
							},
							success: res1 => {
								setTimeout(()=>{
									uni.hideLoading()
								},200)
								this.hat.push(JSON.parse(res1.data).data.fileName)
							}
			
						});
						this.imgList = [...this.imgList, ...res.tempFiles];
						this.imgCount = 3 - this.imgList.length;
					}
				});
			
			},
			gobtn(e) {
				this.radio1=e.detail
				this.reason = this.radio1
				this.activeNames = ['']
				this.classtap='tclass1'
			},
			onchange(e){
				this.activeNames=e.detail
			},
			txtchange(e){
				this.message=e.detail
			},
			// 故障报修
			failure() {
				if (this.reason == '请选择故障类型') {
					Toast.fail('请选择故障类型')
					return
				}
				let str = "";
				for (var i = 0; i < this.hat.length; i++) {
					str += this.hat[i] + ",";
				}
				//去掉最后一个逗号(如果不需要去掉，就不用写)
				if (str.length > 0) {
					str = str.substr(0, str.length - 1);
				}
				let data = {
					device: this.device,
					type: this.reason,
					remarks: this.message,
					imgNames: str
				}
				var header = {
					'content-type': 'application/json'
				}
				this.$base.request('failure', 'POST', data, header)
					.then(res => {
						if (res.data.code == 200) {
							Toast.success('提交成功')
							setTimeout(()=>{
								uni.navigateBack()
							},1000)
						} else {
							Toast.fail(res.data.msg)
							setTimeout(()=>{
								uni.navigateBack()
							},1000)
						}
					})
					.catch(err => {})

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
		background-color: #242225;

		.kshow {
			width: 686upx;
			margin: 0 auto;
			background-color: #242225;
			margin-top: 51upx;
			/deep/.van-cell:after{
				border-bottom: 0upx;
				border-bottom-color:transparent
			}
			.kone {
				width: 100%;
				margin-bottom: 40upx;
				background: #343136;
				border-radius: 24upx;
				box-sizing: border-box;
				padding: 29upx 36upx;
				input {
					font-size: 30upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #D0D0D0;
				}

			}

			.ktwo {
				width: 100%;
				box-sizing: border-box;
				background-color: #343136;
				border-radius: 24upx;
				margin-bottom: 40upx;
				/deep/.van-collapse-item{
					background-color: #343136;
					border-radius: 24upx;
				}
				/deep/.tclass{
					font-size: 28upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #999999;
				}
				/deep/.tclass1{
					font-size: 28upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 700;
					color: #D0D0D0;
				}

				/deep/.van-cell {
					padding: 29upx 36upx;
					box-sizing: border-box;
					background: #343136;
					border-radius: 24upx;
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
				
				.kthreefoot {
					width: 100%;
					box-sizing: border-box;

					/deep/.van-cell {
						background-color: #343136;
						height: 236upx;
						border-radius: 24upx;
					}
					/deep/.van-field__control{
						font-size: 30upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
					}
				}
			}

			.kfour {
				width: 100%;
				box-sizing: border-box;
				margin-top: 35upx;

				.kfourtxt {
					font-size: 30upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					margin-bottom: 24upx;

					.kfourbud {
						font-size: 30upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #D0D0D0;
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
				background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
				border-radius: 36upx;
				font-size: 32upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				text-align: center;
				padding: 20upx 0;
				margin: 0 auto;
				margin-top: 59upx;
				color: #ffffff;
			}
		}

	}
</style>
