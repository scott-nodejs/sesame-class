<template>
	    <view class='attention_page'>
	         <view class='image_container'>
	           <image mode='widthFix' src='https://img.hazer.top/classImage/assets/illustration_create_attention_list.png' class='attention_image' />
	         </view>
	         <view class='item_container'>
	               <view class='attention_item'>
	                 1、班级名应该有具体含义，可以使用学校+班级名的形式，例如 "华中大152021班"。
	               </view>
	   			<view class='attention_item'>
	                 
	               </view>
	   			<view class='attention_item'>
	                 2、创建人可以使用自己的姓名或者常用昵称。
	               </view>
	   			<view class='attention_item'>
	                 3、口令尽量复杂，防止无关人员加入班级。
	               </view>
	   			<view class='attention_item'>
	                 4、勾选允许被搜索后，班级可以通过口令搜索加入。
	               </view>
	   			<view class='attention_item'>
	                 5、请勿上传任何违法违规内容，若经查处，将冻结账号，并移送信息至有关部门。
	               </view>
	   			<view class='attention_item'>
	                 6、「同学在哪儿」小程序保留一切解释权。
	               </view>
	         </view>
	       </view>
</template>

<script>
</script>

<style lang="scss">
	@import '../../static/mixin.scss';
	.attention_page {
	  padding: 20rpx 30rpx;
	  .attention_item {
	    margin: 25rpx 0rpx;
	
	    @include font('normal', normal, 32rpx);
	  }
	  .image_container {
	    @include flex(row, center, center);
	    .attention_image {
	      width: 400rpx;
	    }
	  }
	  .item_container {
	    margin-top: 30rpx;
	    padding: 10rpx 20rpx;
	    border-radius: 10rpx;
	    @include shadow();
	  }
	}
</style>
