<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
		    <view class="uni-title uni-common-mt"></view>
			<view>
				<radio-group @change="radioChange">
					<label class="radio"><radio value="all"  />全选</label>
					<label class="radio"><radio value="notAll" checked="true" />全校权限</label>
				</radio-group>
			</view>
		</view>
		
		<view class="uni-padding-wrap">
			<view class="uni-title uni-common-mt">
				指定对象
			</view>
		</view>			
		<view class="uni-list">
			<checkbox-group @change="checkboxChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.id">
					<view>
						<checkbox :value="item.id" :checked="item.checked" />
					</view>
					<view style="margin-left: 10px;">
						<Avatar :img="item.avatar" :radius="80" :border="0" />
					</view>
					
					<view style="margin-left: 10px;">{{item.tagName}}</view>
				</label>
			</checkbox-group>
		</view>
		<view class='action_btn_container'>
		  <Button hoverClass='btn_hover'
		    class='action_btn'
		    @click="choseUser">
		    选好了
		  </Button>
		</view>
	</view>
</template>

<script>
	import {getAllUsers} from '../../api/api.js'
	import Avatar from '../../compontents/Avatar.vue'
	export default {
		components:{
			Avatar
		},
		data() {
			return {
				title: 'checkbox 复选框',
				items: [],
				classId: 0
			}
		},
		onLoad(options) {
			this.classId = options.classId
			this.getUsers();
		},
		methods: {
			async getUsers(){
				let {data} = await getAllUsers({id: this.classId});
				this.items = data
			},
			checkboxChange: function (e) {
				
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.includes(item.id+'')){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
			},
			radioChange(e){
				console.log(e.detail)
				var value = e.detail.value;
				var items = this.items;
				if(value == 'all'){
					for (var i = 0, lenI = items.length; i < lenI; ++i) {
						const item = items[i]
						this.$set(item,'checked',true)
					}
				}
				if(value == 'notAll'){
					for (var i = 0, lenI = items.length; i < lenI; ++i) {
						const item = items[i]
						this.$set(item,'checked',false)
					}
				}
			},
			choseUser(){
				var users = this.items.filter(item=>item.checked).map(item=>item.tagName).join()
				var ids = this.items.filter(item=>item.checked).map(item=>item.uid).join()
				uni.$emit("update", users)
				uni.$emit("updateIds", ids)
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>
<style lang="scss">
@import '../../static/mixin.scss';

label {
	padding-right: 10px;
}
.uni-padding-wrap {
    padding: 0 15px;
}
.action_btn_container {
	  @include wh(100%, 150rpx);
	  @include flex(row, center, center);
	  position: fixed;
	  left: 0;
	  bottom: 0;
	  background-color: #fff;
		
	  .action_btn {
	    @include wh(686rpx, 88rpx);
	    @include font('white');
	    @include flex(row, center, center);
	    background: $primary-color;
	    box-shadow: 0 14rpx 40rpx 0 $second-color;
	    border-radius: 12rpx;
	  }
}
.uni-common-mt {
    margin-top: 15px;
}
.uni-title {
    font-size: 20px;
    font-weight: 500;
    padding: 10px 0;
    line-height: 1.5;
}
.uni-list {
	background-color: #fff;
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
}

.uni-list-cell-pd {
    padding: 15px 20px;
}
.uni-list-cell {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.uni-label-pointer {
    cursor: pointer;
}

.uni-list-cell::after {
    position: absolute;
    z-index: 3;
    right: 0;
    bottom: 0;
    left: 15px;
    height: 1px;
    content: "";
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
}
</style>

