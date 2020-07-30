// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
	ua
);

function inputHolder() {
	$('.fs-group input[type="text"], .fs-group input[type="password"]').focus(function (e) {
		$(this).parent().parent().removeClass('fs-show-error');
	});
	$('.fs-group').click(function () {
		$(this).removeClass('fs-show-error');
		$(this).find('input').focus();
	});
	$('.fs-group').focus(function () {
		$(this).removeClass('fs-show-error');
		$(this).find('input').focus();
	});
}

function includeHTML() {
	var z, i, elmnt, file, xhttp;
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		file = elmnt.getAttribute("w3-include-html");
		if (file) {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4) {
					if (this.status == 200) { elmnt.innerHTML = this.responseText; }
					if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
					elmnt.removeAttribute("w3-include-html");
					includeHTML();
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			return;
		}
	}
}

function scrollPopUp() {
	if(window.innerWidth < 768){
		$('.boxScroll').niceScroll({
			autohidemode: false,
			cursorwidth: "7px",
			cursorcolor: "#808080",
			background: "rgb(220,220,220)"
		}
		);
	}else{
		$('.boxScroll').niceScroll({
			autohidemode: false,
			cursorwidth: "15px",
			cursorcolor: "#808080",
			background: "rgb(220,220,220)"
		}
		);
	}
}

var isLoading = true;
function popupLoad(url, isOpen) {
	$.ajax({
		url: url, cache: false, success: function (data) {
			$('.popup-overlay').html(data);
			if ($('.popup-overlay').css('display') == 'block') {
				setTimeout(function () {
					isLoading = true;
					if ($('.boxScroll').length) {
						scrollPopUp();
					}
				}, 300);
			} else {
				$('.popup-overlay').fadeIn(500, function () {
					isLoading = true;
					if ($('.boxScroll').length) {
						scrollPopUp();
					}
				});
			}
		}
	});
}

// Events Common
function fsEvent() {

	// Open menu
	$('.nav-but').on('click', function () {
		if ($('body').hasClass('open-menu')) {
			$('body').removeClass('open-menu');
		} else {
			$('body').addClass('open-menu');
		}
	});

	// origin events
	$('.origin-tab li').on('click', function () {
		if (!$(this).hasClass('active')) {
			$('.origin-tab li').removeClass('active');
			$(this).addClass('active');
			var target = $(this).attr('data-tab');
			$('.origin-item.active').removeClass('active');
			$('.origin-item[data-target=' + target + '] ').addClass('active');
		}
	});

	// Open select
	$(document).on('click', '.fs-select-header', function (e) {
		var box = $(this).parent();
		box.parent().removeClass('fs-show-error');
		if (box.hasClass('fs-open-select')) {
			box.removeClass('fs-open-select');
		} else {
			$('.fs-select').removeClass('fs-open-select');
			box.addClass('fs-open-select');
		}
	});

	// Chose selected item
	$(document).on('click', '.fs-select-box li', function (e) {
		var that = $(this);
		var box = $(this).parent().parent().parent();
		var target = $(this).attr('data-target');
		if (!that.hasClass('selected')) {
			box.find('li').removeClass('selected');
			that.addClass('selected');
			box.removeClass('fs-open-select');
			box.find('.fs-select-header span').html(that.text());
		}
	});


	//Open shops popup
	$(document).on('click', '.brands-items .fs-but', function (e) {
		$('.popup-overlay').fadeIn(300, function () {
			$('body').addClass('fs-no-scroll');
		});
	});

	//Open shops popup
	$(document).on('click', '.close-popup', function (e) {
		$('.popup-overlay').fadeOut(300, function () {
			$('body').removeClass('fs-no-scroll');
		});
	});


	// Open video
	var videoId = '',
		video = null;
	$('.play-but').on('click', function (e) {
		e.preventDefault();
		$('body').addClass('open-modal');
		videoId = $(this).attr('data-video');
		if (videoId) {
			video = document.getElementById('genVideo');
			video.src = 'https://www.youtube.com/embed/' + videoId + '?rel=0&amp;autoplay=1&amp;playsinline=1';
		}
		$('.modal').stop().animate({ 'opacity': 1 }, 300, 'linear', function () { });
	});

	// Close video
	$('.close-modal, .overlay').on('click', function (e) {
		e.preventDefault();
		if (videoId) {
			video.src = "";
			videoId = null;
		}
		$('body').removeClass('open-modal');
		$('.modal').stop().animate({ 'opacity': 0 }, 300, 'linear', function () { });
	});


	// Go top
	$('.to-top').on('click', function () {
		$("html, body").stop().animate({ scrollTop: 0 }, 500);
	});

	// Open sub menu
	$(document).on('click', '.nav-inr .has-menu a', function () {
		var target = $(this).attr('data-target');
		var dataposition = $(this).attr('data-position');
		
		if ($('.fs-menu-item[data-target= ' + target + ' ]').hasClass('active')) {
			$('.fs-menu-item[data-target= ' + target + ' ]').removeClass('active');
			$('body').removeClass('open-overlay');
		} else {
			$('.fs-menu-item').removeClass('active');
			$('.fs-menu-item[data-target= ' + target + ' ]').addClass('active');
			
			if (target == 'header' || target == 'ofood-about') {
				$('body').addClass('open-overlay');
			}
		}

	});

	$('.overlay-header').on('click', function () {
		if ($('body').hasClass('open-overlay')) {
			$('body').removeClass('open-overlay');
			$('.fs-menu-item').removeClass('active');
		}
	});

	//Close any Tooltip when click out
	$(document).on('click touchstart', function (event) {
		//Close select
		if ($(".fs-select").has(event.target).length == 0 && !$(".fs-select").is(event.target)) {
			$(".fs-select").removeClass("fs-open-select");
		}
	});

	$('.search-toggle').on('click', function () {
		if ($('body').hasClass('open-search')) {
			$('body').removeClass('open-search');
		} else {
			$('body').addClass('open-search');
		}
	});

	$('.fs-btn-video').on('click', function () {
		var offsetSection = $('.by-news').offset().top;
		var delTop = $('.header-inr').height();
		$("html, body").stop().animate({ scrollTop: offsetSection - delTop }, 1000);
	});

	$('.buy-now').on('click', function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$('.buy-now').removeClass('active');
			$(this).addClass('active');
		}
	});

	// Faq
	$(document).on('click', '.is-faq .cap-title', function () {
		if ($(this).hasClass('active')) {
			$(this).next().slideUp(150);
			$(this).removeClass('active');
			$(this).prev().removeClass('active');
		} else {
			$(this).addClass('active');
			$(this).next().slideDown(150);
			$(this).prev().addClass('active');
		}
	});

	$(document).on('click', '.is-faq .is-icon', function () {
		if ($(this).hasClass('active')) {
			$(this).next().next().slideUp(150);
			$(this).removeClass('active');
			$(this).next().removeClass('active');
		} else {
			$(this).next().next().slideDown(150);
			$(this).addClass('active');
			$(this).next().addClass('active');
		}
	});


	// Open popup news
	// $(document).on('click', '.news-item', function () {
	// 	var url = 'data-pop-news.html';
	// 	if (isLoading) {
	// 		isLoading = false;
	// 		$('body').addClass('fs-no-scroll');
	// 		popupLoad(url);
	// 	}
	// });

	// Close PopUp
	$(document).on('click', '.close-but', function () {
		$('.popup-overlay').fadeOut(300, function () {
			if ($('.boxScroll').length) {
				$(".boxScroll").getNiceScroll().remove();
			}
			$('body').removeClass('fs-no-scroll');
		});
	});


	// Show Recipe detail
	$(document).on('click','.view-more',function(){
		if($(this).parent().parent().parent().find('.recipe-detail').hasClass('active')){
			$(this).parent().parent().parent().find('.recipe-detail').removeClass('active');
			$(this).parent().parent().parent().find('.recipe-detail').slideUp(150);
		}else{
			$(this).parent().parent().parent().find('.recipe-detail').addClass('active');
			$(this).parent().parent().parent().find('.recipe-detail').slideDown(150);
		}
	});

	$(document).on('click','.recipe-close',function(){
		$(this).parent().parent().slideUp(150);
		$(this).parent().parent().removeClass('active');
	});
	

	inputHolder();


}




// Create Slider
var recipesMain = null,
	tabSlider = null,
	tabBotSlider = null,
	productSlider = null;

function fsSlider() {

	if ($('.banner-slider').length) {
		var loop = true;
		if ($('.fs-banner .item-slide').length < 2) {
			$('.fs-banner').addClass('hide-controls');
			loop = false;
		}
		new Swiper('.banner-slider', {
			effect: 'slide',
			loop: loop,
			speed: 1000,
			watchOverflow: true,
			autoplay: {
				delay: 7000,
				disableOnInteraction: false
			},
			on: {
				init: function () {
				}, transitionStart: function () {
				}, transitionEnd: function () {
				}
			},
			navigation: {
				nextEl: '.fs-banner .swiper-button-next',
				prevEl: '.fs-banner .swiper-button-prev',
			},
			pagination: {
				el: '.fs-banner .swiper-pagination',
				clickable: true,
			},
			a11y: {
				enabled: false
			}
		});
	}

	if ($('.product-item-slider').length) {
		if ($('.product-items .item-slide').length < 2) {
			$('.fs-products').addClass('hide-controls');
		}
		productSlider = new Swiper('.product-item-slider', {
			effect: 'slide',
			loop: false,
			speed: 800,
			slidesPerView: 1,
			// autoplay: {
			// 	delay: 5000,
			// 	disableOnInteraction: false
			// },
			on: {
				init: function () {
				}, transitionStart: function () {
					if (productSlider) {
						var index = this.activeIndex;
						$('.fs-products .banner-pic .fs-pic').removeClass('active');
						$('.fs-products .banner-pic .fs-pic[data-target=' + index + ']').addClass('active');
					}
					if ($('.fs-products').length) {
						if (tabSlider && window.innerWidth <= 1100) {
							var index = this.activeIndex;
							tabSlider.slideTo(index);
						}
					}

				}, transitionEnd: function () {
				}
			},
			navigation: {
				nextEl: '.product-items .swiper-button-next',
				prevEl: '.product-items .swiper-button-prev',
			},
			a11y: {
				enabled: false
			}
		});
		$('.product-tab .fs-box').on('click', function () {
			var index = $(this).attr('data-index');
			productSlider.slideTo(index, 800, null);
		});
	}

	if ($('.events-slider').length) {
		var loop = true;
		if ($('.events-slider .item-slide').length < 2) {
			$('.fs-events').addClass('hide-controls');
			loop = false;
		}
		new Swiper('.events-slider', {
			effect: 'slide',
			loop: loop,
			speed: 800,
			slidesPerView: 1,
			watchOverflow: true,
			autoplay: {
				delay: 6000,
				disableOnInteraction: false
			},
			on: {
				init: function () {
				}, transitionStart: function () {
				}, transitionEnd: function () {
				}
			},
			navigation: {
				nextEl: '.fs-events .swiper-button-next',
				prevEl: '.fs-events .swiper-button-prev',
			},
			a11y: {
				enabled: false
			}
		});
	}


	if ($('.product-slider').length) {
		if (window.innerWidth > 1100) {
			if ($('.product-slider .item-slide').length < 3) {
				$('.product-list').addClass('hide-controls');
			} else {
				$('.product-list').removeClass('hide-controls');
			}
		} else {
			if ($('.product-slider .item-slide').length < 2) {
				$('.product-list').addClass('hide-controls');
			} else {
				$('.product-list').removeClass('hide-controls');
			}
		}
		new Swiper('.product-slider', {
			effect: 'slide',
			loop: false,
			speed: 800,
			slidesPerView: 2,
			slidesPerGroup: 2,
			watchOverflow: true,
			breakpoints: {
				1100: {
					slidesPerView: 1,
					slidesPerGroup: 1,
				},
			},
			// autoplay: {
			// 	delay: 6000,
			// 	disableOnInteraction: false
			// },
			on: {
				init: function () {
				}, transitionStart: function () {
				}, transitionEnd: function () {
				}
			},
			navigation: {
				nextEl: '.product-list .swiper-button-next',
				prevEl: '.product-list .swiper-button-prev',
			},
			a11y: {
				enabled: false
			}
		});
	}


	creatTabSlider();

}


function creatTabSlider() {

	if ($('.product-tab').length && window.innerWidth < 1100) {

		if ($('.tab-slider .swiper-slide').length > 1) {
			$('.product-tab').removeClass('is-pc');
			tabSlider = new Swiper('.tab-slider', {
				effect: 'slide',
				loop: false,
				speed: 1000,
				slidesPerView: 2,
				slidesPerGroup: 1,
				watchOverflow: false,
				on: {
					init: function () {
					}, transitionStart: function () {
						if ($('.fs-products').length) {
							if (productSlider && window.innerWidth <= 1100) {
								var index = this.activeIndex;
								productSlider.slideTo(index);
							}
						}
					}, transitionEnd: function () {
					}
				},
				navigation: {
					nextEl: '.product-tab .swiper-button-next',
					prevEl: '.product-tab .swiper-button-prev',
				},
				a11y: {
					enabled: false
				}
			});

		} else {
			$('.product-tab').addClass('is-pc');
		}

		if ($('.tab-bot-slider').length) {
			if ($('.tab-bot-slider .swiper-slide').length > 1) {
				$('.product-tab').removeClass('is-pc');
				tabBotSlider = new Swiper('.tab-bot-slider', {
					effect: 'slide',
					loop: false,
					speed: 1000,
					slidesPerView: 2,
					slidesPerGroup: 1,
					watchOverflow: false,
					on: {
						init: function () {
						}, transitionStart: function () {
						}, transitionEnd: function () {
						}
					},
					navigation: {
						nextEl: '.product-tab .swiper-button-next',
						prevEl: '.product-tab .swiper-button-prev',
					},
					a11y: {
						enabled: false
					}
				});
			}
		} else {
			$('.product-recipe .product-tab').addClass('is-pc');
		}

	} else {

		if (tabSlider) {
			$('.product-tab').addClass('is-pc');
			tabSlider.destroy(true, true);
			tabSlider = undefined;
			$('.product-tab .tab-slider, .product-tab .swiper-slide').removeAttr('style');
			$('.product-tab .tab-slider').removeClass('slide-container-horizontal');
		}

		if (tabBotSlider) {
			$('.product-tab').addClass('is-pc');
			tabBotSlider.destroy(true, true);
			tabBotSlider = undefined;
			$('.product-tab .tab-bot-slider, .product-tab .swiper-slide').removeAttr('style');
			$('.product-tab .tab-bot-slider').removeClass('slide-container-horizontal');
		}

	}

}

// Variables for Scroll
var isCroll = false,
	scrollPos = 0,
	threshold = 500;

// LazyLoad
function ImgLazyLoad() {

	lazyImages = window.innerWidth > 1100 ? document.querySelectorAll('.cmPic.fs-lazy, .pcPic.fs-lazy') : document.querySelectorAll('.cmPic.fs-lazy, .spPic.fs-lazy');
	lazyBgs = window.innerWidth > 1100 ? document.querySelectorAll('.cmBg.fs-lazy, .pcBg.fs-lazy') : document.querySelectorAll('.cmBg.fs-lazy, .spBg.fs-lazy');

	// Lazy images
	[].slice.call(lazyImages).forEach(function (elm) {
		if (elm.getBoundingClientRect().top <= window.innerHeight + threshold) {
			elm.setAttribute('src', elm.getAttribute('data-src'));
			elm.classList.remove('fs-lazy');
		}
	});

	// Lazy background
	[].slice.call(lazyBgs).forEach(function (elm) {
		if (elm.getBoundingClientRect().top <= window.innerHeight + threshold) {
			elm.style.backgroundImage = 'url(' + elm.getAttribute('data-src') + ')';
			elm.classList.remove('fs-lazy');
		}
	});

}

// LazyLoad
function ImgLazyAll() {

	lazyImages = window.innerWidth > 1100 ? document.querySelectorAll('.cmPic.fs-lazy, .pcPic.fs-lazy') : document.querySelectorAll('.cmPic.fs-lazy, .spPic.fs-lazy');
	lazyBgs = window.innerWidth > 1100 ? document.querySelectorAll('.cmBg.fs-lazy, .pcBg.fs-lazy') : document.querySelectorAll('.cmBg.fs-lazy, .spBg.fs-lazy');

	// Lazy images
	[].slice.call(lazyImages).forEach(function (elm) {
		elm.setAttribute('src', elm.getAttribute('data-src'));
		elm.classList.remove('fs-lazy');
	});

	// Lazy background
	[].slice.call(lazyBgs).forEach(function (elm) {
		elm.style.backgroundImage = 'url(' + elm.getAttribute('data-src') + ')';
		elm.classList.remove('fs-lazy');
	});

}


var loading = true;
function starPage() {

	if (loading) {
		loading = false;

		setTimeout(function () {
			fsSlider();
		}, 100);

		$('.fs-loading').fadeOut(500, function () {

			onScroll(); // must be call here fisrt

			$('body').addClass('ready');

			// Fade Page [ this can edit for each projects]
			isCroll = true;

			fsEvent();
			setTimeout(function () {
				ImgLazyLoad();
			}, 50);

			var page = $('body').attr('data-page');
			if (page) {
				$('.nav-inr li[data-nav=' + page + ']').addClass('active');
			}

			$('.product-tab .fs-txt p').each(function (index, elm) {
				var txt = $(elm).html();
				txt = txt.replace('/', '<br>');
				$(elm).html(txt);
			});

			checkSize();
		});

		setTimeout(function () {
			if ($('.banner-news').length) {
				ImgLazyAll();
			}
		}, 1200);

	}

}

// Func Scroll
var scrollPos = 0,
	oldPost = 0;
function onScroll() {
	scrollPos = $(window).scrollTop();
	setTimeout(function () {
		if (isCroll) {
			[].slice.call(document.querySelectorAll('.origin-item .fs-txt, .product-outer, .origin-item .fs-pic, .introduce .fs-txt, .journeys .prd-ofood, .fs-origin .o-food, .timeline-outer .fs-box')).forEach(function (elm) {
				if (Math.abs(elm.getBoundingClientRect().top) <= $(window).height()) {
					$(elm).addClass('fs-ani');
				}
			});

			if (oldPost > scrollPos && scrollPos > $('.header-inr').height()) {
				$('.fs-header').addClass('fixed');
			} else {
				$('.fs-header').removeClass('fixed');
			}

			oldPost = scrollPos;
		}

		ImgLazyLoad();
	}, 0);  // Process for Input Delay


}



function checkSize() {
	var logoLeft = $('.logo').offset().left;
	$('.fs-menu-outer .fs-sub-menu-inr').css({'left': logoLeft + 'px'});
	// var iW = window.innerWidth * 0.746875;
	// var dW = (mW - iW) / 2;
	// $('.search-caption, .footer-top, .footer-bot').css({ 'padding-left': dW + 'px' });
	// $('.hero-banner .banner-box').css({ 'left': (dW - 10) + 'px' });
	
}

// Func Resize
function Resize() {

	// Need detect not mobile when resize because in mobile scrolling call resize
	if (!isMobile) {

		setTimeout(function () {

			if (tabSlider) {
				$('.product-tab').addClass('is-pc');
				tabSlider.destroy(true, true);
				tabSlider = undefined;
				$('.product-tab .tab-slider, .product-tab .swiper-slide').removeAttr('style');
				$('.product-tab .tab-slider').removeClass('slide-container-horizontal');
			}

			if (tabBotSlider) {
				$('.product-tab').addClass('is-pc');
				tabBotSlider.destroy(true, true);
				tabBotSlider = undefined;
				$('.product-tab .tab-bot-slider, .product-tab .swiper-slide').removeAttr('style');
				$('.product-tab .tab-bot-slider').removeClass('slide-container-horizontal');
			}

			creatTabSlider();

			// Reset controls
			if (window.innerWidth > 1100) {
				if ($('.product-slider .item-slide').length < 3) {
					$('.product-list').addClass('hide-controls');
				} else {
					$('.product-list').removeClass('hide-controls');
				}
			} else {
				if ($('.product-slider .item-slide').length < 2) {
					$('.product-list').addClass('hide-controls');
				} else {
					$('.product-list').removeClass('hide-controls');
				}
			}
			checkSize();

		}, 150);

		setTimeout(function () {
			ImgLazyLoad();
		}, 50);

	}

}

// Func Rotate
function Rotate() {

	ImgLazyLoad();

	setTimeout(function () {

		if (tabSlider) {
			$('.product-tab').addClass('is-pc');
			tabSlider.destroy(true, true);
			tabSlider = undefined;
			$('.product-tab .tab-slider, .product-tab .swiper-slide').removeAttr('style');
			$('.product-tab .tab-slider').removeClass('slide-container-horizontal');
		}

		if (tabBotSlider) {
			$('.product-tab').addClass('is-pc');
			tabBotSlider.destroy(true, true);
			tabBotSlider = undefined;
			$('.product-tab .tab-bot-slider, .product-tab .swiper-slide').removeAttr('style');
			$('.product-tab .tab-bot-slider').removeClass('slide-container-horizontal');
		}

		creatTabSlider();

		// Reset controls
		if (window.innerWidth > 1100) {
			if ($('.product-slider .item-slide').length < 3) {
				$('.product-list').addClass('hide-controls');
			} else {
				$('.product-list').removeClass('hide-controls');
			}
		} else {
			if ($('.product-slider .item-slide').length < 2) {
				$('.product-list').addClass('hide-controls');
			} else {
				$('.product-list').removeClass('hide-controls');
			}
		}

	}, 150);

}

// Set Scroll for Page
$(window).on('scroll', onScroll);

// Page Rezize
$(window).on('resize', Resize);

// Page Rotate
$(window).on('orientationchange', Rotate);

//  Page load
$(window).on('load', function () {

	if (loading) {
		starPage();
	}

});

$(window).on('beforeunload', function () {
	$(window).scrollTop(0);
});

// Page Ready
(function () {
	// scrollPopUp();
	includeHTML();

	ImgLazyLoad(); // must be call here fisrt

	setTimeout(function () {
		if (loading) {
			starPage();
		}
	}, 3000);

})();