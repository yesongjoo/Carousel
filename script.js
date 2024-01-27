const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll("ion-icon");
const firstCardWidth = document.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false;
let startX;
let startScrollLeft;
let timeoutId;

//Get the number of cards that can fit in the carousel at once
let cardPreview = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens
  .slice(-cardPreview)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChildrens.slice(0, cardPreview).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// arrowBtns.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
//   });
// });

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.id === "left") {
      carousel.scrollLeft -= firstCardWidth;
    } else {
      carousel.scrollLeft += firstCardWidth;
    }
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if dragging is false return from here
  // updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const autoplay = () => {
  if (window.innerWidth < 800) return; //return if window is smaller then 800
  //Autoplay the carouel after every 2500ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};

autoplay();

const infiniteScroll = () => {
  //If the carousel is at the begining, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // if the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  //CLear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoplay();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoplay);
