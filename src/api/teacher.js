import request from '@/util/request'

const group_name = 'teacher';
export default {
  getClassavg(username, name) {
    return request({
      url: `/${group_name}/classavg/`,
      method: 'post',
      data: {
        username: username,
        name: name
      }
    })
  },
  getHomework(name) {
    return request({
      url: `/${group_name}/homework/`,
      method: 'post',
      data: {
        userid: this.$store.getters.getUserId,
        username: this.$store.getters.getUserName,
        name: name
      }
    })
  },
  getExam(school, grade, clazz, date, num) {
    return request({
      url: `/${group_name}/exam/`,
      method: 'post',
      data: {
        username: this.$store.getters.getUserName,
        school: school,
        grade: grade,
        clazz: clazz,
        date: date,
        num: num
      }
    })
  },
  getDistribution(name) {
    return request({
      url: `/${group_name}/distribution/`,
      method: 'post',
      data: {
        userid: this.$store.getters.getUserId,
        username: this.$store.getters.getUserName,
        name: name
      }
    })
  },
}
