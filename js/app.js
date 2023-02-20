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
  const playlists = await getPlaylists();
  let div = document.getElementById("playlists");
  playlists.forEach((p, i) => {
    const span = `<span style="--i:${i};">
        <a href="${p.external_urls.spotify}" target="_blank">
          <img src="${p.images[0].url}">
        </a>
        <div><p>${p.name}</p></div>
      </span>`;
    div.innerHTML ? (div.innerHTML += span) : (div.innerHTML = span);
  });
  document.querySelector(".playlists-wrapper").classList.add("show");
};
displayPlaylists();
