 document.addEventListener('DOMContentLoaded', () => {
            const themeToggleBtn = document.getElementById('theme_toggle_btn');
            const body = document.body; // Select the body element
            const logo = document.querySelector(".logo")
            // Function to apply the theme based on a class
            function applyTheme(isDark) {
                if (isDark) {
                    body.classList.add('dark');
                    themeToggleBtn.innerHTML = '<i class="fa-solid fa-circle-half-stroke"></i> '
                    themeToggleBtn.style.color = "white";
                    logo.style.filter = "invert(1)";
                    
                    localStorage.setItem('theme', 'dark'); // Save preference
                } else {
                    body.classList.remove('dark');
                    themeToggleBtn.innerHTML = ' <i class="fa-solid fa-moon"></i>'
                    themeToggleBtn.style.color = "black";
                    logo.style.filter = "invert(0)";
                    localStorage.setItem('theme', 'light'); // Save preference
                }
            }

            // 1. Check for saved theme preference on page load
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                applyTheme(true); // Apply dark theme if saved
            } else {
                applyTheme(false); // Apply light theme by default or if 'light' is saved
            }

            // 2. Add event listener to the button
            themeToggleBtn.addEventListener('click', () => {
                // Check if the body currently has the 'dark' class
                const isCurrentlyDark = body.classList.contains('dark');
                // Toggle the theme
                applyTheme(!isCurrentlyDark);
            });
        });



// Collapsible Logic
const collapsible_div = document.querySelectorAll(".collapsible");

collapsible_div.forEach( e => 
    e.addEventListener("click",function(){
        this.classList.toggle("collapsible--expended")
    })
);

//Slider Logic
const slides = document.querySelectorAll(".slide");
let prevBtn = document.querySelector(".left-arrow");
let nextBtn = document.querySelector(".right-arrow");
let current = 0;

nextBtn.addEventListener("click", () => {
  const nextIndex = (current + 1) % slides.length;
  changeSlide(nextIndex,'next');
});
prevBtn.addEventListener("click", () => {
  const prevIndex = (current - 1 + slides.length) % slides.length;
  changeSlide(prevIndex,'prev');
});

function changeSlide(index, direction) {
  if (current === index) return;

  let oldSlide = slides[current];
  let newSlide = slides[index];

  // Prepare new slide position (off-screen left or right)
  newSlide.classList.remove('slide-left', 'slide-right', 'active');
  newSlide.style.transition = 'none';
  newSlide.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';

  // Force reflow so browser registers initial position
  void newSlide.offsetWidth;

  // Add transition back
  newSlide.style.transition = 'transform 0.5s ease, opacity 0.5s ease';

  // Animate old slide out
  oldSlide.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
  oldSlide.classList.remove('active');

  // Animate new slide in
  newSlide.classList.add('active');
  newSlide.style.opacity = '1';
  newSlide.style.transform = 'translateX(0%)';

  current = index;
  updateIndicators();
}

const indicatorsContainer = document.getElementById('indicators');

// Create indicators
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('indicator');
  if (i === current) dot.classList.add('active');
  dot.addEventListener('click', () => changeSlide(i, i > current ? 'next' : 'prev'));
  indicatorsContainer.append(dot);
});

function updateIndicators() {
  const allIndicators = document.querySelectorAll('.indicator');
  allIndicators.forEach(ind => ind.classList.remove('active'));
  allIndicators[current].classList.add('active');
}


// AOS Animation Activator
 AOS.init();