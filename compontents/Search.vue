<template>
	<view class='search_container'>
	      <image class='search_icon' src='https://img.hazer.top/classImage/assets/icon_search.png'/>
	      <input
	        class='input'
	        :placeholder="hint"
	        placeholderClass='input_hint'
	        confirm-type='search'
	        :autoFocus="autoFocus"
			@confirm= "onSearch()"
	      />
	</view>
</template>

<script>
	export default {
		props: {
		  hint: {
		    type: String,
		    default: ''
		  },
		  autoFocus: {
		    type: Boolean,
		    default: false
		  }
		},
		data() {
			return {

			}
		},
		onLoad() {
	
		},
		methods: {
			onSearch(){
				this.$emit("onSearch");
			}
		}
	}
</script>

<style lang="scss">
	@import "../static/mixin.scss";
	
	.search_container {
	  @include flex(row, start, center);
	  @include wh(686rpx, 112rpx);
	  @include shadow();
	  background: #FFFFFF;
	  border-radius: 6rpx;
	  padding: 0px 56rpx;
	  .search_icon {
	    @include wh(36rpx, 36rpx);
	    margin-right: 44rpx;
	  }
	
	  .input {
	    width: 90%;
	  }
	
	  .input_hint {
	    @include font('placeholader', normal, 30rpx);
	  }
	}
</style>
