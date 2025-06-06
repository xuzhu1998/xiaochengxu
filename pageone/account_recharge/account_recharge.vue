<template>
	<view class="main">
		<tou_hand3 ref="mainindex"></tou_hand3>
		<view class="show">
			<view class="taplist">
				<view :class="tapshow=='1'?'tap':'tap1'" @click="tapbtn(1)">余额充值</view>
				<view :class="tapshow=='2'?'tap':'tap1'" @click="tapbtn(2)">电卡代充</view>
				<view :class="tapshow=='3'?'tap':'tap1'" @click="tapbtn(3)">充电包月</view>
				<view :class="tapshow=='4'?'tap':'tap1'" @click="tapbtn(4)">停车包月</view>
			</view>
			<view v-if="tapshow=='2'||tapshow=='1'">
				<view class="shu" v-if="tapshow=='2'">
					<input placeholder="请输入10位卡号" v-model="carId" @input="goinput" type="number" v-input-limit='0' />
					<input placeholder="请确认卡号" v-model="newcarId" type="number" v-input-limit='0' />
				</view>
				<view class="shu" v-if="tapshow=='2'&&dbshow==1">
					<view class="stct" style="border-radius: 24upx 24upx 0 0;">
						<view class="stctname">用户编号:</view>
						<view class="stcttxt">{{userlist.id}}</view>
					</view>
					<view class="stct" style="border-radius:0 0 24upx 24upx;">
						<view class="stctname">所属小区:</view>
						<view class="stcttxt">{{userlist.projectName}}</view>
					</view>
				</view>
				<view class="numlist" v-if="dbshow==1">
					<view :class="numshow==index+1?'num':'num1'" @click="numbtn(index+1,item.coupon)"
						v-for="(item,index) in showlist" :key="index">
						<view class="zsmap">
							<view class="zsone">{{item.amount}}元</view>
							<view class="zsnei" v-if="item.coupon>0">赠送{{item.coupon}}元</view>
						</view>

						<view class="zeng" v-if="item.coupon>0">赠</view>
					</view>
					<view class="btn" @click="yebtn">
						确认
					</view>
					<view class="checkshow">
						<van-checkbox :value="checked" shape="square" class="reset" @change="surebtn">点击确认充值即代表同意</van-checkbox>
						<view style="margin-bottom: 5upx; color: #60ACFF;" @click="czbtn(1)">《充值协议》</view>
					</view>
				</view>

				<view class="btn" @click="onInput" v-if="dbshow==0">
					查询充值金额
				</view>

				<view class="foottitle" v-if="tapshow=='2'">
					<view style="font-size: 32upx;margin-bottom: 10upx;">友情提示:</view>此为无微信用户的电卡代充值功能,请勿输错卡号,<span
						style='color: #FFA02E;'>一旦充值,不能退费! ! !</span>
				</view>
			</view>
			<view v-else v-if="monthshow&&addNew=='0'">
				<view class="tapthree" v-if="type=='1'">
					<van-collapse v-model="activeNames">
						<van-collapse-item name="1">
							<template #title>
								<view>
									<view class="tphand">{{baoyue.packageName}}</view>
									<view class="tpfoot" v-if="baoyue.types=='A3'">
										包月价格{{baoyue.standard}}元/{{baoyue.numStr}}次</view>
									<view class="tpfoot" v-if="baoyue.types=='A1'">
										包月价格{{baoyue.standard}}元/{{baoyue.numStr}}小时</view>
								</view>
							</template>
							<view class="showtap">
								<view class="stone">
									<span style="color: #FFA02E;"
										v-if="baoyue.types=='A1'">包月价格为{{baoyue.standard}}元/{{baoyue.numStr}}小时</span>
									<span style="color: #FFA02E;"
										v-if="baoyue.types=='A3'">包月价格为{{baoyue.standard}}元/{{baoyue.numStr}}次</span>
									，按照自然月计算， 如购买一个月，则有效期到本月底。<br />
									计算方法:本月费用=包月费用/30*本月剩余天数;<br />
									如购买2个月则有效期到下月底。<br />
									当月的包月套餐不能退款。
								</view>
								<view class="stwo">
									<view class="stleft" style="display: flex;align-items: center;">
										<view style="color: #FFFFFF;margin-right: 15upx;font-size: 30upx;">请选择购买月数
										</view>
										<van-stepper v-model="numtitle" max="12" disable-input @change="onChange" />
									</view>
									<view class="stright">
										<!-- <view class="srtxt">
											总支付：<span style="color: #45CC21;">{{bynum}}元</span>
										</view> -->
										<view class="srbtn" @click="monthlybuy(baoyue.packageId,baoyue.standard)">
											购买
										</view>
									</view>
								</view>
							</view>
						</van-collapse-item>
						<van-collapse-item name="2" v-if="jshow">
							<template #title>
								<view>
									<view class="tphand" v-if="jiayoubao.types=='A1'">
										加油包价格{{jiayoubao.standard}}元/{{jiayoubao.numStr}}小时</view>
									<view class="tphand" v-if="jiayoubao.types=='A3'">
										加油包价格{{jiayoubao.standard}}元/{{jiayoubao.numStr}}次</view>
								</view>
							</template>
							<view class="showtap">
								<view class="stone">
									<span style="color: #FFA02E;"
										v-if="jiayoubao.types=='A1'">加油包价格为{{jiayoubao.standard}}元/{{jiayoubao.numStr}}小时</span>
									<span style="color: #FFA02E;"
										v-if="jiayoubao.types=='A3'">加油包价格为{{jiayoubao.standard}}元/{{jiayoubao.numStr}}次</span>
									，按照充电次数计算， 如购买一个加油包，则本月充电次数增加当前单个加油包次数<br />
									如购买2个加油包，则本月充电次数增加当前单个加油包次数的两倍<br />
									仅当月有效
								</view>
								<view class="stwo">
									<view class="stleft">
										<!-- <van-stepper v-model="numtitle1" /> -->
									</view>
									<view class="stright">
										<view class="srtxt">
											总支付：<span style="color: #45CC21;">{{jiayoubao.standard}}元</span>
										</view>
										<view class="srbtn" @click="comebuy(jiayoubao.id,jiayoubao.standard)">
											购买
										</view>
									</view>
								</view>
							</view>
						</van-collapse-item>
					</van-collapse>
				</view>
				<view class="tapthree" v-if="type=='0'">
					<van-collapse v-model="activeNames" v-for="(item, index) in baoyue" :key="index">
						<van-collapse-item :name="index">
							<template #title>
								<view>
									<view class="tphand">{{item.packageName}}</view>
									<view class="tpfoot" v-if="item.types=='A3'">
										包月价格{{item.standard}}元/{{item.numStr}}次</view>
									<view class="tpfoot" v-if="item.types=='A1'">
										包月价格{{item.standard}}元/{{item.numStr}}小时</view>
								</view>
							</template>
							<view class="showtap">
								<view class="stone">
									<span style="color: #FFA02E;"
										v-if="item.types=='A1'">包月价格为{{item.standard}}元/{{item.numStr}}小时</span>
									<span style="color: #FFA02E;"
										v-if="item.types=='A3'">包月价格为{{item.standard}}元/{{item.numStr}}次</span>
									，按照自然月计算， 如购买一个月，则有效期到本月底。<br />
									计算方法:本月费用=包月费用/30*本月剩余天数;<br />
									如购买2个月则有效期到下月底。<br />
									当月的包月套餐不能退款。
								</view>
								<view class="stwo">
									<view class="stleft" style="display: flex;align-items: center;">
										<view style="color: #FFFFFF;margin-right: 15upx;font-size: 30upx;">请选择购买月数
										</view>
										<van-stepper v-model="item.numtitle" @change="onChange1(index)" max="12"
											disable-input />
									</view>
									<view class="stright">

										<view class="srbtn"
											@click="monthlybuy1(item.packageId,item.numtitle,item.standard)">
											购买
										</view>
									</view>
								</view>
							</view>
						</van-collapse-item>

					</van-collapse>
				</view>
			</view>
			<view class="newtap" v-if="tapshow=='3'&&addNew=='1'">
				<view class="newone">
					<view class="newonetap" style="color: #FFA02E;">
						当前套餐：
						<view class="newonetapsun" v-if="currPackage">
							<span
								v-if='currPackage.packagePower!=0'>{{currPackage.packagePower}}瓦以下--{{currPackage.packageMoney}}元/30天
								（{{currPackage.packageNumsStr}}</span>
							<span v-if='currPackage.packagePower==0'>功率不限制--{{currPackage.packageMoney}}元/30天
								（{{currPackage.packageNumsStr}}</span>
							<span v-if='currPackage.types=="A4"'>小时/30天）</span>
							<span v-if='currPackage.types=="A5"'>小时/天）</span>
							<span v-if='currPackage.types=="A6"'>次/30天）</span>
							<span v-if='currPackage.types=="A7"'>次/天）</span>
						</view>
						<view class="newonetapsun" v-else="!currPackage">暂未购买包月套餐</view>
					</view>
				</view>
				<view class="newone" v-if="currPackage&&winthdrawal==1">
					<view class="newonetap" style="color: #FFA02E;">
						<view class="newonetapsun">
							如果您需要降低套餐，请先到"个人中心"-"查看更多"-"申请退款"-"退包月"中退款，然后再次购买
						</view>
					</view>
				</view>
				<view class="newone">
					<view class="newonetap" style="color: #FFA02E;">请根据您充电器的功率选择合适的套餐购买；</view>
				</view>
				<view class="newone" v-if="newbaoyue">
					<view class="newonetap">{{newbaoyue.packageName}}</view>
				</view>

				<view class="newone" v-if="newbaoyue">
					<!-- <view class="newtwotap" v-for="(item,index) in newbaoyue.steps" :key="index"  
					v-if="upshow == 0 || ((upshow == 1 && item.opers == 1&&currPackage)||!currPackage)"> -->
					<view class="newtwotap" v-for="(item,index) in newbaoyue.steps" :key="index"
					v-if="(item.opers != -1&&currPackage)||!currPackage">
						<view class="newtwotapsun">
							<span v-if='item.minPower!=item.maxPower'>
								{{item.maxPower}}瓦以下--{{item.standard}}元/30天 （{{item.numStr}}
							</span>
							<span v-if='item.minPower==item.maxPower'>
								功率不限制--{{item.standard}}元/30天 （{{item.numStr}}
							</span>

							<span v-if='item.types=="A4"'>小时/30天）</span>
							<span v-if='item.types=="A5"'>小时/天）</span>
							<span v-if='item.types=="A6"'>次/30天）</span>
							<span v-if='item.types=="A7"'>次/天）</span>
							<view style="color: #FFA02E;font-size: 20upx;margin-top: 10upx;"
								v-if='item.minPower==item.maxPower'>
								以充电桩支持的实际功率为准</view>
							<view style="color: #FFA02E;font-size: 20upx;margin-top: 10upx;" v-if="item.recommend==1">
								根据您电动车功率,推荐您购买此套餐</view>

						</view>
						<view class="newtwotapbtn" v-if="item.opers==0"
							@click="newbtn(index)">购买
						</view>
						<view class="newtwotapbtn" v-if="item.opers==1"
							@click="sjbtn(item.stepId,item.maxPower,item.minPower)" style="background-color: green;">升级
						</view>
					</view>
				</view>
				<!-- <view class="newone" v-if="newjiayou&&upshow==0"> -->
				<view class="newone" v-if="newjiayou">
					<view class="newtwotap">
						<view class="newtwotapsun">加油包价格为：
							{{newjiayou.standard}}元/{{newjiayou.numStr}}
							<span v-if='newjiayou.types=="A4"'>小时/30天</span>
							<span v-if='newjiayou.types=="A5"'>小时/天</span>
							<span v-if='newjiayou.types=="A6"'>次/30天</span>
							<span v-if='newjiayou.types=="A7"'>次/天</span>
						</view>
						<view class="newtwotapbtn" @click="jybtn(newjiayou.id,newjiayou.standard)">购买</view>
					</view>

				</view>
				<view class="tstmap" v-show="shbylist.safeAllStafus==1&&shbylist.monthSafe==1&&shbylist.chargingMonth==1" @click="openwxts">
					<view class="tstmapleft">
						<view class="tstmapone">充电守护VIP</view>
						<view class="tstmaptwo">30天不限次数</view>
					</view>
					<view class="tstmapright">
						<view class="tstmaprighttxt">原价￥{{shbylist.monthOriginal}}</view>
						<view>￥{{shbylist.monthPrice}}</view>
					</view>
					<view class="tstmapzhong">立减￥{{(shbylist.monthOriginal-shbylist.monthPrice).toFixed(2)}}</view>
				</view>
			</view>
			<view class="newtap" v-if="tapshow=='4'">
				<view class="newone" v-if="userPackages.length==0">
					<view class="newonetap" style="color: #FFA02E;">
						当前购买套餐：
						<view class="newonetapsun">暂未购买包月套餐</view>
					</view>
				</view>
				<view class="newone" v-if="userPackages.length!=0">
					<view class="newonetap" style="color: #FFA02E;" >
						当前购买套餐：
					</view>
					<view class="gmtap" v-for="(item,index) in userPackages" :key="index">
						<view class="gmtapone">
							<view style="color:#50a1f3;margin-right: 20upx;">{{item.typesName}}({{item.nums}}期)</view>
							<view>购买日期：{{item.createTime}}</view>
						</view>
						<view class="gmtapone">
							有效期：{{item.startTime}} ~ {{item.endTime}}
						</view>
					</view>
				</view>
				<view class="newone">
					<!-- <view class="newonetap" style="color: #FFA02E;">请根据您当前需停放的车辆选择合适的套餐购买；</view> -->
				</view>
				<view class="newone">
					<view class="newtwotap" v-for="(item,index) in tclist" :key="index">
						<view class="newtwotapsun">
							{{item.typesName}}
						</view>
						<view class="newtwotapbtn" @click="gotc(item.id,item.disMsg,item.price)">购买</view>
					</view>
				</view>
				<view class="newone">
					<view style="color: #FFA02E;font-size: 20upx;line-height: 48upx;box-sizing: border-box;padding: 20upx;">
						<view>温馨提示</view>
						<view>1.仅限在您所绑定的小区扫码停车；</view>
						<view>2.请根据您当前需停放的车辆选择合适的套餐购买；</view>
						<view>3.折扣价为平台补贴，您若需退款将不享受折扣，退款金额按原价折算；如需退款请至《个人中心-查看更多-申请退款-退停车包月》页面申请即可，具体金额以退款页面说明为准；</view>
					</view>
					
				</view>
			</view>
		</view>
		<!-- //端口选择弹窗提示 -->
		<van-popup :show="cshow">
			<view class="tan">
				<view class="tanhand">
					<view>充值协议</view>
					<image src="../../static/tabBarimg/close.png" @click="cshowclose"></image>
				</view>
				<view class="tanone">
					尊敬的用户，为保障您的合法权益，请您在充值前仔细阅读《充值协议》，（本协议）以了解充电用户的充值使用规则并避免产生误解。当您点击“充值”按钮完成充值即视为您已阅读理解本协议，并同意按照本协议约定的规则进行充值与消费。
				</view>
			</view>
		</van-popup>
		<!-- //弹窗温馨提示 -->
		<van-popup :show="wshow">
			<view class="tan2">
				<view class="tanhand">
					<view>温馨提示</view>
				</view>
				<view class="tanone">
					此功能为无微信用户的电卡代充值功能，请勿输错卡号，一旦充值，不能退费；
				</view>

			</view>
			<view class="dibu">
				<view class="dbright1" @click="dbtn">
					确认
				</view>
			</view>
		</van-popup>
		<!-- //电卡卡卡号提示 -->
		<van-popup :show="dshow" :close-on-click-overlay="false">
			<view class="tan1">
				<image src="../../static/tabBarimg/cardInfo.png"></image>

			</view>
			<view class="dkdel" @click="dkbtn">
				<image src="../../static/tabBarimg/delete.png"></image>
			</view>
		</van-popup>
		<!-- //充值协议 -->
		<view class="cztap">
			<van-popup :show="czshow">
				<view class="czone">
					<view class="cznei">
						<view class="czneihand">
							充值协议
						</view>
						<view class="czneione">
							<view class="cztxtone">
								尊敬的用户，为保障您的合法权益，请您在充值前仔细阅读《充值协议》，
								（本协议）以了解充电用户的充值使用规则并避免产生误解。当您点击“充值”按钮完成充值即视为您已阅读理解本协议，并同意按照本协议约定的规则进行充值与消费。
							</view>
							<view class="cztxttwo">
								一、定义
							</view>
							<view class="cztxtone">
								基本账户：您通过本平台向您的账户实际支付与消费的金额。
							</view>
							<view class="cztxtone">
								赠送账户：您通过本平台优惠活动期间向您的账户实际支付金额额外获得的金额。
							</view>
							<view class="cztxttwo">
								二、使用规则
							</view>
							<view class="cztxtone">
								1. 基本账户/赠送账户仅可本用户支付充电费用，不可用于转移、赠送、出借、租赁或分享给其他用户账户进行消费，基本账户/赠送账户永不过期（购买消费的包月权限除外）。
							</view>
							<view class="cztxtone">
								2. 用户充电支付充电费用，将优先使用基本账户余额，基本账户余额用完后开始使用赠送账户余额。
							</view>
							<view class="cztxtone">
								3. 当您不在使用充电服务时，可选择申请退款，您的基本账户余额将在1-2个工作日内原路退回，此时赠送账户余额将清零。
							</view>
							<view class="cztxttwo">
								三、特别说明
							</view>
							<view class="cztxtone">
								在适用法律法规允许范围内，本协议下的最终解释权归充电平台所有。如有疑问或需了解更多活动详情，请拨打客服电话:<a :href="'tel:'+kfphone"
									style="color: #4B98ED;">{{kfphone}}</a>或联系所在小区运营商电话咨询（电话见消费推送信息下方）。
							</view>
						</view>
					</view>
					<view class="czdel" @click="czbtn(2)">
						<image src="../../static/tabBarimg/delete.png"></image>
					</view>
				</view>
			</van-popup>
		</view>
		<view class="footdibu" v-if="typeone">

			<view class="fdbone"></view>
			<view class="fdbfive">
				<image src="../../static/tabBarimg/n8.png"></image>
			</view>
			<view class="fdbtwo">
				<image src="../../static/tabBarimg/n1.png"></image>
			</view>
			<view class="fdbthree">
				<view class="fdbthreeshang">选择充值金额，完成支付</view>
			</view>
			<view class="fdbfour">
				<image src="../../static/tabBarimg/n3.png"></image>
			</view>
			<view class="fdbsix">
				<van-checkbox v-model="checked1" shape="square" class="reset">下次不再显示</van-checkbox>
			</view>
		</view>
		<!-- //弹窗温馨提示 -->
		<van-popup :show="nbyshow">
			<view class="tan1">
				<view class="tanhand">
					<view>温馨提示</view>
				</view>
				<view class="stwotap">
					<view class="stleft" style="display: flex;align-items: center;">
						<view style="margin-right: 15upx;">请选择购买月数</view>
						<van-stepper v-model="nbynum" max="12" disable-input />
					</view>
					
				</view>
				<view class="tanone" style="font-weight: 700;padding: 20upx 0;">
					您正在购买{{nbylist.jg}}包月套餐，共计{{nbylist.standard*nbynum}}元，确认购买吗？
				</view>
				
				<view class="tanonedibu" style="justify-content: center;">
					<view class="dbleft" @click="nbyclose">
						取消
					</view>
					<view class="dbright2" @click="nbybtn">
						确认
					</view>
				</view>
			</view>
			
		</van-popup>
		<!-- //弹窗温馨提示 -->
		<van-popup :show="tcshow">
			<view class="tan1">
				<view class="tanhand">
					<view>温馨提示</view>
				</view>
				
				<view class="tanone" style="font-weight: 700;padding: 20upx 0;text-align: center;">
					检测到当前充电场地需要购买停车包月套餐<br/>您尚未购买,是否立刻跳转并购买？
				</view>
				
				<view class="tanonedibu" style="justify-content: center;">
					<view class="dbleft" @click="tcclose">
						暂不购买
					</view>
					<view class="dbright2" @click="tcbtn">
						去购买
					</view>
				</view>
			</view>
			
		</van-popup>
		<view class="wxts">
			<van-popup :show="wxtsshow" :close-on-click-overlay='false'>
				<view class="wxtsmap">
					<view class="wxtsmapone">
						温馨提示
					</view>
					<view class="wxtsmaptwo">
						<span style="color: #3A4044;margin-right: 24upx;">请选择购买数量</span>
						<van-stepper v-model="wxtsnum" disable-input @change="wxtsChange" input-width="32px" button-size="25px"/>
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
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import tou_hand3 from '../../components/tou_hand3/tou_hand3.vue'
	import {
		Config
	} from "../../common/Config.js"
	// import Toast from '../../wxcomponents/vant/toast/toast';
	// import Dialog from '../../wxcomponents/vant/dialog/dialog';
	export default {
		components: {
			tou_hand3
		},
		mounted() {
		},

		data() {
			return {
				tapshow: '1', //充值类型选择
				numshow: '1', //额度选择
				checked: true, //勾选
				activeNames: [''], //当前展开面板的 name
				numtitle: 1, //包月购买数量
				cshow: false, //充值协议弹窗
				wshow: false, //温馨提示弹窗
				dshow: false, //电卡号码提示
				showlist: [], //充值金额及优惠信息
				baoyue: {}, //包月套餐信息
				jiayoubao: {}, //加油包信息
				bynum: 0, //包月支付金额
				carId: '', //电卡编号
				newcarId: '', //确认电卡编号
				monthshow: false, //包月显示
				dktype: '0', //包月购买进入方式 0账户充值 1上电页面
				areaId: '', //充电区ID
				jshow: false,
				czshow: false,
				kfphone: '', //客服电话
				onetapvul: 0,
				twotapvul: 1,
				threetapvul: 1,
				fourtapvul: 1,
				dbshow: 1,
				userlist: {},
				type: '0', //包月进入方式 0账户充值 1上电页面
				typeone: false,
				checked1: false,
				addNew: '0', //0老包月 1新包月
				currPackage: {}, //新包月当前购买套餐
				newbaoyue: {}, //新包月套餐列表
				newjiayou: {}, //新包月加油包
				winthdrawal: 0, //申请退款权限
				nbyshow:false,//30天购买弹窗
				nbylist:{},
				nbynum:1,
				tclist:[],//停车包月套餐列表
				userPackages:[],//用户购买的停车包月套餐
				powerontype:0,
				upshow:0,
				tcshow:false,
				wxtsshow:false,
				wxtsnum:1,
				shbylist:{},
				wxtszj:0
			}
		},

		created() {
			this.amount()
		},
		onLoad(options) {
			if (options.type == 1) {
				this.dktype = options.type
				this.tapshow = options.tapshow
				if(this.tapshow==3){
					this.getSafeMonth()
				}
				this.areaId = options.areaId
				this.upshow=options.upshow
				this.monthly()

			} else {
				this.dktype = '0'
			}
			if(options.tctype&&options.tctype==4){
				this.tapbtn(4)
			}
			if(options.powerontype){
				this.powerontype=options.powerontype
			}else{
				this.powerontype=0
			}
		},
		onShow() {
			this.usertap();
			setTimeout(() => {
				this.$refs.mainindex.userdetail()
			}, 100)
			this.winthdrawal = uni.getStorageSync('user').winthdrawal
			var projectId = uni.getStorageSync('user').projectId
			this.kfphone = uni.getStorageSync('user').projectPhone
			// if(!projectId){
			// 	Toast.fail('请先扫设备二维码绑定小区后再充值。')
			// 	uni.navigateBack()
			// }
		},
		methods: {

			//充值选择按钮
			tapbtn(val) {
				this.carId = ''
				this.newcarId = ''
				if (this.onetapvul != 1 && val == 1) {
					this.dbshow = 1
					const userId = uni.getStorageSync('userId')
					this.$base.request('recharge/amount' + '/' + userId, 'GET')
						.then(res => {
							this.onetapvul = val
							this.threetapvul = val
							this.twotapvul = val
							this.fourtapvul=val
							if (res.data.code == 200) {

								if (res.data.data) {
									this.showlist = res.data.data
								} else {
									this.showlist = []
								}
							} else {
								Toast.fail(res.data.msg)
							}


						})
						.catch(err => {

						})
				}
				if (this.twotapvul != 2 && val == 2) {
					this.dbshow = 0
					this.onetapvul = val
					this.twotapvul = val
					this.threetapvul = val
					this.fourtapvul=val
					this.showlist = []
				}
				if (this.threetapvul != 3 && val == 3) {

					this.dbshow = 1
					let data = {}
					if (this.dktype == 0) {
						data = {
							type: this.dktype,
							userId: uni.getStorageSync('userId')
						}
					} else if (this.dktype == 1) {
						data = {
							type: this.dktype,
							userId: uni.getStorageSync('userId'),
							areaId: this.areaId
						}
					}

					this.$base.request('recharge/monthly', 'GET', data)
						.then(res => {

							this.threetapvul = val
							this.onetapvul = val
							this.twotapvul = val
							this.fourtapvul=val
							if (res.data.code == 200) {

								if (res.data.data) {
									this.addNew = res.data.data.addNew
									if (res.data.data.addNew == '0') {
										if (res.data.data.type == 1) {
											this.type = 1
											this.monthshow = true
											this.baoyue = res.data.data.baoyue
											this.bynum = this.baoyue.standard * this.numtitle
											if (res.data.data.jiayoubao) {
												this.jiayoubao = res.data.data.jiayoubao
												this.jshow = true
											}
										} else if (res.data.data.type == 0) {
											this.type = 0
											this.monthshow = true
											this.baoyue = res.data.data.baoyue
											for (var i = 0; i < this.baoyue.length; i++) {
												this.baoyue[i].numtitle = 1
												this.baoyue[i].bynum = this.baoyue[i].standard * this.baoyue[i]
													.numtitle
											}
										}
									} else if (res.data.data.addNew == '1') {
										this.currPackage = res.data.data.currPackage
										this.newbaoyue = res.data.data.baoyue
										this.newjiayou = res.data.data.jiayoubao

									}

								} else {
									this.monthshow = false
									Toast.fail(res.data.msg)
								}
							} else {
								Toast.fail(res.data.msg)
							}
							

						})
						.catch(err => {

						})
						this.getSafeMonth()
				}
				if(this.fourtapvul!=4&&val==4){
					let data={
						userId:uni.getStorageSync('userId')	
					}
					this.$base.request('recharge/parkingPackage', 'GET', data)
						.then(res => {
							this.threetapvul = val
							this.onetapvul = val
							this.twotapvul = val
							this.fourtapvul=val
							if(res.data.code==200){
								this.tclist=res.data.data.parkingPackages
								this.userPackages=res.data.data.userPackages
							}else {
								Toast.fail(res.data.msg)
							}
						})
						.catch(err => {
					
						})
				}
				this.tapshow = val
				if (val == 2) {
					this.dshow = true
				}
			},
			//关闭电卡卡号提示
			dkbtn() {
				this.dshow = false
				this.wshow = true
			},
			//额度选择按钮
			numbtn(val, num) {
				this.numshow = val
			},
			goinput(e) {

				this.showlist = []
				this.dbshow = 0
			},
			onInput() {

				if (!this.carId) {
					Toast.fail('请输入卡号')
					return
				}
				if (this.carId.length != 10 && this.carId.length != 0) {
					Toast.fail('请输入10位卡号')
					return
				}
				if (!this.newcarId) {
					Toast.fail('请输入确认卡号')
					return
				}

				if (this.carId != this.newcarId) {
					if (this.carId.length != 0 && this.newcarId.length != 0) {
						Toast.fail('两次电卡卡号不一致')
						return
					}

				} else if (this.carId.length != 0 && this.newcarId.length != 0) {
					// const userId=uni.getStorageSync('userId')
					this.$base.request('recharge/amount/card' + '/' + this.carId, 'GET')
						.then(res => {
							if (res.data.code == 200) {
								if (res.data.data) {
									this.dbshow = 1
									this.showlist = res.data.data.amounts
									this.userlist = res.data.data.user
								} else {
									this.showlist = []
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
			//关闭端口选择弹窗
			cshowclose() {
				this.cshow = false
			},
			//关闭温馨提示
			dbtn() {
				this.wshow = false
			},
			//充值协议
			czbtn(vul) {
				if (vul == 1) {
					this.czshow = true
				} else if (vul == 2) {
					this.czshow = false
				}
			},
			
			//余额充值：获取充值金额及优惠信息
			amount() {
				const userId = uni.getStorageSync('userId')
				this.$base.request('recharge/amount' + '/' + userId, 'GET')
					.then(res => {
						if (res.data.data) {
							this.showlist = res.data.data
						} else {
							this.showlist = []
						}

					})
					.catch(err => {

					})
			},
			//包月购买：获取包月套餐、加油包信息
			monthly() {
				let data = {}
				if (this.dktype == 0) {
					data = {
						type: this.dktype,
						userId: uni.getStorageSync('userId')
					}
				} else if (this.dktype == 1) {
					data = {
						type: this.dktype,
						userId: uni.getStorageSync('userId'),
						areaId: this.areaId
					}
				}

				this.$base.request('recharge/monthly', 'GET', data)
					.then(res => {
						if (res.data.data) {

							this.addNew = res.data.data.addNew
							if (res.data.data.addNew == '0') {
								if (res.data.data.type == 1) {
									this.type = 1
									this.monthshow = true
									this.baoyue = res.data.data.baoyue
									this.bynum = this.baoyue.standard * this.numtitle
									if (res.data.data.jiayoubao) {
										this.jiayoubao = res.data.data.jiayoubao
										this.jshow = true
									}
								} else if (res.data.data.type == 0) {
									this.type = 0
									this.monthshow = true
									this.baoyue = res.data.data.baoyue
									for (var i = 0; i < this.baoyue.length; i++) {
										this.baoyue[i].numtitle = 1
										this.baoyue[i].bynum = this.baoyue[i].standard * this.baoyue[i]
											.numtitle
									}
								}
							} else if (res.data.data.addNew == '1') {
								this.currPackage = res.data.data.currPackage
								this.newbaoyue = res.data.data.baoyue
								this.newjiayou = res.data.data.jiayoubao

							}

						} else {
							this.monthshow = false
							Toast.fail(res.data.msg)
						}

					})
					.catch(err => {

					})
			},
			//包月购买：包月购买
			monthlybuy(vul, standard) {
				var projectName = uni.getStorageSync('user').projectName
				if (!projectName) {
					Toast.fail('请先扫设备二维码绑定小区后再充值。')
					return
				}
				// if((this.baoyue.types=='A3'||this.baoyue.types=='A1')&&this.dktype=='0'){

				// }
				Dialog.alert({
					messageAlign: 'left',
					title: '重要提示',
					message: '1，请确认您充电的区域支持包月充电；\n2，如果您的包月指标本月已经使用完毕且想继续充电，请购买加油包；',
					className: 'redtrip'
				}).then(() => {
					uni.showLoading({
						title: '请稍候',
						mask: true
					})
					var data1 = {
						packageId: vul,
						userId: uni.getStorageSync('userId'),
						months: this.numtitle
					}
					this.$base.request('recharge/monthly/total', 'GET', data1)
						.then(res => {
							uni.hideLoading()
							if (res.data.code == 200) {
								Dialog.confirm({
									title: '提示',
									message: '您正在购买包月套餐' + this.numtitle + '个月，共计' + res.data.data
										.total +
										'元，确认购买吗？'
								}).then(() => {
									uni.showLoading({
										title: '请稍候',
										mask: true
									})
									let _this = this
									var data = {
										packageId: vul,
										userId: uni.getStorageSync('userId'),
										months: _this.numtitle
									}

									_this.$base.request('recharge/monthly', 'POST', data)
										.then(res => {
											uni.hideLoading()
											if (res.data.code == 200) {
												_this.usertap();
												// Toast.success(res.data.msg)
												setTimeout(() => {
													this.$refs.mainindex.userdetail()
													Toast.success(res.data.msg)
													setTimeout(()=>{
														uni.navigateBack()
													},1200)
												}, 100)
											} else {
												Toast.fail(res.data.msg)
											}

										})
										.catch(err => {

										})
								}).catch(() => {
									// on cancel
								});
							} else {
								Toast.fail(res.data.msg)
							}

						})
						.catch(err => {

						})
				});
				// return




			},
			//包月购买：包月购买
			monthlybuy1(packageId, numtitle, standard) {
				var projectName = uni.getStorageSync('user').projectName
				if (!projectName) {
					Toast.fail('请先扫设备二维码绑定小区后再充值。')
					return
				}
				// if((this.baoyue[0].types=='A3'||this.baoyue[0].types=='A1')&&this.dktype=='0'){

				// }
				Dialog.alert({
					messageAlign: 'left',
					title: '重要提示',
					message: '1，请确认您充电的区域支持包月充电；\n2，如果您的包月指标本月已经使用完毕且想继续充电，请购买加油包；',
					className: 'redtrip'
				}).then(() => {
					uni.showLoading({
						title: '请稍候',
						mask: true
					})
					var data1 = {
						packageId: packageId,
						userId: uni.getStorageSync('userId'),
						months: numtitle
					}
					this.$base.request('recharge/monthly/total', 'GET', data1)
						.then(res => {
							uni.hideLoading()
							if (res.data.code == 200) {
								Dialog.confirm({
									title: '提示',
									message: '您正在购买包月套餐' + numtitle + '个月，共计' + res.data.data.total +
										'元，确认购买吗？'
								}).then(() => {
									uni.showLoading({
										title: '请稍候',
										mask: true
									})

									let _this = this
									var data = {
										packageId: packageId,
										userId: uni.getStorageSync('userId'),
										months: numtitle
									}

									_this.$base.request('recharge/monthly', 'POST', data)
										.then(res => {
											uni.hideLoading()
											if (res.data.code == 200) {
												_this.usertap();
												// Toast.success(res.data.msg)
												setTimeout(() => {
													this.$refs.mainindex.userdetail()
													Toast.success(res.data.msg)
													setTimeout(()=>{
														uni.navigateBack()
													},1200)
												}, 100)
											} else {
												Toast.fail(res.data.msg)
											}

										})
										.catch(err => {

										})
								}).catch(() => {
									// on cancel
								});

							} else {
								Toast.fail(res.data.msg)
							}

						})
						.catch(err => {

						})
				});
				// return




			},
			//包月购买：购买加油包
			comebuy(vul, standard) {
				var projectName = uni.getStorageSync('user').projectName
				if (!projectName) {
					Toast.fail('请先扫设备二维码绑定小区后再充值。')
					return
				}
				// if((this.baoyue.types=='A3'||this.baoyue.types=='A1')&&this.dktype=='0'){

				// }
				Dialog.alert({
					messageAlign: 'left',
					title: '重要提示',
					message: '1，请确认您充电的区域支持包月充电；\n2，如果您的包月指标本月已经使用完毕且想继续充电，请购买加油包；',
					className: 'redtrip'
				}).then(() => {
					Dialog.confirm({
						title: '提示',
						message: '您正在购买包月套餐加油包，共计' + standard + '元，确认购买吗？'
					}).then(() => {
						uni.showLoading({
							title: '请稍候',
							mask: true
						})

						var data = {
							comeId: vul,
							userId: uni.getStorageSync('userId'),
						}
						this.$base.request('recharge/come', 'POST', data)
							.then(res => {
								uni.hideLoading()
								if (res.data.code == 200) {
									this.usertap();

									setTimeout(() => {
										this.$refs.mainindex.userdetail()
										Toast.success(res.data.msg)

									}, 100)


								} else {
									Toast.fail(res.data.msg)
								}

							})
							.catch(err => {

							})
					}).catch(() => {
						// on cancel
					});
				});
				// return


			},
			//加减月份触发事件
			onChange(value) {
				this.bynum = this.baoyue.standard * this.numtitle
			},
			//加减月份触发事件
			onChange1(i) {
				this.baoyue[i].bynum = this.baoyue[i].standard * this.baoyue[i].numtitle
				this.$forceUpdate();
			},
			pad(num, n) {
				var len = num.toString().length;
				while (len < n) {
					num = "0" + num;
					len++;
				}
				return num;
			},
			usertap() {
				this.$base.request('user/userInfo', 'GET')
					.then(res => {
						var userlist = res.data.data
						userlist.id = this.pad(userlist.id, 8)
						uni.setStorageSync('user', userlist)
						uni.setStorageSync('phone', userlist.phone)
						uni.setStorageSync('Name', userlist.realName)
					})
					.catch(err => {

					})
			},
			//账户余额充值
			yebtn() {
				if (this.tapshow == 1) {
					var projectName = uni.getStorageSync('user').projectName
					if (!projectName) {
						Toast.fail('请先扫设备二维码绑定小区后再充值。')
						return
					}
				}

				if (!this.checked) {
					Toast.fail('请勾选协议!!!')
					return
				}
				let data = {}
				if (this.tapshow == '1') {
					var user = uni.getStorageSync('user')
					if (!user.projectId) {
						Toast.fail('请在充电设备上的二维码扫码进行充值')
						return
					}
					data = {
						type: '1',
						// toUserid:uni.getStorageSync('userId'),
						pear: this.numshow,
						pt:2
					}
				} else if (this.tapshow == '2') {
					if (this.carId.length != 10) {
						Toast.fail('请输入10位卡号')
						return
					}
					if (this.carId != this.newcarId) {
						Toast.fail('两次电卡卡号不一致')
						return
					}
					data = {
						type: '0',
						carId: this.carId,
						pear: this.numshow,
						pt:2
					}
				}
				uni.showLoading({
					title: '请稍候',
					mask: true
				})
				this.$base.request('order/save', 'POST', data)
					.then(res => {
						uni.hideLoading()
						if (res.data.code == 200) {
							let arr = res.data.data
							let _this = this

							// 在小程序中调用公众号支付
							console.log('小程序调用公众号支付')
							console.log('支付参数:', arr)

							// 小程序中使用wx.requestPayment，但传入公众号的支付参数
							// 注意：这里不使用uni.requestPayment，直接使用wx.requestPayment
							wx.requestPayment({
								timeStamp: arr.timeStamp,
								nonceStr: arr.nonceStr,
								package: arr.wpackage,
								signType: arr.signType,
								paySign: arr.paySign,
								success: function (res) {
									console.log('公众号支付成功:', res);
									// 支付成功
									_this.usertap();
									Toast.success('充值成功')
									if(_this.powerontype==1){
										setTimeout(()=>{
											uni.navigateBack()
										},1200)
									}else{
										uni.redirectTo({
											url: '../index/index'
										})
									}

									setTimeout(() => {
										_this.$refs.mainindex.userdetail();
									}, 2000)
								},
								fail: function (err) {
									console.log('公众号支付失败:', err);
									if (err.errMsg === 'requestPayment:fail cancel') {
										Toast.fail('支付已取消')
									} else {
										Toast.fail('支付失败: ' + err.errMsg)
									}
								}
							});
							
						} else {
							uni.hideLoading()
							Toast.fail(res.data.msg)
						}
				
					})
					.catch(err => {
				
					})
			},
			//新包月购买
			newbtn(index) {
				let data={
					userId:uni.getStorageSync('userId')	
				}
				this.$base.request('recharge/parkingPackage', 'GET', data)
				.then(res => {
					if(res.data.code==200){
						let tclist=res.data.data.parkingPackages
						let userPackages=res.data.data.userPackages
						if(tclist.length>0&&userPackages.length==0){
							this.tcshow=true
						}else{
							this.nbylist=this.newbaoyue.steps[index]
							var jg = ''
							if (this.nbylist.maxPower == this.nbylist.minPower) {
								jg = '“功率不限制”'
							} else {
								jg = '功率为“' + this.nbylist.maxPower + '瓦以下”'
							}
							this.nbylist.jg=jg
							this.nbynum=1
							this.nbyshow=true
						}
					}else {
						Toast.fail(res.data.msg)
					}
				})
				.catch(err => {
			
				})
				
			},
			tcclose(){
				this.tcshow=false
			},
			tcbtn(){
				this.tcshow=false
				this.tapbtn(4)
			},
			//关闭30天套餐弹窗
			nbyclose(){
				this.nbyshow=false
			},
			//购买30天套餐弹窗
			nbybtn(){
				var endtime = uni.getStorageSync('user').endTime		
				if (endtime) {
					var chuo = new Date(new Date(endtime).getTime() + (1000 * 60 * 60 * 24 * 30*this.nbynum))
					var old = chuo.getFullYear() + "年" + chuo.getMonth() + "月" + chuo.getDate() +
						"日"
					var now = chuo.getFullYear() + "年" + (chuo.getMonth() + 1) + "月" + chuo.getDate() +
						"日"
					Dialog.confirm({
						title: '提示',
						message: '系统检测您已购买过包月，本次继续购买包月的有效期为'+old+'至'+now
					}).then(() => {
						var data = {
							stepId: this.nbylist.stepId,
							months: this.nbynum,
							userId: uni.getStorageSync('userId')
						}
						uni.showLoading({
							title: '请稍候',
							mask: true
						})
						this.$base.request('recharge/buy30DayRate', 'POST', data)
							.then(res => {
								uni.hideLoading()
								if (res.data.code == 200) {
									// Toast.success('购买成功')
									this.usertap();
									setTimeout(() => {
										this.$refs.mainindex.userdetail()
										Toast.success(res.data.msg)
										setTimeout(()=>{
											uni.navigateBack()
										},1200)
									}, 200)
								} else {
									Toast.fail(res.data.msg)
								}
								
							})
							.catch(err => {
								
							})
					}).catch(() => {
								
					});
				} else {
					var data = {
						stepId: this.nbylist.stepId,
						months: this.nbynum,
						userId: uni.getStorageSync('userId')
					}
					uni.showLoading({
						title: '请稍候',
						mask: true
					})
					this.$base.request('recharge/buy30DayRate', 'POST', data)
						.then(res => {
							uni.hideLoading()
							if (res.data.code == 200) {
								// Toast.success('购买成功')
								this.usertap();
								setTimeout(() => {
									this.$refs.mainindex.userdetail()
									Toast.success(res.data.msg)
									setTimeout(()=>{
										uni.navigateBack()
									},1200)
								}, 200)
							} else {
								Toast.fail(res.data.msg)
							}
								
						})
						.catch(err => {
								
						})
				}
				
			},
			jybtn(id, standard) {
				Dialog.confirm({
					title: '提示',
					message: '您正在购买包月套餐加油包，共计' + standard + '元，确认购买吗？'
				}).then(() => {
					var data = {
						comeId: id,
						userId: uni.getStorageSync('userId')
					}
					uni.showLoading({
						title: '请稍候',
						mask: true
					})
					this.$base.request('recharge/buy30DayCome', 'POST', data)
						.then(res => {
							uni.hideLoading()
							if (res.data.code == 200) {

								this.usertap();
								setTimeout(() => {
									this.$refs.mainindex.userdetail()
									Toast.success(res.data.msg)
									setTimeout(()=>{
										uni.navigateBack()
									},1200)
								}, 200)
							} else {
								Toast.fail(res.data.msg)
							}

						})
						.catch(err => {

						})
				}).catch(() => {

				});

			},
			//升级新包月套餐
			sjbtn(stepId, maxPower, minPower) {
				var jg = ''
				if (maxPower == minPower) {
					jg = '“功率不限制”'
				} else {
					jg = '功率为“' + maxPower + '瓦以下”'
				}
				var data = {
					rateId: stepId,
					userId: uni.getStorageSync('userId')
				}
				this.$base.request('recharge/upgrade30DayRate/total', 'GET', data)
					.then(res => {
						if (res.data.code == 200) {
							Dialog.confirm({
								title: '提示',
								message: '您正在升级' + jg + '包月套餐，共计' + res.data.data + '元，确认升级吗？'
							}).then(() => {
								var data = {
									rateId: stepId,
									userId: uni.getStorageSync('userId')
								}
								uni.showLoading({
									title: '请稍候',
									mask: true
								})
								this.$base.request('recharge/30DayRate/upgrade', 'POST', data)
									.then(res => {
										uni.hideLoading()
										if (res.data.code == 200) {
											this.usertap();
											setTimeout(() => {
												this.$refs.mainindex.userdetail()
												Toast.success(res.data.msg)
												setTimeout(()=>{
													uni.navigateBack()
												},1200)
											}, 200)
										} else {
											Toast.fail(res.data.msg)
										}

									})
									.catch(err => {

									})
							}).catch(() => {

							});


						} else {
							Toast.fail(res.data.msg)
						}

					})
					.catch(err => {

					})
			},
			gotc(id,disMsg,price){
				uni.navigateTo({
				       url: '/pages/monthlystop/monthlystop?packageId=' + id+ '&disMsg=' +disMsg+ '&price=' +price
				});
			},
			surebtn(e){
				this.checked=e.detail
			},
			getSafeMonth(){
				var data = {
					token:uni.getStorageSync('userToken')
				}
				this.$base.request('recharge/getSafeMonth', 'GET', data)
					.then(res => {
						if (res.data.code == 200) {
							this.shbylist=res.data.data
						} else {
							Toast.fail(res.data.msg)
						}
					})
					.catch(err => {
				
					})
			},
			openwxts(){
				this.wxtsshow=true
				this.wxtsnum=1
				this.wxtszj=this.shbylist.monthPrice
			},
			closewxts(){
				this.wxtsshow=false
			},
			surewxts(){
				var data = {
					token:uni.getStorageSync('userToken'),
					num:this.wxtsnum,
					money:this.shbylist.monthPrice,
					totalMoney:this.wxtszj
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
							this.wxtsshow=false
						} else {
							Toast.fail(res.data.msg)
							uni.hideLoading()
							this.wxtsshow=false
						}
					})
					.catch(err => {
				
					})
			},
			wxtsChange(){
				this.wxtszj=this.wxtsnum*this.shbylist.monthPrice
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
		// background-color: #F5F5F5;
		/deep/.van-overlay{
			z-index: 980!important;
		}
		/deep/.van-popup{
			z-index: 981!important;
		}


		.show {
			width: 100%;
			margin-top: 85upx;
			margin-bottom: 41upx;

			.taplist {
				width: 100%;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 69upx;

				.tap {

					padding: 10upx 20upx;
					background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
					border-radius: 24upx;
					font-size: 28upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 500;
					color: #ffffff;
					text-align: center;

				}

				.tap1 {
					padding: 10upx 20upx;
					border-radius: 8upx;
					font-size: 28upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 500;
					color: #fff;
					text-align: center;

				}
			}

			.newtap {
				width: 100%;
				padding: 10upx 35upx;
				box-sizing: border-box;

				.newone {
					width: 100%;
					box-sizing: border-box;
					border-radius: 16upx;
					box-shadow: 0upx 6upx 8upx 4upx rgba(4, 4, 4, 0.1);
					background-color: #343136;
					margin: 0 auto;
					margin-top: 20upx;

					.newonetap {
						font-size: 30upx;
						font-family: PingFang SC Bold, PingFang SC Bold-Bold;
						font-weight: 700;
						color: #50a1f3;
						display: flex;
						align-items: center;
						padding: 20upx;
						box-sizing: border-box;

						.newonetapsun {
							font-size: 25upx;
							font-family: PingFang SC Bold, PingFang SC Bold-Bold;
							font-weight: 700;
							color: #FFA02E;
							display: flex;
						}
					}
					.gmtap{
						margin-bottom: 20upx;
						.gmtapone{
							font-size: 24upx;
							font-family: PingFang SC Bold, PingFang SC Bold-Bold;
							font-weight: 700;
							color: #FFA02E;
							display: flex;
							align-items: center;
							padding: 10upx 20upx;
							box-sizing: border-box;
						}
					}

					.newtwotap {
						align-items: center;
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						padding: 20upx;
						box-sizing: border-box;
						border-bottom: 1upx solid #474349;

						.newtwotapsun {
							font-size: 28upx;
							font-family: PingFang SC Bold, PingFang SC Bold-Bold;
							font-weight: 700;
							color: #D0D0D0;
						}

						.newtwotapbtn {
							width: 120upx;
							background-color: #4b98ed;
							color: #FFFFFF;
							border-radius: 10upx;
							text-align: center;
							padding: 10upx 0;
							font-weight: 700;
							font-size: 25upx;
						}
						
					}
					.stwotap {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 20upx ;
						font-size: 28upx;
						font-family: PingFang SC Bold, PingFang SC Bold-Bold;
						font-weight: 700;
						color: #D0D0D0;
					
						/deep/.van-stepper__input {
							color: #FFA02E;
						}
					}

				}
				.tstmap {
					width: 100%;
					height: 129upx;
					background: linear-gradient(270deg, #FFE7BF 0%, #FDC894 100%);
					border-radius: 24upx;
					border: 3upx solid #EC651C;
					display: flex;
					justify-content: space-between;
					padding: 0 21upx 0 33upx;
					box-sizing: border-box;
					position: relative;
					align-items: center;
					margin-top: 20upx;
					.tstmapleft {
						display: flex;
						flex-direction: column;
						justify-content: center;
				
						.tstmapone {
							font-size: 32upx;
							font-weight: 400;
							color: #4F3832;
						}
				
						.tstmaptwo {
							font-size: 24upx;
							font-family: Yu Gothic UI-Regular, Yu Gothic UI;
							font-weight: 400;
							color: #F96028;
						}
					}
				
					.tstmapright {
						display: flex;
						font-size: 36upx;
						font-weight: bold;
						color: #F96E30;
						align-items: center;
				
						.tstmaprighttxt {
							font-size: 22upx;
							font-weight: 400;
							color: #F96B33;
							text-decoration: line-through;
							margin-right: 10upx;
						}
					}
				
					.tstmapzhong {
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
			}

			.shu {
				width: 100%;
				margin-top: 30upx;

				input {
					width: 650upx;
					height: 100upx;
					background-color: #343136;
					margin: 0 auto;
					font-size: 30upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 400;
					color: #fff;
					padding: 29upx 50upx;
					margin-top: 40upx;
					box-sizing: border-box;
					border-radius: 24px;
				}

				.stct {
					padding: 20upx 10upx;
					display: flex;
					color: #fff;
					font-size: 25upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					width: 650upx;
					text-align: center;
					background: #343136;
					margin: 0 auto;
					box-sizing: border-box;

					.stctname {
						width: 200upx;
					}
				}
			}

			.numlist {
				margin: 0 auto;
				width: 88%;
				border-radius: 26upx;
				box-sizing: border-box;
				display: flex;
				padding: 0 40upx;
				padding-top: 45upx;
				justify-content: space-between;
				flex-wrap: wrap;
				margin-top: 40upx;
				background-color: #343136;

				.num {
					width: 260upx;
					height: 94upx;
					background: rgba(236, 101, 28, 0.14);
					border-radius: 8px;
					font-size: 30upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					text-align: center;
					// line-height: 64upx;
					color: #ffffff;
					margin-bottom: 44upx;
					position: relative;
					border: 3upx solid #EC651C;
					align-items: center;
					display: flex;

					.zeng {
						width: 48upx;
						height: 48upx;
						border-radius: 8upx;
						font-size: 24upx;
						font-family: PingFang SC Regular, PingFang SC Regular-Regular;
						font-weight: 400;
						text-align: center;
						color: #ffffff;
						line-height: 48upx;
						position: absolute;
						background-color: #EC651C;
						top: -22upx;
						right: 14upx;
					}

					.zsmap {
						width: 100%;
						text-align: center;

						.zsone {
							width: 100%;
							text-align: center;
						}

						.zsnei {
							font-size: 22upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							text-align: center;
						}
					}

				}

				.num1 {
					width: 260upx;
					height: 94upx;
					background: #434045;
					border-radius: 8px;
					font-size: 30upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					text-align: center;
					// line-height: 64upx;
					color: #fff;
					margin-bottom: 44upx;
					border: 3upx solid #434045;
					position: relative;
					align-items: center;
					display: flex;

					.zeng {
						width: 48upx;
						height: 48upx;
						border-radius: 8upx;
						font-size: 24upx;
						font-family: PingFang SC Regular, PingFang SC Regular-Regular;
						font-weight: 400;
						text-align: center;
						color: #ffffff;
						line-height: 48upx;
						position: absolute;
						background-color: #EC651C;
						top: -22upx;
						right: 14upx;
					}

					.zsmap {
						width: 100%;
						text-align: center;

						.zsone {
							width: 100%;
							text-align: center;
						}

						.zsnei {
							font-size: 20upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							text-align: center;
							color: #999999;
						}
					}
				}
			}

			.ktitle {
				font-size: 24upx;
				font-family: PingFang SC Regular, PingFang SC Regular-Regular;
				font-weight: 400;
				color: #4bed79;
				margin-left: 62upx;
			}

			.btn {
				width: 636upx;
				// height: 88upx;
				padding: 26upx 0;
				border-radius: 36px;
				margin: 35upx auto;
				font-size: 34upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				text-align: center;
				// line-height: 88upx;
				background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
				color: #ffffff;

			}

			.checkshow {
				width: 100%;
				padding-left: 51upx;
				margin-top: 63upx;
				margin-bottom: 20upx;
				display: flex;
				font-size: 24upx;
				font-family: PingFang SC Medium, PingFang SC Medium-Medium;
				font-weight: 500;
				color: #666666;
				align-items: center;

				/deep/.van-checkbox__label {
					font-size: 24upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #666666;
				}

				/deep/ .van-checkbox__icon {
					border: 1upx solid #191a1a;
					border-radius: 4upx;
				}

				/deep/.van-checkbox__icon--checked {
					background-color: #EC651C;
					border-color: #EC651C;
				}

			}

			.foottitle {
				font-size: 28upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				margin-top: 56upx;
				line-height: 40upx;
				padding: 0 50upx;
			}

			.tapthree {
				margin-top: 16upx;

				.tphand {
					font-size: 32upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #FFFFFF;
				}

				.tpfoot {
					font-size: 28upx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #FFA02E;
					margin-top: 10upx;
				}

				/deep/.van-collapse {
					width: 650upx;
					background-color: #343136;
					margin: 0 auto;
					border-radius: 24upx;
				}

				/deep/.van-hairline--top-bottom::after {
					border: 0px;
				}

				/deep/.van-collapse-item {
					margin-top: 22upx;
				}

				/deep/.van-collapse-item__content {
					padding: 0 30upx;
					background-color: #343136;
					border-radius: 24upx;
				}

				/deep/.van-cell {
					align-items: center;
					padding: 25upx 30upx;
					background-color: #343136;
					border-radius: 24upx;
				}

				/deep/.van-cell:not(:last-child)::after {
					border-bottom: 2upx solid #474349;
				}

				.showtap {
					width: 100%;
					box-sizing: border-box;

					.stone {
						font-size: 28upx;
						font-family: PingFang SC Bold, PingFang SC Bold-Bold;
						font-weight: 700;
						color: #D0D0D0;
						line-height: 48upx;
						padding-bottom: 38upx;
						border-bottom: 2upx solid #474349;
					}

					.stwo {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 23upx 0;

						/deep/.van-stepper__input {
							color: #FFA02E;
						}


						.stright {
							font-size: 28upx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							color: #666666;
							display: flex;
							align-items: center;

							.srtxt {
								margin-right: 28upx;
							}

							.srbtn {
								width: 151upx;
								height: 64upx;
								border-radius: 8upx;
								background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
								text-align: center;
								line-height: 64upx;
								font-size: 28upx;
								font-family: PingFang SC Bold, PingFang SC Bold-Bold;
								font-weight: 700;
								color: #ffffff;
							}
						}
					}
				}

			}
		}

		/deep/.van-popup {
			border-radius: 16upx;
		}

		.tan {
			width: 686upx;
			background-color: #FFFFFF;
			box-sizing: border-box;
			padding: 25upx 32upx;

			.tanhand {
				font-size: 32upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				text-align: center;
				color: #333333;
				margin-bottom: 40upx;
				position: relative;

				image {
					width: 25upx;
					height: 25upx;
					position: absolute;
					top: 5upx;
					right: 18upx;
				}
			}

			.tanone {
				font-size: 28upx;
				font-family: PingFang SC Medium, PingFang SC Medium-Medium;
				font-weight: 500;
				color: #333333;
				line-height: 45upx;

			}

		}

		.tan1 {
			width: 686upx;
			background-color: #FFFFFF;
			box-sizing: border-box;
			padding: 25upx 32upx;

			image {
				align-items: center;
				margin: 0 auto;
				width: 630upx;
				height: 700upx;
			}
			.tanhand {
				font-size: 32upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				text-align: center;
				color: #333333;
				margin-bottom: 40upx;
				position: relative;
			
				image {
					width: 25upx;
					height: 25upx;
					position: absolute;
					top: 5upx;
					right: 18upx;
				}
			}
			
			.tanone {
				font-size: 28upx;
				font-family: PingFang SC Medium, PingFang SC Medium-Medium;
				font-weight: 500;
				color: #333333;
				line-height: 45upx;
			
			}
			.stwotap {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20upx 0;
				font-size: 28upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				// color: #D0D0D0;
			
				/deep/.van-stepper__input {
					color: #FFA02E;
				}
			}
			.tanonedibu {
				width: 100%;
				display: flex;
				.dbleft {
					width: 40%;
					font-size: 28upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					text-align: center;
					padding: 20upx 0;
					color: #666666;
					background-color: #E5E5E5;
					border-radius: 36upx;
					margin: 20upx auto;
				}
				.dbright2 {
					width: 40%;
					font-size: 28upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					text-align: center;
					padding: 20upx 0;
					color: #FFFFFF;
					background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
					border-radius: 36upx;
					margin: 20upx auto;
				}
			}

		}

		.tan2 {
			width: 544upx;
			background-color: #FFFFFF;
			box-sizing: border-box;
			padding: 25upx 32upx;

			.tanhand {
				font-size: 32upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				text-align: center;
				color: #333333;
				margin-bottom: 40upx;
				position: relative;

				image {
					width: 25upx;
					height: 25upx;
					position: absolute;
					top: 5upx;
					right: 18upx;
				}
			}

			.tanone {
				font-size: 28upx;
				font-family: PingFang SC Medium, PingFang SC Medium-Medium;
				font-weight: 500;
				color: #333333;
				line-height: 45upx;

			}
			.dibu {
				width: 100%;
				display: flex;
				.dbright {
					width: 100%;
					background-color: #4B98ED;
					font-size: 28upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					text-align: center;
					padding: 20upx 0;
					color: #FFFFFF;
				}
			
				.dbright1 {
					width: 400upx;
					font-size: 28upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					text-align: center;
					padding: 20upx 0;
					color: #FFFFFF;
					background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
					border-radius: 36upx;
					margin: 20upx auto;
				}
				.dbleft {
					width: 40%;
					font-size: 28upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					text-align: center;
					padding: 20upx 0;
					color: #666666;
					background-color: #E5E5E5;
					border-radius: 36upx;
					margin: 20upx auto;
				}
				.dbright2 {
					width: 40%;
					font-size: 28upx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					text-align: center;
					padding: 20upx 0;
					color: #FFFFFF;
					background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
					border-radius: 36upx;
					margin: 20upx auto;
				}
			}

		}

		.czone {
			width: 686upx;
			position: relative;
			padding: 0 30upx;
			box-sizing: border-box;
			height: 950upx;
			padding-bottom: 40upx;

			.cznei {
				width: 100%;
				box-sizing: border-box;

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

		.dkdel {
			position: absolute;
			top: 20upx;
			right: 20upx;

			image {
				width: 40upx;
				height: 40upx;
			}
		}

		.dibu {
			width: 100%;
			display: flex;
			.dbright {
				width: 100%;
				background-color: #4B98ED;
				font-size: 28upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				text-align: center;
				padding: 20upx 0;
				color: #FFFFFF;
			}

			.dbright1 {
				width: 400upx;
				font-size: 28upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				text-align: center;
				padding: 20upx 0;
				color: #FFFFFF;
				background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
				border-radius: 36upx;
				margin: 20upx auto;
			}
			.dbleft {
				width: 40%;
				font-size: 28upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				text-align: center;
				padding: 20upx 0;
				color: #666666;
				background-color: #E5E5E5;
				border-radius: 36upx;
				margin: 20upx auto;
			}
			.dbright2 {
				width: 40%;
				font-size: 28upx;
				font-family: PingFang SC Bold, PingFang SC Bold-Bold;
				font-weight: 700;
				text-align: center;
				padding: 20upx 0;
				color: #FFFFFF;
				background: linear-gradient(180deg, #FFA73E 0%, #FF752B 100%);
				border-radius: 36upx;
				margin: 20upx auto;
			}
		}

		.footdibu {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			// background-color: rgba(0,0,0,.7);
			.fdbfive {
				position: absolute;
				top: 30upx;
				right: 30upx;
				width: 94upx;
				height: 46upx;

				image {
					width: 94upx;
					height: 46upx;
				}
			}

			.fdbone {
				position: absolute;
				width: 160upx;
				height: 160upx;
				top: 380upx;
				left: 44upx;
				border-radius: 50%;
				box-shadow: rgba(0, 0, 0, .6) 0 0 0 100vh;
			}

			.fdbtwo {
				position: absolute;
				width: 126upx;
				height: 132upx;
				top: 536upx;
				left: 258upx;

				image {
					width: 126upx;
					height: 132upx;
				}
			}

			.fdbthree {
				position: absolute;
				width: 450upx;
				top: 710upx;
				text-align: center;
				left: 142upx;
				color: #FFFFFF;

				.fdbthreeshang {
					font-size: 37upx;
					font-family: YouYuan;
					font-weight: 400;
				}


			}

			.fdbfour {
				position: absolute;
				top: 950upx;
				left: 272upx;
				width: 198upx;
				height: 76upx;

				image {
					width: 198upx;
					height: 76upx;
				}
			}

			.fdbsix {
				position: absolute;
				top: 1050upx;
				left: 272upx;
				font-size: 23upx;
				font-family: Alibaba PuHuiTi;
				font-weight: 400;
				color: #FFFFFF;

				/deep/.van-checkbox__label {
					color: #FFFFFF;
				}

				/deep/.van-checkbox__icon--checked .van-icon {
					border-color: #FFFFFF;
					background-color: transparent;

				}

			}

		}
		.wxts{
			/deep/.van-popup {
				background: transparent;
			}
			.wxtsmap{
				width: 544upx;
				background: #FFFFFF;
				border-radius: 24upx;
				padding-top: 37upx;
				padding-bottom: 22upx;
				.wxtsmapone{
					width: 100%;
					text-align: center;
					font-size: 34upx;
					font-family: Yu Gothic UI-Regular, Yu Gothic UI;
					font-weight: 400;
					color: #111111;
				}
				.wxtsmaptwo{
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 40upx;
					span{
						font-size: 24upx;
					}
				}
				.wxtsmapthree{
					width: 100%;
					text-align: center;
					font-size: 24upx;
					font-family: Microsoft JhengHei UI-Regular, Microsoft JhengHei UI;
					font-weight: 400;
					color: #3A4044;
					margin-top: 27upx;
				}
				.wxtsmapfour{
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 34upx;
					margin-top: 55upx;
				}
			}
		}
	}
</style>
<style lang="scss">
	.van-dialog__header {
		color: red !important;
	}
</style>
