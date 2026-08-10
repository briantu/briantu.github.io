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

  // handle section transitions. Offsets are in vw (viewport-relative) so sections
  // start/leave at the actual screen edge, not the edge of the centered body column.
  if (curIndex < newIndex) {
    sections[curIndex].style.transform = "translateX(-100vw)";
  } else {
    sections[curIndex].style.transform = "translateX(100vw)";
  }
  // if 0 -> 2 -> 1, 1 should come from left
  if (curIndex === 0 && newIndex === 2)
    sections[1].style.transform = "translateX(-100vw)";
  // if 2 -> 0 -> 1, 1 should come from right
  else if (curIndex === 2 && newIndex === 0)
    sections[1].style.transform = "translateX(100vw)";
  sections[curIndex].style.visibility = "hidden";
  sections[curIndex].style.opacity = 0;
  sections[curIndex].style.filter = "blur(5px)";
  sections[curIndex].style["transition-delay"] = "0ms";
  sections[newIndex].style.visibility = "visible";
  sections[newIndex].style.opacity = 1;
  sections[newIndex].style.filter = "blur(0)";
  sections[newIndex].style.transform = "translateX(0)";
  // Slide the incoming section in at the same time as the outgoing one leaves
  // (both are absolutely positioned in the same spot, so they slide past each other).
  sections[newIndex].style["transition-delay"] = "0ms";

  // Cascade the track rows in each time the music tab opens. Reset on leave so
  // the staggered fade-in replays on the next open (see .show-tracks in style.css).
  if (curIndex === 1) sections[1].classList.remove("show-tracks");
  if (newIndex === 1) {
    sections[1].classList.remove("show-tracks");
    void sections[1].offsetWidth; // force reflow so the animation restarts
    sections[1].classList.add("show-tracks");
  }
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
