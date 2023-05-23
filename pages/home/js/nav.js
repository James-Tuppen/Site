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


//-This does some (satasfying) maths to calculate what button to highlight
//-Due to the CSS of the right buttons, they are in the oppoite order to the left buttons
function calcNavButtonPosition(docPos) {
	return ((docPos - ($('.nav-item').length)) * -1) % $('.nav-item').length
}

//-Highlight the nav button that links to the place that the user is scolled to
function highlightNavButton() {
	let scrollPosition = $(window).scrollTop();
	let navbarHeight = $('.navbar').height();
	$('.section').each(function(i) {
		let topOffset = $(this).offset().top;
		//console.log(''.concat(i, ': ', topOffset-scrollPosition))
		if((topOffset-scrollPosition-navbarHeight) < 0) {
			$('.nav-item.active').removeClass('active');
			$('.nav-item').eq(calcNavButtonPosition(i)).addClass('active');
		}
	})
}

$(document).ready(function() {
	$(window).scroll(function() {
		highlightNavButton();
  	});
	highlightNavButton();
})