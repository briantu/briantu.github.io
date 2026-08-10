import { Application } from "https://unpkg.com/@splinetool/runtime@0.9.210/build/runtime.js";
import { getPlaylists } from "./spotify.js";

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

const canvas = document.getElementById("canvas3d");
const spline = new Application(canvas);
spline.load("https://prod.spline.design/6JHN1ME9hdACLFfk/scene.splinecode");

const displayPlaylists = async () => {
  const div = document.getElementById("playlists");
  if (!div) return;
  try {
    const playlists = await getPlaylists();
    if (!playlists.length) {
      div.innerHTML = `<p class="playlists-empty">No playlists to show right now.</p>`;
      return;
    }
    div.innerHTML = playlists
      .map((p, i) => {
        const name = p.name ?? "";
        const url = p.url ?? "#";
        const image = p.image ?? "";
        return `<span style="--i:${i};">
        <a href="${url}" target="_blank" rel="noopener">
          <img src="${image}" alt="${name}">
        </a>
        <div><p>${name}</p></div>
      </span>`;
      })
      .join("");
  } catch (err) {
    console.error("Failed to load playlists:", err);
    div.innerHTML = `<p class="playlists-empty">Playlists are unavailable right now.</p>`;
  }
};
displayPlaylists();

document.getElementById("leftarrow").style.opacity = 1;
document.getElementById("rightarrow").style.opacity = 1;
document.getElementById("webring").style.opacity = 1;
