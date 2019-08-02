<template>
  <div style="flex-grow: 1;display: flex;background-color: #E1E7Eb">
    <el-container> <!--style="flex: 1;"-->
      <el-container> <!--style="display: flex;"-->
        <el-aside width="38%" style="display: flex;padding: 20px 10px 20px 20px;">
          <div style="background-color: white;flex: 1;display: flex;flex-direction: column;">
            <div style="flex-shrink: 0;">
              <div class="title">
                <span><i class="el-icon-s-opportunity" style="color: #1782D2;"></i>查看自己各科目优劣所在</span>
              </div>
              <div class="line"></div>
            </div>
            <div id="radar" style="flex-grow: 1;"></div>
          </div>
        </el-aside>
        <el-main style="padding: 20px 20px 20px 10px;display: flex;">
          <div style="background-color: white;flex: 1;display: flex;flex-direction: column;">
            <div style="flex-shrink: 0;">
              <div class="title">
                <span><i class="el-icon-s-opportunity" style="color: #1782D2;"></i>查看自己最近有没有进退步和波动的情况</span>
              </div>
              <div class="line"></div>
            </div>
            <div id="line" style="flex-grow: 1;"></div>
          </div>
        </el-main>
      </el-container>
      <el-footer height="50%" style="display: flex;padding: 0px 20px 20px 20px;">
        <div style="background-color: white;flex: 1;display: flex;flex-direction: column;">
          <div style="flex-shrink: 0;">
            <div class="title">
              <span><i class="el-icon-s-opportunity" style="color: #1782D2;"></i>查看自己知识点的掌握情况</span>
            </div>
            <div class="line"></div>
          </div>
          <el-row style="flex-grow: 1;display: flex;padding: 0px;">
            <el-col id="barOne" :span="8" style="flex: 1;"></el-col>
            <el-col id="barTwo" :span="8" style="flex: 1;"></el-col>
            <el-col id="barThree" :span="8" style="flex: 1;"></el-col>
          </el-row>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import studentApi from '@/api/student';
  import teacherApi from '@/api/teacher';
  import DateUtil from '@/util/DateUtil';

  export default {
    name: "SelfStudy3",
    data() {
      return {
        barSelection: ['全部', '完形填空', '阅读理解', '单项选择', '英汉互译', '书面表达'],
        barValue: 0,
        sability: [],
        avgability: [],
        lineX: [],
        lineY1: [],
        lineY2: [],
        barData: []
      }
    },
    created() {
      studentApi.getSability(this.$store.getters.getUserId)
        .then(resSab => {
          var retSab = resSab.data;
          this.sability = [retSab['完形填空'].score, retSab['阅读理解'].score, retSab['单项选择'].score, retSab['英汉互译'].score, retSab['书面表达'].score];
          this.drawRadar();
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
      var date = DateUtil.format(new Date(), "yyyyMMdd");
      studentApi.getExaminfo(this.$store.getters.getUserId, 8, date)
        .then(response => {
          var ret = response.data;
          this.lineX = ret.exam_list;
          studentApi.getRank(this.$store.getters.getUserId, this.lineX)
            .then(response => {
              var ret = response.data;
              this.lineX.forEach(x => {
                this.lineY1.push(ret[x].score);
              });
              this.drawLine();
            })
            .catch(error => {
              console.log(error);
            });
          teacherApi.getClassavg(this.$store.getters.getUserName, this.lineX)
            .then(response => {
              var ret = response.data;
              var avgScore = ret.avg_score;
              this.lineX.forEach(x => {
                this.lineY2.push(avgScore[x]);
              });
              this.drawLine();
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
      studentApi.getTotalinfo(this.$store.getters.getUserId)
        .then(response => {
          var ret = response.data;
          this.barData.push(ret['个人']['总体']);
          this.barData.push(ret['班级']['总体']);
          this.barData.push(ret['年级']['总体']);
          this.drawBar();
        })
        .catch(error => {
          this.drawBar();
          console.log(error);
        })
    },
    mounted() {

    }
    ,
    methods: {
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
      }
      ,
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
              data: ['个人得分', '班级平均']
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
              name: '个人得分',
              data: this.lineY1,
              type: 'line',
              smooth: true
            }, {
              name: '班级平均',
              data: this.lineY2,
              type: 'line',
              smooth: true
            }]
          }
        )
      }
      ,
      drawBar() {
        let myChart1 = this.$echarts.init(document.getElementById('barOne'));
        let myChart2 = this.$echarts.init(document.getElementById('barTwo'));
        let myChart3 = this.$echarts.init(document.getElementById('barThree'));
        var option = {
          title: {
            text: '综合能力',
            textStyle: {
              fontSize: 10
            },
            right: 30,
            top: 20
          },
          grid: {
            left: '2%',
            right: '10%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['个人', '班级', '年级'],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
          },
          series: [{
            barCategoryGap: '50%',
            data: [
              {value: this.barData[0]['综合能力'], itemStyle: {color: '#31CF9A'}},
              {value: this.barData[1]['综合能力'], itemStyle: {color: '#2D98FF'}},
              {value: this.barData[2]['综合能力'], itemStyle: {color: '#FFBC33'}}
            ],
            barMaxWidth: 30,
            type: 'bar'
          }]
        }
        var option2 = {
          title: {
            text: '做题量',
            textStyle: {
              fontSize: 10
            },
            right: 30,
            top: 20
          },
          grid: {
            left: '2%',
            right: '10%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['个人', '班级', '年级'],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
          },
          series: [{
            barCategoryGap: '50%',
            data: [
              {value: this.barData[0]['做题量'], itemStyle: {color: '#31CF9A'}},
              {value: this.barData[1]['做题量'], itemStyle: {color: '#2D98FF'}},
              {value: this.barData[2]['做题量'], itemStyle: {color: '#FFBC33'}}
            ],
            barMaxWidth: 30,
            type: 'bar'
          }]
        }
        var option3 = {
          title: {
            text: '准确率',
            textStyle: {
              fontSize: 10
            },
            right: 30,
            top: 20
          },
          grid: {
            left: '2%',
            right: '10%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['个人', '班级', '年级'],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
          },
          series: [{
            barCategoryGap: '50%',
            data: [
              {value: this.barData[0]['准确率'], itemStyle: {color: '#31CF9A'}},
              {value: this.barData[1]['准确率'], itemStyle: {color: '#2D98FF'}},
              {value: this.barData[2]['准确率'], itemStyle: {color: '#FFBC33'}}
            ],
            barMaxWidth: 30,
            type: 'bar'
          }]
        }
        myChart1.setOption(option);
        myChart2.setOption(option2);
        myChart3.setOption(option3);
      }
    }
  }
</script>

<style scoped>

  .title {
    font-size: 12px;
    padding: 20px 17px 10px 17px;
  }

  .line {
    background-color: #E1E7Eb;
    height: 1px;
    margin-left: 24px;
    margin-right: 24px;
  }
</style>
