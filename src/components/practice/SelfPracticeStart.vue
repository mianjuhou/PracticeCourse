<template>
  <el-row style="height:20em;margin:1em;">
    <el-form ref="from" :model="form">
      <el-col :span=9 style="height:20em;background-color: #fff;margin:1em;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);">
        <el-header height="150px" v-html="mes"></el-header>
        <el-main></el-main>
        <el-footer style="text-align: right;margin-top: 1em">
          <p>开始测试^!</p>
          <el-button size="mini" style="background-color:dodgerblue;color: #fff;" @click="startTest">开始推荐测试</el-button>
        </el-footer>
      </el-col>
      <el-col :span=13
              style="height:20em;background-color: #fff;margin:1em;margin-left: 2em;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);">
        <el-row style="margin:1em">
          <el-col span=5 offset=3>
            <el-button size="mini" disabled=true style="background-color: #42b983;color: #fff;">完形填空</el-button>
          </el-col>
          <el-col span=6 offset=1>
            <el-select size="mini" style="width: 9em;" v-model="from.value1" placeholder="请选择">
              <el-option v-for="it in reading" :key="it.value" :label="it.label" :value="it.value"></el-option>
            </el-select>
          </el-col>
          <el-col span=6 offset=1>
            <el-input size="mini" style="width: 9em;" placeholder="个数"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin:1em">
          <el-col span=5 offset=3>
            <el-button size="mini" disabled=true style="background-color: #42b983;color: #fff;">阅读理解</el-button>
          </el-col>
          <el-col span=6 offset=1>
            <el-select size="mini" style="width: 9em;" v-model="from.value2" placeholder="请选择">
              <el-option v-for="it in wanxing" :key="it.value" :label="it.label" :value="it.value"></el-option>
            </el-select>
          </el-col>
          <el-col span=6 offset=1>
            <el-input size="mini" style="width: 9em;" placeholder="个数"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin:1em">
          <el-col span=5 offset=3>
            <el-button size="mini" disabled=true style="background-color: #42b983;color: #fff;">单项选择</el-button>
          </el-col>
          <el-col span=6 offset=1>
            <el-select size="mini" style="width: 9em;" v-model="from.value3" placeholder="请选择">
              <el-option v-for="it in danxuan" :key="it.value" :label="it.label" :value="it.value"></el-option>
            </el-select>
          </el-col>
          <el-col span=6 offset=1>
            <el-input size="mini" style="width: 9em;" placeholder="个数"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin:1em">
          <el-col span=5 offset=3>
            <el-button size="mini" disabled=true style="background-color: #42b983;color: #fff;">英汉翻译</el-button>
          </el-col>
          <el-col span=6 offset=1>
            <el-select size="mini" style="width: 9em;" value="类别" disabled=true>
              <el-option></el-option>
            </el-select>
          </el-col>
          <el-col span=6 offset=1>
            <el-input size="mini" style="width: 9em;" placeholder="个数"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin:1em">
          <el-col span=5 offset=3>
            <el-button size="mini" disabled=true style="background-color: #42b983;color: #fff;">书面表达</el-button>
          </el-col>

          <el-col span=6 offset=1>
            <el-select size="mini" style="width: 9em;" v-model="from.value4" placeholder="请选择">
              <el-option v-for="it in zuowen" :key="it.value" :label="it.label" :value="it.value"></el-option>
            </el-select>
          </el-col>
          <el-col span=6 offset=1>
            <el-input size="mini" style="width: 9em;" placeholder="个数"></el-input>
          </el-col>
        </el-row>
        <el-row style="text-align: right;margin:2em">
          <el-button size="mini" type="button" @click="doSubmit" style="background-color:dodgerblue;color: #fff;">
            开始自选训练
          </el-button>
        </el-row>
      </el-col>
    </el-form>
    <el-col :span=23 style="height:25em;background-color: #fff;margin:1em;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);">
      <el-row>
        <el-col :span=10 style="height:18em;margin:1em;margin-left: 3em">
          <span v-html="mes"></span>

          <div v-for="it in options" style="margin-top: 1em;height: 2em;">
            <el-divider style="margin-top: 2px;height: 1em;"></el-divider>
            <!--            -->
            <span><i v-bind:class="it.ico?'el-icon-circle-check':'el-icon-circle-close'" style="color:blue"></i>{{it.message}}</span>
          </div>
        </el-col>
        <el-col :span=1 style="height:18em;margin:1em">
          <el-divider style="height: 16em" direction="vertical"></el-divider>
        </el-col>
        <el-col :span=10 style="height:18em;margin:1em">
          <div style="height:18em;margin-top: 1em" id="bing"></div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

</template>

<script>
  import labels from "@/components/json/label.js"

  export default {
    data() {
      return {
        mes: "<br/><b>张柳同学:</b><br/>你于2020年考试成绩为85分，根据你的作答内容，我们为您定制了一套专项题目。！",
        options: [{ico: true, message: "完形填空工x提，正确x到，错误x到，xx"}, {ico: false, message: "完形填空工x提，正确x到，错误x到，xx"}],

        reading: labels.read,
        wanxing: labels.colze,
        zuowen: labels.zuowen,
        danxuan: labels.danxuan,
        from: {
          value1: '',
          value2: '',
          value3: '',
          value4: '',
        }
      }
    },
    created() {
      //页面创建完成调用
      //this.handleCreated()

    },
    mounted() {
      this.createBing();
      //console.log(labels)
    },
    methods: {
      createBing() {
        let myChart = this.$echarts.init(document.getElementById('bing'));
        myChart.setOption({
          title: {text: "错题分析", x: "center"},

          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            data: ['阅读理解', '完形填空', '单项选择', '英汉互译', '书面表达']
          },
          toolbox: {
            show: false,
            feature: {
              mark: {show: false},
              dataView: {show: false, readOnly: false},
              magicType: {show: false, type: ['line', 'bar']},
              restore: {show: false},
              saveAsImage: {show: false}
            }
          },
          calculable: true,
          series: [
            {
              name: "a",
              type: 'pie',
              radius: '70%',
              center: ['50%', '60%'],
              data: [
                {value: 335, name: "阅读理解"},
                {value: 335, name: "完形填空"},
                {value: 1335, name: "单项选择"},
                {value: 335, name: "英汉互译"},
                {value: 335, name: "书面表达"},
              ]

            }
          ]
        })
      },
      startTest() {
        this.$router.push({name: "SelfPracticeDetail"});
      },
      doSubmit() {
        console.log(this.from);
        this.$router.push({name: "SelfPracticeDetail"});
      },
      // handleCreated() {
      //   analogApi.getStationDatas()
      //   .then(response => {
      //    //获取服务端返回的JSON数据
      //    var ret = response.data;
      //    console.log(ret.flags, ret.message, ret.code, ret.data);
      //  })
      //   .catch(error => {
      //     console.log(error)
      //   })
      // }
    }
  }
</script>

<style scoped>
  .el-divider--vertical {
    height: 20em;
    margin-top: 1em;
  }

  .el-divider--horizontal {
    margin-top: 0;
    margin-bottom: 1em;
  }
</style>
