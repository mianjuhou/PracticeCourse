<template>
  <div style="width: 100%;display: flex;flex-direction: row;height: 100%;">
    <div style="overflow-y: auto;flex-grow: 1;height: 100%;padding: 10px;">
      <div v-for="data of datas">
        <div style="background-color: #BCE982;margin-top: 20px;padding: 10px;color: white;font-size: 16px;">
          Q：{{data.q}}
        </div>
        <div style="background-color: #E3C0A0;margin-top: 10px;padding: 10px;color: white;font-size: 16px;">
          A：{{data.a}}
        </div>
      </div>
    </div>
    <div style="padding-left: 20px;padding-right: 20px;padding-top: 10px;flex-shrink: 0;">
      <el-button type="success" @click="backFirst">返回小普解答</el-button>
    </div>
  </div>
</template>

<script>
  import qandaApi from '@/api/qanda';

  export default {
    name: "QADefault",
    data() {
      return {
        datas: [],
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        qandaApi.getDefault()
          .then(response => {
            var ret = response.data;
            this.datas = ret.default_list;
          })
          .catch(error => {
            console.log(error);
          });
      },
      backFirst() {
        this.$router.push({name: 'QuestionAnswer'});
      }
    }
  }
</script>

<style scoped>

</style>
