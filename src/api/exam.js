import request from '@/util/request'

const group_name = 'exam';
export default {
  getOptionalid(pojo) {
    return request({
      url: `/${group_name}/optionalid/`,
      method: 'post',
      data: pojo
    })
  },
  getRecommendid(userid) {
    return request({
      url: `/${group_name}/recommendid/`,
      method: 'post',
      data: {
        userid: userid
      }
    })
  },
  getOptionalContent(id) {
    return request({
      url: `/${group_name}/optionalContent`,
      method: 'get',
      data: {
        id: id
      }
    })
  },
  search(userId) {
    return request({
      url: `/${group_name}/search/`,
      method: 'post',
      data: {
        userid: userId
      }
    })
  },
  getExaminfo(userId, name) {
    return request({
      url: `/${group_name}/examInfo/`,
      method: 'post',
      data: {
        userid: userId,
        name: name
      }
    })
  },
  getExamDetail(userId, name) {
    return request({
      url: `/${group_name}/examDetail/`,
      method: 'post',
      data: {
        userid: userId,
        name: name
      }
    })
  },
  getUpdateExaminfo(pojo) {
    return request({
      url: `/${group_name}/updateExaminfo/`,
      method: 'post',
      data: pojo
    })
  },
}
