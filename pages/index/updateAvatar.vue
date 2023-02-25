<template>
  <view class="page-bg">
    <view class="main-container">

      <view class="tl-card-1">
        <view class="tl-height-100 border-bottom tl-font-32-333">
          头像(点击头像可编辑)
          <button class="tl-p-r tl-img-60" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
            <image class="tl-img-60" :src="userImg"></image>
          </button>
        </view>
        <view class="tl-line-2"></view>
        <view class="tl-height-100 tl-font-32-333">
          昵称(点击昵称可编辑)
          <input type="nickname" maxlength="16" minlength="2"  :value="nick_name" @input="inputWord"  class="tl-p-r2" placeholder="请输入昵称" />
        </view>
      </view>
      <view class="mt24">
		<view class="action_btn" style="background-color: #00C657;width: 100%;" @tap="updateUser()">保存并返回</view>
	  </view>
    </view>
	
  </view>
</template>

<script>
// import config from "@/common/config.js";
import {throttle} from '@/utils/util.js'
import { mapState, mapActions } from 'vuex';
import {updateUserInfo} from '../../api/api.js'
export default {
  data() {
    return {
      defaultAvatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
      avatarUrl: '',
      nick_name: '',
      userImg: '',
    }
  },

  onLoad() {
    this.userImg = this.userInfo.avatarUrl;
    this.nick_name = this.userInfo.nickName;
  },
  computed: {
    ...mapState('user', ['token', 'userInfo'])
  },
  methods: {
	...mapActions('user', ['login', 'logout']),  
    onChooseAvatar(e) {
      this.avatarUrl = e.detail.avatarUrl
      console.log('e.detail', e.detail);
	  console.log(this.avatarUrl);
     // this.updateUserInfo();
      this.uploadFile();
    },



    inputWord: throttle(function(e){
      this.nick_name = e.detail.value
      console.log('this.nick_name.length',this.nick_name.length)
      // let str = this.nick_name.trim();
      // if(str.length==0){
      //   this.$toast('请输入合法的昵称')
      //   return
      // }
      // if((/[^/a-zA-Z0-9\u4E00-\u9FA5]/g).test(str)){
      //   this.$toast('请输入中英文和数字')
      //   return
      // }
    }, 100),

    /* 上传 头像 转 话格式*/
    uploadFile(){
	  let _that = this;
	  uni.showLoading({
	  	title:'上传头像...'
	  })  
      uni.uploadFile({
        url: 'https://yima.hazer.top/lazyer/uploadAvatar',//后台接口
        filePath: this.avatarUrl,// 上传图片 url
        name:'file',
       // formData: this.formData,
        header: {
          'content-type': 'multipart/form-data',
          'Authorization': this.token
        }, // header 值
        success: res => {
		  uni.hideLoading();	
          let obj = JSON.parse(res.data)
          console.log('obj', obj)
          if (obj.code == 200) {
            this.userImg = obj.data.url;
          } else {
            uni.showToast({
              icon: 'none',
              title: '图片太大，请重新选择！'
            });
          }
        },
        fail: e => {
          uni.showToast({
            icon: 'none',
            title: '上传失败'
          });
        }
      });
    },



    updateUser(){
      let self = this;
	  this.userInfo.avatarUrl = this.userImg;
	  this.userInfo.nickName = this.nick_name.trim();
      uni.showLoading({
		  title: '更新中'
	  });
      let params = {
        avatar: this.userImg,
        nickName: this.nick_name.trim(),
      }
      updateUserInfo(params).then(res => {
        uni.hideLoading()
        if (res.code == 200) {
          console.log("修改成功");
		  uni.navigateBack({
		  	delta: 1
		  })
        }else {
          console.log("修改失败");
        }

      })
    },

  }
}
</script>

<style lang="scss" scoped>
@import "../../static/mixin.scss";
.page-bg {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-size: 750rpx auto;
  background-color: #F9F9F9;
}

.main-container {
  width: 694rpx;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.tl-card-1{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #fff;
  margin-top: 24rpx;
  margin-bottom: 24rpx;
  .tl-height-100{
    position: relative;
    /*width: 686rpx;*/
    padding: 28rpx 24rpx;
  }
  .tl-line-2{
    width: 638rpx;
    height: 2rpx;
    background: #EEEEEE;
    margin: 0 auto;
  }
}
.tl-img-24{
  width: 24rpx;
  height: 24rpx;
}
.tl-img-60{
  width: 68rpx;
  height: 68rpx;
  border-radius: 50%;
}
.tl-p-r{
  position: absolute;
  top: 16rpx;
  right: 26rpx;
}
.tl-p-r2{
  position: absolute;
  top: 28rpx;
  right: 26rpx;
  text-align: right;
}
// 重置按钮的样式
button::after{
  border: none;
}
button{
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0px;
  padding-right: 0px;
  box-sizing: border-box;
  // font-size: 18px;
  text-align: center;
  text-decoration: none;
  // line-height: 1;
  line-height: 0;
  background: none;
  // border-radius: 5px;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
  color: #000000;
  width: 100%;
  height: 100%;
}
.action_btn {
	@include wh(186rpx, 68rpx);
	@include font('white');
	@include flex(row, center, center);
	background: $primary-color;
	box-shadow: 0 14rpx 40rpx 0 $second-color;
	border-radius: 12rpx;
}
</style>