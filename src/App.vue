<template>
  <div id="app">
    <div style="flex-shrink: 0;">
      <div style="background-color: #2F3952;display: flex;flex-direction: row;padding-left: 200px;">
        <li :class="selectIndex==0?'selected-menu-item':'deselect-menu-item'" @click="handleClick(0,'/')">个人学情</li>
        <li :class="selectIndex==1?'selected-menu-item':'deselect-menu-item'" @click="handleClick(1,'/practice')">自主训练</li>
        <li :class="selectIndex==2?'selected-menu-item':'deselect-menu-item'" @click="handleClick(2,'/tasktest')">随堂作业&水平测验</li>
        <li :class="selectIndex==3?'selected-menu-item':'deselect-menu-item'" @click="handleClick(3,'/qa')">小普解答</li>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import studentApi from '@/api/student';

  export default {
    name: 'App',
    data() {
      return {
        selectIndex: 0,
      }
    },
    created() {
      this.getUser();
    },
    mounted() {
      this.$router.push({path: '/'})
    },
    methods: {
      getUser() {
        studentApi.getUser()
          .then(response => {
            var ret = response.data;
            if ('200' == ret.status) {
              this.$message.success("登录成功");
            } else {
              this.$message.error(ret.msg);
            }
          })
          .catch(error => {
            this.$message.error(error);
          });
      },
      handleClick(index, path) {
        this.selectIndex = index;
        this.$router.push({path: path})
      }
    }
  }
</script>

<style>
  #app {
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .selected-menu-item {
    color: white;
    list-style: none;
    font-size: 14px;
    padding: 10px 20px 10px 20px;
    background-color: #2D98FF;
    cursor: pointer
  }

  .deselect-menu-item {
    color: white;
    list-style: none;
    font-size: 14px;
    padding: 10px 20px 10px 20px;
    cursor: pointer
  }
</style>
