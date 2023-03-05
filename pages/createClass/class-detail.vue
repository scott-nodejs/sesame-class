<template>
	  <view class='page_detail'>
		  <TokenModal v-if="showTokenModal" :classId="classId" @closeToken="closeToken" @onCheckToken="onCheckToken" />

	      <view class='header'>
	        <image mode="aspectFill" class='head-img' :src="classState.coverImage" />
	        <view class='mask'></view>
	      </view>
	      <view class='detail_container'>
	        <view class='class_container'>
	          <view class='class'>{{classState.className}}</view>
			  <Button v-if="classState.role == 1" hoverClass='btn_hover'
			     class='action_btn1'
			  	 @click="release">
			     解散
			  </Button>
			  <Button v-else hoverClass='btn_hover'
			     class='action_btn1'
			  	 @click="exitClass">
			     退出
			  </Button>
			  <!-- <Tag v-else :label="falseLabel" /> -->
	        </view>
	        <view class='class_info'>
	          <view class='info_item'>创建人：{{classState.creator}}</view>
	          <view class='info_item'>总人数：{{classState.totalNum}}人</view>
	          <view class='info_item'>已加入：{{classState.joinUsers.length}}人</view>
	        </view>
			<block>
				<view v-if="classState.joinUsers.length === 0" class='empty_container'>
				  <image class='image' src='https://img.hazer.top/classImage/assets/illustration_empty.png' />
				  <view class='empty_hint'>
				    <Text>还没有同学加入，快去召唤大家~</Text>
				  </view>
				</view>
				<view v-else class='avatars'>
				  <view class='avatar_item' v-for="(item, index) in classState.joinUsers">
					<Avatar :img="item.avatar" :radius="80" :border="0" />
				  </view>
				</view>
			</block>
	        <view v-if="classState.role == 1" class='action_btn_container'>
			  <Button hoverClass='btn_hover'
					class='action_btn'
					openType='share' :data-id="classId">
				邀请好友
			  </Button>
			  <Button hoverClass='btn_hover'
			     class='action_btn'
				 @click="bindBtnClick">
			     加入班级
			  </Button>
	        </view>
			<view v-else class='action_btn_container'>
			  <Button hoverClass='btn_hover'
			    class='action_btn'
			    @click="bindBtnClick">
			    加入班级
			  </Button>
			</view>
	      </view>
	    </view>
</template>

<script>
	import Avatar from '../../compontents/Avatar.vue'
	import Tag from '../../compontents/Tag.vue'
	import AuthModel from '../../compontents/AuthModel.vue'
	import TokenModal from '../../compontents/TokenModal.vue'
	import {getClassOne,metchToken,releaseClass,exitClass} from '../../api/api.js'
	import {mapState,mapActions} from "vuex";
	export default {
		components:{
			Avatar,
			Tag,
			AuthModel,
			TokenModal
		},
		computed:{
			...mapState('user', ['token', 'userInfo']),
		},
		onShareAppMessage(res) {
			let id = res.target.dataset.id;
		    return {
		        title: '芝麻小班的'+this.classState.creator+'邀请你加入'+this.classState.className+'的班集体',
		        path: '/pages/createClass/class-detail?classId='+id,
		        imageUrl: 'https://img.hazer.top/classImage/assets/illustration_share.png'
		    };
		},
		data() {
			return {
				isJoin: false,
				trueLabel:'班长',
				falseLabel:'组员',
				showTokenModal: false,
				classId: 0,
				classState: {
					creator: '',
					className: '',
					totalNum: 0,
					role: 2,
					coverImage: '',
					joinUsers: []
				}
			}
		},
		onLoad(options) {
			this.classId = options.classId;
	        this.getOne(options.classId)
		},
		methods: {
			...mapActions('user', ['login']),
		   loginYes(){
			   
		   },
	       async getOne(id){
			   let {data} = await getClassOne({id: id});
			   this.classState = data
			   if(this.classState.role === 0){
			   	this.showTokenModal = true;
			   }
		   },
		   closeToken(){
			   this.showTokenModal = false;
			   this.getOne(this.classId)
		   },
		   bindBtnClick(){
			   uni.navigateTo({
			   	url: '/pages/task/index?classId='+this.classId+'&role='+this.classState.role
			   })
		   },
		   async onCheckToken(data){
		   		const formData = data;
				let _this = this;
				if(!this.token){
					let code;
					uni.login({
					  provider: 'weixin',
					  success(login) {
					      console.log(login);
							code = login.code;
					  }
					});
					uni.getUserProfile({
					  desc: '登录后可同步数据',
					  success: async (obj) => {
					    // 调用 action ，请求登录接口
						obj["userInfo"]["code"] = this.code;
					    await _this.login(obj);
					    // 登录成功之后，发送事件
					    metchToken({token: formData.token, classId: this.classId, tagName: formData.tagName}).then((res)=>{
					    	if(res.code == 200){
					    		_this.showTokenModal = false
								_this.getOne(_this.classId);
					    	}else{
					    		uni.showToast({
					    			title: '口令验证失败',
					    			icon: 'none'
					    		})	   				   					   
					    	}	   				   
					    });
					  },
					  fail: () => {
					    uni.showToast({
					      title: '授权已取消',
					      icon: 'error',
					      mask: true
					    });
					  },
					  complete: () => {
					    // 隐藏loading
					  }
					});
				}else{
					uni.showLoading({
						title: '操作进行中'
					})
					metchToken({token: formData.token, classId: this.classId, tagName: formData.tagName}).then((res)=>{
						uni.hideLoading();
						if(res.code == 200){
							this.showTokenModal = false;
							this.getOne(this.classId);
							// uni.requestSubscribeMessage({
							//   tmplIds: ['lLze-peqdI2BcWzmqAviCRhMZQccXI7tXnHKlsZ6-Lk'],
							//   success (res) { }
							// })
						}else{
							uni.showToast({
								title: '口令验证失败',
								icon: 'none'
							})	   				   					   
						}	   				   
					});
				}
		   },
		   exitClass(){
			   let _this = this;
			   uni.showModal({
			   	  content: '是否要退出该班级',
			   				  confirmText: '确定',
			   				  cancelText: '取消',
			   				  success(res) {
			   					if(res.confirm){
			   						uni.showLoading({
			   							title: '操作进行中'
			   						})
									exitClass({id: _this.classId}).then(res=>{
										uni.hideLoading();
										if(res.code == 200){
											setTimeout(()=>{
												uni.navigateTo({
													url:'/pages/index/index'
												})
											}, 1000)										   
										}else{
											uni.showToast({
												title: '退出失败',
												icon:'none'
											})										   
										}
									})
							    }
							}
				})
		   },
		   release(){
			   let _this = this;
			   uni.showModal({
			   	  content: '是否要解散该班级',
				  confirmText: '确定',
				  cancelText: '取消',
				  success(res) {
					if(res.confirm){
						uni.showLoading({
							title: '操作进行中'
						})
						releaseClass({id: _this.classId}).then(res=>{
							uni.hideLoading();
							if(res.code == 200){
								setTimeout(()=>{
									uni.navigateTo({
										url:'/pages/index/index'
									})
								}, 1000)										   
							}else{
								uni.showToast({
									title: '解散失败',
									icon:'none'
								})										   
							}			   
						})
					}else if(res.cancel){
						
					}
				  }
			   })
			   
		   }
		}
	}
</script>

<style lang="scss">
	@import "../../static/mixin.scss";
	.page_detail {
	  padding-bottom: 150rpx;
	}
	.navbar {
	  position: fixed;
	  left: 0;
	  top: 0;
	  width: 100%;
	  z-index: 999;
	}
	
	.header {
	  @include wh(100%, 600rpx);
	  background-color: black;
	  z-index: -999;
	  position: relative;
	
	  .head-img {
	    @include wh(100%, 600rpx);
	  }
	
	
	  .mask {
	    @include wh(100%, 600rpx);
	    position: absolute;
	    background: rgba(0, 0, 0, 0.19);
	    left: 0;
	    top: 0;
	  }
	}
	
	.detail_container {
	  background: #FFFFFF;
	  margin-top: -40rpx;
	  border-radius: 32rpx 32rpx 0px 0px;
	  width: 100%;
	  padding: 60rpx 52rpx;
	  
	  .class_container{
		  width: 90%;
		  @include flex(row, space-between, center);
	  }
	
	  .classname_container {
	    @include flex(row, space-between, center);
	
	    .classname {
	      @include font('heading', bold, 48rpx);
	    }
	  }
	
	
	  .info_item {
	    margin-top: 40rpx;
	    @include font('second');
	  }
	
	  .empty_container {
	    @include flex(column, center, center);
	
	    .image {
	      margin-top: 62rpx;
	      @include wh(438rpx, 338rpx);
	    }
	
	    .empty_hint {
	      margin-top: 46rpx;
	      text-align: center;
	      @include font('light', normal, 32rpx);
	    }
	  }
	
	  .avatars {
	    margin-top: 20rpx;
	    @include flex(row, start, center);
	    flex-wrap: wrap;
	
	
	
	    .avatar_item {
	      margin-top: 15rpx;
	    }
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
	
	.action_btn1 {
	  @include wh(186rpx, 78rpx);
	  @include font('white');
	  @include flex(row, center, center);
	  margin-left: 50%;
	  background: $primary-color;
	  box-shadow: 0 14rpx 40rpx 0 $second-color;
	  border-radius: 12rpx;
	}
	
	  .btn_hover {
	    box-shadow: none;
	  }
	}
</style>
