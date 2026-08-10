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
if (canvas) {
  const spline = new Application(canvas);
  spline
    .load("https://prod.spline.design/6JHN1ME9hdACLFfk/scene.splinecode")
    .catch((err) => console.error("Spline load failed:", err));
}

const displayPlaylists = async () => {
  const div = document.getElementById("playlists");
  if (!div) return;
  try {
    const playlists = await getPlaylists();
    if (!playlists.length) {
      div.innerHTML = `<p class="playlists-empty">No playlists to show right now.</p>`;
      return;
    }
    // Build nodes via the DOM API so playlist fields are treated as text/attributes,
    // never parsed as HTML.
    div.replaceChildren(
      ...playlists.map((p, i) => {
        const name = p.name ?? "";
        const url = p.url ?? "#";
        const image = p.image ?? "";

        const span = document.createElement("span");
        span.style.setProperty("--i", i);

        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.target = "_blank";
        anchor.rel = "noopener";

        const img = document.createElement("img");
        img.src = image;
        img.alt = name;
        anchor.appendChild(img);

        const label = document.createElement("div");
        const caption = document.createElement("p");
        caption.textContent = name;
        label.appendChild(caption);

        span.append(anchor, label);
        return span;
      })
    );
  } catch (err) {
    console.error("Failed to load playlists:", err);
    div.innerHTML = `<p class="playlists-empty">Playlists are unavailable right now.</p>`;
  }
};
displayPlaylists();

// Reveal controls that start hidden in CSS; guard so a missing element can't
// throw and abort the rest of the module.
const reveal = (id) => {
  const el = document.getElementById(id);
  if (el) el.style.opacity = 1;
};
reveal("leftarrow");
reveal("rightarrow");
reveal("webring");
