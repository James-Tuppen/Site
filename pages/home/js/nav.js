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

//This does some (satasfying) maths to calculate what button to highlight
//Due to the CSS of the right buttons, they are in the oppoite order to the left buttons
function calcNavButtonPosition(docPos) {
	return ((docPos - (document.querySelectorAll('.nav-item').length)) * -1) % document.querySelectorAll('.nav-item').length;
}

//Highlight the nav button that links to the place that the user is scolled to
function highlightNavButton() {
	let scrollPosition = window.scrollY;
	let navbarHeight = document.querySelector('.navbar').offsetHeight;
	document.querySelectorAll('.section').forEach(function(section, i) {
		let topOffset = section.offsetTop;
		if ((topOffset - scrollPosition - navbarHeight) < 0) {
			if (document.querySelector('.nav-item.active')) {
				document.querySelector('.nav-item.active').classList.remove('active');
			}
			document.querySelectorAll('.nav-item')[calcNavButtonPosition(i)].classList.add('active');
		}
	});
}

document.addEventListener('DOMContentLoaded', function() {
	//Call the scroll function when the scroll event listener is fired
	window.addEventListener('scroll', function() {
		highlightNavButton();
	});
	//Call once for when the page is loaded
	highlightNavButton();
});

function addNavClickEvents() {
	const navbarHeight = document.querySelector('.navbar').offsetHeight;
	document.querySelectorAll('.nav-item').forEach(function(navItem) {
		const element = document.querySelector('#section-1');
		const elementPosition = element.getBoundingClientRect().top + window.scrollY;
		const offsetPosition = elementPosition - navbarHeight;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		})
	})
}