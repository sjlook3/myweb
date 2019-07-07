/*--마스크 레이어*/

//마스크 온.오프
const toggleMask = (function () {
    
  var isShow = true;
    
  return function () {
      
    isShow ? wrapWindowByMask() : $('#lay_mask').hide();
    
    $('#lay_mask').click(function(){
		wrapWindowByMask();
	});  
         
    isShow = !isShow;
  };
    
})();


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

		if($(".active_Popup").length > 1) {
			var layer_idx = Number(zidx) + 10;
		}
        
		$("#lay_mask").css("z-index", layer_idx);
        
		obj.css({"left":left, "top":top, "z-index":layer_idx}).addClass("active_Popup");
		$("body").append(obj);

		wrapWindowByMask();//배경 깔기
        
		obj.css({"display":"block","overflow":"visible", "visibility":"visible", "left":left, "top":top});//레이어 띄우기
	}

	if(s == "off") {
		if($(".active_Popup").length > 1) {
			var layer_idx = zidx - 10;
			$("#lay_mask").css("z-index", layer_idx);
			// console.log('off일경우 '+ $("#lay_mask").css('z-index'))
		} else {
			$("#lay_mask").hide();
		}
		obj.removeClass("active_Popup").css('visibility','hidden');
		obj.css('top','-9999px');
	}

	if(s == "off2") { //레이어에서 다른 레이어를 띄울 경우 마스크는 안닫기 위한 처리
		obj.removeClass("active_Popup").css('visibility','hidden');
	}

	// 키보드 esc 눌렀을 때 닫힘
	$(document).keydown(function(e){
		if(e.keyCode === 27){
			if( $(".pop_layer").hasClass("active_Popup")){
				$(".pop_layer").hide().removeClass("active_Popup");
				$('#lay_mask').hide();
			}
			return false;
		}
	});

	// layMask 클릭시 닫힘
	$('#lay_mask').click(function(){
		obj.removeClass("active_Popup").hide();
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
	if($(".active_Popup").css("visibility") == "visible") {
		//화면의 높이와 너비를 구한다. 
		var maskHeight = $(window).height();
		var maskWidth = $(window).width();

		//마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다. 
		$("#lay_mask").css({'width':maskWidth,'height':maskHeight});

		$(".active_Popup").each(function () {
			var left = ( $(window).scrollLeft() + ($(window).width() - $(this).width()) / 2 );
			var top = ( $(window).scrollTop() + ($(window).height() - $(this).height()) / 2 );

			if(top<0) top = 0;
			if(left<0) left = 0;

			$(this).css({"left":left, "top":top});
		});
	}
}
window.onresize = ResizingLayer;

/*---//마크스 레이어*/