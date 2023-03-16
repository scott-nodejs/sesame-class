<template>
	<view  class="birthday-modal-middle">
		<view  class="bg"></view>
		<view class="birthday-modal-middle-main" :class=" show ? 'animated fast zoomInUp' :'animated fast  zoomOutDown'">
			<view class="middle-main">
				<view @click="closed" class="middle-closed">
					<text class="iconfont  iconbtn_close cl-notice ft20"></text>
				</view>
				<!-- <view class="text-center">
					<text class="ft16 ftw600 cl-main">任务完成了</text>
				</view> -->
				<view class="text-center mt24">
					<image src="https://pic.616pic.com/ys_bnew_img/00/25/89/WOoSeB34uY.jpg" style="width: 412rpx; height: 296rpx;"></image>
				</view>
				<view class="mt24" style="max-height: 200rpx; overflow-y: scroll;">
					<view class="birthday-gift-box pd16_15">
						<view class="flex alcenter space">
							<view style="align-items: center;display: flex;">
								<image :src="avatar" style="width: 69rpx;height: 69rpx;border-radius: 30rpx;"></image>
								<text class="ft14 cl-main" style="margin-left: 10rpx;">共答对{{num}}题</text>
							</view>
						</view>	
					</view>
				</view>
			</view>
			<view v-if="showOnly ==  false" class="birthday-get-btn" style="background:#00C657" @tap="detail">PK详情</view>
		</view>	
	</view>
</template>

<script>
	import { updateStatus, finishTask } from '../../api/api.js';
	export default{
		props:{
			title:{
				type:String,
				default:''
			},
			datas:{
				type:Array,
				default:function(){
					return new Array;
				}
			},
			showOnly:{
				type:Boolean,
				default:false
			},
			taskId: {
				type: Number,
				default: 0
			}
		},
		data(){
			return {
				show:false,
				avatar: 'https://img.hazer.top/classImage/assets/default_avatar.png',
				num: 0,
				desc: '',
				failDesc: ''
			}
		},
		created(){
			this.show = true;
			this.getData();
		},
		methods:{
			closed(){
				this.show = false;
				setTimeout(()=>{
					this.$emit('closed',true);
				},400)
			},
			getData(){
				finishTask({taskId: this.taskId}).then(res=>{
					updateStatus({taskId: this.taskId, status: 3})
					this.avatar = res.data.avatar;
					this.num = res.data.num;
				})
				
			},
			detail(){
				uni.navigateTo({
					url: '/pages/pk/finish?roomId='+this.roomId
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/common.css");
	.birthday-modal-middle{
		width: 100%;
		height: 100vh;
		position: fixed;
		z-index: 400;
		left: 0;
		top: 0;
		
	}
	.birthday-modal-middle .bg{
		position: fixed;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
		z-index: 401;
		left: 0;
		top: 0;
	}
	.birthday-modal-middle-main{
		width: 690rpx;
		background: #F5F6FA;
		border-radius: 32rpx;
		position: fixed;
		top: 50%;
		left: calc(50% - 345rpx);
		transform:translateY(-50%);
		z-index: 402;
		overflow: hidden;
	}
	.birthday-modal-middle-main .middle-main{
		position: relative;
		padding: 64rpx 30rpx 30rpx 30rpx;
	}
	.birthday-modal-middle-main .middle-closed{
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		right: 50rpx;
		top: 50rpx;
		text-align: center;
		line-height: 40rpx;
	}
	.birthday-gift-box{
		width: 100%;
		height: 148rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
	}
	.birthday-get-btn{
		width: 100%;
		height: 96rpx;
		text-align: center;
		font-size: 32rpx;
		color:#FFFFFF;
		font-weight: 500;
		line-height: 96rpx;
	}
</style>