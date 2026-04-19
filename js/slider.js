const slider = document.querySelector(".testimonials__content-bottom-inner");
const slides = document.querySelectorAll(".testimonial");
const progress = document.querySelector(".slider-progress");
const line = document.querySelector(".slider-line");

const prev = document.querySelector(".arrow-left");
const next = document.querySelector(".arrow-right");

const wrapper = document.querySelector(".testimonials__content-bottom");

let index = 0;
const gap = 24;

let slideWidth;
let slidesPerView;
let maxIndex;

function calcSizes() {
   slideWidth = slides[0].offsetWidth + gap;

   slidesPerView = Math.floor(
      (wrapper.offsetWidth + gap) / slideWidth
   );

   maxIndex = slides.length - slidesPerView;
   if (maxIndex < 0) maxIndex = 0;
}

function updateSlider(direction) {
   slider.style.transform = `translateX(-${index * slideWidth}px)`;

   // progress
   const maxPos = line.offsetWidth - progress.offsetWidth;
   const step = maxIndex > 0 ? maxPos / maxIndex : 0;

   progress.style.left = `${step * index}px`;

   if (direction === "right") {
      progress.style.transform = "translateY(-50%) scale(1.1)";
   } else if (direction === "left") {
      progress.style.transform = "translateY(-50%) scale(0.9)";
   } else {
      progress.style.transform = "translateY(-50%) scale(1)";
   }
}

// ▶ вправо
next.addEventListener("click", () => {
   if (index < maxIndex) {
      index++;
   } else {
      index = 0; // 🔁 цикл
   }
   updateSlider("right");
});

// ◀ влево
prev.addEventListener("click", () => {
   if (index > 0) {
      index--;
   } else {
      index = maxIndex; // 🔁 цикл
   }
   updateSlider("left");
});

// resize
window.addEventListener("resize", () => {
   calcSizes();

   if (index > maxIndex) index = maxIndex;
   updateSlider();
});

// init
calcSizes();
updateSlider();
