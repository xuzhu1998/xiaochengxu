<template>
	<view class="main">
		<view class="show">
			<van-tabs :active="active"  @change="gbtn">
				<van-tab title="充电记录" name="a">
					<view class="tapthree">
						<view class="cdjl-0" v-if="value">
							<uni-datetime-picker v-model="value" type="daterange" @change="timechange" />
						</view>
						<van-collapse :value="activeNames" @change='onchange'>
							
							<van-collapse-item :name="index" v-for="(item, index) in bylist" :key="index">
								<template #title>
									<view>
										<view class="tphand">消费金额:<span style="color: #FFA02E;margin-left: 20upx;">¥{{item.realMoney+item.amount}}</span></view>
										<view class="tpfoot">{{item.startTime}}</view>
									</view>
								</template>
								<view class="showtap">
									<view class="stone">
										<view class="stoneleft">
											订单编号:
										</view>
										<view class="stoneright">
											{{item.orderNum}}
										</view>
									</view>
									<view class="stone">
										<view class="stoneleft">
											消费位置:
										</view>
										<view class="stoneright" style="width: 75%;">
											{{item.projectName}}（{{item.areaName}}）
										</view>
									</view>
									<view class="stone">
										<view class="stoneleft">
											消费类型:
										</view>
										<view class="stoneright" v-if="item.type==0">
											临时充电
										</view>
										<view class="stoneright" v-if="item.type==1">
											本区
										</view>
										<view class="stoneright" v-if="item.type==2">
											跨区
										</view>
									</view>
									<view class="stone">
										<view class="stoneleft">
											充电类型:
										</view>
										<view class="stoneright">
											<span v-if="item.chargeTypeStr=='V1'">VIP</span>
											<span v-else-if="item.chargeTypeStr=='V2'">公众号VIP</span>
											<span v-else-if="item.chargeTypeStr=='V3'">全平台VIP</span>
											<span v-else-if="item.chargeTypeStr=='B5'">计量2</span>
											<span v-else>{{item.chargeTypeStr}}</span>
											
										</view>
									</view>
									<view class="stone" v-if="item.chargeType=='B2'||item.chargeType=='B5'">
										<view class="stoneleft">
											<span v-if="item.chargeType=='B4'">电量费率(时):</span>
											<span v-if="item.chargeType=='B1'">电量费率(元/时):</span>
											<span v-if="item.chargeType=='B2'||item.chargeType=='B5'">电量费率(元/度):</span>
											<span v-if="item.chargeType=='B3'">电量费率(元/次):</span>
										</view>
										<view class="stoneright" v-if="item.rate">
											{{item.rate}}
										</view>
										<view class="stoneright" v-if="!item.rate">
											0
										</view>
									</view>
									<view class="stone" v-if="item.chargeType=='B2'||item.chargeType=='B5'">
										<view class="stoneleft">
											<span v-if="item.chargeType=='B2'">服务费费率(元/小时)</span>
											<span v-if="item.chargeType=='B5'">服务费费率(元/度)</span>
										</view>
										<view class="stoneright" v-if="item.spareVar8">
											{{item.spareVar8}}
										</view>
										<view class="stoneright" v-if="!item.spareVar8">
											0
										</view>
									</view>
									<view class="stone" v-if="item.chargeType=='B2'||item.chargeType=='B5'">
										<view class="stoneleft">
											充电电费(元)
										</view>
										<view class="stoneright" v-if="item.spareVar7">
											{{item.spareVar7}}
										</view>
										<view class="stoneright" v-if="!item.spareVar7">
											0
										</view>
									</view>
									<view class="stone" v-if="item.chargeType=='B2'||item.chargeType=='B5'">
										<view class="stoneleft">
											充电电量(度):
										</view>
										<view class="stoneright">
											{{item.chargeKwh}}
										</view>
									</view>
									<view class="stone" v-if="item.chargeType=='B2'||item.chargeType=='B5'">
										<view class="stoneleft">
											服务费(元)
										</view>
										<view class="stoneright" v-if="item.spareVar9">
											{{item.spareVar9}}
										</view>
										<view class="stoneright" v-if="!item.spareVar9">
											0
										</view>
									</view>
									<view class="stone">
										<view class="stoneleft">
											充电器功率(瓦):
										</view>
										<view class="stoneright" v-if="item.settlePower">
											{{item.settlePower}}
										</view>
										<view class="stoneright" v-if="!item.settlePower">
											0
										</view>
									</view>
									<view class="stone">
										<view class="stoneleft">
											启动方式:
										</view>
										<view class="stoneright" v-if="item.qrOrCard=='1'">
											电卡
										</view>
										<view class="stoneright" v-if="item.qrOrCard=='2'">
											扫码
										</view>
										<view class="stoneright" v-if="item.qrOrCard=='3'">
											验证码
										</view>
										<view class="stoneright" v-if="item.qrOrCard=='4'">
											蓝牙
										</view>
									</view>
									<view class="stone">
										<view class="stoneleft">
											结束原因:
										</view>
										<view class="stoneright" v-if="item.stopReason=='00'">
											系统结算
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='01'">
											充满自停
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='02'">
											达到最大充电时长
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='03'">
											达到预设时间
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='04'">
											达到预设电量
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='05'">
											<span v-if="item.deviceId.substr(-2, 2)=='04'">用户拔出</span>
											<span v-else>充电结束</span>
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='06'">
											负载过大
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='07'">
											手动停止
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='08'">
											功率起伏过大
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='09'">
											电池未连接好
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='10'">
											水浸断电
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='11'">
											灭火结算（本端口）
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='12'">
											灭火结算（非本端口）
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='13'">
											用户密码开柜断电
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='14'">
											未关好柜门
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='15'">
											外部操作打开柜门
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='17'">
											服务器强制停止
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='0A'">
											环境温度过高
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='0B'">
											端口温度过高
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='0C'">
											过流或短路
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='0D'">
											用户拔出-1
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='0E'">
											接触不良或保险丝烧断
										</view>
										<view class="stoneright" v-else-if="item.stopReason=='0F'">
											继电器坏或保险丝断
										</view>
										<view class="stoneright" v-else>
											{{item.stopReason}}
										</view>
									</view>
									<view class="stone">
										<view class="stoneleft">
											充电时长:
										</view>
										<view class="stoneright" >
											{{item.time}}
										</view>
										
									</view>
									<view class="stone">
										<view class="stoneleft">
											结算时间:
										</view>
										<view class="stoneright">
											{{item.endTime}}
										</view>
									</view>
									<view class="stone" v-if="freeappid=='wxb9f6b0a85cd3d753' && item.chargeType=='B2'">
										<view class="stoneleft">
											服务费(元):
										</view>
										<view class="stoneright">
											{{item.serviceFree}}
										</view>
									</view>
									<view class="stone" v-if="freeappid=='wxb9f6b0a85cd3d753' && item.chargeType=='B2'">
										<view class="stoneleft">
											电费(元):
										</view>
										<view class="stoneright">
											{{item.powerFree}}
										</view>
									</view>
									<view class="stone">
										<view class="stoneleft">
											基本账户消费(元):
										</view>
										<view class="stoneright">
											{{item.realMoney}}
										</view>
									</view>
									<view class="stone">
										<view class="stoneleft">
											赠送账户消费(元):
										</view>
										<view class="stoneright">
											{{item.amount}}
										</view>
									</view>
									<a v-if='item.kuanno==1' v-for="(item1, index1) in item.kklist" :key="index1">
										
										<a v-if='item1.accountType==0'>
											<view class="stone">
												<view class="stoneleft" style='font-weight: 700;'>
													扣款前基本账户余额(元):
												</view>
												<view class="stoneright" style='font-weight: 700;'>
													{{item1.frontMoney}}
												</view>
											</view>
											<view class="stone">
												<view class="stoneleft" style='font-weight: 700;'>
													扣款后基本账户余额(元):
												</view>
												<view class="stoneright" style='font-weight: 700;'>
													{{item1.endMoney}}
												</view>
											</view>
										</a>
										<a v-if='item1.accountType==1'>
											<view class="stone">
												<view class="stoneleft" style='font-weight: 700;'>
													扣款前赠送账户余额(元):
												</view>
												<view class="stoneright"style='font-weight: 700;'>
													{{item1.frontMoney}}
												</view>
											</view>
											<view class="stone">
												<view class="stoneleft" style='font-weight: 700;'>
													扣款后赠送账户余额(元):
												</view>
												<view class="stoneright" style='font-weight: 700;'>
													{{item1.endMoney}}
												</view>
											</view>
										</a>
										
									</a>
									<a v-if='item.kuanno1==1'>
										<view class="stone">
											<view class="stoneleft" style='font-weight: 700;'>
												免费占用时长(小时):
											</view>
											<view class="stoneright" style='font-weight: 700;'>
												{{item.kklist1.occupyFreeStr}}
											</view>
										</view>
										<view class="stone">
											<view class="stoneleft" style='font-weight: 700;'>
												产生占位时长(小时):
											</view>
											<view class="stoneright" style='font-weight: 700;'>
												{{item.kklist1.getMakeTimeStr}}
											</view>
										</view>
										<view class="stone">
											<view class="stoneleft" style='font-weight: 700;'>
												占位费率:
											</view>
											<view class="stoneright" style='font-weight: 700;'>
												{{item.kklist1.occupyRate}}
											</view>
										</view>
										<view class="stone">
											<view class="stoneleft" style='font-weight: 700;'>
												占位费用:
											</view>
											<view class="stoneright" style='font-weight: 700;'>
												<span v-if='item.kklist1.statuss==0'>{{item.kklist1.occupyMoney}}元</span>
												<span v-if='item.kklist1.statuss==1'>{{(item.kklist1.occupyMoney/60).toFixed(2)}}小时</span>
											</view>
										</view>
										<view class="stone">
											<view class="stoneleft" style='font-weight: 700;'>
												封顶金额:
											</view>
											<view class="stoneright" style='font-weight: 700;'>
												{{item.kklist1.occupyMax}}
												<span v-if='item.kklist1.statuss==0'>元</span>
												<span v-if='item.kklist1.statuss==1'>小时</span>
											</view>
										</view>
									</a>
									<a v-if='item.kuanno3==1'>
										<view class="stone" style="align-items: center;">
											<view class="stoneleft" style='font-weight: 700;'>
												充电守护金额(元):
											</view>
											<view class="stoneright" style='font-weight: 700;margin-right: 15upx;'>
												{{item.kklist3.moneyReal}}
											</view>
											<view style="color: #FFFFFF;background-color: #4b98ed;width: 78px;font-size: 15px;text-align: center;border-radius: 5px;" @click="lxkf(item.orderNum)" v-if="White==1">客服</view>
										</view>
									</a>
									<a v-if='item.kuanno2==1'>
										<view class="stone">
											<view class="stoneleft" style='font-weight: 700;'>
												开柜密码:
											</view>
											<view class="stoneright" style='font-weight: 700;'>
												{{item.kklist2}}
											</view>
										</view>
										
									</a>
									
									
									<view class="stonebtn" @click="kkbtn(item.orderNum)" v-if='(item.amount>0||item.realMoney>0)&&item.kuanno!=1'>
										扣款详情
									</view>
									<view class="stonebtn" style="width: 170upx;margin-top: 10upx;" @click="zwbtn(item.orderNum)" v-if='item.deviceId.substr(-2,1)==9&&item.kuanno1!=1'>
										占位费详情
									</view>
									<view class="stonebtn" style="width: 170upx;margin-top: 10upx;" @click="shbtn(item.orderNum)" v-if='item.kuanno3!=1&&item.spareVar5==1'>
										充电守护
									</view>
									<view class="stonebtn" style="width: 170upx;margin-top: 10upx;" @click="pwdbtn(item.id)" v-if='item.deviceId.substr(-2,1)==9&&item.kuanno2!=1'>
										开柜密码
									</view>
									
								</view>
							</van-collapse-item>
							</van-collapse>
							<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
					</view>
				</van-tab>
				<van-tab title="包月记录"  name="b">
					<view class="tapthree">
						<view class="cdjl-0" v-if="value">
							<uni-datetime-picker v-model="value" type="daterange" @maskClick="maskClick" />
						</view>
						<van-collapse :value="activeNames1" @change='onchange1'>
							
							<van-collapse-item :name="index" v-for="(item, index) in yuelist" :key="index" >
								<template #title>
									<view>
										<view class="tphand">消费金额:<span style="color: #FFA02E;margin-left: 20upx;">¥{{item.useMoney}}</span></view>
										<view class="tpfoot">{{item.createTime}}</view>
									</view>
								</template>
								<view class="showtap">
									<view class="stone">
										<view class="stoneleft">
											小区:
										</view>
										<view class="stoneright">
											{{item.projectName}}
										</view>
									</view>
									<view class="stone">
										<view class="stoneleft">
											使用金额:
										</view>
										<view class="stoneright" >
											¥{{item.useMoney}}
										</view>
										
									</view>
									<view class="stone">
										<view class="stoneleft">
											开始月份:
										</view>
										<view class="stoneright">
											{{item.startMonth}}
										</view>
									</view>
									<view class="stone">
										<view class="stoneleft">
											结束月份:
										</view>
										<view class="stoneright">
											{{item.endMonth}}
										</view>
									</view>
									<view class="stone">
										<view class="stoneleft">
											失效月份:
										</view>
										<view class="stoneright">
											{{item.invalidMonth}}
										</view>
										
									</view>
									<view class="stone">
										<view class="stoneleft">
											购买月数:
										</view>
										<view class="stoneright">
											{{item.monthNums}}
										</view>
									</view>
									<view class="stone">
										<view class="stoneleft">
											套餐次数/时长:
										</view>
										<view class="stoneright">
											{{item.totals}}
										</view>
									</view>
									<view class="stone">
										<view class="stoneleft">
											购买总次数/时长:
										</view>
										<view class="stoneright">
											{{item.nums}}
										</view>
									</view>
									<view class="stone">
										<view class="stoneleft">
											类型:
										</view>
										<view class="stoneright" v-if="item.types=='A1'">
											包时
										</view>
										<view class="stoneright" v-if="item.types=='A3'">
											包次
										</view>
										<view class="stoneright" v-if="item.types=='A4'">
											30天套餐(包总时)
										</view>
										<view class="stoneright" v-if="item.types=='A5'">
											30天套餐(按天包时)
										</view>
										<view class="stoneright" v-if="item.types=='A6'">
											30天套餐(包总次)
										</view>
										<view class="stoneright" v-if="item.types=='A7'">
											30天套餐(按天包次)
										</view>
										
									</view>
									<view class="stone">
										<view class="stoneleft">
											购买时间:
										</view>
										<view class="stoneright">
											{{item.createTime}}
										</view>
									</view>
								</view>
							</van-collapse-item>
								
							</van-collapse>
							<uni-load-more :status="status1" :icon-size="16" :content-text="contentText1" />
					</view>
				</van-tab>
			</van-tabs>
		</view>
		<van-popup :show="ptype">
			<view class="pwdtan">
				<view class="pwdtanone">
					开柜密码
				</view>
				<view class="pwdtanone">
					{{kgpwd}}
				</view>
			</view>
		</van-popup>
		<view class="kf">
			<van-popup :show="kfshow">
				<view class="kfmap">
					<view class="one" @click="gkf">
						<image src="../../static/tabBarimg/kfclose.png"></image>
					</view>
					<view class="two">专属客服</view>
					<view class="three">您可以通过以下方式联系到我哦</view>
					<view class="four">
						<view class="fourfirst" @click="callphone" v-if="xylist.phoneStatuss==1">
							<image src="../../static/tabBarimg/kfphone.png"></image>
							电话客服
						</view>
						<view class="fourthired" v-if="xylist.imgStatuss==1&&xylist.phoneStatuss==1"></view>
						<view class="foursecond" @click="zaixian" v-if="xylist.imgStatuss==1">
							<image src="../../static/tabBarimg/kfwx.png"></image>
							在线客服
						</view>
					</view>
				</view>
			</van-popup>
			<van-popup :show="wxtcshow">
				<view class="kfmap">
					<view class="one" @click="gwx">
						<image src="../../static/tabBarimg/kfclose.png"></image>
					</view>
					<view class="five">
						<image :src='xylist.wechatImg'></image>
					</view>
					<view class="six">
						<view>关注公众号</view>
						<view>即可享受专属客服在线咨询服务</view>
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
	import {
		Config
	} from '../../common/Config.js'
	import {formatDate} from '../../common/formatDate.js'
	export default {
		components: {},
		mounted() {
		},
		created() {
			
		},
		data() {
			return {
				active: 'a',
				activeNames: [''], //当前展开面板的 name
				activeNames1: [''], //当前展开面板的 name
				value: [],
				type: 'range', //时间选择器
				showPicker: false, //时间选择器
				bylist:[],//包月退款数据
				yuelist:[],//余额退款数据
				status: 'noMore',//more/loading/noMore
				contentText: {contentdown: '上拉加载更多',contentrefresh: '加载中',contentnomore: '没有更多'},
				finished: false, // 是否已加载所有数据
				pageNum: 1, //页码
				pageSize: 10, //每页显示的条数
				status1: 'noMore',//more/loading/noMore
				contentText1: {contentdown: '上拉加载更多',contentrefresh: '加载中',contentnomore: '没有更多'},
				finished1: false, // 是否已加载所有数据
				ypageNum: 1, //页码
				ypageSize: 10, //每页显示的条数
				ptype:false,
				kgpwd:'',//开柜密码
				xylist:'',
				kfshow:false,
				wxtcshow:false,
				consumNo:'',
				White:0,
				freeappid:''
			}
		},
		onLoad(option) {
			this.freeappid=uni.getStorageSync('user').appid
			this.safeWhite()
			if(option.type){
				this.active=option.type
			}else{
				this.active='a'
			}
			this.show();
			if(this.active=='a'){
				this.onRefresh()
			}else if(this.active=='b'){
				this.yonRefresh()
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			if(this.active=='a'){
				this.onRefresh()
			}else if(this.active=='b'){
				this.yonRefresh()
			}
		},
		//上滑加载
		onReachBottom() {
			if(this.active=='a'){
				if(!this.finished){
					this.loadMore()
				}
			}else if(this.active=='b'){
				if(!this.finished1){
					this.yloadMore()
				}
			}
			
		},
		methods: {
			show(){
				var nowtime = formatDate(new Date(),'yyyy-MM-dd');				
				var oldtime=formatDate(new Date(new Date().getTime()-2592000000),'yyyy-MM-dd');
				this.value=[oldtime,nowtime]
			},
			timechange(e) {
				this.value=e
				if(this.active=='a'){
					this.onRefresh()
				}else if(this.active=='b'){
					this.yonRefresh()
				}
			},
			gbtn(vul){
				this.active=vul.detail.name
				if(this.active=='a'){
					this.onRefresh()
				}else if(this.active=='b'){
					this.yonRefresh()
				}
			},
			// 充电记录分页
			loadMore() {
				let data = {
					userId: uni.getStorageSync('userId'),
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					startTime:this.value[0],
					endTime:this.value[1]
				}
				this.status="loading"
				this.$base.request('consumeRecord/list', 'GET', data)
					.then(res => {
						uni.stopPullDownRefresh();
						if(res.data.rows&&res.data.rows.length>0){
							for(var i=0;i<res.data.rows.length;i++){
								res.data.rows[i].kuanno1=0
								res.data.rows[i].kklist1={}
								res.data.rows[i].kuanno2=0
								res.data.rows[i].kklist2={}
								res.data.rows[i].kuanno3=0
								res.data.rows[i].kklist3={}
							}
							
							this.bylist = this.bylist.concat(res.data.rows);
							if(this.bylist.length!=res.data.total){
								this.pageNum += 1;
								this.status="more"
								this.finished=false
							}else{
								this.status='noMore'
								this.finished = true;
							}
						}else{
							this.status='noMore'
							this.finished = true;
						}
					})
					.catch(err => {
				
					})
			},
			onRefresh() {
				 this.finished=false
				 this.pageNum=1
				 this.bylist = [];
				 this.loadMore()
			    },
			
			// 包月购买记录分页
			yloadMore() {
				
				let data = {
					userId: uni.getStorageSync('userId'),
					pageNum:this.ypageNum,
					pageSize:this.ypageSize,
					startTime:this.value[0],
					endTime:this.value[1]
				}
				this.status1="loading"
				this.$base.request('userMonthly/list', 'GET', data)
					.then(res => {
						uni.stopPullDownRefresh();
						if(res.data.rows&&res.data.rows.length>0){
							this.yuelist = this.yuelist.concat(res.data.rows);
							if(this.yuelist.length!=res.data.total){
								this.ypageNum += 1;
								this.status1="more"
								this.finished1=false
							}else{
								this.status1='noMore'
								this.finished1 = true;
							}
							
						}else{
							this.status1='noMore'
							this.finished1 = true;
						}
					})
					.catch(err => {
				
					})
			},
			 yonRefresh() {
				 this.finished1=false
				 this.ypageNum=1
				 this.yuelist = [];
				 this.yloadMore()
			},	
			//点击扣款详情
			kkbtn(orderNum){
				let data={
					userId:uni.getStorageSync('userId'),
					orderNum:orderNum
				}
				let kklist=[]
				uni.showLoading({
					title: '请稍候',
					mask: true
				})
				this.$base.request1('userAccountDetail/info', 'GET',data)
					.then(res => {
						if(res.data.code==200){
							uni.hideLoading()
							if(res.data.data.length>0){
								kklist=res.data.data
								for(var i=0;i<this.bylist.length;i++){
									if(this.bylist[i].orderNum==orderNum){
										if(this.bylist[i].amount>0||this.bylist[i].realMoney>0){
											this.bylist[i].kuanno=1
											this.bylist[i].kklist=kklist
										}
									}
								}
								this.loadMore();
							}else{
								Toast.fail('未查询到消费扣款详情')
							}
						}else{
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {
				
					})
				
			},
			//点击占位费详情
			zwbtn(orderNum){
				let data={
					orderNo:orderNum
				}
				let kklist={}
				uni.showLoading({
					title: '请稍候',
					mask: true
				})
				this.$base.request('consumeRecord/cccupy/info', 'GET',data)
					.then(res => {
						if(res.data.code==200){
							uni.hideLoading()
							if(res.data.data){
								kklist=res.data.data
								for(var i=0;i<this.bylist.length;i++){
									if(this.bylist[i].orderNum==orderNum){
											this.bylist[i].kuanno1=1
											this.bylist[i].kklist1=kklist
									}
								}
								this.loadMore();
							}else{
								Toast.fail('未查询到占位费扣款详情')
							}
						}else{
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {
				
					})
				
			},
			//点击获取开柜密码
			pwdbtn(id){
				let data={
					id:id
				}
				let kklist={}
				uni.showLoading({
					title: '请稍候',
					mask: true
				})
				this.$base.request('consumeRecord/cccupy/password', 'GET',data)
					.then(res => {
						if(res.data.code==200){
							uni.hideLoading()
							if(res.data.msg){
								this.kgpwd=res.data.msg
								this.ptype=true
							}else{
								Toast.fail('未查询到开柜密码')
							}
						}else{
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {
				
					})
				
			},
			//获取用户所在小区运营商是否开启白名单
			safeWhite(){
				this.$base.request('user/safeWhite', 'GET')
					.then(res => {
						if(res.data.code==200){
							this.White=res.data.data
						}else{
							this.White=0
						}
					})
					.catch(err => {
				
					})
			},
			//获取充电守护详情
			shbtn(orderNo){
				let data={
					orderNo:orderNo
				}
				let kklist={}
				uni.showLoading({
					title: '请稍候',
					mask: true
				})
				this.$base.request('consumeRecord/safe/info', 'GET',data)
					.then(res => {
						if(res.data.code==200){
							uni.hideLoading()
							if(res.data.data){
								kklist=res.data.data
								for(var i=0;i<this.bylist.length;i++){
									if(this.bylist[i].orderNum==orderNo){
											this.bylist[i].kuanno3=1
											this.bylist[i].kklist3=kklist
									}
								}
								this.loadMore();
							}else{
								Toast.fail('未查询到充电守护详情')
							}
						}else{
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {
				
					})
			},
			xyshow(){
				this.$base.request('charge/safe/marketing', 'GET')
					.then(res => {
						if(res.data.code==200){
							this.xylist=res.data.data
							if(this.xylist.wechatImg){
								this.xylist.wechatImg=Config.imgapi+this.xylist.wechatImg
							}
						}else{
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {
				
					})
			},
			lxkf(orderNum){
				this.consumNo=orderNum
				this.xyshow()
				this.kfshow=true
			},
			//关闭客服弹窗
			gkf(){
				this.kfshow=false
			},
			//关闭公众号弹窗
			gwx(){
				this.wxtcshow=false
			},
			//打开公众号弹窗
			zaixian(){
				if(this.xylist.imgStatuss==1){
					Dialog.confirm({
						title: '提示',
						message: '确认联系在线客服？',
					}).then(() => {
						let data={
							inletType:'consum',
							consumNo:this.consumNo
						}
						uni.showLoading({
							title: '请稍候',
							mask: true
						})
						this.$base.request('user/customer/add', 'POST',data)
							.then(res => {
								uni.hideLoading()
								if(res.data.code==200){
									this.wxtcshow=true
									this.kfshow=false
								}else{
									Toast.fail(res.data.msg)
									return
								}
							})
							.catch(err => {
						
							})
					}).catch(() => {
						return
						// on cancel
					});
				}else{
					Toast.fail('在线客服尚未启用')
				}
				
			},
			//拨打电话
			callphone(){
				if(this.xylist.phoneStatuss==1){
					Dialog.confirm({
						title: '提示',
						message: '确认拨打电话客服',
					}).then(() => {
						let data={
							inletType:'consum',
							consumNo:this.consumNo
						}
						uni.showLoading({
							title: '请稍候',
							mask: true
						})
						this.$base.request('user/customer/add', 'POST',data)
							.then(res => {
								uni.hideLoading()
								if(res.data.code==200){
									uni.makePhoneCall({
										phoneNumber: this.xylist.phone.toString()
									}).catch((e) => {
										// console.log(e)  //用catch(e)来捕获错误{makePhoneCall:fail cancel}
									})
									this.kfshow=false
								}else{
									Toast.fail(res.data.msg)
									return
								}
							})
							.catch(err => {
						
							})
					}).catch(() => {
						return
						// on cancel
					});
				}else{
					Toast.fail('电话客服尚未启用')
				}
				
			},
			onchange(e){
				this.activeNames=e.detail
			},
			onchange1(e){
				this.activeNames1=e.detail
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
		// overflow-x: hidden;
		background-color: #242225;
		/deep/.van-list__finished-text{
			margin-top: 100upx;
			padding-bottom: 200upx;
		}
		/deep/.van-hairline--top-bottom::after{
			border-width: 0;
		}
		.van-popup--center{
			border-radius: 20upx;
		}
		.pwdtan{
			width: 550upx;
			padding: 10upx 0;
			.pwdtanone{
				font-size: 64upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #111111;
				text-align: center;
				padding: 10upx 0;
			}
		}
		.show {
			/deep/.van-tab {
				font-size: 32upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				color: #999999;
			}
			
			/deep/.van-tab--active {
				font-size: 32upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				color: #FFA02E;
			}
			
			/deep/.van-tabs__line {
				width: 91upx !important;
				height: 4upx;
				border-radius: 2px;
				background-color: #FFA02E;
			}
			/deep/.van-tabs__nav{
				background-color: #242225;
			}
			.tapthree {
				width: 686upx;
				margin: 16upx auto;
				.cdjl-0 {
					width: 100%;
					box-sizing: border-box;
					display: flex;
					background: #343136;
					height: 100upx;
					align-items: center;
					justify-content: space-around;
					border-radius: 18upx;
					/deep/.uni-date-x--border{
						width: 100%;
						box-sizing: border-box;
						border: 0upx !important;
					}
					/deep/.uni-date-x {
						width: 100%;
						display: flex;
						box-sizing: border-box;
						background: #343136;
						align-items: center;
						padding: 0upx !important;
						justify-content: space-between !important;
						border-radius: 18upx;
					}
					/deep/.uni-date__x-input{
						height: 60upx;
						width: 260upx;
						border-radius: 10upx;
						border: 2upx solid #ccc;
						font-size: 30upx;
						line-height: 60upx;
						color: #bbbbbb;
						text-align: center;
					}
				}
				.tphand {
					font-size: 28upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					color: #fff;
				}

				.tpfoot {
					font-size: 24upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #fff;
					margin-top: 10upx;
				}

				/deep/.van-collapse-item__content {
					padding: 0 30upx;
					background-color: #343136;
					border-radius:0upx 0upx 24upx 24upx;
				}
				
				/deep/.van-cell:after{
					border-bottom: 0upx;
					border-bottom-color: transparent;
				}
				/deep/.van-collapse-item{
					border-radius: 24upx !important;
					background-color: #343136 !important;
					margin-top: 30upx;
				}
				/deep/.van-cell{
						background-color: transparent;
						align-items: center;
						padding: 30upx 40upx !important;
				}
				/deep/.van-hairline--top-bottom::after{
					border-width: 0;
				}
				/deep/.van-hairline--top:after{
					border-top-width:0upx ;
				}

				

				.showtap {
					width: 100%;
					box-sizing: border-box;
					padding: 40upx 0;

					.stone {
						width: 100%;
						box-sizing: border-box;
						display: flex;
						margin-bottom: 15upx;

						.stoneleft {
							font-size: 24upx;
							font-family: PingFang SC Regular, PingFang SC Regular-Regular;
							font-weight: 400;
							color: #D0D0D0;
							
						}

						.stoneright {
							color: #969799;
							font-size: 24upx;
							font-family: PingFang SC Bold, PingFang SC Bold-Bold;
							margin-left: 20upx;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
					}
					.stonebtn{
						color: #FFFFFF;
						background-color: #4b98ed;
						width: 150upx;
						font-size: 30upx;
						text-align: center;
						border-radius: 10upx;
					}
				}

			}
		}
			.kf{
				/deep/.van-popup {
					border-radius: 36upx;
					overflow-x: hidden;
				}
				.kfmap{
					background-color: #ffffff;
					width: 544upx;
					position: relative;
					padding-bottom: 50upx;
					padding-top: 58upx;
					box-sizing: border-box;
					.one{
						position: absolute;
						top: 30upx;
						right: 30upx;
						image{
							width: 29upx;
							height: 29upx;
						}
					}
					.two{
						text-align: center;
						font-size: 34upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 700;
						color: #111111;
						line-height: 48upx;
					}
					.three{
						margin-top: 44upx;
						text-align: center;
						font-size: 30upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 700;
						color: #3A4044;
						line-height: 42upx;
					}
					.four{
						display: flex;
						padding:0 54upx;
						justify-content: center;
						align-items: center;
						margin-top: 70upx;
						.fourfirst{
							display: flex;
							align-items: center;
							image{
								width: 30upx;
								height: 30upx;
								margin-right: 5upx;
							}
							font-size: 34upx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 700;
							color: #3A4044;
							line-height: 48upx;
						}
						.foursecond{
							display: flex;
							align-items: center;
							image{
								width: 35upx;
								height: 29upx;
								margin-right: 5upx;
							}
							font-size: 34upx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 700;
							color: #EC651C;
							line-height: 48upx;
						}
						.fourthired{
							width: 1upx;
							height: 55upx;
							background: #EEEEEE;
							margin: 0 48upx;
						}
					}
					.five{
						text-align: center;
						image{
							width: 424upx;
							height: 424upx;
							background: #D4D4D4;
							border-radius: 10upx;
						}
					}
					.six{
						text-align: center;
						font-size: 30upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #EC651C;
						line-height: 49upx;
						margin-top: 50upx;
					}
				}
			}


	}
</style>
