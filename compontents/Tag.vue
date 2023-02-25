<template>
	<view class='tag_container' :style="{background: `${bgColor}`, width: `${width}rpx`, height: `${height}rpx`}">
	  <view class="label" :style="{color: `${labelColor}`}">{{label}}</view>
	</view>
</template>

<script>
	export default {
		props: {
		  label: {
		    type: String,
		    default: ''
		  },
		  bgColor: {
		    type: String,
		    default: "#ffe7ba"
		  },
		  labelColor: {
		    type: String,
		    default: "#fa8c16"
		  },
		  width:{
			  type: Number,
			  default: 110
		  },
		  height: {
			  type: Number,
			  default: 48
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
	
	.tag_container {
	  border-radius: 6rpx;
	  @include flex(row, center, center);
	  .label {
	    font-size: 20rpx;
	    
	  }
	}
</style>
