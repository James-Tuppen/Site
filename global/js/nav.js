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



//I COULD HAVE JUST USED :root {scroll-behavior: smooth;} ARGHHHHH WHYYYY

function smoothScroll(y) {
    window.scrollTo({ top: y, behavior: 'smooth' });

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 400);//I know this isn't great, but It's super stable and I've honestly had three hours sleep for the last four days.
    })
}


//-Highlight the nav button that links to the place that the user is scolled to
function highlightNavButton() {
    let scrollPosition = window.scrollY;

    let sectionsScrolled = 1;
    document.querySelectorAll('.section').forEach(function (section, i) {
        let topOffset = section.offsetTop;
        if ((topOffset - scrollPosition - detectionBufferZone) < 0) {
            sectionsScrolled = i;
            //I'll leave to your imagination on why querySelectorAll isn't getting elements that are offscreen on webkit
        }
    });

    if (document.querySelector('.nav-item.active')) {
        document.querySelector('.nav-item.active').classList.remove('active');
    }

    if (sectionsScrolled == 0) {
        sectionsScrolled = 1;
    }

    document.querySelectorAll('#left-nav-container > .nav-item')[sectionsScrolled - 1].classList.add('active');
}

//-Make the nav buttons do things, basically
function addNavClickEvents() {
    const navbarHeight = document.getElementById('top-nav').offsetHeight;

    //Top nav
    document.querySelectorAll('#top-nav-container > .nav-item').forEach(function (navItem) {
        if (navItem.childNodes[0].tagName != 'A' && navItem.childNodes[0].id != 'hamburger') {
            navItem.onclick = (function () {
                isScrollTo = true;
                smoothScroll(0).then(() => {
                    isScrollTo = false;
                    highlightNavButton();
                });
            })
        }
    })

    //Left nav
    document.querySelectorAll('#left-nav-container > .nav-item').forEach(function (navItem) {
        navItem.onclick = (function (e) {
            let element = document.querySelector(e.target.getAttribute('target-element'));
            let elementPosition = element.getBoundingClientRect().top + window.scrollY;
            let offsetPosition = elementPosition - navbarHeight;

            if (document.querySelector('.nav-item.active')) {
                document.querySelector('.nav-item.active').classList.remove('active');
            }
            e.target.parentNode.classList.add('active');

            isScrollTo = true;
            smoothScroll(offsetPosition - scrollBufferZone).then(() => {
                isScrollTo = false;
                highlightNavButton();
            });
        })
    })
}

//HAMBURGER :D
function addLeftNavToggle() {
    document.getElementById('left-nav-toggle').onclick = (function () {
        document.getElementById('top-nav-container').classList.remove('show')
        document.getElementById('left-nav').classList.toggle('active');
    })
    document.getElementById('hamburger').onclick = (function () {
        document.getElementById('left-nav').classList.remove('active');
        document.getElementById('top-nav-container').classList.toggle('show')
    })
}

//-Config
const detectionBufferZone = window.innerHeight / 6;
const scrollBufferZone = window.innerHeight / 40;

//-Variables
let isScrollTo = false;

//-Run
document.addEventListener('DOMContentLoaded', function () {

    //Add click events to the nav buttons
    addNavClickEvents();

    //Add the event to toggle the left nav on mobile
    addLeftNavToggle();

    //Call the scroll function when the scroll event listener is fired
    window.addEventListener('scroll', function (e) {
        if (!isScrollTo) {
            highlightNavButton(e);
        }

        //navBarAppear();
    });
    //DOESN'T WORK ON WEBKIT ARGHHH WHYYYY
    //Note: I added the smoothScroll function but kept this in as a backup
    window.addEventListener('scrollend', function (e) {
        isScrollTo = false;
        highlightNavButton();
    });

    //Call once for when the page is loaded
    highlightNavButton();
});