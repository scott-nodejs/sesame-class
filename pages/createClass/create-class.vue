<template>
	<view class='create_page'>

	      <image class='image' src='https://img.hazer.top/classImage/assets/illustration_create_class_form.png' />
	      <form @submit="onSubmit" class='form_container'>
	        <view class='form_item'>
	          <view class='form_label'>创建人</view>
	          <input 
	            name='creator'
	            class='form_input'
	            placeholder='您的姓名或昵称'
	            placeholderClass='placeholder'
	             />
	        </view>
	        <view class='form_item' >
	          <view class='form_label'>创建口令</view>
	          <input 
	            name='token'
	            class='form_input'
	            placeholder='至少6位字母和数字'
	            placeholderClass='placeholder'
	         />
	        </view>
	        <view class='form_item'>
	          <view class='form_label'>班级名称</view>
	          <input cursor-spacing={5}
	            name='className'
	            class='form_input'
	            placeholder='请输入班级名称'
	            placeholderClass='placeholder'
	         />
	        </view>
	        <view class='form_item'>
	          <view class='form_label'>班级人数</view>
	          <input cursor-spacing={5}
	            name='totalCount'
	            type='number'
	            class='form_input'
	            placeholderClass='placeholder'
				placeholder='班级人数需≤10'
	            />
	        </view>
	        <view class='form_item' @click="chooseImage">
	          <view class='form_label'>班级照片</view>
			  <image v-if="imagePath.length !== 0" mode='aspectFill' class='selected_image' :src="imagePath" />
			  <view v-else class='placeholder'>选择一张班级合照</view>
	          <image class='select_arrow' src='https://img.hazer.top/classImage/assets/icon_select_arrow.png' />
	        </view>
	        <view class='form_item'>
	          <view class='form_label'>允许被搜索</view>
	          <!-- <AtSwitch checked={searchConfirm} border={false} onChange={onSearchConfirm} color={PRIMARY_COLOR} /> -->
			  <switch checked="true" @change="onChange"></switch>
	        </view>
			<button formType='submit' class='form_btn' hoverClass='form_btn_hover'>创建班级</button>
	      </form>
	      <view class='notice'>
	        * 创建前请先阅读
			<navigator url="./create-attention">
				<text
				  class='attention_txt'>
				  《班级信息规范》
				</text>
			</navigator>
	      </view>
	</view>
</template>

<script>
	import {
	  EMPTY_CREATOR,
	  EMPTY_CLASSNAME,
	  ILLEGAL_TOKEN,
	  EMPTY_IMAGE,
	  OCCUPY_TOKEN,
	  CHECK_TOKEN_LOADING,
	  EMPTY_NAME,
	  ILLEGAL_PHONE,
	  EMPTY_PLAGE,
	  EMPTY_ADDRESS,
	  WRONG_TOKEN
	} from '../../utils/constant.js'
	import {uploadImage, createClass} from '../../api/api.js'
	import {mapState,mapActions} from "vuex";
	export default {
		data() {
			return {
				isSearching: false,
				imagePath: '',
				countLimit: 100,
				canSearch: true
			}
		},
		onLoad() {
	
		},
		computed:{
			...mapState('user', ['token', 'userInfo']),
		},
		methods: {
			...mapActions('user', ['isLogin']),
			onChange(e){
				const v = e.detail.value
				this.canSearch = v;
			},
			async onSubmit(e){
			  if (!(await this.isLogin())) {
				  return;
			  }
			  const formData = e.detail.value
			  const imagePath = this.imagePath;
			  const countLimit = this.countLimit;
			  const canSearch = this.canSearch;
			  console.log(formData);
			  if(this.checkAddForm({...formData, imagePath, countLimit})){
				  createClass({...formData, imagePath, canSearch}).then(res=>{
					  if(res.code == 200){
						  this.showToast("创建成功")
						  uni.navigateTo({
						  	url: '/pages/createClass/create-success?token='+formData.token+'&creatorName='+formData.creator+'&className='+formData.className+"&classId="+res.data
						  })
					  }else{
						  this.showToast("创建失败")
					  }
				  });
			  }
			  //let {data} = await create(formData);
			},
			chooseImage(){
				const _this = this;
                uni.chooseImage({
				   count: 1,
				     sizeType: ['original', 'compressed'],
				     sourceType: ['album', 'camera'],
				     success: res => {
				   	   _this.uploadFile(res.tempFilePaths[0])
				     },
				     fail: () => {
				       console.log("上传失败")
				     }
				})   
			},
			uploadFile(path){
			  let _that = this;
			  uni.showLoading({
			  	title:'上传头像...'
			  })  
			  uni.uploadFile({
			    url: 'https://yima.hazer.top/lazyer/class/upload/image',//后台接口
			    filePath: path,// 上传图片 url
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
			        this.imagePath = obj.data.url;
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
			checkAddForm(data) {
			  const { creator, className, totalCount, token, imagePath, countLimit } = data;
			  
			  if (this.checkFormEmpty(creator)) {
			    this.showToast(EMPTY_CREATOR)
			    return false
			  } else if (!this.checkToken(token)) {
			    this.showToast(ILLEGAL_TOKEN)
			    return false
			  } else if (this.checkFormEmpty(className)) {
			    this.showToast(EMPTY_CLASSNAME)
			    return false
			  } else if (this.checkCount(totalCount, countLimit)) {
			    this.showToast('班级人数需≤' + countLimit+'，升级高级用户可以设置更多人数')
			    return false
			  } 
			  else if (this.checkFormEmpty(imagePath)) {
				this.showToast(EMPTY_IMAGE)
			    return false
			  }
			  uni.showLoading({title: CHECK_TOKEN_LOADING})
			  // 先校验口令是否唯一
			  // const res = await Taro.cloud.callFunction({
			  //   name: 'class',
			  //   data: {
			  //     $url: 'checkToken',
			  //     token: token
			  //   }
			  // })
			  // console.log(res);
			  
			  uni.hideLoading()
			  // if (res.result && res.result['data']['data'].length !== 0) {
			  //   showToast(OCCUPY_TOKEN)
			  //   return false
			  // }
			  return true
			
			},
			showToast(data){
				uni.showToast({
					title: data,
					icon:'none'
				});
			},
			checkFormEmpty(formItem) {
			  return formItem.length === 0
			},
			
			checkToken(token) {
			  return /^(?=.*\d)(?=.*[a-zA-z]).{6,}$/.test(token)
			},
			
			checkPhone(phone) {
			  return /^[1]([3-9])[0-9]{9}$/.test(phone)
			},
			
			checkCount(count, countLimit){
			  const num = Number(count)
			  return num > countLimit || num <= 0
			},
			
			checkMinCount(count, minLimit) {
			  const num = Number(count)
			  return num < minLimit
			}
		}
	}
</script>

<style lang="scss">
	@import "../../static/mixin.scss";
	@import "../../static/form.scss";
	
	
	.create_page {
	  padding: 20rpx 0rpx;
	  @include flex(column, start, center);
	  .press-canvas {
	    position: absolute;
	    top: -1000rpx;
	    background-color: gray;
	  }
	  
	  .image {
	    @include wh(352rpx, 236rpx);
	    margin-bottom: 50rpx;
	  }
	
	  .selected_image {
	    @include wh(80rpx, 80rpx);
	    border-radius: 12rpx;
	    @include shadow();
	  }
	
	  .notice {
	    @include font('light', normal, 32rpx)
	  }
	  .attention_txt {
	    color: $primary-color;
	  }
	
	}
</style>
