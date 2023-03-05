<template>
	<view class='join_page'>
	      <!-- <canvas
	        canvas-id="cropAvatarCanvas"
	        class='crop-canvas'
	        style='width: 100rpx`;height: 100rpx' /> -->
	      <view class='form_bg'>
	        <Avatar :img="avatar" :radius="radius" :border="border" />
	      </view>
	      <form class='form_container'>
	        <view class='form_item'>
	          <view class='form_label'>任务名称：</view>
	          <input 
	            class='form_input'
	            placeholder='输入任务名称'
	            placeholderClass='placeholder'
	            v-model='task.taskName'
	             />
	        </view>
	        <view class='form_item'>
	          <view class='form_label'>科目类型：</view>
	          <picker mode="selector"
			   :value="index"
			   :range="OPTION"
			   @change="typeChange"
			   range-key="name"
			   >
	            <view class='picker'>{{OPTION[index].name}}</view>
	          </picker>
	          <image class='select_arrow' src="https://img.hazer.top/classImage/assets/icon_select_arrow.png" />
	        </view>
			<view class='form_item'>
			  <view class='form_label'>知识类型：</view>
			  <picker mode="selector"
			   :value="cindex"
			   :range="OPTION[index].children"
			   @change="typeChange1"
			   range-key="name"
			   >
			    <view class='picker'>{{OPTION[index].children[cindex].name}}</view>
			  </picker>
			  <image class='select_arrow' src="https://img.hazer.top/classImage/assets/icon_select_arrow.png" />
			</view>
			<view class='form_item'>
			  <view class='form_label'>任务类型：</view>
			  <picker mode="selector"
			   :value="ccindex"
			   :range="OPTION[index].children[cindex].children"
			   @change="typeChange2"
			   range-key="name"
			   >
			    <view class='picker'>{{OPTION[index].children[cindex].children[ccindex].name}}</view>
			  </picker>
			  <image class='select_arrow' src="https://img.hazer.top/classImage/assets/icon_select_arrow.png" />
			</view>
	        <view class='form_item'>
	          <view class='form_label'>任务数量：</view>
	          <input
	            class='form_input'
	            placeholder='输入任务数量'
				type='number'
	            placeholderClass='placeholder'
	            v-model='task.taskNum'
	             />
	        </view>
	        <view class='form_item'>
	          <view class='form_label'>开始时间：</view>
	          <uni-datetime-picker
	          				type="datetime"
	          				@change="changeLog"
							:border="false"
							v-model="task.startTime"
	          			/>
	        </view>
			<view class='form_item'>
			  <view class='form_label'>结束时间：</view>
			  <uni-datetime-picker
			  				type="datetime"
			  				@change="changeLog"
							:border="false"
							v-model="task.endTime"
			  			/>
			</view>
	        <view @click="openChooseUser" class='form_item'>
	          <view class='form_label'>对象范围：</view>
			  <view v-if="task.users.length != 0" class='select_address'>{{task.users}}</view>
			  <view v-else class='placeholder'>选择对象范围</view>
	          <image class='select_arrow' src= 'https://img.hazer.top/classImage/assets/icon_select_arrow.png' />
	        </view>
	        <Button formType='submit' class='form_btn' hoverClass='form_btn_hover' @click="onSubmit">任务发布</Button>
	      </form>
	      <view class='notice'>* 信息只能被同一班级的同学查看</view>
	</view>
</template>

<script>
	import Avatar from '../../compontents/Avatar.vue'
	import {createTask, getTaskTypes} from '../../api/api.js'
	import {
		TASK_NAME_NOTEMPTY,
		TASK_USER_NOTEMPTY,
		TASK_TIME_NOTEMPTY,
		TASK_TIME_ERROR,
		TASK_NUM_NOTEMPTY
	} from '../../utils/constant.js'
	export default {
		components: {
           Avatar
		},
		data() {
			return {
				OPTION: [],
				index: 0,
				cindex: 0,
				ccindex: 0,
				radius: 148,
				border: 4,
				avatar: 'https://img.hazer.top/classImage/assets/default_avatar.png',
				task: {
					taskName:'',
					type: 0,
					taskNum: 0,
					users:'',
					ids:'',
					startTime: '',
					endTime: '',
					classId: 0,
					subjectTypeId: 1,
					contentTypeId: 0
				}
			}
		},
		onShow() {
			var _this = this;
			uni.$on('update', function(e){
				_this.task.users = e;
			})
			uni.$on('updateIds', function(e){
				_this.task.ids = e;
			})
		},
		onLoad(options) {
			this.task.classId = options.id
			this.getTpyes()
		},
		methods: {
			async getTpyes(){
			    let {data} = await getTaskTypes();
				this.OPTION = data;
			},
			openChooseUser(){
				uni.navigateTo({
					url: './checkgroup?classId='+this.task.classId
				})
			},
			onSubmit(){
				if (this.checkFormEmpty(this.task.taskName)) {
				  this.showToast(TASK_NAME_NOTEMPTY)
				  return false
				}
				if (this.checkFormEmpty(this.task.taskNum)) {
				  this.showToast(TASK_NUM_NOTEMPTY)
				  return false
				}
				if (this.checkFormEmpty(this.task.startTime)) {
				  this.showToast(TASK_TIME_NOTEMPTY)
				  return false
				}
				if (this.checkFormEmpty(this.task.endTime)) {
				  this.showToast(TASK_TIME_NOTEMPTY)
				  return false
				}
				if (this.checkFormEmpty(this.task.users)) {
				  this.showToast(TASK_USER_NOTEMPTY)
				  return false
				}
				if(this.task.startTime >= this.task.endTime){
					this.showToast(TASK_TIME_ERROR)
					return false
				}
				if(this.task.contentTypeId == 0){
					this.task.contentTypeId = this.OPTION[this.index].children[0].id
				}
				if(this.task.type == 0){
					this.task.type = this.OPTION[this.index].children[this.cindex].children[0].id
				}
				createTask(this.task).then(res=>{
					if(res.code == 200){
						this.showToast("任务创建成功")
						this.clearData();
					}else{
						this.showToast("任务创建失败")
					}
					
				})
			},
			typeChange(e){
				this.task.subjectTypeId = this.OPTION[e.detail.value].id
				this.index = e.detail.value;
			},
			typeChange1(e){
				console.log(e)
				this.task.contentTypeId = this.OPTION[this.index].children[e.detail.value].id
				this.cindex = e.detail.value;
			},
			typeChange2(e){
				this.task.type = this.OPTION[this.index].children[this.cindex].children[e.detail.value].id
				this.ccindex = e.detail.value;
			},
			checkFormEmpty(formItem) {
			  return formItem.length === 0
			},
			checkToken(token) {
			  return /^(?=.*\d)(?=.*[a-zA-z]).{6,}$/.test(token)
			},
			
			checkPhone(phone) {
			  return /^[1]([3-9])[0-9]{9}$/.test(phone)
			},
			
			checkCount(count, countLimit){
			  const num = Number(count)
			  return num > countLimit || num <= 0
			},
			
			checkMinCount(count, minLimit) {
			  const num = Number(count)
			  return num < minLimit
			},
			showToast(data){
				uni.showToast({
					title: data,
					icon:'none'
				});
			},
			clearData(){
				this.task.taskName = ''
				this.task.type = 0
				this.task.taskNum = 0
				this.task.name = ""
				this.task.startTime = ""
				this.task.endTime = ""
			    this.task.users = ""
				this.task.ids = ""
			}
		}
	}
</script>

<style lang="scss">
	 @import "../../static/mixin.scss";
	 @import "../../static/form.scss";
	 
	 .join_page {
	   @include flex(column, start, center);
	 }
	 
	 .form_bg {
	   @include wh(100%, 400rpx);
	   @include flex(column, start, center);
	   background: $primary-color;
	 }
	 
	 .form_container {
	   margin-top: -180rpx;
	 
	   .select_address {
	     width: 400rpx;
	     overflow: hidden;
	     text-overflow: ellipsis;
	     white-space: nowrap;
	   }
	 }
	 
	 .btn_hover {
	   box-shadow: none;
	 }
	 
	 .crop-canvas {
	   position: absolute;
	   top: -1000rpx;
	   background-color: gray;
	 }
</style>
