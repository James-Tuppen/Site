//<script defer type='text/javascript'>
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
//</script>

let scrollPos = 0;

function navBarCheck(ev) {
	let nav = document.getElementsByClassName('navbar')[0]
    if (window.scrollY < scrollPos) {
		nav.classList.add('sticky');
	} else {
		nav.classList.remove('sticky');
	};
	scrollPos = window.scrollY;

}
window.addEventListener('scroll', navBarCheck);
