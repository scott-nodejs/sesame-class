<template>
  <my-login @onLoginSuccess="onLoginSuccess" />
</template>

<script>
import myLogin from '../../../compontents/my-login/my-login.vue'
export default {
  components:{
	  myLogin
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 登录成功的事件回调
     */
    onLoginSuccess() {
      console.log('onLoginSuccess');
      uni.navigateBack({ delta: 1 });
    }
  }
};
</script>

<style lang="scss"></style>
