/**
 * jQuery PageScroll 
 * Version 0.3.2
 *
 * https://github.com/javion25/PageScroll.js
 * MIT licensed
 *
 * Copyright (C) 2015 Javion.me - A project by Javion
 */

/** 
 * @@Custom: 변경,추가 by Juluck,Son
*/

;(function($,window,document,undefined){
    
    
    //@@ Array.from 미지원 시, polyfill
    if (!Array.from) {
        Array.from = (function () {
            var toStr = Object.prototype.toString;
            var isCallable = function (fn) {
                return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
            };
            var toInteger = function (value) {
                var number = Number(value);
                if (isNaN(number)) {
                    return 0;
                }
                if (number === 0 || !isFinite(number)) {
                    return number;
                }
                return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
            };
            var maxSafeInteger = Math.pow(2, 53) - 1;
            var toLength = function (value) {
                var len = toInteger(value);
                return Math.min(Math.max(len, 0), maxSafeInteger);
            };

            // The length property of the from method is 1.
            return function from(arrayLike /*, mapFn, thisArg */ ) {
                // 1. Let C be the this value.
                var C = this;

                // 2. Let items be ToObject(arrayLike).
                var items = Object(arrayLike);

                // 3. ReturnIfAbrupt(items).
                if (arrayLike == null) {
                    throw new TypeError("Array.from requires an array-like object - not null or undefined");
                }

                // 4. If mapfn is undefined, then let mapping be false.
                var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                var T;
                if (typeof mapFn !== 'undefined') {
                    // 5. else
                    // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                    if (!isCallable(mapFn)) {
                        throw new TypeError('Array.from: when provided, the second argument must be a function');
                    }

                    // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                    if (arguments.length > 2) {
                        T = arguments[2];
                    }
                }

                // 10. Let lenValue be Get(items, "length").
                // 11. Let len be ToLength(lenValue).
                var len = toLength(items.length);

                // 13. If IsConstructor(C) is true, then
                // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
                // 14. a. Else, Let A be ArrayCreate(len).
                var A = isCallable(C) ? Object(new C(len)) : new Array(len);

                // 16. Let k be 0.
                var k = 0;
                // 17. Repeat, while k < len… (also steps a - h)
                var kValue;
                while (k < len) {
                    kValue = items[k];
                    if (mapFn) {
                        A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    } else {
                        A[k] = kValue;
                    }
                    k += 1;
                }
                // 18. Let putStatus be Put(A, "length", len, true).
                A.length = len;
                // 20. Return A.
                return A;
            };
        }());
    }
    
    
	var _prefix = (function(temp){
		var aPrefix = ["Moz","o","webkit","ms"],
			props = "";
		for(var i in aPrefix){
            
			props = aPrefix[i] + "Transition";        
            if (temp.style[props] != undefined) {
                
                return "-" + aPrefix[i].toLowerCase() + "-";
            }
		}
		return false;
     
	})(document.createElement('html'));
    
    //console.log(_prefix);
    
        
    // Wrapping : $$PageScroll생성자 와 $$PageScroll.prototype 의 즉시실행을 위해서
    // var PageScroll로 할당하는 Wrapping 풀고, return $$PageScroll 삭제하면, 동일하게 작동함.
    var PageScroll = (function(){
        
        // @@Csutom: 커스텀 변수 정의
        var oNe1, oNe2, oNe3, oNe4;
        var pausing = !1;
                
		function $$PageScroll($$element,options){
            
			this.settings = $.extend( true, $.fn.PageScroll.defaults, options || {} );
			this.element = $$element; //jquery 객체(개체집합)
			this.init();           
            this._addActive(); //@@Custom: 추가
		}
        
        
       // @@Custom: 변경,추가 by Juluck,Son
       var i = {
          throttle: function (t, n, i) {
              
            var e = null,
                o = 0;
   
            return function () {

              var r = this,
                  s = arguments,
                  c = Date.now();
              i && c - o >= i ? (o = c, t.apply(r, s)) : (e && clearTimeout(e), e = setTimeout(function () {
                t.apply(r, s)
              }, n))                
            }
          }
        };        
        
        
		$$PageScroll.prototype = {
                
			init : function(){                
				this.selectors = this.settings.selectors;    
				this.sections = this.element.find(this.selectors.sections);  
				this.section = this.sections.find(this.selectors.section);
				this.direction = this.settings.direction == "vertical" ? true:false;
				this.pagesCount = this.pagesCount();
				this.index = (this.settings.index >= 0 && this.settings.index < this.pagesCount)? this.settings.index : 0;                               
				this.canScroll = true;	
                
                if(!this.direction){
                    
					this._initLayout();
                    
				}
                
				if (this.settings.pagination) {
                    
					this._initPaging();
                    
				}
                
				if(this.index>0){
                    
					this._scrollPage();
				}
                
				this._initEvent();
			},
            
            
            // @@Custom: 페이지 스크롤링 일시정지
            pause : function(){
                
                 pausing = !0;
            
            },
            
            // @@Custom: 페이지 스크롤링 일시정지 해제
            resume : function(){
                
                pausing = !1;
            },
                                    
			pagesCount : function(){
				return this.section.length;
			},


			ScrollLength : function(){
				return this.direction ? this.element.height() : this.element.width();
			},


			prev : function(){
				if(this.index > 0){
					this.index --;
				}else if(this.settings.loop){
					this.index = self.pagesCount - 1;
				}
				this._scrollPage();
                this._addActive();
                //console.log(this.index);
			},

			next : function(){
				if(this.index < this.pagesCount){
					this.index ++;
				}else if(this.settings.loop){
					this.index = 0;
				}
				this._scrollPage();
                this._addActive();
                //console.log(this.index);
			},
                        
            
            //Pagination
			_initPaging : function(){
                
				this.pagesClass = this.selectors.page.substring(1),
				this.activeClass = this.selectors.active.substring(1),
				pageHtml = "<ul class="+this.pagesClass+">";
				for(var i=0;i<this.pagesCount;i++){
					pageHtml +="<li></li>";
				}
				pageHtml+="</ul>"; 
				this.element.append(pageHtml);
                
				var pages = this.element.find(this.selectors.page);
				this.pageItem = pages.find("li");
				this.pageItem.eq(this.index).addClass(this.activeClass);
				
				if(this.direction) {
					pages.addClass("vertical");
				}else{
					pages.addClass("horizontal");
				};
			},

            //플러그인 이벤트 초기화
			_initEvent : function(){
                
				var self = this;
                
 
                //마우스 휠 이벤트
				self.element.on("mousewheel DOMMouseScroll",function(e){

                    // Firefox 브라우저가 세부 속성을 통해 휠의 방향을 결정합니다 (아래로 3, 아래로 3).
                    // 다른 브라우저는 wheeldalta 속성을 통해 휠의 방향을 결정합니다 (아래 -120, 최대 120).
                    
					if(self.canScroll){
                        
						var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
                        
                        // @@Custom: 조건문(&& self.settings.loop) 앞에 self.index 추가 (loop 시 오류 수정)   
						if(delta > 0 &&(self.index && !self.settings.loop || self.index && self.settings.loop)){
                            
                            !pausing ? self.prev() : "";
                            
						}else if(delta < 0 && (self.index < (self.pagesCount - 1) && !self.settings.loop || self.settings.loop)){
                            
							!pausing ? self.next() : "";
						}
					}
				})
                
                // @@Custom: 터치-스와이프 이벤트 touch-enabled devices
                var touch_startX, touch_startY; 
        
                self.element.on("touchstart",function(e){
                    
                    touch_startX = e.touches[0].clientX, 
                    touch_startY = e.touches[0].clientY

				});
                   
                self.element.on("touchmove", i.throttle(function(e){
                                        
                    console.log(self.element);
                    if(self.canScroll){
                                            
                      var gX = e.touches[0].clientX - touch_startX,
                          gY = e.touches[0].clientY - touch_startY,
                          abs_gX = Math.abs(gX),
                          abs_gY = Math.abs(gY),
                          gRad = Math.atan(abs_gY/abs_gX);
                        
                    
                        if(gY > 0 && gRad > Math.PI/4 &&(self.index && !self.settings.loop || self.index && self.settings.loop)){
                            
                            console.log(pausing);
                            !pausing ? self.prev() : "";
                            
                        }else if(gY < 0 && gRad > Math.PI/4 && (self.index < (self.pagesCount - 1) && !self.settings.loop || self.settings.loop)){
                            
                            console.log(pausing);
                            !pausing ? self.next() : "";
                        }
                        
                    }
                                    
				}, 16));
                

                //키보드 이벤트
				if(self.settings.keyboard){
					$(window).on("keydown",function(e){
						var keyCode = e.keyCode;
						if (keyCode == 37 || keyCode == 38) {
							
                            !pausing ? self.prev() : "";
                            
						}else if(keyCode == 39 || keyCode == 40){
                            
							!pausing ? self.next() : "";
						}
					});
				}

                //창 변경 트리거 이벤트
				$(window).resize(function(){
					var currentLength = self.ScrollLength(),
						offset = self.settings.direction ? self.section.eq(self.index).offset().top : self.section.eq(self.index).offset().left;
						if(Math.abs(offset) > currentLength/2 && self.index < (self.pagesCount -1)){
							self.index ++;
						}
                        
                        // @@Custom: 창 변경 후, 중단 현상 수정
                        /*if(self.index){
							self._scrollPage();                            
						}*/

				});

                //애니메이션이 끝난 후 트리거 이벤트
				self.sections.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend",function(){
					self.canScroll = true;
					if(self.settings.callback && $.type(self.settings.callback) == "function"){
						self.settings.callback();
					}
				});
			},

            // 슬라이딩 애니메이션
			_scrollPage : function(){
                
				var self = this,    
				dest = self.section.eq(self.index).position();
				if(!dest) return;
                self.canScroll = false;
                
				if(_prefix){
					self.sections.css(_prefix+"transition","all " +self.settings.duration+"ms "+ self.settings.easing);
					var translate = self.direction ? "translateY(-"+dest.top+"px)" : "translateX(-"+dest.left+"px)";
					self.sections.css(_prefix+"transform",translate);
                    
				}else{
					var animateCss = self.direction ? {top : -dest.top} : {left : -dest.left};
					self.sections.animate(animateCss,self.settings.duration,function(){
						self.canScroll = true;
						if(self.settings.callback && $.type(self.settings.callback) == "function"){
							self.settings.callback();
						}
					});
				}

				if(self.settings.pagination){
					self.pageItem.eq(self.index).addClass(self.activeClass).siblings("li").removeClass(self.activeClass);
				} 

			},
            
            
            // @@Custom: active 클래스명 부여
            _addActive : function(){
                
                var self = this;
                
                this.section.eq(this.index).addClass("active");
                this.section.eq(this.index).siblings().removeClass("active");
                

                self.active = true;
                self.pageNum = self.index + 1;
                self._launchCon(self.active, self.pageNum);
                
                //console.log("active: " + self.active + " / page: " +self.pageNum);
                
                    
            },
            
            // @@Custom: 섹션별 동작하는 컨텐츠 js
            _launchCon : function(active, pageNum){
               
               // page3 컨텐츠 변수 정의    
               var slider = $('.flexslider').data('flexslider');
                
               // page4 컨텐츠 변수 정의    
               var sclViewport = document.querySelectorAll('.scroll-viewport'),
                   sclForm = sclViewport[0].querySelector('form'),
                   sclFormItems = sclForm.children,
                   sclFormItemsArr = Array.from(sclFormItems),
                   isfocused = !1,
                   arr_focused = [],
                   arr_onlyBlurred = [],
                   windowWidth = window.innerWidth;                

              /*var $sclViewport = $('.scroll-viewport'),
                   $sclForm = $sclViewport.eq(0).find('form'),
                   $sclFormItems = $sclForm.children(),
                   $sclFormItemsArr = $sclFormItems.toArray();
                   $windowWidth = $(window).width();*/

                
                if(active && (pageNum == 1) && !oNe1){
                               
                                       
                    var tl = new TimelineMax({onUpdate:updatePercentage});
                    var tl2 = new TimelineMax();

                    tl.from('blockquote', .5, { x: 200, opacity: 0 }) 
                        .from("#udline1", 1, { width: 0 }, "=-.5") 
                        .from('#office', 1, { x: -200, opacity: 0 }, "=-1") 
                        .from('#building', 1, { x: 200, opacity: 0 }, "=-.7");

                    tl2.from('#box', 1, { opacity: 0, scale: 0 }) 
                        .to('#box', .5, { left: "20%", scale: 1.3, borderColor: 'white', borderWidth: 12, boxShadow: '1px 1px 0px 0px rgba(0,0,0,.09)' });


                    function updatePercentage() {
                              tl.progress();
                    }
                    
                    oNe1 = !0;
                    
                } 
                
                if (active && (pageNum == 2)) {

                    $('#cardStack .animated').each(function() {
                        
                        $(this).addClass('fadeInRight');
                        
                    });
                                        
                    //.children('.aniIcon')
                    /*$('.scroll-animations .hspot').on('mouseenter', function () {

                        $(this).addClass('animated flipOutY').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            $(this).removeClass('animated flipOutY');
                        });

                    });*/
                }
                
                if(active && (pageNum == 3) && !oNe3){
                    
                       console.log(oNe3);
                    
                       $('.flexslider').flexslider({
                            animation: "slide",
                            controlNav: false,
                            slideshowSpeed: 3e3,
                            animationSpeed: 300,
                        });
                                                                    
                }
                
                if(active && (pageNum == 4) && !oNe3){
                    
                    
                    $('.anima-10 .animated').addClass('bounceIn');
                                       
                    //.children('.aniIcon')
                    /*
                    $('.anima-10 .hspot').on('mouseenter', function () {

                        $(this).addClass('animated flipOutY').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            $(this).removeClass('animated flipOutY');
                        });

                    });
                    */
                    
 
                    $('.funky-animations h4').on('click', function () {
                        $(this).addClass('animated hinge').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            $(this).removeClass('animated hinge');
                        });
                    });
                                                                    
                }
                

                if(active && (pageNum == 5)){
                    

                       var self = this;
                       
                       var nowsection = self.section[self.index];
    
                      $(sclViewport).slimScroll({
                          height: 'auto',
                          opacity: 0,
                          touchScrollStep : 30,

                      });
                    
                      sclFormItemsArr.forEach(function(o,i){
                                        
                              arr_focused[i] = !1;
                          
                      });
                    

                      sclFormItemsArr.forEach(function(o,i){
                          
                          o.addEventListener('focus', function(){
                              
                              isfocused = !0;
                              arr_focused[i] = !0;
                              console.log(isfocused);
                              self.pause();              
                              windowWidth <= 1024 ? $(sclViewport).slimScroll({height: '35vh'}) : ''; 
                              
                          })
                      });
                    
                    
                      sclFormItemsArr.forEach(function(o,i){
                          
                          var d ;
                          
                          function allBlurred(v){
                              
                              return v == !1;
                          }
                          
                          o.addEventListener('blur', function(){
                                                        
                              arr_focused[i] = !1;
                              
                              setTimeout(function () {

                                  d = arr_focused.every(allBlurred);
                                  
                                  if(d){
                                      isfocused = !1;
                                      console.log(isfocused);
                                      self.resume();
                                      windowWidth <= 1024 ? $(sclViewport).slimScroll({height: 'auto'}) : '';    
                                  }
                                  
                                  //d ? (isfocused = !1, console.log(isfocused), self.resume()) : '';
                                  
                              }, 10);
                          })                           
                      });                    
                    
                        if (windowWidth <= 1024) {

                           var curH, preH, virKeyb;

                           function d_viewportSizer() {

                               curH = window.innerHeight ||
                                   document.documentElement.clientHeight ||
                                   document.body.clientHeight;

                           }

                           function d_virKeyb() {

                               preH = curH;

                               d_viewportSizer();

                               if (preH < curH) {

                                   virKeyb = !1;
                                   $(sclViewport).slimScroll({height: 'auto'})

                               } else if (preH > curH) {

                                   virKeyb = !0;
                               }
                               
                               console.log(virKeyb);
                           }
                           //window.onload = d_viewportSizer;
                           window.onresize = d_virKeyb;     
                       }
 
                    
                      $('button').on('click', function(e) { 
                          
                        e.stopPropagation();  
                                                
                        // Check name input
                        if ($('#name').val() === '') {
                          $('#name').addClass('form-error animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                            $(this).removeClass('animated shake');
                          });
                        } else {
                          $('#name').removeClass('form-error');
                        }

                        // Check email input
                        if ($('#email').val() === '') {
                          $('#email').addClass('form-error animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                            $(this).removeClass('animated shake');
                          });
                        } else {
                          $('#email').removeClass('form-error');
                        }

                        // Check message textarea
                        if ($('#message').val() === '') {
                          $('#message').addClass('form-error animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                            $(this).removeClass('animated shake');
                          });
                        } else {
                          $('#message').removeClass('form-error');
                        }
                      });
                    
                    
                    ($(nowsection) || $(sclViewport)).click(function(e){

                        $(sclFormItemsArr).removeClass('form-error');

                    });
                    

                    //var test_not = $(nowsection).not('.click-animations form input');
                    //test_not.css( "opacity", "0.1" );
                    

                    //js방식으로 처리
                    /*
                    function removeError(e) {

                        e = window.event || e;
                        if (this === e.target) {

                            //console.log(sclFormItemsArr);
                            sclFormItemsArr.forEach(function(o,i){

                                o.classList.remove('form-error');

                            });

                        }
                    }                    
                    nowsection.addEventListener('click', removeError);
                    sclViewport[0].addEventListener('click', removeError);*/
                    
                } else if(active && (pageNum != 5)){
                          
                       $(sclFormItemsArr).removeClass('form-error');                             
                }                        
                
                if(pageNum != 3 && slider != undefined){
                                        
                    oNe3 = !0;
                    
                    if(!slider.playing) { slider.play(); }  
                }
                
                /*
                if(pageNum != 3 && slider != undefined && !slider.playing){
                                          
                    slider.play(); 
                }*/
                
                if(active && (pageNum == 3) && oNe3){
                
                    slider.setup();
                    
                }
            }
		};
        
		return $$PageScroll;
        
	})();
    

	$.fn.PageScroll = function(options){
           
        return this.each(function(){
            
			var self = $(this),
				instance = self.data("PageScroll");

			if(!instance){
				instance = new PageScroll(self,options);
				self.data("PageScroll",instance);
			} 
		});
	};
    

	$.fn.PageScroll.defaults = {

		selectors : {
			sections : ".sections",
			section : ".section",
			insection : ".insection",
			page : ".pages",
			controlPrev : ".control-prev",
			controlNext : ".control-next"
		},

		index : 0,	  
		easing : "ease",		
		duration : 500,
		loop : false,
		pagination : true,
		keyboard :true,
		direction : "vertical",
		callback : ""
	}
    
})(jQuery,window,document);








    
