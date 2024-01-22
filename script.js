const carousel = document.querySelector(".carousel");

let isDragging = false;

const dragStart = () => {
  isDragging = true;
  carousel.classList.add("dragging");
};

const dragging = (e) => {
  if (!isDragging) return; // if dragging is false return from here
  carousel.scrollLeft = e.pageX;
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
