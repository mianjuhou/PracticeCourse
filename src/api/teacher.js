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
  getHomework(userid, username, name, teacher) {
    return request({
      url: `/${group_name}/homework/`,
      method: 'post',
      data: {
        userid: userid,
        username: username,
        name: name,
        teacher: teacher
      }
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
  getDistribution(userid, username, name) {
    return request({
      url: `/${group_name}/distribution/`,
      method: 'post',
      data: {
        userid: userid,
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
}
