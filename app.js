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
  console.log(playlists);
  let div = document.querySelector(".gallery");
  playlists.forEach((p, i) => {
    const span = `<span style="--i:${i};">
        <a href="${p.external_urls.spotify}" target="_blank">
          <img src="${p.images[0].url}">
        </a>
        <div><p>${p.name}</p></div>
      </span>`;
    div.innerHTML ? (div.innerHTML += span) : (div.innerHTML = span);
  });
  document.querySelector(".playlists").classList.add("show");
};
displayPlaylists();
