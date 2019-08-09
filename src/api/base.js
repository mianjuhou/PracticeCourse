import request from '@/util/request'

export default {
  getallrecommendcontent(pojo) {
    return request({
        url: `/getallrecommendcontent/`,
        method: 'post',
        data: {"questions_id": pojo},
      }
    )
  },
  getRecommendid(pojo) {
    return request({
      url: `/${group_name}/recommendid`,
      method: 'post',
      data: pojo
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
  }
  ,

}
