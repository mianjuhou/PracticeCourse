<template>
  <div>
    <el-row :gutter=30 style="height: 350px;margin:1em;">
      <el-col :span=11 style="height: 100%;background-color:#fff;margin-right: 1em;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);">
        <el-header style="height: 5%;">查看自己各科目优劣所在</el-header>
        <div id="leida" style="height: 90%"></div>
      </el-col>
      <!--      <el-col :span="1" style="height: 100%;margin-left:0;margin-right: 0;"></el-col>-->
      <el-col :span=12 style="height: 100%;background-color:#fff;margin-left:2em;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);">
        <el-header style="height: 5%;">查看自己各科目优劣所在</el-header>
        <div id="zhexian" style="height: 90%"></div>
      </el-col>
    </el-row>
    <el-row :gutter="30" style="height: 350px;margin:1em;background-color:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);">
      <el-header style="height: 15%;margin-top:1em">
        <el-select v-model="value1" size="mini">
          <el-option v-for="item in options" :key="item.value1" :label="item.label" :value="item.value1"></el-option>
        </el-select>
        <el-select v-model="value2" size="mini">
          <el-option v-for="item in optionss" :key="item.value2" :label="item.label" :value="item.value2"></el-option>
        </el-select>
        <el-button size="mini">查询</el-button>
      </el-header>
      <el-col :span=8 style="height: 85%;">
        <div id="zhuone" style="height: 85%;"></div>
      </el-col>
      <el-col :span=8 style="height: 85%;">
        <div id="zhutwo" style="height: 85%;"></div>
      </el-col>
      <el-col :span=8 style="height: 85%;">
        <div id="zhuthree" style="height: 85%;"></div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  import studentApi from "@/api/student"

  export default {
    name: "SelfStudy",
    data() {
      return {
        options: [{
          value1: 1, label: "英语"
        }, {
          value1: 0, label: "请选择"
        }],
        value1: 0, optionss: [{
          value2: 1, label: "全部"
        },], value2: 1
      }
    },
    mounted() {
      this.drawLeida();
      this.drawLine();
      this.drawZhu();
    },
    created() {
      studentApi.getSability("1")
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        })
    },
    methods: {
      drawLeida() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('leida'));
        // 绘制图表
        myChart.setOption({
          // title : {text: '预算 vs 开销', subtext: '纯属虚构'},
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            y: 'bottom',
            data: ['预算分配', '实际开销']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: false},
              dataView: {show: false, readOnly: false},
              restore: {show: false},
              saveAsImage: {show: false}
            }
          },
          polar: [
            {
              indicator: [
                {text: '销售', max: 6000},
                {text: '管理', max: 16000},
                {text: '信息技术', max: 30000},
                {text: '客服', max: 38000},
                {text: '研发', max: 52000},
                {text: '市场', max: 25000}
              ]
            }
          ],
          calculable: true,
          series: [
            {
              name: '预算 vs 开销',
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
            }
          ]
        });
      },
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('zhexian'));
        myChart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['最高气温', '最低气温']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: false},
              dataView: {show: false, readOnly: false},
              magicType: {show: false, type: ['line', 'bar']},
              restore: {show: false},
              saveAsImage: {show: false}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value} °C'
              }
            }
          ],
          series: [
            {
              name: '最高气温',
              type: 'line',
              data: [11, 11, 15, 13, 12, 13, 10],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            },
            {
              name: '最低气温',
              type: 'line',
              data: [1, -2, 2, 5, 3, 2, 0],
              markPoint: {
                data: [
                  {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        })

      },
      drawZhu() {
        let myChart1 = this.$echarts.init(document.getElementById('zhuone'));
        let myChart2 = this.$echarts.init(document.getElementById('zhutwo'));
        let myChart3 = this.$echarts.init(document.getElementById('zhuthree'));
        var option = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['最高气温', '最低气温']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: false},
              dataView: {show: false, readOnly: false},
              //  magicType : {show: false, type: ['line', 'bar']},
              restore: {show: false},
              saveAsImage: {show: false}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value} °C'
              }
            }
          ],
          series: [
            {
              name: '最高气温',
              type: 'bar',
              data: [11, 11, 15, 13, 12, 13, 10],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            },
            {
              name: '最低气温',
              type: 'bar',
              data: [1, -2, 2, 5, 3, 2, 0],
              markPoint: {
                data: [
                  {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        };
        myChart1.setOption(option);
        myChart2.setOption(option);
        myChart3.setOption(option);
      }
    }
  }

</script>

<style scoped>

</style>
