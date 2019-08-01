<template>
  <div style="padding: 10px;display: flex;flex-direction: column;">
    <el-button style="width: 150px;position: fixed;right: 10px;" type="success" @click="goDefalut">查看精品问答</el-button>
    <div style="overflow-y: auto;">
      <div v-for="(item,index) of datas" style="width: 100%;">
        <div style="width: 50%;display: flex;">
          <div>
            <img src="../../assets/logo.png" height="50" width="50"/>
          </div>
          <div style="background-color: #BCE982;padding: 20px;width: 400px;color: white;">
            {{item.question}}
          </div>
        </div>
        <div style="width: 100%;display: flex;flex-direction: row-reverse;">
          <div>
            <img src="../../assets/logo.png" height="50" width="50"/>
          </div>
          <div style="background-color: #E3C0A0;padding: 20px;width: 400px;color: white;">
            {{item.answer}}
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%;position: fixed;bottom: 10px;display: flex;padding-right: 20px;">
      <el-input style="flex-grow: 1;" v-model="pojo.question"></el-input>
      <el-button style="flex-shrink: 0;margin-left: 10px;" type="success" @click="loadData">发送</el-button>
    </div>
  </div>
</template>

<script>
  import qandaApi from '@/api/qanda';

  export default {
    name: "QuestionAnswer",
    data() {
      return {
        datas: [],
        pojo: {},
      }
    },
    methods: {
      loadData() {
        qandaApi.getQuestion(this.pojo.question)
          .then(response => {
            var ret = response.data;
            this.pojo.answer = ret.answer;
            this.datas.push(this.pojo);
            this.pojo = {};
          })
          .catch(error => {
            console.log(error);
          });
      },
      goDefalut() {
        this.$router.push({name: 'QADefault'});
      }
    },
  }
</script>

<style scoped>

</style>
