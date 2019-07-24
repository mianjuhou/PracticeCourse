import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    studentid: 8,
    studentname: '小明',
    userid: '28',
    grade: '七年级上',
    username: 'user16',
  },
  getters: {
    getStudentId: function (state) {
      return state.studentid;
    },
    getStudentName: function (state) {
      return state.studentname;
    },
    getUserId: function (state) {
      return state.userid;
    },
    getGrade: function (state) {
      return state.grade;
    },
    getUserName: function (state) {
      return state.username;
    }
  },
  mutations: {
    add(state) {
      state.count = state.count + 1;
    },
    reduce(state) {
      state.count = state.count - 1;
    }
  },
  actions: {
    addFunc(context) {
      context.commit("add");
    },
    reduceFunc(context) {
      context.commit("reduce");
    }
  }
});

export default store
