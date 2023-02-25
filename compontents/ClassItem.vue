<template>
	<view class='join_item'
	      hoverClass='join_item_hover'
	      >
	      <view class="image_container">
	        <view class='mask'></view>
	        <image class='image' mode="aspectFill" :src="coverImage" />
	      </view>
	      <view class='join_txt'>
	        <view class='member'>已加入：{{joinNum}}/{{totalNum}}人</view>
	        <view class='title'>
	          <view class='classname'>{{className}}</view>
			  <Tag :label="isJoin ? trueLabel : falseLabel" />
	        </view>
	      </view>
	    </view>
</template>

<script>
	import Tag from './Tag.vue'
	export default {
		components: {
			Tag
		},
		props: {
		  className: {
		    type: String,
		    default: ''
		  },
		  totalNum: {
			  type: Number,
			  default: 0
		  },
		  joinNum: {
			  type: Number,
			  default: 0
		  },
		  coverImage: {
		    type: String,
		    default: ''
		  },
		  isJoin: {
		    type: Boolean,
		    default: false
		  },
		  trueLabel: {
		    type: String,
		    default: '已加入'
		  },
		  falseLabel: {
		    type: String,
		    default: '未加入'
		  }
		},
		data() {
			return {
				
			}
		},
		onLoad() {
	
		},
		methods: {
	
		}
	}
</script>

<style lang="scss">
	@import "../static/mixin.scss";
	
	.join_item {
	  @include wh(642rpx, 468rpx);
	  @include shadow();
	  border-radius: $radius;
	  position: relative;
	  margin-top: 48rpx;
	
	  .image_container {
	    @include wh(642rpx, 302rpx);
	    border-radius: $radius $radius 0 0;
	
	    .image {
	      @extend .image_container;
	    }
	
	    .mask {
	      @extend .image_container;
	      background: rgba(0, 0, 0, 0.19);
	      position: absolute;
	      left: 0;
	      top: 0;
	    }
	  }
	
	  .join_txt {
	    padding: 32rpx 38rpx;
	    height: 166rpx;
	    @include flex(column, space-between);
	    box-sizing: border-box;
	
	    .member {
	      @include font('light', normal, 28rpx);
	    }
	
	    .title {
	      width: 100%;
	      @include flex(row, space-between, center);
	
	      .classname {
	        width: 450rpx;
	        overflow: hidden;
	        text-overflow: ellipsis;
	        white-space: nowrap;
	        @include font('normal', bold);
	      }
	    }
	  }
	}
	
	.join_item_hover {
	  box-shadow: 0px 7rpx 20rpx 0 $shadow-color;
	  transform: scale(0.99);
	}
</style>
