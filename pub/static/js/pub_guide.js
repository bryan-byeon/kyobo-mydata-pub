const $headerHtml =
  '' +
  '<div class="g_util">' +
  '<h1><a href="#"><img src="../static/images/logo.png" alt="교보증권 마이데이타" /></a></h1>' +
  '<div class="g_project">' +
  '<button type="button" class="current" title="코딩리스트 바로가기">선택</button>' +
  '<ul class="g_list">' +
  '<li><a href="front.html">Front</a></li>' +
  '<li><a href="admin.html">Admin</a></li>' +
  '</ul>' +
  '</div>' +
  '<button type="button" class="btn_nav"><span>메뉴</span></button>' +
  '</div>';

const $naviHtmlPC =
  '' +
  '<ul>' +
  '<li><a href="../pc/www.html">Status Board</a></li>' +
  '<li><a href="../pc/introduction.html">Introduction</a></li>' +
  '<li><a href="#">Basic Rules</a>' +
  '<ul>' +
  '<li><a href="../pc/font.html">Font</a></li>' +
  '<li><a href="../pc/color.html">Color</a></li>' +
  '<li><a href="../pc/html.html">HTML</a></li>' +
  '<li><a href="../pc/tag.html">Tag</a></li>' +
  '<li><a href="../pc/naming.html">Naming</a></li>' +
  '</ul>' +
  '</li>' +
  '<li><a href="../pc/layout.html">Layout</a></li>' +
  '<li><a href="../pc/directory.html">Directory</a></li>' +
  '<li><a href="#">Elements</a>' +
  '<ul>' +
  '<li><a href="../pc/text.html">Text</a></li>' +
  '<li><a href="../pc/button.html">Button</a></li>' +
  '<li><a href="../pc/form.html">Form</a></li>' +
  '<li><a href="../pc/table.html">Table</a></li>' +
  '<li><a href="../pc/tab.html">Tab</a></li>' +
  '<li><a href="../pc/list.html">List</a></li>' +
  '<li><a href="../pc/popup.html">Popup</a></li>' +
  '<li><a href="../pc/etc.html">Etc</a></li>' +
  '</ul>' +
  '</li>' +
  '</ul>';

const $naviHtmlMO =
  '' +
  '<ul>' +
  '<li><a href="../mobile/m.html">Status Board</a></li>' +
  '<li><a href="../mobile/introduction.html">Introduction</a></li>' +
  '<li><a href="#">Basic Rules</a>' +
  '<ul>' +
  '<li><a href="../mobile/font.html">Font</a></li>' +
  '<li><a href="../mobile/color.html">Color</a></li>' +
  '<li><a href="../mobile/html.html">HTML</a></li>' +
  '<li><a href="../mobile/tag.html">Tag</a></li>' +
  '<li><a href="../mobile/naming.html">Naming</a></li>' +
  '</ul>' +
  '</li>' +
  '<li><a href="../mobile/layout.html">Layout</a></li>' +
  '<li><a href="../mobile/directory.html">Directory</a></li>' +
  '<li><a href="#">Elements</a>' +
  '<ul>' +
  '<li><a href="../mobile/text.html">Text</a></li>' +
  '<li><a href="../mobile/button.html">Button</a></li>' +
  '<li><a href="../mobile/form.html">Form</a></li>' +
  '<li><a href="../mobile/table.html">Table</a></li>' +
  '<li><a href="../mobile/tab.html">Tab</a></li>' +
  '<li><a href="../mobile/list.html">List</a></li>' +
  '<li><a href="../mobile/popup.html">Popup</a></li>' +
  '<li><a href="../mobile/etc.html">Etc</a></li>' +
  '</ul>' +
  '</li>' +
  '</ul>';

const $naviHtmlAdmin = '' + '<ul>' + '<li><a href="../admin/admin.html">Status Board</a></li>' + '</ul>';

$(function () {
  //다크모드 체크
  try {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: Dark)').matches;
    if (prefersDark) $('html').addClass('dark');
  } catch (e) {}

  guide.header();
  // guide.init();
  makeBoard();
  $(window).resize();
});
const $devHost = 'dev-mydata.mykkl.com';
const $protocol = location.protocol;
const makeBoard = function () {
  let $host;
  if (location.host === $devHost) $host = location.host;
  const $slide = $('.g_board_tab .swiper-slide');
  const $lenth = $slide.length;
  const htmlBoard = function (boardid, data) {
    let html = '<div id="' + boardid + '" class="g_board_panel">';
    html += '<div class="g_status">';
    html += '<span class="total">본수 : <strong class="num"></strong></span>';
    html += '<span class="cp_num">완료본수 : <strong class="num"></strong></span>';
    html += '<span class="ing">진행률 : <strong class="num"></strong>%</span>';
    html += '<div class="g_status_box"> <span class="bar"></span> </div>';
    html += '</div>';
    html += '<div class="g_board">';
    html += '<table>';
    html += '<caption>메뉴별 코딩리스트</caption>';
    html += '<colgroup>';
    html += '<col style="width:50px">';
    html += '<col style="width:120px">';
    html += '<col style="width:90px">';
    html += '<col class="d1" style="width:auto">';
    html += '<col class="d2" style="width:auto">';
    html += '<col class="d3" style="width:auto">';
    html += '<col class="d4" style="width:auto">';
    html += '<col style="width:300px">';
    html += '<col style="width:90px">';
    html += '<col style="width:100px">';
    html += '<col style="width:100px">';
    html += '<col style="width:auto">';
    html += '</colgroup>';
    html += '<thead>';
    html += '<tr>';
    html += '<th scope="col">No</th>';
    html += '<th scope="col" class="id">화면id</th>';
    html += '<th scope="col" class="type">화면타입</th>';
    html += '<th scope="col" class="deps d1">2Depth<button type="button" rel="d1">숨기기</button></th>';
    html += '<th scope="col" class="deps d2">3Depth<button type="button" rel="d2">숨기기</button></th>';
    html += '<th scope="col" class="deps d3">4Depth<button type="button" rel="d3">숨기기</button></th>';
    html += '<th scope="col" class="deps d4">5Depth<button type="button" rel="d4">숨기기</button></th>';
    html += '<th scope="col" class="name">화면명</th>';
    html += '<th scope="col" class="worker">작업자</th>';
    html += '<th scope="col" class="c_date">';
    html += '<select>';
    html += '<option value="">작업일</option>';
    html += '</select>';
    html += '</th>';
    html += '<th scope="col" class="m_date">';
    html += '<select>';
    html += '<option value="">수정일</option>';
    html += '</select>';
    html += '</th>';
    html += '<th scope="col" class="etc">비고</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    html += data;
    html += '</tbody>';
    html += '</table>';
    html += '</div>';
    html += '</div>';
    $('.g_content').append(html);
  };
  const htmlTbody = function (data) {
    const $data = data;
    let tbodyHtml = '';
    let idx = 1;
    const createTr = function (obj) {
      let trHtml = '';

      if (obj.depth1 !== undefined && obj.depth1 !== '') {
        trHtml += '<tr class="hr">';
        trHtml += '<th scope="col" colspan="12">' + obj.depth1 + '</th>';
      } else {
        trHtml += '<tr>';
        trHtml += '<td class="no">' + idx + '</td>';
        idx += 1;
        if (obj.id === undefined || obj.id === '') {
          trHtml += '<td class="id"></td>';
        } else {
          let $url = obj.url;
          if ($host) {
            $url = $url.replace('../..', $protocol + '//' + $devHost);
            if ($url.indexOf('/front/') >= 0) $url = $url.replace('/front/', '/mydata/resources/');
            if ($url.indexOf('/admin/') >= 0) $url = $url.replace('/admin/', '/admin/resources/');
          }
          if ($url === undefined || $url === '') {
            trHtml += '<td class="id">' + obj.id + '</td>';
          } else {
            trHtml += '<td class="id"><a href="' + $url + '" target="_blank">' + obj.id + '</a></td>';
          }
        }
        if (obj.type === undefined || obj.type === '') {
          trHtml += '<td></td>';
        } else {
          trHtml += '<td>' + obj.type + '</td>';
        }
        if (obj.depth2 === undefined || obj.depth2 === '') {
          trHtml += '<td></td>';
        } else {
          trHtml += '<td>' + obj.depth2 + '</td>';
        }
        if (obj.depth3 === undefined || obj.depth3 === '') {
          trHtml += '<td></td>';
        } else {
          trHtml += '<td>' + obj.depth3 + '</td>';
        }
        if (obj.depth4 === undefined || obj.depth4 === '') {
          trHtml += '<td></td>';
        } else {
          trHtml += '<td>' + obj.depth4 + '</td>';
        }
        if (obj.depth5 === undefined || obj.depth5 === '') {
          trHtml += '<td></td>';
        } else {
          trHtml += '<td>' + obj.depth5 + '</td>';
        }
        if (obj.name === undefined || obj.name === '') {
          trHtml += '<td class="name"></td>';
        } else {
          trHtml += '<td class="name">' + obj.name + '</td>';
        }
        if (obj.worker === undefined || obj.worker === '') {
          trHtml += '<td class="worker"></td>';
        } else {
          trHtml += '<td class="worker">' + obj.worker + '</td>';
        }
        if (obj.complete === undefined || obj.complete === '') {
          trHtml += '<td class="c_date"></td>';
        } else {
          trHtml += '<td class="c_date">' + obj.complete + '</td>';
        }
        if (obj.change === undefined || obj.change === '') {
          trHtml += '<td class="m_date"></td>';
        } else {
          trHtml += '<td class="m_date">' + obj.change + '</td>';
        }
        if (obj.etc === undefined || obj.etc === '') {
          trHtml += '<td class="etc"></td>';
        } else {
          trHtml += '<td class="etc">' + obj.etc + '</td>';
        }
      }

      trHtml += '</tr>';
      return trHtml;
    };
    $.each($data, function () {
      tbodyHtml += createTr(this);
    });
    return tbodyHtml;
  };
  let LoadCount = 0;
  $slide.each(function (i) {
    const $this = $(this);
    const $rel = 'panel' + i;
    $this.attr('rel', $rel);
    const $json = $this.data('json');
    let $dataHtml = '';

    if ($json !== undefined) {
      jQuery.ajax({
        type: 'GET',
        url: $json,
        dataType: 'JSON',
        success: function (data) {
          // console.log($rel, 'success', data, data.length);
          if (data.length) $dataHtml = htmlTbody(data);
        },
        complete: function (data) {
          LoadCount += 1;
          // console.log($rel, 'complete', data);
          htmlBoard($rel, $dataHtml);

          if (LoadCount === $lenth) {
            setTimeout(function () {
              guide.init();
              setTimeout(function () {
                $(window).resize();
              }, 100);
            }, 100);
          }
        },
        error: function (xhr, status, error) {
          console.error($rel, '에러발생', xhr, status, error);
        }
      });
    }
  });
};

let tabSwiper = '';
const guide = {
  header: function () {
    const $pathname = location.pathname;
    const $urlName = $pathname.split('/').pop();

    if ($('#gHeader').length) $('#gHeader').html($headerHtml);

    if ($pathname.indexOf('front') > 0) {
      if ($('.g_nav').length) $('.g_nav').html($naviHtmlPC);
      if ($('.g_project').length) $('.g_project .current').text('Front');
    } else if ($pathname.indexOf('admin') > 0) {
      if ($('.g_nav').length) $('.g_nav').html($naviHtmlAdmin);
      if ($('.g_project').length) $('.g_project .current').text('Admin');
    } else {
      if ($('.g_nav').length) $('.g_nav').remove();
    }

    if ($('.g_project').length) {
      const $current = $('.g_project .current').text();
      $('.g_project li').each(function () {
        const $txt = $(this).text();
        if ($current == $txt) $(this).addClass('active');
      });
    }

    $('.g_nav a').each(function () {
      const $this = $(this);
      const $href = $this.attr('href').split('/').pop();
      if ($urlName == $href) $(this).parents('li').addClass('active');
    });

    if ($('.g_content>h2').length && $('.g_content>h2').text() != '') {
      const $title = document.title;
      document.title = $('.g_content>h2').text() + ' | ' + $title;
    }
  },
  tab: function () {
    const $tab = $('.g_board_tab ul li');
    const $tabCurrent = $('.g_board_tab ul li.active');
    const $panel = $('.g_board_panel');
    $('#' + $tabCurrent.attr('rel')).addClass('active');
    $tab.on('click', function (e) {
      e.preventDefault();
      const $this = $(this);
      const panelid = $this.attr('rel');
      const $scrollTop = $(window).scrollTop();
      $this.addClass('active').siblings('li').removeClass('active');
      $('#' + panelid)
        .addClass('active')
        .siblings('.g_board_panel')
        .removeClass('active');

      location.hash = panelid;
      $(window).scrollTop($scrollTop);
    });
    //$(window).on('load',function(){
    const $hash = location.hash;
    if (!!$hash) {
      $tab.each(function () {
        const $rel = $(this).attr('rel');
        if ($rel == $hash.substring(1)) {
          $(this).addClass('active').siblings().removeClass('active');
          $('#' + $rel)
            .addClass('active')
            .siblings('.g_board_panel')
            .removeClass('active');
        }
      });
    } else {
      $tab.eq(0).addClass('active');
      $('#' + $tab.eq(0).attr('rel')).addClass('active');
    }
    //});
  },
  board: function () {
    //id랑 주소가 같으면 알아서 붙게
    $('.g_board td.id').each(function () {
      const _a = $(this).find('a');
      const _href = _a.attr('href');
      const _txt = _a.text();

      if (!!_href && _href.indexOf('#') !== 0) {
        if (_href.indexOf(_txt) == -1 && _href.indexOf('.html') == -1) {
          let _setHref = _href + _txt;
          const _file = location.pathname.split('.').pop();
          if (_file) _setHref = _setHref + '.' + _file;
          _a.attr('href', _setHref);
        }
      } else {
        //console.log(_txt);
      }
    });

    //작업일자 셀렉트
    $('.g_board').each(function () {
      const _this = $(this);
      const dayArry = [];
      const dayArry2 = [];
      $(this)
        .find('tbody td.c_date')
        .each(function () {
          const _txt = $(this).text();
          if (!!_txt) {
            const _txt2 = parseInt(_txt.split('-').join(''));
            const _class = 'c_' + _txt2;
            $(this).closest('tr').addClass(_class);
            if (dayArry.indexOf(_txt2) == -1) {
              dayArry.push(_txt2);
            }
          }
        });
      dayArry.sort(function (a, b) {
        return a - b;
      });

      $(this)
        .find('tbody td.m_date')
        .each(function () {
          const _txt3 = $(this).text();
          if (!!_txt3) {
            const _txt4 = parseInt(_txt3.split('-').join(''));
            const _class2 = 'm_' + _txt4;
            $(this).closest('tr').addClass(_class2);
            if (dayArry2.indexOf(_txt4) == -1) {
              dayArry2.push(_txt4);
            }
          }
        });
      dayArry2.sort(function (a, b) {
        return a - b;
      });

      const $select = $(this).find('thead th.c_date select');
      if ($select.length) {
        for (let i in dayArry) {
          const opt = dayArry[i];
          //const optTxt = opt.substr(0, 4) + '-' + opt.substr(4, 2) + '-' + opt.substr(6, 2);
          $select.append('<option val="' + opt + '">' + opt + '</option>');
        }
      }
      const $select2 = $(this).find('thead th.m_date select');
      if ($select2.length) {
        for (let j in dayArry2) {
          const opt2 = dayArry2[j];
          //const optTxt = opt.substr(0, 4) + '-' + opt.substr(4, 2) + '-' + opt.substr(6, 2);
          $select2.append('<option val="' + opt2 + '">' + opt2 + '</option>');
        }
      }

      let _isMouseDown = false;
      let _startX = '';
      let _scrollLeft = '';
      const _scrollChkHtml = '<div class="g_board_scroll"><div></div></div>';
      if (!_this.next('.g_board_scroll').length) _this.after(_scrollChkHtml);
      _this.on('mousedown', function (e) {
        const _scrollWidth = _this.get(0).scrollWidthl;
        const _thisWidth = _this.width();
        if (_scrollWidth - _thisWidth > 0) {
          _isMouseDown = true;
          _this.addClass('catching');
          _startX = e.pageX - _this.offset().left;
          _scrollLeft = _this.scrollLeft();
        }
      });
      _this.on('mouseup', function (e) {
        _isMouseDown = false;
        _this.removeClass('catching');
      });
      _this.on('mouseeleave', function (e) {
        _isMouseDown = false;
        _this.removeClass('catching');
      });
      _this.on('mousemove', function (e) {
        if (!_isMouseDown) return;
        e.preventDefault();
        const _x = e.pageX - _this.offset().left;
        const _walk = _x - _startX;
        const _scroll = _scrollLeft - _walk;
        _this.scrollLeft(_scroll);
      });

      const catchChk = function () {
        const _sclWid = _this.get(0).scrollWidth - _this.width();
        const _thisLeft = _this.scrollLeft();
        if (_sclWid > 0) {
          _this.addClass('catch');
        } else {
          _this.removeClass('catch');
        }

        return (_thisLeft / _sclWid) * 100;
      };
      catchChk();
      _this.on('scroll resize', function (e) {
        const _tar = _this.next('.g_board_scroll').find('>div');
        const _per = catchChk();
        _tar.css('width', _per + '%');
      });
    });
    $('.g_board thead th select').change(function () {
      const $thead = $(this).closest('thead');
      const $cVal = $thead.find('.c_date select').val();
      const $mVal = $thead.find('.m_date select').val();
      const $tbody = $(this).closest('.g_board').find('tbody');
      if ($cVal == '' && $mVal == '') {
        $tbody.find('tr').removeAttr('style');
      } else if ($cVal != '' && $mVal != '') {
        $tbody.find('tr').not('.hr').hide();
        $tbody.find('.c_' + $cVal + '.m_' + $mVal).show();
      } else {
        $tbody.find('tr').not('.hr').hide();
        if ($cVal != '') $tbody.find('.c_' + $cVal).show();
        if ($mVal != '') $tbody.find('.m_' + $mVal).show();
      }
    });
  },
  state: function () {
    $('.g_content tbody .c_date').each(function () {
      if (!$.trim($(this).html()) == '') {
        $(this).parent('tr').addClass('complete');
      }
    });
    $('.g_content tbody .m_date').each(function () {
      if (!$.trim($(this).html()) == '') {
        $(this).parent('tr').addClass('modify');
      }
    });
    $('.g_board_panel').each(function () {
      const $this = $(this);
      const $no = $this.find('table .no');
      const pageNum = $no.length;

      let $noidx = 1;
      $this.find('tbody tr').each(function () {
        if ($(this).hasClass('cms')) {
          $(this).find('.no').text('CMS');
        } else if ($(this).find('.no').length) {
          $(this).find('.no').text($noidx);
          $noidx++;
        }
      });
      const completeNum = $this.find('.complete').length;
      const per = pageNum === 0 ? 0 : Math.round((100 / pageNum) * completeNum);
      if (per === 100) Math.floor((100 / pageNum) * completeNum);
      $this.find('.total .num').text(pageNum);
      $this.find('.cp_num .num').text(completeNum);
      $this.find('.ing .num').text(per);
      $this.find('.bar').css('width', per + '%');
    });

    const totalPageNum = $('table .no').length;
    const completeTotalNum = $('table .complete').length;
    const perTotal = totalPageNum === 0 ? 0 : Math.round((100 / totalPageNum) * completeTotalNum);
    if (perTotal === 100) Math.floor((100 / totalPageNum) * completeTotalNum);
    $('.g_project_status .total .num').text(totalPageNum);
    $('.g_project_status .cp_num .num').text(completeTotalNum);
    $('.g_project_status .ing .num').text(perTotal);
    $('.g_project_status .bar').css('width', perTotal + '%');
  },
  UI: function () {
    const $thBtn = $('th button');
    const $projectSelect = $('.g_project .current');
    const $document = $(document);
    const $currentName = $('nav a[href^="' + location.pathname.split('/')[5] + '"]');
    const $currentTile = $currentName.text();
    const $codeView = $('.g_guide_info .code_view');
    const $codeViewTarget = $('.g_guide_info .code_view h4 a');
    $currentName.closest('li').addClass('active').parents('li').addClass('active'); // 현재 메뉴 활성화
    //$('.g_content>h2').text($currentTile);// 현재 타이틀
    $projectSelect.on('click', function (e) {
      e.preventDefault();
      $(this).toggleClass('active').next('.g_list').toggle();
    });
    $document.on('click', function (e) {
      const _a = e.target;
      if ($(_a).closest('.g_project').length === 0) {
        $('.g_project .current').removeClass('active').next('.g_list').hide();
      }
    });
    if ($('.code').length > 0) {
      SyntaxHighlighter.all();
    }
    $codeViewTarget.on('click', function () {
      const $this = $(this).closest('.code_view');
      if (!$this.hasClass('active')) {
        $codeView.removeClass('active');
        $this.addClass('active');
      } else {
        $this.removeClass('active');
      }
    });
    $thBtn.on('click', function () {
      const $this = $(this);
      //const $target = $this.attr('rel');
      const $idx = $this.closest('th').index();
      const $grid = $this.closest('.g_board');
      $this.closest('th').hide();
      //$grid.find('.'+$target).hide();
      $grid
        .find('tr')
        .not('.hr')
        .each(function () {
          $(this).find('td').eq($idx).hide();
        });
      $grid.resize();
      const thNum = $grid.find('thead th:not([style*="display: none"])').length;
      $grid.find('.hr th').attr('colspan', thNum);
    });
  },
  navi: function () {
    const $navMenu = '.g_nav>ul>li>a';
    $(document).on('click', '.btn_nav', function () {
      $('body').toggleClass('no_scroll');
    });

    $(document).on('click', $navMenu, function (e) {
      const $this = $(this);
      const $href = $this.attr('href');
      if ($href == '#') e.preventDefault();
      if (windowWidth < 1024) {
        $this.closest('li').toggleClass('active');
        $this.closest('li').siblings('li').removeClass('active');
      }
    });
  },
  slide: function () {
    const $tab = $('.g_board_tab');
    if ($tab.length > 0) {
      tabSwiper = new Swiper('.g_board_tab', {
        slidesPerView: 'auto',
        freeMode: true
      });
      $('.g_board_tab .swiper-slide').on('click', function (e) {
        const $this = $(this);
        const gnbWidth = $tab.width();
        const offset = $this.width() + $this.offset().left;
        const $slideItems = $this;
        const myIndex = $this.index();
        if (gnbWidth < offset) {
          tabSwiper.slideNext();
        } else {
          tabSwiper.slideTo(myIndex - 1);
        }
      });

      $(window).on('load', function () {
        tabSwiper.update();
      });
    }
  },
  preview: function () {
    const resizePreview = function (isInit) {
      if (isInit === undefined) isInit = false;
      const $el = $('.code__preview');
      const $elW = $el.outerWidth();
      const $elH = $el.outerHeight();
      const $winW = $(window).width();
      const $winH = $(window).height();
      $('.code__preview').css({
        left: Math.max(0, ($winW - $elW) / 2),
        top: Math.max(0, ($winH - $elH) / 2)
      });
      if (isInit) {
        setTimeout(function () {
          $('.code__preview').draggable({
            handle: 'h2'
          });
        }, 10);
      }
    };
    const showPreview = function () {
      const $table = $('.g_board_panel table');
      const $link = $table.find('tbody a');
      $link.attr('target', 'preview');

      const $activePanel = $('.g_board_panel.active');
      const $activeFirstLink = $activePanel.find('tbody a').first();

      if ($activeFirstLink.length) {
        $activeFirstLink.closest('tr').addClass('selected');
      }
      const $url = $activeFirstLink.attr('href');

      if ($('.code__preview').length) {
        $('.code__preview iframe').attr('src', $url);
      } else {
        let $html = '<div class="code__preview">';
        $html += '<a href="' + $url + '" target="_blank" class="code__preview_link">새창으로</a>';
        $html += '<h2>미리보기</h2>';
        $html += '<a href="#" class="code__preview_close">닫기</a>';
        $html += '<div class="code__preview_tab">';
        $html += '<a href="#" data-width="320">320 x 568</a>';
        $html += '<a href="#" data-width="360">360 x 640</a>';
        $html += '<a href="#" data-width="375" class="on">375 x 812</a>';
        $html += '<a href="#" data-width="768">768 x 1024</a>';
        $html += '</div>';
        $html += '<div>';
        $html += '<iframe class="w375" name="preview" src="' + $url + '" frameborder="0"></iframe>';
        $html += '</div>';
        $html += '</div>';
        $('body').append($html);

        resizePreview(true);
      }
    };
    const hidePreview = function () {
      $('table tr.selected').removeClass('selected');
      $('.g_board_panel table tbody a').attr('target', '_blank');
      $('.code__preview').remove();
    };

    $('.switch input').change(function () {
      const $this = $(this);
      if ($this.prop('checked')) {
        showPreview();
      } else {
        hidePreview();
      }
    });

    $(document).on('click', '.code__preview_close', function (e) {
      e.preventDefault();
      $('.switch input').prop('checked', false).change();
    });

    $(document).on('click', '.code__preview_tab a', function (e) {
      e.preventDefault();
      $(this).addClass('on').siblings().removeClass('on');
      const $width = $(this).data('width');
      const $iframe = $('.code__preview iframe');
      $iframe.removeAttr('class').addClass('w' + $width);
      // resizePreview();
    });

    if ($('.switch input').prop('checked')) {
      showPreview();
    }
  },
  resize: function () {
    $(window).on('resize', function () {
      const $hr = $('tr.hr th');
      const windowWidth = $(window).width();
      if (windowWidth < 1024) {
        $hr.attr('colspan', '2');
      } else {
        $hr.attr('colspan', '12');
      }

      //if($('.g_board').length)$('.g_board').scroll();
    });
  },
  init: function () {
    // guide.header();
    guide.board();
    guide.state();
    guide.UI();
    guide.navi();
    guide.slide();
    guide.tab();
    guide.preview();
    guide.resize();
  }
};
