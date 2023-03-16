<template>
    <view>
		<view class="top-bar">
		  <text @tap="tapRanking" data-index="3" :class="activeIndex==='3'?'top-bar-active':''">已完成</text>
		  <text @tap="tapRanking" data-index="2" :class="activeIndex==='2'?'top-bar-active':''">进行中</text>
		  <text @tap="tapRanking" data-index="1" :class="activeIndex==='1'?'top-bar-active':''">未开始</text>
		</view>
		
		<scroll-view scroll-y="true" v-if="rankingList.length!==0" style="height: listHeight;" class="list animated fadeIn faster">
		  <block v-for="(user, index) in rankingList" :key="index">
		    <view class="item animated fadeIn faster">
			  <view class="ranking-num">
			    <text class="ranking-num-text">{{index+1}}</text>	
			  </view>
		      <image class="avartar" :src="user.avatar" />
		      <text class="nickname">{{user.name}}</text>
		      <view class="grade">
		        <image class="grade-img" src="/static/pk-images/ranking-grade.png" />
		        <text class="grade-text">{{user.num}}</text>
		      </view>
		    </view>
		  </block>
		  <view style="height: 108rpx;width: 100%;"></view>
		</scroll-view>
		<view v-else class="flex justify-center" style="margin-top: 260rpx;">
			<image
				src="../../static/not.png"
				mode=""
				class=""
				style="width: 100px;height: 80px;"
			></image>
		</view>
	</view>
</template>

<script>
	import { taskList } from '../../api/api.js';
	export default {
		data() {
		    return {
				taskId: 0,
                rankingList: [],
				activeIndex: '3',
				listHeight: 0
			}
		},
		onLoad(options) {
			this.taskId = options.id;
			this.slist(3);
		},
		created() {
			
		},
		methods:{
           async slist(status){
			   let {data} = await taskList({id: this.taskId, status: status})
			   this.rankingList = data;
		   },
		   tapRanking(e){
			   console.log(e);
			   const { currentTarget: { dataset: { index } } } = e
			   if (this.activeIndex !== index) {
			     this.activeIndex = index;
			     if (index === '3') {
			       this.slist(3)
			     } else if (index === '2') {
			       this.slist(2)
			     } else if (index === '1') {
			       this.slist(1)
			     }
			   }  
		   }
		   
		}
	};
</script>

<style lang="scss">
	page {
	  background-color: #F8F8F8;
	  position: relative;
	  height: 100vh;
	}
	.flex {
		display: flex;
	}
	.justify-center {
		justify-content: center;
	}
	
	.header {
	  background-color: #A6DFFC;
	  overflow: hidden;
	  height: 100%;
	  position: relative;
	  width: 750rpx;
	  box-sizing: border-box;
	  display: flex;
	  align-items: center;
	}
	
	.back {
	  width: 48rpx;
	  height: 48rpx;
	  position: absolute;
	  top: 0;
	  left: 40rpx;
	  bottom: 0;
	  margin:auto;
	}
	
	.title {
	  color: #ffffff;
	  display: block;
	  text-align: center;
	  width: 100%;
	  font-size: 32rpx;
	  font-weight: 600;
	}
	
	.top-bar {
	  width:721rpx;
	  height:44px;
	  background:rgba(255,255,255,1);
	  border-radius: 22px;
	  margin: 4px auto;
	  position: relative;
	  display: flex;
	  align-items: center;
	  justify-content: space-around;
	}
	
	.top-bar-active {
	  font-weight:700;
	  color:rgba(126,206,247,1)!important;
	}
	
	.top-bar text {
	  font-size: 28rpx;
	  color:rgba(153,153,153,1);
	  display: inline-block;
	  width: 200rpx;
	  text-align: center;
	}
	
	.top-bar::before{
	  position: absolute;
	  display: block;
	  width: 1px;
	  height: 22px;
	  background:rgba(238,238,238,1);
	  content: ' ';
	  top: 10px;
	  left: 33.3%;
	  transform: translateX(-0.5px);
	}
	
	.top-bar::after{
	  position: absolute;
	  display: block;
	  width: 1px;
	  height: 22px;
	  background:rgba(238,238,238,1);
	  content: ' ';
	  top: 10px;
	  right: 33.3%;
	  transform: translateX(0.5px);
	}
	
	.list {
	  background-color: #ffffff;
	  width: 721rpx;
	  box-sizing: border-box;
	  margin: 10px auto 0 auto;
	  border-radius: 10px;
	}
	
	.item {
	  display: flex;
	  align-items: center;
	  height: 148rpx;
	  width: 721rpx;
	}
	
	.ranking-num {
	  width: 87rpx;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
	
	.ranking-num-img {
	  width: 33rpx;
	  height: 40rpx;
	}
	
	.ranking-num-text {
	  font-size: 33rpx;
	  font-weight: 400;
	  color:rgba(204,204,204,1);
	}
	
	.avartar {
	  width: 60rpx;
	  height: 60rpx;
	  margin-left: 10rpx;
	  border-radius: 30rpx;
	}
	
	.nickname, .footer-nickname {
	  font-size: 32rpx;
	  font-weight:400;
	  color:rgba(51,51,51,1);
	  width: 370rpx;
	  margin-left: 32rpx;
	  overflow: hidden;
	  text-overflow:ellipsis;
	  white-space: nowrap;
	}
	
	.grade {
	  display: flex;
	  align-items: center;
	  margin-left: 10rpx;
	}
	
	.grade-img {
	  width: 33rpx;
	  height: 31rpx;
	}
	
	.grade-text {
	  font-size:33rpx;
	  font-weight:600;
	  color:rgba(254,231,1,1);
	  margin-left: 20rpx;
	}
	
	.footer {
	  position: absolute;
	  bottom: 0;
	  height: 108rpx;
	  background: #ffffff;
	  display: flex;
	  width: 100%;
	  align-items: center;
	  box-sizing: border-box;
	  padding: 0 80rpx;
	  justify-content: space-around;
	}
	
	.footer-ranking {
	  color: rgba(204,204,204,1);
	  font-size: 34rpx;
	  font-weight: 700;
	}
	
	.footer-avartar {
	  width: 60rpx;
	  height: 60rpx;
	  border-radius: 30rpx;
	}
	
	.footer-nickname {
	  color:#ffffff;
	  width: 260rpx;
	  margin-left: 0;
	}
</style>
