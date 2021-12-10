var $headerHtml = ''
+'<div class="g_util">'
	+'<h1><a href="#"><img src="../static/images/logo.png" alt="교보증권 마이데이타" /></a></h1>'
	+'<div class="g_project">'
		+'<button type="button" class="current" title="코딩리스트 바로가기">선택</button>'
		+'<ul class="g_list">'
			+'<li><a href="front.html">Front</a></li>'
			+'<li><a href="admin.html">Admin</a></li>'
		+'</ul>'
	+'</div>'
	+'<button type="button" class="btn_nav"><span>메뉴</span></button>'
+'</div>';

var $naviHtmlPC = ''
+'<ul>'
	+'<li><a href="../pc/www.html">Status Board</a></li>'
	+'<li><a href="../pc/introduction.html">Introduction</a></li>'
	+'<li><a href="#">Basic Rules</a>'
		+'<ul>'
			+'<li><a href="../pc/font.html">Font</a></li>'
			+'<li><a href="../pc/color.html">Color</a></li>'
			+'<li><a href="../pc/html.html">HTML</a></li>'
			+'<li><a href="../pc/tag.html">Tag</a></li>'
			+'<li><a href="../pc/naming.html">Naming</a></li>'
		+'</ul>'
	+'</li>'
	+'<li><a href="../pc/layout.html">Layout</a></li>'
	+'<li><a href="../pc/directory.html">Directory</a></li>'
	+'<li><a href="#">Elements</a>'
		+'<ul>'
			+'<li><a href="../pc/text.html">Text</a></li>'
			+'<li><a href="../pc/button.html">Button</a></li>'
			+'<li><a href="../pc/form.html">Form</a></li>'
			+'<li><a href="../pc/table.html">Table</a></li>'
			+'<li><a href="../pc/tab.html">Tab</a></li>'
			+'<li><a href="../pc/list.html">List</a></li>'
			+'<li><a href="../pc/popup.html">Popup</a></li>'
			+'<li><a href="../pc/etc.html">Etc</a></li>'
		+'</ul>'
	+'</li>'
+'</ul>';

var $naviHtmlMO = ''
+'<ul>'
	+'<li><a href="../mobile/m.html">Status Board</a></li>'
	+'<li><a href="../mobile/introduction.html">Introduction</a></li>'
	+'<li><a href="#">Basic Rules</a>'
		+'<ul>'
			+'<li><a href="../mobile/font.html">Font</a></li>'
			+'<li><a href="../mobile/color.html">Color</a></li>'
			+'<li><a href="../mobile/html.html">HTML</a></li>'
			+'<li><a href="../mobile/tag.html">Tag</a></li>'
			+'<li><a href="../mobile/naming.html">Naming</a></li>'
		+'</ul>'
	+'</li>'
	+'<li><a href="../mobile/layout.html">Layout</a></li>'
	+'<li><a href="../mobile/directory.html">Directory</a></li>'
	+'<li><a href="#">Elements</a>'
		+'<ul>'
			+'<li><a href="../mobile/text.html">Text</a></li>'
			+'<li><a href="../mobile/button.html">Button</a></li>'
			+'<li><a href="../mobile/form.html">Form</a></li>'
			+'<li><a href="../mobile/table.html">Table</a></li>'
			+'<li><a href="../mobile/tab.html">Tab</a></li>'
			+'<li><a href="../mobile/list.html">List</a></li>'
			+'<li><a href="../mobile/popup.html">Popup</a></li>'
			+'<li><a href="../mobile/etc.html">Etc</a></li>'
		+'</ul>'
	+'</li>'
+'</ul>';

var $naviHtmlAdmin = ''
+'<ul>'
	+'<li><a href="../admin/admin.html">Status Board</a></li>'
+'</ul>';

$(function () {	
	// guide.init();
	makeBoard();
	$(window).resize();
});
var makeBoard = function(){
	var $slide = $('.g_board_tab .swiper-slide');
	var $lenth = $slide.length;
	var htmlBoard = function(boardid, index, data){
		var html = '<div id="'+boardid+'" class="g_board_panel">';
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

		if(index !== ($lenth-1)){
			setTimeout(function(){
				guide.init();
			}, 100);
		}
	}
	var htmlTbody = function(data){
		var $data = data;
		var tbodyHtml = '';
		var idx = 1;
		var createTr = function(obj){
			var trHtml = '';

			if(obj.depth1 !== undefined && obj.depth1 !== ''){
				trHtml += '<tr class="hr">';
				trHtml += '<th scope="col" colspan="12">'+obj.depth1+'</th>';
			}else{
				trHtml += '<tr>';
				trHtml += '<td class="no">'+idx+'</td>';
				idx += 1;
				if(obj.id === undefined || obj.id === ''){
					trHtml += '<td class="id"></td>';
				}else{
					if(obj.url === undefined || obj.url === ''){
						trHtml += '<td class="id">'+obj.id+'</td>';
					}else{
						trHtml += '<td class="id"><a href="'+obj.url+'" target="_blank">'+obj.id+'</a></td>';
					}
				}
				if(obj.type === undefined || obj.type === ''){
					trHtml += '<td></td>';
				}else{
					trHtml += '<td>'+obj.type+'</td>';
				}
				if(obj.depth2 === undefined || obj.depth2 === ''){
					trHtml += '<td></td>';
				}else{
					trHtml += '<td>'+obj.depth2+'</td>';
				}
				if(obj.depth3 === undefined || obj.depth3 === ''){
					trHtml += '<td></td>';
				}else{
					trHtml += '<td>'+obj.depth3+'</td>';
				}
				if(obj.depth4 === undefined || obj.depth4 === ''){
					trHtml += '<td></td>';
				}else{
					trHtml += '<td>'+obj.depth4+'</td>';
				}
				if(obj.depth5 === undefined || obj.depth5 === ''){
					trHtml += '<td></td>';
				}else{
					trHtml += '<td>'+obj.depth5+'</td>';
				}
				if(obj.name === undefined || obj.name === ''){
					trHtml += '<td class="name"></td>';
				}else{
					trHtml += '<td class="name">'+obj.name+'</td>';
				}
				if(obj.worker === undefined || obj.worker === ''){
					trHtml += '<td class="worker"></td>';
				}else{
					trHtml += '<td class="worker">'+obj.worker+'</td>';
				}
				if(obj.complete === undefined || obj.complete === ''){
					trHtml += '<td class="c_date"></td>';
				}else{
					trHtml += '<td class="c_date">'+obj.complete+'</td>';
				}
				if(obj.change === undefined || obj.change === ''){
					trHtml += '<td class="m_date"></td>';
				}else{
					trHtml += '<td class="m_date">'+obj.change+'</td>';
				}
				if(obj.etc === undefined || obj.etc === ''){
					trHtml += '<td class="etc"></td>';
				}else{
					trHtml += '<td class="etc">'+obj.etc+'</td>';
				}
			}

			trHtml += '</tr>';
			return trHtml;
		};
		$.each($data, function(){
			tbodyHtml += createTr(this);
		})
		return tbodyHtml;
	}
	$slide.each(function(i){
		var $this = $(this);
		var $idx = i;
		var $rel = $this.attr('rel');
		var $json = $this.data('json');
		var $dataHtml = '';

		if($json !== undefined){
			jQuery.ajax({
				type:"GET",
				url:$json,
				dataType:"JSON",
				success : function(data) {
					console.log('success', data, data.length);
					if(data.length) $dataHtml = htmlTbody(data)
				},
				complete : function(data) {
					console.log('complete', data);
					htmlBoard($rel, $idx, $dataHtml)
				},
				error : function(xhr, status, error) {
					console.error('에러발생',xhr, status, error);
				}
			});
		}
	});
};

var tabSwiper = '';
var guide = {
	header: function(){
		var $pathname = location.pathname,
			$urlName = $pathname.split('/').pop();
	
		if($('#gHeader').length)$('#gHeader').html($headerHtml);
		
		if($pathname.indexOf('front') > 0){
			if($('.g_nav').length) $('.g_nav').html($naviHtmlPC);
			if($('.g_project').length)$('.g_project .current').text('Front');
		}else if($pathname.indexOf('admin') > 0){
			if($('.g_nav').length) $('.g_nav').html($naviHtmlAdmin);
			if($('.g_project').length)$('.g_project .current').text('Admin');
		}else{
			if($('.g_nav').length) $('.g_nav').remove();
		}
		
		if($('.g_project').length){
			var $current = $('.g_project .current').text();
			$('.g_project li').each(function(){
				var $txt = $(this).text();
				if($current == $txt)$(this).addClass('active');
			})
		}
		
		$('.g_nav a').each(function(){
			var $this = $(this),
				$href = $this.attr('href').split('/').pop();
			if($urlName == $href)$(this).parents('li').addClass('active');
		});
		
		if($('.g_content>h2').length && $('.g_content>h2').text() != ''){
			var $title = document.title
			document.title = $('.g_content>h2').text()+' | '+$title;
		}
	},
	tab: function(){
		var $tab = $('.g_board_tab ul li'), $tabCurrent = $('.g_board_tab ul li.active'), $panel = $('.g_board_panel');
		$('#'+$tabCurrent.attr('rel')).addClass('active')
		$tab.on('click', function(e){
			e.preventDefault();
			var $this = $(this), panelid = $this.attr('rel'), $scrollTop = $(window).scrollTop();
			$this.addClass('active').siblings('li').removeClass('active');
			$('#'+panelid).addClass('active').siblings('.g_board_panel').removeClass('active');

			location.hash = panelid;
			$(window).scrollTop($scrollTop);
		});
		//$(window).on('load',function(){
			var $hash = location.hash;
			if(!!$hash){
				$tab.each(function(){
					var $rel = $(this).attr('rel');
					if($rel == $hash.substring(1)){
						$(this).addClass('active').siblings().removeClass('active');
						$('#'+$rel).addClass('active').siblings('.g_board_panel').removeClass('active');
					}
				});
			}else{
				$tab.eq(0).addClass('active');
				$panel.eq(0).addClass('active');
			}
		//});
	},
	board: function(){
		//id랑 주소가 같으면 알아서 붙게
		$('.g_board td.id').each(function(){
			var _a = $(this).find('a'),
				_href = _a.attr('href'),
				_txt = _a.text();
			
			if(!!_href && _href != '#'){
				if(_href.indexOf('.jsp') == -1 && _href.indexOf('.html') == -1){
					_a.attr('href',_href+_txt+'.jsp');
				}
			}else{
				//console.log(_txt);
			}
		});

		//작업일자 셀렉트
		$('.g_board').each(function(){
			var _this = $(this);
			var dayArry = [];
			var dayArry2 = [];
			$(this).find('tbody td.c_date').each(function(){
				var _txt = $(this).text();
				if(!!_txt){
					var _txt2 = parseInt(_txt.split('-').join(''));
					var _class = 'c_'+_txt2;
					$(this).closest('tr').addClass(_class);
					if(dayArry.indexOf(_txt2) == -1){
						dayArry.push(_txt2);
					}
				}
			});
			dayArry.sort(function(a,b){
				return a - b;
			})

			$(this).find('tbody td.m_date').each(function(){
				var _txt3 = $(this).text();
				if(!!_txt3){
					var _txt4 = parseInt(_txt3.split('-').join(''));
					var _class2 = 'm_'+_txt4;
					$(this).closest('tr').addClass(_class2);
					if(dayArry2.indexOf(_txt4) == -1){
						dayArry2.push(_txt4);
					}
				}
			});		
			dayArry2.sort(function(a,b){
				return a - b;
			})

			var $select = $(this).find('thead th.c_date select');
			if($select.length){
				for(var i in dayArry){
					var opt = dayArry[i];
					//var optTxt = opt.substr(0, 4) + '-' + opt.substr(4, 2) + '-' + opt.substr(6, 2);
					$select.append('<option val="'+opt+'">'+opt+'</option>')
				}
			}
			var $select2 = $(this).find('thead th.m_date select');
			if($select2.length){
				for(var j in dayArry2){
					var opt2 = dayArry2[j];				
					//var optTxt = opt.substr(0, 4) + '-' + opt.substr(4, 2) + '-' + opt.substr(6, 2);
					$select2.append('<option val="'+opt2+'">'+opt2+'</option>')
				}
			}
			
			var _isMouseDown = false,
				_startX = '',
				_scrollLeft = '',
				_scrollChkHtml = '<div class="g_board_scroll"><div></div></div>';
			if(!_this.next('.g_board_scroll').length)_this.after(_scrollChkHtml);
			_this.on('mousedown',function(e){
				var _scrollWidth = _this.get(0).scrollWidth,
					_thisWidth = _this.width();
				if((_scrollWidth-_thisWidth) > 0){
					_isMouseDown = true;
					_this.addClass('catching');
					_startX = e.pageX - _this.offset().left;
					_scrollLeft = _this.scrollLeft();
				}
			});
			_this.on('mouseup',function(e){
				_isMouseDown = false;
				_this.removeClass('catching');
			});
			_this.on('mouseeleave',function(e){
				_isMouseDown = false;
				_this.removeClass('catching');
			});
			_this.on('mousemove',function(e){
				if(!_isMouseDown) return;
				e.preventDefault();
				var _x = e.pageX - _this.offset().left;
				var _walk = (_x - _startX);
				var _scroll = _scrollLeft - _walk; 
				_this.scrollLeft(_scroll);
			});
			
			var catchChk = function(){
				var _sclWid = _this.get(0).scrollWidth - _this.width(),
					_thisLeft = _this.scrollLeft();
				if(_sclWid > 0){
					_this.addClass('catch');
				}else{
					_this.removeClass('catch');
				}
				
				return (_thisLeft/_sclWid)*100;
			}
			catchChk();
			_this.on('scroll resize',function(e){
				var _tar = _this.next('.g_board_scroll').find('>div');
				var _per = catchChk();
				_tar.css('width',_per+'%');
			});
		});
		$('.g_board thead th select').change(function(){
			var $thead = $(this).closest('thead'),
				$cVal = $thead.find('.c_date select').val(),
				$mVal = $thead.find('.m_date select').val(),
				$tbody = $(this).closest('.g_board').find('tbody');
			if($cVal == '' && $mVal==''){
				$tbody.find('tr').removeAttr('style');
			}else if($cVal != '' && $mVal !=''){
				$tbody.find('tr').not('.hr').hide();
				$tbody.find('.c_'+ $cVal+'.m_'+ $mVal).show();
			}else{
				$tbody.find('tr').not('.hr').hide();
				if($cVal != '')$tbody.find('.c_'+ $cVal).show();
				if($mVal != '')$tbody.find('.m_'+ $mVal).show();
			}
		});
	},
	state: function(){
		$('.g_content tbody .c_date').each(function(){
			console.log($.trim($(this).html()),$.trim($(this).html()) == '')
			if(!$.trim($(this).html())==''){
				$(this).parent('tr').addClass('complete');
			}
		})
		$('.g_content tbody .m_date').each(function(){
			if(!$.trim($(this).html())==''){
				$(this).parent('tr').addClass('modify');
			}
		});
		$('.g_board_panel').each(function(){
			var $this = $(this),
				$no = $this.find('table .no'),
				pageNum = $no.length;
			
			var $noidx = 1;
			$this.find('tbody tr').each(function(){
				if($(this).hasClass('cms')){
					$(this).find('.no').text('CMS');
				}else if($(this).find('.no').length){
					$(this).find('.no').text($noidx);
					$noidx++;
				}
			});
			var completeNum = $this.find('.complete').length,
				per = pageNum === 0 ? 0 : Math.round((100/pageNum)*completeNum);
			if(per === 100)Math.floor((100/pageNum)*completeNum);
			$this.find('.total .num').text(pageNum);
			$this.find('.cp_num .num').text(completeNum);
			$this.find('.ing .num').text(per);
			$this.find('.bar').css('width', per+'%');
		});
	
		var totalPageNum = $('table .no').length,
			completeTotalNum = $('table .complete').length,
			perTotal = totalPageNum === 0 ? 0 : Math.round((100/totalPageNum)*completeTotalNum);
		if(perTotal === 100)Math.floor((100/totalPageNum)*completeTotalNum);
		$('.g_project_status .total .num').text(totalPageNum);
		$('.g_project_status .cp_num .num').text(completeTotalNum);
		$('.g_project_status .ing .num').text(perTotal);
		$('.g_project_status .bar').css('width', perTotal+'%');
	},
	UI: function(){
		var $thBtn = $('th button'), 
			$projectSelect = $('.g_project .current'), 
			$document = $(document),
			$currentName = $('nav a[href^="' + location.pathname.split("/")[5] + '"]');
			$currentTile = $currentName.text(),
			$codeView = $('.g_guide_info .code_view'),
			$codeViewTarget = $('.g_guide_info .code_view h4 a');
		$currentName.closest('li').addClass('active').parents('li').addClass('active');// 현재 메뉴 활성화
		//$('.g_content>h2').text($currentTile);// 현재 타이틀
		$projectSelect.on('click', function(e) {
			e.preventDefault();
			$(this).toggleClass('active').next('.g_list').toggle();
		});
		$document.on('click', function(e) {
			var a = e.target;
			if($(a).closest('.g_project').length === 0) {
				$('.g_project .current').removeClass('active').next('.g_list').hide();
			}
		});
		if($('.code').length > 0){
			SyntaxHighlighter.all();
		}
		$codeViewTarget.on('click', function() {
			var $this = $(this).closest('.code_view');
			if (!$this.hasClass('active')){
				$codeView.removeClass('active');
				$this.addClass('active');
			} else {
				$this.removeClass('active');
			}
		});
		$thBtn.on('click', function() {
			var $this = $(this), 
				//$target = $this.attr('rel'),
				$idx = $this.closest('th').index(),
				$grid = $this.closest('.g_board');
			$this.closest('th').hide();
			//$grid.find('.'+$target).hide();
			$grid.find('tr').not('.hr').each(function(){
				$(this).find('td').eq($idx).hide();
			});
			$grid.resize();
			var thNum = $grid.find('thead th:not([style*="display: none"])').length;
			$grid.find('.hr th').attr('colspan', thNum);
		});
	},
	navi: function(){
		var $navMenu = '.g_nav>ul>li>a';
		$(document).on('click', '.btn_nav', function(){
			$('body').toggleClass('no_scroll');
		});
		
		$(document).on('click', $navMenu, function(e){
			var $this = $(this),
				$href = $this.attr('href');
			if($href == '#')e.preventDefault();
			if(windowWidth < 1024){
				$this.closest('li').toggleClass('active');
				$this.closest('li').siblings('li').removeClass('active');
			}
		});
	},
	slide: function(){
		var $tab = $('.g_board_tab');
		if($tab.length > 0){
			tabSwiper = new Swiper('.g_board_tab', {
				slidesPerView: 'auto',
				freeMode: true
			});
			$('.g_board_tab .swiper-slide').on('click', function(e){
				var $this = $(this),
					gnbWidth = $tab.width(),
					offset = $this.width()+$this.offset().left,
					$slideItems = $this,
					myIndex = $this.index();
				if(gnbWidth < offset){
					tabSwiper.slideNext();
				} else {
					tabSwiper.slideTo(myIndex-1);
				}
			});
			
			$(window).on('load',function(){
				tabSwiper.update();
			});
		}
	},
	resize: function(){
		$(window).on('resize', function () {
			var $hr = $('tr.hr th'), 
				windowWidth = $(window).width();		
			if(windowWidth < 1024){
				$hr.attr('colspan','2');
			}else{
				$hr.attr('colspan','12');
			}
			
			//if($('.g_board').length)$('.g_board').scroll();
		});
	},
	init: function(){
		guide.header();
		guide.tab();
		guide.board();
		guide.state();
		guide.UI();
		guide.navi();
		guide.slide();
		guide.resize();
	}
}
