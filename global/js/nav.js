//This hides the navbar when scrolling
function navBarAppear(ev) {
	let nav = document.getElementById('navbar')
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

//This does some (satasfying) maths to calculate what button to highlight
//Due to the CSS of the right buttons, they are in the oppoite order to the left buttons
function calcNavButtonPosition(docPos) {
	return ((docPos - (document.querySelectorAll('.nav-item').length)) * -1) % document.querySelectorAll('.nav-item').length;
}

//Highlight the nav button that links to the place that the user is scolled to
function highlightNavButton() {
	let scrollPosition = window.scrollY;
	let navbarHeight = document.getElementById('navbar').offsetHeight;
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


function addNavClickEvents() {
	const navbarHeight = document.getElementById('navbar').offsetHeight;
	document.querySelectorAll('.nav-scroll').forEach(function(navItem) {
		navItem.onclick = (function() {
			const element = document.querySelector(navItem.getAttribute('targetElement'));
			const elementPosition = element.getBoundingClientRect().top + window.scrollY;
			const offsetPosition = elementPosition - navbarHeight + 1;
			
			window.scrollTo({
				top: offsetPosition, behavior: 'smooth'
			})
		})
	})
}


document.addEventListener('DOMContentLoaded', function() {
	//Call the scroll function when the scroll event listener is fired
	window.addEventListener('scroll', function() {
		highlightNavButton();
		//navBarAppear();
	});
	//Call once for when the page is loaded
	highlightNavButton();

	//Add click events to the nav buttons
	addNavClickEvents();
});