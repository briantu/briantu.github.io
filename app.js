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

const displayPlaylists = async () => {
  const playlists = await getPlaylists();
  let div = document.querySelector(".playlists");
  playlists.forEach((p, i) => {
    const span = `<span style="--i:${i};"><img src="${p.images[0].url}"></span>`;
    div.innerHTML ? (div.innerHTML += span) : (div.innerHTML = span);
  });
};
displayPlaylists();
