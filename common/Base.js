import {
	Config
} from "./Config.js"
import Dialog from 'wxcomponents/vant/dialog/dialog';

class Base {
	constructor() {
		this.url = Config.api;
		this.url1 = Config.api1;
		this.imgurl=Config.imgapi;
		this.isShowingLoginPrompt = false; // 防止重复显示登录弹窗
	}
	// 显示登录提示弹窗
	showLoginPrompt() {
		return this.showLoginPromptWithMessage('您需要登录后才能继续使用该功能，是否立即登录？');
	}

	// 显示自定义消息的登录提示弹窗
	showLoginPromptWithMessage(message) {
		// 防止重复显示弹窗
		if (this.isShowingLoginPrompt) {
			return Promise.resolve(false);
		}

		this.isShowingLoginPrompt = true;

		return new Promise((resolve, reject) => {
			uni.showModal({
				title: '登录提示',
				content: message,
				confirmText: '立即登录',
				cancelText: '稍后再说',
				success: (res) => {
					this.isShowingLoginPrompt = false; // 重置标志
					if (res.confirm) {
						resolve(true); // 用户选择登录
					} else {
						resolve(false); // 用户选择取消
					}
				},
				fail: () => {
					this.isShowingLoginPrompt = false; // 重置标志
					resolve(false);
				}
			});
		});
	}

	// 检查是否需要强制登录的功能
	isLoginRequiredFeature(featureName) {
		// 定义需要强制登录的功能列表
		const loginRequiredFeatures = [
			'charge', // 充电功能
			'recharge', // 充值功能
			'account', // 账户相关
			'order', // 订单相关
			'profile', // 个人资料
			'payment' // 支付相关
		];

		return loginRequiredFeatures.includes(featureName);
	}

	// 处理需要登录的功能访问
	handleLoginRequired(featureName = 'default') {
		// 获取当前页面路径和参数
		var pages = getCurrentPages();
		const currentPage = pages[pages.length - 1];
		const fullPath = currentPage.$page.fullPath;

		// 保存当前页面路径
		uni.setStorageSync("PrevLoginPath", fullPath);

		// 检查是否在充电相关页面，并保存扫码参数
		const app = getApp();
		let scanParams = null;

		// 检查URL中是否包含设备ID和端口号参数
		if (fullPath.indexOf('device=') > -1 && fullPath.indexOf('port=') > -1) {
			// 从URL中提取设备ID和端口号
			const deviceMatch = fullPath.match(/device=([^&]+)/);
			const portMatch = fullPath.match(/port=([^&]+)/);

			if (deviceMatch && portMatch) {
				const device = deviceMatch[1];
				const port = portMatch[1];

				// 保存到全局数据
				scanParams = {
					device: device,
					port: port,
					isFromScan: true
				};

				if (app && app.globalData) {
					app.globalData.scanParams = scanParams;
				}
			}
		}

		// 根据功能类型显示不同的提示信息
		let promptMessage = '您需要登录后才能继续使用该功能，是否立即登录？';
		if (featureName === 'charge') {
			promptMessage = '充电功能需要登录后才能使用，是否立即登录？';
		} else if (featureName === 'recharge') {
			promptMessage = '充值功能需要登录后才能使用，是否立即登录？';
		}

		// 显示登录提示弹窗
		this.showLoginPromptWithMessage(promptMessage).then((shouldLogin) => {
			if (shouldLogin) {
				// 用户选择登录，清除存储并跳转到登录页面
				const userToken = uni.getStorageSync('userToken');
				uni.clearStorageSync();

				// 恢复必要的存储项
				if (userToken) uni.setStorageSync("JeepGetPhone", 1);

				// 跳转到登录页面
				if (scanParams) {
					// 如果有扫码参数，直接传递给登录页面
					uni.navigateTo({
						url: `/pages/login/login?device=${scanParams.device}&port=${scanParams.port}`
					});
				} else {
					// 否则正常跳转
					uni.navigateTo({
						url: "/pages/login/login"
					});
				}
			} else {
				// 用户选择取消，不清除存储，继续停留在当前页面
			}
		});
	}

	// 退出登录（兼容原有调用）
	logout() {
		this.handleLoginRequired();
	}

	// wx微信支付
	wxPay(data) {
		return new Promise((resolve, reject) => {
			WeixinJSBridge.invoke('getBrandWCPayRequest', {
				"paySign": data.paySign,
				"appId": data.appId,
				"nonceStr": data.nonceStr,
				"package": data.wpackage,
				"signType": data.signType,
				"timeStamp": data.timeStamp
			}, (res) => {
				resolve(res)
			});
		})
	}




	//接口请求,promise版 url接口 data 需要想后端传的数据,对象格式  header头穿传的字段 openId ,也可增加字段  用户端接口
	request(url, method, data,header) {



		return new Promise((resolve, reject) => {

			if(!header){
				header={
					'content-type': 'application/x-www-form-urlencoded'
				}
			}
			// if (method == 'GET') {
			// 	header = {
			// 		'content-type': 'application/x-www-form-urlencoded',
			// 	}
			// } else if (method == 'POST') {
			// 	header = {
			// 		'content-type': 'application/x-www-form-urlencoded',
			// 	}
			// }
			const userToken = uni.getStorageSync('userToken');
			if (userToken) {
				header["Authorization"] ="Bearer "+userToken;
			}
			uni.request({
				url: this.url + url,
				method: method,
				data: data,
				dataType: "json",
				header: header,
				timeout:15000,
				success: (res) => {
					if(Number(res.data.code)=='70004'
						|| (res.data.msg + '').indexOf("请先登录") >= 0
						|| (res.data.msg + '').indexOf("无效token") >= 0){
						// 检查当前页面是否允许游客浏览
						var pages = getCurrentPages();
						const currentPage = pages[pages.length - 1];
						const currentRoute = currentPage.route;

						// 允许游客浏览的页面列表
						const guestAllowedPages = [
							'pages/index/index',
							'pages/smcharging/smcharging',
							'pageone/nearby_charging/nearby_charging',
							'pageone/trouble_shooting/trouble_shooting'
						];

						// 如果当前页面允许游客浏览，则不强制登录
						if (guestAllowedPages.includes(currentRoute)) {
							// 返回错误信息，让页面自行处理
							resolve(res);
							return;
						}

						// 其他页面需要登录
						let t = setTimeout(()=>{
							clearTimeout(t)
							// 调用handleLoginRequired方法，它会处理扫码参数的保存并显示登录提示弹窗
							new Base().handleLoginRequired()
						}, 100)
					}
					resolve(res)

				},
				fail(res) {

					reject(res)

				}
			});

		})

	}

	//接口请求,promise版 url接口 data 需要想后端传的数据,对象格式  header头穿传的字段 openId ,也可增加字段   运营商端接口
	request1(url, method, data,header) {



		return new Promise((resolve, reject) => {

			if(!header){
				header={
					'content-type': 'application/x-www-form-urlencoded'
				}
			}
			// if (method == 'GET') {
			// 	header = {
			// 		'content-type': 'application/x-www-form-urlencoded',
			// 	}
			// } else if (method == 'POST') {
			// 	header = {
			// 		'content-type': 'application/x-www-form-urlencoded',
			// 	}
			// }
			const userToken = uni.getStorageSync('userToken');
			if (userToken) {
				header["Authorization"] ="Bearer "+userToken;
			}
			uni.request({
				url: this.url1 + url,
				method: method,
				data: data,
				dataType: "json",
				header: header,
				timeout:15000,
				success: (res) => {
					if(res.data.code=='70004'){
						// 检查当前页面是否允许游客浏览
						var pages = getCurrentPages();
						const currentPage = pages[pages.length - 1];
						const currentRoute = currentPage.route;

						// 允许游客浏览的页面列表
						const guestAllowedPages = [
							'pages/index/index',
							'pages/smcharging/smcharging',
							'pageone/nearby_charging/nearby_charging',
							'pageone/trouble_shooting/trouble_shooting'
						];

						// 如果当前页面允许游客浏览，则不强制登录
						if (guestAllowedPages.includes(currentRoute)) {
							// 返回错误信息，让页面自行处理
							resolve(res);
							return;
						}

						// 其他页面需要登录
						let t = setTimeout(()=>{
							clearTimeout(t)
							// 调用handleLoginRequired方法，它会处理扫码参数的保存并显示登录提示弹窗
							new Base().handleLoginRequired()
						}, 100)
					}
					resolve(res)

				},
				fail(res) {

					reject(res)

				}
			});

		})

	}
	fetchData() {
		return new Promise((resolve, reject) => {
			let cacheExpireTime = uni.getStorageSync('cacheExpireTime'); // 缓存过期时间戳
			let cachedData = uni.getStorageSync('cachedData'); // 缓存的数据
			// 检查缓存是否过期
			if (Date.now() > cacheExpireTime) {
			  // 如果过期，则发起网络请求
			  uni.request({
			    url: 'https://wxgo.adwke.com/api/kuaishou/getkspw?channel=wk240314',
				  method: 'GET',
			    success: (res) => {
			      // 设置新的缓存时间为1天后
			      cacheExpireTime = Date.now() + 24 * 60 * 60 * 1000;
				  uni.setStorage({
				    key: 'cacheExpireTime',
				    data: cacheExpireTime,
				  });
			      // 缓存返回的数据
			      cachedData = res.data;
			      // 存储缓存数据
			      uni.setStorage({
			        key: 'cachedData',
			        data: cachedData,
			      });
			      resolve(res.data)
			    },
			    fail: () => {
			      // 网络请求失败，尝试从缓存获取数据
			      uni.getStorage({
			        key: 'cachedData',
			        success: (res) => {
			          // 调用回调函数返回缓存数据
						resolve(res.data)
			        },
			        fail: (res) => {
						  reject(res)

			        }
			      });
			    }
			  });
			} else {
			  // 如果缓存未过期，直接返回缓存数据
				resolve(cachedData)
			}
		})

	}

	// 验证是否登陆过
	isLogin() {
		if (uni.getStorageSync('isLogin') == 1) {
			return true;
		} else {
			return false
		}
	}

	// 检查登录状态，如果未登录则显示登录提示弹窗
	checkLoginWithPrompt() {
		const userToken = uni.getStorageSync('userToken');
		if (!userToken) {
			this.handleLoginRequired();
			return false;
		}
		return true;
	}


	//前往登录页面（带登录提示弹窗）
	loginPage() {
		this.showLoginPrompt().then((shouldLogin) => {
			if (shouldLogin) {
				uni.navigateTo({
					url: "/pages/login/login"
				});
			}
		});
	}

	//直接前往登录页面（不显示弹窗）
	directLoginPage() {
		uni.navigateTo({
			url: "/pages/login/login"
		})
	}

	//弹出提示窗方法 参数说明arg1:title标题提示 arg2:提示的详情的内容 cb1:成功的回调  cb2:失败的回调
	prompt(arg1, arg2, cb1, cb2) {

		uni.showModal({
			title: arg1,
			content: arg2,
			success: function(res) {
				if (res.confirm) {
					cb1()

				} else if (res.cancel) {
					cb2()

				}
			}
		});
	}


	// 操作成功, 弹出的提示框,过两秒会自动消失的successPrompt缩写
	sPrompt(arg) {
		uni.showToast({
			title: arg
		})
	}

	promptInfo(arg) {
		uni.showToast({
			title: '小主,没有更多数据了',
			icon: 'none'
		})
	}




	// 操作成功,过两秒会自动消失的successPrompt缩写
	fPrompt(arg) {
		uni.showToast({
			title: arg,
			icon: 'none'
		})
	}


	// 校验手机号
	checkPhone(e) {
		if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(e))) {
			uni.showToast({
				title: "请输入正确的手机号",
				icon: "none"
			})
			return false;
		} else {
			return true
		}
	}

	// 开启等待
	loading(obj) {
		uni.showLoading({
			title: obj.title,
			mask: obj.mask
		});
	}

	// 关闭等待
	hideLoading() {
		uni.hideLoading();
	}
	//协议
	agreement(data){
		return new Promise((resolve, reject) => {
			this.request('wxlogin/agreement','GET',data)
			.then(res => {
				resolve(res)
			})
			.catch(err => {
				reject(err)
			})
		})

	}


}
export {
	Base
}
