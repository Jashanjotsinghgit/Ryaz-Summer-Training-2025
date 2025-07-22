
//Collapsible Logic
const collapsibles = document.querySelectorAll(".collapsible");

collapsibles.forEach(collapsible =>{
    collapsible.addEventListener("click",()=>{
        collapsible.classList.toggle("collapsible--expended");
    })
})

//Hover Content Logic 
const hoverElements = document.querySelectorAll(".hover__content");
hoverElements.forEach(element=>{
    // let hoverBtn = element.querySelector(".hover__content__btn");
    let element__list = element.querySelector(".hover__content__list");
    element.addEventListener("mouseover",()=>{
        element__list.style.display = "block";
    })
     element.addEventListener("mouseout",()=>{
        element__list.style.display = "none";
    })
})

// Slider Logic
let slides = document.querySelectorAll(".slide");
let prevBtn = document.querySelector(".prev-arrow");
let nextBtn = document.querySelector(".next-arrow");
let currentSlide = 0;

prevBtn.addEventListener("click",()=>{
    let prev = (currentSlide-1 + slides.length) % slides.length;
    changeSlide(prev,'prev');
})
nextBtn.addEventListener("click",()=>{
    let prev = (currentSlide+1)%slides.length;
    changeSlide(prev,'next');
})

function changeSlide(index,direction){
    if(currentSlide == index) return;

    let oldSlide = slides[currentSlide];
    let newSlide = slides[index];

    newSlide.style.transition = 'none';
    newSlide.style.transform = direction === 'next'? "translateX(100%)": "translateX(-100%)";
    void newSlide.offsetWidth;
    newSlide.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    oldSlide.style.transform = direction === 'next'? "translateX(-100%)":"translateX(100%)";
    oldSlide.classList.remove("active");
    newSlide.classList.add("active");
  newSlide.style.opacity = '1';
    newSlide.style.transform = 'translateX(0%)';

    currentSlide = index;
}
setInterval(() => {
    changeSlide((currentSlide+1)%slides.length,'next');
}, 5000);
