<template>
	<view class='auth_modal' onTouchMove={handleTouchMove}>
	      <view class='modal_container'>
	        <view class='modal_title-container'>
	          <view class='modal_title'>您还未授权</view>
	          <view class='modal_desc'>请先授权登录进行操作</view>
	        </view>
	        <Image class="rocket" src= 'https://img.hazer.top/classImage/assets/illustration_login.png' />
	        <!-- #ifdef MP-WEIXIN -->
	        <Button
	          hoverClass='auth_btn_hover'
	          class='auth_btn'
	          @tap="getUserInfo">确认授权</Button>
	        <!-- #endif -->
	        <!-- #ifndef MP-WEIXIN -->
			<Button
			  hoverClass='auth_btn_hover'
			  class='auth_btn'
			  @tap="onAutoLogin">一键登录</Button>
	        <!-- #endif -->
	        <view class='modal_close'>
	          <image class='close_icon' src='https://img.hazer.top/classImage/assets/icon_close.png' @click="closeM"></image>
	        </view>
	      </view>
	      <view class='modal_mask'></view>
	</view>
</template>

<script>
	import {mapActions } from 'vuex';
	export default {
		data() {
			return {
	
			}
		},
		onLoad() {
	
		},
		methods: {
			...mapActions('user', ['login']),
			getUserInfo(){
				uni.showLoading({
					title: '登录中...'
				})
				let code;
				let _this = this;
				uni.login({
				  provider: 'weixin',
				  success(login) {
				      console.log(login);
					  _this.code = login.code;
				  }
				});
				uni.getUserProfile({
				  desc: '登录后可同步数据',
				  success: async (obj) => {
				    // 调用 action ，请求登录接口
					obj["userInfo"]["code"] = _this.code;
				    await this.login(obj);
				    // 登录成功之后，发送事件
				    this.$emit('loginYes');
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
				    uni.hideLoading();
				  }
				});
			},
			closeM(){
				this.$emit("close")
			},
			async onAutoLogin() {
			  // 展示加载框
			  uni.showLoading({
			    title: '加载中'
			  });
			  await this.login({
			    encryptedData: 'BmGEMqpGI5w',
			    errMsg: 'getUserProfile:ok',
			    iv: 'c+NbINO4CuEWCBYGG2FxWw==',
			    rawData:
			      '{"nickName":"小慕同学","gender":1,"language":"zh_CN","city":"","province":"","country":"China","avatarUrl":"https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"}',
			    signature: '449a10f11998daf680fe546a5176e6e2973516ce',
			    userInfo: { nickName: '小慕同学', gender: 1, language: 'zh_CN', city: '', province: '' }
			  });
			  this.$emit('loginYes');
			  // 隐藏loading
			  uni.hideLoading();
			},
		}
	}
	
</script>

<style lang="scss">
	@import "../static/mixin.scss";
	
	.auth_modal {
	  .modal_mask {
	    position: fixed;
	    left: 0;
	    top: 0;
	    background: rgba(0, 0, 0, 0.45);
	    z-index: 10000;
	    @include wh(100%, 100%);
	  }
	
	  .modal_container {
	    @include wh(568rpx, 684rpx);
	    @include flex(column, space-evenly, center);
	    position: fixed;
	    top: 45%;
	    left: 50%;
	    z-index: 20000;
	    transform: translate(-50%, -50%);
	    border-radius: 20rpx;
	    background-color: #FFFFFF;
	
	    .modal_title-container {
	      @include flex(column, start, center);
	
	      .modal_title {
	        @include font('normal', bold);
	      }
	
	      .modal_desc {
	        @include font('light', nomal, 28rpx);
	        margin-top: 20rpx;
	      }
	    }
	    .rocket {
	      @include wh(362rpx, 300rpx);
	    }
	    .auth_btn {
	      @include wh(464rpx, 82rpx);
	      @include font('white');
	      @include flex(row, center, center);
	      background: $primary-color;
	      box-shadow: 0 14rpx 40rpx 0 $second-color;
	      border-radius: 12rpx;
	      line-height: 82rpx;
	    }
	    .auth_btn_hover {
	      box-shadow: none;
	    }
	    .modal_close {
	      position: absolute;
	      bottom: -102rpx;
	      left: 50%;
	      transform: translateX(-36rpx);
	      .close_icon {
	        @include wh(72rpx, 72rpx);
	      }
	    }
	  }
	
	}
</style>
