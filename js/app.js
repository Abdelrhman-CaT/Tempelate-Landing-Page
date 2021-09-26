/*
    created on: 21-Sep-21, 12:30 AM
    Author: Abdelrahman Hany
*/

const sections = document.querySelectorAll("section");  // Get all sections 
const header = document.querySelector("header");  // Get header

let listElements = []; 
let coOr = []; 
let titles = []; 

sections.forEach( (section , i) => {
    titles[i] = section.getAttribute("data-nav"); 
    coOr[i] = section.getBoundingClientRect();
}); 

// creating navbar
const createNavBar = (titles)=>{ 
    const ulLists = document.createElement("ul"); // this is the navbar
    ulLists.classList.add("nav");
    listElements = titles.map((title) => {
        let li = document.createElement("li");
        li.textContent = title; 
        return li ; 
    }); 
    listElements.forEach( (li , i)  => {
        ulLists.appendChild(li)
        li.addEventListener("click" , () => {
            window.scrollTo({
                top: Math.ceil(coOr[i].top),
                behavior: 'smooth'
            }); 
        }); 
    }); 
    return ulLists ;
} 


const setActive = () => {
    let scrollLocation = window.scrollY;  
    coOr.forEach( (coOr , index) => {
        let coorTop = Math.ceil(coOr.top) ;  
        let coorBottom = Math.ceil(coOr.bottom) ;  
        if(coorTop <= scrollLocation && coorBottom > scrollLocation ) {
            listElements.forEach( (item , i) => {
                if(i == index) {
                    item.classList.add("active");
                    sections[i].classList.add("active");
                }
                if(i != index && item.classList.contains("active")) {
                    item.classList.remove("active"); 
                    sections[i].classList.remove("active");
                }
            });
        }
    });   
}

window.addEventListener("scroll" , setActive);   

header.append(createNavBar(titles));  // add navbar to page

const nav = document.querySelector("header ul");  // get the navbar
const elemSize = Math.ceil(nav.getBoundingClientRect().y);


// creating scroll top button
const scrollTop = document.createElement("span"); 
scrollTop.classList.add("scroll-top"); 
scrollTop.textContent = "GO TOP" ;  
document.querySelector("footer").appendChild(scrollTop); 
scrollTop.addEventListener("click" , () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    }); 
});


window.addEventListener("scroll" , () => {
    if(elemSize <= window.scrollY ) { 
        nav.classList.add("fixed"); 
        document.querySelector("body").style.paddingTop = "60px" ; 
    } else {
        nav.classList.remove("fixed"); 
        document.querySelector("body").style.paddingTop = "0" ; 
    }

    // scroll to top feature 
    if(window.scrollY > screen.availHeight) {
        scrollTop.classList.add("show"); 
    } else {
        scrollTop.classList.remove("show"); 
    }
});