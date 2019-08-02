<template>
  <div style="flex: 1;">
    <el-card style="margin-left: 20px;margin-right: 20px;">
      <div style="text-align: center">张六同学，你于2019年5月28日第一次水平测验完成的训练情况如下：</div>
      <el-container style="padding-top: 10px;padding-bottom: 10px;color: #333333;font-size: 14px;">
        <el-main style="padding: 0px;">
          <div style="flex: 1;display: flex;align-items: center;padding-left: 30px;padding-top: 20px;">
            <span><i class="el-icon-success success_icon_style"></i>完形填空填空共6小题，正确4道，XXX题型需多练习，还有进步的空间；</span>
          </div>
          <div style="flex: 1;display: flex;align-items: center;padding-left: 30px;padding-top: 20px;">
            <span><i class="el-icon-success success_icon_style"></i>阅读理解共4小题，正确3道，再努力一点就完美了；</span>
          </div>
          <div style="flex: 1;display: flex;align-items: center;padding-left: 30px;padding-top: 20px;">
            <span><i class="el-icon-success success_icon_style"></i>单项选择共5小题，正确3道，XXX题型需多练习，还有进步的空间；</span>
          </div>
        </el-main>
        <div style="width: 1px;background-color: #7B93A7;margin-top: 20px;"></div>
        <el-aside width="50%">
          <div style="flex: 1;display: flex;align-items: center;padding-left: 30px;padding-top: 20px;">
            <span><i class="el-icon-success success_icon_style"></i>英汉翻译共4小题，正确4道，非常优秀，再接再厉；</span>
          </div>
          <div style="flex: 1;display: flex;align-items: center;padding-left: 30px;padding-top: 20px;">
            <span><i class="el-icon-success success_icon_style"></i>书面表达共1小题，得分25分。</span>
          </div>
        </el-aside>
      </el-container>
    </el-card>
    <router-view></router-view>
  </div>
</template>

<script>
  import examApi from '@/api/exam';

  export default {
    name: "CompletedDetail",
    data() {
      return {
        name: '',
      }
    },
    created() {
      // this.$router.push({name:''});
      this.name = this.$route.params.name;
    },
    methods: {
      loadData() {
        examApi.getExamDetail(this.$store.state.userid, this.name)
          .then(response => {
            var ret = response.data;
            var titles = ret.number[0];
            this.$router.push({name: 'SelfPracticeDetail2', params: {question_id: titles}});
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
</script>

<style scoped>
  .success_icon_style {
    color: #2D98FF;
    margin-right: 10px;
    font-size: 20px;
  }
</style>
