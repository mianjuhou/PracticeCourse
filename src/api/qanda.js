import request from '@/util/request'

const group_name = 'qanda';
export default {
  getDefault() {
    return request({
      url: `/${group_name}/default/`,
      method: 'post',
      data: {}
    })
  },
  getQuestion(question) {
    return request({
      url: `/${group_name}/question/`,
      method: 'post',
      data: {
        question: question
      }
    })
  },
}
