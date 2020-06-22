// 路由
var baseurl = 'http://gxtk.nxm.wanheweb.com'
var routers = {
  // 个人中心
  'register' : baseurl + '/api/User/register', //注册
  'login' : baseurl + '/api/User/login', //登录
  'resetpwdByEmail' : baseurl + '/api/User/resetpwdByEmail', // 找回密码
  'logout' : baseurl + '/api/User/logout', //退出登录
  'profile' : baseurl + '/api/User/profile', //[修改]个人信息
  'addFeedback' : baseurl + '/api/system/addFeedback', //提交意见反馈
  'getUserSubjectActivateList' : baseurl + '/addons/keeanswer/api.Test/getUserSubjectActivateList', // 兑换记录
  'getUserSubmitTestRecord' : baseurl + '/addons/keeanswer/api.Test/getUserSubmitTestRecord', // 考试记录
  'getUserPractiseRecord' : baseurl + '/addons/keeanswer/api.Test/getUserPractiseRecord', // 练习记录
  'getUserNoteRecord' : baseurl + '/addons/keeanswer/api.Test/getUserNoteRecord', // 笔记记录

  // 搜索
  'getHotSearch' : baseurl + '/api/System/getHotSearch', //获取热门搜索
  'search' : baseurl + '/api/System/search', // 搜索
  'getSingleItembankInfo' : baseurl + '/addons/keeanswer/api.Test/getSingleItembankInfo', // 获取单个题目详情

  // 课程相关
  'getList' : baseurl + '/addons/keeanswer/api.Subject/getList', // 获取[推荐]科目列表
  'getCourseList' : baseurl + '/addons/keeanswer/api.Course/getList', //获取课程列表
  'getCourseInfo' : baseurl + '/addons/keeanswer/api.Test/getCourseInfo', //获取课程详情
  'getItembankInfo' : baseurl + '/addons/keeanswer/api.Test/getItembankInfo', //获取试题
  'answer' : baseurl + '/addons/keeanswer/api.Test/answer', // 答题
  'getTestCard' : baseurl + '/addons/keeanswer/api.Test/getTestCard', // 获取答题卡
  'submitTest' : baseurl + '/addons/keeanswer/api.Test/submitTest', // 提交试卷
  'addNote' : baseurl + '/api/Note/addNote', // 添加笔记
  'getNoteList' : baseurl + '/api/Note/getNoteList', // 笔记列表
  'handleCollect' : baseurl + '/api/Collect/handle', // [取消]收藏
  'getCollectList' : baseurl + '/api/Collect/getCollectList', // 收藏列表
  'handleAnswerErrorRecord' : baseurl + '/addons/keeanswer/api.Test/handleAnswerErrorRecord', // 加入[移除]错题
  'addItembankCorrection' : baseurl + '/addons/keeanswer/api.User/addItembankCorrection', // 提交试题纠错
  'answerErrorRecordStatistics' : baseurl + '/addons/keeanswer/api.Test/answerErrorRecordStatistics', // 错题统计
  'getErrorRecordListByType' : baseurl + '/addons/keeanswer/api.Test/getAnswerRecordTypeErrorListByType', // 错题记录[列表]
  'getAnswerRecordTypeErrorList' : baseurl + '/addons/keeanswer/api.Test/getAnswerRecordTypeErrorList', // 获取错题-题目列表
  'deleteUserAllAnswerRecordTypeError' : baseurl + '/addons/keeanswer/api.Test/deleteUserAllAnswerRecordTypeError', // 删除所有错题

  // 设置
  'SystemNoticelist' : baseurl + '/api/SystemNotice/list', // 获取系统通知列表
  'SystemNoticeinfo' : baseurl + '/api/SystemNotice/info', // 获取系统通知详情
  'getHelpInfo' : baseurl + '/addons/keeanswer/api.Article/getHelpInfo', // 查看帮助
}

var ajax = function(option){
  var url = routers[option.url]
  api.ajax({
      url: url,
      method: 'post',
      data: {
        values : option.params
      }
  },function(ret, err){
      if (ret) {
        if(ret.code == 1){
          option.success(ret)
        }
        else{
          toast(ret.msg)
          option.fail(ret)
        }
      } else {
        if(err.statusCode == 401){
          setTimeout(function(){
            api.openWin({
              name: 'cloudLogin',
              url: 'widget://html/settings/clouds/cloud-login.html',
              pageParam: {}
            })
          },500)
        }
        option.fail(err)
      }
  });

}

var getajax = function(option){
  var url = routers[option.url]
  api.ajax({
      url: url,
      method: 'get',
      data: {
        values : option.params
      }
  },function(ret, err){
      if (ret) {
        if(ret.code == 1){
          option.success(ret)
        }
        else{
          toast(ret.msg)
          option.fail(ret)
        }
      } else {
        if(err.statusCode == 401){
          api.openWin({
            name: 'cloudLogin',
            url: 'widget://html/settings/clouds/cloud-login.html',
            pageParam: {}
          })
        }
        // console.log(JSON.stringify(err));
        // if(err.code == 40010){
        //   console.log(err.code);
        //   console.log(1);
        //   api.closeWin();
        // }
        option.fail(err)
      }
  });

}
