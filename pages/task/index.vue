<template>
	<!-- 老师课表 -->
	<view class="time-table width-100-bfb flex flex-direction" style="height: 100vh">
		<view class="">
			<view class="cu-bar bg-white text-primary">
				<view class="action" @click="previousWeek">
					<text class="cuIcon-back" style="margin-right: unset;"></text>
					<text class="text-bold text-lg">上一周</text>
				</view>
				<text class="content text-bold">{{ time }}</text>
				<view class="action" @click="nextWeek">
					<text class="text-bold text-lg">下一周</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="flex text-center page-bg-white margin-bottom-sm">
				<view class="cu-item flex-sub" v-for="(item, index) in timeList" :key="index" @click="tabSelect" :data-id="index">
					<view class="margin-tb text-lg" style="color: #B1B1B1;">{{ item.week }}</view>
					<view class="text-bold text-lg time radio-circle" :class="index + 1 === week ? 'text-white page-bg-primary radio-circle' : ''">{{ item.time }}</view>
					<text class="text-gray" style="font-size: 80rpx;line-height: 20rpx;" v-if="index + 1 === week">·</text>
				</view>
			</view>
		</view>
		<view v-for="(item, index) in list" :key="index" v-if="index + 1 === week" class="flex-sub">
			<view class="" v-for="(items, i) in item" :key="i" v-if="item.length !== 0">
				<view class="cu-card article" :class="isCard ? 'no-card' : ''">
					<view class="cu-item padding-bottom-xs margin-bottom-xs cu-shadow">
						<view class="cu-list menu-avatar">
							<view class="cu-item flex justify-between margin-lr text-xl height-50 ">
								<view class="text-lg">
									<text class="cuIcon-time text-orange"></text>
									<text class="margin-lr-xs text-bold">{{ items.startTime }}</text>
									<text v-if="items.status == 2" class="margin-lr-xs text-bold" style="color: #ED1C24;">任务进行中...</text>
									<text v-else-if="items.status == 3" class="margin-lr-xs text-bold" style="color: #ED1C24;">任务已结束</text>
								    <text v-else class="margin-lr-xs text-bold" style="color: #ED1C24;">任务未开始</text>
								</view>
								
							</view>
						</view>
						<view class="text-lg">
							<view style="height: 60rpx;">
								<text class="title padding-right-unset">任务名称：</text>
								<text>{{ items.taskName }}</text>
							</view>
							<view>
								<text class="title padding-right-unset">科目类型：</text>
								<text>{{ items.subjectType }}</text>
							</view>
							<view>
								<text class="title padding-right-unset">知识类型：</text>
								<text>{{ items.contentType }}</text>
							</view>
							<view>
								<text class="title padding-right-unset">任务类型：</text>
								<text>{{ items.taskType }}</text>
							</view>
							<view>
								<text class="title padding-right-unset">完成数量：</text>
								<text>{{ items.taskNum }}</text>
							</view>
							<view v-if="role == 1" class="title padding-right-unset">
								<Button hoverClass='btn_hover'
								  class='action_btn1'
								  @click="lookDetail(items.id)">
								  详情
								</Button>
							</view>
							<view v-else class="title padding-right-unset">
								<Button hoverClass='btn_hover'
								  class='action_btn1'
								  @click="joinClick(items.id)">
								  加入
								</Button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="flex justify-center" style="margin-top: 260rpx;">
				<image
					src="../../static/not.png"
					mode=""
					v-if="item.length === 0"
					class=""
					style="width: 100px;height: 80px;"
				></image>
			</view>
		</view>
		<view v-if="role == 1" class='action_btn_container'>
		  <Button hoverClass='btn_hover'
		    class='action_btn'
		    @click="bindBtnClick">
		    发布任务
		  </Button>
		</view>
	</view>
</template>

<script>
import { formatDayTime, teacherData } from '../../utils/common.js';
import {myTask, updateStatus} from '../../api/api.js';
const oneDayTimeStamp = 86400000; // 一天的时间戳
const now = new Date();
const todayDayTimeStamp = now.getTime(); //今天的时间戳
const day = now.getDay();
const getDay = day === 0 ? 7 : day; // 今天的星期
export default {
	name: 'time-table',
	data() {
		return {
			week: now.getDay() === 0 ? 7 : now.getDay(), // 今天的星期
			classId: 0,
			timeList: [
				{
					time: '1',
					week: '一'
				},
				{
					time: '2',
					week: '二'
				},
				{
					time: '3',
					week: '三'
				},
				{
					time: '4',
					week: '四'
				},
				{
					time: '5',
					week: '五'
				},
				{
					time: '6',
					week: '六'
				},
				{
					time: '7',
					week: '日'
				}
			],
			list: [],
			num: 0, // 记录周数，下一周加一，上一周减一, 0:本周
			isCard: false, // 卡片是否铺满全屏
			time: now.toISOString().slice(0, 10),
			mondayDayTimeStamp: 0, // 星期一的时间戳
			sundayDayTimeStamp: 0, // 星期天的时间戳,
			role: 0,
			classId: 0
		};
	},
	// async created() {
	// 	this.thisWeek(); // 一开始进入页面获取本周的课程表
	// },
	async onShow() {
		this.week = now.getDay() === 0 ? 7 : now.getDay();
		this.thisWeek();
	},
	onLoad(options) {
		this.classId = options.classId;
		this.role = options.role;
		//this.getMyTasks();
	},
	methods: {
		bindBtnClick(){
			uni.navigateTo({
				url: './publishTask?id='+this.classId
			})
		},
		joinClick(id){
			updateStatus({taskId: id, status: 2});
			uni.navigateTo({
				url: '/pages/task/exam?id='+id
			})
		},
		lookDetail(id){
			uni.navigateTo({
				url: '/pages/task/ranking?id='+id
			})
		},
		tabSelect(e) {
			this.week = +e.currentTarget.dataset.id + 1;
			this.time = formatDayTime(this.mondayDayTimeStamp + oneDayTimeStamp * (this.week - 1));
			console.log('星期' + this.week);
		},
		async previousWeek() {
			console.log('上一周');
			this.week = 1;
			this.num = this.num - 1;
			if (this.num === 0) {
				this.week = now.getDay() === 0 ? 7 : now.getDay();
			}
			if (this.num >= 0) {
				this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) + oneDayTimeStamp * (7 * this.num); // 上星期一的时间戳
				this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp + oneDayTimeStamp * (7 * this.num); //上星期天的时间戳
			} else {
				this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) - oneDayTimeStamp * (7 * Math.abs(this.num)); // 上星期一的时间戳
				this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp - oneDayTimeStamp * (7 * Math.abs(this.num)); //上星期天的时间戳
			}
			this.dayList();
			this.time = formatDayTime(this.mondayDayTimeStamp);
			// const teacherdata = await teacherData({
			// 	data: {
			// 		startTime: this.mondayDayTimeStamp,
			// 		endTime: this.sundayDayTimeStamp
			// 	}
			// });
			// const { data } = teacherdata.data;
			// this.list = Object.values(data);
		},
		async nextWeek() {
			console.log('下一周');
			this.week = 1;
			this.num = this.num + 1;
			if (this.num === 0) {
				this.week = now.getDay() === 0 ? 7 : now.getDay();
			}
			if (this.num <= 0) {
				this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) - oneDayTimeStamp * (7 * Math.abs(this.num)); // 下星期一的时间戳
				this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp - oneDayTimeStamp * (7 * Math.abs(this.num)); //下星期天的时间戳
			} else {
				this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) + oneDayTimeStamp * (7 * this.num); // 下星期一的时间戳
				this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp + oneDayTimeStamp * (7 * this.num); //下星期天的时间戳
			}
			this.dayList();
			this.time = formatDayTime(this.mondayDayTimeStamp);
			// const teacherdata = await teacherData({
			// 	data: {
			// 		startTime: this.mondayDayTimeStamp,
			// 		endTime: this.sundayDayTimeStamp
			// 	}
			// });
			// const { data } = teacherdata.data;
			// this.list = Object.values(data);
		},
		async thisWeek() {
			console.log('本周');
			this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1); // 星期一的时间戳
			this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp; //星期天的时间戳
			this.dayList();
			// const teacherdata = await teacherData({
			// 	data: {
			// 		startTime: this.mondayDayTimeStamp,
			// 		endTime: this.sundayDayTimeStamp
			// 	}
			// });
			// const { data } = teacherdata.data;
			// this.list = Object.values(data);
		},
		dayList() {
			// 获取本周日期
			for (let i = 0; i < 7; i++) {
				if (this.num === 0) {
					i + 1 === getDay ? (this.timeList[i].time = '今') : (this.timeList[i].time = +formatDayTime(this.mondayDayTimeStamp + i * oneDayTimeStamp).substring(8));
				} else {
					this.timeList[i].time = +formatDayTime(this.mondayDayTimeStamp + i * oneDayTimeStamp).substring(8);
				}
			}
			this.getMyTasks();
		},
		async getMyTasks(){
			
			let {data} = await myTask({day : this.week - 1 , num: this.num, classId: this.classId});
			this.list = data;
		}
	},
	onUnload() {}
};
</script>

<style lang="scss" scoped>
@import '../../static/colorUi/main.css';
@import '../../static/colorUi/icon.css'; // 图标样式
@import "../../static/mixin.scss";
.time-table {
	.content {
		background-color: #ffffff;
	}

	.title {
		line-height: 76rpx !important;
	}
	.time {
		width: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		margin: 0 auto;
	}
	.action_btn_container {
	  @include wh(100%, 150rpx);
	  @include flex(row, center, center);
	  position: fixed;
	  left: 0;
	  bottom: 0;
	  background-color: #fff;
		
	  .action_btn {
	    @include wh(686rpx, 88rpx);
	    @include font('white');
	    @include flex(row, center, center);
	    background: $primary-color;
	    box-shadow: 0 14rpx 40rpx 0 $second-color;
	    border-radius: 12rpx;
	  }
	}
}
.action_btn1 {
	    @include wh(186rpx, 68rpx);
	    @include font('white');
	    @include flex(row, center, center);
	    background: $primary-color;
	    box-shadow: 0 14rpx 40rpx 0 $second-color;
	    border-radius: 12rpx;
	  }
.width-100-bfb {
	width: 100%;
}
.text-primary {
	color: #409eff;
}
.margin-bottom-sm {
	margin-bottom: 20rpx !important;
}
.padding-bottom-xs {
	padding-bottom: 10rpx !important;
}
.margin-bottom-xs {
	margin-bottom: 5px !important;
}
.cu-shadow {
	box-shadow: rgba(43, 111, 179, 0.15) 0px 0px 8px 0px;
}
.height-50 {
	height: 100rpx !important;
}
.padding-right-unset {
	padding-right: unset !important;
}
.radio-circle {
	border-radius: 100%;
}
.page-bg-primary {
	background: #409eff !important;
	color: #ffffff;
}
.justify-between {
	justify-content: space-between !important;
}
</style>
