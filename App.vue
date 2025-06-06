<script>
	import {Config} from './common/Config.js'

	export default {
		globalData: {
			scanParams: null // 存储扫码参数
		},
		onLaunch: function(options) {
			// if(!wx.cloud){
			// 	console.error('请使用2.3.3或以上的基础库以使用云能力')
			// }else{
			// 	wx.cloud.init({
			// 		env:'jump-4g7tz67x8afafdf2',
			// 		traceUser:true,
			// 	})
			// }

			// 处理启动参数，可能包含扫码信息
			this.handleScanParams(options);
		},
		onShow: function(options) {
			// uni.setEnableDebug({
			//     enableDebug: true
			// })

			// 只在应用启动时处理扫码参数，避免在页面切换时重复处理
			// 检查是否已经有扫码参数，如果有则不重复处理
			if (!this.globalData.scanParams) {
				this.handleScanParams(options);
			}
		},
		onHide: function() {
		},

		methods: {
			// 处理扫码参数
			handleScanParams(options) {
				if (!options) {
					return;
				}

				// 检查是否有扫码场景值
				const scene = options.scene;

				// 扫码场景值通常为1011, 1012, 1013, 1047, 1048, 1049
				const scanScenes = [1011, 1012, 1013, 1047, 1048, 1049];

				// 获取query参数中的device和port
				let device = '';
				let port = '';

				// 检查是否从URL中获取参数 (如 https://test.yueguisuchong.com/ap3200/2824C905/FF)
				if (options.query && options.query.q) {
					// 解码URL
					const url = decodeURIComponent(options.query.q);

					// 使用正则表达式匹配URL中的设备ID和端口号
					// 匹配形如 baseUrl/ap3200/2824C905/FF 的URL
					const regex = /\/([A-Fa-f0-9]{8})\/([A-Fa-f0-9]{2})(?:\/|$)/;
					const match = url.match(regex);

					if (match && match.length >= 3) {
						device = match[1]; // 第一个捕获组是设备ID
						port = match[2];   // 第二个捕获组是端口号
						console.log('App正则匹配结果:', device, port);
					} else {
						// 如果正则匹配失败，尝试使用分割方法
						const urlParts = url.split('/');
						if (urlParts.length >= 2) {
							// 获取倒数第二个和最后一个参数
							device = urlParts[urlParts.length - 2];
							port = urlParts[urlParts.length - 1];

						}
					}
				}
				// 直接从参数中获取
				else if (options.query && options.query.device && options.query.port) {
					device = options.query.device;
					port = options.query.port;

				}

				// 如果获取到了设备ID和端口号，并且是扫码进入的场景，则保存参数
				if (device && port && (scanScenes.includes(scene) || (options.query && options.query.q))) {


					// 检查是否已经有相同的扫码参数，避免重复设置
					if (this.globalData.scanParams &&
						this.globalData.scanParams.device === device &&
						this.globalData.scanParams.port === port) {
						console.log('App: 相同的扫码参数已存在，跳过设置');
						return;
					}

					// 保存扫码参数到全局数据
					this.globalData.scanParams = {
						device: device,
						port: port,
						isFromScan: true,
						timestamp: Date.now() // 添加时间戳
					};

					console.log('App: 扫码参数已保存到全局数据');

					// 检查用户是否已经登录
					const userToken = uni.getStorageSync('userToken');
					const user = uni.getStorageSync('user');

					if (userToken && user) {
						console.log('用户已登录，通过外部扫码进入，调用wxlogin/applet接口');
						this.handleLoggedUserScan(device);
					} else {
						console.log('用户未登录，扫码参数已保存，等待登录流程处理');
					}
				} else {
					console.log('App: 未满足扫码参数保存条件', {
						device: device,
						port: port,
						scene: scene,
						isScanScene: scanScenes.includes(scene),
						hasQuery: !!(options.query && options.query.q)
					});
				}
			},

			// 清除用户相关的本地存储
			clearUserRelatedStorage(oldUserId) {
				console.log('开始清除旧用户相关存储，用户ID:', oldUserId);

				// 清除用户基本信息
				uni.removeStorageSync('user');
				uni.removeStorageSync('userId');
				uni.removeStorageSync('userToken');
				uni.removeStorageSync('phone');
				uni.removeStorageSync('Name');
				uni.removeStorageSync('poster');
				uni.removeStorageSync('adunit');
				uni.removeStorageSync('posterList');

				// 清除用户特定的存储项
				if (oldUserId) {
					const oldLogolist = "logolist_" + oldUserId;
					const oldUsertype = 'type_' + oldUserId;
					uni.removeStorageSync(oldLogolist);
					uni.removeStorageSync(oldUsertype);
					console.log('清除旧用户特定存储:', oldLogolist, oldUsertype);
				}

				// 清除其他可能的用户相关存储
				uni.removeStorageSync('PrevLoginPath');
				uni.removeStorageSync('JeepGetPhone');

				console.log('旧用户相关存储已清除完成');
			},

			// 刷新当前页面数据
			refreshCurrentPageData() {
				console.log('开始刷新当前页面数据');

				// 获取当前页面栈
				const pages = getCurrentPages();
				if (pages.length === 0) {
					console.log('没有当前页面，跳过刷新');
					return;
				}

				const currentPage = pages[pages.length - 1];
				const currentRoute = currentPage.route;

				console.log('当前页面路由:', currentRoute);

				// 延迟执行，确保用户信息已经完全更新
				setTimeout(() => {
					// 根据不同页面执行不同的刷新策略
					if (currentRoute === 'pages/index/index') {
						console.log('刷新index页面数据');
						this.refreshIndexPage(currentPage);
					} else if (currentRoute === 'pages/chargingzhong/chargingzhong') {
						console.log('刷新chargingzhong页面数据');
						this.refreshChargingzhongPage(currentPage);
					} else if (currentRoute === 'pages/smcharging/smcharging') {
						console.log('刷新smcharging页面数据');
						this.refreshSmchargingPage(currentPage);
					} else {
						console.log('其他页面，执行通用刷新');
						this.refreshGenericPage(currentPage);
					}
				}, 100);
			},

			// 刷新index页面
			refreshIndexPage(page) {
				if (page && page.$vm) {
					console.log('执行index页面数据刷新');
					// 重新获取用户信息
					if (typeof page.$vm.getUserInfo === 'function') {
						page.$vm.getUserInfo();
					}
					// 重新初始化页面数据
					if (typeof page.$vm.initPageData === 'function') {
						page.$vm.initPageData();
					}
					// 重新调用onShow方法
					if (typeof page.$vm.onShow === 'function') {
						page.$vm.onShow();
					}
					// 强制更新页面
					if (typeof page.$vm.$forceUpdate === 'function') {
						page.$vm.$forceUpdate();
					}
				}
			},

			// 刷新chargingzhong页面
			refreshChargingzhongPage(page) {
				if (page && page.$vm) {
					console.log('执行chargingzhong页面数据刷新');
					// 重新获取用户信息和充电数据
					if (typeof page.$vm.getUserInfo === 'function') {
						page.$vm.getUserInfo();
					}
					if (typeof page.$vm.getChargingData === 'function') {
						page.$vm.getChargingData();
					}
					if (typeof page.$vm.initPageData === 'function') {
						page.$vm.initPageData();
					}
					// 重新调用onShow方法
					if (typeof page.$vm.onShow === 'function') {
						page.$vm.onShow();
					}
					// 强制更新页面
					if (typeof page.$vm.$forceUpdate === 'function') {
						page.$vm.$forceUpdate();
					}
				}
			},

			// 刷新smcharging页面
			refreshSmchargingPage(page) {
				if (page && page.$vm) {
					console.log('执行smcharging页面数据刷新');
					// 重新初始化页面数据
					if (typeof page.$vm.initPageData === 'function') {
						page.$vm.initPageData();
					}
					// 重新调用onShow方法
					if (typeof page.$vm.onShow === 'function') {
						page.$vm.onShow();
					}
					// 强制更新页面
					if (typeof page.$vm.$forceUpdate === 'function') {
						page.$vm.$forceUpdate();
					}
				}
			},

			// 通用页面刷新
			refreshGenericPage(page) {
				if (page && page.$vm) {
					console.log('执行通用页面数据刷新');
					// 尝试调用常见的刷新方法
					if (typeof page.$vm.onShow === 'function') {
						page.$vm.onShow();
					} else if (typeof page.$vm.initPageData === 'function') {
						page.$vm.initPageData();
					}
					// 强制更新页面
					if (typeof page.$vm.$forceUpdate === 'function') {
						page.$vm.$forceUpdate();
					}
				}
			},

			// 用户切换后刷新当前页面
			refreshCurrentPageAfterUserSwitch() {
				console.log('用户切换后刷新当前页面');

				// 验证token是否已更新
				const currentToken = uni.getStorageSync('userToken');
				const currentUserId = uni.getStorageSync('userId');
				console.log('当前token:', currentToken);
				console.log('当前userId:', currentUserId);

				const pages = getCurrentPages();
				if (pages.length === 0) {
					console.log('没有当前页面，跳过刷新');
					return;
				}

				const currentPage = pages[pages.length - 1];
				const currentRoute = currentPage.route;

				console.log('当前页面路由:', currentRoute);

				if (currentPage && currentPage.$vm) {
					// 增加延迟，确保token完全更新
					setTimeout(() => {
						// 再次验证token
						const verifyToken = uni.getStorageSync('userToken');
						console.log('验证token:', verifyToken);

						// 根据不同页面执行特定的刷新逻辑
						if (currentRoute === 'pages/index/index') {
							console.log('刷新index页面用户信息');
							this.refreshIndexPageUserInfo(currentPage.$vm);
						} else if (currentRoute === 'pages/chargingzhong/chargingzhong') {
							console.log('刷新chargingzhong页面用户信息');
							this.refreshChargingzhongPageUserInfo(currentPage.$vm);
						} else if (currentRoute === 'pages/smcharging/smcharging') {
							console.log('刷新smcharging页面用户信息');
							this.refreshSmchargingPageUserInfo(currentPage.$vm);
						}
					}, 200); // 增加延迟时间
				}
			},

			// 刷新index页面用户信息
			refreshIndexPageUserInfo(vm) {
				try {
					// 重新从本地存储获取用户信息
					const user = uni.getStorageSync('user');
					const userToken = uni.getStorageSync('userToken');

					console.log('更新index页面用户信息:', user);
					console.log('使用的token:', userToken);

					// 更新页面的用户信息
					vm.isLoggedIn = !!(userToken && user);
					vm.userlist = user || {};

					// 延迟调用页面的用户信息更新方法，确保token已更新
					setTimeout(() => {
						if (typeof vm.usertap === 'function') {
							console.log('调用index页面usertap方法');
							vm.usertap();
						}
					}, 100);

					// 如果有子组件，也要更新子组件
					if (vm.$refs.childComponent && typeof vm.$refs.childComponent.userdetail === 'function') {
						setTimeout(() => {
							vm.$refs.childComponent.userdetail();
						}, 50);
					}

					if (vm.$refs.mainindex && typeof vm.$refs.mainindex.userdetail === 'function') {
						setTimeout(() => {
							vm.$refs.mainindex.userdetail();
						}, 50);
					}

					// 强制更新页面
					if (typeof vm.$forceUpdate === 'function') {
						vm.$forceUpdate();
					}

					console.log('index页面用户信息刷新完成');
				} catch (error) {
					console.error('刷新index页面用户信息时出错:', error);
				}
			},

			// 刷新chargingzhong页面用户信息
			refreshChargingzhongPageUserInfo(vm) {
				try {
					console.log('更新chargingzhong页面用户信息');

					// 调用页面的刷新方法
					if (typeof vm.onRefresh === 'function') {
						vm.onRefresh();
					}

					// 更新子组件
					if (vm.$refs.childComponent && typeof vm.$refs.childComponent.userdetail === 'function') {
						setTimeout(() => {
							vm.$refs.childComponent.userdetail();
						}, 50);
					}

					// 强制更新页面
					if (typeof vm.$forceUpdate === 'function') {
						vm.$forceUpdate();
					}

					console.log('chargingzhong页面用户信息刷新完成');
				} catch (error) {
					console.error('刷新chargingzhong页面用户信息时出错:', error);
				}
			},

			// 刷新smcharging页面用户信息
			refreshSmchargingPageUserInfo(vm) {
				try {
					console.log('更新smcharging页面用户信息');

					// 调用页面的初始化方法
					if (typeof vm.initPageData === 'function') {
						vm.initPageData();
					}

					// 强制更新页面
					if (typeof vm.$forceUpdate === 'function') {
						vm.$forceUpdate();
					}

					console.log('smcharging页面用户信息刷新完成');
				} catch (error) {
					console.error('刷新smcharging页面用户信息时出错:', error);
				}
			},



			// 强制重新加载当前页面
			forceReloadCurrentPage() {
				console.log('强制重新加载当前页面');

				const pages = getCurrentPages();
				if (pages.length === 0) {
					console.log('没有当前页面，跳过重新加载');
					return;
				}

				const currentPage = pages[pages.length - 1];
				const currentRoute = currentPage.route;

				console.log('当前页面路由:', currentRoute);

				// 对于tabBar页面，使用reLaunch重新加载
				if (currentRoute === 'pages/index/index' ||
					currentRoute === 'pages/smcharging/smcharging' ||
					currentRoute === 'pages/chargingzhong/chargingzhong') {

					console.log('重新加载tabBar页面:', currentRoute);
					uni.reLaunch({
						url: '/' + currentRoute
					});
				} else {
					console.log('非tabBar页面，使用redirectTo重新加载');
					// 获取当前页面的完整路径（包含参数）
					const fullPath = currentPage.$page ? currentPage.$page.fullPath : ('/' + currentRoute);
					uni.redirectTo({
						url: fullPath
					});
				}
			},

			// 数字补零方法
			pad(num, n) {
				var len = num.toString().length;
				while (len < n) {
					num = "0" + num;
					len++;
				}
				return num;
			},

			// 处理已登录用户的扫码进入
			handleLoggedUserScan(deviceId) {
				console.log('处理已登录用户扫码进入，设备ID:', deviceId);

				// 保存当前的扫码参数，防止被其他地方清除
				const currentScanParams = this.globalData.scanParams ? { ...this.globalData.scanParams } : null;
				console.log('保存当前扫码参数:', currentScanParams);

				// 获取当前登录code
				uni.login({
					success: (res) => {
						console.log('获取登录code成功:', res.code);

						// 构造登录参数
						const data = {
							code: res.code,
							deviceId: deviceId // 添加设备ID参数
						};

						console.log('调用wxlogin/applet接口，参数:', data);

						// 调用登录接口（不需要手机号授权）
						uni.request({
							url: Config.api + 'wxlogin/applet',
							method: 'POST',
							data: data,
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							success: (response) => {
								console.log('wxlogin/applet接口调用成功:', response);

								if (response.data && response.data.code == 200) {
									const newUserData = response.data.data;
									const currentUserId = uni.getStorageSync('userId');

									console.log('当前用户ID:', currentUserId);
									console.log('新用户ID:', newUserData.id);

									// 比较userId，如果不同则清除所有用户相关信息，相当于新用户登录
									if (currentUserId && currentUserId !== newUserData.id) {
										console.log('检测到不同用户，清除旧用户信息，切换到新用户');

										// 清除所有用户相关的本地存储
										this.clearUserRelatedStorage(currentUserId);
									} else {
										console.log('相同用户或首次登录，更新用户信息');
									}

									// 设置新用户信息
									uni.setStorageSync('user', newUserData);
									uni.setStorageSync('userId', newUserData.id);
									uni.setStorageSync('userToken', newUserData.token);
									uni.setStorageSync('phone', newUserData.phone);
									uni.setStorageSync('Name', newUserData.realName);
									uni.setStorageSync('poster', newUserData.poster);
									uni.setStorageSync('adunit', newUserData.adunit);

									console.log('新用户token已保存:', newUserData.token);

									// 设置新用户的特定存储项
									var logolist = "logolist_" + newUserData.id;
									uni.setStorageSync(logolist, "");
									var usertype = 'type_' + newUserData.id;
									uni.setStorageSync(usertype, newUserData.scan);

									// 处理海报列表
									if (newUserData.posterList) {
										var posterList = newUserData.posterList;
										for (var i = 0; i < posterList.length; i++) {
											posterList[i].img = Config.imgapi + posterList[i].img.replace("/tabBarimg", "");
										}
										uni.setStorageSync('posterList', posterList);
									} else {
										uni.setStorageSync('posterList', []);
									}

									console.log('用户信息已更新完成，扫码参数已保存');

									// 如果检测到用户切换，立即跳转到充电页面
									if (currentUserId && currentUserId !== newUserData.id) {
										console.log('用户已切换，立即跳转到充电页面');

										// 构造充电页面URL
										if (currentScanParams && currentScanParams.device && currentScanParams.port) {
											// 处理端口号转换
											let processedPort = '';
											if (currentScanParams.port.toUpperCase() !== 'FF') {
												try {
													processedPort = this.pad(parseInt(currentScanParams.port, 16).toString(10), 2);
												} catch (e) {
													console.error('端口号转换错误:', e);
													processedPort = currentScanParams.port;
												}
											} else {
												processedPort = currentScanParams.port;
											}

											const chargeUrl = `/pageone/poweron/poweron?device=${currentScanParams.device}&port=${processedPort}&cmd=0&from=1`;
											console.log('跳转到充电页面:', chargeUrl);

											// 延迟跳转，确保用户信息已经完全更新
											setTimeout(() => {
												console.log('用户切换，跳转到充电页面:', chargeUrl);
												uni.redirectTo({
													url: chargeUrl,
													success: () => {
														console.log('用户切换后跳转充电页面成功');
													},
													fail: (err) => {
														console.error('跳转充电页面失败:', err);
													}
												});
											}, 200);
										} else {
											console.log('没有扫码参数，无法跳转到充电页面');
										}
									} else {
										console.log('相同用户，无需跳转');
									}
								} else if (response.data && response.data.code == 599) {
									console.log('已登录用户扫码时未关注公众号，跳转到登录页面处理');

									// 构造跳转URL，保留设备号和端口号参数
									let loginUrl = '/pages/login/login?reason=follow_wechat';
									if (currentScanParams && currentScanParams.device && currentScanParams.port) {
										loginUrl += `&device=${currentScanParams.device}&port=${currentScanParams.port}`;
										console.log('保留设备参数跳转到登录页面:', currentScanParams);
									}

									// 清除扫码参数，避免重复处理
									this.globalData.scanParams = null;

									// 跳转到登录页面，让登录页面处理关注引导
									setTimeout(() => {
										uni.reLaunch({
											url: loginUrl,
											success: () => {
												console.log('跳转到登录页面成功');
											},
											fail: (err) => {
												console.error('跳转到登录页面失败:', err);
												// 如果reLaunch失败，尝试使用redirectTo
												console.log('尝试使用redirectTo跳转');
												uni.redirectTo({
													url: loginUrl,
													success: () => {
														console.log('redirectTo跳转成功');
													},
													fail: (err2) => {
														console.error('redirectTo也失败:', err2);
													}
												});
											}
										});
									}, 100);
								} else if (response.data && response.data.code == 598) {
									console.log('已登录用户扫码时需要重新授权手机号，跳转到登录页面');
									console.log('保存的扫码参数:', currentScanParams);

									// 构造跳转URL，保留设备号和端口号参数
									let loginUrl = '/pages/login/login?reason=phone_auth';
									if (currentScanParams && currentScanParams.device && currentScanParams.port) {
										loginUrl += `&device=${currentScanParams.device}&port=${currentScanParams.port}`;
										console.log('保留设备参数跳转到登录页面:', currentScanParams);
										console.log('构造的跳转URL:', loginUrl);
									} else {
										console.log('没有设备参数，使用基础URL:', loginUrl);
									}

									// 清除扫码参数，避免重复处理
									this.globalData.scanParams = null;

									console.log('准备跳转到登录页面，URL:', loginUrl);
									// 跳转到登录页面，让登录页面处理手机号授权
									// 使用setTimeout延迟跳转，避免在接口回调中立即跳转导致的问题
									setTimeout(() => {
										uni.reLaunch({
											url: loginUrl,
											success: () => {
												console.log('跳转到登录页面成功');
											},
											fail: (err) => {
												console.error('跳转到登录页面失败:', err);
												// 如果reLaunch失败，尝试使用redirectTo
												console.log('尝试使用redirectTo跳转');
												uni.redirectTo({
													url: loginUrl,
													success: () => {
														console.log('redirectTo跳转成功');
													},
													fail: (err2) => {
														console.error('redirectTo也失败:', err2);
													}
												});
											}
										});
									}, 100);
								} else {
									console.log('wxlogin/applet接口返回失败:', response.data);
								}
							},
							fail: (error) => {
								console.error('wxlogin/applet接口调用失败:', error);
							}
						});
					},
					fail: (error) => {
						console.error('获取登录code失败:', error);
					}
				});
			}
		}
	}
</script>

<style>
	@import “/wxcomponents/vant/index.wxss”;
	.boby{
		/* background-color: #FFFFFF; */
		/* text-size-adjust: 100% !important;
		-webkit-text-size-adjust: 100% !important;
		-moz-text-size-adjust: 100% !important; */

	}
	/deep/.van-dialog__footer{
		display: flex!important;
	}
	/deep/.van-toast{
		width: 200upx;
		max-width: 100%;
	}
	/deep/.redtrip{
		color: red;
	}




	/*每个页面公共css */
</style>
