<template>
  <div style="flex: 1;background-color: #E1E7Eb;display: flex;flex-direction: column;">
    <el-row style="flex-shrink: 0;display: flex;align-items: center;">
      <el-col :span="16" style="padding-left: 200px;padding-right: 100px">
        <el-tabs @tab-click="handleClick" v-model="activeName">
          <el-tab-pane label="随便看看" name="RandomLook" style="font-size: 12px;"></el-tab-pane>
          <el-tab-pane label="我发布的" name="MyPublish"></el-tab-pane>
          <el-tab-pane label="回复我的" name="ReplyMe"></el-tab-pane>
          <el-tab-pane label="我收藏的" name="MyCollect"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="8">
        <el-input prefix-icon="el-icon-search" style="width: 300px;" v-model="searchContent" placeholder="请输入搜索内容" size="small">
          <el-button slot="append" icon="el-icon-position" style="background-color: white;color: #4977FC;" size="small"  @click="handleSearch"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "KnowledgeCommun",
    data() {
      return {
        searchContent: '',
        activeName: 'RandomLook'
      }
    },
    methods: {
      handleClick(tab, event) {
        // var path = '/commun/' + tab.name;
        // this.$router.push({path: path})
        //使用名称导航
        this.$router.push({name: tab.name, params: {userId: '123'}});
        console.log(tab, event, tab.name, path);
      },
      handleSearch() {
        this.$message("搜索内容:" + this.searchContent);
      }
    }
  }
</script>

<style scoped>

</style>
