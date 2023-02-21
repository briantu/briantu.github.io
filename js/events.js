function ul(index) {
  const underline = document.querySelector(".underline");
  underline.style.transform = `translateX(calc(${index * 100}% + ${
    index * 11
  }px))`;
  // handle section transitions
}

function fixdelay(index) {
  const projects = document.querySelectorAll(".project");
  // projects[index].style["transition-delay"] = "0ms";
  for (let i = index + 1; i < projects.length; i++) {
    projects[i].style["transition-delay"] = `${150 * (i - index - 1)}ms`;
  }
}

function scrollleft() {
  document
    .querySelector(".projects-wrapper")
    .scrollBy({ left: -170, behavior: "smooth" });
}
function scrollright() {
  document
    .querySelector(".projects-wrapper")
    .scrollBy({ left: 170, behavior: "smooth" });
}
