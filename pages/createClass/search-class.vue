<template>
	<view class='search-class'>
	      <view class='page_search'>
	        <view class='search_wrap'>
	          <Search :autoFocus="true"  @onSearch="onSearch()" />
	        </view>
			<view v-if="isSearching">
				<view v-if="classInfo.id != 0" class='search_result'>
				  <Text class='title'>为你找到</Text>
				  <ClassItem
				   :className="classInfo.className"
				   :totalNum="classInfo.totalNum"
				   :joinNum="classInfo.joinUsers.length"
				   :coverImage="classInfo.coverImage"
				   :isJoin="true" />  
				</view>
				<view v-else class='empty_container'>
				  <image class='image' src='https://img.hazer.top/classImage/assets/illustration_empty.png' />
				  <view class='empty_hint'>
				    <text>未找到内容，请检查口令是否输入正确</text>
				  </view>
				</view>
			</view>
	      </view>
	    </view>
</template>

<script>
	import Search from '../../compontents/Search.vue'
	import ClassItem from '../../compontents/ClassItem.vue'

	export default {
		components:{
			Search,
			ClassItem
		},
		data() {
			return {
				isSearching: false,
				classInfo:{
					id: 1,
					className: '',
					totalNum: 1,
					joinNum: 1,
					coverImage: '',
					joinUsers: []
				}
			}
		},
		onLoad() {
	
		},
		methods: {
			async onSearch() {
			  console.log('搜索')
			  this.isSearching = true;
			}
		}
	}
</script>

<style lang="scss">
	@import "../../static/mixin.scss";
	
	.page_search {
	  .search_wrap {
	    @include flex(row, center, center);
	    padding-top: 32rpx;
	  }
	
	  .search_result {
	    margin-top: 98rpx;
	    padding: 0px 54rpx;
	
	    .title {
	      @include font('big', bold);
	    }
	  }
	
	  .empty_container {
	    margin-top: 50rpx;
	    @include flex(column, center, center);
	
	    .image {
	      margin-top: 62rpx;
	      @include wh(438rpx, 338rpx);
	    }
	
	    .empty_hint {
	      margin-top: 86rpx;
	      text-align: center;
	      @include font('light', normal, 32rpx);
	    }
	  }
	}
</style>
