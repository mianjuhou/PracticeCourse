<template>
  <div style="width: 100%;height: 100%;display: flex;background-color: #E1E7Eb;">
    <div style="width: 50%;display: flex;flex-direction: column;">
      <div style="background-color: white;height: 30%;display: flex;flex-direction: column;margin: 10px;">
        <div style="flex-shrink: 0;">
          <div class="title">
            <span><i class="el-icon-s-opportunity" style="color: #1782D2;"></i>看看班级近期成绩波动情况</span>
          </div>
          <div class="line"></div>
        </div>
        <div id="line" style="flex-grow: 1;"></div>
      </div>
      <div style="height: 30%;display: flex;flex-direction: column;background-color: white;margin-left: 10px;margin-right: 10px;">
        <div style="flex-shrink: 0;"><i class="el-icon-s-opportunity"></i>看看上次考试分数分布情况</div>
        <div id="bar" style="flex-grow: 1;"></div>
      </div>
      <div style="height: 40%;display: flex;">
        <div style="background-color: white;flex: 1;display: flex;flex-direction: column;margin: 10px;">
          <div style="flex-shrink: 0;">
            <div class="title">
              <span><i class="el-icon-s-opportunity" style="color: #1782D2;"></i>查看自己各科目优劣所在</span>
            </div>
            <div class="line"></div>
          </div>
          <div id="radar" style="flex-grow: 1;"></div>
        </div>
      </div>
    </div>
    <div style="width: 50%;">
      <div style="height: 100%;display: flex;flex-direction: column;padding: 10px;">
        <div style="display: flex;">
          <el-button size="mini" type="success" :class="rightIndex==0?'red_color':'white_color'" @click="rightIndex=0">布置作业</el-button>
          <el-button size="mini" type="success" :class="rightIndex==1||rightIndex==2?'red_color':'white_color'" @click="rightIndex=1">
            查看历史作业完成情况
          </el-button>
        </div>
        <div style="margin-top: 10px;height: 100%;background-color: white;">
          <div style="flex: 1;background-color: white;display: flex;padding: 10px;" v-if="rightIndex==0">
            <el-container style="flex: 1;">
              <div style="padding-top: 10px;">
                <span>要为哪个班级布置作业？</span>
                <el-select style="width: 100px;" size="mini" v-model="choiceData.grade" @change="gradeChange">
                  <el-option v-for="(key,item,index) of clazzData" :value="item" :label="item"></el-option>
                </el-select>
                <el-select style="width: 100px;" size="mini" v-model="choiceData.clazz">
                  <el-option v-for="item of options" :value="item" :label="item"></el-option>
                </el-select>
              </div>
              <el-row type="flex" justify="center" align="middle" style="margin-top: 10px;">
                <el-col :span="3">
                  <div>
                    考试名称：
                  </div>
                </el-col>
                <el-col :span="21">
                  <el-input placeholder="请输入作业名称" v-model="homeworkName" size="mini" style="width: 50%;"></el-input>
                </el-col>
              </el-row>
              <div style="margin-top: 10px;">
                自选布置
              </div>
              <el-main style="padding: 0px 0px 20px 20px;display: flex;flex-direction: column;">
                <el-row style="flex: 1;display: flex;align-items: center;margin-top: 10px;">
                  <el-tag effect="dark" type="success" size="medium" style="width: 120px;text-align: center;">完形填空</el-tag>
                  <el-select v-model="pojo['完形填空'].point" placeholder="选择类别" size="mini" style="width: 120px;margin-left: 30px;">
                    <el-option v-for="(val,key,index) of categoryDatas['完形填空'].category" :label="key" :value="key" :key="index"></el-option>
                  </el-select>
                  <el-input size="mini" style="width: 120px;margin-left: 30px;" v-model="pojo['完形填空'].question_num"></el-input>
                </el-row>
                <el-row style="flex: 1;display: flex;align-items: center;margin-top: 10px;">
                  <el-tag effect="dark" type="success" size="medium" style="width: 120px;text-align: center;">阅读理解</el-tag>
                  <el-select v-model="pojo['阅读理解'].point" placeholder="选择类别" size="mini" style="width: 120px;margin-left: 30px;">
                    <el-option v-for="(val,key,index) of categoryDatas['阅读理解'].category" :label="key" :value="key" :key="index"></el-option>
                  </el-select>
                  <el-input size="mini" style="width: 120px;margin-left: 30px;" v-model="pojo['阅读理解'].question_num"></el-input>
                </el-row>
                <el-row style="flex: 1;display: flex;align-items: center;margin-top: 10px;">
                  <el-tag effect="dark" type="success" size="medium" style="width: 120px;text-align: center;">单项选择</el-tag>
                  <el-select v-model="pojo['单选'].point" placeholder="选择类别" size="mini" style="width: 120px;margin-left: 30px;">
                    <el-option v-for="(val,key,index) of categoryDatas['单项选择'].category" :label="key" :value="key" :key="index"></el-option>
                  </el-select>
                  <el-input size="mini" style="width: 120px;margin-left: 30px;" v-model="pojo['单选'].question_num"></el-input>
                </el-row>
                <el-row style="flex: 1;display: flex;align-items: center;margin-top: 10px;">
                  <el-tag effect="dark" type="success" size="medium" style="width: 120px;text-align: center;">英汉互译</el-tag>
                  <el-select v-model="pojo['翻译'].point" placeholder="选择类别" size="mini" style="width: 120px;margin-left: 30px;">
                    <el-option v-for="(val,key,index) of categoryDatas['英汉互译'].category" :label="key" :value="key" :key="index"></el-option>
                  </el-select>
                  <el-input size="mini" style="width: 120px;margin-left: 30px;" v-model="pojo['翻译'].question_num"></el-input>
                </el-row>
                <el-row style="flex: 1;display: flex;align-items: center;margin-top: 10px;">
                  <el-tag effect="dark" type="success" size="medium" style="width: 120px;text-align: center;">书面表达</el-tag>
                  <el-select v-model="pojo['作文'].point" placeholder="选择类别" size="mini" style="width: 120px;margin-left: 30px;">
                    <el-option v-for="(val,key,index) of categoryDatas['书面表达'].category" :label="key" :value="key" :key="index"></el-option>
                  </el-select>
                  <el-input size="mini" style="width: 120px;margin-left: 30px;" v-model="pojo['作文'].question_num"></el-input>
                </el-row>
              </el-main>
              <el-footer style="text-align: right;padding-right: 30px;">
                <el-button type="success" size="mini" style="margin-top: 10px;" @click="doSubmit(true)">确认</el-button>
              </el-footer>
              <div style="margin-top: 30px;">
                试试智能布置班级作业？
              </div>
              <div style="text-align: right;padding-right: 30px;">
                <el-button type="success" size="mini" @click="doSubmit(false)">智能布置班级作业</el-button>
              </div>
            </el-container>
          </div>
          <div v-if="rightIndex==1" style="height: 100%;overflow-y: auto;">
            <div v-for="item of histrorys" style="padding: 10px;background-color: #42b983;margin-top: 10px;color: white;"
                 @click="historyDetail(item)">
              {{item}}
            </div>
          </div>
          <div style="height: 100%;overflow-y: auto;padding: 20px;" v-if="rightIndex==2">
            <div style="background-color: #31CF9A;display: flex;align-items: center;padding-top: 10px;padding-bottom: 10px;">
              <div style="color: white;flex-grow: 1;padding-left: 10px;">{{this.studentList.name}}</div>
              <el-button style="color: palevioletred;margin-right: 10px;" size="small">查看完成情况</el-button>
            </div>
            <div style="margin-top: 20px;background-color: orange;color: white;font-size: 14px;padding: 10px;">
              <div>已完成：</div>
              <div v-for="sid of studentList.ac_student_list">{{idName[sid]}} <span>查看得分</span></div>
              <div v-if="studentList.ac_student_list.length==0">无</div>
              <div style="margin-top: 10px;">未完成：</div>
              <div v-for="sid of studentList.unac_student_list">{{idName[sid]}}</div>
              <div v-if="studentList.unac_student_list.length==0">无</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import teacherApi from '@/api/teacher';
  import studentApi from '@/api/student';
  import DateUtil from '@/util/DateUtil';
  import Test from '@/components/Test';

  export default {
    name: "TeacherMain",
    components: {Test},
    data() {
      return {
        testFlag: false,
        lineX: [],
        lineY1: [],
        barData: [],
        choiceData: {
          userid: this.$store.state.userid,
          username: this.$store.state.username,
          name: '',
          teacher: this.$store.state.teacher,
          school: this.$store.state.tschool,
          grade: '',
          clazz: ''
        },
        pojo: {
          mode: 'teacher_multi_recommend',
          user_info: {
            userid: [this.$store.state.userid],
            grade: '七年级上'
          },
          '完形填空': {},
          '阅读理解': {},
          '单选': {},
          '翻译': {},
          '作文': {}
        },
        categoryDatas: {'完形填空': {}, '阅读理解': {}, '单项选择': {}, '英汉互译': {}, '书面表达': {}},
        rightIndex: 0,
        studentList: {},
        homeworkName: '',
        options: [],
        histrorys: [],
        clazzData: {},
        idName: []
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      gradeChange(value) {
        this.options = this.clazzData[value];
      },
      doSubmit(flag) {
        var date = DateUtil.format(new Date(), "yyyyMMdd");
        this.choiceData.name = date + this.homeworkName;
        if (flag) {
          this.choiceData.info = this.pojo;
        } else {
          delete this.choiceData['info'];
        }
        teacherApi.getHomework(this.choiceData)
          .then(response => {
            if (200 == response.status) {
              this.$message.success("提交成功");
            }
          })
          .catch(error => {
            this.$message.error(error);
          });
      },
      historyDetail(item) {
        teacherApi.getHistoryDetail(item, this.$store.state.teacher)
          .then(tresponse => {
            var sret = tresponse.data;
            var idList = [];
            sret.ac_student_list.forEach(id => {
              idList.push(id);
            });
            sret.unac_student_list.forEach(id => {
              idList.push(id);
            });
            studentApi.getName(idList)
              .then(sresponse => {
                this.idName = sresponse.data;
                this.studentList = sret;
                this.studentList.name = item;
              })
              .catch(error => {
                console.log(error);
              });

            this.rightIndex = 2;
          })
          .catch(error => {
            this.$message.error(error);
          });

      },
      handleTest() {
        this.testFlag = false;
        this.testFlag = true;
      },
      toStudent() {
        this.$router.push({name: 'MainPane'});
      },
      loadData() {
        var date = DateUtil.format(new Date(), "yyyyMMdd");
        date = parseInt(date);
        teacherApi.getExam(
          this.$store.state.tusername,
          this.$store.state.tschool,
          this.$store.state.tgrade,
          this.$store.state.tclazz,
          date, 7)
          .then(response => {
            var ret = response.data;
            this.lineX = ret.exam_list;
            teacherApi.getClassavg(this.$store.state.username, ret.exam_list)
              .then(response => {
                var scores = response.data.avg_score;
                this.lineX.forEach(x => {
                  this.lineY1.push(scores[x]);
                });
                this.drawLine();
              })
              .catch(error => {
                console.log(error);
              });
            var lastExam = this.lineX[this.lineX.length - 1];
            teacherApi.getDistribution([this.$store.state.userid], this.$store.state.username, lastExam)
              .then(response => {
                var dret = response.data;
                this.barData.push(dret.score_less_60);
                this.barData.push(dret.score_between_6080);
                this.barData.push(dret.score_between_8090);
                this.barData.push(dret.score_over_90);
                this.drawBar();
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
        studentApi.getSability(this.$store.getters.getUserId)
          .then(response => {
            var ret = response.data;
            this.categoryDatas = ret;
          })
          .catch(error => {
            console.log(error);
          });
        studentApi.getAvgability(this.$store.getters.getUserId)
          .then(resAvg => {
            var retAvg = resAvg.data;
            this.avgability = [retAvg['完形填空'], retAvg['阅读理解'], retAvg['单项选择'], retAvg['英汉互译'], retAvg['书面表达']];
            this.drawRadar();
          })
          .catch(error => {
            console.log(error);
          });
        // teacherApi.getHistoryList(this.$store.state.teacher, 1)
        //   .then(response => {
        //     var ret = response.data;
        //     var list = ret.history_page;
        //     console.log(JSON.stringify(list));
        //     this.histrorys = [];
        //     list.forEach(item => {
        //       for (var key in item) {
        //         this.histrorys.push(key);
        //       }
        //     });
        //     console.log(JSON.stringify(histrorys));
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
        teacherApi.getHistorySearch(this.$store.state.teacher, date)
          .then(response => {
            var ret = response.data;
            var list = ret.exam_list;
            this.histrorys = [];
            list.forEach(item => {
              for (var key in item) {
                this.histrorys.push(key);
              }
            });
            console.log(JSON.stringify(histrorys));
          })
          .catch(error => {
            this.$message.error(error);
          });
        teacherApi.getClazz()
          .then(response => {
            this.clazzData = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      drawBar() {
        let myChart = this.$echarts.init(document.getElementById('bar'));
        var option = {
          xAxis: {
            type: 'category',
            data: ['60分以下', '60-80', '80-90', '90-100']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.barData,
            type: 'bar'
          }]
        };
        myChart.setOption(option);
      },
      drawRadar() {
        let myChart = this.$echarts.init(document.getElementById('radar'));
        myChart.setOption(
          {
            title: {
              text: '个人能力图',
              textStyle: {
                fontSize: 10
              },
              left: 30,
              top: 10
            },
            tooltip: {},
            legend: {
              right: 20,
              top: 10,
              data: ['个人能力', '班级平均'],
              textStyle: {
                fontSize: 10
              }
            },
            radar: {
              name: {
                textStyle: {
                  color: '#fff',
                  backgroundColor: '#999',
                  borderRadius: 3,
                  fontSize: 12,
                  padding: [2, 5, 2, 5]
                }
              },
              indicator: [
                {name: '完型填空', max: 100},
                {name: '单项选择', max: 100},
                {name: '阅读理解', max: 100},
                {name: '英汉翻译', max: 100},
                {name: '书面表达', max: 100}
              ],
              center: ['50%', '60%'],
            },
            series: [{
              name: '个人能力 vs 班级平均',
              type: 'radar',
              data: [
                {
                  value: this.sability,
                  name: '个人能力'
                },
                {
                  value: this.avgability,
                  name: '班级平均'
                }
              ]
            }]
          }
        )
      },
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('line'));
        myChart.setOption(
          {
            title: {
              text: '得分分析图',
              textStyle: {
                fontSize: 10
              },
              left: 30,
              top: 10
            },
            legend: {
              right: 20,
              top: 10,
              data: ['班级平均']
            },
            grid: {
              left: '2%',
              right: '10%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: {
              name: '考试日期',
              type: 'category',
              data: this.lineX,
              axisTick: {
                show: false
              },
            },
            yAxis: {
              name: '分数',
              nameLocation: 'end',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              type: 'value',
              max: 150
            },
            series: [{
              name: '班级平均',
              data: this.lineY1,
              type: 'line',
              smooth: true
            }]
          }
        )
      }
    }
  }
</script>

<style scoped>
  .line {
    background-color: #E1E7Eb;
    height: 1px;
    margin-left: 24px;
    margin-right: 24px;
  }

  .white_color {
    color: white;
  }

  .red_color {
    color: red;
  }
</style>
