<template>
	<view class="main">
		<!-- <view class="hand">
			<image src="../../static/tabBarimg/dbleft.png" @click="blackbtn"></image>
			个人资料
		</view> -->
		<view class="show">
			<view class="sone">
				<input placeholder="请输入真实姓名(退款用)，非必填" v-model="name" v-if="ktype!=0"/>
				<input placeholder="输入手机号码" v-model="phone" @input="changeInput()" type="number"/>
			</view>
			<view class="yztap" v-if="yzshow">
				<input placeholder="输入验证码" v-model="yzma" type="number" :focus="setfocus" @blur="exitfocus" maxlength="4"/>
				<view class="yanbtn" v-if="Verification" @click="handleClick">获取验证码</view>
				<view class="yanbtn1" v-if="!Verification"><span>{{timer}}</span>s</view>
			</view>
			<no_captcha @child="parentEvent" v-if="hkshow"></no_captcha>
			<view class="stwo" @click="xgbtn">确认提交</view>
			<view class="stwo" @click="jbbtn">解绑手机号</view>
			<view class="sthree">
				<view class="sthreehand">
					绑定手机号说明:
				</view>
				<view>
					1.为了更好的为您服务，请先绑定手机号;<br />
					2.我公司承诺不会泄露用户隐私，也不会对用户进行电话骚扰;<br />
					3.如有疑问：请联系当前小区运营商;
				</view>
			</view>
			<van-popup :show="phoneshow" :close-on-click-overlay="false">
				<view class="tishi">
					<view class="tstou">提示</view>
					<view class="tsnei">
						您尚未绑定手机号，无法进行其他操作，请先绑定手机号
					</view>
					<view class="kbtn" @click="kbtngo">
						确认
					</view>
				</view>
			</van-popup>
		</view>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import no_captcha from '../../components/no-captcha/no-captcha.vue'
	export default {
		components: {
			no_captcha
		},
		mounted() {

		},

		data() {
			return {
				Verification: true, //通过v-if控制显示获取还是倒计时
				timer: 60, //定义初始时间为60s
				name: '', //用户姓名
				phone: '', //手机号
				yzma: '', //验证码
				sessionId: '', //会话ID
				hkshow: false, //滑块显示隐藏
				phone1: '', //修改验证码
				userlist: {},
				zt: '', //0扫码进入，1内部进入
				device: '', //设备号
				port: '', //端口号
				phoneshow: false, //绑定手机号弹窗
				yzshow: false,
				cmd:'',
				from:'',
				ktype:0,
				setfocus:false
			}
		},
		onLoad(option) {
			this.zt = option.zt
			this.device = option.device
			this.port = option.port
			this.cmd = option.cmd
			this.from = option.from
			if(option.ktype){
				this.ktype=option.ktype
			}else{
				this.ktype=0
			}
			if(this.zt==0){
				this.phoneshow=true
			}
		},
		created() {

		},
		onShow() {
			this.userdetail()
		},
		methods: {
			//返回上一页
			blackbtn() {
				if(this.ktype!=2){
					uni.switchTab({
						url: '/pages/index/index'
					})
				}else{
					uni.navigateBack()
				}
				
			},
			userdetail() {
				this.userlist = uni.getStorageSync('user')
				if (this.userlist.phone) {
					this.phone = this.userlist.phone
					this.phone1 = this.userlist.phone
				}
				if (this.userlist.realName) {
					this.name = this.userlist.realName
				}
			},
			//获取用户信息
			show() {
				this.$base.request('user/userInfo', 'GET')
					.then(res => {
						var userlist = res.data.data
						uni.setStorageSync('phone', userlist.phone)
						uni.setStorageSync('Name', userlist.realName)

					})
					.catch(err => {

					})
			},
			//获取验证码倒计时
			handleClick() {
				this.setfocus=true
				if (this.phone == "" || !this.phone) {
					Toast.fail('请输入手机号')
				} else if (!(/^1[3-9]\d{9}$/.test(this.phone))) {
					Toast.fail('请输入正确的手机号格式')
				}
				// else if (this.sessionId == "") {
				// 	this.hkshow = true
				// 	Toast.fail('请拉动滑块验证')
				// } 
				else {
					// this.hkshow = true
					let data = {
						mobile: this.phone,
						// sessionId: this.sessionId
					}
					this.$base.request('user/bind/code', 'GET', data)
						.then(res => {
							if (res.data.code == 200) {
								this.timer = 60
								this.Verification = false; //点击button改变v-if的状态
								let auth_timer = setInterval(() => { //定时器设置每秒递减
									this.timer--; //递减时间
									if (this.timer <= 0) {
										this.Verification = true; //60s时间结束还原v-if状态并清除定时器
										clearInterval(auth_timer)
										// this.hkshow = false
									}
								}, 1000)
								Toast.success('验证码发送成功')
								
							} else {
								Toast.fail(res.data.msg)
							}
						})
						.catch(err => {

						})
				}
			},
			changeInput() {
				if (this.phone != "" || this.phone) {
					if ((/^1[3-9]\d{9}$/.test(this.phone))) {
						if (this.phone != this.phone1) {
							this.yzshow = true
						} else {
							this.yzshow = false
						}
					} else {
						this.yzshow = false
					}
				} else {
					this.yzshow = false
				}

			},
			pad(num, n) {
				var len = num.toString().length;
				while (len < n) {
					num = "0" + num;
					len++;
				}
				return num;
			},
			// 获取滑块返回值
			parentEvent(e) {
				this.sessionId = e
			},
			kbtngo() {
				this.phoneshow = false
			},
			exitfocus(){
				this.setfocus=false
			},
			//解绑手机号
			jbbtn(){
				this.$base.request('user/unbindMobile', 'POST')
					.then(res => {
						if (res.data.code == 200) {
							this.usertap();
							Toast.success(res.data.msg)
							setTimeout(() => {
								if (this.zt == 1) {
									uni.switchTab({
										url: '/pages/index/index'
									})
								} else if (this.zt == 0) {
									uni.navigateTo({
										url: '/pageone/poweron/poweron?device=' + this.device + '&port=' + this.port + '&cmd=' + this.cmd + '&from=' + this.from
									});
								}
							}, 500)
						
						} else {
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {
				
					})
			},
			usertap() {
				this.$base.request('user/userInfo', 'GET')
					.then(res => {
						this.userlist = res.data.data
						this.userlist.id = this.pad(this.userlist.id, 8)
						uni.setStorageSync('user', this.userlist)
						uni.setStorageSync('phone', this.userlist.phone)
						uni.setStorageSync('Name', this.userlist.realName)
					})
					.catch(err => {

					})
			},
			// 确认修改
			xgbtn() {
				if (this.phone == "" || !this.phone) {
					Toast.fail('请输入手机号')
				} else if (!(/^1[3-9]\d{9}$/.test(this.phone))) {
					Toast.fail('请输入正确的手机号格式')
				} else {
					if (!this.yzma) {
						if (this.phone == this.phone1) {
							let data = {
								mobile: this.phone,
								realName: this.name,
								randCode: this.yzma
							}
							this.$base.request('user/bindMobile', 'POST', data)
								.then(res => {
									if (res.data.code == 200) {
										this.usertap();
										Toast.success(res.data.msg)
										setTimeout(() => {
											if (this.zt == 1) {
												uni.switchTab({
													url: '/pages/index/index'
												})
											} else if (this.zt == 0) {
												uni.navigateTo({
													url: '/pageone/poweron/poweron?device=' + this.device + '&port=' + this.port + '&cmd=' + this.cmd + '&from=' + this.from
												});
											}
										}, 500)

									} else {
										Toast.fail(res.data.msg)
									}
								})
								.catch(err => {

								})
						} else {
							Toast.fail('请输入验证码')
						}
					} else {
						let data = {
							mobile: this.phone,
							realName: this.name,
							randCode: this.yzma
						}
						this.$base.request('user/bindMobile', 'POST', data)
							.then(res => {
								if (res.data.code == 200) {
									this.usertap();
									Toast.success(res.data.msg)

									setTimeout(() => {
										if (this.zt == 1) {
											uni.switchTab({
												url: '/pages/index/index'
											})
										} else if (this.zt == 0) {
											uni.redirectTo({
												url: '/pageone/poweron/poweron?device=' + this.device + '&port=' + this.port + '&cmd=' + this.cmd + '&from=' + this.from,
											});
										}
									}, 500)
								} else {
									Toast.fail(res.data.msg)
								}
							})
							.catch(err => {

							})
					}
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
		.hand{
			text-size-adjust: 100% !important;
			-webkit-text-size-adjust: 100% !important;  
			-moz-text-size-adjust: 100% !important;
			width: 100%;
			background-color: #242225;
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

		.show {
			width: 100%;
			margin-top: 79upx;
			margin-bottom: 41upx;

			.sone {
				width: 100%;
				
				input {
					width: 650upx;
					height: 100upx;
					box-sizing: border-box;
					margin: 0 auto;
					background: #343136;
					border-radius: 24px;
					padding: 0 40upx;
					box-sizing: border-box;
					font-size: 32upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					margin-bottom: 40upx;
				}

				
			}
			.yztap {
				display: flex;
				justify-content: space-between;
				width: 650upx;
				height: 140upx;
				box-sizing: border-box;
				margin: 0 auto;
				background: #343136;
				border-radius: 24px;
				padding: 28upx 40upx;
				box-sizing: border-box;
				margin-bottom: 20upx;
				align-items: center;
				input {
					font-size: 32upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
				.yanbtn {
					font-size: 28upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #ffffff;
					text-align: center;
					line-height: 68upx;
					height: 68upx;
					background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
					border-radius: 24upx;
					padding: 0 20upx;
				}
			
				.yanbtn1 {
					
					font-size: 28upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #ffffff;
					text-align: center;
					line-height: 68upx;
					width: 180upx;
					height: 68upx;
					background: #434045;
					border-radius: 24upx;
				}
			}

			.stwo {
				width: 650upx;
				height: 100upx;
				background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
				border-radius: 36upx;
				font-size: 32upx;
				font-family: PingFang SC Medium, PingFang SC Medium-Medium;
				font-weight: 500;
				text-align: center;
				line-height: 100upx;
				margin: 0 auto;
				margin-top: 84upx;
				color: #ffffff;
			}

			/deep/.van-popup {
				padding: 30upx;
				border-radius: 16upx;
			}

			.tishi {
				.tstou {
					color: #333333;
					font-size: 32upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					text-align: center;
				}

				.tsnei {
					font-size: 28upx;
					padding: 30upx;
					color: #555555;
				}

				.kbtn {
					width: 570upx;
					height: 75upx;
					background: #4b98ed;
					font-size: 30upx;
					border-radius: 16upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					text-align: center;
					line-height: 75upx;
					margin: 0 auto;
					margin-top: 40upx;
					color: #ffffff;
				}
			}

			.sthree {
				width: 100%;
				box-sizing: border-box;
				padding: 50upx;
				font-size: 24upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				color: #D0D0D0;
				line-height: 40upx;

				.sthreehand {
					font-size: 32upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					color: #fff;
					margin-bottom: 20upx;
				}
			}
		}
	}
</style>
