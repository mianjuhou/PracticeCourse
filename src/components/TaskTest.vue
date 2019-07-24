<template>
  <div style="flex: 1;background-color: #E1E7Eb;display: flex;flex-direction: column;">
    <el-row style="flex-shrink: 0;">
      <el-tabs @tab-click="handleClick" style="padding-left: 200px;">
        <el-tab-pane label="已完成的" name=""></el-tab-pane>
        <el-tab-pane label="待完成的" name="todocomplete"></el-tab-pane>
      </el-tabs>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "TaskTest",
    data() {
      return {}
    },
    methods: {
      handleClick(tab, event) {
        var path = '/tasktest/' + tab.name;
        this.$router.push({path: path})
        console.log(tab, event, tab.name, path);
      }
    }
  }
</script>

<style scoped>

</style>
