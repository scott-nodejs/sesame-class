<template>
	 <view class='success_page'>
	      <image src='https://img.hazer.top/classImage/assets/icon_create_success.png' class='success_icon' />
	      <view class='success_title'>创建成功</view>
	      <view class='success_info'>
	        <text>加入口令：</text>
	        <text class='token'>{{token}}</text>
	        <image src='https://img.hazer.top/classImage/assets/icon_copy.png' class='copy_icon' />
	      </view>
	      <button
	        class='class_btn'
	        hoverClass='btn_hover'
	        >查看班级</button>
	      <button
	        class='share_btn'
	        hoverClass='btn_hover'
	        openType='share' :data-id="classId">邀请同学</button>
	    </view>
</template>

<script>
	export default {
		data() {
			return {
	            token: '',
				creatorName: '',
				className: '',
				classId: 0,
				CLASS_DETAIL: '/pages/createClass/class-detail'
			}
		},
		onShareAppMessage(res) {
			let id = res.target.dataset.id;
		    return {
		        title: '芝麻小班的'+this.creatorName+'邀请你加入'+this.className+'的班集体',
		        path: '/pages/createClass/class-detail?classId='+id,
		        imageUrl: 'https://img.hazer.top/classImage/assets/illustration_share.png'
		    };
		},
		onLoad(options) {
	        this.token = options.token;
			this.creatorName = options.creatorName;
			this.className = options.className;
			this.classId = option.classId;
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	@import "../../static/mixin.scss";
	
	.success_page {
	  @include font('normal');
	  @include flex(column, start, center);
	
	  .success_icon {
	    @include wh(128rpx, 128rpx);
	    border-radius: 50%;
	  }
	
	  .success_title {
	    margin-top: 20rpx;
	  }
	
	  .success_info {
	    @include flex(row, center, center);
	    margin-top: 42rpx;
	
	    .token {
	      color: $primary-color;
	    }
	
	    .copy_icon {
	      @include wh(32rpx, 32rpx);
	    }
	  }
	
	  button::after{ 
	    border: none; 
	  }
	
	  .share_btn {
	    @include wh(612rpx, 92rpx);
	    @include font('white');
	    @include flex(row, center, center);
	    background: $primary-color;
	    box-shadow: 0 14rpx 40rpx 0 $second-color;
	    border-radius: 12rpx;
	    line-height: 92rpx;
	    margin-top: 30rpx;
	  }
	
	  .class_btn {
	    @include wh(612rpx, 92rpx);
	    @include font('white');
	    color: $primary-color;
	    background: #FFFFFF;
	    border-radius: 12rpx;
	    line-height: 92rrpx;
	    margin-top: 60rpx;
	    border: 3rpx solid $primary-color;
	  }
	
	  .btn_hover {
	    box-shadow: none;
	  }
	
	  .ad_unit {
	    margin-top: 44rpx;
	  }
	}
</style>
