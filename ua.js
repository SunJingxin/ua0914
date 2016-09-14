(function(){
    /*
     * 使用方法：
     *  一、引入ua.js
     *  二、直接调用 MobilePort 对象的属性与方法。
     * 
     * MobilePort 对象
     * 属性：MobilePort.back;// 数组 内容如下
     * 方法：MobilePort.androidBrowser(callBack)          安卓浏览器   //callBack 回调只有在安卓浏览器下执行
     * 方法：MobilePort.iosBrowser(callBack)              ios浏览器    // 下面全部类似
     * 方法：MobilePort.qqBrowser(callBack)               QQ浏览器     
     * 方法：MobilePort.ucBrowser(callBack)               uc浏览器     
     * 方法：MobilePort.wxBrowser(callBack)               微信浏览器   
     * 方法：MobilePort.pc(callBack)                      pc浏览器    
     * 方法：MobilePort.move(callBack)                    移动浏览器  
     * 方法：MobilePort.androidApp(callBack, parameter)   安卓APP  
     * 方法：MobilePort.iosApp(callBack, parameter)       iosApp  
     * 
     * callBack 是回调函数，在指定环境下执行的函数。
     * parameter 是url上的参数，用于识别APP与Browser(必须)，字符串。
     * 例如 www.baidu.com?from=app  parameter 指 from=app
     * from=app 是前后端约定好的指代 App请求的网页。
     * 
     * back数组中可能的值：内核、浏览器、移动端平台、pc端平台 、其他
     * webkit Trident Presto Gecko         //内核                              webkit内核    Trident内核    Presto内核   Gecko内核
     * IE chrome firefox opera safari      //浏览器                         IE浏览器   chrome浏览器   firefox浏览器   opera浏览器  safari浏览器
     * UCBrowser MQQBrowser                //浏览器                          UC浏览器     QQ浏览器 
     * android ipad iphone                 //移动端平台                   android平台    ipad平台    iphone平台  
     * Mac windows Linux                   //pc端平台                     Mac平台        windows平台     Linux平台 
     * move  wx                            //其他                              move移动端平台     wx微信浏览器 
     */
 
    /*
     * 正则赋值  内核
     */
    // webkit 内核
    var webkit = /webkit/i;
    //IE内核 
    var Trident = /Trident/i;
    //opera内核 
    var Presto = /Presto/i;
    //火狐内核 
    var Gecko = /Gecko/i;
    /*
     * 正则赋值  浏览器
     */
    // chrome 浏览器
    var chrome1 = /chrome\/(\d+\.\d+)/i;
    // firefox 浏览器
    var firefox = /firefox\/(\d+\.\d+)/i;
    // opera 浏览器
    var opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i;
    // safari 浏览器
    var safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i;
    // IE 浏览器
    var IE = /msie (\d+\.\d+)/i;
    // UC 浏览器
    var UCBrowser = /UCBrowser/i;
    //QQ浏览器
    var MQQBrowser = /MQQBrowser/i;
    /*
     * 正则赋值  pc端
     */
    // macintosh 系统
    var Mac = /macintosh/i;
    // windows 平台
    var windows = /windows/i;
    // Linux 平台
    var Linux = /Linux/i;
    /*
     * 正则赋值  移动端
     */
    // android 系统
    var android = /android/i;
    // ipad 系统
    var ipad = /ipad/i;
    // iphone 系统
    var iphone = /iphone/i;
    /*
     * 正则赋值  其他
     */
    // 移动终端
    var move =
        /(nokia|iphone|android|ipad|motorola|^mot\-|softbank|foma|docomo|kddi|up\.browser|up\.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam\-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte\-|longcos|pantech|gionee|^sie\-|portalmmm|jig\s browser|hiptop|^ucweb|^benq|haier|^lct|opera\s*mobi|opera\*mini|320x320|240x320|176x220)/i;
    // 微信打开
    var wx = /MicroMessenger/i;
    var back = [];
    var ua = navigator.userAgent;
    //内核判断
    if (webkit.test(ua)) { //webkit
        back.push("webkit");
    };
    if (Trident.test(ua)) { //IE
        back.push("Trident");
    };
    if (Presto.test(ua)) { //欧朋
        back.push("Presto");
    };
    if (Gecko.test(ua)) { //火狐
        back.push("Gecko");
    };
    //浏览器 判断
    if (IE.test(ua)) {
        back.push("IE");
    };
    if (chrome1.test(ua)) {
        back.push("chrome");
    };
    if (firefox.test(ua)) {
        back.push("firefox");
    };
    if (opera.test(ua)) {
        back.push("opera");
    };
    if (safari.test(ua)) {
        back.push("safari");
    };
    if (UCBrowser.test(ua)) {
        back.push("UCBrowser");
    };
    if (MQQBrowser.test(ua)) {
        back.push("MQQBrowser");
    };
    //pc 平台判断
    if (Mac.test(ua)) {
        back.push("Mac");
    };
    if (windows.test(ua)) {
        back.push("windows");
    };
    if (Linux.test(ua)) {
        back.push("Linux");
    };
    //移动平台 判断
    if (android.test(ua)) {
        back.push("android");
    };
    if (ipad.test(ua)) {
        back.push("ipad");
    };
    if (iphone.test(ua)) {
        back.push("iphone");
    };
    //其他
    if (move.test(ua)) {
        back.push("move");
    };
    if (wx.test(ua)) {
        back.push("wx");
    };
    MobilePort = {};
    //back 包含所有信息
    MobilePort.back = back;
    //android 浏览器
    MobilePort.androidBrowser = function (callBack) {
        if (android.test(ua)) {
            callBack();
        } else {
            return "error";
        }
    };
    //ios 浏览器
    MobilePort.iosBrowser = function (callBack) {
        if (ipad.test(ua) || iphone.test(ua)) {
            callBack();
        } else {
            return "error";
        }
    };
    // QQ 浏览器
    MobilePort.qqBrowser = function (callBack) {
        if (MQQBrowser.test(ua)) {
            callBack();
        } else {
            return "error";
        }
    };
    // UC 浏览器
    MobilePort.ucBrowser = function (callBack) {
        if (UCBrowser.test(ua)) {
            callBack();
        } else {
            return "error";
        }
    };
    // 微信打开
    MobilePort.wxBrowser = function (callBack) {
        if (wx.test(ua)) {
            callBack();
        } else {
            return "error";
        }
    };
    // androidApp     
    MobilePort.androidApp = function (callBack, parameter) {
        var oUrl = location.search;
        var tc = new RegExp(parameter);
        if (android.test(ua) && tc.test(oUrl)) {
            callBack();
        } else {
            return "error";
        }
    };
    //iosApp
    MobilePort.iosApp = function (callBack, parameter) {
        var oUrl = location.search;
        var tc = new RegExp(parameter);
        if ((ipad.test(ua) || iphone.test(ua)) && tc.test(oUrl)) {
            callBack();
        } else {
            return "error";
        }
    };
    // pc 平台
    MobilePort.pc = function (callBack) {
        if (Linux.test(ua) || windows.test(ua) || Mac.test(ua)) {
            callBack();
        } else {
            return "error";
        }
    }
    //移动平台
    MobilePort.move = function (callBack) {
        if (move.test(ua)) {
            callBack();
        } else {
            return "error";
        }
    }
})();