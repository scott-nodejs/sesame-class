<template>
	<view class='index'>
		  <AuthModel v-if="showAuthModel" @loginYes="loginYes" @close="closeModal" />
		  <view
		    class='user_info'
		    :style="{ height: `${navHeight}px`, top: `${statusBarHeight}px` }"
		    @click= "authClick"
		  >
		          <Avatar :radius="radius" :img="avatarUrl" :border="border"></Avatar>
		          <text class='nickname'>{{nickname}}</text>
		  </view>
	      <view class="page">
			<view class='action_container'>
			  <navigator url="../createClass/search-class">
				  <view
				    class='action_item'>
				    <view class='action_txt'>
				      <view class='action_title'>
				        加入班级
				      </view>
				      <view class='action_hint'>
				        查看同学去向
				      </view>
				    </view>
				    <image class="aciton_image" src='https://img.hazer.top/classImage/assets/illustration_join_class.png' />
				  </view>
			  </navigator>
			  <view
			  	class='action_item' @click="toCreateClass">
			  	<image class='aciton_image' src='https://img.hazer.top/classImage/assets/illustration_create_class.png' />
			  	<view class='action_txt txt_right'>
			  	  <view class='action_title'>
			  		创建班级
			  	  </view>
			  	  <view class='action_hint'>
			  		邀请同学加入
			  	  </view>
			  	</view>				
			  </view>
	        </view>
	        <view class='join_container'>
	          <text class='title'>我加入的</text>
	                <view v-if="joinClasses.length === 0" class='empty_container'>
	                  <image class='image' src='https://img.hazer.top/classImage/assets/illustration_empty.png' />
	                  <view class='empty_hint'>
	                    <text>您还没加入任何班级</text>
	                    <view>
	                      <text>你可以选择</text>
	                      <text class='action'>加入班级</text>
	                      <text>或者</text>
	                      <text class='action'>创建班级</text>
	                    </view>
	                  </view>
	                </view>
					<view v-else>
						<block v-for="(item, index) in joinClasses">
							<navigator :url="'../createClass/class-detail?classId='+item.classId">
								<ClassItem
								 :className="item.className"
								 :totalNum="item.totalNum"
								 :joinNum="item.joinUsers.length"
								 :coverImage="item.coverImage"
								 :isJoin="item.role === 1"
								 :trueLabel="trueLabel"
								 :falseLabel="falseLabel"
								  />
							</navigator>
						</block>
					</view>
	        </view>
	      </view>
	    </view>
</template>

<script>
	import ClassItem from '../../compontents/ClassItem.vue'
	import AuthModel from '../../compontents/AuthModel.vue'
	import Avatar from '../../compontents/Avatar.vue'
	import Tag from '../../compontents/Tag.vue'
	import {getMyClasses} from '../../api/api.js'
	import {mapState,mapActions} from "vuex";
	export default {
		components: {
			ClassItem,
			AuthModel,
			Avatar,
			Tag
		},
		data() {
			return {
				showAuthModel: false,
				joinClasses: [],
				trueLabel:'班长',
				falseLabel:'组员',
				avatarUrl: 'https://img.hazer.top/classImage/assets/default_avatar.png',
				nickname: '未授权',
				radius: 64,
				border: 4,
				navHeight: 0,
				statusBarHeight: 0
			}
		},
		onShow() {
		   let _this = this;
		   uni.getSystemInfo({
		   	success: function(e) {
		   		_this.statusBarHeight = e.statusBarHeight;
		   		if (e.platform == 'android') {
		   			_this.navHeight = 48;
		   		} else {
		   			_this.navHeight = 44;
		   		};
		   	}
		   });
		   if(this.token){
			   this.avatarUrl = this.userInfo.avatarUrl;
			   this.nickname = this.userInfo.nickName;
		   }
           this.getData();
		},
		computed:{
			...mapState('user', ['token', 'userInfo']),
		},
		methods: {
		   ...mapActions('user', ['isLogin', 'logout']),
           async getData(){
			   if(this.token){
				   let {data} = await getMyClasses();
				   this.joinClasses = data;
			   }
		   },
		   authClick(){
			   let _this = this;
			   if(!this.token){
				   this.showAuthModel = true
			   }else{
				   uni.showActionSheet({
					   itemList: ['修改头像','退出登录'],
					   success(e) {
					   	  console.log(e.tapIndex)
						  switch(e.tapIndex){
							  case 0:
							     uni.navigateTo({
							     	url: '/pages/index/updateAvatar'
							     })
							     break;
							  case 1:
							     _this.logout();
								 _this.teken = '';
								 if(!_this.token){
									_this.joinClasses = [];
								 	_this.avatarUrl = 'https://img.hazer.top/classImage/assets/default_avatar.png';
								 	_this.nickname = '未授权';
								 }
							     break;
							  default:
							     break;
						  }
					   }
				   })
			   }
		   },
		   loginYes(){
			   this.getData();
			   this.showAuthModel = false
			   this.avatarUrl = this.userInfo.avatarUrl;
			   this.nickname = this.userInfo.nickName;
		   },
		   closeModal(){
			   this.showAuthModel = false;
		   },
		   toCreateClass(){
			   if(!this.token){
			   		this.showAuthModel = true
			   }else{
				   uni.navigateTo({
				   	url: '/pages/createClass/create-class'
				   })
			   }
		   }
		}
	}
</script>

<style lang="scss">
	@import "../../static/mixin.scss";
	
	.index {
		
		.user_info {
		  @include flex(row, start, center);
		  position: fixed;
		  padding-left: 20rpx;
		  left: 34rpx;
		  z-index: 9999;
		  width: 450rpx;
		  overflow: hidden;
		  /*超出隐藏*/
		  white-space: nowrap;
		  /* 强制不换行 */
		  text-overflow: ellipsis;
		  /*文字隐藏的格式 */
		
		  .nickname {
		    @include font('normal', bold);
		    margin-left: 20rpx;
		  }
		}
	
	  .page {
	    padding: 74px 54rpx 54rpx 54rpx;
	
	    .action_container {
	      @include flex(column, center, center);
	
	      .action_item {
	        @include wh(642rpx, 239rpx);
	        @include shadow();
	        @include flex(row, space-between);
	        border-radius: $radius;
	        padding: 38rpx;
	        margin-top: 44rpx;
	        box-sizing: border-box;
	
	        .action_txt {
	          height: 100%;
	          @include flex(column, space-between);
	
	          .action_title {
	            @include font('heading', bold);
	          }
	
	          .action_hint {
	            @include font('light');
	          }
	        }
	
	        .txt_right {
	          @include flex(column, space-between, flex-end);
	        }
	
	        .aciton_image {
	          @include wh(238rpx, 178rpx)
	        }
	      }
	    }
	
	    .join_container {
	      margin-top: 98rpx;
	
	      .title {
	        @include font('big', bold);
	      }
	
	      .empty_container {
	        @include flex(column, center, center);
	
	        .image {
	          margin-top: 62rpx;
	          @include wh(438rpx, 338rpx);
	        }
	
	        .empty_hint {
	          margin-top: 86rpx;
	          text-align: center;
	          @include font('light', normal, 32rpx);
	
	          .action {
	            color: $primary-color;
	          }
	        }
	      }
	
	    }
	  }
	}
</style>
