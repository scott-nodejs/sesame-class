(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{3201:function(t,e,n){"use strict";(function(t){n("ab2f");a(n("66fd"));var e=a(n("a0ea"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"4b68":function(t,e,n){"use strict";n.r(e);var a=n("e781"),r=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=r.a},"9f17":function(t,e,n){"use strict";var a=n("de14"),r=n.n(a);r.a},a0ea:function(t,e,n){"use strict";n.r(e);var a=n("b364"),r=n("4b68");for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n("9f17");var s,u=n("f0c5"),i=Object(u["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);e["default"]=i.exports},b364:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement;t._self._c},o=[]},de14:function(t,e,n){},e781:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=s(n("a34a")),r=n("9038"),o=n("26cb");function s(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n,a,r,o,s){try{var u=t[o](s),i=u.value}catch(c){return void n(c)}u.done?e(i):Promise.resolve(i).then(a,r)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function s(t){u(o,a,r,s,i,"next",t)}function i(t){u(o,a,r,s,i,"throw",t)}s(void 0)}))}}function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){f(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var h=function(){n.e("compontents/ClassItem").then(function(){return resolve(n("7487"))}.bind(null,n)).catch(n.oe)},d=function(){n.e("compontents/AuthModel").then(function(){return resolve(n("50a1"))}.bind(null,n)).catch(n.oe)},v=function(){n.e("compontents/Avatar").then(function(){return resolve(n("1e8b"))}.bind(null,n)).catch(n.oe)},p=function(){n.e("compontents/Tag").then(function(){return resolve(n("a8df"))}.bind(null,n)).catch(n.oe)},b={components:{ClassItem:h,AuthModel:d,Avatar:v,Tag:p},data:function(){return{showAuthModel:!1,joinClasses:[],trueLabel:"班长",falseLabel:"组员",avatarUrl:"https://img.hazer.top/classImage/assets/default_avatar.png",nickname:"未授权",radius:64,border:4,navHeight:0,statusBarHeight:0}},onShow:function(){var e=this;t.getSystemInfo({success:function(t){e.statusBarHeight=t.statusBarHeight,"android"==t.platform?e.navHeight=48:e.navHeight=44}}),this.token&&(this.avatarUrl=this.userInfo.avatarUrl,this.nickname=this.userInfo.nickName),this.getData()},computed:l({},(0,o.mapState)("user",["token","userInfo"])),methods:l(l({},(0,o.mapActions)("user",["isLogin","logout"])),{},{getData:function(){var t=this;return i(a.default.mark((function e(){var n,o;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.token){e.next=6;break}return e.next=3,(0,r.getMyClasses)();case 3:n=e.sent,o=n.data,t.joinClasses=o;case 6:case"end":return e.stop()}}),e)})))()},authClick:function(){var e=this;this.token?t.showActionSheet({itemList:["修改头像","退出登录"],success:function(n){switch(console.log(n.tapIndex),n.tapIndex){case 0:t.navigateTo({url:"/pages/index/updateAvatar"});break;case 1:e.logout(),e.teken="",e.token||(e.joinClasses=[],e.avatarUrl="https://img.hazer.top/classImage/assets/default_avatar.png",e.nickname="未授权");break;default:break}}}):this.showAuthModel=!0},loginYes:function(){this.getData(),this.showAuthModel=!1,this.avatarUrl=this.userInfo.avatarUrl,this.nickname=this.userInfo.nickName},closeModal:function(){this.showAuthModel=!1},toCreateClass:function(){this.token?t.navigateTo({url:"/pages/createClass/create-class"}):this.showAuthModel=!0}})};e.default=b}).call(this,n("543d")["default"])}},[["3201","common/runtime","common/vendor"]]]);