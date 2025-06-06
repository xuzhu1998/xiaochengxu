<template>
	<view class="main">
	
		<view class="show">
			<view class="sone">
				<view class="soneleft">联系人<span style='color: red;'>*</span>：</view>
				<input placeholder="请输入联系人" v-model="contact" maxlength="100" />
			</view>
			<view class="sone">
				<view class="soneleft">联系电话<span style='color: red;'>*</span>：</view>
				<input placeholder="请输入联系电话" v-model="phone" type="number" maxlength="20" />
			</view>
			<view class="sone">
				<view class="soneleft">站点位置<span style='color: red;'>*</span>：</view>
				<view class="soneright">
					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex"
						:range="newArr" :range-key='name' @change='bindMultiPickerChange'>
						<view class="uni-input">{{value}}</view>
					</picker>
				</view>
				
			</view>
			<view class="sone">
				<view class="soneleft">详细地址<span style='color: red;'>*</span>：</view>
				<input placeholder="请输入详细地址" v-model="address" maxlength="100" />
			</view>
			<view class="sone">
				<view class="soneleft"style="width: 38%;">身份选择<span style='color: red;'>*</span>：</view>
				<van-collapse :value="identity" @change='onchange'>
					<van-collapse-item :title=reason name="1" :title-class="classtap">
						<van-radio-group :value="radio1" @change="gobtn">
							<van-radio name="社区街道">社区街道</van-radio>
							<van-radio name="物业公司">物业公司</van-radio>
							<van-radio name="小区住户">小区住户</van-radio>
							<van-radio name="场地业主">场地业主</van-radio>
							<van-radio name="其他">其他</van-radio>
						</van-radio-group>
					</van-collapse-item>
				</van-collapse>
			</view>
			<view class="sone">
				<view class="soneleft1">备注：</view>
				<textarea placeholder="请输入备注" v-model="remarks" maxlength="150" />
				</view>
			<view class="stwo" @click="tjbtn">
				提交
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
		components: {},
		mounted() {
			
		},

		data() {
			return {
				value: '请选择城市',
				multiArray: [],
				newArr: [], //省市区内容
				multiIndex: [0, 0, 0],
				multiIds: [],
				code: "", //省市的区域编码
				radio1: '', //身份选择
				contact: "", //联系人
				phone: "", //联系电话
				address: "", //详细地址
				remarks: "", //备注
				identity: [''],
				reason: '请选择身份',
				classtap: 'tclass'
			}
		},
		onLoad() {
			this.adress();
		},
		methods: {
			// 获取省/市/区
			adress() {
				this.$base.request1('workUnit/', 'GET')
					.then(res => {
						var mlist = res.data.data
						this.multiArray = res.data.data
						let state = {
							arr: [],
							arr1: [],
							arr2: [],
							arr3: [],
							multiIds: []
						}
						mlist.map((v, vk) => {
							state.arr1.push(v.name);
							if (this.multiIndex[0] === vk) {
								state.multiIds[0] = v;
							}
							if (state.arr2.length <= 0) {
								v.children.map((c, ck) => {
									state.arr2.push(c.name);
									if (this.multiIndex[1] === ck) {
										state.multiIds[1] = c;
									}
									if (state.arr3.length <= 0) {
										c.children.map((t, tk) => {
											state.arr3.push(t.name);
											if (this.multiIndex[2] === tk) {
												state.multiIds[2] = t;
											}
										});
									}
								});
							}
						});
						state.arr[0] = state.arr1;
						state.arr[1] = state.arr2;
						state.arr[2] = state.arr3;
						this.newArr = state.arr
						this.multiIds = state.multiIds
			
					})
					.catch(err => {
			
					})
			},
			//返回上一页
			blackbtn() {
				uni.navigateBack()
			},
			
			
			//提交审核
			tjbtn() {
			
				if (!this.code || !this.contact || !this.phone || !this.address || !this.radio1) {
					Toast.fail('请完善信息')
					return
				}
				let data = {
					code: this.code,
					contact: this.contact,
					phone: this.phone,
					address: this.address,
					remarks: this.remarks,
					identity: this.radio1
			
				}
			
				this.$base.request('chargeSite/apply', 'POST', data)
					.then(res => {
						if (res.data.code == 200) {
							Toast.success(res.data.msg)
							setTimeout(()=>{
								uni.navigateBack()
							},1000)
						} else {
							Toast.success(res.data.msg)
							setTimeout(()=>{
								uni.navigateBack()
							},1000)
						}
					})
					.catch(err => {
			
					})
			},
			gobtn(e) {
				this.radio1=e.detail
				this.reason = this.radio1
				this.identity = ['']
				this.classtap = 'tclass1'
			},
			
			bindMultiPickerChange(e) {
				this.value = this.multiIds[0].name + ' ' + this.multiIds[1].name + ' ' + this.multiIds[2].name
				this.code = this.multiIds[2].code
				console.log(this.value, this.code)
			},
			bindMultiPickerColumnChange(e) {
				this.multiIndex[e.detail.column] = e.detail.value;
				let arr1 = [];
				let arr2 = [];
				let searchColumn = () => {
			
					this.multiArray.map((v, vk) => {
						if (this.multiIndex[0] === vk) {
							this.multiIds[0] = {
								...v,
							};
							v.children.map((c, ck) => {
								arr1.push(c.name);
								if (this.multiIndex[1] === ck) {
									this.multiIds[1] = {
										...c,
									};
			 					c.children.map((t, vt) => {
										arr2.push(t.name);
										if (this.multiIndex[2] === vt) {
											this.multiIds[2] = {
												...t,
											};
										}
			  				});
								}
							});
						}
					});
			
				};
				this.$set(this.newArr, 1, arr1)
				this.$set(this.newArr, 2, arr2)
				switch (e.detail.column) {
					case 0:
						// 每次切换还原初始值
			  	this.multiIndex[1] = 0;
						this.multiIndex[2] = 0;
						// 执行函数处理
						searchColumn();
						break;
					case 1:
						this.multiIndex[2] = 0;
						searchColumn();
						break;
					case 2:
						searchColumn();
						break;
			
				}
			
			},
			onchange(e){
				this.identity=e.detail
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
		.show{
			width: 100%;
			box-sizing: border-box;
			padding: 50upx;
			/deep/.van-picker__toolbar{
				.van-picker__confirm{
					border: 0upx solid;
					background-color: #FFFFFF;
				}
				.van-picker__cancel{
					border: 0upx solid;
					background-color: #FFFFFF;
				}
			}
			
			.sone{
				width: 100%;
				display: flex;
				box-sizing: border-box;
				padding: 20upx 10upx;
				align-items: center;
				background-color: #242225;
				/deep/.van-cell:after{
					border-bottom: 0upx;
					border-bottom-color:transparent
				}
				/deep/.tclass{
					font-size: 28upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #999999;
				}
				/deep/.van-collapse-item{
					border-radius: 24upx;
					background-color: #343136;
				}
				/deep/.van-collapse-item__content{
					background-color: #343136;
					border-radius: 24upx;
				}
				/deep/.tclass1{
					font-size: 30upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
				/deep/.van-hairline--top-bottom::after {
							border-width:0;
						}
				/deep/.van-cell:not(:last-child)::after{
					border-bottom: 0upx;
				}
				/deep/.van-cell {
					width: 100%;
					background: #343136;
					padding: 26upx 29upx;
					font-size: 30upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					border-radius: 24upx;
				}
				
				/deep/.van-radio__label {
					font-size: 30upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
				
				/deep/.van-collapse{
					border-radius: 24upx;
					width: 464upx;
					
				}
				/deep/.van-radio__icon {
					/deep/.van-icon {
						width: 20upx;
						height: 20upx;
						border: 1upx solid #cccccc;
					}
				}
				
				/deep/.van-radio {
					height: 70upx;
					align-items: center;
				}
				
				.soneleft{
					font-size: 30upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					width: 42%;
				}
				.soneleft1{
					font-size: 30upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					width: 38%;
				}
				.soneright{
					width: 100%;
					background: #343136;
					border-radius: 24upx;
					padding: 26upx 29upx;
					font-size: 30upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}
				input{
					width: 100%;
					background: #343136;
					border-radius: 24upx;
					padding: 26upx 29upx;
					font-size: 30upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}
				textarea{
					width: 100%;
					height: 180upx;
					background: #343136;
					border-radius: 24upx;
					font-size: 30upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #D0D0D0;
					padding: 30upx 29upx;
					box-sizing: border-box;
				}
				/deep/.van-radio__icon--checked{
					background-color: #EC651C;
					border-color: #EC651C;
				}
				
			}
		
			.stwo{
				width: 100%;
				height: 88upx;
				border-radius: 20upx;
				background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
				font-size: 32upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				text-align: center;
				line-height: 88upx;
				margin: 0 auto;
				color: #ffffff;
				margin-top: 50upx;
			}
		}
		
	}
</style>
