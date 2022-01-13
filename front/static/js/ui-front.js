/********************************
 * 교보증권 마이데이타 UI 스크립트 *
 * 작성자 : 안효주 *
 ********************************/
$(function () {
  const $elements = $.find('*[data-include-html]');
  if ($elements.length) {
    ui.Html.include(ui.Init);
  } else {
    ui.Init();
  }
});
// window.addEventListener('DOMContentLoaded', (event) => {
// });

$(window).on('load', function () {
  ui.LoadInit();
});

$(window).on('resize', function () {
  ui.Common.vhChk();
  ui.Tab.resize();
  ui.Tooltip.resize();
  ui.Table.guideResize();
  ui.Touch.rotateItem();

  Layer.resize();
});
$(window).on('scroll', function () {
  ui.Common.space();
});

/********************************
 * front UI 함수 *
 ********************************/
const ui = {
  Init: function () {
    ui.Common.vhChk();
    ui.Common.dark();

    ui.Device.check();
    ui.Device.hide();
    ui.Common.init();
    ui.Button.init();
    ui.Tooltip.init();
    ui.Scroll.init();
    ui.Form.init();
    ui.List.init();
    ui.Animation.init();
    Layer.init();
    Splitting();
  },
  LoadInit: function () {
    //console.log('window load complete');
    ui.Common.winLoad();
    ui.Common.lottie();
    ui.Form.winLoad();
    ui.List.winLoad();
    ui.Button.winLoad();

    ui.Confetti.init();
    ui.Common.vhChk();
    ui.Swiper.init();

    $(window).scroll();
    $(window).resize();
  }
};

//Html include
ui.Html = {
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

//PC 디바이스 체크
ui.PC = {
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
    return ui.PC.window() || ui.PC.mac();
  },
  check: function () {
    if (ui.PC.any()) {
      if (ui.PC.window()) $('html').addClass('window');
      if (ui.PC.mac()) $('html').addClass('mac');
      if (ui.PC.msie()) $('html').addClass('msie');
      if (ui.PC.ie11()) $('html').addClass('ie11');
      if (ui.PC.ie10()) $('html').addClass('ie10');
      if (ui.PC.ie9()) $('html').addClass('ie9');
      if (ui.PC.ie8()) $('html').addClass('ie8');
      if (ui.PC.edge()) {
        $('html').addClass('edge');
      } else if (ui.PC.opera()) {
        $('html').addClass('opera');
      } else if (ui.PC.chrome()) {
        $('html').addClass('chrome');
      } else if (ui.PC.safari()) {
        $('html').addClass('safari');
      } else if (ui.PC.firefox()) {
        $('html').addClass('firefox');
      }
    }
  }
};

//모바일 디바이스 체크
ui.Mobile = {
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
    const $sliceStart = navigator.userAgent.indexOf('iPhone OS') + 10;
    const $sliceEnd = $sliceStart + 2;
    const $version = parseFloat(navigator.userAgent.slice($sliceStart, $sliceEnd));
    return $version;
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
  },
  tablet: function () {
    if (ui.Mobile.any()) {
      if (window.screen.width < window.screen.height) {
        return window.screen.width > 760 ? true : false;
      } else {
        return window.screen.height > 760 ? true : false;
      }
    }
  },
  any: function () {
    return ui.Mobile.Android() || ui.Mobile.iOS() || ui.Mobile.BlackBerry() || ui.Mobile.Opera() || ui.Mobile.Windows();
  },
  check: function () {
    if (ui.Mobile.any()) {
      $('html').addClass('mobile');
      if (ui.Mobile.tablet()) $('html').addClass('tablet');
    }
    if (ui.Mobile.iOS()) $('html').addClass('ios');
    if (ui.Mobile.Android()) $('html').addClass('android');
    //if(ui.Mobile.iPhoneVersion() >= 12)$('html').addClass('ios12');
  }
};

//디바이스체크 실행
ui.Device = {
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
    ui.Mobile.check();
    ui.PC.check();
    if (ui.Mobile.any()) {
      const $pixelRatio = Math.round(window.devicePixelRatio);
      if (!!$pixelRatio) $('html').addClass('pixel-ratio-' + $pixelRatio);
    }
    const $isIPhoneX = ui.Mobile.iPhone() && ui.Device.screenH > ui.Device.iPhone8PlusH ? true : false;
    if ($isIPhoneX) {
      //첫로딩
      if ($(window).width() < $(window).height()) {
        ui.Device.isIPhoneX();
      } else {
        ui.Device.notIPhoneX();
      }
    }

    //가로, 세로 회전시
    if (ui.Mobile.any()) {
      if (window.orientation == 0) {
        $('html').removeClass('landscape');
      } else {
        $('html').addClass('landscape');
      }
      $(window).on('orientationchange', function () {
        if (window.orientation == 0) {
          $('html').removeClass('landscape');
          if ($isIPhoneX) ui.Device.isIPhoneX();
        } else {
          $('html').addClass('landscape');
          if ($isIPhoneX) ui.Device.notIPhoneX();
        }
      });
    }
  },
  hide: function () {
    if ($('[data-device-hide]').length) {
      $('[data-device-hide]').each(function () {
        const $device = $(this).data('device-hide');
        if (ui.Mobile.any()) {
          //모바일
          if ($device == 'ios' && ui.Mobile.iOS()) {
            $(this).hide();
          } else if ($device == 'android' && ui.Mobile.Android()) {
            $(this).hide();
          }
        } else {
          //PC
          if ($device == 'ios' && $('html').hasClass('safari')) {
            $(this).hide();
          } else if ($device == 'android' && !$('html').hasClass('safari')) {
            $(this).hide();
          }
        }
      });
    }
  }
};

//공통: 헤더, 레이아웃, 앱용플로팅버튼, 스킵네비, meta[og:image]
ui.Common = {
  winLoad: function () {
    //hr태그 토크백 제외
    $('hr').each(function () {
      $(this).attr('aria-hidden', true);
    });
  },
  dark: function () {
    //다크모드 체크
    try {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: Dark)').matches;
      if (prefersDark) $('html').addClass('dark');
    } catch (e) {}
  },
  vhChk: function () {
    const $vh = window.innerHeight * 0.01;
    $('html').css('--vh', $vh + 'px');
  },
  title: function (string) {
    let $title = document.title;
    const $divide = ' | ';
    if ($title.indexOf($divide) >= 0) $title = $title.split($divide)[1];
    const $titString = string.replace(/<[^>]*>?/gm, '');
    document.title = $titString + $divide + $title;
    const $titleEl = '#header h1';
    if ($($titleEl).length) $($titleEl).html(string);
  },
  fixed: function (target) {
    //고정(fixed)
    const $target = $(target);
    if ($target.length && $target.data('init') != true) {
      $target.data('init', true);
      $(window).on('scroll', function () {
        if ($('html').hasClass('lock')) return false;
        const $scrollTop = $(this).scrollTop();

        $target.each(function () {
          if ($(this).closest('.' + Layer.popClass).length) return;
          const $this = $(this);
          let $topMargin = 0;
          if ($('.top-fixed').length) {
            $('.top-fixed').each(function () {
              if ($this[0] == $(this)[0]) return false;
              $topMargin += $(this).children().outerHeight();
            });
          }
          let $topEl = $this;
          let $offsetTop = $this.data('top') !== undefined ? $this.data('top') : Math.max(0, getOffset(this).top);
          if ($scrollTop + $topMargin > $offsetTop) {
            $this.data('top', $offsetTop);
            $this.addClass('top-fixed');
            if ($topEl.css('position') !== 'fixed' && $topEl.css('position') !== 'sticky') $topEl = $topEl.children();
            if ($topMargin !== parseInt($topEl.css('top'))) $topEl.css('top', $topMargin);
            if ($this.attr('id') !== 'header' && $('#header').hasClass('top-fixed')) $('#header').addClass('no-shadow');
          } else {
            $this.removeData('top');
            if ($topEl.css('position') !== 'fixed' && $topEl.css('position') !== 'sticky') $topEl = $topEl.children();
            $topEl.removeCss('top');
            $this.removeClass('top-fixed');
            if ($this.attr('id') !== 'header' && $('#header').hasClass('top-fixed') && $('.top-fixed').length === 1) $('#header').removeClass('no-shadow');
          }
        });
      });
    }
  },
  header: function () {
    const $header = $('#header');
    if ($header.outerHeight() < $header.children('div').outerHeight()) $header.css('height', $header.children('div').outerHeight());
    let $title = document.title;
    const $divide = ' | ';
    if ($title.indexOf($divide) >= 0) {
      $title = $title.split($divide)[0];
      const $titleEl = '#header h1';
      if ($($titleEl).length) $($titleEl).html($title);
    }
  },
  headerUI: function () {
    $(document)
      .off('click', '#header h1 .btn-category')
      .on('click', '#header h1 .btn-category', function (e) {
        e.preventDefault();
        if ($('#header').hasClass('is-category-open')) {
          $('#header').removeClass('is-category-open');
        } else {
          $('#header').addClass('is-category-open');
        }
      });
    // if($('#header h1 .btn-category').length && $('#header .category-wrap').length){
    $(document)
      .on('click touchend', function (e) {
        if ($('#header').hasClass('is-category-open')) $('#header').removeClass('is-category-open');
      })
      .on('click touchend', '#header', function (e) {
        e.stopPropagation();
      });
    // }
  },
  spaceAppend: function () {
    if (!$('.bottom-fixed-space').length) {
      let $wrap = $('body');
      if (!$('#footer').length && $('#container').length) $wrap = $('#container');
      if ($('#wrap').length) $wrap = $('#wrap');
      $wrap.append('<div class="bottom-fixed-space" aria-hidden="true"></div>');
    }
    /*
    if ($('#footer').length && $('#container').find('.bottom-fixed-space').length) {
      const $div = $('#container').find('.bottom-fixed-space');
      $('body').append($div);
    }
    */
  },
  space: function () {
    const $space = $('.bottom-fixed-space');
    if (!$('.bottom-fixed-space').length) return;
    const $spaceArryHeight = [];
    const $naviBar = $('.floating-bar');
    if ($naviBar.length && $naviBar.height() != 0) {
      $spaceArryHeight.push($naviBar.outerHeight());
    }
    $('.bottom-fixed').each(function () {
      const $this = $(this);
      const $height = $this.children().outerHeight();
      if (!$this.hasClass('fixed-none')) $spaceArryHeight.push($height);
      if ($this.hasClass('is-restore')) $this.css('height', $height);
    });

    const $maxHeight = $spaceArryHeight.length ? Math.max.apply(null, $spaceArryHeight) : 0;
    $space.css('height', $maxHeight);
    if ($('.floating-btn').length) {
      $('.floating-btn').css('bottom', $maxHeight + 20);
    }
  },
  step: function () {
    //<ol class="step_state" role="img" aria-label="총 4단계 중 현재단계 2단계">
    if ($('.ico-step').length) {
      $('.ico-step').each(function () {
        const $this = $(this);
        const $length = $this.find('li').length;
        const $onIdx = $this.find('li.on').index() + 1;
        $this.attr({
          role: 'img',
          'aria-label': '총 ' + $length + '단계 중 현재단계 ' + $onIdx + '단계'
        });
      });
    }
  },
  landscape: function () {
    //가로모드 막기
    if (ui.Mobile.any()) {
      const _landscapeDiv = '.landscape_lock';
      if (!$(_landscapeDiv).length) {
        const $landscapeHtml = '<div class="' + _landscapeDiv.substring(1) + '"><div class="tbl"><div class="td">이 사이트는 세로 전용입니다.<br>단말기를 세로모드로 변경해주세요.</div></div></div>';
        $('body').append($landscapeHtml);
      }
      $(_landscapeDiv)
        .unbind('touchmove')
        .bind('touchmove', function (e) {
          e.preventDefault();
        });
    }
  },
  isFloating: false,
  floating: function () {
    let isBtn = false;
    if ($('.floating-btn').length) isBtn = true;
    if ($('.floating-bar').length) {
      ui.Common.isFloating = true;
      if (isBtn && !$('.floating-bar .floating-btn').length) $('.floating-bar').prepend($('.floating-btn'));
    }
  },
  top: function () {
    //top 버튼
    const settings = {
      button: '#btnTop',
      text: '컨텐츠 상단으로 이동',
      min: 100,
      onClass: 'on',
      hoverClass: 'hover',
      scrollSpeed: 300
    };
    let btnHtml = '';
    if (!$('#container').length) return;
    if (!$('.floating-btn').length) btnHtml += '<div class="floating-btn">';
    btnHtml += '<a href="#" id="' + settings.button.substring(1) + '" class="btn btn-page-top" title="' + settings.text + '" role="button" aria-label="' + settings.text + '"></a>';
    if (!$('.floating-btn').length) btnHtml += '</div>';

    if (!$(settings.button).length) {
      if ($('.floating-btn').length) {
        $('.floating-btn').append(btnHtml);
      } else if ($('.floating-bar').length && $('.floating-bar').is(':visible')) {
        $('.floating-bar').prepend(btnHtml);
      } else if ($('#container').length) {
        $('#container').append(btnHtml);
      } else {
        $('body').append(btnHtml);
      }
    }

    $(document)
      .on('click', settings.button, function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, settings.scrollSpeed);
        $('#wrap').find($focusableEl).first().focus();
      })
      .on('mouseenter', function () {
        $(settings.button).addClass(settings.hoverclass);
      })
      .on('mouseleave', function () {
        $(settings.button).removeClass(settings.hoverClass);
      });

    const btnTopOn = function () {
      $(settings.button).attr('aria-hidden', 'false').addClass(settings.onClass);
      $('.floating-btn').addClass('top-on');
    };

    const btnTopOff = function () {
      $(settings.button).attr('aria-hidden', 'true').removeClass(settings.onClass);
      $('.floating-btn').removeClass('top-on');
    };

    let $lastSclTop = $(window).scrollTop();
    const $scrollEvt = function () {
      const $SclTop = $(window).scrollTop();
      const $spaceH = $('.bottom-fixed-space').outerHeight();
      const $bottom = parseInt($(settings.button).parent().css('bottom'));
      const $margin = 20;
      const $Height = window.innerHeight;
      const $scrollHeight = $('body').get(0).scrollHeight;
      if ($spaceH > 0 && $spaceH != $bottom - $margin) {
        $('.floating-btn').css('bottom', $spaceH + $margin);
      }

      if ($SclTop > settings.min) {
        btnTopOn();
      } else {
        btnTopOff();
      }
      if (ui.Common.isFloating) {
        if ($SclTop < $lastSclTop) {
          //위로 스크롤할때
          $('.floating-bar').removeClass('off');
        } else {
          $('.floating-bar').addClass('off');
        }
        if ($SclTop + $Height > $scrollHeight - 3) {
          $('.floating-bar').removeClass('off').addClass('end');
        } else {
          $('.floating-bar').removeClass('end');
        }
      }
      const $btnFixed = $('.btn-wrap.bottom-fixed');
      if ($btnFixed.length) {
        $btnFixed.each(function () {
          const $this = $(this);
          if ($this.hasClass('is-restore')) {
            const $top = $this.offset().top;
            const $bottom = $top + $this.children().outerHeight();
            if ($SclTop + $Height > $bottom) {
              $this.addClass('fixed-none');
            } else {
              $this.removeClass('fixed-none');
            }
          } else {
            if ($SclTop + $Height > $scrollHeight - 3) {
              $this.addClass('no-shadow');
            } else {
              $this.removeClass('no-shadow');
            }
          }
        });
      }

      setTimeout(function () {
        $lastSclTop = $SclTop;
      }, 50);
    };
    const $scrollEndEvt = function () {
      const $SclTop = $(window).scrollTop();
      if ($SclTop > settings.min) {
        btnTopOff();
      }
    };
    $(window).on('scroll', $scrollEvt);
    window.addEventListener('scroll', ui.Util.debounce($scrollEndEvt, 1500));
  },
  guide: function () {
    const themeColorChange = function () {
      const $path = location.pathname;
      if ($path.indexOf('/html/guide') > -1) {
        // if(!$('.gd__theme_color').length){
        // }
        let $html = '<div class="gd__theme_color">';
        $html += '<button type="button" class="gd__theme_btn"><i class="i-ico-arrow-right-16" aria-hidden="true"></i></button>';
        $html += '<dl>';
        $html += '<dt>테마색상 변경확인</dt>';
        $html += '<dd>';
        $html += '<input type="color">';
        $html += '<div>';
        $html += '<div class="color"></div>';
        $html += '<div class="reset"><button type="button">리셋</button></div>';
        $html += '</div>';
        $html += '</dd>';
        $html += '</dl>';
        $html += '</div>';
        $('body').append($html);

        const $baseThemeColor = '#fe7d65';
        const $input = $('.gd__theme_color input');
        const $color = $('.gd__theme_color .color');
        const $openBtn = $('.gd__theme_btn');
        const $resetBtn = $('.gd__theme_color .reset button');
        const $themeColor = uiCookie.get('theme-color') !== '' ? uiCookie.get('theme-color') : $baseThemeColor;

        const setColor = function (colorStr) {
          $input.val(colorStr);
          $color.text(colorStr);
          if ($baseThemeColor !== colorStr) {
            $('html').css('--primary-color', colorStr);
            uiCookie.set('theme-color', colorStr);
          } else {
            $('html').removeCss('--primary-color');
            uiCookie.set('theme-color', '');
          }
        };
        setColor($themeColor);

        $openBtn.on('click', function (e) {
          e.preventDefault();
          $('.gd__theme_color').toggleClass('open');
        });

        $input.on('input', function () {
          const $val = $(this).val();
          setColor($val);
        });

        $resetBtn.on('click', function (e) {
          e.preventDefault();
          setColor($baseThemeColor);
        });
      }
    };
    themeColorChange();
  },
  lottie: function () {
    const $lottie = $('[data-lottie]');
    if (!$lottie.length) return;
    if (!location.host) {
      return console.log('lottie는 서버에서만 지원됩니다.');
    }
    const $lottieInit = function () {
      $lottie.each(function () {
        const $this = $(this);
        // $(this).empty();
        if (!$this.hasClass('lottie__init')) {
          const $data = $this.data('lottie');
          $this.addClass('lottie__init').removeAttr('data-lottie');
          const isLoop = $this.hasClass('_loop');
          const $lottieOpt = lottie.loadAnimation({
            container: this,
            renderer: 'svg',
            loop: isLoop,
            autoplay: true,
            path: $data
          });
          $(this).data('lottie-opt', $lottieOpt);
        }
      });
    };
    if (typeof lottie === 'undefined') {
      let $url = '/static/js/lib/lottie.5.7.13.min.js';
      if (location.href.indexOf('/front/') > 0) {
        $url = '/front' + $url;
      }
      ui.Util.loadScript($url, $lottieInit);
    } else {
      $lottieInit();
    }
  },
  init: function () {
    ui.Common.header();
    ui.Common.headerUI();
    ui.Gnb.init();
    ui.Common.spaceAppend();
    ui.Common.space();
    ui.Common.step();
    ui.Common.floating();
    ui.Common.top();
    //ui.Common.landscape();

    ui.Common.guide();

    ui.Common.fixed('#header');
    ui.Common.fixed('.tab-fixed');
  }
};

ui.Gnb = {
  outCont: '#header,#contents,.floating-bar,#footer',
  open: function () {
    Body.lock();
    $('#gnb').show().removeAttr('aria-hidden');
    $(ui.Gnb.outCont).attr('aria-hidden', true);
    $('#gnb').find($focusableEl).first().focus();
    $('#gnb').addClass('show');
    if (!ui.Mobile.any()) Layer.focusMove('#gnb');

    $('#gnb a').each(function () {
      if ($(this).attr('role') == undefined) $(this).attr('role', 'button');
    });
    $('.gnb-dep1>ul')
      .attr({
        role: 'tablist'
      })
      .children('li')
      .attr({
        role: 'presentation'
      })
      .children('a')
      .attr({
        role: 'tab',
        'aria-selected': false
      });

    const $dep1Active = $('.gnb-dep1>ul').children('.active');
    if ($dep1Active.length) {
      $dep1Active.addClass('open').children('a').attr('aria-selected', true);
      const $dep2Active = $('.gnb-dep2>ul').children('.active');
      if ($dep2Active.length) {
        const $dep2ActiveTop = $dep2Active.position().top;
        const $dep2ScrollTop = $('.open>.gnb-dep2').scrollTop();
        $('.open>.gnb-dep2')
          .stop(true, false)
          .delay(300)
          .animate({ scrollTop: $dep2ActiveTop + $dep2ScrollTop - 25 }, 300);
      }
    } else {
      $('.gnb-dep1>ul>li').first().addClass('open').children('a').attr('aria-selected', true);
    }
    $('.gnb-dep2 li').each(function () {
      if ($(this).children('div').length) {
        $(this).addClass('open');
        $(this).children('a').addClass('is-toggle').attr('aria-expanded', true);
      }
    });
  },
  close: function () {
    Body.unlock();
    $('.ui-gnb-open').focus();
    $('#gnb').attr('aria-hidden', true);
    $(ui.Gnb.outCont).removeAttr('aria-hidden');
    $('#gnb').removeClass('show');

    setTimeout(function () {
      ui.Gnb.reset();
    }, 610);
  },
  reset: function () {
    $('#gnb').find('.open').removeClass('open').children('a').attr('aria-selected', false);
    $('#gnb').find('.close').removeClass('close');
    $('#gnb').find('.gnb-dep3').removeAttr('style');
    $('#gnb .is-toggle').each(function () {
      $(this).attr('aria-expanded', false);
    });
  },
  activeIng: false,
  active: function (target, isToggle) {
    const $parent = $(target).parent();
    const $slideSpeed = 300;
    const $dep2 = $parent.find('.gnb-dep2');
    //클릭시 메뉴 활성화
    if (isToggle) {
      //뎁스2
      if (ui.Gnb.activeIng == false) {
        ui.Gnb.activeIng = true;
        if ($parent.hasClass('open')) {
          $(target).attr('aria-expanded', false);
          $parent.removeClass('open');
          $(target)
            .next()
            .stop(true, false)
            .slideUp($slideSpeed, function () {
              ui.Gnb.activeIng = false;

              const $dep1Height = $('.gnb-dep1').data('height');
              const $dep2Height = $parent.closest('.gnb-dep2').outerHeight();
              $('.gnb-dep1').animate({ height: Math.max($dep1Height, $dep2Height) }, 300);
            });
        } else {
          $(target).attr('aria-expanded', true);
          $parent.addClass('open');
          $(target)
            .next()
            .stop(true, false)
            .slideDown($slideSpeed, function () {
              ui.Gnb.inScroll(target, 'sub');
              ui.Gnb.activeIng = false;

              const $dep1Height = $('.gnb-dep1').data('height');
              const $dep2Height = $parent.closest('.gnb-dep2').outerHeight();
              $('.gnb-dep1').animate({ height: Math.max($dep1Height, $dep2Height) }, 300);
            });
        }
      }
    } else {
      //뎁스1
      $parent.addClass('open').children('a').attr('aria-selected', true);
      $parent.siblings().removeClass('open').children('a').attr('aria-selected', false);
      $parent
        .siblings()
        .find('.is-toggle')
        .each(function () {
          $(this).attr('aria-expanded', true).siblings('div').removeAttr('style');
          $(this).parent().addClass('open');
        });

      if ($parent.hasClass('active')) {
        const $dep2Active = $dep2.children('ul').children('.active');
        if ($dep2Active.length) {
          const $dep2ActiveTop = $dep2Active.position().top;
          const $dep2ScrollTop = $dep2.scrollTop();
          $dep2.scrollTop($dep2ActiveTop + $dep2ScrollTop - 25);
        }
      } else {
        $dep2.scrollTop(0);
      }

      //$isScroll = true;
      //ui.Gnb.inScroll(target);
    }
  },
  inScroll: function (target, type) {
    const $parent = $(target).parent();
    const $wrap = $('.gnb-content');
    const $wrapPdTop = parseInt($wrap.css('paddingTop'));
    const $wrapHeight = $wrap.height();
    let $sclWrap = $wrap.find('.gnb-dep1');
    let $sclWrapTop = $sclWrap.scrollTop();
    let $parentTop = $parent.position().top + $sclWrapTop - $wrapPdTop;
    const $parentHeight = $parent.outerHeight();
    let $scl = null;
    let $sclSpeed = 200;

    if (type == 'sub') {
      //뎁스2,3
      $sclWrap = $wrap.find('li.open>.gnb-dep2');
      $sclWrapTop = $sclWrap.scrollTop();
      $parentTop = $parent.position().top + $sclWrapTop;
      $sclSpeed = 300;
    } else {
      $wrap.find('.gnb-dep2').scrollTop(0);
    }

    if ($wrapHeight + $sclWrapTop < $parentTop + $parentHeight) {
      $scl = Math.min($parentTop, $parentTop + $parentHeight - $wrapHeight);
    } else if ($parentTop < $sclWrapTop) {
      $scl = $parentTop;
    }
    if ($scl != null) {
      $sclWrap.stop(true, false).animate({ scrollTop: $scl }, $sclSpeed, function () {
        $isScroll = false;
      });
    }
  },
  init: function () {
    if ($('#gnb').length) {
      $(document)
        .off('click', '.head-gnb')
        .on('click', '.head-gnb', function (e) {
          e.preventDefault();
          if ($('#gnb').hasClass('show')) {
            ui.Gnb.close();
          } else {
            ui.Gnb.open();
          }
        });
      $(document)
        .off('click', '.gnb-close')
        .on('click', '.gnb-close', function (e) {
          e.preventDefault();
          ui.Gnb.close();
        });
      $(document)
        .off('click', '.gnb-dep1>ul>li>a')
        .on('click', '.gnb-dep1>ul>li>a', function (e) {
          e.preventDefault();
          ui.Gnb.active(this);
        });
      $(document)
        .off('click', '.gnb-content a.is-toggle')
        .on('click', '.gnb-content a.is-toggle', function (e) {
          e.preventDefault();
          ui.Gnb.active(this, true);
        });
    }
  }
};

ui.Util = {
  console: function (txt, delay) {
    if (delay == undefined) delay = 3000;
    const $consoles = $('.console');
    let $top = 0;
    let $last = '';
    if ($consoles.length) {
      $last = $('.console').last();
      $top = parseInt($last.css('top')) + $last.outerHeight();
    }
    const $wrap = $('#contents').length ? $('#contents') : $('body');
    $wrap.append('<div class="console">' + txt + '</div>');
    $last = $('.console').last();
    if ($top > 0) $last.css('top', $top);
    $last.delay(delay).fadeOut(500, function () {
      $(this).remove();
    });
  },
  path: function (type) {
    let $path = location.pathname;
    let $returnVal = $path;
    if ($.isNumeric(type)) {
      if ($path.indexOf('/') >= 0) {
        $path = $path.split('/');
        $returnVal = $path[type];
      }
    } else if (type === 'file') {
      if ($path.indexOf('/') >= 0) $returnVal = $path.split('/').pop();
    } else if (type === 'fileName') {
      if ($path.indexOf('/') >= 0) $path = $path.split('/').pop();
      if ($path.indexOf('.') >= 0) {
        $returnVal = $path.split('.').shift();
      } else {
        $returnVal = $path;
      }
    } else if (type === 'fileType') {
      if ($path.indexOf('/') >= 0) $path = $path.split('/').pop();
      if ($path.indexOf('.') >= 0) {
        $returnVal = $path.split('.').pop();
      } else {
        $returnVal = null;
      }
    }
    return $returnVal;
  },
  debounce: function (fn, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, delay);
    };
  },
  throttle: function (fn, delay) {
    let timer;
    return function () {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          fn.apply(this, arguments);
        }, delay);
      }
    };
  },
  loadScript: function (url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (script.readyState) {
      //IE
      script.onreadystatechange = function () {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      //Others
      script.onload = function () {
        callback();
      };
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
};

//버튼 관련
ui.Button = {
  winLoad: function () {
    //링크없는 a태그 role=button 추가
    $('a').each(function (e) {
      const $href = $(this).attr('href');
      const $role = $(this).attr('role');
      const $onclick = $(this).attr('onclick');
      if (!$(this).hasClass('no_button')) {
        if ($href == undefined || $href == '#' || $href == '#none') {
          if ($href == undefined || $href == '#') $(this).attr({ href: '#none' });
          $(this).removeAttr('target');
          if ($role == undefined) $(this).attr('role', 'button');
        } else {
          if (($href.startsWith('#') || $href.startsWith('javascript')) && $role == undefined) $(this).attr('role', 'button');
        }
      }

      if ($(this).attr('title') === undefined) {
        if ($(this).attr('target') === '_blank') $(this).attr('title', '새창열기');
        if ($(this).hasClass('tel') || ($href != undefined && $href.startsWith('tel'))) $(this).attr('title', '전화걸기');
        // if ($onclick != undefined && $onclick.startsWith('callMakeCall')) $(this).attr('title', '전화걸기');
      }
    });

    //type없는 button들 type 추가
    $('button').each(function (e) {
      const $type = $(this).attr('type');
      if ($type == undefined) $(this).attr('type', 'button');
    });
  },
  default: function () {
    //href가 #시작할때 a태그 클릭 시 기본속성 죽이기
    $(document).on('click', 'a', function (e) {
      const $href = $(this).attr('href');
      const $target = $(this).attr('target');
      if (!$(this).hasClass('no_button') && $href != undefined) {
        //기본속성 살리는 클래스(스킵네비 등)
        if ($href.startsWith('#')) {
          e.preventDefault();
        }
      }
    });
  },
  disabled: function () {
    $('a[aria-disabled]').each(function () {
      if (!$(this).hasClass('disabled')) $(this).removeAttr('aria-disabled');
    });
    $('a.disabled').each(function () {
      $(this).attr('aria-disabled', 'true');
    });
  },
  disabledChk: function () {
    var checking = function () {
      setTimeout(function () {
        ui.Button.disabled();
      }, 100);
    };
    $(document).on('click', 'a, button', function () {
      checking();
    });
    $(document).on('change', 'input', function () {
      checking();
    });
  },
  effect: function () {
    //버튼 클릭 효과
    const btnInEfList = 'a.button, button.button, a.btn-click, button.btn-click, .radio.btn input, .checkbox.btn input, .ui-folding-btn, .ui-folding .folding-head a';
    $(document).on('click', btnInEfList, function (e) {
      const $this = $(this);
      let $btnEl = $this;
      if ($btnEl.is('input')) $btnEl = $btnEl.siblings('.lbl');
      const $delay = 650;

      if (!$btnEl.is('.disabled')) {
        let $bgColor = rgba2hex($btnEl.css('background-color'));
        let $bgAlpha = 0;
        if ($bgColor.length > 7) {
          const $tempColor = $bgColor;
          $bgColor = $tempColor.substr(0, 7);
          $bgAlpha = 255 - parseInt($tempColor.substr(7, 2), 16);
        }
        const $bgColorVal = Math.max($bgAlpha, Math.round(getBgBrightValue($bgColor)));
        const isBalck = $bgColorVal < 50 ? true : false;
        if (!$btnEl.find('.btn-click-in').length) $btnEl.append('<i class="btn-click-in"></i>');
        const $btnIn = $btnEl.find('.btn-click-in');
        const $btnMax = Math.max($btnEl.outerWidth(), $btnEl.outerHeight());
        const $btnX = e.pageX - $btnEl.offset().left - $btnMax / 2;
        const $btnY = e.pageY - $btnEl.offset().top - $btnMax / 2;
        if (isBalck) $btnIn.addClass('white');
        $btnIn
          .css({
            left: $btnX,
            top: $btnY,
            width: $btnMax,
            height: $btnMax
          })
          .addClass('animate')
          .delay($delay)
          .queue(function (next) {
            $btnIn.remove();
            next();
          });
      }
    });
  },

  star: function () {
    $(document).on('click', '.ico-star-wrap > button', function (e) {
      e.preventDefault();
      const $idx = $(this).index();
      const $title = $(this).attr('title');
      const $closest = $(this).closest('.ico-star-wrap');
      $closest.attr('data-on', $idx + 1);
      $closest.find('.txt').text($title);
    });
  },
  imgBox: function () {
    $(document).on('click', 'a.img-box-wrap', function (e) {
      e.preventDefault();
      const $children = $(this).children();
      Layer.imgBox($children.clone());
    });
  },
  tap: function () {
    let $idx = 0;
    const appendItem = function (length, type) {
      let $append = '';
      let rdLeft;
      let rdTop;
      for (let i = 0; i < length; i++) {
        if (type === 'heart') {
          rdLeft = length <= 20 ? randomNumber(0, 20, 0) * 8 : randomNumber(0, length, 0) * (160 / length);
          rdLeft -= 80;
          rdTop = length <= 10 ? randomNumber(0, 10, 0) * 5 : randomNumber(0, length, 0) * (50 / length);
        } else {
          rdLeft = length <= 40 ? randomNumber(0, 40, 0) * 5 : randomNumber(0, length, 0) * (200 / length);
          rdLeft -= 100;
          if (type === 'confetti') {
            rdTop = length <= 12 ? randomNumber(0, 12, 0) * 5 : randomNumber(0, length, 0) * (60 / length);
          } else {
            rdTop = length <= 15 ? randomNumber(0, 15, 0) * 10 : randomNumber(0, length, 0) * (150 / length);
          }
        }
        $append += '<i style="left:' + rdLeft + 'px;top:' + rdTop * -1 + 'px;" class="item-' + ((i % 3) + 1) + '"></i>';
        // $append += '<i></i>';
      }
      return $append;
    };
    const eventType = ui.Mobile.any() ? 'touchstart' : 'click';
    $('.ui-tap-area').on(eventType, function (e) {
      // e.preventDefault();
      const $this = $(this);
      const $thisTop = $this.offset().top;
      const $thisLeft = $this.offset().left;
      const $sclTop = $(window).scrollTop();
      const $sclLeft = $(window).scrollLeft();
      const $tapY = e.targetTouches.length ? e.targetTouches[0].clientY : e.clientY;
      const $tapX = e.targetTouches.length ? e.targetTouches[0].clientX : e.clientX;
      const $tapTop = $tapY - $thisTop + $sclTop;
      const $tapLeft = $tapX - $thisLeft + $sclLeft;
      let $appendLength = $this.data('append');
      if ($appendLength === undefined) $appendLength = $this.hasClass('confetti') ? 20 : 10;

      let $typeClass;
      if ($this.hasClass('coin')) $typeClass = 'coin';
      if ($this.hasClass('heart')) $typeClass = 'heart';
      if ($this.hasClass('confetti')) $typeClass = 'confetti';
      const $append = appendItem($appendLength, $typeClass);
      const $itemClass = 'ui-tap-item__' + $idx;
      $idx += 1;
      const $item = '<div class="ui-tap-item active ' + $typeClass + ' ' + $itemClass + '" style="top:' + $tapTop + 'px;left:' + $tapLeft + 'px;">' + $append + '</div>';
      $(this).append($item);
      $('.' + $itemClass).one('animationend', function (e) {
        $('.' + $itemClass).remove();
      });
    });
    $('.ui-tap-item').each(function () {
      const $this = $(this);
      let $typeClass;
      let $length = 10;
      if ($this.hasClass('coin')) $typeClass = 'coin';
      if ($this.hasClass('heart')) $typeClass = 'heart';
      if ($this.hasClass('confetti')) {
        $typeClass = 'confetti';
        $length = 20;
      }
      const $append = appendItem($length, $typeClass);
      $this.append($append);
    });
  },
  etc: function () {
    $(document).on('click', '.search-opt-wrap .btn-select', function (e) {
      e.preventDefault();
      const $this = $(this);
      const $wrap = $('.search-opt-wrap');
      if (!$this.hasClass('open')) {
        $this.addClass('open');
        $wrap.addClass('expend');
        ui.Scroll.move(0, 0);
        setTimeout(function () {
          Body.lock();
        }, 100);
      } else {
        $this.removeClass('open');
        $wrap.removeClass('expend');
        Body.unlock();
      }
    });
    $(document).on('click', '.search-opt-wrap .bg', function (e) {
      e.preventDefault();
      const $btn = $('.search-opt-wrap .btn-select');
      const $wrap = $('.search-opt-wrap');
      $btn.removeClass('open');
      $wrap.removeClass('expend');
      Body.unlock();
    });
  },
  init: function () {
    ui.Button.default();
    ui.Button.disabledChk();
    ui.Button.effect();
    ui.Button.star();
    ui.Button.imgBox();
    ui.Button.tap();
    ui.Button.etc();
    ui.Tab.init();

    if ($('.ui-touch-rotate').length) ui.Touch.init();
  }
};
// 탭
ui.Tab = {
  aria: function (element) {
    if ($(element).length) {
      $(element).each(function () {
        const $this = $(this);
        let $tablist = null;
        let isFirst = false;
        if ($this.is('ul') || $this.hasClass('.tab-list')) {
          $tablist = $this;
        } else if ($this.find('.tab-list').length) {
          $tablist = $this.find('.tab-list');
        } else {
          $tablist = $this.find('ul');
        }
        if ($tablist.attr('role') != 'tablist') isFirst = true;
        if (isFirst) $tablist.attr('role', 'tablist');

        let $tab = $(this).find('.tab');
        if (!$tab.length) $tab = $(this).find('li');
        $tab.each(function (f) {
          const _a = $(this).find('a');
          if (_a.length) {
            if (isFirst) $(this).attr('role', 'presentation');
            if (isFirst) _a.attr('role', 'tab');
            if ($(this).hasClass('active')) {
              _a.attr('aria-selected', true);
            } else {
              _a.attr('aria-selected', false);
            }
          }
        });
      });
    }
  },
  ariaSet: function () {
    if ($('.tab-navi-menu').length) ui.Tab.aria('.tab-navi-menu');
    if ($('.tab-box-menu').length) ui.Tab.aria('.tab-box-menu');
    if ($('.is-tab').length) ui.Tab.aria('.is-tab');
    if ($('.ui-tab').length) ui.Tab.aria('.ui-tab');
  },
  line: function (wrap, isAni) {
    if (isAni === undefined) isAni = true;
    let $wrap = $(wrap);
    if ($wrap.hasClass('tab-inner')) $wrap = $wrap.parent();
    if ($wrap.hasClass('tab-list')) $wrap = $wrap.closest('.tab-inner').parent();
    const $line = $wrap.find('.tab-line');
    if (!$line.length) return;
    const $LastLeft = $line.data('left') === undefined ? 0 : $line.data('left');
    const $inner = $wrap.find('.tab-inner');
    const $innerSclWidth = $inner.get(0).scrollWidth;
    const $innerSclGap = $innerSclWidth - $inner.outerWidth();
    // const $innerSclLeft = $inner.get(0).scrollLeft;
    const $isTy2 = $line.hasClass('ty2');
    const $list = $wrap.find('.tab-list');
    const $listLeft = parseInt($list.css('margin-left'));
    const $active = $wrap.find('.active');
    const $tabBtn = $active.find('a');
    // const $tabWidth = $tabBtn.get(0).offsetWidth;
    // const $tabLeft = $active.get(0).offsetLeft + $tabBtn.get(0).offsetLeft;
    const $tabWidth = $tabBtn.outerWidth();
    const $tabLeft = $listLeft + $active.position().left + $tabBtn.position().left;
    const $tabRight = $innerSclWidth - $tabLeft - $tabWidth - $innerSclGap;

    if ($isTy2) {
      if (isAni) {
        const $delay = $innerSclGap < 10 ? 0 : 200;
        if ($LastLeft < $tabLeft) {
          $line
            .stop(true, false)
            .delay($delay)
            .animate(
              {
                right: $tabRight
              },
              200,
              function () {
                $wrap.addClass('tab-line-moving');
                $line.css({
                  left: $tabLeft
                });
              }
            );
        } else {
          $line
            .stop(true, false)
            .delay($delay)
            .animate(
              {
                left: $tabLeft
              },
              200,
              function () {
                $wrap.addClass('tab-line-moving');
                $line.css({
                  right: $tabRight
                });
              }
            );
        }
      } else {
        $line.css({
          left: $tabLeft,
          right: $tabRight
        });
      }
    } else {
      if (isAni) $wrap.addClass('tab-line-moving');
      $line.css({
        width: $tabWidth,
        left: $tabLeft
      });
    }
    if (isAni) {
      const transitionEndEvt = function () {
        $wrap.removeClass('tab-line-moving');
        $line.off('transitionend', transitionEndEvt);
      };
      $line.on('transitionend', transitionEndEvt);
    }
    $line.data('left', $tabLeft);
  },
  getInnerTxt: function (wrap) {
    let $wrap = $(wrap);
    if ($wrap.hasClass('tab-inner')) $wrap = $wrap.parent();
    if ($wrap.hasClass('tab-list')) $wrap = $wrap.parent().parent();
    const $firstClass = $wrap.attr('class').split(' ')[0];
    let $innerTxt = $firstClass;
    $wrap.find('.tab').each(function () {
      $innerTxt += ',' + $(this).text();
    });
    return $innerTxt;
  },
  tabInfoAry: null,
  tabInfo: function () {
    const $tabInfoSaveString = uiStorage.get('tabInfoSave');
    if ($tabInfoSaveString !== null) ui.Tab.tabInfoAry = JSON.parse($tabInfoSaveString);

    const _tabInfoSave = function () {
      if (!$('.tab-inner').length) {
        uiStorage.remove('tabInfoSave');
      } else {
        const $saveAry = [];
        $('.tab-inner').each(function () {
          const stateObj = {};
          const $innerTxt = ui.Tab.getInnerTxt(this);
          const $sclLeft = $(this).scrollLeft();
          const $line = $(this).find('.tab-line');
          const $lineLeft = parseInt($line.css('left'));
          const $lineWidth = parseInt($line.css('width'));
          stateObj.innerText = $innerTxt;
          stateObj.lineLeft = $lineLeft;
          stateObj.lineWidth = $lineWidth;
          stateObj.sclLeft = $sclLeft;
          $saveAry.push(stateObj);
        });
        if ($saveAry.length) uiStorage.set('tabInfoSave', JSON.stringify($saveAry));
      }
    };

    window.addEventListener('unload', function (event) {
      _tabInfoSave();
    });
  },
  scrolledCheck: function (wrap) {
    if (!$(wrap).length) return;
    $(wrap).each(function () {
      const $this = $(this);
      const $children = $this.children();
      const $childrenWidth = $children.outerWidth();
      const $scrollWidth = $children.get(0).scrollWidth;
      const $btnClass = 'tab-expand-btn';
      const $btn = '<div class="' + $btnClass + '"><button type="button" aria-label="펼쳐보기" aria-expanded="false"></button></div>';
      if ($childrenWidth < $scrollWidth) {
        $this.addClass('scroll-able');
        if ($this.hasClass('tab-navi-menu') && !$this.find('.' + $btnClass).length) $this.append($btn);
      } else {
        $this.removeClass('scroll-able');
        if ($this.hasClass('tab-navi-menu') && $this.find('.' + $btnClass).length) $this.find('.' + $btnClass).remove();
      }
    });
  },
  activeCenter: function () {
    if ($('.tab-inner').length) {
      $('.tab-inner').each(function (i) {
        const $this = $(this);
        if (i === $('.tab-inner').length - 1) {
          setTimeout(function () {
            ui.Tab.isTabInit = true;
          }, 50);
        }
        if ($this.closest('.ui-tab').length) return;

        const $line = $this.find('.tab-line');
        let isMove = false;
        let $delay = 1;

        if ($line.length) {
          const $innerTxt = ui.Tab.getInnerTxt(this);
          $.each(ui.Tab.tabInfoAry, function () {
            if (this.innerText === $innerTxt) {
              isMove = true;
              $delay = 50;
              $line.css({
                left: this.lineLeft,
                width: this.lineWidth
              });
              $this.scrollLeft(this.sclLeft);
            }
          });
        }

        if ($this.closest('.tab-navi-menu').length || $this.closest('.tab-box-menu').length) $delay = 50;
        setTimeout(function () {
          const $active = $this.find('.active');
          if ($active.length) {
            ui.Scroll.center($active, $delay * 10);
            ui.Tab.line($this, isMove);
          }
        }, $delay);
      });
    }
  },
  tabActive: function (target) {
    const $target = $(target);
    const $closest = $target.closest('.tab-inner').length ? $target.closest('.tab-inner') : $target.closest('.tab-list');
    const $btn = $target.is('a') ? $target : $target.find('a');
    const $tab = $btn.closest('.tab').length ? $btn.closest('.tab') : $btn.closest('li');

    $tab.addClass('active').siblings().removeClass('active').find('a').removeAttr('title').attr('aria-selected', false);
    $btn.attr('aria-selected', true);
    if ($closest.length) ui.Tab.line($closest);
  },
  panelActive: function (panel, siblings, isAni, isScroll) {
    if (isAni === undefined) isAni = false;
    if (isScroll === undefined) isScroll = false;
    const $panel = $(panel);
    const $siblings = $(siblings);
    if (!$panel.length && !$siblings.length) return;
    const $isPanel = $panel.hasClass('tab-panel') || $siblings.hasClass('tab-panel');
    let $panelWrap = null;
    if ($panel.length) $panelWrap = $panel.closest('.tab-panels');
    if ($panelWrap === null) {
      const $siblingsSpl = siblings.split(',');
      if ($($siblingsSpl[0]).length) $panelWrap = $($siblingsSpl[0]).closest('.tab-panels');
    }
    if ($panelWrap.hasClass('tab-swipe-panels')) {
      const $swiper = $panelWrap.data('swiper');
      if ($swiper !== undefined && isAni) {
        // $swiper.slideTo($panel.index(), isAni ? 500 : 0);
        $swiper.slideTo($panel.index(), 300);
      }
    } else {
      const $panelWrapH = $panelWrap === null ? 0 : $panelWrap.outerHeight();
      const $panelWrapGap = $panelWrap === null ? 0 : $panelWrapH - $panelWrap.height();
      if (siblings === undefined || siblings === false || siblings === '') {
        if ($isPanel) {
          $panel.siblings('.tab-panel').attr('aria-expanded', false).removeClass('active');
          $panel.addClass('active').attr('aria-expanded', true);
        } else {
          $panel.show();
        }
      } else {
        if ($isPanel) {
          $siblings.attr('aria-expanded', false).removeClass('active');
          $panel.addClass('active').attr('aria-expanded', true);
        } else {
          $siblings.hide();
          $panel.show();
        }
      }
      if ($isPanel && isAni && $panelWrap.length) {
        let $setHeight = $panelWrapGap;
        $panelWrap.find('.tab-panel.active').each(function () {
          $setHeight += $(this).outerHeight();
        });
        if ($panelWrapH !== $setHeight) {
          $panelWrap.css('height', $panelWrapH).animate({ height: $setHeight }, 300, function () {
            $panelWrap.removeCss('height');
            if ($panel.length && isScroll) ui.Scroll.inScreen(panel);
          });
        }
      }
    }
  },
  select: function () {
    if ($('.ui-tab-select').length) {
      $('.ui-tab-select').each(function () {
        const $tarAry = [];
        let $panel;
        $(this)
          .find('option')
          .each(function () {
            const $tar = $(this).data('show');
            if ($tarAry.indexOf($tar) < 0 && !!$tar) $tarAry.push($tar);
            if ($(this).is(':selected')) {
              $panel = $tar;
            }
          });
        const $siblings = $tarAry.join(',');
        $(this).data('hide', $siblings);
        ui.Tab.panelActive($panel, $siblings);
      });
    }
  },
  radio: function () {
    if ($('.ui-tab-radio').length) {
      $('.ui-tab-radio').each(function () {
        let $panel;
        const $tarAry = [];
        $(this)
          .find('input[type=radio]')
          .each(function () {
            const $tar = $(this).data('show');
            if ($tarAry.indexOf($tar) < 0 && !!$tar) $tarAry.push($tar);
            if ($(this).prop('checked')) {
              $panel = $tar;
            }
          });
        const $siblings = $tarAry.join(',');
        $(this).data('hide', $siblings);
        if ($panel) ui.Tab.panelActive($panel, $siblings);
      });
    }
  },
  checkbox: function () {
    if ($('.ui-tab-check').length) {
      $('.ui-tab-check').each(function () {
        const $tarAry = [];
        const $showAry = [];
        $(this)
          .find('input[type=checkbox]')
          .each(function () {
            const $tar = $(this).data('show');
            if ($tarAry.indexOf($tar) < 0 && !!$tar) $tarAry.push($tar);
            if ($(this).prop('checked')) {
              if ($showAry.indexOf($tar) < 0 && !!$tar) $showAry.push($tar);
            }
          });
        const $siblings = $tarAry.join(',');
        $(this).data('hide', $siblings);
        if ($showAry.length) {
          const $panel = $showAry.join(',');
          ui.Tab.panelActive($panel, $siblings);
        }
      });
    }
  },
  swipe: function (element) {
    const $element = $(element);
    $element.each(function () {
      const $this = $(this);
      $this.addClass('_autoHeight');
      $this.attr('data-view', 1);
      ui.Swiper.ready($this);

      const $tabChageEvt = function (e) {
        const $index = e.realIndex;
        const $activePanel = $(e.slides[$index]);
        const $activePanelId = $activePanel.attr('id');
        const $activeBtn = $('[href="#' + $activePanelId + '"]');

        $this.find('.swiper-slide').attr({
          'aria-expanded': false,
          'aria-hidden': true
        });
        $activePanel.attr('aria-expanded', true).removeAttr('aria-hidden');
        if ($activeBtn.length) ui.Tab.tabActive($activeBtn);
      };
      ui.Swiper.base($this, $tabChageEvt);

      $this.find('.swiper-slide').attr({
        'aria-expanded': false,
        'aria-hidden': true
      });
      $this.find('.swiper-slide.swiper-slide-active').attr('aria-expanded', true).removeAttr('aria-hidden');
    });
  },
  isTabInit: false,
  ready: function () {
    if ($('.tab-navi-menu').length) ui.Tab.scrolledCheck('.tab-navi-menu');
    ui.Tab.activeCenter();

    if ($('.tab-swipe-panels').length) {
      ui.Tab.swipe('.tab-swipe-panels');
    }

    const $uiTab = $('.ui-tab');
    const $hash = location.hash;
    if ($uiTab.length) {
      $uiTab.each(function (e) {
        const $this = $(this);
        let $hashActive = null;
        const $tarAry = [];
        let $tab = $this.find('.tab');
        if (!$tab.length) $tab = $this.find('li');
        $tab.each(function (f) {
          const _a = $(this).find('a');
          let _aId = _a.attr('id');
          const _href = _a.attr('href');
          if (_a.length && $(_href).length) {
            if (!_aId) _aId = 'tab_btn_' + e + '_' + f;
            if (_href !== '' && _href !== '#') $tarAry.push(_href);
            _a.attr({
              id: _aId,
              'aria-controls': _href.substring(1)
            });
            $(_href).attr({
              role: 'tabpanel',
              'aria-labelledby': _aId
            });
            if (_href === $hash || $(_href).find($hash).length) {
              $hashActive = _a;
            }
          }
        });
        if ($tarAry.length) $this.data('target', $tarAry.join(','));

        let $active;
        if ($hashActive) {
          $active = $hashActive;
        } else if ($this.find('.active').length) {
          $active = $this.find('.active').find('a');
        } else {
          $active = $this.find('li').eq(0).find('a');
        }
        ui.Tab.tabActive($active);
        const $href = $active.attr('href');
        ui.Tab.panelActive($href);
      });
    }

    ui.Tab.select();
    ui.Tab.radio();
    ui.Tab.checkbox();
  },
  resize: function () {
    if ($('.tab-navi-menu').length) ui.Tab.scrolledCheck('.tab-navi-menu');
    if ($('.tab-line').length && ui.Tab.isTabInit) {
      $('.tab-line').each(function () {
        const $this = $(this);
        if (parseInt($this.css('left')) === 0) return;
        const $parent = $this.closest('.tab-inner').parent();
        ui.Tab.line($parent, false);
      });
    }
  },
  UI: function () {
    $(document).on('click', '.ui-tab a', function (e) {
      e.preventDefault();
      const $this = $(this);
      ui.Tab.tabActive($this);
      const $href = $this.attr('href');
      const $closest = $this.closest('.ui-tab');
      const $siblings = $closest.data('target');
      ui.Tab.panelActive($href, $siblings, true, true);
      const $tab = $(this).closest('.tab').length ? $(this).closest('.tab') : $(this).closest('li');
      const $tabInner = $tab.closest('.tab-inner');
      if ($tabInner.length) {
        const isScroll = ui.Scroll.isVisible($tabInner);
        if (isScroll) ui.Scroll.center($tab);
      }

      let $winScrollTop = $(window).scrollTop();
      const $topFixed = $this.closest('.top-fixed');
      if ($topFixed.length) {
        let $scrollMove = getOffset($topFixed[0]).top;
        if ($('#header').length) {
          $winScrollTop = $winScrollTop - $('#header').outerHeight();
          $scrollMove = $scrollMove - $('#header').outerHeight();
        }
        if ($winScrollTop > $scrollMove) ui.Scroll.move($scrollMove);
      }

      if ($($href).length) {
        //ui.Animation
        if ($($href).find('.animate__animated').length) {
          setTimeout(function () {
            $($href).find('.animate__animated').addClass('paused');
            $(window).scroll();
          }, 100);
        }

        if ($($href).find('.ui-swiper').length) {
          ui.Swiper.update($($href).find('.ui-swiper'));
        }
      }
    });

    $(document).on('click', '.tab-expand-btn button', function (e) {
      e.preventDefault();
      const $closest = $(this).closest('.tab-expand-btn');
      const $wrap = $closest.parent();
      const $list = $closest.siblings('.tab-inner').find('.tab-list').clone();
      if ($(this).hasClass('on')) {
        $(this).removeClass('on');
        $wrap.removeClass('is-expand');
        $closest.next('.tab-expand').remove();
      } else {
        $(this).addClass('on');
        if (!$wrap.find('.tab-expand').length) {
          $closest.after('<div class="tab-expand"></div>');
          const $expand = $closest.next('.tab-expand');
          $expand.append($list);
          $expand.find('.tab-list').removeClass('tab-list');
          $expand.find('.tab').removeClass('tab');
        }
        $wrap.addClass('is-expand');
      }
    });

    //select tab
    $(document).on('change', '.ui-tab-select', function (e) {
      const $show = $(this).find(':selected').data('show');
      const $hide = $(this).data('hide');
      ui.Tab.panelActive($show, $hide, true);
    });

    //radio tab
    $(document).on('change', '.ui-tab-radio input', function (e) {
      const $show = $(this).data('show');
      const $hide = $(this).closest('.ui-tab-radio').data('hide');
      ui.Tab.panelActive($show, $hide, true, true);
    });

    //checkbox tab
    $(document).on('change', '.ui-tab-check input', function (e) {
      const $closest = $(this).closest('.ui-tab-check');
      const $hide = $closest.data('hide');
      const $showAry = [];
      $closest.find('input[type=checkbox]').each(function () {
        const $tar = $(this).data('show');
        if ($(this).prop('checked')) {
          if ($showAry.indexOf($tar) < 0 && !!$tar) $showAry.push($tar);
        }
      });
      if ($showAry.length) {
        const $panel = $showAry.join(',');
        ui.Tab.panelActive($panel, $hide, true);
      } else {
        ui.Tab.panelActive(false, $hide, true);
      }
    });

    //scrollto
    $(document).on('click', '.ui-tab-scrollto a', function (e) {
      e.preventDefault();
      const $this = $(this);
      const $href = $this.attr('href');
      const $headH = $('#header').length ? $('#header').outerHeight() : 0;
      const $top = $($href).offset().top - $headH;
      ui.Scroll.move($top);
    });
  },
  init: function () {
    ui.Tab.tabInfo();
    ui.Tab.ariaSet();
    ui.Tab.ready();
    ui.Tab.UI();
  }
};
//툴팁
ui.Tooltip = {
  resize: function () {
    if (!$('.tooltip-btn.on').length) return;
    $('.tooltip-btn.on').each(function () {
      const $btn = $(this);
      const $wrap = $btn.closest('.tooltip-wrap');
      const $cont = $wrap.find('.tooltip-cont');
      const $winW = $(window).width() - 40;
      const $btnW = $btn.width();
      const $btnX = Math.min($winW + $btnW / 2 - 2, $btn.offset().left) - 20;
      let $scrollEnd = $(window).height() + $(window).scrollTop();
      if ($('.bottom-fixed:visible').length) $scrollEnd = $scrollEnd - $('.bottom-fixed').children().outerHeight();
      const $left = Math.max(-4, $btnX);
      $cont.children('.tooltip-arr').css({
        left: $left + $btnW / 2
      });
      $cont.css({
        width: $winW,
        left: -$left
      });
      const $contY = $wrap.offset().top + $wrap.outerHeight() + parseInt($cont.css('margin-top')) + parseInt($cont.css('margin-bottom')) + $cont.outerHeight();
      if ($cont.hasClass('is-bottom')) {
        $cont.addClass('bottom');
      } else {
        if ($scrollEnd - 10 < $contY) {
          $cont.addClass('bottom');
        } else {
          $cont.removeClass('bottom');
        }
      }
    });
  },
  position: function (tar) {
    const $tar = $(tar);

    if (!$tar.children('.tooltip-arr').length) $tar.prepend('<i class="tooltip-arr" aria-hidden="true"></i>');
    if (!$tar.children('.tooltip-close').length) $tar.append('<a href="#" class="tooltip-close" role="button" aria-label="툴팁닫기"></a>');
    ui.Tooltip.resize();
  },
  aria: function (element) {
    $(element).each(function (e) {
      const $btn = $(this).find('.tooltip-btn');
      const $cont = $(this).find('.tooltip-cont');
      let $contId = $cont.attr('id');
      const $closeBtn = $(this).find('.tooltip-close');
      if (!$contId) $contId = 'ttCont-' + e;
      $btn.attr({
        role: 'button',
        'aria-describedby': $contId
      });
      $cont.attr({
        id: $contId,
        role: 'tooltip'
      });
      $closeBtn.attr('role', 'button');
    });
  },
  init: function () {
    ui.Tooltip.aria('.tooltip-wrap');

    //열기
    $(document).on('click', '.tooltip-wrap .tooltip-btn', function (e) {
      e.preventDefault();
      const $cont = $(this).closest('.tooltip-wrap').find('.tooltip-cont');
      if ($(this).hasClass('is-pop')) {
        const $popContent = $cont.html();
        const $popTitle = $cont.attr('title');
        if ($popTitle !== undefined) {
          Layer.tooltip($popContent, $popTitle);
        } else {
          Layer.tooltip($popContent);
        }
      } else {
        if ($(this).hasClass('on')) {
          $cont.stop(true, false).fadeOut();
          $(this).removeClass('on');
        } else {
          $('.tooltip-btn').removeClass('on');
          $('.tooltip-cont').fadeOut();
          $(this).addClass('on');
          $cont.stop(true, false).fadeIn();
          setTimeout(function () {
            ui.Tooltip.position($cont);
          }, 30);
        }
      }
    });
    //닫기
    $(document).on('click', '.tooltip-close', function (e) {
      e.preventDefault();
      const $cont = $(this).closest('.tooltip-cont');
      $cont.stop(true, false).fadeOut();
      $cont.siblings('.tooltip-btn').removeClass('on').focus();
    });
    $(document)
      .on('click touchend', function (e) {
        $('.tooltip-cont').stop(true, false).fadeOut();
        $('.tooltip-wrap .tooltip-btn').removeClass('on');
      })
      .on('click touchend', '.tooltip-wrap', function (e) {
        e.stopPropagation();
      });
  }
};

ui.Touch = {
  rotateWrap: '.ui-touch-rotate .rotate-items',
  rotateItem: function () {
    if (!$(ui.Touch.rotateWrap).length) return;
    const $wrap = $(ui.Touch.rotateWrap);
    const $items = $wrap.find('.rotate-item');
    const $radius = $wrap.outerWidth() / 2;
    const $total = $items.length;
    const $theta = [];
    const $rotate = 360;
    const $frags = $rotate / $total;
    for (let i = 0; i < $total; i++) {
      $theta.push(($frags / 180) * i * Math.PI);
    }
    const $wrapH = $wrap.height();
    $items.each(function (j) {
      const $this = $(this);
      const $thisW = $this.outerWidth();
      const $thisH = $this.outerHeight();
      const $posX = Math.round($radius * Math.sin($theta[j]));
      const $posY = Math.round($radius * Math.cos($theta[j]));
      const $left = $wrapH / 2 + $posX - $thisW / 2;
      const $top = $wrapH / 2 - $posY - $thisH / 2;
      $(this).css({
        left: $left,
        top: $top
      });
    });
  },
  rotate: function (element) {
    let ang = 0; // All angles are expressed in radians
    let angStart = 0;
    let isStart = false;
    let isTouch = false;

    const _angXY = (ev) => {
      const bcr = element.getBoundingClientRect();
      const radius = bcr.width / 2;
      const clientX = ev.touches ? ev.touches[0].clientX : ev.clientX;
      const clientY = ev.touches ? ev.touches[0].clientY : ev.clientY;
      const y = clientY - bcr.top - radius; // y from center
      const x = clientX - bcr.left - radius; // x from center
      return Math.atan2(y, x);
    };

    const _start = (ev) => {
      if (ev.touches !== undefined) {
        isTouch = true;
        Body.lock();
      }
      isStart = true;
      angStart = _angXY(ev) - ang;
      setTimeout(function () {
        element.classList.add('rotating');
      }, 10);
    };

    const _move = (ev) => {
      if (!isStart) return;
      if (!isTouch) ev.preventDefault();
      ang = _angXY(ev) - angStart;
      const deg = radToDeg(ang);
      element.style.transform = 'rotate(' + deg + 'deg)';
      const $items = element.querySelectorAll('.rotate-item');
      $items.forEach(function (item) {
        item.style.transform = 'rotate(' + deg * -1 + 'deg)';
      });
    };

    const _end = () => {
      isStart = false;
      if (isTouch) {
        isTouch = false;
        Body.unlock();
      }
      element.classList.remove('rotating');
    };

    element.addEventListener('mousedown', _start, false);
    document.addEventListener('mousemove', _move, false);
    document.addEventListener('mouseup', _end, false);
    element.addEventListener('touchstart', _start, false);
    document.addEventListener('touchmove', _move, false);
    document.addEventListener('touchend', _end, false);
  },
  init: function () {
    ui.Touch.rotateItem();
    document.querySelectorAll(ui.Touch.rotateWrap).forEach(ui.Touch.rotate);
  }
};

//폼요소 관련
ui.Form = {
  winLoad: function () {
    //select off효과
    $('select').each(function () {
      const $val = $(this).val();
      if ($val == '' || $val == null) {
        $(this).addClass('off');
      }
    });
    $(document).on('change', 'select', function () {
      const $val = $(this).val();
      if ($val == '') {
        $(this).addClass('off');
      } else {
        $(this).removeClass('off');
      }
    });

    //페이지 로딩 후 검색박스에 입력값이 있으면 X 버튼 추가
    $('.search_box .input input').each(function () {
      if ($(this).val() != '') $(this).after('<a href="#" class="btn-inp-del" role="button" aria-label="입력내용삭제"></a>');
    });

    //입력 텍스트 카운팅(로딩)
    $('[data-text-count]').each(function (e) {
      ui.Form.textCount(this);
    });
  },
  focus: function () {
    const $inpEls = 'input:not(:checkbox):not(:radio):not(:hidden), select, textarea, .btn-select';
    $(document).on('focusin', $inpEls, function (e) {
      const $this = $(this);
      if (!$this.prop('readonly') && !$this.prop('disabled')) $('html').addClass('inp-focus');
      if ($this.is('input') && $this.closest('.input').length) $this.closest('.input').addClass('focus');
      if ($this.is('select') && $this.closest('.select').length) $this.closest('.select').addClass('focus');
      if ($this.hasClass('btn-select') && $this.closest('.select').length) $this.closest('.select').addClass('focus');
      if ($this.is('textarea') && $this.closest('.textarea').length) $this.closest('.textarea').addClass('focus');
    });
    $(document).on('focusout', $inpEls, function (e) {
      const $this = $(this);
      $('html').removeClass('inp-focus');
      if ($this.closest('.form-item').length) $this.closest('.form-item').removeClass('focus');
      if ($this.is('input') && $this.closest('.input').length) $this.closest('.input').removeClass('focus');
      if ($this.is('select') && $this.closest('.select').length) $this.closest('.select').removeClass('focus');
      if ($this.hasClass('btn-select') && $this.closest('.select').length) $this.closest('.select').removeClass('focus');
      if ($this.is('textarea') && $this.closest('.textarea').length) $this.closest('.textarea').removeClass('focus');
    });
  },
  select: function () {
    const $select = $('.select').not('.btn, .not');
    if ($select.length) {
      $select.each(function (e) {
        const $this = $(this);
        const $selEl = $this.find('select');
        $selEl.each(function () {
          const $sel = $(this);
          let $selId = $sel.attr('id');
          let $title = $sel.attr('title');

          if ($selId == undefined) $selId = 'none';
          if ($title == undefined) $title = '선택';
          const $btnTitle = '팝업으로 ' + $title;
          const $btnHtml = '<a href="#' + $selId + '" class="btn-select ui-select-open" title="' + $btnTitle + '" role="button"><span class="val"></span></a>';

          if (!$sel.siblings('.btn-select').length) {
            $sel.hide().after($btnHtml);
            const $forLbl = $('label[for="' + $selId + '"]');
            if ($forLbl.length) {
              $forLbl.addClass('ui-select-lbl').attr('title', $btnTitle);
            }

            $sel.change(function () {
              const $val = $(this).val();
              ('');
              let $selectTxt = $(this).find(':selected').text();
              if ($selectTxt == '') $selectTxt = '선택';
              $(this).siblings('.btn-select').find('.val').html($selectTxt);
              if ($val == '') {
                $(this).siblings('.btn-select').addClass('off');
              } else {
                $(this).siblings('.btn-select').removeClass('off');
              }
            });
            $sel.change();
          }
        });
      });
    }
  },
  select2: function () {
    const $select = $('.select.inline');
    if ($select.length) {
      $select.each(function () {
        const $this = $(this);
        const $select = $this.find('select');
        let $selId = $select.attr('id');
        let $title = $select.attr('title');

        if ($select.length && !$select.siblings('.btn-select').length) {
          if ($selId == undefined) $selId = 'none';
          if ($title == undefined) $title = '선택';
          const $btnHtml = '<a href="#' + $selId + '" class="btn-select" title="' + $title + '" role="button"><span class="val"></span></a>';
          let $optionHtml = '<div class="option-wrap">';
          $select.children().each(function () {
            const $val = $(this).attr('value');
            const $text = $(this).text();
            $optionHtml += '<a href="#" class="option" data-val="' + $val + '">' + $text + '</a>';
          });
          $optionHtml += '</div>';
          $select.hide().after($btnHtml);
          $this.append($optionHtml);
          $select.change(function () {
            const $val = $(this).val();
            let $selectTxt = $(this).find(':selected').text();
            if ($selectTxt == '') $selectTxt = '선택';
            $(this).siblings('.btn-select').find('.val').html($selectTxt);
            if ($val == '') {
              $(this).siblings('.btn-select').addClass('off');
            } else {
              $(this).siblings('.btn-select').removeClass('off');
            }
          });
          $select.change();
        }
      });
    }
  },
  selectUI: function () {
    $(document).on('click', '.select.inline .btn-select', function (e) {
      e.preventDefault();
      const $closest = $(this).closest('.select');
      const $select = $closest.find('select');
      if (!$select.length) return;
      const $val = $select.val();
      const $option = $closest.find('.option[data-val="' + $val + '"]');
      $option.addClass('selected').siblings().removeClass('selected');
      $(this).closest('.select').toggleClass('option-open');
    });
    $(document).on('click', '.select.inline .option', function (e) {
      e.preventDefault();
      const $val = $(this).data('val');
      const $select = $(this).closest('.select').find('select');
      $select.val($val).change();
      $(this).closest('.select').removeClass('option-open');
    });

    $(document).on('change', '.datepicker-etc-select', function (e) {
      const $val = $(this).val();
      if ($('.datepicker-etc').length) {
        if ($val === 'etc') {
          $('.datepicker-etc').slideDown(300);
        } else {
          $('.datepicker-etc').slideUp(300);
        }
      }
    });
  },
  input: function () {
    //input[type=number][maxlength] 되게 처리..(하지만 디바이스 탐): number type을 안쓰는게 좋음
    $(document).on('change keyup input', 'input[type=number][maxlength]', function (e) {
      const $this = $(this);
      const $val = $this.val();
      const $max = $this.attr('maxlength');
      const $length = $val.length;
      let $dataVal = $this.data('val');
      if ($dataVal == undefined) $dataVal = '';
      if ($length > $max) {
        $this.val($dataVal);
      } else {
        $this.data('val', $val);
      }
    });

    //form 안에 input이 1개일때 엔터시 새로고침 현상방지
    $(document).on('keydown', 'form input', function (e) {
      const $keyCode = e.keyCode ? e.keyCode : e.which;
      const $form = $(this).closest('form');
      const $length = $form.find('input').not('[type=checkbox],[type=radio]').length;

      if ($length == 1 && !$(this).closest('.search_box').length) {
        //.search_box 검색창은 예외
        if ($keyCode == 13) return false;
      }
    });

    //list input[type=checkbox]
    $(document).on('change', '.chk-item input', function () {
      const $this = $(this);
      if ($this.prop('checked') == true) {
        $this.closest('.chk-item').addClass('checked');
        if ($this.attr('type') == 'radio') $this.closest('.chk-item').siblings('.chk-item').removeClass('checked');
      } else {
        $this.closest('.chk-item').removeClass('checked');
      }
    });
  },
  inpBtn: function () {
    //input 삭제버튼
    $(document).on('keyup focusin', '.input input', function () {
      const $this = $(this);
      const $val = $this.val();
      if ($this.data('removeDelBtn') !== undefined) clearTimeout($this.data('removeDelBtn'));
      if ($this.data('removePwdBtn') !== undefined) clearTimeout($this.data('removePwdBtn'));
      if (
        $this.prop('readonly') ||
        $this.prop('disabled') ||
        $this.hasClass('hasDatepicker') ||
        $this.hasClass('time') ||
        $this.attr('type') === 'date' ||
        // $this.hasClass('t-right') ||
        // $this.hasClass('t-center') ||
        $this.hasClass('no-del')
      ) {
        return false;
      }
      if ($val != '') {
        if (!$this.siblings('.btn-inp-del').length && !$this.siblings('.datepicker').length) {
          $this.after('<a href="#" class="btn-inp-del" role="button" aria-label="입력내용삭제"></a>');
        }

        if ($this.closest('.input').hasClass('password') && !$this.closest('.input').find('.btn-inp-pwd').length) {
          $this.closest('.input').append('<a href="#" class="btn-inp-pwd" role="button" aria-label="비밀번호 입력확인"></a>');
        }
      } else {
        if ($this.siblings('.btn-inp-del').length) {
          const removeDelBtn = setTimeout(function () {
            $this.siblings('.btn-inp-del').remove();
            $this.removeData('removeDelBtn');
          }, 10);
          $this.data('removeDelBtn', removeDelBtn);
        }
        if ($this.siblings('.btn-inp-pwd').length) {
          const removePwdBtn = setTimeout(function () {
            $this.siblings('.btn-inp-pwd').remove();
            $this.removeData('removePwdBtn');
          }, 10);
          $this.data('removePwdBtn', removePwdBtn);
        }
      }
    });
    $(document).on('focusout', '.input input, .textarea textarea', function () {
      const $this = $(this);
      if ($this.siblings('.btn-inp-del').length) {
        const removeDelBtn = setTimeout(function () {
          $this.siblings('.btn-inp-del').remove();
          $this.removeData('removeDelBtn');
        }, 300);
        $this.data('removeDelBtn', removeDelBtn);
      }
    });
    $(document).on('click', '.btn-inp-del', function () {
      const $inp = $(this).prev();
      $inp.val('').change().focus().keyup();
    });
    $(document).on('click', '.btn-inp-pwd', function () {
      const $inp = $(this).siblings('input');
      if ($inp.attr('type') === 'password') {
        $inp.attr('type', 'text');
      } else {
        $inp.attr('type', 'password');
      }
    });
  },
  textareaSpace: function () {
    $('.textarea.auto-height').each(function () {
      const $val = $(this).find('textarea').val();
      const $space = '<div class="textarea-space">' + $val + '<div>';
      if (!$(this).find('.textarea-space').length) $(this).append($space);
    });
  },
  textarea: function () {
    // ui.Form.textareaSpace();
    const textareaHeight = function (elem) {
      const $val = $(elem).val();
      const $lines = $val.split(/\r|\r\n|\n/);
      const $count = $lines.length;
      const $lineH = parseInt($(elem).css('line-height'));
      const $pd = parseInt($(elem).css('padding-top')) + parseInt($(elem).css('padding-bottom'));
      $(elem).css('height', $count * $lineH + $pd);
    };

    $(document).on('keyup keydown keypress change', '.textarea.auto-height textarea', function () {
      textareaHeight(this);
    });

    $('.textarea.auto-height textarea').each(function () {
      textareaHeight(this);
    });
  },
  success: function (element, messege) {
    const $el = $(element);
    const $closest = $el.closest('.validate-item').length ? $el.closest('.validate-item') : $el.parent();
    $closest.removeClass('is-error').addClass('is-success');
    if ($closest.siblings('.validate-txt').length) {
      $closest.siblings('.validate-txt').removeClass('is-error').addClass('is-success').html(messege);
    } else {
      $closest.after('<div class="validate-txt is-success">' + messege + '</div>');
    }
  },
  error: function (element, messege) {
    const $el = $(element);
    let $closest = $el;
    if ($closest.is('input') || $closest.is('select') || $closest.is('textarea')) $closest = $closest.parent();
    if ($el.closest('.validate-item').length) $closest = $el.closest('.validate-item');

    if (messege === false) {
      $closest.removeClass('is-error');
      if ($closest.siblings('.validate-txt.is-error').length) $closest.siblings('.validate-txt.is-error').remove();
    } else {
      $closest.removeClass('is-success').addClass('is-error');
      if ($closest.siblings('.validate-txt').length) {
        $closest.siblings('.validate-txt').removeClass('is-success').addClass('is-error').html(messege);
      } else {
        $closest.after('<div class="validate-txt is-error">' + messege + '</div>');
      }
      if (!$el.is(':focus')) $el.focus();
    }
  },
  textCount: function (element, e) {
    const $el = $(element);
    const $val = $el.val();
    const $max = $el.attr('maxlength');
    const $length = $val.length;
    let $target = $el.data('text-count');
    if ($target == true) {
      $target = $el.siblings('.byte').find('strong');
    } else {
      $target = $('#' + $target);
    }
    if (!!e && (e.type == 'keyup' || e.type == 'keypress')) {
      if ($max === undefined) {
        $target.text($length);
      } else {
        $target.text(Math.min($max, $length));
      }
    } else {
      if ($val != '') $target.text(Math.min($max, $length));
    }
  },
  agree: function () {
    const $wrapClass = '.ui-agree';
    const $allAgreeChkClass = '.ui-all-agree-chk';
    const $agreeChkClass = '.ui-agree-chk';

    // 전체동의
    $($wrapClass + ' ' + $allAgreeChkClass).change(function () {
      const $this = $(this);
      const $wrap = $this.closest($wrapClass);
      const $items = $wrap.find($agreeChkClass);
      if ($(this).prop('checked')) {
        $items.prop('checked', true).change();
      } else {
        $items.prop('checked', false).change();
      }
    });
    $($wrapClass + ' ' + $agreeChkClass).change(function () {
      const $this = $(this);
      const $wrap = $this.closest($wrapClass);
      const $allchk = $wrap.find($allAgreeChkClass);
      const $items = $wrap.find($agreeChkClass);
      const $itemsLength = $items.length;
      const $itemsChecked = $wrap.find($agreeChkClass + ':checked').length;
      if ($itemsLength === $itemsChecked) {
        $allchk.prop('checked', true);
      } else {
        $allchk.prop('checked', false);
      }
    });

    // 선택약관(문자, 메일수신)
    $('[data-agree-target]').each(function () {
      const $this = $(this);
      const $dataTargets = $this.data('agree-target').split(',');
      const $targets = [];
      $.each($dataTargets, function () {
        if ($(this.trim()).length) $targets.push(this.trim());
      });

      $this.change(function () {
        let $checked = 0;
        if ($(this).prop('checked')) {
          $.each($targets, function () {
            if ($('' + this).prop('checked')) $checked += 1;
          });
          if ($checked === 0) {
            $.each($targets, function () {
              $('' + this).prop('checked', true);
            });
          }
        } else {
          $.each($targets, function () {
            $('' + this).prop('checked', false);
          });
        }
      });

      $.each($targets, function () {
        $('' + this).change(function () {
          let $checked = 0;
          if ($(this).prop('checked')) {
            $this.prop('checked', true).change();
          } else {
            $.each($targets, function () {
              if ($('' + this).prop('checked')) $checked += 1;
            });
            if ($checked === 0) $this.prop('checked', false).change();
          }
        });
      });
    });
  },
  mail: function () {
    // 이메일 직접입력
    const mailCheck = function (element, isFocus) {
      const $this = $(element);
      const $val = $this.val();
      const $closest = $this.closest('.inp-mail');
      const $inp = $closest.find('.input').last().find('input');
      if ($this.find(':selected').text() === '직접입력') {
        $inp.closest('.input').removeClass('disabled');
        $inp.prop('readonly', false);
        if (isFocus) $inp.focus();
      } else {
        $inp.closest('.input').addClass('disabled');
        $inp.prop('readonly', true).val($val);
      }
    };
    $(document).on('change', '.inp-mail select', function () {
      mailCheck(this, true);
    });
    $('.inp-mail select').each(function () {
      mailCheck(this, false);
    });
  },
  etc: function () {
    //버튼 스위치
    const $swichBtn = $('.checkbox.switch input');
    $swichBtn.each(function () {
      const $lbl = $(this).siblings('.lbl');
      let $lblTxt = '';
      if ($(this).prop('checked')) {
        if ($lbl.attr('aria-label') != undefined) {
          $lblTxt = $lbl.attr('aria-label');
          if ($lblTxt.indexOf('해제') >= 0) {
            $lblTxt = $lblTxt.replace('해제', '등록');
            $lbl.attr('aria-label', $lblTxt);
          }
        } else if ($lbl.find('.blind').length) {
          $lblTxt = $lbl.find('.blind').text();
          if ($lblTxt.indexOf('해제') >= 0) {
            $lblTxt = $lblTxt.replace('해제', '등록');
            $lbl.find('.blind').text($lblTxt);
          }
        } else {
          $lblTxt = $lbl.text();
          if ($lblTxt.indexOf('해제') >= 0) {
            $lblTxt = $lblTxt.replace('해제', '등록');
            $lbl.text($lblTxt);
          }
        }
      }
      /*else{
        $lblTxt = $lblTxt.replace('등록','해제');
        $lbl.find('.blind').text($lblTxt);
      }*/
    });
    $swichBtn.on('change', function () {
      const $lbl = $(this).siblings('.lbl');
      let $lblTxt = $lbl.text();
      if ($(this).prop('checked')) {
        if ($lbl.attr('aria-label') != undefined) {
          $lblTxt = $lbl.attr('aria-label');
          if ($lblTxt.indexOf('해제') >= 0) {
            $lblTxt = $lblTxt.replace('해제', '등록');
            $lbl.attr('aria-label', $lblTxt);
          }
        } else if ($lbl.find('.blind').length) {
          $lblTxt = $lbl.find('.blind').text();
          if ($lblTxt.indexOf('해제') >= 0) {
            $lblTxt = $lblTxt.replace('해제', '등록');
            $lbl.find('.blind').text($lblTxt);
          }
        } else {
          $lblTxt = $lbl.text();
          if ($lblTxt.indexOf('해제') >= 0) {
            $lblTxt = $lblTxt.replace('해제', '등록');
            $lbl.text($lblTxt);
          }
        }
      } else {
        if ($lbl.attr('aria-label') != undefined) {
          $lblTxt = $lbl.attr('aria-label');
          if ($lblTxt.indexOf('등록') >= 0) {
            $lblTxt = $lblTxt.replace('등록', '해제');
            $lbl.attr('aria-label', $lblTxt);
          }
        } else if ($lbl.find('.blind').length) {
          $lblTxt = $lbl.find('.blind').text();
          if ($lblTxt.indexOf('등록') >= 0) {
            $lblTxt = $lblTxt.replace('등록', '해제');
            $lbl.find('.blind').text($lblTxt);
          }
        } else {
          $lblTxt = $lbl.text();
          if ($lblTxt.indexOf('등록') >= 0) {
            $lblTxt = $lblTxt.replace('등록', '해제');
            $lbl.text($lblTxt);
          }
        }
      }
    });
  },
  spinner: function () {
    const $spinner = $('.spinner');
    if ($spinner.length) {
      $spinner.each(function () {
        const $this = $(this);
        const $input = $this.find('input');
        $input.change();
      });
    }
  },
  spinnerUI: function () {
    $(document).on('click', '.spinner .button', function (e) {
      e.preventDefault();
      const $this = $(this);
      const $spinner = $this.closest('.spinner');
      const $input = $spinner.find('input');
      const $val = parseInt($input.val());
      if ($this.hasClass('minus')) {
        $input.val($val - 1).change();
      } else if ($this.hasClass('plus')) {
        $input.val($val + 1).change();
      }
    });
    $(document).on('change', '.spinner input', function () {
      const $this = $(this);
      const $spinner = $this.closest('.spinner');
      const $min = $spinner.data('min') !== undefined ? $spinner.data('min') : 1;
      const $max = $spinner.data('max') !== undefined ? $spinner.data('max') : 999;
      let $val = parseInt($this.val());
      if ($this.val() === '' || $val < $min) {
        $val = $min;
        $this.val($min);
      } else if ($val > $max) {
        $val = $max;
        $this.val($max);
      }
      const $btnMinus = $spinner.find('.minus');
      const $btnPlus = $spinner.find('.plus');
      if ($val <= $min) {
        $btnMinus.prop('disabled', true);
      } else {
        $btnMinus.prop('disabled', false);
      }
      if ($val >= $max) {
        $btnPlus.prop('disabled', true);
      } else {
        $btnPlus.prop('disabled', false);
      }
    });
  },
  jqRange: function () {
    if ($('.range-slider').length) {
      $('.range-slider').each(function () {
        const isMutilple = $(this).hasClass('multiple') ? true : false;
        const $slider = $(this).find('.slider');
        const $list = $(this).find('.list');
        const $inp = $(this).find('input[type=hidden]');
        const $unit = $list.data('unit') !== undefined ? $list.data('unit') : '';
        const $title = $list.attr('title');
        let $min = parseInt($slider.data('min'));
        let $max = parseInt($slider.data('max'));
        let $val = isMutilple ? $slider.data('value') : parseInt($slider.data('value'));
        let $step = parseInt($slider.data('step'));

        if (!$min) $min = 0;
        if (!$max) $max = 10;
        if (!$step) $step = 1;
        if (!$val) $val = $min;
        if ($list.length) {
          $list.empty();
          if (!!$title) $list.removeAttr('title').append('<strong class="blind">' + $title + '</strong>');
          $list.append('<ul></ul>');
          for (let i = 0; i <= ($max - $min) / $step; i++) {
            if (isMutilple) {
              $list.find('ul').append('<li><span>' + (i * $step + $min) + $unit + '</span></li>');
            } else {
              $list.find('ul').append('<li><a href="#">' + (i * $step + $min) + $unit + '</a></li>');
            }
          }
        }
        if ($inp.length) $inp.val($val);
        const range = $slider.slider({
          range: isMutilple ? true : 'min',
          min: $min,
          max: $max,
          value: isMutilple ? null : $val,
          values: isMutilple ? $val : null,
          step: $step,
          create: function (e) {
            if (isMutilple) {
              $slider
                .find('.ui-slider-handle')
                .first()
                .html('<i>' + $val[0] + $unit + '</i>');
              $slider
                .find('.ui-slider-handle')
                .last()
                .html('<i>' + $val[1] + $unit + '</i>');
              $list
                .find('li')
                .eq(($val[0] - $min) / $step)
                .addClass('on')
                .find('a')
                .attr('title', '현재선택');
              $list
                .find('li')
                .eq(($val[1] - $min) / $step)
                .addClass('on')
                .find('a')
                .attr('title', '현재선택');
            } else {
              $slider.find('.ui-slider-handle').html('<i>' + $val + $unit + '</i>');
              $list
                .find('li')
                .eq(($val - $min) / $step)
                .addClass('on')
                .find('a')
                .attr('title', '현재선택');
            }
          },
          stop: function (event, ui) {
            if (isMutilple) {
              if ($inp.length) $inp.val(ui.values).change();
              $slider.data('value', ui.values);
              $slider
                .find('.ui-slider-handle')
                .eq(ui.handleIndex)
                .find('i')
                .html(ui.value + $unit);
              $list.find('li').removeClass('on').find('a').removeAttr('title');
              $list
                .find('li')
                .eq((ui.values[0] - $min) / $step)
                .addClass('on')
                .find('a')
                .attr('title', '현재선택');
              $list
                .find('li')
                .eq((ui.values[1] - $min) / $step)
                .addClass('on')
                .find('a')
                .attr('title', '현재선택');
            } else {
              if ($inp.length) $inp.val(ui.value).change();
              $slider.data('value', ui.value);
              $(ui.handle)
                .find('i')
                .html(ui.value + $unit);
              $list
                .find('li')
                .eq((ui.value - $min) / $step)
                .siblings()
                .removeClass('on')
                .find('a')
                .removeAttr('title');
              $list
                .find('li')
                .eq((ui.value - $min) / $step)
                .addClass('on')
                .find('a')
                .attr('title', '현재선택');
            }
          }
        });

        if (!isMutilple) {
          $list.find('a').click(function (e) {
            e.preventDefault();
            const $txt = parseInt($(this).text());
            range.slider('value', $txt);
            $slider.find('.ui-slider-handle i').text($txt + $unit);
            if ($inp.length) $inp.val($txt).change();
            $(this).parent().addClass('on').find('a').attr('title', '현재선택');
            $(this).parent().siblings().removeClass('on').find('a').removeAttr('title');
          });
        }
      });
    }
  },
  jqCalendar: function (element, callback, defaultDate) {
    //jquery UI datepicker
    const swipeArr = $('<div class="swipe-arr" aria-hidden="true"><i class="arr top"></i><i class="arr bottom"></i><i class="arr left"></i><i class="arr right"></i></div>');
    const swipeGuide = $('<div class="datepicker-guide">달력 부분을 상,하,좌,우 드래그하면<br>편리하게 이동할 수 있어요.</div>');
    let isSwipeGuide = true;
    const prevYrBtn = $('<a href="#" role="button" class="ui-datepicker-prev-y" aria-label="이전년도 보기"><span>이전년도 보기</span></a>');
    const nextYrBtn = $('<a href="#" role="button" class="ui-datepicker-next-y" aria-label="다음년도 보기"><span>다음년도 보기</span></a>');
    const calendarOpen = function (target, ob, delay) {
      if (delay == undefined || delay == '') delay = 5;
      setTimeout(function () {
        const $isInline = ob.inline ? true : false;
        const $calendar = $isInline ? '#' + ob.id : '#' + ob.dpDiv[0].id;
        const $header = $($calendar).find('.ui-datepicker-header');
        const $container = $($calendar).find('.ui-datepicker-calendar');
        const $min = $.datepicker._getMinMaxDate(target.data('datepicker'), 'min');
        const $minY = $min.getFullYear();
        const $max = $.datepicker._getMinMaxDate(target.data('datepicker'), 'max');
        const $maxY = $max.getFullYear();
        const $selectedYear = ob.selectedYear;
        const $dimmedClass = 'datepicker-dimmed';
        const $inlineInpClass = 'ui-datepicker-inline-inp';
        if ($isInline) {
          //인라인달력
          if (!$($calendar).find('.' + $inlineInpClass).length && !$($calendar).closest('.calendar-swiper').length)
            $($calendar).append('<div class="input mt10 blind"><input type="text" class="ui-datepicker-inline-inp" readonly></div>');
          const $getDate = $(target).datepicker('getDate');
          const $date = $.datepicker.formatDate('yy.mm.dd', $getDate);
          const $input = $($calendar).find('.ui-datepicker-inline-inp');
          if ($input.length) $input.val($date);
        } else {
          //팝업달력
          if (!$($calendar).find('.swipe-arr').length) $($calendar).prepend(swipeArr);
          if (isSwipeGuide) {
            $($calendar).addClass('add-guide').append(swipeGuide);
            isSwipeGuide = false;
          } else {
            $($calendar).removeClass('add-guide');
          }
          if (!$('.' + $dimmedClass).length) $($calendar).before('<div class="datepicker-dimmed" aria-hidden="true"></div>');
        }

        $header.find('.ui-datepicker-year').attr('title', '년 선택');
        $header.find('.ui-datepicker-month').attr('title', '월 선택');
        $container.find('td>a').attr('role', 'button');
        if ($container.find('.ui-state-highlight').length) $container.find('.ui-state-highlight').attr('title', '오늘 일자');
        if ($container.find('.ui-state-active').length) $container.find('.ui-state-active').attr('title', '현재 달력에서 선택된 일자');

        const $prevMonthBtn = $header.find('.ui-datepicker-prev');
        const $nextMonthBtn = $header.find('.ui-datepicker-next');
        $prevMonthBtn
          .attr({
            role: 'button',
            'aria-label': '이전달 보기'
          })
          .before(prevYrBtn);
        const $prevYearBtn = $header.find('.ui-datepicker-prev-y');
        if ($selectedYear <= $minY) {
          $prevYearBtn.addClass('ui-state-disabled').attr('aria-disabled', true);
          $($calendar).find('.swipe-arr .top').addClass('off');
        } else {
          $prevYearBtn.removeClass('ui-state-disabled').removeAttr('aria-disabled');
          $($calendar).find('.swipe-arr .top').removeClass('off');
        }
        $nextMonthBtn
          .attr({
            role: 'button',
            'aria-label': '다음달 보기'
          })
          .after(nextYrBtn);
        const $nextYearBtn = $header.find('.ui-datepicker-next-y');
        if ($selectedYear >= $maxY) {
          $nextYearBtn.addClass('ui-state-disabled').attr('aria-disabled', true);
          $($calendar).find('.swipe-arr .bottom').addClass('off');
        } else {
          $nextYearBtn.removeClass('ui-state-disabled').removeAttr('aria-disabled');
          $($calendar).find('.swipe-arr .bottom').removeClass('off');
        }
        if ($prevMonthBtn.hasClass('ui-state-disabled')) {
          $prevMonthBtn.attr('aria-disabled', true);
          $($calendar).find('.swipe-arr .left').addClass('off');
        } else {
          $prevMonthBtn.removeAttr('aria-disabled');
          $($calendar).find('.swipe-arr .left').removeClass('off');
        }
        if ($nextMonthBtn.hasClass('ui-state-disabled')) {
          $nextMonthBtn.attr('aria-disabled', true);
          $($calendar).find('.swipe-arr .right').addClass('off');
        } else {
          $nextMonthBtn.removeAttr('aria-disabled');
          $($calendar).find('.swipe-arr .right').removeClass('off');
        }

        //$header.find('.ui-datepicker-title').append('월');
        $header.find('.ui-datepicker-prev, .ui-datepicker-next').attr('href', '#');
        if (!$isInline) {
          if (ui.Mobile.any()) {
            $($calendar).find('.title').attr('tabindex', -1).focus();
            if ($('#wrap').length) $('#wrap').attr('aria-hidden', true);
          } else {
            $($calendar).attr('tabindex', 0).focus();
            Layer.focusMove($calendar);
          }

          if (!$container.data('init')) {
            $container.data('init', true);
            $container.swipe({
              swipeStatus: function (event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) {
                const $this = $(this);
                const $max = 30;
                const $btnPrevMonth = $header.find('.ui-datepicker-prev');
                const $btnNextMonth = $header.find('.ui-datepicker-next');
                const $btnPrevYear = $header.find('.ui-datepicker-prev-y');
                const $btnNextYear = $header.find('.ui-datepicker-next-y');
                if (direction != null) {
                  let $distance = Math.min($max, distance);
                  if (direction == 'left' || direction == 'up') $distance = -$distance;
                  if (direction == 'left' || direction == 'right') $this.css('left', $distance);
                  if (direction == 'up' || direction == 'down') $this.css('top', $distance);
                  if (phase == 'end' || phase == 'cancel') {
                    $this.animate(
                      {
                        left: 0,
                        top: 0
                      },
                      200,
                      function () {
                        if (Math.abs($distance) >= $max) {
                          if (direction == 'right' && !$btnPrevMonth.hasClass('ui-state-disabled')) $btnPrevMonth.click();
                          if (direction == 'left' && !$btnNextMonth.hasClass('ui-state-disabled')) $btnNextMonth.click();
                          if (direction == 'down' && !$btnPrevYear.hasClass('ui-state-disabled')) $btnPrevYear.click();
                          if (direction == 'up' && !$btnNextYear.hasClass('ui-state-disabled')) $btnNextYear.click();
                        }
                      }
                    );
                  }
                }
              },
              cancleTreshold: 0
            });
          }
        }

        $header
          .find('.ui-datepicker-prev-y')
          .unbind('click')
          .bind('click', function () {
            if (!$(this).hasClass('ui-state-disabled')) $.datepicker._adjustDate(target, -1, 'Y');
          });
        $header
          .find('.ui-datepicker-next-y')
          .unbind('click')
          .bind('click', function () {
            if (!$(this).hasClass('ui-state-disabled')) $.datepicker._adjustDate(target, +1, 'Y');
          });
      }, delay);
    };
    const calendarClose = function (target, ob, date) {
      const $isInline = ob.inline ? true : false;
      const $calendar = $isInline ? '#' + ob.id : '#' + ob.dpDiv[0].id;
      const $cal = $($calendar);
      if ($isInline) {
        //인라인달력
        const $date = date;
        const $input = $cal.find('.ui-datepicker-inline-inp');
        if ($input.length) $input.val($date);
      } else {
        //팝업달력
        Body.unlock();
        $(ob.input).change();
        if ($('#wrap').length) $('#wrap').removeAttr('aria-hidden');
        $cal.find('.title').removeAttr('tabindex');
        $('.datepicker-dimmed').remove();
        $(target).next('.ui-datepicker-trigger').focus();
        if ($(target).data('isReadonly') != true) $(target).prop('readonly', false);
      }
    };

    if ($(element).length) {
      $(element).each(function () {
        const $this = $(this);
        let $minDate = $(this).data('min');
        let $maxDate = $(this).data('max');
        let $defaultDate = $(this).data('default');
        let $range = $(this).data('range');
        if ($minDate == undefined) $minDate = '-100y';
        if ($maxDate == undefined) $maxDate = '+100y';
        if ($defaultDate == undefined) {
          $defaultDate = null;
        } else {
          if ($this.val() == '') $this.val($defaultDate);
        }
        if (!!defaultDate) $defaultDate = defaultDate;
        if ($range == undefined) $range = '-100:+100';
        const $inlineTag = 'div, span';
        let $isInline = false;
        if ($this.is($inlineTag)) $isInline = true;
        $this.datepicker({
          minDate: $minDate,
          maxDate: $maxDate,
          defaultDate: $defaultDate,
          closeText: '닫기',
          prevText: '이전달 보기',
          nextText: '다음달 보기',
          currentText: '오늘',
          buttonText: '기간조회',
          monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
          dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
          dateFormat: 'yy.mm.dd',
          yearRange: $range,
          yearSuffix: '. ',
          showMonthAfterYear: true,
          showButtonPanel: true,
          showOn: 'button',
          changeMonth: true,
          changeYear: true,
          showOtherMonths: true,
          selectOtherMonths: true,
          beforeShow: function (el, ob) {
            //열때
            if (!$isInline) {
              Body.lock();
              if ($this.prop('readonly') == true) {
                $this.data('isReadonly', true);
              } else {
                $this.prop('readonly', true);
              }
            }

            //기간 선택
            const $closest = $(this).closest('.date_wrap');
            if ($closest.length && $closest.find(element).length == 2) {
              const $idx = $closest.find(element).index(this);
              const $first = $closest.find(element).eq(0);
              const $last = $closest.find(element).eq(1);
              if ($idx == 0 && $last.val() != '') $first.datepicker('option', 'maxDate', $last.val());
              if ($idx == 1 && $first.val() != '') $last.datepicker('option', 'minDate', $first.val());
            }

            calendarOpen($this, ob);
          },
          onChangeMonthYear: function (y, m, ob) {
            //달력 바뀔때
            calendarOpen($this, ob);
          },
          onSelect: function (d, ob) {
            //선택할때
            calendarClose($this, ob, d);
            if ($isInline) calendarOpen($this, ob);

            //콜백
            if (!!callback) callback();
          },
          onClose: function (d, ob) {
            //닫을때
            calendarClose($this, ob, d);
          }
        });
        if ($isInline) {
          const $ob = $.datepicker._getInst($this[0]);
          calendarOpen($this, $ob);
        }

        //달력버튼 카드리더기에서 안읽히게
        $(this).siblings('.ui-datepicker-trigger').attr({
          'aria-label': '달력팝업으로 기간조회'
          //'aria-hidden':true,
          //'tabindex':-1
        });

        $(document).on('touchend', '.datepicker-dimmed', function () {
          $('.hasDatepicker').datepicker('hide');
        });
      });

      $(element).focusin(function () {
        if ($(this).hasClass('ui-date')) {
          const $val = $(this).val();
          $(this).val(onlyNumber($val));
        }
      });
      $(element).focusout(function () {
        if ($(this).hasClass('ui-date')) {
          const $val = $(this).val();
          $(this).val(autoDateFormet($val, '.'));
        }
      });
    }
  },
  character: function () {
    let $timer;
    const $character = document.querySelector('.character-face');
    if ($character === null) return;
    const $characterHidden = document.querySelector('.character-hidden');
    const _rotate3d = function (x, y, z, rad) {
      const face = $character.querySelectorAll('.ears, .eyes, .mouse');
      const value = `rotate3d(${x}, ${y}, ${z}, ${rad}rad)`;
      face.forEach(function (el) {
        el.style.transform = value;
      });
    };
    const _reset = function () {
      clearTimeout($timer);
      $character.classList.remove('playing');
      $timer = setTimeout(function () {
        $character.classList.remove('look-away', 'down', 'up');
        _rotate3d(0, 0, 0, 0);
      }, 1);
    };
    const _characterLook = function (event) {
      const el = event.target;
      const text = el.value.substr(0, el.selectionStart);
      $characterHidden.innerHTML = '<span>' + text + '.</span>';

      const characterRect = $character.getBoundingClientRect();
      const inputRect = el.getBoundingClientRect();
      const caretRect = $characterHidden.getBoundingClientRect();
      const caretPos = caretRect.left + Math.min(caretRect.width, inputRect.width) * !!text;
      const distCaret = characterRect.left + characterRect.width / 2 - inputRect.left - caretPos;
      const distInput = characterRect.top + characterRect.height / 2 - inputRect.top;
      const y = Math.atan2(-distCaret, Math.abs(distInput) * 3);
      const x = Math.atan2(distInput, (Math.abs(distInput) * 3) / Math.cos(y));
      const angle = Math.max(Math.abs(x), Math.abs(y));
      _rotate3d(x / angle, y / angle, y / angle / 2, angle);
    };
    const _characterLookAway = function (event) {
      const el = event.target;
      const characterRect = $character.getBoundingClientRect();
      const inputRect = el.getBoundingClientRect();
      const distInput = characterRect.top + characterRect.height / 2 - inputRect.top;

      $character.classList.add('look-away', distInput < 0 ? 'up' : 'down');

      $timer = setTimeout(function () {
        $character.classList.add('playing');
      }, 300);
    };

    const _inpEvt = function (e) {
      const el = e.target;
      setTimeout(function () {
        if (el.type === 'password') {
          _characterLookAway(e);
        } else {
          _characterLook(e);
        }
      }, 2);
    };

    // init
    const $input = document.querySelectorAll('.input input');
    for (let i = 0; i < $input.length; i++) {
      const $inp = $input[i];
      $inp.addEventListener('focusin', _inpEvt, false);
      $inp.addEventListener('click', _inpEvt, false);
      $inp.addEventListener('keyup', _inpEvt, false);
      $inp.addEventListener('keypress', _inpEvt, false);
      $inp.addEventListener('focusout', _reset, false);
    }
  },
  init: function () {
    ui.Form.focus();
    ui.Form.select();
    // ui.Form.select2();
    ui.Form.selectUI();
    ui.Form.input();
    ui.Form.inpBtn();
    ui.Form.textarea();
    ui.Form.agree();
    ui.Form.mail();
    ui.Form.etc();

    ui.Form.spinnerUI();
    ui.Form.spinner();
    ui.Form.jqRange();
    ui.Form.jqCalendar('.datepicker');

    //입력 텍스트 카운팅(입력)
    $(document).on('keypress keyup', '[data-text-count]', function (e) {
      ui.Form.textCount(this, e);
    });
  }
};

//테이블 스크롤 가이드
ui.Table = {
  class: '.tbl-scroll-in',
  guideScroll: function () {
    const $tbl = $(ui.Table.class);
    if (!$tbl.length) return;
    $tbl.each(function () {
      const $this = $(this);
      $this.data('first', true);
      $this.data('direction', '좌우');
      $(this).on('scroll', function () {
        $this.data('first', false);
        $this.find('.tbl-guide').remove();
        //$this.removeAttr('title');

        const $sclInfo = $this.next('.tbl_scroll_ifno');
        if ($sclInfo.length) {
          const $sclVerticalPercent = Math.abs($this.scrollTop() / ($this.get(0).scrollHeight - $this.height())) * 100;
          const $sclHorizonPercent = Math.abs($this.scrollLeft() / ($this.get(0).scrollWidth - $this.width())) * 100;
          $sclInfo
            .find('.vertical')
            .children()
            .css('height', $sclVerticalPercent + '%');
          $sclInfo
            .find('.horizon')
            .children()
            .css('width', $sclHorizonPercent + '%');
        }
      });
    });
  },
  guideResize: function () {
    const $tbl = $(ui.Table.class);
    if (!$tbl.length) return;
    $tbl.each(function () {
      const $this = $(this);
      const $direction = $this.data('direction');
      let $changeDirection = '';
      const $guide = '<div class="tbl-guide" title="해당영역은 테이블을 스크롤하면 사라집니다."><div><i class="icon" aria-hidden="true"></i>테이블을 ' + $direction + '로 이동하세요.</div></div>';
      const $width = $this.outerWidth();
      const $height = $this.outerHeight();
      const $scrollW = $this.get(0).scrollWidth;
      const $scrollH = $this.get(0).scrollHeight;
      const $sclInfoHtml = '<div class="table tbl_scroll_ifno" aria-hidden="true"><div class="horizon"><div></div></div><div class="vertical"><div></div></div></div>';
      let $sclIfno = $this.next('.tbl_scroll_ifno');
      if ($this.data('first')) {
        if ($width < $scrollW && $height < $scrollH) {
          $changeDirection = '상하좌우';
        } else if ($width < $scrollW) {
          $changeDirection = '좌우';
        } else if ($height < $scrollH) {
          $changeDirection = '상하';
        } else {
          $changeDirection = '';
        }

        if ($changeDirection == '') {
          $this.removeAttr('tabindex').find('.tbl-guide').remove();
          $sclIfno.remove();
          $this.removeAttr('title');
        } else {
          if (!$this.find('.tbl-guide').length) {
            if (!ui.Mobile.any()) {
              $this.attr('tabindex', 0); //pc일땐 tabindex 사용
            }
            $this.prepend($guide);
          }
          if (!$sclIfno.length) {
            $this.after($sclInfoHtml);
            $sclIfno = $this.next('.tbl_scroll_ifno');
          }
          if ($sclIfno.length) {
            $sclIfno.find('.vertical').css('height', $height);
            $sclIfno.find('.vertical').show();
            $sclIfno.find('.horizon').show();
            if ($changeDirection == '좌우') {
              $sclIfno.find('.vertical').hide();
            } else if ($changeDirection == '상하') {
              $sclIfno.find('.horizon').hide();
            }
          }

          $this.attr('title', '터치스크롤하여 숨겨진 테이블영역을 확인하세요');
        }

        if ($direction != $changeDirection && $this.find('.tbl-guide').length) {
          $this.find('.tbl-guide').changeTxt($direction, $changeDirection);
          $this.data('direction', $changeDirection);
        }
      }
    });
  }
};

//리스트 관련 UI
ui.List = {
  winLoad: function () {
    //토글실행
    ui.Folding.list('.ui-folding', '.folding-head a', '.folding-panel');
    ui.Folding.btn('.ui-folding-btn');
    ui.Folding.close('.ui-folding-close');

    //테이블 스크롤 가이드 실행
    ui.Table.guideScroll();
    ui.Table.guideResize();
    ui.List.detail();
  },
  type: function () {
    if ($('.product-list').length && $('.list-type-btn').length) {
      const $listType = uiCookie.get('product-list-type') === 'bar' ? uiCookie.get('product-list-type') : 'grid';
      if ($listType === 'bar') {
        $('.product-list').addClass('bar-type');
        $('.list-type-btn .list-bar').addClass('active');
      } else {
        $('.list-type-btn .list-grid').addClass('active');
      }

      $(document).on('click', '.list-type-btn .button', function (e) {
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).hasClass('list-bar')) {
          $('.product-list').addClass('bar-type');
          uiCookie.set('product-list-type', 'bar');
        } else {
          $('.product-list').removeClass('bar-type');
          uiCookie.set('product-list-type', '');
        }
      });
    }
  },
  detail: function () {
    const $detail = $('.detail-procuct-image');
    const $btnHtml = '<div class="btn-wrap"><button type="button" class="button line fz-14 btn-detail-expand">상품정보 더보기</button></div>';
    if ($detail.length) {
      if ($detail.outerHeight() < $detail.get(0).scrollHeight) {
        $detail.append($btnHtml);
      }

      $(document).on('click', '.btn-detail-expand', function (e) {
        e.preventDefault();
        const $this = $(this);
        const $closest = $this.closest('.detail-procuct-image');
        if ($closest.hasClass('expanded')) {
          $closest.removeClass('expanded');
        } else {
          $closest.addClass('expanded');
        }

        const $swiper = $this.closest('.swiper').data('swiper');
        $swiper.update();
      });
    }
  },
  check: function () {
    const $wrapClass = '.ui-chk-wrap';
    const $allChkClass = '.ui-all-chk';
    const $chkClass = '.ui-chk';

    // 전체동의
    $($wrapClass + ' ' + $allChkClass).change(function () {
      const $this = $(this);
      const $wrap = $this.closest($wrapClass);
      const $items = $wrap.find($chkClass);
      if ($(this).prop('checked')) {
        $items.prop('checked', true).change();
      } else {
        $items.prop('checked', false).change();
      }
    });
    $($wrapClass + ' ' + $chkClass).change(function () {
      const $this = $(this);
      const $wrap = $this.closest($wrapClass);
      const $allchk = $wrap.find($allChkClass);
      const $items = $wrap.find($chkClass);
      const $itemsLength = $items.length;
      const $itemsChecked = $wrap.find($chkClass + ':checked').length;
      if ($itemsLength === $itemsChecked) {
        $allchk.prop('checked', true);
      } else {
        $allchk.prop('checked', false);
      }
    });
  },
  init: function () {
    ui.List.check();
    ui.List.type();
  }
};

//아코디언 함수
ui.Folding = {
  listAria: function (list, btn, panel, addClass) {
    if (!addClass) addClass = 'open';
    if ($(list).length) {
      $(list).each(function (e) {
        $(this)
          .children()
          .each(function (f) {
            const $btn = $(this).find(btn);
            let $btnId = $btn.attr('id');
            const $panel = $(this).find(panel);
            let $panelId = $panel.attr('id');
            if ($btn.length && $btn.attr('aria-expanded') == undefined) {
              if ($btnId == undefined) {
                $btnId = 'tglist_btn_' + e + '_' + f;
                $btn.attr('id', $btnId);
              }
              if ($panelId == undefined) {
                $panelId = 'tglist_panel_' + e + '_' + f;
                $panel.attr('id', $panelId);
              }
              $btn.attr({
                role: 'button',
                'aria-expanded': false,
                href: '#' + $panelId,
                'aria-controls': $panelId
              });
              $panel.attr({
                'aria-hidden': 'true',
                'aria-labelledby': $btnId
              });
            }
            if (!$btn.length) {
              $panel.show();
            }
          });
      });
      if ($(list).find('.' + addClass).length) {
        $(list)
          .find('.' + addClass)
          .each(function () {
            $(this).find(btn).attr('aria-expanded', true);
            $(this).find(panel).removeAttr('aria-hidden').show();
            if ($(this).find(btn).children('span').length && $(this).find(btn).children('span').text() == '더보기') {
              $(this).find(btn).children('span').text('닫기');
            }
          });
      }
    }
  },
  list: function (list, btn, panel, addClass, speed) {
    if (!addClass) addClass = 'open';
    if (!speed) speed = 200;
    $(document).on('click', list + ' ' + btn, function (e) {
      e.preventDefault();
      const $this = $(this);
      const $list = $this.closest(list);
      const $li = $this.closest('li');
      let $openDelay = 0;
      if ($this.closest('.disabled').length || $this.hasClass('disabled')) return false;

      const slideCallback = function () {
        if ($li.find(panel).find('.ui-swiper').length) {
          ui.Swiper.update($li.find(panel).find('.ui-swiper'));
        }
      };

      if ($li.hasClass(addClass)) {
        $li.find(btn).attr('aria-expanded', false);
        $li.removeClass(addClass);
        $li
          .find(panel)
          .attr('aria-hidden', true)
          .stop(true, false)
          .slideUp(speed, function () {
            slideCallback();
          });
        if ($this.children('span').length && $this.children('span').text() == '닫기') {
          $this.children('span').text('더보기');
        }
      } else {
        $li.addClass(addClass).find(btn).attr('aria-expanded', true);
        if (!$list.hasClass('not-toggle')) {
          const $siblings = $li.siblings();
          $siblings.removeClass(addClass).find(btn).attr('aria-expanded', false);
          $siblings.find(panel).attr('aria-hidden', true).stop(true, false).slideUp(speed);
          if ($siblings.find(btn).children('span').length && $siblings.find(btn).children('span').text() == '닫기') {
            $siblings.find(btn).children('span').text('더보기');
          }
        }
        if ($li.find(panel).html() == '') $openDelay = 100;
        $li
          .find(panel)
          .removeAttr('aria-hidden')
          .stop(true, false)
          .delay($openDelay)
          .slideDown(speed, function () {
            ui.Folding.scroll($this, this);
            slideCallback();
          });
        if ($this.children('span').length && $this.children('span').text() == '더보기') {
          $this.children('span').text('닫기');
        }
      }
    });

    ui.Folding.listAria(list, btn, panel, addClass);
  },
  btnAria: function (btn, className) {
    if (className == undefined) className = 'open';
    if ($(btn).length) {
      $(btn).each(function (e) {
        const $btn = $(this);
        let $btnId = $btn.attr('id');
        const $href = $btn.attr('href');
        let $panelId = $href === undefined ? null : $btn.attr('href').substring(1);
        let $panel = $('#' + $panelId);
        //if($btn.attr('aria-expanded') != undefined) return false;
        if (($panelId == '' || $panelId == 'none' || $panelId == null) && $btn.closest('.folding-list').length) {
          $panel = $btn.closest('.folding-list').find('.folding-panel');
          if ($panel.attr('id')) $panelId = $panel.attr('id');
        }
        if (!$btnId) $btnId = 'fdBtn_' + e;
        if ($panelId == '' || $panelId == 'none' || $panelId == null) $panelId = 'fdPanel_' + e;
        $btn.attr({
          id: $btnId,
          role: 'button',
          href: '#' + $panelId,
          'aria-expanded': false,
          'aria-controls': $panelId
        });
        $panel.attr({
          id: $panelId,
          'aria-hidden': 'true',
          'aria-labelledby': $btnId
        });
        //panel이 보이면
        if ($panel.is(':visible')) {
          $(this).addClass(className).attr('aria-expanded', true);
        }
        //btn이 활성화면
        if ($(this).hasClass(className)) {
          $(this).attr('aria-expanded', true);
          $panel.removeAttr('aria-hidden').show();
        }
      });
    }
  },
  btn: function (btn, className, speed) {
    if (!className) className = 'open';
    if (!speed) speed = 200;
    $(document).on('click', btn, function (e) {
      e.preventDefault();
      const $this = $(this);
      let $panel = $this.attr('href');
      if ($this.closest('.disabled').length || $this.hasClass('disabled')) return false;

      const slideCallback = function () {
        if ($($panel).find('.ui-swiper').length) {
          ui.Swiper.update($($panel).find('.ui-swiper'));
        }
      };

      if (($panel == '#' || $panel == '#none') && $this.closest('.folding-list').length) $panel = $this.closest('.folding-list').find('.folding-panel');
      if ($this.hasClass(className)) {
        $this.removeClass(className).attr('aria-expanded', false);
        $($panel)
          .attr('aria-hidden', true)
          .stop(true, false)
          .slideUp(speed, function () {
            slideCallback();
          });
      } else {
        $this.addClass(className).attr('aria-expanded', true);
        $($panel)
          .removeAttr('aria-hidden')
          .stop(true, false)
          .slideDown(speed, function () {
            ui.Folding.scroll($this, this);
            slideCallback();
          });
      }
    });

    ui.Folding.btnAria(btn, className);
  },
  close: function (btn, className, speed) {
    if (!className) className = 'open';
    if (!speed) speed = 200;
    $(document).on('click', btn, function (e) {
      e.preventDefault();
      const $closest = $(this).closest('[aria-labelledby]');
      const $btn = $closest.attr('aria-labelledby');
      if ($closest.length) {
        $closest.attr('aria-hidden', true).stop(true, false).slideUp(speed);
        if ($('#' + $btn).length)
          $('#' + $btn)
            .removeClass(className)
            .attr('aria-expanded', false);
      }
    });
  },
  scroll: function (btn, panel, callback) {
    //아코디언 열릴때 스크롤 함수
    const $scrollTop = $(window).scrollTop();
    let $winHeight = $(window).height();
    if ($('.bottom-fixed').length) $winHeight = $winHeight - $('.bottom-fixed').children().outerHeight();
    let $topMargin = 10;
    if ($('.top-fixed').length) {
      $('.top-fixed').each(function () {
        $topMargin = $topMargin + $(this).outerHeight();
      });
    }
    const $winEnd = $scrollTop + $winHeight;
    const $btnTop = $(btn).offset().top - $topMargin;
    const $thisTop = $(panel).offset().top;
    const $thisHeight = $(panel).outerHeight();
    const $thisEnd = $thisTop + $thisHeight;
    let $scroll = '';
    if ($winEnd < $thisEnd) {
      $scroll = Math.min($btnTop, $thisEnd - $winHeight);
    } else if ($scrollTop > $btnTop) {
      $scroll = $btnTop;
    }

    if ($scroll == '') {
      if (!!callback) callback();
    } else {
      $('html,body').animate({ scrollTop: $scroll }, 200, function () {
        if (!!callback) callback();
      });
    }
  }
};

//Swiper
ui.Swiper = {
  base: function (tar, changeEvt) {
    $(tar).each(function () {
      const $this = $(this);
      const $swiper = $this.find('.swiper');
      const $pagination = $this.find('.swiper-pagination');

      let $paginationType = 'bullets';
      if ($this.hasClass('_fraction')) $paginationType = 'fraction';

      let $navigation = false;
      if ($this.hasClass('_navi')) {
        let $btnHtml = '';
        $btnHtml += '<button type="button" aria-label="이전 슬라이드" class="swiper-button-prev swiper-button">이전 슬라이드</button>';
        $btnHtml += '<button type="button" aria-label="다음 슬라이드" class="swiper-button-next swiper-button">다음 슬라이드</button>';
        $swiper.append($btnHtml);
        $navigation = {
          prevEl: $this.find('.swiper-button-prev')[0],
          nextEl: $this.find('.swiper-button-next')[0]
        };
      }

      let $slidesPerView = 'auto';
      if ($this.data('view') !== undefined) {
        $slidesPerView = $this.data('view');
        $this.removeAttr('data-view');
      }

      let $loop = $this.hasClass('_loop') ? true : false;
      let $autoHeight = $this.hasClass('_autoHeight') ? true : false;
      let $centeredSlides = $this.hasClass('_centeredSlides') ? true : false;

      let $auto = false;
      if ($this.data('auto') !== undefined) {
        $auto = {
          delay: $this.data('auto'),
          disableOnInteraction: false
        };
        $this.removeAttr('data-auto');
        if (!$this.find('.swiper-auto-ctl').length) {
          if (!$this.find('.swiper-pagination-wrap').length) $pagination.wrap('<div class="swiper-pagination-wrap"></div>');
          $pagination.before('<button type="button" class="swiper-auto-ctl" aria-label="슬라이드 자동롤링 중지"></button>');
        }
      }
      let $parallax = false;
      if (
        $this.find('[data-swiper-parallax]').length ||
        $this.find('[data-swiper-parallax-x]').length ||
        $this.find('[data-swiper-parallax-y]').length ||
        $this.find('[data-swiper-parallax-scale]').length ||
        // $this.find('[data-swiper-parallax-duration]').length ||
        $this.find('[data-swiper-parallax-opacity]').length
      ) {
        $parallax = true;
      }

      let $zoom = false;
      if ($this.find('.swiper-zoom-container').length) {
        $zoom = {
          maxRatio: 2,
          toggle: true
        };
        $this.find('.swiper-zoom-container').each(function () {
          let $btnHtml = '<div class="swiper-zoom-btn">';
          $btnHtml += '<button type="button" role="button" class="swiper-zoom-in" aria-label="확대"></button>';
          $btnHtml += '<button type="button" role="button" class="swiper-zoom-out" aria-label="축소"></button>';
          $btnHtml += '</div>';
          $(this).before($btnHtml);
        });
      }

      let baseSwiper;
      if ($swiper.hasClass('swiper-initialized')) {
        baseSwiper = $this.data('swiper');
        if (baseSwiper !== undefined) baseSwiper.update();
      } else {
        baseSwiper = new Swiper($swiper[0], {
          pagination: {
            el: $pagination[0],
            type: $paginationType,
            clickable: true,
            renderBullet: function (index, className) {
              return '<button type="button" class="' + className + '">' + (index + 1) + '번째 슬라이드</button>';
            }
          },
          navigation: $navigation,
          slidesPerView: $slidesPerView,
          loop: $loop,
          autoHeight: $autoHeight,
          centeredSlides: $centeredSlides,
          autoplay: $auto,
          parallax: $parallax,
          zoom: $zoom,
          on: {
            slideChangeTransitionEnd: function (e) {
              if (!!changeEvt) changeEvt(e);
            }
          }
        });
        $this.data('swiper', baseSwiper);
      }
    });
  },
  ready: function (tar) {
    const $target = $(tar);
    $target.each(function () {
      const $this = $(this);
      if (!$this.find('.swiper-slide').length) {
        let $children = $this.children();
        while ($children.hasClass('swiper') || $children.hasClass('swiper-wrapper')) {
          $children = $children.children();
        }
        $children.addClass('swiper-slide');
      }

      if (!$this.find('.swiper-wrapper').length) {
        if (!$this.find('.swiper').length) {
          $this.wrapInner('<div class="swiper-wrapper"></div>');
          $this.wrapInner('<div class="swiper"></div>');
        } else {
          $this.find('.swiper').wrapInner('<div class="swiper-wrapper"></div>');
        }
      } else if (!$this.find('.swiper').length) {
        $this.find('.swiper-wrapper').parent().wrapInner('<div class="swiper"></div>');
      }
      if (!$this.find('.swiper-pagination').length) {
        $this.append('<div class="swiper-pagination"></div>');
      }
    });
  },
  UI: function () {
    $(document).on('click', '.ui-swiper .swiper-auto-ctl', function (e) {
      e.preventDefault();
      const $this = $(this);
      const $closest = $this.closest('.ui-swiper');
      const $swiper = $closest.data('swiper');
      if ($(this).hasClass('play')) {
        $swiper.autoplay.start();
        $(this).removeClass('play').changeAriaLabel('시작', '중지');
      } else {
        $swiper.autoplay.stop();
        $(this).addClass('play').changeAriaLabel('중지', '시작');
      }
    });

    $(document).on('click', '.ui-swiper .swiper-zoom-in', function (e) {
      e.preventDefault();
      const $this = $(this);
      const $swiper = $this.closest('.ui-swiper').data('swiper');
      $swiper.zoom.in();
    });

    $(document).on('click', '.ui-swiper .swiper-zoom-out', function (e) {
      e.preventDefault();
      const $this = $(this);
      const $swiper = $this.closest('.ui-swiper').data('swiper');
      $swiper.zoom.out();
    });
  },
  update: function () {
    $(target).each(function () {
      const $this = $(this);
      const $swiper = $this.data('swiper');
      if ($swiper !== undefined) $swiper.update();
    });
  },
  init: function () {
    if ($('.ui-swiper').length) {
      ui.Swiper.ready('.ui-swiper');
      ui.Swiper.base('.ui-swiper');
      ui.Swiper.UI();
    }
  }
};

//스크롤 관련
ui.Scroll = {
  inCheck: function (target) {
    //스크린안에 있는지 확인
    const $el = $(target);
    const isPopup = $el.closest('.' + Layer.bodyClass).length && $el.closest('.' + Layer.wrapClass).length;
    const $wrap = isPopup ? $el.closest('.' + Layer.bodyClass) : $(window);
    const $wHeight = $wrap.outerHeight();
    const $scrollTop = $wrap.scrollTop();
    const $winBottom = $scrollTop + $wHeight;
    const $elHeight = $($el).outerHeight();
    const $elTop = $($el).offset().top;
    const $elCenter = $elTop + $elHeight / 2;
    const $elBottom = $elTop + $elHeight;

    if ($elCenter >= $scrollTop && $elCenter <= $winBottom) {
      return true;
    } else {
      return false;
    }
  },
  isCSS: function (val) {
    const $type = ['auto', 'scroll', 'overlay', 'visible'];
    if ($type.indexOf(val) > -1) {
      return true;
    } else {
      return false;
    }
  },
  isVisible: function (target) {
    const $target = $(target);
    if ($target.outerWidth() < $target.get(0).scrollWidth) {
      return true;
    } else if ($target.outerHeight() < $target.get(0).scrollHeight) {
      return true;
    } else {
      return false;
    }
  },
  move: function (val, speed, callback) {
    let $top = 0;
    if (speed == undefined) speed = 300;
    if ($.isNumeric(val)) {
      $top = val;
    } else {
      if ($(val).length) $top = $(val).offset().top;
    }
    $('html,body')
      .stop(true, false)
      .animate({ scrollTop: $top }, speed, function () {
        if (!!callback) callback();
      });
  },
  center: function (el, speed, direction) {
    let $parent = $(el).parent();
    // let $parentTop = parseInt($parent.css('margin-top'));
    // let $parentLeft = parseInt($parent.css('margin-left'));
    // if($parent.css('position') === 'relative'){
    //   $parentTop += $parent.position().top;
    //   $parentLeft += $parent.position().left;
    // }
    while ($parent.css('overflow-x') !== 'auto' && !$parent.is('body')) {
      $parent = $parent.parent();
      // $parentTop += parseInt($parent.css('margin-top'));
      // $parentLeft += parseInt($parent.css('margin-left'));
      // if($parent.css('position') === 'relative'){
      //   $parentTop += $parent.position().top;
      //   $parentLeft += $parent.position().left;
      // }
    }
    if (speed == undefined) speed = 200;
    if (!!direction && direction == 'vertical') {
      const $prtH = $parent.outerWidth();
      // const $prtSclT = $parent.scrollTop();
      const $prtSclH = $parent.get(0).scrollHeight;
      const $thisT = Math.round($(el).position().top);
      const $thisH = $(el).outerHeight();
      // let $sclT = $thisT - ($prtH/2) + ($thisH/2) + $parentTop;
      let $sclT = $thisT - $prtH / 2 + $thisH / 2;
      if ($sclT < 0) $sclT = 0;
      if ($prtH < $prtSclH) $parent.stop(true, false).animate({ scrollTop: $sclT }, speed);
    } else {
      const $prtW = $parent.outerWidth();
      // const $prtSclL = Math.round($parent.scrollLeft());
      const $prtSclW = $parent.get(0).scrollWidth;
      let $thisL = Math.round($(el).position().left);
      const $thisW = $(el).outerWidth();
      // let $sclL = $thisL - ($prtW/2) + ($thisW/2) + $parentLeft;
      let $sclL = $thisL - $prtW / 2 + $thisW / 2;
      if ($sclL < 0) $sclL = 0;
      if ($prtW < $prtSclW) $parent.stop(true, false).animate({ scrollLeft: $sclL }, speed);
    }
  },
  guide: function (element) {
    const $el = $(element);
    const $wrapClass = 'ui-scl-guide';
    const $contClass = 'ui-scl-cont';
    const $infoClass = 'ui-scl-info';
    const $barClass = 'ui-scl-bar';
    $el.each(function () {
      const $this = $(this);
      const $isSclGuide = $this.data('sclGuide');

      if (!$this.hasClass($contClass)) $this.addClass($contClass);
      if (!$this.parent().hasClass($wrapClass)) $this.wrap('<div class="' + $wrapClass + '"></div>');
      if (!$this.siblings('.' + $infoClass).length) $this.before('<div class="' + $infoClass + '" role="img" aria-label="스크롤하면 아래 숨겨진 컨텐츠를 확인 할 수 있습니다."></div>');
      if (!$this.siblings('.' + $barClass).length) $this.after('<div class="' + $barClass + '" aria-hidden="true"><div></div></div>');
      const $info = $this.siblings('.' + $infoClass);
      const $bar = $this.siblings('.' + $barClass);
      let $percent = ui.Scroll.scrllPer(this);
      if ($percent <= 0) {
        $bar.hide();
      } else {
        $bar
          .show()
          .children()
          .css('width', $percent + '%');
      }
      const $sclGap = $this.get(0).scrollHeight - $this.outerHeight();
      if ($sclGap < 1) {
        $info.hide();
      } else {
        $info.show();
      }

      if (!$isSclGuide) {
        $this.data('sclGuide', true);
        $this.on('scroll', function () {
          $percent = ui.Scroll.scrllPer(this);
          if ($percent <= 0) {
            $bar.hide();
          } else {
            $bar
              .show()
              .children()
              .css('width', $percent + '%');
          }
          if ($percent >= 100) {
            $info.hide();
          } else {
            $info.show();
          }
        });
      }
    });
  },
  scrllPer: function (element, type) {
    let $val = '';
    if (type == undefined) type = 'vertical';
    if (type == 'vertical') {
      $val = Math.abs($(element).scrollTop() / ($(element).get(0).scrollHeight - $(element).outerHeight())) * 100;
    } else if (type == 'horizon') {
      $val = Math.abs($(element).scrollLeft() / ($(element).get(0).scrollWidth - $(element).outerHeight())) * 100;
    }
    return $val;
  },
  loading: function () {
    $(window).scroll(function () {
      $('.loading_area').each(function () {
        const $this = $(this);
        const $href = $this.data('href');
        if (ui.Scroll.inCheck(this)) {
          $this.load($href, function (res, sta, xhr) {
            if (sta == 'success') {
              $this.children().unwrap();
            }
          });
        }
      });
    });
  },
  inScreen: function (target, callback) {
    const $target = $(target);
    const $scrollTop = $(window).scrollTop();
    let $winHeight = $(window).height();
    const $bottomMargin = $('.bottom-fixed-space').length ? $('.bottom-fixed-space').outerHeight() + 10 : 10;
    let $topMargin = 10;
    if ($('.top-fixed').length) {
      $('.top-fixed').each(function () {
        $topMargin = $topMargin + $(this).outerHeight();
      });
    }
    const $winTop = $scrollTop + $topMargin;
    const $winEnd = $scrollTop + $winHeight - $bottomMargin;
    const $targetTop = $target.offset().top;
    const $targetHeight = $target.outerHeight();
    const $targetEnd = $targetTop + $targetHeight;
    let $scroll = '';
    if ($winEnd < $targetEnd) {
      $scroll = Math.min($targetTop + $topMargin, $targetEnd - $winHeight + $bottomMargin);
    } else if ($winTop > $targetTop) {
      $scroll = $targetTop + $topMargin;
    }

    if ($scroll == '') {
      if (!!callback) callback();
    } else {
      $('html,body').animate({ scrollTop: $scroll }, 200, function () {
        if (!!callback) callback();
      });
    }
  },
  init: function () {
    ui.Scroll.loading();
  }
};

//data-animation
ui.Animation = {
  sclIdx: 0,
  sclReady: function (target) {
    const $animations = $.find('*[data-animation]');
    $.each($animations, function () {
      const $el = $(this);
      const $delay = parseInt($el.data('delay'));
      const $duration = parseInt($el.data('duration'));
      let $repeat = parseInt($el.data('repeat'));
      const $addClassAry = ['on', 'active', 'checked', 'selected'];
      const $animateClassAry = ['rolling-number', 'count-number'];
      const $dataAnimation = $el.data('animation');
      if ($dataAnimation === 'rolling-number') ui.Animation.rollingReady(this);
      if ($dataAnimation === 'count-number') ui.Animation.countReady(this);

      let $animationClass = 'animate__' + $dataAnimation;
      if ($addClassAry.indexOf($dataAnimation) >= 0) {
        $el.data('animation-type', 2);
        $animationClass = $dataAnimation;
      } else if ($animateClassAry.indexOf($dataAnimation) >= 0) {
        $el.data('animation-type', 3);
        $el.addClass($dataAnimation);
      } else if (!$el.hasClass('animate__animated') && $animationClass.indexOf('animate__') >= 0) {
        $el.data('animation-type', 1);
        if ($delay > 0) {
          $el.css({
            '-webkit-animation-delay': $delay + 'ms',
            'animation-delay': $delay + 'ms'
          });
        }
        if ($duration > 0) {
          $el.css({
            '-webkit-animation-duration': $duration + 'ms',
            'animation-duration': $duration + 'ms'
          });
        }
        if ($repeat > 0) {
          if ($repeat > 5) $repeat = 5;
          $el.addClass('animate__repeat-' + $repeat);
        }
        $el.addClass('animate__animated paused ' + $animationClass);
      }
    });
  },
  sclTypeChk: function (el) {
    let returnVal = null;
    const $el = el;
    const $type = $el.data('animation-type');
    const $dataAnimation = $el.data('animation');
    if ($type == 1) {
      returnVal = 'animate__' + $dataAnimation;
    } else if ($type == 2) {
      returnVal = $dataAnimation;
    } else if ($type == 3) {
      returnVal = 'is-active';
    }
    return returnVal;
  },
  sclCheckIn: function () {
    const $target = $.find('*[data-animation]');
    const $window = $(window);
    const $wHeight = $window.height();
    const $scrollTop = $window.scrollTop();
    const $winTop = $scrollTop + $wHeight / 10;
    const $winCenter = $scrollTop + $wHeight / 2;
    const $winBottom = $scrollTop + ($wHeight / 10) * 9;

    $.each($target, function () {
      const $el = $(this);
      const $elHeight = $el.outerHeight();
      const $matrix = $el.css('transform');
      const $matrixAry = $matrix.replace(/[^0-9\-.,]/g, '').split(',');
      let $matrixX = $matrixAry[12] || $matrixAry[4];
      if ($matrixX === undefined) $matrixX = 0;
      let $matrixY = $matrixAry[13] || $matrixAry[5];
      if ($matrixY === undefined) $matrixY = 0;
      const $elTop = $el.offset().top - $matrixY;
      // console.log($el.offset().top, $matrixY, $elTop)
      const $elCenter = $elTop + $elHeight / 2;
      const $elBottom = $elTop + $elHeight;

      const $animationClass = ui.Animation.sclTypeChk($el);

      if ($el.data('init')) return;
      if (($winTop <= $elTop && $elTop <= $winBottom) || ($winTop <= $elBottom && $elBottom <= $winBottom)) {
        ui.Animation.sclAction($el);
      } else {
        const $timer = $el.data('time');
        if ($timer !== undefined) {
          clearTimeout($timer);
          $el.removeData('time');
          if (ui.Animation.sclIdx > 0) ui.Animation.sclIdx -= 1;
        }
      }
    });
  },
  sclObserver: function (el) {
    const $el = $(el);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.intersectionRatio > 0)) {
          ui.Animation.sclAction($el);
        }
      },
      {
        threshold: 0.03
      }
    );
    io.observe(el);
    return io;
  },
  sclAction: function (el) {
    const $el = $(el);
    const $animationClass = ui.Animation.sclTypeChk(el);

    if ($el.data('time') !== undefined) return;
    ui.Animation.sclIdx += 1;
    const timer = ui.Animation.sclIdx * 200;
    const initTimer = setTimeout(function () {
      $el.data('init', true);
      if (ui.Animation.sclIdx > 0) ui.Animation.sclIdx -= 1;
      const $slide = $el.closest('.swiper-slide');
      if ($el.hasClass('animate__animated')) {
        if ($el.closest('.tab-panel').length && !$el.closest('.tab-panel').hasClass('active')) return;
        if ($slide.length) {
          if ($slide.hasClass('swiper-slide-active')) {
            if (!$el.hasClass($animationClass)) $el.addClass($animationClass);
            if ($el.hasClass('paused')) $el.removeClass('paused');
          }
        } else {
          if (!$el.hasClass($animationClass)) $el.addClass($animationClass);
          if ($el.hasClass('paused')) $el.removeClass('paused');
        }
      } else {
        if ($slide.length) {
          if ($slide.hasClass('swiper-slide-active')) $el.addClass($animationClass);
        } else {
          if ($el.hasClass('count-number')) ui.Animation.countInit($el);
          $el.addClass($animationClass);
        }
      }
      $el.removeData('time');
    }, timer);
    $el.data('time', initTimer);
  },
  rollingReady: function (target) {
    const $this = $(target);
    if ($this.hasClass('is-ready')) return;
    $this.addClass('is-ready');
    const $thisH = $this.height();
    $this.css({
      height: $thisH,
      'line-height': $thisH + 'px'
    });
    const $thisText = $this.text();
    $this.role('img');
    $this.aria('label', $thisText);
    $this.attr('title', $thisText);
    const $textAry = $thisText.split('');
    let $html = '';
    const $space = '<div>&nbsp;</div>';
    const $rotateNum = 4;
    for (let i = 0; i < $textAry.length; i++) {
      const $text = $textAry[i];
      const $number = parseInt($text);
      // console.log($text, $number)
      if ($.isNumeric($number)) {
        $html += '<div class="rolling__in data-number="' + $number + '" style="top:-' + ($rotateNum * 10 + $number + 1) + '00%;animation-delay:' + i * 5 + '0ms;">';
        $html += $space;
        for (let j = 0; j < $rotateNum; j++) {
          for (let k = 0; k < 10; k++) {
            $html += '<div>' + k + '</div>';
          }
        }
        for (let l = 0; l <= $number; l++) {
          $html += '<div>' + l + '</div>';
        }
        $html += '</div>';
      } else {
        $html += '<div class="rolling__in" style="top:-100%;animation-delay:' + i * 5 + '0ms;">' + $space + '<div>' + $text + '</div></div>';
      }
    }
    $this.html($html);
  },
  countReady: function (target) {
    const $el = $(target);
    const $text = $el.text();
    $el.aria('label', $text);
    $el.attr('title', $text);
    $el.text('0');
  },
  countInit: function (target) {
    const $el = $(target);
    const $title = $el.attr('title');
    const $number = onlyNumber($title);
    $({ now: 0 }).animate(
      { now: $number },
      {
        duration: 1500,
        // easing: 'easeOutCubic',
        step: function (now, e) {
          $el.text(addComma(Math.floor(now)));
          // if(isComma){
          //   $el.text(addComma(Math.floor(now)));
          // }else{
          //   $el.text(Math.floor(now));
          // }
        }
      }
    );
  },
  sclMove: function (target) {
    const $scrollTop = $(window).scrollTop();
    //console.log($scrollTop)
    $.each(target, function () {
      const $el = $(this);
      const $Data = $el.data('scrollchk').split(',');
      let $Start = $Data[0];
      let $End = $Data[1];
      const $type = $Data[2].split(' ');

      switch ($Start) {
        case 'in':
          $Start = $el.parent().offset().top - $(window).height();
          break;
        case 'top':
          $Start = $el.parent().offset().top - 50;
          break;
        case 'bottom':
          $Start = $el.parent().offset().top - $el.parent().outerHeight();
          break;
        default:
          $Start = parseInt($Start);
          break;
      }

      switch ($End) {
        case 'out':
          $End = $el.parent().offset().top + $el.parent().outerHeight();
          break;
        case 'top':
          $End = $el.parent().offset().top - 50;
          break;
        case 'bottom':
          $End = $el.parent().offset().top - $el.parent().outerHeight();
          break;
        default:
          $End = parseInt($End);
          break;
      }

      let isFadeOut = false;
      let isFadeIn = false;
      let isTopDown = false;
      let isSclDown = false;
      let isSclUp = false;
      if ($.inArray('fadeOut', $type) != -1) isFadeOut = true;
      if ($.inArray('fadeIn', $type) != -1) isFadeIn = true;
      if ($.inArray('topDown', $type) != -1) isTopDown = true;
      if ($.inArray('sclDown', $type) != -1) isSclDown = true;
      if ($.inArray('sclUp', $type) != -1) isSclUp = true;

      const $min = $el.parent().outerHeight() - $el.outerHeight();
      const $rate = ($el.outerHeight() - $el.parent().outerHeight()) / ($End - $Start);
      const $move = -($scrollTop - $Start) * $rate;
      const $opacity = Math.max(0, Math.min(1, ($scrollTop - $Start) / $End));

      if ($Start > $scrollTop) {
        if (isFadeOut) $el.css('opacity', 1);
        if (isFadeIn) $el.css('opacity', 0);
        if (isTopDown) $el.css('top', 0);
        if (isSclDown) $el.css('top', 0);
        if (isSclUp) $el.css('bottom', 0);
      } else if ($scrollTop > $End) {
        if (isFadeOut) $el.css('opacity', 0);
        if (isFadeIn) $el.css('opacity', 1);
        if (isSclDown) $el.css('top', $min);
        if (isSclUp) $el.css('bottom', $min);
      } else {
        if (isFadeOut) $el.css('opacity', 1 - $opacity);
        if (isFadeIn) $el.css('opacity', $opacity);
        if (isTopDown) $el.css('top', ($scrollTop - $Start) / 2);
        if (isSclDown) $el.css('top', Math.max($min, $move));
        if (isSclUp) $el.css('bottom', Math.max($min, $move));
      }
    });
  },
  sclAray: [],
  init: function () {
    const $animations = $.find('*[data-animation]');
    if ($animations.length > 0) {
      ui.Animation.sclReady();
      // $(window).on('scroll resize', function () {
      //   ui.Animation.sclCheckIn($animations);
      // });
      ui.Animation.sclCheckIn();
      window.addEventListener('scroll', ui.Util.debounce(ui.Animation.sclCheckIn, 100));
      window.addEventListener('resize', ui.Util.debounce(ui.Animation.sclCheckIn, 100));

      /*
      if (!'IntersectionObserver' in window && !'IntersectionObserverEntry' in window && !'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
        // IntersectionObserver 지원안할때 
        $(window).on('scroll resize',function(){
          ui.Animation.sclCheckIn($animations);
        });
      }else{
        // IntersectionObserver 지원될때 
        $($animations).each(function(){
          ui.Animation.sclAray.push(ui.Animation.sclObserver(this))
        });
      }
      */
    }
  }
};

//완료 효과
ui.Confetti = {
  set: function (wrap) {
    const $wrap = $(wrap);
    let $itemLength = 12;
    let rdClass;
    let rdLeft;
    let rdTop;
    let rdDelay;
    let rdDirection;
    let rdSpeed;
    let $html = '';
    const rdLeftAry = [];

    if ($wrap.hasClass('type1')) $itemLength = 24;
    // if($wrap.hasClass('type2'))$itemLength = 12;

    for (let i = 0; i < $itemLength; i++) {
      rdClass = randomNumber(1, 3, 0);
      rdSize = randomNumber(1, 3, 0);
      rdColor = (i % 5) + 1;
      rdLeft = $itemLength <= 18 ? randomNumber(1, 19, 0) * 5 : randomNumber(1, $itemLength + 1, 0) * (90 / $itemLength);
      rdTop = randomNumber(2, 14, 0) * 5;
      rdDelay = randomNumber(0, 10, 0) * 400;
      //rdDelay = (i%10) * 200;
      rdDirection = randomNumber(1, 2, 0);
      rdSpeed = randomNumber(35, 50, 0) * 150;

      if (rdLeftAry.indexOf(rdLeft) >= 0) {
        //left 랜덤값 겹치지않게
        i--;
      } else {
        rdLeftAry.push(rdLeft);
        if ($wrap.hasClass('type1')) {
          //꽃가루(2가지 모션, 3가지 컬러, 3가지 사이즈, 6가지 모양)
          rdClass = randomNumber(1, 6, 0);
          // rdColor = (i%6) + 1;
          $html = '<span class="confetti-item item' + rdClass + ' color' + rdColor + ' size' + rdSize + '" style="left:' + rdLeft + '%;';
          $html += '-webkit-animation:confettiSwing' + rdDirection + ' ' + rdSpeed / 4 + 'ms infinite ' + rdDelay + 'ms alternate, confettiDrop ' + rdSpeed + 'ms infinite ease-out ' + rdDelay + 'ms;';
          $html += 'animation:confettiSwing' + rdDirection + ' ' + rdSpeed / 4 + 'ms infinite ' + rdDelay + 'ms alternate, confettiDrop ' + rdSpeed + 'ms infinite ease-out ' + rdDelay + 'ms;';
          $html += '" aria-hidden="true"><span></span></span>';
        } else if ($wrap.hasClass('type2')) {
          //코인(1가지 모양, 3가지 사이즈)
          rdSpeed = randomNumber(10, 15, 0) * 200; //속도조절
          $html = '<span class="confetti-item size' + rdSize + '" style="left:' + rdLeft + '%;';
          $html += '-webkit-animation:confettiCoin ' + rdSpeed + 'ms linear ' + rdDelay + 'ms infinite;';
          $html += 'animation:confettiCoin ' + rdSpeed + 'ms linear ' + rdDelay + 'ms infinite;';
          $html += '"></span>';
        } else if ($wrap.hasClass('type3')) {
          //깜빡임(5가지 모양, 5가지 컬러)
          rdSpeed = randomNumber(10, 15, 0) * 100; //속도조절
          rdDelay = randomNumber(0, 5, 0) * 200; //딜레이조절
          rdClass = randomNumber(1, 5, 0);
          const $rotate = randomNumber(0, 18, 0) * 5;
          $html = '<span class="confetti-item item' + rdClass + ' color' + rdColor + '" style="left:' + rdLeft + '%;top:' + rdTop + '%;';
          $html += '-webkit-animation:confettiFlash ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += 'animation:confettiFlash ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += '"><i style="-webkit-transform:rotate(' + $rotate + 'deg);transform:rotate(' + $rotate + 'deg);"></i></span>';
        } else if ($wrap.hasClass('type4')) {
          //풍선(3가지 모양, 3가지 사이즈)
          rdColor = (i % 3) + 1;
          $html = '<span class="confetti-item color' + rdColor + ' size' + rdSize + '" style="left:' + rdLeft + '%;';
          $html += '-webkit-animation:confettiBalloon' + rdDirection + ' ' + rdSpeed / 4 + 'ms infinite ' + rdDelay + 'ms alternate, confettiUp ' + rdSpeed + 'ms infinite ease-out ' + rdDelay + 'ms;';
          $html += 'animation:confettiBalloon' + rdDirection + ' ' + rdSpeed / 4 + 'ms infinite ' + rdDelay + 'ms alternate, confettiUp ' + rdSpeed + 'ms infinite ease-out ' + rdDelay + 'ms;';
          $html += '"></span>';
        } else if ($wrap.hasClass('type5')) {
          //불꽃(3가지 모양, 3가지 사이즈)
          rdTop = randomNumber(0, 8, 0) * 5; //top값 조정
          rdSpeed = randomNumber(15, 25, 0) * 150; //속도조절
          $html = '<span class="confetti-item color' + rdColor + ' size' + rdSize + '" style="left:' + rdLeft + '%;top:' + rdTop + '%;">';
          $html += '<span class="firework" style="';
          $html += '-webkit-animation:confettiFirework ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += 'animation:confettiFirework ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += '"></span>';
          $html += '<span class="fire-arr"><i style="';
          $html += '-webkit-animation:confettiFireArr ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += 'animation:confettiFireArr ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += '"></i></span>';
          $html += '</span>';
        } else if ($wrap.hasClass('type6')) {
          //하트(2가지 모양, 3가지 각도)
          rdColor = (i % 2) + 1; //하트이미지 2종류
          rdSpeed = randomNumber(10, 15, 0) * 100; //속도조절
          rdDelay = randomNumber(0, 5, 0) * 200; //딜레이조절
          $html = '<span class="confetti-item item' + rdClass + ' color' + rdColor + '" style="left:' + rdLeft + '%;top:' + rdTop + '%;';
          $html += '-webkit-animation:confettiFlash ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += 'animation:confettiFlash ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += '"></span>';
        } else if ($wrap.hasClass('type7')) {
          //별빛(1가지 모양, 4가지 크기)
          rdTop = randomNumber(0, 10, 0) * 5; //top값 조정
          rdSize = (i % 4) + 1; //크기 4가지
          rdSpeed = randomNumber(10, 15, 0) * 100; //속도조절
          rdDelay = randomNumber(0, 5, 0) * 200; //딜레이조절
          $html = '<span class="confetti-item size' + rdSize + '" style="left:' + rdLeft + '%;top:' + rdTop + '%;';
          $html += '-webkit-animation:confettiFlash ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += 'animation:confettiFlash ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += '"></span>';
        } else if ($wrap.hasClass('type8')) {
          //불꽃2(5가지 모양, 3가지 크기)
          rdTop = randomNumber(0, 14, 0) * 5; //top값 조정
          rdSpeed = randomNumber(15, 25, 0) * 100; //속도조절
          $html = '<span class="confetti-item color' + rdColor + ' size' + rdSize + '" style="left:' + rdLeft + '%;top:' + rdTop + '%;">';
          $html += '<span class="dot" style="';
          $html += '-webkit-animation:confettiFireworkDot ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += 'animation:confettiFireworkDot ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += '"></span>';
          $html += '<span class="firework" style="';
          $html += '-webkit-animation:confettiFirework2 ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += 'animation:confettiFirework2 ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += '"></span>';
          $html += '</span>';
        } else {
          console.log('인터렉션 타입 클래스를 적용해주세요');
          break;
        }
        $wrap.prepend($html);
      }
    }
  },
  init: function () {
    if ($('.ui-confetti').length) {
      $('.ui-confetti').each(function () {
        ui.Confetti.set($(this));
      });
    }
  }
};
/********************************
 * front 사용함수 *
 ********************************/
const $focusableEl = '[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]';
//Focus.disabled();
const Focus = {
  disabled: function (el) {
    const $number = -10;
    const $tabIdx = $(el).attr('tabindex');
    const $dataIdx = $(el).data('tabindex');
    if ($dataIdx == undefined && $tabIdx > $number) $(el).data('tabindex', $tabIdx);
    $(el).attr('tabindex', $number);
  },
  abled: function (el) {
    const $tabIdx = $(el).data('tabindex');
    if ($tabIdx != undefined) {
      $(el).attr('tabindex', $tabIdx);
    } else {
      $(el).removeAttr('tabindex');
    }
  }
};

//body scroll lock
const Body = {
  scrollTop: '',
  lock: function () {
    if (!$('html').hasClass('lock')) {
      Body.scrollTop = window.pageYOffset;
      const $wrap = $('#wrap');
      const $wrapTop = $wrap.offset().top;
      $wrap.css('top', Body.scrollTop * -1 + $wrapTop);
      $('html').addClass('lock');
    }
  },
  unlock: function () {
    if ($('html').hasClass('lock')) {
      $('html').removeClass('lock');
      $('#wrap').removeAttr('style');
      window.scrollTo(0, Body.scrollTop);
      window.setTimeout(function () {
        Body.scrollTop = '';
      }, 0);
    }
  }
};

//로딩함수
const Loading = {
  speed: 150,
  open: function (txt) {
    let $html = '<div class="loading-wrap" class="hide">';
    $html += '<div class="tl">';
    $html += '<div>';
    $html += '<div class="loading-icon" role="img"';
    //$html += '<div class="ld_img" role="img"';
    if (!txt) {
      $html += ' aria-label="화면을 불러오는중입니다."';
    }
    $html += '>';
    $html += '<div></div>';
    //$html += '<div class="ld_logo"></div>';
    //$html += '<div class="ld_dot"><i></i><i></i><i></i><i></i></div>';
    $html += '</div>';
    if (!!txt) {
      $html += '<div class="txt">' + txt + '</div>';
    }
    $html += '</div>';
    $html += '</div>';
    $html += '</div>';

    if (!$('.loading-wrap').length) $('body').prepend($html);
    $('.loading-wrap').stop(true, false).fadeIn(Loading.speed);
  },
  close: function () {
    $('.loading-wrap')
      .stop(true, false)
      .fadeOut(Loading.speed, function () {
        $(this).remove();
      });
  }
};

//레이어팝업(Layer): 레이어 팝업은 #contents 밖에 위치해야함
const Layer = {
  id: 'uiLayer',
  alertClass: 'ui-alert',
  focusedClass: 'pop__focused',
  focusInClass: 'ui-focus-in',
  removePopClass: 'ui-pop-remove',
  popClass: 'popup',
  pageClass: 'page',
  wrapClass: 'pop-wrap',
  headClass: 'pop-head',
  bodyClass: 'pop-body',
  footClass: 'pop-foot',
  innerClass: 'section',
  showClass: 'show',
  etcCont: '#header,#gnb,#contents,.floating-bar,#footer',
  beforeCont: [],
  content: '',
  like: function () {
    const $delayTime = 2000;
    const $wrap = $('#container').length ? $('#container') : $('body');
    const $html = '<div class="layer_like" aria-hidden="true"><div></div></div>';
    if (!$('.layer_like').length) $wrap.append($html);
    if (!$('.layer_like').hasClass('show')) $('.layer_like').addRemoveClass('show', 0, $delayTime);
  },
  overlapChk: function () {
    //focus 이벤트 시 중복열림 방지
    const $focus = $(':focus');
    if (!!event) {
      if (event.type === 'focus' && $($focus).hasClass(Layer.focusedClass)) {
        return false;
      }
    }
    //같은 내용 중복열림 방지
    if (Layer.beforeCont.indexOf(Layer.content) >= 0) {
      return false;
    } else {
      Layer.beforeCont.push(Layer.content);
    }
    return true;
  },
  alertHtml: function (type, popId, btnActionId, btnCancelId) {
    let $html = '<div id="' + popId + '" class="' + Layer.popClass + ' modal alert ' + Layer.alertClass + '" role="dialog" aria-hidden="true">';
    $html += '<article class="' + Layer.wrapClass + '">';
    $html += '<div class="' + Layer.bodyClass + '">';
    $html += '<div class="' + Layer.innerClass + '">';
    if (type === 'prompt') {
      $html += '<div class="form-lbl mt-0">';
      $html += '<label for="inpPrompt" role="alert" aria-live="assertive"></label>';
      $html += '</div>';
      $html += '<div class="form-item">';
      $html += '<div class="input"><input type="text" id="inpPrompt" placeholder="입력해주세요."></div>';
      $html += '</div>';
    } else {
      $html += '<div class="message">';
      $html += '<div role="alert" aria-live="assertive"></div>';
      $html += '</div>';
    }
    $html += '</div>';
    $html += '</div>';
    $html += '<div class="' + Layer.footClass + '">';
    $html += '<div class="flex">';
    if (type === 'confirm' || type === 'prompt') {
      $html += '<button type="button" id="' + btnCancelId + '" class="button gray h56">취소</button>';
    }
    $html += '<button type="button" id="' + btnActionId + '" class="button primary h56">확인</button>';
    $html += '</div>';
    $html += '</div>';
    $html += '</article>';
    $html += '</div>';

    if ($('#container').length) {
      $('#container').append($html);
    } else {
      $('body').append($html);
    }
  },
  alertEvt: function (type, option, callback, callback2, callback3, callback4) {
    const $length = $('.' + Layer.alertClass).length;
    const $popId = Layer.id + 'Alert' + $length;
    const $actionId = $popId + 'ActionBtn';
    const $cancelId = $popId + 'CancelBtn';

    if (typeof option === 'object') {
      Layer.content = option.content;
    } else if (typeof option == 'string') {
      //약식 설절
      Layer.content = option;
    }

    //텍스트가 아닌 배열이나 객체일때 텍스트 변환
    if (typeof Layer.content !== 'string') Layer.content = JSON.stringify(Layer.content);

    //내용있는지 체크
    if ($.trim(Layer.content) == '' || Layer.content == undefined) return false;

    //중복팝업 체크
    if (Layer.overlapChk() === false) return false;

    //팝업그리기
    Layer.alertHtml(type, $popId, $actionId, $cancelId);
    if (!!option.title || (typeof callback === 'string' && callback !== '')) {
      const $insertTit = typeof callback === 'string' && callback !== '' ? callback : option.title;
      const $titleHtml = '<div class="' + Layer.headClass + '"><div><h1>' + $insertTit + '</h1></div></div>';
      $('#' + $popId)
        .find('.' + Layer.wrapClass)
        .prepend($titleHtml);
    }
    if (!!option.actionTxt) $('#' + $actionId).text(option.actionTxt);
    if (typeof callback2 === 'string' && callback2 !== '') $('#' + $actionId).text(callback2);
    if (!!option.cancelTxt) $('#' + $cancelId).text(option.cancelTxt);
    if (typeof callback3 === 'string' && callback3 !== '') $('#' + $cancelId).text(callback3);
    const $htmlContent = Layer.content;
    if (type === 'prompt') {
      $('#' + $popId)
        .find('.form-lbl label')
        .html($htmlContent);
    } else {
      const $textAry = $htmlContent.split(' '),
        $textLengthAry = [];
      for (let i = 0; i < $textAry.length; i++) {
        $textLengthAry.push($textAry[i].length);
      }
      const $maxTxtLength = Math.max.apply(null, $textLengthAry);
      if ($maxTxtLength > 20)
        $('#' + $popId)
          .find('.message>div')
          .addClass('breakall');
      $('#' + $popId)
        .find('.message>div')
        .html($htmlContent);
    }
    Layer.open('#' + $popId);

    //click
    let $result = '';
    const $actionBtn = $('#' + $actionId);
    const $cancelBtn = $('#' + $cancelId);
    let $inpVal = '';
    $actionBtn.on('click', function () {
      $result = true;
      $inpVal = $('#' + $popId)
        .find('.input input')
        .val();
      Layer.close('#' + $popId, function () {
        if (type === 'prompt') {
          if (!!option.action) option.action($result, $inpVal);
          if (!!option.callback) option.callback($result, $inpVal);
          if (typeof callback === 'function') callback($result, $inpVal);
          if (typeof callback2 === 'function') callback2($result, $inpVal);
          if (typeof callback3 === 'function') callback3($result, $inpVal);
          if (typeof callback4 === 'function') callback4($result, $inpVal);
        } else {
          if (!!option.action) option.action($result);
          if (!!option.callback) option.callback($result);
          if (typeof callback === 'function') callback($result);
          if (typeof callback2 === 'function') callback2($result);
          if (typeof callback3 === 'function') callback3($result);
          if (typeof callback4 === 'function') callback4($result);
        }
      });
    });
    $cancelBtn.on('click', function () {
      $result = false;
      Layer.close('#' + $popId, function () {
        if (!!option.cancel) option.cancel($result);
        if (!!option.callback) option.callback($result);
        if (!!callback) callback($result);
      });
    });
  },
  alert: function (option, callback, callback2, callback3) {
    Layer.alertEvt('alert', option, callback, callback2, callback3);
  },
  confirm: function (option, callback, callback2, callback3, callback4) {
    Layer.alertEvt('confirm', option, callback, callback2, callback3, callback4);
  },
  prompt: function (option, callback, callback2, callback3, callback4) {
    Layer.alertEvt('prompt', option, callback, callback2, callback3, callback4);
  },
  keyEvt: function () {
    //컨펌팝업 버튼 좌우 방할기로 포거스 이동
    $(document).on('keydown', '.' + Layer.alertClass + ' .pop_btn .button', function (e) {
      const $keyCode = e.keyCode ? e.keyCode : e.which;
      let $tar = '';
      if ($keyCode == 37) $tar = $(this).prev();
      if ($keyCode == 39) $tar = $(this).next();
      if (!!$tar) $tar.focus();
    });
  },
  tooltip: function (contents, title) {
    const tooltipPopId = 'uiPopToolTip';
    let $html = '<div id="' + tooltipPopId + '" class="' + Layer.popClass + ' modal tooltip ' + Layer.removePopClass + '" role="dialog" aria-hidden="true">';
    $html += '<article class="' + Layer.wrapClass + '">';
    if (title !== undefined && title !== '') {
      $html += '<div class="' + Layer.headClass + '">';
      $html += '<div>';
      $html += '<h1>' + title + '</h1>';
      $html += '<a href="#" class="pop-close ui-pop-close" role="button" aria-label="팝업창 닫기"></a>';
      $html += '</div>';
      $html += '</div>';
    }
    $html += '<div class="' + Layer.bodyClass + '">';
    $html += '<div class="' + Layer.innerClass + '">';
    if (title === undefined) {
      $html += '<a href="#" class="pop-close ui-pop-close" role="button" aria-label="팝업창 닫기"></a>';
    }
    $html += contents;
    $html += '</div>';
    $html += '</div>';
    $html += '</article>';
    $html += '</div>';

    if ($('#container').length) {
      $('#container').append($html);
    } else {
      $('body').append($html);
    }
    Layer.open('#' + tooltipPopId);
  },
  imgBox: function (contents) {
    const imgPopId = 'uiPopImgBox';
    let $html = '<div id="' + imgPopId + '" class="' + Layer.popClass + ' full pop-img-box ' + Layer.removePopClass + '" role="dialog" aria-hidden="true">';
    $html += '<article class="' + Layer.wrapClass + '">';
    $html += '<div class="' + Layer.bodyClass + '">';
    $html += '<div class="ui-swiper img-box-swiper">';
    $html += '<div class="swiper">';
    $html += '<div class="swiper-wrapper"></div>';
    $html += '</div>';
    $html += '<div class="swiper-pagination"></div>';
    $html += '</div>';
    $html += '<a href="#" class="pop-close" role="button" aria-label="팝업창 닫기"></a>';
    $html += '</div>';
    $html += '</article>';
    $html += '</div>';

    if ($('#container').length) {
      $('#container').append($html);
    } else {
      $('body').append($html);
    }
    $('#' + imgPopId)
      .find('.swiper-wrapper')
      .append(contents);
    $('#' + imgPopId)
      .find('.swiper-wrapper')
      .children()
      .addClass('swiper-slide');

    let imgSwiper;
    Layer.open('#' + imgPopId, function () {
      imgSwiper = new Swiper('.img-box-swiper .swiper', {
        pagination: {
          el: '.img-box-swiper .swiper-pagination',
          clickable: true
        }
      });
    });
    $('#' + imgPopId)
      .find('.pop-close')
      .click(function (e) {
        e.preventDefault();
        Layer.close('#' + imgPopId, function () {
          imgSwiper.destroy();
        });
      });
  },
  selectId: 'uiSelectLayer',
  selectIdx: 0,
  selectClass: 'ui-pop-select',
  select: function (target, col) {
    const $target = $(target);
    const $targetVal = $target.val();
    let $title = $target.attr('title');
    const $popId = Layer.selectId + Layer.selectIdx;
    const $length = $target.children().length;
    let $option = '';
    let $opDisabled = '';
    let $opTxt = '';
    let $opVal = '';
    let $popHtml = '';
    const $isTouch = $target.hasClass('is-swipe') ? true : false;
    const $isTouchMove = $target.hasClass('is-swipe-move') ? true : false;
    let $isFullPop = false;

    Layer.selectIdx++;
    if ($title == undefined) $title = '선택';
    $popHtml +=
      '<div id="' +
      $popId +
      '" class="' +
      Layer.popClass +
      ' ' +
      ($isFullPop ? 'full' : 'bottom') +
      ($isTouch || $isTouchMove ? ' is-swipe' : '') +
      ($isTouchMove ? ' touch-move' : '') +
      ' ' +
      Layer.selectClass +
      '" role="dialog" aria-hidden="true">';
    $popHtml += '<article class="' + Layer.wrapClass + '">';
    $popHtml += '<div class="' + Layer.headClass + '">';
    $popHtml += '<div>';
    $popHtml += '<h1>' + $title + '</h1>';
    $popHtml += '<a href="#" class="pop-close ui-pop-close" role="button" aria-label="팝업창 닫기"></a>';
    $popHtml += '</div>';
    $popHtml += '</div>';
    $popHtml += '<div class="' + Layer.bodyClass + '">';

    $popHtml += '<ul class="select-item-wrap';
    if (!!col) $popHtml += ' col' + col;
    $popHtml += '">';
    for (let i = 0; i < $length; i++) {
      $option = $target.children().eq(i);
      $opDisabled = $option.prop('disabled');
      $opTxt = $option.text();
      $opVal = $option.attr('value');
      if ($opVal != '') {
        $popHtml += '<li>';
        $popHtml += '<div class="select-item' + ($targetVal == $opVal ? ' selected' : '') + '">';
        $popHtml += '<a href="#" class="ui-pop-select-btn' + ($opDisabled ? ' disabled' : '') + '" role="button" data-value="' + $opVal + '"';
        if ($targetVal == $opVal) $popHtml += ' title="' + ($opTxt.length > 20 ? $opTxt.substring(20, $opTxt.lastIndexOf('(')) : $opTxt) + ' 선택됨"';
        $popHtml += '>';
        $popHtml += '<div class="checkbox ty2"><i aria-hidden="true"></i></div>';
        $popHtml += '<div>' + $opTxt + '</div>';
        $popHtml += '</a>';
        $popHtml += '</div>';
        $popHtml += '</li>';
      }
    }
    $popHtml += '</ul>';
    $popHtml += '</div>';
    $popHtml += '</article>';
    $popHtml += '</div>';

    if ($('#container').length) {
      $('#container').append($popHtml);
    } else {
      $('body').append($popHtml);
    }

    $target.data('popup', '#' + $popId);

    $('#' + $popId).on('click', '.ui-pop-select-btn', function (e) {
      e.preventDefault();
      if (!$(this).hasClass('disabled')) {
        const $btnVal = $(this).data('value');
        const $btnTxt = $(this).text();
        $(this).parent().addClass('selected').closest('li').siblings().find('.selected').removeClass('selected');
        $target.val($btnVal).change();
        Layer.close('#' + $popId);
      }
    });
  },
  isSelectOpen: false,
  selectOpen: function (select, e) {
    const $select = $(select);
    const $txtLengthArry = [];
    if ($select.prop('disabled')) return false;
    if ($select.find('option').length < 1) return console.log('select에 option 없음');
    if ($select.find('option').length == 1 && $select.find('option').val() == '') return console.log('select에 option의 value가 0이라 리턴');
    Layer.isSelectOpen = true;
    $select.find('option').each(function () {
      const $optVal = $(this).val();
      const $optTxt = $(this).text();
      if ($optVal != '') {
        $txtLengthArry.push($optTxt.length);
      }
    });
    /*
     const $maxTxtLength = Math.max.apply(null, $txtLengthArry);
 
     //들어갈수 있는 글자수 체크
     const inWidthTxt = function(width,col){
       const  _fontSize = 14;
       const _paddingBorder = 28;
       const _val = ((width/col)-_paddingBorder)/(_fontSize*0.9);
       return Math.floor(_val);
     };
     const $winW = $(window).width();
     const $contW = $winW - (17*2);
     const $inTxt1 = inWidthTxt($contW,3);
     const $inTxt2 = inWidthTxt($contW,2);
 
     //글자수에따른 팝업 분류
     if($maxTxtLength <= $inTxt1){
       Layer.select($select,3);
     }else if($maxTxtLength <= $inTxt2){
       Layer.select($select,2);
     }else{
       Layer.select($select);
     }
     */
    Layer.select($select);

    const $pop = $select.data('popup');
    Layer.open($pop, function () {
      //if(!!e)$($pop).data('returnFocus',$currentTarget);
    });
  },
  selectUI: function () {
    //셀렉트 팝업
    $(document).on('click', '.ui-select-open', function (e) {
      e.preventDefault();
      let $select = '';
      if (Layer.isSelectOpen == false) {
        $select = $($(this).attr('href'));
        if (!$select.length) $select = $(this).prev('select');
        Layer.selectOpen($select, e);
      }
    });
    $(document).on('click', '.ui-select-lbl', function (e) {
      e.preventDefault();
      const $tar = $(this).is('a') ? $(this).attr('href') : '#' + $(this).attr('for');
      $($tar).next('.ui-select-open').focus().click();
    });
  },
  bottomTouch: function (tar) {
    const $popup = $(tar);
    const $wrap = $popup.find('.' + Layer.wrapClass);
    const $body = $popup.find('.' + Layer.bodyClass);
    const $bodyMinHeight = parseInt($body.css('padding-top')) + parseInt($body.css('padding-bottom'));

    let isMove = false;
    const $animateSpeed = 300;
    let $startH = 0;
    let $startX = 0;
    let $startY = 0;
    let $distanceX = 0;
    let $distanceY = 0;
    let $directionX = false;
    let $directionY = false;
    let $duration = 0;
    let $durationTimer;
    // let $distanceAry = [];

    $(tar)
      .find('.' + Layer.headClass)
      .on('touchstart mousedown', function (e) {
        isMove = true;
        const $this = $(this);
        const $clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const $clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        $startX = $clientX;
        $startY = $clientY;
        $startH = $this.closest('.' + Layer.wrapClass).outerHeight();
        $distanceX = 0;
        $distanceY = 0;
        $directionX = false;
        $directionY = false;
        if ($this.data('first-height') === undefined) $this.data('first-height', $startH);
        if ($this.data('is-full') === undefined) $this.data('is-full', false);
        $duration = 0;
        $durationTimer = setInterval(function () {
          $duration += 10;
        }, 10);
        $wrap.stop(false, true);
        if ($(tar).hasClass('touch-move')) $(tar).addClass('touch-moving');
      });

    $(tar)
      .find('.' + Layer.headClass)
      .on('touchmove mousemove', function (e) {
        if (!isMove) return false;
        const $this = $(this);
        const $clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const $clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
        $distanceX = $clientX - $startX;
        $distanceY = $clientY - $startY;
        // console.log($distanceX, $distanceY)

        // const $min = $(tar).hasClass('touch-move') ? $firstHeight:0;
        const $min = $bodyMinHeight;
        const $max = $(tar).hasClass('touch-move') ? $popup.height() : $popup.outerHeight();
        const $height = Math.max($min, Math.min($max, $startH - $distanceY));

        $wrap.css('height', $height);
        $body.css('max-height', $height);
        if (!$(tar).hasClass('touch-move')) {
          if ($popup.hasClass('full')) {
            // $isFull = true;
            $this.data('is-full', true);
            $popup.removeClass('full').addClass('bottom');
          }
        }
        /*
       if($duration%10 === 0){
         const $lastVal = $distanceAry.length ? $distanceAry[$distanceAry.length-1] : 0;
         $distanceAry.push($distanceY - $lastVal);
       }*/
      });

    $(tar)
      .find('.' + Layer.headClass)
      .on('touchend mouseup mouseleave', function (e) {
        if (!isMove) return false;
        isMove = false;
        const $this = $(this);
        const $isFull = $this.data('is-full');
        const $clientX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
        const $clientY = e.type === 'touchend' ? e.changedTouches[0].clientY : e.clientY;
        $distanceX = $clientX - $startX;
        $distanceY = $clientY - $startY;
        if ($distanceX !== 0) $directionX = $distanceX > 0 ? 'right' : 'left';
        if ($distanceY !== 0) $directionY = $distanceY > 0 ? 'down' : 'up';
        const $firstHeight = $this.data('first-height');
        const $min = $bodyMinHeight;
        const $max = $(tar).hasClass('touch-move') ? $popup.height() : $popup.outerHeight();

        clearInterval($durationTimer);
        const $powerRatio = $duration === 0 || $distanceY === 0 ? 0 : Math.abs($distanceY) / $duration;
        const $power = (1 + Math.round($powerRatio * 3)) * Math.round($powerRatio * 30);
        const $powerDistance = Math.round((($distanceY * -1) / $duration) * $power);
        if ($(tar).hasClass('touch-move')) {
          $(tar).removeClass('touch-moving');

          const $wrapHeight = $wrap.outerHeight();
          const $endHeight = Math.max($min, Math.min($max, $wrapHeight + $powerDistance));
          const $endSpeed = Math.min(2000, Math.abs($powerDistance * 10));
          $wrap.animate({ height: $endHeight }, $endSpeed, 'easeOutQuint', function () {
            $body.css('max-height', $endHeight);
          });
        } else {
          if (Math.abs($distanceY) > 50) {
            if ($popup.hasClass('bottom') && !$isFull) {
              if ($directionY === 'up') {
                $wrap.animate({ height: '100%' }, $animateSpeed, function () {
                  $wrap.removeCss('height');
                  $body.removeCss('max-height');
                  $popup.removeClass('bottom').addClass('full');
                });
              } else if ($directionY === 'down') {
                Layer.close(tar);
              }
            }
            console.log($isFull, $directionY, $firstHeight);
            if ($isFull && $directionY === 'down') {
              $wrap.animate({ height: $firstHeight }, $animateSpeed, function () {
                // $isFull = false;
                $this.data('is-full', false);
                $wrap.removeCss('height');
                $this.removeData('first-height');
              });
            }
          } else {
            if ($isFull) {
              $wrap.animate({ height: '100%' }, $animateSpeed, function () {
                // $isFull = false;
                $this.data('is-full', false);
                $wrap.removeCss('height');
                $popup.removeClass('bottom').addClass('full');
              });
            } else {
              console.log('bbb', $firstHeight);
              $wrap.animate({ height: $firstHeight }, $animateSpeed, function () {
                $wrap.removeCss('height');
                $body.css('max-height', $firstHeight);
                $this.removeData('first-height');
              });
            }
          }
        }

        $this.removeData('is-full');
        // $distanceAry = [];
      });
  },
  reOpen: false,
  openEl: '',
  openPop: [],
  opening: 0,
  open: function (tar, callback) {
    if ($(tar).length && $(tar).children('.' + Layer.wrapClass).length) {
      Layer.opening++;
      const $idx = $(tar).index('.' + Layer.popClass);
      const $show = $('.' + Layer.popClass + '.' + Layer.showClass).length;
      let $id = $(tar).attr('id');
      let $lastPop = '';

      if (Layer.openPop.length) $lastPop = Layer.openPop[Layer.openPop.length - 1];
      if ($show > 0) $(tar).css('z-index', '+=' + $show);
      if ($id == undefined) {
        $id = Layer.id + $idx;
        $(tar).attr('id', $id);
      }
      if (Layer.openPop.indexOf('#' + $id) < 0) Layer.openPop.push('#' + $id);

      if (!$(tar).hasClass('alert') && !$(tar).hasClass('bg-no-click')) {
        const $bgClick = '<div class="pop-bg-close ui-pop-close" role="button" aria-label="팝업창 닫기"></div>';
        if (!$(tar).find('.pop-bg-close').length) $(tar).prepend($bgClick);
      }
      const $openDelay = 50 * Layer.opening;

      $(tar).attr('aria-hidden', false);
      if ($(tar).hasClass('modal')) {
        $(tar).css('display', 'flex');
      } else {
        $(tar).show();
      }

      setTimeout(function () {
        //리턴 포커스
        let $focusEl = '';
        try {
          if (event.currentTarget != document) {
            $focusEl = $(event.currentTarget);
          } else {
            $focusEl = $(document.activeElement);
          }
        } catch (error) {
          $focusEl = $(document.activeElement);
        }

        if (Layer.openEl != '' && !$focusEl.is($focusableEl)) $focusEl = $(Layer.openEl);
        if ($($lastPop).data('returnFocus') == $focusEl) $focusEl = $(Layer.openEl);
        if ($($focusEl).is($focusableEl)) {
          $(tar).data('returnFocus', $focusEl);
          $focusEl.addClass(Layer.focusedClass);
        }

        //팝업 in 포커스
        if (!ui.Mobile.any()) {
          //PC
          if ($(tar).hasClass(Layer.alertClass)) {
            $(tar).find('.pop_btn .button').last().focus();
          } else {
            $(tar).attr({ tabindex: 0 }).focus();
          }
        } else {
          let $first = '';
          let $focusInEl = $(tar).find('.' + Layer.focusInClass);
          let $thisTxt = '';
          let $childrenTxt = '';
          //모바일
          if ($(tar).find('.' + Layer.headClass).length) {
            $first = $(tar)
              .find('.' + Layer.headClass)
              .children()
              .first();
            if (!$first.is($focusableEl)) $first.attr('tabindex', -1);
            $first.focus();
          } else {
            if (!$focusInEl.length) {
              $focusInEl = $(tar).find('.' + Layer.bodyClass);
              $first = $focusInEl.children().not('br').first();
              if ($first.text() == '' || $first.attr('aria-hidden') == 'true') $first = $first.next();
              $thisTxt = $.trim($focusInEl.text());
              $childrenTxt = $.trim($first.text());
              while ($focusInEl.children().not('br').length && $thisTxt.indexOf($childrenTxt) == 0) {
                $focusInEl = $first;
                $first = $first.children().not('br').first();
                if ($first.text() == '' || $first.attr('aria-hidden') == 'true') $first = $first.next();
                $thisTxt = $.trim($focusInEl.text());
                $childrenTxt = $.trim($first.text());
              }
              $focusInEl.addClass(Layer.focusInClass);
            }
            if (!$focusInEl.is($focusableEl)) $focusInEl.attr('tabindex', -1);
            $focusInEl.focus();
          }
        }
        $(Layer.etcCont).attr('aria-hidden', true);

        //열려있는 팝업
        if ($lastPop != '' && $lastPop != tar) $($lastPop).attr('aria-hidden', true);

        //웹접근성
        const $tit = $(tar).find('.' + Layer.headClass + ' h1');
        if ($tit.length) {
          if ($tit.attr('id') == undefined) {
            $tit.attr('id', $id + 'Label');
            $(tar).attr('aria-labelledby', $id + 'Label');
          } else {
            $(tar).attr('aria-labelledby', $tit.attr('id'));
          }
        }

        //popup(bottom:select)의 여러개의 tab-panel 높이 동일하게(안그럼 탭클릭시 왔다리 갔다리함)
        if ($(tar).hasClass('bottom') && $(tar).find('.tab-panel').length > 1) {
          $(tar).sameHeight('.tab-panel');
        }

        //팝업안 고정탭

        //팝업안 swiper
        if ($(tar).find('.ui-swiper').length) ui.Swiper.update($(tar).find('.ui-swiper'));

        //열기
        if (!$('html').hasClass('lock')) Body.lock();
        $(tar).addClass(Layer.showClass);
        $(tar)
          .find('.' + Layer.bodyClass)
          .scrollTop(0);

        //swipe 기능
        if ($(tar).hasClass('is-swipe') && !$(tar).hasClass('is-swipe__init')) {
          $(tar).addClass('is-swipe__init');
          Layer.bottomTouch(tar);
        }

        if (!ui.Mobile.any()) Layer.focusMove(tar);
        Layer.position(tar);
        if (!!callback) {
          callback();
        }
        setTimeout(function () {
          Layer.resize();
        }, 10);
        Layer.opening--;
      }, $openDelay);
    } else {
      //팝업 없을때
      if (!Layer.reOpen) {
        Layer.reOpen = true;
        console.log(tar, '팝업없음, 0.5초 후 open 재시도');
        setTimeout(function () {
          Layer.open(tar, callback);
        }, 500);
      } else {
        Layer.reOpen = false;
        console.log(tar, '재시도해도 팝업없음');
      }
    }
  },
  close: function (tar, callback) {
    if (!$(tar).hasClass(Layer.showClass)) return console.log(tar, '해당팝업 안열려있음');
    const $id = $(tar).attr('id');
    let $closeDelay = 710;
    let $lastPop = '';
    const $visible = $('.' + Layer.popClass + '.' + Layer.showClass).length;

    Layer.openPop.splice(Layer.openPop.indexOf('#' + $id), 1);
    if (Layer.openPop.length) $lastPop = Layer.openPop[Layer.openPop.length - 1];
    if ($visible == 1) {
      Body.unlock();
      $(Layer.etcCont).removeAttr('aria-hidden');
    }
    if ($lastPop != '') $($lastPop).attr('aria-hidden', false);

    //포커스
    const $returnFocus = $(tar).data('returnFocus');
    if ($returnFocus != undefined) {
      $returnFocus.removeClass(Layer.focusedClass).focus();
      //플루팅 버튼
      if ($returnFocus.closest('.floating-btn').length && $returnFocus.closest('.floating-btn').hasClass('pop-on')) {
        $returnFocus.closest('.floating-btn').removeCss('z-index').removeClass('pop-on');
      }
    } else {
      //리턴 포커스가 없을때
      if ($('#header').length) {
        if ($('.head-back').length) {
          $('.head-back').focus();
        } else if ($('#header h1.logo').length) {
          $('#header h1.logo a').focus();
        } else {
          $('#header').focus();
        }
      } else {
        $(tar).find(':focus').blur();
        $('#contents').find($focusableEl).first().focus();
      }
    }

    //닫기
    $(tar).removeClass(Layer.showClass).data('focusMove', false).data('popPosition', false);
    $(tar).attr('aria-hidden', 'true').removeAttr('tabindex aria-labelledby');
    if ($(tar).hasClass('no_motion')) $closeDelay = 10;
    setTimeout(function () {
      $(tar).removeAttr('style');
      if ($(tar).hasClass('is-swipe')) {
        $(tar)
          .find('.' + Layer.wrapClass)
          .removeCss('height');
        if ($(tar).hasClass('full')) $(tar).removeClass('full').addClass('bottom');
      }
      $(tar)
        .find('.' + Layer.headClass)
        .removeAttr('style')
        .removeClass('shadow')
        .find('h1')
        .removeAttr('tabindex');
      $(tar)
        .find('.' + Layer.bodyClass)
        .removeAttr('tabindex style');
      $(tar)
        .find('.' + Layer.focusInClass)
        .removeAttr('tabindex');
      if ($(tar).find('.pop-close.last_focus').length) $(tar).find('.pop-close.last_focus').remove();
    }, $closeDelay);

    //알럿창
    if ($(tar).hasClass(Layer.alertClass) || $(tar).hasClass(Layer.selectClass) || $(tar).hasClass(Layer.removePopClass)) {
      setTimeout(function () {
        if ($(tar).hasClass(Layer.selectClass)) Layer.isSelectOpen = false;
        if ($(tar).hasClass(Layer.alertClass)) {
          const $content = $(tar).find('.message>div').html();
          Layer.beforeCont.splice(Layer.beforeCont.indexOf($content), 1);
        }
        $(tar).remove();
      }, $closeDelay);
    }

    //callback
    if (!!callback) {
      setTimeout(function () {
        callback();
      }, $closeDelay);
    }
  },
  resize: function () {
    const $popup = $('.' + Layer.popClass + '.' + Layer.showClass);
    if (!$popup.length) return;
    const headHeight = function (headCont, contentCont) {
      const $headH = headCont.children().outerHeight();
      const $position = headCont.css('position');
      const $padTop = parseInt(contentCont.css('padding-top'));
      console.log($headH, $padTop);
      if ($headH > $padTop) {
        contentCont.css('padding-top', $headH);
      }
    };
    const footHeight = function (footCont, contentCont) {
      const $footH = footCont.children().outerHeight();
      const $padBottom = parseInt(contentCont.css('padding-bottom'));
      if ($footH > $padBottom) {
        contentCont.css('padding-bottom', $footH);
      }
    };
    $popup.each(function () {
      const $this = $(this);
      const $wrap = $this.find('.' + Layer.wrapClass);
      const $head = $wrap.find('.' + Layer.headClass);
      const $tit = $head.find('h1');
      const $foot = $wrap.find('.' + Layer.footClass);
      const $body = $wrap.find('.' + Layer.bodyClass);

      $head.removeAttr('style').removeClass('shadow');
      $body.removeAttr('tabindex style');

      if ($head.length) headHeight($head, $body);
      if ($foot.length) footHeight($foot, $body);

      //레이어팝업
      //컨텐츠 스크롤이 필요할때
      const $height = $this.height();
      // const  $popHeight = $this.find('.'+Layer.wrapClass).outerHeight();
      if ($this.hasClass('bottom') || $this.hasClass('modal')) $body.css('max-height', $height);

      //팝업 헤더 shadow
      Layer.shadow($body);

      //바텀시트 선택요소로 스크롤
      if ($this.hasClass(Layer.selectClass) && $this.find('.selected').length && !$body.hasClass('scrolling')) {
        const $bodyPdT = parseInt($body.css('padding-top'));
        const $bodyH = $body.outerHeight();
        const $bodyH2 = $body.get(0).scrollHeight;
        const $selected = $body.find('.selected');
        const $selectedH = $selected.outerHeight();
        const $selectedTop = $selected.position().top;

        if ($bodyH < $bodyH2) {
          $body.addClass('scrolling');
          const $sclTop = $selectedTop - $bodyH + $bodyH / 2 - $selectedH / 2 + $bodyPdT / 2;
          $body.animate({ scrollTop: $sclTop }, 300, function () {
            $body.removeClass('scrolling');
          });
        }
      }
    });
  },
  shadow: function (el) {
    const $wrap = $(el).closest('.' + Layer.wrapClass);
    const $head = $wrap.find('.' + Layer.headClass);
    const $foot = $wrap.find('.' + Layer.footClass);
    const $contScrollTop = $wrap.hasClass(Layer.pageClass) ? $(window).scrollTop() : $(el).scrollTop();
    const $contScrollHeight = $wrap.hasClass(Layer.pageClass) ? $('body').get(0).scrollHeight : $(el)[0].scrollHeight;
    const $contHeight = $wrap.hasClass(Layer.pageClass) ? $(window).height() : $(el).outerHeight();
    if ($head.length) {
      if ($contScrollTop > 50) {
        $head.addClass('shadow');
      } else {
        $head.removeClass('shadow');
      }
    }
    if ($foot.length) {
      if ($contScrollTop + $contHeight >= $contScrollHeight - 10) {
        $foot.removeClass('shadow');
      } else {
        $foot.addClass('shadow');
      }
    }
  },
  position: function (tar) {
    if (!$(tar).hasClass(Layer.showClass)) return false;
    if ($(tar).data('popPosition') == true) return false;
    $(tar).data('popPosition', true);
    const $body = $(tar).find('.' + Layer.bodyClass);
    const $foot = $(tar).find('.' + Layer.footClass);

    if ($foot.length) $body.addClass('next-foot');

    Layer.resize();

    $body.scroll(function () {
      Layer.shadow($body);
    });
  },
  focusMove: function (tar) {
    if (!$(tar).hasClass(Layer.showClass)) return false;
    if ($(tar).data('focusMove') == true) return false;
    $(tar).data('focusMove', true);
    const $tar = $(tar);
    const $focusaEls = $tar.find($focusableEl);
    let $isFirstBackTab = false;

    $focusaEls.on('keydown', function (e) {
      const $keyCode = e.keyCode ? e.keyCode : e.which;
      const $focusable = $tar.find($focusableEl).not('.last_focus');
      const $focusLength = $focusable.length;
      const $firstFocus = $focusable.first();
      const $lastFocus = $focusable.last();
      const $index = $focusable.index(this);

      $isFirstBackTab = false;
      if ($index == $focusLength - 1) {
        //last
        if ($keyCode == 9) {
          if (!e.shiftKey) {
            $firstFocus.focus();
            e.preventDefault();
          }
        }
      } else if ($index == 0) {
        //first
        if ($keyCode == 9) {
          if (e.shiftKey) {
            $isFirstBackTab = true;
            $lastFocus.focus();
            e.preventDefault();
          }
        }
      }
    });

    $tar.on('keydown', function (e) {
      const $keyCode = e.keyCode ? e.keyCode : e.which;
      const $focusable = $tar.find($focusableEl).not('.last_focus');
      const $lastFocus = $focusable.last();

      if (e.target == this && $keyCode == 9) {
        if (e.shiftKey) {
          $lastFocus.focus();
          e.preventDefault();
        }
      }
    });

    $(document).on('focusin', $tar.selector + ' .last_focus', function (e) {
      const $focusable = $tar.find($focusableEl).not('.last_focus');
      const $firstFocus = $focusable.first();
      const $lastFocus = $focusable.last();
      if ($isFirstBackTab) {
        $lastFocus.focus();
      } else {
        $firstFocus.focus();
      }
    });
  },
  page: function (elment) {
    const $elment = $(elment);
    /*
    $elment.each(function () {
      const $this = $(this);
      if (!$this.closest('.popup').length) {
        $this.addClass('page');
        const $body = $this.find('.pop-body');
        const $foot = $this.find('.pop-foot');
        if ($body.length && $foot.length) $body.addClass('next-foot');
      }
    });
    */

    if ($elment.closest('.' + Layer.popClass).length) {
      $elment.removeClass(Layer.pageClass);
      return;
    }
    const $body = $elment.find('.' + Layer.bodyClass);
    const $foot = $elment.find('.' + Layer.footClass);
    if ($body.length && $foot.length) $body.addClass('next-foot');

    Layer.shadow($body);
    $(window).scroll(function () {
      Layer.shadow($body);
    });
  },
  loadIdx: 0,
  load: function ($url, $type) {
    const popId = 'popLoad-' + Layer.loadIdx;
    Layer.loadIdx += 1;
    let $html = '<div id="' + popId + '" class="' + Layer.popClass + ' ' + $type + ' ' + Layer.removePopClass + '" role="dialog" aria-hidden="true">';
    $html += '</div>';

    if ($('#container').length) {
      $('#container').append($html);
    } else {
      $('body').append($html);
    }

    const $pop = $('#' + popId);
    const $loadId = '#load';
    $pop.load($url + ' ' + $loadId, function (res, sta, xhr) {
      if (sta == 'success') {
        const $popWrap = $('#' + popId).find($loadId);
        if ($popWrap.hasClass(Layer.wrapClass)) {
          $popWrap.removeAttr('id');
        } else {
          $popWrap.children().unwrap();
        }
        $('#' + popId)
          .find('.' + Layer.wrapClass)
          .removeClass(Layer.pageClass);
        $('#' + popId)
          .find('.' + Layer.headClass + ' .pop-close')
          .addClass('ui-pop-close');
        Layer.open('#' + popId);
      } else {
        $('#' + popId).remove();
      }
    });
  },
  toast: function (txt, fn, type, delayTime) {
    if (type === undefined) type = 'toast';
    const $isAlarm = type === 'alarm';
    const $isFn = !!fn;
    const $className = '.' + type + '-box';

    if (delayTime == undefined) delayTime = 3000;

    let $boxHtml = '<div class="' + $className.substring(1) + '">';
    $boxHtml += '<div>';
    if ($isFn) {
      $boxHtml += '<a href="#" role="button" class="txt">' + txt + '</a>';
    } else {
      $boxHtml += '<div class="txt">' + txt + '</div>';
    }
    if ($isAlarm) {
      $boxHtml += '<button type="button" class="close">닫기</button>';
    }
    $boxHtml += '</div>';
    $boxHtml += '</div>';
    $('#contents').before($boxHtml);
    const $toast = $($className).last();
    const $toastClose = function () {
      $toast.removeClass('on');
      $toast.one('transitionend', function () {
        $(this).remove();
      });
    };
    if ($('#header').length) {
      const $top = parseInt($toast.css('top'));
      const $spaceH = $('#header').outerHeight();
      $toast.css('top', $top + $spaceH);
    }
    $toast.addClass('on');
    let $closeTime;
    if (!$isAlarm) {
      $closeTime = setTimeout($toastClose, delayTime);
    }
    if ($isFn) {
      $toast.find('a.txt').one('click', function (e) {
        e.preventDefault();
        fn();

        // 이벤트 실행시 바로 닫기
        clearTimeout($closeTime);
        $toastClose();
      });
    }
  },
  alarm: function (txt, fn, delayTime) {
    Layer.toast(txt, fn, 'alarm', delayTime);
  },
  init: function () {
    if ($('.' + Layer.popClass + '.' + Layer.showClass).length) {
      Layer.open('.' + Layer.popClass + '.' + Layer.showClass);
    }
    const $winpop = $('.' + Layer.wrapClass + '.' + Layer.pageClass);
    if ($winpop.length) {
      Layer.page($winpop);
    }

    $(document).on('click', $focusableEl, function (e) {
      Layer.openEl = e.currentTarget;
    });
    setTimeout(function () {
      Layer.openEl = '';
    }, 100);

    //열기
    $(document).on('click', '.ui-pop-open', function (e) {
      e.preventDefault();
      const $pop = $(this).attr('href');
      const $currentTarget = $(e.currentTarget);
      if ($pop.length) {
        Layer.open($pop, function () {
          $($pop).data('returnFocus', $currentTarget);
        });
      }
    });

    //닫기
    $(document).on('click', '.ui-pop-close', function (e) {
      e.preventDefault();
      let $pop = $(this).attr('href');
      if ($pop == '#' || $pop == '#none' || $pop == undefined) $pop = $(this).closest('.' + Layer.popClass);
      if ($pop.length) Layer.close($pop);
    });

    Layer.keyEvt();
    Layer.selectUI();

    $(document).on('click', '[data-popup]', function (e) {
      e.preventDefault();
      const $popup = $(this).data('popup');
      Layer.load($popup, 'full');
    });
    $(document).on('click', '[data-popup-full]', function (e) {
      e.preventDefault();
      const $popup = $(this).data('popup-full');
      Layer.load($popup, 'full');
    });
    $(document).on('click', '[data-popup-modal]', function (e) {
      e.preventDefault();
      const $popup = $(this).data('popup-modal');
      Layer.load($popup, 'modal');
    });
    $(document).on('click', '[data-popup-bottom]', function (e) {
      e.preventDefault();
      const $popup = $(this).data('popup-bottom');
      Layer.load($popup, 'bottom');
    });
    $(document).on('click', '[data-popup-left]', function (e) {
      e.preventDefault();
      const $popup = $(this).data('popup-left');
      Layer.load($popup, 'side-left');
    });
    $(document).on('click', '[data-popup-right]', function (e) {
      e.preventDefault();
      const $popup = $(this).data('popup-right');
      Layer.load($popup, 'side-right');
    });

    // 알람박스 닫기
    $(document).on('click', '.alarm-box .close', function (e) {
      e.preventDefault();
      const $box = $(this).closest('.alarm-box');
      $box.removeClass('on');
      $box.on('transitionend', function () {
        $(this).remove();
      });
    });
  }
};

/********************************
 * front 제작 플러그인 *
 ********************************/
//검색어 강조표시
$.fn.highlightTxt = function (keyword) {
  return this.each(function () {
    let $firstHtml = $(this).data('html'),
      $html = $(this).html();
    if (!$firstHtml) {
      $firstHtml = $(this).html();
      $(this).data('html', $html);
    }
    if (keyword != '') {
      if ($firstHtml.indexOf(keyword) >= 0) {
        $html = $firstHtml.split(keyword).join('<em class="t-keyword">' + keyword + '</em>');
      } else {
        $html = $firstHtml;
      }
    } else {
      $html = $firstHtml;
    }
    $(this).html($html);
  });
};

//접근성 관련 플러그인
//$(element).aria('hidden',true});
//$(element).aria({'hidden':true,'selected':true});
$.fn.aria = function (attr, val) {
  const $ariaType = [
    'hidden',
    'label',
    'live',
    'expanded',
    'controls',
    'selected',
    'checked',
    'pressed',
    'disabled',
    'readonly',
    'required',
    'labelledby',
    'describedby',
    'invalid',
    'secret',
    'valuemax',
    'valuemin',
    'valuenow',
    'level',
    'multiline',
    'multiselectable',
    'datatype',
    'autocomplete',
    'owns',
    'haspopup',
    'relevant',
    'atomic',
    'busy',
    'dropeffect',
    'grabbed',
    'activedescendant',
    'colcount',
    'colindex',
    'colspan',
    'details',
    'errormessage',
    'flowto',
    'posinset',
    'rowcount',
    'rowindex',
    'rowspan',
    'setsize'
  ];
  return this.each(function () {
    const $this = $(this);
    if (typeof attr === 'string') {
      if (arrayIndexOf($ariaType, attr)) {
        $this.attr('aria-' + attr, val);
      } else {
        console.log('aria-' + attr + ': 확인안된 aria 속성 타입~~!\n$ariaType 및 철자 확인요망');
      }
    } else if (typeof attr == 'object') {
      const $key = Object.keys(attr),
        $length = $key.length;
      for (let i = 0; i < $length; i++) {
        if (arrayIndexOf($ariaType, $key[i])) {
          $this.attr('aria-' + $key[i], attr[$key[i]]);
        } else {
          console.log('aria-' + $key[i] + ': 확인안된 aria 속성 타입~~!\n$ariaType 및 철자 확인요망');
        }
      }
    }
  });
};

//$(element).removeAria('hidden');
//$(element).removeAria('hidden, selected');
$.fn.removeAria = function (attr) {
  return this.each(function () {
    const $this = $(this);
    const $arry = txtSpaceDel(attr).split(',');
    for (let i = 0; i < $arry.length; i++) {
      $this.removeAttr('aria-' + $arry[i]);
    }
  });
};

//$(element).role('button');
$.fn.role = function (val) {
  return this.each(function () {
    const $this = $(this);
    $this.attr('role', val);
  });
};

//resize가 끝나면: resizeEnd
//$(window).resizeEnd(function(){console.log('resizeEnd');},300);
let resizeEndCnt = 0;
$.fn.resizeEnd = function (callback, timeout) {
  resizeEndCnt = resizeEndCnt + 1;
  const cnt = resizeEndCnt;
  return this.each(function () {
    const $this = $(this);
    $this.resize(function () {
      if ($this.data('resizeTimeout' + cnt)) {
        clearTimeout($this.data('resizeTimeout' + cnt));
      }
      $this.data('resizeTimeout' + cnt, setTimeout(callback, timeout));
    });
  });
};

//scroll이 끝나면: scrollEnd
//$(window).scrollEnd(function(){console.log('scrollEnd');},300);
let scrollEndCnt = 0;
$.fn.scrollEnd = function (callback, timeout) {
  scrollEndCnt = scrollEndCnt + 1;
  const cnt = scrollEndCnt;
  return this.each(function () {
    const $this = $(this);
    $this.scroll(function () {
      if ($this.data('scrollTimeout' + cnt)) {
        clearTimeout($this.data('scrollTimeout' + cnt));
      }
      $this.data('scrollTimeout' + cnt, setTimeout(callback, timeout));
    });
  });
};

//css 지우기
// $('body').removeCss('background');
// $('body').removeCss(['border','background']);
// $('body').removeCss({color: 'white'});
$.fn.removeCss = function (css) {
  let properties = [];
  const is = $.type(css);

  if (is === 'array') properties = css;
  if (is === 'object') for (let rule in css) properties.push(rule);
  if (is === 'string') properties = css.replace(/,$/, '').split(',');

  return this.each(function () {
    const $this = $(this);
    $.map(properties, function (prop) {
      $this.css(prop, '');
    });
  });
};

//글자바꾸기: changeTxt(바꿀텍스트,바낄텍스트)
//$('.txt').changeTxt('열기','닫기');
$.fn.changeTxt = function (beforeTxt, afterTxt) {
  return this.each(function () {
    const element = $(this);
    const $html = element.html();
    if ($html != undefined && $html != '') {
      element.html($html.split(beforeTxt).join(afterTxt));
    }
  });
};
$.fn.changeAriaLabel = function (beforeTxt, afterTxt) {
  return this.each(function () {
    const element = $(this);
    const $ariaLabel = element.attr('aria-label');
    if ($ariaLabel != undefined) {
      const $ariaLabel2 = $ariaLabel.split(beforeTxt).join(afterTxt);
      element.attr('aria-label', $ariaLabel2);
    }
  });
};

//클래스 넣었다 빼기: addRemoveClass(클래스명, 붙는 시간, 빼는 시간)
//$(this).addRemoveClass('on', 500, 1000);
$.fn.addRemoveClass = function (className, addTime, removeTime, callback) {
  const element = this;
  const addIt = function () {
    element.addClass(className);
  };
  const removeIt = function () {
    element.removeClass(className);
    if (!!callback) {
      callback();
    }
  };
  setTimeout(function () {
    addIt();
    setTimeout(removeIt, removeTime);
  }, addTime);
  return this;
};

/********************************
 * front 유틸함수 *
 ********************************/
//ie에서 startsWith,endsWith 작동되게
if (ui.PC.msie()) {
  String.prototype.startsWith = function (str) {
    if (this.length < str.length) return false;
    return this.indexOf(str) == 0;
  };
  String.prototype.endsWith = function (str) {
    if (this.length < str.length) return false;
    return this.lastIndexOf(str) + str.length == this.length;
  };
}

const getOffset = function (element) {
  let $el = element;
  let $elX = 0;
  let $elY = 0;
  let isSticky = false;
  while ($el && !Number.isNaN($el.offsetLeft) && !Number.isNaN($el.offsetTop)) {
    let $style = window.getComputedStyle($el);
    // const $matrix = new WebKitCSSMatrix($style.transform);
    if ($style.position === 'sticky') {
      isSticky = true;
      $el.style.position = 'static';
    }
    $elX += $el.offsetLeft;
    // $elX += $matrix.m41; //translateX
    $elY += $el.offsetTop;
    // $elY += $matrix.m42;  //translateY
    if (isSticky) {
      isSticky = false;
      $el.style.position = '';
      if ($el.getAttribute('style') === '') $el.removeAttribute('style');
    }
    $el = $el.offsetParent;
    if ($el !== null) {
      $style = window.getComputedStyle($el);
      $elX += parseInt($style.borderLeftWidth);
      $elY += parseInt($style.borderTopWidth);
    }
  }
  return { left: $elX, top: $elY };
};

// Convert radians to degrees
const radToDeg = function (radians) {
  var pi = Math.PI;
  return radians * (180 / pi);
};

// 컬러가 어두운지 밝은지 확인
const getBgBrightValue = function (hexColor) {
  const c = hexColor.substring(1); // 색상 앞의 # 제거
  const rgb = parseInt(c, 16); // rrggbb를 10진수로 변환
  const r = (rgb >> 16) & 0xff; // red 추출
  const g = (rgb >> 8) & 0xff; // green 추출
  const b = (rgb >> 0) & 0xff; // blue 추출

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  // 색상 선택
  return luma;
};

//컬러값 변경
const hexToRgb = function (h) {
  let r = 0;
  let g = 0;
  let b = 0;
  // 3 digits
  if (h.length === 3) {
    r = parseInt(h[0] + h[0], 16);
    g = parseInt(h[1] + h[1], 16);
    b = parseInt(h[2] + h[2], 16);
    // 6 digits
  } else if (h.length === 6) {
    r = parseInt(h[0] + h[1], 16);
    g = parseInt(h[2] + h[3], 16);
    b = parseInt(h[4] + h[5], 16);
  }
  return r + ',' + g + ',' + b;
};
const rgbToHex = function (r, g, b) {
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};
const hex2rgba = function (str) {
  const num = parseInt(str.slice(1), 16); // Convert to a number
  const ary = [(num >> 16) & 255, (num >> 8) & 255, num & 255, (num >> 24) & 255];
  return ary.join(',');
};
const rgba2hex = function (rgba) {
  const $match = rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1);
  const $map = $match.map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', ''));
  const $rtnVal = $map.join('');
  return '#' + $rtnVal;
};

//br 태그 삽입
//brTxtInsert(엘리먼트,기준마크,최대글자수);
//brTxtInsert('.br-txt','/',7);
const brTxtInsert = function (el, mark, maxWordLength) {
  $(el).each(function () {
    const $text = $(this).text();
    if ($text.indexOf(mark) >= 0) {
      const $txtAry = $text.split(mark);
      let $insertTxt = '';
      let $wordLength = $insertTxt.length;
      let $row = 1;
      for (let i = 0; i < $txtAry.length; i++) {
        if (i != 0) {
          if ($wordLength + $txtAry[i].length + mark.length > maxWordLength * $row) {
            $insertTxt += '<br>';
            $row++;
            $wordLength = 0;
          }
          $insertTxt += mark;
        }
        $insertTxt += $txtAry[i];
        if ($wordLength == 0) {
          $wordLength = $txtAry[i].length + mark.length;
        } else {
          $wordLength = $insertTxt.length;
        }
      }
      $(this).html($insertTxt);
    }
  });
};

//넓이대비 삽입가능한 글자수 확인: 검증필요
//console.log(wordInsertCount(element));
const wordInsertCount = function (el) {
  const _this = $(el);
  const _thisFtSize = parseInt(_this.css('font-size'));
  const _thisWidth = _this.width();
  return Math.floor(_thisWidth / _thisFtSize);
};

//랜덤값 추출
const randomNumber = function (min, max, point) {
  return (Math.random() * (max - min) + min).toFixed(point);
};

//전화번호 포맷
const autoPhoneFormet = function (str, mark) {
  const $phone = str.replace(/[^0-9]/g, '');
  const $phoneAry = [];
  if (!mark) mark = '-';
  if ($phone.length < 4) {
    $phoneAry.push($phone);
  } else if (str.length < 8) {
    $phoneAry.push($phone.substr(0, 3));
    $phoneAry.push($phone.substr(3));
  } else if (str.length < 11) {
    $phoneAry.push($phone.substr(0, 3));
    $phoneAry.push($phone.substr(3, 3));
    $phoneAry.push($phone.substr(6));
  } else {
    $phoneAry.push($phone.substr(0, 3));
    $phoneAry.push($phone.substr(3, 4));
    $phoneAry.push($phone.substr(7));
  }
  return $phoneAry.join(mark);
};

//Input date
const autoDateFormet = function (str, mark) {
  const $date = str.replace(/[^0-9]/g, '');
  const $dateAry = [];
  if (!mark) mark = '.';
  if ($date.length < 5) {
    $dateAry.push($date);
  } else if (str.length < 7) {
    $dateAry.push($date.substr(0, 4));
    $dateAry.push($date.substr(4));
  } else {
    $dateAry.push($date.substr(0, 4));
    $dateAry.push($date.substr(4, 2));
    $dateAry.push($date.substr(6));
  }
  return $dateAry.join(mark);
};
const autoTimeFormet = function (str, mark) {
  const $time = str.replace(/[^0-9]/g, '');
  const $timeAry = [];
  if (!mark) mark = '.';
  if ($time.length <= 2) {
    $timeAry.push($time);
  } else if (str.length == 3 || str.length == 5) {
    $timeAry.push($time.substr(0, 1));
    $timeAry.push($time.substr(1, 2));
    if (str.length == 5) $timeAry.push($time.substr(3));
  } else if (str.length >= 4) {
    $timeAry.push($time.substr(0, 2));
    $timeAry.push($time.substr(2, 2));
    if (str.length > 4) $timeAry.push($time.substr(4));
  }
  return $timeAry.join(mark);
};

//파라미터 값 갖고오기
const getUnlParams = function () {
  const params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
    params[key] = value;
  });
  return params;
};

// 스토리지(localStorage, sessionStorage) 값 컨트롤
const uiStorage = {
  set: function (key, value, type) {
    let $storage = type === 'session' ? sessionStorage : localStorage;
    $storage.setItem(key, value);
  },
  get: function (key, type) {
    let $storage = type === 'session' ? sessionStorage : localStorage;
    const $value = $storage.getItem(key);
    return $value;
  },
  remove: function (key, type) {
    let $storage = type === 'session' ? sessionStorage : localStorage;
    $storage.removeItem(key);
  },
  clear: function (type) {
    let $storage = type === 'session' ? sessionStorage : localStorage;
    $storage.clear();
  }
};

// 쿠키 컨트롤
const uiCookie = {
  set: function (key, value, expireYn) {
    let cookieVal = key + '=' + value;
    if (expireYn == 1) cookieVal += '; expires=' + new Date().toString().split('+')[0] + ';';
    document.cookie = cookieVal;
  },
  get: function (key) {
    const cookieArry = document.cookie.split(';');
    let returnVal = '';
    for (let cI in cookieArry) {
      const cookieDataArry = String(cookieArry[cI]).split('=');
      if (String(cookieDataArry[0]).trim() == key && String(cookieDataArry[0]).trim() != '') {
        returnVal = String(cookieDataArry[1]).trim();
      }
    }
    return returnVal;
  }
};

//날짜구하기
const todayTimeString = function (addDay) {
  const $today = new Date();
  if (!!addDay) $today.setDate($today.getDate() + addDay);
  return timeString($today);
};
const timeString = function (date) {
  const $year = date.getFullYear();
  let $month = date.getMonth() + 1;
  let $day = date.getDate();
  let $hour = date.getHours();
  let $min = date.getMinutes();
  let $sec = date.getSeconds();
  if (('' + $month).length == 1) $month = '0' + $month;
  if (('' + $day).length == 1) $day = '0' + $day;
  if (('' + $hour).length == 1) $hour = '0' + $hour;
  if (('' + $min).length == 1) $min = '0' + $min;
  if (('' + $sec).length == 1) $sec = '0' + $sec;
  return '' + $year + $month + $day + $hour + $min + $sec;
};
const $dayLabelPrint = function () {
  const $today = new Date();
  const $week = ['일', '월', '화', '수', '목', '금', '토'];
  const $dayLabel = $week[$today.getDay()];
  return $dayLabel;
};
const $nowDateFull = parseInt(todayTimeString()); //년+월+일+시+분+초
const $nowDateHour = parseInt(todayTimeString().substr(0, 10)); //년+월+일+시
const $nowDateDay = parseInt(todayTimeString().substr(0, 8)); //년+월+일
const $nowDateMonth = parseInt(todayTimeString().substr(0, 6)); //년+월
const $nowDateOnlyFullTime = parseInt(todayTimeString().substr(8, 6)); //시+분
const $nowDateOnlyTime = parseInt(todayTimeString().substr(8, 4)); //시+분
const $nowDateOnlyYear = parseInt(todayTimeString().substr(0, 4)); //년
const $nowDateOnlyMonth = parseInt(todayTimeString().substr(4, 2)); //월
const $nowDateOnlyDay = parseInt(todayTimeString().substr(6, 2)); //일
const $nowDateOnlyHour = parseInt(todayTimeString().substr(8, 2)); //시
const $nowDateOnlyMin = parseInt(todayTimeString().substr(10, 2)); //분
const $nowDateOnlySec = parseInt(todayTimeString().substr(12, 2)); //초
const $nowDateDayLabel = $dayLabelPrint(); //요일
const $afterDateDay = function (day) {
  return parseInt(todayTimeString(day - 1).substr(0, 8));
};
//console.log($nowDateFull,$nowDateHour,$nowDateDay,$afterDateDay(7),$nowDateMonth,$nowDateOnlyFullTime,$nowDateOnlyTime,$nowDateOnlyYear,$nowDateOnlyMonth,$nowDateOnlyDay,$nowDateOnlyHour,$nowDateOnlyMin,$nowDateOnlySec)

//남은시간 체크 : DdayChk('2020-09-19 07:00:00');
const DdayChk = function (time) {
  const $timeArry = time.split(' ');
  let $openDay = onlyNumber($timeArry[0]);
  const $openTime = $timeArry[1].split(':');
  let $openHour = parseInt($openTime[0]);
  let $openMin = parseInt($openTime[1]);
  let $openSec = parseInt($openTime[2]);
  const $newDate = new Date();
  const $now = timeString($newDate);
  const $nowDay = parseInt($now.substr(0, 8));
  const $nowHour = parseInt($now.substr(8, 2));
  const $nowMin = parseInt($now.substr(10, 2));
  const $nowSec = parseInt($now.substr(12, 2));
  if ($nowSec > $openSec) {
    $openSec = $openSec + 60;
    $openMin--;
  }
  if ($nowMin > $openMin || $openMin < 0) {
    $openMin = $openMin + 60;
    $openHour--;
  }
  if ($nowHour > $openHour || $openHour < 0) {
    $openHour = $openHour + 24;
    $openDay--;
  }
  const $day = $openDay - $nowDay;
  if ($day < 0) return [0, 0, 0, 0];
  let $hour = $openHour - $nowHour;
  let $min = $openMin - $nowMin;
  let $sec = $openSec - $nowSec;
  if (('' + $hour).length == 1) $hour = '0' + $hour;
  if (('' + $min).length == 1) $min = '0' + $min;
  if (('' + $sec).length == 1) $sec = '0' + $sec;

  return [$day, $hour, $min, $sec];
};
const DdayChkHtml = function (element, completTime, callback) {
  const $repeat = setInterval(function () {
    let $timeHtml = '';
    const $Dday = DdayChk(completTime);
    if ($Dday[0] > 0) $timeHtml += '<span><strong>' + $Dday[0] + '</strong>일</span>';
    $timeHtml += '<span><strong>' + $Dday[1] + '</strong>시</span><span><strong>' + $Dday[2] + '</strong>분</span><span><strong>' + $Dday[3] + '</strong>초</span>';
    $(element).html($timeHtml);
    if ($Dday[0] == 0 && $Dday[1] == 0 && $Dday[2] == 0 && $Dday[3] == 0) {
      clearInterval($repeat);
      if (!!callback) callback();
    }
  }, 1000);
};

//byte 체크
const bytePrint = function (tar) {
  let $txt = $(tar).text();
  if ($(tar).is('input') || $(tar).is('select') || $(tar).is('textarea')) {
    $txt = $(tar).val();
  }
  return $txt.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1').length;
};

//스크롤바 여부확인
const isScrollbar = function (target, direction) {
  if (!!direction) direction = 'vertical';
  if (direction === 'vertical') {
    return $(target).get(0) ? $(target).get(0).scrollHeight > $(target).innerHeight() : false;
  }
  if (direction === 'horizon') {
    return $(target).get(0) ? $(target).get(0).scrollWidth > $(target).innerWidth() : false;
  }
};

//숫자만
const onlyNumber = function (num) {
  return num.toString().replace(/[^0-9]/g, '');
};

//콤마넣기
const addComma = function (num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

//콤마빼기
const removeComma = function (num) {
  return num.toString().replace(/,/gi, '');
};

//배열에서 문자열 찾기
const arrayIndexOf = function (array, str) {
  let $val = false;
  //for(let i in array){
  for (let i = 0; i < array.length; i++) {
    if (array[i].indexOf(str) >= 0) {
      $val = true;
    }
  }
  return $val;
};

//공백제거
const txtSpaceDel = function (txt) {
  return txt.replace(/(\s*)/g, '');
};

// \n to br
const nl2br = function (str) {
  // return str.replace(/\n/g, "<br />");
  return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
};
