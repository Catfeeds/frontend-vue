/* eslint-disable no-undef */
var ehdNativeApp = {}

// iOS 回调
function setupWebViewJavascriptBridge (callback) {
  var u = navigator.userAgent
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isiOS) {
    // 只在第一次调用时不执行，为了防止重复加载 WebViewJavascriptBridge_JS.m
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge)
    }

    // 保存 callback
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]

    // 开启一个 iframe，加载这段 URL 'wvjbscheme://__BRIDGE_LOADED__'
    // 其目的是为了触发 WebViewJavascriptBridge_JS.m 文件内容的加载
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(
      function () {
        document.documentElement.removeChild(WVJBIframe)
      },
      0)
  }
}

// ios注册
setupWebViewJavascriptBridge(function (bridge) {
  var u = navigator.userAgent
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isiOS) {
    /* Initialize your app here */
    var handlerNames = new Array('getEhdUserInfo')
    for (var i in handlerNames) {
      var handlerName = handlerNames[i]
      ehdNativeApp[handlerName] = (function (tempHandlerName) {
        return function (data, callback) {
          if (typeof data === 'function') { // 意味着没有参数 data，只有一个参数 callback
            bridge.callHandler(tempHandlerName, null, data)
          } else if (callback == null) { // 第二个参数 callback 为 null 或者只有第一个参数 data
            bridge.callHandler(tempHandlerName, data)
          } else { // 两个参数都有
            bridge.callHandler(tempHandlerName, data, callback)
          }
        }
      }(handlerName))
    };
  }
})

// 安卓注册
connectWebViewJavascriptBridge(function (bridge) {
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
  if (isAndroid) {
    bridge.init(function (message, responseCallback) {
      if (responseCallback) {
        responseCallback(message)
      }
    })
    bridge.registerHandler('getEhdUserInfo', function (data, responseCallback) {
      if (responseCallback) {
        responseCallback(responseData)
      }
    })
  }
})

// 安卓回调
function connectWebViewJavascriptBridge (callback) {
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
  if (isAndroid) {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function () {
          callback(WebViewJavascriptBridge)
        },
        false
      )
    }
  }
}

export default {
  callhandler (name, data, callback) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler(name, data, callback)
    })
  },
  registerhandler (name, callback) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.registerHandler(name, function (data, responseCallback) {
        callback(data, responseCallback)
      })
    })
  },
  callAndriodHandler (name, data, callback) {
    connectWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler(name, data, callback)
    })
  }
}
