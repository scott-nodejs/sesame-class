<template>
	<view class='auth_modal'>
	      <view class='modal_container'>
	        <view class='modal_title'>班级口令</view>
	        <Form @submit="metch">
	          <input 
	            class='form_input'
	            placeholder='请输入口令'
	            placeholderClass='placeholder'
	            autoFocus
	            name='token' />
			  <input
			    class='form_input'
			    placeholder='显示名称'
			    placeholderClass='placeholder'
			    autoFocus
			    name='tagName' />
	          <Button
	            hoverClass='check_btn_hover'
	            class='check_btn'
	            formType='submit'>确认口令</Button>
	        </Form>
	        <view class='modal_close'>
	          <image class='close_icon' src='https://img.hazer.top/classImage/assets/icon_close.png' @click="close"></image>
	        </view>
	      </view>
	      <view class='modal_mask'></view>
	    </view>
</template>

<script>
	export default {
		props: {
		  classId: {
		    type: Number,
		    default: 0
		  }
		},
		data() {
			return {
			}
		},
		onLoad() {
	
		},
		methods: {
	       metch(e){
			 this.$emit("onCheckToken", e.detail.value);  
		   },
		   close(){
			   this.$emit("closeToken");
		   }
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
	    @include wh(568rpx, 384rpx);
	    @include flex(column, space-evenly, center);
	    position: fixed;
	    top: 45%;
	    left: 50%;
	    z-index: 20000;
	    transform: translate(-50%, -50%);
	    border-radius: 20rpx;
	    background-color: #FFFFFF;
	
	    .modal_title {
	
	        @include font('normal', bold);
	    }
	    .placeholder {
	      @include font('placeholader');
	    }
	
	    .form_input {
	      @include font('normal');
	      @include wh(464rpx, 82rpx);
	      border-bottom: 2rpx solid $light-grey;
	    }
	    .check_btn {
	      @include wh(464rpx, 82rpx);
	      @include font('white');
	      @include flex(row, center, center);
	      margin-top: 30rpx;
	      background: $primary-color;
	      box-shadow: 0 14rpx 40rpx 0 $second-color;
	      border-radius: 12rpx;
	      line-height: 82rpx;
	    }
	    .check_btn_hover {
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
