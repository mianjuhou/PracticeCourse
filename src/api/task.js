import request from '@/util/request'

const group_name = 'task';
export default {
  getUnaccomplished(page, pageSize) {
    return request({
      url: `/${group_name}/unaccomplished/`,
      method: 'post',
      data: {
        userid: this.$store.getters.getUserId,
        page: page,
        page_size: pageSize
      }
    })
  },
  getAccomplished(page, pageSize) {
    return request({
      url: `/${group_name}/accomplished/`,
      method: 'post',
      data: {
        userid: this.$store.getters.getUserId,
        page: page,
        page_size: pageSize
      }
    })
  },
  getUnaccomplishedid(name) {
    return request({
      url: `/${group_name}/unaccomplishedid/`,
      method: 'get',
      data: {
        userid: this.$store.getters.getUserId,
        name: name
      }
    })
  },
}
