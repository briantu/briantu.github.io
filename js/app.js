import { Application } from "https://unpkg.com/@splinetool/runtime@0.9.210/build/runtime.js";
import { getTopTracks } from "./spotify.js";

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
if (canvas) {
  const spline = new Application(canvas);
  spline
    .load("https://prod.spline.design/6JHN1ME9hdACLFfk/scene.splinecode")
    .catch((err) => console.error("Spline load failed:", err));
}

const displayTopTracks = async () => {
  const div = document.getElementById("top-tracks");
  if (!div) return;
  try {
    const tracks = await getTopTracks();
    if (!tracks.length) {
      div.innerHTML = `<p class="tracks-empty">No tracks to show right now.</p>`;
      return;
    }
    // Build nodes via the DOM API so track fields are treated as text/attributes,
    // never parsed as HTML.
    div.replaceChildren(
      ...tracks.map((t, i) => {
        const rank = t.rank ?? i + 1;
        const name = t.name ?? "";
        const artists = t.artists ?? "";
        const album = t.album ?? "";
        const url = t.url ?? "#";
        const image = t.image ?? "";

        const row = document.createElement("a");
        row.className = "track";
        row.href = url;
        row.target = "_blank";
        row.rel = "noopener";
        row.style.setProperty("--i", i);

        const rankEl = document.createElement("span");
        rankEl.className = "track-rank";
        rankEl.textContent = rank;

        const img = document.createElement("img");
        img.className = "track-art";
        img.src = image;
        img.alt = album;
        img.loading = "lazy";

        const meta = document.createElement("span");
        meta.className = "track-meta";

        const nameEl = document.createElement("span");
        nameEl.className = "track-name";
        nameEl.textContent = name;

        const artistEl = document.createElement("span");
        artistEl.className = "track-artist";
        artistEl.textContent = artists;

        meta.append(nameEl, artistEl);
        row.append(rankEl, img, meta);
        return row;
      })
    );
  } catch (err) {
    console.error("Failed to load top tracks:", err);
    div.innerHTML = `<p class="tracks-empty">Tracks are unavailable right now.</p>`;
  }
};
displayTopTracks();

// Reveal controls that start hidden in CSS; guard so a missing element can't
// throw and abort the rest of the module.
const reveal = (id) => {
  const el = document.getElementById(id);
  if (el) el.style.opacity = 1;
};
reveal("leftarrow");
reveal("rightarrow");
reveal("webring");
