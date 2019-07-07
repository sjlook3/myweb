$(function () {
    
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
    
    var windowWidth = window.innerWidth;
    var userAgent = window.navigator.userAgent;
    var isChrome = userAgent.indexOf('Chrome');
    var isChromeMobile = userAgent.indexOf('CriOS');
    var isSamsungBrowser = userAgent.indexOf('SamsungBrowser');
    var isWindows = userAgent.indexOf('Windows NT');
    var isEdge = userAgent.indexOf('Edge');
    var isIE = userAgent.indexOf('Trident');
    
    

    // 크롬 브라우저 체크
    /*if(isChrome > -1 || isChromeMobile > -1){
        
        
        if(isSamsungBrowser < 0 && isEdge < 0){ $('body').css('background', 'yellow' ); } 
    

    }*/
    


    var controller = new ScrollMagic.Controller();

    // parallax1
    const parallaxTl = new TimelineLite();
    parallaxTl
        .from('.bcg', 2, {
            y: '-20%',
            ease: Power0.easeNone
        }, 0)

    new ScrollMagic.Scene({
            triggerHook: 0.1,
            triggerElement: '.bcg-parallax',
            duration: '40%'
        })
        .setTween(parallaxTl)
        /*.addIndicators({
            name: 'parallax',
            colorStart: 'grey',
            colorEnd: 'grey',
            colorTrigger: 'grey'
        })*/
        .addTo(controller);


    
    // parallax2
    const parallaxTl2 = new TimelineLite();
    parallaxTl2
        .from('.content-wrapper2', 0.5, {
            autoAlpha: 0,
            ease: Power0.easeNone
        }, 0.5)
        .from('.bcg', 2, {
            y: '-60%',
            ease: Power0.easeNone
        }, 0)

    new ScrollMagic.Scene({
            triggerHook: 1,
            triggerElement: '.bcg-parallax2',
            duration: '100%'
        })
        .setTween(parallaxTl2)
        /*.addIndicators({
            colorStart: 'pink',
            colorEnd: 'pink',
            colorTrigger: 'pink'
        })*/
        .addTo(controller);

    //------------------------------------------------------------
    
        
    var sect2 = document.querySelector('.sect2'),
        sect2Items = sect2.children,
        itemArr = Array.from(sect2Items),
        contWrapperArr = Array.from(sect2.querySelectorAll('.content-wrapper')).slice(1);
    
        
    // browser(Edage, IE 제외) & pc-size
    if ((isEdge < 0 && isIE < 0) && windowWidth > 1024) {

        

        console.log(contWrapperArr);
        
            
        itemArr.forEach(function (o, i) {

            o.classList.add('overlap');

        });
        
        contWrapperArr.forEach(function (o, i) {

            o.style.opacity = 1;
            
        })
        
        
        new ScrollMagic.Scene({
                triggerHook: 0.7,
                triggerElement: itemArr[0].querySelector('.content-wrapper'),
                reverse: false
            })
            .setClassToggle(itemArr[0].querySelector('.content-wrapper'), 'fade-in')
            /*.addIndicators({
                name: 'fade-in'
            })*/
            .addTo(controller);


        // fade-in
        new ScrollMagic.Scene({
                triggerHook: 0.7,
                triggerElement: itemArr[0].querySelector('.content-wrapper'),
                reverse: false
            })
            .setClassToggle(itemArr[0].querySelector('.content-wrapper h2.animated'), 'fadeInDown')
            /*.addIndicators({
                name: 'fadeInDown'
            })*/
            .addTo(controller);


        // fade-in
        new ScrollMagic.Scene({
                triggerHook: 0.7,
                triggerElement: itemArr[0].querySelector('.content-wrapper'),
                reverse: false
            })
            .setClassToggle(itemArr[0].querySelector('.content-wrapper p.animated'), 'fadeInRight')
            /*.addIndicators({
                name: 'fadeInRight'
            })*/
            .addTo(controller);

        

        // Pin1
        new ScrollMagic.Scene({
                triggerHook: 1,
                triggerElement: ".sect2-web .item.is-B",
            })
            .setPin(".sect2-web .item.is-A .pin-wrapper", {
                pushFollowers: !1
            })
            /*.addIndicators({
                name: 'no1',
                colorStart: 'red',
                colorEnd: 'red',
                colorTrigger: 'red'
            })*/
            .addTo(controller);


        // Pin2
        new ScrollMagic.Scene({
                triggerHook: 1,
                triggerElement: ".sect2-web .item.is-B"

            })
            .setPin(".sect2-web .item.is-B .pin-wrapper", {
                pushFollowers: !1
            })
            /*.addIndicators({
                name: 'no2',
                colorStart: '#ffeb3b',
                colorEnd: '#ffeb3b',
                colorTrigger: '#ffeb3b'
            })*/
            .addTo(controller);


        // Pin3
        new ScrollMagic.Scene({
                triggerHook: 1,
                triggerElement: ".sect2-web .item.is-C",
                duration: '100%'

            })
            .setPin(".sect2-web .item.is-C .pin-wrapper", {
                pushFollowers: !1
            })
            /*.addIndicators({
                name: 'no3',
                colorStart: '#ffeb3b',
                colorEnd: '#ffeb3b',
                colorTrigger: '#ffeb3b'

            })*/
            .addTo(controller);

    } else {


        itemArr.forEach(function (o, i) {

            // fade-in
            new ScrollMagic.Scene({
                    triggerHook: 0.7,
                    triggerElement: itemArr[i].querySelector('.content-wrapper'),
                    //reverse: false
                })
                .setClassToggle(itemArr[i].querySelector('.content-wrapper'), 'fade-in')
                /*.addIndicators({
                    name: 'fade-in'
                })*/
                .addTo(controller);

        })

        itemArr.forEach(function (o, i) {

            // fade-in
            new ScrollMagic.Scene({
                    triggerHook: 0.7,
                    triggerElement: itemArr[i].querySelector('.content-wrapper'),
                    //reverse: false
                })
                .setClassToggle(itemArr[i].querySelector('.content-wrapper h2.animated'), 'fadeInDown')
                /*.addIndicators({
                    name: 'fadeInDown'
                })*/
                .addTo(controller);

        })

        itemArr.forEach(function (o, i) {

            // fade-in
            new ScrollMagic.Scene({
                    triggerHook: 0.7,
                    triggerElement: itemArr[i].querySelector('.content-wrapper'),
                    //reverse: false
                })
                .setClassToggle(itemArr[i].querySelector('.content-wrapper p.animated'), 'fadeInRight')
                /*.addIndicators({
                    name: 'fadeInRight'
                })*/
                .addTo(controller);
        })

    }
            
    // fade-in
    new ScrollMagic.Scene({
            triggerHook: 0.85,
            triggerElement: '#project03 .content.popover',
            //reverse: false
        })
        .setClassToggle('#project03', 'fade-in') //event-listener
        /*.addIndicators({
            name: 'fade-in'
        })*/
        .addTo(controller);
    
});


const links = document.getElementsByTagName("a");

[...links].forEach(link => {
  link.addEventListener("mouseover", handleMouseOver);
  link.addEventListener("mousemove", handleMouseMove);
  link.addEventListener("mouseleave", handleMouseLeave);
});

function handlePosition(e) {
  const ID = e.target.getAttribute("data-hover-id");
  const wrapper = document.getElementById(ID);
  let top = "";
  if (
  !(e.target.getBoundingClientRect().top + wrapper.offsetHeight > innerHeight))
  {
    top = `${e.clientY + e.target.offsetHeight}px`;
  } else {
    top = `${e.clientY - (wrapper.offsetHeight + e.target.offsetHeight)}px`;
  }

  return `position: fixed; left: ${e.clientX -
  wrapper.offsetWidth / 2}px; top:${top}`;
}

function handleMouseOver(e) {
  const hoverContent = e.target.getAttribute("data-hover-content");
  const ID = Math.random().
  toString(36).
  substr(2, 9);
  const wrapper = document.createElement("DIV");
  e.target.setAttribute("data-hover-id", ID);
  wrapper.setAttribute("data-hover-wrapper", "");
  wrapper.setAttribute("id", ID);
  wrapper.setAttribute("style", "opacity: 0; transform: scale(.8)");
  wrapper.innerHTML = hoverContent;
  document.body.append(wrapper);
  wrapper.setAttribute("style", handlePosition(e));

  // You can remove this line when you are using. I had added for the demo.
  if (document.querySelector('.info')) document.querySelector('.info').remove();

}

function handleMouseLeave(e) {
  const ID = e.target.getAttribute("data-hover-id");
  document.getElementById(ID).style.opacity = 0;
  document.getElementById(ID).style.transform = "scale(.8)";
  setTimeout(() => {
    document.getElementById(ID).remove();
  }, 150);
}

function handleMouseMove(e) {
  const ID = e.target.getAttribute("data-hover-id");
  const wrapper = document.getElementById(ID);
  wrapper.setAttribute("style", handlePosition(e));
}

window.addEventListener('scroll', () => {
  const wrapper = document.querySelector('[data-hover-wrapper]');
  if (wrapper) wrapper.remove();
});