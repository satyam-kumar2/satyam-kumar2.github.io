function scroll_() {
	let navbar = document.getElementsByClassName("navbar");
    for (let i=0; i<navbar.length; i++){
        navbar[i].classList.toggle('scrolled', elm.scrollTop > 100);
        console.log(elm.scrollTop);
    }
	
}
const elm = document.scrollingElement;
window.onscroll = function() {scroll_()};
