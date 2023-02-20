function ul(index) {
  const underline = document.querySelector(".underline");
  underline.style.transform = `translateX(calc(${index * 100}% + ${
    index * 11
  }px))`;
}
