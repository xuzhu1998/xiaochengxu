<template>
	<view>
		<view id="__nc" style="margin-left:auto;margin-right:auto;height:100upx;padding: 0 18upx;">
			<view id="nc"></view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'index',
		data() {
			return {
				nc: null,
				msg:'',
				scene:'nc_login_h5',
				sessionId:'',
				sig:'',
				token:''
			};
		},
		created() {
		
		},
		methods:{
		         sendMsg(){
		             var msg=this.sessionId+','+this.sig+','+this.token+','+this.scene
		             this.$emit('child',msg)
		         }
		     },

		mounted() {
			// this.$api.loadJs('http://g.alicdn.com/sd/nch5/index.js?t=2015052012')
			let that = this;
			var nc_token = ["FFFF0N000000000095D9", (new Date()).getTime(), Math.random()].join(':');
			let nc = NoCaptcha.init({
				renderTo: '#nc',
				// appkey: this.appkey,//这个参数需要后台返回 应用类型标识
				// scene: this.scene,//    使用场景标识
				// token: this.token,//滑动验证码的主键
				appkey: 'FFFF0N000000000095D9',
				scene: this.scene,
				token: nc_token,
				trans: {
					"key1": "code200"
				},
				elementID: ["usernameID"], //通过Dom的ID属性自动填写trans业务键，可为空。为便于线上问题的排查
				is_Opt: 0, //是否自定义配置底层采集组件。如无特殊场景 使用默认值（0），即不自定义配置底层采集组件
				language: "cn",
				timeout: 10000,
				retryTimes: 5,
				errorTimes: 5,
				inline: false,
				apimap: { //    用于自定义滑动验证各项请求的接口地址。一般情况，请勿配置该参数。
					// 'analyze': '//a.com/nocaptcha/analyze.jsonp',
					// 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
				},
				bannerHidden: false, //验证通过之后默认隐藏。默认值为false
				initHidden: false, //是否默认不渲染。默认值为false。当设置为true时，不自动渲染，需要自行调用show方法进行渲染。
				callback: function(data) {
					/*  前端滑动验证通过时会触发该回调参数。
					 您可以在该回调参数中将请求标识（token）、会话ID（sessionid）、签名串（sig）字段记录下来，
					 随业务请求一同发送至您的服务端调用验签。 */
					
					// console.log(data, '***********参数************');
					// that.verify_token = this.token;
					// that.sessionid = data.csessionid;
					// that.sig = data.sig;
					window.console && console.log(nc_token)
					window.console && console.log(data.csessionid,'7777')
					window.console && console.log(data.sig)
					if(data.code==0){
						that.sessionId=data.csessionid
						that.sig=data.sig
						that.token=nc_token
						that.sendMsg();
					}
				},
				error: function(s) {
					
				}
			});
			NoCaptcha.setEnabled(true);
			nc.reset(); //请务必确保这里调用一次reset()方法
			NoCaptcha.upLang('cn', {
				'LOADING': "加载中...", //加载
				'SLIDER_LABEL': "请向右滑动验证", //等待滑动
				'CHECK_Y': "验证通过", //通过
				'ERROR_TITLE': "非常抱歉，这出错了哟...", //拦截
				'CHECK_N': "验证未通过", //准备唤醒二次验证
				'OVERLAY_INFORM': "经检测你当前操作环境存在风险，请输入验证码", //二次验证
				'TIPS_TITLE': "验证码错误，请重新输入" //验证码输错时的提示
			});
			this.nc = nc;
		}
	};
</script>
<style lang="scss">
	/* 滑动条高度、边框、背景色等 */
	._nc .stage1 .slider {
		height: 52px;
		border-radius: 26px;
		box-shadow: 0 0 3px #999;
		background-color: #ddd;
	}

	/* 滑动条 */
	._nc .stage1 .track div {
		border-radius: 26px;
		color: #fff;
	}

	/* 滑动条背景色-正常 */
	._nc .stage1 .bg-green {
		background-color: #78c430;
	}

	/* 滑动条背景色-失败 */
	._nc .stage1 .bg-red {
		background-color: #ff5500;
	}

	._nc .stage1 .button {
		border-radius: 50%;
	}

	/* 各个状态的icon */
	// 等待滑动："icon iconfont icon-slide-arrow"
	// 验证出错："icon no iconfont icon-close"
	// 验证通过："icon yes iconfont icon-ok"

	// 拦截状态
	._nc .stage3 .title {
		font-size: 20px;
		color: #777;
		width: 100%;
	}

	/* 图标 */
	// ._nc .icon {
	//     width: 32px;
	//     height: 32px;
	//     background-image: url("//g.alicdn.com/sd/nch5/icons.png?v=2");
	// }
	// ._nc .stage3 .menu.refresh .icon {
	//     background-position: -128px 0;
	// }
	// ._nc .stage3 .menu.feedback .icon {
	//     background-position: -160px 0;
	// }
	// /* 刷新链接 */
	// ._nc .stage3 .menu.refresh {
	//     border-right: 2px solid #ccc;
	// }
</style>
