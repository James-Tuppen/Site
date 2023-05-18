/*
var width = window.innerWidth || document.documentElement.clientWidth;
function navBarAppear(ev) {
	let nav = document.getElementsByClassName('navbar')[0]
	if (window.pageYOffset > 200) {
		nav.style.position = 'sticky';
		nav.style.top = '-80px';
		window.setTimeout(function() {
		nav.style.top = '0px';
		}, 1);
	} else {
		nav.style.position = 'absolute';
		nav.style.top = 'auto';
	};
}
window.onscroll = navBarAppear;
*/

let scrollPos = 0;

function navBarCheck(ev) {
	if (!(document.body.classList.contains('navbar-auto'))) {return}
	let nav = document.getElementsByClassName('navbar')[0]
    if (window.scrollY < scrollPos) {
		nav.classList.add('sticky');
	} else {
		nav.classList.remove('sticky');
	};
	scrollPos = window.scrollY;

}
window.addEventListener('scroll', navBarCheck);

$(document).ready(function() {
	$(window).scroll(function() {
		var scrollPos = $(window).scrollTop()
		var navH = $('.navbar').height()
		$('.section').each(function(i) {
			var offT = $(this).offset().top;
			console.log(''.concat(i, ': ', offT-scrollPos))
			if((offT-scrollPos) <= 0) {
				$('.nav-item.active').removeClass('active')
				console.log((i - ($('.nav-item').length)) * -1)
				$('.nav-item').eq(((i - ($('.nav-item').length)) * -1) % $('.nav-item').length).addClass('active')
			}
		})
  	})
})