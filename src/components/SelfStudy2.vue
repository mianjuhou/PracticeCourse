<template>
  <div style="flex-grow: 1;background-color: #E1E7Eb;display: flex;flex-direction: column;">
    <div style="flex: 1;display: flex;">
      <el-container style="padding: 18px 20px;flex: 1;">
        <el-aside width="38%" style="background-color: white;">
          <div class="pan">
            <div class="titleWrapper">
              <div class="title">
                <span><i class="el-icon-s-opportunity"></i>查看自己各科目优劣所在</span>
              </div>
              <div class="line"></div>
            </div>
            <div id="radar" class="panContent"></div>
          </div>
        </el-aside>
        <el-main style="background-color: white;margin-left: 20px;padding: 0px;">
          <div class="pan">
            <div class="titleWrapper">
              <div class="title">
                <span><i class="el-icon-s-opportunity"></i>查看自己最近有没有进退步和波动的情况</span>
              </div>
              <div class="line"></div>
            </div>
            <div id="line" class="panContent"></div>
          </div>
        </el-main>
      </el-container>
    </div>
    <div style="flex: 1;display: flex;padding: 0px 20px 20px 20px;">
      <div class="pan">
        <div class="titleWrapper">
          <div class="title">
            <span><i class="el-icon-s-opportunity"></i>查看自己知识点的掌握情况</span>
          </div>
          <div class="line"></div>
          <div style="padding-top: 5px;padding-bottom: 5px;padding-left: 30px;">
            <span>
              <el-tag size="medium" effect="plain" type="info">英语</el-tag>
              <el-select size="mini" style="width: 100px" v-model="barValue">
                <el-option v-for="(item,index) of barSelection" :label="item" :value="index"></el-option>
              </el-select>
              <el-button size="mini" type="primary">查询</el-button>
          </span>
          </div>
        </div>
        <div class="panContent">
          <div id="barOne" style="flex: 1;"></div>
          <div id="barTwo" style="flex: 1;"></div>
          <div id="barThree" style="flex: 1;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "SelfStudy2",
    data() {
      return {
        barSelection: ['全部', '完型填空', '阅读理解', '单项选择', '英汉翻译', '书面表达'],
        barValue: 0
      }
    },
    mounted() {
      this.drawRadar();
      this.drawLine();
      this.drawBar();
    },
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
              data: ['预算分配', '实际开销'],
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
                {name: '完型填空', max: 6500},
                {name: '单项选择', max: 16000},
                {name: '阅读理解', max: 30000},
                {name: '英汉翻译', max: 38000},
                {name: '书面表达', max: 52000}
              ],
              center: ['50%', '60%'],
            },
            series: [{
              name: '预算分配 vs 实际开销',
              type: 'radar',
              data: [
                {
                  value: [4300, 10000, 28000, 35000, 50000, 19000],
                  name: '预算分配'
                },
                {
                  value: [5000, 14000, 28000, 31000, 42000, 21000],
                  name: '实际开销'
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
              data: ['2019-5-4', '2019-5-9', '2019-5-13', '2019-5-20', '2019-5-22', '2019-5-25', '2019-5-29'],
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
              data: [20, 32, 1, 34, 70, 30, 20],
              type: 'line',
              smooth: true
            }, {
              name: '班级平均',
              data: [10, 42, 10, 34, 30, 70, 30],
              type: 'line',
              smooth: true
            }]
          }
        )
      },
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
              {value: 120, itemStyle: {color: '#31CF9A'}},
              {value: 200, itemStyle: {color: '#2D98FF'}},
              {value: 150, itemStyle: {color: '#FFBC33'}}
            ],
            barMaxWidth: 30,
            type: 'bar'
          }]
        }
        var option2 = {
          title: {
            text: '平均用时',
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
              {value: 120, itemStyle: {color: '#31CF9A'}},
              {value: 200, itemStyle: {color: '#2D98FF'}},
              {value: 150, itemStyle: {color: '#FFBC33'}}
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
              {value: 120, itemStyle: {color: '#31CF9A'}},
              {value: 200, itemStyle: {color: '#2D98FF'}},
              {value: 150, itemStyle: {color: '#FFBC33'}}
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
  .pan {
    background-color: white;
    display: flex;
    flex-direction: column;
  }

  .titleWrapper {
    flex-shrink: 0;
    overflow: auto;
  }

  .title {
    font-size: 12px;
    padding: 20px 17px 10px 17px;
  }

  .panContent {
    flex-grow: 1;
    display: flex;
  }

  .line {
    background-color: #E1E7Eb;
    height: 1px;
    margin-left: 24px;
    margin-right: 24px;
  }
</style>
