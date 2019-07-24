import request from '@/util/request'

const group_name = 'forum';
export default {
  getList() {
    return request({
      url: `/${group_name}/list`,
      method: 'get'
    })
  },
  postIssue(studentid, title, content) {
    return request({
      url: `/${group_name}/issue`,
      method: 'post',
      data: {
        "studentid": studentid,
        "title": title,
        "content": content
      }
    })
  },
  postReply(studentid, issueid, issuetitle, replycontent) {
    return request({
      url: `/${group_name}/reply`,
      method: 'post',
      data: {
        "studentid": studentid,
        "issueid": title,
        "issuetitle": issuetitle,
        "replycontent": replycontent
      }
    })
  },
  getMyIssue(studentid) {
    return request({
      url: `/${group_name}/myIssue`,
      method: 'get',
      data: {
        studentid: studentid
      }
    })
  },
  getMyReply(studentid) {
    return request({
      url: `/${group_name}/myReply`,
      method: 'get',
      data: {
        studentid: studentid
      }
    })
  },
  getIssueDetail(issueid) {
    return request({
      url: `/${group_name}/issueDetail`,
      method: 'get',
      data: {
        issueid: issueid
      }
    })
  }
}
