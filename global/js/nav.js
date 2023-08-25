//This hides the navbar when scrolling
/*
function navBarAppear(ev) {
	let nav = document.getElementById('navbar')
	if (window.scrollY > 200) {
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
*/

//This does some (satasfying) maths to calculate what button to highlight
//Due to the CSS of the right buttons, they are in the oppoite order to the left buttons
/*
function calcNavButtonPosition(docPos) {
	return ((docPos - (document.querySelectorAll('.nav-item').length)) * -1) % document.querySelectorAll('.nav-item').length;
}
*/



//-Highlight the nav button that links to the place that the user is scolled to
function highlightNavButton() {
	let scrollPosition = window.scrollY;
	
	let sectionsScrolled = 0;
	document.querySelectorAll('.section').forEach(function(section, i) {
		let topOffset = section.offsetTop;
		if ((topOffset - scrollPosition - detectionBufferZone) < 0) {
			sectionsScrolled = i;
		}
	});
	
	if (document.querySelector('.nav-item.active')) {
		document.querySelector('.nav-item.active').classList.remove('active');
	}
	
	document.querySelectorAll('#left-nav-container > .nav-item')[sectionsScrolled-1].classList.add('active');
}

//-Make the nav buttons do things, basically
function addNavClickEvents() {
	const navbarHeight = document.getElementById('top-nav').offsetHeight;
	
	//Top nav
	document.querySelectorAll('#top-nav-container > .nav-item').forEach(function(navItem) {
		if (navItem.childNodes[0].tagName != 'A') {
			navItem.onclick = (function() {
				isScrollTo = true;
				window.scrollTo({
					top: 0, behavior: 'smooth'
				});
			})
		}
	})

	//Left nav
	document.querySelectorAll('#left-nav-container > .nav-item').forEach(function(navItem) {
		navItem.onclick = (function(e) {
			let element = document.querySelector(e.target.getAttribute('target-element'));
			let elementPosition = element.getBoundingClientRect().top + window.scrollY;
			let offsetPosition = elementPosition - navbarHeight;
			
			if (document.querySelector('.nav-item.active')) {
				document.querySelector('.nav-item.active').classList.remove('active');
			}
			e.target.parentNode.classList.add('active');

			isScrollTo = true;
			window.scrollTo({
				top: offsetPosition - scrollBufferZone, behavior: 'smooth'
			})
			
		})
	})
}

//-Config
const detectionBufferZone = window.innerHeight / 6;
const scrollBufferZone = window.innerHeight / 40;

//-Variables
let isScrollTo = false;

//-Run
document.addEventListener('DOMContentLoaded', function() {
	
	//Add click events to the nav buttons
	addNavClickEvents();

	//Call the scroll function when the scroll event listener is fired
	window.addEventListener('scroll', function(e) {
		if (!isScrollTo) {
			highlightNavButton(e);
		}

		//navBarAppear();
	});
	window.addEventListener('scrollend', function(e) {
		isScrollTo = false;
		highlightNavButton();
	});

	//Call once for when the page is loaded
	highlightNavButton();
});