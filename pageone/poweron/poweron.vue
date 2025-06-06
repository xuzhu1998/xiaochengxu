<template>
	<view class="main">

		<view class="foothand" @click="gzbtn" v-if="wechatLogo">
			点击关注公众号，接收充电消息通知
		</view>
		<view class="gtap" v-if="ggshow==1">
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
				<van-swipe-item v-for="(item, index) in posterList" :key="index">
					<image :src=item.img @click="gogd(item.url,item.jump,item.msg,item.libId,item.teamId)"
						v-if="item.jump!='PPRO'"></image>
					<view v-if="item.jump=='PPRO'" class="tapone">
						<view class="taponesun" :style="'background-image: url(' + item.img+')'"></view>
						<wx-open-launch-weapp id="launch-btn" :username="JSON.parse(item.data).uid"
							:path="JSON.parse(item.data).url"
							style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;"
							v-if="item.jump=='PPRO'">
							<script type="text/wxtag-template">
								<div style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;opacity: 0" />
							</script>
						</wx-open-launch-weapp>
					</view>
				</van-swipe-item>
			</van-swipe>
		</view>
		<view :class="logolist.loshow=='0'?'hdlogo':'hdlogo1'" v-if="ggshow==0">
			<image :src='logolist.logo'></image>
		</view>
		<view class="showhand">
			<view :class="showclass=='1'?'sone':'sone1'" @click="tapbtn(1)" v-if="oftenList.length!=0">
				单次充电
			</view>
			<view :class="showclass=='2'?'sone':'sone1'" @click="tapbtn(2)"
				v-if="temporaryList.length!=0&&xcxtype==1">
				临时充电
			</view>
			<view :class="showclass=='3'?'sone':'sone1'" @click="tapbtn(3)" v-if="monthlyList.length!=0">
				包月充电
			</view>
			<view :class="showclass=='4'?'sone':'sone1'" @click="tapbtn(4)" v-if="isVIP.substr(0,1)=='V'">
				VIP模式
			</view>
		</view>
		<view class="map">
			<view class="mapone">
				<view class="mhand">
					<view style="width: 55%; text-align: left;">充电插座编号:{{shebeino}}:{{portnum}}</view>
					<view style="width: 20%;text-align: right;">{{infolist.module}}</view>
					<view style="width: 25%;text-align: right;">{{infolist.strength}}</view>
				</view>
				<view class="mtap" v-if="showclass=='1'&&mtype!='B4'">
					<view :class="tapclass=='1'?'mchu':'mchu1'" @click="handbtn(1)">
						充满自停
					</view>
					<view :class="tapclass=='2'?'mchu':'mchu1'" @click="handbtn(2)">
						4小时
					</view>
					<view :class="tapclass=='3'?'mchu':'mchu1'" @click="handbtn(3)">
						6小时
					</view>
					<view :class="tapclass=='4'?'mchu':'mchu1'" @click="handbtn(4)">
						8小时
					</view>
					<view :class="tapclass=='5'?'mchu':'mchu1'" @click="handbtn(5)">
						10小时
					</view>
					<view :class="tapclass=='6'?'mchu':'mchu1'" @click="handbtn(6)">
						<view v-if="tapclass!='6'">自定义</view>
						<view class="shuc" v-if="tapclass=='6'">
							<input type="number" v-model="handshu" placeholder="0" @input="onInput" />
							<view style="width: 40%;">小时</view>
						</view>
					</view>
				</view>
				<view class="mtap" v-if="showclass=='4'">
					<view :class="tapclass=='1'?'mchu':'mchu1'" @click="handbtn(1)">
						充满自停
					</view>
				</view>
				<view class="mtap" v-if="showclass=='1'&&mtype=='B4'">
					<view>
						<view :class="tapclass2==firstOne?'mchu':'mchu1'" @click="handbtn2(firstOne)">
							{{firstOne}}元
							<view class="mfx" v-if="disFirstOne">优惠:{{disFirstOne*100}}%</view>
						</view>

					</view>
					<view>
						<view :class="tapclass2==secondOne?'mchu':'mchu1'" @click="handbtn2(secondOne)">
							{{secondOne}}元
							<view class="mfx" v-if="disSecondOne">优惠:{{disSecondOne*100}}%</view>
						</view>
					</view>

					<view>
						<view :class="tapclass2==thirdOne?'mchu':'mchu1'" @click="handbtn2(thirdOne)">
							{{thirdOne}}元
							<view class="mfx" v-if="disThirdOne">优惠:{{disThirdOne*100}}%</view>
						</view>


					</view>

					<view>
						<view :class="tapclass2==fourthOne?'mchu':'mchu1'" @click="handbtn2(fourthOne)">
							{{fourthOne}}元
							<view class="mfx" v-if="disFourthOne">优惠:{{disFourthOne*100}}%</view>
						</view>


					</view>

					<view>
						<view :class="tapclass2=='a'?'mchu':'mchu1'" @click="handbtn2('a')"
							style="margin-right: 224upx;">
							<view v-if="tapclass2!='a'">自定义</view>
							<view class="shuc" v-if="tapclass2=='a'">
								<input type="number" v-model="handm" @input="onInput1" placeholder="0"
									style="width: 60%;" />
								<view style="width: 40%;">元</view>
							</view>
							<view class="mfx" v-if="dishandm">优惠:{{dishandm*100}}%</view>
						</view>

					</view>

				</view>
				<view class="mtap" v-if="showclass=='2'">
					<view>
						<view :class="tapclass1=='1'?'mchu':'mchu1'" @click="handbtn1(1)">
							{{first}}元
							<view class="mfx" v-if="temporaryDisFirst">优惠:{{temporaryDisFirst*100}}%</view>
						</view>

					</view>
					<view>
						<view :class="tapclass1=='2'?'mchu':'mchu1'" @click="handbtn1(2)">
							{{second}}元
							<view class="mfx" v-if="temporaryDisSecond">优惠:{{temporaryDisSecond*100}}%</view>
						</view>

					</view>
					<view>
						<view :class="tapclass1=='3'?'mchu':'mchu1'" @click="handbtn1(3)">
							{{third}}元
							<view class="mfx" v-if="temporaryDisThird">优惠:{{temporaryDisThird*100}}%</view>
						</view>

					</view>

					<view>
						<view :class="tapclass1=='4'?'mchu':'mchu1'" @click="handbtn1(4)">
							{{fourth}}元
							<view class="mfx" v-if="temporaryDisFourth">优惠:{{temporaryDisFourth*100}}%</view>
						</view>

					</view>

				</view>
				<view class="tishi" v-if="showclass=='2'">
					<view v-for="(item, index) in temporaryList" :key="index">
						<view v-if="item.minPower!=item.maxPower">
							{{item.minPower}}瓦-- {{item.maxPower}}瓦{{item.standard}}元/小时,当前金额可充约
							<span style="color:#007AFF">{{((hsmoney/item.standard)*(1+hsfl)).toFixed(2)}}</span>小时
							<span v-if='hsfl'>,含赠送<span
									style="color:#007AFF">{{((hsmoney/item.standard)*hsfl).toFixed(2)}}</span>小时</span>

						</view>
						<view v-if="item.minPower==item.maxPower">
							{{item.maxPower}}瓦以上{{item.standard}}元/小时,当前金额可充约<span
								style="color:#007AFF">{{((hsmoney/item.standard)*(1+hsfl)).toFixed(2)}}</span>小时
							<span v-if='hsfl'>,含赠送<span
									style="color:#007AFF">{{((hsmoney/item.standard)*hsfl).toFixed(2)}}</span>小时</span>

						</view>

					</view>
					<view v-if="isFund==0" style="color: #FFA02E;">充电过程中如果中断充电{{ lscmchecked ? '或充满自停' : ''}}，不会退还剩余费用
					</view>
					<view v-if="isFund==1" style="color: #FFA02E;">
						充电过程中如果中断充电{{ lscmchecked ? '或充满自停' : ''}}，则会在6小时内退还剩余费用</view>
				</view>
				<view class="xza"
					v-if="isSpan==false&&showclass==1&&(mtype=='B2'||mtype=='B5')&&projectServiceDetailList.length>0">
					<view class="xza1">服务费
						<span v-if='xzchecked==1&&endTimeStr'>--服务费套餐截止：{{endTimeStr}}</span>
						<span v-if="xzchecked==2&&fuwumoney&&mtype=='B2'">--单次服务费金额：{{fuwumoney}}元/小时</span>
						<span v-if="xzchecked==2&&fuwumoney&&mtype=='B5'">--单次服务费金额：{{fuwumoney}}元/度</span>
						<!-- <span v-if='xzchecked==2&&fuwumoney&&mtype==B2'>--单次服务费金额：{{fuwumoney}}元/小时</span>
					<span v-if='xzchecked==2&&fuwumoney&&(mtype=='B5')'>--单次服务费金额：{{fuwumoney}}元/度</span> -->
					</view>
					<van-radio-group v-model="xzchecked" direction="horizontal" @change="go1btn">
						<van-radio name="1" :class="xzchecked==1?'xzb1':'xzb2'">套餐支付</van-radio>
						<van-radio name="2" :class="xzchecked==2?'xzb1':'xzb2'">单次支付</van-radio>
					</van-radio-group>
				</view>
				<view :class="onecmchecked==false?'tishi2':'tishi3'"
					v-if="isAutoStopOne==1&&showclass=='1'&&mtype=='B4'" style="border: 2upx solid #EC651C;">
					<van-checkbox :value="onecmchecked" shape="square" class="reset" @change="axbtn"></van-checkbox>
					<view style='margin-left: 30upx;'>
						<view style='color: #fff;'>充满自停</view>
					</view>
				</view>
				<view :class="lscmchecked==false?'tishi2':'tishi3'" v-if="temporaryIsAutoStop==1&&showclass=='2'"
					style="border: 2upx solid #EC651C;">
					<van-checkbox :value="lscmchecked" shape="square" class="reset" @change="cxbtn"></van-checkbox>
					<view style='margin-left: 30upx;'>
						<view style='color: #fff;'>充满自停</view>
					</view>
				</view>
				<view :class="longcheck==false?'tishi2':'tishi3'" v-if="longshow==true&&showclass!=4"
					style="border: 2upx solid #EC651C;">
					<van-checkbox v-model="longcheck" shape="square" class="reset" @change="dxbtn"></van-checkbox>
					<view style='margin-left: 30upx;'>
						<view style='color: #fff;align-items: center;display: flex;'>长充模式<van-icon name="question-o"
								color="rgb(255, 160, 46)" style="margin-left: 20rpx;" @click='changbtn' /></view>
					</view>
				</view>
				<view :class="checked==false?'tishi5':'tishi4'" v-if="infolist.transfer==1&&reassuring==0"
					style="border: 2upx solid #EC651C;">
					<van-checkbox v-model="checked" shape="square" class="reset" @change='bxbtn'></van-checkbox>
					<view style='margin-left: 30upx;'>
						<view style='color: #fff;'>充电守护 ¥{{infolist.safeMoney}}<span
								style='color: #FFA02E;margin-left: 20upx;border-bottom: 2upx solid;'
								@click='bxxy'>《协议说明》</span></view>
						<view style='font-size:24upx;'>充电过程中自燃,最高可享{{infolist.bigMoney}}元补偿金</view>
					</view>
					<image src="../../static/tabBarimg/bxhand.png"></image>
				</view>
				<view class="tishi6" style="border: 2upx solid #EC651C;"
					v-if="infolist.safeAllStafus==1&&infolist.monthSafe==1&&infolist.isMonthBye==false&&reassuring==0"
					@click="openwxts">
					<view>
						<view style="color: #FFFFFF;font-size: 32upx;">充电守护VIP</view>
						<view style="color: #FFA02E;font-size: 24upx">30天不限次数</view>
					</view>
					<view class="tishi6txt">
						<view class="tishi6txtone">原价 ¥ {{shbylist.monthOriginal}}</view>
						<view> ¥ {{shbylist.monthPrice}}</view>
					</view>
					<view class="vipimg">立减 ¥ {{(shbylist.monthOriginal-shbylist.monthPrice).toFixed(2)}}</view>
				</view>
				<view class="tishi7" v-if="infolist.isMonthBye==true">
					<view class="tishi7one">
						<image src="../../static/tabBarimg/zuanshi.png"></image>充电守护服务保障中
					</view>
					<view class="tishi7two" @click="vipgo">
						剩余{{infolist.difDate}}天
					</view>
				</view>
				<view :class="xychecked==false?'tishi2':'tishi3'" v-if="xieyidata.display==1"
					style="border: 2upx solid #EC651C;">
					<van-checkbox v-model="xychecked" shape="square" class="reset" @change="exbtn"></van-checkbox>
					<view style='margin-left: 30upx;'>
						<view style='color: #fff;'>我已阅读并同意<span
								style='color: #FFA02E;margin-left: 20upx;border-bottom: 2upx solid;'
								@click='clshow'>《{{xieyidata.agreementName}}》</span></view>
					</view>
				</view>
				<view class="tishi1">
					<view>安全提醒：请使用符合电动车厂家要求的充电器和电池进行充电，严禁任何私自改装车辆在本场地进行充电，否则造成的事故责任自行承担。</view>
					<view class="tishi1tap">
						<image src="../../static/tabBarimg/ztone.png"></image>什么是充满自停？<span
							@click="cmtap=true">《查看详情》</span>
					</view>
				</view>
			</view>
			<view class="lun">
				<an-notice-bar :text="noticeMsg" color="#FFFFFF" bgColor="#343136"></an-notice-bar>
			</view>
			<view class="lun" v-if="occtype==1" @click="occbtn">
				<van-notice-bar left-icon="volume-o" scrollable :text="cdgnum" />
			</view>
			<view class="mshow">
				<view class="mslist">
					<view class="msleft">跨区消费:</view>
					<view class="msright" v-if="isSpan==false">本区</view>
					<view class="msright" v-if="isSpan==true" style="color:#FFA02E;">跨区</view>
				</view>
				<view class="mslist" v-if="showclass!=4">
					<view class="msleft">计费模式:</view>
					<view class="msright" v-if="showclass==1">
						{{onetype}}
					</view>
					<view class="msright" v-if="showclass==2">{{twotype}}</view>
					<view class="msright" v-if="showclass==3">{{threetype}}</view>

				</view>
				<view class="mslist" v-if="showclass!=4">
					<view class="msleft">查看费率:</view>
					<view class="msright" @click="flshowopen" style="color:#FFA02E;">点此查看费率</view>
				</view>
				<view class="mslist">
					<view class="msleft">小区名称:</view>
					<view class="msright">{{infolist.projectName}}</view>
				</view>
				<view class="mslist">
					<view class="msleft">充电区名称:</view>
					<view class="msright">{{infolist.areaName}}</view>
				</view>
				<view class="mslist">
					<view class="msleft">电话客服:</view>
					<view class="msright" @click="callphone(infolist.phone)" style="color: #FFA02E;">{{infolist.phone}}
					</view>
				</view>
				<view class="mslist">
					<view class="msleft">微信客服:</view>
					<view class="msright" style="color: #FFA02E;" @click="wxshowopen">点此马上联系</view>
				</view>
			</view>

		</view>
		<view class="dbtap" @click="faultshowopen">
			如果该设备不能正常使用，<span style="color: #FFA02E;">点此故障报修</span>告诉我们，我们尽快维修处理
		</view>
		<!-- <view class="buyby" @click="buyby" v-if="bytype=='A1'||bytype=='A3'">购买包月</view> -->
		<view class="double"
			v-if="infolist.isMonthBye==false&&infolist.safeAllStafus==1&&reassuring==0&&((infolist.transfer==1&&infolist.monthSafe==1)||(infolist.transfer==1&&infolist.monthSafe==0)||(infolist.transfer==0&&infolist.monthSafe==1))">
			<view class="leftbtn" @click="czbtn">账户充值</view>
			<view class="rightbtn" @click="cdbtn()"
				v-if="infolist.displayButton==0&&((infolist.transfer==1&&infolist.monthSafe==1)||(infolist.transfer==1&&infolist.monthSafe==0))">
				<image src="../../static/tabBarimg/dian.png" v-if="bxname=='充电守护'"></image>{{bxname}}
			</view>
			<view class="zhongbtn"
				v-if="infolist.displayButton==1&&((infolist.transfer==1&&infolist.monthSafe==1)||(infolist.transfer==1&&infolist.monthSafe==0))">
				<view class="zhongbtnone" v-if="checked==false" @click="cdbtn()">
					立即充电
				</view>
				<view class="zhongbtntwo" v-if="checked==false" @click="cdbtn(1)">
					<image src="../../static/tabBarimg/dian.png"></image>守护充电
				</view>
				<view class="zhongbtnthree" v-if="checked==true" @click="cdbtn(1)">
					<image src="../../static/tabBarimg/dian.png"></image>守护充电
				</view>
			</view>
			<view class="zhongbtn" v-if="infolist.transfer==0&&infolist.monthSafe==1">
				<view class="zhongbtnthree" @click="cdbtn()">
					立即充电
				</view>
			</view>
		</view>
		<view class="double"
			v-if="infolist.isMonthBye==false&&((infolist.transfer==0&&infolist.monthSafe==0)||(infolist.safeAllStafus==0)||(reassuring==1)||(reassuring==0&&infolist.safeAllStafus==0))">
			<view class="leftbtn" @click="czbtn">账户充值</view>
			<view class="rightbtn" @click="cdbtn()">
				{{bxname}}
			</view>
		</view>
		<view class="double" v-if="infolist.isMonthBye==true">
			<view class="leftbtn" @click="czbtn">账户充值</view>
			<view class="zhongbtn">
				<view class="zhongbtnthree" @click="cdbtn(1)">
					<image src="../../static/tabBarimg/dian.png"></image>守护充电
				</view>
			</view>
		</view>
		<view class="tan">
			<!-- //提示信息弹窗 -->
			<van-popup :show="show" :close-on-click-overlay="false">
				<view class="tannei">
					<view class="tnhand">
						温馨提示
					</view>
					<view class="tnfoot" v-if="tanshow==1">
						<view class="tftxt">该设备{离线断网}，暂不可用，你可以: </view>
						<view class="tftxt">1、使用“验证码"充电;</view>
						<view class="tftxt">2、到“附近充电区"充电</view>
						<view class="tfshow">
							<view class="tfbtn color1" @click="showbtn">取消</view>
							<view class="tfbtn color2" @click="twoshowopen">验证码充电</view>
							<view class="tfbtn color3">附近电区</view>
						</view>
					</view>
					<view class="tnfoot" v-if="tanshow==2">
						<view class="tftxt">该设备{离线断网}，暂不可用，你可以: </view>
						<view class="tftxt">使用“验证码"充电;</view>
						<view class="tfshow">
							<view class="tfbtn1 color1" @click="showbtn">取消</view>
							<view class="tfbtn1 color2" @click="twoshowopen">验证码充电</view>
						</view>
					</view>
					<view class="tnfoot" v-if="tanshow==3">
						<view class="tftxt">该设备{离线断网}，暂不可用,</view>
						<view class="tftxt">请到“附近充电区"充电</view>
						<view class="tfshow">
							<view class="tfbtn1 color1" @click="showbtn">取消</view>
							<view class="tfbtn1 color3" @click="nearbtn">附近电区</view>
						</view>
					</view>
					<view class="tnfoot" v-if="tanshow==4">
						<view class="tftxt">{{fourmsg}}</view>
						<view class="tfshow">
							<view class="tfbtn2 color3" @click="showbtn">确定</view>
						</view>
					</view>
				</view>
			</van-popup>
			<!-- //查看费率弹窗 -->
			<van-popup :show="flshow">
				<view class="tannei1">
					<view class="tnhand">
						<view class="tntxt">查看费率</view>
						<image src="../../static/tabBarimg/shanchu.png" @click="flshowclose"></image>
					</view>
					<view class="tnfoot">
						<view class="tfshang">当前充电桩费率如下:</view>
						<view class="tfxia">
							<view v-for="(item, index1) in oftenList" :key="index1" v-if="showclass==1">
								<view v-if="item.types=='B2'">
									电费:{{item.standard}}元/度
								</view>
								<view v-if="item.types=='B5'">
									电费:{{item.standard}}元/度
								</view>
								<view v-if="item.types=='B1'">
									<view v-if="item.minPower!=item.maxPower">
										{{item.minPower}}瓦--{{item.maxPower}}瓦{{item.standard}}元/小时
									</view>
									<view v-if="item.minPower==item.maxPower">
										{{item.maxPower}}瓦以上{{item.standard}}元/小时
									</view>
								</view>
								<view v-if="item.types=='B3'">
									<view v-if="item.minPower!=item.maxPower">
										{{item.minPower}}瓦--{{item.maxPower}}瓦{{item.standard}}元/次
									</view>
									<view v-if="item.minPower==item.maxPower">{{item.maxPower}}瓦以上{{item.standard}}元/次
									</view>
								</view>
								<view v-if="item.types=='B4'">
									<view v-if="item.minPower!=item.maxPower">{{item.minPower}}瓦--{{item.maxPower}}瓦
										1元{{item.standard}}小时</view>
									<view v-if="item.minPower==item.maxPower">{{item.maxPower}}瓦以上
										1元{{item.standard}}小时</view>
								</view>
							</view>
							<view v-for="(item, index2) in temporaryList" :key="index2" v-if="showclass==2">
								<view v-if="item.minPower!=item.maxPower">
									{{item.minPower}}瓦--{{item.maxPower}}瓦{{item.standard}}元/小时
								</view>
								<view v-if="item.minPower==item.maxPower">{{item.maxPower}}瓦以上{{item.standard}}元/小时
								</view>
							</view>
							<view v-for="(item, index3) in monthlyList" :key="index3" v-if="showclass==3">
								<view v-if="item.types=='A1'">
									<view>{{item.standard}}元/{{item.numStr}}小时/月</view>
								</view>
								<view v-if="item.types=='A3'">

									<view>{{item.standard}}元/{{item.numStr}}次/月</view>
								</view>
								<view v-if="item.types=='A4'">
									<view v-if="item.minPower!=item.maxPower">
										{{item.minPower}}瓦--{{item.maxPower}}瓦{{item.standard}}元/月(共{{item.numStr}}小时)
									</view>
									<view v-if="item.minPower==item.maxPower">
										{{item.maxPower}}瓦以上{{item.standard}}元/月(共{{item.numStr}}小时)
									</view>
								</view>
								<view v-if="item.types=='A6'">
									<view v-if="item.minPower!=item.maxPower">
										{{item.minPower}}瓦--{{item.maxPower}}瓦{{item.standard}}元/月(共{{item.numStr}}次)
									</view>
									<view v-if="item.minPower==item.maxPower">
										{{item.maxPower}}瓦以上{{item.standard}}元/月(共{{item.numStr}}次)
									</view>
								</view>
								<view v-if="item.types=='A5'">
									<view v-if="item.minPower!=item.maxPower">
										{{item.minPower}}瓦--{{item.maxPower}}瓦{{item.standard}}元/月({{item.numStr}}小时/天)
									</view>
									<view v-if="item.minPower==item.maxPower">
										{{item.maxPower}}瓦以上{{item.standard}}元/月({{item.numStr}}小时/天)
									</view>
								</view>
								<view v-if="item.types=='A7'">
									<view v-if="item.minPower!=item.maxPower">
										{{item.minPower}}瓦--{{item.maxPower}}瓦{{item.standard}}元/月({{item.numStr}}次/天)
									</view>
									<view v-if="item.minPower==item.maxPower">
										{{item.maxPower}}瓦以上{{item.standard}}元/月({{item.numStr}}次/天)
									</view>
								</view>
							</view>
							<view v-show="showclass==1&&mtype=='B2'&&steps.length>0" style="color: #F08300;">
								服务费费率:
								<view>
									<view v-show="item1.minPower!=item1.maxPower" v-for="(item1, index1) in steps" :key="index1">
										{{item1.minPower}}瓦--{{item1.maxPower}}瓦{{item1.standard}}元/小时
									</view>
									<view v-show="item1.minPower==item1.maxPower" v-for="(item1, index1) in steps" :key="index1">
										{{item1.maxPower}}瓦以上{{item1.standard}}元/小时
									</view>
								</view>
							</view>
							<view v-if="showclass==1&&mtype=='B5'" style="color: #F08300;">
								服务费费率:{{fwnum}}元/度
							</view>
							<view v-if="showclass==1&&mtype!='B4'" style="color: #EC651C;">
								最低消费:￥{{oftenMinMoney}}元
							</view>
							<view v-if="showclass==2" style="color: #EC651C;">
								最低消费:￥{{temporaryMinMoney}}元
							</view>
							<view v-if="deviceId.substr(-2,1)==9">
								<view v-if="showclass==1">
									<view>占位费免费时长(小时):{{oftenOccupyFree}}</view>
									<view>占位费封顶金额:￥{{oftenOccupyMax}}元</view>
									<view>占位费率:{{oftenOccupyRate}}</view>
									<view v-if="oftenOccupyFreeTime.length>0">免费时间段</view>
									<view v-for="(itemo, indexo) in oftenOccupyFreeTime" :key="indexo"
										v-if="oftenOccupyFreeTime.length>0">
										<view>{{itemo.minTime}}点~{{itemo.maxTime}}点</view>
									</view>
								</view>
								<view v-if="showclass==2">
									<view>占位费免费时长(小时):{{temporaryOccupyFree}}</view>
									<view>占位费封顶金额:￥{{temporaryOccupyMax}}元</view>
									<view>占位费率:{{temporaryOccupyRate}}</view>
									<view v-if="temporaryOccupyFreeTime.length>0">免费时间段</view>
									<view v-for="(itemt, indext) in temporaryOccupyFreeTime" :key="indext"
										v-if="temporaryOccupyFreeTime.length>0">
										<view>{{itemt.minTime}}点~{{itemt.maxTime}}点</view>
									</view>
								</view>
								<view v-if="showclass==3">
									<view>占位费免费时长(小时):{{monthlyOccupyFree}}</view>
									<!-- <view>占位费封顶金额:￥{{monthlyOccupyMax}}元</view> -->
									<view>占位费率:{{monthlyOccupyRate}}</view>
									<view v-if="monthlyOccupyFreeTime.length>0">免费时间段</view>
									<view v-for="(itemm, indexm) in monthlyOccupyFreeTime" :key="indexm"
										v-if="monthlyOccupyFreeTime.length>0">
										<view>{{itemm.minTime}}点~{{itemm.maxTime}}点</view>
									</view>
								</view>
							</view>
						</view>
						<view class="tfxia" style="color: #EC651C;" v-if="mtype=='B1'&&showclass=='1'">
							1、开始充电5分钟内终止充电不计费；
							<!-- <br />2、开始计费后不足30分钟按30分钟计费； -->
						</view>
						<view v-if="flremarks1&&showclass==1">
							<view class="tfshang1">温馨提示:</view>
							<view class="tfxia1">{{flremarks1}}</view>
						</view>
						<view v-if="flremarks2&&showclass==2">
							<view class="tfshang1">温馨提示:</view>
							<view class="tfxia1">{{flremarks2}}</view>
						</view>
						<view v-if="flremarks3&&showclass==3">
							<view class="tfshang1">温馨提示:</view>
							<view class="tfxia1">{{flremarks3}}</view>
						</view>

					</view>
				</view>
			</van-popup>
			<!-- //微信二维码弹窗 -->
			<van-popup :show="wxshow">
				<view class="tannei1">
					<view class="tnhand">
						<view class="tntxt">客服微信</view>
						<image src="../../static/tabBarimg/close.png" @click="wxshowclose"></image>
					</view>
					<view class="tnfoot">
						<view class="wxcodeimg">
							<image :src=erimg></image>
						</view>
						<view class="wxtxt">
							长按可以识别二维码，可以直接加微信客服沟通哦
						</view>
					</view>
				</view>
			</van-popup>
			<!-- //验证码弹窗提示 -->
			<van-popup :show="twocodeshow">
				<view class="tannei2">
					<view class="tnhand">
						<view class="tntxt">提示</view>
						<image src="../../static/tabBarimg/close.png" @click="twoshowclose"></image>
					</view>
					<view class="tnfoot">
						<view class="yancodetxt">
							当前设备断网，请使用验证码充电!
						</view>
						<view class="yannum">
							{{yzcode}}
						</view>
						<!-- <view class="yztap">
							<view class="yanbtn" v-if="Verification" @click="handleClick">获取验证码</view>
							<view class="yanbtn" v-if="!Verification"><span>{{timer}}</span>s</view>
						</view> -->
						<view class="yzhand">
							操作说明
						</view>
						<view class="yzfoot">
							<view class="tzfootleft">
								<image src="../../static/tabBarimg/btnnum.png"></image>
							</view>
							<view class="tzfootright">
								1点击上方的获取验证码;<br />
								2点击设备的取消健返回初始界面;<br />
								3.在设备键盘上输入验证码编号;<br />
								4输入完之后请点击确认按钮:
							</view>
						</view>
					</view>
				</view>
			</van-popup>
			<!-- //端口选择弹窗提示 -->
			<van-popup :show="duanshow" :close-on-click-overlay='false'>
				<view class="tannei2">
					<view class="tnhand">
						<view class="tntxt">选择端口</view>
					</view>

					<view class="tnfoot">

						<view class="duanlist">
							<view :class="mshow==index?'duantap':'duantap1'" v-for="(item, index) in montlist"
								:key="index" @click="montbtn(index)">
								{{item}}
							</view>
						</view>

					</view>
					<view class="tnhand" v-if='showclass==2' style="height: 100%;">
						<view class="tntxt">请选择端口进行充电,或点击取消进行退款,退出页面将延迟退款</view>
					</view>
					<view class="tfshow">
						<view class="tfbtn1" @click="duanshowclose"><span v-if='showclass==2'>取消并退款</span><span
								v-if='showclass==1||showclass==3'>取消</span></view>
						<view class="tfbtn1" style="color: #EC651C;margin-left: 40upx;" @click="dkshowbtn">确认</view>
					</view>
				</view>
			</van-popup>
			<!-- //初始化ff端口选择弹窗提示 -->

			<van-popup :show="oneshow" :close-on-click-overlay="false">
				<view class="tannei2">
					<view class="tnhand">
						<view class="tntxt">选择端口</view>
					</view>
					<view class="tnfoot">
						<view class="tfone">
							<view class="tftwo">设备编号：{{ sixnum }}</view>
							<view class="tftwo">请选择插座编号(充电器所插入的编号);</view>
						</view>

						<view class="duanlist1">
							<view v-for="(item, index) in onelist" :key="index" @click="montbtn1(index, item.status)">
								<view v-if="item.status && item.status == '空闲'" :class="
                    chooesPortList.includes(index) && isAll
                      ? ' duantap1 port0 activePort'
                      : 'duantap1 port0 '
                  ">
									<view>{{ item.port }}</view>
									<view>{{ item.status }}</view>
								</view>
								<view v-if="item.status && item.status == '禁用'" class="duantap1 port7">
									<view>{{ item.port }}</view>
									<view>{{ item.status }}</view>
								</view>
								<view v-if="item.status && item.status == '绑定'" class="duantap1 port88">
									<view>{{ item.port }}</view>
									<view>{{ item.status }}</view>
								</view>
								<view v-if="item.status && item.status == '充电中'" class="duantap1 port4">
									<view>{{ item.port }}</view>
									<view>{{ item.status }}</view>
								</view>
								<view v-if="item.status && item.status == '已充满'" class="duantap1 port3">
									<view>{{ item.port }}</view>
									<view>{{ item.status }}</view>
								</view>
								<view v-if="!item.status" class="duantap1"
									style="color: #6f6f6f; border-color: #6f6f6f">
									<view style="line-height: 88upx">{{ item.port }}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="flex">
						<view class="tquxiao">
							<view @click="back">取消</view>
						</view>
						<view class="tquxiao" v-if="isAll">
							<view @click="open">开门</view>
						</view>
						<view class="open" v-if="isAll">
							<view @click="oneKeyOpen">一键开门</view>
						</view>
					</view>
				</view>
			</van-popup>
			<!-- //故障报修弹窗 -->
			<van-popup :show="faultshow">
				<view class="tannei2">
					<view class="tnhand">
						<view class="tntxt">故障维修</view>
						<image src="../../static/tabBarimg/close.png" @click="faultshowclose"></image>
					</view>
					<view class="kshow">
						<view class="kone">
							<input placeholder="设备编号" v-model="sbnum" />
						</view>
						<view class="ktwo">
							<van-collapse :value="activeNames" @change='onchange'>
								<van-collapse-item :title=reason name="1" :title-class="classtap">
									<van-radio-group :value="radio1" @change="gobtn">
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
							<view class="kthreehand">
								故障描述：<span class="khtxttwo">（200字以内）</span>
							</view>
							<view class="kthreefoot">
								<van-field :value="message" rows="2" autosize type="textarea" maxlength="200"
									@change='txtchange' />
							</view>
						</view>
						<view class="kfour">
							<view class="kfourtxt">
								图片上传：<span class="kfourbud">限制3张</span>
							</view>
							<view class="kfourfoot">
								<view class="add-img-box">
									<view class="add-img-item" v-for="(item, index) in imgList" :key="index">
										<image class="add-img" @click="imgInfo(index)" :src="item.path"
											mode="aspectFill"></image>
										<image class="add-img-del" @click="delImg(index)"
											src="../../static/tabBarimg/delete.png"></image>
									</view>
									<view v-if="imgList.length < 3 " class="add-img-item" @click="openCamera">
										<image class="add-img" src="../../static/tabBarimg/add.png"></image>
									</view>
								</view>
							</view>
						</view>
						<view class="kbtn" @click="kbtngo">
							确认
						</view>
					</view>
				</view>
			</van-popup>
			<!-- 提交错误 -->
			<van-popup :show="tishishow">
				<view class="tishione" @click="kbtngoclose">
					您的故障报修已成功提交，我们会尽快派人跟进和处理，处理结果我们会微信通知您，如需充电请更换另外一台设备，感谢您的支持和配合；
				</view>
			</van-popup>
			<!-- 新人指引弹窗 -->
			<van-popup :show="gbshow" :close-on-click-overlay="false">
				<view class="tanshi" style="padding: 70upx 0;">
					<view class="xz">

						<view class="xzone" style="font-size: 30upx;">您选择的包月充电套餐与功率不一致,继续充电可能会断电,确认继续充电吗？</view>
						<view class="xztwo" style="font-size: 26upx;" @click="bygo">点击立刻升级套餐>>></view>

					</view>
					<view class="anniu" style="margin-top: 80upx;">
						<view class="anniu1" @click="bycolose">取消</view>
						<view class="anniu1" @click="byque">确认</view>
					</view>
				</view>

			</van-popup>


			<!-- 新人指引弹窗 -->
			<van-popup :show="dshow" :close-on-click-overlay="false">
				<view class="tanshi">
					<view class="xz">
						<image src="../../static/tabBarimg/dcar.png"></image>
						<view class="xzone">欢迎使用智能充电充电系统</view>
						<view class="xztwo">接下来</view>
						<view class="xztwo">我们将为您展示一些重要功能的操作指引</view>
						<view class="xzthree">再次查看,请进入"个人中心-使用帮助-操作指引"</view>
					</view>
					<view class="anniu">
						<view class="anniu1" @click="colosezhi">跳过</view>
						<view class="anniu1" @click="gozhi">接受</view>
					</view>
				</view>

			</van-popup>


			<van-popup :show="timeshow" :close-on-click-overlay='false'>
				<view class="tannei2">
					<view style="font-size: 30upx;font-weight: 700;text-align: center;margin: 20upx 0;">
						提示
					</view>
					<view
						style="font-size: 25upx;font-weight: 700;color: #555555;text-align: center;box-sizing: border-box;padding: 10upx 30upx;line-height: 50upx;">
						'温馨提示', 因网络原因，您此次充电可能不成功，
						如已开始充电，请留意随后的微信消息提示，如未开始充电，请重试一次<span style='color: red;'>(临时充电支付款项将在30分钟内退回)</span>
					</view>
					<view class="tfshow">
						<view class="tfbtn1 color1" @click="timebtn">取消</view>
						<view class="tfbtn1 color2" @click="timebtn">确认</view>
					</view>
				</view>
			</van-popup>
			<!-- //充值协议 -->

			<van-popup :show="cshow">
				<view class="czone">
					<view class="cznei">
						<view class="czneihand">
							协议
						</view>
						<view class="czneione">
							<view class="cztxtone">
								本服务协议（以下简称“本协议”），{{infolist.safeCompany}}充电平台用户（以下简称“您”），就您使用充电平台充电有关事宜所订立的有效合约。
								请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款。
								一旦您点击确认接收全部的条款和条件，即表示您已接受了以下所述的条款和条件，同意接受本协议约束。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您将无法订购使用充电守护服务。
							</view>
							<view class="cztxttwo">
								1. 定义
							</view>
							<view class="cztxtone">
								1.1
								充电守护：指您在充电平台进行充电的同时购买充电守护服务。充电守护不是保险，是为特定客户提供的一项有偿增值服务，充电平台据此支付的款项不是保险金，是您在充电平台进行充电的过程中，您的充电车辆发生自燃时支付的补偿金。
							</view>
							<view class="cztxtone">
								1.2 用户：是指在平台上发起充电服务需求的具有完全民事权利能力和行为能力的自然人。
							</view>
							<view class="cztxttwo">
								2. 服务购买方式
							</view>
							<view class="cztxtone">
								2.1
								用户在充电平台进行充电的同时购买充电守护服务。除本协议另有约定外，在您支付成功后，如充电的过程中您的充电车辆发生自燃，{{infolist.safeCompany}}需向您支付一定金额的补偿金。补偿金金额以在平台充电页面展示为准（补偿金金额上限为{{infolist.bigMoney}}元，如因自燃导致其他损失不在此补偿范围之内）。
							</view>
							<view class="cztxtone">
								2.2 仅充电页面可购买充电守护服务。
							</view>
							<view class="cztxtone">
								2.3 仅充电正常开启且充电过程中充电车辆发生自燃可执行赔付规则。
							</view>
							<view class="cztxttwo">
								3. 用户的权利和义务
							</view>
							<view class="cztxtone">
								3.1 充电守护服务售出后不可申请退款。
							</view>
							<view class="cztxtone">
								3.2 您因充电守护服务而获赔的补偿金，将支付至您的微信零钱包。
							</view>
							<view class="cztxtone">
								3.3 非人为因素（改装车辆等）、车辆电池和充电器质量问题等发生的充电过程中自燃可享受赔付的补偿金。
							</view>
							<view class="cztxtone">
								3.4 如您有采取欺骗方式获取补偿金的行为时，{{infolist.safeCompany}}有权要求您退回补偿金，并保留追究您法律责任的权力。
							</view>
							<view class="cztxttwo">
								4. 免责条款
							</view>
							<view class="cztxtone">
								4.1{{infolist.safeCompany}}依照法律规定履行基础保障义务，但对于下述原因导致的合同履行障碍、履行瑕疵、履行延后或履行内容变更等情形，{{infolist.safeCompany}}不支付补偿金：
							</view>
							<view class="cztxtone">
								4.1.1 因自然灾害、罢工、暴乱、战争、政府行为、司法行政命令等不可抗力因素；
							</view>
							<view class="cztxtone">
								4.1.2 因电力供应故障、通讯网络故障等公共服务因素或第三人因素；
							</view>
							<view class="cztxtone">
								4.1.3 在{{infolist.safeCompany}}已尽善意管理的情况下，因常规或紧急的设备与系统维护、设备与系统故障、网络信息与数据安全等因素。
							</view>
							<view class="cztxttwo">
								5. 法律适用和争议解决
							</view>
							<view class="cztxtone">
								5.1 本协议之订立、生效、解释、修订、补充、终止、执行与争议解决均适用中华人民共和国大陆地区法律。
							</view>
							<view class="cztxtone">
								5.2用户因充电守护服务有关的争议，由{{infolist.safeCompany}}与用户协商解决。协商不成时，任何一方均可向{{infolist.safeCompany}}所在地人民法院提起诉讼。
							</view>

						</view>
					</view>
					<view class="czdel" @click="cshowclose(2)">
						<image src="../../static/tabBarimg/delete.png"></image>
					</view>
				</view>
			</van-popup>
			<van-popup :show="gzshow">
				<view class="gztan">
					<view class="gztanimg">
						<image :src="wechaturl" />
						<!-- <img src='../../static/tabBarimg/00000006.jpg'></img> -->
					</view>
					<view class="gztantxt">
						长按识别二维码，关注公众号，接收充电消息通知
					</view>
				</view>
			</van-popup>
			<!-- //充值协议 -->
			<van-popup :show="cxyshow">
				<view class="czone">
					<view class="cznei">
						<view class="czneione">
							<view v-html="xieyidata.agreementContents"></view>
						</view>
					</view>
					<view class="czdel" @click="clshowclose">
						<image src="../../static/tabBarimg/delete.png"></image>
					</view>
				</view>
			</van-popup>
			<!-- //购买服务费套餐 -->
			<van-popup :show="fwtan">
				<view class="tannei2" style="padding: 20upx 0upx">
					<view class="tnhand">
						<image src="../../static/tabBarimg/shanchu.png" @click="fwfeiclose"
							style="width: 50upx;height: 50upx;"></image>
					</view>
					<view class="fwfei" v-for="(item, index) in projectServiceDetailList" :key="index">
						<view class="fwfeileft">{{item.rates}}元{{item.days}}天</view>
						<view class="fwfeiright" @click="buyfuwu(item.id)">购买</view>
					</view>
				</view>
			</van-popup>

			<van-popup :show="warnshow" :close-on-click-overlay='false'>

				<view class="xytanshi">
					<view class="shdun" v-if='warnshow'>
						<image src="../../static/tabBarimg/dun.png"></image>
					</view>
					<view class="plustore">
						<view class="plustoreone">已有<span>{{yonghunum}}</span>位用户购买了 充电守护</view>
						<view class="plustoretwo">选择守护充电，可防患于未“燃”哦</view>
					</view>
					<view class="pantap">
						<view class="pantapone" @click="bxcolose">普通充电</view>
						<view class="pantaptwo" @click="bxque">守护充电</view>
					</view>
				</view>
			</van-popup>
		</view>
		<view class="occtan">
			<van-popup :show="occshow" :close-on-click-overlay='false'>
				<view class="occmap">
					<view class="occfoot" v-for="(item, index) in occlist" :key="index">
						<view class="occfootone">
							<span>订单号:</span>{{item.orderNum}}
						</view>
						<view class="occfootone" style="display: flex;">
							<view><span>设备编号:</span>{{item.code}}</view>
							<view><span style="margin-left: 50upx;">端口号:</span>{{item.port}}</view>
						</view>

						<view class="occfootone">
							<span>开柜密码:</span>{{item.password}}
						</view>
					</view>
					<view class="occdibu">
						<view class="occdibuone" @click="know">
							我已知晓(不再提示)
						</view>
						<view class="occdibutwo" @click="knowclose">
							关闭
						</view>
					</view>
				</view>
			</van-popup>
		</view>
		<view class="shby">
			<van-popup :show="shbyshow" :close-on-click-overlay='false'>
				<view class="shbymap">
					<view class="shbymapone">
						<view>
							<view class="shbymaponehand">充电守护VIP</view>
							<image src="../../static/tabBarimg/vipsix.png" class="shbymaponehandimg"></image>
						</view>
						<view>
							<view class="shbymaponetap">
								<view class="smapleft">
									<view style="color:#4F3832;font-size: 36upx;font-weight: bold;">充电起火最高赔<span
											style="color: #EC651C;">{{infolist.bigMoney}}</span>元</view>
									<view style="color: #4F3832;font-size: 24upx;margin-top: 8upx;">购买充电守护VIP卡，每次充电都安心
									</view>
								</view>
								<view class="smapright">
									<image src="../../static/tabBarimg/shbydun.png"></image>
								</view>
							</view>
							<view class="shbymaponedi">
								<view class="smapdifirst">
									<view style="font-weight: bold;font-size: 28upx;color: #4F3832;">充电守护VIP</view>
									<view style="font-size: 20upx;color: #F96028;opacity: 1;">30天不限次数</view>
								</view>
								<view class="smapdisecond">
									<view class="smapdisecondtxt">原价￥{{shbylist.monthOriginal}}</view>
									<view>￥{{shbylist.monthPrice}}</view>
								</view>
								<view class="smapdithired">立减 ¥
									{{(shbylist.monthOriginal-shbylist.monthPrice).toFixed(2)}}
								</view>
							</view>
						</view>
					</view>
					<view class="shbymaptwo">
						<view class="shbymaptwofirst">一个月只需 ¥ {{shbylist.monthPrice}}元</view>
						<view class="shbymaptwosecond" @click="goshby">立即保障</view>
					</view>
					<view class="shbymapthree">
						<image src="../../static/tabBarimg/shbyclose.png" @click="shbygb"></image>
					</view>
				</view>
			</van-popup>
		</view>
		<view class="wxts">
			<van-popup :show="wxtsshow" :close-on-click-overlay='false'>
				<view class="wxtsmap">
					<view class="wxtsmapone">
						温馨提示
					</view>
					<view class="wxtsmaptwo">
						<span style="color: #3A4044;margin-right: 24upx;">请选择购买数量</span>
						<van-stepper v-model="wxtsnum" disable-input @change="wxtsChange" input-width="32px"
							button-size="25px" />
						<span style="color: #FA5A26;margin-left: 8upx;">{{wxtszj}}元</span>
					</view>
					<view class="wxtsmapthree">您正在购买充电守护VIP，确定购买吗？</view>
					<view class="wxtsmapfour">
						<view style="color: #3A4044;" @click="closewxts">取消</view>
						<view style="width: 1upx;height: 55upx;background: #EEEEEE;margin: 0 102upx;"></view>
						<view style="color: #EC651C;" @click="surewxts">确认</view>
					</view>
				</view>
			</van-popup>
		</view>
		<van-popup :show="checkPopup" class="check-popup">
			<view class="check-popup-icon"><van-icon name="cross" @click="checkPopup = false" /></view>
			<view class="title">温馨提示</view>
			<view class="content">检测到您的余额不足，当前余额为：<text
					style="color: red;">{{ Number(currentPay) ? currentPay : '' }}</text>元<br>请充值后再进行充电</view>
			<van-button color="#ff8330" class="check-popup-but" size="small" @click="goToPay">去充值</van-button>
		</van-popup>
		<view class="cmdibu">
			<van-popup :show="cmtap" position="bottom">
				<view style="width: 100%;box-sizing: border-box;padding: 36upx;" @click="cmtap=false">
					<view style="text-align: center;color: #111111;font-size: 34upx;font-weight: 700;">充满自停说明</view>
					<view style="color: #3A4044;font-size: 24upx;margin-top: 20upx;line-height: 40upx;">
						1.恒流充电阶段，充电器充电电流保持恒定，充入电量快速增加，电池电压上升；<br />
						2.恒压充电阶段，充电器充电电压保持恒定，充入电量继续增加，电池电压缓慢上升，充电电流下降；<br />
						3.浮充充电阶段，充电器充电电压保持为浮充电压<br />
						4.完成浮充且电池充满后，系统自动停止充电。
					</view>
				</view>
			</van-popup>
		</view>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</view>
</template>
<script>
	import {
		Config
	} from '../../common/Config.js'
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import clickThrottle from "../../common/clickThrottle.js"
	export default {
		components: {},
		data() {
			return {
				isAll: 0,
				currentPay: '',
				checkPopup: false,
				showclass: '1', //模式选择
				tapclass: '1', //小时选择
				tapclass2: '', //金额选择
				show: false, //提示弹窗显示
				tanshow: 1, //弹窗按钮显示
				flshow: false, //查看费率弹窗显示
				wxshow: false, //微信二维码弹窗显示
				erimg: '', //二维码图片
				twocodeshow: false, //验证码弹窗显示
				Verification: true, //通过v-if控制显示获取还是倒计时
				timer: 60, //定义初始时间为60s
				duanshow: false, //端口选择弹窗显示
				montlist: ['1号端口', '2号端口'],
				mshow: 0,
				mshow1: -1,
				faultshow: false, //故障报修弹窗显示
				radio: '1', //退款类型
				activeNames: [''],
				radio1: '', //退款原因
				message: '', //故障描述
				reason: '请选择故障类型',
				imgList: [],
				cloudimgList: [],
				imgCount: 3, //最多支持3张上传，可以修改
				tishishow: false,
				option: {}, //页面传参
				infolist: {}, //页面数据
				monthlyList: [], //包月费率详情数组
				temporaryList: [], //临时费率详情数组
				oftenList: [], //常用模式费率详情数组
				onetype: "", //常用计费模式
				twotype: "", //临时计费模式
				threetype: "", //包月计费模式
				minMoney: "", //最低消费金额
				time: 0, //选择的时长
				handshu: '', //手动输入时长
				handm: '', //手动输入金额
				dishandm: 0, //手动输入金额优惠率
				chargeType: "", //上电类型
				isSpan: '', //是否跨区
				numm: 0, //重连websocket的次数
				ws: null, //websocket连接成功的对象
				webIsTrue: false, //websocket是否连接
				timeId: 0,
				from: '', //标识  从哪跳过来的   1代表外部扫一扫 2代表内部扫一扫 或远程上电
				first: '', //临时第一档
				second: '', //临时第二档
				third: '', //临时第三档
				fourth: '', //临时第四档
				tapclass1: '1',
				areaId: '', //充电区ID
				projectId: '', //小区id
				yzcode: '', //验证码
				yzdata: {}, //获取验证码参数
				nearid: '', //跳转ID
				fourmsg: '', //500提示信息
				portnum: '', //端口号显示
				userId: '', //用户id
				amount: '', //临时充值金额
				rechargeNo: '', //临时充值订单号
				dknum: '00', //选择的端口号
				hat: [], //设备报修图片
				sbnum: '', //设备报修编号
				shebeino: '', //设备编号
				hsmoney: '', //选中金额
				hsfl: '', //选中费率
				flremarks1: '', //常用费率弹窗提示信息
				flremarks2: '', //临时费率弹窗提示信息
				flremarks3: '', //包月费率弹窗提示信息
				oftenMinMoney: '', //常用模式最低消费
				fwnum: '', //常用计量服务费费率
				steps:[],//常用计量服务费费率B2
				temporaryMinMoney: '', //临时模式最低消费
				deviceId: '', //16进制端口号
				noticeMsg: "",
				classtap: 'tclass',
				oneshow: false, //初始化ff端口选择
				onelist: [], //端口数据
				chooesPortList: [], //多选的端口数据

				oneport: '', //端口号
				sixnum: '', //转换后的设备号
				isFund: '', //是否临时退费
				posterList: [], //轮播图数组
				poster: 0,
				dshow: false, //指引提示
				mtype: '', //常用模式状态
				bytype: '', //包月模式状态
				firstOne: '', //一元第一档
				secondOne: '', //一元第二档
				thirdOne: '', //一元第三档
				fourthOne: '', //一元第四档
				disFirstOne: '', //一元第一档优惠率
				disSecondOne: '', //一元第二档优惠率
				disThirdOne: '', //一元第三档优惠率
				disFourthOne: '', //一元第四档优惠率
				temporaryDisFirst: '', //临时第一档优惠率
				temporaryDisSecond: '', //临时第二档优惠率
				temporaryDisThird: '', //临时第三档优惠率
				temporaryDisFourth: '', //临时第四档优惠率
				gbshow: false,
				timeshow: false,
				dgnum: '',
				occtype: 0, //是否有充电柜订单
				cdgnum: '', //充电柜未完成订单数量
				oftenOccupyFree: 0, //常用免费时长-小时（充电柜）
				oftenOccupyMax: 0, //常用占位费封顶金额
				oftenOccupyRate: 0, //常用占位费率（充电柜）
				temporaryOccupyFree: 0, //临时免费时长-小时（充电柜）
				temporaryOccupyMax: 0, //临时占位费封顶金额
				temporaryOccupyRate: 0, //临时占位费率（充电柜）
				monthlyOccupyFree: 0, //包月免费时长-小时（充电柜）
				monthlyOccupyMax: 0, //包月占位费封顶金额
				monthlyOccupyRate: 0, //包月占位费率（充电柜）
				wtype: 0, //未完成订单弹窗是否弹出
				logolist: '', //logo图片
				checked: true, //勾选
				isSafe: 0, //是否开启守护充电 0否1是
				bxname: '立即充电',
				cshow: false,
				yc: 0, //是否远程充电
				bhdk: '', //宝付端口
				refundId: 0, //退款定时
				gzshow: false,
				wechatLogo: '', //是否显示公众号二维码
				wechaturl: '', //是否显示公众号二维码
				xieyidata: {}, //用户协议
				cxyshow: false,
				xychecked: false,
				onecmchecked: false, //一元是否充满自停勾选
				isAutoStopOne: 0, //一元是否充满自停
				lscmchecked: false, //临充是否充满自停勾选
				temporaryIsAutoStop: 0, //临充是否充满自停
				longcheck: false, //是否开启长充模式
				longshow: false, //是否显示长充模式
				longCharge: 0,
				xcxtype: 1, //0小程序环境 1公众号环境
				xzchecked: '2', //1 服务费套餐 2单独收费
				fwtan: false, //服务费套餐弹窗
				serviceType: '', //服务费类型
				projectServiceDetailList: [], //服务费套餐列表
				endTimeStr: '', //计量服务费包月到期时间
				fuwumoney: '', //单次服务费金额
				isVIP: '', //VIP状态
				warnshow: false,
				yonghunum: '', //充电守护人数
				occlist: '', //用户强制结算的充电柜订单
				occshow: false,
				occas: 1,
				xuanbtn: '',
				burl: '',
				ontime: 0,
				temporaryDefaultAutoStop: 0, // 默认勾选充满自停
				shbyshow: false,
				wxtsshow: false,
				wxtsnum: 1,
				shbylist: {},
				wxtszj: 0,
				oftenOccupyFreeTime: [], //常用-免费时间段（充电柜）
				temporaryOccupyFreeTime: [], //临时-免费时间段（充电柜）
				monthlyOccupyFreeTime: [], //包月免费时间段（充电柜）
				cmtap: false,
				reassuring:'',//充电守护；0不屏蔽 1屏蔽
				postervip:'',//广告：0不屏蔽 1屏蔽
				point:'',
				ggshow:0,
				hasLoadedData: false // 标记是否已经加载过数据
			}
		},
		mounted() {

		},
		created() {
			// this.infoshow();
		},
		watch: {
			xzchecked(newcheck, old) {
				if (newcheck == '1' && !this.endTimeStr && this.projectServiceDetailList.length > 0) {
					this.fwtan = true
				}
			}
		},
		onShow() {
			// 检查登录状态
			if (!this.checkLoginStatus()) {
				return; // 如果未登录且用户选择不登录，则不执行后续逻辑
			}

			// 如果页面还没有加载过数据，说明是从登录页面返回，需要重新加载
			if (this.option && this.option.device && !this.hasLoadedData) {
				// 执行完整的页面初始化
				this.initPageData();
				this.loadPageData(this.option);
			} else if (this.hasLoadedData) {
				// 页面已经加载过，只更新用户相关的信息
				this.initPageData();
			}
		},
		onLoad(option) {
			// 保存页面参数
			this.option = option;

			// 检查登录状态
			const userToken = uni.getStorageSync('userToken');
			const user = uni.getStorageSync('user');

			if (!userToken || !user) {
				// 充电功能需要登录，显示登录提示
				this.$base.handleLoginRequired('charge');
				return;
			}

			// 用户已登录，执行正常的页面加载逻辑
			this.loadPageData(option);
		},
		beforeDestroy() {
			// 清除所有定时器
			if (this.timeId) {
				clearTimeout(this.timeId);
				this.timeId = null;
				console.log('清除timeId定时器');
			}

			if (this.refundId) {
				clearTimeout(this.refundId);
				this.refundId = null;
				console.log('清除refundId定时器');
			}

			// 关闭WebSocket连接
			if (this.webIsTrue) {
				this.ws.close();
				this.ws = null;
				console.log('关闭WebSocket连接');
			}

			// 处理临时充电模式下的退款
			if (this.showclass == 2 && this.duanshow == true) {
				clearTimeout(this.refundId);
				let data = {
					ornum: this.ornum
				}
				uni.showLoading({
					title: '请稍候',
					mask: true
				})
				this.$base.request('refund/refund', 'POST', data)
					.then(res1 => {
						if (res1.data.code == 200) {
							uni.hideLoading()
							Toast.success('退款成功')
							this.back()
						} else {
							Toast.fail(res1.data.msg)
							this.back()
						}
					})
					.catch(err => {

					})
			}

			// if(this.from=='1'){
			// 	WeixinJSBridge.call('closeWindow');
			// }
		},
		methods: {
			// 检查登录状态
			checkLoginStatus() {
				const userToken = uni.getStorageSync('userToken');
				const user = uni.getStorageSync('user');

				// 如果没有token或用户信息，需要登录
				if (!userToken || !user) {
					console.log('poweron页面：用户未登录，显示登录提示');
					// 充电功能需要登录
					this.$base.handleLoginRequired('charge');
					return false;
				}

				return true;
			},

			// 初始化页面数据
			initPageData() {
				try {
					const user = uni.getStorageSync('user');
					const userId = uni.getStorageSync('userId');

					this.reassuring = uni.getStorageSync('reassuring');
					this.postervip = uni.getStorageSync('postervip');
					this.point = uni.getStorageSync('point');
					this.wechatLogo = uni.getStorageSync('wechatLogo');
					this.wechaturl = uni.getStorageSync('wechaturl');
					this.poster = uni.getStorageSync('poster');

					// 处理logo显示
					if (userId) {
						var logolist = 'logolist_' + userId;
						var logo = uni.getStorageSync(logolist);
						if (logo) {
							this.logolist = logo;
						} else {
							this.logoshow();
						}
					}

					// 处理操作指引显示
					if (userId) {
						var usertype = 'type_' + userId;
						if (uni.getStorageSync(usertype) == 1) {
							this.dshow = false;
						} else if (uni.getStorageSync(usertype) == 0) {
							this.dshow = true;
						}
					}

					// 处理充电柜相关逻辑
					if (this.option && this.option.device && this.option.device.substr(-2, 1) == 9 && this.option.cmd != 1 && this.wtype == 0) {
						this.deviceId = this.option.device.toUpperCase();
						this.occfirst();
					}
				} catch (error) {
					console.error('poweron页面初始化数据时出错:', error);
				}
			},

			// 页面加载数据处理
			loadPageData(option) {
				// 标记数据已开始加载
				this.hasLoadedData = true;

				if (option.cmd === 0) {
					if (!uni.getStorageSync("isAlert")) {
						this.$base
							.request("user/info" + "/" + uni.getStorageSync("userId"), "GET")
							.then(res => {
								if (res.data.code == 200) {
									this.$nextTick(() => {
										const {
											isAlert,
											arrears
										} = res.data.data
										this.currentPay = arrears
										this.checkPopup = !!+isAlert
										uni.setStorageSync('isAlert', true)
									})
								}
							})
					}
				}
				this.xy()
				if (option.yc) {
					this.yc = option.yc
				} else {
					this.yc = 0
				}

				var sbno = this.option.device.substring(this.option.device.length - 2, this.option.device.length)
				if (this.option.cmd == 0 && sbno == '00') {
					var data = {
						portDevice: this.option.device
					}

					this.$base.request('charge/device', 'GET', data)
						.then(res => {
							if (res.data.code == 200) {
								this.option.device = res.data.data.deviceId
								this.option.port = res.data.data.ports
								this.showone()
							} else {
								Toast.fail('此二维码未绑定到充电桩！')
								this.back();
								return
							}
						})
						.catch(err => {

						})
				} else {
					this.showone()
				}
			},

			// 单次-计时模式上电前, 校验最大充电时长, code: 200-可以上电, code: 500-return无法上电
			checkMaxChargeTime({
				chargeTime,
				chargeType
			}) {
				// 非单次计时模式不进入判断
				if (chargeType !== 'B1') return {
					code: 200
				}
				return new Promise(async (reslove, reject) => {
					let data = {
						chargeTime,
						chargeType: 'B1',
						areaId: this.areaId,
						projectId: this.projectId
					}
					let res = await this.$base.request('charge/check/time', 'GET', data)
					const {
						code,
						msg
					} = res.data
					if (code === 200) return reslove({
						code: 200
					})

					const {
						errorType,
						maxChargeTime
					} = res.data.data
					if (errorType === 1) {
						Dialog.alert({
							title: '提示',
							message: msg,
							confirmButtonText: '前往充值'
						}).then(() => {
							this.goToPay()
							return reslove({
								code: 500
							})
						})
					}
					if (errorType === 2) {
						Dialog.confirm({
							title: '提示',
							message: msg,
							confirmButtonText: '继续',
							cancelButtonText: '前往充值'
						}).then(() => {
							return reslove({
								code: 200,
								maxChargeTime
							})
						}).catch(() => {
							this.goToPay()
							return reslove({
								code: 500
							})
						});
					}
				})
			},

			goToPay() {
				uni.navigateTo({
					url: `../account_recharge/account_recharge`,
				})
			},
			showone() {

				var fone = this.option.device.substring(this.option.device.length - 2, this.option.device.length)
				var ftwo = this.option.port
				this.dgnum = this.option.device.substr(-2, 1)
				this.bhdk = this.option.port
				if (((fone == '05' || fone == '06' || fone == '07') && (ftwo == 'ff' || ftwo == 'FF')) || (this.option
						.from == 3) || (this.dgnum == 9 && this.option.cmd == 0)) {
					if (this.dgnum != 9) {
						this.oneshow = true
					} else {
						if (this.option.cmd == 1) {
							this.oneshow = true
						}
					}
					var data = {
						fromType: this.option.from,
						deviceId: this.option.device
					}

					this.$base.request('charge/ports', 'GET', data)
						.then(res => {
							if (res.data.code == 200) {
								console.log('res.data', res.data)
								this.onelist = res.data.data.ports
								this.sixnum = res.data.data.device
								this.isAll = res.data.data.isAll;
							} else {
								Toast.fail('端口异常，请稍后再试！')
								this.back();
							}
						})
						.catch(err => {

						})
				} else {
					this.oneport = this.option.port
					var port = Number(this.oneport) + 1
					var t = (port + '').length
					var s = ''
					for (var i = 0; i < 2 - t; i++) {
						s += '0';
					}
					port = s + port
					if (this.oneport != 'ff' && this.oneport != 'FF') {
						this.portnum = port
					} else {
						this.portnum = 'ff'
					}
					this.infoshow();
				}

				this.from = this.option.from
			},
			// 根据设备号查询信息
			infoshow() {
				let data = {
					device: this.option.device,
					port: this.oneport,
					cmd: this.option.cmd
				}
				this.$base.request('charge/info', 'GET', data)
					.then(res => {
						if (res.data.code == 200) {
							if (!this.isAll || this.chooesPortList.length < 1) {
								this.initWebSocket(); //开启原始版
							}

							if (res.data.data.userProjectId && res.data.data.userProjectId != '0') {
								var user = uni.getStorageSync('user')
								user.projectId = res.data.data.userProjectId
								user.projectName = res.data.data.projectName
								uni.setStorageSync('user', user)
							}
							if (res.data.data.deviceId) {
								this.deviceId = res.data.data.deviceId
							}

							this.isVIP = res.data.data.isVIP
							this.longCharge = res.data.data.longCharge
							this.infolist = res.data.data
							if (uni.getStorageSync('user').poster == 1 && this.ontime == 0) {
								if(this.point!=0&&uni.getStorageSync('user').projectId!=0&&this.postervip==0){
									let isInArray = this.point.some(item => item.point === "charge");
									if(isInArray==true){
										this.guanggao()
										this.ontime = 1
									}
								}else{
									if(this.isSpan==true){
										this.guanggao()
										this.ontime = 1
									}
								}
							}
							this.areaId = res.data.data.areaId
							this.projectId = res.data.data.projectId
							this.shebeino = res.data.data.code
							if (this.infolist.safeMoney && this.infolist.transfer == 1) {
								var data = {
									amount: 0,
									safeMoney: this.infolist.safeMoney,
									checkType: 0
								}
								this.$base.request('charge/check/safe', 'GET', data)
									.then(res => {
										if (res.data.code == 200) {
											this.occas = res.data.data
											if (!this.infolist.defaultSafe) {
												this.checked = false
												this.bxname = '立即充电'
											} else {
												if (this.occas == 0) {
													this.checked = true
													this.bxname = '充电守护'
												} else {
													this.checked = false
													this.bxname = '立即充电'
												}

											}
										}

									})
									.catch(err => {

									})
							}

							if (res.data.data.wechatImg) {
								this.erimg = Config.imgapi + res.data.data.wechatImg
							}

							let data1 = {
								areaId: res.data.data.areaId,
								projectId: res.data.data.projectId,
							}
							this.$base.request('charge/rate', 'GET', data1)
								.then(res => {
									if (res.data.code == 200) {
										this.lbbtn();
										this.isFund = res.data.data.isFund
										this.first = res.data.data.first
										this.tapclass1 = res.data.data.first
										this.second = res.data.data.second
										this.third = res.data.data.third
										this.fourth = res.data.data.fourth
										this.isSpan = res.data.data.isSpan
										this.monthlyList = res.data.data.monthlyList
										this.oftenList = res.data.data.oftenList
										this.temporaryList = res.data.data.temporaryList
										this.firstOne = res.data.data.firstOne
										this.tapclass2 = res.data.data.firstOne
										this.fourthOne = res.data.data.fourthOne
										this.secondOne = res.data.data.secondOne
										this.thirdOne = res.data.data.thirdOne
										this.disFirstOne = res.data.data.disFirstOne
										this.disFourthOne = res.data.data.disFourthOne
										this.disSecondOne = res.data.data.disSecondOne
										this.disThirdOne = res.data.data.disThirdOne
										this.temporaryDisFirst = res.data.data.temporaryDisFirst
										this.temporaryDisFourth = res.data.data.temporaryDisFourth
										this.temporaryDisSecond = res.data.data.temporaryDisSecond
										this.temporaryDisThird = res.data.data.temporaryDisThird
										this.oftenOccupyFree = res.data.data.oftenOccupyFree
										this.oftenOccupyMax = res.data.data.oftenOccupyMax
										this.oftenOccupyRate = res.data.data.oftenOccupyRate
										this.temporaryOccupyFree = res.data.data.temporaryOccupyFree
										this.temporaryOccupyMax = res.data.data.temporaryOccupyMax
										this.temporaryOccupyRate = res.data.data.temporaryOccupyRate
										this.monthlyOccupyFree = res.data.data.monthlyOccupyFree
										this.monthlyOccupyMax = res.data.data.monthlyOccupyMax
										this.monthlyOccupyRate = res.data.data.monthlyOccupyRate
										this.isAutoStopOne = res.data.data.isAutoStopOne //一元模式是否充满自停
										this.temporaryIsAutoStop = res.data.data.temporaryIsAutoStop //临充是否充满自停
										this.projectServiceDetailList = res.data.data.projectServiceDetailList
										this.endTimeStr = res.data.data.endTimeStr
										this.temporaryDefaultAutoStop = res.data.data.temporaryDefaultAutoStop
										this.lscmchecked = !!res.data.data.temporaryDefaultAutoStop
										if (res.data.data.oftenOccupyFreeTime) {
											this.oftenOccupyFreeTime = res.data.data.oftenOccupyFreeTime
										}
										if (res.data.data.temporaryOccupyFreeTime) {
											this.temporaryOccupyFreeTime = res.data.data.temporaryOccupyFreeTime
										}
										if (res.data.data.monthlyOccupyFreeTime) {
											this.monthlyOccupyFreeTime = res.data.data.monthlyOccupyFreeTime
										}
										if (this.endTimeStr) {
											this.xzchecked = '1'
										}
										if (res.data.data.oftenList.length > 0) {
											this.mtype = res.data.data.oftenList[0].types
											this.onetype = res.data.data.oftenList[0].typesStr
											this.fwnum = res.data.data.oftenList[0].num / 100
											// this.steps=res.data.data.oftenList[0].steps
											if(res.data.data.oftenList[0].steps){
												this.steps=res.data.data.oftenList[0].steps
											}
											this.flremarks1 = res.data.data.oftenRemarks
											this.oftenMinMoney = res.data.data.oftenMinMoney
											this.fuwumoney = res.data.data.oftenList[0].num / 100
										}
										if (res.data.data.temporaryList.length > 0) {
											this.twotype = res.data.data.temporaryList[0].typesStr
											this.flremarks2 = res.data.data.temporaryRemarks
											this.temporaryMinMoney = res.data.data.temporaryMinMoney
											if (res.data.data.oftenList.length == 0 && res.data.data.monthlyList
												.length == 0) {
												this.tapbtn(2)
											}
										}
										if (res.data.data.monthlyList.length > 0) {
											this.bytype = res.data.data.monthlyList[0].types
											this.threetype = res.data.data.monthlyList[0].typesStr

											this.flremarks3 = res.data.data.monthlyRemarks
										}
										this.minMoney = res.data.data.minMoney
										if (this.monthlyList.length > 0) {
											this.showclass = 3

											if (this.longCharge == 1) {
												this.longcheck = false
												this.longshow = true
											}
										} else if (this.oftenList.length > 0) {
											this.showclass = 1
											if (this.longCharge == 1 && this.mtype != 'B4') {
												this.longcheck = false
												this.longshow = true
											}
										} else if (this.temporaryList.length > 0) {
											this.showclass = 2
										}
										if (this.infolist.defaultSafe == 1 && this.occas == 0) {
											this.checked = true
										} else {
											this.checked = false
										}
										if (this.xcxtype == 0) {
											if (this.monthlyList.length == 0 && this.oftenList.length == 0 && this
												.temporaryList.length > 0) {
												Dialog.confirm({
													title: '提示',
													message: '临时模式暂无法使用，请联系运营商',
												}).then(() => {
													this.back()
												}).catch(() => {
													return
													// on cancel
												});
											}
										}
									} else {
										this.show = true
										this.tanshow = 4
										this.fourmsg = res.data.msg
										return
									}
								})
								.catch(err => {

								})
							if (process.env.NODE_ENV !== 'development') {
								if (res.data.data.isHas == 0 && this.yc == 0) {
									this.getMyLocation()
								}
							}
							this.getSafeMonth()
							if (res.data.data.popSafe == 1&&this.reassuring==0) {
								this.shbyshow = true
							}
						} else if (res.data.code == 201) {
							this.show = true
							this.tanshow = 3

							this.nearid = res.data.data.projectId

						} else if (res.data.code == 701) {
							this.show = true
							this.tanshow = 2

							var item = res.data.data
							let data = {
								areaId: item.areaId,
								projectId: item.projectId,
								deviceId: this.option.device,
								port: this.oneport,
							}
							this.yzdata = data

						} else if (res.data.code == 801) {

							// this.ws.close()
							// this.ws = null
							uni.redirectTo({
								url: '../personal_data/personal_data?device=' + this.option.device + '&port=' +
									this.oneport + '&zt=' + 0 +
									'&from=' + this.from + '&cmd=' + this.option.cmd
							});

						} else if (res.data.code == 901) {
							this.oneshow = true
							var data = {
								fromType: this.option.from,
								deviceId: this.option.device
							}
							this.$base.request('charge/ports', 'GET', data)
								.then(res => {
									if (res.data.code == 200) {
										this.onelist = res.data.data.ports
										this.sixnum = res.data.data.device
									} else {
										Toast.fail('端口异常，请稍后再试！')
										this.back();
									}
								})
								.catch(err => {

								})
						} else {
							this.show = true
							this.tanshow = 4
							this.fourmsg = res.data.msg
						}
					})
					.catch(err => {

					})

			},
			//开始上电
			cdbtn(vul) {
				if (clickThrottle(1100)) {
					if (this.xychecked == false && (this.xieyidata != {} && this.xieyidata.display == 1)) {
						Dialog.confirm({
							title: '提示',
							message: '请阅读并勾选《' + this.xieyidata.agreementName + '》',
							confirmButtonText: '同意并勾选'
						}).then(() => {
							this.xychecked = true
							this.cdbtn(vul)
						}).catch(() => {
							return
							// on cancel
						});
					} else {
						var isBF = uni.getStorageSync('user').isBF
						if (isBF == 1 && this.showclass == 2 && (this.bhdk == 'ff' || this.bhdk == 'FF')) {
							if (this.dgnum != 9) {
								this.oneshow = true
								this.xuanbtn = vul
							} else {
								if (this.option.cmd == 1) {
									this.oneshow = true
									this.xuanbtn = vul
								}
							}
							var data = {
								fromType: this.option.from,
								deviceId: this.option.device
							}

							this.$base.request('charge/ports', 'GET', data)
								.then(res => {
									if (res.data.code == 200) {
										this.onelist = res.data.data.ports
										this.sixnum = res.data.data.device
									} else {
										Toast.fail('端口异常，请稍后再试！')
										this.back();
									}
								})
								.catch(err => {

								})
						} else {
							if (this.infolist.isMonthBye == false && this.infolist.safeAllStafus == 1 && this.reassuring == 0&& ((this.infolist
									.transfer == 1 && this.infolist.monthSafe == 1) || (this.infolist.transfer == 1 &&
									this.infolist.monthSafe == 0) || (this.infolist.monthSafe == 1 && this.infolist
									.transfer == 0))) {
								if (this.infolist.displayButton == 0 && ((this.infolist.transfer == 1 && this.infolist
										.monthSafe == 1) || (this.infolist.transfer == 1 && this.infolist.monthSafe ==
										0))) {
									if (this.checked == true) {
										this.tapcdb()
									} else {
										if (this.infolist.twoWarn == 0) {
											this.isSafe = 0
											this.cdbtnson()
										} else {
											if (this.occas == 0) {
												this.seluser()
												this.warnshow = true
											} else {
												this.isSafe = 0
												this.cdbtnson()
											}

										}

									}
								} else if (this.infolist.displayButton == 1 && ((this.infolist.transfer == 1 && this
										.infolist.monthSafe == 1) || (this.infolist.transfer == 1 && this.infolist
										.monthSafe == 0))) {
									if (vul == 1) {
										this.tapcdb()
									} else {
										if (this.infolist.twoWarn == 0) {
											this.isSafe = 0
											this.cdbtnson()
										} else {
											if (this.occas == 0) {
												this.seluser()
												this.warnshow = true
											} else {
												this.isSafe = 0
												this.cdbtnson()
											}

										}
									}
								} else if (this.infolist.transfer == 0 && this.infolist.monthSafe == 1) {
									this.isSafe = 0
									this.cdbtnson()
								}
							} else if (this.infolist.isMonthBye == false && ((this.infolist.transfer == 0 && this.infolist
									.monthSafe == 0) || (this.infolist.safeAllStafus == 0)|| (this.infolist.safeAllStafus == 0&&this.reassuring==0)|| (this.reassuring == 1))) {
								this.isSafe = 0
								this.cdbtnson()
							} else if (this.infolist.isMonthBye == true) {
								this.isSafe = 1
								this.cdbtnson()
							}
						}
					}
				} else {
					Toast.fail('请勿重复点击')
					return
				}

			},
			tapcdb() {
				if (this.showclass == 2) {
					this.isSafe = 1
					this.cdbtnson()
				} else {
					let amount = 0
					if (this.showclass == 1) {
						this.chargeType = this.oftenList[0].types
					} else if (this.showclass == 2) {
						this.chargeType = this.temporaryList[0].types
					} else if (this.showclass == 3) {
						this.chargeType = this.monthlyList[0].types
					}
					if (this.showclass == 1 && this.chargeType == 'B4') {
						if (this.tapclass2 == 'a') {
							if ((!(/(^[1-9]\d*$)/.test(Number(this.handm))) && Number(this.handm)) || !Number(this
									.handm)) {
								Toast.fail('请输入整数金额')
								return
							}
							if (Number(this.handm) && (Number(this.handm) > 20 || Number(this.handm) < 1)) {
								Toast.fail('请输入1至20之间的金额(包含20)')
								return
							}
							amount = Number(this.handm)

						} else {
							amount = this.tapclass2
						}
					} else {
						amount = 0
					}
					var data = {
						amount: amount,
						safeMoney: this.infolist.safeMoney,
						checkType: 1
					}
					this.$base.request('charge/check/safe', 'GET', data)
						.then(res => {
							if (res.data.code == 200) {
								if (res.data.data == 1) {
									Dialog.confirm({
										title: '提示',
										message: '您已选择“守护充电”服务，当前基本账户余额不足，是否现在去充值？\n提示：您如果不想购买“守护充电”服务，可以取消后再进行充电操作。',
										messageAlign: 'left'
									}).then(() => {
										uni.navigateTo({
											url: '../account_recharge/account_recharge?powerontype=' +
												1
										});
									}).catch(() => {
										// on cancel
									});
								} else {
									this.isSafe = 1
									this.cdbtnson()
								}

							} else {
								Toast.fail(res.data.msg)
								return

							}
						})
						.catch(err => {

						})

				}
			},
			cdbtnson() {
				var endTime = uni.getStorageSync('user').endTime
				// this.initWebSocket()
				if (this.showclass != 3 && endTime != null && this.monthlyList.length > 0) {
					Dialog.confirm({
						title: '提示',
						message: '系统检测到您已购买包月套餐,使用“常用或临时模式”会产生扣费，是否确认'
					}).then(() => {
						if (this.showclass == 2) {
							Dialog.confirm({
								title: '提示',
								message: '您选择的是“临时充电”模式，如果上电不成功，系统会在30分钟内自动退款，确认充电吗？'
							}).then(() => {
								setTimeout(() => {
									this.lsshow()
								}, 500)
							}).catch(() => {
								// on cancel
							});

						} else {
							if (this.showclass == 3) {
								this.$base.request('charge/check', 'GET')
									.then(res => {
										if (res.data.code == 200) {
											if (res.data.data.isAlert == 1) {
												this.gbshow = true
											} else {
												setTimeout(() => {
													this.cyshow()
												}, 500)
											}
										}
									})
									.catch(err => {

									})
							} else {
								setTimeout(() => {
									this.cyshow()
								}, 500)
							}

						}
					}).catch(() => {
						setTimeout(() => {
							this.showclass = 3
						}, 500)

					});
				} else {
					if (this.showclass == 2) {
						Dialog.confirm({
							title: '提示',
							message: '您选择的是“临时充电”模式，如果上电不成功，系统会在30分钟内自动退款，确认充电吗？'
						}).then(() => {
							setTimeout(() => {
								this.lsshow()
							}, 500)
						}).catch(() => {
							// on cancel
						});

					} else {
						if (this.showclass == 3) {
							this.$base.request('charge/check', 'GET')
								.then(res => {
									if (res.data.code == 200) {
										if (res.data.data.isAlert == 1) {
											this.gbshow = true
										} else {
											setTimeout(() => {
												this.cyshow()
											}, 500)
										}
									}
								})
								.catch(err => {

								})
						} else {
							setTimeout(() => {
								this.cyshow()
							}, 500)
						}
					}
				}
			},
			//临时充电调用接口
			lsshow() {
				if (this.isAll && this.chooesPortList.length > 0) {
					this.$base.prompt(
						"提示",
						"一键开柜无法使用临时上电",
						() => {},
						() => {}
					);
					return;
				}
				// var safe = 0
				// if (this.checked&&this.infolist.transfer==1) {
				// 	safe = 1
				// } else {
				// 	safe = 0
				// }
				let lscm = 0
				if (this.lscmchecked == false) {
					lscm = 0
				} else {
					lscm = 1
				}
				let data = {
					areaId: this.areaId,
					devicePort: this.deviceId + this.oneport,
					pear: this.tapclass1,
					projectid: this.projectId,
					safe: this.isSafe,
					isAutoStop: lscm,
					defaultAutoStop: 0
				}
				uni.showLoading({
					title: '请稍候',
					mask: true
				})

				let _this = this
				_this.$base.request('order/temsave', 'POST', data)
					.then(res => {
						uni.hideLoading()
						if (res.data.code == 200) {
							let arr = res.data.data

							// 使用uni-app标准支付API
							uni.requestPayment({
								provider: 'wxpay', // 服务提供商
								timeStamp: arr.timeStamp, // 时间戳
								nonceStr: arr.nonceStr, // 随机字符串
								package: arr.wpackage,
								signType: arr.signType, // 签名算法
								paySign: arr.paySign, // 签名
								success: function (res) {
									console.log('临时充电支付成功', res);
									// 支付成功后设置定时器等待充电结果
									_this.timeId = setTimeout(() => { //20秒之后没推过来关闭 弹窗
										uni.hideLoading()
										_this.timeId = null; // 清空定时器引用
										_this.$base.prompt('温馨提示', '因网络原因，您此次充电可能不成功，如已开始充电，请留意随后的微信消息提示，如未开始充电，请重试一次', () => {
											_this.back();
										}, () => {
											_this.back();
										})
									}, 20000);
								},
								fail: function (err) {
									console.log('临时充电支付失败', err);
									uni.hideLoading()
									Toast.fail('支付失败，请重试')
								}
							});
						} else {
							Toast.fail(res.data.msg)
						}

					})
					.catch(err => {
						_this.$base.prompt('提示', '开始充电接口无响应', () => {}, () => {})
						uni.hideLoading()
					})
			},
			//常用充电调用接口
			async cyshow() {
				// var reg = /.*\..*/;
				// if (reg.test(this.handshu)) {
				// 	Toast.fail('请输入整数时长')
				// 	return
				// }
				let chang = 0
				if (this.longcheck == false) {
					chang = 0
				} else {
					chang = 1
				}
				if (this.mtype != 'B4' && this.showclass == 1) {
					if (this.tapclass == 6) {
						if ((!(/(^[1-9]\d*$)/.test(Number(this.handshu))) && Number(this.handshu)) || !Number(this
								.handshu)) {
							Toast.fail('请输入整数时长')
							return
						}
						if (this.handshu) {
							if (Number(this.handshu) > 18 || Number(this.handshu) < 1) {
								Toast.fail('充电时长应在1-18小时之内')
								return
							}
						}
					}



					if (this.tapclass == 1) {
						this.time = 0
					} else if (this.tapclass == 2) {
						this.time = 14400
					} else if (this.tapclass == 3) {
						this.time = 21600
					} else if (this.tapclass == 4) {
						this.time = 28800
					} else if (this.tapclass == 5) {
						this.time = 36000
					} else if (this.tapclass == 6) {
						this.time = 3600 * Number(this.handshu)
					}
				}

				if (this.showclass == 1) {
					this.chargeType = this.oftenList[0].types
				} else if (this.showclass == 2) {
					this.chargeType = this.temporaryList[0].types
				} else if (this.showclass == 3) {
					this.chargeType = this.monthlyList[0].types
				} else if (this.showclass == 4) {
					this.chargeType = this.isVIP
				}
				let span = ''
				if (this.isSpan == false) {
					span = 1
				} else if (this.isSpan == true) {
					span = 2
				}
				if (this.chargeType == 'B2' || this.chargeType == 'B5') {
					if (this.xzchecked == '1') {
						this.serviceType = 1
					} else if (this.xzchecked == '2') {
						this.serviceType = 0
					}
				} else {
					this.serviceType = ''
				}
				let data = {}
				if (this.mtype == 'B4' && this.showclass == 1) {
					let onec = 0
					if (this.onecmchecked == false) {
						onec = 0
					} else {
						onec = 1
					}
					if (this.tapclass2 == 'a') {
						if ((!(/(^[1-9]\d*$)/.test(Number(this.handm))) && Number(this.handm)) || !Number(this
								.handm)) {
							Toast.fail('请输入整数金额')
							return
						}
						if (Number(this.handm) && (Number(this.handm) > 20 || Number(this.handm) < 1)) {
							Toast.fail('请输入1至20之间的金额(包含20)')
							return
						}
						data = {
							time: 0,
							device: this.option.device,
							cmd: this.option.cmd,
							chargeType: this.chargeType,
							isSpan: span,
							port: this.oneport,
							amount: Number(this.handm),
							isSafe: this.isSafe,
							isAutoStop: onec,
							defaultAutoStop: 0,
							longCharge: chang,
							serviceType: this.serviceType
						}
					} else {
						data = {
							time: 0,
							device: this.option.device,
							cmd: this.option.cmd,
							chargeType: this.chargeType,
							isSpan: span,
							port: this.oneport,
							amount: this.tapclass2,
							isSafe: this.isSafe,
							isAutoStop: onec,
							defaultAutoStop: 0,
							longCharge: chang,
							serviceType: this.serviceType
						}
					}

				} else {
					data = {
						time: this.time,
						device: this.option.device,
						cmd: this.option.cmd,
						chargeType: this.chargeType,
						isSpan: span,
						port: this.oneport,
						isSafe: this.isSafe,
						isAutoStop: 0,
						defaultAutoStop: 0,
						longCharge: chang,
						serviceType: this.serviceType
					}
				}
				// 校验最大充电时长
				let res = await this.checkMaxChargeTime({
					chargeTime: data.time,
					chargeType: data.chargeType
				})
				if (res.code === 200) {
					if (data.chargeType === 'B1' && res.maxChargeTime && Number(data.time) === 0) data.maxChargeTime =
						res.maxChargeTime
					if (data.chargeType === 'B1' && res.maxChargeTime && Number(data.time) !== 0) data.time = res
						.maxChargeTime

					uni.showLoading({
						title: '请稍候',
						mask: true
					})
					// 清除旧的定时器
					if (this.timeId) {
						clearTimeout(this.timeId);
						this.timeId = null;
					}

					// 设置新的定时器
					this.timeId = setTimeout(() => { //20秒之后没推过来关闭 弹窗
						uni.hideLoading()
						this.timeId = null; // 清空定时器引用
						this.$base.prompt('温馨提示', '因网络原因，您此次充电可能不成功，如已开始充电，请留意随后的微信消息提示，如未开始充电，请重试一次', () => {
							this.back();
						}, () => {
							this.back();
						})
					}, 20000);
					if (!this.isAll) {
						uni.showLoading({
							title: "请稍候",
							mask: true,
						});
						// 清除旧的定时器
						if (this.timeId) {
							clearTimeout(this.timeId);
							this.timeId = null;
						}

						// 设置新的定时器
						this.timeId = setTimeout(() => {
							//20秒之后没推过来关闭 弹窗
							uni.hideLoading();
							this.timeId = null; // 清空定时器引用
							this.$base.prompt(
								"温馨提示",
								"因网络原因，您此次充电可能不成功，如已开始充电，请留意随后的微信消息提示，如未开始充电，请重试一次",
								() => {
									this.back();
								},
								() => {
									this.back();
								}
							);
						}, 20000);
					}

					if (this.isAll && this.chooesPortList.length >= 1) {
						//一键开门循环调用上电
						let tempTime = 100;
						for (const item of this.chooesPortList) {
							tempTime += 3000;
							setTimeout(() => {
								if (item < 9) {
									this.oneport = "0" + String(item);
								} else {
									this.oneport = String(item);
								}
								data.port = this.oneport;
								this.$base
									.request("charge/start", "GET", data)
									.then((res) => {
										if (res.data.msg == "不允许重复提交，请稍后再试") {
											clearTimeout(this.timeId);
											uni.hideLoading();
											Toast.fail("系统繁忙，请稍后再试");
										}
										// this.initWebSocket()
									})
									.catch((err) => {
										this.$base.prompt(
											"提示",
											"开始充电接口无响应",
											() => {},
											() => {}
										);
										uni.hideLoading();
									});
							}, tempTime);

							// console.log("123");
						}
						// console.log("456");
						setTimeout(() => {
							Toast.success("上电成功");

							uni.redirectTo({
								url: "../index/index",
							});
						}, tempTime);
					} else {
						this.$base
							.request("charge/start", "GET", data)
							.then((res) => {
								if (res.data.msg == "不允许重复提交，请稍后再试") {
									clearTimeout(this.timeId);
									uni.hideLoading();
									Toast.fail("系统繁忙，请稍后再试");
								}
								// this.initWebSocket()
							})
							.catch((err) => {
								this.$base.prompt(
									"提示",
									"开始充电接口无响应",
									() => {},
									() => {}
								);
								uni.hideLoading();
							});
					}
				}
			},

			//   初次位置授权
			getAuthorize() {
				return new Promise((resolve, reject) => {
					uni.authorize({
						scope: "scope.userLocation",
						success: () => {
							resolve(); // 允许授权
						},
						fail: () => {
							reject(); // 拒绝授权
						},
					});
				});
			},
			// 确认授权后，获取用户位置
			getLocationInfo() {
				const that = this;
				uni.getLocation({
					type: "gcj02",
					success: function(res) {
						that.showMap(res.latitude, res.longitude)
					},
				});
			},
			// 拒绝授权后，弹框提示是否手动打开位置授权
			openConfirm() {
				return new Promise((resolve, reject) => {
					uni.showModal({
						title: "请求授权当前位置",
						content: "我们需要获取地理位置信息，为您推荐附近的充电站",
						success: (res) => {
							if (res.confirm) {
								uni.openSetting().then((res) => {
									if (res[1].authSetting["scope.userLocation"] === true) {
										resolve(); // 打开地图权限设置
									} else {
										reject();
									}
								});
							} else if (res.cancel) {
								reject();
							}
						},
					});
				});
			},
			// 彻底拒绝位置获取
			rejectGetLocation() {
				uni.showToast({
					title: "您拒绝了授权，无法获得周边信息",
					icon: "none",
					duration: 2000,
				});
			},
			//包月套餐提示
			byque() {
				this.cyshow();
				this.gbshow = false
			},
			bycolose() {
				this.gbshow = false
			},
			bygo() {
				uni.showLoading({
					title: '请稍候',
					mask: true
				})
				var type = '1'
				var tapshow = '3'
				setTimeout(() => {
					uni.hideLoading()
					uni.navigateTo({
						url: '../account_recharge/account_recharge?type=' + type + '&tapshow=' + tapshow +
							'&areaId=' + this.areaId + '&upshow=' + 1
					});
				}, 1200)
			},
			timebtn() {
				this.back();
			},
			showMap(latitude, longitude) {
				let data = {
					deviceId: this.deviceId,
					latitude: latitude,
					longitude: longitude
				}
				this.$base.request('nearby/location', 'PUT', data)
					.then(res => {
					})
					.catch(err => {
					})
			},
			//选择端口调用接口
			montbtn(vul) {
				this.mshow = vul
				if (vul == 0) {
					this.dknum = '00'
				} else if (vul = 1) {
					this.dknum = '01'
				}

			},
			// 开门
			open() {
				if (this.chooesPortList.length <= 0) {
					Toast.fail("请先选择端口");
					return;
				}

				if (this.chooesPortList.length > 0 && this.chooesPortList.length == 1) {
					let temp = this.chooesPortList[0];
					if (temp < 9) {
						this.portnum = "0" + String(Number(temp) + 1);
					} else {
						this.portnum = String(Number(temp) + 1);
					}
				} else {
					this.portnum = "多选";
				}
				let tempList = [];
				this.chooesPortList
					.sort((a, b) => a - b)
					.forEach((item) => {
						if (item < 9) {
							tempList.push("0" + String(Number(item) + 1));
						} else {
							tempList.push(String(Number(item) + 1));
						}
					});
				let tempText = tempList.join(",");
				this.oneshow = false;
				this.sureText = `确定开启${tempText}柜门吗？`;
				// this.sureOpenShow = true;

				Dialog.confirm({
						title: this.sureText,
						message: "因网络连接问题，可能存在部分柜门开启失败， 届时请重新扫码开启！",
						confirmButtonColor: "#EC651C",
						confirmButtonText: "确认",
						cancelButtonText: "取消",
					})
					.then(() => {
						this.sureOpen();
					})
					.catch(() => {
						// on cancel
						this.cancelOpen();
					});
			},
			// 一键开门
			oneKeyOpen() {
				this.chooesPortList = []
				this.onelist.forEach((item, index) => {
					if (item.status == "空闲") {
						this.chooesPortList.push(index);
					}
				});
				this.portnum = "全选";
				this.sureText = "确定一键打开所有柜门吗？";
				this.oneshow = false;
				// this.sureOpenShow = true;

				Dialog.confirm({
						title: this.sureText,
						message: "因网络连接问题，可能存在部分柜门开启失败， 届时请重新扫码开启！",
						confirmButtonColor: "#EC651C",
						confirmButtonText: "确认",
						cancelButtonText: "取消",
					})
					.then(() => {
						this.sureOpen();
					})
					.catch(() => {
						// on cancel
						this.cancelOpen();
					});
			},
			// 取消多选开门或一键开门
			cancelOpen() {
				(this.sureOpenShow = false), (this.oneshow = true);
			},
			// 确认开门
			sureOpen() {
				console.log(this.chooesPortList);
				this.chooesPortList.forEach((item) => {
					if (item < 9) {
						this.oneport = "0" + String(item);
					} else {
						this.oneport = String(item);
					}
				});
				this.sureOpenShow = false;
				this.bhdk = this.oneport;
				var isBF = uni.getStorageSync("user").isBF;
				if (isBF == 1 && this.showclass == 2) {
					this.cdbtn(this.xuanbtn);
				} else {
					this.infoshow();
				}
			},
			//选择端口调用接口
			montbtn1(vul, status) {
				if (status == "空闲" || status == "") {
					if (this.isAll) {
						if (!this.chooesPortList.includes(vul)) {
							this.chooesPortList.push(vul);
						} else {
							let index = this.chooesPortList.indexOf(vul);
							if (index != -1) {
								this.chooesPortList.splice(index, 1);
							}
						}
					} else {
						if (vul < 9) {
							this.oneport = "0" + String(vul);
							this.portnum = "0" + String(Number(vul) + 1);
						} else {
							this.oneport = String(vul);
							this.portnum = String(Number(vul) + 1);
						}
						this.oneshow = false;
						this.bhdk = this.oneport;
						var isBF = uni.getStorageSync("user").isBF;
						if (isBF == 1 && this.showclass == 2) {
							this.cdbtn(this.xuanbtn);
						} else {
							this.infoshow();
						}
					}
				} else if (status == "禁用") {
					Toast.fail("该端口已被禁用，请选择其他空闲端口");
					return;
				} else if (status == "绑定") {
					Toast.fail("该端口已被绑定，请选择其他空闲端口");
					return;
				} else if (status == "已充满") {
					Toast.fail("该端口充满占用，请选择其他空闲端口");
					return;
				} else {
					Toast.fail("该端口已被占用，请选择其他空闲端口");
					return;
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
			dkshowbtn() {
				let chang = 0
				if (this.longcheck == false) {
					chang = 0
				} else {
					chang = 1
				}
				this.duanshow = false
				if (this.tapclass == 1) {
					this.time = 0
				} else if (this.tapclass == 2) {
					this.time = 14400
				} else if (this.tapclass == 3) {
					this.time = 21600
				} else if (this.tapclass == 4) {
					this.time = 28800
				} else if (this.tapclass == 5) {
					this.time = 36000
				} else if (this.tapclass == 6) {
					this.time = 3600 * this.handshu
				}
				if (this.showclass == 1) {
					this.chargeType = this.oftenList[0].types
				} else if (this.showclass == 2) {
					this.chargeType = this.temporaryList[0].types
				} else if (this.showclass == 3) {
					this.chargeType = this.monthlyList[0].types
				}
				let span = ''
				if (this.isSpan == false) {
					span = 1
				} else if (this.isSpan == true) {
					span = 2
				}
				if (this.chargeType == 'B2' || this.chargeType == 'B5') {
					if (this.xzchecked == '1') {
						this.serviceType = 1
					} else if (this.xzchecked == '2') {
						this.serviceType = 0
					}
				} else {
					this.serviceType = ''
				}
				let data = {}
				if (this.mtype == 'B4' && this.showclass == 1) {
					let onec = 0
					if (this.onecmchecked == false) {
						onec = 0
					} else {
						onec = 1
					}
					if (this.tapclass2 == 'a') {
						if ((!(/(^[1-9]\d*$)/.test(Number(this.handm))) && Number(this.handm)) || !Number(this.handm)) {
							Toast.fail('请输入整数金额')
							return
						}
						if (Number(this.handm) && (Number(this.handm) > 20 || Number(this.handm) < 1)) {
							Toast.fail('请输入1至20之间的金额(包含20)')
							return
						}
						data = {
							time: 0,
							device: this.option.device,
							cmd: this.option.cmd,
							chargeType: this.chargeType,
							isSpan: span,
							port: this.dknum,
							amount: Number(this.handm),
							isSafe: this.isSafe,
							isAutoStop: onec,
							defaultAutoStop: 0,
							longCharge: chang,
							serviceType: this.serviceType
						}
					} else {
						data = {
							time: 0,
							device: this.option.device,
							cmd: this.option.cmd,
							chargeType: this.chargeType,
							isSpan: span,
							port: this.dknum,
							amount: this.tapclass2,
							isSafe: this.isSafe,
							isAutoStop: onec,
							defaultAutoStop: 0,
							longCharge: chang,
							serviceType: this.serviceType
						}
					}

				} else if (this.showclass == 2) {
					let lscm = 0
					if (this.lscmchecked == false) {
						lscm = 0
					} else {
						lscm = 1
					}
					data = {
						time: 0,
						device: this.option.device,
						cmd: this.option.cmd,
						chargeType: this.chargeType,
						isSpan: span,
						port: this.dknum,
						amount: this.amount,
						userId: this.userId,
						isSafe: this.isSafe,
						rechargeNo: this.rechargeNo,
						isAutoStop: lscm,
						defaultAutoStop: 0,
						longCharge: chang,
						serviceType: this.serviceType
					}
				} else {
					data = {
						time: this.time,
						device: this.option.device,
						cmd: this.option.cmd,
						chargeType: this.chargeType,
						isSpan: span,
						port: this.dknum,
						userId: this.userId,
						rechargeNo: this.rechargeNo,
						isSafe: this.isSafe,
						isAutoStop: 0,
						defaultAutoStop: 0,
						longCharge: chang,
						serviceType: this.serviceType
					}
				}

				uni.showLoading({
					title: '请稍候',
					mask: true
				})
				// 清除旧的定时器
				if (this.timeId) {
					clearTimeout(this.timeId);
					this.timeId = null;
				}

				// 清除退款定时器
				if (this.refundId) {
					clearTimeout(this.refundId);
					this.refundId = null;
				}

				// 设置新的定时器
				this.timeId = setTimeout(() => { //20秒之后没推过来关闭 弹窗
					uni.hideLoading()
					this.timeId = null; // 清空定时器引用
					this.$base.prompt('温馨提示', '因网络原因，您此次充电可能不成功，如已开始充电，请留意随后的微信消息提示，如未开始充电，请重试一次', () => {
						this.back();
					}, () => {
						this.back();
					})
				}, 20000);
				this.$base.request('charge/start', 'GET', data)
					.then(res => {
						if (res.data.msg == '不允许重复提交，请稍后再试') {
							clearTimeout(this.timeId)
							uni.hideLoading()
							Toast.fail('系统繁忙，请稍后再试')
						}
						// this.initWebSocket()
						// this.duanshow = false
					})
					.catch(err => {
						this.$base.prompt('提示', '开始充电接口无响应', () => {}, () => {})
						uni.hideLoading()
					})
			},
			//websocket  原始版
			initWebSocket() { //初始化weosocket
				const wsuri = Config.wx + uni.getStorageSync('userId')
				this.ws = uni.connectSocket({
					url: wsuri, //仅为示例，并不是真实接口地址。
					success(data) {
						console.log("websocket连接成功");
					},

				});
				// 监听开启websocket开启 并发送数据
				this.ws.onOpen(() => {
					console.log('websocket链接开启')
					this.webIsTrue = true
				})
				this.ws.onMessage(res => {
					console.log('websocket链接数据返回信息', res)
					let res0 = JSON.parse(res.data)

					// 清除所有定时器，防止页面离开后仍然触发
					if (this.timeId) {
						clearTimeout(this.timeId);
						this.timeId = null;
						console.log('WebSocket响应时清除timeId定时器');
					}

					if (this.refundId) {
						clearTimeout(this.refundId);
						this.refundId = null;
						console.log('WebSocket响应时清除refundId定时器');
					}

					if (res0.code == 200) { //充电成功
						if (this.isAll) {
							uni.navigateTo({
								url: "../index/index",
							});
						}
						uni.hideLoading()
						Toast.success('充电成功')
						setTimeout(() => {
							uni.redirectTo({
								url: `../chargingzhong_detail/chargingzhong_detail?codetype=0&id=${res0.id}&projectId=${this.infolist.projectId}`
							});
							this.ontime = 0
						}, 1200)
					} else if (res0.code == '0D' || res0.code == '05' || res0.code == '07') {
						Toast.fail(res0.msg)
						var type = '1'
						var tapshow = '3'
						setTimeout(() => {
							uni.navigateTo({
								url: '../account_recharge/account_recharge?type=' + type +
									'&tapshow=' + tapshow + '&areaId=' + this.areaId + '&upshow=' +
									1
							});
						}, 1200)
					} else if (res0.code == '101') {
						this.duanshow = true
						uni.hideLoading()
						this.refundId = setTimeout(() => {
							this.duanshow = false
							let data = {
								ornum: this.ornum
							}
							uni.showLoading({
								title: '请稍候',
								mask: true
							})
							this.$base.request('refund/refund', 'POST', data)
								.then(res1 => {
									if (res1.data.code == 200) {
										uni.hideLoading()
										Toast.success('退款成功')
										this.back()
									} else {
										Toast.fail(res1.data.msg)
										this.back()
									}
								})
								.catch(err => {
								})
						}, 100000)
						if (res0.userId) {
							this.userId = res0.userId
						}
						if (res0.amount) {
							this.amount = res0.amount
						}
						if (res0.rechargeNo) {
							this.rechargeNo = res0.rechargeNo
							this.ornum = res0.rechargeNo
						}
					} else if (res0.code == '06') { //余额不足
						uni.hideLoading()
						Dialog.confirm({
							title: '提示',
							message: res0.msg
						}).then(() => {
							uni.navigateTo({
								url: '../account_recharge/account_recharge?powerontype=' + 1
							});
						}).catch(() => {
							// on cancel
						});
					} else if (res0.code == '0C') {
						uni.hideLoading()
						var phone = uni.getStorageSync('user').projectPhone
						Dialog.confirm({
							title: '提示',
							message: '您当前属于跨区充电，资金池余额不足，请点击确认联系您绑定的小区运营商'
						}).then(() => {
							uni.makePhoneCall({
								phoneNumber: phone
							});
						}).catch(() => {
							// on cancel
						});
					} else if (res0.code == '0G') {
						uni.hideLoading()
						Dialog.confirm({
							title: '提示',
							message: res0.msg
						}).then(() => {
							this.fwtan = true
						});
					} else if (res0.code == '0H') {
						uni.hideLoading()
						Dialog.confirm({
							title: '提示',
							message: res0.msg
						}).then(() => {
							this.xzchecked = '2'
						});
					} else {
						uni.hideLoading()
						Toast.fail(res0.msg)
					}
				})
				this.ws.onClose(e => {
					// 关闭 websocket
					console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
					this.webIsTrue = false
					if (this.ws != null) {
						this.initWebSocket()
					}
				})
				this.ws.onError(e => {
					console.log(e, 'WebSocket发生错误')
				})

			},

			//模式选择按钮
			tapbtn(val) {
				this.showclass = val
				this.longcheck = false
				if (this.infolist.defaultSafe == 1 && this.occas == 0) {
					this.checked = true
				} else {
					this.checked = false
				}
				if (val == 2) {
					this.handbtn1(1)
					this.longshow = false
				} else if (val == 1) {
					if (this.longCharge == 1 && this.tapclass == 1 && this.mtype != 'B4') {
						this.longshow = true
					} else {
						this.longshow = false
					}
				} else if (val == 3) {
					if (this.longCharge == 1) {
						this.longshow = true
					} else {
						this.longshow = false
					}
				}

			},
			//小时选择按钮
			handbtn(val) {
				this.tapclass = val
				this.longcheck = false
				if (this.longCharge == 1 && this.tapclass == 1) {
					this.longshow = true
				} else {
					this.longshow = false
				}
			},
			//金额选择按钮
			handbtn2(val) {
				this.tapclass2 = val
			},
			onInput(e) {
				var reg = /.*\..*/;
				if (reg.test(e.detail.value)) {
					Toast.fail('请输入整数时长')
					return
				}
			},
			onInput1(e) {
				var num = e.detail.value
				// var reg = /.*\..*/;
				if (!(/(^[1-9]\d*$)/.test(num)) && num) {
					Toast.fail('请输入整数金额')
					this.dishandm = 0
					return
				}
				if (num && (num > 20 || num < 1)) {
					Toast.fail('请输入1至20之间的金额(包含20)')
					this.dishandm = 0
					return
				}

				function sortNumber(a, b) { //升序
					return a - b
				}


				var m = new Map();
				m.set(this.firstOne, this.disFirstOne)
				m.set(this.secondOne, this.disSecondOne)
				m.set(this.thirdOne, this.disThirdOne)
				m.set(this.fourthOne, this.disFourthOne)
				var arr1 = [this.firstOne, this.secondOne, this.thirdOne, this.fourthOne, Number(num)];
				arr1.sort(sortNumber);

				function unique1(arr) {
					var hash = [];
					for (var i = 0; i < arr.length; i++) {
						if (hash.indexOf(arr[i]) == -1) {
							hash.push(arr[i]);
						}
					}
					return hash;
				}
				arr1 = unique1(arr1)
				if (arr1.length == 4) {
					this.dishandm = m.get(Number(num))
				} else {
					var i = arr1.indexOf(Number(num))
					if (i == 0) {
						this.dishandm = 0
					} else {
						this.dishandm = m.get(arr1[i - 1])
					}

				}

			},
			//金额选择按钮2
			handbtn1(val) {
				if (val == 1) {
					this.hsmoney = this.first
					this.hsfl = this.temporaryDisFirst
				} else if (val == 2) {
					this.hsmoney = this.second
					this.hsfl = this.temporaryDisSecond
				} else if (val == 3) {
					this.hsmoney = this.third
					this.hsfl = this.temporaryDisThird
				} else if (val == 4) {
					this.hsmoney = this.fourth
					this.hsfl = this.temporaryDisFourth
				}
				this.tapclass1 = val
			},

			//关闭费率弹窗
			flshowclose() {
				this.flshow = false
			},
			//打开费率弹窗
			flshowopen() {
				this.flshow = true
			},
			//关闭微信二维码弹窗
			wxshowclose() {
				this.wxshow = false
			},
			//打开微信二维码弹窗
			wxshowopen() {
				if (this.erimg) {
					this.wxshow = true
				} else {
					Toast.fail('该小区暂未配置微信客服')
					return
				}
			},
			//关闭验证码弹窗
			twoshowclose() {
				this.twocodeshow = false
			},
			//关闭弹窗
			showbtn() {

				this.show = false
				this.back()
			},
			//跳转附近充电区
			nearbtn() {
				uni.navigateTo({
					url: '../nearest_charging/nearest_charging'
				})
			},
			//打开验证码弹窗
			twoshowopen() {
				this.show = false
				this.twocodeshow = true
				var data = this.yzdata
				this.$base.request('charge/code', 'GET', data)
					.then(res1 => {
						if (res1.data.code == 200) {
							this.yzcode = res1.data.msg
						} else {
							Toast.fail(res1.data.msg)
						}
					})
					.catch(err => {

					})
			},
			//获取验证码倒计时
			handleClick() {
				this.Verification = false; //点击button改变v-if的状态
				let auth_timer = setInterval(() => { //定时器设置每秒递减
					this.timer--; //递减时间
					if (this.timer <= 0) {
						this.Verification = true; //60s时间结束还原v-if状态并清除定时器
						clearInterval(auth_timer)
					}
				}, 1000)
			},
			//关闭端口选择弹窗
			duanshowclose() {
				if (this.showclass == 2) {
					let data = {
						ornum: this.ornum
					}
					uni.showLoading({
						title: '请稍候',
						mask: true
					})
					this.$base.request('refund/refund', 'POST', data)
						.then(res1 => {
							if (res1.data.code == 200) {
								uni.hideLoading()
								Toast.success('退款成功')
								this.back()
							} else {
								Toast.fail(res1.data.msg)
								this.back()
							}
						})
						.catch(err => {

						})
				}

				this.duanshow = false

			},
			//打开端口选择弹窗
			duanshowopen() {
				this.duanshow = true
			},

			//打开故障报修弹窗
			faultshowclose() {
				this.activeNames = ['']
				this.radio = '1'
				this.message = ''
				this.classtap = 'tclass'
				this.imgList = []
				this.reason = '请选择故障类型'
				this.faultshow = false
			},
			//打开故障报修弹窗
			faultshowopen() {
				this.sbnum = this.shebeino + this.portnum
				this.faultshow = true
			},
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
			txtchange(e) {
				this.message = e.detail
			},
			onchange(e) {
				this.activeNames = e.detail
			},
			openCamera() {
				uni.chooseImage({
					// sourceType: ['camera'],
					count: this.imgCount,
					sizeType: ['compressed'],
					success: res => {

						let path = res.tempFilePaths[0];
						let userToken = uni.getStorageSync('userToken');

						uni.uploadFile({
							url: Config.api + 'uploadFile',
							filePath: path,
							name: 'file',
							header: {
								Authorization: "Bearer " + userToken
							},
							success: res1 => {
								this.hat.push(JSON.parse(res1.data).data.fileName)
							}

						});
						this.imgList = [...this.imgList, ...res.tempFiles];
						this.imgCount = 3 - this.imgList.length;
					}
				});
			},
			//确认提交报错
			kbtngo() {
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
					device: this.sbnum,
					type: this.radio1,
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
							this.faultshow = false
							this.tishishow = true
						} else {
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {})

			},
			//电动车安全使用承诺书
			xy() {
				let data = {
					appid: uni.getStorageSync('user').appid,
					site: 'chongdian'
				}
				this.$base.agreement(data).then(res => {
						if (res.data.code == 200) {
							this.xieyidata = res.data.data
							if (this.xieyidata.selecteds == 0) {
								this.xychecked = false
							} else if (this.xieyidata.selecteds == 1) {
								this.xychecked = true
							}
						} else {
							this.xieyidata = {}
						}
					})
					.catch(err => {

					})

			},
			//确认提交报错
			kbtngo() {
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
					device: this.sbnum,
					type: this.radio1,
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
							this.faultshow = false
							this.tishishow = true
						} else {
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {})

			},
			gobtn(e) {
				this.radio1 = e.detail
				this.reason = this.radio1
				this.activeNames = ['']
				this.classtap = 'tclass1'
			},
			go1btn(e) {
				this.xzchecked = e.detail
			},
			kbtngoclose() {
				this.tishishow = false
			},
			//返回
			back() {
				console.log('poweron页面 back方法被调用');

				// 清除所有定时器，防止页面离开后仍然触发
				if (this.timeId) {
					clearTimeout(this.timeId);
					this.timeId = null;
					console.log('返回时清除timeId定时器');
				}

				if (this.refundId) {
					clearTimeout(this.refundId);
					this.refundId = null;
					console.log('返回时清除refundId定时器');
				}

				if (this.from == '1') { //外部的
					uni.reLaunch({
						url: "../index/index"
					});
				} else if (this.from == '2' || this.from == '3') { //内部跳转过来的
					uni.navigateBack({
						delta: 1
					})
				}
			},
			//轮播广告
			lbbtn() {
				let data = {
					pageNum: 1,
					pageSize: 5
				}

				this.$base.request('notice/list', 'GET', data)
					.then(res => {
						if (res.data.code == 0) {
							var arr = []
							var list = res.data.rows
							for (var i = 0; i < list.length; i++) {
								arr.push(list[i].title)
							}
							this.noticeMsg = arr.join("|")
						}

					})
					.catch(err => {

					})
			},
			colosezhi() {
				this.dshow = false
				var usertype = 'type_' + uni.getStorageSync('userId')
				uni.setStorageSync(usertype, 1)

				this.$base.request('guide/state', 'PUT')
					.then(res => {


					})
					.catch(err => {

					})
			},
			gozhi() {

				this.$base.request('guide/state', 'PUT')
					.then(res => {


					})
					.catch(err => {

					})

				uni.navigateTo({
					url: '../Operation_guide/Operation_guide'
				})
			},

			//获取用户未结算的充电柜订单
			occ() {
				let data = {
					deviceId: this.deviceId
				}
				this.$base.request('charging/occ/list', 'GET', data)
					.then(res => {
						if (res.data.total != 0) {
							this.occtype = 1
							this.cdgnum = "您有" + res.data.total + "条未完成订单,点击查看>>>"
							Dialog.confirm({
								title: '提示',
								message: "您有" + res.data.total + "条未完成订单,点击确认查看",
								confirmButtonColor: '#EC651C',
								confirmButtonText: '查看已有订单',
								cancelButtonText: '开始新的订单'
							}).then(() => {
								uni.navigateTo({
									url: '../unsettled_order/unsettled_order?deviceId=' + this.deviceId
								})
							}).catch(() => {
								// on cancel
								this.wtype = 1
								this.oneshow = true
							});

						} else {
							this.occtype = 0
							this.oneshow = true
						}

					})
					.catch(err => {

					})
			},
			//获取用户未结算的充电柜订单
			occ1() {
				let data = {
					deviceId: this.deviceId
				}
				this.$base.request('charging/occ/list', 'GET', data)
					.then(res => {
						if (res.data.total != 0) {
							this.occtype = 1
							this.cdgnum = "您有" + res.data.total + "条未完成订单,点击查看>>>"

						} else {
							this.occtype = 0
						}

					})
					.catch(err => {

					})
			},
			//跳转充电中列表页面
			occbtn() {
				uni.navigateTo({
					url: '../unsettled_order/unsettled_order?deviceId=' + this.deviceId
				})
			},
			logoshow() {
				const userId = uni.getStorageSync('userId');
				const userToken = uni.getStorageSync('userToken');

				if (!userId || !userToken) {
					console.log('缺少用户ID或token，跳过logo获取');
					return;
				}

				let _this = this
				var logolist = 'logolist_' + userId
				uni.removeStorageSync(logolist)
				_this.$base.request('wechat/phone', 'GET')
					.then(res => {
						if (res.data.code == 200) {
							var list = res.data.data
							if (list.logo) {
								list.logo = Config.imgapi + list.logo
								// 使用小程序的方式获取图片信息
								uni.getImageInfo({
									src: list.logo,
									success: function(res) {
										console.log('图片信息获取成功:', res);
										if (res.width == res.height) {
											list.loshow = 1
										} else {
											list.loshow = 0
										}
										_this.logolist = list
										uni.setStorageSync(logolist, list)
									},
									fail: function(err) {
										console.error('获取图片信息失败:', err);
										// 如果获取图片信息失败，默认显示logo
										list.loshow = 1
										_this.logolist = list
										uni.setStorageSync(logolist, list)
									}
								})

							}

						} else {
							_Toast.fail(res.data.msg)
						}
					})
					.catch(err => {
						console.error('获取logo信息失败:', err);
					})

			},
			bxbtn(e) {
				this.checked = e.detail
				if (this.infolist.displayButton == 0) {
					if (this.checked && this.infolist.transfer == 1) {
						this.bxname = '充电守护'
					} else {
						this.bxname = '立即充电'
					}
				}

			},
			axbtn(e) {
				this.onecmchecked = e.detail
			},
			cxbtn(e) {
				this.lscmchecked = e.detail
			},
			dxbtn(e) {
				this.longcheck = e.detail
			},
			exbtn(e) {
				this.xychecked = e.detail
			},
			//打开保险弹窗
			bxxy() {
				uni.navigateTo({
					url: '../protocol_specification/protocol_specification'
				})
				// this.cshow = true
			},
			//关闭保险弹窗
			cshowclose() {
				this.cshow = false
			},
			//打开电动车安全使用承诺书
			clshow() {
				this.cxyshow = true
			},
			//关闭电动车安全使用承诺书
			clshowclose() {
				this.cxyshow = false
			},
			//账户充值
			czbtn() {
				uni.navigateTo({
					url: '../account_recharge/account_recharge?powerontype=' + 1
				});
			},
			gzbtn() {
				this.gzshow = true
			},
			changbtn() {
				Dialog.alert({
					title: '提示',
					message: '长充模式：当用户充满自停后将一直保持供电，此时段内的功率将按照充电器最大功率的比例换算成相应时长，不会多收用户的费用，旨在解决某些用户充不满的问题。',
				}).then(() => {
					// on close
				});
			},
			//关闭服务费套餐弹窗
			fwfeiclose() {
				this.fwtan = false
			},
			//购买服务费套餐
			buyfuwu(id) {
				if (!this.endTimeStr) {
					Dialog.confirm({
						title: '提示',
						message: "确认购买套餐？",
					}).then(() => {
						let data = {
							areaId: this.areaId,
							projectId: this.projectId,
							serviceDetailId: id
						}
						uni.showLoading({
							title: '请稍候',
							mask: true
						})
						this.$base.request('user/servicePackage', 'POST', data)
							.then(res => {
								uni.hideLoading()
								if (res.data.code == 200) {
									Toast.success('购买成功')
									this.fwtan = false
									this.flmap()
								} else if (res.data.code == 20006) {
									this.czbtn()
								} else {
									Toast.fail(res.data.msg)
								}

							})
							.catch(err => {

							})
					}).catch(() => {

					});

				} else {
					Toast.fail('你已购买过套餐,请勿重复购买')
				}

			},
			flmap() {
				let data = {
					areaId: this.areaId,
					projectId: this.projectId,
				}
				uni.showLoading({
					title: '请稍候',
					mask: true
				})
				this.$base.request('charge/rate', 'GET', data)
					.then(res => {
						uni.hideLoading()
						if (res.data.code == 200) {
							this.projectServiceDetailList = res.data.data.projectServiceDetailList
							this.endTimeStr = res.data.data.endTimeStr
							if (this.endTimeStr) {
								this.xzchecked = '1'
							}
							this.fuwumoney = res.data.data.oftenList[0].num / 100
						}

					})
					.catch(err => {

					})
			},
			//普通充电
			bxcolose() {
				this.isSafe = 0
				this.cdbtnson()
				this.warnshow = false
			},
			//守护充电
			bxque() {
				this.checked = true
				this.tapcdb()
				this.warnshow = false
			},
			seluser() {
				let data = {
					deviceId: this.deviceId
				}
				this.$base.request('charge/safe/random', 'GET', data)
					.then(res => {
						if (res.data.code == 200) {
							this.yonghunum = res.data.data
						} else {
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {

					})
			},
			// 获取用户强制结算的充电柜订单
			occfirst() {
				let data = {
					deviceId: this.deviceId
				}
				this.$base.request('charging/occ/end/list', 'GET', data)
					.then(res => {
						if (res.data.code == 200) {
							if (res.data.data.length > 0) {
								this.occlist = res.data.data
								this.occshow = true
							} else {
								this.occ()
								this.occ1()
							}
						} else {
							Toast.fail(res.data.msg)
							this.occ()
							this.occ1()
						}

					})
					.catch(err => {

					})
			},
			know() {
				let data = {
					deviceId: this.deviceId
				}
				this.$base.request('charging/occ/alert', 'POST', data)
					.then(res => {
						if (res.data.code == 200) {
							this.occshow = false
							this.occ()
							this.occ1()
						} else {
							Toast.fail(res.data.msg)
							this.occshow = false
							this.occ()
							this.occ1()
						}
					})
					.catch(err => {

					})
			},
			knowclose() {
				this.occshow = false
				this.occ()
				this.occ1()
			},
			guanggao() {
				let data = {
					point: 'charge',
					projectId: this.infolist.projectId,
					token: uni.getStorageSync('userToken')
				}
				this.$base.request('poster/getPosterList', 'POST', data)
					.then(res => {
						if (res.data.code == 200) {
							this.posterList = res.data.data
							if (this.posterList.length > 0) {
								this.poster = 1
								this.ggshow=1
							} else {
								this.poster = 0
							}
						} else {
							this.poster = 0
						}
					})
					.catch(err => {

					})
				// this.getbtn()
			},
			gogd(url, jump, msg, libId, teamId) {
				if (jump == 'PU' || jump == 'SA') {
					if (url != 0) {
						let point = 'charge'
						this.ggadd(libId, teamId, point)
						// window.location.href = url
						uni.navigateTo({
							url: '/pages/webview/webview?url=' + url
						});
						this.ontime = 0
					}
				} else if (jump == 'PA') {
					let point = 'charge'
					this.ggadd(libId, teamId, point)
					uni.navigateTo({
						url: '/pageone/ad_details/ad_details?msg=' + msg
					});
					this.ontime = 0
				} else if (jump == 'PPRO') {
					let point = 'charge'
					this.ggadd(libId, teamId, point)
					this.ontime = 0
				}

			},
			ggadd(libId, teamId, point) {
				let data = {
					systemId: 0,
					libId: libId,
					teamId: teamId,
					point: point,
					appid: uni.getStorageSync('user').appid,
					projectId: uni.getStorageSync('user').projectId
				}
				this.$base.request('posterClickMsg/add', 'POST', data)
					.then(res => {

					})
					.catch(err => {

					})
			},
			getSafeMonth() {
				var data = {
					token: uni.getStorageSync('userToken')
				}
				this.$base.request('recharge/getSafeMonth', 'GET', data)
					.then(res => {
						if (res.data.code == 200) {
							this.shbylist = res.data.data
						} else {
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {

					})
			},

			shbygb() {
				this.shbyshow = false
			},
			openwxts() {
				this.wxtsshow = true
				this.wxtsnum = 1
				this.wxtszj = this.shbylist.monthPrice
			},
			goshby() {
				this.shbyshow = false
				this.wxtsshow = true
				this.wxtsnum = 1
				this.wxtszj = this.shbylist.monthPrice
			},
			closewxts() {
				this.wxtsshow = false
			},
			surewxts() {
				var data = {
					token: uni.getStorageSync('userToken'),
					num: this.wxtsnum,
					money: this.shbylist.monthPrice,
					totalMoney: this.wxtszj
				}
				uni.showLoading({
					title: '请稍候',
					mask: true
				})
				this.$base.request('safe/monthBuy', 'POST', data)
					.then(res => {
						if (res.data.code == 200) {
							Toast.success('购买成功')
							uni.hideLoading()
							this.wxtsshow = false
							setTimeout(() => {
								this.infoshow();
							}, 1500)

						} else {
							Toast.fail(res.data.msg)
							uni.hideLoading()
							this.wxtsshow = false

						}
					})
					.catch(err => {

					})
			},
			wxtsChange(value) {
				this.wxtszj = (this.wxtsnum * this.shbylist.monthPrice).toFixed(2)
			},
			callphone(phone) {
				if (phone) {
					uni.makePhoneCall({
						phoneNumber: phone.toString()
					}).catch((e) => {
						// console.log(e)  //用catch(e)来捕获错误{makePhoneCall:fail cancel}
					})
				} else {
					Toast.fail('暂无客服')
				}
			},
			vipgo() {
				uni.navigateTo({
					url: '/pages/guard_vip/guard_vip'
				})
			}

		}
	}
</script>
<style>
	page {
		height: 100%;
		background-color: #242225;

	}
	::-webkit-scrollbar {
	        width: 0 !important;
	        height: 0 !important;
	    }
</style>
<style lang="scss">
	.main {
		width: 100%;
		height: 100vh;
		overflow-x: hidden;
		.check-popup {
			width: 80%;
			padding: 30upx;
			box-sizing: border-box;

			&-icon {
				text-align: right;
			}

			&-but {
				width: 100%;
				margin-top: 40upx;
			}

			.title {
				padding: 20upx 0;
				text-align: center;
				font-weight: bold;
				font-size: 36upx;
			}

			.content {
				text-align: center;
				line-height: 50upx;
				font-size: 30upx;
			}
		}

		.hand {

			width: 100%;
			background-color: #242225;
			font-size: 30upx;
			padding: 20upx 0;
			font-family: PingFang SC Bold, PingFang SC Bold-Bold;
			font-weight: 700;
			text-align: center;
			color: #ffffff;
			position: relative;

			image {
				width: 22upx;
				height: 39upx;
				position: absolute;
				left: 31upx;
				top: 22upx;
			}
		}

		.foothand {
			width: 90%;
			background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
			border-radius: 24upx;
			padding: 10upx 24upx;
			margin: 0 auto;
			box-sizing: border-box;
			margin-top: 30upx;
			color: #fff;
		}

		.gtap {
			width: 649upx;
			height: 240upx;
			border-radius: 16upx;
			margin: 0 auto;
			// padding-bottom: 150upx;
			margin-bottom: 50upx;

			image {
				width: 649upx;
				height: 240upx;
				border-radius: 16upx;
			}

			.tapone {
				width: 649upx;
				height: 240upx;
				border-radius: 16upx;
				position: relative;

				.taponesun {
					width: 100%;
					height: 100%;
					border-radius: 16upx;
					background-repeat: no-repeat;
					background-position: center center;
					background-size: 100% 100%;
				}
			}
		}

		.gztan {
			width: 650upx;
			background-color: #FFFFFF;
			text-align: center;
			padding: 70upx 0;

			.gztanimg {
				width: 350upx;
				height: 350upx;
				margin: 0 auto;

				img {
					width: 350upx;
					height: 350upx;
				}
			}

			.gztantxt {
				margin-top: 30upx;
				font-size: 20upx;
			}
		}

		.hdlogo {
			width: 100%;
			padding: 50upx;

			image {
				width: 213upx;
				height: 64upx;
			}

		}

		.hdlogo1 {
			width: 100%;
			padding: 10upx 50upx;

			image {
				width: 160upx;
				height: 160upx;
			}

		}

		.showhand {
			width: 100%;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 45upx;
			margin-bottom: 10upx;

			.sone {

				border-radius: 20upx;
				background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
				font-size: 28upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				padding: 20upx 40upx;
				border: 2upx solid #FFFFFF;
			}

			.sone1 {
				padding: 20upx 40upx;
				border-radius: 20upx;
				font-size: 28upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				background: #434045;
				border: 2upx solid #FFFFFF;
			}
		}

		.map {
			width: 686upx;
			margin: 0 auto;
			border-radius: 16upx;
			background-color: #242225;
			box-sizing: border-box;

			.mapone {
				background: #343136;
				border-radius: 24upx;
				box-sizing: border-box;
				padding: 24upx 30upx;
				margin-top: 24upx;

				.mhand {
					display: flex;
					width: 100%;
					box-sizing: border-box;
					font-size: 24upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #D0D0D0;
				}

				.mtap {
					width: 100%;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					box-sizing: border-box;

					.mchu {
						padding: 40upx 0;
						width: 160upx;
						background: rgba(236, 101, 28, 0.14);
						border-radius: 24upx;
						border: 3upx solid #EC651C;
						font-size: 28upx;
						font-family: PingFang SC Bold, PingFang SC Bold-Bold;
						font-weight: 700;
						text-align: left;
						color: #ffffff;
						text-align: center;
						margin-top: 32upx;
						position: relative;

						.mfx {
							font-size: 18upx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							text-align: center;
							padding: 2upx 10upx;
							background-color: #FF6262;
							position: absolute;
							top: 0upx;
							border-radius: 24upx 0 0 0;
						}

						.shuc {
							width: 100%;
							box-sizing: border-box;
							display: flex;
							padding: 0 10upx;

							input {
								width: 50%;
								border-bottom: 1upx solid #FFFFFF;

								// margin-top: 10upx;
								/deep/.uni-input-placeholder {
									color: #FFFFFF;
								}
							}
						}
					}

					.mchu1 {
						padding: 40upx 0;
						width: 160upx;
						background: #434045;
						border-radius: 24upx;
						font-size: 28upx;
						font-family: PingFang SC Bold, PingFang SC Bold-Bold;
						font-weight: 700;
						text-align: left;
						color: #FFFFFF;
						text-align: center;
						border: 3upx solid #434045;
						margin-top: 32upx;
						position: relative;

						.mfx {
							font-size: 18upx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							text-align: center;
							padding: 2upx 10upx;
							background-color: #FF6262;
							position: absolute;
							top: 0upx;
							border-radius: 24upx 0 0 0;
						}
					}


				}

				.tishi {
					width: 100%;
					box-sizing: border-box;
					padding: 0 18upx;
					font-size: 24upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #666666;
					margin-bottom: 40upx;

					view {
						margin-bottom: 15upx;
					}
				}

				.tishi1 {
					background: #434045;
					box-sizing: border-box;
					padding: 36upx;
					border-radius: 24upx;
					font-size: 24upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFA02E;
					margin-top: 24upx;

					.tishi1tap {
						width: 100%;
						display: flex;
						align-items: center;
						margin-top: 20upx;
						color: #FED8AB;

						image {
							width: 35upx;
							height: 35upx;
							margin-right: 10upx;
						}

						span {
							color: #FFA02E;
						}
					}

				}

				.tishi2 {
					background: #434045;
					box-sizing: border-box;
					padding: 36upx;
					border-radius: 24upx;
					font-size: 30upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFA02E;
					margin-top: 24upx;
					display: flex;
					align-items: center;

					/deep/.van-checkbox__icon {
						border-radius: 50%;
						border-color: #FFA02E;
					}

					/deep/.van-checkbox__icon--checked {
						background-color: #FFA02E;
						border-color: #FFA02E;
						border-radius: 50%;
					}

					/deep/.van-checkbox__label {
						color: #FFA02E;
					}
				}

				.tishi3 {
					background: rgba(236, 101, 28, 0.14);
					box-sizing: border-box;
					padding: 36upx;
					border-radius: 24upx;
					font-size: 30upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFA02E;
					margin-top: 24upx;
					display: flex;
					align-items: center;

					/deep/.van-checkbox__icon {
						border-radius: 50%;
						border-color: #FFA02E;
					}

					/deep/.van-checkbox__icon--checked {
						background-color: #FFA02E;
						border-color: #FFA02E;
						border-radius: 50%;
					}

					/deep/.van-checkbox__label {
						color: #FFA02E;
					}
				}

				.tishi5 {
					background: #434045;
					box-sizing: border-box;
					padding: 36upx;
					border-radius: 24upx;
					font-size: 30upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFA02E;
					margin-top: 24upx;
					display: flex;
					align-items: center;
					position: relative;

					image {
						width: 166upx;
						height: 53upx;
						position: absolute;
						top: 0upx;
						left: 0upx
					}

					/deep/.van-checkbox__icon {
						border-radius: 50%;
						border-color: #FFA02E;
					}

					/deep/.van-checkbox__icon--checked {
						background-color: #FFA02E;
						border-color: #FFA02E;
						border-radius: 50%;
					}

					/deep/.van-checkbox__label {
						color: #FFA02E;
					}
				}

				.tishi4 {
					box-sizing: border-box;
					padding: 36upx;
					border-radius: 24upx;
					background: #343136;
					box-shadow: inset 0px 0px 26px 6px rgba(236, 101, 28, 0.58);
					font-size: 30upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFA02E;
					margin-top: 24upx;
					display: flex;
					align-items: center;
					position: relative;

					image {
						width: 166upx;
						height: 53upx;
						position: absolute;
						top: 0upx;
						left: 0upx
					}

					/deep/.van-checkbox__icon {
						border-radius: 50%;
						border-color: #FFA02E;
					}

					/deep/.van-checkbox__icon--checked {
						background-color: #FFA02E;
						border-color: #FFA02E;
						border-radius: 50%;
					}

					/deep/.van-checkbox__label {
						color: #FFA02E;
					}
				}

				.tishi6 {
					background: #434045;
					box-sizing: border-box;
					padding: 36upx;
					border-radius: 24upx;
					font-size: 30upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFA02E;
					margin-top: 24upx;
					display: flex;
					align-items: center;
					position: relative;
					justify-content: space-between;

					.tishi6txt {
						display: flex;
						align-items: center;
						font-size: 36upx;
						font-weight: bold;
						color: #FFA02E;

						.tishi6txtone {
							text-decoration: line-through;
							font-size: 22upx;
							font-weight: 400;
							color: #FFFFFF;
							margin-right: 8upx;
						}
					}

					.vipimg {
						width: 166upx;
						height: 53upx;
						position: absolute;
						top: 0upx;
						right: 0upx;
						background-image: url('../../static/tabBarimg/shbylj.png');
						background-repeat: no-repeat;
						background-size: cover;
						background-position: center center;
						font-size: 20upx;
						font-weight: 400;
						color: #F7FAFB;
						text-align: center;
					}

				}

				.tishi7 {
					width: 100%;
					height: 83upx;
					background-image: url('../../static/tabBarimg/huiyuancard.png');
					background-repeat: no-repeat;
					background-size: cover;
					background-position: center center;
					padding: 0 24upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					margin-top: 24upx;
					border-radius: 20upx;

					.tishi7one {
						display: flex;
						align-items: center;
						font-size: 26upx;
						font-weight: 400;
						color: #6A4714;

						image {
							width: 36upx;
							height: 33upx;
							margin-right: 13upx;
						}
					}

					.tishi7two {
						background: linear-gradient(270deg, #492D04 0%, #6A4714 77%, #875916 99%, #875916 100%);
						border-radius: 25upx;
						padding: 10upx 24upx;
						text-align: center;
						font-size: 24upx;
						font-family: Source Han Sans CN-Normal, Source Han Sans CN;
						font-weight: 400;
						color: #F0E1C9;
					}
				}

				.xza {
					.xza1 {
						font-size: 30upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 600;
						color: #D0D0D0;
						text-align: left;
						margin: 20upx 0;
					}

					.xzb1 {
						background: rgba(236, 101, 28, 0.14);
						border-radius: 24upx;
					}

					.xzb2 {
						background: #434045;
						border-radius: 24upx;
					}

					/deep/.van-radio__label {
						color: #FFA02E;
					}

					/deep/.van-radio-group {
						display: flex;
						justify-content: space-between;
					}

					/deep/.van-radio {
						box-sizing: border-box;
						padding: 36upx 40upx;
						font-size: 30upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;

					}

					/deep/.van-radio__icon--checked {
						background-color: #FFA02E;
						border-color: #FFA02E;
					}
				}
			}

			.lun {
				width: 100%;
				box-sizing: border-box;
				margin-top: 40upx;

				/deep/.van-notice-bar {
					border-radius: 24upx;
					height: 70upx;
				}
			}

			.mshow {
				width: 100%;
				box-sizing: border-box;
				margin-top: 36upx;
				padding-bottom: 10upx;
				background: #343136;
				border-radius: 24upx;

				.mslist {
					width: 100%;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					padding: 22upx 36upx;

					.msleft {
						font-size: 30upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #D0D0D0;
						text-align: left;
						width: 25%;
					}

					.msright {
						font-size: 30upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						text-align: left;

						width: 64%;
						text-align: center;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

				}


			}
		}

		.dbtap {
			font-size: 28upx;
			font-family: PingFang SC Regular, PingFang SC Regular-Regular;
			font-weight: 400;
			color: #999999;
			box-sizing: border-box;
			padding: 0 47upx;
			margin-top: 15upx;
			padding-bottom: 160upx;
		}

		.buyby {
			width: 160upx;
			background-color: #007AFF;
			font-size: 28upx;
			font-family: PingFang SC Medium, PingFang SC Medium-Medium;
			font-weight: 700;
			color: #fff;
			text-align: center;
			padding: 15upx 0;
			border-radius: 12upx;
			margin: 0 47upx;
			margin-top: 10upx;
			margin-bottom: 160upx;
		}

		.double {
			position: fixed;
			display: flex;
			bottom: 40upx;
			left: 5%;
			width: 90%;
			justify-content: space-between;
			box-sizing: border-box;

			.leftbtn {
				width: 30%;
				height: 98upx;
				font-size: 32upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				color: #ED681C;
				text-align: center;
				line-height: 98upx;
				background: linear-gradient(180deg, #FFE8C2 0%, #FFC387 100%);
				border-radius: 36upx;
			}



			.rightbtn {
				width: 66%;
				height: 98upx;
				font-size: 34upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				color: #fdfdfd;
				text-align: center;
				line-height: 98upx;
				background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
				border-radius: 36upx;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 25upx;
					height: 30upx;
					margin-right: 8upx;
				}

				/deep/.van-button__text {
					display: flex;
					align-items: center;
				}
			}

			.zhongbtn {
				width: 66%;
				height: 98upx;
				font-size: 34upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				color: #fdfdfd;
				display: flex;

				.zhongbtnone {
					width: 50%;
					height: 98upx;
					line-height: 98upx;
					text-align: center;
					background: linear-gradient(180deg, #FFE175 0%, #FF9D07 100%);
					border-radius: 36upx 0upx 0upx 36upx;
				}

				.zhongbtntwo {
					width: 50%;
					height: 98upx;
					line-height: 98upx;
					text-align: center;
					background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 0upx 36upx 36upx 0upx;

					image {
						width: 25upx;
						height: 30upx;
						margin-right: 8upx;
					}
				}

				.zhongbtnthree {
					width: 100%;
					height: 98upx;
					line-height: 98upx;
					text-align: center;
					background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 36upx;

					image {
						width: 25upx;
						height: 30upx;
						margin-right: 8upx;
					}
				}
			}

		}

		.tan {
			/deep/.van-popup {
				border-radius: 16upx;
				overflow-x: hidden;
			}

			.tannei {
				width: 686upx;
				background-color: #FFFFFF;

				.tnhand {
					font-size: 32upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					text-align: center;
					line-height: 72upx;
					color: #333333;
				}

				.tnfoot {
					.tftxt {
						font-size: 28upx;
						font-family: PingFang SC Medium, PingFang SC Medium-Medium;
						font-weight: 500;
						text-align: center;
						line-height: 50upx;
						color: #333333;
					}

					.tfshow {
						width: 100%;
						box-sizing: border-box;
						display: flex;
						margin-top: 35upx;

						.tfbtn {
							width: 33.33%;
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							text-align: center;
							line-height: 80upx;
							color: #ffffff;
						}

						.tfbtn1 {
							width: 50%;
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							text-align: center;
							line-height: 80upx;
							color: #ffffff;
						}

						.tfbtn2 {
							width: 100%;
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							text-align: center;
							line-height: 80upx;
							color: #ffffff;
						}

						.color1 {
							background-color: #B5B5B5;
						}

						.color2 {
							background-color: #4BED79;
						}

						.color3 {
							background-color: #4B98ED;
						}
					}
				}
			}

			.tannei1 {
				width: 580upx;
				background-color: #FFFFFF;

				.tnhand {
					width: 100%;
					align-items: center;

					.tntxt {
						font-size: 34upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #111111;
						padding-top: 36upx;
						text-align: center;
						position: relative;
					}

					image {
						width: 50upx;
						height: 50upx;
						position: absolute;
						top: 19upx;
						right: 18upx;
					}
				}

				.tnfoot {
					width: 100%;
					margin-top: 24upx;
					margin-bottom: 27upx;
					text-align: center;
					font-size: 30upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #3A4044;

					.tfshang {

						margin-bottom: 15upx;
					}

					.tfshang1 {
						font-size: 24upx;
						font-family: PingFang SC Medium, PingFang SC Medium-Medium;
						font-weight: 500;
						text-align: center;
						color: #EC651C;
						margin-top: 70upx;
					}

					.tfxia {

						line-height: 65upx;
					}

					.tfxia1 {
						font-size: 28upx;
						font-family: PingFang SC Medium, PingFang SC Medium-Medium;
						font-weight: 500;
						text-align: center;
						color: #EC651C;
						line-height: 65upx;
					}

					.wxcodeimg {
						width: 260upx;
						height: 260upx;
						margin: 47upx auto;

						image {
							width: 260upx;
							height: 260upx;
						}
					}

					.wxtxt {
						width: 100%;
						box-sizing: border-box;
						padding: 0 45upx;
						font-size: 28upx;
						font-family: PingFang SC Medium, PingFang SC Medium-Medium;
						font-weight: 500;
						text-align: left;
						color: #333333;
						line-height: 50upx;
					}

				}
			}

			.czone {
				width: 686upx;
				position: relative;
				padding: 0 30upx;
				box-sizing: border-box;
				height: 950upx;

				.cznei {
					width: 100%;
					box-sizing: border-box;
					padding-bottom: 40upx;

					.czneihand {
						font-size: 32upx;
						font-family: PingFang SC Bold, PingFang SC Bold-Bold;
						font-weight: 700;
						text-align: center;
						color: #333333;
						margin: 20upx 0;

					}

					.czneione {
						margin-top: 20upx;

						.cztxtone {
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							color: #333333;
							line-height: 45upx;
						}

						.cztxttwo {
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 700;
							color: #333333;
							margin: 10upx 0;
						}
					}
				}

				.czdel {
					position: absolute;
					top: 5upx;
					right: 35upx;

					image {
						width: 40upx;
						height: 40upx;
					}
				}
			}

			.flex {
				display: flex;
				justify-content: space-around;
			}

			.tannei2 {
				width: 686upx;
				background-color: #FFFFFF;

				.tquxiao {
					width: 160upx;
					height: 64upx;
					border: 1upx solid #000000;
					border-radius: 16upx;
					line-height: 64upx;
					margin: 92upx auto;
					font-size: 28upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					text-align: center;
				}

				.open {
					background-color: #1e98d7;
					color: #ffffff;
					width: 160upx;
					height: 64upx;
					border: 1upx solid #1e98d7;
					border-radius: 16upx;
					line-height: 64upx;
					margin: 92upx auto;
					font-size: 28upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					text-align: center;
				}

				.tnhand {
					width: 100%;
					padding-top: 58upx;

					.tntxt {
						font-size: 34upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 700;
						color: #111111;
						line-height: 64upx;
						text-align: center;
						position: relative;
					}

					image {
						width: 25upx;
						height: 25upx;
						position: absolute;
						top: 19upx;
						right: 18upx;
					}
				}

				.tfshow {
					width: 100%;
					box-sizing: border-box;
					display: flex;
					margin: 35upx 0;
					justify-content: center;

					.tfbtn {
						width: 33.33%;
						font-size: 28upx;
						font-family: PingFang SC Medium, PingFang SC Medium-Medium;
						font-weight: 500;
						text-align: center;
						line-height: 80upx;
						color: #ffffff;
					}

					.tfbtn1 {
						width: 230upx;
						font-size: 34upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #3A4044;
						text-align: center;

					}

					.tfbtn2 {
						width: 100%;
						font-size: 28upx;
						font-family: PingFang SC Medium, PingFang SC Medium-Medium;
						font-weight: 500;
						text-align: center;
						line-height: 80upx;
						color: #ffffff;
					}

					.color1 {
						background-color: #B5B5B5;
					}

					.color2 {
						background-color: #4BED79;
					}

					.color3 {
						background-color: #4B98ED;
					}
				}

				.fwfei {
					width: 600upx;
					border-radius: 16upx;
					margin: 0 auto;
					box-shadow: 0upx 4upx 9upx 0upx rgba(44, 44, 44, 0.21);
					display: flex;
					box-sizing: border-box;
					justify-content: space-between;
					align-items: center;
					padding: 27upx 24upx;
					margin-bottom: 30upx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.fwfeileft {
						font-size: 28upx;
						font-family: PingFang SC Medium, PingFang SC Medium-Medium;
						font-weight: 500;
						color: #333333;
					}

					.fwfeiright {
						padding: 10upx 20upx;
						border-radius: 10upx;
						background-color: #FFA02E;
						color: #FFFFFF;
						font-size: 22upx;
					}
				}

				.tnfoot {
					width: 100%;
					margin-top: 24upx;
					margin-bottom: 27upx;
					box-sizing: border-box;
					padding: 0 36upx;

					.yancodetxt {
						font-size: 28upx;
						font-family: PingFang SC Medium, PingFang SC Medium-Medium;
						font-weight: 500;
						text-align: center;
						color: #333333;
					}

					.yannum {
						width: 442upx;
						height: 88upx;
						background-color: #7BF199;
						border-radius: 10upx;
						font-size: 60upx;
						font-family: Arial Black, Arial Black-Black;
						font-weight: 900;
						text-align: center;
						line-height: 88upx;
						color: #333333;
						margin: 0 auto;
						margin-top: 34upx;
					}

					.yztap {
						.yanbtn {
							width: 255upx;
							height: 77upx;
							border-radius: 10upx;
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							color: #ffffff;
							text-align: center;
							line-height: 77upx;
							background-color: #4B98ED;
							margin: 0 auto;
							margin-top: 22upx;
						}
					}

					.yzhand {
						font-size: 32upx;
						font-family: PingFang SC Bold, PingFang SC Bold-Bold;
						font-weight: 700;
						text-align: center;
						color: #333333;
						margin-top: 74upx;
					}

					.yzfoot {
						width: 100%;
						display: flex;
						margin-top: 36upx;
						box-sizing: border-box;
						padding-right: 13upx;

						.tzfootleft {
							width: 399upx;
							height: 435upx;

							image {
								width: 399upx;
								height: 435upx;
							}
						}

						.tzfootright {
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							line-height: 50upx;
							color: #333333;
							margin-left: 27upx;
						}
					}

					.tfone {
						background: #FFECE2;
						border-radius: 24upx;
						box-sizing: border-box;
						padding: 14upx 24upx;

						.tftwo {
							font-size: 28upx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #111111;
							margin-bottom: 10upx;
						}
					}


					.duanlist {
						width: 100%;
						box-sizing: border-box;
						padding: 26upx;
						display: flex;
						flex-wrap: wrap;
						justify-content: center;

						.duantap {
							margin: 14upx 0;
							width: 230upx;
							background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
							border-radius: 24upx;
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							text-align: center;
							padding: 29upx 0;
							color: #FFFFFF;
							margin-right: 40upx;
						}

						.duantap1 {
							margin: 14upx 0;
							width: 230upx;
							border-radius: 24upx;
							border: 3upx solid #D0D0D0;
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							text-align: center;
							padding: 29upx 0;
							color: #3A4044;
							margin-right: 40upx;
						}

					}

					.duanlist1 {
						width: 100%;
						box-sizing: border-box;
						display: flex;
						flex-wrap: wrap;

						// justify-content: center;

						.activePort {
							background-color: #40d851;
							color: #ffffff !important;
							border: 1upx solid #40d851;
						}

						.duantap {
							margin: 14upx 0;
							width: 135upx;
							height: 88upx;
							border: 1upx solid #F55454;
							border-radius: 18upx;
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							text-align: center;
							// line-height: 88upx;
							color: #F55454;
							margin-left: 15upx;
						}

						.duantap1 {
							margin: 14upx 0;
							width: 135upx;
							height: 88upx;
							border: 1px solid #4B98ED;
							border-radius: 18upx;
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							text-align: center;
							line-height: 42upx;
							color: #4B98ED;
							margin-left: 15upx;
						}

						/** 0=空闲 */
						.port0 {
							color: #40D851;
							border: 1upx solid #40D851;
						}

						/** 1=充电中 */
						.port1 {
							color: #CDCDCD;
							border: 1upx solid #CDCDCD;
						}

						/** 2=未充占用 */
						.port2 {
							color: #BC12ED;
							border: 1upx solid #BC12ED;
						}

						/** 3=充满占用 */
						.port3 {
							color: #0103FD;
							border: 1upx solid #0103FD;
						}

						/** 4=端口故障 */
						.port4 {
							color: #E40C00;
							border: 1upx solid #E40C00;
						}

						/** 5=浮充 */
						.port5 {
							color: #06F9E0;
							border: 1upx solid #06F9E0;
						}

						/** 6=存储器损坏 */
						.port6 {
							color: #005BAC;
							border: 1upx solid #005BAC;
						}

						/** 7=安全门卡住 */
						.port7 {
							color: #d3ac2b;
							border: 1upx solid #d3ac2b;
						}

						/** 8=保险丝烧断 */
						.port8 {
							color: #009DA2;
							border: 1upx solid #009DA2;
						}

						/** 9=继电器粘连 */
						.port9 {
							color: #ee45e4;
							border: 1upx solid #ee45e4;
						}

						/** 10=门磁芯片损坏 */
						.port10 {
							color: #FDF204;
							border: 1upx solid #FDF204;
						}

						/** 88=绑定端口 */
						.port88 {
							color: #ffac93;
							border: 1upx solid #ffac93;
						}

						/** 99=禁用端口 */
						.port99 {
							color: #400000;
							border: 1upx solid #400000;
						}

					}

					.duanbtn {
						width: 570upx;
						height: 88upx;
						border-radius: 16upx;
						background-color: #4B98ED;
						font-size: 32upx;
						font-family: PingFang SC Medium, PingFang SC Medium-Medium;
						font-weight: 500;
						text-align: center;
						color: #ffffff;
						line-height: 88upx;
						margin: 55upx auto;
					}
				}

				.kshow {
					width: 100%;
					box-sizing: border-box;
					padding: 33upx 36upx;
					background-color: #FFFFFF;
					margin-top: 51upx;

					.kone {
						width: 100%;
						margin-bottom: 20upx;

						input {
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							color: #999999;
							border-bottom: 1upx solid #e8e8e8;
							padding: 11upx 0;
						}

					}

					.ktwo {
						width: 100%;
						box-sizing: border-box;
						/deep/.tclass {
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							color: #999999;
						}
						/deep/.tclass1 {
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 700;
							color: #333333;
						}
						/deep/.van-cell {
							padding: 18upx 0upx;
						}
						/deep/.van-radio__label {
							font-size: 28upx;
							font-family: PingFang SC Bold, PingFang SC Bold-Bold;
							font-weight: 700;
							color: #333333;
							margin-left: 90upx;
						}
						/deep/.van-radio__icon {
							height: 40upx !important;
							/deep/.van-icon {
								width: 40upx;
								height: 40upx;
								border: 1upx solid #cccccc;
							}
							width: 40upx;
							height: 40upx;
							margin-left: 80upx;
						}
						/deep/.van-radio {
							// margin-bottom: 15upx;
							height: 70upx;
						}
						/deep/.van-collapse-item__wrapper {
							box-shadow: 0px 16upx 8upx -10upx #cacaca;
							margin-bottom: 10upx;
						}
					}

					.kthree {
						.kthreehand {
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							color: #333333;
							margin-top: 33upx;

							.khtxttwo {
								font-size: 24upx;
								color: #666666;
							}
						}

						.kthreefoot {
							width: 100%;
							box-sizing: border-box;
							margin-top: 21upx;

							/deep/.van-cell {
								background-color: #F0F0F0;
								height: 236upx;
								border-radius: 16upx;
							}
						}
					}

					.kfour {
						width: 100%;
						box-sizing: border-box;
						margin-top: 35upx;

						.kfourtxt {
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							color: #333333;

							.kfourbud {
								font-size: 24upx;
								color: #666666;
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
						width: 570upx;
						height: 88upx;
						background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
						border-radius: 16upx;
						font-size: 32upx;
						font-family: PingFang SC Bold, PingFang SC Bold-Bold;
						font-weight: 700;
						text-align: center;
						line-height: 88upx;
						margin: 0 auto;
						margin-top: 59upx;
						color: #ffffff;
					}
				}
			}

			.tishione {
				width: 686upx;
				height: 211upx;
				opacity: 0.7;
				border-radius: 10upx;
				font-size: 28upx;
				font-family: PingFang SC Medium, PingFang SC Medium-Medium;
				font-weight: 500;
				color: #ffffff;
				background-color: #B5B5B5;
				box-sizing: border-box;
				padding: 43upx 61upx 42upx 38upx;
			}
		}

		.tanshi {
			width: 600upx;
			padding: 100upx 0;

			.xz {
				text-align: center;
				padding: 0 30upx;

				image {
					width: 300upx;
					height: 289upx;
				}

				.xzone {
					margin-top: 28upx;
					font-weight: bold;
					color: #000000;
					margin-bottom: 80upx;
					font-size: 38upx;

				}

				.xztwo {
					margin-top: 15upx;
					font-weight: 600;
					color: #4587e8;
					font-size: 30upx;
				}

				.xzthree {
					margin-top: 30upx;
					font-weight: 600;
					color: #4e4e4e;
					font-size: 20upx;
					margin-bottom: 40upx;
				}
			}

			.anniu {
				display: flex;
				justify-content: space-between;
				padding: 0 90upx;
				font-weight: 600;
				font-size: 28upx;
				color: #333333;

				.anniu1 {
					width: 130upx;
					height: 55upx;
					line-height: 55upx;
					border-radius: 40upx;
					text-align: center;
					border: #333333 2upx solid;
				}
			}
		}

		.xytanshi {
			width: 600upx;
			padding-top: 40upx;
			padding-bottom: 100upx;

			.shdun {
				width: 155upx;
				height: 177upx;
				margin: 0 auto;

				image {
					width: 155upx;
					height: 177upx;
				}
			}

			.plustore {
				.plustoreone {
					background: linear-gradient(180deg, #FFEAD1 0%, #FFF6EA 100%);
					border-radius: 24upx;
					text-align: center;
					font-size: 34upx;
					width: 484upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 700;
					color: #111111;
					line-height: 48upx;
					margin: 0 auto;
					box-sizing: border-box;
					padding: 25upx 55upx;

					span {
						color: #EC651C;
					}
				}

				.plustoretwo {
					font-size: 30upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 700;
					color: #3A4044;
					line-height: 42upx;
					text-align: center;
					margin-top: 18upx;
					margin-bottom: 51upx;
				}

			}

			.pantap {
				display: flex;
				width: 100%;
				justify-content: space-between;
				align-items: center;
				padding: 0 30upx;
				box-sizing: border-box;

				.pantapone {
					width: 230upx;
					height: 80upx;
					border-radius: 24upx;
					border: 2upx solid #EC651C;
					font-size: 34upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #EC651C;
					line-height: 80upx;
					text-align: center;
				}

				.pantaptwo {
					width: 230upx;
					height: 80upx;
					background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
					border-radius: 24upx;
					font-size: 34upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 80upx;
					text-align: center;
				}
			}

		}

		.occtan {
			/deep/.van-popup {
				border-radius: 16upx;
				overflow-x: hidden;
			}

			.occmap {
				width: 686upx;
				background-color: #F8F8F8;
				padding: 36upx;
				box-sizing: border-box;

				.occfoot {
					background: #fff;
					border-radius: 24upx;
					box-sizing: border-box;
					padding: 14upx 24upx;
					margin-bottom: 20upx;

					.occfootone {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 28upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #3A4044;
						line-height: 33upx;
						align-items: center;
						margin-bottom: 16upx;

						span {
							font-weight: 700;
						}
					}
				}

				.occdibu {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.occdibuone {
						padding: 21upx 50upx;
						background: #636B82;
						border-radius: 16upx;
						color: #fff;
						text-align: center;
					}

					.occdibutwo {
						padding: 21upx 50upx;
						background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
						border-radius: 16upx;
						color: #fff;
						text-align: center;
					}
				}
			}
		}

		.shby {
			/deep/.van-popup {
				background: transparent;
			}

			.shbymap {
				width: 100%;

				.shbymapone {
					width: 614upx;
					height: 729upx;
					background: linear-gradient(180deg, #FFE7BF 0%, #FDC894 100%);
					border-radius: 24upx;
					box-sizing: border-box;
					padding: 30upx 20upx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.shbymaponehand {
						width: 100%;
						box-sizing: border-box;
						text-align: center;
						font-size: 50upx;
						font-weight: bold;
						color: #C87E26;
						padding-top: 26upx;
					}

					.shbymaponehandimg {
						width: 100%;
						height: 280upx;
						margin-top: 10upx;
					}

					.shbymaponetap {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.smapleft {}

						.smapright {
							image {
								width: 155upx;
								height: 177upx;
							}
						}
					}

					.shbymaponedi {
						width: 100%;
						height: 115upx;
						background: rgba(255, 255, 255, 0.48);
						border-radius: 24upx;
						display: flex;
						justify-content: space-between;
						box-sizing: border-box;
						padding: 25upx;
						position: relative;
						align-items: center;

						.smapdifirst {}

						.smapdisecond {
							font-size: 32upx;
							font-weight: bold;
							color: #F96E30;
							display: flex;
							align-items: center;

							.smapdisecondtxt {
								font-size: 18upx;
								font-weight: 400;
								color: #F9652B;
								margin-right: 15upx;
								text-decoration: line-through;
							}
						}

						.smapdithired {
							width: 148upx;
							height: 48upx;
							background-image: url('../../static/tabBarimg/shbylj.png');
							background-repeat: no-repeat;
							background-size: cover;
							background-position: center center;
							text-align: center;
							font-size: 20upx;
							font-weight: 400;
							color: #F7FAFB;
							position: absolute;
							top: 0upx;
							right: 0upx;
						}
					}
				}

				.shbymaptwo {
					width: 100%;
					box-sizing: border-box;
					position: relative;
					padding: 10upx 0;
					margin-top: 68upx;

					.shbymaptwofirst {
						width: 612upx;
						height: 82upx;
						background-image: url('../../static/tabBarimg/shbybgone.png');
						background-repeat: no-repeat;
						background-size: cover;
						background-position: center center;
						padding: 0 26upx;
						display: flex;
						align-items: center;
						font-size: 29upx;
						font-family: Source Han Sans CN-Bold, Source Han Sans CN;
						font-weight: bold;
						color: #F7DDB5;
						box-sizing: border-box;
					}

					.shbymaptwosecond {
						width: 214upx;
						height: 101upx;
						background-image: url('../../static/tabBarimg/shbybgtwo.png');
						background-repeat: no-repeat;
						background-size: cover;
						background-position: center center;
						font-size: 36upx;
						font-family: Source Han Sans CN-Regular, Source Han Sans CN;
						font-weight: 400;
						color: #4F3832;
						display: flex;
						align-items: center;
						justify-content: center;
						position: absolute;
						right: 0upx;
						top: 0upx;
					}
				}

				.shbymapthree {
					width: 100%;
					text-align: center;
					margin-top: 57upx;

					image {
						width: 57upx;
						height: 57upx;
					}
				}
			}
		}

		.wxts {
			/deep/.van-popup {
				background: transparent;
			}

			.wxtsmap {
				width: 544upx;
				background: #FFFFFF;
				border-radius: 24upx;
				padding-top: 37upx;
				padding-bottom: 22upx;

				.wxtsmapone {
					width: 100%;
					text-align: center;
					font-size: 34upx;
					font-family: Yu Gothic UI-Regular, Yu Gothic UI;
					font-weight: 400;
					color: #111111;
				}

				.wxtsmaptwo {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 40upx;

					span {
						font-size: 24upx;
					}
				}

				.wxtsmapthree {
					width: 100%;
					text-align: center;
					font-size: 24upx;
					font-family: Microsoft JhengHei UI-Regular, Microsoft JhengHei UI;
					font-weight: 400;
					color: #3A4044;
					margin-top: 27upx;
				}

				.wxtsmapfour {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 34upx;
					margin-top: 55upx;
				}
			}
		}

		.cmdibu {
			/deep/.van-popup {
				border-radius: 20upx 20upx 0 0;
			}
		}
	}
</style>