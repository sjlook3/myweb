$(window).ready(function(){
	// navmenu : 모바일 네비게이션
	function navmenu(obj){
		// dim
		var $ct = $('#wrap');
		var $dim = $('.dim');

		// menu open/close
		$('.openMenu').click(function(e) {
			e.preventDefault();
			$('.nav').css({'left': '0px',
				'transform': 'translateX(0) translateY(0px)'
			});
			$dim.fadeIn();
			$ct.addClass('ct_fix');
		});
		$('.dim').click(function(e) {
			e.preventDefault();
			$('.nav').css({'left': '-100%',
				'transform': 'translateX(0) translateY(0px)'
			});
			$dim.fadeOut();
			$ct.removeClass('ct_fix');
		});
		$(".nav").swipe({
			swipeLeft:function() {
				$('.nav').css({'left': '-100%',
					'transform': 'translateX(0) translateY(0px)'
				});
				$dim.fadeOut();
				$ct.removeClass('ct_fix');
			}
		});
	}navmenu();

	// top
	function top(){
		$('.b_top').on('click',function(){
			if($('#fullpage').length > 0){
				$('#fullpage').css({
					"-webkit-transform": "translate3d(" + 0 + "px, 0px, 0px)",
					"-moz-transform": "translate3d(" + 0 + "px, 0px, 0px)",
					"-o-transform": "translate3d(" + 0 + "px, 0px, 0px)",
					"-ms-transform": "translate3d(" + 0 + "px, 0px, 0px)",
					"transform": "translate3d(" + 0 + "px, 0px,0px)"
				})
				$('body').removeClass('fp-viewing-section3').addClass('fp-viewing-section1')
				$('#fullpage').find('.section').removeClass('active');
				$('#fullpage').find('.section').eq(0).addClass('active');
			}else{
				$("html, body").stop().animate({scrollTop:0},300);
			}
		})
	}top();

	function s_tab(){
		$('.s_tab li a').on('click',function(){
			$(this).parents('li').addClass('on').siblings('li').removeClass('on')
		})
	}s_tab();

	// 
	function mb_select(){
		var rdo = $('.join_wrap .chk_list input[type="radio"]')
		rdo.on('click',function(){
			var li = $(this).parents('li');

			li.find('select').fadeIn();
			li.siblings().find('select').fadeOut();	
			setTimeout(function(){
				li.parents('ul').find('select option').removeAttr('selected');
			},400)
		})
	}mb_select()
})


// 메인 슬라이드 이동 2018-06-22 수정
function go(e){
	var btn = $(e)
		, idx = btn.parents('li').index()
		, page = $('#owl-demo .owl-pagination').find('.owl-page')
		, wrap = $('#owl-demo .owl-wrapper')
		, winW = $(window).width()
		, pixels1 = -(winW * idx)
		, pixels2 = -(winW * (idx+1))
		, top = $('#owl-demo').offset().top;

	if($('#fullpage').length > 0){
		// 메인 풀페이지 시 상단 이동 
		$('#fullpage').css({
			"-webkit-transform": "translate3d(" + 0 + "px, 0px, 0px)",
			"-moz-transform": "translate3d(" + 0 + "px, 0px, 0px)",
			"-o-transform": "translate3d(" + 0 + "px, 0px, 0px)",
			"-ms-transform": "translate3d(" + 0 + "px, 0px, 0px)",
			"transform": "translate3d(" + 0 + "px, 0px,0px)"
		})
		$('body').removeClass('fp-viewing-section3').addClass('fp-viewing-section1')
		$('#fullpage').find('.section').removeClass('active');
		$('#fullpage').find('.section').eq(0).addClass('active');
	}else{
		$("html, body").stop().animate({scrollTop:top},500);
	}

	 if(idx == 0){
	 	// KOREX 소개 눌렀을때
		page.eq(idx).addClass('active').siblings().removeClass('active');
		wrap.css({
			"-webkit-transform": "translate3d(" + pixels1 + "px, 0px, 0px)",
			"-moz-transform": "translate3d(" + pixels1 + "px, 0px, 0px)",
			"-o-transform": "translate3d(" + pixels1 + "px, 0px, 0px)",
			"-ms-transform": "translate3d(" + pixels1 + "px, 0px, 0px)",
			"transform": "translate3d(" + pixels1 + "px, 0px,0px)"
		})
	 }else{
	 	// 전문공인중개사 눌렀을때
		page.eq(idx+1).addClass('active').siblings().removeClass('active');
		wrap.css({
			"-webkit-transform": "translate3d(" + pixels2 + "px, 0px, 0px)",
			"-moz-transform": "translate3d(" + pixels2 + "px, 0px, 0px)",
			"-o-transform": "translate3d(" + pixels2 + "px, 0px, 0px)",
			"-ms-transform": "translate3d(" + pixels2 + "px, 0px, 0px)",
			"transform": "translate3d(" + pixels2 + "px, 0px,0px)"
		})
	 }
}
// 전화걸기
function tel(e){
	var btn = $(e)
		, li = btn.parents('li')
		, web = li.find('.web')
		, p_close = li.find('.p_close')
		, winW = $(window).width();
	// if(!li.hasClass('none')){
		if(!li.hasClass('on')){
			li.addClass('on').siblings().removeClass('on');
		}
	// }

	web.on('click',function(){
		$(this).parents('li').removeClass('on');
	})
	p_close.on('click',function(){
		$(this).parents('li').removeClass('on');
	})
}

// 게시물
function subj(e){
	var subj = $(e).parents('.td')
		, view = subj.next('.td_view')
		, winW = $(window).width();

	if(winW>768){
		if(!subj.hasClass('on')){
			subj.addClass('on');
			view.slideDown();
			subj.siblings('.td').removeClass('on');
			subj.siblings('.td').next('.td_view').slideUp();
		}else{
			subj.removeClass('on');
			view.slideUp();
		}
	}else{
		if(!subj.hasClass('on')){
			subj.addClass('on');
			view.fadeIn();
		}else{
			subj.removeClass('on');
			view.fadeOut();
		}
	}
}

// 게시물 닫기
function b_close(e){
	var view = $(e).parents('.td_view')
		, subj = view.prev('.td')
		, winW = $(window).width();

	if(winW>768){
		subj.removeClass('on');
		view.slideUp();	
	}else{
		subj.removeClass('on');
		view.fadeOut();	
	}
}


//레이어 가운데 띄우고 마스크 띄우기
function toggleLayer( obj, s ) {

	var zidx = $("#lay_mask").css("z-index");
	if(s == "on") {
		//화면중앙에 위치시키기
		var left = ( $(window).scrollLeft() + ($(window).width() - obj.width()) / 2 );
		var top = ( $(window).scrollTop() + ($(window).height() - obj.height()) / 2 );
		
		// 높이가 0이하면 0으로 변경
		if(top<0) top = 0;
		if(left<0) left = 0;

		if($(".PopupLayer").length > 1) {
			var layer_idx = Number(zidx) + 10;
		}

		$("#lay_mask").css("z-index", layer_idx);
		obj.css({"left":left, "top":top, "z-index":layer_idx}).addClass("PopupLayer");
		$("body").append(obj);

		wrapWindowByMask();//배경 깔기
		obj.css({"display":"block","overflow":"visible", "visibility":"visible", "left":left, "top":top});//레이어 띄우기
	}

	if(s == "off") {
		if($(".PopupLayer").length > 1) {
			var layer_idx = zidx - 10;
			$("#lay_mask").css("z-index", layer_idx);
			// console.log('off일경우 '+ $("#lay_mask").css('z-index'))
		} else {
			$("#lay_mask").hide();
		}
		obj.removeClass("PopupLayer").css('visibility','hidden');
		obj.css('top','-9999px');
	}

	if(s == "off2") { //레이어에서 다른 레이어를 띄울 경우 마스크는 안닫기 위한 처리
		obj.removeClass("PopupLayer").css('visibility','hidden');
	}

	// 키보드 esc 눌렀을 때 닫힘
	$(document).keydown(function(e){
		if(e.keyCode === 27){
			if( $(".pop_layer").hasClass("PopupLayer")){
				$(".pop_layer").hide().removeClass("PopupLayer");
				$('#lay_mask').hide();
			}
			return false;
		}
	});

	// layMask 클릭시 닫힘
	$('#lay_mask').click(function(){
		obj.removeClass("PopupLayer").hide();
		$(this).hide();
	});
}

//마스크 띄우기
function wrapWindowByMask() { 
	var mask = $("#lay_mask");
	//화면의 높이와 너비를 구한다. 
	var maskHeight = $(window).height();
	var maskWidth = $(window).width();
	//마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다. 
	mask.css({'width':maskWidth,'height':maskHeight});
	mask.show();
}

// 사이즈 리사이징
function ResizingLayer() {
	if($(".PopupLayer").css("visibility") == "visible") {
		//화면의 높이와 너비를 구한다. 
		var maskHeight = $(window).height();
		var maskWidth = $(window).width();

		//마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다. 
		$("#lay_mask").css({'width':maskWidth,'height':maskHeight});

		$(".PopupLayer").each(function () {
			var left = ( $(window).scrollLeft() + ($(window).width() - $(this).width()) / 2 );
			var top = ( $(window).scrollTop() + ($(window).height() - $(this).height()) / 2 );

			if(top<0) top = 0;
			if(left<0) left = 0;

			$(this).css({"left":left, "top":top});
		});
	}
}
window.onresize = ResizingLayer;

//화면 스크롤시
var scrollTop = function() {
	return $(window).scrollTop();
}
$(window).on("resize scroll",function() {
	var limitHeight = 60,
		gnb = $('#gnb');

	if(scrollTop() < limitHeight) {
		gnb.removeClass('scrolled');
	} else {
		gnb.addClass('scrolled');
	}

	console.log($(window).height());
})
