<template>
  <div style="flex: 1;display: flex;">
    <el-container>
      <el-container>
        <el-aside width="40%" style="display: flex;padding: 20px 10px 10px 20px;">
          <el-container style="flex: 1;background-color: white;">
            <el-header style="padding: 30px 30px 0px 30px;font-size: 15px;color: #333333;font-family: 'Microsoft YaHei';">
              <div>
                {{this.$store.getters.getStudentName}}同学，
              </div>
              <div>
                你于{{remoteData.time}}完成的训练得分为{{remoteData.score}}分，根据你的作答信息，
                我们为你做了定制化题目推荐。
              </div>
            </el-header>
            <el-main>
            </el-main>
            <el-footer style="text-align: right;padding-right: 30px;margin-bottom: 20px;">
              <div>
                <span style="color: #7B93A7">开始推荐测试请点击<i class="el-icon-thumb" style="color: red;transform: rotate(180deg);"></i> </span>
              </div>
              <el-button type="primary" size="mini" style="margin-bottom: 30px;margin-top: 10px;" @click="startTest">开始推荐训练</el-button>
            </el-footer>
          </el-container>
        </el-aside>
        <el-main style="display: flex;padding: 20px 20px 10px 10px;">
          <div style="flex: 1;background-color: white;display: flex;">
            <el-container style="flex: 1;">
              <el-main style="padding: 20px 0px 20px 60px;display: flex;flex-direction: column;">
                <el-row style="flex: 1;display: flex;align-items: center;">
                  <el-tag effect="dark" type="success" size="medium" style="width: 120px;text-align: center;">完形填空</el-tag>
                  <el-select v-model="choiceData['完形填空'].point" placeholder="选择类别" size="mini" style="width: 120px;margin-left: 30px;">
                    <el-option v-for="(val,key,index) of categoryDatas['完形填空'].category" :label="key" :value="key" :key="index"></el-option>
                  </el-select>
                  <el-input size="mini" style="width: 120px;margin-left: 30px;" v-model="choiceData['完形填空'].question_num"></el-input>
                </el-row>
                <el-row style="flex: 1;display: flex;align-items: center;">
                  <el-tag effect="dark" type="success" size="medium" style="width: 120px;text-align: center;">阅读理解</el-tag>
                  <el-select v-model="choiceData['阅读理解'].point" placeholder="选择类别" size="mini" style="width: 120px;margin-left: 30px;">
                    <el-option v-for="(val,key,index) of categoryDatas['阅读理解'].category" :label="key" :value="key" :key="index"></el-option>
                  </el-select>
                  <el-input size="mini" style="width: 120px;margin-left: 30px;" v-model="choiceData['阅读理解'].question_num"></el-input>
                </el-row>
                <el-row style="flex: 1;display: flex;align-items: center;">
                  <el-tag effect="dark" type="success" size="medium" style="width: 120px;text-align: center;">单项选择</el-tag>
                  <el-select v-model="choiceData['单选'].point" placeholder="选择类别" size="mini" style="width: 120px;margin-left: 30px;">
                    <el-option v-for="(val,key,index) of categoryDatas['单项选择'].category" :label="key" :value="key" :key="index"></el-option>
                  </el-select>
                  <el-input size="mini" style="width: 120px;margin-left: 30px;" v-model="choiceData['单选'].question_num"></el-input>
                </el-row>
                <el-row style="flex: 1;display: flex;align-items: center;">
                  <el-tag effect="dark" type="success" size="medium" style="width: 120px;text-align: center;">英汉互译</el-tag>
                  <el-select v-model="choiceData['翻译'].point" placeholder="选择类别" size="mini" style="width: 120px;margin-left: 30px;">
                    <el-option v-for="(val,key,index) of categoryDatas['英汉互译'].category" :label="key" :value="key" :key="index"></el-option>
                  </el-select>
                  <el-input size="mini" style="width: 120px;margin-left: 30px;" v-model="choiceData['翻译'].question_num"></el-input>
                </el-row>
                <el-row style="flex: 1;display: flex;align-items: center;">
                  <el-tag effect="dark" type="success" size="medium" style="width: 120px;text-align: center;">书面表达</el-tag>
                  <el-select v-model="choiceData['作文'].point" placeholder="选择类别" size="mini" style="width: 120px;margin-left: 30px;">
                    <el-option v-for="(val,key,index) of categoryDatas['书面表达'].category" :label="key" :value="key" :key="index"></el-option>
                  </el-select>
                  <el-input size="mini" style="width: 120px;margin-left: 30px;" v-model="choiceData['作文'].question_num"></el-input>
                </el-row>
              </el-main>
              <el-footer style="text-align: right;padding-right: 30px;">
                <el-button type="primary" size="mini" style="margin-top: 10px;" @click="doSubmit">开始自主训练</el-button>
              </el-footer>
            </el-container>
          </div>
        </el-main>
      </el-container>
      <el-footer height="55%" style="padding: 0px 20px 20px 20px;display: flex;">
        <div style="flex: 1;display: flex;flex-direction: column;">
          <div style="flex-shrink: 0;">
            <el-select v-model="searchValue" filterable placeholder="历史考试记录" size="mini">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-button size="mini" @click="searchData">搜索</el-button>
            <el-button size="mini" type="primary" @click="searchDetail">查看原卷</el-button>
          </div>
          <div style="flex-grow: 1;background-color: white;margin-top: 5px;display: flex;flex-direction: row;">
            <div style="flex: 5;display: flex;flex-direction: column;">
              <div style="padding-left: 30px;padding-top: 30px;flex-shrink: 0;">
                <div>
                  {{this.$store.getters.getStudentName}}同学，
                </div>
                <div>
                  你于{{remoteData.time}}完成的训练情况如下：
                </div>
              </div>
              <div style="flex-grow: 1;display: flex;flex-direction: column;margin-top: 10px;margin-bottom: 30px;">
                <div class="line"></div>
                <div :class="this.remoteData['total']['完形填空'] != undefined?'practice_item':'practice_item_hidden'">
                  <span><i class="el-icon-success success_icon_style"></i>{{getJudge('完形填空')}}</span>
                </div>
                <div class="line"></div>
                <div :class="this.remoteData['total']['阅读理解'] != undefined?'practice_item':'practice_item_hidden'">
                  <span><i class="el-icon-success success_icon_style"></i>{{getJudge('阅读理解')}}</span>
                </div>
                <div class="line"></div>
                <div :class="this.remoteData['total']['单选'] != undefined?'practice_item':'practice_item_hidden'">
                  <span><i class="el-icon-success success_icon_style"></i>{{getJudge('单选')}}</span>
                </div>
                <div class="line"></div>
                <div :class="this.remoteData['total']['翻译'] != undefined?'practice_item':'practice_item_hidden'">
                  <span><i class="el-icon-success success_icon_style"></i>{{getJudge('翻译')}}</span>
                </div>
                <div class="line"></div>
                <div :class="this.remoteData['total']['作文'] != undefined?'practice_item':'practice_item_hidden'">
                  <span><i class="el-icon-success success_icon_style"></i>{{getJudge('作文')}}</span>
                </div>
              </div>
            </div>
            <div style="width: 1px;background: #E1E7Eb;margin-top: 30px;margin-bottom: 30px;"></div>
            <div style="flex: 4;" id="pie"></div>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import studentApi from '@/api/student';
  import examApi from '@/api/exam';

  export default {
    name: "SelfPracticeStart2",
    data() {
      return {
        choiceData: {
          user_info: {userid: this.$store.getters.getUserId, grade: this.$store.getters.getGrade},
          mode: 'multi_recommend',
          '完形填空': {},
          '阅读理解': {},
          '单选': {},
          '翻译': {},
          '作文': {}
        },
        recommendData: {
          user_info: {userid: this.$store.getters.getUserId, grade: this.$store.getters.getGrade},
          mode: 'multi_recommend'
        },
        legendData: [],
        seriesData: [],
        remoteData: {total: {}},
        searchKeys: {},
        searchValue: '',
        options: [],
        studentId: this.$store.getters.getStudentId,
        userId: this.$store.getters.getUserId,
        categoryDatas: {'完形填空': {}, '阅读理解': {}, '单项选择': {}, '英汉互译': {}, '书面表达': {}},
      }
    },
    created() {
      this.getRemoteData();
    },
    mounted() {
    },
    methods: {
      getJudge(type) {
        if (this.remoteData['total'] == undefined || this.remoteData['correct'] == undefined) {
          return "";
        }
        var total = this.remoteData['total'][type];
        var correct = this.remoteData['correct'][type];
        var correctRate = correct / total;
        if ("作文" != type) {
          var sentence = type + "共" + total + "小题，正确" + correct + "道，";
          if (correctRate == 1) {
            sentence += "非常优秀，再接再厉；";
          } else if (correctRate >= 0.9) {
            sentence += "再努力一点就完美了；";
          } else {
            sentence += type + "题型需多练习，还有进步的空间；";
          }
          return sentence;
        } else {
          return "书面表达共1小题";
        }
      },
      searchDetail() {
        examApi.getExamDetail(this.userId, this.searchValue)
          .then(response => {
            var ret = response.data;
            this.$router.push({name: "SelfPracticeDetail", params: {question_id: ret.number[0]}});
          })
          .catch(error => {
            console.log(error);
          });
      },
      searchData() {
        this.getExaminfoData(this.searchValue);
      },
      getRemoteData() {
        examApi.search(this.userId)
          .then(response => {
            var ret = response.data;
            this.options = ret.related;
            this.searchValue = this.options[0];
            this.getExaminfoData(this.searchValue);
          })
          .catch(error => {
            console.log(error);
          });
        studentApi.getSability(this.userId)
          .then(response => {
            var ret = response.data;
            this.categoryDatas = ret;
          })
          .catch(error => {
            console.log(error);
          });
      },
      getExaminfoData(name) {
        examApi.getExaminfo(this.userId, name)
          .then(response => {
            var ret = response.data;
            this.remoteData = ret;
            this.legendData = [];
            this.seriesData = [];
            for (var item in ret.total) {
              var wrong = ret.total[item] - ret.correct[item];
              if (wrong != 0) {
                this.legendData.push(item);
                this.seriesData.push({
                  name: item,
                  value: wrong
                });
              }
            }
            this.$nextTick(function () {
              this.drawPie();
            })
          })
          .catch(error => {
            console.log(error);
          });
      },
      drawPie() {
        let myChart = this.$echarts.init(document.getElementById('pie'));
        myChart.setOption(
          {
            title: {
              text: '错误题目分布情况',
              x: 'center',
              top: 20,
              textStyle: {
                fontSize: 14
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)",
            },
            legend: {
              orient: 'vertical',
              right: 25,
              top: 40,
              data: this.legendData
            },
            series: [
              {
                type: 'pie',
                radius: '55%',
                center: ['44%', '55%'],
                data: this.seriesData,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        );
      },
      startTest() {
        examApi.getRecommendid(this.$store.getters.getUserId)
          .then(response => {
            var ret = response.data;
            if (ret.status == '200') {
              var data = ret.question_id;
              this.$router.push({name: "SelfPracticeDetail", params: ret});
            }
          })
          .catch(error => {
            console.log(error);
          })
      },
      doSubmit() {
        var num = this.choiceData['完形填空'].question_num;
        if (num == undefined) {
          this.choiceData['完形填空'].question_num = 0;
          this.choiceData['完形填空'].point = 'None';
        } else {
          this.choiceData['完形填空'].question_num = parseInt(num);
        }
        num = this.choiceData['阅读理解'].question_num;
        if (num == undefined) {
          this.choiceData['阅读理解'].question_num = 0;
          this.choiceData['阅读理解'].point = 'None';
        } else {
          this.choiceData['阅读理解'].question_num = parseInt(num);
        }
        num = this.choiceData['单选'].question_num;
        if (num == undefined) {
          this.choiceData['单选'].question_num = 0;
          this.choiceData['单选'].point = 'None';
        } else {
          this.choiceData['单选'].question_num = parseInt(num);
        }
        num = this.choiceData['翻译'].question_num;
        if (num == undefined) {
          this.choiceData['翻译'].question_num = 0;
          this.choiceData['翻译'].point = 'None';
        } else {
          this.choiceData['翻译'].question_num = parseInt(num);
        }
        num = this.choiceData['作文'].question_num;
        if (num == undefined) {
          this.choiceData['作文'].question_num = 0;
          this.choiceData['作文'].point = 'None';
        } else {
          this.choiceData['作文'].question_num = parseInt(num);
        }
        examApi.getOptionalid(this.choiceData)
          .then(response => {
            var ret = response.data;
            this.$router.push({name: "SelfPracticeDetail", params: ret});
          })
          .catch(error => {
            console.log(error);
          })
      },
    }
  }
</script>

<style scoped>
  .line {
    background-color: #E1E7Eb;
    height: 1px;
    margin-left: 24px;
    margin-right: 100px;
  }

  .success_icon_style {
    color: #2D98FF;
    margin-right: 10px;
    font-size: 20px;
  }

  .practice_item {
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }

  .practice_item_hidden {
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 30px;
    visibility: hidden;
  }
</style>
