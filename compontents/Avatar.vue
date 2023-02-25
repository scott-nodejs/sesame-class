<template>
	<view class='avatar_container' 
	      :style="{width: `${radius}rpx`, height: `${radius}rpx`}">
	      <image
	        mode='scaleToFill' 
	        :src= "img"
	        class='avatar_image'  
	        :style="{width: `${radius}rpx`, height: `${radius}rpx`, border:`${border}px solid #FFFFFF`}"/>
	</view>
</template>

<script>
	export default {
		props: {
		  radius: {
		    type: Number,
		    default: 40
		  },
		  img:{
			type: String,
			default: ''
		  },
		  border: {
			type: Number,
			default: 1
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
	
	.avatar_container {
	  border-radius: 50%;
	  box-sizing: border-box;
	  box-shadow: 0px 7rpx 20rpx rgba(0,0,0,0.08);
	  .avatar_image {
	    border-radius: 50%;
	  }
	}
</style>
