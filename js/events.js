const sections = {
  0: document.getElementById("projects-section"),
  1: document.getElementById("music-section"),
  2: document.getElementById("interests-section"),
};

function ul(newIndex) {
  const underline = document.querySelector(".underline");
  const curIndex = Number(underline.style.getPropertyValue("--i"));
  if (newIndex === curIndex) return;
  underline.style.transform = `translateX(calc(${newIndex * 100}% + ${
    newIndex * 11
  }px))`;
  underline.style.setProperty("--i", newIndex);

  let flag = true;
  // handle section transitions
  if (curIndex < newIndex) {
    sections[curIndex].style.transform = "translateX(-100%)";
    // if interests was clicked before music the first time
    if (flag && newIndex === 2)
      sections[1].style.transform = "translateX(-100%)";
    flag = false;
  } else {
    sections[curIndex].style.transform = "translateX(100%)";
  }
  sections[curIndex].style.visibility = "hidden";
  sections[curIndex].style.opacity = 0;
  sections[curIndex].style.filter = "blur(5px)";
  sections[curIndex].style["transition-delay"] = "0ms";
  if (curIndex === 1)
    document.getElementById("playlists").style["animation-play-state"] =
      "paused";

  if (newIndex === 1) {
    document.getElementById("playlists").style["animation-play-state"] =
      "running";
  }
  sections[newIndex].style.visibility = "visible";
  sections[newIndex].style.opacity = 1;
  sections[newIndex].style.filter = "blur(0)";
  sections[newIndex].style.transform = "translateX(0)";
  sections[newIndex].style["transition-delay"] = "800ms";
}

function fixdelay(index) {
  const projects = document.querySelectorAll(".project");
  for (let i = index + 1; i < projects.length; i++) {
    projects[i].style["transition-delay"] = `${150 * (i - index - 1)}ms`;
  }
}

function scrollleft() {
  document
    .querySelector(".projects-wrapper")
    .scrollBy({ left: -200, behavior: "smooth" }); // width - overlap
}
function scrollright() {
  document
    .querySelector(".projects-wrapper")
    .scrollBy({ left: 200, behavior: "smooth" }); // width - overlap
}
