/*!
* bsCustomFileInput v1.3.4 (https://github.com/Johann-S/bs-custom-file-input)
* Copyright 2018 - 2020 Johann-S <johann.servoire@gmail.com>
* Licensed under MIT (https://github.com/Johann-S/bs-custom-file-input/blob/master/LICENSE)
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).bsCustomFileInput=t()}(this,function(){"use strict";var s={CUSTOMFILE:'.custom-file input[type="file"]',CUSTOMFILELABEL:".custom-file-label",FORM:"form",INPUT:"input"},l=function(e){if(0<e.childNodes.length)for(var t=[].slice.call(e.childNodes),n=0;n<t.length;n++){var l=t[n];if(3!==l.nodeType)return l}return e},u=function(e){var t=e.bsCustomFileInput.defaultText,n=e.parentNode.querySelector(s.CUSTOMFILELABEL);n&&(l(n).textContent=t)},n=!!window.File,r=function(e){if(e.hasAttribute("multiple")&&n)return[].slice.call(e.files).map(function(e){return e.name}).join(", ");if(-1===e.value.indexOf("fakepath"))return e.value;var t=e.value.split("\\");return t[t.length-1]};function d(){var e=this.parentNode.querySelector(s.CUSTOMFILELABEL);if(e){var t=l(e),n=r(this);n.length?t.textContent=n:u(this)}}function v(){for(var e=[].slice.call(this.querySelectorAll(s.INPUT)).filter(function(e){return!!e.bsCustomFileInput}),t=0,n=e.length;t<n;t++)u(e[t])}var p="bsCustomFileInput",m="reset",h="change";return{init:function(e,t){void 0===e&&(e=s.CUSTOMFILE),void 0===t&&(t=s.FORM);for(var n,l,r=[].slice.call(document.querySelectorAll(e)),i=[].slice.call(document.querySelectorAll(t)),o=0,u=r.length;o<u;o++){var c=r[o];Object.defineProperty(c,p,{value:{defaultText:(n=void 0,n="",(l=c.parentNode.querySelector(s.CUSTOMFILELABEL))&&(n=l.textContent),n)},writable:!0}),d.call(c),c.addEventListener(h,d)}for(var f=0,a=i.length;f<a;f++)i[f].addEventListener(m,v),Object.defineProperty(i[f],p,{value:!0,writable:!0})},destroy:function(){for(var e=[].slice.call(document.querySelectorAll(s.FORM)).filter(function(e){return!!e.bsCustomFileInput}),t=[].slice.call(document.querySelectorAll(s.INPUT)).filter(function(e){return!!e.bsCustomFileInput}),n=0,l=t.length;n<l;n++){var r=t[n];u(r),r[p]=void 0,r.removeEventListener(h,d)}for(var i=0,o=e.length;i<o;i++)e[i].removeEventListener(m,v),e[i][p]=void 0}}});;/*!
* clipboard.js v2.0.6
* https://clipboardjs.com/
*
* Licensed MIT © Zeno Rocha
*/
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ClipboardJS=e():t.ClipboardJS=e()}(this,function(){return o={},r.m=n=[function(t,e){t.exports=function(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var o=window.getSelection(),r=document.createRange();r.selectNodeContents(t),o.removeAllRanges(),o.addRange(r),e=o.toString()}return e}},function(t,e){function n(){}n.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var o=this;function r(){o.off(t,r),e.apply(n,arguments)}return r._=e,this.on(t,r,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,r=n.length;o<r;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],r=[];if(o&&e)for(var i=0,a=o.length;i<a;i++)o[i].fn!==e&&o[i].fn._!==e&&r.push(o[i]);return r.length?n[t]=r:delete n[t],this}},t.exports=n,t.exports.TinyEmitter=n},function(t,e,n){var d=n(3),h=n(4);t.exports=function(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!d.string(e))throw new TypeError("Second argument must be a String");if(!d.fn(n))throw new TypeError("Third argument must be a Function");if(d.node(t))return s=e,f=n,(u=t).addEventListener(s,f),{destroy:function(){u.removeEventListener(s,f)}};if(d.nodeList(t))return a=t,c=e,l=n,Array.prototype.forEach.call(a,function(t){t.addEventListener(c,l)}),{destroy:function(){Array.prototype.forEach.call(a,function(t){t.removeEventListener(c,l)})}};if(d.string(t))return o=t,r=e,i=n,h(document.body,o,r,i);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");var o,r,i,a,c,l,u,s,f}},function(t,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},function(t,e,n){var a=n(5);function i(t,e,n,o,r){var i=function(e,n,t,o){return function(t){t.delegateTarget=a(t.target,n),t.delegateTarget&&o.call(e,t)}}.apply(this,arguments);return t.addEventListener(n,i,r),{destroy:function(){t.removeEventListener(n,i,r)}}}t.exports=function(t,e,n,o,r){return"function"==typeof t.addEventListener?i.apply(null,arguments):"function"==typeof n?i.bind(null,document).apply(null,arguments):("string"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,function(t){return i(t,e,n,o,r)}))}},function(t,e){if("undefined"!=typeof Element&&!Element.prototype.matches){var n=Element.prototype;n.matches=n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector}t.exports=function(t,e){for(;t&&9!==t.nodeType;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}},function(t,e,n){"use strict";n.r(e);var o=n(0),r=n.n(o),i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function a(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function c(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,c),this.resolveOptions(t),this.initSelection()}var l=(function(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),t}(c,[{key:"resolveOptions",value:function(t){var e=0<arguments.length&&void 0!==t?t:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=r()(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=r()(this.target),this.copyText()}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),document.activeElement.blur(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(t){var e=0<arguments.length&&void 0!==t?t:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":i(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),c),u=n(1),s=n.n(u),f=n(2),d=n.n(f),h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p=function(t,e,n){return e&&y(t.prototype,e),n&&y(t,n),t};function y(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var m=(function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(v,s.a),p(v,[{key:"resolveOptions",value:function(t){var e=0<arguments.length&&void 0!==t?t:{};this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText,this.container="object"===h(e.container)?e.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=d()(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return b("action",t)}},{key:"defaultTarget",value:function(t){var e=b("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return b("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(t){var e=0<arguments.length&&void 0!==t?t:["copy","cut"],n="string"==typeof e?[e]:e,o=!!document.queryCommandSupported;return n.forEach(function(t){o=o&&!!document.queryCommandSupported(t)}),o}}]),v);function v(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,v);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(v.__proto__||Object.getPrototypeOf(v)).call(this));return n.resolveOptions(e),n.listenClick(t),n}function b(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}e.default=m}],r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=6).default;function r(t){if(o[t])return o[t].exports;var e=o[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}var n,o});;
/*!
* JavaScript for Bootstrap's docs (https://getbootstrap.com/)
* Copyright 2011-2021 The Bootstrap Authors
* Copyright 2011-2021 Twitter, Inc.
* Licensed under the Creative Commons Attribution 3.0 Unported License.
* For details, see https://creativecommons.org/licenses/by/3.0/.
*/
(function($){
  'use strict'
  $(function(){
    const $elements = $.find('*[data-include-html]');
    if ($elements.length) {
      Html.include(uiInit);
    } else {
      uiInit();
    }
  })

  var uiInit = function(){
    bootstrapEvt();
    device.check();
    common.init();
    Html.include();
    form.init();
    table.init();

    $(window).scroll();
  }

  var bootstrapEvt = function(){
    $('.bd-content [href="#"]').click(function(e){e.preventDefault()});
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="popover"]').popover();
    $('[data-toast]').click(function () {
      var tar = $(this).data('toast');
      $(tar).toast('show');
    });
      

    var clipboard = new ClipboardJS('.btn-clipboard',{
      target:function(trigger){
        return trigger.parentNode.nextElementSibling;
      }
    });
    clipboard.on('success',function(e){
      $(e.trigger).attr('title','Copied!').tooltip('_fixTitle').tooltip('show').attr('title','Copy to clipboard').tooltip('_fixTitle');
      e.clearSelection();
    });
    clipboard.on('error',function(e){
      var modifierKey=/mac/i.test(navigator.userAgent)?'\u2318':'Ctrl-';
      var fallbackMsg='Press '+modifierKey+'C to copy';
      $(e.trigger).attr('title',fallbackMsg).tooltip('_fixTitle').tooltip('show').attr('title','Copy to clipboard').tooltip('_fixTitle');
    });
    bsCustomFileInput.init();
  };

  //PC 디바이스 체크
  var isPC = {
    window: function(){
      return navigator.userAgent.match(/windows/i) == null ? false : true;},
    mac: function(){
      return navigator.userAgent.match(/macintosh/i) == null ? false : true;},
    chrome: function(){
      return navigator.userAgent.match(/chrome/i) == null ? false : true;},
    firefox: function(){
      return navigator.userAgent.match(/firefox/i) == null ? false : true;},
    opera: function(){
      return navigator.userAgent.match(/opera|OPR/i) == null ? false : true;},
    safari: function(){
      return navigator.userAgent.match(/safari/i) == null ? false : true;},
    edge: function(){
      return navigator.userAgent.match(/edge/i) == null ? false : true;},
    msie: function(){
      return navigator.userAgent.match(/rv:11.0|msie/i) == null ? false : true;},
    ie11: function(){
      return navigator.userAgent.match(/rv:11.0/i) == null ? false : true;},
    ie10: function(){
      return navigator.userAgent.match(/msie 10.0/i) == null ? false : true;},
    ie9: function(){
      return navigator.userAgent.match(/msie 9.0/i) == null ? false : true;},
    ie8: function(){
      return navigator.userAgent.match(/msie 8.0/i) == null ? false : true;},
    any: function(){
      return (isPC.window()|| isPC.mac());},
    check: function(){
      if(isPC.any()){
        if(isPC.window())$('html').addClass('window');
        if(isPC.mac())$('html').addClass('mac');
        if(isPC.msie())$('html').addClass('msie');
        if(isPC.ie11())$('html').addClass('ie11');
        if(isPC.ie10())$('html').addClass('ie10');
        if(isPC.ie9())$('html').addClass('ie9');
        if(isPC.ie8())$('html').addClass('ie8');
        if(isPC.edge()){
          $('html').addClass('edge');
        }else if(isPC.opera()){
          $('html').addClass('opera');
        }else if(isPC.chrome()){
          $('html').addClass('chrome');
        }else if(isPC.safari()){
          $('html').addClass('safari');
        }else if(isPC.firefox()){
          $('html').addClass('firefox');
        }
      }
    }
  };

  //모바일 디바이스 체크
  var isMobile = {
    Android: function(){
      return navigator.userAgent.match(/Android/i) == null ? false : true;
    },
    BlackBerry: function(){
      return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
    },
    iOS: function(){
      return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
    },
    iPhone :function(){
      return navigator.userAgent.match(/iPhone/i) == null ? false : true;
    },
    iPad :function(){
      return navigator.userAgent.match(/iPad/i) == null ? false : true;
    },
    iPhoneVersion :function(){
      var $sliceStart = navigator.userAgent.indexOf('iPhone OS') + 10,
          $sliceEnd = $sliceStart + 2,
          $version = parseFloat(navigator.userAgent.slice($sliceStart,$sliceEnd));
      return $version;
    },
    Opera: function(){
      return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
    },
    Windows: function(){
      return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
    },
    tablet: function(){
      if(isMobile.any()){
        if(window.screen.width < window.screen.height){
          return window.screen.width > 760 ? true : false;
        }else{
          return window.screen.height > 760 ? true : false;
        }
      }
    },
    any: function(){
      return (isMobile.Android() || isMobile.iOS() || isMobile.BlackBerry() || isMobile.Opera() || isMobile.Windows());
    },
    check: function(){
      if(isMobile.any()){
        $('html').addClass('mobile');
        if(isMobile.tablet())$('html').addClass('tablet');
      }
      if(isMobile.iOS())$('html').addClass('ios');
      if(isMobile.Android())$('html').addClass('android');
      //if(isMobile.iPhoneVersion() >= 12)$('html').addClass('ios12');
    }
  };

  //디바이스체크 실행
  var device = {
    iPhone8PlusH: 736,
    screenH:window.screen.height,
    screenW:window.screen.width,
    isIPhoneX: function () {
      $('html').addClass('iPhone-X');
    },
    notIPhoneX: function () {
      $('html').removeClass('iPhone-X');
    },
    check:function(){
      isMobile.check();
      isPC.check();
      if(isMobile.any()){
        var $pixelRatio = Math.round(window.devicePixelRatio);
        if(!!$pixelRatio) $('html').addClass('pixelRatio'+$pixelRatio);
      }
      var $isIPhoneX = isMobile.iPhone() && device.screenH > device.iPhone8PlusH ? true : false;
      if($isIPhoneX){
        //첫로딩
        if($(window).width() < $(window).height()){
          device.isIPhoneX();
        }else{
          device.notIPhoneX();
        }
      }

      //가로, 세로 회전시
      if(isMobile.any()){
        if(window.orientation == 0){
          $('html').removeClass('landscape');
        }else{
          $('html').addClass('landscape');
        }
        $(window).on('orientationchange',function(){
          if(window.orientation == 0){
            $('html').removeClass('landscape');
            if($isIPhoneX)device.isIPhoneX();
          }else{
            $('html').addClass('landscape');
            if($isIPhoneX)device.notIPhoneX();
          }
        });
      }
    }
  };

  var Html = {
    include: function (fn) {
      const $elements = $.find('*[data-include-html]');
      // const $fileName = location.pathname.split('/').pop();
      if ($elements.length) {
        // const $url = location.href;
        //if ($url.indexOf('http') >= 0) {
        if (location.host) {
        $.each($elements, function (i) {
          const $this = $(this);
          const $html = $this.data('include-html');
          const $htmlAry = $html.split('/');
          const $htmlFile = $htmlAry[$htmlAry.length - 1];
          const $docTitle = document.title;
          let $title = null;
          if ($docTitle.indexOf(' | ') > -1) {
          $title = $docTitle.split(' | ')[0];
          }
          $this.load($html, function (res, sta, xhr) {
          if (sta == 'success') {
              $this.children().unwrap();
          }
          if (i === $elements.length - 1) {
              if (!!fn) fn();
          }
          });
        });
        } else {
          if (!!fn) fn();
        }
      }
    }
  }
  var common = {
    init: function(){
      common.header();
      common.sidebar();
      common.menuActive();
      common.btnTop();
      common.pageTitle();
    },
    header: function(){
      $(document).on('click','.kb-navbar-btn, .kb-sidebar-close',function(e){
        e.preventDefault();
        var sideBar = $('.kb-sidebar')
        if(sideBar.hasClass('open')){
          sideBar.removeClass('open');
          $('body').removeClass('gnb-open')
        }else{
          sideBar.addClass('open');
          $('body').addClass('gnb-open')
          var dep1Active = $('.kb-lnb-dep1>.active');
          if(dep1Active.length){
            dep1Active.addClass('open').siblings().removeClass('open');
          }else{
            $('.kb-lnb-dep1>li').first().addClass('open').siblings().removeClass('open');
          }
        }
      });
    },
    sidebar: function(){
      $(document).on('click','.kb-lnb-dep2 .kb-lnb-link.in-sub',function(e){
        e.preventDefault();
        var $this = $(this);
        var $subMenu = $this.next()
        if($this.hasClass('open')){
          $this.removeClass('open');
          $subMenu.stop(true, false).slideUp(300);
        }else{
          $this.addClass('open');
          $subMenu.stop(true, false).slideDown(300);
          // $this.parent().siblings().find('>.open').each(function(){
          //     var $open = $(this)
          //     $open.removeClass('open');
          //     $open.next().stop(true, false).slideUp(300);
          // });
        }
      });

      $(document).on('click','.kb-lnb-dep1>li>.kb-lnb-link',function(e){
        e.preventDefault();
        $(this).parent().addClass('open').siblings().removeClass('open');
      });
    },
    menuActive: function(){
      if($('.kb-sidebar').length){
        var $link = $('.kb-lnb-dep2 .kb-lnb-link');
        var $path = location.pathname;
        var $title = $('.kb-title h1').text();
        var isActiveOn = false;
        $link.each(function(){
          var $this = $(this);
          var $text = $this.text();
          var $href = $this.attr('href').split('/').pop();
          if($this.next().length){
            $this.addClass('in-sub');
            $this.addClass('open');
            $this.next().show();
          }
          if(!isActiveOn){
            var isActive = false;
            if($path.indexOf($href) > -1){
              isActive = true;
            }else if($text === $title){
              isActive = true;
            }

            if(isActive){;
              isActiveOn = true;
              $this.parents('li').addClass('active');
            }
          }
        });

        var dep1Active = $('.kb-lnb-dep1>.active');
        var lnbTit = dep1Active.children('.kb-lnb-link').text();
        if(lnbTit !== ''){
          $('.kb-sidebar').removeClass('hide');
          $('.kb-footer').removeClass('full');
          $('.kb-navbar-nav .nav-link').each(function(){
            var $this = $(this);
            var $text = $this.text();
            if(lnbTit === $text){
              $this.addClass('active');
            }
          });
        }else{
          $('.kb-sidebar').addClass('hide');
          $('.kb-footer').addClass('full');
        }
      }
    },
    btnTop: function(){
      var settings = {
          button:'#btnTop',
          text:'컨텐츠 상단으로 이동',
          min:100,
          onClass:'on',
          hoverClass:'hover',
          scrollSpeed:300
      };
      var btnHtml = '<a href="#" id="'+settings.button.substring(1)+'" class="btn-scl-top" title="'+settings.text+'" role="button" aria-label="'+settings.text+'"><i class="bi bi-arrow-up-short"></i></a>';
      if(!$(settings.button).length){
        $('body').append(btnHtml);
    
        $(document).on('click',settings.button,function(e){
          e.preventDefault();
          $('html, body').animate({scrollTop:0},settings.scrollSpeed);
        }).on('mouseenter',function(){
          $(settings.button).addClass(settings.hoverclass);
        }).on('mouseleave',function(){
          $(settings.button).removeClass(settings.hoverClass);
        });

        var btnTopOn = function(){
          $(settings.button).attr('aria-hidden','false').addClass(settings.onClass);
        };

        var btnTopOff = function(){
          $(settings.button).attr('aria-hidden','true').removeClass(settings.onClass);
        };			

        $(window).on('scroll',function(){
          var $SclTop = $(this).scrollTop();
          if($SclTop > settings.min){
            btnTopOn();
          }else{
            btnTopOff();
          }
        });
      }
    },
    pageTitle: function(){
        $(window).scroll(function(){
            var $SclTop = $(this).scrollTop();
            var $title = $('.kb-page-title');
            if($title.length){
                var $titleTop = $title.offset().top;
                var $headH = $('.kb-navbar').outerHeight();
                if($SclTop > ($titleTop - $headH)){
                    $title.addClass('fixed')
                }else{
                    $title.removeClass('fixed')
                }
            }
        });
    }
  }

  var form = {
    init:function(){
      form.datepicker();
    },
    datepicker: function(){
      if($('.bs-datepicker').length){
        $('.bs-datepicker').each(function(){
          $(this).datepicker({
            language: 'ko',
            format: 'yyyy/mm/dd',
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
          }).on('changeDate',function(e){
            console.log('날짜선택')
          });
        });
      }
      if($('.input-daterange').length){
        $('.input-daterange').each(function() {
          $(this).datepicker({
            language: 'ko',
            format: 'yyyy/mm/dd',
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
          });
        });
      }
    }
  }

  var table = {
      init:function(){
        table.checkbox();
      },
      checkbox:function(){
        $(document).on('change','.table input.ui-tbl-chk-all',function(){
          var $wrap = $(this).closest('.table'),
            $chk = $wrap.find('input.ui-tbl-chk').not(':disabled');
          if($(this).prop('checked') == true){
            $chk.prop('checked',true).change();
          }else{
            $chk.prop('checked',false).change();
          }
        });
        $(document).on('change','.table input.ui-tbl-chk',function(){
          var $wrap = $(this).closest('.table'),
              $allChk = $wrap.find('input.ui-tbl-chk-all'),
              $chkLength = $wrap.find('input.ui-tbl-chk').not(':disabled').length,
              $checkedLength = $wrap.find('input.ui-tbl-chk:checked').length;
          if($chkLength == $checkedLength){
              $allChk.prop('checked',true);
          }else{
              $allChk.prop('checked',false);
          }
        });
      }
  }
})(jQuery);
(function(){
    'use strict'
    function emulatedIEMajorVersion(){
        var groups=/MSIE ([\d.]+)/.exec(window.navigator.userAgent);
        if(groups===null){return null}
        var ieVersionNum=parseInt(groups[1],10);
        var ieMajorVersion=Math.floor(ieVersionNum);
        return ieMajorVersion;
    }
    function actualNonEmulatedIEMajorVersion(){
        var jscriptVersion=new Function('/*@cc_on return @_jscript_version; @*/')();
        if(typeof jscriptVersion==='undefined'){return 11}
        if(jscriptVersion<9){return 8}
        return jscriptVersion;
    }
    var ua=window.navigator.userAgent
    if(ua.indexOf('Opera')>-1||ua.indexOf('Presto')>-1){return}
    var emulated=emulatedIEMajorVersion();
    if(emulated===null){return}
    var nonEmulated=actualNonEmulatedIEMajorVersion();
    if(emulated!==nonEmulated){
        window.alert('WARNING: You appear to be using IE'+nonEmulated+' in IE'+emulated+' emulation mode.\nIE emulation modes can behave significantly differently from ACTUAL older versions of IE.\nPLEASE DON\'T FILE BOOTSTRAP BUGS based on testing in IE emulation modes!');
    }
})();