// Color randomizing
var rand = Math.floor(Math.random()*4);
document.getElementById("favicon").href = "img/favicons/favicon-"+rand+".ico";
document.getElementById("color").href = "css/color-"+rand+".css";
if (rand === 0) document.getElementById("preloader").style.backgroundColor = "#dc3545";
else if (rand === 1) document.getElementById("preloader").style.backgroundColor = "#60c000";
else if (rand === 2) document.getElementById("preloader").style.backgroundColor = "#007bff";
else if (rand === 3) document.getElementById("preloader").style.backgroundColor = "#fd7e14";

// Image slideshow
var images = new Array('../img/home/uofthacks.jpg', '../img/home/guitar.png', '../img/home/soccer2.png', '../img/home/citizen.jpg', '../img/home/beatit.png', '../img/home/raocup.png', '../img/home/massey.jpg', '../img/home/rockband.png', '../img/home/soccer1.png');
var nextimage = 0;
doSlideshow();

function doSlideshow() {
    if (nextimage >= images.length) {nextimage=0;}
    $('.slide-bg')
    .css('background-image', 'url("'+images[nextimage++]+'")')
    .fadeIn(500,function() {
        setTimeout(doSlideshow, 5000);
    });
}

//dark mode switch
const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.getElementById("theme").href = "css/dark.css";
        //document.getElementsByClassName("slider").style.backgroundColor = document.getElementById("preloader").style.backgroundColor;
        console.log(document.querySelector(".slider").style.backgroundColor);
    }
    else {
        document.getElementById("theme").href = "css/style.css";
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Scrolling and colors
$(document).ready(function () {
    // get the anchor link buttons
    const menuBtn = $('.nav-link');
    // when each button is clicked
    menuBtn.click(()=>{	
        // set a short timeout before taking action
        // so as to allow hash to be set
        setTimeout(()=>{
        // call removeHash function after set timeout
        removeHash();
        }, 5); // 5 millisecond timeout in this case
    });

    $(document).on("scroll", onScroll);
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 700, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#menu-center a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 300) {
            $('#menu-center ul li a').removeClass("active");
            $('#idk-menu-center ul li a').removeClass("active");
            currLink.addClass("active");
            removeHash();
        }
        else if (refElement.position().top <= scrollPos+200 && refElement.position().top + refElement.height() > scrollPos) {
            $('#menu-center ul li a').removeClass("active");
            $('#idk-menu-center ul li a').removeClass("active");
            currLink.addClass("active");
            removeHash();
        }
        else {
            currLink.removeClass("active");
            removeHash();
        }
    });
}

// must need more removehashes reeeee
// removeHash function
// uses HTML5 history API to manipulate the location bar
function removeHash() {
    history.replaceState('', document.title, window.location.origin + window.location.pathname + window.location.search);
}