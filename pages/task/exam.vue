<template>
	<view class="examdetail">
		<view class="examtypes">
			<swiper class="examtypes-swiper" :current="currentindexpage" @change="change">
				<template v-for="(itemcard,indexcard) in examdata.examlist">
					<swiper-item>
						<view class="swiper-item">
							<!-- <listscroll> -->
								<view class="exam-type">
									{{itemcard.tag}}
								</view>
								<view class="exam-content">
									{{itemcard.examItem}}
								</view>
								<view class="exam-optionlist">
									<!-- 考试解析选择 -->
									<view v-show="analysis" :class="{ examactive: analysislist[indexcard].answer == index }" v-for="(city, index) in itemcard.optionlist"
									 class="exam-option_item">
										<view class="exam-option_item_option">
											{{index == 0?'A':''}}
											{{index == 1?'B':''}}
											{{index == 2?'C':''}}
											{{index == 3?'D':''}}
										</view>
										<view class="exam-option_item_text">
											{{city.name}}
										</view>
									</view>
									<!-- 正常考试 -->
									<view v-show="!analysis" @click="changChecked(index,itemcard.type)" :class="{ examactive: city.checked }"
									 v-for="(city, index) in itemcard.items" class="exam-option_item">
										<view class="exam-option_item_option">
											{{index == 0?'A':''}}
											{{index == 1?'B':''}}
											{{index == 2?'C':''}}
											{{index == 3?'D':''}}
										</view>
										<view class="exam-option_item_text">
											{{city.item}}
										</view>
									</view>
								</view>
								<!-- 考试解析 -->
								<view v-if="examdata.examlist[currentindex].anwsered" class="examdetail-analysis">
									<view class="examdetail-analysis_title" :class="{exammistake:!examdata.examlist[currentindex].anwserFlag}">
										<text class="title">参考答案：</text><text class="text answer">{{examdata.examlist[currentindex].anwserDesc}}</text>
									</view>
									<view class="examdetail-analysis_content">
										<view class="examdetail-analysis_content_op">
											<text class="title">解析：</text><text class="text">{{examdata.examlist[currentindex].parseText}}</text>
										</view>
									</view>
								</view>
							<!-- </listscroll> -->
						</view>
					</swiper-item>
				</template>
			</swiper>

		</view>
		<!-- 倒计时 -->
		<view class="exam-countdown">
			<view class="exam-coundown_page">
				<view @click="pageswitch(0)" class="exam-page_btn">
					上一题
				</view>
				<view v-if="!analysis" class="exam-page_length" @click="card_off">
					题卡（{{currentindexpage + 1}}/{{examdata.examlist.length}}）
				</view>
				<view v-else class="exam-page_length" @click="card_off">
					题卡（{{currentindexpage + 1}}/{{analysislist.length}}）
				</view>
				<view @click="pageswitch(1)" class="exam-page_btn">
					下一题
				</view>
			</view>
		</view>
		<dialog-birthday :showOnly="false" :taskId="taskId" v-if="showResult" @closed="showResult = false"></dialog-birthday>
	</view>
</template>

<script>
	import { taskDesc, taskReport } from '../../api/api.js';
	export default {
		data() {
			return {
				taskId: 0,
				showResult: false,
				examvisible: false, // 答题卡显示隐藏
				analysis: '', // 是否是答题解析
				analysislist: [], // 答题解析答案
				headline: {
					headline: '2010新人入职培训结业考试',
					gobackurl: '', // 返回页面
					tabbar: false, // 是否是tab页
					stop: true //是否阻止返回
				}, // 标题
				submitconfig: {
					"submitmodal": false,
					"title": "温馨提示",
					"content": "您确定要提交吗？",
					"backgroundColor": "#ffffff",
					"radius": "10rpx",
					"submitbtncancel": "取消",
					"submitbtnaffirm": "确认"
				}, // 弹框配置
				currentindexpage: 0, // 手动滑屏下标
				currentindex: 0, // 手动切换题目下标
				coundown_end: false, // 倒计时结束class控制
				answerlist: [], // 记录答案
				currlist: [], // 最终答案
				residuetime: 0, // 考试剩余时间
				endtimeconfig: {
					"time": 40,
					"borderColor": "#FFFFFF",
					"size": 24,
					"color": "#1D9BF2",
					"colonColor": "#1D9BF2"
				}, // 配置倒计时
				examdata: {
					"examtype": "0", // 考试类型
					"examlength": 6, // 考试题数
					"examtime": 40, // 考试时间
					"creditnum": 2, // 学分
					"anewnum": 1, // 重考次数
					"examtitle": "新人入职培训结业考试", // 考试标题
					"examlist": []
				}, // 考试数据
			};
		},
		onLoad(detail) {
			this.taskId = detail.id
			this.getExams(detail.id)
		},
		// 监听页面卸载
		onUnload() {
			uni.$off("btncancel")
			uni.$off("btnaffirm")
			uni.$off("btngot")
		},
		components: {

		},
		methods: {
			async getExams(id){
				let {data} = await taskDesc({id: id});
				this.examdata.examlist = data.examVos;
			},
			// 提交按钮点击弹出选择框
			examsubmit() {
				console.log("提交")
			},
			// 卡片滑动
			change(e) {
				const {
					current
				} = e.detail
				console.log(current)
				this.currentindex = current
				this.currentindexpage = current
			},
			// 单选
			changChecked(index, type) {
				console.log(index, type);
				console.log(this.currentindex);
				if (type == 0) {
					if (this.examdata.examlist[this.currentindex].items[index].checked) {
						this.examdata.examlist[this.currentindex].items[index].checked = false;
						this.answerlist[this.currentindexpage] = undefined
						return
					}
					if(this.examdata.examlist[this.currentindex].anwser == (index+1)){
						this.examdata.examlist[this.currentindex].anwserFlag = true;
					}
					this.examdata.examlist[this.currentindex].items.forEach((item, index) => {
						item.checked = false;
					})
					this.examdata.examlist[this.currentindex].anwsered = true;
					this.examdata.examlist[this.currentindex].items[index].checked = !this.examdata.examlist[this
						.currentindex].items[index].checked;
					this.answerlist[this.currentindexpage] = ({
						"index": this.currentindexpage,
						"answer": index
					})
					taskReport({
						temId : this.examdata.examlist[this.currentindex].temId,
						grammarId : this.examdata.examlist[this.currentindex].grammarId,
						correctTag : this.examdata.examlist[this.currentindex].anwser == (index+1) ? 0 : 1,
						result : index + 1,
						taskId: this.taskId
					})
					if((this.currentindex + 1) == this.examdata.examlist.length){
						this.showResult = true;
					}
				} else if (type == 1) {
					this.examdata.examlist[this.currentindex].optionlist[index].checked = !this.examdata.examlist[this
						.currentindex].optionlist[index].checked
					let indexarr = []
					this.examdata.examlist[this.currentindex].optionlist.forEach((item, index) => {
						if (item.checked) {
							indexarr.push(index)
						}
					})
					// console.log(indexarr);
					if (indexarr.length == 0) {
						this.answerlist[this.currentindexpage] = undefined
					} else {
						this.answerlist[this.currentindexpage] = ({
							"index": this.currentindexpage,
							"answer": indexarr
						})
					}

				}
				// console.log(this.answerlist);
			},
			// textarea输入
			valuecontent() {
				if (this.examdata.examlist[this.currentindex].answer.trim().length == 0) {
					this.answerlist[this.currentindexpage] = undefined
					return;
				} else {
					this.answerlist[this.currentindexpage] = ({
						"index": this.currentindexpage,
						"answer": this.examdata.examlist[this.currentindex].answer
					})
				}
			},
			// 题卡切换
			pageswitch(index) {
				// console.log(this.currentindexpage);
				if (index) {
					let curlength = this.analysis ? this.analysislist.length : this.examdata.examlist.length
					if (this.currentindexpage < curlength - 1) {
						this.currentindexpage = this.currentindexpage + 1
					}
				} else {
					if (this.currentindexpage > 0) {
						this.currentindexpage = this.currentindexpage - 1
					}
				}
			},
			// 倒计时结束
			endtime() {
				console.log("结束");
				this.coundown_end = true
				this.endtimeconfig.color = "#FF4545"
				this.endtimeconfig.colonColor = "#FF4545"
				// 提交答案
				this.submitanswer()
				// 通知用户
				this.submitconfig = {
					"submitmodal": true,
					"title": "温馨提示",
					"content": "考试时间到，系统已自动交卷",
					"backgroundColor": "#ffffff",
					"radius": "10rpx",
					"submitbtngot": "我知道了",
					"type": 2
				}
			},
			// 倒计时剩余时间
			time(time) {
				// console.log(time.seconds)
				this.residuetime = this.examdata.examtime - time.seconds
			},
			// 提交试卷答案
			submitanswer() {
				console.log("提交试卷答案")
				console.log(this.currlist)
			},
			// 跳转到考试结果
			gotoexamresult() {
				let result = {
					"title": this.examdata.examtitle,
					"submittime": new Date().getTime(),
					"resultnum": 90,
					"subjective": 3,
					"objective": 3,
					"residuetime": this.residuetime,
					"accuracy": 90,
					"jige": 60,
					"msg": "待测评"
				};
				result = JSON.stringify(result)
				uni.redirectTo({
					url: `/pages/examresult/examresult?result=${result}`
				});
			},
			// 关闭题卡
			card_off() {
				this.examvisible = !this.examvisible
			},
			// 选题卡选题
			selectexam(index) {
				this.examvisible = false;
				this.currentindexpage = index
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.examdetail {
		width: 100%;
		height: 100%;

		.exam-submit {
			width: 70rpx;
			height: 70rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: $mk-base-color;
			margin: 0;
			padding: 0;
			background-color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 28rpx;
		}

		.examtypes {
			width: 100%;
			height: 80%;

			.examtypes-swiper {
				height: 100%;
				width: 100%;

				.swiper-item {
					width: 92%;
					padding: 0 30rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #909090;
					height: 100%;

					.exam-type {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #909090;
						padding-top: 44rpx;
					}

					.exam-content {
						width: 100%;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202020;
						line-height: 44rpx;
						margin-top: 40rpx;
					}

					.exam-optionlist {
						padding-top: 44rpx;
						display: flex;
						flex-direction: column;
						padding-bottom: 15rpx;

						.exam-option_item {
							margin-bottom: 24rpx;
							width: 100%;
							min-height: 98rpx;
							background: #F6F6F6;
							border-radius: 10rpx;
							display: flex;
							justify-content: flex-start;
							align-items: center;
							box-sizing: border-box;
							border: 2rpx solid #FFFFFF;

							.exam-option_item_option {
								width: 48rpx;
								height: 48rpx;
								background: #F6F6F6;
								border: 2rpx solid #B2B2B2;
								border-radius: 50%;
								display: flex;
								justify-content: center;
								align-items: center;
								margin-left: 30rpx;

							}

							.exam-option_item_text {
								margin-left: 44rpx;
								width: 535rpx;
								padding: 30rpx 0;
							}
						}

						.examactive {
							background: #F6F6F6;
							border: 2rpx solid $mk-base-color;

							.exam-option_item_option {
								background-color: $mk-base-color;
								color: #FFFFFF;
								border: 2rpx solid $mk-base-color;
							}
						}
					}

					.exam-input {
						width: 100%;
						// height: 800rpx;
						background: #F6F6F6;
						box-sizing: border-box;
						border-radius: 10rpx;
						margin-top: 44rpx;
						margin-bottom: 44rpx;

						textarea {
							width: 94%;
							// height: 760rpx;
							padding: 20rpx 3%;
						}

						.textarea {
							width: 94%;
							padding: 20rpx 3%;
						}
					}

					.examdetail-analysis {
						width: 690rpx;

						.examdetail-analysis_title {
							width: 100%;
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: $mk-base-color;
							line-height: 44rpx;
						}

						.exammistake {
							color: $uni-color-error;
						}

						.examdetail-analysis_content {
							width: 92%;
							// height: 212rpx;
							background: #EEEEEE;
							border-radius: 10rpx;
							margin-top: 23rpx;
							padding: 4%;

							.examdetail-analysis_content_op {
								width: 100%;
								display: flex;
								justify-content: flex-start;
								font-size: 26rpx;
								color: #202020;

								.title {
									width: 18%;
								}

								.text {
									width: 82%;
									font-size: 30rpx;
									font-family: PingFang SC;
									font-weight: 500;
									line-height: 30rpx;

								}

								.answer {
									color: $mk-base-color;
								}

							}
						}
					}
				}


			}


		}

		.exam-countdown {
			position: fixed;
			bottom: 0;
			width: 100%;
			display: flex;
			flex-direction: column;
			// border-top: 2rpx solid #000000;

			.exam-coundown_time {
				width: 100%;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				font-weight: bold;
				text-align: center;
				color: $mk-base-color;
				margin: 22rpx 0;
				display: flex;
				justify-content: center;
			}

			.coundown_end {
				color: $uni-color-error;
			}

			.exam-coundown_page {
				width: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin: 22rpx 0 36rpx 0;

				.exam-page_length {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #202020;
				}

				.exam-page_btn {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #909090;
				}
			}
		}

		.exam-card {
			position: relative;
			width: 100%;
			height: 980rpx;
			background: #FFFFFF;
			border-radius: 30rpx 30rpx 0px 0px;
			display: flex;
			flex-direction: column;
			align-items: center;

			.exam-card_title {
				width: 92%;
				padding: 0 4%;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #202020;
				padding: 43rpx 0;
			}

			.exam-card_list {
				width: 92%;
				padding: 0 4%;
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;

				.exam-card_item {
					width: 80rpx;
					height: 80rpx;
					color: #909090;
					border-radius: 50%;
					margin: 17rpx;
					border: 2rpx solid #B2B2B2;
					display: flex;
					justify-content: center;
					align-items: center;
					box-sizing: border-box;
				}

				.exam-card_blue {
					background: rgba($color: $mk-base-color, $alpha: 0.15);
					border: 2rpx solid rgba($color: $mk-base-color, $alpha: 0.15);
					color: $mk-base-color;
				}

				.exam-card_bluecur {
					background: rgba($color: $mk-base-color, $alpha: 0.35);
					border: 2rpx solid rgba($color: $mk-base-color, $alpha: 0.35);
					color: $mk-base-color;
				}

				.exam-card_graycur {
					background: #F0F0F0;
				}

				.exam-card_red {
					background: rgba($color: $uni-color-error, $alpha: 0.15);
					border: 2rpx solid rgba($color: $uni-color-error, $alpha: 0.15);
					color: $uni-color-error;
				}

				.exam-card_redcur {
					background: rgba($color: $uni-color-error, $alpha: 0.35);
					border: 2rpx solid rgba($color: $uni-color-error, $alpha: 0.35);
					color: $uni-color-error;
				}
			}

			.exam-card_off {
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 98rpx;
				background: #FFFFFF;
				color: #202020;
				font-size: 32rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-top: 2rpx solid #EEEEEE;
			}
		}
	}
</style>
