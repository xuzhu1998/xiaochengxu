<template>
	<view class="main">
		<view class="show">
			<van-field
			  v-model="message"
			  autosize
			  type="textarea"
			  maxlength="200"
			  placeholder="请输入你反馈的内容" @change='txtchange'
			/>
			<view class="sbtn" @click="gobtn">
				提交内容
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
				message:""
			}
		},
		onLoad() {

		},
		methods: {
			gobtn(){
				if(this.message){
					let data = {
						content:this.message
					}
					this.$base.request('feedback', 'POST', data)
						.then(res => {
							if(res.data.code==200){
								Toast.success('提交成功')
								uni.navigateBack()
							}else{
								Toast.fail(res.data.msg)
							}
						})
						.catch(err => {
							
						})
				}else{
					Toast.fail('请输入内容')
				}
				
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

		.show{
			width: 100%;
			box-sizing: border-box;
			padding: 62upx 31upx;
			/deep/.van-cell{
				width: 686upx;
				height: 475upx;
				background-color: #343136;
				border-radius: 20upx;
			}
			/deep/.van-cell:not(:last-child)::after{
				border-bottom: 0upx;
			}
			/deep/.van-field__control{
				color: #fff;
			}
			/deep/.van-cell:after{
				border-bottom: 0upx;
				border-bottom-color: transparent;
			}
			.sbtn{
				width: 686upx;
				height: 88upx;
				border-radius: 16upx;
				background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
				font-size: 28upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				text-align: center;
				line-height: 88upx;
				color: #ffffff;
				margin-top: 56upx;
			}
		}
		
	}
</style>
