(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/task/exam"],{"1a80":function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return n}));var n={dialogBirthday:function(){return i.e("compontents/dialog/birthday").then(i.bind(null,"3f96"))}},a=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.showResult=!1})},s=[]},4084:function(e,t,i){"use strict";i.r(t);var n=i("8323"),a=i.n(n);for(var s in n)"default"!==s&&function(e){i.d(t,e,(function(){return n[e]}))}(s);t["default"]=a.a},"5c04":function(e,t,i){"use strict";var n=i("92bb"),a=i.n(n);a.a},"75d7":function(e,t,i){"use strict";i.r(t);var n=i("1a80"),a=i("4084");for(var s in a)"default"!==s&&function(e){i.d(t,e,(function(){return a[e]}))}(s);i("5c04");var r,c=i("f0c5"),d=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);t["default"]=d.exports},8323:function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i("1828"),a={data:function(){return{parseShow:!1,taskId:0,showResult:!1,examvisible:!1,analysis:"",analysislist:[],headline:{headline:"2010新人入职培训结业考试",gobackurl:"",tabbar:!1,stop:!0},submitconfig:{submitmodal:!1,title:"温馨提示",content:"您确定要提交吗？",backgroundColor:"#ffffff",radius:"10rpx",submitbtncancel:"取消",submitbtnaffirm:"确认"},currentindexpage:0,currentindex:0,coundown_end:!1,answerlist:[],currlist:[],residuetime:0,endtimeconfig:{time:40,borderColor:"#FFFFFF",size:24,color:"#1D9BF2",colonColor:"#1D9BF2"},examdata:{examtype:"0",examlength:6,examtime:40,creditnum:2,anewnum:1,examtitle:"新人入职培训结业考试",examlist:[]}}},onLoad:function(e){this.taskId=e.id,this.getExams(e.id)},onUnload:function(){e.$off("btncancel"),e.$off("btnaffirm"),e.$off("btngot")},components:{},methods:{getExams:function(t){var i=this;e.showLoading({title:"加载中",mask:!1}),(0,n.taskDesc)({id:t}).then((function(t){e.hideLoading(),200==t.code&&(i.examdata.examlist=t.data.examVos,i.currentindexpage=t.data.currentIndex,i.currentindex=t.data.currentIndex)}))},examsubmit:function(){console.log("提交")},change:function(e){var t=e.detail.current;console.log(t),this.currentindex=t,this.currentindexpage=t},changChecked:function(e,t){if(console.log(e,t),console.log(this.currentindex),0==t){if(this.examdata.examlist[this.currentindex].items[e].checked)return this.examdata.examlist[this.currentindex].items[e].checked=!1,void(this.answerlist[this.currentindexpage]=void 0);this.examdata.examlist[this.currentindex].anwser==e+1&&(this.examdata.examlist[this.currentindex].anwserFlag=!0),this.examdata.examlist[this.currentindex].items.forEach((function(e,t){e.checked=!1})),this.examdata.examlist[this.currentindex].anwsered=!0,this.examdata.examlist[this.currentindex].items[e].checked=!this.examdata.examlist[this.currentindex].items[e].checked,this.answerlist[this.currentindexpage]={index:this.currentindexpage,answer:e},(0,n.taskReport)({temId:this.examdata.examlist[this.currentindex].temId,grammarId:this.examdata.examlist[this.currentindex].grammarId,correctTag:this.examdata.examlist[this.currentindex].anwser==e+1?0:1,result:e+1,taskId:this.taskId}),this.currentindex+1==this.examdata.examlist.length&&(this.showResult=!0)}else if(1==t){this.examdata.examlist[this.currentindex].optionlist[e].checked=!this.examdata.examlist[this.currentindex].optionlist[e].checked;var i=[];this.examdata.examlist[this.currentindex].optionlist.forEach((function(e,t){e.checked&&i.push(t)})),0==i.length?this.answerlist[this.currentindexpage]=void 0:this.answerlist[this.currentindexpage]={index:this.currentindexpage,answer:i}}},valuecontent:function(){0!=this.examdata.examlist[this.currentindex].answer.trim().length?this.answerlist[this.currentindexpage]={index:this.currentindexpage,answer:this.examdata.examlist[this.currentindex].answer}:this.answerlist[this.currentindexpage]=void 0},pageswitch:function(t){if(t){if(!this.examdata.examlist[this.currentindex].anwsered)return void e.showToast({title:"请先答题",icon:"none"});var i=this.analysis?this.analysislist.length:this.examdata.examlist.length;this.currentindexpage<i-1&&(this.currentindexpage=this.currentindexpage+1)}else this.currentindexpage>0&&(this.currentindexpage=this.currentindexpage-1)},endtime:function(){console.log("结束"),this.coundown_end=!0,this.endtimeconfig.color="#FF4545",this.endtimeconfig.colonColor="#FF4545",this.submitanswer(),this.submitconfig={submitmodal:!0,title:"温馨提示",content:"考试时间到，系统已自动交卷",backgroundColor:"#ffffff",radius:"10rpx",submitbtngot:"我知道了",type:2}},time:function(e){this.residuetime=this.examdata.examtime-e.seconds},submitanswer:function(){console.log("提交试卷答案"),console.log(this.currlist)},gotoexamresult:function(){var t={title:this.examdata.examtitle,submittime:(new Date).getTime(),resultnum:90,subjective:3,objective:3,residuetime:this.residuetime,accuracy:90,jige:60,msg:"待测评"};t=JSON.stringify(t),e.redirectTo({url:"/pages/examresult/examresult?result=".concat(t)})},card_off:function(){this.examvisible=!this.examvisible},selectexam:function(e){this.examvisible=!1,this.currentindexpage=e}}};t.default=a}).call(this,i("543d")["default"])},"92bb":function(e,t,i){},b448:function(e,t,i){"use strict";(function(e){i("8b19");n(i("66fd"));var t=n(i("75d7"));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=i,e(t.default)}).call(this,i("543d")["createPage"])}},[["b448","common/runtime","common/vendor"]]]);