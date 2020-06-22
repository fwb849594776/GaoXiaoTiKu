// 打开win页面
Vue.prototype.goW = function(name, url, params = {}, auth = 0, isback = true, isload = false) {
        if (isNull(name) || isNull(url)) {
            return false
        }

        //是否要登录 拦截

        if(auth == 1){
          var token = $api.getStorage('token');
          // console.log(key)
          if(isNull(token)){
            api.openWin({
              name: 'cloudLogin',
              url: 'widget://html/settings/clouds/cloud-login.html',
              pageParam: {}
            })
            return false
          }
        }

        //不登录直接跳
        api.openWin({
            name: name,
            url: url,
            pageParam: params,
            slidBackEnabled: isback,
            slidBackType: 'edge',
            load: isload,
        })

}
// 关闭win页面
Vue.prototype.back = function() {
        api.closeWin();
    }
Vue.prototype.closeTo = function(name){
  api.closeToWin({
      name: name
  });
}

// 设置全局变量
var setGlobalDataFn = function(key = '',value = ''){
  api.setGlobalData({
      key: key,
      value: value
  });
}
// 获取全局变量
var getGlobalDataFn = function(key = ''){
  var result = api.getGlobalData({key: key})
  return result
}
// 设置本地缓存
var setStorageFn = function(data = []){
  data.forEach(item=>{
    $api.setStorage(item.key,item.value);
  })
}
// 获取缓存数据
var getStorageFn = function(key){
  var result = $api.getStorage(key);
  return result
}
// 清除本地缓存
var removeStorageFn = function(data = []){
    data.forEach(item=>{
      $api.rmStorage(item)
    })
}
//  发送事件
var sends = function(name = '',params = {}){
  api.sendEvent({
      name: name,
      extra: params
  });
}
// 事件监听
var listener = function(name,callback){
  api.addEventListener({
      name: name
  }, function(ret, err){
      if( ret ){
           callback(ret)
      }else{
           callback(err)
      }
  });

}

//打开frame页面
var goF = function(name, url, params = {}, x = 0, y = 0, w = 'auto', h = 'auto', auth = 0, isload = true, bgColor = '#ffffff',animation = {type:"none",subType:"",duration:0}) {
        if (isNull(name) || isNull(url)) {
            return false
        }

        //是否要登录 拦截
        if (auth == 1) {
            var token = getStorageFn('token');
            if (isNull(token)) {
                api.openWin({
                    name: 'login',
                    url: 'widget://html/settings/clouds/cloud-login.html'
                })
                return false
            }
            params['token'] = token
        }

        api.openFrame({
            name: name,
            url: url,
            rect: {
                x: x,
                y: y,
                w: w,
                h: h
            },
            bgColor: bgColor,
            pageParam: params,
            animation: animation,
            slidBackEnabled: false, //左划返回
            slidBackType: 'edge', //边缘划
            reload: isload, //刷新数据
        })
    }
    // 关闭frame页面
var closeF = function(name) {
    api.closeFrame({
        name: name
    });
}

var setHeader = function(option = {}, type = 'white') {
    var header = $api.dom(".headerInner")
    $api.css(header, 'height:' + (api.safeArea.top + (api.winWidth / 100) * 12) + 'px')
    api.openFrame({
        name: 'header',
        url: 'widget://html/components/childHeader.html',
        rect: {
            x: 0,
            y: 0,
            w: api.winWidth,
            h: api.safeArea.top + (api.winWidth / 100) * 12
        },
        bounces: false,
        bgColor: '#ffffff',
        // bgColor: type == 'white' ? '#ffffff' : '#000000',
        pageParam: option
    })
    api.setStatusBarStyle({
        style: type == 'white' ? 'dark' : 'light'
    });
}

//是否为空
var isNull = function(name) {
    if (name == '' || name == null || name == 'undefined') {
        return true
    } else {
        return false
    }
}

// 夜间模式与普通模式主题颜色变量
var themes = {
        bgNormalColor: '#1e64c1',
        bgDarkColor: 'rgba(0,0,0,1)',
        // 列表颜色
        bgListColor: '#222222',
        textListColor: '#ffffff',
        // 边框色
        borderDarkColor: '#2a2a2a',
        //  页面两种底色
        bgPageNormalColor: '#f6f6f6',
        bgPageNormalColor2: '#ffffff',

        bgPageDarkColor: 'rgba(0,0,0,1)'
    }
    //
// 设置元素背景颜色  -- 主要用来设置页面颜色以及头部
var setBgColor = function(el, type, page, page2) {
    if (page == 'page') {
        if (type == 'dark') {
            $api.css(el, 'background:' + themes.bgPageDarkColor)
        } else {
            if (page2) {
                $api.css(el, 'background:' + themes.bgPageNormalColor2)
            } else {
                $api.css(el, 'background:' + themes.bgPageNormalColor)
            }
        }
    } else {
        if (type == 'dark') {
            $api.css(el, 'background:' + themes.bgDarkColor)
        } else {
            $api.css(el, 'background:' + themes.bgNormalColor)
        }
    }
}

// 设置页面内列表颜色  --color参数存在仅设置字体颜色
var setTextColor = function(el, type, color) {
      if (type == 'dark') {
        if(!color){
          $api.css(el, 'background:' + themes.bgListColor)
        }
        $api.css(el, 'color:' + themes.textListColor)
      } else {
        $api.css(el, 'background:' + '')
        $api.css(el, 'color:' + '')
      }
}

// 设置边框色
var setBorderColor = function(el,type,bgColor){
  if (type == 'dark') {
    $api.css(el, 'border-color:' + themes.borderDarkColor)
    $api.css(el, 'background:' + (bgColor ? bgColor : themes.bgListColor))
    $api.css(el, 'color:' + (bgColor ? '#ffffff' : ''))
  } else {
    $api.css(el, 'border-color:' + '')
    $api.css(el, 'background:' + '')
  }
}

// 设置大多数列表夜间模式
var setCommonListDark = function(type){
  var [html, ul, lis, normalColor] = [$api.dom('html'), $api.dom('ul'), $api.domAll('li'), $api.domAll('.normal-color')]
  setBgColor(html,type,'page')
  setTextColor(ul,type)
  lis.forEach(item=>{
    setBorderColor(item,type)
  })
  normalColor.forEach(item=>{
    setTextColor(item,type)
  })
}

// 时间差定时器
var getduration = function(time) {
    function add0(m) {
        return m < 10 ? '0' + m : m
    }
    var nowTime = new Date().getTime();
    var startTime = new Date(time * 1000).getTime();
    var duration = startTime - nowTime;
    var d = add0(Math.floor(duration / (24 * 3600 * 1000)));
    var h = add0(Math.floor((duration % (24 * 3600 * 1000)) / (3600 * 1000)));
    var m = add0(Math.floor((duration % (24 * 3600 * 1000) % (3600 * 1000)) / (60 * 1000)));
    var s = add0(Math.round((duration % (24 * 3600 * 1000) % (3600 * 1000) % (60 * 1000)) / 1000));
    var result = {
        d: d,
        h: h,
        m: m,
        s: s
    };
    return result;
}

var getTime = function(date) {
    var date = new Date(date); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    return Y + M + D;
}

// 选择图片
var pushImg = function(sourceType,callback){
  api.getPicture({
      sourceType: sourceType,
      encodingType: 'jpg',
      mediaValue: 'pic',
      destinationType: 'url',
      allowEdit: true,
      quality: 80,
      saveToPhotoAlbum: false
  }, function(ret, err) {
      if (ret) {
          var path = ret.data
          callback(path)
      } else {
          alert(JSON.stringify(err));
      }
  });
}

// 下拉刷新
var refresh = function(bgColor = '#f6f6f6',textColor = '#333333',callback){
  api.setRefreshHeaderInfo({
      visible: true,
      loadingImg: 'widget://image/refresh.png',
      bgColor: bgColor,
      textColor: textColor,
      textDown: '下拉刷新...',
      textUp: '松开刷新...',
      showTime: 'false'
  }, function(ret, err){
    callback(ret)
  });
}

// 弹出层
var toast = function(msg){
  api.toast({
      msg: msg,
      duration: 2000,
      location: 'center'
  });
}
