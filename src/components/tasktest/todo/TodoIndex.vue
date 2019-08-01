<template>
  <div style="flex: 1;display: flex;">
    <el-container style="flex: 1;">
      <el-main style="background-color: white;padding: 20px 20px 20px 20px;margin-left: 20px;margin-right: 20px;">
        <div v-for="item of datas" class="card_style">
          <el-row type="flex" justify="center">
            <el-col style="display: flex;flex-direction: row;align-items: center;vertical-align: center;">
              <span style="color: #1C1A1D;margin-left: 30%;">{{item.name}}</span>
              <span style="color: #7B93A7;font-size: 12px;margin-left: 30px;">发布：{{item.tname}}</span>
            </el-col>
            <el-button @click="toDetail(item)" style="margin-right: 30px;" size="mini" type="primary" plain>继续完成作答</el-button>
          </el-row>
        </div>
      </el-main>
      <el-footer style="display: flex;align-items: center;justify-content: center;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totlalSize">
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import taskApi from '@/api/task';

  export default {
    name: "CompletedIndex",
    data() {
      return {
        currentPage: 1,
        datas: [],
        pageSize: 10,
        totlalSize: 0,
        userId: ''
      }
    },
    created() {
      this.userId = this.$store.getters.getUserId;
      this.getRemoteData();
    },
    methods: {
      getRemoteData() {
        taskApi.getUnaccomplished(this.userId, this.currentPage, this.pageSize)
          .then(response => {
            var ret = response.data;
            this.datas = ret.task_page;
            this.totlalSize = ret.total;
          })
          .catch(error => {
            console.log(error);
          })
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getRemoteData();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getRemoteData();
      },
      toDetail(name) {
        taskApi.getUnaccomplishedid(this.userId, name)
          .then(response => {
            var data = response.data;
            this.$router.push({name: 'SelfPracticeDetail3', params: {question_id: data.exam_id}})
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
</script>

<style scoped>
  .card_style {
    background-color: #FAFAFA;
    margin-bottom: 10px;
    border: #FF5F5F solid 1px;
    display: flex;
    flex-direction: column;
    padding: 20px 0px 20px 0px;
  }
</style>
