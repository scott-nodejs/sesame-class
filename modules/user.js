import { login } from 'api/user';
const STORAGE_KEY = 'sesame-user-info';
const TOKEN_KEY = 'sesame-token';
const NEW_USER_FLAG = 'new_user_flag';
export default {
  namespaced: true,
  state: () => {
    return {
      // 用户 token
      token: uni.getStorageSync(TOKEN_KEY) || '',
      // 用户信息
      userInfo: uni.getStorageSync(STORAGE_KEY) || {},
	  //是否是新用户
	  newUserFlag: uni.getStorageSync(NEW_USER_FLAG) || false
    };
  },
  mutations: {
    /**
     * 保存 token 到 vuex
     */
    setToken(state, token) {
      state.token = token;
      this.commit('user/saveToken');
    },
    /**
     * 保存 token 到 本地存储
     */
    saveToken(state) {
      uni.setStorage({
        key: TOKEN_KEY,
        data: state.token
      });
    },
    /**
     * 删除 token
     */
    removeToken(state) {
        state.token = '';
        this.commit('user/saveToken');
    },
    /**
     * 保存 用户信息 到 vuex
     */
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      this.commit('user/saveUserInfo');
    },
    /**
     * 保存 用户信息 到 本地存储
     */
    saveUserInfo(state) {
      uni.setStorage({
        key: STORAGE_KEY,
        data: state.userInfo
      });
    },
    /**
     * 删除用户信息
     */
    removeUserInfo(state) {
        state.userInfo = {};
        this.commit('user/saveUserInfo');
    },
	/**
	 * @param {Object} state
	 * @param {Object} newUserFlag 新用户标识
	 */
	setNewUserFlag(state, newUserFlag) {
	  state.newUserFlag = newUserFlag;
	  this.commit('user/saveNewUserFlag');
	},
	/**
	 * @param {Object} 设置新用户标识
	 */
	saveNewUserFlag(state) {
	  uni.setStorage({
	    key: NEW_USER_FLAG,
	    data: state.newUserFlag
	  });
	},
  },
  actions: {
    /**
     * 完成登录
     */
    async login(context, userProfile) {
      console.log(userProfile);
      // 用户数据
      const rawData = userProfile.userInfo;
	  rawData.avatarUrl = 'https://thirdwx.qlogo.cn/mmopen/vi_32/ctI2ictkuicWm7XclWR02nZFGf1C9hRpfG5WKCZic63NtVdlylibSKQ60v6ialibMswZLURthhKtuKLk7ib3nwLUa88Jg/132';
      rawData.nickName = 'fly-' + Math.random().toString(36).substr(2)
	  // 调用登录接口
      const data = await login({
        signature: userProfile.signature,
        iv: userProfile.iv,
		encryptedData: userProfile.encryptedData,
        nickName: rawData.nickName,
        gender: rawData.gender,
        city: rawData.city,
		code: rawData.code,
        province: rawData.province,
        avatarUrl: rawData.avatarUrl,
		type: 1,
		source: userProfile.source
      });
      // TODO: 登录逻辑
	  userProfile.userInfo.avatarUrl = data.data.avatar;
	  userProfile.userInfo.nickName = data.data.nickName;
      this.commit('user/setToken', data.data.token);
	  this.commit('user/setUserInfo', userProfile.userInfo);
	  this.commit('user/setNewUserFlag', data.data.newUserFlag);
      //this.commit('user/setUserInfo', JSON.parse(userProfile.rawData));
    },
    /**
     * 退出登录
     */
    logout(context) {
        this.commit('user/removeToken');
        this.commit('user/removeUserInfo');
    },
    /**
     * 进行登录判定
     */
     async isLogin(context) {
      if (context.state.token) return true;
      // 如果用户未登录，则引导用户进入登录页面
      const [error, res] = await uni.showModal({
        title: '登录之后才可以进行后续操作',
        content: '立即跳转到登录页面？（登录后回自动返回当前页面哦~~~）'
      });
      const { cancel, confirm } = res;
      if (confirm) { 
        uni.navigateTo({
          url: '/subpkg/pages/login/my'
        });
      }
      return false;
    },
	
	isClientLogin(context){
		if (context.state.token) return true;
		return false;
	}
  }
};
