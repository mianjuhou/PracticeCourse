<template>
  <div>
    <el-dialog :visible.sync="flag">
      {{flag}}
      <el-button @click="flag = false">改变</el-button>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Test",
    props: ['flag'],
  }
</script>

<style scoped>

</style>
