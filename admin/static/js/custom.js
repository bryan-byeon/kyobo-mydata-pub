/*!
 * JavaScript for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2021 The Bootstrap Authors
 * Copyright 2011-2021 Twitter, Inc.
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 * For details, see https://creativecommons.org/licenses/by/3.0/.
 */
(function ($) {
  'use strict';
  $(function () {
    const $elements = $.find('*[data-include-html]');
    if ($elements.length) {
      Html.include(uiInit);
    } else {
      uiInit();
    }
  });

  var uiInit = function () {
    bootstrapEvt();
    device.check();
    common.init();
    Html.include();
    form.init();
    table.init();

    $(window).scroll();
  };

  var bootstrapEvt = function () {
    $('.bd-content [href="#"]').click(function (e) {
      e.preventDefault();
    });
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
    $('[data-toast]').click(function () {
      var tar = $(this).data('toast');
      $(tar).toast('show');
    });

    var clipboard = new ClipboardJS('.btn-clipboard', {
      target: function (trigger) {
        return trigger.parentNode.nextElementSibling;
      }
    });
    clipboard.on('success', function (e) {
      $(e.trigger).attr('title', 'Copied!').tooltip('_fixTitle').tooltip('show').attr('title', 'Copy to clipboard').tooltip('_fixTitle');
      e.clearSelection();
    });
    clipboard.on('error', function (e) {
      var modifierKey = /mac/i.test(navigator.userAgent) ? '\u2318' : 'Ctrl-';
      var fallbackMsg = 'Press ' + modifierKey + 'C to copy';
      $(e.trigger).attr('title', fallbackMsg).tooltip('_fixTitle').tooltip('show').attr('title', 'Copy to clipboard').tooltip('_fixTitle');
    });
    bsCustomFileInput.init();
  };

  //PC 디바이스 체크
  var isPC = {
    window: function () {
      return navigator.userAgent.match(/windows/i) == null ? false : true;
    },
    mac: function () {
      return navigator.userAgent.match(/macintosh/i) == null ? false : true;
    },
    chrome: function () {
      return navigator.userAgent.match(/chrome/i) == null ? false : true;
    },
    firefox: function () {
      return navigator.userAgent.match(/firefox/i) == null ? false : true;
    },
    opera: function () {
      return navigator.userAgent.match(/opera|OPR/i) == null ? false : true;
    },
    safari: function () {
      return navigator.userAgent.match(/safari/i) == null ? false : true;
    },
    edge: function () {
      return navigator.userAgent.match(/edge/i) == null ? false : true;
    },
    msie: function () {
      return navigator.userAgent.match(/rv:11.0|msie/i) == null ? false : true;
    },
    ie11: function () {
      return navigator.userAgent.match(/rv:11.0/i) == null ? false : true;
    },
    ie10: function () {
      return navigator.userAgent.match(/msie 10.0/i) == null ? false : true;
    },
    ie9: function () {
      return navigator.userAgent.match(/msie 9.0/i) == null ? false : true;
    },
    ie8: function () {
      return navigator.userAgent.match(/msie 8.0/i) == null ? false : true;
    },
    any: function () {
      return isPC.window() || isPC.mac();
    },
    check: function () {
      if (isPC.any()) {
        if (isPC.window()) $('html').addClass('window');
        if (isPC.mac()) $('html').addClass('mac');
        if (isPC.msie()) $('html').addClass('msie');
        if (isPC.ie11()) $('html').addClass('ie11');
        if (isPC.ie10()) $('html').addClass('ie10');
        if (isPC.ie9()) $('html').addClass('ie9');
        if (isPC.ie8()) $('html').addClass('ie8');
        if (isPC.edge()) {
          $('html').addClass('edge');
        } else if (isPC.opera()) {
          $('html').addClass('opera');
        } else if (isPC.chrome()) {
          $('html').addClass('chrome');
        } else if (isPC.safari()) {
          $('html').addClass('safari');
        } else if (isPC.firefox()) {
          $('html').addClass('firefox');
        }
      }
    }
  };

  //모바일 디바이스 체크
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i) == null ? false : true;
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
    },
    iPhone: function () {
      return navigator.userAgent.match(/iPhone/i) == null ? false : true;
    },
    iPad: function () {
      return navigator.userAgent.match(/iPad/i) == null ? false : true;
    },
    iPhoneVersion: function () {
      var $sliceStart = navigator.userAgent.indexOf('iPhone OS') + 10,
        $sliceEnd = $sliceStart + 2,
        $version = parseFloat(navigator.userAgent.slice($sliceStart, $sliceEnd));
      return $version;
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
    },
    tablet: function () {
      if (isMobile.any()) {
        if (window.screen.width < window.screen.height) {
          return window.screen.width > 760 ? true : false;
        } else {
          return window.screen.height > 760 ? true : false;
        }
      }
    },
    any: function () {
      return isMobile.Android() || isMobile.iOS() || isMobile.BlackBerry() || isMobile.Opera() || isMobile.Windows();
    },
    check: function () {
      if (isMobile.any()) {
        $('html').addClass('mobile');
        if (isMobile.tablet()) $('html').addClass('tablet');
      }
      if (isMobile.iOS()) $('html').addClass('ios');
      if (isMobile.Android()) $('html').addClass('android');
      //if(isMobile.iPhoneVersion() >= 12)$('html').addClass('ios12');
    }
  };

  //디바이스체크 실행
  var device = {
    iPhone8PlusH: 736,
    screenH: window.screen.height,
    screenW: window.screen.width,
    isIPhoneX: function () {
      $('html').addClass('iPhone-X');
    },
    notIPhoneX: function () {
      $('html').removeClass('iPhone-X');
    },
    check: function () {
      isMobile.check();
      isPC.check();
      if (isMobile.any()) {
        var $pixelRatio = Math.round(window.devicePixelRatio);
        if (!!$pixelRatio) $('html').addClass('pixelRatio' + $pixelRatio);
      }
      var $isIPhoneX = isMobile.iPhone() && device.screenH > device.iPhone8PlusH ? true : false;
      if ($isIPhoneX) {
        //첫로딩
        if ($(window).width() < $(window).height()) {
          device.isIPhoneX();
        } else {
          device.notIPhoneX();
        }
      }

      //가로, 세로 회전시
      if (isMobile.any()) {
        if (window.orientation == 0) {
          $('html').removeClass('landscape');
        } else {
          $('html').addClass('landscape');
        }
        $(window).on('orientationchange', function () {
          if (window.orientation == 0) {
            $('html').removeClass('landscape');
            if ($isIPhoneX) device.isIPhoneX();
          } else {
            $('html').addClass('landscape');
            if ($isIPhoneX) device.notIPhoneX();
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
  };
  var common = {
    init: function () {
      common.header();
      common.sidebar();
      common.menuActive();
      common.btnTop();
      common.pageTitle();
    },
    header: function () {
      $(document).on('click', '.kb-navbar-btn, .kb-sidebar-close', function (e) {
        e.preventDefault();
        var sideBar = $('.kb-sidebar');
        if (sideBar.hasClass('open')) {
          sideBar.removeClass('open');
          $('body').removeClass('gnb-open');
        } else {
          sideBar.addClass('open');
          $('body').addClass('gnb-open');
          var dep1Active = $('.kb-lnb-dep1>.active');
          if (dep1Active.length) {
            dep1Active.addClass('open').siblings().removeClass('open');
          } else {
            $('.kb-lnb-dep1>li').first().addClass('open').siblings().removeClass('open');
          }
          if (!sideBar.find('.kb-navbar-util').length) {
            console.log('aaa');
            var $clone = $('.kb-navbar-util').clone();
            $('.kb-sidebar-head').prepend($clone);
          }
        }
      });
    },
    sidebar: function () {
      $(document).on('click', '.kb-lnb-dep2 .kb-lnb-link.in-sub', function (e) {
        e.preventDefault();
        var $this = $(this);
        var $subMenu = $this.next();
        if ($this.hasClass('open')) {
          $this.removeClass('open');
          $subMenu.stop(true, false).slideUp(300);
        } else {
          $this.addClass('open');
          $subMenu.stop(true, false).slideDown(300);
          // $this.parent().siblings().find('>.open').each(function(){
          //     var $open = $(this)
          //     $open.removeClass('open');
          //     $open.next().stop(true, false).slideUp(300);
          // });
        }
      });

      $(document).on('click', '.kb-lnb-dep1>li>.kb-lnb-link', function (e) {
        e.preventDefault();
        $(this).parent().addClass('open').siblings().removeClass('open');
      });
    },
    menuActive: function () {
      if ($('.kb-sidebar').length) {
        var $link = $('.kb-lnb-dep2 .kb-lnb-link');
        var $path = location.pathname;
        var $title = $('.kb-title h1').text();
        var isActiveOn = false;
        $link.each(function () {
          var $this = $(this);
          var $text = $this.text();
          var $href = $this.attr('href').split('/').pop();
          if ($this.next().length) {
            $this.addClass('in-sub');
            $this.addClass('open');
            $this.next().show();
          }
          if (!isActiveOn) {
            var isActive = false;
            if ($path.indexOf($href) > -1) {
              isActive = true;
            } else if ($text === $title) {
              isActive = true;
            }

            if (isActive) {
              isActiveOn = true;
              $this.parents('li').addClass('active');
            }
          }
        });

        var dep1Active = $('.kb-lnb-dep1>.active');
        var lnbTit = dep1Active.children('.kb-lnb-link').text();
        if (lnbTit !== '') {
          $('.kb-sidebar').removeClass('hide');
          $('.kb-footer').removeClass('full');
          $('.kb-navbar-nav .nav-link').each(function () {
            var $this = $(this);
            var $text = $this.text();
            if (lnbTit === $text) {
              $this.addClass('active');
            }
          });
        } else {
          $('.kb-sidebar').addClass('hide');
          $('.kb-footer').addClass('full');
        }
      }
    },
    btnTop: function () {
      var settings = {
        button: '#btnTop',
        text: '컨텐츠 상단으로 이동',
        min: 100,
        onClass: 'on',
        hoverClass: 'hover',
        scrollSpeed: 300
      };
      var btnHtml =
        '<a href="#" id="' +
        settings.button.substring(1) +
        '" class="btn-scl-top" title="' +
        settings.text +
        '" role="button" aria-label="' +
        settings.text +
        '"><i class="bi bi-arrow-up-short"></i></a>';
      if (!$(settings.button).length) {
        $('body').append(btnHtml);

        $(document)
          .on('click', settings.button, function (e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, settings.scrollSpeed);
          })
          .on('mouseenter', function () {
            $(settings.button).addClass(settings.hoverclass);
          })
          .on('mouseleave', function () {
            $(settings.button).removeClass(settings.hoverClass);
          });

        var btnTopOn = function () {
          $(settings.button).attr('aria-hidden', 'false').addClass(settings.onClass);
        };

        var btnTopOff = function () {
          $(settings.button).attr('aria-hidden', 'true').removeClass(settings.onClass);
        };

        $(window).on('scroll', function () {
          var $SclTop = $(this).scrollTop();
          if ($SclTop > settings.min) {
            btnTopOn();
          } else {
            btnTopOff();
          }
        });
      }
    },
    pageTitle: function () {
      $(window).scroll(function () {
        var $SclTop = $(this).scrollTop();
        var $title = $('.kb-page-title');
        if ($title.length) {
          var $titleTop = $title.offset().top;
          var $headH = $('.kb-navbar').outerHeight();
          if ($SclTop > $titleTop - $headH) {
            $title.addClass('fixed');
          } else {
            $title.removeClass('fixed');
          }
        }
      });
    }
  };

  var form = {
    init: function () {
      form.datepicker();
    },
    datepicker: function () {
      if ($('.bs-datepicker').length) {
        $('.bs-datepicker').each(function () {
          $(this)
            .datepicker({
              language: 'ko',
              format: 'yyyy.mm.dd',
              autoclose: true,
              todayHighlight: true,
              toggleActive: true
            })
            .on('changeDate', function (e) {
              console.log('날짜선택');
            });
        });
      }
      if ($('.input-daterange').length) {
        $('.input-daterange').each(function () {
          $(this).datepicker({
            language: 'ko',
            format: 'yyyy.mm.dd',
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
          });
        });
      }
    }
  };

  var table = {
    init: function () {
      table.checkbox();
    },
    checkbox: function () {
      $(document).on('change', '.table input.ui-tbl-chk-all', function () {
        var $wrap = $(this).closest('.table'),
          $chk = $wrap.find('input.ui-tbl-chk').not(':disabled');
        if ($(this).prop('checked')) {
          $chk.prop('checked', true).change();
        } else {
          $chk.prop('checked', false).change();
        }
      });
      $(document).on('change', '.table input.ui-tbl-chk', function () {
        var $wrap = $(this).closest('.table'),
          $tr = $(this).closest('tr'),
          $allChk = $wrap.find('input.ui-tbl-chk-all'),
          $chkLength = $wrap.find('input.ui-tbl-chk').not(':disabled').length,
          $checkedLength = $wrap.find('input.ui-tbl-chk:checked').length;

        if ($(this).prop('checked')) {
          $tr.addClass('tr-selected');
        } else {
          $tr.removeClass('tr-selected');
        }

        if ($chkLength == $checkedLength) {
          $allChk.prop('checked', true);
        } else {
          $allChk.prop('checked', false);
        }
      });
    }
  };
})(jQuery);
(function () {
  'use strict';
  function emulatedIEMajorVersion() {
    var groups = /MSIE ([\d.]+)/.exec(window.navigator.userAgent);
    if (groups === null) {
      return null;
    }
    var ieVersionNum = parseInt(groups[1], 10);
    var ieMajorVersion = Math.floor(ieVersionNum);
    return ieMajorVersion;
  }
  function actualNonEmulatedIEMajorVersion() {
    var jscriptVersion = new Function('/*@cc_on return @_jscript_version; @*/')();
    if (typeof jscriptVersion === 'undefined') {
      return 11;
    }
    if (jscriptVersion < 9) {
      return 8;
    }
    return jscriptVersion;
  }
  var ua = window.navigator.userAgent;
  if (ua.indexOf('Opera') > -1 || ua.indexOf('Presto') > -1) {
    return;
  }
  var emulated = emulatedIEMajorVersion();
  if (emulated === null) {
    return;
  }
  var nonEmulated = actualNonEmulatedIEMajorVersion();
  if (emulated !== nonEmulated) {
    window.alert(
      'WARNING: You appear to be using IE' +
        nonEmulated +
        ' in IE' +
        emulated +
        " emulation mode.\nIE emulation modes can behave significantly differently from ACTUAL older versions of IE.\nPLEASE DON'T FILE BOOTSTRAP BUGS based on testing in IE emulation modes!"
    );
  }
})();

var Modal = {
  alertIdx: 0,
  alertHtml: function (type, msg, popId, btnActionId, btnCancelId) {
    var $html = '<div class="modal alert fade" id="' + popId + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">';
    $html += '<div class="modal-dialog modal-sm modal-dialog-centered modal-dialog-scrollable">';
    $html += '<div class="modal-content">';
    $html += '<div class="modal-body">';
    $html += '<div class="modal-messege">';
    $html += msg;
    $html += '</div>';
    $html += '</div>';
    $html += '<div class="modal-footer">';
    if (type === 'confirm') $html += '<button type="button" id="' + btnCancelId + '" class="btn btn-outline-dark">취소</button>';
    $html += '<button type="button" id="' + btnActionId + '" class="btn btn-primary">확인</button>';
    $html += '</div>';
    $html += '</div>';
    $html += '</div>';
    $html += '</div>';
    return $html;
  },
  alertEvt: function (type, msg, callback) {
    var $popId = 'modal-alert-' + Modal.alertIdx;
    var $btnActionId = 'modal-action-' + Modal.alertIdx;
    var $btnCancelId = 'modal-cancel-' + Modal.alertIdx;
    Modal.alertIdx += 1;
    var $html = Modal.alertHtml(type, msg, $popId, $btnActionId, $btnCancelId);
    var $layer = $($html);
    $('body').append($layer);
    $('#' + $popId).modal({
      backdrop: false
    });
    $('#' + $btnActionId + ', #' + $btnCancelId)
      .off('click')
      .on('click', function () {
        var $thisId = $(this).attr('id');
        $('#' + $popId)
          .modal('hide')
          .on('hidden.bs.modal', function (event) {
            $('#' + $popId).remove();
          });
        if (typeof callback === 'function') {
          if (type === 'confirm') {
            if ($thisId === $btnActionId) callback(true);
            else if ($thisId === $btnCancelId) callback(false);
            else callback();
          } else {
            callback();
          }
        }
      });
  },
  alert(msg, callback) {
    Modal.alertEvt('alert', msg, callback);
  },
  confirm(msg, callback) {
    Modal.alertEvt('confirm', msg, callback);
  }
};
