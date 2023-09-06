//Legacy code, but I left it here in case I need it

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
        }, 800);//I know this isn't great, but It's super stable and I've honestly had three hours sleep for the last four days.
    })
}


//-Highlight the nav button that links to the place that the user is scolled to
function highlightNavButton() {
    //Get the number of sections scrolled past
    let sectionsScrolled = 0;
    document.querySelectorAll('.section').forEach(function (section, i) {
        let topOffset = section.offsetTop;
        if ((topOffset - scrollY - obj.detectionBufferZone) < 0) {
            sectionsScrolled = i;
            //I'll leave to your imagination on why querySelectorAll isn't getting elements that are offscreen on webkit
        }
    });

    //Make all active nav buttons inactive
    if (document.querySelector('.nav-item.active')) {
        document.querySelector('.nav-item.active').classList.remove('active');
    }

    //Make the nav button at the index of the "sectionsScrolled" variable active
    document.querySelectorAll('#left-nav-container > .nav-item')[sectionsScrolled].classList.add('active');
}

//-Make the nav buttons do things, basically
function addNavClickEvents() {
    const navbarHeight = document.getElementById('top-nav').offsetHeight;

    //Top nav
    document.querySelectorAll('#top-nav-container > .nav-item').forEach(function (navItem) {
        //Don't add the event to the nav controls
        if (navItem.childNodes[0].tagName != 'A' && navItem.childNodes[0].id != 'hamburger' && navItem.childNodes[0].id != 'theme-toggle') {
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
        //When clicked
        navItem.onclick = (function (e) {
            //Get the element that the button scrolls to
            let element = document.querySelector(e.target.getAttribute('target-element'));
            //Get the position of the element below the top of the page
            let elementPosition = element.getBoundingClientRect().top + window.scrollY;
            let offsetPosition = elementPosition - navbarHeight;

            //Make all active nav buttons inactive
            if (document.querySelector('.nav-item.active')) {
                document.querySelector('.nav-item.active').classList.remove('active');
            }
            //Make the clicked nav button active (e.target is the object that fired the event)
            e.target.parentNode.classList.add('active');

            //Scroll to the element, but smoothly
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
    //The real hamburger
    document.getElementById('left-nav-toggle').onclick = (function () {
        document.getElementById('top-nav-container').classList.remove('show')
        document.getElementById('left-nav').classList.toggle('active');
    })
    //It's not actually a hamburger, the left nav toggle is. I'm not entirely sure why I called it that. Maybe it was originally supposed to be a hamburger?
    document.getElementById('hamburger').onclick = (function () {
        document.getElementById('left-nav').classList.remove('active');
        document.getElementById('top-nav-container').classList.toggle('show')
    })
}


function addThemeToggle() {
    document.getElementById('theme-toggle').onclick = (function () {
        //Classlist is an awesome feature
        document.body.classList.toggle('dark-mode');
        
        localStorage.setItem('light-theme',
            //Woohoo ternary operators
            localStorage.getItem('light-theme') == 0 ? 1 : 0
        );
    })
}

//This algorithm was simplified in an in-between commit (checkpoint), but this version made a much smoother curve which prevented the nav buttons from flickering back and forth
//I didn't want to add the scroll bump in this algorithm, but it was actually a lot faster
const obj = {
    get detectionBufferZone() {
        const bufferZone = (minBufferZone + (maxBufferZone - minBufferZone) * (document.documentElement.scrollHeight - (scrollY + innerHeight)) / document.documentElement.scrollHeight) + ((scrollY - document.body.scrollHeight / 2) / scrollBufferBumpEffectDivisor);
        return bufferZone;
    }
};

//-Config
//Magic numbers lol
const maxBufferZone = window.innerHeight / 10;
const minBufferZone = window.innerHeight / 1.4;
const scrollBufferZone = window.innerHeight / 40;
const scrollBufferBumpEffectDivisor = 4;

//-Variables
//This is used to prevent the scroll event listener from firing when the user clicks a nav button adn the page is doing the scrolling
let isScrollTo = false;

//-Run
//On page load
document.addEventListener('DOMContentLoaded', function () {
    
    //Check the browser's storage to check what the theme was previously set to
    //If it's set to light mode, remove the dark mode class
    //This is done first to stop the page flashing when loading
    if (localStorage.getItem('light-theme') == 1) {
        document.body.classList.remove('dark-mode');
    }
    
    //If the theme hasn't been set before, or the user otherwise cleared the localstorage, add back the value and default to dark mode (because it looks much better with the bg effects)
    if (!localStorage.getItem('light-theme')) {
        localStorage.setItem('light-theme', 0);
    }
    
    //Add the theme toggle event
    addThemeToggle();

    //Add click events to the nav buttons
    addNavClickEvents();

    //Add the event to toggle the left nav on mobile
    addLeftNavToggle();
    

    //Call the scroll function when the scroll event listener is fired
    window.addEventListener('scroll', function (e) {
        //Don't call the function if the page is being scrolled by the nav buttons
        if (!isScrollTo) {
            highlightNavButton(e);
        }

        //navBarAppear();
    });
    //DOESN'T WORK ON WEBKIT ARGHHH WHYYYY
    //Note: I added the smoothScroll function but kept this in as a backup, as it is more robust
    window.addEventListener('scrollend', function (e) {
        isScrollTo = false;
    });

    //Call once for when the page is loaded, in case the broswer has scrolled to somewhere other than the top
    highlightNavButton();
});