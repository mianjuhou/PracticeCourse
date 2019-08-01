import request from '@/util/request'

const group_name = 'task';
export default {
  getUnaccomplished(userid, page, pageSize) {
    return request({
      url: `/${group_name}/unaccomplished/`,
      method: 'post',
      data: {
        userid: userid,
        page: page,
        page_size: pageSize
      }
    })
  },
  getAccomplished(userid, page, pageSize) {
    return request({
      url: `/${group_name}/accomplished/`,
      method: 'post',
      data: {
        userid: userid,
        page: page,
        page_size: pageSize
      }
    })
  },
  getUnaccomplishedid(userid, name) {
    return request({
      url: `/${group_name}/unaccomplishedid/`,
      method: 'post',
      data: {
        userid: userid,
        name: name
      }
    })
  },
}
