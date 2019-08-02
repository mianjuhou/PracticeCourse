<template>
  <div style="width: 100%;height: 100%;display: flex;">
    <div style="width: 50%;display: flex;flex-direction: column;">
      <div style="background-color: white;height: 30%;display: flex;flex-direction: column;">
        <div style="flex-shrink: 0;">
          <div class="title">
            <span><i class="el-icon-s-opportunity" style="color: #1782D2;"></i>看看班级近期成绩波动情况</span>
          </div>
          <div class="line"></div>
        </div>
        <div id="line" style="flex-grow: 1;"></div>
      </div>
      <div style="height: 30%;display: flex;flex-direction: column;">
        <div style="flex-shrink: 0;"><i class="el-icon-sunny"></i>看看上次考试分数分布情况</div>
        <div id="bar" style="flex-grow: 1;"></div>
      </div>
      <div style="height: 40%;display: flex;">
        <div style="background-color: white;flex: 1;display: flex;flex-direction: column;">
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
      <div style="height: 100%;display: flex;flex-direction: column;">
        <div style="display: flex;">
          <el-button type="success" :class="rightIndex==0?'red_color':'white_color'" @click="rightIndex=0">布置作业</el-button>
          <el-button type="success" :class="rightIndex==1?'red_color':'white_color'" @click="rightIndex=1">查看历史作业完成情况</el-button>
        </div>
        <div>
          <div style="flex: 1;background-color: white;display: flex;" v-if="rightIndex==0">
            <el-container style="flex: 1;">
              <div style="padding-top: 10px;">
                <span>要为哪个班级布置作业？</span>
                <el-select style="width: 300px;" size="mini" v-model="choiceData.clazz">
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
            <div v-for="item of lineX" style="padding: 10px;background-color: #42b983;margin-top: 10px;color: white;"
                 @click="historyDetail(item)">
              {{item}}
            </div>
          </div>
          <div style="height: 100%;overflow-y: auto;" v-if="rightIndex==2">
            <div style="background-color: #31CF9A;display: flex;align-items: center;padding-top: 10px;padding-bottom: 10px;">
              <div style="color: white;flex-grow: 1;padding-left: 20px;">2019-5-18 英语随堂作业一</div>
              <el-button style="color: palevioletred;margin-right: 10px;" size="small">查看完成情况</el-button>
            </div>
            <div>
              <div>已完成：</div>
              <div v-for="name of studentList.ac_student_list">{{name}} 查看得分 作文人工批改</div>
              <div>未完成：</div>
              <div v-for="name of studentList.unac_student_list">{{name}}</div>
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
          grade: this.$store.state.tgrade,
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
        options: ['一班', '二班', '三班'],
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      doSubmit(flag) {
        var date = DateUtil.format(new Date(), "yyyyMMdd");
        this.choiceData.name = date + this.homeworkName;
        if (flag) {
          this.choiceData.info = this.pojo;
        } else {
          this.choiceData.info = null;
        }
        console.log(JSON.stringify(this.choiceData));
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
        teacherApi.getHistory(item, this.$store.state.teacher)
          .then(response => {
            this.studentList = response.data;
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
            teacherApi.getDistribution(this.$store.state.userid, this.$store.state.username, lastExam)
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
              max: 100
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
