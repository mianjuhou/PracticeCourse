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
  getHomework(data) {
    return request({
      url: `/${group_name}/homework/`,
      method: 'post',
      data: data
    })
  },
  getExam(username, school, grade, clazz, date, num) {
    return request({
      url: `/${group_name}/exam/`,
      method: 'post',
      data: {
        username: username,
        school: school,
        grade: grade,
        clazz: clazz,
        date: date,
        num: num
      }
    })
  },
  getDistribution(stulist, username, name) {
    return request({
      url: `/${group_name}/distribution/`,
      method: 'post',
      data: {
        stulist: stulist,
        username: username,
        name: name
      }
    })
  },
  getHistory(name, teacher) {
    return request({
      url: `/${group_name}/history/`,
      method: 'post',
      data: {
        name: name,
        teacher: teacher
      }
    })
  },
  getHistoryList(teacher, page) {
    return request({
      url: `/${group_name}/historylist/`,
      method: 'post',
      data: {
        page: page,
        teacher: teacher
      }
    })
  },
  getHistorySearch(teacher,date) {
    return request({
      url: `/${group_name}/historysearch/`,
      method: 'post',
      data: {
        teacher: teacher,
        date: date
      }
    })
  },
  getHistorySearch2(name,teacher,date) {
    return request({
      url: `/${group_name}/historysearch/`,
      method: 'post',
      data: {
        name: name,
        teacher: teacher,
        date: date
      }
    })
  },
  getHistoryDetail(name,teacher) {
    return request({
      url: `/${group_name}/historydetail/`,
      method: 'post',
      data: {
        name: name,
        teacher: teacher
      }
    })
  },
  getClazz(){
    return request({
      url: `/${group_name}/getclazz/`,
      method: 'get'
    })
  }
}
