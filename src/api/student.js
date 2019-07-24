import request from '@/util/request'

const group_name = 'student';
export default {
  getUser() {
    return request({
      url: `/${group_name}/getuser`,
      method: 'get'
    })
  },
  getSability(userid) {
    return request({
      url: `/${group_name}/sability/`,
      method: 'post',
      data: {
        userid: userid
      }
    })
  },
  getAvgability(userid) {
    return request({
      url: `/${group_name}/avgability/`,
      method: 'post',
      data: {
        userid: userid
      }
    })
  },
  getTotalinfo(userid) {
    return request({
      url: `/${group_name}/totalinfo/`,
      method: 'post',
      data: {
        userid: userid
      }
    })
  },
  getExaminfo(userid, num, date) {
    return request({
      url: `/${group_name}/exam/`,
      method: 'post',
      data: {
        userid: userid,
        num: num,
        date: date
      }
    })
  },
  getRank(userid, names) {
    return request({
      url: `/${group_name}/rank/`,
      method: 'post',
      data: {
        userid: userid,
        name: names,
      }
    })
  },
}
